import { Module } from '@nestjs/common';
import { ChestController } from './chest.controller';
import { ChestService } from './chest.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChestController],
  providers: [ChestService],
  exports: [ChestService],
})
export class ChestModule {}
