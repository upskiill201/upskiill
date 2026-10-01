import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarDays } from 'lucide-react';
import {
  COMPETITORS,
  COMPETITOR_BY_ID,
  FACT_LABELS,
  TEYRO_FACTS,
  altSlug,
  competitorPageDescription,
  competitorPageTitle,
  resolveCompetitorSlug,
  vsSlug,
} from '@/lib/seo/competitors';
import type { Competitor, CompetitorFacts } from '@/lib/seo/competitors';
import { getComplaints } from '@/lib/seo/complaints';
import { START_HREF, START_LABEL, TEYRO, TEYRO_LIMITS } from '@/lib/seo/facts';
import { formatDate } from '@/lib/blog/site';
import { articleSchema, breadcrumbSchema, faqSchema, itemListSchema, schemas } from '@/lib/seo/schema';
import { relatedCards } from '@/lib/seo/related';
import JsonLd from '@/components/features/blog/JsonLd';
import FaqAccordion from '@/components/features/blog/FaqAccordion';
import CtaBlock from '@/components/features/blog/CtaBlock';
import { AnswerCard, Callout, LinkCards, ListCard, SectionHead, SeoHeader } from '@/components/seo/Blocks';
import s from '@/components/seo/Seo.module.css';

export const revalidate = 3600;
export const dynamicParams = false;

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COMPETITORS.flatMap((c) => [{ slug: vsSlug(c) }, { slug: altSlug(c) }]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hit = resolveCompetitorSlug(slug);
  if (!hit) return {};
  const title = competitorPageTitle(hit.kind, hit.competitor);
  const description = competitorPageDescription(hit.kind, hit.competitor);
  return {
    title,
    description,
    alternates: { canonical: `/alternatives/${slug}` },
    openGraph: { type: 'article', url: `/alternatives/${slug}`, title, description },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function CompetitorPage({ params }: Props) {
  const { slug } = await params;
  const hit = resolveCompetitorSlug(slug);
  if (!hit) notFound();

  const c = hit.competitor;
  const isVs = hit.kind === 'vs';
  const path = `/alternatives/${slug}`;
  const title = competitorPageTitle(hit.kind, c);
  const description = competitorPageDescription(hit.kind, c);
  const complaints = getComplaints(c.id);

  // The other page for this competitor first, then its alternatives' pages.
  const relatedPaths = [
    `/alternatives/${isVs ? altSlug(c) : vsSlug(c)}`,
    ...c.alternatives
      .filter((a) => a.id && a.id !== 'teyro' && COMPETITOR_BY_ID.has(a.id))
      .map((a) => `/alternatives/teyro-vs-${a.id}`),
  ];
  const related = relatedCards(relatedPaths, path, 3);

  return (
    <div className={s.page}>
      <JsonLd
        data={schemas(
          articleSchema({ path, title, description, dateModified: c.checked }),
          breadcrumbSchema([
            { name: 'Compare', path: '/alternatives' },
            { name: isVs ? `Teyro vs ${c.name}` : `${c.name} alternatives`, path },
          ]),
          isVs
            ? null
            : itemListSchema(
                `${c.name} alternatives`,
                c.alternatives.map((a) => ({
                  name: a.name,
                  url: a.id && a.id !== 'teyro' && COMPETITOR_BY_ID.has(a.id) ? `/alternatives/teyro-vs-${a.id}` : undefined,
                })),
              ),
          faqSchema(c.faq),
        )}
      />

      <SeoHeader
        crumbs={[{ name: 'Compare', path: '/alternatives' }]}
        chip={isVs ? 'Head to head' : 'Alternatives'}
        title={title}
        dek={c.summary}
        meta={
          <span className={s.metaItem}>
            <CalendarDays size={16} strokeWidth={2.5} aria-hidden="true" />
            Facts checked <time dateTime={c.checked}>{formatDate(c.checked)}</time>
          </span>
        }
      />

      <div className={s.container}>
        <AnswerCard
          answer={isVs ? c.vsAnswer : c.altAnswer}
          why={c.switchIf[0] ? `Pick Teyro if: ${lowerFirst(c.switchIf[0])}.` : undefined}
          visual={c.visual}
          caption="Teyro, drawn from the real app"
        />

        {isVs ? <VsBody c={c} /> : <AlternativesBody c={c} />}

        {complaints && (
          <section className={s.section} aria-labelledby="complaints">
            <div className={s.narrow}>
              <SectionHead
                id="complaints"
                eyebrow="Why people leave"
                title={`What unhappy ${c.name} users say`}
                lead={`We read ${complaints.reviewed} recent App Store reviews of ${c.name}. These themes came up most in the ${complaints.lowStar} one- and two-star reviews.`}
              />
              <div className={s.card}>
                <div className={s.bars}>
                  {complaints.themes.map((t) => (
                    <div key={t.id} className={s.barRow}>
                      <span className={s.barLabel}>{t.label}</span>
                      <span className={s.barCount}>
                        {t.count} of {complaints.lowStar}
                      </span>
                      <span className={s.barTrack}>
                        <span
                          className={s.barFill}
                          style={{ width: `${Math.round((t.count / complaints.lowStar) * 100)}%` }}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className={s.note}>
                Small sample from Apple&apos;s public reviews (US, UK, India, Nigeria, Canada, Australia), collected{' '}
                {formatDate(complaints.generatedAt)}. Unhappy reviewers are not typical users — treat this as a list of
                risks to check, not a verdict.
              </p>
            </div>
          </section>
        )}

        <section className={s.section} aria-labelledby="limits">
          <div className={s.narrow}>
            <SectionHead
              id="limits"
              eyebrow="In fairness"
              title="Where Teyro falls short"
              lead="Every comparison page on this site ends with this list, so you can decide with the full picture."
            />
            <ListCard title="Teyro’s limits today" items={[...TEYRO_LIMITS]} negative />
          </div>
        </section>

        <div className={s.narrow}>
          {c.faq.length > 0 && <FaqAccordion items={c.faq} />}
          <CtaBlock
            cta={{
              title: isVs ? `Try Teyro next to ${c.name}` : 'Try the #1 pick for coding and AI',
              text: 'Your first lesson takes a few minutes. Free to start, no ads — keep whichever sticks.',
              href: START_HREF,
              label: START_LABEL,
            }}
          />
        </div>

        {related.length > 0 && (
          <section className={s.section} aria-labelledby="related-heading">
            <SectionHead id="related-heading" title="More comparisons" />
            <LinkCards items={related} />
          </section>
        )}
      </div>
    </div>
  );
}

function lowerFirst(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

/* ── Teyro vs X ────────────────────────────────────────────────────────── */

function VsBody({ c }: { c: Competitor }) {
  const rows = Object.keys(FACT_LABELS) as (keyof CompetitorFacts)[];
  return (
    <>
      <section className={s.section} aria-labelledby="table">
        <SectionHead id="table" eyebrow="At a glance" title={`Teyro vs ${c.name}, side by side`} />
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Feature</span>
                </th>
                <th scope="col" className={s.us}>
                  Teyro
                </th>
                <th scope="col">{c.name}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((key) => (
                <tr key={key}>
                  <th scope="row">{FACT_LABELS[key]}</th>
                  <td className={s.us}>{TEYRO_FACTS[key]}</td>
                  <td>{c.facts[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={s.note}>
          Competitor prices change often, so we describe the pricing model rather than quote a number. Check{' '}
          {c.name}&apos;s site for today&apos;s price.
        </p>
      </section>

      <section className={s.section} aria-labelledby="strengths">
        <SectionHead id="strengths" eyebrow="Strengths and weaknesses" title={`What ${c.name} does well — and doesn't`} />
        <div className={s.grid2}>
          <ListCard title={`Where ${c.name} wins`} items={c.strengths} />
          <ListCard title={`Where ${c.name} falls short`} items={c.weaknesses} negative />
        </div>
      </section>

      <section className={s.section} aria-labelledby="choose">
        <SectionHead id="choose" eyebrow="The verdict" title="Which one is right for you?" />
        <div className={s.grid2}>
          <ListCard title="Choose Teyro if…" items={c.switchIf} tinted />
          {c.stayIf.length > 0 ? (
            <ListCard title={`Stay with ${c.name} if…`} items={c.stayIf} />
          ) : (
            <div className={s.card}>
              <h3 className={s.cardTitle}>Staying isn&apos;t an option</h3>
              <p className={s.cardText}>{c.summary}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ── Best X alternatives ───────────────────────────────────────────────── */

function AlternativesBody({ c }: { c: Competitor }) {
  return (
    <section className={s.section} aria-labelledby="ranked">
      <div className={s.narrow}>
        <SectionHead
          id="ranked"
          eyebrow="Ranked by fit"
          title={`The best ${c.name} alternatives`}
          lead="Ordered by how well each fits the most common reason people leave — not by who pays us (nobody does)."
        />
        <ol className={s.ranked}>
          {c.alternatives.map((a, i) => {
            const isUs = a.id === 'teyro';
            const hasPage = a.id && !isUs && COMPETITOR_BY_ID.has(a.id);
            return (
              <li key={a.name} className={`${s.rankItem} ${isUs ? s.rankUs : ''}`}>
                <span className={s.rankNum} aria-hidden="true">
                  {i + 1}
                </span>
                <div className={s.rankBody}>
                  <div className={s.rankName}>
                    <h3 className={`${s.display} ${s.h3}`}>
                      <span className="sr-only">{i + 1}. </span>
                      {a.name}
                    </h3>
                    <span className={s.bestFor}>Best for: {a.bestFor}</span>
                  </div>
                  <p className={s.cardText}>{a.why}</p>
                </div>
                {isUs ? (
                  <Link href={START_HREF} className={s.rankAction}>
                    {START_LABEL}
                  </Link>
                ) : hasPage ? (
                  <Link href={`/alternatives/teyro-vs-${a.id}`} className={s.rankAction}>
                    vs Teyro
                  </Link>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>

      <div className={`${s.narrow} ${s.spaced}`}>
        <Callout>
          {c.stayIf.length > 0
            ? `Sometimes staying is right. Stay with ${c.name} if ${c.stayIf.map(lowerFirst).join('; or if ')}.`
            : `${c.summary} ${TEYRO.name} is ${TEYRO.priceShort.toLowerCase()}, so you can try the closest replacement today.`}
        </Callout>
      </div>
    </section>
  );
}
