#!/usr/bin/env node
/**
 * Data for the /teach/<location> creator pages — real, citable, per place.
 *
 *   node scripts/seo/build-teach-data.mjs            # resumable; run until "complete"
 *   BLS_API_KEY=xxxx node scripts/seo/build-teach-data.mjs
 *
 * Why this exists: location pages are only legitimate when each one carries
 * information the others don't. Swapping a city name into a template is a
 * doorway page, and Google demotes the whole site for it. So:
 *   - US states + metros: official BLS OEWS pay and employment for software
 *     developers (15-1252) and data scientists (15-2051). No data → no page.
 *   - Countries: World Bank population, internet use and GDP per person, plus
 *     an exchange-rate snapshot for the local-currency earnings example.
 *
 * BLS API without a key: 25 series per request, ~25 requests a day. The raw
 * cache (scripts/seo/cache/bls.json) keeps progress between runs, biggest
 * metros first. A free key (https://data.bls.gov/registrationEngine/) lifts it
 * to 50 series × 500 requests — everything in one run.
 *
 * Output: content/seo/teach-data.json (committed — pages build from it).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const AREAS_TSV = path.join(ROOT, 'scripts', 'seo', 'data', 'bls-oews-areas.tsv');
const CACHE = path.join(ROOT, 'scripts', 'seo', 'cache', 'bls.json');
const OUT = path.join(ROOT, 'content', 'seo', 'teach-data.json');
const COUNTRIES = path.join(ROOT, 'scripts', 'seo', 'data', 'teach-countries.json');

const KEY = process.env.BLS_API_KEY;
const PER_REQUEST = KEY ? 50 : 25;

// Series suffix = occupation (6) + datatype (2). 01 employment, 13 median annual wage.
const SERIES = {
  devMedian: '15125213',
  devJobs: '15125201',
  dsMedian: '15205113',
  dsJobs: '15205101',
};

// Biggest metros first, so a partial run covers the pages that matter most.
const PRIORITY_CITIES = `New York|Los Angeles|Chicago|Dallas|Houston|Washington|Philadelphia|Miami|Atlanta|Boston|Phoenix|San Francisco|Riverside|Detroit|Seattle|Minneapolis|San Diego|Tampa|Denver|Baltimore|St. Louis|Orlando|Charlotte|San Antonio|Portland|Sacramento|Pittsburgh|Austin|Las Vegas|Cincinnati|Kansas City|Columbus|Indianapolis|Cleveland|San Jose|Nashville|Virginia Beach|Providence|Jacksonville|Milwaukee|Raleigh|Oklahoma City|Memphis|Richmond|Louisville|New Orleans|Salt Lake City|Hartford|Buffalo|Birmingham|Rochester|Grand Rapids|Tucson|Honolulu|Tulsa|Fresno|Worcester|Omaha|Bridgeport|Greenville|Albuquerque|Bakersfield|Albany|Knoxville|El Paso|Baton Rouge|McAllen|New Haven|Allentown|Oxnard|Columbia|North Port|Charleston|Dayton|Greensboro|Stockton|Cape Coral|Boise|Colorado Springs|Little Rock|Lakeland|Akron|Des Moines|Springfield|Ogden|Madison|Winston-Salem|Deltona|Syracuse|Provo|Toledo|Wichita|Durham|Augusta|Palm Bay|Jackson|Harrisburg|Spokane|Chattanooga|Scranton|Huntsville|Lancaster|Modesto|Portland|Fayetteville|Reno|Youngstown|Lexington|Pensacola|Santa Rosa|Ann Arbor|Boulder|Trenton|Gainesville|Tallahassee|Lincoln|Fort Collins|Asheville|Savannah|Anchorage|Burlington`.split('|');

function readAreas() {
  const rows = fs.readFileSync(AREAS_TSV, 'utf8').trim().split(/\r?\n/).slice(1);
  const areas = rows
    .map((line) => {
      const [stateCode, code, type, name] = line.split('\t');
      return { stateCode, code, type, name };
    })
    .filter((a) => (a.type === 'S' && !['66', '72', '78'].includes(a.stateCode)) || (a.type === 'M' && !/nonmetropolitan/i.test(a.name)));

  const rank = (a) => {
    if (a.type === 'S') return -1;
    const first = a.name.split(/[-,]/)[0].trim();
    const i = PRIORITY_CITIES.indexOf(first);
    return i === -1 ? 1000 : i;
  };
  return areas.sort((x, y) => rank(x) - rank(y));
}

function seriesId(area, suffix) {
  // State: OEUS + FIPS(2) + 00000 ; metro: OEUM + area code (7) ; then industry 000000
  const prefix = area.type === 'S' ? `OEUS${area.stateCode}00000` : `OEUM${area.code}`;
  return `${prefix}000000${suffix}`;
}

async function blsRequest(ids) {
  const res = await fetch('https://api.bls.gov/publicAPI/v2/timeseries/data/', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ seriesid: ids, latest: true, ...(KEY ? { registrationkey: KEY } : {}) }),
  });
  return res.json();
}

async function fetchBls(areas, cache) {
  const wanted = areas.flatMap((a) => Object.values(SERIES).map((s) => seriesId(a, s)));
  const missing = wanted.filter((id) => !(id in cache.series));
  console.log(`BLS: ${wanted.length - missing.length}/${wanted.length} series cached`);

  for (let i = 0; i < missing.length; i += PER_REQUEST) {
    const batch = missing.slice(i, i + PER_REQUEST);
    const json = await blsRequest(batch);
    const messages = json.message ?? [];
    if (json.status !== 'REQUEST_SUCCEEDED' || messages.some((m) => /threshold|limit of \d+ requests/i.test(m))) {
      console.log(`BLS stopped: ${messages.join(' ') || json.status}. Re-run tomorrow or set BLS_API_KEY.`);
      return false;
    }
    for (const s of json.Results?.series ?? []) {
      const point = s.data?.[0];
      cache.series[s.seriesID] = point ? { value: Number(point.value), year: point.year } : null;
      if (point?.year) cache.year = point.year;
    }
    // Series the API returned nothing for are suppressed by BLS — remember that.
    for (const id of batch) if (!(id in cache.series)) cache.series[id] = null;
    fs.writeFileSync(CACHE, JSON.stringify(cache));
    process.stdout.write('.');
  }
  console.log('\nBLS: complete');
  return true;
}

async function fetchWorldBank(iso3s) {
  const indicators = {
    population: 'SP.POP.TOTL',
    internetPct: 'IT.NET.USER.ZS',
    gdpPerCapita: 'NY.GDP.PCAP.CD',
  };
  const out = {};
  for (const [key, id] of Object.entries(indicators)) {
    for (let i = 0; i < iso3s.length; i += 40) {
      const chunk = iso3s.slice(i, i + 40).join(';');
      const res = await fetch(`https://api.worldbank.org/v2/country/${chunk}/indicator/${id}?format=json&mrnev=1&per_page=500`);
      const [, rows] = await res.json();
      for (const r of rows ?? []) {
        if (r.value == null) continue;
        out[r.countryiso3code] ??= {};
        out[r.countryiso3code][key] = { value: r.value, year: r.date };
      }
    }
  }
  return out;
}

async function fetchFx() {
  const res = await fetch('https://open.er-api.com/v6/latest/USD');
  const json = await res.json();
  return { date: new Date(json.time_last_update_unix * 1000).toISOString().slice(0, 10), rates: json.rates };
}

async function main() {
  const areas = readAreas();
  fs.mkdirSync(path.dirname(CACHE), { recursive: true });
  const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : { series: {}, year: null };
  const complete = await fetchBls(areas, cache);

  const get = (a, k) => cache.series[seriesId(a, SERIES[k])]?.value ?? null;
  const us = areas
    .map((a) => ({
      code: a.code,
      type: a.type === 'S' ? 'state' : 'metro',
      stateCode: a.stateCode,
      name: a.name,
      devMedian: get(a, 'devMedian'),
      devJobs: get(a, 'devJobs'),
      dsMedian: get(a, 'dsMedian'),
      dsJobs: get(a, 'dsJobs'),
    }))
    .filter((a) => a.devMedian != null || a.dsMedian != null);

  const countries = JSON.parse(fs.readFileSync(COUNTRIES, 'utf8'));
  const [wb, fx] = await Promise.all([fetchWorldBank(countries.map((c) => c.iso3)), fetchFx()]);

  const out = {
    generatedAt: new Date().toISOString().slice(0, 10),
    bls: { year: cache.year, complete, source: 'U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics' },
    worldBank: { source: 'World Bank Open Data' },
    fx: { date: fx.date, source: 'ExchangeRate-API (open.er-api.com)' },
    us,
    countries: countries.map((c) => ({
      ...c,
      ...Object.fromEntries(Object.entries(wb[c.iso3] ?? {}).map(([k, v]) => [k, v.value])),
      wbYear: wb[c.iso3]?.population?.year ?? null,
      usdRate: fx.rates[c.currency] ?? null,
    })),
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(out, null, 1)}\n`);
  console.log(`Wrote ${path.relative(ROOT, OUT)}: ${us.length} US areas with data, ${out.countries.length} countries`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
