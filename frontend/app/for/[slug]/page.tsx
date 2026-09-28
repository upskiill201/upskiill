import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { CalendarDays, Clock } from 'lucide-react';
import { getAllUseCaseSlugs, getUseCaseBySlug } from '@/lib/use-cases/posts';
import { PERSONAS, PERSONA_BY_SLUG } from '@/lib/seo/personas';
import type { Persona } from '@/lib/seo/personas';
import { ACCENTS } from '@/lib/seo/mdxPages';
import type { SeoMdxPage } from '@/lib/seo/mdxPages';
import { START_HREF, START_LABEL } from '@/lib/seo/facts';
import { formatDate } from '@/lib/blog/site';
import { articleSchema, breadcrumbSchema, faqSchema, schemas } from '@/lib/seo/schema';
import { relatedCards } from '@/lib/seo/related';
import JsonLd from '@/components/features/blog/JsonLd';
import FaqAccordion from '@/components/features/blog/FaqAccordion';
import CtaBlock from '@/components/features/blog/CtaBlock';
import { AnswerCard, Callout, LinkCards, SectionHead, SeoHeader, SplitRow } from '@/components/seo/Blocks';
import proseStyles from '@/app/blog/prose.module.css';
import s from '@/components/seo/Seo.module.css';

export const revalidate = 3600;
export const dynamicParams = false;

