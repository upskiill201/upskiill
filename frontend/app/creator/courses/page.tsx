'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaBookOpen,
  FaGraduationCap,
  FaPlus,
  FaMagnifyingGlass,
  FaEllipsisVertical,
  FaUsers,
  FaTriangleExclamation,
  FaEye,
  FaCopy,
  FaArrowRight,
  FaWandMagicSparkles,
  FaTrashCan,
  FaCircleCheck,
  FaRocket,
  FaArrowsRotate,
  FaPlay
} from 'react-icons/fa6';
import { Stars, timeAgo } from '@/components/creator/analytics/bits';
import { useSubmitForReview } from '@/lib/hooks/useSubmitForReview';
import styles from './Courses.module.css';

/** Course descriptions are authored as rich text (HTML) but this card only
 *  needs a plain-text preview — rendering the raw string showed the literal
 *  markup (e.g. "<div>Learn the principles...") instead of the text. */
function stripHtmlToText(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  category?: string;
  level?: string;
  published: boolean;
  reviewStatus?: string;
  rating?: number;
  reviewsCount?: number;
  studentsCount?: number;
  createdAt: string;
  updatedAt?: string;
  totalSections?: number;
  totalLessons?: number;
  readinessPercentage?: number;
  remainingItems?: string[];
  revenue?: number;
  views?: number;
  conversionPct?: number | null;
  completionPct?: number;
  ratingAvg?: number | null;
  ratingCount?: number;
  _count?: {
    enrollments?: number;
    sections?: number;
  };
}

/** Badge text for an unpublished course — reuses the existing draft-styled
 *  pill, just with a label that reflects where the course actually is in
 *  Teyro's review workflow instead of a flat, uninformative "Draft". */
function reviewStatusBadgeLabel(reviewStatus?: string): string {
  switch (reviewStatus) {
    case 'SUBMITTED':
      return '📨 Submitted';
    case 'UNDER_REVIEW':
      return '🔍 In review';
    case 'CHANGES_REQUESTED':
      return '✏️ Changes requested';
    case 'APPROVED':
      return '✅ Approved';
    case 'REJECTED':
      return '⛔ Rejected';
    default:
      return '🟡 Draft';
  }
}

