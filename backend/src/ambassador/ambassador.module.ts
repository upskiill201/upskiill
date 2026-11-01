import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProAccessModule } from '../pro/pro-access.module';
import { ReferralModule } from '../referral/referral.module';
import { TeyModule } from '../tey/tey.module';
import { AmbassadorAdminController, AmbassadorController } from './ambassador.controller';
import { AmbassadorAdminService } from './ambassador-admin.service';
import { AmbassadorService } from './ambassador.service';

@Module({
  imports: [PrismaModule, ProAccessModule, ReferralModule, TeyModule],
  // Admin first, so /ambassador/admin/* is never read as a learner route.
  controllers: [AmbassadorAdminController, AmbassadorController],
  providers: [AmbassadorService, AmbassadorAdminService],
  exports: [AmbassadorService],
})
export class AmbassadorModule {}
