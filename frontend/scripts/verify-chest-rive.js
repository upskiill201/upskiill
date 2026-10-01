#!/usr/bin/env node
/**
 * Contract test for public/Rive/treasure_chest.riv, run against the real
 * binary with the real @rive-app/canvas runtime in a real browser.
 *
 *   node scripts/verify-chest-rive.js
 *
 * The Jest suites cover our lifecycle logic with the runtime mocked out; they
 * cannot tell you that the animator renamed a view model. This can. Run it
 * whenever the .riv is replaced — the last swap silently moved `rewardReveal`
 * from a view-model trigger to a Rive event, which no amount of mocked
 * testing would have caught.
 *
 * Asserts the exact contract TreasureChest.tsx depends on:
 *   • view model `TChest` with `click` + `reset` triggers
 *   • a nested reward view model exposing the `rewardType` enum
 *   • all five reward enum values present
 *   • `rewardReveal` arriving as a Rive General event (type 128)
 *   • every reward type reaching a reveal
 *   • consecutive cycles revealing on one instance (the cached view-model
 *     hazard that broke chest #2 before)
 *   • the two behaviours the app must defend against: a pre-configuration tap
 *     reveals the default reward, and a post-reveal tap re-closes the chest
 */

const path = require('path');
const fs = require('fs');

const FRONTEND = path.resolve(__dirname, '..');
const RIV = path.join(FRONTEND, 'public/Rive/treasure_chest.riv');
const RIVE_JS = path.join(FRONTEND, 'node_modules/@rive-app/canvas/rive.js');

const EXPECTED_REWARDS = [
  'coinRewards',
  'xpRewards',
  'hartRewards',
  'streakFreezeRewards',
  'xpBoostRewards',
];
const VM_CANDIDATES = ['rewords', 'rewards'];
const STATE_MACHINE = 'State Machine 1';
const GENERAL_EVENT = 128;

let failures = 0;
function check(label, condition, detail = '') {
  const ok = Boolean(condition);
  if (!ok) failures++;
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
  return ok;
}

