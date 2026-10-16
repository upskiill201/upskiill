import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OriginalsController } from './originals.controller';
import { OriginalsService } from './originals.service';
import { TestOutService } from './test-out.service';

@Module({
  imports: [PrismaModule],
  controllers: [OriginalsController],
  providers: [OriginalsService, TestOutService],
  exports: [OriginalsService],
})
export class OriginalsModule {}
