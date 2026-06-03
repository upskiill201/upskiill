import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { CreatorOnboardingService } from './creator-onboarding.service';

@Controller('creator-onboarding')
export class CreatorOnboardingController {
  constructor(private readonly creatorOnboardingService: CreatorOnboardingService) {}

  @Post()
  async createDraft(@Body() initialData: any) {
    return this.creatorOnboardingService.createDraft(initialData);
  }

  @Get(':id')
  async getDraft(@Param('id') id: string) {
    return this.creatorOnboardingService.getDraft(id);
  }

  @Put(':id')
  async updateDraft(@Param('id') id: string, @Body() updateData: any) {
    return this.creatorOnboardingService.updateDraft(id, updateData);
  }
}
