/**
 * Phase 5 live check (docs/TEYRO_NETWORK_PLAN.md): train the feed ranking on
 * the real network_events in the database .env points at, and print the
 * Teyro HQ network overview. With little data the honest result is "not
 * switched on" — the hand-set formula stays — and that is checked too.
 * Read-only apart from recording the training run. Refuses production.
 *
 *   node --env-file=.env -r ts-node/register/transpile-only scripts/network-e2e-ranking.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { RankingModelService, RANK_MIN_SAMPLES } from '../src/network/ranking-model.service';
import { NetworkAdminService } from '../src/network/network-admin.service';
import { NetworkFeedService } from '../src/network/network-feed.service';
import { PrismaService } from '../src/prisma/prisma.service';

if (process.env.NODE_ENV === 'production') throw new Error('network-e2e-ranking never runs in production.');

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: ['error', 'warn'] });
  const ranking = app.get(RankingModelService);
  const admin = app.get(NetworkAdminService);
  const feeds = app.get(NetworkFeedService);
  const prisma = app.get(PrismaService);
  const checks: [string, boolean][] = [];

  const run = await ranking.train();
  console.log(`training: ${run.samples} impressions, positives ${JSON.stringify(run.positives)}`);
  console.log(`          ${run.note}`);
  console.log(`          metrics ${JSON.stringify(run.metrics)}`);
  checks.push([
    'model only switched on with enough data',
    run.samples >= RANK_MIN_SAMPLES || run.active === false,
  ]);
  checks.push(['the run is recorded for HQ', !!(await prisma.networkRankingModel.findUnique({ where: { id: run.id } }))]);

  const o = await admin.overview();
  console.log(`overview: north star ${JSON.stringify(o.northStar)}`);
  console.log(`          cards ${JSON.stringify(o.cards)}`);
  console.log(`          graph ${JSON.stringify(o.graph)} · first-week buddy ${JSON.stringify(o.firstWeekBuddy)}`);
  console.log(`          active this week ${JSON.stringify(o.activeThisWeek)}`);
  console.log(`          squads ${JSON.stringify(o.squads)} · duels ${JSON.stringify(o.duels)} · help ${JSON.stringify(o.help)}`);
  console.log(`          notifications ${JSON.stringify({ ...o.notifications, byKind: undefined })}`);
  checks.push(['overview counts the north star', typeof o.northStar.lessonsFromCards === 'number' && o.models.length > 0]);

  const ada = await prisma.user.findUniqueOrThrow({ where: { email: 'network-test-ada@teyro.test' }, select: { id: true } });
  const t = Date.now();
  const feed = await feeds.feed(ada.id);
  checks.push([`feed still ranks (${feed.items.length} cards, ${Date.now() - t} ms)`, feed.items.length > 0]);

  for (const [label, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  await app.close();
  if (checks.some(([, ok]) => !ok)) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
