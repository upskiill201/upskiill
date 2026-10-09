import type { Metadata } from 'next';
import Link from 'next/link';
import { Database, MapPin } from 'lucide-react';
import {
  EXAMPLE_YEARLY_USD,
  EXAMPLE_MONTHLY_PLAN_USD,
  OCCUPATION,
  LEARN_HUB,
  getLearnPlace,
  learnNearby,
  learnPath,
  learnTrack,
  learnerPrice,
  teachPath,
  topicCards,
} from '@/lib/seo/learn';
import type { LearnSubject } from '@/lib/seo/learn';
import { TEACH_SOURCES, bigNum, getTeachPlace, money, num, ordinal, pct, usStats, usd } from '@/lib/seo/teach';
import type { TeachPlace } from '@/lib/seo/teach';
import { START_HREF, START_LABEL, TEYRO } from '@/lib/seo/facts';
import { APP_LAUNCHES, LEARNER_GATE } from '@/lib/launch';
import { articleSchema, breadcrumbSchema, faqSchema, schemas } from '@/lib/seo/schema';
import JsonLd from '@/components/features/blog/JsonLd';
import FaqAccordion from '@/components/features/blog/FaqAccordion';
import CtaBlock from '@/components/features/blog/CtaBlock';
import { AnswerCard, LinkCards, SectionHead, SeoHeader } from '@/components/seo/Blocks';
import s from '@/components/seo/Seo.module.css';

/*
 * One track in one place: /learn-coding/austin-tx, /learn-ai/nigeria. The
 * numbers are the page — BLS pay for US places, the example course price in
 * local money for countries — so no two pages read the same.
 */

const DAILY = TEYRO.dailyTime.split(' —')[0]; // "5 to 20 minutes a day"

function titleFor(sub: LearnSubject, p: TeachPlace) {
  return sub.track === 'coding'
    ? `Learn Coding in ${p.name}: Online Coding Classes for Beginners | Teyro`
    : `Learn AI in ${p.name}: Online AI Courses for Beginners | Teyro`;
}

function descriptionFor(sub: LearnSubject, p: TeachPlace) {
  const local = p.us
    ? `${capitalise(OCCUPATION[sub.localData!].name)} there earn a median ${usd(usStats(p, sub.track)!.median)} a year.`
    : `Prices shown in ${p.country!.currency}.`;
  return `Learn ${sub.noun} online from ${p.name} in ${DAILY}. ${local} ${TEYRO.priceShort}, on your phone or in the browser.`;
}

