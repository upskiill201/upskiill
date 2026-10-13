import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OriginalsController } from './originals.controller';
import { OriginalsService } from './originals.service';

@Module({
  imports: [PrismaModule],
  controllers: [OriginalsController],
  providers: [OriginalsService],
  exports: [OriginalsService],
})
export class OriginalsModule {}
