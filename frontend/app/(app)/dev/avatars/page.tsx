'use client';

/**
 * Dev-only bench for Teyro characters (lib/avatar): the onboarding starters,
 * every hair style, and a wall of seeded defaults at the sizes the app uses.
 * Gated on NODE_ENV like /dev/tey-scenes.
 */

import Avatar from '@/components/ui/Avatar';
import { AVATAR_PARTS, STARTER_AVATARS, builtAvatarUrl, seedAvatar } from '@/lib/avatar/avatar';
import { PERSONAS } from '@/lib/avatar/personas';

export default function AvatarBench() {
  if (process.env.NODE_ENV !== 'development') return null;
  const base = STARTER_AVATARS[0];

  return (
    <main className="min-h-dvh bg-[var(--bg-section)] p-4 text-[var(--text-primary)] sm:p-8">
      <h1 className="text-[24px] font-extrabold">Avatars</h1>

      <h2 className="mt-6 text-[16px] font-extrabold">Characters</h2>
      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {PERSONAS.map((p) => (
          <div key={p.id} className="flex flex-col items-center gap-1 text-center">
            <Avatar src={builtAvatarUrl(p.config)} px={120} name={p.name} />
            <span className="text-[13px] font-extrabold">{p.name}</span>
            <span className="text-[11px] font-bold text-[var(--text-secondary)]">{p.vibe} · {p.career}</span>
          </div>
        ))}
      </div>

      <h2 className="mt-6 text-[16px] font-extrabold">Close up</h2>
      <div className="mt-3 flex flex-wrap gap-4">
        {[PERSONAS[0].config, ...STARTER_AVATARS.slice(1, 4)].map((c, i) => (
          <Avatar key={i} src={builtAvatarUrl(c)} px={220} name={`Close up ${i + 1}`} />
        ))}
      </div>

      <h2 className="mt-6 text-[16px] font-extrabold">Onboarding starters</h2>
      <div className="mt-3 flex flex-wrap gap-4">
        {STARTER_AVATARS.map((c, i) => (
          <Avatar key={i} src={builtAvatarUrl(c)} px={96} name={`Starter ${i + 1}`} />
        ))}
      </div>

      <h2 className="mt-6 text-[16px] font-extrabold">Hair styles</h2>
      <div className="mt-3 flex flex-wrap gap-4">
        {Array.from({ length: AVATAR_PARTS.hair }, (_, h) => (
          <Avatar key={h} src={builtAvatarUrl({ ...base, hair: h, hairColor: 2 })} px={80} name={`Hair ${h}`} />
        ))}
      </div>

      <h2 className="mt-6 text-[16px] font-extrabold">Extras and glasses</h2>
      <div className="mt-3 flex flex-wrap gap-4">
        {Array.from({ length: AVATAR_PARTS.extra }, (_, e) => (
          <Avatar key={e} src={builtAvatarUrl({ ...base, extra: e, glasses: e % 4 })} px={80} name={`Extra ${e}`} />
        ))}
        {Array.from({ length: AVATAR_PARTS.mouth }, (_, m) => (
          <Avatar key={`m${m}`} src={builtAvatarUrl({ ...base, mouth: m, eyes: m, beard: m % 5 })} px={80} name={`Mouth ${m}`} />
        ))}
      </div>

      <h2 className="mt-6 text-[16px] font-extrabold">Seeded defaults (no photo, nothing chosen)</h2>
      <div className="mt-3 flex flex-wrap gap-3">
        {Array.from({ length: 40 }, (_, i) => (
          <Avatar key={i} seed={`user-${i}`} size={i % 3 === 0 ? 'lg' : i % 3 === 1 ? 'md' : 'sm'} name={`User ${i}`} />
        ))}
      </div>

      <h2 className="mt-6 text-[16px] font-extrabold">As an image file</h2>
      <div className="mt-3 flex gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element -- the plain-file route under test */}
        <img src={builtAvatarUrl(seedAvatar('file-test'))} alt="" width={64} height={64} />
      </div>
    </main>
  );
}
