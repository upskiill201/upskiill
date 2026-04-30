import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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

    const currentCompleted = Array.isArray(enrollment.completedLessons)
      ? (enrollment.completedLessons as string[])
      : [];

    if (!currentCompleted.includes(lessonId)) {
      currentCompleted.push(lessonId);

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
          (acc, section) => acc + section.lessons.length,
          0,
        );
      }
      totalLessons = totalLessons || 1; // Fallback to 1

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
    }

    return { success: true, completedLessons: currentCompleted };
  }
  async createCourse(userId: string, data: { title: string; category: string; creatorTimeWeekly?: string }) {
    // Basic slug generation: lowercasing and replacing non-alphanumeric with hyphens
    const baseSlug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
      
    // Append a simple unique identifier just in case of clashes
    const uniqueHash = Math.random().toString(36).substring(2, 8);
    const slug = `${baseSlug}-${uniqueHash}`;

    // Generate a 7 digit numeric ID string (e.g. "7127813")
    const shortId = Math.floor(1000000 + Math.random() * 9000000).toString();

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
        OR: [
          { id: courseIdOrSlug },
          { slug: courseIdOrSlug }
        ]
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
      whatYouWillLearn?: string[];
      requirements?: string[];
      targetAudience?: string[];
      curriculum?: unknown;
    },
  ) {
    const course = await this.prisma.course.findFirst({ 
      where: { 
        OR: [
          { id: courseIdOrSlug },
          { slug: courseIdOrSlug }
        ]
      } 
    });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }

    return await this.prisma.course.update({
      where: { id: course.id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.shortDescription !== undefined && { shortDescription: data.shortDescription }),
        ...(data.thumbnailUrl !== undefined && { thumbnailUrl: data.thumbnailUrl }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.originalPrice !== undefined && { originalPrice: data.originalPrice }),
        ...(data.level !== undefined && { level: data.level }),
        ...(data.whatYouWillLearn !== undefined && { whatYouWillLearn: data.whatYouWillLearn }),
        ...(data.requirements !== undefined && { requirements: data.requirements }),
        ...(data.targetAudience !== undefined && { targetAudience: data.targetAudience }),
        ...(data.curriculum !== undefined && { curriculum: data.curriculum as any }),
      },
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
    const course = await this.getOwnedDraft(userId, courseId);
    
    // Auto-calculate orderIndex
    const count = await this.prisma.section.count({
      where: { courseId: course.id }
    });

    return await this.prisma.section.create({
      data: {
        title,
        orderIndex: count,
        courseId: course.id
      }
    });
  }

  async updateSection(userId: string, sectionId: string, title: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: { course: true }
    });

    if (!section) throw new NotFoundException('Section not found');
    if (section.course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }

    return await this.prisma.section.update({
      where: { id: sectionId },
      data: { title }
    });
  }

  async deleteSection(userId: string, sectionId: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: { course: true }
    });

    if (!section) throw new NotFoundException('Section not found');
    if (section.course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }

    return await this.prisma.section.delete({
      where: { id: sectionId }
    });
  }

  async createLesson(userId: string, sectionId: string, title: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: { course: true }
    });

    if (!section) throw new NotFoundException('Section not found');
    if (section.course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }

    const count = await this.prisma.lesson.count({
      where: { sectionId }
    });

    return await this.prisma.lesson.create({
      data: {
        title,
        orderIndex: count,
        sectionId
      }
    });
  }

  async updateLesson(userId: string, lessonId: string, data: { 
    title?: string; 
    description?: string; 
    videoUrl?: string; 
    durationMinutes?: number; 
    isFreePreview?: boolean; 
  }) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { section: { include: { course: true } } }
    });

    if (!lesson) throw new NotFoundException('Lesson not found');
    if (lesson.section.course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }

    return await this.prisma.lesson.update({
      where: { id: lessonId },
      data
    });
  }

  async deleteLesson(userId: string, lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { section: { include: { course: true } } }
    });

    if (!lesson) throw new NotFoundException('Lesson not found');
    if (lesson.section.course.instructorId !== userId) {
      throw new ForbiddenException('You do not own this course');
    }

    return await this.prisma.lesson.delete({
      where: { id: lessonId }
    });
  }
}
