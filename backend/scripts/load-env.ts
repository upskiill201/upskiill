/**
 * Loads backend/.env into process.env for one-off scripts (the Nest app does
 * this itself; ts-node scripts don't). Existing variables win. Import FIRST.
 */
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const file = join(__dirname, '..', '.env');
if (existsSync(file)) {
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/.exec(line);
    if (!m || process.env[m[1]] !== undefined) continue;
    process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}
