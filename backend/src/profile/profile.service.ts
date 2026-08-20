import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
   * Checks if a @username is available for this user.
   */
  async checkUsernameAvailability(rawUsername: string, userId: string) {
    const username = rawUsername.trim().toLowerCase().replace(/^@/, '');
    if (!username || username.length < 3 || username.length > 30) {
      return { available: false, message: 'Username must be 3-30 characters.' };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return { available: false, message: 'Only letters, numbers, and underscores.' };
    }
    const existing = await (this.prisma.profile as any).findFirst({
      where: {
        username: { equals: username, mode: 'insensitive' },
        NOT: { userId },
      },
    });
    if (existing) {
      return { available: false, message: 'Username is already taken.' };
    }
    return { available: true, username };
  }

  /**
   * Updates profile and/or user fields in a single transaction.
   * Handles User.fullName, avatarUrl, username checks, and all creator profile fields.
   */
  async updateMyProfile(userId: string, dto: UpdateProfileDto) {
    const { fullName, avatarUrl, username, ...profileFields } = dto;

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

      // Handle username if provided
      const cleanProfileData: any = { ...profileFields };
      if (avatarUrl !== undefined) cleanProfileData.avatarUrl = avatarUrl;

      if (username !== undefined && username !== null) {
        const cleanUsername = username.trim().toLowerCase().replace(/^@/, '');
        if (cleanUsername) {
          const existing = await (tx.profile as any).findFirst({
            where: {
              username: { equals: cleanUsername, mode: 'insensitive' },
              NOT: { userId },
            },
          });
          if (existing) {
            throw new BadRequestException('This username is already taken.');
          }
          cleanProfileData.username = cleanUsername;
          cleanProfileData.usernameLastChangedAt = new Date();
        }
      }

      // Upsert Profile row
      await (tx.profile as any).upsert({
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
