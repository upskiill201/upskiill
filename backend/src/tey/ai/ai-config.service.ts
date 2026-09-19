import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  decryptJson,
  encryptJson,
  maskAccount,
} from '../../earnings/crypto.util';
import {
  AI_PROVIDER_KINDS,
  AiProvider,
  AiProviderKind,
} from './ai-provider.interface';
import { AnthropicAdapter } from './adapters/anthropic.adapter';
import { GeminiAdapter } from './adapters/gemini.adapter';
import { OpenAiCompatibleAdapter } from './adapters/openai-compatible.adapter';

export interface UpsertProviderInput {
  name: string;
  kind: AiProviderKind;
  model: string;
  baseUrl?: string | null;
  /** Plaintext, write-only. Omit on update to keep the stored key. */
  apiKey?: string;
  isActive?: boolean;
  isFallback?: boolean;
  maxOutputTokens?: number;
  temperature?: number;
  timeoutMs?: number;
  inputCostPer1k?: number;
  outputCostPer1k?: number;
  dailyBudgetUsd?: number;
}

/** Safe projection — never contains the key or the ciphertext. */
export interface ProviderView {
  id: string;
  name: string;
  kind: string;
  model: string;
  baseUrl: string | null;
  apiKeyMasked: string;
  isActive: boolean;
  isFallback: boolean;
  maxOutputTokens: number;
  temperature: number;
  timeoutMs: number;
  inputCostPer1k: number;
  outputCostPer1k: number;
  dailyBudgetUsd: number;
  lastTestAt: Date | null;
  lastTestOk: boolean | null;
  lastTestError: string | null;
}

/** Adapter cache TTL — avoids decrypting a key on every single call. */
const CACHE_TTL_MS = 60_000;

/** The dedicated provider row course-import lesson generation reads from —
 *  by name, not kind, so an admin can point it at whichever text model is
 *  actually reliable (Gemini, Groq, anything OPENAI_COMPATIBLE) without a
 *  code change. See resolveForCourseImport()'s doc comment for why this is
 *  never the shared resolve() primary/fallback pair. */
const COURSE_IMPORT_PROVIDER_NAME = 'course-import-generation';

@Injectable()
export class AiConfigService {
  private readonly logger = new Logger(AiConfigService.name);
  private cache: {
    at: number;
    primary: AiProvider | null;
    fallback: AiProvider | null;
  } | null = null;

  constructor(private readonly prisma: PrismaService) {}

  /**
   * The ONLY way a provider row leaves this service.
   *
   * Masking is enforced by this mapper rather than by remembering to omit a
   * field at each call site — the ciphertext is destructured away, so a new
   * endpoint cannot leak it by forgetting. A spec asserts no admin response
   * body ever contains `encryptedApiKey` or a raw key prefix.
   */
  static toView(row: {
    id: string;
    name: string;
    kind: string;
    model: string;
    baseUrl: string | null;
    keyTail: string;
    isActive: boolean;
    isFallback: boolean;
    maxOutputTokens: number;
    temperature: number;
    timeoutMs: number;
    inputCostPer1k: unknown;
    outputCostPer1k: unknown;
    dailyBudgetUsd: unknown;
    lastTestAt: Date | null;
    lastTestOk: boolean | null;
    lastTestError: string | null;
  }): ProviderView {
    return {
      id: row.id,
      name: row.name,
      kind: row.kind,
      model: row.model,
      baseUrl: row.baseUrl,
      apiKeyMasked: maskAccount(row.keyTail),
      isActive: row.isActive,
      isFallback: row.isFallback,
      maxOutputTokens: row.maxOutputTokens,
      temperature: row.temperature,
      timeoutMs: row.timeoutMs,
      inputCostPer1k: Number(row.inputCostPer1k),
      outputCostPer1k: Number(row.outputCostPer1k),
      dailyBudgetUsd: Number(row.dailyBudgetUsd),
      lastTestAt: row.lastTestAt,
      lastTestOk: row.lastTestOk,
      lastTestError: row.lastTestError,
    };
  }

  async list(): Promise<ProviderView[]> {
    const rows = await this.prisma.teyAiProviderConfig.findMany({
      orderBy: [{ isActive: 'desc' }, { name: 'asc' }],
    });
    return rows.map((r) => AiConfigService.toView(r));
  }

  async create(input: UpsertProviderInput): Promise<ProviderView> {
    this.validate(input, true);

    const { encryptedData, keyVersion } = encryptJson({ apiKey: input.apiKey });
    const row = await this.prisma.teyAiProviderConfig.create({
      data: {
        name: input.name,
        kind: input.kind,
        model: input.model,
        baseUrl: input.baseUrl ?? null,
        encryptedApiKey: encryptedData,
        keyVersion,
        keyTail: input.apiKey!.slice(-4),
        isActive: input.isActive ?? false,
        isFallback: input.isFallback ?? false,
        ...this.tunables(input),
      },
    });

    this.invalidate();
    return AiConfigService.toView(row);
  }

