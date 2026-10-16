import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { OriginalsService } from './originals.service';
import { TestOutService } from './test-out.service';
import { SubmitTestOutDto } from './dto/test-out.dto';

/**
 * Teyro Originals catalogue. Unversioned like the rest of the live API
 * (CLAUDE.md §5 conscious deviation) so it sits next to /courses.
 */
@Controller('originals')
export class OriginalsController {
  constructor(
    private readonly originals: OriginalsService,
    private readonly testOut: TestOutService,
  ) {}

  /** Public: every published Original, grouped by Track, levels in order. */
  @Get()
  async listTracks() {
    return this.originals.listTracks();
  }

  /** Jump ahead: a test on every chapter before :sectionId. */
  @UseGuards(AuthGuard('jwt'))
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @Get('courses/:id/jump/:sectionId')
  async jumpTest(
    @Req() req: any,
    @Param('id') id: string,
    @Param('sectionId') sectionId: string,
  ) {
    return this.testOut.jumpTest(req.user.id as string, id, sectionId);
  }

  /** Placement: a few questions per chapter, for courses that offer it. */
  @UseGuards(AuthGuard('jwt'))
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @Get('courses/:id/placement')
  async placementTest(@Param('id') id: string) {
    return this.testOut.placementTest(id);
  }

  /** Record a passed Jump ahead test or a placement result. */
  @UseGuards(AuthGuard('jwt'))
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('courses/:id/test-out')
  @HttpCode(200)
  async submit(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: SubmitTestOutDto,
  ) {
    return this.testOut.submit(req.user.id as string, id, body);
  }
}
