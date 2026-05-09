"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/Spinner';
import styles from './LessonBuilder.module.css';

import { Header } from './components/Header';
import { TopTabs } from './components/TopTabs';
import { FooterNav } from './components/FooterNav';
import { Sidebar } from './components/Sidebar';
import { ContentTypeSelector } from './components/ContentTypeSelector';
import { VideoUploadBlock } from './components/VideoUploadBlock';
import { LearningResources, ResourceItem } from './components/LearningResources';
import { AIAssistant } from './components/AIAssistant';
import { RichTextEditorMock } from './components/RichTextEditorMock';

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
          if (data.lessonType) setContentType(data.lessonType);
          if (data.deepenResources) setResources(data.deepenResources);
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
        deepenResources: resources, // Saving resources attached to learn step
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

  const handleTabChange = async (tab: string) => {
    setCurrentTab(tab);
    // Ideally we would save current state here before switching,
    // but allowing draft navigation as requested.
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header
        courseId={params.id}
        courseTitle={courseTitle}
        sectionTitle={lesson?.section?.title || 'Section'}
        lessonTitle={lesson?.title || 'Lesson'}
      />

      <div className="px-6 bg-white border-b border-gray-200">
        <TopTabs currentTab={currentTab} onTabChange={handleTabChange} />
      </div>

      <main className={styles.mainLayout}>
        <div className={styles.leftCol}>

          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">1. LEARN – Teach the Concept</h2>
              <p className="text-sm text-gray-500">Add the core instructional content that introduces the concept to your students.</p>
            </div>
            <button className="text-sm text-indigo-600 hover:underline">Learn more</button>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-sm text-gray-900">1. Content Type</h3>
            <ContentTypeSelector selected={contentType} onChange={setContentType} />
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-sm text-gray-900">2. Add Content</h3>
            <VideoUploadBlock
              videoUrl={lesson?.learnVideoUrl || null}
              onUpload={(url) => setLesson({...lesson, learnVideoUrl: url})}
              onRemove={() => setLesson({...lesson, learnVideoUrl: null})}
            />
          </div>

          <div className="flex gap-6 w-full">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-bold text-gray-900 flex gap-1">
                Video Title <span className="text-gray-400 font-normal">(Shown to students)</span> <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-400"
                  value={lesson?.title || ''}
                  onChange={(e) => setLesson({...lesson, title: e.target.value})}
                  placeholder="What is UI Design?"
                />
                <span className="absolute right-3 top-3 text-xs text-gray-400">{lesson?.title?.length || 0}/100</span>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <label className="text-sm font-bold text-gray-900 flex gap-1">
                Short Description <span className="text-gray-400 font-normal">(Shown to students)</span>
              </label>
              <RichTextEditorMock
                value={lesson?.learnText || ''}
                onChange={(val) => setLesson({...lesson, learnText: val})}
                placeholder="Learn the basics of UI design and why it plays a crucial role in creating beautiful and usable digital products."
              />
            </div>
          </div>

          <LearningResources resources={resources} onChange={setResources} />

          <AIAssistant onApplyAI={(result) => setLesson({...lesson, learnText: result})} />

        </div>

        <Sidebar lesson={lesson} />
      </main>

      <FooterNav
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onSave={handleSave}
        courseId={params.id}
      />
    </div>
  );
}
// TODO: [Validation Requirement]
// Currently, creators are allowed to save and navigate forward with an incomplete 'Learn' step (draft mode).
// When the AWS S3 video storage integration is completed, this behavior must change.
// At that time, we must enforce strict validation ensuring that a video is uploaded and a title is provided
// before allowing the user to proceed to the 'Apply' step.
