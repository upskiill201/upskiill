import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthEmailService } from './auth-email.service';
import { CheckoutIntentService } from './checkout-intent.service';
import { EmailController } from './email.controller';
import { EmailDispatchService } from './email-dispatch.service';
import { EmailLogService } from './email-log.service';
import { EmailPreferenceService } from './email-preference.service';
import { EmailUnsubscribeService } from './email-unsubscribe.service';
import { EmailJobProcessorService } from './jobs/email-job-processor.service';
import { EmailJobRepository } from './jobs/email-job.repository';
import { EmailLifecycleBatchService } from './jobs/email-lifecycle-batch.service';
import { EmailSchedulerService } from './jobs/email-scheduler.service';
import { EmailLifecycleListener } from './listeners/email-lifecycle.listener';
import { EMAIL_PROVIDER } from './providers/email-provider.interface';
import { ResendEmailProvider } from './providers/resend-email.provider';

@Module({
  imports: [PrismaModule],
  controllers: [EmailController],
  providers: [
    { provide: EMAIL_PROVIDER, useClass: ResendEmailProvider },
    EmailLogService,
    EmailPreferenceService,
    EmailUnsubscribeService,
    EmailDispatchService,
    AuthEmailService,
    CheckoutIntentService,
    EmailJobRepository,
    EmailJobProcessorService,
    EmailSchedulerService,
    EmailLifecycleBatchService,
    EmailLifecycleListener,
  ],
  exports: [
    EmailDispatchService,
    AuthEmailService,
    EmailPreferenceService,
    EmailUnsubscribeService,
    CheckoutIntentService,
    EmailJobRepository,
  ],
})
export class EmailModule {}
