import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ChestService } from './chest.service';

@Injectable()
export class ChestUnlockConsumer {
  private readonly logger = new Logger(ChestUnlockConsumer.name);

  constructor(private readonly chestService: ChestService) {}

  @OnEvent('lesson.completed')
  async handleLessonCompletedEvent(payload: any) {
    try {
      const { userId, timezoneOffsetMinutes } = payload;
      
      // Only unlock once per day, chestService handles idempotency
      await this.chestService.unlockTodayChest(userId, timezoneOffsetMinutes);
      
    } catch (error) {
      this.logger.error(`Failed to unlock chest for user ${payload.userId}:`, error);
    }
  }
}
