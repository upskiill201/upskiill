import { Injectable, NotFoundException, ConflictException, UnprocessableEntityException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateLessonMetadataDto, UpdateLessonPhaseDto, AddLessonResourceDto, UpdateLessonResourceDto, PublishLessonDto, FullSaveLessonDto } from './dto/update-lesson.dto';

const VALID_PHASES = ['learn', 'apply', 'reflect', 'deepen'];

interface AuthenticatedUser {
  id: string;
  role?: string;
}

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  /**
   * Load a lesson and verify the requesting user owns the course it belongs to.
   * Every lesson mutation/read in the builder flows through here so a student
   * (or another creator) can never touch someone else's lesson by guessing IDs.
   */
  private async getOwnedLesson(id: string, user: AuthenticatedUser) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        section: {
          select: {
            course: { select: { instructorId: true } },
          },
        },
      },
    });

    if (!lesson) throw new NotFoundException(`Lesson with ID ${id} not found`);
    if (lesson.section.course.instructorId !== user.id && user.role !== 'ADMIN') {
      throw new ForbiddenException('You do not have permission to modify this lesson.');
    }
    return lesson;
  }

  async getLesson(id: string, user: AuthenticatedUser) {
    await this.getOwnedLesson(id, user);

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

  async updateLessonMetadata(id: string, updateData: UpdateLessonMetadataDto, user: AuthenticatedUser) {
    await this.getOwnedLesson(id, user);

    const { version, ...data } = updateData;

    // Guard against nonsense values from the client (negative / absurd lengths)
    if (typeof data.durationMinutes === 'number') {
      data.durationMinutes = Math.max(0, Math.min(600, Math.round(data.durationMinutes)));
    }

    // Atomic optimistic lock: only updates when the stored version still matches.
    const result = await this.prisma.lesson.updateMany({
      where: { id, ...(version !== undefined && { version }) },
      data: {
        ...data,
        version: { increment: 1 },
      },
    });

    if (result.count === 0) {
      const lesson = await this.prisma.lesson.findUnique({ where: { id } });
      throw new ConflictException({
        message: 'Conflict: This lesson was modified by another session.',
        currentServerState: lesson,
      });
    }

    return this.prisma.lesson.findUnique({ where: { id } });
  }

  async updateLessonPhase(id: string, phase: string, updateData: UpdateLessonPhaseDto, user: AuthenticatedUser) {
    await this.getOwnedLesson(id, user);

    if (!VALID_PHASES.includes(phase)) {
      throw new BadRequestException(`Invalid phase "${phase}". Must be one of: ${VALID_PHASES.join(', ')}`);
    }

    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException(`Lesson with ID ${id} not found`);

    const blocks = this.parseJsonObject(lesson.contentBlocks);
    const updatedBlocks = {
      ...blocks,
      [phase]: updateData.contentBlocks
    };

    // Merge completion state
    const currentCompletion = this.parseJsonObject(lesson.stepCompletion);
    const updatedCompletion = {
      ...currentCompletion,
      [phase]: updateData.isCompleted !== undefined ? updateData.isCompleted : currentCompletion[phase] || false
    };

    const result = await this.prisma.lesson.updateMany({
      where: { id, version: updateData.version },
      data: {
        contentBlocks: updatedBlocks,
        stepCompletion: updatedCompletion,
        version: { increment: 1 },
      },
    });

    if (result.count === 0) {
      throw new ConflictException({
        message: 'Conflict: This lesson was modified by another session.',
        currentServerState: lesson,
      });
    }

    return this.prisma.lesson.findUnique({ where: { id } });
  }

  async addLessonResource(id: string, data: AddLessonResourceDto, user: AuthenticatedUser) {
    await this.getOwnedLesson(id, user);

    // Append to the end of the list unless the client explicitly positions it
    const resourceCount = await this.prisma.lessonResource.count({ where: { lessonId: id } });

    return this.prisma.lessonResource.create({
      data: {
        lessonId: id,
        ...data,
        displayOrder: data.displayOrder ?? resourceCount,
      }
    });
  }

  async updateLessonResource(id: string, resourceId: string, data: UpdateLessonResourceDto, user: AuthenticatedUser) {
    await this.getOwnedLesson(id, user);

    const resource = await this.prisma.lessonResource.findUnique({ where: { id: resourceId } });
    if (!resource || resource.lessonId !== id) {
      throw new NotFoundException(`Resource with ID ${resourceId} not found on this lesson`);
    }

    return this.prisma.lessonResource.update({
      where: { id: resourceId },
      data,
    });
  }

  async removeLessonResource(id: string, resourceId: string, user: AuthenticatedUser) {
    await this.getOwnedLesson(id, user);

    const resource = await this.prisma.lessonResource.findUnique({ where: { id: resourceId } });
    if (!resource || resource.lessonId !== id) {
      throw new NotFoundException(`Resource with ID ${resourceId} not found on this lesson`);
    }

    return this.prisma.lessonResource.delete({
      where: { id: resourceId }
    });
  }

  /**
   * fullSave — saves ALL lesson data in a SINGLE database write.
   * Replaces 5 sequential API calls (metadata + 4 phases) with 1.
   * Honours the version number for optimistic locking when provided.
   */
  async fullSave(id: string, data: FullSaveLessonDto, user: AuthenticatedUser) {
    const lesson = await this.getOwnedLesson(id, user);

    const updatedBlocks = this.mergeBlocks(lesson.contentBlocks, data);
    const updatedCompletion = this.mergeCompletion(lesson.stepCompletion, data);

    const result = await this.prisma.lesson.updateMany({
      where: { id, ...(data.version !== undefined && { version: data.version }) },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.shortDescription !== undefined && { shortDescription: data.shortDescription }),
        ...(data.lessonType !== undefined && { lessonType: data.lessonType }),
        ...(data.durationMinutes !== undefined && {
          durationMinutes: Math.max(0, Math.min(600, Math.round(data.durationMinutes))),
        }),
        contentBlocks: updatedBlocks,
        stepCompletion: updatedCompletion,
        version: { increment: 1 },
      },
    });

    if (result.count === 0) {
      throw new ConflictException({
        message: 'Conflict: This lesson was modified by another session.',
        currentServerState: await this.prisma.lesson.findUnique({ where: { id } }),
      });
    }

    const updated = await this.prisma.lesson.findUnique({ where: { id } });
    return { ok: true, version: updated?.version };
  }

  /**
   * fullSaveAndPublish — saves everything + marks lesson as published in one write.
   */
  async fullSaveAndPublish(id: string, saveData: FullSaveLessonDto, user: AuthenticatedUser) {
    const lesson = await this.getOwnedLesson(id, user);

    const updatedBlocks = this.mergeBlocks(lesson.contentBlocks, saveData);
    const updatedCompletion = this.mergeCompletion(lesson.stepCompletion, saveData);

    // Validate before publishing — check the MERGED completion state
    const errors: string[] = [];
    if (!updatedCompletion.learn) errors.push('Learn phase is incomplete or missing content.');
    if (!updatedCompletion.apply) errors.push('Apply phase requires at least 1 valid activity.');
    if (!updatedCompletion.reflect) errors.push('Reflect phase requires a prompt.');

    if (errors.length > 0) {
      throw new UnprocessableEntityException({ message: 'Validation failed', errors });
    }

    const result = await this.prisma.lesson.updateMany({
      where: { id, ...(saveData.version !== undefined && { version: saveData.version }) },
      data: {
        ...(saveData.title !== undefined && { title: saveData.title }),
        ...(saveData.shortDescription !== undefined && { shortDescription: saveData.shortDescription }),
        ...(saveData.lessonType !== undefined && { lessonType: saveData.lessonType }),
        ...(saveData.durationMinutes !== undefined && {
          durationMinutes: Math.max(0, Math.min(600, Math.round(saveData.durationMinutes))),
        }),
        contentBlocks: updatedBlocks,
        stepCompletion: updatedCompletion,
        status: 'published',
        publishedAt: lesson.publishedAt ?? new Date(), // keep the original publish date on re-publish
        version: { increment: 1 },
      },
    });

    if (result.count === 0) {
      throw new ConflictException({
        message: 'Conflict: This lesson was modified by another session.',
        currentServerState: await this.prisma.lesson.findUnique({ where: { id } }),
      });
    }

    const updated = await this.prisma.lesson.findUnique({ where: { id } });
    return { ok: true, lesson: updated };
  }

  async publishLesson(id: string, publishData: PublishLessonDto, user: AuthenticatedUser) {
    const lesson = await this.getOwnedLesson(id, user);

    if (publishData.publishOption !== 'draft') {
      const currentCompletion = this.parseJsonObject(lesson.stepCompletion);

      const errors: string[] = [];

      if (currentCompletion.learn !== true) errors.push('Learn phase is incomplete or missing content.');
      if (currentCompletion.apply !== true) errors.push('Apply phase requires at least 1 valid activity.');
      if (currentCompletion.reflect !== true) errors.push('Reflect phase requires a prompt.');

      if (errors.length > 0) {
        throw new UnprocessableEntityException({ message: 'Validation failed', errors });
      }
    }

    const newStatus = publishData.publishOption === 'now' ? 'published' : 'draft';
    const publishedAt = publishData.publishOption === 'now' ? (lesson.publishedAt ?? new Date()) : null;

    const result = await this.prisma.lesson.updateMany({
      where: { id, version: lesson.version },
      data: {
        status: newStatus,
        publishedAt,
        version: { increment: 1 },
      },
    });

    if (result.count === 0) {
      throw new ConflictException({
        message: 'Conflict: This lesson was modified by another session.',
      });
    }

    const updatedLesson = await this.prisma.lesson.findUnique({ where: { id } });

    return {
      success: true,
      lesson: updatedLesson,
      publishedAt: updatedLesson?.publishedAt,
    };
  }

  /* ── helpers ── */

  private parseJsonObject(value: unknown): Record<string, any> {
    if (!value) return {};
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
      } catch {
        return {}; // corrupted JSON — treat as empty rather than crashing the save
      }
    }
    return value as Record<string, any>;
  }

  private mergeBlocks(currentBlocks: unknown, data: FullSaveLessonDto) {
    const blocks = this.parseJsonObject(currentBlocks);
    return {
      ...blocks,
      ...(data.learnBlocks !== undefined && { learn: data.learnBlocks }),
      ...(data.applyBlocks !== undefined && { apply: data.applyBlocks }),
      ...(data.reflectBlocks !== undefined && { reflect: data.reflectBlocks }),
      ...(data.deepenBlocks !== undefined && { deepen: data.deepenBlocks }),
    };
  }

  private mergeCompletion(currentCompletion: unknown, data: FullSaveLessonDto) {
    const completion = this.parseJsonObject(currentCompletion);
    return {
      ...completion,
      ...(data.isLearnCompleted !== undefined && { learn: data.isLearnCompleted }),
      ...(data.isApplyCompleted !== undefined && { apply: data.isApplyCompleted }),
      ...(data.isReflectCompleted !== undefined && { reflect: data.isReflectCompleted }),
      ...(data.isDeepenCompleted !== undefined && { deepen: data.isDeepenCompleted }),
    };
  }
}

