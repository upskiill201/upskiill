import { Controller, Get, Header } from '@nestjs/common';
import { SiteSettingsService } from './site-settings.service';

/** Public, unauthenticated reads of site content. Never returns anything private. */
@Controller('site')
export class SiteController {
  constructor(private readonly settings: SiteSettingsService) {}

  @Get('intro-video')
  @Header('Cache-Control', 'public, max-age=60, s-maxage=60, stale-while-revalidate=300')
  introVideo() {
    return this.settings.getIntroVideo();
  }
}
