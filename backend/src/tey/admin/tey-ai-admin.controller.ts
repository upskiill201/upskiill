import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RolesGuard } from '../../auth/guard/roles.guard';
import {
  AI_PROVIDER_KINDS,
  type AiProvider,
} from '../ai/ai-provider.interface';
import { AiBudgetService } from '../ai/ai-budget.service';
import { AiConfigService } from '../ai/ai-config.service';
import { TeyAiService } from '../ai/tey-ai.service';
import { ToolRegistry } from '../ai/tools/tool-registry';
import { buildNudgeSystemPrompt } from '../ai/tey-personality';
import { TeyAdminService } from './tey-admin.service';
import type { TeyReason, TeyTone } from '../contracts/tey-context.types';

class ProviderDto {
  @IsString() @MaxLength(64) name!: string;
  @IsIn(AI_PROVIDER_KINDS as unknown as string[]) kind!: string;
  @IsString() @MaxLength(128) model!: string;

  @IsOptional() @IsString() @MaxLength(512) baseUrl?: string;
  /** Write-only. Omit on update to keep the stored key. */
  @IsOptional() @IsString() @MaxLength(512) apiKey?: string;

  @IsOptional() @IsBoolean() isActive?: boolean;
  @IsOptional() @IsBoolean() isFallback?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(16)
  @Max(4096)
  maxOutputTokens?: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(2)
  temperature?: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1000)
  @Max(30000)
  timeoutMs?: number;

  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) inputCostPer1k?: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  outputCostPer1k?: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  dailyBudgetUsd?: number;
}

/**
 * PATCH is a partial update (e.g. the admin UI's "edit model" flow sends only
 * `{ model }`), unlike POST which creates a full row — so every field here is
 * optional, whereas ProviderDto requires name/kind/model for create. Without
 * this split, the global `forbidNonWhitelisted` ValidationPipe 400s any PATCH
 * that omits name/kind, even though AiConfigService.update() already treats
 * its input as a Partial<UpsertProviderInput>.
 */
class UpdateProviderDto {
  @IsOptional() @IsString() @MaxLength(64) name?: string;
  @IsOptional() @IsIn(AI_PROVIDER_KINDS as unknown as string[]) kind?: string;
  @IsOptional() @IsString() @MaxLength(128) model?: string;

  @IsOptional() @IsString() @MaxLength(512) baseUrl?: string;
  @IsOptional() @IsString() @MaxLength(512) apiKey?: string;

  @IsOptional() @IsBoolean() isActive?: boolean;
  @IsOptional() @IsBoolean() isFallback?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(16)
  @Max(4096)
  maxOutputTokens?: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(2)
  temperature?: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1000)
  @Max(30000)
  timeoutMs?: number;

  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) inputCostPer1k?: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  outputCostPer1k?: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  dailyBudgetUsd?: number;
}

class PlaygroundDto {
  @IsString() @MaxLength(64) reason!: string;
  @IsOptional() @IsString() @MaxLength(64) tone?: string;
  @IsOptional() @IsString() @MaxLength(2000) prompt?: string;
  /** Test a specific provider regardless of its Primary/Fallback/Off role —
   *  lets an admin compare models without touching which one is actually
   *  live. Omit to use whichever is currently active, matching real delivery. */
  @IsOptional() @IsString() providerId?: string;
}

/**
 * AI provider management.
 *
 * Class-level @Roles(ADMIN) — see the note in tey-admin.controller.ts about
 * RolesGuard allowing through when the decorator is absent.
 *
 * No response from this controller ever contains a plaintext or encrypted API
 * key: every read goes through AiConfigService.toView, which destructures the
 * ciphertext away and returns only a masked tail.
 */
@Controller('tey/admin/ai')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN)
export class TeyAiAdminController {
  constructor(
    private readonly config: AiConfigService,
    private readonly budget: AiBudgetService,
    private readonly ai: TeyAiService,
    private readonly tools: ToolRegistry,
    private readonly admin: TeyAdminService,
  ) {}

