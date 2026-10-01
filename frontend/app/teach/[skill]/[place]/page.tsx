import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Crown, Database } from 'lucide-react';
import {
  APPLY_HREF,
  APPLY_LABEL,
  CLEARING_DAYS,
  CREATOR_SHARE_PCT,
  EXAMPLE_KEEP_USD,
  EXAMPLE_MONTHLY_USD,
  EXAMPLE_PRICE_USD,
  MIN_PAYOUT_USD,
  SKILL_COPY,
  TEACH_SOURCES,
  bigNum,
  countryStats,
  getTeachPlace,
  money,
  nearby,
  num,
  ordinal,
  pct,
  teachParams,
  teachPath,
  usStats,
  usd,
} from '@/lib/seo/teach';
import type { TeachPlace, TeachSkill } from '@/lib/seo/teach';
import { articleSchema, breadcrumbSchema, faqSchema, schemas } from '@/lib/seo/schema';
import JsonLd from '@/components/features/blog/JsonLd';
import FaqAccordion from '@/components/features/blog/FaqAccordion';
import CtaBlock from '@/components/features/blog/CtaBlock';
import { AnswerCard, Callout, LinkCards, ListCard, SectionHead, SeoHeader } from '@/components/seo/Blocks';
import { APP_LAUNCHES, FOUNDING_SHARE_PCT, STANDARD_SHARE_PCT, STUDIO_OPENS } from '@/lib/launch';
import s from '@/components/seo/Seo.module.css';

export const revalidate = 86400;
export const dynamicParams = false;

interface Props {
  params: Promise<{ skill: string; place: string }>;
}

export function generateStaticParams() {
  return teachParams();
}

function titleFor(skill: TeachSkill, p: TeachPlace) {
  return skill === 'coding'
    ? `Online Coding Teacher Jobs in ${p.name}? Teach on Teyro`
    : `AI Tutor Jobs in ${p.name}? Teach AI Online on Teyro`;
}

