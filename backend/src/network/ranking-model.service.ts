import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { ActivityType } from './network.constants';
import {
  OUTCOMES,
  featuresOf,
  logLoss,
  predict,
  trainLogistic,
  type Model,
  type Outcome,
} from './ranking-model';

const DAY_MS = 86_400_000;

/** Below this many impressions a model is noise — the formula stays. */
export const RANK_MIN_SAMPLES = 300;
/** An outcome needs this many positives in training to get its own model. */
export const RANK_MIN_POSITIVES = 10;
/** A model must beat guessing-the-average by this much (held-out log-loss). */
export const RANK_MIN_GAIN = 0.01;

interface TrainingRow {
  id: string;
  position: number | null;
  createdAt: Date;
  activityType: string;
  cardAt: Date;
  isBuddy: boolean;
  isFollow: boolean;
  viewerProgress: number | null;
  authorProgress: number | null;
  cta: boolean;
  cheer: boolean;
  lesson: boolean;
}

/** Deterministic 80/20 split by event id, so a retrain is reproducible. */
const isHoldout = (id: string) => parseInt(id.replace(/-/g, '').slice(-2), 16) % 5 === 0;

/**
 * Learns the feed's weights from what actually happened to cards
 * (docs/TEYRO_NETWORK_PLAN.md phase 5): every impression is a row; whether
 * it led to a tap, a cheer, or a lesson within a day is the label.
 *
 * Weekly (Monday 03:00 UTC) and on demand from Teyro HQ. A new model is only
 * switched on if it beats guessing-the-average on held-out data; otherwise
 * the current one (or the hand-set formula) stays. Everything is recorded,
 * including why a model was not used.
 */
@Injectable()
export class RankingModelService {
  private readonly logger = new Logger(RankingModelService.name);
  private cache: { model: Model | null; at: number } | null = null;

  constructor(private readonly prisma: PrismaService) {}

  /** The active model, cached for 10 minutes (the feed reads it on every load). */
  async active(): Promise<Model | null> {
    if (this.cache && Date.now() - this.cache.at < 10 * 60_000) return this.cache.model;
    const row = await this.prisma.networkRankingModel.findFirst({
      where: { active: true },
      orderBy: { trainedAt: 'desc' },
      select: { weights: true },
    });
    const model = (row?.weights as Model | undefined) ?? null;
    this.cache = { model, at: Date.now() };
    return model;
  }

  private get cronEnabled(): boolean {
    if (process.env.NETWORK_CRON_ENABLED === 'true') return true;
    if (process.env.NETWORK_CRON_ENABLED === 'false') return false;
    return process.env.NODE_ENV === 'production';
  }

  @Cron('0 0 3 * * 1', { name: 'network-ranking-train', timeZone: 'UTC' })
  async weekly() {
    if (!this.cronEnabled) return;
    try {
      const r = await this.train();
      this.logger.log(`ranking model trained: ${r.note}`);
    } catch (err) {
      this.logger.warn(`ranking training failed: ${(err as Error).message}`);
    }
  }

