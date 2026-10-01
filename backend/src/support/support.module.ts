import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import {
  SupportAdminController,
  SupportController,
} from './support.controller';
import { SupportService } from './support.service';

@Module({
  imports: [NotificationModule],
  controllers: [SupportController, SupportAdminController],
  providers: [SupportService],
})
export class SupportModule {}
