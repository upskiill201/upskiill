import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async getLesson(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        section: {
          select: {
            title: true,
            course: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    return lesson;
  }

  async updateLesson(id: string, updateData: UpdateLessonDto) {
    // Ensure lesson exists
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    // Prepare valid fields for update (allowing partial updates)
    const validData: Partial<UpdateLessonDto> = {};
    const allowedFields = [
      'title',
      'lessonType',
      'isFreePreview',
      'durationMinutes',
      'learnVideoUrl',
      'learnText',
      'learnAudioUrl',
      'applyType',
      'applyScenario',
      'applyTask',
      'applyAnswer',
      'applyExplanation',
      'reflectPrompt',
      'reflectChips',
      'deepenResources',
      'aiSimplified', 'aiRealWorld', 'aiCommonMistakes',
      'shortDescription', 'resources',
      'isLearnCompleted', 'isApplyCompleted', 'isReflectCompleted', 'isDeepenCompleted'
    ] as const;

    for (const field of allowedFields) {
      const value = updateData[field];
      if (value !== undefined) {
        (validData as any)[field] = value;
      }
    }

    return this.prisma.lesson.update({
      where: { id },
      data: validData,
    });
  }
}
