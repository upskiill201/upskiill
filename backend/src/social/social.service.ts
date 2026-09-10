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