import { Module } from '@nestjs/common';
import { LeagueController } from './league.controller';
import { LeagueListener } from './league.listener';
import { LeagueService } from './league.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LeagueController],
  providers: [LeagueService, LeagueListener],
  exports: [LeagueService],
})
export class LeagueModule {}
