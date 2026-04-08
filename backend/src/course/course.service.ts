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
      if (Array.isArray(course.curriculum)) {
        totalLessons = course.curriculum.reduce(
          (acc: number, section: any) => acc + (section.lessons?.length || 0),
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

    const newCourse = await this.prisma.course.create({
      data: {
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
}
