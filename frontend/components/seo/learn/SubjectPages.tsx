import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { LEARN_HUB, firstSentence, getLearnSubject, learnPath, learnPlaces, learnTopics, learnTrack, topicCards } from '@/lib/seo/learn';
import type { LearnSubject } from '@/lib/seo/learn';
import type { TeachPlace } from '@/lib/seo/teach';
import { START_HREF, START_LABEL, TEYRO, TEYRO_LIMITS } from '@/lib/seo/facts';
import { APP_LAUNCHES, LEARNER_GATE } from '@/lib/launch';
import { articleSchema, breadcrumbSchema, collectionSchema, faqSchema, schemas } from '@/lib/seo/schema';
import JsonLd from '@/components/features/blog/JsonLd';
import FaqAccordion from '@/components/features/blog/FaqAccordion';
import CtaBlock from '@/components/features/blog/CtaBlock';
import { AnswerCard, Callout, LinkCards, ListCard, SectionHead, SeoHeader } from '@/components/seo/Blocks';
import s from '@/components/seo/Seo.module.css';

/*
 * Track hubs (/learn-coding, /learn-ai) and topic pages (/learn-ai/claude-code).
 * Server components; the route files under app/learn-* only pick which to render.
 */

const CHECKED = '2026-10-09';
const REGION_ORDER = ['Americas', 'Europe', 'Africa', 'Middle East', 'Asia', 'Oceania'];

/** "Software engineer" → "software engineer", but "AI research" stays as is. */
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text);

export const accentStyle =(sub: LearnSubject) =>
  ({ '--accent': sub.track === 'ai' ? 'var(--brand-purple)' : 'var(--color-brand)' }) as React.CSSProperties;

function titleFor(sub: LearnSubject) {
  if (sub.kind === 'track') return `Learn ${sub.label} Online — by City, State or Country | Teyro`;
  return sub.status === 'path'
    ? `Learn ${sub.label} Online in Minutes a Day | Teyro`
    : `How to Learn ${sub.label}: Where to Start | Teyro`;
}

function descriptionFor(sub: LearnSubject) {
  if (sub.kind === 'track')
    return `Learn ${sub.noun} online wherever you live: local pay data for ${learnPlaces(sub).length} US states, metros and countries, with prices in your currency. ${TEYRO.priceShort}.`;
  return `${firstSentence(sub.intro)} What learning ${sub.noun} covers, where it leads, and how to start with short daily lessons on Teyro.`;
}

export function subjectMetadata(sub: LearnSubject): Metadata {
  const title = titleFor(sub);
  const description = descriptionFor(sub);
  const path = learnPath(sub);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: sub.kind === 'track' ? 'website' : 'article', url: path, title, description },
    twitter: { card: 'summary_large_image', title, description },
  };
}
/* ── Track hub: topics + every place ─────────────────────────────────── */

function PillLinks({ places, sub }: { places: TeachPlace[]; sub: LearnSubject }) {
  return (
    <div className={s.pillRow}>
      {places.map((p) => (
        <Link key={p.slug} href={learnPath(sub, p)} className={s.pill}>
          {p.name}
        </Link>
      ))}
    </div>
  );
}

