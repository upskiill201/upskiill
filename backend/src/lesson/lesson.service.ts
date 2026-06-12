import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateLessonMetadataDto, UpdateLessonPhaseDto, AddLessonResourceDto } from './dto/update-lesson.dto';

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
            course: { select: { id: true, title: true } },
          },
        },
        resources: {
          orderBy: { displayOrder: 'asc' }
        }
      },
    });

    if (!lesson) throw new NotFoundException(`Lesson with ID ${id} not found`);
    return lesson;
  }

  async updateLessonMetadata(id: string, updateData: UpdateLessonMetadataDto) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException(`Lesson with ID ${id} not found`);

    if (updateData.version !== undefined && updateData.version !== lesson.version) {
      throw new ConflictException({
        message: 'Conflict: This lesson was modified by another session.',
        currentServerState: lesson
      });
    }

    const { version, ...data } = updateData;
    
    return this.prisma.lesson.update({
      where: { id },
      data: {
        ...data,
        version: lesson.version + 1,
      },
    });
  }

  async updateLessonPhase(id: string, phase: string, updateData: UpdateLessonPhaseDto) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException(`Lesson with ID ${id} not found`);

    if (updateData.version !== lesson.version) {
      throw new ConflictException({
        message: 'Conflict: This lesson was modified by another session.',
        currentServerState: lesson
      });
    }

    // Merge content blocks
    const currentBlocks = lesson.contentBlocks ? (typeof lesson.contentBlocks === 'string' ? JSON.parse(lesson.contentBlocks) : lesson.contentBlocks) : {};
    const updatedBlocks = {
      ...currentBlocks,
      [phase]: updateData.contentBlocks
    };

    // Merge completion state
    const currentCompletion = lesson.stepCompletion ? (typeof lesson.stepCompletion === 'string' ? JSON.parse(lesson.stepCompletion) : lesson.stepCompletion) : {};
    const updatedCompletion = {
      ...currentCompletion,
      [phase]: updateData.isCompleted !== undefined ? updateData.isCompleted : currentCompletion[phase] || false
    };

    return this.prisma.lesson.update({
      where: { id },
      data: {
        contentBlocks: updatedBlocks,
        stepCompletion: updatedCompletion,
        version: lesson.version + 1,
      },
    });
  }

  async addLessonResource(id: string, data: AddLessonResourceDto) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException(`Lesson with ID ${id} not found`);

    return this.prisma.lessonResource.create({
      data: {
        lessonId: id,
        ...data
      }
    });
  }

  async removeLessonResource(id: string, resourceId: string) {
    return this.prisma.lessonResource.delete({
      where: { id: resourceId }
    });
  }
}
