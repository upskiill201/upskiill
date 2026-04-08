import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Req,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CourseService } from './course.service';

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
  ) {
    return await this.courseService.markLessonComplete(
      req.user.id as string,
      id,
      lessonId,
    );
  }
  @UseGuards(AuthGuard('jwt'))
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
}