function descriptionFor(skill: TeachSkill, p: TeachPlace) {
  const noun = SKILL_COPY[skill].noun;
  return `Teach ${noun} online from ${p.name}: build a course once, keep ${CREATOR_SHARE_PCT}% of every monthly payment, paid in USD. Local data, payouts and Founding Creator status.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { skill, place } = await params;
  const p = getTeachPlace(skill, place);
  if (!p) return {};
  const title = titleFor(skill as TeachSkill, p);
  const description = descriptionFor(skill as TeachSkill, p);
  const path = teachPath(skill as TeachSkill, p);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'article', url: path, title, description },
    twitter: { card: 'summary_large_image', title, description },
  };
}

function payoutRails(p: TeachPlace) {
  const wallets = p.country?.mobileMoney ?? [];
  return wallets.length ? `your bank account or ${wallets.join(' / ')}` : 'your bank account';
}

export default async function TeachPlacePage({ params }: Props) {
  const { skill: skillParam, place } = await params;
  const p = getTeachPlace(skillParam, place);
  if (!p) notFound();

  const skill = skillParam as TeachSkill;
  const copy = SKILL_COPY[skill];
  const path = teachPath(skill, p);
  const title = titleFor(skill, p);
  const description = descriptionFor(skill, p);
  const us = usStats(p, skill);
  const intl = countryStats(p);
  const keep = EXAMPLE_KEEP_USD;
  const rails = payoutRails(p);
  const otherSkill: TeachSkill = skill === 'coding' ? 'ai' : 'coding';
  const example = `an example $${EXAMPLE_PRICE_USD} course (${cents(EXAMPLE_MONTHLY_USD)} a month)`;

  const answer = us
    ? `Looking for ${copy.jobsQuery} in ${p.name}? Teyro works differently: instead of tutoring by the hour, you build a ${copy.noun} course once in Teyro Studio and keep ${CREATOR_SHARE_PCT}% of every payment, every month a learner stays subscribed. ${p.kind === 'metro' ? capitalise(p.inSentence) : p.name} has ${num(us.jobs)} ${copy.occupation} earning a median ${usd(us.median)} a year, so this is income alongside your work — not instead of it.`
    : `Looking for ${copy.jobsQuery} in ${p.name}? On Teyro you build a ${copy.noun} course once and keep ${CREATOR_SHARE_PCT}% of every payment, paid in US dollars to ${rails}. On ${example}, each subscribed learner earns you ${cents(keep)} every month — about ${money(intl!.keepLocal, intl!.currency)} at today’s rate. No hourly schedule to keep.`;

  const faq = [
    {
      question: `Is this an online ${copy.noun} teaching job in ${p.name}?`,
      answer: `Not a salaried job. Teyro is a course platform: you create a ${copy.noun} course, learners take two lessons free and then subscribe, and you keep ${CREATOR_SHARE_PCT}% of every payment. You choose your hours, work from ${p.name}, and keep your current job if you have one.`,
    },
    {
      question: `How much can I earn teaching ${copy.noun} online from ${p.name}?`,
      answer: `It depends on your price and how many learners stay subscribed — there is no fixed rate. As an example, on ${example} you keep ${cents(keep)} per learner per month${intl ? ` (about ${money(intl.keepLocal, intl.currency)})` : ''}, so 100 subscribed learners would be about ${usd(keep * 100)} a month. Free courses are allowed too, and help you build an audience.`,
    },
    {
      question: `How do Teyro creators in ${p.name} get paid?`,
      answer: `Earnings are recorded in US dollars. Each payment clears after ${CLEARING_DAYS} days, and once your available balance reaches ${usd(MIN_PAYOUT_USD)} you can request a payout to ${rails}.`,
    },
    {
      question: 'Do I need a big following to teach on Teyro?',
      answer:
        'No. Teyro brings learners to courses through its app, streaks and leagues. If you do have a following, share a coupon link so your audience can join your course and its community.',
    },
  ];

  const near = nearby(p, skill).map((q) => ({
    href: teachPath(skill, q),
    kicker: q.kind === 'metro' ? 'Metro area' : q.kind === 'state' ? 'State' : q.region,
    title: `Teach ${copy.noun} from ${q.name}`,
    text: q.us
      ? `${num(skill === 'coding' ? q.us.devJobs! : q.us.dsJobs!)} ${copy.occupation}, median ${usd(skill === 'coding' ? q.us.devMedian! : q.us.dsMedian!)}.`
      : `${bigNum(q.country!.population!)} people · earnings paid in USD.`,
  }));

  const crumbs = [
    { name: 'Teach', path: '/teach' },
    { name: `Teach ${copy.noun}`, path: `/teach/${skill}` },
    ...(us?.state ? [{ name: us.state.name, path: teachPath(skill, us.state) }] : []),
  ];

  return (
    <div className={s.page} style={{ '--accent': skill === 'ai' ? 'var(--brand-purple)' : 'var(--color-brand)' } as React.CSSProperties}>
      <JsonLd
        data={schemas(
          articleSchema({ path, title, description, dateModified: TEACH_SOURCES.generatedAt }),
          breadcrumbSchema([...crumbs, { name: p.name, path }]),
          faqSchema(faq),
        )}
      />

      <SeoHeader
        crumbs={crumbs}
        chip={`Teach ${copy.label} · ${p.name}`}
        title={`Teach ${copy.noun} online from ${p.name}`}
        dek={`Build a ${copy.noun} course once, keep ${CREATOR_SHARE_PCT}% of every payment for as long as learners stay subscribed, and get paid in US dollars — from anywhere in ${p.inSentence}.`}
      />

      <div className={s.container}>
        <AnswerCard
          answer={answer}
          why={`Early creators become Founding Creators: keep ${FOUNDING_SHARE_PCT}% of every payment (standard is ${STANDARD_SHARE_PCT}%), with a Founding badge and founding benefits in Teyro Studio.`}
          visualNode={<EarningsCard place={p} keep={keep} rails={rails} />}
          caption="A worked example, not a promise of earnings"
          cta={{ href: APPLY_HREF, label: APPLY_LABEL }}
          fineprint={`Free to join · Founding Creators keep ${FOUNDING_SHARE_PCT}% · Paid in USD`}
        />

        {/* ── The local data that makes this page this place's page ── */}
        <section className={s.section} aria-labelledby="numbers">
          <SectionHead
            id="numbers"
            eyebrow="By the numbers"
            title={us ? `${copy.label} in ${p.name}` : `Teaching online from ${p.name}`}
            lead={
              us
                ? `Who you would be teaching alongside — and what the skill is worth locally.`
                : `What your course earnings look like from ${p.inSentence}.`
            }
          />
          {us ? (
            <>
              <div className={s.stats}>
                <Stat value={num(us.jobs)} label={`${capitalise(copy.occupation)} employed`} />
                <Stat value={usd(us.median)} label="Median yearly pay" />
                <Stat value={`$${us.hourly}/hr`} label="Median hourly equivalent" />
                <Stat
                  value={ordinal(us.pay.rank)}
                  label={`Highest pay of ${us.pay.of} ${p.kind === 'state' ? 'states' : 'metro areas'} we cover`}
                />
              </div>
              <p className={`${s.lead} ${s.leadGap}`}>
                {p.kind === 'metro' && us.state && us.vsState != null
                  ? `Median pay for ${copy.occupation} in ${p.inSentence} is ${Math.abs(us.vsState)}% ${us.vsState >= 0 ? 'above' : 'below'} the ${us.state.name} median. `
                  : ''}
                {`By headcount, ${p.name} ranks ${ordinal(us.size.rank)} of ${us.size.of}. `}
                {us.jobs >= 1500
                  ? `That is a lot of people who already know ${copy.noun} well enough to teach it — and every one of them started as a beginner who needed a good course.`
                  : `It is a smaller market, and that is fine: Teyro is online, so a course you build from ${p.name} reaches learners everywhere, not just nearby.`}
              </p>
              <p className={s.source}>
                <Database size={12} aria-hidden="true" /> Source: {TEACH_SOURCES.bls} ({copy.occupation}, SOC{' '}
                {skill === 'coding' ? '15-1252' : '15-2051'}). Ranks compare the places on this site.
              </p>
            </>
          ) : (
            <>
              <div className={s.stats}>
                <Stat
                  value={money(intl!.keepLocal, intl!.currency)}
                  label={`Your ${cents(keep)} a month from one learner on an example $${EXAMPLE_PRICE_USD} course`}
                />
                <Stat value={bigNum(intl!.population)} label="People" />
                {intl!.internetPct != null && <Stat value={pct(intl!.internetPct)} label="Use the internet" />}
                {intl!.gdpMonthly != null && <Stat value={usd(intl!.gdpMonthly)} label="GDP per person, per month" />}
              </div>
              <p className={s.source}>
                <Database size={12} aria-hidden="true" /> Sources: {TEACH_SOURCES.worldBank} ({intl!.year}); exchange
                rate {TEACH_SOURCES.fx}. Earnings are paid in USD; the local figure moves with the exchange rate.
              </p>
            </>
          )}
        </section>

        <section className={s.section} aria-labelledby="vs-tutoring">
          <SectionHead
            id="vs-tutoring"
            eyebrow="Tutoring vs a course"
            title={`Why a course beats ${copy.jobsQuery}`}
            lead="Hourly tutoring pays once per hour you work. A course keeps earning from lessons you already made."
          />
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Aspect</span>
                  </th>
                  <th scope="col">Hourly online tutoring</th>
                  <th scope="col" className={s.us}>
                    A Teyro course
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Income', 'One payment per hour taught', `${CREATOR_SHARE_PCT}% of every monthly payment, from lessons you made once`],
                  ['Schedule', 'Booked sessions across time zones', 'None — learners take lessons any time'],
                  ['Learners', 'One at a time', 'As many as enrol'],
                  ['Motivation', 'Up to you and the student', 'Streaks, leagues and quests keep learners going'],
                  ['Community', 'None', 'A course community with you as admin'],
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

        <section className={s.section} aria-labelledby="what">
          <SectionHead id="what" eyebrow="Ideas" title={`What you could teach from ${p.name}`} />
          <div className={s.grid2}>
            <ListCard title={`${copy.label} courses learners want`} items={copy.teach} />
            <ListCard
              title="You're a good fit if you are…"
              items={[
                `A working ${skill === 'coding' ? 'developer or engineer' : 'AI, data or automation practitioner'}`,
                'A YouTuber or creator with tutorials people already watch',
                'A teacher, lecturer or bootcamp instructor',
                'A mentor who explains things well one-to-one',
              ]}
              tinted
            />
          </div>
        </section>

        <section className={s.section} aria-labelledby="how">
          <SectionHead id="how" eyebrow="How it works" title="From idea to paid, in four steps" />
          <ol className={s.steps}>
            {[
              ['Apply', 'Tell us what you teach and who you are. It takes a few minutes.'],
              ['Build', 'Create lessons in Teyro Studio — bring your videos, notes or an existing course.'],
              ['Publish', 'Free, or one price that becomes monthly and yearly plans. Learners try two lessons free.'],
              ['Get paid', `Payments clear in ${CLEARING_DAYS} days; withdraw from ${usd(MIN_PAYOUT_USD)} to ${rails}.`],
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
          <section className={s.section} aria-labelledby="founding">
            <SectionHead id="founding" eyebrow="Founding creators" title="Get in early" />
            <Callout>
              Teyro Studio opens in {STUDIO_OPENS} and the learner app launches in {APP_LAUNCHES}. Early creators become
              Founding Creators: they keep {FOUNDING_SHARE_PCT}% of every payment instead of {STANDARD_SHARE_PCT}%, and get a
              Founding badge and founding benefits in Studio. If you already have a following, your audience can follow
              you straight into your course and its community.
            </Callout>
          </section>

          <FaqAccordion items={faq} />
          <CtaBlock
            cta={{
              title: `Teach ${copy.noun} from ${p.name}`,
              text: `Keep ${CREATOR_SHARE_PCT}% of every payment, get paid in USD, and join as a Founding Creator.`,
              href: APPLY_HREF,
              label: APPLY_LABEL,
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
            Teach the other track too:{' '}
            {getTeachPlace(otherSkill, p.slug) ? (
              <Link href={teachPath(otherSkill, p)}>
                teach {SKILL_COPY[otherSkill].noun} from {p.name}
              </Link>
            ) : (
              <Link href={`/teach/${otherSkill}`}>teach {SKILL_COPY[otherSkill].noun} online</Link>
            )}
            .
          </p>
        </section>
      </div>
    </div>
  );
}

const cents = (n: number) => `$${n.toFixed(2)}`;

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

function EarningsCard({ place, keep, rails }: { place: TeachPlace; keep: number; rails: string }) {
  const intl = countryStats(place);
  return (
    <div className={s.earn} aria-label="Example earnings">
      <div className={s.earnHead}>
        <span>Example learner</span>
        <span className={s.earnBadge}>
          <Crown size={12} strokeWidth={2.75} aria-hidden="true" /> Founding
        </span>
      </div>
      <span className={s.earnBig}>{cents(keep)}</span>
      <span className={s.earnSub}>you keep every month they stay subscribed</span>
      <ul className={s.earnRows}>
        <li>
          <span>Course price</span>
          <span>
            ${EXAMPLE_PRICE_USD} → {cents(EXAMPLE_MONTHLY_USD)}/mo
          </span>
        </li>
        <li>
          <span>Your share</span>
          <span>{CREATOR_SHARE_PCT}%</span>
        </li>
        {intl && intl.currency !== 'USD' && (
          <li>
            <span>In {intl.currency}</span>
            <span>≈ {money(intl.keepLocal, intl.currency)}</span>
          </li>
        )}
        <li>
          <span>Paid to</span>
          <span>{rails.replace('your ', '').replace(/^./, (c) => c.toUpperCase())}</span>
        </li>
        <li>
          <span>Clears in</span>
          <span>{CLEARING_DAYS} days</span>
        </li>
      </ul>
    </div>
  );
}
