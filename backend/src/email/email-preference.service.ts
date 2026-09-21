import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailCategory, isAlwaysOn } from './types';

const CATEGORY_FIELD: Partial<Record<EmailCategory, string>> = {
  [EmailCategory.MARKETING]: 'marketingOptOut',
  [EmailCategory.CONVERSION]: 'marketingOptOut',
  [EmailCategory.ENGAGEMENT]: 'learningRemindersOptOut',
  [EmailCategory.REENGAGEMENT]: 'reengagementOptOut',
};

@Injectable()
export class EmailPreferenceService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Category eligibility. TRANSACTIONAL/SECURITY are never gated by
   * preference — spec §17 "do not accidentally unsubscribe users from
   * essential security/account emails". A missing row means "everything on"
   * (safe default, see EmailPreference's schema comment).
   */
  async isEligible(
    userId: string,
    category: EmailCategory,
    options?: {
      streak?: boolean;
      progress?: boolean;
      league?: boolean;
      digest?: boolean;
      creatorDigest?: boolean;
    },
  ): Promise<boolean> {
    if (isAlwaysOn(category)) return true;

    const pref = await this.prisma.emailPreference.findUnique({
      where: { userId },
    });
    if (!pref) return true;

    if (options?.streak && pref.streakRemindersOptOut) return false;
    if (options?.progress && pref.progressEmailsOptOut) return false;
    if (options?.league && pref.leagueEmailsOptOut) return false;
    if (options?.digest && pref.weeklyDigestOptOut) return false;
    if (options?.creatorDigest && pref.creatorDigestOptOut) return false;

    const field = CATEGORY_FIELD[category];
    if (field && (pref as unknown as Record<string, boolean>)[field])
      return false;

    return true;
  }

  /** Raw flag snapshot for the preferences page — missing row = everything on. */
  async readAllFlags(userId: string): Promise<Record<string, boolean>> {
    const pref = await this.prisma.emailPreference.findUnique({
      where: { userId },
    });
    return {
      marketingOptOut: pref?.marketingOptOut ?? false,
      learningRemindersOptOut: pref?.learningRemindersOptOut ?? false,
      streakRemindersOptOut: pref?.streakRemindersOptOut ?? false,
      progressEmailsOptOut: pref?.progressEmailsOptOut ?? false,
      leagueEmailsOptOut: pref?.leagueEmailsOptOut ?? false,
      weeklyDigestOptOut: pref?.weeklyDigestOptOut ?? false,
      reengagementOptOut: pref?.reengagementOptOut ?? false,
      creatorDigestOptOut: pref?.creatorDigestOptOut ?? false,
    };
  }

  async setCategory(
    userId: string,
    field: keyof CategoryUpdate,
    value: boolean,
  ): Promise<void> {
    await this.prisma.emailPreference.upsert({
      where: { userId },
      create: { userId, [field]: value },
      update: { [field]: value },
    });
  }

  /** One-click "unsubscribe from everything marketing/lifecycle" — spec §18. */
  async unsubscribeAll(userId: string): Promise<void> {
    await this.prisma.emailPreference.upsert({
      where: { userId },
      create: {
        userId,
        marketingOptOut: true,
        learningRemindersOptOut: true,
        streakRemindersOptOut: true,
        progressEmailsOptOut: true,
        leagueEmailsOptOut: true,
        weeklyDigestOptOut: true,
        reengagementOptOut: true,
        creatorDigestOptOut: true,
      },
      update: {
        marketingOptOut: true,
        learningRemindersOptOut: true,
        streakRemindersOptOut: true,
        progressEmailsOptOut: true,
        leagueEmailsOptOut: true,
        weeklyDigestOptOut: true,
        reengagementOptOut: true,
        creatorDigestOptOut: true,
      },
    });
  }
}

type CategoryUpdate = {
  marketingOptOut: boolean;
  learningRemindersOptOut: boolean;
  streakRemindersOptOut: boolean;
  progressEmailsOptOut: boolean;
  leagueEmailsOptOut: boolean;
  weeklyDigestOptOut: boolean;
  reengagementOptOut: boolean;
  creatorDigestOptOut: boolean;
};
