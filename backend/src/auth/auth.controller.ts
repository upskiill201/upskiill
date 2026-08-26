import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Res,
  Query,
  BadRequestException,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { GetUser } from './decorator/get-user.decorator';
import type { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

import { IsString, IsOptional, IsNotEmpty, MinLength } from 'class-validator';

export class FirebaseLoginDto {
  @IsString()
  @IsNotEmpty()
  idToken: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  draftId?: string;

  // Full onboarding answers — attached by Step 15 Google OAuth flow
  @IsOptional()
  onboarding?: Record<string, unknown>;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  // Matches the signup password rule.
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  newPassword: string;
}

@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Throttle({ default: { limit: 5, ttl: 900000 } }) // 5 per 15 mins
  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    // We don't set cookie here anymore, user must verify email first
    const result = await this.authService.signup(dto);
    return result;
  }

  @Get('verify-email')
  async verifyEmail(
    @Query('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const appUrl = process.env.APP_URL || 'https://teyro.app';
    try {
      const result = await this.authService.verifyEmail(token);
      this.setCookie(res, result.access_token);
      // Route by role: students resume their learning flow, creators land in
      // the final step of creator studio onboarding.
      if (result.role === 'INSTRUCTOR') {
        return res.redirect(`${appUrl}/creator/onboarding/16`);
      }
      return res.redirect(`${appUrl}/dashboard`);
    } catch (error) {
      // Redirect to a frontend failure page
      return res.redirect(`${appUrl}/creator/verify-failed`);
    }
  }

  /** Codes are 6 digits with a 10-minute TTL — cap guesses hard per IP. */
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('verify-code')
  async verifyCode(
    @Body() dto: VerifyCodeDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.verifyCode(dto.email, dto.code);
    this.setCookie(res, result.access_token);
    return result;
  }

  @Throttle({ default: { limit: 3, ttl: 3600000 } }) // 3 per hour
  @Post('resend-verification')
  async resendVerification(@Body() dto: ResendVerificationDto) {
    return this.authService.resendVerification(dto.email);
  }

  @Throttle({ default: { limit: 10, ttl: 900000 } }) // 10 per 15 mins
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto);
    this.setCookie(res, result.access_token);
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @Post('firebase')
  async firebaseLogin(
    @Body() dto: FirebaseLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.firebaseSignIn(
      dto.idToken,
      dto.role || 'STUDENT',
      dto.draftId,
      dto.onboarding,
    );
    this.setCookie(res, result.access_token);
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      path: '/',
    });
    return { message: 'Logged out successfully' };
  }

  /**
   * POST /auth/switch-role
   * Issues a fresh JWT for the requested role (STUDENT or INSTRUCTOR).
   * Only succeeds if the user has the corresponding access flag set.
   */
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('switch-role')
  async switchRole(
    @Body('role') role: string,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.switchRole(user.id, role);
    this.setCookie(res, result.access_token);
    return result;
  }

  private setCookie(res: Response, token: string) {
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });
  }

  /**
   * GET /auth/me
   * Returns the authenticated user with their full profile joined.
   * Used by: Creator layout sidebar, Step 16 welcome screen, Settings page.
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@GetUser() user: User) {
    // Return enriched user with both profiles — not just the raw User row
    const enrichedUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { profile: true, studentProfile: true },
    });
    if (enrichedUser) {
      delete (enrichedUser as any).password;
    }
    return enrichedUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me/enrollments')
  async getMyEnrollments(@GetUser() user: User) {
    return this.authService.getMyEnrollments(user.id);
  }

  @Throttle({ default: { limit: 3, ttl: 3600000 } }) // 3 per hour
  @Post('forgot-password')
  async forgotPassword(
    @Body('email') email: string,
    @Body('role') role?: string,
  ) {
    if (!email) {
      return { message: 'If that email exists, a reset link has been sent.' };
    }
    return this.authService.forgotPassword(email, role);
  }

  @Get('validate-token')
  async validateResetToken(@Query('token') token: string) {
    if (!token) return { valid: false, reason: 'invalid' };
    return this.authService.validateResetToken(token);
  }

  @Throttle({ default: { limit: 10, ttl: 900000 } }) // 10 per 15 mins
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.newPassword);
  }

  /**
   * GET /auth/check-email?email=...
   * Real-time email duplicate check for the Step 15 signup form.
   * Called on email field blur — returns { exists: boolean }.
   */
  // Loose cap: it's a keystroke-level helper, but also an unauthenticated
  // existence oracle, so it must not be freely scriptable.
  @Throttle({ default: { limit: 20, ttl: 60000 } }) // 20 per minute
  @Get('check-email')
  async checkEmail(@Query('email') email: string) {
    if (!email) return { exists: false };
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      select: { id: true, hasCreatorAccess: true, hasStudentAccess: true, isVerified: true },
    });
    return { 
      exists: !!user,
      hasCreatorAccess: user?.hasCreatorAccess ?? false,
      hasStudentAccess: user?.hasStudentAccess ?? false,
      isVerified: user?.isVerified ?? false,
    };
  }
}
