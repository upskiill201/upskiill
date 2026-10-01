import { Module } from '@nestjs/common';
import { CourseImportService } from './course-import.service';
import { CourseImportProcessorService } from './course-import-processor.service';
import { CourseStructureAnalysisService } from './course-structure-analysis.service';
import { LessonContentGenerationService } from './lesson-content-generation.service';
import { LessonContentGenerationProcessorService } from './lesson-content-generation-processor.service';
import { CourseImportPublishService } from './course-import-publish.service';
import { CourseImportAutopilotService } from './course-import-autopilot.service';
import { CourseImportController } from './course-import.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { GoogleDriveModule } from '../google-drive/google-drive.module';
import { StorageModule } from '../storage/storage.module';
import { TranscriptionModule } from '../transcription/transcription.module';
import { TeyModule } from '../tey/tey.module';
import { CourseCreationModule } from '../course-creation/course-creation.module';
import { HeavyTransferLockModule } from './heavy-transfer-lock.module';

@Module({
  imports: [
    PrismaModule,
    GoogleDriveModule,
    StorageModule,
    TranscriptionModule,
    TeyModule,
    CourseCreationModule,
    HeavyTransferLockModule,
  ],
  controllers: [CourseImportController],
  providers: [
    CourseImportService,
    CourseImportProcessorService,
    CourseStructureAnalysisService,
    LessonContentGenerationService,
    LessonContentGenerationProcessorService,
    CourseImportPublishService,
    CourseImportAutopilotService,
  ],
})
export class CourseImportModule {}
