/**
 * Dev only: the Teyro Originals preview bundles written by
 * `npm run originals -- --export` (backend/scripts/originals.ts) into
 * frontend/.originals-preview/. Lets /dev/originals play course files on a
 * phone before anything is loaded into a database. 404 outside development.
 */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

const DIR = join(process.cwd(), '.originals-preview');
const SAFE = /^[a-z0-9-]+$/;

export async function GET(request: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }
  const slug = new URL(request.url).searchParams.get('course');
  try {
    if (slug) {
      if (!SAFE.test(slug)) return NextResponse.json({ message: 'Bad course' }, { status: 400 });
      const raw = await readFile(join(DIR, `${slug}.json`), 'utf8');
      return NextResponse.json(JSON.parse(raw));
    }
    const files = (await readdir(DIR)).filter((f) => f.endsWith('.json'));
    return NextResponse.json({ courses: files.map((f) => f.replace(/\.json$/, '')) });
  } catch {
    return NextResponse.json({ courses: [], message: 'No preview yet. Run: cd backend && npm run originals -- --export' });
  }
}
