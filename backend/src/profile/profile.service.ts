import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

// Shape of one step's answers coming from the onboarding localStorage payload
interface OnboardingPayload {
  draftId?: string;
  step2?: { creatorType?: string };
  step3?: { categories?: string[] };
  step4?: { audienceSize?: string };
  step5?: { platforms?: string[] };
  step6?: { existingContent?: string[] };
  step7?: { biggestChallenge?: string };
  step8?: { teachingStyle?: string };
  step9?: { weeklyHours?: string };
  step12?: { launchGoal?: string };
  step13?: { bio?: string };
}

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  /**
   * Returns the full creator profile merged with User fields.
   * Used by GET /profile/me and enriched GET /auth/me.
   */
  async getMyProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) throw new NotFoundException('User not found');

    const [followersCount, followingCount] = await Promise.all([
      this.prisma.userFollow.count({ where: { followingId: userId } }),
      this.prisma.userFollow.count({ where: { followerId: userId } }),
    ]);

    return {
      ...user,
      followersCount,
      followingCount,
    };
  }

  /**
   * Updates profile and/or user fields in a single transaction.
   * Handles User.fullName and User.avatarUrl updates.
   */
  async updateMyProfile(userId: string, dto: UpdateProfileDto) {
    const { fullName, avatarUrl, ...profileFields } = dto;

    await this.prisma.$transaction(async (tx) => {
      // Update User fields if provided
      const userUpdates: any = {};
      if (fullName !== undefined) userUpdates.fullName = fullName;
      if (avatarUrl !== undefined) userUpdates.avatarUrl = avatarUrl;

      if (Object.keys(userUpdates).length > 0) {
        await tx.user.update({
          where: { id: userId },
          data: userUpdates,
        });
      }

      // Upsert Profile row
      const cleanProfileData = avatarUrl !== undefined ? { avatarUrl, ...profileFields } : profileFields;
      await tx.profile.upsert({
        where: { userId },
        create: { userId, ...cleanProfileData },
        update: cleanProfileData,
      });
    });

    return this.getMyProfile(userId);
  }

  /**
   * Permanently deletes the user account (cascades to Profile, Enrollments, etc).
   */
  async deleteMyAccount(userId: string) {
    await this.prisma.user.delete({ where: { id: userId } });
    return { message: 'Account deleted successfully' };
  }

  /**
   * Hydrates the creator Profile from their onboarding answers.
   * Called automatically by AuthService after a successful creator signup.
   *
   * Maps step answers → profile fields:
   *   step3.categories[0]   → niche
   *   step3.categories      → subCategories
   *   step4.audienceSize    → audienceSize
   *   step5.platforms       → platforms
   *   step7.biggestChallenge → biggestChallenge
   *   step8.teachingStyle   → teachingStyle
   *   step9.weeklyHours     → weeklyHours
   *   step12.launchGoal     → launchGoal
   *   step13.bio            → bio
   */
  async hydrateFromOnboarding(userId: string, data: OnboardingPayload) {
    const profileData = {
      niche: data.step3?.categories?.[0] ?? null,
      subCategories: data.step3?.categories ?? [],
      audienceSize: data.step4?.audienceSize ?? null,
      platforms: data.step5?.platforms ?? [],
      biggestChallenge: data.step7?.biggestChallenge ?? null,
      teachingStyle: data.step8?.teachingStyle ?? null,
      weeklyHours: data.step9?.weeklyHours ?? null,
      launchGoal: data.step12?.launchGoal ?? null,
      bio: data.step13?.bio ?? null,
    };

    // Remove null entries so we don't overwrite existing data
    const cleanData = Object.fromEntries(
      Object.entries(profileData).filter(([, v]) => v !== null && v !== undefined)
    );

    if (Object.keys(cleanData).length === 0) return;

    await this.prisma.profile.upsert({
      where: { userId },
      create: { userId, ...cleanData },
      update: cleanData,
    });
  }
}
