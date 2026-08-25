'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  BookOpen,
  Sparkles,
  ArrowRight,
  Lock,
  Check,
  ChevronDown,
  ChevronUp,
  Play,
  FileText,
  HelpCircle,
  DollarSign,
  Globe,
  Award,
  Clock,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { calculateCoursePricingLadder } from '@/lib/pricing-engine';
import styles from './Builder.module.css';

export interface CurriculumLesson {
  id: string;
  title: string;
  /** Real field on the Lesson model — legacy callers may still pass `type`. */
  lessonType?: string;
  type?: 'video' | 'text' | 'quiz' | string;
  /** draft | published | scheduled | archived */
  status?: string;
  videoUrl?: string;
  storageUrl?: string;
  content?: string;
  quizQuestions?: any[];
}

export interface CurriculumSection {
  id: string;
  title: string;
  lessons: CurriculumLesson[];
}

export interface CourseDraftData {
  title: string;
  subtitle: string;
  category: string;
  subcategory: string;
  level: string;
  language: string;
  shortDescription: string;
  description: string;
  outcomes: string[];
  skills: string[];
  requirements: string[];
  thumbnailUrl: string;
  price: number;
}

export interface ChecklistItem {
  id: string;
  category: 'Step 1: Setup' | 'Step 2: Curriculum' | 'Step 3: Lessons';
  rule: string;
  message: string;
  passed: boolean;
  stepNum: number;
  lessonId?: string;
}

interface Step4PreviewPublishProps {
  courseId: string;
  data: CourseDraftData;
  sections: CurriculumSection[];
  onNavigateStep: (stepNum: number) => void;
  instructorName?: string;
  instructorAvatar?: string;
}

// Prefer the real `lessonType` column; fall back to the legacy `type` field.
const effectiveLessonType = (lesson: CurriculumLesson): string =>
  lesson.lessonType || lesson.type || '';

