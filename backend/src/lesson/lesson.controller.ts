import { Controller, Get, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('lesson')
@UseGuards(AuthGuard('jwt'))
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get(':id')
  async getLesson(@Param('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Patch(':id')
  async updateLesson(@Param('id') id: string, @Body() updateData: UpdateLessonDto) {
    return this.lessonService.updateLesson(id, updateData);
  }
}
