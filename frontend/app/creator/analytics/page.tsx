'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Eye,
  Clock,
  Globe,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  BarChart2,
  Zap,
} from 'lucide-react';
import {
  FaStar,
  FaFire,
  FaGraduationCap,
  FaExclamationTriangle,
  FaChartLine,
  FaComments,
} from 'react-icons/fa';
import Badge from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import Avatar from '@/components/ui/Avatar';
import { useComingSoon } from '../layout';
import styles from './Analytics.module.css';

const PERIOD_OPTIONS = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year'];

const KPI_CARDS = [
  { id: 'revenue', label: 'Total Revenue', value: '$12,480', change: '+18.4%', positive: true, icon: <DollarSign size={18} />, color: 'green', detail: '$9,240 last period' },
  { id: 'enrollments', label: 'New Enrollments', value: '247', change: '+31.2%', positive: true, icon: <FaGraduationCap size={17} />, color: 'blue', detail: '188 last period' },
  { id: 'views', label: 'Course Page Views', value: '8,420', change: '+8.7%', positive: true, icon: <Eye size={18} />, color: 'purple', detail: '7,750 last period' },
  { id: 'rating', label: 'Avg. Rating', value: '4.9', change: '+0.02', positive: true, icon: <FaStar size={16} />, color: 'orange', detail: '4.88 last period' },
  { id: 'watch_time', label: 'Total Watch Time', value: '4,840h', change: '+22.1%', positive: true, icon: <Clock size={18} />, color: 'teal', detail: '3,962h last period' },
  { id: 'countries', label: 'Countries Reached', value: '31', change: '+4', positive: true, icon: <Globe size={18} />, color: 'indigo', detail: '27 last period' },
];

const MONTHLY_REVENUE = [2800, 3600, 3200, 4500, 4200, 5400, 4900, 6400, 5900, 7200, 8100, 10449];
const MONTHLY_ENROLLMENTS = [60, 90, 75, 120, 100, 145, 130, 175, 155, 210, 185, 247];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const REVENUE_BY_COURSE = [
  { name: 'Advanced Product Design & UX Strategy', value: 7693, pct: 100, students: 15400 },
  { name: 'Deep Work Mastery: Productivity & Focus Systems', value: 2756, pct: 36, students: 31000 },
];

const BY_COUNTRY = [
  { country: 'Nigeria', flag: '🇳🇬', students: 98, pct: 100 },
  { country: 'Ghana', flag: '🇬🇭', students: 52, pct: 53 },
  { country: 'Kenya', flag: '🇰🇪', students: 31, pct: 32 },
  { country: 'United States', flag: '🇺🇸', students: 28, pct: 29 },
  { country: 'UK', flag: '🇬🇧', students: 18, pct: 18 },
  { country: 'Canada', flag: '🇨🇦', students: 12, pct: 12 },
  { country: 'Others', flag: '🌍', students: 8, pct: 8 },
];

// Personalized learning: per-section drop-off rates
const LESSON_ANALYTICS = [
  { name: 'Welcome & Course Overview', course: 'Product Design', completions: 1240, avgTime: '4m', dropOff: '4%', status: 'good' },
  { name: 'What is UX Strategy?', course: 'Product Design', completions: 1195, avgTime: '12m', dropOff: '3.6%', status: 'good' },
  { name: 'The Double Diamond Design Process', course: 'Product Design', completions: 1020, avgTime: '18m', dropOff: '17.8%', status: 'warn' },
  { name: 'Building a Design System from Zero', course: 'Product Design', completions: 780, avgTime: '28m', dropOff: '23.5%', status: 'warn' },
  { name: 'What is Deep Work and Why It\'s Rare', course: 'Deep Work', completions: 2940, avgTime: '8m', dropOff: '5.2%', status: 'good' },
  { name: 'Neuroscience of Attention & Flow States', course: 'Deep Work', completions: 2640, avgTime: '14m', dropOff: '10.2%', status: 'warn' },
];

