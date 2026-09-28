import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Scale, Shuffle } from 'lucide-react';
import { COMPETITORS, altSlug, vsSlug } from '@/lib/seo/competitors';
import type { Competitor } from '@/lib/seo/competitors';
import { START_HREF, START_LABEL, TEYRO_LIMITS } from '@/lib/seo/facts';
import { breadcrumbSchema, collectionSchema, itemListSchema, schemas } from '@/lib/seo/schema';
import JsonLd from '@/components/features/blog/JsonLd';
import CtaBlock from '@/components/features/blog/CtaBlock';
import { LinkCards, ListCard, SectionHead } from '@/components/seo/Blocks';
import s from '@/components/seo/Seo.module.css';

export const revalidate = 3600;

const DESCRIPTION =
  'Honest comparisons of Teyro with Duolingo, Mimo, Sololearn, Codecademy, Udemy, Coursera and more — including when to stay with them.';

export const metadata: Metadata = {
  title: 'Teyro vs Other Learning Apps: Honest Comparisons',
  description: DESCRIPTION,
  alternates: { canonical: '/alternatives' },
};

// Grouped the way people shop: phone coding apps first, then course platforms.
const GROUPS: { title: string; lead: string; ids: string[] }[] = [
  {
    title: 'Coding apps',
    lead: 'Short, phone-first ways to learn to code.',
    ids: ['mimo', 'sololearn', 'grasshopper', 'codecademy', 'freecodecamp'],
  },
  {
    title: 'Gamified learning apps',
    lead: 'Habit-forming apps for everything else.',
    ids: ['duolingo', 'brilliant', 'khan-academy'],
  },
  {
    title: 'Course platforms',
    lead: 'Video courses and certificates.',
    ids: ['udemy', 'coursera', 'linkedin-learning', 'datacamp', 'skillshare'],
  },
];

function cards(ids: string[]) {
  return ids
    .map((id) => COMPETITORS.find((c) => c.id === id))
    .filter((c): c is Competitor => Boolean(c))
    .flatMap((c) => [
      {
        href: `/alternatives/${vsSlug(c)}`,
        kicker: 'Head to head',
        title: `Teyro vs ${c.name}`,
        text: c.summary,
        art: <Scale size={28} strokeWidth={2.5} />,
      },
      {
        href: `/alternatives/${altSlug(c)}`,
        kicker: 'Alternatives',
        title: `Best ${c.name} alternatives`,
        text: `Ranked by what you are leaving ${c.name} for.`,
        accent: 'var(--success-green)',
        art: <Shuffle size={28} strokeWidth={2.5} />,
      },
    ]);
}

export default function AlternativesHubPage() {
  return (
    <div className={s.page}>
      <JsonLd
        data={schemas(
          collectionSchema({ name: 'Teyro comparisons', path: '/alternatives', description: DESCRIPTION }),
          breadcrumbSchema([{ name: 'Compare', path: '/alternatives' }]),
          itemListSchema(
            'Teyro comparisons',
            COMPETITORS.map((c) => ({ name: `Teyro vs ${c.name}`, url: `/alternatives/${vsSlug(c)}` })),
          ),
        )}
      />

      <div className={s.hubBand}>
        <header className={s.hubHero}>
          <div className={s.hubCopy}>
            <span className={s.eyebrow}>Compare</span>
            <h1 className={`${s.display} ${s.hubTitle}`}>
              Honest comparisons, <em>including when to stay.</em>
            </h1>
            <p className={s.lead}>
              Every page puts Teyro next to another app on the same facts, ranks Teyro where it actually belongs, and
              tells you when the other app is the better choice.
            </p>
            <div className={s.pillRow}>
              {GROUPS.map((g) => (
                <a key={g.title} href={`#${g.title.toLowerCase().replace(/\s+/g, '-')}`} className={s.pill}>
                  {g.title}
                </a>
              ))}
            </div>
            <Link href={START_HREF} className={s.btn}>
              {START_LABEL}
              <ArrowRight size={18} strokeWidth={3} aria-hidden="true" />
            </Link>
          </div>
          <div className={s.hubArt}>
            <Image
              src="/User onbarding Assets/tey/thinking.webp"
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
        {GROUPS.map((g) => {
          const id = g.title.toLowerCase().replace(/\s+/g, '-');
          return (
            <section key={g.title} className={s.section} aria-labelledby={id}>
              <SectionHead id={id} title={g.title} lead={g.lead} />
              <LinkCards items={cards(g.ids)} columns={2} />
            </section>
          );
        })}

        <section className={s.section} aria-labelledby="limits">
          <div className={s.narrow}>
            <SectionHead id="limits" eyebrow="In fairness" title="What Teyro doesn't do (yet)" />
            <ListCard title="Teyro’s limits today" items={[...TEYRO_LIMITS]} negative />
          </div>
        </section>

        <div className={s.narrow}>
          <CtaBlock
            cta={{
              title: 'The fastest way to compare is to try it',
              text: 'Your first lesson takes a few minutes. Free to start, no ads.',
              href: START_HREF,
              label: START_LABEL,
            }}
          />
        </div>
      </div>
    </div>
  );
}
