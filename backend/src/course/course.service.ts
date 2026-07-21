import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: {
    search?: string;
    category?: string;
    level?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    const { search, category, level, minPrice, maxPrice } = query;

    return await this.prisma.course.findMany({
      where: {
        published: true,
        AND: [
          search
            ? {
                OR: [
                  { title: { contains: search, mode: 'insensitive' } },
                  {
                    description: { contains: search, mode: 'insensitive' },
                  },
                  {
                    shortDescription: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                ],
              }
            : {},
          category
            ? { category: { equals: category, mode: 'insensitive' } }
            : {},
          level ? { level: { equals: level, mode: 'insensitive' } } : {},
          minPrice !== undefined ? { price: { gte: Number(minPrice) } } : {},
          maxPrice !== undefined ? { price: { lte: Number(maxPrice) } } : {},
        ],
      },
      include: {
        instructor: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(idOrSlug: string) {
    console.log('Searching for course with ID or Slug:', idOrSlug);
    const course = await this.prisma.course.findFirst({
      where: {
        OR: [
          { id: idOrSlug, published: true },
          { slug: idOrSlug, published: true },
        ],
      },
      include: {
        instructor: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
          },
        },
        sections: {
          orderBy: { orderIndex: 'asc' },
          include: {
            lessons: {
              orderBy: { orderIndex: 'asc' },
              include: { resources: true },
            },
          },
        },
      },
    });

    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async getProgress(userId: string, idOrSlug: string) {
    const course = await this.findOne(idOrSlug);
    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId: course.id },
      },
    });

    if (!enrollment) {
      throw new ForbiddenException(
        'You must purchase this course before you can access the learning materials.',
      );
    }
    return {
      progress: enrollment.progress,
      completedLessons: enrollment.completedLessons || [],
    };
  }

  async markLessonComplete(userId: string, idOrSlug: string, lessonId: string) {
    const course = await this.findOne(idOrSlug);
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId: course.id } },
    });

    if (!enrollment) {
      throw new ForbiddenException(
        'You must be enrolled to mark lessons complete.',
      );
    }

    const profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: { userId }, // Prisma uses schema defaults (e.g. 30 XP, 1 freeze, 5 lives)
      update: {},
    });

    const currentCompleted = Array.isArray(enrollment.completedLessons)
      ? (enrollment.completedLessons as string[])
      : [];

    let isNewCompletion = false;
    let xpEarned = 0;
    let sectionCompleted = false;
    let newXpTotal = profile.xp;
    let newStreakDaysTotal = profile.streakDays;

    if (!currentCompleted.includes(lessonId)) {
      isNewCompletion = true;
      currentCompleted.push(lessonId);

      // Fetch the lesson to retrieve its xpReward value
      const lesson = await this.prisma.lesson.findUnique({
        where: { id: lessonId },
        include: { section: { include: { lessons: true } } },
      });

      let baseLessonXp = 10; // Flat 10 XP per lesson completion

      // Check if all lessons in this section are completed
      if (lesson?.section?.lessons) {
        sectionCompleted = lesson.section.lessons.every((l) =>
          currentCompleted.includes(l.id),
        );
      }

      xpEarned = baseLessonXp + (sectionCompleted ? 50 : 0);

      let totalLessons = 0;
      const courseWithLessons = await this.prisma.course.findUnique({
        where: { id: course.id },
        include: {
          sections: {
            include: { lessons: true },
          },
        },
      });

      if (courseWithLessons) {
        totalLessons = courseWithLessons.sections.reduce(
          (acc, s) => acc + s.lessons.length,
          0,
        );
      }
      totalLessons = totalLessons || 1;

      const progress = Math.min(
        100,
        Math.round((currentCompleted.length / totalLessons) * 100),
      );

      await this.prisma.enrollment.update({
        where: { id: enrollment.id },
        data: {
          completedLessons: currentCompleted,
          progress,
        },
      });

      // Update StudentProfile for XP and daily activity streaks
      const now = new Date();
      let newStreak = 1;

      if (profile.lastActiveAt) {
        const lastActive = new Date(profile.lastActiveAt);

        const todayMidnight = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
        ).getTime();
        const lastActiveMidnight = new Date(
          lastActive.getFullYear(),
          lastActive.getMonth(),
          lastActive.getDate(),
        ).getTime();

        const diffDays = Math.round(
          (todayMidnight - lastActiveMidnight) / (1000 * 60 * 60 * 24),
        );

        if (diffDays === 1) {
          newStreak = (profile.streakDays || 0) + 1;
        } else if (diffDays === 0) {
          newStreak = profile.streakDays || 1;
        } else {
          newStreak = 1;
        }
      }

      const updatedProfile = await this.prisma.studentProfile.update({
        where: { userId },
        data: {
          xp: { increment: xpEarned },
          streakDays: newStreak,
          lastActiveAt: now,
        },
      });
      newXpTotal = updatedProfile.xp;
      newStreakDaysTotal = updatedProfile.streakDays;

    }

    return {
      success: true,
      completedLessons: currentCompleted,
      xpEarned: isNewCompletion ? xpEarned : 0,
      // Updated totals — use these to refresh frontend state without extra API call
      newXp: newXpTotal,
      newStreakDays: newStreakDaysTotal,
      sectionCompleted,
    };
  }
  async createCourse(
    userId: string,
    data: { title: string; category: string; creatorTimeWeekly?: string },
  ) {
    // Basic slug generation: lowercasing and replacing non-alphanumeric with hyphens
    const baseSlug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    // Append a simple unique identifier just in case of clashes
    const uniqueHash = crypto.randomBytes(4).toString('hex').substring(0, 6);
    const slug = `${baseSlug}-${uniqueHash}`;

    // Generate a 7 digit numeric ID string (e.g. "7127813")
    const shortId = crypto.randomInt(1000000, 10000000).toString();

    const newCourse = await this.prisma.course.create({
      data: {
        id: shortId,
        title: data.title,
        slug: slug,
        category: data.category,
        creatorTimeWeekly: data.creatorTimeWeekly,
        instructorId: userId,
        description: 'New Course Draft',
        price: 0,
        published: false,
      },
    });

    return newCourse;
  }

  async getInstructorCourses(userId: string) {
    return await this.prisma.course.findMany({
      where: { instructorId: userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        published: true,
        createdAt: true,
        _count: { select: { enrollments: true } },
      },
    });
  }

  async getOwnedDraft(userId: string, courseIdOrSlug: string) {
    const course = await this.prisma.course.findFirst({
      where: {
        OR: [{ id: courseIdOrSlug }, { slug: courseIdOrSlug }],
      },
      include: {
        instructor: { select: { id: true, fullName: true, avatarUrl: true } },
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }
    return course;
  }

  async updateCourse(
    userId: string,
    courseIdOrSlug: string,
    data: {
      title?: string;
      description?: string;
      shortDescription?: string;
      thumbnailUrl?: string;
      price?: number;
      originalPrice?: number;
      level?: string;
      subtitle?: string;
      startingPoint?: string;
      endOutcome?: string;
      realOutputs?: string[];
      subcategory?: string;
      language?: string;
      skills?: string[];
      requirements?: string[];
      outcomes?: string[];
      curriculum?: unknown;
    },
  ) {
    const course = await this.prisma.course.findFirst({
      where: {
        OR: [{ id: courseIdOrSlug }, { slug: courseIdOrSlug }],
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }

    return await this.prisma.course.update({
      where: { id: course.id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.shortDescription !== undefined && {
          shortDescription: data.shortDescription,
        }),
        ...(data.thumbnailUrl !== undefined && {
          thumbnailUrl: data.thumbnailUrl,
        }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.originalPrice !== undefined && {
          originalPrice: data.originalPrice,
        }),
        ...(data.level !== undefined && { level: data.level }),
        ...(data.subtitle !== undefined && { subtitle: data.subtitle }),
        ...(data.startingPoint !== undefined && {
          startingPoint: data.startingPoint,
        }),
        ...(data.endOutcome !== undefined && { endOutcome: data.endOutcome }),
        ...(data.realOutputs !== undefined && {
          realOutputs: data.realOutputs,
        }),
        ...(data.subcategory !== undefined && {
          subcategory: data.subcategory,
        }),
        ...(data.language !== undefined && { language: data.language }),
        ...(data.skills !== undefined && { skills: data.skills }),
        ...(data.requirements !== undefined && {
          requirements: data.requirements,
        }),
        ...(data.outcomes !== undefined && { outcomes: data.outcomes }),
        ...(data.curriculum !== undefined && {
          curriculum: data.curriculum as any,
        }),
      },
    });
  }

  async deleteCourse(userId: string, courseIdOrSlug: string) {
    const course = await this.prisma.course.findFirst({
      where: {
        OR: [{ id: courseIdOrSlug }, { slug: courseIdOrSlug }],
      },
    });

    if (!course) throw new NotFoundException('Course not found');
    if (course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }

    return await this.prisma.course.delete({
      where: { id: course.id },
    });
  }

  // ─── CURRICULUM MANAGEMENT ───

  async getFullCurriculum(userId: string, courseIdOrSlug: string) {
    const course = await this.getOwnedDraft(userId, courseIdOrSlug);
    return await this.prisma.section.findMany({
      where: { courseId: course.id },
      orderBy: { orderIndex: 'asc' },
      include: {
        lessons: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });
  }

  async createSection(userId: string, courseId: string, title: string) {
    const trimmedTitle = (title || '').trim();
    if (!trimmedTitle) throw new Error('Module title is required');

    const course = await this.getOwnedDraft(userId, courseId);

    return await this.prisma.$transaction(async (tx) => {
      const count = await tx.section.count({ where: { courseId: course.id } });
      return await tx.section.create({
        data: {
          title: trimmedTitle,
          orderIndex: count,
          courseId: course.id,
        },
        include: { lessons: true },
      });
    });
  }

  async updateSection(userId: string, sectionId: string, title: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: { course: true },
    });

    if (!section) throw new NotFoundException('Section not found');
    if (section.course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }

    return await this.prisma.section.update({
      where: { id: sectionId },
      data: { title },
    });
  }

  async deleteSection(userId: string, sectionId: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: { course: true },
    });

    if (!section) throw new NotFoundException('Section not found');
    if (section.course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }

    return await this.prisma.section.delete({
      where: { id: sectionId },
    });
  }

  async createLesson(
    userId: string,
    sectionId: string,
    title: string,
    lessonType?: string,
  ) {
    // Validate and sanitize title
    const trimmedTitle = (title || '').trim();
    if (!trimmedTitle) {
      throw new Error('Lesson title is required');
    }
    if (trimmedTitle.length > 100) {
      throw new Error('Lesson title must be 100 characters or less');
    }

    // Validate lessonType against allowed values
    const ALLOWED_TYPES = ['video', 'text', 'quiz', 'assignment', 'project', 'audio', 'download', 'link', 'live', 'reflection'];
    const safeType = ALLOWED_TYPES.includes(lessonType || '') ? lessonType : 'video';

    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: { course: { select: { instructorId: true } } },
    });

    if (!section) throw new NotFoundException('Section not found');
    if (section.course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }

    // Use transaction to atomically count + create (prevents orderIndex races)
    return await this.prisma.$transaction(async (tx) => {
      const count = await tx.lesson.count({ where: { sectionId } });

      return await tx.lesson.create({
        data: {
          title: trimmedTitle,
          lessonType: safeType,
          orderIndex: count,
          sectionId,
          status: 'draft',
          contentBlocks: {},
          stepCompletion: { learn: false, apply: false, reflect: false, deepen: false },
        },
      });
    });
  }

  async updateLesson(
    userId: string,
    lessonId: string,
    data: {
      title?: string;
      description?: string;
      videoUrl?: string;
      durationMinutes?: number;
      isFreePreview?: boolean;
    },
  ) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { section: { include: { course: true } } },
    });

    if (!lesson) throw new NotFoundException('Lesson not found');
    if (lesson.section.course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }

    return await this.prisma.lesson.update({
      where: { id: lessonId },
      data,
    });
  }

  async deleteLesson(userId: string, lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { section: { include: { course: true } } },
    });

    if (!lesson) throw new NotFoundException('Lesson not found');
    if (lesson.section.course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }

    return await this.prisma.lesson.delete({
      where: { id: lessonId },
    });
  }
}
