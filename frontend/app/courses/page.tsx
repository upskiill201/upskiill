import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Art } from '@/components/art/Art';
import { Glyph } from '@/components/art/Glyph';
import { fetchPublicCourses, coursePath } from '@/lib/courses/public';
import { SUBJECTS, subjectOf } from '@/lib/courses/subjects';
import { START_HREF, START_LABEL, TEYRO } from '@/lib/seo/facts';
import { breadcrumbSchema, collectionSchema, itemListSchema, schemas } from '@/lib/seo/schema';
import JsonLd from '@/components/features/blog/JsonLd';
import CtaBlock from '@/components/features/blog/CtaBlock';
import { SectionHead } from '@/components/seo/Blocks';
import PublicCourseGrid from '@/components/courses/PublicCourseGrid';
import s from '@/components/seo/Seo.module.css';

/**
 * /courses — every published course, public, grouped by subject (the same
 * list the homepage's skills grid reads: lib/courses/subjects.ts). Each card
 * links to the course's own page (/courses/<slug>), where anyone can see the
 * whole path and start learning. Teyro Originals lead each subject.
 */

export const revalidate = 300;

const TITLE = 'Online Courses in Coding, AI, Money and More | Teyro';
const DESCRIPTION = `Browse Teyro courses in coding, AI, data, personal finance, leadership, communication and more: short daily lessons, streaks and leagues. ${TEYRO.priceShort}.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/courses' },
  openGraph: { type: 'website', url: '/courses', title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default async function CoursesCatalog() {
  const courses = await fetchPublicCourses();
  const groups = SUBJECTS.map((subject) => ({
    subject,
    list: courses.filter((c) => subjectOf(c) === subject.id),
  })).filter((g) => g.list.length > 0);
  const other = courses.filter((c) => subjectOf(c) === null);

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
              Learn coding, AI, money and more, <em>a few minutes a day.</em>
            </h1>
            <p className={s.lead}>
              Pick a course and start straight away — no setup, no long videos. {TEYRO.lessonFormat}.
            </p>
            {groups.length > 0 && (
              <div className={s.pillRow}>
                {groups.map(({ subject, list }) => (
                  <a key={subject.id} href={`#${subject.id}`} className={s.pill}>
                    <Art name={subject.art} size={20} />
                    {subject.short} · {list.length}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className={s.hubArt}>
            <Image src="/User onbarding Assets/tey/tablet.webp" alt="" width={260} height={300} className={s.hubTey} priority />
          </div>
        </header>
      </div>

      <div className={s.container}>
        {groups.map(({ subject, list }, i) => (
          <section key={subject.id} className={s.section} aria-labelledby={subject.id}>
            <SectionHead
              id={subject.id}
              eyebrow={`${list.length} course${list.length === 1 ? '' : 's'}`}
              title={`${subject.title} courses`}
              lead={subject.sub}
            />
            <PublicCourseGrid courses={list} priorityCount={i === 0 ? 3 : 0} />
          </section>
        ))}
        {other.length > 0 && (
          <section className={s.section} aria-labelledby="more">
            <SectionHead id="more" eyebrow="And more" title="More courses" />
            <PublicCourseGrid courses={other} />
          </section>
        )}
        {courses.length === 0 && (
          <p className={s.note}>
            Courses are loading slowly right now. <Link href="/courses">Try again</Link> in a moment.
          </p>
        )}

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
              Teach a course on Teyro <Glyph name="arrow" size={14} strokeWidth={3} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