async function main() {
  const { chromium } = require(path.join(FRONTEND, 'node_modules/playwright'));
  if (!fs.existsSync(RIV)) {
    console.error(`Missing asset: ${RIV}`);
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const html = `<!DOCTYPE html><html><body>
    <canvas id="canvas" width="400" height="400"></canvas>
    <script>${fs.readFileSync(RIVE_JS, 'utf8')}</script>
    <script>
      const raw = atob("${fs.readFileSync(RIV).toString('base64')}");
      const u = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) u[i] = raw.charCodeAt(i);
      window.events = [];
      window.r = new rive.Rive({
        buffer: u.buffer,
        canvas: document.getElementById('canvas'),
        stateMachines: ['${STATE_MACHINE}'],
        autoplay: true,
        autoBind: true,
        onLoad: () => {
          window.r.on(rive.EventType.RiveEvent, (e) => {
            const d = e.data || e;
            window.events.push({ name: d.name, type: d.type, at: Date.now() });
          });
          window.loaded = true;
        },
        onLoadError: (e) => { window.loadError = String(e); window.loaded = true; }
      });

      window.api = {
        root: () => window.r.viewModelInstance,
        rewardVm: () => {
          for (const c of ${JSON.stringify(VM_CANDIDATES)}) {
            try {
              const n = window.r.viewModelInstance.viewModel(c);
              if (n && n.enum('rewardType')) return { vm: n, path: c };
            } catch (e) {}
          }
          return null;
        },
        fire: (name) => window.r.viewModelInstance.trigger(name).trigger(),
        setReward: (v) => { window.api.rewardVm().vm.enum('rewardType').value = v; },
        getReward: () => window.api.rewardVm().vm.enum('rewardType').value,
        isReveal: () => window.api.rewardVm().vm.boolean('isReveal').value,
        reveals: () => window.events.filter((e) => e.name === 'rewardReveal').length,
      };
    </script></body></html>`;

  await page.setContent(html);
  await page.waitForFunction(() => window.loaded === true, { timeout: 30000 });
  const loadError = await page.evaluate(() => window.loadError);
  if (loadError) {
    console.error('Rive failed to load:', loadError);
    process.exit(1);
  }

  // ── 1. Structural contract ────────────────────────────────────────────────
  console.log('\nStructure');
  const struct = await page.evaluate(() => {
    const r = window.r;
    const found = window.api.rewardVm();
    return {
      stateMachines: r.stateMachineNames,
      artboards: r.contents.artboards.map((a) => a.name),
      rootProps: r.viewModelInstance.properties.map((p) => p.name),
      rewardPath: found ? found.path : null,
      enumValues: found ? found.vm.enum('rewardType').values : [],
      hasClick: !!r.viewModelInstance.trigger('click'),
      hasReset: !!r.viewModelInstance.trigger('reset'),
      revealIsVmTrigger: !!r.viewModelInstance.trigger('rewardReveal'),
    };
  });

  check(`state machine "${STATE_MACHINE}" exists`, struct.stateMachines.includes(STATE_MACHINE), struct.stateMachines.join(', '));
  check('reward view model resolves', struct.rewardPath !== null, `path: ${struct.rewardPath}`);
  check('`click` trigger present', struct.hasClick);
  check('`reset` trigger present', struct.hasReset);
  for (const v of EXPECTED_REWARDS) {
    check(`enum value ${v}`, struct.enumValues.includes(v));
  }
  check(
    '`rewardReveal` is NOT a view-model trigger (it is a Rive event)',
    struct.revealIsVmTrigger === false,
    'if this flips, revisit the event listener in TreasureChest.tsx'
  );
  if (struct.rewardPath !== VM_CANDIDATES[0]) {
    console.log(`  NOTE  reward view model is "${struct.rewardPath}", not "${VM_CANDIDATES[0]}" — update the comments in currency.ts`);
  }

  /** Drive one full cycle: reset → set reward → tap until reveal. */
  async function openChest(reward, { maxMs = 25000 } = {}) {
    const before = await page.evaluate(() => window.api.reveals());
    await page.evaluate(() => window.api.fire('reset'));
    await page.waitForTimeout(350);
    await page.evaluate((v) => window.api.setReward(v), reward);
    const started = Date.now();
    while (Date.now() - started < maxMs) {
      if ((await page.evaluate(() => window.api.reveals())) > before) return true;
      await page.evaluate(() => window.api.fire('click'));
      await page.waitForTimeout(450);
    }
    return (await page.evaluate(() => window.api.reveals())) > before;
  }

  // ── 2. Every reward type reveals ──────────────────────────────────────────
  console.log('\nReward types (each drives a full open on the same instance)');
  for (const reward of EXPECTED_REWARDS) {
    const revealed = await openChest(reward);
    const active = await page.evaluate(() => window.api.getReward());
    check(`${reward} reaches rewardReveal`, revealed && active === reward, `active=${active}`);
  }

  // ── 3. The reveal event's shape ───────────────────────────────────────────
  console.log('\nReveal event');
  const revealEvents = await page.evaluate(() =>
    window.events.filter((e) => e.name === 'rewardReveal')
  );
  check('at least one rewardReveal observed', revealEvents.length > 0, `${revealEvents.length} total`);
  check(
    'every rewardReveal is a General event (type 128)',
    revealEvents.every((e) => e.type === GENERAL_EVENT),
    [...new Set(revealEvents.map((e) => e.type))].join(', ')
  );
  check(
    'consecutive cycles each reveal exactly once',
    revealEvents.length === EXPECTED_REWARDS.length,
    `${revealEvents.length} reveals for ${EXPECTED_REWARDS.length} cycles`
  );

  // ── 4. Behaviours the app must defend against ─────────────────────────────
  console.log('\nHazards the integration guards (documenting, not asserting good behaviour)');

  await page.evaluate(() => window.api.fire('reset'));
  await page.waitForTimeout(350);
  const defaultReward = await page.evaluate(() => window.api.getReward());
  check(
    'unconfigured chest holds a default reward',
    EXPECTED_REWARDS.includes(defaultReward),
    `defaults to ${defaultReward} — tapping before the server responds would reveal this, hence the held-tap gate`
  );

  const revealedForHazard = await openChest('hartRewards');
  const afterReveal = await page.evaluate(() => window.api.isReveal());
  await page.evaluate(() => window.api.fire('click'));
  await page.waitForTimeout(600);
  const afterPostRevealTap = await page.evaluate(() => window.api.isReveal());
  check('chest is revealed before the hazard tap', revealedForHazard && afterReveal === true);
  check(
    'a post-reveal tap re-closes the chest',
    afterPostRevealTap === false,
    'this is why TreasureChest drops taps in the revealed phase'
  );

  await browser.close();

  console.log(
    failures === 0
      ? '\nOK — treasure_chest.riv matches the integration contract.\n'
      : `\n${failures} contract check(s) failed.\n`
  );
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
