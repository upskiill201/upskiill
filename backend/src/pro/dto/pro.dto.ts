import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsIn,
  IsISO8601,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { PAYWALL_MOMENTS } from '../pro.config';

const PLANS = ['MONTHLY', 'YEARLY'] as const;

export class SubscribeDto {
  @IsIn(PLANS)
  plan: 'MONTHLY' | 'YEARLY';

  @Matches(/^ctoken_[A-Za-z0-9]+$/)
  confirmationTokenId: string;

  @IsUUID('4')
  attemptId: string;

  @IsBoolean()
  expectTrial: boolean;

  @IsOptional()
  @IsUUID()
  offerId?: string;

  @IsOptional()
  @IsString()
  @Length(1, 64)
  paywallSessionId?: string;

  @IsOptional()
  @IsIn(PAYWALL_MOMENTS)
  moment?: string;

  /** App-relative path for 3DS redirects; resolved against the allowlist. */
  @IsOptional()
  @Matches(/^\/(?!\/)[A-Za-z0-9\-._~/?=&%]*$/)
  @MaxLength(200)
  returnPath?: string;
}

export class FinalizeDto {
  @IsUUID('4')
  attemptId: string;
}

export const PAYWALL_EVENT_TYPES = [
  'VIEW',
  'CLOSE',
  'PLAN_SELECT',
  'SHEET_OPEN',
  'SHEET_CLOSE',
  'PAYMENT_SUBMIT',
  'PAYMENT_FAILED',
  'PAYMENT_SUCCEEDED',
  'OFFER_SHOWN',
  'OFFER_ACCEPTED',
  'OFFER_DISMISSED',
  'RECOVERY_SHOWN',
  'RECOVERY_ACCEPTED',
  'RECOVERY_DISMISSED',
  'SURVEY_SHOWN',
  'MOBILE_MONEY_OPEN',
] as const;

export class PaywallEventDto {
  @IsString()
  @Length(1, 64)
  sessionId: string;

  @IsIn(PAYWALL_MOMENTS)
  moment: string;

  @IsIn(PAYWALL_EVENT_TYPES)
  type: string;

  @IsOptional()
  @IsIn(PLANS)
  plan?: string;

  @IsOptional()
  @IsUUID()
  offerId?: string;

  @IsOptional()
  @IsUUID('4')
  attemptId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  variant?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  errorCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  declineCode?: string;

  @IsOptional()
  @IsObject()
  meta?: Record<string, unknown>;

  @IsOptional()
  @IsISO8601()
  clientTs?: string;
}

export class PaywallEventsDto {
  @ValidateNested({ each: true })
  @Type(() => PaywallEventDto)
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  events: PaywallEventDto[];
}

export class ExitSurveyDto {
  @IsString()
  @Length(1, 64)
  sessionId: string;

  @IsIn(['TOO_EXPENSIVE', 'NOT_SURE', 'JUST_LOOKING', 'DECIDE_LATER', 'OTHER'])
  reason: 'TOO_EXPENSIVE' | 'NOT_SURE' | 'JUST_LOOKING' | 'DECIDE_LATER' | 'OTHER';

  @IsOptional()
  @IsString()
  @MaxLength(500)
  freeText?: string;

  @IsOptional()
  @IsIn(PLANS)
  plan?: string;

  @IsOptional()
  @IsIn(PAYWALL_MOMENTS)
  moment?: string;
}

export class PortalDto {
  @IsOptional()
  @IsIn(['payment_method_update', 'manage'])
  flow?: 'payment_method_update' | 'manage';

  @IsOptional()
  @Matches(/^\/(?!\/)[A-Za-z0-9\-._~/?=&%]*$/)
  @MaxLength(200)
  returnPath?: string;
}

export class MobileMoneyDto {
  @IsIn(PLANS)
  plan: 'MONTHLY' | 'YEARLY';

  @IsString()
  @Length(6, 20)
  phone: string;

  @IsString()
  @Length(2, 20)
  service: string;

  @IsOptional()
  @Matches(/^[A-Z]{2}$/)
  country?: string;
}
