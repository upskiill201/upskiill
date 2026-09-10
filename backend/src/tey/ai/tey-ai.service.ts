import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { TeyContext } from '../contracts/tey-context.types';
import { AiBudgetService, type AiPurpose } from './ai-budget.service';
import { AiConfigService } from './ai-config.service';
import {
  AiCompletionResult,
  AiProvider,
  AiProviderError,
} from './ai-provider.interface';
import { buildNudgeSystemPrompt, NUDGE_SCHEMA } from './tey-personality';
import { NudgeCopySchema, parseStructured, type NudgeCopy } from './structured-output';

export interface GenerateNudgeResult {
  copy: NudgeCopy | null;
  /** Why AI was not used, or why it failed. Null on success. */
  fallbackReason: string | null;
  providerId?: string;
  model?: string;
  latencyMs?: number;
  usage?: { inputTokens: number; outputTokens: number };
}

/**
 * Tey's AI layer.
 *
 * Two rules the rest of the system depends on:
 *
 * 1. **AI is never the source of truth.** It receives facts and produces
 *    language. Every number it sees came from the backend, and nothing it
 *    returns is stored as a fact.
 *
 * 2. **AI is optional, always.** Every entry point returns a fallback reason
 *    rather than throwing, so the caller can use a template. A model being
 *    down, over budget, or badly configured must never mean a learner hears
 *    nothing.
 */
@Injectable()
export class TeyAiService {
  private readonly logger = new Logger(TeyAiService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: AiConfigService,
    private readonly budget: AiBudgetService,
  ) {}

  /** Whether the AI path is worth attempting at all right now. */
  async isEnabled(): Promise<boolean> {
    if (process.env.TEY_AI_ENABLED !== 'true') return false;
    const { primary, fallback } = await this.config.resolve();
    return !!(primary || fallback);
  }

  /**
   * Generates personalized nudge copy.
   *
   * Callers MUST treat a null `copy` as normal and render a template — see
   * TeyDeliveryService. This is the cost-control hierarchy from spec section
   * 26 in practice: most nudges never reach this method at all, and the ones
   * that do can still decline.
   */
  async generateNudgeCopy(
    ctx: TeyContext,
    userId: string,
  ): Promise<GenerateNudgeResult> {
    // A CRITICAL nudge is time-sensitive by definition; waiting up to 8s on a
    // model to phrase "your streak ends in two hours" is a bad trade.
    if (ctx.urgency === 'CRITICAL') {
      return { copy: null, fallbackReason: 'CRITICAL_USES_TEMPLATE' };
    }

    const allowed = await this.budget.check('NUDGE_COPY', userId);
    if (!allowed.allow) {
      return { copy: null, fallbackReason: allowed.reason };
    }

    const { primary, fallback } = await this.config.resolve();
    if (!primary && !fallback) {
      return { copy: null, fallbackReason: 'NO_PROVIDER' };
    }

    const system = buildNudgeSystemPrompt(ctx);
    const attempt = async (
      provider: AiProvider,
    ): Promise<GenerateNudgeResult | null> => {
      const row = await this.rowFor(provider);
      const started = Date.now();

      try {
        const result = await provider.complete({
          system,
          messages: [
            {
              role: 'user',
              content:
                'Write the notification now. Reply with JSON only: {"title": "...", "body": "..."}',
            },
          ],
          maxOutputTokens: row?.maxOutputTokens ?? 400,
          temperature: row?.temperature ?? 0.8,
          timeoutMs: row?.timeoutMs ?? 8000,
          jsonSchema: NUDGE_SCHEMA as unknown as Record<string, unknown>,
        });

        const latencyMs = Date.now() - started;
        await this.recordUsage(provider, 'NUDGE_COPY', result, userId);

        const parsed = parseStructured(result.text, NudgeCopySchema);
        if (!parsed.ok) {
          // Malformed output is routine, not exceptional. Log it and let the
          // caller use a template — never ship unvalidated text to a learner.
          this.logger.warn(
            `AI nudge copy rejected (${parsed.reason}) from ${provider.model}`,
          );
          return { copy: null, fallbackReason: `INVALID_OUTPUT:${parsed.reason}` };
        }

        return {
          copy: parsed.value,
          fallbackReason: null,
          providerId: row?.id,
          model: result.model,
          latencyMs,
          usage: result.usage,
        };
      } catch (err) {
        const kind =
          err instanceof AiProviderError ? err.kind : 'UNKNOWN';
        this.logger.warn(`AI provider ${provider.model} failed: ${kind}`);
        return null;
      }
    };

    if (primary) {
      const result = await attempt(primary);
      if (result) return result;
    }

    // Only reached when the primary threw — a rejected-output result is
    // returned above rather than burning a second provider on the same prompt.
    if (fallback) {
      const result = await attempt(fallback);
      if (result) return result;
    }

    return { copy: null, fallbackReason: 'ALL_PROVIDERS_FAILED' };
  }

  /**
   * Raw completion for the admin playground and connection tests. Deliberately
   * not wrapped in the template-fallback logic — an operator testing a provider
   * wants the real error.
   */
  async complete(
    provider: AiProvider,
    system: string,
    prompt: string,
    opts: { maxOutputTokens?: number; timeoutMs?: number } = {},
  ): Promise<{ result: AiCompletionResult; latencyMs: number }> {
    const started = Date.now();
    const result = await provider.complete({
      system,
      messages: [{ role: 'user', content: prompt }],
      maxOutputTokens: opts.maxOutputTokens ?? 200,
      timeoutMs: opts.timeoutMs ?? 8000,
    });
    return { result, latencyMs: Date.now() - started };
  }

  // ── internals ────────────────────────────────────────────────────────────

  private async rowFor(provider: AiProvider) {
    return this.prisma.teyAiProviderConfig.findFirst({
      where: { model: provider.model, kind: provider.kind, isActive: true },
      select: {
        id: true,
        maxOutputTokens: true,
        temperature: true,
        timeoutMs: true,
        inputCostPer1k: true,
        outputCostPer1k: true,
      },
    });
  }

  private async recordUsage(
    provider: AiProvider,
    purpose: AiPurpose,
    result: AiCompletionResult,
    userId?: string | null,
  ): Promise<void> {
    const row = await this.rowFor(provider);
    if (!row) return;

    await this.budget.record(
      row.id,
      purpose,
      result.usage,
      {
        inputCostPer1k: Number(row.inputCostPer1k),
        outputCostPer1k: Number(row.outputCostPer1k),
      },
      userId,
    );
  }
}
