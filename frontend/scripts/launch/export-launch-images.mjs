/**
 * Exports the Product Hunt launch gallery from the dev bench as PNGs (finished
 * frame, 2x) and, with --video, a 9-second MP4 loop of each image (needs ffmpeg on PATH).
 *
 *   node scripts/launch/export-launch-images.mjs [--base http://localhost:3000] [--only 1-overview] [--video]
 *
 * Needs `next dev` running. Output: ../launch-kit/{png,video}
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const arg = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const base = arg('--base', 'http://localhost:3000');
const only = arg('--only', null);
const video = args.includes('--video');

const SCENES = [
  ['thumb', 512, 512],
  ['1-overview', 1270, 760],
  ['2-lesson', 1270, 760],
  ['3-habit', 1270, 760],
  ['4-play', 1270, 760],
  ['5-together', 1270, 760],
  ['6-everything', 1270, 760],
  ['7-outcome', 1270, 760],
  ['8-start', 1270, 760],
].filter(([id]) => !only || id === only);

const out = path.resolve('..', 'launch-kit');
fs.mkdirSync(path.join(out, 'png'), { recursive: true });
if (video) fs.mkdirSync(path.join(out, 'video'), { recursive: true });

/** The shared dev server stalls now and then: retry, and wait for the scene itself. */
async function open(page, url) {
  for (let i = 0; ; i++) {
    try {
      await page.goto(url, { waitUntil: "commit", timeout: 90000 });
      await page.waitForSelector("#capture [data-stage]", { timeout: 90000 });
      return;
    } catch (e) {
      if (i >= 3) throw e;
    }
  }
}

const browser = await chromium.launch();
for (const [id, w, h] of SCENES) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await open(page, `${base}/dev/launch-images?scene=${id}&still=1`);
  await page.waitForTimeout(800);
  await page.locator('#capture').screenshot({ path: path.join(out, 'png', `${id}.png`) });
  await ctx.close();
  console.log('png', id);

  if (video) {
    const t0 = Date.now();
    const vctx = await browser.newContext({
      viewport: { width: w, height: h },
      recordVideo: { dir: path.join(out, "video", "_tmp"), size: { width: w, height: h } },
    });
    const vp = await vctx.newPage();
    await open(vp, `${base}/dev/launch-images?scene=${id}`);
    // the recording starts at page creation; skip the load time, keep exactly one loop
    const lead = Math.max(0, (Date.now() - t0) / 1000 - 0.2);
    await vp.waitForTimeout(9300);
    const file = await vp.video().path();
    await vctx.close();
    const mp4 = path.join(out, "video", `${id}.mp4`);
    execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-ss", lead.toFixed(2), "-i", file, "-t", "9", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-movflags", "+faststart", mp4]);
    fs.rmSync(file);
    console.log("mp4", id);
  }
}
await browser.close();
fs.rmSync(path.join(out, 'video', '_tmp'), { recursive: true, force: true });
