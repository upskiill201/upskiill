import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { CertificateService } from './certificate.service';

@Controller('certificates')
export class CertificateController {
  constructor(private readonly certificates: CertificateService) {}

  /** GET /certificates/mine — every certificate I hold (issues any I've earned but never opened). */
  @UseGuards(AuthGuard('jwt'))
  @Get('mine')
  mine(@Req() req: { user: { id: string } }) {
    return this.certificates.mine(req.user.id);
  }

  /** GET /certificates/course/:courseId — my certificate for one course, or how far I have to go. */
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
