'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CoursePlayerLayout } from '@/components/features/CoursePlayerLayout';
import Spinner from '@/components/ui/Spinner';

export default function LearnCoursePage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // State for Player
  const [activeLesson, setActiveLesson] = useState<{ moduleIndex: number; lessonIndex: number } | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchCourseAndProgress = async () => {
      try {
        // Fetch course
        const res = await fetch(`/api/courses/${params.id}`, {
          headers: { 'Cache-Control': 'no-cache' }
        });
        
        if (!res.ok) {
          throw new Error('Course not found');
        }
        
        const data = await res.json();
        setCourse(data);

        // Fetch User Progress
        const progRes = await fetch(`/api/courses/${params.id}/progress`, {
          credentials: 'include',
          headers: { 'Cache-Control': 'no-cache' }
        });

        if (progRes.status === 401 || progRes.status === 403) {
          setIsAuthorized(false);
          setLoading(false);
          return; // Stop execution
        }

        setIsAuthorized(true);

        if (progRes.ok) {
          const progData = await progRes.json();
          setCompletedLessons(progData.completedLessons || []);
        }

        // Initialize first lesson
        if (data.curriculum && data.curriculum.length > 0) {
          setActiveLesson({ moduleIndex: 0, lessonIndex: 0 });
        }
      } catch (error) {
        console.error("Failed to load course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndProgress();
  }, [params.id]);

  const handleSelectLesson = (moduleIndex: number, lessonIndex: number) => {
    setActiveLesson({ moduleIndex, lessonIndex });
  };

  const handleNextLesson = () => {
    if (!course || !activeLesson) return;
    const currentModule = course.curriculum[activeLesson.moduleIndex];
    if (activeLesson.lessonIndex < currentModule.lessons.length - 1) {
      setActiveLesson({ moduleIndex: activeLesson.moduleIndex, lessonIndex: activeLesson.lessonIndex + 1 });
    } else if (activeLesson.moduleIndex < course.curriculum.length - 1) {
      setActiveLesson({ moduleIndex: activeLesson.moduleIndex + 1, lessonIndex: 0 });
    }
  };

  const handlePreviousLesson = () => {
    if (!course || !activeLesson) return;
    if (activeLesson.lessonIndex > 0) {
      setActiveLesson({ moduleIndex: activeLesson.moduleIndex, lessonIndex: activeLesson.lessonIndex - 1 });
    } else if (activeLesson.moduleIndex > 0) {
      const prevModule = course.curriculum[activeLesson.moduleIndex - 1];
      setActiveLesson({ moduleIndex: activeLesson.moduleIndex - 1, lessonIndex: prevModule.lessons.length - 1 });
    }
  };

  const handleMarkComplete = async () => {
    if (!course || !activeLesson || isUpdating) return;
    const currentModule = course.curriculum[activeLesson.moduleIndex];
    const currentLessonData = currentModule.lessons[activeLesson.lessonIndex];
    const lessonId = currentLessonData.id || String(currentLessonData.index);

    if (completedLessons.includes(lessonId)) return;

    setIsUpdating(true);
    // Optimistic UI update
    setCompletedLessons(prev => [...prev, lessonId]);

    try {
      const res = await fetch(`/api/courses/${params.id}/complete-lesson`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ lessonId })
      });
      
      if (!res.ok) {
        // Revert on failure
        setCompletedLessons(prev => prev.filter(id => id !== lessonId));
      } else {
        // Automatically progress to next lesson after marking complete
        handleNextLesson();
      }
    } catch(err) {
      console.error(err);
      setCompletedLessons(prev => prev.filter(id => id !== lessonId));
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111827' }}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (!course) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexDirection: 'column', gap: '1rem', backgroundColor: '#111827' }}>
        <h2>Course Not Found</h2>
        <button onClick={() => router.push('/courses')} style={{ padding: '10px 20px', backgroundColor: '#3D5AFE', borderRadius: '8px', color: 'white', border: 'none', cursor: 'pointer' }}>
          Back to Marketplace
        </button>
      </div>
    );
  }

  if (isAuthorized === false) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B0F19', color: 'white', flexDirection: 'column', padding: '20px', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', letterSpacing: '-0.02em' }}>Course Locked</h1>
        <p style={{ color: '#94A3B8', fontSize: '18px', maxWidth: '400px', lineHeight: 1.6, marginBottom: '32px' }}>
          You must purchase this course before you can access the learning materials and premium video player.
        </p>
        <button 
          onClick={() => router.push(`/courses/${params.id}`)} 
          style={{ padding: '14px 28px', backgroundColor: '#3D5AFE', borderRadius: '8px', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', transition: 'background-color 0.2s' }}
        >
          View Course Details
        </button>
      </div>
    );
  }

  return (
    <CoursePlayerLayout
      course={course}
      activeLesson={activeLesson}
      completedLessons={completedLessons}
      onSelectLesson={handleSelectLesson}
      onMarkComplete={handleMarkComplete}
      onNextLesson={handleNextLesson}
      onPreviousLesson={handlePreviousLesson}
    />
  );
}
