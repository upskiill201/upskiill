import { Controller, Get, Post, Query, Body, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { NotificationsService } from "./notification.service";

@UseGuards(AuthGuard("jwt"))
@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  /**
   * GET /notifications?page=&pageSize=&unreadOnly=true
   */
  @Get()
  async list(
    @Req() req: any,
    @Query("page") page?: string,
    @Query("pageSize") pageSize?: string,
    @Query("unreadOnly") unreadOnly?: string,
  ) {
    return this.notificationsService.list(req.user.id as string, {
      page: page ? parseInt(page, 10) : undefined,
      pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
      unreadOnly: unreadOnly === "true",
    });
  }

  /**
   * GET /notifications/unread-count
   */
  @Get("unread-count")
  async getUnreadCount(@Req() req: any) {
    return this.notificationsService.getUnreadCount(req.user.id as string);
  }

  /**
   * POST /notifications/mark-read
   * Body: { ids?: string[] } — omit ids to mark everything read.
   */
  @Post("mark-read")
  async markRead(@Req() req: any, @Body() body: { ids?: string[] }) {
    return this.notificationsService.markRead(req.user.id as string, body?.ids);
  }
}
