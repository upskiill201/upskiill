"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Check, Settings } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from './Studio.module.css';

// Rule: All fetch calls use /api/ so Next.js proxy forwards the httpOnly session cookie correctly.

// ─── SIDEBAR NAV CONFIG ───
const PLAN_ITEMS = [
  { id: 'intended-learners', label: 'Intended learners' },
  { id: 'course-structure', label: 'Course structure' },
  { id: 'setup-test-video', label: 'Setup & test video' },
];

const CREATE_ITEMS = [
  { id: 'film-edit', label: 'Film & edit' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'captions', label: 'Captions (optional)' },
  { id: 'accessibility', label: 'Accessibility (optional)' },
];

const PUBLISH_ITEMS = [
  { id: 'course-landing-page', label: 'Course landing page' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'promotions', label: 'Promotions' },
  { id: 'course-messages', label: 'Course messages' },
];

// ─── HELPER: Multi-field manager ───
type FieldListProps = {
  values: string[];
  onChange: (v: string[]) => void;
  placeholder: string;
  maxLength?: number;
  minItems?: number;
};

function FieldList({ values, onChange, placeholder, maxLength = 160, minItems = 1 }: FieldListProps) {
  const update = (idx: number, val: string) => {
    const next = [...values];
    next[idx] = val;
    onChange(next);
  };
  const add = () => onChange([...values, '']);

  return (
    <div>
      {values.map((v, i) => (
        <div key={i} className={styles.fieldRow}>
          <input
            type="text"
            className={styles.fieldInput}
            placeholder={placeholder}
            maxLength={maxLength}
            value={v}
            onChange={e => update(i, e.target.value)}
          />
          <span className={styles.fieldCharCount}>{maxLength - v.length}</span>
        </div>
      ))}
      <button type="button" className={styles.addMoreBtn} onClick={add}>
        <Plus size={16} /> Add more to your response
      </button>
    </div>
  );
}

// ─── PANELS ───

