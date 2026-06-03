import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CreatorOnboardingService {
  constructor(private prisma: PrismaService) {}

  async createDraft(initialData: any) {
    return this.prisma.creatorOnboardingDraft.create({
      data: {
        data: initialData || {},
      },
    });
  }

  async getDraft(id: string) {
    const draft = await this.prisma.creatorOnboardingDraft.findUnique({
      where: { id },
    });

    if (!draft) {
      throw new NotFoundException(`Draft with ID ${id} not found`);
    }

    return draft;
  }

  async updateDraft(id: string, updateData: any) {
    // First verify existence
    const existingDraft = await this.getDraft(id);

    // Merge existing data with new data
    const mergedData = {
      ...(existingDraft.data as any),
      ...updateData,
    };

    return this.prisma.creatorOnboardingDraft.update({
      where: { id },
      data: {
        data: mergedData,
      },
    });
  }
}
