import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StudentsService } from './students.service';

/**
 * Creator-facing learner intelligence. Read-only: every route is a GET and
 * every payload is scoped to courses the requester owns. Literal routes are
 * declared before :studentId so they are never captured by it.
 */
@Controller('students')
@UseGuards(AuthGuard('jwt'))
export class StudentsController {
  constructor(private readonly students: StudentsService) {}

  @Get('overview')
  async overview(@Req() req: any) {
    return this.students.getOverview(req.user.id as string);
  }

  @Get('needs-attention')
  async needsAttention(@Req() req: any) {
    return this.students.getNeedsAttention(req.user.id as string);
  }

  @Get('insights')
  async insights(@Req() req: any) {
    return this.students.getInsights(req.user.id as string);
  }

  @Get(':studentId')
  async detail(@Req() req: any, @Param('studentId') studentId: string) {
    return this.students.getStudentDetail(req.user.id as string, studentId);
  }

  @Get()
  async roster(
    @Req() req: any,
    @Query('segment') segment?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('courseId') courseId?: string,
    @Query('sort') sort?: string,
  ) {
    return this.students.getRoster(req.user.id as string, {
      segment,
      search,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      courseId: courseId || undefined,
      sort,
    });
  }
}