function IntendedLearnersPanel({
  courseId,
  initialData,
}: {
  courseId: string;
  initialData: { whatYouWillLearn: string[]; requirements: string[]; targetAudience: string[] };
}) {
  const [learningGoals, setLearningGoals] = useState<string[]>(
    initialData.whatYouWillLearn.length >= 4 ? initialData.whatYouWillLearn : [
      ...initialData.whatYouWillLearn,
      ...Array(Math.max(0, 4 - initialData.whatYouWillLearn.length)).fill(''),
    ]
  );
  const [requirements, setRequirements] = useState<string[]>(
    initialData.requirements.length > 0 ? initialData.requirements : ['']
  );
  const [targetAudience, setTargetAudience] = useState<string[]>(
    initialData.targetAudience.length > 0 ? initialData.targetAudience : ['']
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = useCallback(async () => {
    setIsSaving(true);
    try {
      await fetch(`/api/courses/${courseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          whatYouWillLearn: learningGoals.filter(x => x.trim()),
          requirements: requirements.filter(x => x.trim()),
          targetAudience: targetAudience.filter(x => x.trim()),
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setIsSaving(false);
    }
  }, [courseId, learningGoals, requirements, targetAudience]);

  return (
    <div className={styles.panel}>
      <h1 className={styles.sectionTitle}>Intended learners</h1>
      <p className={styles.sectionIntro}>
        The following descriptions will be publicly visible on your Course Landing Page and will have a direct impact on your course performance. These descriptions will help learners decide if your course is right for them.
      </p>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>What will students learn in your course?</label>
        <p className={styles.formHint}>
          You must enter at least 4 <a href="#">learning objectives or outcomes</a> that learners can expect to achieve after completing your course.
        </p>
        <FieldList
          values={learningGoals}
          onChange={setLearningGoals}
          placeholder="Example: Define the roles and responsibilities of a project manager"
          maxLength={160}
          minItems={4}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>What are the requirements or prerequisites for taking your course?</label>
        <p className={styles.formHint}>
          List the required skills, experience, tools or equipment learners should have prior to taking your course.{' '}
          If there are no requirements, use this space as an opportunity to lower the barrier for beginners.
        </p>
        <FieldList
          values={requirements}
          onChange={setRequirements}
          placeholder="Example: No programming experience needed. You will learn everything you need to know"
          maxLength={160}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Who is this course for?</label>
        <p className={styles.formHint}>
          Write a clear description of the <a href="#">intended learners</a> for your course who will find your course content valuable.
          It will help you attract the right learners to your course.
        </p>
        <FieldList
          values={targetAudience}
          onChange={setTargetAudience}
          placeholder="Example: Beginner Python developers curious about data science"
          maxLength={160}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 8 }}>
        <Button variant="primary" loading={isSaving} onClick={save} disabled={isSaving}>
          Save
        </Button>
        {saved && (
          <span className={styles.savedTag}>
            <Check size={14} /> Saved!
          </span>
        )}
      </div>
    </div>
  );
}

function CourseStructurePanel() {
  return (
    <div className={styles.panel}>
      <h1 className={styles.sectionTitle}>Course structure</h1>

      <div className={styles.structureHeader}>
        <div className={styles.structureHeaderText}>
          <h2>There's a course in you. Plan it out.</h2>
          <p>
            Planning your course carefully will create a clear learning path for students and help you once you film.
            Think down to the details of each lecture including the skill you'll teach, estimated video length, practical
            activities to include, and how you'll create introductions and summaries.
          </p>
        </div>
        <div className={styles.resourceBox}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📚</div>
          <h4>Our library of resources</h4>
          <p>Tips and guides to structuring a course students love</p>
          <Button variant="outline" size="sm">Teaching Center</Button>
        </div>
      </div>

      <h3 className={styles.tipsTitle}>Tips</h3>
      <div className={styles.tipsList}>
        {[
          {
            title: 'Start with your goals.',
            desc: 'Setting goals for what learners will accomplish in your course (also known as learning objectives) at the beginning will help you determine what content to include and how you will teach the content to help your learners achieve the goals.',
          },
          {
            title: 'Create an outline.',
            desc: 'Decide what skills you\'ll teach and how you\'ll teach them. Group related lectures into sections. Each section should have at least 3 lectures, and include at least one assignment or practical activity.',
          },
          {
            title: 'Introduce yourself and create momentum.',
            desc: 'People online want to start learning quickly. Make an introduction section that gives learners something to be excited about in the first 10 minutes.',
          },
          {
            title: 'Sections have a clear learning objective.',
            desc: 'Introduce each section by describing the section\'s goal and why it\'s important. Give lectures and sections titles that reflect their content and have a logical flow.',
          },
          {
            title: 'Lectures cover one concept.',
            desc: 'A good lecture length is 2-7 minutes to keep students interested and help them study in short bursts. Cover a single topic in each lecture so learners can easily find and re-watch them later.',
          },
          {
            title: 'Mix and match your lecture types.',
            desc: 'Variety keeps learners engaged. Record your screen, talk over a slide presentation, interact with talking head videos, and combine several types based on your teaching style and what is most beneficial to learners.',
          },
        ].map(tip => (
          <div key={tip.title} className={styles.tipItem}>
            <div className={styles.tipItemTitle}>{tip.title}</div>
            <div className={styles.tipItemDesc}>{tip.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComingSoonPanel({ title }: { title: string }) {
  return (
    <div className={styles.panel}>
      <h1 className={styles.sectionTitle}>{title}</h1>
      <div className={styles.stubPanel}>
        <div style={{ fontSize: 64 }}>🚧</div>
        <h2>Coming Soon</h2>
        <p>
          The <strong>{title}</strong> section is currently being built. Check back shortly — it will be available in the next update!
        </p>
      </div>
    </div>
  );
}

// ─── MAIN STUDIO PAGE ───
export default function CourseStudio({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const courseId = resolvedParams.id;

  const [activeSection, setActiveSection] = useState('intended-learners');
  const [course, setCourse] = useState<{
    title: string;
    whatYouWillLearn: string[];
    requirements: string[];
    targetAudience: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/courses/${courseId}/draft`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setCourse({
            title: data.title || 'Untitled Course',
            whatYouWillLearn: Array.isArray(data.whatYouWillLearn) ? data.whatYouWillLearn : [],
            requirements: Array.isArray(data.requirements) ? data.requirements : [],
            targetAudience: Array.isArray(data.targetAudience) ? data.targetAudience : [],
          });
        }
      } catch (err) {
        console.error('Failed to load course', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [courseId]);

  const renderPanel = () => {
    if (loading || !course) {
      return (
        <div className={styles.panel}>
          <div className={styles.stubPanel}>
            <div style={{ fontSize: 48 }}>⏳</div>
            <h2>Loading your course...</h2>
          </div>
        </div>
      );
    }
    switch (activeSection) {
      case 'intended-learners':
        return <IntendedLearnersPanel courseId={courseId} initialData={course} />;
      case 'course-structure':
        return <CourseStructurePanel />;
      default:
        return (
          <ComingSoonPanel
            title={
              [...PLAN_ITEMS, ...CREATE_ITEMS, ...PUBLISH_ITEMS].find(i => i.id === activeSection)?.label ||
              activeSection
            }
          />
        );
    }
  };

  const SidebarGroup = ({
    title,
    items,
  }: {
    title: string;
    items: { id: string; label: string }[];
  }) => (
    <div className={styles.sidebarGroup}>
      <div className={styles.sidebarGroupTitle}>{title}</div>
      {items.map(item => (
        <button
          key={item.id}
          className={`${styles.sidebarItem} ${activeSection === item.id ? styles.active : ''}`}
          onClick={() => setActiveSection(item.id)}
        >
          <span className={`${styles.sidebarCircle} ${activeSection === item.id ? styles.active : ''}`} />
          {item.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className={styles.studioLayout}>
      {/* ─── TOP BAR ─── */}
      <header className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <Link href="/instructor/courses" className={styles.backBtn}>
            <ArrowLeft size={16} /> Back to courses
          </Link>
          <span className={styles.topBarDivider}>|</span>
          <span className={styles.courseTitle}>{course?.title || 'Loading...'}</span>
          <span className={styles.draftBadge}>DRAFT</span>
          <span className={styles.videoInfo}>0min of video content uploaded</span>
        </div>
        <div className={styles.topBarRight}>
          <Button variant="secondary" disabled>
            Save
          </Button>
          <Settings size={20} color="#9ca3af" style={{ cursor: 'pointer' }} />
        </div>
      </header>

      {/* ─── BODY ─── */}
      <div className={styles.studioBody}>
        {/* ─── LEFT SIDEBAR ─── */}
        <aside className={styles.sidebar}>
          <SidebarGroup title="Plan your course" items={PLAN_ITEMS} />
          <SidebarGroup title="Create your content" items={CREATE_ITEMS} />
          <SidebarGroup title="Publish your course" items={PUBLISH_ITEMS} />

          <div className={styles.sidebarSubmitArea}>
            <Button variant="primary" fullWidth>Submit for Review</Button>
          </div>
        </aside>

        {/* ─── MAIN CONTENT ─── */}
        <main className={styles.mainContent}>{renderPanel()}</main>
      </div>
    </div>
  );
}
