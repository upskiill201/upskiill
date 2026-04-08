"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, MonitorPlay } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
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
            <Input 
              type="text" 
              placeholder="Search your courses" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '260px', borderRight: 'none', borderRadius: '0' }}
            />
            <button className={styles.searchBtn}>
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

        <Button variant="primary" href="/instructor/create" style={{ padding: '0 24px', borderRadius: '0' }}>
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
              With our creation improvements, new question types, and generative AI features, maximize your practice test's certification prep potential.
            </p>
            <div className={styles.bannerActions}>
              <Button variant="primary" size="sm" style={{ padding: '0 16px', borderRadius: '0' }}>Learn more</Button>
              <button className={styles.dismissBtn} onClick={() => setShowBanner(false)}>Dismiss</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── COURSE LIST ─── */}
      {loading ? (
        <div style={{ padding: '48px', textAlign: 'center', color: '#6b7280' }}>
          Loading your courses...
        </div>
      ) : filteredCourses.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', color: '#6b7280', border: '1px solid #d1d5db' }}>
          {searchQuery ? 'No courses match your search.' : "You haven't created any courses yet."}
        </div>
      ) : (
        <div className={styles.courseList}>
          {filteredCourses.map(course => (
            <Link key={course.id} href={`/instructor/courses/${course.id}/manage`} className={styles.courseRow}>
              <div className={styles.courseIcon}>
                <MonitorPlay size={32} strokeWidth={1} />
              </div>
              <div className={styles.courseDetails}>
                <div className={styles.courseTitle}>{course.title}</div>
                <div className={styles.courseMeta}>
                  {course.published ? (
                    <span className={styles.publicLabel}>PUBLISHED</span>
                  ) : (
                    <span className={styles.draftLabel}>DRAFT <span className={styles.publicLabel}>Public</span></span>
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
            </Link>
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
