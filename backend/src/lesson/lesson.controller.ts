import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateLessonMetadataDto, UpdateLessonPhaseDto, AddLessonResourceDto } from './dto/update-lesson.dto';

@Controller('lesson')
@UseGuards(AuthGuard('jwt'))
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get(':id')
  async getLesson(@Param('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Patch(':id/metadata')
  async updateLessonMetadata(@Param('id') id: string, @Body() updateData: UpdateLessonMetadataDto) {
    return this.lessonService.updateLessonMetadata(id, updateData);
  }

  @Patch(':id/phases/:phase')
  async updateLessonPhase(
    @Param('id') id: string,
    @Param('phase') phase: string,
    @Body() updateData: UpdateLessonPhaseDto
  ) {
    return this.lessonService.updateLessonPhase(id, phase, updateData);
  }

  @Post(':id/resources')
  async addLessonResource(@Param('id') id: string, @Body() resourceData: AddLessonResourceDto) {
    return this.lessonService.addLessonResource(id, resourceData);
  }

  @Delete(':id/resources/:resourceId')
  async removeLessonResource(@Param('id') id: string, @Param('resourceId') resourceId: string) {
    return this.lessonService.removeLessonResource(id, resourceId);
  }
}
