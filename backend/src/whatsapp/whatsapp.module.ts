import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MetaWhatsAppService } from './meta/meta-whatsapp.service';
import { WhatsappWebhookService } from './whatsapp-webhook.service';

@Module({
  imports: [PrismaModule],
  controllers: [WhatsappController],
  providers: [WhatsappService, MetaWhatsAppService, WhatsappWebhookService],
  exports: [WhatsappService, MetaWhatsAppService],
})
export class WhatsappModule {}
