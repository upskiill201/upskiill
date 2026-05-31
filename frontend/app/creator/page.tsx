'use client';

import React from 'react';
import { 
  Users, BookOpen, PlaySquare, DollarSign, Star, 
  Calendar, ChevronDown, CheckCircle, Upload, Tag,
  MoreVertical
} from 'lucide-react';
import Image from 'next/image';
import styles from './Creator.module.css';

// Mock Data
const STATS = [
  { id: 1, title: 'Total Students', value: '2,487', trend: '+ 18.6%', trendText: 'vs Apr 18 - May 17', icon: <Users size={20} className={styles.iconBlue} />, bg: styles.bgBlue },
  { id: 2, title: 'Active Courses', value: '7', subText: '2 in draft', icon: <BookOpen size={20} className={styles.iconGreen} />, bg: styles.bgGreen },
  { id: 3, title: 'Total Enrollments', value: '3,248', trend: '+ 21.4%', trendText: 'vs Apr 18 - May 17', icon: <PlaySquare size={20} className={styles.iconPurple} />, bg: styles.bgPurple },
  { id: 4, title: 'Total Earnings', value: '$8,942', trend: '+ 24.7%', trendText: 'vs Apr 18 - May 17', icon: <DollarSign size={20} className={styles.iconOrange} />, bg: styles.bgOrange },
  { id: 5, title: 'Avg Rating', value: '4.8 / 5', subText: 'From 312 reviews', icon: <Star size={20} className={styles.iconRed} />, bg: styles.bgRed },
];

const COURSES = [
  { id: 1, name: 'Content Creation Mastery', updated: 'Jun 10, 2025', status: 'Published', students: '1,245', enrollments: '1,682', earnings: '$4,682', rating: '4.8', color: '#1E3A8A' },
  { id: 2, name: 'YouTube Growth Blueprint', updated: 'Jun 5, 2025', status: 'Published', students: '932', enrollments: '1,214', earnings: '$3,214', rating: '4.7', color: '#B91C1C' },
  { id: 3, name: 'Freelance UI/UX Design', updated: 'May 28, 2025', status: 'Draft', students: '—', enrollments: '—', earnings: '—', rating: '—', color: '#6D28D9' },
];

const TODO = [
  { id: 1, title: 'Complete lesson: Storytelling 101', course: 'Content Creation Mastery', icon: <CheckCircle size={18} className={styles.iconBlue} />, bg: styles.bgBlueLight },
  { id: 2, title: 'Upload video for Lesson 4', course: 'YouTube Growth Blueprint', icon: <Upload size={18} className={styles.iconPurple} />, bg: styles.bgPurpleLight },
  { id: 3, title: 'Set course price', course: 'Freelance UI/UX Design', icon: <Tag size={18} className={styles.iconOrange} />, bg: styles.bgOrangeLight },
];

