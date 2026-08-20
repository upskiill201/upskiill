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
import { CourseService } from './course.service';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
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
    },
  ) {
    return await this.courseService.findAll({
      search: query.search,
      category: query.category,
      minPrice: query.minPrice ? Number(query.minPrice) : undefined,
      maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.courseService.findOne(id);
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
  ) {
    return await this.courseService.markLessonComplete(
      req.user.id as string,
      id,
      lessonId,
      timezoneOffset ?? 0,
    );
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
  @Post(':id/enroll')
  async enrollInCourse(@Req() req: any, @Param('id') id: string) {
    return await this.courseService.enrollInCourse(req.user.id as string, id);
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
  ) {
    return await this.courseService.createSection(
      req.user.id as string,
      id,
      title,
    );
  }

  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch('sections/:sectionId')
  async updateSection(
    @Req() req: any,
    @Param('sectionId') sectionId: string,
    @Body('title') title: string,
  ) {
    return await this.courseService.updateSection(
      req.user.id as string,
      sectionId,
      title,
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
