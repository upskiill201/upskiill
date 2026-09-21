import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { emailConfig } from '../email.config';
import { SendEmailError } from '../providers/email-provider.interface';
import { EmailJobProcessorService } from './email-job-processor.service';
import { EmailJobRepository, EmailJobRow } from './email-job.repository';

export interface EmailTickSummary {
  claimed: number;
  sent: number;
  skipped: number;
  failed: number;
  reaped: number;
}

/**
 * Drives email_jobs the same way TeySchedulerService drives
 * tey_scheduled_actions: claim a small batch every tick, process each job
 * with its own try/catch so one bad job never blocks the batch, exit.
 * Runs at :15 past each minute to avoid colliding with Tey's :30 tick and
 * anything else on a round-minute boundary.
 */
@Injectable()
export class EmailSchedulerService {
  private readonly logger = new Logger(EmailSchedulerService.name);

  constructor(
    private readonly jobs: EmailJobRepository,
    private readonly processor: EmailJobProcessorService,
  ) {}

  @Cron('15 * * * * *', { name: 'email-scheduler-tick' })
  async scheduledTick(): Promise<void> {
    if (!emailConfig.schedulerEnabled) return;
    try {
      await this.tick();
    } catch (err) {
      this.logger.error('Email scheduler tick failed', err as Error);
    }
  }

  async tick(limit = emailConfig.jobBatchSize): Promise<EmailTickSummary> {
    const summary: EmailTickSummary = {
      claimed: 0,
      sent: 0,
      skipped: 0,
      failed: 0,
      reaped: 0,
    };

    summary.reaped = await this.jobs.reapStaleClaims();

    const due = await this.jobs.claimDue(limit);
    summary.claimed = due.length;
    if (due.length === 0) return summary;

    // Bounded concurrency (spec §12/§15): process the batch in chunks of
    // EMAIL_WORKER_CONCURRENCY rather than either fully sequential or fully
    // parallel, so a burst of due jobs can't open unbounded Resend/DB work.
    const concurrency = Math.max(1, emailConfig.workerConcurrency);
    for (let i = 0; i < due.length; i += concurrency) {
      const chunk = due.slice(i, i + concurrency);
      await Promise.all(chunk.map((job) => this.processOne(job, summary)));
    }

    this.logger.log(
      `email tick: claimed=${summary.claimed} sent=${summary.sent} skipped=${summary.skipped} failed=${summary.failed} reaped=${summary.reaped}`,
    );
    return summary;
  }

  private async processOne(
    job: EmailJobRow,
    summary: EmailTickSummary,
  ): Promise<void> {
    try {
      const outcome = await this.processor.process(job);
      if (outcome.sent) {
        await this.jobs.markSent(job.id);
        summary.sent++;
      } else {
        await this.jobs.markSkipped(job.id, outcome.skipReason ?? 'UNKNOWN');
        summary.skipped++;
      }
    } catch (err) {
      summary.failed++;
      const kind = err instanceof SendEmailError ? err.kind : 'TRANSIENT';
      if (kind === 'PERMANENT') {
        // Don't burn retries on something that will never succeed.
        await this.jobs.markFailed(job.id, 999, (err as Error).message);
      } else {
        await this.jobs.markFailed(
          job.id,
          job.attempts,
          (err as Error).message,
        );
      }
      this.logger.error(
        `Email job ${job.id} (${job.eventType}) failed`,
        err as Error,
      );
    }
  }
}
