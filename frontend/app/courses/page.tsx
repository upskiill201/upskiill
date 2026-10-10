import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fetchPublicCourses, coursePath } from '@/lib/courses/public';
import { START_HREF, START_LABEL, TEYRO } from '@/lib/seo/facts';
import { breadcrumbSchema, collectionSchema, itemListSchema, schemas } from '@/lib/seo/schema';
import JsonLd from '@/components/features/blog/JsonLd';
import CtaBlock from '@/components/features/blog/CtaBlock';
import { SectionHead } from '@/components/seo/Blocks';
import PublicCourseGrid from '@/components/courses/PublicCourseGrid';
import s from '@/components/seo/Seo.module.css';

/**
 * /courses — every published Coding and AI course, public. Each card links to
 * the course's own page (/courses/<slug>), where anyone can see the whole
 * path and start learning.
 */

export const revalidate = 300;

const TITLE = 'Online Coding and AI Courses for Beginners | Teyro';
const DESCRIPTION = `Browse Teyro's coding and AI courses: short daily lessons, streaks and leagues. ${TEYRO.priceShort}; paid courses let you try the first two lessons free.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/courses' },
  openGraph: { type: 'website', url: '/courses', title: TITLE, description: DESCRIPTION },
};

const TRACKS = [
  { id: 'coding', label: 'Coding', noun: 'coding', lead: 'Web, mobile, programming fundamentals and real software.', learn: '/learn-coding' },
  { id: 'ai', label: 'AI', noun: 'AI', lead: 'AI tools, AI agents and automations you can use at work.', learn: '/learn-ai' },
] as const;

export default async function CoursesCatalog() {
  const courses = await fetchPublicCourses();

  return (
    <div className={s.page}>
      <JsonLd
        data={schemas(
          collectionSchema({ name: 'Teyro courses', path: '/courses', description: DESCRIPTION }),
          breadcrumbSchema([{ name: 'Courses', path: '/courses' }]),
          courses.length
            ? itemListSchema(
                'Courses',
                courses.map((c) => ({ name: c.title, url: coursePath(c.slug) })),
              )
            : null,
        )}
      />

      <div className={s.hubBand}>
        <header className={s.hubHero}>
          <div className={s.hubCopy}>
            <span className={s.eyebrow}>Teyro courses</span>
            <h1 className={`${s.display} ${s.hubTitle}`}>
              Coding and AI courses, <em>a few minutes a day.</em>
            </h1>
            <p className={s.lead}>
              Pick a course and start straight away — no setup, no long videos. {TEYRO.lessonFormat}.
            </p>
            <div className={s.pillRow}>
              {TRACKS.map((t) => {
                const n = courses.filter((c) => c.track === t.id).length;
                return (
                  <a key={t.id} href={`#${t.id}`} className={s.pill}>
                    {t.label}
                    {n > 0 ? ` · ${n}` : ''}
                  </a>
                );
              })}
            </div>
          </div>
          <div className={s.hubArt}>
            <Image src="/User onbarding Assets/tey/tablet.webp" alt="" width={260} height={300} className={s.hubTey} priority />
          </div>
        </header>
      </div>

      <div className={s.container}>
        {TRACKS.map((t) => {
          const list = courses.filter((c) => c.track === t.id);
          return (
            <section key={t.id} className={s.section} aria-labelledby={t.id}>
              <SectionHead id={t.id} eyebrow={`${t.label} track`} title={`${t.label} courses`} lead={t.lead} />
              {list.length > 0 ? (
                <PublicCourseGrid courses={list} priorityCount={t.id === 'coding' ? 3 : 0} />
              ) : (
                <p className={s.note}>
                  New {t.noun} courses are on the way.{' '}
                  <Link href={t.learn}>See what you can learn in {t.noun}</Link>.
                </p>
              )}
            </section>
          );
        })}

        <div className={s.narrow}>
          <CtaBlock
            cta={{
              title: 'Not sure where to start?',
              text: `Tell Teyro what you want to learn and it picks your first lesson. ${TEYRO.priceShort}.`,
              href: START_HREF,
              label: START_LABEL,
            }}
          />
          <p className={s.note}>
            Know your subject?{' '}
            <Link href="/teach">
              Teach a course on Teyro <ArrowRight size={14} strokeWidth={3} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
