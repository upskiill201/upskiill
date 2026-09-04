import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { GetUser } from '../../../auth/decorator/get-user.decorator';
import { PrismaService } from '../../../prisma/prisma.service';
import { TeyDeliveryService } from '../tey-delivery.service';
import { TeyPolicyService } from '../tey-policy.service';
import { PushSubscriptionService } from './push-subscription.service';
import { WebPushClient } from './web-push.client';

class SubscriptionKeysDto {
  @IsString()
  @MaxLength(255)
  p256dh!: string;

  @IsString()
  @MaxLength(255)
  auth!: string;
}

class SaveSubscriptionDto {
  @IsString()
  @MaxLength(2048)
  endpoint!: string;

  @ValidateNested()
  @Type(() => SubscriptionKeysDto)
  keys!: SubscriptionKeysDto;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  userAgent?: string;

  /** Instrumented so the iOS reachability ceiling can be measured. */
  @IsOptional()
  @IsIn(['ios-standalone', 'android', 'desktop', 'other'])
  platform?: string;
}

class RemoveSubscriptionDto {
  @IsString()
  @MaxLength(2048)
  endpoint!: string;
}

class UpdatePrefsDto {
  @IsOptional() @IsBoolean() pushEnabled?: boolean;
  @IsOptional() @IsBoolean() streakReminders?: boolean;
  @IsOptional() @IsBoolean() dailyReminders?: boolean;
  @IsOptional() @IsBoolean() milestones?: boolean;
  @IsOptional() @IsBoolean() reengagement?: boolean;

  /** Minutes from local midnight. */
  @IsOptional() @IsInt() @Min(0) @Max(1439) quietHoursStart?: number;
  @IsOptional() @IsInt() @Min(0) @Max(1439) quietHoursEnd?: number;

  /**
   * Bounded server-side. A learner cannot opt into being spammed, and a client
   * bug cannot turn one account into a firehose.
   */
  @IsOptional() @IsInt() @Min(0) @Max(6) maxPerDay?: number;

  @IsOptional() @IsInt() @Min(0) @Max(23) preferredHour?: number;
}

interface AuthedUser {
  id: string;
}

@Controller('tey')
export class PushController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subscriptions: PushSubscriptionService,
    private readonly webPush: WebPushClient,
    private readonly policy: TeyPolicyService,
    private readonly delivery: TeyDeliveryService,
  ) {}

  /**
   * The VAPID public key the browser needs to subscribe.
   *
   * Public by definition — it is the identity clients verify pushes against.
   * The PRIVATE key never leaves the server.
   */
  @Get('push/public-key')
  publicKey() {
    return { key: this.webPush.publicKey, configured: this.webPush.isConfigured };
  }

  @Post('push/subscriptions')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  async subscribe(@GetUser() user: AuthedUser, @Body() dto: SaveSubscriptionDto) {
    await this.subscriptions.save({
      userId: user.id,
      endpoint: dto.endpoint,
      p256dh: dto.keys.p256dh,
      auth: dto.keys.auth,
      userAgent: dto.userAgent,
      platform: dto.platform,
    });
  }

  @Delete('push/subscriptions')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  async unsubscribe(
    @GetUser() user: AuthedUser,
    @Body() dto: RemoveSubscriptionDto,
  ) {
    await this.subscriptions.remove(user.id, dto.endpoint);
  }

  @Get('preferences')
  @UseGuards(AuthGuard('jwt'))
  async getPreferences(@GetUser() user: AuthedUser) {
    const prefs = await this.policy.prefsFor(user.id);
    const hasSubscription = await this.subscriptions.hasActive(user.id);
    return { prefs, hasSubscription };
  }

  @Post('preferences')
  @UseGuards(AuthGuard('jwt'))
  async updatePreferences(
    @GetUser() user: AuthedUser,
    @Body() dto: UpdatePrefsDto,
  ) {
    const prefs = await this.prisma.teyNotificationPrefs.upsert({
      where: { userId: user.id },
      create: { userId: user.id, ...dto },
      update: dto,
    });
    return { prefs };
  }

  /**
   * Open attribution. Fired by the service worker when a notification is
   * tapped, and by the app when it sees a `?tey=` parameter.
   *
   * Scoped to the caller, so one learner cannot mark another's delivery opened.
   */
  @Post('deliveries/:id/opened')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  async markOpened(@GetUser() user: AuthedUser, @Param('id') id: string) {
    await this.delivery.markOpened(user.id, id);
  }
}
