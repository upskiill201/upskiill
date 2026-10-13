// Renders an HTML cover to a JPEG. Usage:
// node render.js <playwright module path> <html> <tey image> <out.jpg>
const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require(process.argv[2]);

(async () => {
  const [, , , htmlPath, teyPath, out] = process.argv;
  const html = fs.readFileSync(htmlPath, 'utf8').replace('TEY_SRC', pathToFileURL(teyPath).href);
  // Temp copy outside the repo: it holds a local file path for the Tey image.
  const tmp = path.join(os.tmpdir(), path.basename(htmlPath).replace('.html', '.render.html'));
  fs.writeFileSync(tmp, html);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const family = await page.evaluate(() => document.fonts.check('800 40px "Plus Jakarta Sans"'));
  await page.screenshot({ path: out, type: 'jpeg', quality: 90 });
  await browser.close();
  console.log('wrote', out, fs.statSync(out).size, 'bytes; brand font loaded:', family);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
