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
import { UpdateLessonMetadataDto, UpdateLessonPhaseDto, AddLessonResourceDto, PublishLessonDto, FullSaveLessonDto } from './dto/update-lesson.dto';

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

  /** Batched save — saves ALL data in ONE request. Used by lesson builder. */
  @Patch(':id/full-save')
  async fullSave(@Param('id') id: string, @Body() data: FullSaveLessonDto) {
    return this.lessonService.fullSave(id, data);
  }

  /** Batched save + publish in ONE request. */
  @Post(':id/full-save-publish')
  async fullSaveAndPublish(@Param('id') id: string, @Body() data: FullSaveLessonDto) {
    return this.lessonService.fullSaveAndPublish(id, data);
  }

  @Post(':id/resources')
  async addLessonResource(@Param('id') id: string, @Body() resourceData: AddLessonResourceDto) {
    return this.lessonService.addLessonResource(id, resourceData);
  }

  @Delete(':id/resources/:resourceId')
  async removeLessonResource(@Param('id') id: string, @Param('resourceId') resourceId: string) {
    return this.lessonService.removeLessonResource(id, resourceId);
  }

  @Post(':id/publish')
  async publishLesson(@Param('id') id: string, @Body() publishData: PublishLessonDto) {
    return this.lessonService.publishLesson(id, publishData);
  }
}

