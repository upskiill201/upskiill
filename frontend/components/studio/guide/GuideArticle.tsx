'use client';

/**
 * One Creator Guide article: the text with its pictures, a contents list
 * that follows you on desktop, "Was this helpful?" (a "no" becomes feedback
 * the Teyro team reads), and the previous / next article.
 */

import Link from 'next/link';
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Check, CircleAlert, Clock, Lightbulb, ThumbsDown, ThumbsUp, X } from 'lucide-react';
import { playSound } from '@/lib/audio/lessonSounds';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import { GUIDE, GUIDE_GROUPS, type GuideArticle as Article, type GuideBlock } from '@/lib/creator/guide';
import { createTicket } from '@/lib/support/support';
import { GuideIcon, GROUP_TONE } from './GuideIcon';
import { GuideVisualView } from './GuideVisuals';
import { useGuideProgress } from './guideProgress';
import g from './guide.module.css';

/** **bold** → <strong>. */
function rich(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part,
  );
}

const anchor = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function Block({ b }: { b: GuideBlock }) {
  switch (b.t) {
    case 'p':
      return <p className={g.p}>{rich(b.text)}</p>;
    case 'list':
      return (
        <ul className={g.ul}>
          {b.items.map((it) => (
            <li key={it}>{rich(it)}</li>
          ))}
        </ul>
      );
    case 'steps':
      return (
        <ol className={g.steps}>
          {b.items.map((it, i) => (
            <li key={it.title} className={g.step}>
              <span className={g.stepNum}>{i + 1}</span>
              <span>
                <strong>{it.title}</strong>
                <span>{rich(it.text)}</span>
              </span>
            </li>
          ))}
        </ol>
      );
    case 'tip':
      return (
        <div className={g.callout} style={{ '--tone': 'var(--success-green)' } as CSSProperties}>
          <Lightbulb size={20} strokeWidth={2.5} aria-hidden="true" />
          <p>
            <strong>Tip · </strong>
            {rich(b.text)}
          </p>
        </div>
      );
    case 'warn':
      return (
        <div className={g.callout} style={{ '--tone': 'var(--warning)' } as CSSProperties}>
          <CircleAlert size={20} strokeWidth={2.5} aria-hidden="true" />
          <p>
            <strong>Good to know · </strong>
            {rich(b.text)}
          </p>
        </div>
      );
    case 'visual':
      return <GuideVisualView v={b.v} caption={b.caption} />;
    case 'dodont':
      return (
        <div className={g.dodont}>
          <div className={g.doCol}>
            <strong>
              <Check size={16} strokeWidth={4} aria-hidden="true" /> Do
            </strong>
            <ul>
              {b.do.map((x) => (
                <li key={x}>{rich(x)}</li>
              ))}
            </ul>
          </div>
          <div className={g.dontCol}>
            <strong>
              <X size={16} strokeWidth={4} aria-hidden="true" /> Avoid
            </strong>
            <ul>
              {b.dont.map((x) => (
                <li key={x}>{rich(x)}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    case 'cta':
      return (
        <Link href={b.href} className={g.cta}>
          {b.label} <ArrowRight size={16} aria-hidden="true" />
        </Link>
      );
  }
}

function Helpful({ article }: { article: Article }) {
  const [state, setState] = useState<'ask' | 'why' | 'sending' | 'thanks'>('ask');
  const [why, setWhy] = useState('');
  const [err, setErr] = useState<string | null>(null);

  const sendWhy = async () => {
    if (why.trim().length < 5) return;
    setState('sending');
    setErr(null);
    try {
      await createTicket({
        audience: 'CREATOR',
        kind: 'FEEDBACK',
        subject: `Guide: “${article.title}” wasn’t helpful`,
        message: why.trim(),
        pagePath: `/creator/guide/${article.slug}`,
      });
      playSound('post');
      setState('thanks');
    } catch (e) {
      setErr((e as Error).message);
      setState('why');
    }
  };

  if (state === 'thanks') return <div className={g.helpful}>Thanks! That helps us make the guide better.</div>;
  return (
    <div className={g.helpful}>
      {state === 'ask' ? (
        <>
          <strong>Was this helpful?</strong>
          <div className={g.helpfulBtns}>
            <button
              type="button"
              className={g.helpBtn}
              onClick={() => {
                playSound('like');
                setState('thanks');
              }}
            >
              <ThumbsUp size={18} aria-hidden="true" /> Yes
            </button>
            <button type="button" className={g.helpBtn} onClick={() => setState('why')}>
              <ThumbsDown size={18} aria-hidden="true" /> Not really
            </button>
          </div>
        </>
      ) : (
        <form
          className={g.whyForm}
          onSubmit={(e) => {
            e.preventDefault();
            void sendWhy();
          }}
        >
          <label htmlFor="guide-why">
            <strong>What was missing or unclear?</strong>
          </label>
          <textarea id="guide-why" rows={3} maxLength={2000} value={why} onChange={(e) => setWhy(e.target.value)} />
          {err && (
            <p className={g.err} role="alert">
              {err}
            </p>
          )}
          <button type="submit" className={g.cta} disabled={state === 'sending' || why.trim().length < 5}>
            {state === 'sending' ? 'Sending…' : 'Send to the Teyro team'}
          </button>
        </form>
      )}
    </div>
  );
}

export function GuideArticleView({ article }: { article: Article }) {
  useStandaloneSound();
  const { markRead } = useGuideProgress();
  useEffect(() => markRead(article.slug), [article.slug, markRead]);

  const i = GUIDE.findIndex((a) => a.slug === article.slug);
  const prev = GUIDE[i - 1];
  const next = GUIDE[i + 1];
  const group = GUIDE_GROUPS.find((x) => x.id === article.group)!;

  return (
    <div className={g.page}>
      <Link href="/creator/guide" className={g.back}>
        <ArrowLeft size={18} aria-hidden="true" /> Creator Guide
      </Link>

      <div className={g.articleGrid}>
        <article className={g.article}>
          <header className={g.articleHead} style={{ '--tone': GROUP_TONE[article.group] } as CSSProperties}>
            <span className={g.articleIcon} aria-hidden="true">
              <GuideIcon name={article.icon} size={26} />
            </span>
            <span className={g.articleKicker}>
              {group.title} · <Clock size={13} strokeWidth={2.75} aria-hidden="true" /> {article.minutes} min
            </span>
            <h1 className={g.articleTitle}>{article.title}</h1>
            <p className={g.articleSummary}>{article.summary}</p>
          </header>

          {article.sections.map((s) => (
            <section key={s.heading} id={anchor(s.heading)} className={g.articleSection}>
              <h2 className={g.h2}>{s.heading}</h2>
              {s.blocks.map((b, bi) => (
                <Block key={bi} b={b} />
              ))}
            </section>
          ))}

          <Helpful key={article.slug} article={article} />

          <nav className={g.pager} aria-label="More articles">
            {prev ? (
              <Link href={`/creator/guide/${prev.slug}`} className={g.pagerLink}>
                <span>
                  <ArrowLeft size={14} aria-hidden="true" /> Previous
                </span>
                <strong>{prev.title}</strong>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/creator/guide/${next.slug}`} className={`${g.pagerLink} ${g.pagerNext}`}>
                <span>
                  Next <ArrowRight size={14} aria-hidden="true" />
                </span>
                <strong>{next.title}</strong>
              </Link>
            )}
          </nav>
        </article>

        <aside className={g.toc} aria-label="On this page">
          <span className={g.tocTitle}>On this page</span>
          {article.sections.map((s) => (
            <a key={s.heading} href={`#${anchor(s.heading)}`} className={g.tocLink}>
              {s.heading}
            </a>
          ))}
          <Link href="/creator/help?new=help" className={g.tocHelp}>
            Still stuck? Ask the team
          </Link>
        </aside>
      </div>
    </div>
  );
}