  async update(
    id: string,
    input: Partial<UpsertProviderInput>,
  ): Promise<ProviderView> {
    this.validate(input, false);

    // Omitting apiKey keeps the stored one, so an admin editing a temperature
    // does not have to re-enter a secret they can no longer read.
    const keyFields = input.apiKey
      ? (() => {
          const { encryptedData, keyVersion } = encryptJson({
            apiKey: input.apiKey,
          });
          return {
            encryptedApiKey: encryptedData,
            keyVersion,
            keyTail: input.apiKey.slice(-4),
          };
        })()
      : {};

    const row = await this.prisma.teyAiProviderConfig.update({
      where: { id },
      data: {
        ...(input.name ? { name: input.name } : {}),
        ...(input.kind ? { kind: input.kind } : {}),
        ...(input.model ? { model: input.model } : {}),
        ...(input.baseUrl !== undefined ? { baseUrl: input.baseUrl } : {}),
        ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
        ...(input.isFallback !== undefined
          ? { isFallback: input.isFallback }
          : {}),
        ...keyFields,
        ...this.tunables(input),
      },
    });

    this.invalidate();
    return AiConfigService.toView(row);
  }

  async remove(id: string): Promise<{ success: true }> {
    await this.prisma.teyAiProviderConfig.delete({ where: { id } });
    this.invalidate();
    return { success: true };
  }

  /** Builds an adapter for one config. Used by the connection test. */
  async buildById(id: string): Promise<AiProvider> {
    const row = await this.prisma.teyAiProviderConfig.findUnique({
      where: { id },
    });
    if (!row) throw new BadRequestException('Provider not found');
    return this.build(row);
  }

  async recordTest(id: string, ok: boolean, error?: string): Promise<void> {
    await this.prisma.teyAiProviderConfig.update({
      where: { id },
      data: {
        lastTestAt: new Date(),
        lastTestOk: ok,
        lastTestError: error?.slice(0, 500) ?? null,
      },
    });
  }

  /**
   * Resolves the active primary and fallback adapters, cached briefly so a
   * burst of calls does not decrypt the key each time.
   */
  async resolve(): Promise<{
    primary: AiProvider | null;
    fallback: AiProvider | null;
  }> {
    if (this.cache && Date.now() - this.cache.at < CACHE_TTL_MS) {
      return { primary: this.cache.primary, fallback: this.cache.fallback };
    }

    const rows = await this.prisma.teyAiProviderConfig.findMany({
      where: { isActive: true },
    });

    let primary: AiProvider | null = null;
    let fallback: AiProvider | null = null;

    for (const row of rows) {
      try {
        const adapter = this.build(row);
        if (row.isFallback) fallback = adapter;
        else primary = adapter;
      } catch (err) {
        // A misconfigured row must not take the whole AI layer down — the
        // caller falls back to templates, which is always a safe answer.
        this.logger.error(
          `Could not build AI provider "${row.name}"`,
          err as Error,
        );
      }
    }

    this.cache = { at: Date.now(), primary, fallback };
    return { primary, fallback };
  }

  /**
   * Raw Gemini credentials for the one caller that cannot go through the
   * `AiProvider.complete()` text-completion interface: transcription. The
   * Gemini File API (upload + poll + multimodal generateContent) is a
   * different wire shape entirely, so it can't reuse GeminiAdapter — but it
   * still shouldn't touch the ciphertext or duplicate key storage. Never
   * expose this through any controller; it hands back a plaintext key.
   */
  async resolveRawGeminiCredentials(): Promise<{
    apiKey: string;
    baseUrl: string;
    model: string;
    providerId: string;
    inputCostPer1k: number;
    outputCostPer1k: number;
  } | null> {
    const row = await this.prisma.teyAiProviderConfig.findFirst({
      where: { isActive: true, kind: 'GEMINI' },
    });
    if (!row) return null;
    const { apiKey } = decryptJson<{ apiKey: string }>(row.encryptedApiKey);
    return {
      apiKey,
      baseUrl: row.baseUrl || 'https://generativelanguage.googleapis.com',
      model: row.model,
      providerId: row.id,
      inputCostPer1k: Number(row.inputCostPer1k),
      outputCostPer1k: Number(row.outputCostPer1k),
    };
  }

