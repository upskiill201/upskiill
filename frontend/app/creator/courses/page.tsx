"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Video, Search, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import styles from './Courses.module.css';

type Course = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
  _count: {
    enrolments: number;
  };
};

export default function InstructorCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/courses/instructor/me', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
        }
      } catch (err) {
        console.error('Failed to load courses', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleDeleteCourse = async (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }
    
    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setCourses(courses.filter(c => c.id !== courseId));
      } else {
        alert('Failed to delete course.');
      }
    } catch (err) {
      console.error('Error deleting course:', err);
      alert('Network error while deleting course.');
    }
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Courses</h1>
      
      {/* ─── TABS ─── */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`}>Courses</button>
        <button className={styles.tab}>Course bundles</button>
        <button className={styles.tab}>Course cloning <span className={styles.betaBadge}>Beta</span></button>
      </div>

      {/* ─── TOOLBAR (Search, Filter, New Button) ─── */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <div className={styles.searchGroup}>
            <input 
              type="text" 
              placeholder="Search your courses" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search your courses"
            />
            <button className={styles.searchBtn} aria-label="Submit search">
              <Search size={18} />
            </button>
          </div>
          
          <select className={styles.filterSelect}>
            <option>Newest</option>
            <option>Oldest</option>
            <option>A-Z</option>
            <option>Z-A</option>
          </select>
        </div>

        <Button variant="primary" href="/creator/create" style={{ padding: '0 24px' }}>
          New course
        </Button>
      </div>

      {/* ─── PROMO BANNER ─── */}
      {showBanner && (
        <div className={styles.banner}>
          <span className={styles.newBadge}>New</span>
          <div className={styles.bannerContent}>
            <h3>We upgraded practice tests so you can upgrade yours.</h3>
            <p>
              With our creation improvements, new question types, and generative AI features, maximize your practice test&apos;s certification prep potential.
            </p>
            <div className={styles.bannerActions}>
              <Button variant="primary" size="sm" style={{ padding: '0 16px' }}>Learn more</Button>
              <button className={styles.dismissBtn} onClick={() => setShowBanner(false)}>Dismiss</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── COURSE LIST ─── */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Skeleton height={120} />
          <Skeleton height={120} />
          <Skeleton height={120} />
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateTitle}>
            {searchQuery ? 'No courses match your search.' : "You haven't created any courses yet."}
          </div>
          <div className={styles.emptyStateDesc}>
            {searchQuery ? 'Try adjusting your search terms.' : 'Create your first course to get started.'}
          </div>
        </div>
      ) : (
        <div className={styles.courseList}>
          {filteredCourses.map(course => (
            <div key={course.id} onClick={() => router.push(`/creator/builder/${course.id}`)} className={styles.courseRow} style={{ cursor: 'pointer', position: 'relative' }}>
              {/* Hover Edit Overlay */}
              <div className={styles.editBtnOverlay}>
                <span className={styles.editOverlayLabel}>Edit / manage course</span>
              </div>

              <div className={styles.courseIcon}>
                <Video size={32} />
              </div>
              <div className={styles.courseDetails}>
                <div className={styles.courseTitle}>{course.title}</div>
                <div className={styles.courseMeta}>
                  {course.published ? (
                    <span className={styles.publicLabel}>PUBLISHED</span>
                  ) : (
                    <span className={styles.draftLabel}>DRAFT</span>
                  )}
                </div>
              </div>
              
              {!course.published && (
                <div className={styles.courseProgressArea}>
                  <span className={styles.progressLabel}>Finish your course</span>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: '15%' }} />
                  </div>
                </div>
              )}

              <button 
                onClick={(e) => handleDeleteCourse(e, course.id)}
                className={styles.deleteBtn}
                title="Delete course"
                aria-label={`Delete course: ${course.title}`}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ─── FOOTER ─── */}
      <div className={styles.footerNote}>
        Based on your experience, we think these resources will be helpful.
      </div>
    </div>
  );
}