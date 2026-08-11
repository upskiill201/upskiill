import { Module } from '@nestjs/common';
import { ChestController } from './chest.controller';
import { ChestService } from './chest.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ChestUnlockConsumer } from './chest-unlock.consumer';

@Module({
  imports: [PrismaModule],
  controllers: [ChestController],
  providers: [ChestService, ChestUnlockConsumer],
  exports: [ChestService],
})
export class ChestModule {}
