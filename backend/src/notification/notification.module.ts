import { Module } from "@nestjs/common";
import { NotificationsController } from "./notification.controller";
import { NotificationsService } from "./notification.service";

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationModule {}