export function placeMetadata(sub: LearnSubject, p: TeachPlace): Metadata {
  const title = titleFor(sub, p);
  const description = descriptionFor(sub, p);
  const path = learnPath(sub, p);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'article', url: path, title, description },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export function PlacePage({ sub, place: p }: { sub: LearnSubject; place: TeachPlace }) {
  const occupation = OCCUPATION[sub.localData!];
  const path = learnPath(sub, p);
  const title = titleFor(sub, p);
  const description = descriptionFor(sub, p);
  const us = usStats(p, sub.track);
  const price = learnerPrice(p);
  const where = p.kind === 'metro' ? p.inSentence : p.name;
  const launchNote = LEARNER_GATE ? ` The app launches in ${APP_LAUNCHES}.` : '';

  const answer = us
    ? `Want to learn ${sub.noun} in ${p.name}? ${capitalise(where)} employs ${num(us.jobs)} ${occupation.name} at a median ${usd(us.median)} a year — ${ordinal(us.pay.rank)} for pay of the ${us.pay.of} ${p.kind === 'state' ? 'states' : 'metro areas'} we cover. Teyro teaches ${sub.noun} from zero in ${DAILY}, on your phone or in the browser, with streaks and leagues that keep you going.${launchNote}`
    : `Want to learn ${sub.noun} in ${p.name}? Teyro is online, so you can learn from anywhere in ${p.inSentence} in ${DAILY}. Many courses are free; an example paid course costs ${money(price!.perMonthLocal, price!.currency)} a month on the yearly plan at today’s rate. It runs in the browser and installs to your Home Screen — no app store needed.${launchNote}`;

  const faq = [
    {
      question: `Can I learn ${sub.noun} online from ${p.name}?`,
      answer: `Yes. Teyro is fully online: lessons take ${DAILY} and work on a phone or computer, so you can learn from anywhere in ${p.inSentence}. ${TEYRO.platforms}.`,
    },
    us
      ? {
          question: `Is ${sub.noun} worth learning in ${p.name}?`,
          answer: `Locally, the numbers are strong: ${num(us.jobs)} ${occupation.name} work in ${where}, earning a median ${usd(us.median)} a year (about $${us.hourly} an hour), per ${TEACH_SOURCES.bls}. A course does not guarantee a job, but it is a skill employers here already pay for.`,
        }
      : {
          question: `How much does it cost to learn ${sub.noun} in ${p.name}?`,
          answer: `${TEYRO.price}. As an example, a paid course priced at ${usd(EXAMPLE_YEARLY_USD)} a year is about ${money(price!.yearlyLocal, price!.currency)} a year, or ${money(price!.monthlyPlanLocal, price!.currency)} paid month to month, at the ${TEACH_SOURCES.fx} rate.`,
        },
    {
      question: `Do I need experience to learn ${sub.noun}?`,
      answer: `No. Lessons start from the basics and each one has four short steps: ${TEYRO.lessonFormat.charAt(0).toLowerCase()}${TEYRO.lessonFormat.slice(1)}.`,
    },
    {
      question: 'Is Teyro free?',
      answer: `${TEYRO.price}. ${TEYRO.ads}.`,
    },
  ];

  const near = learnNearby(sub, p).map((q) => {
    const qs = usStats(q, sub.track);
    const qp = learnerPrice(q);
    return {
      href: learnPath(sub, q),
      kicker: q.kind === 'metro' ? 'Metro area' : q.kind === 'state' ? 'State' : q.region,
      title: `Learn ${sub.noun} in ${q.name}`,
      text: qs
        ? `${num(qs.jobs)} ${occupation.name}, median ${usd(qs.median)}.`
        : qp
          ? `Example course: ${money(qp.perMonthLocal, qp.currency)} a month.`
          : `${bigNum(q.country!.population!)} people.`,
    };
  });

  const other = learnTrack(sub.track === 'coding' ? 'ai' : 'coding');
  const otherHere = getLearnPlace(other, p.slug);
  const crumbs = [
    { name: 'Learn', path: LEARN_HUB },
    { name: `Learn ${sub.label}`, path: learnPath(sub) },
    ...(us?.state ? [{ name: us.state.name, path: learnPath(sub, us.state) }] : []),
  ];

  return (
    <div className={s.page} style={{ '--accent': sub.track === 'ai' ? 'var(--brand-purple)' : 'var(--color-brand)' } as React.CSSProperties}>
      <JsonLd
        data={schemas(
          articleSchema({ path, title, description, dateModified: TEACH_SOURCES.generatedAt }),
          breadcrumbSchema([...crumbs, { name: p.name, path }]),
          faqSchema(faq),
        )}
      />

      <SeoHeader
        crumbs={crumbs}
        chip={`Learn ${sub.label} · ${p.name}`}
        title={`Learn ${sub.noun} in ${p.name}`}
        dek={`Short daily ${sub.noun} lessons you can take anywhere in ${p.inSentence} — ${TEYRO.priceShort.toLowerCase()}, with streaks, leagues and friends to keep you going.`}
      />

      <div className={s.container}>
        <AnswerCard
          answer={answer}
          visualNode={<LocalCard sub={sub} place={p} />}
          caption={us ? 'Local pay data, not a promise of a job' : 'A worked example at today’s exchange rate'}
        />

        {/* ── The local data that makes this page this place's page ── */}
        <section className={s.section} aria-labelledby="numbers">
          <SectionHead
            id="numbers"
            eyebrow="By the numbers"
            title={us ? `What ${sub.noun} skills are worth in ${p.name}` : `Learning ${sub.noun} from ${p.name}`}
            lead={us ? `The job market a ${sub.noun} learner is stepping into.` : `What it costs, in ${p.country!.currency}.`}
          />
          {us ? (
            <>
              <div className={s.stats}>
                <Stat value={usd(us.median)} label={`Median yearly pay, ${occupation.name}`} />
                <Stat value={num(us.jobs)} label={`${capitalise(occupation.name)} employed`} />
                <Stat value={`$${us.hourly}/hr`} label="Hourly equivalent" />
                <Stat
                  value={ordinal(us.size.rank)}
                  label={`Most ${occupation.name} of ${us.size.of} ${p.kind === 'state' ? 'states' : 'metro areas'}`}
                />
              </div>
              <p className={`${s.lead} ${s.leadGap}`}>
                {p.kind === 'metro' && us.state && us.vsState != null
                  ? `Pay here is ${Math.abs(us.vsState)}% ${us.vsState >= 0 ? 'above' : 'below'} the ${us.state.name} median. `
                  : ''}
                {us.pay.rank <= Math.ceil(us.pay.of / 10)
                  ? `That puts ${p.name} in the top tenth for ${occupation.name}’ pay — one of the best-paid places in the country for this skill. `
                  : us.pay.rank > us.pay.of / 2
                    ? `Pay is below the middle of the places we cover, which is one reason many people here learn ${sub.noun} for remote work, freelancing or their own projects. `
                    : `Pay sits in the upper half of the places we cover. `}
                {us.jobs >= 1500
                  ? `With ${num(us.jobs)} people already doing this work locally, there are meetups, colleagues and employers who know the skill.`
                  : `It is a smaller local market, so remote roles and freelance work matter more — and you can learn online from anywhere.`}
              </p>
              <p className={s.source}>
                <Database size={12} aria-hidden="true" /> Source: {TEACH_SOURCES.bls} ({occupation.name}, SOC {occupation.soc}).
                Ranks compare the places on this site.
              </p>
            </>
          ) : (
            <>
              <div className={s.stats}>
                <Stat
                  value={money(price!.perMonthLocal, price!.currency)}
                  label={`A month for an example ${usd(EXAMPLE_YEARLY_USD)}/year course`}
                />
                <Stat value={money(price!.yearlyLocal, price!.currency)} label="The same course, per year" />
                {p.country!.internetPct != null && <Stat value={pct(p.country!.internetPct)} label="Of people use the internet" />}
                <Stat value={bigNum(p.country!.population!)} label="People" />
              </div>
              <p className={`${s.lead} ${s.leadGap}`}>
                {price!.shareOfGdpMonth != null
                  ? price!.shareOfGdpMonth < 2
                    ? `That monthly cost is about ${price!.shareOfGdpMonth.toFixed(1)}% of a month’s GDP per person in ${p.inSentence}. `
                    : `That monthly cost is about ${Math.round(price!.shareOfGdpMonth)}% of a month’s GDP per person in ${p.inSentence}, so free courses and the two free lessons on every paid course matter here. `
                  : ''}
                {p.country!.internetPct != null && p.country!.internetPct < 60
                  ? `Only ${pct(p.country!.internetPct)} of people are online, often on mobile data — Teyro opens instantly and keeps working offline once installed.`
                  : `Lessons are short enough for a commute or a break, and keep working offline once Teyro is installed.`}
              </p>
              <p className={s.source}>
                <Database size={12} aria-hidden="true" /> Sources: {TEACH_SOURCES.worldBank}
                {p.country!.wbYear ? ` (${p.country!.wbYear})` : ''}; exchange rate {TEACH_SOURCES.fx}. Example price only —
                creators set their own, and many courses are free.
              </p>
            </>
          )}
        </section>

        <section className={s.section} aria-labelledby="topics">
          <SectionHead
            id="topics"
            eyebrow="Pick a path"
            title={`What you can learn in ${sub.noun}`}
            lead={`Every topic works the same from ${p.name} as anywhere else — these guides cover what each involves.`}
          />
          <LinkCards items={topicCards(sub.track)} />
        </section>

        <section className={s.section} aria-labelledby="vs-class">
          <SectionHead
            id="vs-class"
            eyebrow="Classes vs Teyro"
            title={`Local ${sub.noun} classes or learning online?`}
            lead={`A class near you gives you a room and a teacher. Teyro gives you a few minutes a day that fit around everything else.`}
          />
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Aspect</span>
                  </th>
                  <th scope="col">A local class or bootcamp</th>
                  <th scope="col" className={s.us}>
                    Teyro
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['When', 'Set class times', `Any time — ${DAILY}`],
                  ['Where', `A venue in ${p.kind === 'country' ? p.inSentence : p.name}, or a live call`, TEYRO.platformsShort],
                  ['Cost', 'Usually paid up front', TEYRO.priceShort],
                  ['Practice', 'Homework between sessions', 'An Apply step in every lesson'],
                  ['Keeping going', 'Up to you', TEYRO.streaks],
                  ['Company', 'Your classmates', TEYRO.leagues],
                ].map(([k, a, b]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td>{a}</td>
                    <td className={s.us}>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className={s.narrow}>
          <FaqAccordion items={faq} />
          <CtaBlock
            cta={{
              title: `Learn ${sub.noun} from ${p.name}`,
              text: `${TEYRO.priceShort}. ${TEYRO.dailyTime}.`,
              href: START_HREF,
              label: START_LABEL,
            }}
          />
        </div>

        <section className={s.section} aria-labelledby="nearby">
          <SectionHead
            id="nearby"
            title={p.kind === 'state' ? `Metro areas in ${p.name}` : p.kind === 'metro' ? 'Nearby' : `More in ${p.region}`}
          />
          <LinkCards items={near} />
          <p className={s.note}>
            {otherHere ? (
              <Link href={learnPath(other, p)}>
                Learn {other.noun} in {p.name}
              </Link>
            ) : (
              <Link href={learnPath(other)}>Learn {other.noun} online</Link>
            )}
            {getTeachPlace(sub.track, p.slug) && (
              <>
                {' · '}Already know {sub.noun}?{' '}
                <Link href={teachPath(sub.track, p)}>
                  Teach {sub.noun} from {p.name}
                </Link>
              </>
            )}
            .
          </p>
        </section>
      </div>
    </div>
  );
}

function capitalise(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className={s.stat}>
      <span className={s.statValue}>{value}</span>
      <span className={s.statLabel}>{label}</span>
    </div>
  );
}