  async train(now = new Date()) {
    const rows = await this.prisma.$queryRaw<TrainingRow[]>(Prisma.sql`
      SELECT e.id, e.position, e."createdAt",
             a."activityType", a."createdAt" AS "cardAt",
             EXISTS (SELECT 1 FROM study_buddies b WHERE b.status = 'ACCEPTED'
                     AND ((b."requesterId" = e."userId" AND b."addresseeId" = a."userId")
                       OR (b."addresseeId" = e."userId" AND b."requesterId" = a."userId"))) AS "isBuddy",
             EXISTS (SELECT 1 FROM user_follows f WHERE f."followerId" = e."userId" AND f."followingId" = a."userId") AS "isFollow",
             ve.progress AS "viewerProgress", ae.progress AS "authorProgress",
             EXISTS (SELECT 1 FROM network_events x WHERE x."userId" = e."userId" AND x."activityId" = e."activityId"
                     AND x.kind = 'CTA' AND x."createdAt" BETWEEN e."createdAt" AND e."createdAt" + interval '1 day') AS cta,
             EXISTS (SELECT 1 FROM network_events x WHERE x."userId" = e."userId" AND x."activityId" = e."activityId"
                     AND x.kind = 'CHEER' AND x."createdAt" BETWEEN e."createdAt" AND e."createdAt" + interval '1 day') AS cheer,
             EXISTS (SELECT 1 FROM network_events x WHERE x."userId" = e."userId" AND x."activityId" = e."activityId"
                     AND x.kind = 'LESSON_FROM_CARD' AND x."createdAt" BETWEEN e."createdAt" AND e."createdAt" + interval '1 day') AS lesson
      FROM network_events e
      JOIN activity_feed a ON a.id = e."activityId"
      LEFT JOIN "Enrollment" ve ON ve."userId" = e."userId" AND ve."courseId" = a.metadata->>'courseId'
      LEFT JOIN "Enrollment" ae ON ae."userId" = a."userId" AND ae."courseId" = a.metadata->>'courseId'
      WHERE e.kind = 'IMPRESSION' AND e."createdAt" >= ${new Date(now.getTime() - 60 * DAY_MS)}
      ORDER BY e."createdAt" DESC
      LIMIT 50000`);

    const xs = rows.map((r) =>
      featuresOf({
        activityType: r.activityType as ActivityType,
        isBuddy: r.isBuddy,
        isFollow: r.isFollow,
        enrolled: r.viewerProgress !== null,
        ageHours: (r.createdAt.getTime() - r.cardAt.getTime()) / 3_600_000,
        progressLead: r.viewerProgress !== null && r.authorProgress !== null ? r.authorProgress - r.viewerProgress : null,
        position: r.position ?? 0,
      }),
    );
    const train = rows.map((_, i) => i).filter((i) => !isHoldout(rows[i].id));
    const hold = rows.map((_, i) => i).filter((i) => isHoldout(rows[i].id));

    const positives = Object.fromEntries(OUTCOMES.map((o) => [o, rows.filter((r) => r[o]).length])) as Record<Outcome, number>;
    const model: Model = {};
    const metrics: Record<string, { trainPositives: number; holdoutLoss: number; baselineLoss: number; gain: number } | { skipped: string }> = {};

    for (const o of OUTCOMES) {
      const ysTrain = train.map((i) => (rows[i][o] ? 1 : 0));
      const pos = ysTrain.reduce<number>((a, b) => a + b, 0);
      if (pos < RANK_MIN_POSITIVES) {
        metrics[o] = { skipped: `${pos} positives in training (needs ${RANK_MIN_POSITIVES})` };
        continue;
      }
      const w = trainLogistic(train.map((i) => xs[i]), ysTrain);
      const ysHold = hold.map((i) => (rows[i][o] ? 1 : 0));
      const rate = pos / train.length;
      const holdoutLoss = logLoss(hold.map((i) => predict(w, xs[i])), ysHold);
      const baselineLoss = logLoss(hold.map(() => rate), ysHold);
      const gain = baselineLoss > 0 ? (baselineLoss - holdoutLoss) / baselineLoss : 0;
      metrics[o] = { trainPositives: pos, holdoutLoss: round(holdoutLoss), baselineLoss: round(baselineLoss), gain: round(gain) };
      if (gain >= RANK_MIN_GAIN) model[o] = w;
    }

    const useful = Object.keys(model).length > 0;
    const enough = rows.length >= RANK_MIN_SAMPLES;
    const activate = useful && enough;
    const note = !enough
      ? `Not switched on: ${rows.length} impressions (needs ${RANK_MIN_SAMPLES}). The hand-set formula stays.`
      : !useful
        ? 'Not switched on: no outcome beat guessing the average on held-out data. The current ranking stays.'
        : `Switched on: learned ${Object.keys(model).join(', ')} from ${rows.length} impressions.`;

    const saved = await this.prisma.$transaction(async (tx) => {
      if (activate) await tx.networkRankingModel.updateMany({ where: { active: true }, data: { active: false } });
      return tx.networkRankingModel.create({
        data: {
          samples: rows.length,
          positives,
          weights: model as Prisma.InputJsonValue,
          metrics: metrics as Prisma.InputJsonValue,
          active: activate,
          note,
        },
      });
    });
    if (activate) this.cache = null;
    return { id: saved.id, active: activate, samples: rows.length, positives, metrics, note };
  }
}

const round = (n: number) => Number(n.toFixed(4));
