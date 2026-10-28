/**
 * End-to-end check of profile photos (founder, 2026-10-28) against the
 * database .env points at, using only the seed-network-test learners (Ada,
 * Ben, Cleo). Restores everyone's avatar at the end.
 *
 *   Reward: a Teyro character pays nothing; a real photo pays +20 Coins
 *     exactly once (a second claim, and a second photo, pay nothing)
 *   Report: Ben reports Ada's photo (twice = one row); a character can't be
 *     reported; HQ lists it → remove clears every avatar column, resolves
 *     the report and writes Ada a "photo removed" bell row
 *   Reminder: a day-old account with no photo gets the day-2 nudge once;
 *     a second run sends nothing
 *
 * Refuses to run in production.
 *
 *   node --env-file=.env -r ts-node/register/transpile-only scripts/avatar-e2e.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AvatarService } from '../src/avatar/avatar.service';
import { PhotoNudgeJob } from '../src/avatar/photo-nudge.job';
import { PHOTO_REWARD_COINS } from '../src/avatar/avatar.constants';

if (process.env.NODE_ENV === 'production') throw new Error('avatar-e2e never runs in production.');

const PHOTO = 'https://pub-d1eea6d3cd36417ea274a8c49e11c316.r2.dev/avatars/e2e/ada.jpg';
const CHARACTER = '/avatars/v1/01011510000000.svg';

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: ['error', 'warn'] });
  const prisma = app.get(PrismaService);
  const avatars = app.get(AvatarService);
  const nudge = app.get(PhotoNudgeJob);
  const checks: [string, boolean][] = [];

  const users = await prisma.user.findMany({
    where: { email: { in: ['network-test-ada@teyro.test', 'network-test-ben@teyro.test', 'network-test-cleo@teyro.test'] } },
    select: { id: true, email: true, avatarUrl: true, createdAt: true, profile: { select: { avatarUrl: true } } },
  });
  const by = (k: string) => users.find((u) => u.email === `network-test-${k}@teyro.test`)!;
  const [ada, ben, cleo] = [by('ada'), by('ben'), by('cleo')];
  const saved = users.map((u) => ({ id: u.id, user: u.avatarUrl, profile: u.profile?.avatarUrl ?? null, createdAt: u.createdAt }));

  const setAvatar = async (userId: string, url: string | null) => {
    await prisma.user.update({ where: { id: userId }, data: { avatarUrl: url } });
    await prisma.profile.upsert({ where: { userId }, create: { userId, avatarUrl: url }, update: { avatarUrl: url } });
  };
  const coins = async (userId: string) =>
    (await prisma.studentProfile.findUnique({ where: { userId }, select: { coins: true } }))?.coins ?? 0;

  // A clean slate for the test learners.
  await prisma.rewardTransaction.deleteMany({ where: { idempotencyKey: { in: users.map((u) => `profile_photo:${u.id}`) } } });
  await prisma.avatarReport.deleteMany({ where: { userId: { in: users.map((u) => u.id) } } });
  await prisma.teyDelivery.deleteMany({ where: { userId: { in: users.map((u) => u.id) }, ruleId: { in: ['PROFILE_PHOTO_NUDGE', 'PROFILE_PHOTO_REMOVED'] } } });
  await prisma.notification.deleteMany({ where: { userId: { in: users.map((u) => u.id) }, type: { in: ['TEY_PROFILE_PHOTO', 'TEY_PROFILE_PHOTO_REMOVED'] } } });

  try {
    // ── Reward ────────────────────────────────────────────────────────────
    await setAvatar(ada.id, CHARACTER);
    const charClaim = await avatars.claimPhotoReward(ada.id);
    checks.push(['a character earns no Coins', !charClaim.rewarded]);

    await setAvatar(ada.id, PHOTO);
    const before = await coins(ada.id);
    const first = await avatars.claimPhotoReward(ada.id);
    const after = await coins(ada.id);
    checks.push([`a real photo pays +${PHOTO_REWARD_COINS} Coins`, first.rewarded && after - before === PHOTO_REWARD_COINS]);
    const again = await avatars.claimPhotoReward(ada.id);
    await setAvatar(ada.id, PHOTO + '?v=2');
    const newPhoto = await avatars.claimPhotoReward(ada.id);
    checks.push(['the reward pays once, ever', !again.rewarded && !newPhoto.rewarded && (await coins(ada.id)) === after]);
    checks.push(['claimed flag reads back', await avatars.photoRewardClaimed(ada.id)]);

    // ── Report → HQ remove ────────────────────────────────────────────────
    await setAvatar(cleo.id, CHARACTER);
    const charReport = await avatars.report(ben.id, cleo.id, 'inappropriate');
    checks.push(["a character can't be reported", !charReport.reported]);

    await avatars.report(ben.id, ada.id, 'inappropriate');
    await avatars.report(ben.id, ada.id, 'inappropriate');
    const rows = await prisma.avatarReport.count({ where: { userId: ada.id, resolvedAt: null } });
    checks.push(['a repeat report is one row', rows === 1]);
    let selfBlocked = false;
    try {
      await avatars.report(ada.id, ada.id);
    } catch {
      selfBlocked = true;
    }
    checks.push(["you can't report yourself", selfBlocked]);

    const list = await avatars.adminReports();
    const row = list.open.find((r) => r.userId === ada.id);
    checks.push(['HQ lists the report', !!row && row.reports === 1 && row.stillAPhoto && row.reasons.includes('inappropriate')]);

    await avatars.adminRemove(ada.id);
    const cleared = await prisma.user.findUnique({ where: { id: ada.id }, select: { avatarUrl: true, profile: { select: { avatarUrl: true } } } });
    checks.push(['remove clears the photo everywhere', !cleared?.avatarUrl && !cleared?.profile?.avatarUrl]);
    const resolved = await prisma.avatarReport.findFirst({ where: { userId: ada.id }, select: { resolution: true } });
    checks.push(['the report is resolved as REMOVED', resolved?.resolution === 'REMOVED']);
    const bell = await prisma.notification.count({ where: { userId: ada.id, type: 'TEY_PROFILE_PHOTO_REMOVED' } });
    checks.push(['Ada gets a "photo removed" bell row', bell === 1]);

    // ── Day-2 reminder ────────────────────────────────────────────────────
    const dayOld = new Date(Date.now() - 30 * 3600_000);
    await prisma.user.update({ where: { id: ben.id }, data: { createdAt: dayOld } });
    await setAvatar(ben.id, null);
    const sent1 = await nudge.run(new Date(), [ben.id]);
    const sent2 = await nudge.run(new Date(), [ben.id]);
    const nudgeBell = await prisma.notification.count({ where: { userId: ben.id, type: 'TEY_PROFILE_PHOTO' } });
    checks.push(['a day-old account without a photo is reminded once', sent1 === 1 && sent2 === 0 && nudgeBell === 1]);

    await setAvatar(cleo.id, PHOTO);
    await prisma.user.update({ where: { id: cleo.id }, data: { createdAt: dayOld } });
    const sentPhoto = await nudge.run(new Date(), [cleo.id]);
    checks.push(['someone with a photo is never reminded', sentPhoto === 0]);
  } finally {
    // Put everyone back as they were.
    for (const s of saved) {
      await prisma.user.update({ where: { id: s.id }, data: { avatarUrl: s.user, createdAt: s.createdAt } });
      await prisma.profile.updateMany({ where: { userId: s.id }, data: { avatarUrl: s.profile } });
    }
    await prisma.avatarReport.deleteMany({ where: { userId: { in: users.map((u) => u.id) } } });
  }

  let failed = 0;
  for (const [name, ok] of checks) {
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
    if (!ok) failed++;
  }
  console.log(failed ? `\n${failed} failed` : `\nall ${checks.length} passed`);
  await app.close();
  process.exit(failed ? 1 : 0);
}

void main();