const ACTIVITY = [
  { id: 1, user: 'Sarah Johnson', action: 'left a 5-star review', course: 'Content Creation Mastery', time: '2h ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80' },
  { id: 2, user: 'New enrollment', action: 'in', course: 'YouTube Growth Blueprint', time: '3h ago', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&q=80' },
  { id: 3, user: 'Payout of $1,250', action: 'completed', course: 'to your bank account', time: '1d ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80' },
];

export default function CreatorDashboard() {
  return (
    <div className={styles.dashboardLayout}>
      
      {/* ─── HEADER AREA ─── */}
      <div className={styles.welcomeSection}>
        <div>
          <h2 className={styles.welcomeTitle}>Welcome back, Alex! 👋</h2>
          <p className={styles.welcomeSub}>Here&apos;s what&apos;s happening with your courses today.</p>
        </div>
        
        <button className={styles.dateSelector}>
          <Calendar size={16} />
          <span>May 18 - Jun 16, 2025</span>
          <ChevronDown size={16} />
        </button>
      </div>

      {/* ─── STATS ROW ─── */}
      <div className={styles.statsGrid}>
        {STATS.map(stat => (
          <div key={stat.id} className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={`${styles.statIconBox} ${stat.bg}`}>
                {stat.icon}
              </div>
              <span className={styles.statTitle}>{stat.title}</span>
            </div>
            <div className={styles.statBody}>
              <span className={styles.statValue}>{stat.value}</span>
            </div>
            <div className={styles.statFooter}>
              {stat.trend ? (
                <>
                  <span className={styles.trendUp}>{stat.trend}</span>
                  <span className={styles.trendText}>{stat.trendText}</span>
                </>
              ) : (
                <span className={styles.trendText}>{stat.subText}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ─── MAIN TWO-COLUMN LAYOUT ─── */}
      <div className={styles.mainColumns}>
        
        {/* LEFT COLUMN: Chart + Table */}
        <div className={styles.leftCol}>
          
          {/* Overview Chart (Mocked SVG for accurate design representation) */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Overview</h3>
              <button className={styles.dropdownBtn}>
                Last 30 days <ChevronDown size={14} />
              </button>
            </div>
            <div className={styles.chartLegend}>
              <div className={styles.legendItem}>
                <span className={styles.dotBlue}></span> Enrollments
              </div>
              <div className={styles.legendItem}>
                <span className={styles.dotLightBlue}></span> Earnings
              </div>
            </div>
            
            <div className={styles.chartArea}>
              <svg width="100%" height="250" viewBox="0 0 800 250" preserveAspectRatio="none">
                {/* Grid Lines */}
                {[0, 50, 100, 150, 200].map(y => (
                  <g key={y}>
                    <line x1="0" y1={y} x2="800" y2={y} stroke="#F1F5F9" strokeWidth="1" />
                    <text x="-10" y={y + 4} fontSize="11" fill="#94A3B8" textAnchor="end">
                      {y === 0 ? '$1.25K' : y === 50 ? '$1K' : y === 100 ? '$750' : y === 150 ? '$500' : y === 200 ? '$250' : ''}
                    </text>
                  </g>
                ))}
                
                {/* Gradient Fill under Main Line */}
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(37, 99, 235, 0.2)" />
                    <stop offset="100%" stopColor="rgba(37, 99, 235, 0)" />
                  </linearGradient>
                </defs>
                <path d="M 0 200 L 40 100 L 100 80 L 150 110 L 200 100 L 250 130 L 300 120 L 350 90 L 400 100 L 450 70 L 500 50 L 550 120 L 600 140 L 650 170 L 700 130 L 750 60 L 800 120 L 800 250 L 0 250 Z" fill="url(#blueGradient)" />
                
                {/* Earnings Line (Light Blue) */}
                <path d="M 0 220 L 40 170 L 100 180 L 150 190 L 200 170 L 250 150 L 300 170 L 350 160 L 400 160 L 450 150 L 500 120 L 550 140 L 600 170 L 650 200 L 700 180 L 750 130 L 800 160" fill="none" stroke="#93C5FD" strokeWidth="2" />
                
                {/* Enrollments Line (Main Blue) */}
                <path d="M 0 200 L 40 100 L 100 80 L 150 110 L 200 100 L 250 130 L 300 120 L 350 90 L 400 100 L 450 70 L 500 50 L 550 120 L 600 140 L 650 170 L 700 130 L 750 60 L 800 120" fill="none" stroke="#2563EB" strokeWidth="3" />
                
                {/* Data Points */}
                {[
                  [40, 100], [100, 80], [150, 110], [200, 100], [250, 130], 
                  [300, 120], [350, 90], [400, 100], [450, 70], [500, 50], 
                  [550, 120], [600, 140], [650, 170], [700, 130], [750, 60]
                ].map((point, i) => (
                  <circle key={i} cx={point[0]} cy={point[1]} r="4" fill="white" stroke="#2563EB" strokeWidth="2" />
                ))}
                
                {/* X Axis Labels */}
                <g fill="#94A3B8" fontSize="11" textAnchor="middle">
                  <text x="40" y="240">May 18</text>
                  <text x="200" y="240">May 23</text>
                  <text x="350" y="240">May 28</text>
                  <text x="500" y="240">Jun 2</text>
                  <text x="650" y="240">Jun 7</text>
                  <text x="800" y="240">Jun 12</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Your Courses Table */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Your Courses</h3>
              <button className={styles.linkBtn}>View All Courses</button>
            </div>
            
            <div className={styles.tableWrapper}>
              <table className={styles.courseTable}>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Status</th>
                    <th>Students</th>
                    <th>Enrollments</th>
                    <th>Earnings</th>
                    <th>Rating</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {COURSES.map(course => (
                    <tr key={course.id}>
                      <td>
                        <div className={styles.courseCell}>
                          <div className={styles.courseThumbnail} style={{ backgroundColor: course.color }}>
                            <span className={styles.courseInitials}>
                              {course.name.split(' ').map(w => w[0]).join('').substring(0, 2)}
                            </span>
                          </div>
                          <div className={styles.courseMeta}>
                            <span className={styles.courseName}>{course.name}</span>
                            <span className={styles.courseDate}>Updated {course.updated}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${course.status === 'Published' ? styles.statusPub : styles.statusDraft}`}>
                          {course.status}
                        </span>
                      </td>
                      <td>{course.students}</td>
                      <td>{course.enrollments}</td>
                      <td>{course.earnings}</td>
                      <td>
                        {course.rating !== '—' ? (
                          <div className={styles.ratingCell}>
                            {course.rating} <Star size={12} fill="#F59E0B" color="#F59E0B" />
                          </div>
                        ) : '—'}
                      </td>
                      <td>
                        <button aria-label="More options for course" className={styles.moreBtn}><MoreVertical size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: To-do + Activity */}
        <div className={styles.rightCol}>
          
          {/* To-do List */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.titleWithBadge}>
                <h3 className={styles.cardTitle}>To-do List</h3>
                <span className={styles.badge}>3</span>
              </div>
            </div>
            
            <div className={styles.todoList}>
              {TODO.map(item => (
                <div key={item.id} className={styles.todoItem}>
                  <div className={`${styles.todoIconBox} ${item.bg}`}>
                    {item.icon}
                  </div>
                  <div className={styles.todoContent}>
                    <span className={styles.todoTitle}>{item.title}</span>
                    <span className={styles.todoCourse}>In &quot;{item.course}&quot;</span>
                  </div>
                  <ChevronDown size={14} className={styles.todoArrow} style={{ transform: 'rotate(-90deg)' }} />
                </div>
              ))}
            </div>
            
            <button className={styles.linkBtn} style={{ marginTop: '16px' }}>View All Tasks <ChevronDown size={14} style={{ transform: 'rotate(-90deg)', marginLeft: '4px' }} /></button>
          </div>

          {/* Recent Activity */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Recent Activity</h3>
            </div>
            
            <div className={styles.activityList}>
              {ACTIVITY.map(item => (
                <div key={item.id} className={styles.activityItem}>
                  <Image src={item.avatar} alt={item.user} width={32} height={32} className={styles.activityAvatar} />
                  <div className={styles.activityContent}>
                    <p className={styles.activityText}>
                      <span className={styles.activityUser}>{item.user}</span> {item.action}
                    </p>
                    <p className={styles.activityCourse}>{item.course}</p>
                  </div>
                  <span className={styles.activityTime}>{item.time}</span>
                </div>
              ))}
            </div>
            
            <button className={styles.linkBtn} style={{ marginTop: '16px' }}>View All Activity <ChevronDown size={14} style={{ transform: 'rotate(-90deg)', marginLeft: '4px' }} /></button>
          </div>

        </div>
      </div>
    </div>
  );
}
