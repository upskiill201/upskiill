import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'node:crypto';

/**
 * Payout-method encryption at rest. AES-256-GCM with a per-write random IV.
 * Storage format: "v1:<keyVersion>:<ivB64>:<tagB64>:<cipherB64>"
 *
 * Key rotation contract: the CURRENT version's key always lives in
 * EARNINGS_ENC_KEY (so the production fail-fast keeps guarding it). When
 * rotating, move the retired key to EARNINGS_ENC_KEY_V<n> BEFORE bumping
 * CURRENT_KEY_VERSION — rows remember which version encrypted them and
 * resolve exactly that key, refusing loudly rather than silently failing
 * AES-GCM auth on every legacy row.
 */

export interface EncryptedPayload {
  encryptedData: string;
  keyVersion: number;
}

export const CURRENT_KEY_VERSION = 1;

const DEV_FALLBACK_KEY = 'teyro-dev-only-earnings-key-do-not-use-in-production';

function resolveKey(keyVersion = CURRENT_KEY_VERSION): Buffer {
  // Defence-in-depth: main.ts refuses to boot production without this key,
  // but the crypto layer also refuses to run on the dev key if it ever gets there.
  if (!process.env.EARNINGS_ENC_KEY && process.env.NODE_ENV === 'production') {
    throw new Error('EARNINGS_ENC_KEY must be set when NODE_ENV=production');
  }
  const source =
    keyVersion === CURRENT_KEY_VERSION
      ? process.env.EARNINGS_ENC_KEY || DEV_FALLBACK_KEY
      : process.env[`EARNINGS_ENC_KEY_V${keyVersion}`] || '';
  if (!source) {
    throw new Error(
      `No key configured for earnings key version ${keyVersion} — set EARNINGS_ENC_KEY_V${keyVersion}`,
    );
  }
  // Fast path: already 32 bytes of entropy (base64 or hex of 32 raw bytes).
  const asB64 = Buffer.from(source, 'base64');
  if (asB64.length === 32) return asB64;
  const asHex = Buffer.from(source, 'hex');
  if (asHex.length === 32) return asHex;
  if (Buffer.byteLength(source, 'utf8') === 32) return Buffer.from(source, 'utf8');
  // Stretch anything else deterministically.
  return scryptSync(source, 'teyro-earnings-v1', 32);
}

export function encryptJson(plain: unknown): EncryptedPayload {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', resolveKey(), iv);
  const cipherText = Buffer.concat([
    cipher.update(Buffer.from(JSON.stringify(plain), 'utf8')),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  const encryptedData = [
    'v1',
    String(CURRENT_KEY_VERSION),
    iv.toString('base64'),
    tag.toString('base64'),
    cipherText.toString('base64'),
  ].join(':');
  return { encryptedData, keyVersion: CURRENT_KEY_VERSION };
}

export function decryptJson<T>(encryptedData: string): T {
  const parts = encryptedData.split(':');
  if (parts.length !== 5 || parts[0] !== 'v1') {
    throw new Error('Malformed encrypted payload');
  }
  const [, versionStr, ivB64, tagB64, cipherB64] = parts;
  const key = resolveKey(Number(versionStr) || CURRENT_KEY_VERSION);
  const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(ivB64, 'base64'));
  decipher.setAuthTag(Buffer.from(tagB64, 'base64'));
  const plain = Buffer.concat([
    decipher.update(Buffer.from(cipherB64, 'base64')),
    decipher.final(),
  ]);
  return JSON.parse(plain.toString('utf8')) as T;
}

/** Mask everything but the last `keep` characters for display. */
export function maskAccount(secretTail: string): string {
  const clean = (secretTail ?? '').trim();
  if (!clean) return '';
  if (clean.length <= 4) return `•••• ${clean}`;
  return `${'•'.repeat(4)} ${clean.slice(-4)}`;
}

/** Human payout reference like PO-7K2M9QXA (no ambiguous glyphs). */
const PUBLIC_ID_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export function generatePublicId(prefix: string): string {
  const bytes = randomBytes(8);
  let out = '';
  for (const b of bytes) out += PUBLIC_ID_ALPHABET[b % PUBLIC_ID_ALPHABET.length];
  return `${prefix}-${out}`;
}
