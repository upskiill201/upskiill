import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('PaymentService', () => {
  let service: PaymentService;
  let prismaServiceMock: any;

  beforeEach(async () => {
    // Set environment variable required for MeSomb initialization
    process.env.MESOMB_APP_KEY = 'test_mesomb_app_key';

    prismaServiceMock = {
      course: {
        findMany: jest.fn(),
        update: jest.fn(),
      },
      order: {
        create: jest.fn(),
      },
      enrollment: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
      $transaction: jest.fn((callback) => callback(prismaServiceMock)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  afterEach(() => {
    delete process.env.MESOMB_APP_KEY;
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('collectMesomb', () => {
    const userId = 'user-1';
    const courseIds = ['course-1', 'course-2'];
    const payerAccount = '237670000000';
    const serviceName = 'MTN';

    it('should return success and mint enrollment when payment is successful', async () => {
      prismaServiceMock.course.findMany.mockResolvedValue([
        { id: 'course-1', price: 10 },
        { id: 'course-2', price: 20 },
      ]);

      const mockMakeCollect = jest.fn().mockResolvedValue({
        isOperationSuccess: () => true,
      });

      // Override the mesomb client with mock
      service['mesombClient'] = {
        makeCollect: mockMakeCollect,
      };

      const result = await service.collectMesomb(userId, courseIds, payerAccount, serviceName);

      expect(result).toEqual({ success: true, message: 'Payment collected via Mobile Money' });
      expect(mockMakeCollect).toHaveBeenCalled();
      expect(prismaServiceMock.$transaction).toHaveBeenCalled();
    });

    it('should return pending status when payment is pending', async () => {
      prismaServiceMock.course.findMany.mockResolvedValue([
        { id: 'course-1', price: 10 },
        { id: 'course-2', price: 20 },
      ]);

      const mockMakeCollect = jest.fn().mockResolvedValue({
        isOperationSuccess: () => false,
      });

      service['mesombClient'] = {
        makeCollect: mockMakeCollect,
      };

      const result = await service.collectMesomb(userId, courseIds, payerAccount, serviceName);

      expect(result).toEqual({ success: false, status: 'PENDING — User prompt not yet confirmed' });
      expect(mockMakeCollect).toHaveBeenCalled();
      // Should not mint enrollment if pending
      expect(prismaServiceMock.$transaction).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when makeCollect throws an error', async () => {
      prismaServiceMock.course.findMany.mockResolvedValue([
        { id: 'course-1', price: 10 },
        { id: 'course-2', price: 20 },
      ]);

      const mockMakeCollect = jest.fn().mockRejectedValue(new Error('Network error'));

      service['mesombClient'] = {
        makeCollect: mockMakeCollect,
      };

      await expect(service.collectMesomb(userId, courseIds, payerAccount, serviceName))
        .rejects
        .toThrow(new BadRequestException('MeSomb payment failed. Did the user confirm the prompt on their phone?'));

      expect(mockMakeCollect).toHaveBeenCalled();
      expect(prismaServiceMock.$transaction).not.toHaveBeenCalled();
    });
  });
});
