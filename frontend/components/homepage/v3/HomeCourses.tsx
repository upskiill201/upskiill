import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fetchPublicCourses } from '@/lib/courses/public';
import PublicCourseGrid from '@/components/courses/PublicCourseGrid';
import { Reveal } from './Visuals';
import s from './Home.module.css';

/**
 * Real, published courses on the homepage — the newest six, Coding and AI.
 * Each one opens its public page, where a visitor can start without an
 * account. Renders nothing while there are none (no placeholder courses).
 */
export default async function HomeCourses() {
  const courses = (await fetchPublicCourses()).slice(0, 6);
  if (courses.length === 0) return null;

  return (
    <section className={s.band} id="courses" aria-labelledby="courses-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>Start a course today</span>
          <h2 id="courses-title" className={`${s.display} ${s.h2}`}>
            Real courses. <em>Start one in a minute.</em>
          </h2>
          <p className={s.lead}>Open any course to see every lesson, then start learning — free.</p>
        </Reveal>
        <PublicCourseGrid courses={courses} />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
          <Link href="/courses" className={s.btnGhost}>
            See all courses <ArrowRight size={18} strokeWidth={3} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
