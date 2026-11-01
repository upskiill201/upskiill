import Link from 'next/link';
import { Art, topicArt } from '@/components/art/Art';
import { Glyph } from '@/components/art/Glyph';
import { coursePath, type PublicCourseCard } from '@/lib/courses/public';
import { topicOf } from '@/lib/onboarding/v3/lines';
import s from './PublicCourseGrid.module.css';

/**
 * What you can learn, for the public pages (/courses, the homepage). Server
 * component: every card is a real link with real text, so it is crawlable.
 *
 * Shown as skills, not as finished courses (founder, 2026-10-27): the subject
 * in plain words, its picture and what you'll be able to do. No cover, no
 * lesson counts, no author: the learner's course takes shape around their
 * goal and level once they start, the way onboarding tells it.
 */
export function PublicCourseGrid({ courses }: { courses: PublicCourseCard[] }) {
  // Two courses that shorten to the same subject keep their full titles.
  const counts = new Map<string, number>();
  for (const c of courses) {
    const t = topicOf(c.title) ?? c.title;
    counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return (
    <ul className={s.grid}>
      {courses.map((c) => {
        const short = topicOf(c.title) ?? c.title;
        const name = (counts.get(short) ?? 0) > 1 ? c.title : short;
        const art = topicArt(c.title) === 'book' ? topicArt(c.category ?? '') : topicArt(c.title);
        const about = c.shortDescription || c.description;
        return (
          <li key={c.id}>
            <Link href={coursePath(c.slug)} className={s.card}>
              <span className={s.art}>
                <Art name={art} size={56} />
              </span>
              <span className={s.body}>
                <span className={s.title}>{name}</span>
                {about && <span className={s.text}>{about}</span>}
                <span className={s.start}>
                  Start learning <Glyph name="arrow" size={16} strokeWidth={3} />
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default PublicCourseGrid;
