import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckoutDto } from './dto/checkout.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async checkout(userId: string | null, checkoutDto: CheckoutDto) {
    const { courseIds, email, fullName } = checkoutDto;

    if (courseIds.length === 0) {
      throw new BadRequestException('Empty cart');
    }

    // 1. Resolve User (if userId is null, handle guest/new user)
    let finalUserId = userId;

    if (!finalUserId) {
      if (!email || !fullName) {
        throw new BadRequestException(
          'Email and Full Name are required for guest checkout',
        );
      }

      // Check if user already exists
      let user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        // Create a basic user account for the guest
        user = await this.prisma.user.create({
          data: {
            email,
            fullName,
            password: 'guest_password_' + Math.random().toString(36).slice(-8), // Temporary password
            role: 'STUDENT',
          },
        });
      }
      finalUserId = user.id;
    }

    // 2. Fetch courses to get current prices
    const courses = await this.prisma.course.findMany({
      where: { id: { in: courseIds } },
    });

    if (courses.length !== courseIds.length) {
      throw new BadRequestException('One or more invalid course IDs');
    }

    // 3. Check for existing enrollments
    const existingEnrollments = await this.prisma.enrollment.findMany({
      where: {
        userId: finalUserId,
        courseId: { in: courseIds },
      },
    });

    if (existingEnrollments.length > 0) {
      const enrolledCourseIds = existingEnrollments.map((e) => e.courseId);
      throw new BadRequestException(
        `User is already enrolled in courses: ${enrolledCourseIds.join(', ')}`,
      );
    }

    const totalAmount = courses.reduce((sum, c) => sum + c.price, 0);

    // 4. Create Order, OrderItems, and Enrollments in a transaction
    return this.prisma.$transaction(async (tx) => {
      // Create the Order
      const order = await tx.order.create({
        data: {
          userId: finalUserId as string,
          totalAmount,
          status: 'COMPLETED', // Auto-completed for MVP
          items: {
            create: courses.map((c) => ({
              courseId: c.id,
              price: c.price,
            })),
          },
        },
        include: { items: true },
      });

      // Create the Enrollments
      await tx.enrollment.createMany({
        data: courses.map((c) => ({
          userId: finalUserId as string,
          courseId: c.id,
          progress: 0,
        })),
      });

      // Update student counts for courses
      await Promise.all(
        courseIds.map((id) =>
          tx.course.update({
            where: { id },
            data: { studentsCount: { increment: 1 } },
          }),
        ),
      );

      return {
        orderId: order.id,
        itemsCount: (order.items as any[]).length,
        totalAmount: order.totalAmount,
        status: order.status,
      };
    });
  }

  async getUserOrders(userId: string) {
    return await this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: { course: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
