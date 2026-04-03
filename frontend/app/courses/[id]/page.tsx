'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Star, Users, Play, Check, 
  MonitorPlay, FileText, Download, Trophy, Clock, 
  ShieldCheck, Target
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { SectionAccordion } from '@/components/features/SectionAccordion';
import { InstructorCard } from '@/components/features/InstructorCard';
import styles from './CourseDetail.module.css';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [course, setCourse] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCourse = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/courses/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setCourse(data);
        }
      } catch (err) {
        console.error('Failed to fetch course details', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [params.id]);

  if (isLoading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>Loading course details...</div>;
  }

  if (!course) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>Course not found.</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      {/* ─── HERO BANNER ─── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            
            <div className={styles.breadcrumbs}>
              <Link href="/courses" className={styles.breadcrumbLink}>{course.category}</Link>
              <span style={{ margin: '0 8px' }}>›</span>
              <span style={{ color: 'white' }}>{course.title}</span>
            </div>

            <h1 className={styles.title}>{course.title}</h1>
            <p className={styles.subtitle}>
              {course.shortDescription || course.description.substring(0, 150)}
            </p>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <Star size={16} fill="#F59E0B" color="#F59E0B" />
                <span className={styles.ratingHighlight}>{course.rating || 4.9}</span>
                <span>({course.reviewsCount || 0} ratings)</span>
              </div>
              <span>|</span>
              <div className={styles.metaItem}>
                <Users size={16} />
                <span>{course.studentsCount || 0} students enrolled</span>
              </div>
              <span>|</span>
              <div className={styles.metaItem}>
                <Clock size={16} />
                <span>{course.duration || '0h'}</span>
              </div>
            </div>

            <div className={styles.instructorRow}>
              <span className={styles.instructorText}>Created by</span>
              <Link href="#instructor" className={styles.instructorName}>{course.instructor?.fullName}</Link>
            </div>

          </div>
        </div>
      </section>

      {/* ─── MAIN LAYOUT ─── */}
      <div className={styles.mainContainer}>
        
        {/* ─── LEFT COLUMN ─── */}
        <div className={styles.leftColumn}>
          
          {/* What you'll learn */}
          <div className={styles.contentBox}>
            <h2 className={styles.sectionTitle}>What you&apos;ll learn</h2>
            <div className={styles.learnGrid}>
              {(course.whatYouWillLearn || []).map((item: string, i: number) => (
                <div key={i} className={styles.checkItem}>
                  <Check size={18} className={styles.checkIcon} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience (Keeping static for MVP unless provided) */}
          <div className={styles.contentBox}>
            <h2 className={styles.sectionTitle}>Who is this course for?</h2>
            <div className={styles.audienceGrid}>
              <div className={styles.audienceItem}>
                <div className={styles.audienceIconBox}><Target size={20} /></div>
                <div>
                  <h3 className={styles.audienceTitle}>Professionals</h3>
                  <p className={styles.audienceDesc}>Looking to level up their skills in {course.category}.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className={styles.contentBox}>
            <h2 className={styles.sectionTitle}>Requirements & Prerequisites</h2>
            <div className={styles.aboutList}>
              {(course.requirements || []).map((req: string, idx: number) => (
                <li key={idx}>{req}</li>
              ))}
            </div>
          </div>

          {/* About This Course */}
          <div className={styles.contentBox}>
            <h2 className={styles.sectionTitle}>About this Course</h2>
            <div className={styles.aboutText}>
              <p>{course.description}</p>
            </div>
          </div>

          {/* Certificate Banner */}
          <div className={styles.certBanner}>
            <div className={styles.certInfo}>
              <span className={styles.certBadge}><Trophy size={14} /> Official Credential</span>
              <h2 className={styles.certTitle}>Earn Your Certificate</h2>
              <p className={styles.certDesc}>Upon successfully completing the curriculum, you will receive a verifiable digital certificate. Add it to your LinkedIn profile or resume to demonstrate your advanced design expertise to future employers.</p>
            </div>
            <div className={styles.certVisual}>
              <Image src="https://images.unsplash.com/photo-1589330694653-efa648bc38fc?q=80&w=300&auto=format&fit=crop" width={220} height={150} alt="Certificate UI" style={{ borderRadius: '4px', border: '1px solid #E2E8F0' }} />
            </div>
          </div>

          {/* Curriculum */}
          <div className={styles.contentBox}>
            <div className={styles.curriculumHeader}>
              <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Course Curriculum</h2>
              <span className={styles.curriculumStats}>12 sections • 145 lessons • 12h 30m total length</span>
            </div>
            <div className={styles.curriculumList}>
              <SectionAccordion 
                title="Foundations of UX Strategy"
                lessonCount={5}
                totalDuration="45m"
                defaultOpen
                lessons={[
                  { index: 1, title: 'Welcome to the Course!', duration: '4:15', isFreePreview: true },
                  { index: 2, title: 'What is UX Strategy?', duration: '12:30', isFreePreview: true },
                  { index: 3, title: 'The Double Diamond Process', duration: '15:45' },
                  { index: 4, title: 'Understanding Business Goals vs User Needs', duration: '12:30' }
                ]}
              />
              <SectionAccordion 
                title="User Research & Empathy"
                lessonCount={12}
                totalDuration="1h 15m"
                lessons={[]}
              />
              <SectionAccordion 
                title="Information Architecture"
                lessonCount={8}
                totalDuration="55m"
                lessons={[]}
              />
            </div>
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <Button variant="ghost">View All 12 Sections</Button>
            </div>
          </div>

          {/* Instructor section */}
          <div id="instructor" className={styles.contentBox}>
            <h2 className={styles.sectionTitle}>Your Instructor</h2>
            <InstructorCard 
              id={course.instructorId}
              name={course.instructor?.fullName}
              avatar={course.instructor?.avatarUrl || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop"}
              professionalTitle="Instructor at Upskiill"
              rating={4.9}
              studentsCount={course.studentsCount}
              coursesCount={1}
              bioSnippet={`Hi, I'm ${course.instructor?.fullName}. I am passionate about teaching and helping students achieve their career goals.`}
            />
          </div>

        </div>

        {/* ─── RIGHT COLUMN (Sticky Card) ─── */}
        <div className={styles.rightColumn}>
          <div className={styles.stickyCard}>
            
            {/* Promo Video Thumbnail */}
            <div className={styles.cardVideo}>
              <div className={styles.playBtnWrapper}>
                <Play size={24} fill="currentColor" strokeWidth={0} style={{ marginLeft: '4px' }} />
              </div>
              <span className={styles.cardVideoLabel}>Preview this course</span>
              <Image 
                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400&auto=format&fit=crop" 
                alt="Course Promo" 
                fill 
                style={{ objectFit: 'cover', opacity: 0.8 }} 
              />
            </div>

            {/* Checkout Body */}
            <div className={styles.cardBody}>
              <div className={styles.priceRow}>
                <span className={styles.price}>${course.price}</span>
                {course.originalPrice && <span className={styles.originalPrice}>${course.originalPrice}</span>}
                {course.originalPrice && <span className={styles.discountBadge}>{Math.round((1 - course.price / course.originalPrice) * 100)}% OFF</span>}
              </div>

              <div className={styles.actionWrapper}>
                <Button variant="primary" size="lg" fullWidth>Enroll Now</Button>
                <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px', color: '#64748B' }}>
                  30-Day Money-Back Guarantee
                </div>
              </div>

              <h4 className={styles.includesTitle}>This course includes:</h4>
              <div className={styles.includesList}>
                <div className={styles.includeItem}>
                  <MonitorPlay size={16} className={styles.includeIcon} />
                  <span>12.5 hours on-demand video</span>
                </div>
                <div className={styles.includeItem}>
                  <FileText size={16} className={styles.includeIcon} />
                  <span>45 downloadable resources</span>
                </div>
                <div className={styles.includeItem}>
                  <Download size={16} className={styles.includeIcon} />
                  <span>Full lifetime access</span>
                </div>
                <div className={styles.includeItem}>
                  <Trophy size={16} className={styles.includeIcon} />
                  <span>Certificate of completion</span>
                </div>
              </div>

              {/* Guarantee Box */}
              <div className={styles.guaranteeBox}>
                <ShieldCheck size={24} className={styles.guaranteeIcon} />
                <p className={styles.guaranteeText}>
                  <strong>100% Satisfaction Guarantee.</strong> Not exactly what you expected? Get a full refund within 30 days. No questions asked.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