// At-risk student segmentation
const AT_RISK = [
  { id: 1, name: 'Kwame Asante', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', course: 'Product Design', progress: 23, lastSeen: '14 days ago', streak: 0, risk: 'high' },
  { id: 2, name: 'Adaeze Obi', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', course: 'Product Design', progress: 41, lastSeen: '9 days ago', streak: 0, risk: 'medium' },
  { id: 3, name: 'Tatenda Moyo', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', course: 'Deep Work', progress: 8, lastSeen: '21 days ago', streak: 0, risk: 'high' },
  { id: 4, name: 'Kofi Mensah', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', course: 'Deep Work', progress: 55, lastSeen: '7 days ago', streak: 2, risk: 'medium' },
];

// Top students (engaged & progressing)
const TOP_STUDENTS = [
  { id: 1, name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100', course: 'Product Design', progress: 92, streak: 18, rating: 5 },
  { id: 2, name: 'David Park', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', course: 'Deep Work', progress: 100, streak: 30, rating: 5 },
  { id: 3, name: 'Amara Diallo', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', course: 'Product Design', progress: 88, streak: 14, rating: 5 },
];

// Engagement heatmap (hour-of-day data)
const HOUR_ENGAGEMENT = [
  0.05, 0.03, 0.02, 0.01, 0.02, 0.08, 0.18, 0.42, 0.68, 0.82, 0.9, 0.88,
  0.72, 0.85, 0.95, 1.0, 0.92, 0.85, 0.74, 0.65, 0.55, 0.4, 0.28, 0.12,
];

const HOURS = ['12a','1a','2a','3a','4a','5a','6a','7a','8a','9a','10a','11a','12p','1p','2p','3p','4p','5p','6p','7p','8p','9p','10p','11p'];

export default function AnalyticsPage() {
  const { triggerComingSoon } = useComingSoon();
  const [activePeriod, setActivePeriod] = useState('Last 30 days');
  const [activeChart, setActiveChart] = useState<'revenue' | 'enrollments'>('revenue');
  const [showDrop, setShowDrop] = useState(false);

  const chartData = activeChart === 'revenue' ? MONTHLY_REVENUE : MONTHLY_ENROLLMENTS;
  const chartColor = activeChart === 'revenue' ? '#3D5AFE' : '#10B981';

  return (
    <div className={styles.container}>

      {/* ─── PAGE HEADER ─── */}
      <div className={`${styles.pageHeader} ${styles.animateIn}`}>
        <div>
          <h2 className={styles.pageTitle}>Analytics</h2>
          <p className={styles.pageSub}>
            Real-time insights across your 2 courses — Alex Rivera&apos;s performance dashboard
          </p>
        </div>
        <div className={styles.periodSelector}>
          <button className={styles.periodBtn} onClick={() => setShowDrop(!showDrop)}>
            {activePeriod} <ChevronDown size={14} />
          </button>
          {showDrop && (
            <div className={styles.periodDropdown}>
              {PERIOD_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  className={`${styles.periodOption} ${activePeriod === opt ? styles.periodActive : ''}`}
                  onClick={() => { setActivePeriod(opt); setShowDrop(false); }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── KPI GRID ─── */}
      <div className={`${styles.kpiGrid} ${styles.animateIn} ${styles.delay1}`}>
        {KPI_CARDS.map((k) => (
          <div key={k.id} className={styles.kpiCard}>
            <div className={styles.kpiTop}>
              <div className={`${styles.kpiIcon} ${styles[`icon_${k.color}`]}`}>{k.icon}</div>
              <span className={`${styles.kpiChange} ${k.positive ? styles.positive : styles.negative}`}>
                {k.positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {k.change}
              </span>
            </div>
            <div className={styles.kpiValue}>{k.value}</div>
            <div className={styles.kpiLabel}>{k.label}</div>
            <div className={styles.kpiDetail}>{k.detail}</div>
          </div>
        ))}
      </div>

      {/* ─── MAIN CHART ─── */}
      <div className={`${styles.mainChart} ${styles.animateIn} ${styles.delay2}`}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Performance Over Time</h3>
            <p className={styles.cardSub}>Monthly breakdown — {activePeriod.toLowerCase()}</p>
          </div>
          <div className={styles.chartToggle}>
            <button className={`${styles.toggleBtn} ${activeChart === 'revenue' ? styles.toggleActive : ''}`} onClick={() => setActiveChart('revenue')}>
              Revenue
            </button>
            <button className={`${styles.toggleBtn} ${activeChart === 'enrollments' ? styles.toggleActive : ''}`} onClick={() => setActiveChart('enrollments')}>
              Enrollments
            </button>
          </div>
        </div>
        <div className={styles.chartArea}>
          <LineChart data={chartData} labels={MONTHS} color={chartColor} prefix={activeChart === 'revenue' ? '$' : ''} />
        </div>
        <div className={styles.chartLegend}>
          <div className={styles.legendItem}><div className={`${styles.dot} ${styles.dotBlue}`} /> This year: {activeChart === 'revenue' ? '$10,449' : '247 students'}</div>
          <div className={styles.legendItem}><div className={`${styles.dot} ${styles.dotGray}`} /> Last year: {activeChart === 'revenue' ? '$6,180' : '142 students'}</div>
        </div>
      </div>

      {/* ─── LOWER GRID: Revenue + Countries ─── */}
      <div className={`${styles.lowerGrid} ${styles.animateIn} ${styles.delay2}`}>

        {/* Revenue by Course */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Revenue by Course</h3>
              <p className={styles.cardSub}>Alex Rivera&apos;s live courses</p>
            </div>
            <Badge variant="green" size="sm">$10,449 total</Badge>
          </div>
          <div className={styles.courseRevList}>
            {REVENUE_BY_COURSE.map((item, i) => (
              <div key={i} className={styles.courseRevItem}>
                <div className={styles.courseRevMeta}>
                  <span className={styles.courseRevRank}>#{i + 1}</span>
                  <span className={styles.courseRevName}>{item.name}</span>
                  <span className={styles.courseRevVal}>${item.value.toLocaleString()}</span>
                </div>
                <div className={styles.courseRevSub}>
                  <Users size={10} className={styles.revSubIcon} /> {item.students.toLocaleString()} students
                </div>
                <ProgressBar value={item.pct} color="blue" size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Students by Country */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Students by Country</h3>
              <p className={styles.cardSub}>Geographic reach this month</p>
            </div>
            <Badge variant="blue" size="sm">31 countries</Badge>
          </div>
          <div className={styles.countryList}>
            {BY_COUNTRY.map((item, i) => (
              <div key={i} className={styles.countryItem}>
                <span className={styles.flag}>{item.flag}</span>
                <span className={styles.countryName}>{item.country}</span>
                <div className={styles.countryBarWrap}>
                  <div className={styles.countryBar} style={{ width: `${item.pct}%` }} />
                </div>
                <span className={styles.countryCount}>{item.students}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── STUDENT ENGAGEMENT HEATMAP ─── */}
      <div className={`${styles.card} ${styles.animateIn} ${styles.delay2}`}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Student Engagement by Hour</h3>
            <p className={styles.cardSub}>
              When your students are most active — use this to time announcements and new content
            </p>
          </div>
          <Badge variant="blue" size="sm">Peak: 3pm WAT</Badge>
        </div>
        <div className={styles.heatmapRow}>
          {HOUR_ENGAGEMENT.map((level, i) => (
            <div key={i} className={styles.heatCell} title={`${HOURS[i]}: ${Math.round(level * 100)}%`}>
              <div className={styles.heatBar} style={{ height: `${level * 100}%`, opacity: 0.3 + level * 0.7 }} />
              <span className={styles.heatHour}>{i % 3 === 0 ? HOURS[i] : ''}</span>
            </div>
          ))}
        </div>
        <div className={styles.heatInsight}>
          <Zap size={13} className={styles.heatInsightIcon} />
          <span>Most of your students (~41%) study between <strong>2pm – 6pm WAT</strong>. Schedule new releases and announcements in the morning to maximize same-day engagement.</span>
        </div>
      </div>

      {/* ─── STUDENT SEGMENTATION ─── */}
      <div className={`${styles.segmentGrid} ${styles.animateIn} ${styles.delay3}`}>

        {/* At-Risk Students */}
        <div className={`${styles.card} ${styles.atRiskBorder}`}>
          <div className={styles.cardHeader}>
            <div className={styles.atRiskHeadLeft}>
              <div className={styles.atRiskBadgeIcon}>
                <FaExclamationTriangle size={14} className={styles.warningIcon} />
              </div>
              <div>
                <h3 className={styles.cardTitle}>Students Losing Momentum</h3>
                <p className={styles.cardSub}>Haven&apos;t engaged in 7+ days — needs your attention</p>
              </div>
            </div>
            <button className={styles.viewAllBtn} onClick={() => triggerComingSoon('Student Messaging')}>
              Message All
            </button>
          </div>
          <div className={styles.riskList}>
            {AT_RISK.map((s) => (
              <div key={s.id} className={`${styles.riskItem} ${s.risk === 'high' ? styles.riskHigh : styles.riskMed}`}>
                <Avatar src={s.avatar} name={s.name} size="sm" />
                <div className={styles.riskInfo}>
                  <span className={styles.riskName}>{s.name}</span>
                  <span className={styles.riskCourse}>{s.course} · {s.progress}% done</span>
                  <div className={styles.riskBarWrap}>
                    <ProgressBar value={s.progress} color={s.risk === 'high' ? 'purple' : 'blue'} size="sm" />
                  </div>
                </div>
                <div className={styles.riskRight}>
                  <Badge variant={s.risk === 'high' ? 'red' : 'yellow'} size="sm">
                    {s.lastSeen}
                  </Badge>
                  <button className={styles.nudgeBtn} onClick={() => triggerComingSoon('Student Messaging')}>
                    <FaComments size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Students */}
        <div className={`${styles.card} ${styles.topBorder}`}>
          <div className={styles.cardHeader}>
            <div className={styles.atRiskHeadLeft}>
              <div className={styles.topBadgeIcon}>
                <FaFire size={14} className={styles.fireIcon} />
              </div>
              <div>
                <h3 className={styles.cardTitle}>Top Performing Students</h3>
                <p className={styles.cardSub}>Consistent learners with active streaks</p>
              </div>
            </div>
          </div>
          <div className={styles.topList}>
            {TOP_STUDENTS.map((s, i) => (
              <div key={s.id} className={styles.topItem}>
                <div className={styles.topRank}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                </div>
                <Avatar src={s.avatar} name={s.name} size="sm" />
                <div className={styles.topInfo}>
                  <span className={styles.topName}>{s.name}</span>
                  <span className={styles.topCourse}>{s.course} · {s.progress}% done</span>
                </div>
                <div className={styles.topMeta}>
                  <div className={styles.streakPill}>
                    <FaFire size={10} className={styles.streamIcon} /> {s.streak}d
                  </div>
                  <div className={styles.ratingPill}>
                    <FaStar size={10} className={styles.ratingStarIcon} /> {s.rating}.0
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.leaderboardNote}>
            <CheckCircle size={13} className={styles.noteIcon} />
            <span>Top students complete an average of <strong>3.2 lessons/day</strong></span>
          </div>
        </div>
      </div>

      {/* ─── LESSON DROP-OFF ─── */}
      <div className={`${styles.card} ${styles.animateIn} ${styles.delay3}`}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Lesson Drop-off Analysis</h3>
            <p className={styles.cardSub}>
              Where students stop watching — fix high drop-off lessons to boost completion rates
            </p>
          </div>
          <button className={styles.viewAllBtn} onClick={() => triggerComingSoon('Full Lesson Analytics')}>
            View all lessons
          </button>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Lesson</th>
                <th>Course</th>
                <th>Completions</th>
                <th>Avg. Watch Time</th>
                <th>Drop-off Rate</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {LESSON_ANALYTICS.map((lesson, i) => (
                <tr key={i} className={styles.tableRow}>
                  <td className={styles.lessonRank}>#{i + 1}</td>
                  <td className={styles.lessonName}>{lesson.name}</td>
                  <td><Badge variant="grey" size="sm">{lesson.course}</Badge></td>
                  <td className={styles.metaCell}><Users size={12} className={styles.mIcon} /> {lesson.completions.toLocaleString()}</td>
                  <td className={styles.metaCell}><Clock size={12} className={styles.mIcon} /> {lesson.avgTime}</td>
                  <td>
                    <span className={`${styles.dropOff} ${lesson.status === 'good' ? styles.dropGood : styles.dropWarn}`}>
                      {lesson.dropOff}
                    </span>
                  </td>
                  <td>
                    {lesson.status === 'good' ? (
                      <div className={styles.statusGood}><CheckCircle size={13} /> Normal</div>
                    ) : (
                      <div className={styles.statusWarn}><AlertCircle size={13} /> Review Content</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.dropOffInsight}>
          <BarChart2 size={14} className={styles.dropInsightIcon} />
          <span>
            <strong>&apos;The Double Diamond Design Process&apos;</strong> has an 17.8% drop-off rate — above
            your course average of 8.4%. Consider adding a summary recap at the 10-minute mark.
          </span>
        </div>
      </div>

      {/* ─── COMPLETION FUNNEL ─── */}
      <div className={`${styles.funnelCard} ${styles.animateIn} ${styles.delay3}`}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Student Journey Funnel</h3>
            <p className={styles.cardSub}>Product Design course — where students fall off</p>
          </div>
          <FaChartLine size={16} className={styles.funnelHeaderIcon} />
        </div>
        <div className={styles.funnelSteps}>
          {[
            { label: 'Enrolled', count: 15400, pct: 100, color: '#3D5AFE' },
            { label: 'Started Section 1', count: 14280, pct: 92.7, color: '#6C8CFF' },
            { label: 'Completed Section 2', count: 11780, pct: 76.5, color: '#7B61FF' },
            { label: 'Completed Section 3', count: 8290, pct: 53.8, color: '#F59E0B' },
            { label: 'Completed Section 4', count: 5640, pct: 36.6, color: '#EF4444' },
            { label: 'Earned Certificate', count: 3180, pct: 20.6, color: '#10B981' },
          ].map((step, i) => (
            <div key={i} className={styles.funnelStep}>
              <div className={styles.funnelLabelRow}>
                <span className={styles.funnelLabel}>{step.label}</span>
                <div>
                  <span className={styles.funnelCount}>{step.count.toLocaleString()}</span>
                  <span className={styles.funnelPct}> ({step.pct}%)</span>
                </div>
              </div>
              <div className={styles.funnelBarTrack}>
                <div
                  className={styles.funnelBar}
                  style={{ width: `${step.pct}%`, background: step.color }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.funnelInsight}>
          <AlertCircle size={13} className={styles.funnelInsightIcon} />
          <span>
            The biggest drop-off happens between Sections 2→3 (−22.7%). Adding a <strong>live Q&amp;A</strong> or <strong>checkpoint quiz</strong> here could improve completion by up to 15%.
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── LINE CHART SVG ───
function LineChart({ data, labels, color, prefix = '' }: { data: number[]; labels: string[]; color: string; prefix?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const W = 1000; const H = 200;
  const PAD = { top: 20, right: 20, bottom: 28, left: 48 };

  const getX = (i: number) => PAD.left + (i / (data.length - 1)) * (W - PAD.left - PAD.right);
  const getY = (v: number) => H - PAD.bottom - ((v - min) / (max - min || 1)) * (H - PAD.top - PAD.bottom);

  const pathD = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${getX(i)},${getY(v)}`).join(' ');
  const fillD = `${pathD} L${getX(data.length - 1)},${H - PAD.bottom} L${getX(0)},${H - PAD.bottom} Z`;

  const yTicks = 4;
  const yStep = (max - min) / yTicks;

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad_${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {Array.from({ length: yTicks + 1 }).map((_, i) => {
        const v = min + yStep * i;
        const y = getY(v);
        return (
          <g key={i}>
            <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#F1F5F9" strokeWidth="1" />
            <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize="10" fill="#94A3B8">
              {prefix}{v >= 1000 ? `${(v / 1000).toFixed(1)}k` : Math.round(v)}
            </text>
          </g>
        );
      })}
      <path d={fillD} fill={`url(#grad_${color.replace('#', '')})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => (
        <circle key={i} cx={getX(i)} cy={getY(v)} r="4" fill="white" stroke={color} strokeWidth="2" />
      ))}
      {labels.map((label, i) => (
        <text key={label} x={getX(i)} y={H - 4} textAnchor="middle" fontSize="10" fill="#94A3B8">{label}</text>
      ))}
    </svg>
  );
}
