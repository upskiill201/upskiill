import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserOnboardingService {
  constructor(private prisma: PrismaService) {}

  /** Get the session for a user. Returns null if no session exists yet. */
  async getSession(userId: string) {
    return this.prisma.onboardingSession.findUnique({
      where: { userId },
    });
  }

  /**
   * Upsert the session for a user.
   * Creates a new row on first call, updates on subsequent calls.
   * Only the fields provided in the payload are written — other fields are untouched.
   */
  async upsertSession(
    userId: string,
    payload: {
      currentStep?: number;
      completedSteps?: number[];
      answers?: Record<string, unknown>;
      onboardingComplete?: boolean;
      completedAt?: Date | null;
    },
  ) {
    const now = new Date();

    return this.prisma.onboardingSession.upsert({
      where: { userId },
      create: {
        userId,
        currentStep: payload.currentStep ?? 1,
        completedSteps: payload.completedSteps ?? [],
        answers: payload.answers ?? {},
        onboardingComplete: payload.onboardingComplete ?? false,
        completedAt: payload.completedAt ?? null,
      },
      update: {
        ...(payload.currentStep !== undefined && { currentStep: payload.currentStep }),
        ...(payload.completedSteps !== undefined && { completedSteps: payload.completedSteps }),
        ...(payload.answers !== undefined && { answers: payload.answers }),
        ...(payload.onboardingComplete !== undefined && { onboardingComplete: payload.onboardingComplete }),
        ...(payload.completedAt !== undefined && { completedAt: payload.completedAt }),
        updatedAt: now,
      },
    });
  }
}
