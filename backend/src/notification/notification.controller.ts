import { Controller, Get, Post, Query, Body, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { NotificationsService, type NotificationScope } from "./notification.service";

const toScope = (s?: string): NotificationScope | undefined =>
  s === "creator" || s === "learner" ? s : undefined;

@UseGuards(AuthGuard("jwt"))
@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  /**
   * GET /notifications?page=&pageSize=&unreadOnly=true&scope=creator|learner
   */
  @Get()
  async list(
    @Req() req: any,
    @Query("page") page?: string,
    @Query("pageSize") pageSize?: string,
    @Query("unreadOnly") unreadOnly?: string,
    @Query("scope") scope?: string,
  ) {
    return this.notificationsService.list(req.user.id as string, {
      page: page ? parseInt(page, 10) : undefined,
      pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
      unreadOnly: unreadOnly === "true",
      scope: toScope(scope),
    });
  }

  /**
   * GET /notifications/unread-count?scope=creator|learner
   */
  @Get("unread-count")
  async getUnreadCount(@Req() req: any, @Query("scope") scope?: string) {
    return this.notificationsService.getUnreadCount(req.user.id as string, toScope(scope));
  }

  /**
   * POST /notifications/mark-read
   * Body: { ids?: string[], scope?: 'creator' | 'learner' } — omit ids to
   * mark everything in that scope read.
   */
  @Post("mark-read")
  async markRead(@Req() req: any, @Body() body: { ids?: string[]; scope?: string }) {
    return this.notificationsService.markRead(req.user.id as string, body?.ids, toScope(body?.scope));
  }
}
