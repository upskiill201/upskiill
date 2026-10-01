'use client';

/**
 * The Creator Guide's front page: Tey's welcome with reading progress, a
 * search, the two "start here" articles up top, then every article by group.
 */

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState, type CSSProperties } from 'react';
import { ArrowRight, Check, Clock, LifeBuoy, Search } from 'lucide-react';
import { TEY_POSE_SRC } from '@/components/lesson/TeySays';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import { GUIDE, GUIDE_GROUPS, type GuideArticle } from '@/lib/creator/guide';
import { GuideIcon, GROUP_TONE } from './GuideIcon';
import { useGuideProgress } from './guideProgress';
import g from './guide.module.css';

function ArticleCard({ a, done, big = false }: { a: GuideArticle; done: boolean; big?: boolean }) {
  return (
    <Link href={`/creator/guide/${a.slug}`} className={`${g.card} ${big ? g.cardBig : ''}`} style={{ '--tone': GROUP_TONE[a.group] } as CSSProperties}>
      <span className={g.cardIcon} aria-hidden="true">
        <GuideIcon name={a.icon} size={big ? 26 : 22} />
      </span>
      <span className={g.cardText}>
        <strong>{a.title}</strong>
        <span>{a.summary}</span>
        <span className={g.cardMeta}>
          <Clock size={13} strokeWidth={2.75} aria-hidden="true" /> {a.minutes} min read
          {done && (
            <span className={g.readTag}>
              <Check size={12} strokeWidth={4} aria-hidden="true" /> Read
            </span>
          )}
        </span>
      </span>
      <ArrowRight size={18} className={g.cardArrow} aria-hidden="true" />
    </Link>
  );
}

export function GuideHome() {
  useStandaloneSound();
  const { read } = useGuideProgress();
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!query) return null;
    return GUIDE.filter((a) =>
      [a.title, a.summary, ...a.sections.map((s) => s.heading)].some((t) => t.toLowerCase().includes(query)),
    );
  }, [query]);

  const done = GUIDE.filter((a) => read.has(a.slug)).length;
  const next = GUIDE.find((a) => !read.has(a.slug));

  return (
    <div className={g.page}>
      <header className={g.hero}>
        <Image src={TEY_POSE_SRC.tablet} alt="" width={112} height={134} className={g.heroTey} priority />
        <div className={g.heroText}>
          <h1 className={g.title}>Creator Guide</h1>
          <p className={g.sub}>How to use Teyro Studio, and how to build a course learners actually finish.</p>
          <div className={g.progress}>
            <span className={g.progressBar} role="progressbar" aria-valuenow={done} aria-valuemin={0} aria-valuemax={GUIDE.length} aria-label="Articles read">
              <i style={{ width: `${(done / GUIDE.length) * 100}%` }} />
            </span>
            <span className={g.progressText}>
              {done}/{GUIDE.length} read
            </span>
          </div>
          {next && done > 0 && (
            <Link href={`/creator/guide/${next.slug}`} className={g.nextLink}>
              Up next: {next.title} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>
      </header>

      <label className={g.search}>
        <Search size={18} aria-hidden="true" />
        <span className={g.srOnly}>Search the guide</span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the guide: pricing, exercises, payouts…" />
      </label>

      {matches ? (
        <section className={g.group} aria-label="Search results">
          <h2 className={g.groupTitle}>
            {matches.length} result{matches.length === 1 ? '' : 's'}
          </h2>
          {matches.length === 0 ? (
            <p className={g.noResults}>
              Nothing matches “{q}”. Try another word, or{' '}
              <Link href="/creator/help?new=help">ask the Teyro team</Link>.
            </p>
          ) : (
            <div className={g.cards}>
              {matches.map((a) => (
                <ArticleCard key={a.slug} a={a} done={read.has(a.slug)} />
              ))}
            </div>
          )}
        </section>
      ) : (
        GUIDE_GROUPS.map((grp) => {
          const list = GUIDE.filter((a) => a.group === grp.id);
          return (
            <section key={grp.id} className={g.group} aria-labelledby={`guide-${grp.id}`}>
              <div className={g.groupHead}>
                <h2 id={`guide-${grp.id}`} className={g.groupTitle}>
                  {grp.title}
                </h2>
                <span className={g.groupBlurb}>{grp.blurb}</span>
              </div>
              <div className={`${g.cards} ${grp.id === 'start' ? g.cardsBig : ''}`}>
                {list.map((a) => (
                  <ArticleCard key={a.slug} a={a} done={read.has(a.slug)} big={grp.id === 'start'} />
                ))}
              </div>
            </section>
          );
        })
      )}

      <Link href="/creator/help" className={g.helpCard}>
        <span className={g.cardIcon} style={{ '--tone': 'var(--color-brand)' } as CSSProperties} aria-hidden="true">
          <LifeBuoy size={22} strokeWidth={2.4} />
        </span>
        <span className={g.cardText}>
          <strong>Still stuck?</strong>
          <span>Ask the Teyro team. We read every message and reply in your Studio.</span>
        </span>
        <ArrowRight size={18} className={g.cardArrow} aria-hidden="true" />
      </Link>
    </div>
  );
}
