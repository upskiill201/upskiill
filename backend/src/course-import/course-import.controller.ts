import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { CourseImportService } from './course-import.service';
import { CourseImportProcessorService } from './course-import-processor.service';
import { CourseStructureAnalysisService } from './course-structure-analysis.service';
import { LessonContentGenerationProcessorService } from './lesson-content-generation-processor.service';
import { CourseImportPublishService } from './course-import-publish.service';
import { TranscriptionProcessorService } from '../transcription/transcription-processor.service';
import { CreateCourseImportDto } from './dto/create-course-import.dto';
import { CreateCourseFromImportDto } from './dto/create-course-from-import.dto';

interface AuthedUser {
  id: string;
  role?: string;
}

/** Admin-only. Creates and tracks Drive -> R2 import jobs, transcribes
 *  videos, and generates lesson content — never touches course/lesson
 *  tables, that's CourseCreationService's job, wired in Phase 5. */
@Controller('admin/course-imports')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN)
export class CourseImportController {
  private readonly logger = new Logger(CourseImportController.name);

  constructor(
    private readonly courseImport: CourseImportService,
    private readonly processor: CourseImportProcessorService,
    private readonly structureAnalysis: CourseStructureAnalysisService,
    private readonly generationProcessor: LessonContentGenerationProcessorService,
    private readonly transcriptionProcessor: TranscriptionProcessorService,
    private readonly publish: CourseImportPublishService,
  ) {}

  @Post()
  async create(
    @GetUser() user: AuthedUser,
    @Body() dto: CreateCourseImportDto,
  ) {
    const summary = await this.courseImport.createImport(
      user.id,
      dto.driveFolderId,
    );
    // Kick processing off immediately rather than waiting up to 15s for the
    // next cron tick — fire-and-forget; the cron tick remains the safety net
    // if this request's process dies before the batch finishes.
    this.processor.tick(2, summary.id).catch((err: unknown) => {
      this.logger.error(
        `Immediate process-after-create failed for import ${summary.id}`,
        err as Error,
      );
    });
    return summary;
  }

  @Get()
  list(@GetUser() user: AuthedUser) {
    return this.courseImport.listImports(user.id);
  }

  @Get(':id')
  get(@GetUser() user: AuthedUser, @Param('id') id: string) {
    return this.courseImport.getImport(user.id, id);
  }

  /** Manual trigger for this one import — the same reason Tey's scheduler
   *  has POST /tey/scheduler/tick: Render's free tier sleeps and kills
   *  in-process cron, so the admin can nudge it from the progress screen. */
  @Post(':id/process')
  async processNow(@GetUser() user: AuthedUser, @Param('id') id: string) {
    await this.courseImport.getImport(user.id, id); // 404s / ownership-checks before triggering
    const result = await this.processor.tick(2, id);
    return { ok: true, ...result };
  }

  @Post(':id/files/:fileId/retry')
  async retryFile(
    @GetUser() user: AuthedUser,
    @Param('id') id: string,
    @Param('fileId') fileId: string,
  ) {
    const summary = await this.courseImport.retryFile(user.id, id, fileId);
    this.processor.tick(2, id).catch((err: unknown) => {
      this.logger.error(
        `Immediate process-after-retry failed for import ${id}`,
        err as Error,
      );
    });
    return summary;
  }

  /** Deterministic module/lesson grouping (spec §11 — "deterministic logic
   *  first"), then hands lessons whose transcript is already ready straight
   *  to the generation processor rather than waiting for its next tick. */
  @Post(':id/analyze')
  async analyze(@GetUser() user: AuthedUser, @Param('id') id: string) {
    const summary = await this.structureAnalysis.analyze(user.id, id);
    this.generationProcessor.tick(1, id).catch((err: unknown) => {
      this.logger.error(
        `Immediate generation-after-analyze failed for import ${id}`,
        err as Error,
      );
    });
    return summary;
  }

  @Post(':id/lessons/:lessonId/retry')
  async retryLesson(
    @GetUser() user: AuthedUser,
    @Param('id') id: string,
    @Param('lessonId') lessonId: string,
  ) {
    const summary = await this.courseImport.retryLesson(user.id, id, lessonId);
    this.generationProcessor.tick(1, id).catch((err: unknown) => {
      this.logger.error(
        `Immediate generation-after-retry failed for import ${id}`,
        err as Error,
      );
    });
    return summary;
  }

  @Post(':id/files/:fileId/retry-transcription')
  async retryTranscription(
    @GetUser() user: AuthedUser,
    @Param('id') id: string,
    @Param('fileId') fileId: string,
  ) {
    const summary = await this.courseImport.retryTranscription(
      user.id,
      id,
      fileId,
    );
    this.transcriptionProcessor.tick(1, id).catch((err: unknown) => {
      this.logger.error(
        `Immediate transcription-after-retry failed for import ${id}`,
        err as Error,
      );
    });
    return summary;
  }

  @Post(':id/cancel')
  cancel(@GetUser() user: AuthedUser, @Param('id') id: string) {
    return this.courseImport.cancelImport(user.id, id);
  }

  /** Phase 5: builds the real (DRAFT) Course/Section/Lesson tree from this
   *  import's successfully-generated lessons via CourseCreationService.
   *  Only reachable once every lesson has reached a terminal state. */
  @Post(':id/create-course')
  async createCourse(
    @GetUser() user: AuthedUser,
    @Param('id') id: string,
    @Body() dto: CreateCourseFromImportDto,
  ) {
    return this.publish.createCourse(user, id, dto);
  }
}