export default function CreatorCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');
  const [sortBy, setSortBy] = useState<'UPDATED' | 'CREATED' | 'LEARNERS' | 'RATING' | 'AZ'>('UPDATED');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  // Shared with the manage-page/builder review banners so the
  // submit-for-review request and its error handling can't drift between
  // entry points — see lib/hooks/useSubmitForReview.
  const { submit: submitCourseForReview } = useSubmitForReview();

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = () => setOpenDropdownId(null);
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/courses/instructor/me', {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to load instructor courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Stats Counters
  const stats = useMemo(() => {
    const total = courses.length;
    const published = courses.filter(c => c.published).length;
    const drafts = courses.filter(c => !c.published).length;
    return { total, published, drafts };
  }, [courses]);

  // Duplication Handler
  const handleDuplicateCourse = async (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    setOpenDropdownId(null);
    setActionLoading(true);

    try {
      const res = await fetch(`/api/courses/${courseId}/duplicate`, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        await fetchCourses();
      } else {
        alert('Failed to duplicate course.');
      }
    } catch (err) {
      console.error('Error duplicating course:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // A course can only reach `published` after Teyro approves it
  // (CourseService#publishCourse now enforces reviewStatus === 'APPROVED').
  // A draft/changes-requested/rejected course's row action is therefore
  // "submit for review", not "publish" — clicking Publish on one of those
  // would just bounce off the server with a rejection.
  const needsReview = (course: Course) =>
    !course.published && course.reviewStatus !== 'APPROVED';

  // Toggle Publish / Unpublish / Submit for review
  const handleTogglePublish = async (e: React.MouseEvent, course: Course) => {
    e.stopPropagation();
    setOpenDropdownId(null);
    setActionLoading(true);

    const reviewFirst = needsReview(course);
    const verb = course.published ? 'unpublish' : reviewFirst ? 'submit for review' : 'publish';

    try {
      // Submit-for-review goes through the shared hook (also used by the
      // manage-page/builder banners) so the request + error shape can't
      // drift between entry points.
      if (!course.published && reviewFirst) {
        const result = await submitCourseForReview(course.id);
        if (result.ok) {
          await fetchCourses();
        } else {
          alert([result.message || `Failed to ${verb} course.`, ...(result.errorDetails || [])].join('\n'));
        }
        return;
      }

      const endpoint = course.published
        ? `/api/courses/${course.id}/unpublish`
        : `/api/courses/${course.id}/publish`;

      const res = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        await fetchCourses();
      } else {
        // Surface WHY it failed — publish rejections carry actionable reasons
        // (missing thumbnail, no lessons, …). A generic alert swallowed them.
        const errData = await res.json().catch(() => null);
        const msg = Array.isArray(errData?.message) ? errData.message[0] : errData?.message;
        const details: string[] = Array.isArray(errData?.errors) ? errData.errors : [];
        alert([msg || `Failed to ${verb} course.`, ...details].join('\n'));
      }
    } catch (err) {
      console.error('Error updating course status:', err);
      alert(`A network error occurred while trying to ${verb} the course.`);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Course
  const handleDeleteCourse = async (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    setOpenDropdownId(null);
    if (!confirm('Are you sure you want to permanently delete this course? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setCourses(prev => prev.filter(c => c.id !== courseId));
      } else {
        // Surface the server's reason — e.g. "has N enrolled students, unpublish instead"
        const errData = await res.json().catch(() => null);
        alert(errData?.message || 'Failed to delete course.');
      }
    } catch (err) {
      console.error('Error deleting course:', err);
      alert('A network error occurred while deleting the course.');
    }
  };

  // Filtered & Sorted Courses
  const filteredCourses = useMemo(() => {
    return courses
      .filter(course => {
        // Status filter
        if (statusFilter === 'PUBLISHED' && !course.published) return false;
        if (statusFilter === 'DRAFT' && course.published) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = course.title?.toLowerCase().includes(q);
          const matchesCategory = course.category?.toLowerCase().includes(q);
          const matchesDesc = course.description?.toLowerCase().includes(q);
          if (!matchesTitle && !matchesCategory && !matchesDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'CREATED') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'LEARNERS') {
          const aLearners = a.studentsCount || a._count?.enrollments || 0;
          const bLearners = b.studentsCount || b._count?.enrollments || 0;
          return bLearners - aLearners;
        }
        if (sortBy === 'RATING') {
          return (b.rating || 0) - (a.rating || 0);
        }
        if (sortBy === 'AZ') {
          return a.title.localeCompare(b.title);
        }
        // Default: UPDATED
        return new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime();
      });
  }, [courses, statusFilter, searchQuery, sortBy]);

  return (
    <div className={styles.coursesRoot}>
      {/* ─── PAGE HEADER ─── */}
      <div className={styles.pageHeader}>
        <div className={styles.headerInfo}>
          <h1>My Courses</h1>
          <p>Create, organize, and publish interactive learning experiences.</p>
        </div>
        <Link href="/creator/create" className={styles.button3dPrimary}>
          <FaPlus size={14} />
          <span>Create Course</span>
        </Link>
      </div>

      {/* ─── QUICK STATS OVERVIEW BAR ─── */}
      <div className={styles.statsBar}>
        <div
          className={`${styles.statCard} ${statusFilter === 'ALL' ? styles.active : ''}`}
          onClick={() => setStatusFilter('ALL')}
        >
          <div className={styles.statIconBox} style={{ background: '#EFF6FF', color: '#0172FD', border: '1.5px solid #BFDBFE' }}>
            <FaGraduationCap size={18} />
          </div>
          <div>
            <div className={styles.statValue}>{stats.total}</div>
            <div className={styles.statLabel}>All Courses</div>
          </div>
        </div>

        <div
          className={`${styles.statCard} ${statusFilter === 'PUBLISHED' ? styles.active : ''}`}
          onClick={() => setStatusFilter('PUBLISHED')}
        >
          <div className={styles.statIconBox} style={{ background: '#ECFDF5', color: '#059669', border: '1.5px solid #A7F3D0' }}>
            <FaCircleCheck size={18} />
          </div>
          <div>
            <div className={styles.statValue}>{stats.published}</div>
            <div className={styles.statLabel}>Published</div>
          </div>
        </div>

        <div
          className={`${styles.statCard} ${statusFilter === 'DRAFT' ? styles.active : ''}`}
          onClick={() => setStatusFilter('DRAFT')}
        >
          <div className={styles.statIconBox} style={{ background: '#FEF3C7', color: '#D97706', border: '1.5px solid #FDE68A' }}>
            <FaWandMagicSparkles size={18} />
          </div>
          <div>
            <div className={styles.statValue}>{stats.drafts}</div>
            <div className={styles.statLabel}>Drafts in Progress</div>
          </div>
        </div>
      </div>

      {/* ─── TOOLBAR: SEARCH & MULTI-DIMENSIONAL SORTING ─── */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <div className={styles.searchBox}>
            <FaMagnifyingGlass size={15} />
            <input
              type="text"
              placeholder="Search courses by name, category, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.toolbarRight}>
          <select
            className={styles.filterSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="UPDATED">Recently Updated</option>
            <option value="CREATED">Recently Created</option>
            <option value="LEARNERS">Most Learners</option>
            <option value="RATING">Highest Rated</option>
            <option value="AZ">Title: A to Z</option>
          </select>
        </div>
      </div>

      {/* ─── COURSE CARDS GRID / LIST ─── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748B', fontWeight: 700 }}>
          <FaArrowsRotate size={24} className="animate-spin" style={{ margin: '0 auto 12px' }} />
          Loading your creator courses...
        </div>
      ) : filteredCourses.length === 0 ? (
        /* Motivational Duolingo Empty State */
        <div className={styles.emptyCard}>
          <div className={styles.emptyIconBox}>
            <FaRocket size={32} />
          </div>
          <h3 className={styles.emptyTitle}>
            {searchQuery || statusFilter !== 'ALL'
              ? 'No courses match your filter'
              : 'Ready to teach on Teyro?'}
          </h3>
          <p className={styles.emptySubtitle}>
            {searchQuery || statusFilter !== 'ALL'
              ? 'Try adjusting your search terms or clearing your status filters to find what you are looking for.'
              : 'Create your first course to share your real-world expertise, build your reputation, and empower learners.'}
          </p>
          <Link href="/creator/create" className={styles.button3dPrimary} style={{ marginTop: 8 }}>
            <FaPlus size={14} />
            <span>Create Your First Course</span>
          </Link>
        </div>
      ) : (
        <div className={styles.coursesGrid}>
          {filteredCourses.map((course) => {
            const isDraft = !course.published;
            // No fallback — readinessPercentage is always computed server-side now.
            // If it's ever missing, that's a bug to see, not paper over.
            const readiness = course.readinessPercentage ?? 0;
            const totalLessons = course.totalLessons ?? 0;
            const learners = course._count?.enrollments ?? course.studentsCount ?? 0;
            const views = course.views ?? 0;
            const conversionPct = course.conversionPct ?? null;
            const completionPct = course.completionPct ?? 0;
            const revenue = course.revenue ?? 0;
            const ratingAvg = course.ratingAvg ?? null;
            const hasTraffic = views > 0 || learners > 0 || revenue > 0;

            return (
              <div key={course.id} className={styles.courseCard}>
                {/* Thumbnail & Badges */}
                <div className={styles.thumbnailWrapper}>
                  {course.thumbnailUrl ? (
                    <Image
                      src={course.thumbnailUrl}
                      alt={course.title}
                      fill
                      className={styles.thumbnailImage}
                    />
                  ) : (
                    <div className={styles.thumbnailPlaceholder}>
                      <FaGraduationCap size={36} opacity={0.6} />
                      <span style={{ fontSize: 12, fontWeight: 700 }}>Course Draft</span>
                    </div>
                  )}

                  {/* Status Badge — published/draft is catalog visibility;
                      for an unpublished course the label also carries Teyro's
                      review state, since "Draft" alone hid whether a course
                      was actually just sitting untouched vs. mid-review. */}
                  <span
                    className={`${styles.statusBadge} ${
                      course.published ? styles.publishedBadge : styles.draftBadge
                    }`}
                  >
                    {course.published ? '🟢 Published' : reviewStatusBadgeLabel(course.reviewStatus)}
                  </span>

                  {/* Category Tag */}
                  {course.category && (
                    <span className={styles.categoryTag}>
                      {course.category}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className={styles.cardBody}>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  {course.description && (
                    <p className={styles.courseDescription}>{stripHtmlToText(course.description)}</p>
                  )}

                  {/* For Drafts: Readiness Progress & Missing Items */}
                  {isDraft && (
                    <div className={styles.readinessBox}>
                      <div className={styles.readinessHeader}>
                        <span>Course Readiness</span>
                        <span className={styles.readinessPercent}>{readiness}% Ready</span>
                      </div>
                      <div className={styles.progressTrack3D}>
                        <div className={styles.progressFill3D} style={{ width: `${readiness}%` }} />
                      </div>
                      {course.remainingItems && course.remainingItems.length > 0 && (
                        <div className={styles.remainingText}>
                          <FaTriangleExclamation size={12} />
                          <span>{course.remainingItems.length} items to complete before publish</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* For Published: Live Metrics */}
                  {!isDraft && (
                    <>
                      <div className={styles.metricsRow}>
                        <div className={styles.metricItem}>
                          <FaUsers size={14} color="#0172FD" />
                          <span>{learners} learners</span>
                        </div>
                        <div className={styles.metricItem}>
                          <FaBookOpen size={14} color="#10B981" />
                          <span>{totalLessons} lessons</span>
                        </div>
                        <div className={styles.metricItem}>
                          <Stars rating={ratingAvg} size={12} />
                        </div>
                      </div>

                      {/* Context for the learner count — 0 learners next to 0 views
                          reads as "not launched yet"; 0 learners next to real views
                          reads as a conversion problem. Never show one without the other. */}
                      {hasTraffic ? (
                        <div className={styles.metricsRow}>
                          <div className={styles.metricItem}>
                            <FaEye size={13} color="#64748B" />
                            <span>
                              {views} view{views === 1 ? '' : 's'}
                              {conversionPct !== null ? ` · ${conversionPct}% enrolled` : ''}
                            </span>
                          </div>
                          {learners > 0 && (
                            <div className={styles.metricItem}>
                              <FaCircleCheck size={13} color="#8B5CF6" />
                              <span>{completionPct}% complete</span>
                            </div>
                          )}
                          {revenue > 0 && (
                            <div className={styles.metricItem}>
                              <span style={{ fontWeight: 700, color: '#059669' }}>
                                ${revenue.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className={styles.remainingText}>
                          <FaTriangleExclamation size={12} />
                          <span>No traffic yet — share your course link to get your first views</span>
                        </div>
                      )}

                      {course.updatedAt && (
                        <div className={styles.courseDescription} style={{ fontSize: 12, opacity: 0.65 }}>
                          Updated {timeAgo(course.updatedAt)}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className={styles.cardFooter}>
                  <Link
                    href={`/creator/builder/${course.id}`}
                    className={styles.button3dPrimary}
                    style={{ flex: 1 }}
                  >
                    <span>{isDraft ? 'Continue Editing' : 'Manage Course'}</span>
                    <FaArrowRight size={13} />
                  </Link>

                  {/* Tactile Action Dropdown */}
                  <div className={styles.moreMenuWrapper} onClick={(e) => e.stopPropagation()}>
                    <button
                      className={styles.moreBtn}
                      onClick={() => setOpenDropdownId(openDropdownId === course.id ? null : course.id)}
                      aria-label="Course Actions"
                    >
                      <FaEllipsisVertical size={16} />
                    </button>

                    {openDropdownId === course.id && (
                      <div className={styles.dropdownMenu}>
                        <Link
                          href={`/creator/builder/${course.id}`}
                          className={styles.dropdownItem}
                          onClick={() => setOpenDropdownId(null)}
                        >
                          <FaBookOpen size={13} /> Edit Curriculum
                        </Link>
                        <Link
                          href={`/courses/${course.id}`}
                          target="_blank"
                          className={styles.dropdownItem}
                          onClick={() => setOpenDropdownId(null)}
                        >
                          <FaEye size={13} /> Preview Course
                        </Link>
                        <button
                          type="button"
                          className={styles.dropdownItem}
                          onClick={(e) => handleDuplicateCourse(e, course.id)}
                        >
                          <FaCopy size={13} /> Duplicate Course
                        </button>
                        {course.reviewStatus === 'SUBMITTED' || course.reviewStatus === 'UNDER_REVIEW' ? (
                          <span className={styles.dropdownItem} style={{ color: '#94A3B8', cursor: 'default' }}>
                            <FaCircleCheck size={13} /> Awaiting Teyro review…
                          </span>
                        ) : (
                          <button
                            type="button"
                            className={styles.dropdownItem}
                            onClick={(e) => handleTogglePublish(e, course)}
                          >
                            <FaCircleCheck size={13} />{' '}
                            {course.published
                              ? 'Unpublish Course'
                              : needsReview(course)
                                ? course.reviewStatus === 'CHANGES_REQUESTED' ||
                                  course.reviewStatus === 'REJECTED'
                                  ? 'Resubmit for Review'
                                  : 'Submit for Review'
                                : 'Publish Course'}
                          </button>
                        )}
                        <button
                          type="button"
                          className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                          onClick={(e) => handleDeleteCourse(e, course.id)}
                        >
                          <FaTrashCan size={13} /> Delete Course
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}