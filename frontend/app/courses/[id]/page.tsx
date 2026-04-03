'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  Users,
  Play,
  Check,
  MonitorPlay,
  Trophy,
  Clock,
  ChevronRight,
  Shield,
  ShieldCheck,
  Share2,
  Heart,
  Gift,
  BookOpen,
  File,
  Download,
  Globe,
  Infinity,
} from 'lucide-react';
import {
  FaUserGraduate,
  FaBriefcase,
  FaLaptopCode,
  FaPalette,
  FaReact,
  FaCode,
  FaRocket,
  FaStore,
  FaHandshake,
  FaGraduationCap,
  FaChartLine,
  FaHome,
} from 'react-icons/fa';
import Button from '@/components/ui/Button';
import { SectionAccordion } from '@/components/features/SectionAccordion';
import { InstructorCard } from '@/components/features/InstructorCard';
import { useCart } from '@/context/CartContext';
import styles from './CourseDetail.module.css';

// ─── Icon map for target audience ────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AUDIENCE_ICONS: Record<string, React.ComponentType<any>> = {
  FaUserGraduate,
  FaBriefcase,
  FaLaptopCode,
  FaPalette,
  FaReact,
  FaCode,
  FaRocket,
  FaStore,
  FaHandshake,
  FaGraduationCap,
  FaChartLine,
  FaHome,
};

interface Lesson {
  index: number;
  title: string;
  duration: string;
  isFreePreview?: boolean;
}

interface CurriculumSection {
  title: string;
  lessonCount: number;
  totalDuration: string;
  lessons: Lesson[];
}

interface AudienceItem {
  icon: string;
  title: string;
  description: string;
}

