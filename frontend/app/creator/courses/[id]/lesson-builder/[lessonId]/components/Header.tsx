import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, Eye } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from '../LessonBuilder.module.css';

interface HeaderProps {
  courseId: string;
  courseTitle: string;
  sectionTitle: string;
  lessonTitle: string;
}

export function Header({ courseId, courseTitle, sectionTitle, lessonTitle }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.headerTitleArea}>
          <div className={styles.breadcrumbs}>
            <Link href={`/creator/courses/${courseId}/manage`} className={styles.breadcrumbLink}>
              {courseTitle}
            </Link>
            <ChevronRight size={14} />
            <span>{sectionTitle}</span>
            <ChevronRight size={14} />
            <span className="font-semibold">{lessonTitle}</span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <h1 className="text-2xl font-bold text-gray-900">Lesson Builder</h1>
            <p className="text-sm text-gray-500">Create an engaging, step-by-step learning experience.</p>
            <Link href="#" className="text-sm text-indigo-600 hover:underline flex items-center gap-1 ml-4">
              <span className="w-4 h-4 border border-indigo-600 rounded-full flex items-center justify-center text-[10px] font-bold">i</span>
              How it works
            </Link>
          </div>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.autoSave}>
            <CheckCircle2 size={16} />
            <span>Auto-saved 2 min ago</span>
          </div>
          <Button variant="outline" size="sm" className="bg-white">
            <Eye size={16} className="mr-2" />
            Preview as Student
          </Button>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            Save & Continue <ChevronRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </header>
  );
}
