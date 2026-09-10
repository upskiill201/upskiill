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
import { AuthGuard } from '@nestjs/passport';
import { LessonService } from './lesson.service';
import { UpdateLessonMetadataDto, UpdateLessonPhaseDto, AddLessonResourceDto, UpdateLessonResourceDto, PublishLessonDto, FullSaveLessonDto } from './dto/update-lesson.dto';

@Controller('lesson')
@UseGuards(AuthGuard('jwt'))
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get(':id')
  async getLesson(@Param('id') id: string, @Request() req) {
    return this.lessonService.getLesson(id, req.user);
  }

  @Patch(':id/metadata')
  async updateLessonMetadata(@Param('id') id: string, @Body() updateData: UpdateLessonMetadataDto, @Request() req) {
    return this.lessonService.updateLessonMetadata(id, updateData, req.user);
  }

  @Patch(':id/phases/:phase')
  async updateLessonPhase(
    @Param('id') id: string,
    @Param('phase') phase: string,
    @Body() updateData: UpdateLessonPhaseDto,
    @Request() req
  ) {
    return this.lessonService.updateLessonPhase(id, phase, updateData, req.user);
  }

  /** Batched save — saves ALL data in ONE request. Used by lesson builder. */
  @Patch(':id/full-save')
  async fullSave(@Param('id') id: string, @Body() data: FullSaveLessonDto, @Request() req) {
    return this.lessonService.fullSave(id, data, req.user);
  }

  /** Batched save + publish in ONE request. */
  @Post(':id/full-save-publish')
  async fullSaveAndPublish(@Param('id') id: string, @Body() data: FullSaveLessonDto, @Request() req) {
    return this.lessonService.fullSaveAndPublish(id, data, req.user);
  }

  @Post(':id/resources')
  async addLessonResource(@Param('id') id: string, @Body() resourceData: AddLessonResourceDto, @Request() req) {
    return this.lessonService.addLessonResource(id, resourceData, req.user);
  }

  /** Update an existing resource (title, file replacement, metadata…). Used by Edit/Replace in the builder. */
  @Patch(':id/resources/:resourceId')
  async updateLessonResource(
    @Param('id') id: string,
    @Param('resourceId') resourceId: string,
    @Body() resourceData: UpdateLessonResourceDto,
    @Request() req
  ) {
    return this.lessonService.updateLessonResource(id, resourceId, resourceData, req.user);
  }

  @Delete(':id/resources/:resourceId')
  async removeLessonResource(@Param('id') id: string, @Param('resourceId') resourceId: string, @Request() req) {
    return this.lessonService.removeLessonResource(id, resourceId, req.user);
  }

  @Post(':id/publish')
  async publishLesson(@Param('id') id: string, @Body() publishData: PublishLessonDto, @Request() req) {
    return this.lessonService.publishLesson(id, publishData, req.user);
  }
}
