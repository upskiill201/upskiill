"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaVideo, FaClipboardList } from 'react-icons/fa';
import { useComingSoon } from '../layout'; 
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from './Wizard.module.css';

const CATEGORIES = [
  "Development",
  "Business",
  "Finance & Accounting",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Lifestyle",
  "Photography & Video",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
  "I don't know yet"
];

const TIME_OPTIONS = [
  { id: "0-2", label: "I'm very busy right now (0-2 hours)" },
  { id: "2-4", label: "I'll work on this on the side (2-4 hours)" },
  { id: "5+", label: "I have lots of flexibility (5+ hours)" },
  { id: "undecided", label: "I haven't yet decided if I have time" }
];

export default function CourseCreationWizard() {
  const router = useRouter();
  const { triggerComingSoon } = useComingSoon(); // ✅ Initialize global coming soon trigger
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [courseType, setCourseType] = useState<'course' | 'test' | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [timeWeekly, setTimeWeekly] = useState('');

  const handleNext = () => {
    if (step === 1 && courseType === 'test') {
      triggerComingSoon('Practice Test Builder Engine'); // ✅ Triggers the global modal
      return;
    }
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      submitCourse();
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const submitCourse = async () => {
    if (!title) return;
    setIsSubmitting(true);
    try {
      // IMPORTANT: Must use /api/ proxy so the httpOnly session cookie is forwarded correctly.
      // Direct calls to NEXT_PUBLIC_API_URL across domains will strip the cookie.
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: title || 'Untitled Course',
          category: category || "I don't know yet",
          creatorTimeWeekly: timeWeekly
        })
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/instructor/courses/${data.id}/manage`);
      } else {
        const err = await res.json().catch(() => ({}));
        console.error('Failed to create course:', res.status, err);
        alert(`There was an error creating your course (${res.status}). Please try again.`);
      }
    } catch (err) {
      console.error('Network error:', err);
      alert('A network error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isNextDisabled = () => {
    if (step === 1 && !courseType) return true;
    if (step === 2 && !title.trim()) return true;
    if (step === 3 && !category) return true;
    if (step === 4 && (!timeWeekly || isSubmitting)) return true;
    return false;
  };

  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.progressBarContainer}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
        <div className={styles.headerLeft}>
          <Link href="/instructor" className={styles.logo}>
            <Image src="/logo.png" alt="Upskiill" width={100} height={28} style={{ width: 'auto', height: '24px' }} />
          </Link>
          <span className={styles.stepIndicator}>Step {step} of 4</span>
        </div>
        <Link href="/instructor" className={styles.exitBtn}>Exit</Link>
      </header>

      {/* Main Content Area */}
      <main className={styles.contentWrapper}>
        <div className={styles.stepContainer} key={step}>
          
          {step === 1 && (
            <>
              <h1 className={styles.title}>First, let's find out what type of course you're making.</h1>
              <div className={styles.typeGrid}>
                <div 
                  className={`${styles.typeCard} ${courseType === 'course' ? styles.selected : ''}`}
                  onClick={() => setCourseType('course')}
                >
                  <FaVideo size={48} className={styles.iconWrapper} />
                  <div className={styles.typeLabel}>Course</div>
                  <div className={styles.typeDesc}>Create rich learning experiences with the help of video lectures, quizzes, coding exercises, etc.</div>
                </div>
                <div 
                  className={`${styles.typeCard} ${courseType === 'test' ? styles.selected : ''}`}
                  onClick={() => setCourseType('test')}
                >
                  <FaClipboardList size={48} className={styles.iconWrapper} />
                  <div className={styles.typeLabel}>Practice Test</div>
                  <div className={styles.typeDesc}>Help students prepare for certification exams by providing practice questions.</div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className={styles.title}>How about a working title?</h1>
              <p className={styles.subtitle}>It's ok if you can't think of a good title now. You can change it later.</p>
              <Input 
                type="text" 
                placeholder="e.g. Learn Photoshop CS6 from Scratch" 
                maxLength={60}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </>
          )}

          {step === 3 && (
            <>
              <h1 className={styles.title}>What category best fits the knowledge you'll share?</h1>
              <p className={styles.subtitle}>If you're not sure about the right category, you can change it later.</p>
              <select 
                className={styles.selectField}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>Choose a category</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </>
          )}

          {step === 4 && (
            <>
              <h1 className={styles.title}>How much time can you spend creating your course per week?</h1>
              <p className={styles.subtitle}>There's no wrong answer. We can help you achieve your goals even if you don't have much time.</p>
              <div className={styles.radioList}>
                {TIME_OPTIONS.map(option => (
                  <label 
                    key={option.id} 
                    className={`${styles.radioOption} ${timeWeekly === option.label ? styles.selected : ''}`}
                  >
                    <input 
                      type="radio" 
                      name="timeWeekly" 
                      className={styles.radioInput}
                      value={option.label}
                      checked={timeWeekly === option.label}
                      onChange={() => setTimeWeekly(option.label)}
                    />
                    <span className={styles.radioLabel}>{option.label}</span>
                  </label>
                ))}
              </div>
            </>
          )}

        </div>
      </main>

      {/* Footer Controls */}
      <footer className={styles.footer}>
        {step > 1 ? (
          <Button variant="outline" size="lg" onClick={handlePrevious}>
            Previous
          </Button>
        ) : (
          <div /> /* Empty div for flex-between spacing */
        )}
        
        <Button 
          variant="primary" 
          size="lg" 
          onClick={handleNext}
          disabled={isNextDisabled()}
          loading={isSubmitting}
        >
          {step === 4 ? 'Create Course' : 'Continue'}
        </Button>
      </footer>
    </div>
  );
}