// ─── Simple Markdown-lite Parser ──────────────────────────────────────────────
function renderDescription(text: string) {
  if (!text) return null;
  const blocks = text.split('\n\n');
  return blocks.map((block, i) => {
    if (block.startsWith('> ')) {
      return (
        <blockquote key={i} className={styles.blockquote}>
          &ldquo;{block.replace(/^> /, '')}&rdquo;
        </blockquote>
      );
    }
    if (block.startsWith('### ')) {
      return <h3 key={i} className={styles.subHeading}>{block.replace(/^### /, '')}</h3>;
    }
    if (block.startsWith('- ')) {
      const items = block.split('\n').filter(line => line.startsWith('- '));
      return (
        <ul key={i} className={styles.bulletList}>
          {items.map((item, j) => (
            <li key={j} className={styles.bulletItem}>
              <div className={styles.bulletDot} />
              <span>{item.replace(/^- /, '')}</span>
            </li>
          ))}
        </ul>
      );
    }
    return <p key={i} className={styles.paragraph}>{block}</p>;
  });
}

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idOrSlug } = React.use(params);
  const { addItem, isInCart } = useCart();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [course, setCourse] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEnrolled, setIsEnrolled] = React.useState(false);
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || 'https://upskiill-backend.onrender.com';

        const courseRes = await fetch(`${apiUrl}/courses/${idOrSlug}`);
        if (courseRes.ok) {
          const data = await courseRes.json();
          setCourse(data);

          const meRes = await fetch(`${apiUrl}/auth/me`, {
            credentials: 'include',
          });
          if (meRes.ok) {
            const enrollmentsRes = await fetch(`${apiUrl}/auth/me/enrollments`, {
              credentials: 'include',
            });
            if (enrollmentsRes.ok) {
              const enrollments = await enrollmentsRes.json();
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const enrolled = enrollments.some((e: any) => e.courseId === data.id);
              setIsEnrolled(enrolled);
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch course details', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [idOrSlug]);

  const handleAddToCart = () => {
    if (course) {
      addItem({
        id: course.id,
        title: course.title,
        thumbnail: course.thumbnailUrl || '',
        instructorName: course.instructor?.fullName || 'Instructor',
        price: course.price,
      });
    }
  };

  const discountPct = course?.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  const totalLessons = (course?.curriculum || []).reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc: number, s: any) => acc + (s.lessonCount || 0),
    0
  );

  if (isLoading) {
    return (
      <div className={styles.loadingWrap}>
        <div className={styles.spinner} />
        <p>Loading course details…</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className={styles.loadingWrap}>
        <p>Course not found.</p>
        <Link href="/courses">
          <Button variant="primary">Browse Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {/* ─── HERO BANNER ─────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            {/* Breadcrumbs */}
            <div className={styles.breadcrumbs}>
              <Link href="/courses" className={styles.breadcrumbLink}>Courses</Link>
              <ChevronRight size={14} style={{ opacity: 0.5 }} />
              <Link href={`/courses?category=${course.category}`} className={styles.breadcrumbLink}>
                {course.category}
              </Link>
              <ChevronRight size={14} style={{ opacity: 0.5 }} />
              <span className={styles.breadcrumbCurrent}>{course.title}</span>
            </div>

            {/* Badge row */}
            <div className={styles.heroBadgeRow}>
              <span className={styles.badgeBestseller}>BESTSELLER</span>
              <span className={styles.badgeLevel}>{course.level}</span>
              <span className={styles.badgeCategory}>{course.category}</span>
            </div>

            <h1 className={styles.title}>{course.title}</h1>
            <p className={styles.subtitle}>
              {course.shortDescription || course.description?.substring(0, 160)}
            </p>

            {/* Meta row */}
            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <Star size={16} fill="#F59E0B" color="#F59E0B" />
                <span className={styles.ratingHighlight}>{course.rating || 4.9}</span>
                <span className={styles.metaSmall}>({(course.reviewsCount || 0).toLocaleString()} ratings)</span>
              </div>
              <span className={styles.metaDivider}>·</span>
              <div className={styles.metaItem}>
                <Users size={15} />
                <span>{(course.studentsCount || 0).toLocaleString()} students</span>
              </div>
              <span className={styles.metaDivider}>·</span>
              <div className={styles.metaItem}>
                <Clock size={15} />
                <span>{course.duration || '0h'} total</span>
              </div>
            </div>

            {/* Instructor */}
            <div className={styles.instructorRow}>
              {course.instructor?.avatarUrl && (
                <div className={styles.instructorAvatar}>
                  <Image
                    src={course.instructor.avatarUrl}
                    alt={course.instructor.fullName}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <span className={styles.instructorText}>Created by</span>
              <Link href="#instructor" className={styles.instructorName}>
                {course.instructor?.fullName}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN LAYOUT ─────────────────────────────────────────────────── */}
      <div className={styles.mainContainer}>

        {/* ─── LEFT COLUMN ─────────────────────────────────────────────── */}
        <div className={styles.leftColumn}>

          {/* What you'll learn */}
          <div className={styles.contentBox}>
            <h2 className={styles.sectionTitle}>What you&apos;ll learn</h2>
            <div className={styles.learnGrid}>
              {(course.whatYouWillLearn || []).map((item: string, i: number) => (
                <div key={i} className={styles.checkItem}>
                  <div className={styles.checkIconWrap}>
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Who is this course for */}
          {(course.targetAudience || []).length > 0 && (
            <div className={styles.contentBox}>
              <h2 className={styles.sectionTitle}>Who is this course for?</h2>
              <div className={styles.audienceGrid}>
                {(course.targetAudience as AudienceItem[]).map((item, i) => {
                  const IconComp = AUDIENCE_ICONS[item.icon] || FaUserGraduate;
                  return (
                    <div key={i} className={styles.audienceItem}>
                      <div className={styles.audienceIconBox}>
                        <IconComp size={20} />
                      </div>
                      <div>
                        <p className={styles.audienceTitle}>{item.title}</p>
                        <p className={styles.audienceDesc}>{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Requirements */}
          {(course.requirements || []).length > 0 && (
            <div className={styles.contentBox}>
              <h2 className={styles.sectionTitle}>Requirements &amp; Prerequisites</h2>
              <ul className={styles.requirementsList}>
                {(course.requirements as string[]).map((req, i) => (
                  <li key={i} className={styles.requirementItem}>
                    <div className={styles.reqDot} />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* About this course */}
          <div className={styles.contentBox}>
            <h2 className={styles.sectionTitle}>About this Course</h2>
            <div className={styles.aboutText}>
              {renderDescription(course.description)}
            </div>
          </div>

          {/* Certificate Banner */}
          <div className={styles.certBanner}>
            <div className={styles.certInfo}>
              <div className={styles.certBadge}>
                <Trophy size={14} />
                UPSKIILL CERTIFIED
              </div>
              <h3 className={styles.certTitle}>Earn Your Certificate</h3>
              <p className={styles.certDesc}>
                Complete this course and receive a verified digital certificate you can showcase
                on LinkedIn, add to your resume, or share with employers. Our certificates are
                recognised by leading companies across Africa and globally.
              </p>
              <div className={styles.certActions}>
                <Button variant="primary" size="sm" leftIcon={<Download size={14} />}>
                  Preview Certificate
                </Button>
              </div>
            </div>
            <div className={styles.certVisual}>
              <div className={styles.certCard}>
                <div className={styles.certCardLogo}>
                  <span className={styles.certCardLogoText}>Upskiill</span>
                </div>
                <div className={styles.certCardLine} />
                <p className={styles.certCardLabel}>Certificate of Completion</p>
                <p className={styles.certCardName}>This is to certify that</p>
                <p className={styles.certCardTitle}>{course.title}</p>
                <div className={styles.certCardSeal}>✦</div>
              </div>
            </div>
          </div>

          {/* Course Curriculum */}
          <div className={styles.contentBox}>
            <div className={styles.curriculumHeader}>
              <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Course Curriculum</h2>
              <div className={styles.curriculumStats}>
                <BookOpen size={14} />
                <span>{(course.curriculum || []).length} sections · {totalLessons} lessons · {course.duration}</span>
              </div>
            </div>
            <div className={styles.curriculumList}>
              {(course.curriculum || []).map((section: CurriculumSection, i: number) => (
                <SectionAccordion
                  key={i}
                  title={section.title}
                  lessonCount={section.lessonCount}
                  totalDuration={section.totalDuration}
                  defaultOpen={i === 0}
                  lessons={section.lessons}
                />
              ))}
            </div>
          </div>

          {/* Your Instructor */}
          <div id="instructor" className={styles.contentBox}>
            <h2 className={styles.sectionTitle}>Your Instructor</h2>
            <InstructorCard
              id={course.instructorId}
              name={course.instructor?.fullName}
              avatar={
                course.instructor?.avatarUrl ||
                'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop'
              }
              professionalTitle={`Expert Instructor at Upskiill · ${course.category} Specialist`}
              rating={4.9}
              studentsCount={course.studentsCount}
              coursesCount={3}
              bioSnippet={`Hi, I'm ${course.instructor?.fullName}. I've spent years mastering ${course.category} and now I'm passionate about making that knowledge accessible to everyone. In this course, I'll guide you step-by-step through real-world projects and industry-proven techniques. My teaching style is practical, direct, and built around getting you results as fast as possible.`}
            />
          </div>

        </div>

        {/* ─── RIGHT COLUMN (Sticky Card) ──────────────────────────────── */}
        <div className={styles.rightColumn}>
          <div className={styles.stickyCard}>

            {/* Video Preview */}
            <div className={styles.cardVideo}>
              <div className={styles.playBtnWrapper}>
                <Play size={22} fill="currentColor" strokeWidth={0} style={{ marginLeft: '3px' }} />
              </div>
              <span className={styles.cardVideoLabel}>Preview this course</span>
              <Image
                src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400&auto=format&fit=crop'}
                alt="Course Preview"
                fill
                style={{ objectFit: 'cover', opacity: 0.75 }}
              />
            </div>

            <div className={styles.cardBody}>

              {/* Price */}
              <div className={styles.priceRow}>
                <span className={styles.price}>${course.price}</span>
                {course.originalPrice && (
                  <span className={styles.originalPrice}>${course.originalPrice}</span>
                )}
                {discountPct > 0 && (
                  <span className={styles.discountBadge}>{discountPct}% OFF</span>
                )}
              </div>

              {/* Timer nudge */}
              <p className={styles.timerNudge}>
                <Shield size={13} style={{ color: '#EF4444' }} />
                <strong>2 days</strong> left at this price!
              </p>

              {/* CTA Buttons */}
              <div className={styles.actionWrapper}>
                {isEnrolled ? (
                  <Link href={`/learn/${course.id}`} style={{ width: '100%', display: 'block' }}>
                    <Button variant="primary" size="lg" fullWidth>Go to Course</Button>
                  </Link>
                ) : isInCart(course.id) ? (
                  <Link href="/cart" style={{ width: '100%', display: 'block' }}>
                    <Button variant="outline" size="lg" fullWidth>Go to Cart</Button>
                  </Link>
                ) : (
                  <>
                    <Button variant="primary" size="lg" fullWidth onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      fullWidth
                      onClick={handleAddToCart}
                    >
                      Buy Now
                    </Button>
                  </>
                )}
              </div>

              <div className={styles.guaranteeBox}>
                <div className={styles.guaranteeIcon}>
                  <ShieldCheck size={20} />
                </div>
                <div className={styles.guaranteeText}>
                  <strong>100% satisfaction guarantee</strong>
                  <span>30-day money back guarantee by the Upskiill team.</span>
                </div>
              </div>

              {/* Share row */}
              <div className={styles.shareRow}>
                <button className={styles.shareBtn}>
                  <Share2 size={15} /> Share
                </button>
                <button
                  className={styles.shareBtn}
                  onClick={() => setIsWishlisted((w) => !w)}
                  style={{ color: isWishlisted ? '#EF4444' : undefined }}
                >
                  <Heart size={15} fill={isWishlisted ? '#EF4444' : 'none'} /> Wishlist
                </button>
                <button className={styles.shareBtn}>
                  <Gift size={15} /> Gift
                </button>
              </div>

              <div className={styles.divider} />

              {/* This course includes */}
              <h4 className={styles.includesTitle}>This course includes:</h4>
              <div className={styles.includesList}>
                <div className={styles.includeItem}>
                  <MonitorPlay size={16} className={styles.includeIcon} />
                  <span>{course.duration} on-demand video</span>
                </div>
                <div className={styles.includeItem}>
                  <File size={16} className={styles.includeIcon} />
                  <span>{totalLessons} lessons &amp; resources</span>
                </div>
                <div className={styles.includeItem}>
                  <Globe size={16} className={styles.includeIcon} />
                  <span>Full lifetime access</span>
                </div>
                <div className={styles.includeItem}>
                  <Infinity size={16} className={styles.includeIcon} />
                  <span>Access on mobile &amp; desktop</span>
                </div>
                <div className={styles.includeItem}>
                  <Trophy size={16} className={styles.includeIcon} />
                  <span>Certificate of completion</span>
                </div>
                <div className={styles.includeItem}>
                  <Download size={16} className={styles.includeIcon} />
                  <span>Downloadable resources</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
