import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('OrdersService', () => {
  let service: OrdersService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    course: {
      findMany: jest.fn(),
      update: jest.fn(),
      // checkout bumps studentsCount inside its transaction via updateMany
      updateMany: jest.fn(),
    },
    enrollment: {
      findMany: jest.fn(),
      createMany: jest.fn(),
    },
    order: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    $transaction: jest.fn(async (callback) => {
      return await callback(mockPrismaService);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    prismaService = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  describe('checkout', () => {
    const mockCheckoutDto = {
      courseIds: ['course-1'],
      email: 'test@example.com',
      fullName: 'Test User',
    };

    it('should throw BadRequestException if cart is empty', async () => {
      await expect(
        service.checkout('user-1', { ...mockCheckoutDto, courseIds: [] }),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.checkout('user-1', { ...mockCheckoutDto, courseIds: [] }),
      ).rejects.toThrow('Empty cart');
    });

    it('should throw BadRequestException if guest checkout is missing email or fullName', async () => {
      await expect(
        service.checkout(null, { courseIds: ['course-1'] } as any),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.checkout(null, { courseIds: ['course-1'] } as any),
      ).rejects.toThrow('Email and Full Name are required for guest checkout');
    });

    it('should create a new user for guest checkout if user does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockResolvedValue({ id: 'new-user-id' });
      mockPrismaService.course.findMany.mockResolvedValue([{ id: 'course-1', price: 100 }]);
      mockPrismaService.enrollment.findMany.mockResolvedValue([]);
      mockPrismaService.order.create.mockResolvedValue({ id: 'order-1', totalAmount: 100, status: 'COMPLETED', items: [{}] });

      await service.checkout(null, mockCheckoutDto);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({ where: { email: mockCheckoutDto.email } });
      expect(mockPrismaService.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            email: mockCheckoutDto.email,
            fullName: mockCheckoutDto.fullName,
            role: 'STUDENT',
          }),
        }),
      );
    });

    it('should use existing user for guest checkout if user already exists', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({ id: 'existing-user-id' });
      mockPrismaService.course.findMany.mockResolvedValue([{ id: 'course-1', price: 100 }]);
      mockPrismaService.enrollment.findMany.mockResolvedValue([]);
      mockPrismaService.order.create.mockResolvedValue({ id: 'order-1', totalAmount: 100, status: 'COMPLETED', items: [{}] });

      await service.checkout(null, mockCheckoutDto);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({ where: { email: mockCheckoutDto.email } });
      expect(mockPrismaService.user.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if any course ID is invalid', async () => {
      // Mock returning fewer courses than requested
      mockPrismaService.course.findMany.mockResolvedValue([]);

      await expect(
        service.checkout('user-1', mockCheckoutDto),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.checkout('user-1', mockCheckoutDto),
      ).rejects.toThrow('One or more invalid course IDs');
    });

    it('should throw BadRequestException if user is already enrolled in any course', async () => {
      mockPrismaService.course.findMany.mockResolvedValue([{ id: 'course-1', price: 100 }]);
      mockPrismaService.enrollment.findMany.mockResolvedValue([{ courseId: 'course-1' }]);

      await expect(
        service.checkout('user-1', mockCheckoutDto),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.checkout('user-1', mockCheckoutDto),
      ).rejects.toThrow('User is already enrolled in courses: course-1');
    });

    it('should successfully complete checkout process within a transaction', async () => {
      const mockCourses = [
        { id: 'course-1', price: 50 },
        { id: 'course-2', price: 75 },
      ];

      mockPrismaService.course.findMany.mockResolvedValue(mockCourses);
      mockPrismaService.enrollment.findMany.mockResolvedValue([]);

      const mockOrder = {
        id: 'order-123',
        totalAmount: 125,
        status: 'COMPLETED',
        items: [{}, {}],
      };
      mockPrismaService.order.create.mockResolvedValue(mockOrder);

      const result = await service.checkout('user-1', {
        courseIds: ['course-1', 'course-2'],
        email: 'test@example.com',
        fullName: 'Test User',
      });

      // Verify transaction was called
      expect(mockPrismaService.$transaction).toHaveBeenCalled();

      // Verify order creation
      expect(mockPrismaService.order.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-1',
          totalAmount: 125,
          status: 'COMPLETED',
          items: {
            create: [
              { courseId: 'course-1', price: 50 },
              { courseId: 'course-2', price: 75 },
            ],
          },
        },
        include: { items: true },
      });

      // Verify enrollment creation
      expect(mockPrismaService.enrollment.createMany).toHaveBeenCalledWith({
        data: [
          { userId: 'user-1', courseId: 'course-1', progress: 0 },
          { userId: 'user-1', courseId: 'course-2', progress: 0 },
        ],
      });

      // Verify course student count updates (single bulk increment)
      expect(mockPrismaService.course.updateMany).toHaveBeenCalledWith({
        where: { id: { in: ['course-1', 'course-2'] } },
        data: { studentsCount: { increment: 1 } },
      });

      // Verify return value
      expect(result).toEqual({
        orderId: 'order-123',
        itemsCount: 2,
        totalAmount: 125,
        status: 'COMPLETED',
      });
    });
  });
  describe('getUserOrders', () => {
    it('should return orders for a given user', async () => {
      const mockOrders = [
        { id: 'order-1', userId: 'user-1', totalAmount: 100 },
        { id: 'order-2', userId: 'user-1', totalAmount: 200 },
      ];

      mockPrismaService.order.findMany.mockResolvedValue(mockOrders);

      const result = await service.getUserOrders('user-1');

      expect(mockPrismaService.order.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        include: {
          items: {
            include: { course: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      expect(result).toEqual(mockOrders);
    });
  });
});
