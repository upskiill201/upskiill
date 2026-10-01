import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { StudentsService } from './students.service';
import { NudgesService } from './nudges.service';
import { SendNudgesDto } from './dto/send-nudges.dto';

/**
 * Creator-facing learner intelligence. Every payload is scoped to courses the
 * requester owns; the one write is a nudge or cheer to their own learners.
 * Literal routes are declared before :studentId so they are never captured by it.
 */
@Controller('students')
@UseGuards(AuthGuard('jwt'))
export class StudentsController {
  constructor(
    private readonly students: StudentsService,
    private readonly nudges: NudgesService,
  ) {}

  /** Nudge or cheer learners of one of your courses (inbox + phone). */
  @Post('nudges')
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(RolesGuard)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  async sendNudges(@Req() req: any, @Body() body: SendNudgesDto) {
    return this.nudges.send(req.user.id as string, body);
  }

  @Get('nudges')
  async nudgeHistory(
    @Req() req: any,
    @Query('courseId') courseId?: string,
    @Query('learnerId') learnerId?: string,
  ) {
    return this.nudges.history(req.user.id as string, { courseId, learnerId });
  }

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
