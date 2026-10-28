import {
  AVATAR_PARTS,
  avatarFromUrl,
  builtAvatarUrl,
  decodeAvatar,
  encodeAvatar,
  isPhoto,
  randomAvatar,
  seedAvatar,
} from '../avatar';
import { avatarSvg } from '../draw';
import { PERSONAS } from '../personas';

describe('Teyro characters', () => {
  it('round-trips through the stored path', () => {
    for (let i = 0; i < 50; i++) {
      const c = randomAvatar();
      expect(avatarFromUrl(builtAvatarUrl(c))).toEqual(c);
    }
  });

  it('rejects codes that are malformed or out of range', () => {
    expect(decodeAvatar('short')).toBeNull();
    expect(decodeAvatar('zzzzzzzzzzzzzz')).toBeNull();
    expect(avatarFromUrl('https://example.com/me.jpg')).toBeNull();
  });

  it('gives the same person the same face, and different people different faces', () => {
    expect(seedAvatar('user-1')).toEqual(seedAvatar('user-1'));
    const faces = new Set(Array.from({ length: 40 }, (_, i) => encodeAvatar(seedAvatar(`user-${i}`))));
    expect(faces.size).toBeGreaterThan(35);
  });

  it('every persona is a valid character with a distinct look', () => {
    const codes = PERSONAS.map((p) => encodeAvatar(p.config));
    expect(new Set(codes).size).toBe(PERSONAS.length);
    for (const p of PERSONAS) {
      for (const [part, n] of Object.entries(AVATAR_PARTS)) {
        const v = p.config[part as keyof typeof AVATAR_PARTS];
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThan(n);
      }
    }
  });

  it('draws every option without broken markup', () => {
    const base = PERSONAS[0].config;
    for (const [part, n] of Object.entries(AVATAR_PARTS)) {
      for (let v = 0; v < n; v++) {
        const svg = avatarSvg({ ...base, [part]: v });
        expect(svg.startsWith('<svg')).toBe(true);
        expect(svg).not.toMatch(/undefined|NaN/);
      }
    }
  });

  it('only an uploaded photo counts as a photo', () => {
    expect(isPhoto('https://pub-x.r2.dev/avatars/u/1.jpg')).toBe(true);
    expect(isPhoto(builtAvatarUrl(PERSONAS[0].config))).toBe(false);
    expect(isPhoto(null)).toBe(false);
  });
});