  @Get('providers')
  list() {
    return this.config.list();
  }

  @Post('providers')
  create(@Body() dto: ProviderDto) {
    return this.config.create(dto as never);
  }

  @Patch('providers/:id')
  update(@Param('id') id: string, @Body() dto: UpdateProviderDto) {
    return this.config.update(id, dto as never);
  }

  @Delete('providers/:id')
  remove(@Param('id') id: string) {
    return this.config.remove(id);
  }

  /**
   * One trivial completion against a provider, to prove the key and base URL
   * work. Returns latency and token counts — never the key.
   */
  @Post('providers/:id/test')
  async test(@Param('id') id: string) {
    try {
      const provider = await this.config.buildById(id);
      const { result, latencyMs } = await this.ai.complete(
        provider,
        'You are a connection test. Reply with exactly: OK',
        'Reply with OK.',
        // 8s was too tight for a real first call to some models (distinct
        // from an instant 4xx rejection) — matches the playground's own 20s
        // ceiling below, for the same reason.
        { maxOutputTokens: 16, timeoutMs: 20_000 },
      );

      await this.config.recordTest(id, true);
      return {
        ok: true,
        model: result.model,
        latencyMs,
        usage: result.usage,
        sample: result.text?.slice(0, 100) ?? null,
      };
    } catch (err) {
      const message = (err as Error).message;
      await this.config.recordTest(id, false, message);
      // Surfaced so an operator can tell a bad key from an unreachable host —
      // the message is the provider's, and contains no credential.
      return { ok: false, error: message };
    }
  }

  /**
   * Playground: generate a nudge against a sample learner context, so
   * personality can be iterated on without waiting for a real learner to reach
   * the right state.
   */
  @Post('playground')
  async playground(@Body() dto: PlaygroundDto) {
    const preview = this.admin.preview(
      dto.reason as TeyReason,
      (dto.tone ?? 'URGENT_PLAYFUL') as TeyTone,
    );
    const ctx = preview.context;

    let provider: AiProvider | null;
    try {
      if (dto.providerId) {
        provider = await this.config.buildById(dto.providerId);
      } else {
        const { primary, fallback } = await this.config.resolve();
        provider = primary ?? fallback;
      }
    } catch (err) {
      return {
        ok: false,
        error: (err as Error).message,
        template: { title: preview.title, body: preview.body },
      };
    }
    if (!provider) {
      return {
        ok: false,
        error: 'No active AI provider configured.',
        template: { title: preview.title, body: preview.body },
      };
    }

    const system = buildNudgeSystemPrompt(ctx);
    try {
      const { result, latencyMs } = await this.ai.complete(
        provider,
        system,
        dto.prompt ??
          'Write the notification now. Reply with JSON only: {"title": "...", "body": "..."}',
        // TeyAiService.complete()'s own default (8000ms) is sized for the
        // connection test's trivial "reply OK" — a real generation from a
        // larger model routinely needs longer. An admin running this from
        // the playground is willingly waiting, unlike the real delivery
        // path, so it's safe to give it the same ceiling a provider's own
        // `timeoutMs` field allows (up to 30s).
        { maxOutputTokens: 400, timeoutMs: 20_000 },
      );

      return {
        ok: true,
        provider: provider.kind,
        model: result.model,
        latencyMs,
        usage: result.usage,
        finishReason: result.finishReason,
        raw: result.text,
        // Shown side by side so the operator can judge whether the model is
        // actually beating the free option.
        template: { title: preview.title, body: preview.body },
        systemPrompt: system,
      };
    } catch (err) {
      return {
        ok: false,
        error: (err as Error).message,
        template: { title: preview.title, body: preview.body },
      };
    }
  }

  @Get('usage')
  usage() {
    return this.budget.summary();
  }

  /** The tool surface, for review. Read tools only unless asked otherwise. */
  @Get('tools')
  toolSpecs() {
    return {
      read: this.tools.specs(false),
      all: this.tools.specs(true),
    };
  }
}
