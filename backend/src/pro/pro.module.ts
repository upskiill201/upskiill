import { Module } from '@nestjs/common';
import { PaymentModule } from '../payment/payment.module';
import { ProAccessModule } from './pro-access.module';
import { ProCatalogService } from './pro-catalog.service';
import { ProCheckoutService } from './pro-checkout.service';
import { ProController } from './pro.controller';
import { ProLegacyRenewalsListener } from './pro-legacy-renewals.listener';
import { ProMaintenanceService } from './pro-maintenance.service';
import { ProMesombService } from './pro-mesomb.service';
import { ProPaywallService } from './pro-paywall.service';
import { ProSubscriptionSyncService } from './pro-subscription-sync.service';
import { ProWebhookService } from './pro-webhook.service';
import { StripeProClient } from './stripe/stripe-pro.client';

/**
 * Teyro Pro billing: checkout, Stripe sync, webhooks, paywall analytics and
 * offers. Access checks live in the leaf ProAccessModule; email and push
 * hear about billing only through `pro.*` events, never by import.
 */
@Module({
  imports: [ProAccessModule, PaymentModule],
  controllers: [ProController],
  providers: [
    StripeProClient,
    ProCatalogService,
    ProSubscriptionSyncService,
    ProCheckoutService,
    ProPaywallService,
    ProWebhookService,
    ProMesombService,
    ProMaintenanceService,
    ProLegacyRenewalsListener,
  ],
  exports: [ProPaywallService, StripeProClient, ProCatalogService],
})
export class ProModule {}
