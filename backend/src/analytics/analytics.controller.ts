import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnalyticsService } from './analytics.service';
import { CoursePulseService } from './course-pulse.service';
import { StudioHomeService } from './studio-home.service';

/**
 * Creator-facing course analytics. Every route requires a session AND the
 * service re-verifies course ownership (admins excepted).
 */
@Controller('analytics/courses')
@UseGuards(AuthGuard('jwt'))
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly pulse: CoursePulseService,
  ) {}

  /** The studio's course pulse: the path, Tey's read, activity (range = 7|30|90 days). */
  @Get(':courseId/pulse')
  async getPulse(@Req() req: any, @Param('courseId') courseId: string, @Query('range') range?: string) {
    return this.pulse.getPulse(req.user.id as string, courseId, Number(range) || 30, req.user.role === 'ADMIN');
  }

  /** One lesson up close: where learners stop, the hardest exercises, who's stuck. */
  @Get(':courseId/lessons/:lessonId/insight')
  async getLessonInsight(
    @Req() req: any,
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.pulse.getLessonInsight(req.user.id as string, courseId, lessonId, req.user.role === 'ADMIN');
  }

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
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly pulse: CoursePulseService,
    private readonly home: StudioHomeService,
  ) {}

  /** The studio home: this week, what needs the creator, every course, live activity. */
  @Get('home')
  async getHome(@Req() req: any) {
    return this.home.getHome(req.user.id as string);
  }

  /** Red dots for the studio menu: learners to nudge, questions to answer. */
  @Get('badges')
  async getBadges(@Req() req: any) {
    return this.pulse.getBadges(req.user.id as string);
  }

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
