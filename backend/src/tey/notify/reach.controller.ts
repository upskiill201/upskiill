import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';
import { GetUser } from '../../auth/decorator/get-user.decorator';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { ReachService } from './reach.service';

interface AuthedUser {
  id: string;
}

export class ReachPingDto {
  @IsOptional()
  @IsBoolean()
  standalone?: boolean;

  @IsOptional()
  @IsIn(['default', 'granted', 'denied', 'unsupported'])
  permission?: string;

  @IsOptional()
  @IsBoolean()
  subscribed?: boolean;
}

export class ReachAskDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(1000)
  @IsString({ each: true })
  userIds!: string[];
}

/** The learner's app reporting whether it's installed and can be pushed. */
@Controller('tey/reach')
@UseGuards(AuthGuard('jwt'))
export class ReachController {
  constructor(private readonly reach: ReachService) {}

  @Post('ping')
  @HttpCode(200)
  ping(@GetUser() user: AuthedUser, @Body() dto: ReachPingDto) {
    return this.reach.ping(user.id, dto);
  }

  @Post('shown')
  @HttpCode(204)
  async shown(@GetUser() user: AuthedUser) {
    await this.reach.markAskShown(user.id);
  }
}

/** Teyro HQ: who can be reached, and a manual "install + turn on reminders" ask. */
@Controller('tey/admin/reach')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN)
export class ReachAdminController {
  constructor(private readonly reach: ReachService) {}

  @Get()
  list() {
    return this.reach.list();
  }

  @Post('ask')
  @HttpCode(200)
  ask(@GetUser() user: AuthedUser, @Body() dto: ReachAskDto) {
    return this.reach.requestAsk(user.id, dto.userIds);
  }
}
