/**
 * Exports the homepage visuals as transparent, high-resolution PNGs for the
 * pitch deck. Needs the dev server running (npm run dev).
 *
 *   node scripts/export-deck-shots.mjs [outDir]
 *
 * Captures every [data-shot] frame on /deck-shots at 3x, with the page
 * background removed so each image drops onto any slide colour.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const OUT = resolve(process.argv[2] ?? '../deck-mockups');
const BASE = process.env.BASE_URL ?? 'http://localhost:3000';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 3 });
await page.goto(`${BASE}/deck-shots`, { waitUntil: 'load', timeout: 180000 });
// Transparent page, no site chrome.
await page.addStyleTag({
  content: `html,body,main{background:transparent!important}
            header,footer,nextjs-portal{display:none!important}`,
});

const names = await page.$$eval('[data-shot]', (els) => els.map((el) => el.getAttribute('data-shot')));
for (const name of names) {
  const el = page.locator(`[data-shot="${name}"]`);
  await el.scrollIntoViewIfNeeded();
  // Let the in-view animations (pops, bars, count-ups) finish.
  await page.waitForTimeout(2600);
  await el.screenshot({ path: `${OUT}/${name}.png`, omitBackground: true, animations: 'disabled' });
  console.log('✓', name);
}

await browser.close();
console.log(`\n${names.length} images → ${OUT}`);
