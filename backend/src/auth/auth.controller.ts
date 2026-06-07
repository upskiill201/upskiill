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

import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

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
      // Redirect to frontend creator studio Step 16
      return res.redirect(`${appUrl}/creator/onboarding/16`);
    } catch (error) {
      // Redirect to a frontend failure page
      return res.redirect(`${appUrl}/creator/verify-failed`);
    }
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
    // Return enriched user with profile — not just the raw User row
    const enrichedUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { profile: true },
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
  @Get('check-email')
  async checkEmail(@Query('email') email: string) {
    if (!email) return { exists: false };
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      select: { id: true },
    });
    return { exists: !!user };
  }
}
