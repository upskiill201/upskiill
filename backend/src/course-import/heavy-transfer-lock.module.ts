import { Module } from '@nestjs/common';
import { HeavyTransferLockService } from './heavy-transfer-lock.service';

/**
 * Its own tiny module (not just a provider inside CourseImportModule) so
 * TranscriptionModule can import it too without a circular dependency —
 * CourseImportModule already imports TranscriptionModule, so the reverse
 * isn't possible. Both need the exact same singleton instance for the lock
 * to actually coordinate anything.
 */
@Module({
  providers: [HeavyTransferLockService],
  exports: [HeavyTransferLockService],
})
export class HeavyTransferLockModule {}
