import { Injectable, NotFoundException, ConflictException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateLessonMetadataDto, UpdateLessonPhaseDto, AddLessonResourceDto, PublishLessonDto, FullSaveLessonDto } from './dto/update-lesson.dto';

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

  /**
   * fullSave — saves ALL lesson data in a SINGLE database write.
   * Replaces 5 sequential API calls (metadata + 4 phases) with 1.
   * This is the key to fast, reliable saves in the lesson builder.
   */
  async fullSave(id: string, data: FullSaveLessonDto) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException(`Lesson with ID ${id} not found`);

    // Merge content blocks from each phase
    const currentBlocks: any = lesson.contentBlocks
      ? (typeof lesson.contentBlocks === 'string' ? JSON.parse(lesson.contentBlocks) : lesson.contentBlocks)
      : {};

    const updatedBlocks = {
      ...currentBlocks,
      ...(data.learnBlocks !== undefined && { learn: data.learnBlocks }),
      ...(data.applyBlocks !== undefined && { apply: data.applyBlocks }),
      ...(data.reflectBlocks !== undefined && { reflect: data.reflectBlocks }),
      ...(data.deepenBlocks !== undefined && { deepen: data.deepenBlocks }),
    };

    // Merge completion state
    const currentCompletion: any = lesson.stepCompletion
      ? (typeof lesson.stepCompletion === 'string' ? JSON.parse(lesson.stepCompletion) : lesson.stepCompletion)
      : {};

    const updatedCompletion = {
      ...currentCompletion,
      ...(data.isLearnCompleted !== undefined && { learn: data.isLearnCompleted }),
      ...(data.isApplyCompleted !== undefined && { apply: data.isApplyCompleted }),
      ...(data.isReflectCompleted !== undefined && { reflect: data.isReflectCompleted }),
      ...(data.isDeepenCompleted !== undefined && { deepen: data.isDeepenCompleted }),
    };

    const updated = await this.prisma.lesson.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.shortDescription !== undefined && { shortDescription: data.shortDescription }),
        ...(data.lessonType !== undefined && { lessonType: data.lessonType }),
        contentBlocks: updatedBlocks,
        stepCompletion: updatedCompletion,
        version: lesson.version + 1,
      },
    });

    return { ok: true, version: updated.version };
  }

  /**
   * fullSaveAndPublish — saves everything + marks lesson as published in one transaction.
   */
  async fullSaveAndPublish(id: string, saveData: FullSaveLessonDto) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException(`Lesson with ID ${id} not found`);

    // Merge content blocks
    const currentBlocks: any = lesson.contentBlocks
      ? (typeof lesson.contentBlocks === 'string' ? JSON.parse(lesson.contentBlocks) : lesson.contentBlocks)
      : {};

    const updatedBlocks = {
      ...currentBlocks,
      ...(saveData.learnBlocks !== undefined && { learn: saveData.learnBlocks }),
      ...(saveData.applyBlocks !== undefined && { apply: saveData.applyBlocks }),
      ...(saveData.reflectBlocks !== undefined && { reflect: saveData.reflectBlocks }),
      ...(saveData.deepenBlocks !== undefined && { deepen: saveData.deepenBlocks }),
    };

    const currentCompletion: any = lesson.stepCompletion
      ? (typeof lesson.stepCompletion === 'string' ? JSON.parse(lesson.stepCompletion) : lesson.stepCompletion)
      : {};

    const updatedCompletion = {
      ...currentCompletion,
      ...(saveData.isLearnCompleted !== undefined && { learn: saveData.isLearnCompleted }),
      ...(saveData.isApplyCompleted !== undefined && { apply: saveData.isApplyCompleted }),
      ...(saveData.isReflectCompleted !== undefined && { reflect: saveData.isReflectCompleted }),
      ...(saveData.isDeepenCompleted !== undefined && { deepen: saveData.isDeepenCompleted }),
    };

    // Validate before publishing — check the MERGED completion state
    const errors: string[] = [];
    if (!updatedCompletion.learn) errors.push('Learn phase is incomplete or missing content.');
    if (!updatedCompletion.apply) errors.push('Apply phase requires at least 1 valid activity.');
    if (!updatedCompletion.reflect) errors.push('Reflect phase requires a prompt.');

    if (errors.length > 0) {
      throw new UnprocessableEntityException({ message: 'Validation failed', errors });
    }

    const updated = await this.prisma.lesson.update({
      where: { id },
      data: {
        ...(saveData.title !== undefined && { title: saveData.title }),
        ...(saveData.shortDescription !== undefined && { shortDescription: saveData.shortDescription }),
        ...(saveData.lessonType !== undefined && { lessonType: saveData.lessonType }),
        contentBlocks: updatedBlocks,
        stepCompletion: updatedCompletion,
        status: 'published',
        publishedAt: new Date(),
        version: lesson.version + 1,
      },
    });

    return { ok: true, lesson: updated };
  }

  async publishLesson(id: string, publishData: PublishLessonDto) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id }, include: { resources: true } });
    if (!lesson) throw new NotFoundException(`Lesson with ID ${id} not found`);

    if (publishData.publishOption !== 'draft') {
      const currentCompletion = lesson.stepCompletion ? (typeof lesson.stepCompletion === 'string' ? JSON.parse(lesson.stepCompletion) : lesson.stepCompletion) : {};
      const currentBlocks = lesson.contentBlocks ? (typeof lesson.contentBlocks === 'string' ? JSON.parse(lesson.contentBlocks) : lesson.contentBlocks) : {};

      const errors: string[] = [];

      const isLearnComplete = currentCompletion.learn === true;
      if (!isLearnComplete) errors.push('Learn phase is incomplete or missing content.');

      const isApplyComplete = currentCompletion.apply === true;
      if (!isApplyComplete) errors.push('Apply phase requires at least 1 valid activity.');

      const isReflectComplete = currentCompletion.reflect === true;
      if (!isReflectComplete) errors.push('Reflect phase requires a prompt.');

      if (errors.length > 0) {
        throw new UnprocessableEntityException({ message: 'Validation failed', errors });
      }
    }

    const newStatus = publishData.publishOption === 'now' ? 'published' : 'draft';
    const publishedAt = publishData.publishOption === 'now' ? new Date() : null;

    const updatedLesson = await this.prisma.lesson.update({
      where: { id },
      data: {
        status: newStatus,
        publishedAt: publishedAt,
        version: lesson.version + 1,
      },
    });

    return {
      success: true,
      lesson: updatedLesson,
      publishedAt: updatedLesson.publishedAt,
    };
  }
}
