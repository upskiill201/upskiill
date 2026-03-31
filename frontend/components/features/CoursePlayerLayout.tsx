'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, Play, Pause, Volume2, Maximize, Settings, 
  CheckCircle, MessageSquare, Download, ThumbsUp, CornerDownRight, 
  ChevronRight, ChevronLeft as ChevronLeftIcon 
} from 'lucide-react';
import { Sidebar } from '../layout/Sidebar';
import { Tabs } from '../ui/Tabs';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import styles from './CoursePlayerLayout.module.css';

export const CoursePlayerLayout = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('community');
  
  // Dummy data for Sidebar
  const courseSections = [
    {
      id: 's1',
      title: 'Module 1: Introduction',
      lessons: [
        { id: 'l1', title: 'Welcome to the Course', duration: '2:30', isCompleted: true, isLocked: false },
        { id: 'l2', title: 'What you will learn', duration: '5:15', isCompleted: true, isLocked: false },
      ]
    },
    {
      id: 's2',
      title: 'Module 2: Core Concepts',
      lessons: [
        { id: 'l3', title: 'Understanding the Basics', duration: '12:45', isCompleted: false, isLocked: false },
        { id: 'l4', title: 'Advanced Methods', duration: '18:20', isCompleted: false, isLocked: true },
      ]
    }
  ];

  const tabContent = [
    {
      label: "Overview",
      content: (
        <div className={styles.tabSection}>
          <h3 className={styles.tabTitle}>Lesson Overview</h3>
          <p className={styles.textBody}>
            In this lesson, we will cover the foundational concepts required to master the upcoming modules. 
            Understanding the basics is crucial for building a strong framework. Make sure you take notes and practice 
            the exercises provided in the resources section.
          </p>
        </div>
      ),
    },
    {
      label: "Notes",
      content: (
        <div className={styles.tabSection}>
          <h3 className={styles.tabTitle}>My Notes</h3>
          <Textarea placeholder="Type your notes for this lesson here. They will be saved automatically." rows={5} />
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary">Save Notes</Button>
          </div>
        </div>
      ),
    },
    {
      label: "Resources",
      content: (
        <div className={styles.tabSection}>
          <h3 className={styles.tabTitle}>Downloads</h3>
          <div className={styles.resourceItem}>
            <div className={styles.resourceInfo}>
              <span className={styles.resourceIcon}>📄</span>
              <span className={styles.resourceName}>Lesson_Slidesheet.pdf</span>
            </div>
            <Button variant="outline" size="sm"><Download size={14} style={{ marginRight: '6px' }} /> Download</Button>
          </div>
          <div className={styles.resourceItem}>
            <div className={styles.resourceInfo}>
              <span className={styles.resourceIcon}>📁</span>
              <span className={styles.resourceName}>Source_Code.zip</span>
            </div>
            <Button variant="outline" size="sm"><Download size={14} style={{ marginRight: '6px' }} /> Download</Button>
          </div>
        </div>
      ),
    },
    {
      label: "Community",
      content: (
        <div className={styles.tabSection}>
          <div className={styles.postInputArea}>
            <Avatar src="" alt="Me" size="md" name="Guest User" />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Textarea placeholder="Ask a question or share a thought..." rows={2} />
              <div style={{ alignSelf: 'flex-end' }}>
                <Button variant="primary" size="sm">Post</Button>
              </div>
            </div>
          </div>
          
          <div className={styles.postList}>
            <div className={styles.post}>
              <Avatar src="" alt="User" size="md" name="Jane Doe" />
              <div className={styles.postContent}>
                <div className={styles.postHeader}>
                  <span className={styles.postAuthor}>Jane Doe</span>
                  <span className={styles.postTime}>2h ago</span>
                </div>
                <p className={styles.postText}>Does anyone know why the second method was used instead of the first one discussed?</p>
                <div className={styles.postActions}>
                  <button className={styles.actionBtn}><ThumbsUp size={14} /> 12 Likes</button>
                  <button className={styles.actionBtn}><MessageSquare size={14} /> Reply</button>
                </div>
                
                {/* Reply Section */}
                <div className={styles.replies}>
                  <div className={styles.replyItem}>
                    <Avatar src="" alt="Instructor" size="sm" name="Instructor Alex" />
                    <div className={styles.replyContent}>
                      <span className={styles.postAuthor}>Instructor Alex <span className={styles.badge}>Instructor</span></span>
                      <p className={styles.postText}>Great question! It&apos;s because the second method handles asynchronous data much more efficiently.</p>
                    </div>
                  </div>
                  <div className={styles.replyInputArea}>
                    <CornerDownRight size={16} color="#94A3B8" />
                    <Input placeholder="Write a reply..." />
                    <Button variant="secondary" size="sm">Reply</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    }
  ];

  return (
    <div className={styles.container}>
      {/* 1. TOP BAR */}
      <header className={styles.topBar}>
        <Link href="#" className={styles.backBtn}>
          <ChevronLeft size={20} /> Back to Courses
        </Link>
        <h1 className={styles.courseHeaderTitle}>Complete React Developer Bootcamp</h1>
        <div className={styles.topProgress}>
          <span className={styles.progressText}>35% complete</span>
        </div>
      </header>

      <div className={styles.main}>
        {/* 7. LESSON SIDEBAR */}
        <div className={styles.sidebarWrapper}>
          <Sidebar 
            mode="coursePlayer"
            courseTitle="Complete React Developer Bootcamp"
            courseProgress={35}
            courseSections={courseSections}
            activeLessonId="l3"
          />
        </div>

        {/* CONTENT AREA */}
        <div className={styles.contentArea}>
          
          {/* 8. PROGRESS INDICATOR (At top of video if requested, or we rely on sidebar/topbar. Topbar has text, let's add a thin bar) */}
          <div className={styles.thinProgress}>
            <div className={styles.thinProgressFill} style={{ width: '35%' }} />
          </div>

          {/* 2. VIDEO SECTION */}
          <div className={styles.videoWrapper}>
            <div className={styles.videoScreen}>
              <div className={styles.playCenterBtn} onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause size={48} color="white" /> : <Play size={48} color="white" />}
              </div>
            </div>
            
            <div className={styles.videoControls}>
              <button className={styles.playBtn} onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <div className={styles.timeText}>05:12 / 12:45</div>
              
              <div className={styles.seekBar}>
                <div className={styles.seekProgress} />
                <div className={styles.seekThumb} />
              </div>
              
              <button className={styles.iconBtn}><Volume2 size={20} /></button>
              
              <select className={styles.speedSelect}>
                <option>1x</option>
                <option>1.25x</option>
                <option>1.5x</option>
                <option>2x</option>
              </select>
              
              <button className={styles.iconBtn}><Settings size={20} /></button>
              <button className={styles.iconBtn}><Maximize size={20} /></button>
            </div>
          </div>

          <div className={styles.lessonMeta}>
            {/* 3. LESSON INFO */}
            <div className={styles.lessonInfo}>
              <h2 className={styles.lessonTitle}>Understanding the Basics</h2>
              <p className={styles.lessonDesc}>A deep dive into the fundamental architecture and lifecycle rules.</p>
            </div>
            
            {/* 4. NAVIGATION CONTROLS */}
            <div className={styles.navControls}>
              <Button variant="outline">
                <ChevronLeftIcon size={18} style={{ marginRight: '6px' }} /> Previous
              </Button>
              <Button variant="secondary">
                <CheckCircle size={18} color="#22C55E" style={{ marginRight: '6px' }} /> Mark as Complete
              </Button>
              <Button variant="primary">
                Next Lesson <ChevronRight size={18} style={{ marginLeft: '6px' }} />
              </Button>
            </div>
          </div>

          {/* 5 & 6. TABS NAVIGATION & CONTENT */}
          <div className={styles.tabsWrapper}>
            <div style={{ marginBottom: '24px' }}>
              <Tabs 
                tabs={tabContent.map(t => ({ label: t.label, value: t.label.toLowerCase() }))} 
                activeTab={activeTab} 
                onChange={setActiveTab} 
              />
            </div>
            {tabContent.find(t => t.label.toLowerCase() === activeTab)?.content}
          </div>

        </div>
      </div>
    </div>
  );
};