function LocalCard({ sub, place }: { sub: LearnSubject; place: TeachPlace }) {
  const us = usStats(place, sub.track);
  const price = learnerPrice(place);
  const occupation = OCCUPATION[sub.localData!];

  return (
    <div className={s.earn} aria-label={us ? 'Local pay' : 'Example course price'}>
      <div className={s.earnHead}>
        <span>{us ? capitalise(occupation.name) : 'Example course'}</span>
        <span className={s.earnBadge}>
          <MapPin size={12} strokeWidth={2.75} aria-hidden="true" /> {place.kind === 'metro' ? place.name.split(',')[0] : place.name}
        </span>
      </div>
      {us ? (
        <>
          <span className={s.earnBig}>{usd(us.median)}</span>
          <span className={s.earnSub}>median yearly pay here</span>
          <ul className={s.earnRows}>
            <li>
              <span>Employed</span>
              <span>{num(us.jobs)}</span>
            </li>
            <li>
              <span>Hourly</span>
              <span>${us.hourly}/hr</span>
            </li>
            <li>
              <span>Pay rank</span>
              <span>
                {ordinal(us.pay.rank)} of {us.pay.of}
              </span>
            </li>
            {us.state && us.vsState != null && (
              <li>
                <span>vs {us.state.name}</span>
                <span>
                  {us.vsState >= 0 ? '+' : '−'}
                  {Math.abs(us.vsState)}%
                </span>
              </li>
            )}
            <li>
              <span>Teyro lessons</span>
              <span>{DAILY}</span>
            </li>
          </ul>
        </>
      ) : (
        <>
          <span className={s.earnBig}>{money(price!.perMonthLocal, price!.currency)}</span>
          <span className={s.earnSub}>a month, on the yearly plan</span>
          <ul className={s.earnRows}>
            <li>
              <span>Yearly</span>
              <span>{money(price!.yearlyLocal, price!.currency)}</span>
            </li>
            <li>
              <span>Month to month</span>
              <span>{money(price!.monthlyPlanLocal, price!.currency)}</span>
            </li>
            <li>
              <span>In USD</span>
              <span>
                {usd(EXAMPLE_YEARLY_USD)}/yr · ${EXAMPLE_MONTHLY_PLAN_USD.toFixed(2)}/mo
              </span>
            </li>
            <li>
              <span>Free lessons</span>
              <span>First 2 on every paid course</span>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
