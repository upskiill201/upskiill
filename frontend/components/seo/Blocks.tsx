import Link from 'next/link';
import { ArrowRight, Check, ChevronRight, Info, X, Zap } from 'lucide-react';
import FeatureVisual from './FeatureVisual';
import { START_HREF, START_LABEL, TEYRO } from '@/lib/seo/facts';
import type { VisualKey } from '@/lib/seo/facts';
import s from './Seo.module.css';

/*
 * Shared blocks for the SEO sections. Server components — only FeatureVisual
 * (the animated product mock) runs on the client.
 */

export interface Crumb {
  name: string;
  path: string;
}

/* ── Header band ─────────────────────────────────────────────────────── */

export function SeoHeader({
  crumbs,
  chip,
  title,
  dek,
  meta,
  flat = false,
}: {
  crumbs: Crumb[];
  chip: string;
  title: string;
  dek: string;
  meta?: React.ReactNode;
  /** No answer card overlaps the band (hubs) */
  flat?: boolean;
}) {
  return (
    <header className={`${s.band} ${flat ? s.bandFlat : ''}`}>
      <div className={s.header}>
        <nav className={s.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={s.crumbLink}>
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.path} style={{ display: 'contents' }}>
              <ChevronRight size={14} strokeWidth={3} className={s.crumbSep} aria-hidden="true" />
              <Link href={c.path} className={s.crumbLink}>
                {c.name}
              </Link>
            </span>
          ))}
        </nav>
        <span className={s.chip}>{chip}</span>
        <h1 className={`${s.display} ${s.title}`}>{title}</h1>
        <p className={s.dek}>{dek}</p>
        {meta && <div className={s.meta}>{meta}</div>}
      </div>
    </header>
  );
}

/* ── Answer card ─────────────────────────────────────────────────────── */

/**
 * The first thing under the headline: the direct answer (what AI engines and
 * featured snippets lift), then the install button, then one line on why
 * Teyro solves this exact problem — beside the product mock of that feature.
 */
export function AnswerCard({
  answer,
  why,
  visual,
  visualNode,
  caption,
  label = 'The short answer',
  cta = { href: START_HREF, label: START_LABEL },
  fineprint = `${TEYRO.priceShort} · ${TEYRO.ads} · iPhone, Android and web`,
}: {
  answer: string;
  why?: string;
  visual?: VisualKey;
  /** A server-rendered visual instead of a product mock (creator pages) */
  visualNode?: React.ReactNode;
  caption?: string;
  label?: string;
  cta?: { href: string; label: string };
  fineprint?: string;
}) {
  return (
    <section className={s.answer} aria-label={label}>
      <div className={s.answerCopy}>
        <span className={s.answerLabel}>
          <Zap size={16} strokeWidth={3} aria-hidden="true" />
          {label}
        </span>
        <p className={s.answerText}>{answer}</p>
        {why && <p className={s.answerWhy}>{why}</p>}
        <Link href={cta.href} className={s.btn}>
          {cta.label}
          <ArrowRight size={18} strokeWidth={3} aria-hidden="true" />
        </Link>
        <p className={s.fineprint}>{fineprint}</p>
      </div>
      <figure className={s.answerVisual}>
        {visualNode ?? (visual && <FeatureVisual name={visual} />)}
        {caption && <figcaption className={s.caption}>{caption}</figcaption>}
      </figure>
    </section>
  );
}

/* ── Section heading ─────────────────────────────────────────────────── */

export function SectionHead({
  eyebrow,
  title,
  lead,
  center = false,
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  center?: boolean;
  id?: string;
}) {
  return (
    <div className={`${s.sectionHead} ${center ? s.sectionHeadCenter : ''}`}>
      {eyebrow && <span className={s.eyebrow}>{eyebrow}</span>}
      <h2 id={id} className={`${s.display} ${s.h2}`}>
        {title}
      </h2>
      {lead && <p className={s.lead}>{lead}</p>}
    </div>
  );
}

/* ── Lists ───────────────────────────────────────────────────────────── */

export function CheckList({ items, negative = false }: { items: string[]; negative?: boolean }) {
  return (
    <ul className={s.checks}>
      {items.map((item) => (
        <li key={item}>
          <span className={negative ? s.cross : s.tick} aria-hidden="true">
            {negative ? <X size={14} strokeWidth={4} /> : <Check size={14} strokeWidth={4} />}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ListCard({
  title,
  items,
  negative = false,
  tinted = false,
}: {
  title: string;
  items: string[];
  negative?: boolean;
  tinted?: boolean;
}) {
  return (
    <div className={`${s.card} ${tinted ? s.cardTinted : ''}`}>
      <h3 className={s.cardTitle}>{title}</h3>
      <CheckList items={items} negative={negative} />
    </div>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.callout}>
      <Info size={22} strokeWidth={2.5} aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}

/* ── Split row: a claim beside the mock that proves it ───────────────── */

export function SplitRow({
  title,
  body,
  visual,
  flip = false,
}: {
  title: string;
  body: string;
  visual: VisualKey;
  flip?: boolean;
}) {
  return (
    <div className={`${s.split} ${flip ? s.splitFlip : ''}`}>
      <div className={s.splitCopy}>
        <h3 className={`${s.display} ${s.h2}`}>{title}</h3>
        <p className={s.lead}>{body}</p>
      </div>
      <div className={s.splitVisual}>
        <FeatureVisual name={visual} />
      </div>
    </div>
  );
}

/* ── Link cards ──────────────────────────────────────────────────────── */

export interface LinkCardItem {
  href: string;
  title: string;
  text: string;
  kicker?: string;
  art?: React.ReactNode;
  accent?: string;
}

export function LinkCards({ items, columns = 3 }: { items: LinkCardItem[]; columns?: 2 | 3 }) {
  return (
    <div className={columns === 3 ? s.grid3 : s.grid2}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={s.linkCard}
          style={item.accent ? ({ '--card-accent': item.accent } as React.CSSProperties) : undefined}
        >
          {item.art && <span className={s.linkArt}>{item.art}</span>}
          {item.kicker && <span className={s.linkKicker}>{item.kicker}</span>}
          <span className={s.cardTitle}>{item.title}</span>
          <span className={s.cardText}>{item.text}</span>
          <span className={s.linkMore}>
            Read more <ArrowRight size={14} strokeWidth={3} aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  );
}
