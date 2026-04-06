'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  BookOpen,
  ArrowUpRight,
  MoreHorizontal,
  Eye,
  Edit3,
  Clock,
  ChevronRight,
  Zap,
  Plus,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import {
  FaStar,
  FaGraduationCap,
  FaAward,
  FaComments,
  FaExclamationTriangle,
  FaRocket,
} from 'react-icons/fa';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { useComingSoon } from './layout';
import styles from './InstructorPage.module.css';

// ─── SEEDED DATA (Alex Rivera's Courses from prisma/seed.ts) ───
const INSTRUCTOR = {
  name: 'Alex Rivera',
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&q=80',
};

const STAT_CARDS = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: '$12,480',
    change: '+18.4%',
    positive: true,
    icon: <DollarSign size={20} />,
    color: 'green',
    sub: 'Last 30 days',
  },
  {
    id: 'students',
    label: 'Total Students',
    value: '46,400',
    change: '+12.1%',
    positive: true,
    icon: <Users size={20} />,
    color: 'blue',
    sub: 'Across all courses',
  },
  {
    id: 'courses',
    label: 'Courses Published',
    value: '2',
    change: 'Live',
    positive: true,
    icon: <BookOpen size={20} />,
    color: 'purple',
    sub: '2 by Alex Rivera',
  },
  {
    id: 'rating',
    label: 'Avg. Rating',
    value: '4.9',
    change: 'Top 5%',
    positive: true,
    icon: <FaStar size={18} />,
    color: 'orange',
    sub: 'Across all courses',
  },
];

// Alex Rivera's actual courses from seed data
const MY_COURSES = [
  {
    id: 'advanced-product-design-ux-strategy',
    title: 'Advanced Product Design & UX Strategy',
    students: 15400,
    revenue: '$7,693',
    rating: 4.9,
    reviews: 3254,
    status: 'published',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
    completion: 78,
    category: 'Design',
    price: '$499',
    duration: '22h 30m',
    sections: 5,
    lessons: 26,
  },
  {
    id: 'deep-work-mastery-productivity-focus',
    title: 'Deep Work Mastery: Productivity & Focus Systems',
    students: 31000,
    revenue: '$2,756',
    rating: 4.9,
    reviews: 5421,
    status: 'published',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80',
    completion: 86,
    category: 'Personal Development',
    price: '$89',
    duration: '8h 0m',
    sections: 3,
    lessons: 15,
  },
];

const RECENT_ACTIVITY = [
  {
    id: 1,
    type: 'enrollment',
    message: 'enrolled in',
    target: 'Advanced Product Design & UX Strategy',
    time: '5 min ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    name: 'Sarah K.',
  },
  {
    id: 2,
    type: 'review',
    message: 'left a 5-star review on',
    target: 'Deep Work Mastery',
    time: '42 min ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    name: 'Michael T.',
    rating: 5,
  },
  {
    id: 3,
    type: 'question',
    message: 'asked a question in',
    target: 'Section 4: High-Fidelity Design',
    time: '1h ago',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    name: 'James L.',
  },
  {
    id: 4,
    type: 'enrollment',
    message: 'enrolled in',
    target: 'Deep Work Mastery',
    time: '2h ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    name: 'Emily R.',
  },
  {
    id: 5,
    type: 'completed',
    message: 'completed',
    target: 'Advanced Product Design & UX Strategy',
    time: '4h ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    name: 'David M.',
  },
];

// Students who need attention (inactive or struggling)
const AT_RISK_STUDENTS = [
  {
    id: 1,
    name: 'Kwame Asante',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    course: 'Advanced Product Design & UX Strategy',
    progress: 23,
    lastSeen: '14 days ago',
    status: 'inactive',
  },
  {
    id: 2,
    name: 'Adaeze Obi',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    course: 'Deep Work Mastery',
    progress: 41,
    lastSeen: '9 days ago',
    status: 'slowing',
  },
  {
    id: 3,
    name: 'Tatenda Moyo',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    course: 'Advanced Product Design & UX Strategy',
    progress: 8,
    lastSeen: '21 days ago',
    status: 'inactive',
  },
];

