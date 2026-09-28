import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Bot, Code2, Users } from 'lucide-react';
import { getAllUseCasePages } from '@/lib/use-cases/posts';
import { PERSONAS } from '@/lib/seo/personas';
import { ACCENTS } from '@/lib/seo/mdxPages';
import { START_HREF, START_LABEL } from '@/lib/seo/facts';
import { breadcrumbSchema, collectionSchema, itemListSchema, schemas } from '@/lib/seo/schema';
import JsonLd from '@/components/features/blog/JsonLd';
import CtaBlock from '@/components/features/blog/CtaBlock';
import { LinkCards, SectionHead } from '@/components/seo/Blocks';
import s from '@/components/seo/Seo.module.css';

export const revalidate = 3600;

const DESCRIPTION =
  'Who Teyro is for: students, career changers, busy parents, commuters and more — with how daily coding and AI lessons fit each life.';

export const metadata: Metadata = {
  title: 'Who Is Teyro For? Coding and AI Learning That Fits Your Life',
  description: DESCRIPTION,
  alternates: { canonical: '/for' },
};

export default function ForHubPage() {
  const useCases = getAllUseCasePages();
  const coding = PERSONAS.filter((p) => p.skill === 'coding');
  const ai = PERSONAS.filter((p) => p.skill === 'AI');

  const personaCard = (p: (typeof PERSONAS)[number]) => ({
    href: `/for/${p.slug}`,
    kicker: `${p.skill === 'AI' ? 'AI' : 'Coding'} for ${p.who}`,
    title: p.title,
    text: p.description,
    accent: p.skill === 'AI' ? 'var(--brand-purple)' : 'var(--color-brand)',
    art: p.skill === 'AI' ? <Bot size={28} strokeWidth={2.5} /> : <Code2 size={28} strokeWidth={2.5} />,
  });

  return (
    <div className={s.page}>
      <JsonLd
        data={schemas(
          collectionSchema({ name: 'Who Teyro is for', path: '/for', description: DESCRIPTION }),
          breadcrumbSchema([{ name: 'Who it’s for', path: '/for' }]),
          itemListSchema(
            'Teyro use cases',
            [...PERSONAS.map((p) => ({ name: p.title, url: `/for/${p.slug}` })),
              ...useCases.map((u) => ({ name: u.frontmatter.title, url: `/for/${u.slug}` }))],
          ),
        )}
      />

      <div className={s.hubBand}>
        <header className={s.hubHero}>
          <div className={s.hubCopy}>
            <span className={s.eyebrow}>Who it&apos;s for</span>
            <h1 className={`${s.display} ${s.hubTitle}`}>
              Built for people who start, <em>and want to finish.</em>
            </h1>
            <p className={s.lead}>
              Everyone has a different reason they stopped last time. Find yours, and see how a few minutes a day
              of coding or AI fits around it.
            </p>
            <div className={s.pillRow}>
              <a href="#coding" className={s.pill}>Coding · {coding.length}</a>
              <a href="#ai" className={s.pill}>AI · {ai.length}</a>
              {useCases.length > 0 && <a href="#goals" className={s.pill}>By goal · {useCases.length}</a>}
            </div>
            <Link href={START_HREF} className={s.btn}>
              {START_LABEL}
              <ArrowRight size={18} strokeWidth={3} aria-hidden="true" />
            </Link>
          </div>
          <div className={s.hubArt}>
            <Image
              src="/User onbarding Assets/tey/waving.webp"
              alt=""
              width={260}
              height={300}
              className={s.hubTey}
              priority
            />
          </div>
        </header>
      </div>

      <div className={s.container}>
        <section className={s.section} aria-labelledby="coding">
          <SectionHead id="coding" eyebrow="Learn to code" title="A coding app for…" />
          <LinkCards items={coding.map(personaCard)} />
        </section>

        <section className={s.section} aria-labelledby="ai">
          <SectionHead id="ai" eyebrow="Learn AI" title="An AI learning app for…" />
          <LinkCards items={ai.map(personaCard)} />
        </section>

        {useCases.length > 0 && (
          <section className={s.section} aria-labelledby="goals">
            <SectionHead id="goals" eyebrow="By goal" title="What you want out of it" />
            <LinkCards
              columns={2}
              items={useCases.map((u) => ({
                href: `/for/${u.slug}`,
                kicker: u.frontmatter.audience === 'creators' ? 'For creators' : 'For learners',
                title: u.frontmatter.title,
                text: u.frontmatter.meta_description,
                accent: ACCENTS[u.frontmatter.accent],
                art: <Users size={28} strokeWidth={2.5} />,
              }))}
            />
          </section>
        )}

        <div className={s.narrow}>
          <CtaBlock
            cta={{
              title: 'Your first lesson is waiting',
              text: 'It takes a few minutes. Free to start, no ads.',
              href: START_HREF,
              label: START_LABEL,
            }}
          />
        </div>
      </div>
    </div>
  );
}