// Persona pages were written and checked on this date (lib/seo/personas.ts).
const PERSONAS_UPDATED = '2026-09-28';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [...getAllUseCaseSlugs(), ...PERSONAS.map((p) => p.slug)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const persona = PERSONA_BY_SLUG.get(slug);
  const page = persona ? null : getUseCaseBySlug(slug);
  const title = persona?.title ?? page?.frontmatter.title;
  const description = persona?.description ?? page?.frontmatter.meta_description;
  if (!title || !description) return {};
  return {
    title,
    description,
    alternates: { canonical: `/for/${slug}` },
    openGraph: { type: 'article', url: `/for/${slug}`, title, description },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function ForDetailPage({ params }: Props) {
  const { slug } = await params;
  const persona = PERSONA_BY_SLUG.get(slug);
  if (persona) return <PersonaPage persona={persona} />;
  const page = getUseCaseBySlug(slug);
  if (!page) notFound();
  return <UseCasePage page={page} />;
}

/* ── Programmatic persona page ─────────────────────────────────────────── */

function PersonaPage({ persona: p }: { persona: Persona }) {
  const path = `/for/${p.slug}`;
  const others = PERSONAS.filter((o) => o.slug !== p.slug)
    .sort((a, b) => Number(b.skill === p.skill) - Number(a.skill === p.skill))
    .map((o) => `/for/${o.slug}`);
  const related = relatedCards(others, path, 3);
  const skillLabel = p.skill === 'AI' ? 'AI' : 'Coding';

  return (
    <div className={s.page}>
      <JsonLd
        data={schemas(
          articleSchema({ path, title: p.title, description: p.description, dateModified: PERSONAS_UPDATED }),
          breadcrumbSchema([
            { name: 'Who it’s for', path: '/for' },
            { name: `For ${p.who}`, path },
          ]),
          faqSchema(p.faq),
        )}
      />

      <SeoHeader
        crumbs={[{ name: 'Who it’s for', path: '/for' }]}
        chip={`${skillLabel} · for ${p.who}`}
        title={p.title}
        dek={p.description}
      />

      <div className={s.container}>
        <AnswerCard answer={p.answer} visual={p.points[0].visual} caption={p.points[0].title} />

        <section className={s.section} aria-labelledby="constraints">
          <SectionHead
            id="constraints"
            eyebrow="The real problem"
            title={`What gets in the way for ${p.who}`}
            lead="Motivation is rarely the issue. These are."
          />
          <div className={s.grid2}>
            {p.constraints.map((c, i) => (
              <div key={c} className={s.card}>
                <span className={s.num}>{i + 1}</span>
                <p className={s.cardStrong}>
                  {c}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className={s.section} aria-labelledby="how">
          <SectionHead id="how" eyebrow="How Teyro fits" title="Built around that" center />
          {p.points.map((point, i) => (
            <SplitRow key={point.title} title={point.title} body={point.body} visual={point.visual} flip={i % 2 === 1} />
          ))}
        </section>

        <section className={s.section} aria-labelledby="week">
          <div className={s.narrow}>
            <SectionHead
              id="week"
              eyebrow="Your first week"
              title="What the first seven days look like"
              lead={`Start with: ${p.startWith}.`}
            />
            <ol className={s.path}>
              {p.week.map((day, i) => (
                <li key={day} className={s.pathStep}>
                  <span className={s.pathNode} aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className={s.pathText}>{day}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className={s.narrow}>
          <section className={s.section} aria-labelledby="honest">
            <SectionHead id="honest" title="The honest bit" />
            <Callout>{p.honest}</Callout>
          </section>

          <FaqAccordion items={p.faq} />
          <CtaBlock
            cta={{
              title: `Start tonight, ${p.who}`,
              text: 'Your first lesson takes a few minutes. Free to start, no ads.',
              href: START_HREF,
              label: START_LABEL,
            }}
          />
        </div>

        {related.length > 0 && (
          <section className={s.section} aria-labelledby="related-heading">
            <SectionHead id="related-heading" title="Teyro for other people" />
            <LinkCards items={related} />
          </section>
        )}
      </div>
    </div>
  );
}

/* ── Hand-written use-case page (content/use-cases) ───────────────────── */

function UseCasePage({ page }: { page: SeoMdxPage }) {
  const fm = page.frontmatter;
  const path = `/for/${page.slug}`;
  const related = relatedCards([...fm.related, ...PERSONAS.map((p) => `/for/${p.slug}`)], path, 3);
  const forCreators = fm.audience === 'creators';

  return (
    <div className={s.page} style={{ '--accent': ACCENTS[fm.accent] } as React.CSSProperties}>
      <JsonLd
        data={schemas(
          articleSchema({ path, title: fm.title, description: fm.meta_description, dateModified: fm.updated }),
          breadcrumbSchema([
            { name: 'Who it’s for', path: '/for' },
            { name: fm.keyword, path },
          ]),
          faqSchema(fm.faq),
        )}
      />

      <SeoHeader
        crumbs={[{ name: 'Who it’s for', path: '/for' }]}
        chip={fm.keyword}
        title={fm.title}
        dek={fm.meta_description}
        meta={
          <>
            <span className={s.metaItem}>
              <CalendarDays size={16} strokeWidth={2.5} aria-hidden="true" />
              Updated <time dateTime={fm.updated}>{formatDate(fm.updated)}</time>
            </span>
            <span className={s.metaItem}>
              <Clock size={16} strokeWidth={2.5} aria-hidden="true" />
              {page.readingMinutes} min read
            </span>
          </>
        }
      />

      <div className={s.container}>
        <AnswerCard answer={fm.answer} visual={fm.visual} caption={fm.caption} />

        <div className={`${proseStyles.prose} ${s.prose}`}>
          <MDXRemote
            source={page.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
          />
        </div>

        <div className={s.narrow}>
          {fm.faq.length > 0 && <FaqAccordion items={fm.faq} />}
          <CtaBlock
            cta={
              forCreators
                ? {
                    title: 'Teach a course people finish',
                    text: 'Build it in Teyro Studio and every learner gets streaks, leagues and a community around it.',
                    href: '/teach',
                    label: 'Teach on Teyro',
                  }
                : {
                    title: 'Your first lesson is waiting',
                    text: 'It takes a few minutes. Free to start, no ads.',
                    href: START_HREF,
                    label: START_LABEL,
                  }
            }
          />
        </div>

        {related.length > 0 && (
          <section className={s.section} aria-labelledby="related-heading">
            <SectionHead id="related-heading" title="Keep exploring" />
            <LinkCards items={related} />
          </section>
        )}
      </div>
    </div>
  );
}