  /**
   * The provider for course-import lesson generation — deliberately NOT
   * `resolve()`. That generic primary/fallback pair is shared with the live
   * Tey nudge system; a bulk course-import run picking up whatever's
   * "primary" there would compete with real nudge traffic for the same
   * provider's rate limit and `dailyBudgetUsd`. This always targets the
   * provider row named `COURSE_IMPORT_PROVIDER_NAME` specifically — a
   * dedicated, isolated provider that never overlaps with whatever's
   * configured for nudges, and (unlike `resolveRawGeminiCredentials()`,
   * which is pinned to Gemini because only Gemini can watch video) it isn't
   * pinned to any one `kind` — an admin can point it at Groq, Gemini,
   * anything OPENAI_COMPATIBLE, whichever is actually reliable that week.
   */
  async resolveForCourseImport(): Promise<{
    provider: AiProvider;
    providerId: string;
    inputCostPer1k: number;
    outputCostPer1k: number;
  } | null> {
    const row = await this.prisma.teyAiProviderConfig.findFirst({
      where: { isActive: true, name: COURSE_IMPORT_PROVIDER_NAME },
    });
    if (!row) return null;
    try {
      return {
        provider: this.build(row),
        providerId: row.id,
        inputCostPer1k: Number(row.inputCostPer1k),
        outputCostPer1k: Number(row.outputCostPer1k),
      };
    } catch (err) {
      this.logger.error(
        `Could not build course-import AI provider "${row.name}"`,
        err as Error,
      );
      return null;
    }
  }

  /** Also called by tests and by any write, so config edits take effect at once. */
  invalidate(): void {
    this.cache = null;
  }

  // ── internals ────────────────────────────────────────────────────────────

  private build(row: {
    kind: string;
    model: string;
    baseUrl: string | null;
    encryptedApiKey: string;
  }): AiProvider {
    const { apiKey } = decryptJson<{ apiKey: string }>(row.encryptedApiKey);
    const opts = { apiKey, model: row.model, baseUrl: row.baseUrl };

    switch (row.kind as AiProviderKind) {
      case 'ANTHROPIC':
        return new AnthropicAdapter(opts);
      case 'GEMINI':
        return new GeminiAdapter(opts);
      case 'OPENAI_COMPATIBLE':
        return new OpenAiCompatibleAdapter(opts);
      default:
        throw new BadRequestException(`Unknown provider kind: ${row.kind}`);
    }
  }

  private validate(
    input: Partial<UpsertProviderInput>,
    isCreate: boolean,
  ): void {
    if (isCreate && !input.apiKey) {
      throw new BadRequestException('apiKey is required');
    }
    if (input.kind && !AI_PROVIDER_KINDS.includes(input.kind)) {
      throw new BadRequestException(`Unknown provider kind: ${input.kind}`);
    }
    // An OpenAI-compatible provider with no baseUrl would silently point at
    // nothing; better to refuse than to fail at 8pm.
    if (isCreate && input.kind === 'OPENAI_COMPATIBLE' && !input.baseUrl) {
      throw new BadRequestException(
        'baseUrl is required for an OpenAI-compatible provider',
      );
    }
    if (
      input.temperature !== undefined &&
      (input.temperature < 0 || input.temperature > 2)
    ) {
      throw new BadRequestException('temperature must be between 0 and 2');
    }
    // Bounded so a typo cannot turn one config change into a large bill.
    if (
      input.maxOutputTokens !== undefined &&
      (input.maxOutputTokens < 16 || input.maxOutputTokens > 4096)
    ) {
      throw new BadRequestException(
        'maxOutputTokens must be between 16 and 4096',
      );
    }
    if (
      input.timeoutMs !== undefined &&
      (input.timeoutMs < 1000 || input.timeoutMs > 30_000)
    ) {
      throw new BadRequestException('timeoutMs must be between 1000 and 30000');
    }
    if (
      input.dailyBudgetUsd !== undefined &&
      (input.dailyBudgetUsd < 0 || input.dailyBudgetUsd > 100)
    ) {
      throw new BadRequestException('dailyBudgetUsd must be between 0 and 100');
    }
  }

  private tunables(input: Partial<UpsertProviderInput>) {
    return {
      ...(input.maxOutputTokens !== undefined
        ? { maxOutputTokens: input.maxOutputTokens }
        : {}),
      ...(input.temperature !== undefined
        ? { temperature: input.temperature }
        : {}),
      ...(input.timeoutMs !== undefined ? { timeoutMs: input.timeoutMs } : {}),
      ...(input.inputCostPer1k !== undefined
        ? { inputCostPer1k: input.inputCostPer1k }
        : {}),
      ...(input.outputCostPer1k !== undefined
        ? { outputCostPer1k: input.outputCostPer1k }
        : {}),
      ...(input.dailyBudgetUsd !== undefined
        ? { dailyBudgetUsd: input.dailyBudgetUsd }
        : {}),
    };
  }
}
