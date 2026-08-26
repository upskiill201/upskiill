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
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { GetUser } from './decorator/get-user.decorator';
import type { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

import { IsString, IsOptional, IsNotEmpty, IsIn } from 'class-validator';

export class FirebaseLoginDto {
  @IsString()
  @IsNotEmpty()
  idToken: string;

  // ADMIN is never a client-selectable role — validation rejects it with 400
  @IsIn(['STUDENT', 'INSTRUCTOR'])
  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  draftId?: string;

  // Full onboarding answers — attached by Step 15 Google OAuth flow
  @IsObject()
  @IsOptional()
  onboarding?: Record<string, unknown>;
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
  async signup(
    @Body() dto: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signup(dto);
    // Unverified signups return no token (verification is still required).
    // The existing-account LINK branch does complete with a live session —
    // set the cookie so the creator isn't bounced to a login wall right
    // after activating their profile.
    const accessToken = (result as { access_token?: string }).access_token;
    if (accessToken) {
      this.setCookie(res, accessToken);
    }
    return this.withoutToken(result);
  }

  @Get('verify-email')
  verifyEmailRedirect(@Query('token') token: string, @Res() res: Response) {
    // Legacy emails pointed straight at the API origin, where any session
    // cookie would be set for the wrong domain and verification double-hashed
    // the token. Real verification now happens app-side: this page exchanges
    // the token via the proxied /api route so the cookie lands first-party.
    const appUrl = process.env.APP_URL || 'https://teyro.app';
    return res.redirect(
      `${appUrl}/verify-email${token ? `?token=${encodeURIComponent(token)}` : ''}`,
    );
  }

  @Throttle({ default: { limit: 10, ttl: 900000 } }) // 10 per 15 mins — the token has the same 10^6 space as codes
  @HttpCode(HttpStatus.OK)
  @Post('verify-link')
  async verifyLink(
    @Body('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.verifyEmail(token);
    this.setCookie(res, result.access_token);
    return this.withoutToken(result);
  }

  @Post('verify-code')
  async verifyCode(
    @Body('email') email: string,
    @Body('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.verifyCode(email, code);
    this.setCookie(res, result.access_token);
    return this.withoutToken(result);
  }

  @Throttle({ default: { limit: 3, ttl: 3600000 } }) // 3 per hour
  @Post('resend-verification')
  async resendVerification(@Body('email') email: string) {
    return this.authService.resendVerification(email);
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
    return this.withoutToken(result);
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
    return this.withoutToken(result);
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
    return this.withoutToken(result);
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
   * The httpOnly cookie is the ONLY session transport. Raw JWTs used to ride
   * along in JSON bodies too — readable by any extension/proxy/log — while the
   * frontend exclusively uses cookies. Strip before responding.
   */
  private withoutToken<T extends { access_token?: string }>(result: T): Omit<T, 'access_token'> {
    const { access_token, ...safe } = result;
    return safe;
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

  /**
   * GET /auth/check-email?email=...
   * Real-time email duplicate check for the Step 15 signup form.
   * Called on email field blur — returns { exists: boolean }.
   */

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

  @Post('reset-password')
  async resetPassword(@Body() body: any) {
    const { token, newPassword } = body;
    if (!token || !newPassword) {
      throw new Error('Token and new password are required');
    }
    return this.authService.resetPassword(token, newPassword);
  }

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
