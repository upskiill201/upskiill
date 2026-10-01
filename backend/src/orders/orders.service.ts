import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckoutDto } from './dto/checkout.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EnrollmentCreatedEvent } from '../common/events/enrollment-created.event';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  /**
   * Legacy cart checkout — FREE courses only.
   *
   * This path takes no payment: it records a COMPLETED order and enrolls. It
   * used to accept paid courses too (and create accounts for any email as a
   * "guest"), which let anyone mint fake orders, enrollments and inflated
   * student counts for paid courses without paying. Paid courses are only
   * sold through PaymentService.subscribeCourse (server-priced subscription
   * + entitlement), so this method now refuses them and requires a signed-in
   * learner.
   */
  async checkout(userId: string | null, checkoutDto: CheckoutDto) {
    const { courseIds } = checkoutDto;

    if (!userId) {
      throw new UnauthorizedException('Log in to enroll.');
    }

    if (courseIds.length === 0) {
      throw new BadRequestException('Empty cart');
    }

    const finalUserId = userId;

    // 2. Fetch courses to get current prices
    const courses = await this.prisma.course.findMany({
      where: { id: { in: courseIds } },
    });

    if (courses.length !== courseIds.length) {
      throw new BadRequestException('One or more invalid course IDs');
    }

    const paid = courses.filter((c) => c.price > 0);
    if (paid.length > 0) {
      throw new BadRequestException(
        'Paid courses are unlocked with a subscription from the course page, not the cart.',
      );
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
          userId: finalUserId,
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
          userId: finalUserId,
          courseId: c.id,
          progress: 0,
        })),
      });

      // Update student counts for courses
      await tx.course.updateMany({
        where: { id: { in: courseIds } },
        data: { studentsCount: { increment: 1 } },
      });

      return {
        orderId: order.id,
        itemsCount: (order.items as any[]).length,
        totalAmount: order.totalAmount,
        status: order.status,
      };
    }).then(async (result) => {
      // Auto-seat the buyer in each course's community (post-transaction,
      // fire-and-forget — a failed join never fails the order).
      for (const courseId of courseIds) {
        this.eventEmitter.emit(
          'enrollment.created',
          new EnrollmentCreatedEvent(finalUserId, courseId),
        );
      }
      return result;
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
