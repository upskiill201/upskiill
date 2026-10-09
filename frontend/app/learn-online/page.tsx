import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { LEARN_HUB, LEARN_SUBJECTS, learnPath, learnPlaces, learnTrack, topicCards } from '@/lib/seo/learn';
import type { LearnTrack } from '@/lib/seo/learn';
import { START_HREF, START_LABEL, TEYRO } from '@/lib/seo/facts';
import { breadcrumbSchema, collectionSchema, itemListSchema, schemas } from '@/lib/seo/schema';
import JsonLd from '@/components/features/blog/JsonLd';
import CtaBlock from '@/components/features/blog/CtaBlock';
import { LinkCards, SectionHead } from '@/components/seo/Blocks';
import s from '@/components/seo/Seo.module.css';

export const revalidate = 86400;

const TITLE = 'Learn coding and AI online — by topic or by location | Teyro';
const DESCRIPTION = `Learn coding and AI in ${TEYRO.dailyTime.split(' —')[0]}: web development, mobile apps, AI tools, AI agents and more. Pick a topic or find your city, state or country.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: LEARN_HUB },
  openGraph: { type: 'website', url: LEARN_HUB, title: TITLE, description: DESCRIPTION },
};

const TRACKS: LearnTrack[] = ['coding', 'ai'];
const accent = (track: LearnTrack) => (track === 'ai' ? 'var(--brand-purple)' : 'var(--color-brand)');

export default function LearnHub() {
  return (
    <div className={s.page}>
      <JsonLd
        data={schemas(
          collectionSchema({ name: 'Learn coding and AI', path: LEARN_HUB, description: DESCRIPTION }),
          breadcrumbSchema([{ name: 'Learn', path: LEARN_HUB }]),
          itemListSchema(
            'Topics',
            LEARN_SUBJECTS.map((sub) => ({ name: `Learn ${sub.label}`, url: learnPath(sub) })),
          ),
        )}
      />

      <div className={s.hubBand}>
        <header className={s.hubHero}>
          <div className={s.hubCopy}>
            <span className={s.eyebrow}>Learn on Teyro</span>
            <h1 className={`${s.display} ${s.hubTitle}`}>
              Learn coding and AI, <em>a few minutes a day.</em>
            </h1>
            <p className={s.lead}>
              {TEYRO.oneLiner} Pick what you want to learn, or find your location for local pay data and prices in your
              currency.
            </p>
            <div className={s.pillRow}>
              {TRACKS.map((t) => (
                <Link key={t} href={learnPath(learnTrack(t))} className={s.pill}>
                  Learn {learnTrack(t).label} · {learnPlaces(learnTrack(t)).length} locations
                </Link>
              ))}
            </div>
            <Link href={START_HREF} className={s.btn}>
              {START_LABEL}
              <ArrowRight size={18} strokeWidth={3} aria-hidden="true" />
            </Link>
          </div>
          <div className={s.hubArt}>
            <Image src="/User onbarding Assets/tey/tablet.webp" alt="" width={260} height={300} className={s.hubTey} priority />
          </div>
        </header>
      </div>

      <div className={s.container}>
        {TRACKS.map((t) => {
          const track = learnTrack(t);
          return (
            <section key={t} className={s.section} aria-labelledby={`track-${t}`}>
              <SectionHead
                id={`track-${t}`}
                eyebrow={`${track.label} track`}
                title={`Learn ${track.noun}`}
                lead={track.intro}
              />
              <LinkCards
                items={[
                  {
                    href: learnPath(track),
                    kicker: 'By location',
                    title: `Learn ${track.noun} near you`,
                    text: `${learnPlaces(track).length} US states, metro areas and countries, each with its own numbers.`,
                    accent: accent(t),
                  },
                  ...topicCards(t).map((card) => ({ ...card, accent: accent(t) })),
                ]}
              />
            </section>
          );
        })}

        <div className={s.narrow}>
          <CtaBlock
            cta={{
              title: 'Start learning on Teyro',
              text: `${TEYRO.priceShort}. ${TEYRO.lessonFormat}.`,
              href: START_HREF,
              label: START_LABEL,
            }}
          />
        </div>
      </div>
    </div>
  );
}
