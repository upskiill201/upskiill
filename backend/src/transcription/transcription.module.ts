import { Module } from '@nestjs/common';
import { GroqWhisperTranscriptionService } from './groq-whisper-transcription.service';
import { TranscriptionProcessorService } from './transcription-processor.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TeyModule } from '../tey/tey.module';
import { HeavyTransferLockModule } from '../course-import/heavy-transfer-lock.module';

// GeminiTranscriptionService is intentionally no longer wired in here —
// see GroqWhisperTranscriptionService's doc comment for why. The Gemini
// implementation is left in place (still has its own passing tests) rather
// than deleted, in case a paid Gemini tier becomes worth revisiting once
// there's real revenue; it's simply not part of the running pipeline.
@Module({
  imports: [PrismaModule, TeyModule, HeavyTransferLockModule],
  providers: [GroqWhisperTranscriptionService, TranscriptionProcessorService],
  exports: [GroqWhisperTranscriptionService, TranscriptionProcessorService],
})
export class TranscriptionModule {}