const MONTHLY_REVENUE = [2800, 3600, 3200, 4500, 4200, 5400, 4900, 6400, 5900, 7200, 8100, 10449];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function InstructorPage() {
  const { triggerComingSoon } = useComingSoon();
  const [activityTab, setActivityTab] = useState<'all' | 'enrollments' | 'reviews' | 'questions'>('all');

  const filteredActivity = RECENT_ACTIVITY.filter((item) => {
    if (activityTab === 'all') return true;
    if (activityTab === 'enrollments') return item.type === 'enrollment';
    if (activityTab === 'reviews') return item.type === 'review';
    if (activityTab === 'questions') return item.type === 'question';
    return true;
  });

  const activityIcon = (type: string) => {
    switch (type) {
      case 'enrollment': return <FaGraduationCap size={13} className={styles.iconEnroll} />;
      case 'review': return <FaStar size={13} className={styles.iconReview} />;
      case 'question': return <FaComments size={13} className={styles.iconQuestion} />;
      case 'completed': return <FaAward size={13} className={styles.iconComplete} />;
      default: return null;
    }
  };

  return (
    <div className={styles.container}>

      {/* ─── WELCOME BANNER ─── */}
      <div className={`${styles.welcomeBanner} ${styles.animateIn}`}>
        <div className={styles.welcomeLeft}>
          <div className={styles.welcomeAvatar}>
            <Avatar src={INSTRUCTOR.avatar} name={INSTRUCTOR.name} size="md" />
          </div>
          <div>
            <h2 className={styles.welcomeTitle}>Welcome back, Alex Rivera! 👋</h2>
            <p className={styles.welcomeSub}>
              Your <strong>2 courses</strong> have reached <strong>46,400 students</strong> total.
              You&apos;re in the <strong>top 5% of instructors</strong> on the platform.
            </p>
          </div>
        </div>
        <div className={styles.welcomeActions}>
          <Button variant="primary" leftIcon={<Plus size={15} />} onClick={() => triggerComingSoon('Course Creator')}>
            Create New Course
          </Button>
          <Link href="/instructor/analytics">
            <Button variant="outline" leftIcon={<ArrowUpRight size={15} />}>
              View Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* ─── STATS GRID ─── */}
      <div className={`${styles.statsGrid} ${styles.animateIn} ${styles.delay1}`}>
        {STAT_CARDS.map((stat) => (
          <div key={stat.id} className={`${styles.statCard} ${styles[`stat_${stat.color}`]}`}>
            <div className={styles.statTop}>
              <div className={`${styles.statIcon} ${styles[`icon_${stat.color}`]}`}>{stat.icon}</div>
              <span className={`${styles.statBadge} ${stat.positive ? styles.positive : styles.negative}`}>
                {stat.positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {stat.change}
              </span>
            </div>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statSub}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* ─── MIDDLE: CHART + ACTIVITY ─── */}
      <div className={`${styles.middleGrid} ${styles.animateIn} ${styles.delay2}`}>

        {/* Revenue Chart */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Revenue Overview</h3>
              <p className={styles.cardSub}>Monthly earnings — last 12 months</p>
            </div>
            <div className={styles.revTotal}>
              <span className={styles.revValue}>$10,449</span>
              <Badge variant="green" size="sm">+18.4%</Badge>
            </div>
          </div>
          <RevenueBarChart data={MONTHLY_REVENUE} labels={MONTHS} />
        </div>

        {/* Recent Activity */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Recent Activity</h3>
            <button className={styles.viewAllBtn} onClick={() => triggerComingSoon('Activity Feed')}>
              View all <ChevronRight size={13} />
            </button>
          </div>

          <div className={styles.activityTabs}>
            {(['all', 'enrollments', 'reviews', 'questions'] as const).map((tab) => (
              <button
                key={tab}
                className={`${styles.actTab} ${activityTab === tab ? styles.actTabActive : ''}`}
                onClick={() => setActivityTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className={styles.activityList}>
            {filteredActivity.length === 0 ? (
              <div className={styles.emptyActivity}>No {activityTab} yet today.</div>
            ) : filteredActivity.map((item) => (
              <div key={item.id} className={styles.activityItem}>
                <div className={styles.actAvatarWrap}>
                  <Avatar src={item.avatar} name={item.name} size="sm" />
                  <div className={styles.actTypeIcon}>{activityIcon(item.type)}</div>
                </div>
                <div className={styles.actContent}>
                  <p className={styles.actText}>
                    <strong>{item.name}</strong> {item.message}{' '}
                    <span className={styles.actTarget}>{item.target}</span>
                  </p>
                  {item.rating && (
                    <div className={styles.starRow}>
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <FaStar key={i} size={10} className={styles.starFilled} />
                      ))}
                    </div>
                  )}
                </div>
                <span className={styles.actTime}><Clock size={10} /> {item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── AT-RISK STUDENTS (Personalized Learning Monitor) ─── */}
      <div className={`${styles.atRiskCard} ${styles.animateIn} ${styles.delay2}`}>
        <div className={styles.cardHeader}>
          <div className={styles.atRiskLeft}>
            <div className={styles.atRiskIconWrap}>
              <FaExclamationTriangle size={16} className={styles.atRiskIcon} />
            </div>
            <div>
              <h3 className={styles.cardTitle}>Students Needing Your Attention</h3>
              <p className={styles.cardSub}>
                These students haven&apos;t engaged recently — a nudge from you can reignite their progress
              </p>
            </div>
          </div>
          <button className={styles.viewAllBtn} onClick={() => triggerComingSoon('Student Engagement Manager')}>
            Manage All <ChevronRight size={13} />
          </button>
        </div>

        <div className={styles.atRiskGrid}>
          {AT_RISK_STUDENTS.map((student) => (
            <div key={student.id} className={`${styles.atRiskItem} ${student.status === 'inactive' ? styles.atRiskDanger : styles.atRiskWarn}`}>
              <div className={styles.atRiskHeader}>
                <Avatar src={student.avatar} name={student.name} size="sm" />
                <div className={styles.atRiskInfo}>
                  <span className={styles.atRiskName}>{student.name}</span>
                  <span className={styles.atRiskCourse}>{student.course}</span>
                </div>
                <Badge
                  variant={student.status === 'inactive' ? 'red' : 'yellow'}
                  size="sm"
                >
                  {student.status === 'inactive' ? 'Inactive' : 'Slowing'}
                </Badge>
              </div>
              <div className={styles.atRiskProgress}>
                <div className={styles.atRiskProgressLabels}>
                  <span>{student.progress}% complete</span>
                  <span className={styles.atRiskLastSeen}>
                    <Clock size={10} /> Last seen {student.lastSeen}
                  </span>
                </div>
                <ProgressBar
                  value={student.progress}
                  color={student.status === 'inactive' ? 'purple' : 'blue'}
                  size="sm"
                />
              </div>
              <button className={styles.nudgeBtn} onClick={() => triggerComingSoon('Student Messaging')}>
                <FaComments size={12} /> Send a message
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ─── COURSES TABLE ─── */}
      <div className={`${styles.card} ${styles.animateIn} ${styles.delay3}`}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>My Courses</h3>
            <p className={styles.cardSub}>Alex Rivera&apos;s published content on Upskiill</p>
          </div>
          <Button variant="outline" leftIcon={<Plus size={14} />} onClick={() => triggerComingSoon('Course Creator')}>
            Add Course
          </Button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Course</th>
                <th>Students</th>
                <th>Revenue</th>
                <th>Rating</th>
                <th>Avg. Completion</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {MY_COURSES.map((course) => (
                <tr key={course.id} className={styles.tableRow}>
                  <td>
                    <div className={styles.courseMeta}>
                      <div className={styles.courseThumbnail} style={{ backgroundImage: `url(${course.thumbnail})` }} />
                      <div>
                        <p className={styles.courseTitle}>{course.title}</p>
                        <div className={styles.courseTags}>
                          <span className={styles.courseCategory}>{course.category}</span>
                          <span className={styles.courseDuration}><Clock size={10} /> {course.duration}</span>
                          <span className={styles.courseLessons}>{course.lessons} lessons</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.metaCell}>
                      <Users size={13} className={styles.mIcon} />
                      {course.students.toLocaleString()}
                    </div>
                  </td>
                  <td>
                    <div className={styles.metaCell}>
                      <DollarSign size={13} className={styles.mIcon} />
                      {course.revenue}
                    </div>
                  </td>
                  <td>
                    <div className={styles.ratingCell}>
                      <FaStar size={12} className={styles.starFilled} />
                      <span className={styles.ratingVal}>{course.rating}</span>
                      <span className={styles.ratingCount}>({course.reviews.toLocaleString()})</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.completionCell}>
                      <ProgressBar value={course.completion} color="blue" size="sm" />
                      <span className={styles.completionPct}>{course.completion}%</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.statusCell}>
                      <CheckCircle size={12} className={styles.statusLive} />
                      <Badge variant="green" size="sm">Live</Badge>
                    </div>
                  </td>
                  <td>
                    <div className={styles.rowActions}>
                      <button className={styles.actionBtn} title="Preview" onClick={() => triggerComingSoon('Course Preview')}>
                        <Eye size={14} />
                      </button>
                      <button className={styles.actionBtn} title="Edit" onClick={() => triggerComingSoon('Course Editor')}>
                        <Edit3 size={14} />
                      </button>
                      <button className={styles.actionBtn} title="More" onClick={() => triggerComingSoon('Course Settings')}>
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── BOTTOM ROW: QUICK ACTIONS + TIPS ─── */}
      <div className={`${styles.bottomGrid} ${styles.animateIn} ${styles.delay3}`}>

        {/* Quick Actions */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Quick Actions</h3>
          <div className={styles.quickGrid}>
            {[
              { icon: <BookOpen size={18} />, label: 'New Course', color: 'blue', feature: 'Course Creator' },
              { icon: <FaAward size={16} />, label: 'Create Coupon', color: 'green', feature: 'Coupon Manager' },
              { icon: <DollarSign size={18} />, label: 'Request Payout', color: 'orange', feature: 'Payout System' },
              { icon: <Zap size={18} />, label: 'Run Promo', color: 'purple', feature: 'Promotions' },
              { icon: <FaComments size={16} />, label: 'Discussion', color: 'teal', feature: 'Discussions' },
              { icon: <Users size={18} />, label: 'Students', color: 'indigo', feature: 'Student Manager' },
            ].map((action, i) => (
              <button
                key={i}
                className={`${styles.quickAction} ${styles[`qa_${action.color}`]}`}
                onClick={() => triggerComingSoon(action.feature)}
              >
                <div className={styles.qaIcon}>{action.icon}</div>
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Teach More Tip */}
        <div className={styles.tipCard}>
          <div className={styles.tipIconWrap}>
            <AlertCircle size={18} />
          </div>
          <div>
            <h4 className={styles.tipTitle}>Boost Your Revenue</h4>
            <p className={styles.tipText}>
              Courses with <strong>free preview lessons</strong> get 3× more enrollments.
              Your <strong>Deep Work Mastery</strong> course has 2 free previews — add 2 more
              to maximize conversions.
            </p>
            <button className={styles.tipAction} onClick={() => triggerComingSoon('Course Editor')}>
              Edit Course <ArrowUpRight size={12} />
            </button>
          </div>
        </div>

        {/* Instructor Score */}
        <div className={styles.scoreCard}>
          <div className={styles.scoreHeader}>
            <FaRocket size={16} className={styles.scoreIcon} />
            <h4 className={styles.scoreTitle}>Instructor Score</h4>
          </div>
          <div className={styles.scoreValue}>94 / 100</div>
          <p className={styles.scoreSub}>Top 5% of instructors</p>
          <div className={styles.scoreBreakdown}>
            {[
              { label: 'Content Quality', pct: 97 },
              { label: 'Student Engagement', pct: 91 },
              { label: 'Response Rate', pct: 88 },
              { label: 'Course Completion', pct: 82 },
            ].map((item) => (
              <div key={item.label} className={styles.scoreItem}>
                <div className={styles.scoreItemTop}>
                  <span>{item.label}</span>
                  <span className={styles.scorePct}>{item.pct}%</span>
                </div>
                <ProgressBar value={item.pct} color="blue" size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── REVENUE BAR CHART ───
function RevenueBarChart({ data, labels }: { data: number[]; labels: string[] }) {
  const max = Math.max(...data);
  return (
    <div className={styles.barChartWrap}>
      {data.map((val, i) => {
        const h = (val / max) * 100;
        const isLast = i === data.length - 1;
        return (
          <div key={i} className={styles.barCol} title={`${labels[i]}: $${val.toLocaleString()}`}>
            <div className={styles.barTrack}>
              <div
                className={`${styles.bar} ${isLast ? styles.barActive : ''}`}
                style={{ height: `${h}%` }}
              >
                {isLast && <div className={styles.barTip}>${(val / 1000).toFixed(1)}k</div>}
              </div>
            </div>
            <span className={styles.barLabel}>{labels[i]}</span>
          </div>
        );
      })}
    </div>
  );
}
