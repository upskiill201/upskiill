import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnalyticsService } from './analytics.service';

/**
 * Creator-facing course analytics. Every route requires a session AND the
 * service re-verifies course ownership (admins excepted).
 */
@Controller('analytics/courses')
@UseGuards(AuthGuard('jwt'))
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get(':courseId/overview')
  async getOverview(@Req() req: any, @Param('courseId') courseId: string) {
    return this.analyticsService.getOverview(
      req.user.id as string,
      courseId,
      req.user.role === 'ADMIN',
    );
  }

  @Get(':courseId/journey')
  async getJourney(@Req() req: any, @Param('courseId') courseId: string) {
    return this.analyticsService.getJourney(
      req.user.id as string,
      courseId,
      req.user.role === 'ADMIN',
    );
  }

  @Get(':courseId/students')
  async getStudents(
    @Req() req: any,
    @Param('courseId') courseId: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.analyticsService.getStudents(
      req.user.id as string,
      courseId,
      {
        page: page ? Number(page) : undefined,
        pageSize: pageSize ? Number(pageSize) : undefined,
        status,
        search,
      },
      req.user.role === 'ADMIN',
    );
  }

  @Get(':courseId/lessons')
  async getLessons(@Req() req: any, @Param('courseId') courseId: string) {
    return this.analyticsService.getLessonsAnalytics(
      req.user.id as string,
      courseId,
      req.user.role === 'ADMIN',
    );
  }

  @Get(':courseId/students/:studentId')
  async getStudentDetail(
    @Req() req: any,
    @Param('courseId') courseId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.analyticsService.getStudentDetail(
      req.user.id as string,
      courseId,
      studentId,
      req.user.role === 'ADMIN',
    );
  }
}

/**
 * Instructor-wide analytics (aggregates across all published courses) —
 * powers the analytics hub tabs. Drafts are always excluded.
 */
@Controller('analytics/instructor')
@UseGuards(AuthGuard('jwt'))
export class AnalyticsInstructorController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  async getInstructorOverview(@Req() req: any) {
    return this.analyticsService.getInstructorOverview(
      req.user.id as string,
      req.user.role === 'ADMIN',
    );
  }

  @Get('learners')
  async getLearners(@Req() req: any) {
    return this.analyticsService.getInstructorLearners(req.user.id as string);
  }

  @Get('engagement')
  async getEngagement(@Req() req: any) {
    return this.analyticsService.getInstructorEngagement(req.user.id as string);
  }

  @Get('courses')
  async getCoursesTable(@Req() req: any) {
    return this.analyticsService.getInstructorCoursesTable(req.user.id as string);
  }

  @Get('revenue')
  async getRevenue(@Req() req: any) {
    return this.analyticsService.getInstructorRevenue(req.user.id as string);
  }

  @Get('feedback')
  async getFeedback(@Req() req: any) {
    return this.analyticsService.getInstructorFeedback(req.user.id as string);
  }

  @Get('insights')
  async getInsights(@Req() req: any) {
    return this.analyticsService.getInstructorInsights(req.user.id as string);
  }
}
