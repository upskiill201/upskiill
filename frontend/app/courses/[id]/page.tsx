'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Star, Users, ChevronRight, Play, Check, 
  MonitorPlay, FileText, Download, Trophy, Clock, 
  ShieldCheck, Layout, Target, UserCheck, Briefcase
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { SectionAccordion } from '@/components/features/SectionAccordion';
import { InstructorCard } from '@/components/features/InstructorCard';
import styles from './CourseDetail.module.css';

export default function CourseDetailPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* ─── HERO BANNER ─── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            
            <div className={styles.breadcrumbs}>
              <Link href="/courses" className={styles.breadcrumbLink}>Design</Link>
              <span style={{ margin: '0 8px' }}>›</span>
              <Link href="/courses?cat=ui-design" className={styles.breadcrumbLink}>User Experience Design</Link>
              <span style={{ margin: '0 8px' }}>›</span>
              <span style={{ color: 'white' }}>UI/UX Strategy</span>
            </div>

            <h1 className={styles.title}>Advanced Product Design & UX Strategy</h1>
            <p className={styles.subtitle}>
              Master the complete design lifecycle, from user research and wireframing to high-fidelity prototyping. Learn the exact frameworks used by senior designers at top tech companies.
            </p>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <Star size={16} fill="#F59E0B" color="#F59E0B" />
                <span className={styles.ratingHighlight}>4.9</span>
                <span>(3,254 ratings)</span>
              </div>
              <span>|</span>
              <div className={styles.metaItem}>
                <Users size={16} />
                <span>15,400 students enrolled</span>
              </div>
              <span>|</span>
              <div className={styles.metaItem}>
                <Clock size={16} />
                <span>Last updated Oct 2025</span>
              </div>
            </div>

            <div className={styles.instructorRow}>
              <span className={styles.instructorText}>Created by</span>
              <Link href="#instructor" className={styles.instructorName}>Alex Rivera, Product Design Lead</Link>
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
            <h2 className={styles.sectionTitle}>What you'll learn</h2>
            <div className={styles.learnGrid}>
              {[
                "Conduct deep user research and translate insights into actionable product features.",
                "Master Auto-Layout, Components, and Design Systems in Figma.",
                "Build clickable, high-fidelity prototypes for stakeholder testing.",
                "Understand behavioral psychology and how it drives user conversions.",
                "Create comprehensive design handoff documents for engineering teams.",
                "Prepare a world-class portfolio case study to land senior roles."
              ].map((item, i) => (
                <div key={i} className={styles.checkItem}>
                  <Check size={18} className={styles.checkIcon} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div className={styles.contentBox}>
            <h2 className={styles.sectionTitle}>Who is this course for?</h2>
            <div className={styles.audienceGrid}>
              <div className={styles.audienceItem}>
                <div className={styles.audienceIconBox}><Layout size={20} /></div>
                <div>
                  <h3 className={styles.audienceTitle}>UI/UX Designers</h3>
                  <p className={styles.audienceDesc}>Looking to level up from mid-level to senior by mastering advanced strategy.</p>
                </div>
              </div>
              <div className={styles.audienceItem}>
                <div className={styles.audienceIconBox}><Target size={20} /></div>
                <div>
                  <h3 className={styles.audienceTitle}>Product Managers</h3>
                  <p className={styles.audienceDesc}>Who want to better understand the design process and communicate with designers.</p>
                </div>
              </div>
              <div className={styles.audienceItem}>
                <div className={styles.audienceIconBox}><UserCheck size={20} /></div>
                <div>
                  <h3 className={styles.audienceTitle}>Frontend Developers</h3>
                  <p className={styles.audienceDesc}>Seeking to improve their UX intuition and build better-looking interfaces.</p>
                </div>
              </div>
              <div className={styles.audienceItem}>
                <div className={styles.audienceIconBox}><Briefcase size={20} /></div>
                <div>
                  <h3 className={styles.audienceTitle}>Entrepreneurs</h3>
                  <p className={styles.audienceDesc}>Building their own startups who need to design high-converting MVPs themselves.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className={styles.contentBox}>
            <h2 className={styles.sectionTitle}>Requirements & Prerequisites</h2>
            <div className={styles.aboutList}>
              <li>No prior coding experience required.</li>
              <li>A Mac or PC with an internet connection.</li>
              <li>Basic familiarity with Figma or similar design tools is helpful, but not mandatory.</li>
              <li>A willingness to learn and apply new concepts to real-world projects.</li>
            </div>
          </div>

          {/* About This Course */}
          <div className={styles.contentBox}>
            <h2 className={styles.sectionTitle}>About this Course</h2>
            <div className={styles.aboutText}>
              <p>Welcome to the most comprehensive course on Product Design and UX Strategy available online. This isn't just another tutorial on how to use software. It's a deep-dive into the mindset, frameworks, and execution strategies used by the world's most successful tech companies.</p>
              
              <blockquote className={styles.blockquote}>
                "Great design is not just what it looks like and feels like. Design is how it works." — We've built this entire curriculum around this fundamental truth.
              </blockquote>
              
              <p>By the end of this course, you will have built 3 real-world projects from scratch. You will know how to take any abstract idea, break it down into user flows, conceptualize the architecture, design the UI, and build interactive prototypes that impress stakeholders and engineers alike.</p>
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

          {/* Instructor section using the component we built */}
          <div id="instructor" className={styles.contentBox}>
            <h2 className={styles.sectionTitle}>Your Instructor</h2>
            <InstructorCard 
              id="alex"
              name="Alex Rivera"
              avatar="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop"
              professionalTitle="Product Design Lead at Meta"
              rating={4.9}
              studentsCount={154000}
              coursesCount={4}
              bioSnippet="Alex is a seasoned product designer with 10+ years of experience leading teams at top Silicon Valley firms. He specializes in creating scalable design systems and bridging the gap between design and engineering."
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
                <span className={styles.price}>$499</span>
                <span className={styles.originalPrice}>$799</span>
                <span className={styles.discountBadge}>38% OFF</span>
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
