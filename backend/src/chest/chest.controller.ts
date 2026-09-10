import { Controller, Get, Post, Param, Req, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ChestService } from './chest.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Controller('chest')
@UseGuards(AuthGuard('jwt'))
export class ChestController {
  constructor(private readonly chestService: ChestService) {}

  @Get('today')
  async getTodayChest(@Req() req: Request) {
    const userId = (req.user as any).id;
    const timezoneOffsetMinutes = parseInt(req.headers['x-timezone-offset'] as string || '0', 10);
    return this.chestService.getOrCreateTodayChest(userId, timezoneOffsetMinutes);
  }

  @Post(':chestId/open')
  async openChest(@Param('chestId') chestId: string, @Req() req: Request) {
    const userId = (req.user as any).id;
    const timezoneOffsetMinutes = parseInt(req.headers['x-timezone-offset'] as string || '0', 10);
    
    try {
      return await this.chestService.openChest(userId, chestId, timezoneOffsetMinutes);
    } catch (error: any) {
      console.error('Error opening chest:', error);
      if (error.message === 'CHEST_NOT_OPENABLE') {
        throw new HttpException('Chest is not ready to open', HttpStatus.CONFLICT);
      }
      if (error.message === 'CHEST_EXPIRED') {
        throw new HttpException('Chest has expired', HttpStatus.GONE);
      }
      if (error.message === 'NOT_FOUND') {
        throw new HttpException('Chest not found', HttpStatus.NOT_FOUND);
      }
      if (error.message === 'POOL_MISCONFIGURED') {
        throw new HttpException('Reward pool misconfigured', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      throw new HttpException(error.message || 'Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
