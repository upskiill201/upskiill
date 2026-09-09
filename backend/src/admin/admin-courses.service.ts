import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CourseService } from '../course/course.service';

const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 25;
const HISTORY_LIMIT = 20;

export interface ListCoursesQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  status?: 'published' | 'unpublished' | '';
  category?: string;
  sortBy?: 'newest' | 'oldest' | 'students' | 'rating';
}

/**
 * Backend for /admin/courses — list, detail, and the course-lifecycle
 * actions that fit the ACTUAL database model. Course only has one real
 * lifecycle field, `published` (a boolean, plus the new admin-only
 * `featured` flag this phase adds) — there is no approve/reject/archive
 * state anywhere in the schema. Building "approve/reject" here would mean
 * inventing a moderation workflow that doesn't exist and conceptually
 * belongs to the Moderation phase, not Courses — deliberately not done.
 *
 * publish/unpublish are NOT reimplemented here: they call straight into
 * CourseService#publishCourse / #unpublishCourse (now admin-overridable,
 * mirroring the existing enrollInCourse(..., isAdmin) pattern) so the
 * quality gate a creator faces — no empty modules, no draft lessons — is
 * the exact same gate an admin faces. No duplicated business logic.
 */
@Injectable()
export class AdminCoursesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly courseService: CourseService,
  ) {}

  async list(query: ListCoursesQuery) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(
        1,
        parseInt(query.pageSize ?? String(DEFAULT_PAGE_SIZE), 10) ||
          DEFAULT_PAGE_SIZE,
      ),
    );

    const where: Prisma.CourseWhereInput = {};

    if (query.search?.trim()) {
      const term = query.search.trim();
      where.OR = [
        { title: { contains: term, mode: 'insensitive' } },
        { instructor: { fullName: { contains: term, mode: 'insensitive' } } },
        { instructor: { email: { contains: term, mode: 'insensitive' } } },
      ];
    }

    if (query.status === 'published') where.published = true;
    else if (query.status === 'unpublished') where.published = false;

    if (query.category) where.category = query.category;

    const orderBy: Prisma.CourseOrderByWithRelationInput =
      query.sortBy === 'students'
        ? { studentsCount: 'desc' }
        : query.sortBy === 'rating'
          ? { rating: 'desc' }
          : query.sortBy === 'oldest'
            ? { createdAt: 'asc' }
            : { createdAt: 'desc' };

    const [items, total, categories] = await Promise.all([
      this.prisma.course.findMany({
        where,
        select: {
          id: true,
          title: true,
          slug: true,
          thumbnailUrl: true,
          price: true,
          published: true,
          featured: true,
          category: true,
          level: true,
          rating: true,
          reviewsCount: true,
          studentsCount: true,
          createdAt: true,
          instructor: { select: { id: true, fullName: true, email: true } },
        },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.course.count({ where }),
      // Full distinct list (not just this page) so filter options don't
      // shift as the caller filters/paginates. Cheap: one column, one index.
      this.prisma.course.findMany({
        distinct: ['category'],
        select: { category: true },
        orderBy: { category: 'asc' },
      }),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
      categories: categories.map((c) => c.category),
    };
  }

  async detail(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        thumbnailUrl: true,
        price: true,
        originalPrice: true,
        published: true,
        featured: true,
        category: true,
        level: true,
        duration: true,
        language: true,
        rating: true,
        reviewsCount: true,
        studentsCount: true,
        version: true,
        createdAt: true,
        updatedAt: true,
        instructor: {
          select: { id: true, fullName: true, email: true, avatarUrl: true },
        },
        sections: {
          select: { id: true, lessons: { select: { id: true, status: true } } },
        },
      },
    });
    if (!course) throw new NotFoundException('Course not found');

    const { sections, ...courseFields } = course;
    const lessons = sections.flatMap((s) => s.lessons);

    const [enrollments, revenue, adminHistory] = await Promise.all([
      this.prisma.enrollment.count({ where: { courseId: id } }),
      this.prisma.earningsTransaction.aggregate({
        where: { courseId: id },
        _sum: {
          netMinor: true,
          creatorAmountMinor: true,
          teyroAmountMinor: true,
        },
        _count: { _all: true },
      }),
      this.prisma.adminAuditLog.findMany({
        where: { entityType: 'Course', entityId: id },
        orderBy: { createdAt: 'desc' },
        take: HISTORY_LIMIT,
      }),
    ]);

    return {
      course: courseFields,
      content: {
        sectionsCount: sections.length,
        lessonsCount: lessons.length,
        publishedLessonsCount: lessons.filter((l) => l.status === 'published')
          .length,
      },
      enrollments,
      revenue: {
        netMinor: revenue._sum.netMinor ?? 0,
        creatorAmountMinor: revenue._sum.creatorAmountMinor ?? 0,
        teyroAmountMinor: revenue._sum.teyroAmountMinor ?? 0,
        transactionCount: revenue._count._all,
      },
      adminHistory,
    };
  }

  async publish(actorId: string, id: string) {
    // isAdmin=true skips the ownership check inside publishCourse but keeps
    // its quality gate (no empty modules, no draft lessons) fully enforced —
    // an admin should not be able to force-publish a broken course either.
    await this.courseService.publishCourse(actorId, id, true);
    await this.prisma.adminAuditLog.create({
      data: {
        actorId,
        action: 'ADMIN_PUBLISHED_COURSE',
        entityType: 'Course',
        entityId: id,
      },
    });
    return { published: true };
  }

  async unpublish(actorId: string, id: string) {
    await this.courseService.unpublishCourse(actorId, id, true);
    await this.prisma.adminAuditLog.create({
      data: {
        actorId,
        action: 'ADMIN_UNPUBLISHED_COURSE',
        entityType: 'Course',
        entityId: id,
      },
    });
    return { published: false };
  }

  async feature(actorId: string, id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      select: { published: true, featured: true },
    });
    if (!course) throw new NotFoundException('Course not found');
    if (!course.published) {
      throw new BadRequestException('Only a published course can be featured');
    }
    if (course.featured) {
      throw new BadRequestException('This course is already featured');
    }

    await this.prisma.$transaction([
      this.prisma.course.update({ where: { id }, data: { featured: true } }),
      this.prisma.adminAuditLog.create({
        data: {
          actorId,
          action: 'ADMIN_FEATURED_COURSE',
          entityType: 'Course',
          entityId: id,
        },
      }),
    ]);
    return { featured: true };
  }

  async unfeature(actorId: string, id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      select: { featured: true },
    });
    if (!course) throw new NotFoundException('Course not found');
    if (!course.featured) {
      throw new BadRequestException('This course is not featured');
    }

    await this.prisma.$transaction([
      this.prisma.course.update({ where: { id }, data: { featured: false } }),
      this.prisma.adminAuditLog.create({
        data: {
          actorId,
          action: 'ADMIN_UNFEATURED_COURSE',
          entityType: 'Course',
          entityId: id,
        },
      }),
    ]);
    return { featured: false };
  }
}
