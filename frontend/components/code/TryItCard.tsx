'use client';

/**
 * Try it live (a Learn card): real, editable Python with a Run button.
 * Finished once it has run without an error, so Continue never waits on
 * the learner getting anything "right". The challenge line nudges them to
 * change the code and run it again, which is where the learning happens.
 */

import { useState } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import type { RichLearnCard } from '@/lib/lesson/blocks';
import { PythonPad } from './PythonPad';

type TryIt = Extract<RichLearnCard, { kind: 'tryIt' }>;

export function TryItCard({ card, done, onDone }: { card: TryIt; done: boolean; onDone: () => void }) {
  const [code, setCode] = useState(card.code);

  return (
    <div className="flex flex-col gap-4">
      <div
        className="rounded-[24px] border-2 border-[var(--border)] bg-white p-5 md:p-6 flex flex-col gap-4"
        style={{ boxShadow: '0 4px 0 var(--border)' }}
      >
        <p className="flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--success-green)]">
          <Zap className="w-4 h-4" aria-hidden="true" />
          {card.title ?? 'Try it live'}
        </p>
        {card.caption && <p className="text-[17px] leading-[1.55] font-semibold text-ink">{card.caption}</p>}
        <PythonPad
          value={code}
          onChange={setCode}
          resetTo={card.code}
          stdin={card.stdin}
          label={card.title ?? 'Try it live'}
          language={card.language}
          onRun={(run) => {
            const clean = !run.error && !run.timedOut && (run.typeErrors?.length ?? 0) === 0;
            if ((card.expectError || clean) && !done) onDone();
          }}
        />
      </div>
      {card.challenge && (
        <div
          className="rounded-[18px] border-2 p-4 flex gap-3 items-start"
          style={{ borderColor: 'var(--brand-purple)', background: 'color-mix(in srgb, var(--brand-purple) 8%, white)' }}
        >
          <Sparkles className="w-5 h-5 shrink-0 mt-0.5 text-[var(--brand-purple)]" aria-hidden="true" />
          <p className="text-[16px] font-bold leading-snug text-ink">
            <span className="text-[var(--brand-purple)]">Your turn: </span>
            {card.challenge}
          </p>
        </div>
      )}
    </div>
  );
}
