import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    const { search, category, minPrice, maxPrice } = query;

    return await this.prisma.course.findMany({
      where: {
        published: true,
        AND: [
          search
            ? {
                OR: [
                  { title: { contains: search, mode: 'insensitive' } },
                  { description: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {},
          category
            ? { description: { contains: category, mode: 'insensitive' } }
            : {}, // Temporary category mapping
          minPrice ? { price: { gte: Number(minPrice) } } : {},
          maxPrice ? { price: { lte: Number(maxPrice) } } : {},
        ],
      },
      include: {
        // We will add instructor details later
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.course.findUnique({
      where: { id },
    });
  }
}
