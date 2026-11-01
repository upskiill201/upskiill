import Link from 'next/link';
import { Glyph } from '@/components/art/Glyph';
import { fetchPublicCourses } from '@/lib/courses/public';
import PublicCourseGrid from '@/components/courses/PublicCourseGrid';
import { Reveal } from './Visuals';
import s from './Home.module.css';

/**
 * What you can learn, on the homepage: the first six published courses
 * (Originals first), shown as skills rather than finished courses (founder,
 * 2026-10-27). Each one opens its public page, where a visitor can start
 * without an account. Renders nothing while there are none.
 */
export default async function HomeCourses() {
  const courses = (await fetchPublicCourses()).slice(0, 6);
  if (courses.length === 0) return null;

  return (
    <section className={s.band} id="courses" aria-labelledby="courses-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>What you can learn</span>
          <h2 id="courses-title" className={`${s.display} ${s.h2}`}>
            Pick a skill. <em>Your course takes shape around you.</em>
          </h2>
          <p className={s.lead}>Tell Teyro your goal and how much you already know, and you start at the right lesson. Free to start.</p>
        </Reveal>
        <PublicCourseGrid courses={courses} />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
          <Link href="/courses" className={s.btnGhost}>
            See everything you can learn <Glyph name="arrow" size={18} strokeWidth={3} />
          </Link>
        </div>
      </div>
    </section>
  );
}
