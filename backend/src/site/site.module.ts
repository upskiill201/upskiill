import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SiteController } from './site.controller';
import { SiteSettingsService } from './site-settings.service';

@Module({
  imports: [PrismaModule],
  controllers: [SiteController],
  providers: [SiteSettingsService],
  exports: [SiteSettingsService],
})
export class SiteModule {}
