import { Controller, Get } from '@nestjs/common';
import { OriginalsService } from './originals.service';

/**
 * Teyro Originals catalogue. Unversioned like the rest of the live API
 * (CLAUDE.md §5 conscious deviation) so it sits next to /courses.
 */
@Controller('originals')
export class OriginalsController {
  constructor(private readonly originals: OriginalsService) {}

  /** Public: every published Original, grouped by Track, levels in order. */
  @Get()
  async listTracks() {
    return this.originals.listTracks();
  }
}
