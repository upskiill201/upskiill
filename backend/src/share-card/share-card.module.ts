import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ReferralModule } from '../referral/referral.module';
import { ShareCardController } from './share-card.controller';
import { ShareCardService } from './share-card.service';

@Module({
  imports: [PrismaModule, ReferralModule],
  controllers: [ShareCardController],
  providers: [ShareCardService],
})
export class ShareCardModule {}
