"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ChevronRight, Save, Layout, Eye, ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import styles from './LessonBuilder.module.css';
import { ContentTypeSelector } from './components/ContentTypeSelector';
import { VideoUploadBlock } from './components/VideoUploadBlock';
import { LearningResources, ResourceItem } from './components/LearningResources';
import { AIAssistant } from './components/AIAssistant';
import { LessonFlowPreview } from './components/LessonFlowPreview';
import { RightControlPanel } from './components/RightControlPanel';

export default function LessonBuilderPage({ params }: { params: { id: string, lessonId: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lesson, setLesson] = useState<any>(null);
  const [courseTitle, setCourseTitle] = useState('Course');

  // Tabs: learn, apply, reflect, deepen
  const [currentTab, setCurrentTab] = useState('learn');
  const [contentType, setContentType] = useState('video');
  const [resources, setResources] = useState<ResourceItem[]>([]);

  useEffect(() => {
    async function fetchLesson() {
      try {
        const res = await fetch(`/api/lesson/${params.lessonId}`);
        if (res.ok) {
          const data = await res.json();
          setLesson(data);
          if (data.section?.course?.title) {
            setCourseTitle(data.section.course.title);
          }
        }
      } catch (err) {
        console.error('Error fetching lesson:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLesson();
  }, [params.lessonId]);

  const handleSave = async (redirect?: string) => {
    setSaving(true);
    try {
      // Include form state in update payload
      const updateData = {
        title: lesson?.title,
        lessonType: contentType,
        learnText: lesson?.learnText,
        learnVideoUrl: lesson?.learnVideoUrl,
        deepenResources: resources,
      };
      const res = await fetch(`/api/lesson/${params.lessonId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      if (res.ok) {
        const data = await res.json();
        setLesson(data);
        if (redirect) {
          router.push(redirect);
        }
      }
    } catch (err) {
      console.error('Save error', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.breadcrumbs}>
          <Link href={`/creator/courses/${params.id}/manage`} className={styles.breadcrumbLink}>
            {courseTitle}
          </Link>
          <ChevronRight size={14} />
          <span>{lesson?.section?.title || 'Section'}</span>
          <ChevronRight size={14} />
          <span className="font-semibold">{lesson?.title || 'Lesson'}</span>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.autoSave}>
            <CheckCircle2 size={14} />
            <span>Auto-saved</span>
          </div>
          <Button variant="outline" size="sm">
            <Eye size={16} className="mr-2" />
            Preview as Student
          </Button>
          <Button size="sm" onClick={() => handleSave()} disabled={saving}>
            {saving ? <div className="mr-2"><Spinner size="sm" /></div> : <Save size={16} className="mr-2" />}
            Save Lesson
          </Button>
        </div>
      </header>

      {/* MAIN GRID */}
      <main className={styles.mainLayout}>
        <div className={styles.leftCol}>
          <div>
            <h2 className={styles.title}>1. LEARN – Teach the Concept</h2>
            <p className={styles.subtitle}>Add the core instructional content that introduces the concept to your students.</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm">1. Content Type</h3>
            <ContentTypeSelector selected={contentType} onChange={setContentType} />
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm">2. Add Content</h3>
            <VideoUploadBlock
              videoUrl={lesson?.learnVideoUrl || null}
              onUpload={(url) => setLesson({...lesson, learnVideoUrl: url})}
              onRemove={() => setLesson({...lesson, learnVideoUrl: null})}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex justify-between">
                Video Title <span className="text-gray-400 font-normal text-xs">(Shown to students)</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={lesson?.title || ''}
                onChange={(e) => setLesson({...lesson, title: e.target.value})}
                placeholder="e.g. What is UI Design?"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex justify-between">
                Short Description <span className="text-gray-400 font-normal text-xs">(Shown to students)</span>
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                rows={3}
                value={lesson?.learnText || ''}
                onChange={(e) => setLesson({...lesson, learnText: e.target.value})}
                placeholder="Learn the basics of UI design..."
              />
            </div>
          </div>

          <LearningResources resources={resources} onChange={setResources} />

          <AIAssistant onApplyAI={(result) => setLesson({...lesson, learnText: result})} />
        </div>

        <div className={styles.centerCol}>
          <div>
            <h2 className={styles.title}>Lesson Flow Preview</h2>
            <p className={styles.subtitle}>This is how students will experience this lesson.</p>
          </div>
          <LessonFlowPreview lesson={lesson} />
        </div>

        <div className={styles.rightCol}>
          <h2 className={styles.title}>Lesson Progress</h2>
          <RightControlPanel lesson={lesson} />
        </div>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.flowNav}>
          <div className={`${styles.flowStep} ${styles.active}`}>
            Learn {currentTab === 'learn' && <CheckCircle2 size={16} />}
          </div>
          <ChevronRight size={16} color="#CBD5E1" />
          <div className={styles.flowStep}>Apply</div>
          <ChevronRight size={16} color="#CBD5E1" />
          <div className={styles.flowStep}>Reflect</div>
          <ChevronRight size={16} color="#CBD5E1" />
          <div className={styles.flowStep}>Deepen</div>
        </div>

        <div className={styles.footerActions}>
          <Button variant="outline" onClick={() => handleSave(`/creator/courses/${params.id}/manage`)}>
            Save & Back to Curriculum
          </Button>
          <Button onClick={() => handleSave()}>
            Save & Continue
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
