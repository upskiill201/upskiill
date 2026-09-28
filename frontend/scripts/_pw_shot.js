const { chromium } = require('playwright');

const VIEWPORTS = {
  'iphone-se-375': { width: 375, height: 667 },
  'tiny-320': { width: 320, height: 568 },
  'iphone-14-390': { width: 390, height: 844 },
  'desktop-1440': { width: 1440, height: 900 },
};

const PATHS = process.argv[2] ? process.argv[2].split(',') : ['/onboarding/1'];
const PREFIX = process.argv[3] || 'shot';

(async () => {
  const browser = await chromium.launch();
  for (const [name, size] of Object.entries(VIEWPORTS)) {
    const page = await browser.newPage({ viewport: size });
    for (const path of PATHS) {
      await page.goto(`http://localhost:3000${path}`, { waitUntil: 'load' });
      await page.waitForTimeout(1900);
      const fname = `/tmp/shots/${PREFIX}_${name}_${path.replace(/\//g, '-')}.png`;
      await page.screenshot({ path: fname });
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return { scrollH: doc.scrollHeight, clientH: doc.clientHeight, overflowY: doc.scrollHeight > doc.clientHeight };
      });
      console.log(`${name} ${path} -> ${fname} | overflow=${overflow.overflowY} (scroll ${overflow.scrollH} vs client ${overflow.clientH})`);
    }
    await page.close();
  }
  await browser.close();
})();
