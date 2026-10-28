/**
 * Captures the homepage hero visual (the phone with its streak, league and XP
 * cards) as a transparent PNG for the social card, app/opengraph-image.tsx.
 * satori can't render the live component (CSS modules, framer-motion), so the
 * card uses this snapshot. Re-run it whenever the hero visual changes.
 *
 *   node scripts/capture-og-hero.mjs [http://localhost:3000]
 *
 * Reduced motion holds the phone on its first frame; the small Tey beside the
 * phone is left out (the social card shows the app, not the mascot).
 */

import path from 'path';
import { chromium } from 'playwright';

const base = process.argv[2] ?? 'http://localhost:3000';
const out = path.join(process.cwd(), 'app', '_og-assets', 'hero-visual.png');

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1366, height: 900 },
  deviceScaleFactor: 2,
  reducedMotion: 'reduce',
});
const page = await context.newPage();
await page.goto(`${base}/`, { waitUntil: 'networkidle', timeout: 180000 });
await page.addStyleTag({
  content: `
    html, body, main, section { background: transparent !important; }
    [class*="heroGlow"], [class*="heroTey"], header, nextjs-portal { display: none !important; }`,
});
await page.waitForTimeout(2500);

const box = await page.locator('[class*="heroVisual"]').first().boundingBox();
if (!box) throw new Error('Hero visual not found on the homepage');
// The floating cards hang past the visual's box on both sides.
const padX = 70;
const padY = 40;
await page.screenshot({
  path: out,
  omitBackground: true,
  clip: { x: box.x - padX, y: box.y - padY, width: box.width + padX * 2, height: box.height + padY * 2 },
});
await browser.close();
console.log(`Saved ${path.relative(process.cwd(), out)}`);