export function TrackHub({ track }: { track: LearnSubject }) {
  const places = learnPlaces(track);
  const states = places.filter((p) => p.kind === 'state').sort((a, b) => a.name.localeCompare(b.name));
  const metros = places.filter((p) => p.kind === 'metro');
  const countries = places.filter((p) => p.kind === 'country');
  const other = learnTrack(track.track === 'coding' ? 'ai' : 'coding');
  const path = learnPath(track);

  return (
    <div className={s.page} style={accentStyle(track)}>
      <JsonLd
        data={schemas(
          collectionSchema({
            name: `Learn ${track.noun} online by location`,
            path,
            description: `Teyro ${track.noun} pages for ${places.length} locations.`,
          }),
          breadcrumbSchema([
            { name: 'Learn', path: LEARN_HUB },
            { name: `Learn ${track.label}`, path },
          ]),
        )}
      />

      <div className={s.hubBand}>
        <header className={s.hubHero}>
          <div className={s.hubCopy}>
            <span className={s.eyebrow}>Learn {track.label} on Teyro</span>
            <h1 className={`${s.display} ${s.hubTitle}`}>
              Learn {track.noun} online, <em>wherever you live.</em>
            </h1>
            <p className={s.lead}>{track.intro}</p>
            <div className={s.pillRow}>
              <a href="#topics" className={s.pill}>Topics · {learnTopics(track.track).length}</a>
              <a href="#us" className={s.pill}>United States · {states.length + metros.length}</a>
              <a href="#world" className={s.pill}>Worldwide · {countries.length}</a>
              <Link href={learnPath(other)} className={s.pill}>
                Learn {other.noun} instead
              </Link>
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
        <section className={s.section} aria-labelledby="topics">
          <SectionHead id="topics" eyebrow="Topics" title={`What you can learn in ${track.noun}`} />
          <LinkCards items={topicCards(track.track)} />
        </section>

        <section className={s.section} aria-labelledby="us">
          <SectionHead
            id="us"
            eyebrow="United States"
            title="By state"
            lead={`Each page shows what ${track.localData === 'ds' ? 'data scientists' : 'software developers'} earn there, from official BLS data.`}
          />
          <PillLinks places={states} sub={track} />
        </section>

        {metros.length > 0 && (
          <section className={s.section} aria-labelledby="metros">
            <SectionHead id="metros" eyebrow="United States" title="By metro area" />
            {states
              .map((st) => ({ st, list: metros.filter((m) => m.stateSlug === st.slug) }))
              .filter((g) => g.list.length > 0)
              .map(({ st, list }) => (
                <div key={st.slug} className={s.group}>
                  <h3 className={`${s.display} ${s.h3} ${s.groupTitle}`}>{st.name}</h3>
                  <PillLinks places={[...list].sort((a, b) => a.name.localeCompare(b.name))} sub={track} />
                </div>
              ))}
          </section>
        )}

        <section className={s.section} aria-labelledby="world">
          <SectionHead
            id="world"
            eyebrow="Worldwide"
            title="By country"
            lead="Each page shows what an example course costs in your currency."
          />
          {REGION_ORDER.map((region) => {
            const list = countries.filter((c) => c.region === region).sort((a, b) => a.name.localeCompare(b.name));
            if (list.length === 0) return null;
            return (
              <div key={region} className={s.group}>
                <h3 className={`${s.display} ${s.h3} ${s.groupTitle}`}>{region}</h3>
                <PillLinks places={list} sub={track} />
              </div>
            );
          })}
        </section>

        <div className={s.narrow}>
          <CtaBlock
            cta={{
              title: `Learn ${track.noun} on Teyro`,
              text: `${TEYRO.priceShort}. ${TEYRO.dailyTime}.`,
              href: START_HREF,
              label: START_LABEL,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Topic page ──────────────────────────────────────────────────────── */

export function TopicPage({ topic }: { topic: LearnSubject }) {
  const track = learnTrack(topic.track);
  const start = topic.startWith ? getLearnSubject(topic.startWith)! : null;
  const path = learnPath(topic);
  const title = titleFor(topic);
  const description = descriptionFor(topic);
  const launchNote = LEARNER_GATE ? ` The Teyro app launches in ${APP_LAUNCHES}.` : '';

  const answer =
    topic.status === 'path'
      ? `${topic.intro} On Teyro, ${topic.noun} is one of the ${track.noun} paths you pick when you start: lessons take ${TEYRO.dailyTime.split(' —')[0]}, and each one is ${TEYRO.lessonFormat.charAt(0).toLowerCase()}${TEYRO.lessonFormat.slice(1)}.${launchNote}`
      : `${topic.intro} Teyro has no dedicated ${topic.noun} course yet. The closest place to start is the ${start!.label} path in the ${track.noun} track — short daily lessons that build the same foundations.${launchNote}`;

  const faq = [
    {
      question: `Can I learn ${topic.noun} in a few minutes a day?`,
      answer: `Yes, if you are consistent. Short daily practice beats occasional long sessions because you remember more and keep going. Teyro lessons take ${TEYRO.dailyTime.split(' —')[0]}, with a daily streak (${TEYRO.streaks.toLowerCase()}) to keep you at it.`,
    },
    {
      question: `Is there a ${topic.label} course on Teyro?`,
      answer:
        topic.status === 'path'
          ? `${topic.label} is one of the paths you choose when you start Teyro. ${TEYRO_LIMITS[2]}, so the number of courses on each path is still growing.`
          : `Not a dedicated one yet (checked ${CHECKED}). Start with ${start!.label} — it covers the foundations ${topic.noun} builds on.`,
    },
    {
      question: `How much does it cost to learn ${topic.noun} on Teyro?`,
      answer: `${TEYRO.price}.`,
    },
    ...(topic.faq ?? []),
  ];

  const crumbs = [
    { name: 'Learn', path: LEARN_HUB },
    { name: `Learn ${track.label}`, path: learnPath(track) },
  ];
  const siblings = topicCards(topic.track).filter((c) => c.href !== path);

  return (
    <div className={s.page} style={accentStyle(topic)}>
      <JsonLd
        data={schemas(
          articleSchema({ path, title, description, dateModified: CHECKED }),
          breadcrumbSchema([...crumbs, { name: topic.label, path }]),
          faqSchema(faq),
        )}
      />

      <SeoHeader
        crumbs={crumbs}
        chip={`${track.label} · ${topic.status === 'path' ? 'Learning path' : 'Topic guide'}`}
        title={`Learn ${topic.label}`}
        dek={`Where it leads: ${topic.uses.map(lowerFirst).join(', ')}.`}
      />

      <div className={s.container}>
        <AnswerCard answer={answer} visual="lesson" caption="A Teyro lesson: learn, apply, reflect, deepen" />

        {start && (
          <div className={s.narrow}>
            <Callout>
              No dedicated {topic.label} course on Teyro yet.{' '}
              <Link href={learnPath(start)}>Start with {start.label}</Link> — the foundations carry straight over.
            </Callout>
          </div>
        )}

        <section className={s.section} aria-labelledby="covers">
          <SectionHead id="covers" eyebrow="What it covers" title={`What learning ${topic.noun} involves`} />
          <div className={s.grid2}>
            <ListCard title="The skills" items={topic.covers} />
            <ListCard title="Where it leads" items={topic.uses} tinted />
          </div>
        </section>

        <section className={s.section} aria-labelledby="how">
          <SectionHead
            id="how"
            eyebrow="How Teyro teaches"
            title="Four short steps per lesson"
            lead="Every lesson follows the same rhythm, so a few minutes always moves you forward."
          />
          <ol className={s.steps}>
            {[
              ['Learn', 'One idea, explained simply.'],
              ['Apply', 'Use it straight away in a short exercise.'],
              ['Reflect', 'Lock it in with a quick check on what you learned.'],
              ['Deepen', 'Go further with extra resources, if you want to.'],
            ].map(([t, body], i) => (
              <li key={t} className={s.card}>
                <span className={s.num}>{i + 1}</span>
                <h3 className={s.cardTitle}>{t}</h3>
                <p className={s.cardText}>{body}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className={s.narrow}>
          <FaqAccordion items={faq} />
          <CtaBlock
            cta={{
              title: start ? `Start with ${start.label}` : `Learn ${topic.noun} on Teyro`,
              text: `${TEYRO.priceShort}. ${TEYRO.dailyTime}.`,
              href: START_HREF,
              label: START_LABEL,
            }}
          />
        </div>

        <section className={s.section} aria-labelledby="more">
          <SectionHead id="more" title={`More in ${track.noun}`} />
          <LinkCards items={siblings} />
          <p className={s.note}>
            Looking for local data? <Link href={learnPath(track)}>Learn {track.noun} by city, state or country</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
