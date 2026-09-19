import { Module } from '@nestjs/common';
import { GeminiTranscriptionService } from './gemini-transcription.service';
import { TranscriptionProcessorService } from './transcription-processor.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TeyModule } from '../tey/tey.module';

@Module({
  imports: [PrismaModule, TeyModule],
  providers: [GeminiTranscriptionService, TranscriptionProcessorService],
  exports: [GeminiTranscriptionService, TranscriptionProcessorService],
})
export class TranscriptionModule {}
