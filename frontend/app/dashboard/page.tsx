'use client';

import React from 'react';
import { 
  ChevronRight, 
  ArrowUpRight, 
  Award,
  Zap,
  MoreHorizontal,
  Download,
  Share2,
  Bot,
  Layers
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { CourseCardHorizontal } from '@/components/features/CourseCardHorizontal';
import { CourseCard } from '@/components/features/CourseCard';
import { useComingSoon } from './layout';
import styles from './Page.module.css';

export default function DashboardPage() {
  const { triggerComingSoon } = useComingSoon();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const heatmapData = [0.1, 0.6, 0.3, 1, 0.1, 1, 0.6, 0.3, 0.1, 0.6, 0.1, 0.3, 1, 0.6, 0.3, 0.1, 1, 0.6, 0.3, 0.1, 0.6, 0.1, 1, 0.3, 0.6, 0.1, 0.3, 1, 0.1, 0.6, 1, 0.3, 0.1, 0.6, 0.3];

  return (
    <div className={styles.container}>
      {/* ─── TOP SECTION ─── */}
      <div className={`${styles.topSection} ${styles.animateIn}`}>
        <div className={styles.welcomeCard}>
          <div className={styles.welcomeInfo}>
            <h2 className={styles.welcomeTitle}>Welcome back, Alex! 👋</h2>
            <p className={styles.welcomeText}>
              You&apos;ve learned for <strong>14 hours</strong> this week. Keep up the momentum to reach your monthly goal.
            </p>
            <div className={styles.weeklyGoalWrapper}>
              <div className={styles.goalHeaders}>
                <span className={styles.goalLabel}>Weekly Goal</span>
                <span className={styles.goalVal}>14h / 20h</span>
              </div>
              <ProgressBar value={70} color="blue" size="sm" />
            </div>
          </div>
        </div>

        <div className={styles.statsColumn}>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <span className={styles.statLabel}>Enrolled Courses</span>
              <div className={styles.statLine}>
                <span className={styles.statValue}>12</span>
                <Badge variant="green" size="sm">+2 this month</Badge>
              </div>
            </div>
            <div className={styles.statIconBlue}><Layers size={20} /></div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <span className={styles.statLabel}>Certificates Earned</span>
              <div className={styles.statLine}>
                <span className={styles.statValue}>4</span>
              </div>
            </div>
            <div className={styles.statIconPurple}><Award size={20} /></div>
          </div>
        </div>

        <div className={styles.aiAdvisorCard}>
          <div className={styles.aiHeader}>
            <div className={styles.aiIconWrapper}><Bot size={22} /></div>
            <div className={styles.aiLabelWrapper}>
               <span className={styles.aiTitle}>AI Growth Advisor</span>
               <span className={styles.aiSubtitle}>Smart Insights</span>
            </div>
          </div>
          <p className={styles.aiText}>
            Based on your recent activity, you&apos;re excelling in React. Let&apos;s analyze your CV to find specific skill gaps for Senior roles.
          </p>
          <Button 
            variant="primary" 
            fullWidth 
            leftIcon={<Zap size={16} />}
            onClick={() => triggerComingSoon('AI Skill Gap Analyzer')}
          >
            Analyze My CV
          </Button>
        </div>
      </div>

      {/* ─── MIDDLE SECTION ─── */}
      <div className={`${styles.middleSection} ${styles.animateIn} ${styles.delay1}`}>
        <div className={styles.mainColumn}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Pick Up Where You Left Off</h3>
            <button className={styles.viewAll} onClick={() => triggerComingSoon('Course Library')}>
              View all <ChevronRight size={16} />
            </button>
          </div>

          <div className={isMobile ? styles.courseGridMobile : styles.activeCoursesGrid}>
            {!isMobile ? (
              <>
                <CourseCardHorizontal 
                  id="c1"
                  title="Advanced Product Design Principles" 
                  category="UI/UX Design"
                  thumbnail="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800"
                  instructorName="Sarah Johnson"
                  instructorAvatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                  rating={4.8}
                  reviewCount={1204}
                  totalHours={24}
                  totalLessons={48}
                  price={0}
                  isEnrolled={true}
                  progress={65}
                />
                <CourseCardHorizontal 
                  id="c2"
                  title="Full-Stack React & Node.js Masterclass" 
                  category="Development"
                  thumbnail="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800"
                  instructorName="David Chen"
                  instructorAvatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                  rating={4.9}
                  reviewCount={850}
                  totalHours={42}
                  totalLessons={96}
                  price={0}
                  isEnrolled={true}
                  progress={32}
                />
              </>
            ) : (
              <>
                <CourseCard 
                  id="c1"
                  title="Advanced Product Design Principles"
                  category="UI/UX Design"
                  thumbnail="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800"
                  instructorName="Sarah Johnson"
                  instructorAvatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                  rating={4.8}
                  reviewCount={1204}
                  price={0}
                  isEnrolled={true}
                  progress={65}
                  totalHours={24}
                  totalLessons={48}
                />
                <CourseCard 
                  id="c2"
                  title="Full-Stack Masterclass"
                  category="Development"
                  thumbnail="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800"
                  instructorName="David Chen"
                  instructorAvatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                  rating={4.9}
                  reviewCount={850}
                  price={0}
                  isEnrolled={true}
                  progress={32}
                  totalHours={42}
                  totalLessons={96}
                />
              </>
            )}
          </div>

          <div className={styles.activitySection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Learning Activity</h3>
              <div className={styles.tabFilters}>
                <span className={styles.activeTab}>Week</span>
                <span onClick={() => triggerComingSoon('Monthly Analytics')}>Month</span>
              </div>
            </div>
            <div className={styles.chartArea}>
               <ActivitySVGChart />
               <div className={styles.chartXLabels}>
                 <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
               </div>
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.vizCard}>
            <div className={styles.vizHeader}>
              <h4 className={styles.vizTitle}>Skill Mastery</h4>
              <MoreHorizontal size={18} className={styles.moreIcon} onClick={() => triggerComingSoon('Skill Insights')} />
            </div>
            <div className={styles.radarWrapper}>
              <SkillRadarChart />
            </div>
          </div>

          <div className={styles.heatmapCard}>
            <div className={styles.vizHeader}>
              <h4 className={styles.vizTitle}>Study Heatmap</h4>
              <span className={styles.heatmapLegend}>Last 30 Days</span>
            </div>
            <div className={styles.heatmapGrid}>
              {heatmapData.map((opacity, i) => (
                <div key={i} className={styles.heatmapSquare} style={{ opacity: opacity }} />
              ))}
            </div>
            <div className={styles.heatmapFooter}>
               <span>Less</span>
               <div className={styles.heatLegendColors}>
                 <div style={{opacity: 0.1}}></div>
                 <div style={{opacity: 0.3}}></div>
                 <div style={{opacity: 0.6}}></div>
                 <div style={{opacity: 1}}></div>
               </div>
               <span>More</span>
            </div>
          </div>

          <div className={styles.paceCard}>
             <div className={styles.paceIconWrapper}><Zap size={16} /></div>
             <div className={styles.paceInfo}>
                <h4 className={styles.paceTitle}>Pace Prediction</h4>
                <p className={styles.paceText}>At your current velocity, you earn your <strong>React Professional Certificate</strong> by <strong>May 15th</strong>.</p>
             </div>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM SECTION ─── */}
      <div className={`${styles.bottomSection} ${styles.animateIn} ${styles.delay2}`}>
        <div className={styles.certListColumn}>
          <h3 className={styles.sectionTitle}>Certificates</h3>
          <div className={styles.certGrid}>
            <div className={styles.certCard}>
               <div className={`${styles.certIconBg} ${styles.purple}`}>
                  <Award size={20} />
               </div>
               <div className={styles.certMeta}>
                  <h4 className={styles.certTitle}>UX Research Fundamentals</h4>
                  <span className={styles.certDate}>Issued: Oct 12, 2023</span>
               </div>
               <div className={styles.certActions}>
                  <button className={styles.certBtn} onClick={() => triggerComingSoon('Certificate Download')}><Download size={14} /> PDF</button>
                  <button className={styles.certBtn} onClick={() => triggerComingSoon('Certificate Sharing')}><Share2 size={14} /> Share</button>
               </div>
            </div>
            <div className={styles.certCard}>
               <div className={`${styles.certIconBg} ${styles.blue}`}>
                  <Award size={20} />
               </div>
               <div className={styles.certMeta}>
                  <h4 className={styles.certTitle}>Figma Advanced Prototyping</h4>
                  <span className={styles.certDate}>Issued: Sep 04, 2023</span>
               </div>
               <div className={styles.certActions}>
                  <button className={styles.certBtn} onClick={() => triggerComingSoon('Certificate Download')}><Download size={14} /> PDF</button>
                  <button className={styles.certBtn} onClick={() => triggerComingSoon('Certificate Sharing')}><Share2 size={14} /> Share</button>
               </div>
            </div>
          </div>
        </div>

        <div className={styles.recommendedColumn}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Recommended for You</h3>
            <button className={styles.viewAll} onClick={() => triggerComingSoon('Course Recommendations')}>
              See all <ArrowUpRight size={16} />
            </button>
          </div>
          <div className={isMobile ? styles.courseGridMobile : styles.recommendedGrid}>
             {!isMobile ? (
                <>
                  <CourseCardHorizontal 
                    id="rec1"
                    title="Design System with Figma" 
                    category="Design"
                    thumbnail="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80"
                    instructorName="Daniel Scott"
                    rating={4.7}
                    reviewCount={320}
                    totalHours={8}
                    totalLessons={24}
                    price={49.99}
                  />
                  <CourseCardHorizontal 
                    id="rec2"
                    title="Microservices architecture" 
                    category="Architecture"
                    thumbnail="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
                    instructorName="Stephen Grider"
                    rating={4.9}
                    reviewCount={2100}
                    totalHours={18}
                    totalLessons={56}
                    price={89.99}
                  />
                </>
             ) : (
                <>
                  <CourseCard 
                    id="rec1"
                    title="Design System with Figma"
                    category="Design"
                    thumbnail="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80"
                    instructorName="Daniel Scott"
                    rating={4.7}
                    reviewCount={320}
                    price={49.99}
                    totalHours={8}
                    totalLessons={24}
                  />
                   <CourseCard 
                    id="rec2"
                    title="Microservices architecture"
                    category="Architecture"
                    thumbnail="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
                    instructorName="Stephen Grider"
                    rating={4.9}
                    reviewCount={2100}
                    price={89.99}
                    totalHours={18}
                    totalLessons={56}
                  />
                </>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── HELPERS (Static SVGs) ─── */

function ActivitySVGChart() {
  return (
    <svg width="100%" height="180" viewBox="0 0 800 200" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3D5AFE" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3D5AFE" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="180" x2="800" y2="180" stroke="#E2E8F0" strokeWidth="1" />
      <line x1="0" y1="120" x2="800" y2="120" stroke="#F1F5F9" strokeWidth="1" />
      <line x1="0" y1="60" x2="800" y2="60" stroke="#F1F5F9" strokeWidth="1" />
      <path d="M0,130 C100,130 150,110 200,120 C250,130 300,160 400,110 C500,60 600,150 700,60 C750,20 800,80 800,80 L800,200 L0,200 Z" fill="url(#chartGradient)" />
      <path d="M0,130 C100,130 150,110 200,120 C250,130 300,160 400,110 C500,60 600,150 700,60 C750,20 800,80 800,80" fill="none" stroke="#3D5AFE" strokeWidth="3" strokeLinecap="round" />
      <circle cx="100" cy="130" r="5" fill="white" stroke="#3D5AFE" strokeWidth="2" />
      <circle cx="200" cy="120" r="5" fill="white" stroke="#3D5AFE" strokeWidth="2" />
      <circle cx="400" cy="110" r="5" fill="white" stroke="#3D5AFE" strokeWidth="2" />
      <circle cx="550" cy="100" r="5" fill="white" stroke="#3D5AFE" strokeWidth="2" />
      <circle cx="700" cy="60" r="5" fill="white" stroke="#3D5AFE" strokeWidth="2" />
    </svg>
  );
}

function SkillRadarChart() {
  return (
    <svg width="240" height="240" viewBox="0 0 240 240">
      {/* Outer Grey boundary circle */}
      <circle cx="120" cy="120" r="100" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
      
      {/* Background Grid Circles */}
      <circle cx="120" cy="120" r="80" fill="none" stroke="#F1F5F9" strokeWidth="1" />
      <circle cx="120" cy="120" r="60" fill="none" stroke="#F1F5F9" strokeWidth="1" />
      <circle cx="120" cy="120" r="40" fill="none" stroke="#F1F5F9" strokeWidth="1" />
      
      {/* Dynamic Skill Polygons */}
      <polygon 
        points="120,40 180,90 200,160 140,200 60,150 40,80" 
        fill="rgba(61, 90, 254, 0.2)" 
        stroke="#3D5AFE" 
        strokeWidth="2.5" 
        strokeLinejoin="round"
      />
      
      {/* Data Points */}
      <circle cx="120" cy="40" r="3" fill="#3D5AFE" />
      <circle cx="180" cy="90" r="3" fill="#3D5AFE" />
      <circle cx="200" cy="160" r="3" fill="#3D5AFE" />
      
      {/* Skill Labels */}
      <text x="120" y="15" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1F2A44">React</text>
      <text x="235" y="125" textAnchor="end" fontSize="11" fontWeight="700" fill="#1F2A44">UI/UX</text>
      <text x="120" y="235" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1F2A44">Mobile Dev</text>
      <text x="10" y="130" textAnchor="start" fontSize="11" fontWeight="700" fill="#1F2A44">AI Tools</text>
    </svg>
  );
}
