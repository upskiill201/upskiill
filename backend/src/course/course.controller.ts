import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Req,
  Post,
  Patch,
  Delete,
  Body,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { CourseService } from './course.service';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { OptionalJwtGuard } from '../auth/guard/optional-jwt.guard';
import { Role } from '@prisma/client';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll(
    @Query()
    query: {
      search?: string;
      category?: string;
      minPrice?: string;
      maxPrice?: string;
      take?: string;
    },
  ) {
    return await this.courseService.findAll({
      search: query.search,
      category: query.category,
      minPrice: query.minPrice ? Number(query.minPrice) : undefined,
      maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
      take: query.take ? Number(query.take) : undefined,
    });
  }

  @Get(':id')
  // Optional auth: guests can browse published courses, but a valid session
  // lets the owner (or an admin) see their own drafts with full lesson detail.
  @UseGuards(OptionalJwtGuard)
  async findOne(@Req() req: any, @Param('id') id: string) {
    const requesterId = req.user?.id as string | undefined;
    const isAdmin = req.user?.role === 'ADMIN';
    return await this.courseService.findOne(id, requesterId, isAdmin);
  }

  /**
   * Public view ping from the course detail page. Counts an anonymous visit
   * into the daily aggregate — no identity is stored. Rate limited so this
   * can't be used to inflate numbers cheaply.
   */
  @Post(':id/view')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async recordView(@Param('id') id: string) {
    return await this.courseService.recordView(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/lessons/:lessonId')
  async getStudentLesson(
    @Req() req: any,
    @Param('id') id: string,
    @Param('lessonId') lessonId: string,
  ) {
    return await this.courseService.getStudentLesson(
      req.user.id as string,
      id,
      lessonId,
    );
  }

  @Get(':id/plans')
  async getPricingPlans(@Param('id') id: string) {
    return await this.courseService.getCoursePricingPlans(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/access')
  async getAccess(@Req() req: any, @Param('id') id: string) {
    return await this.courseService.getCourseAccess(req.user.id as string, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/progress')
  async getProgress(@Req() req: any, @Param('id') id: string) {
    return await this.courseService.getProgress(req.user.id as string, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/complete-lesson')
  async completeLesson(
    @Req() req: any,
    @Param('id') id: string,
    @Body('lessonId') lessonId: string,
    @Body('timezoneOffset') timezoneOffset?: number,
    @Body('timeSpentSeconds') timeSpentSeconds?: number,
    @Body('attemptsCount') attemptsCount?: number,
    @Body('quizScorePct') quizScorePct?: number,
  ) {
    return await this.courseService.markLessonComplete(
      req.user.id as string,
      id,
      lessonId,
      timezoneOffset ?? 0,
      req.user.role === 'ADMIN',
      typeof timeSpentSeconds === 'number' ? timeSpentSeconds : undefined,
      typeof attemptsCount === 'number' ? attemptsCount : undefined,
      typeof quizScorePct === 'number' ? quizScorePct : undefined,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/enrollment')
  async unenroll(@Req() req: any, @Param('id') id: string) {
    return await this.courseService.unenrollUser(req.user.id as string, id);
  }

  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  async createCourse(
    @Req() req: any,
    @Body()
    body: {
      title: string;
      category: string;
      creatorTimeWeekly?: string;
    },
  ) {
    return await this.courseService.createCourse(req.user.id as string, {
      title: body.title,
      category: body.category,
      creatorTimeWeekly: body.creatorTimeWeekly,
    });
  }

  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('instructor/me')
  async getInstructorCourses(@Req() req: any) {
    return await this.courseService.getInstructorCourses(req.user.id as string);
  }

  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get(':id/draft')
  async getDraft(@Req() req: any, @Param('id') id: string) {
    return await this.courseService.getOwnedDraft(req.user.id as string, id);
  }

  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  async updateCourse(
    @Req() req: any,
    @Param('id') id: string,
    @Body()
    body: {
      title?: string;
      description?: string;
      shortDescription?: string;
      thumbnailUrl?: string;
      price?: number;
      originalPrice?: number;
      level?: string;
      subtitle?: string;
      startingPoint?: string;
      endOutcome?: string;
      realOutputs?: string[];
      subcategory?: string;
      language?: string;
      skills?: string[];
      requirements?: string[];
      outcomes?: string[];
      curriculum?: unknown;
    },
  ) {
    return await this.courseService.updateCourse(
      req.user.id as string,
      id,
      body,
    );
  }

  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post(':id/publish')
  async publishCourse(@Req() req: any, @Param('id') id: string) {
    return await this.courseService.publishCourse(req.user.id as string, id);
  }

  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post(':id/unpublish')
  async unpublishCourse(@Req() req: any, @Param('id') id: string) {
    return await this.courseService.unpublishCourse(req.user.id as string, id);
  }

  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post(':id/duplicate')
  async duplicateCourse(@Req() req: any, @Param('id') id: string) {
    return await this.courseService.duplicateCourse(req.user.id as string, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post(':id/enroll')
  async enrollInCourse(@Req() req: any, @Param('id') id: string) {
    return await this.courseService.enrollInCourse(
      req.user.id as string,
      id,
      req.user.role === 'ADMIN',
    );
  }

  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  async deleteCourse(@Req() req: any, @Param('id') id: string) {
    return await this.courseService.deleteCourse(req.user.id as string, id);
  }

  // ─── CURRICULUM MANAGEMENT ───

  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get(':id/curriculum')
  async getCurriculum(@Req() req: any, @Param('id') id: string) {
    return await this.courseService.getFullCurriculum(
      req.user.id as string,
      id,
    );
  }

  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post(':id/sections')
  async createSection(
    @Req() req: any,
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('goal') goal?: string,
  ) {
    return await this.courseService.createSection(
      req.user.id as string,
      id,
      title,
      goal,
    );
  }

  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch('sections/:sectionId')
  async updateSection(
    @Req() req: any,
    @Param('sectionId') sectionId: string,
    @Body() body: { title?: string; goal?: string },
  ) {
    return await this.courseService.updateSection(
      req.user.id as string,
      sectionId,
      { title: body.title, goal: body.goal },
    );
  }

  /** Persist drag-to-reorder of a course's modules. */
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post(':id/sections/reorder')
  async reorderSections(
    @Req() req: any,
    @Param('id') id: string,
    @Body('orderedIds') orderedIds: string[],
  ) {
    return await this.courseService.reorderSections(
      req.user.id as string,
      id,
      orderedIds,
    );
  }

  /** Persist drag-to-reorder of lessons inside one module. */
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('sections/:sectionId/lessons/reorder')
  async reorderLessons(
    @Req() req: any,
    @Param('sectionId') sectionId: string,
    @Body('orderedIds') orderedIds: string[],
  ) {
    return await this.courseService.reorderLessons(
      req.user.id as string,
      sectionId,
      orderedIds,
    );
  }

  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete('sections/:sectionId')
  async deleteSection(@Req() req: any, @Param('sectionId') sectionId: string) {
    return await this.courseService.deleteSection(
      req.user.id as string,
      sectionId,
    );
  }

  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('sections/:sectionId/lessons')
  async createLesson(
    @Req() req: any,
    @Param('sectionId') sectionId: string,
    @Body('title') title: string,
    @Body('lessonType') lessonType?: string,
  ) {
    return await this.courseService.createLesson(
      req.user.id as string,
      sectionId,
      title,
      lessonType,
    );
  }

  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch('lessons/:lessonId')
  async updateLesson(
    @Req() req: any,
    @Param('lessonId') lessonId: string,
    @Body()
    body: {
      title?: string;
      lessonType?: string;
      description?: string;
      shortDescription?: string;
      durationMinutes?: number;
      isFreePreview?: boolean;
      contentBlocks?: any;
    },
  ) {
    return await this.courseService.updateLesson(
      req.user.id as string,
      lessonId,
      body,
    );
  }

  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete('lessons/:lessonId')
  async deleteLesson(@Req() req: any, @Param('lessonId') lessonId: string) {
    return await this.courseService.deleteLesson(
      req.user.id as string,
      lessonId,
    );
  }
}
