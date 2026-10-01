import { Module } from "@nestjs/common";
import { NotificationsController } from "./notification.controller";
import { NotificationsService } from "./notification.service";
import { StudioNotificationsListener } from "./studio-notifications.listener";

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, StudioNotificationsListener],
  exports: [NotificationsService],
})
export class NotificationModule {}
