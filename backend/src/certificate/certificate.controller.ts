import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { Role } from '@prisma/client';
import { Equals, IsString, MaxLength } from 'class-validator';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { CertificateService } from './certificate.service';

class SetCertificateNameDto {
  @IsString()
  @MaxLength(120)
  name!: string;

  /** The learner ticked "I confirm this is my real name". */
  @Equals(true)
  confirm!: boolean;
}

class SupportCertificateNameDto {
  @IsString()
  @MaxLength(120)
  name!: string;
}

@Controller('certificates')
export class CertificateController {
  constructor(private readonly certificates: CertificateService) {}

  /** GET /certificates/mine — every certificate I hold (issues any I've earned but never opened). */
  @UseGuards(AuthGuard('jwt'))
  @Get('mine')
  mine(@Req() req: { user: { id: string } }) {
    return this.certificates.mine(req.user.id);
  }

  /** GET /certificates/name — the name on my certificates and whether I can still change it. */
  @UseGuards(AuthGuard('jwt'))
  @Get('name')
  name(@Req() req: { user: { id: string } }) {
    return this.certificates.nameState(req.user.id);
  }

  /** PUT /certificates/name — confirm (or, once, correct) the name on my certificates. */
  @UseGuards(AuthGuard('jwt'))
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Put('name')
  setName(
    @Req() req: { user: { id: string } },
    @Body() body: SetCertificateNameDto,
  ) {
    return this.certificates.setName(req.user.id, body.name);
  }

  /** PUT /certificates/admin/users/:userId/name — Teyro HQ changes a learner's certificate name on a support request. */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @Put('admin/users/:userId/name')
  setNameBySupport(
    @Param('userId') userId: string,
    @Body() body: SupportCertificateNameDto,
  ) {
    return this.certificates.setNameBySupport(userId, body.name);
  }

  /** GET /certificates/course/:courseId — my certificate for one course, NAME_REQUIRED, or how far I have to go. */
  @UseGuards(AuthGuard('jwt'))
  @Get('course/:courseId')
  forCourse(
    @Req() req: { user: { id: string } },
    @Param('courseId') courseId: string,
  ) {
    return this.certificates.forCourse(req.user.id, courseId);
  }

  /** GET /certificates/verify/:code — public: anyone can check a credential ID. */
  @Throttle({ default: { limit: 60, ttl: 60000 } })
  @Get('verify/:code')
  verify(@Param('code') code: string) {
    return this.certificates.verify(code);
  }
}
