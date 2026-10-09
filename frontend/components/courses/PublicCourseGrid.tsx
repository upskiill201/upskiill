import Link from 'next/link';
import { BookOpen, Clock, Users } from 'lucide-react';
import { CourseCover } from '@/components/course/CourseCover';
import { coursePath, formatMinutes, type PublicCourseCard } from '@/lib/courses/public';
import s from './PublicCourseGrid.module.css';

/**
 * Course cards for the public pages (/courses, the homepage). Server
 * component: every card is a real link with real text, so it is crawlable.
 * Only numbers the server sent are shown; zero means hidden, never padded.
 */
export function PublicCourseGrid({ courses, priorityCount = 0 }: { courses: PublicCourseCard[]; priorityCount?: number }) {
  return (
    <ul className={s.grid}>
      {courses.map((c, i) => {
        const minutes = formatMinutes(c.durationMinutes);
        return (
          <li key={c.id}>
            <Link href={coursePath(c.slug)} className={s.card}>
              <CourseCover
                id={c.id}
                category={c.category}
                thumbnailUrl={c.thumbnailUrl}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                className={s.cover}
                priority={i < priorityCount}
              />
              <span className={s.body}>
                <span className={s.tags}>
                  <span className={`${s.tag} ${c.track === 'ai' ? s.tagAi : s.tagCoding}`}>
                    {c.track === 'ai' ? 'AI' : 'Coding'}
                  </span>
                  <span className={`${s.tag} ${c.price > 0 ? s.tagPaid : s.tagFree}`}>
                    {c.price > 0 ? '2 lessons free' : 'Free'}
                  </span>
                </span>
                <span className={s.title}>{c.title}</span>
                {(c.shortDescription || c.description) && (
                  <span className={s.text}>{c.shortDescription || c.description}</span>
                )}
                <span className={s.meta}>
                  {c.lessonsCount > 0 && (
                    <span>
                      <BookOpen size={14} strokeWidth={2.5} aria-hidden="true" /> {c.lessonsCount} lesson
                      {c.lessonsCount === 1 ? '' : 's'}
                    </span>
                  )}
                  {minutes && (
                    <span>
                      <Clock size={14} strokeWidth={2.5} aria-hidden="true" /> {minutes}
                    </span>
                  )}
                  {c.studentsCount > 0 && (
                    <span>
                      <Users size={14} strokeWidth={2.5} aria-hidden="true" /> {c.studentsCount.toLocaleString()}
                    </span>
                  )}
                </span>
                {c.instructor.fullName && <span className={s.by}>by {c.instructor.fullName}</span>}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default PublicCourseGrid;
