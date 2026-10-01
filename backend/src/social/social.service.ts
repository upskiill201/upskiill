import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SocialService {
  constructor(private prisma: PrismaService) {}

  /**
   * Follows another user.
   */
  async followUser(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw new BadRequestException("You cannot follow yourself.");
    }

    const targetUser = await this.prisma.user.findUnique({
      where: { id: followingId },
    });
    if (!targetUser) {
      throw new NotFoundException("User to follow not found.");
    }

    const existing = await this.prisma.userFollow.findUnique({
      where: { followerId_followingId: { followerId, followingId } },
    });
    await this.prisma.userFollow.upsert({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
      create: {
        followerId,
        followingId,
      },
      update: {},
    });

    // "Kemi started following you" — Duolingo's friend nudge. Only for a new
    // follow, and at most once a day per pair, so follow/unfollow toggling
    // can't spam anyone.
    if (!existing) {
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const recent = await this.prisma.notification.findFirst({
        where: { userId: followingId, actorId: followerId, type: "FOLLOW", createdAt: { gte: since } },
        select: { id: true },
      });
      if (!recent) {
        await this.prisma.notification
          .create({
            data: {
              userId: followingId,
              actorId: followerId,
              type: "FOLLOW",
              entityType: "USER",
              entityId: followerId,
              deepLink: `/dashboard/u/${followerId}`,
            },
          })
          .catch(() => undefined);
      }
    }

    return this.getSocialCounts(followerId);
  }

  /**
   * Unfollows another user.
   */
  async unfollowUser(followerId: string, followingId: string) {
    try {
      await this.prisma.userFollow.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });
    } catch {
      // Ignore if relationship didn't exist
    }

    return this.getSocialCounts(followerId);
  }

  /**
   * Gets real follower & following counts for a user.
   */
  async getSocialCounts(userId: string) {
    const [followersCount, followingCount] = await Promise.all([
      this.prisma.userFollow.count({ where: { followingId: userId } }),
      this.prisma.userFollow.count({ where: { followerId: userId } }),
    ]);

    return { followersCount, followingCount };
  }

  /**
   * Returns list of users who follow the target user.
   */
  async getFollowers(targetUserId: string, currentUserId: string) {
    const records = await this.prisma.userFollow.findMany({
      where: { followingId: targetUserId },
      include: {
        follower: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            studentProfile: {
              select: {
                streakDays: true,
                xp: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Check which of these users currentUserId follows back
    const currentUserFollowingIds = new Set(
      (
        await this.prisma.userFollow.findMany({
          where: { followerId: currentUserId },
          select: { followingId: true },
        })
      ).map((f) => f.followingId),
    );

    return records.map((r) => ({
      id: r.follower.id,
      name: r.follower.fullName,
      avatar: r.follower.avatarUrl,
      streak: r.follower.studentProfile?.streakDays ?? 0,
      xp: r.follower.studentProfile?.xp ?? 0,
      isFollowing: currentUserFollowingIds.has(r.follower.id),
    }));
  }

  /**
   * Returns list of users the target user is following.
   */
  async getFollowing(targetUserId: string, currentUserId: string) {
    const records = await this.prisma.userFollow.findMany({
      where: { followerId: targetUserId },
      include: {
        following: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            studentProfile: {
              select: {
                streakDays: true,
                xp: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const currentUserFollowingIds = new Set(
      (
        await this.prisma.userFollow.findMany({
          where: { followerId: currentUserId },
          select: { followingId: true },
        })
      ).map((f) => f.followingId),
    );

    return records.map((r) => ({
      id: r.following.id,
      name: r.following.fullName,
      avatar: r.following.avatarUrl,
      streak: r.following.studentProfile?.streakDays ?? 0,
      xp: r.following.studentProfile?.xp ?? 0,
      isFollowing: currentUserFollowingIds.has(r.following.id),
    }));
  }

  /**
   * A learner's public card — what a classmate sees when they tap someone's
   * avatar in a community, feed or leaderboard (Duolingo's friend profile).
   * Signed-in viewers only, looked up by id only, and it never carries an
   * email, so it can't be used to probe who has an account.
   */
  async getLearnerProfile(targetUserId: string, viewerId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: targetUserId },
      select: {
        id: true,
        fullName: true,
        avatarUrl: true,
        createdAt: true,
        profile: { select: { username: true, bio: true, location: true, avatarUrl: true } },
        studentProfile: {
          select: {
            xp: true,
            streakDays: true,
            longestStreak: true,
            leagueTier: true,
            tournamentWins: true,
            achievements: true,
          },
        },
      },
    });
    if (!user) throw new NotFoundException("Learner not found.");

    const [counts, iFollow, followsMe, theirCourses, myCourses] = await Promise.all([
      this.getSocialCounts(targetUserId),
      viewerId === targetUserId
        ? Promise.resolve(null)
        : this.prisma.userFollow.findUnique({
            where: { followerId_followingId: { followerId: viewerId, followingId: targetUserId } },
            select: { followerId: true },
          }),
      viewerId === targetUserId
        ? Promise.resolve(null)
        : this.prisma.userFollow.findUnique({
            where: { followerId_followingId: { followerId: targetUserId, followingId: viewerId } },
            select: { followerId: true },
          }),
      this.prisma.enrollment.findMany({
        where: { userId: targetUserId },
        select: { courseId: true, progress: true, course: { select: { id: true, title: true, thumbnailUrl: true } } },
        orderBy: { updatedAt: "desc" },
        take: 50,
      }),
      this.prisma.enrollment.findMany({ where: { userId: viewerId }, select: { courseId: true } }),
    ]);

    const mine = new Set(myCourses.map((e) => e.courseId));
    const sp = user.studentProfile;
    const unlocked = Array.isArray(sp?.achievements) ? (sp!.achievements as unknown[]).length : 0;

    return {
      id: user.id,
      fullName: user.fullName,
      username: user.profile?.username ?? null,
      avatarUrl: user.profile?.avatarUrl ?? user.avatarUrl ?? null,
      bio: user.profile?.bio ?? null,
      location: user.profile?.location ?? null,
      joinedAt: user.createdAt,
      isMe: viewerId === targetUserId,
      isFollowing: !!iFollow,
      followsYou: !!followsMe,
      followersCount: counts.followersCount,
      followingCount: counts.followingCount,
      stats: {
        xp: sp?.xp ?? 0,
        streakDays: sp?.streakDays ?? 0,
        longestStreak: sp?.longestStreak ?? 0,
        leagueTier: sp?.leagueTier ?? "BRONZE",
        tournamentWins: sp?.tournamentWins ?? 0,
        achievementsUnlocked: unlocked,
        coursesCount: theirCourses.length,
      },
      // Courses you're both taking — the reason to follow a classmate.
      sharedCourses: theirCourses
        .filter((e) => mine.has(e.courseId))
        .slice(0, 6)
        .map((e) => ({ id: e.course.id, title: e.course.title, thumbnailUrl: e.course.thumbnailUrl, progress: e.progress })),
    };
  }

  /**
   * Returns list of classmates sharing enrolled courses with the current user.
   */
  async getClassmates(currentUserId: string) {
    // Get user's enrolled course IDs
    const myEnrollments = await this.prisma.enrollment.findMany({
      where: { userId: currentUserId },
      select: { courseId: true },
    });
    const courseIds = myEnrollments.map((e) => e.courseId);

    // Find other students enrolled in any of those courses
    const classmateEnrollments = await this.prisma.enrollment.findMany({
      where: {
        courseId: { in: courseIds.length > 0 ? courseIds : ["__none__"] },
        userId: { not: currentUserId },
      },
      include: {
        course: { select: { title: true } },
        user: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            studentProfile: {
              select: {
                streakDays: true,
                xp: true,
              },
            },
          },
        },
      },
      take: 20,
    });

    // Check which classmates currentUserId follows
    const myFollowing = new Set(
      (
        await this.prisma.userFollow.findMany({
          where: { followerId: currentUserId },
          select: { followingId: true },
        })
      ).map((f) => f.followingId),
    );

    return classmateEnrollments.map((e) => ({
      id: e.user.id,
      name: e.user.fullName,
      avatar: e.user.avatarUrl,
      course: e.course.title,
      streak: e.user.studentProfile?.streakDays ?? 0,
      xp: e.user.studentProfile?.xp ?? 0,
      isFollowing: myFollowing.has(e.user.id),
    }));
  }
}