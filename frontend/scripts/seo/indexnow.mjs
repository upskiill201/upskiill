#!/usr/bin/env node
/**
 * Tell Bing (and every IndexNow engine: Yandex, Seznam, Naver…) which pages are
 * new or changed, so they are crawled in hours instead of weeks. Bing's index
 * feeds ChatGPT search and Copilot, so this is also the fastest way into those.
 *
 *   node scripts/seo/indexnow.mjs            # submit every URL in the live sitemap
 *   node scripts/seo/indexnow.mjs --dry      # list what would be sent
 *   node scripts/seo/indexnow.mjs /blog/a /blog/b   # only these paths
 *
 * Run it AFTER a production deploy — the key file must already be live at
 * https://teyro.app/<key>.txt (it is public/<key>.txt in this repo).
 * Google ignores IndexNow; it relies on the sitemap and Search Console.
 */

const KEY = '53f6101082caaf5648566f2f9035a4dd';
const HOST = 'teyro.app';
const ORIGIN = `https://${HOST}`;
const args = process.argv.slice(2);
const dry = args.includes('--dry');
const paths = args.filter((a) => a.startsWith('/'));

async function sitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  // A sitemap index points at more sitemaps: follow one level.
  const nested = urls.filter((u) => u.endsWith('.xml'));
  if (!nested.length) return urls;
  const all = [];
  for (const n of nested) {
    const r = await fetch(n);
    if (r.ok) all.push(...[...(await r.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  }
  return all;
}

const urlList = paths.length ? paths.map((p) => ORIGIN + p) : await sitemapUrls();
console.log(`${urlList.length} URLs`);
if (dry) {
  console.log(urlList.slice(0, 20).join('\n'));
  process.exit(0);
}

// IndexNow accepts up to 10,000 URLs per request.
for (let i = 0; i < urlList.length; i += 9000) {
  const chunk = urlList.slice(i, i + 9000);
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList: chunk }),
  });
  console.log(`batch ${i / 9000 + 1}: HTTP ${res.status}`);
}