export default function Step4PreviewPublish({
  courseId,
  data,
  sections,
  onNavigateStep,
  instructorName = 'Creator',
  instructorAvatar,
}: Step4PreviewPublishProps) {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [openSectionIds, setOpenSectionIds] = useState<string[]>(
    sections.map((s) => s.id)
  );

  // ─── 1. CLIENT-SIDE VALIDATION ENGINE ───
  const allLessons = sections.flatMap((s) => s.lessons || []);

  const checklist: ChecklistItem[] = [
    {
      id: 'title-check',
      category: 'Step 1: Setup',
      rule: 'Course Title',
      message: 'Course title must be at least 6 characters.',
      passed: Boolean(data.title && data.title.trim().length >= 6),
      stepNum: 1,
    },
    {
      id: 'desc-check',
      category: 'Step 1: Setup',
      rule: 'Course Description',
      message: 'Course description must be at least 50 characters.',
      passed: Boolean(data.description && data.description.trim().length >= 50),
      stepNum: 1,
    },
    {
      id: 'cover-check',
      category: 'Step 1: Setup',
      rule: 'Cover Image / Thumbnail',
      message: 'Missing course cover image.',
      passed: Boolean(data.thumbnailUrl && data.thumbnailUrl.trim().length > 0),
      stepNum: 1,
    },
    {
      id: 'price-check',
      category: 'Step 1: Setup',
      rule: 'Course Pricing',
      message: 'Set a course price or mark as free.',
      passed: data.price !== undefined && data.price >= 0,
      stepNum: 1,
    },
    {
      id: 'module-count-check',
      category: 'Step 2: Curriculum',
      rule: 'Curriculum Modules',
      message: 'Create at least one module in your curriculum.',
      passed: sections.length >= 1,
      stepNum: 2,
    },
    {
      id: 'empty-module-check',
      category: 'Step 2: Curriculum',
      rule: 'Module Content',
      message: 'All modules must contain at least 1 lesson.',
      passed:
        sections.length > 0 &&
        sections.every((s) => s.lessons && s.lessons.length >= 1),
      stepNum: 2,
    },
    {
      id: 'lesson-content-check',
      category: 'Step 3: Lessons',
      rule: 'Lesson Media & Content',
      message: 'Every lesson must be published from the Lesson Builder (open a lesson, complete all 4 phases, then Publish).',
      // Lessons carry their completion on `status` — the old check looked at
      // fields (type/videoUrl/content) that don't exist on the Lesson model,
      // which permanently locked the publish button.
      passed:
        allLessons.length > 0 &&
        allLessons.every((l) => l.status === 'published'),
      stepNum: 3,
    },
  ];

  const failingChecks = checklist.filter((item) => !item.passed);
  const isReadyToPublish = failingChecks.length === 0;

  const toggleSection = (id: string) => {
    setOpenSectionIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // ─── PUBLISH HANDLER ───
  const handlePublish = async () => {
    if (!isReadyToPublish || isPublishing) return;
    setIsPublishing(true);
    setPublishError(null);
    try {
      const res = await fetch(`/api/courses/${courseId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        const details: string[] = errorData?.errors || [];
        const base = errorData?.message || 'Could not publish course. Please try again.';
        throw new Error(details.length > 0 ? `${base} ${details.join(' ')}` : base);
      }

      setPublishSuccess(true);
      // Trigger gamified confetti celebration
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0172FD', '#34D399', '#F59E0B', '#6366F1'],
      });

      setTimeout(() => {
        router.push('/creator/courses');
      }, 3000);
    } catch (err) {
      console.error('Failed to publish course:', err);
      setPublishError(err instanceof Error ? err.message : 'Could not publish course. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '32px', alignItems: 'start', maxWidth: '1400px', margin: '0 auto', paddingBottom: '60px' }}>
      
      {/* ─── LEFT COLUMN: LIVE STUDENT PREVIEW ─── */}
      <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
        
        {/* Student Preview Top Bar */}
        <div style={{ background: '#0F172A', color: '#F8FAFC', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Eye size={16} style={{ color: '#38BDF8' }} />
            <span>STUDENT PREVIEW MODE</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', color: '#94A3B8' }}>
              How learners see your course
            </span>
            <a
              href={`/courses/${courseId}?preview=true`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: '#0172FD', color: '#FFFFFF', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              Open Full Page Preview <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Hero Section */}
        <div style={{ padding: '32px 36px', background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)', borderBottom: '1px solid #F1F5F9' }}>
          
          {/* Badge Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {data.category && (
              <span style={{ background: '#EFF6FF', color: '#1D4ED8', fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px' }}>
                {data.category}
              </span>
            )}
            {data.level && (
              <span style={{ background: '#F1F5F9', color: '#475569', fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '100px' }}>
                {data.level}
              </span>
            )}
            {data.language && (
              <span style={{ background: '#F1F5F9', color: '#475569', fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '100px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Globe size={12} /> {data.language}
              </span>
            )}
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', lineHeight: '1.3', marginBottom: '12px' }}>
            {data.title || <span style={{ color: '#94A3B8', fontStyle: 'italic' }}>Untitled Course</span>}
          </h1>

          {data.subtitle && (
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.5', marginBottom: '24px' }}>
              {data.subtitle}
            </p>
          )}

          {/* Instructor & Price Row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #E2E8F0', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Avatar src={instructorAvatar || undefined} name={instructorName} size="md" />
              <div>
                <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Created by</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>{instructorName}</div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              {data.price === 0 ? (
                <div>
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Pricing</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#10B981' }}>FREE</div>
                </div>
              ) : (() => {
                const ladder = calculateCoursePricingLadder(data.price);
                return (
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>
                      Base Value: <strong style={{ color: '#0F172A' }}>${data.price}</strong>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                      <span style={{ fontSize: '12px', background: '#F1F5F9', padding: '4px 8px', borderRadius: 6, fontWeight: 700, color: '#334155' }}>
                        {ladder.weekly.formattedPrice}/wk
                      </span>
                      <span style={{ fontSize: '12px', background: '#DCFCE7', padding: '4px 8px', borderRadius: 6, fontWeight: 800, color: '#15803D' }}>
                        {ladder.monthly.formattedPrice}/mo ⭐
                      </span>
                      <span style={{ fontSize: '12px', background: '#FEF3C7', padding: '4px 8px', borderRadius: 6, fontWeight: 800, color: '#B45309' }}>
                        {ladder.yearly.formattedPrice}/yr 🏆
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Course Banner Image Preview */}
        <div style={{ padding: '24px 36px', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ position: 'relative', width: '100%', height: '260px', borderRadius: '16px', overflow: 'hidden', background: '#F1F5F9', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {data.thumbnailUrl ? (
              <img
                src={data.thumbnailUrl}
                alt="Course cover"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ textAlign: 'center', color: '#94A3B8', padding: '20px' }}>
                <BookOpen size={48} style={{ margin: '0 auto 12px', strokeWidth: 1.5 }} />
                <p style={{ margin: 0, fontWeight: 600, fontSize: '14px' }}>No cover image uploaded</p>
                <span style={{ fontSize: '12px' }}>Add a cover image in Step 1</span>
              </div>
            )}
          </div>
        </div>

        {/* Outcomes Section */}
        {data.outcomes && data.outcomes.filter(Boolean).length > 0 && (
          <div style={{ padding: '28px 36px', borderBottom: '1px solid #F1F5F9' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} style={{ color: '#0172FD' }} /> What you&apos;ll learn
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              {data.outcomes.filter(Boolean).map((outcome, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} style={{ color: '#10B981', flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '14px', color: '#334155', lineHeight: '1.5' }}>{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description Section */}
        {data.description && (
          <div style={{ padding: '28px 36px', borderBottom: '1px solid #F1F5F9' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}>Description</h3>
            <div
              style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6' }}
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>
        )}

        {/* Curriculum Preview Section */}
        <div style={{ padding: '28px 36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Course Curriculum</h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0' }}>
                {sections.length} module{sections.length !== 1 ? 's' : ''} • {allLessons.length} lesson{allLessons.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {sections.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', background: '#F8FAFC', borderRadius: '12px', border: '1px dashed #CBD5E1' }}>
              <Layers size={32} style={{ color: '#94A3B8', margin: '0 auto 8px' }} />
              <p style={{ margin: 0, fontWeight: 600, color: '#64748B', fontSize: '14px' }}>No curriculum modules created yet</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {sections.map((section, sIdx) => {
                const isOpen = openSectionIds.includes(section.id);
                return (
                  <div key={section.id} style={{ border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
                    <div
                      onClick={() => toggleSection(section.id)}
                      style={{ padding: '14px 20px', background: '#F8FAFC', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', userSelect: 'none' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontWeight: 700, fontSize: '13px', color: '#0172FD', background: '#EFF6FF', padding: '2px 8px', borderRadius: '6px' }}>
                          Module {sIdx + 1}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: '15px', color: '#0F172A' }}>{section.title}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '13px', color: '#64748B' }}>{section.lessons?.length || 0} lessons</span>
                        {isOpen ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
                      </div>
                    </div>

                    {isOpen && (
                      <div style={{ background: '#FFFFFF', padding: '8px 0', borderTop: '1px solid #F1F5F9' }}>
                        {(!section.lessons || section.lessons.length === 0) ? (
                          <div style={{ padding: '12px 20px', fontSize: '13px', color: '#EF4444', fontStyle: 'italic' }}>
                            Empty module — add lessons in Step 2.
                          </div>
                        ) : (
                          section.lessons.map((lesson, lIdx) => (
                            <div key={lesson.id || lIdx} style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', color: '#334155', borderBottom: lIdx === section.lessons.length - 1 ? 'none' : '1px solid #F8FAFC' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {effectiveLessonType(lesson) === 'video' ? (
                                  <Play size={14} style={{ color: '#0172FD' }} />
                                ) : effectiveLessonType(lesson) === 'quiz' ? (
                                  <HelpCircle size={14} style={{ color: '#8B5CF6' }} />
                                ) : (
                                  <FileText size={14} style={{ color: '#10B981' }} />
                                )}
                                <span>{lesson.title}</span>
                              </div>
                              <span style={{ fontSize: '12px', color: lesson.status === 'published' ? '#10B981' : '#94A3B8', textTransform: 'capitalize' }}>
                                {lesson.status === 'published' ? 'Published ✓' : (effectiveLessonType(lesson) || 'Draft')}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ─── RIGHT COLUMN: STICKY PRE-PUBLISH CHECKLIST ─── */}
      <div style={{ position: 'sticky', top: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Checklist Card */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Pre-Publish Checklist
            </h2>
            <span style={{ background: isReadyToPublish ? '#ECFDF5' : '#FEF2F2', color: isReadyToPublish ? '#059669' : '#DC2626', fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px' }}>
              {isReadyToPublish ? '100% Ready' : `${failingChecks.length} issue${failingChecks.length !== 1 ? 's' : ''}`}
            </span>
          </div>

          <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5', marginBottom: '20px' }}>
            {isReadyToPublish
              ? 'All quality assurance requirements are met! You are ready to publish your course.'
              : 'Complete the items below to unlock the Publish Course button.'}
          </p>

          {/* Checklist Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {checklist.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: item.passed ? '1px solid #E2E8F0' : '1.5px solid #FECACA',
                  background: item.passed ? '#FAFAFA' : '#FEF2F2',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}
              >
                {item.passed ? (
                  <CheckCircle2 size={18} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                ) : (
                  <XCircle size={18} style={{ color: '#EF4444', flexShrink: 0, marginTop: '2px' }} />
                )}

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: item.passed ? '#1E293B' : '#991B1B' }}>
                      {item.rule}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748B', background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
                      Step {item.stepNum}
                    </span>
                  </div>

                  {!item.passed && (
                    <div style={{ marginTop: '4px' }}>
                      <p style={{ fontSize: '12px', color: '#B91C1C', margin: '0 0 6px 0', lineHeight: '1.4' }}>
                        {item.message}
                      </p>
                      <button
                        type="button"
                        onClick={() => onNavigateStep(item.stepNum)}
                        style={{ background: 'none', border: 'none', padding: 0, color: '#0172FD', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        Fix in Step {item.stepNum} <ArrowUpRight size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Publish error surfaced from the server (validation, ownership…) */}
          {publishError && (
            <div style={{
              padding: '12px 14px',
              borderRadius: '12px',
              border: '1.5px solid #FECACA',
              background: '#FEF2F2',
              marginBottom: '12px',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
            }}>
              <AlertCircle size={16} style={{ color: '#EF4444', flexShrink: 0, marginTop: '2px' }} />
              <p style={{ margin: 0, fontSize: '12.5px', color: '#B91C1C', lineHeight: 1.45 }}>{publishError}</p>
            </div>
          )}

          {/* Primary Publish Action Button */}
          <Button
            variant="primary"
            fullWidth
            size="lg"
            disabled={!isReadyToPublish || isPublishing}
            loading={isPublishing}
            onClick={handlePublish}
            style={{
              height: '52px',
              fontSize: '16px',
              fontWeight: 700,
              borderRadius: '12px',
              background: isReadyToPublish ? '#0172FD' : '#94A3B8',
              cursor: isReadyToPublish ? 'pointer' : 'not-allowed',
            }}
          >
            {isReadyToPublish ? 'Publish Course 🚀' : 'Locked — Fix Issues Above'}
          </Button>

          {!isReadyToPublish && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', marginTop: '12px', fontSize: '12px', color: '#64748B' }}>
              <Lock size={13} />
              <span>Button unlocks automatically when checklist passes</span>
            </div>
          )}
        </div>
      </div>

      {/* SUCCESS OVERLAY MODAL */}
      {publishSuccess && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '40px', maxWidth: '480px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid #E2E8F0' }}>
            <div style={{ width: '72px', height: '72px', background: '#ECFDF5', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Sparkles size={36} style={{ color: '#10B981' }} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Course Published! 🎉
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.5', marginBottom: '24px' }}>
              Your course <strong>&ldquo;{data.title}&rdquo;</strong> is now live on Teyro. Students can enroll and start learning immediately!
            </p>
            <Button variant="primary" fullWidth onClick={() => router.push('/creator/courses')}>
              Go to Creator Dashboard →
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
