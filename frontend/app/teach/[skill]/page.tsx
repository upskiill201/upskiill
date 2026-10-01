import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import {
  APPLY_HREF,
  APPLY_LABEL,
  CREATOR_SHARE_PCT,
  SKILL_COPY,
  TEACH_PLACES,
  TEACH_SKILLS,
  teachPath,
} from '@/lib/seo/teach';
import type { TeachPlace, TeachSkill } from '@/lib/seo/teach';
import { breadcrumbSchema, collectionSchema, schemas } from '@/lib/seo/schema';
import JsonLd from '@/components/features/blog/JsonLd';
import CtaBlock from '@/components/features/blog/CtaBlock';
import { SectionHead } from '@/components/seo/Blocks';
import s from '@/components/seo/Seo.module.css';

export const revalidate = 86400;
export const dynamicParams = false;

interface Props {
  params: Promise<{ skill: string }>;
}

export function generateStaticParams() {
  return TEACH_SKILLS.map((skill) => ({ skill }));
}

const REGION_ORDER = ['Americas', 'Europe', 'Africa', 'Middle East', 'Asia', 'Oceania'];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { skill } = await params;
  if (!TEACH_SKILLS.includes(skill as TeachSkill)) return {};
  const copy = SKILL_COPY[skill as TeachSkill];
  return {
    title: `Teach ${copy.noun} online: ${copy.label} creator opportunities by location | Teyro`,
    description: `Teach ${copy.noun} online from your state, city or country. Keep ${CREATOR_SHARE_PCT}% of every monthly payment, paid in USD, with local pay data for every location.`,
    alternates: { canonical: `/teach/${skill}` },
  };
}

function PillLinks({ places, skill }: { places: TeachPlace[]; skill: TeachSkill }) {
  return (
    <div className={s.pillRow}>
      {places.map((p) => (
        <Link key={p.slug} href={teachPath(skill, p)} className={s.pill}>
          {p.name}
        </Link>
      ))}
    </div>
  );
}

export default async function TeachSkillHub({ params }: Props) {
  const { skill: skillParam } = await params;
  if (!TEACH_SKILLS.includes(skillParam as TeachSkill)) notFound();
  const skill = skillParam as TeachSkill;
  const copy = SKILL_COPY[skill];
  const places = TEACH_PLACES.filter((p) => p.skills.includes(skill));
  const states = places.filter((p) => p.kind === 'state').sort((a, b) => a.name.localeCompare(b.name));
  const metros = places.filter((p) => p.kind === 'metro');
  const countries = places.filter((p) => p.kind === 'country');
  const other: TeachSkill = skill === 'coding' ? 'ai' : 'coding';

  return (
    <div className={s.page} style={{ '--accent': skill === 'ai' ? 'var(--brand-purple)' : 'var(--color-brand)' } as React.CSSProperties}>
      <JsonLd
        data={schemas(
          collectionSchema({
            name: `Teach ${copy.noun} online by location`,
            path: `/teach/${skill}`,
            description: `Teyro creator pages for ${places.length} locations.`,
          }),
          breadcrumbSchema([
            { name: 'Teach', path: '/teach' },
            { name: `Teach ${copy.noun}`, path: `/teach/${skill}` },
          ]),
        )}
      />

      <div className={s.hubBand}>
        <header className={s.hubHero}>
          <div className={s.hubCopy}>
            <span className={s.eyebrow}>Teach {copy.label} on Teyro</span>
            <h1 className={`${s.display} ${s.hubTitle}`}>
              Teach {copy.noun} online, <em>from wherever you are.</em>
            </h1>
            <p className={s.lead}>
              Build a {copy.noun} course once, keep {CREATOR_SHARE_PCT}% of every payment and get paid in US dollars. Pick
              your location for local pay data, payout options and what to teach.
            </p>
            <div className={s.pillRow}>
              <a href="#us" className={s.pill}>United States · {states.length + metros.length}</a>
              <a href="#world" className={s.pill}>Worldwide · {countries.length}</a>
              <Link href={`/teach/${other}`} className={s.pill}>
                Teach {SKILL_COPY[other].noun} instead
              </Link>
            </div>
            <Link href={APPLY_HREF} className={s.btn}>
              {APPLY_LABEL}
              <ArrowRight size={18} strokeWidth={3} aria-hidden="true" />
            </Link>
          </div>
          <div className={s.hubArt}>
            <Image src="/User onbarding Assets/tey/tablet.webp" alt="" width={260} height={300} className={s.hubTey} priority />
          </div>
        </header>
      </div>

      <div className={s.container}>
        <section className={s.section} aria-labelledby="us">
          <SectionHead id="us" eyebrow="United States" title="By state" />
          <PillLinks places={states} skill={skill} />
        </section>

        {metros.length > 0 && (
          <section className={s.section} aria-labelledby="metros">
            <SectionHead id="metros" eyebrow="United States" title="By metro area" />
            {states
              .map((st) => ({ st, list: metros.filter((m) => m.stateSlug === st.slug) }))
              .filter((g) => g.list.length > 0)
              .map(({ st, list }) => (
                <div key={st.slug} className={s.group}>
                  <h3 className={`${s.display} ${s.h3} ${s.groupTitle}`}>
                    {st.name}
                  </h3>
                  <PillLinks places={list.sort((a, b) => a.name.localeCompare(b.name))} skill={skill} />
                </div>
              ))}
          </section>
        )}

        <section className={s.section} aria-labelledby="world">
          <SectionHead id="world" eyebrow="Worldwide" title="By country" />
          {REGION_ORDER.map((region) => {
            const list = countries.filter((c) => c.region === region).sort((a, b) => a.name.localeCompare(b.name));
            if (list.length === 0) return null;
            return (
              <div key={region} className={s.group}>
                <h3 className={`${s.display} ${s.h3} ${s.groupTitle}`}>
                  {region}
                </h3>
                <PillLinks places={list} skill={skill} />
              </div>
            );
          })}
        </section>

        <div className={s.narrow}>
          <CtaBlock
            cta={{
              title: `Teach ${copy.noun} on Teyro`,
              text: `Keep ${CREATOR_SHARE_PCT}% of every payment, get paid in USD, and join as a Founding Creator.`,
              href: APPLY_HREF,
              label: APPLY_LABEL,
            }}
          />
        </div>
      </div>
    </div>
  );
}
