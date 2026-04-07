'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Play, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Award,
  Zap,
  Target,
  BarChart2,
  BrainCircuit,
  MessageSquareDiff,
  CheckCircle2,
  XCircle,
  Calculator,
  ArrowRight
} from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from './Teach.module.css';

const STATS = [
  { value: '80M', label: 'Students' },
  { value: '75+', label: 'Languages' },
  { value: '1.1B', label: 'Enrollments' },
  { value: '180+', label: 'Countries' },
  { value: '17,200+', label: 'Enterprise customers' }
];

const VALUE_PROPS = [
  {
    icon: <Play size={32} />,
    title: 'Teach your way',
    desc: 'Publish the course you want, in the way you want, and always have control of your own content.'
  },
  {
    icon: <BookOpen size={32} />,
    title: 'Inspire learners',
    desc: 'Teach what you know and help learners explore their interests, gain new skills, and advance their careers.'
  },
  {
    icon: <TrendingUp size={32} />,
    title: 'Get rewarded',
    desc: 'Expand your professional network, build your expertise, and earn an industry-leading 90% revenue share.'
  }
];

const ADVANTAGES = [
  {
    icon: <BrainCircuit size={28} />,
    title: 'AI Curriculum Co-Pilot',
    desc: 'Never stare at a blank page. Our AI Assistant helps you instantly outline your course, generate quizzes, and identify knowledge gaps based on real-time market demand.'
  },
  {
    icon: <BarChart2 size={28} />,
    title: 'Deep Behavioral Analytics',
    desc: 'Move beyond basic view counts. Track exact lesson drop-off rates, video engagement heatmaps, and personalized student learning funnels to perfect your content.'
  },
  {
    icon: <MessageSquareDiff size={28} />,
    title: 'At-Risk Intervention System',
    desc: 'Stop churn before it happens. Our platform automatically flags students losing momentum, allowing you to instantly message them and offer targeted support.'
  }
];

const STEPS = [
  {
    id: 'plan',
    tabName: 'Plan your curriculum',
    title: 'Plan your curriculum',
    desc: 'You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool.\n\nThe way that you teach — what you bring to it — is up to you.',
    help: 'We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized.',
    image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80',
  },
  {
    id: 'record',
    tabName: 'Record your video',
    title: 'Record your video',
    desc: 'Use basic tools like a smartphone or a DSLR camera. Add a good microphone and you’re ready to start.\n\nIf you don’t like being on camera, just capture your screen. Either way, we recommend two hours or more of video for a paid course.',
    help: 'Our support team is available to help you throughout the process and provide feedback on test videos.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
  },
  {
    id: 'launch',
    tabName: 'Launch your course',
    title: 'Launch your course',
    desc: 'Gather your first ratings and reviews by promoting your course through social media and your professional networks.\n\nYour course will be discoverable in our marketplace where you earn revenue from each paid enrollment.',
    help: 'Our custom coupon tool lets you offer enrollment incentives while our global promotions drive traffic to courses. There’s even more opportunity for courses chosen for Upskiill Business.',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80',
  }
];

export default function TeachPage() {
  const [activeStep, setActiveStep] = useState(0);
  
  // Earnings Calculator State
  const [studentsStr, setStudentsStr] = useState('500');
  const [priceStr, setPriceStr] = useState('49');
  
  const students = parseInt(studentsStr) || 0;
  const price = parseInt(priceStr) || 0;
  // Upskiill gives 50-70% rev share; using 60% average for the calculator
  const earnings = students * price * 0.60; 

  return (
    <div className={styles.container}>
      
      {/* ─── HERO SECTION ─── */}
      <section className={styles.heroSection}>
        <div className={styles.heroBgGlow} />
        <div className={styles.heroContent}>
          <div className={styles.badgeLabel}>For Instructors</div>
          <h1 className={styles.heroTitle}>Come teach with us</h1>
          <p className={styles.heroSub}>
            Become an instructor and change lives — including your own. Publish premium learning experiences on a platform that actively scales your success.
          </p>
          <div className={styles.heroActions}>
            <Link href="/instructor/signup">
              <Button size="lg" variant="primary" className={styles.btnPulse}>Get Started</Button>
            </Link>
          </div>
        </div>
        <div className={`${styles.heroImageWrapper} ${styles.slideInRight}`}>
          <div className={styles.heroImageContainer}>
            <Image 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&q=80"
              alt="Instructor teaching"
              fill
              className={styles.heroImage}
              priority
            />
          </div>
          <div className={styles.floatingCard}>
            <div className={styles.fcIcon}><Award size={24} /></div>
            <div>
              <p className={styles.fcTitle}>Global Reach</p>
              <p className={styles.fcSub}>Top 1% Instructors earn over $100k</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REASONS TO START ─── */}
      <section className={styles.reasonsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>So many reasons to start</h2>
        </div>
        <div className={styles.reasonsGrid}>
          {VALUE_PROPS.map((prop, i) => (
            <div key={i} className={styles.reasonCard} style={{ animationDelay: `${i * 0.15}s` }}>
              <div className={styles.reasonIconWrapper}>
                {prop.icon}
              </div>
              <h3 className={styles.reasonTitle}>{prop.title}</h3>
              <p className={styles.reasonDesc}>{prop.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── GLOBAL STATS PARALLAX ─── */}
      <section className={styles.statsSection}>
        <div className={styles.statsBgWrap}>
           <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80" fill alt="Scale" className={styles.statsBgImage} />
           <div className={styles.statsOverlay} />
        </div>
        <div className={styles.statsInner}>
          {STATS.map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── THE UPSKIILL ADVANTAGE (STATE-OF-THE-ART) ─── */}
      <section className={styles.advantageSection}>
        <div className={styles.advantageContainer}>
          <div className={styles.advantageTextCol}>
            <div className={styles.premiumBadge}><Zap size={14} /> The Next-Gen Advantage</div>
            <h2 className={styles.advantageTitle}>We solved the problems other platforms ignored.</h2>
            <p className={styles.advantageSub}>
              Unlike traditional marketplaces where your course gets lost in an algorithm, Upskiill gives you state-of-the-art tools to actively monitor, assist, and retain your students through personalized learning.
            </p>
            
            <div className={styles.advantageList}>
              {ADVANTAGES.map((adv, i) => (
                <div key={i} className={styles.advItem}>
                  <div className={styles.advIconBox}>{adv.icon}</div>
                  <div className={styles.advContent}>
                    <h4 className={styles.advTitle}>{adv.title}</h4>
                    <p className={styles.advDesc}>{adv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.advantageImageCol}>
            <div className={styles.mainAdvGraphic}>
               <Image 
                 src="/dashboard-concept.jpg"
                 alt="Our real analytics dashboard"
                 fill
                 className={styles.advImgMain}
               />
               <div className={styles.advImgOverlay} />
            </div>

            <div className={`${styles.advFloatCard} ${styles.advFloat1}`}>
              <div className={styles.advRiskHeader}>
                <Target size={16} color="#F59E0B" />
                <span>Student Action Required</span>
              </div>
              <div className={styles.advRiskBody}>
                <div className={styles.advRiskAvatar} />
                <div>
                  <div className={styles.advRiskName}>Sarah Jenkins</div>
                  <div className={styles.advRiskStatus}>Slowing progress (14 days)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PLATFORM COMPARISON MATRIX ─── */}
      <section className={styles.compareSection}>
         <div className={styles.compareInner}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Why Instructors are Switching</h2>
              <p className={styles.sectionSubTitle}>Stop giving up 50% of your earnings to platforms that offer bad analytics.</p>
            </div>
            
            <div className={styles.compareTableWrapper}>
               <table className={styles.compareTable}>
                 <thead>
                   <tr>
                     <th>Features</th>
                     <th className={styles.colThem}>Traditional Platforms</th>
                     <th className={styles.colUs}>
                       <Image src="/logo.png" alt="Upskiill" width={100} height={30} style={{width:'auto',height:'20px'}} />
                     </th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>Revenue Share</td>
                     <td className={styles.tdThem}>37% – 50%</td>
                     <td className={styles.tdUs}><strong>50% - 70%</strong> Base Share</td>
                   </tr>
                   <tr>
                     <td>Course Outlining</td>
                     <td className={styles.tdThem}>Manual / Blank Page</td>
                     <td className={styles.tdUs}><CheckCircle2 size={18} className={styles.checkIcon}/> AI Curriculum Co-Pilot</td>
                   </tr>
                   <tr>
                     <td>Student Analytics</td>
                     <td className={styles.tdThem}>Basic views & revenue</td>
                     <td className={styles.tdUs}><CheckCircle2 size={18} className={styles.checkIcon}/> Heatmaps & Drop-off Tracking</td>
                   </tr>
                   <tr>
                     <td>Engagement Intervention</td>
                     <td className={styles.tdThem}><XCircle size={18} className={styles.xIcon}/> None</td>
                     <td className={styles.tdUs}><CheckCircle2 size={18} className={styles.checkIcon}/> Automatic At-Risk Flags</td>
                   </tr>
                   <tr>
                     <td>Payout Speed</td>
                     <td className={styles.tdThem}>60 – 90 days</td>
                     <td className={styles.tdUs}><CheckCircle2 size={18} className={styles.checkIcon}/> 30 - 60 & Mobile Money Support</td>
                   </tr>
                 </tbody>
               </table>
            </div>
         </div>
      </section>

      {/* ─── EARNINGS ESTIMATOR (INTERACTIVE) ─── */}
      <section className={styles.estimatorSection}>
        <div className={styles.estimatorInner}>
          <div className={styles.estTextCol}>
            <Calculator size={48} className={styles.estIcon} />
            <h2 className={styles.advantageTitle}>Calculate Your Potential</h2>
            <p className={styles.advantageSub}>
              We believe creators should keep what they earn. By retaining a competitive 50%-70% of gross earnings, securely view exactly what you could make on your next launch.
            </p>
            <div className={styles.estFact}>
               <div className={styles.estFactIcon}><ArrowRight size={16}/></div>
               <span><strong>No hidden fees</strong> — we only succeed when you do.</span>
            </div>
          </div>
          
          <div className={styles.estCalcCol}>
             <div className={styles.calcBox}>
                
                <div className={styles.calcControl}>
                  <div className={styles.calcLabelRow}>
                    <span>Expected Students</span>
                    <span className={styles.calcVal}>{studentsStr}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" max="10000" step="10"
                    value={studentsStr} 
                    onChange={e => setStudentsStr(e.target.value)} 
                    className={styles.rangeSlider} 
                  />
                </div>

                <div className={styles.calcControl}>
                  <div className={styles.calcLabelRow}>
                    <span>Course Price ($)</span>
                    <span className={styles.calcVal}>${priceStr}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" max="500" step="1"
                    value={priceStr} 
                    onChange={e => setPriceStr(e.target.value)} 
                    className={styles.rangeSlider} 
                  />
                </div>

                <div className={styles.calcResult}>
                  <div className={styles.resultLabel}>Estimated Earnings (Avg 60% Share)</div>
                  <div className={styles.resultValue}>
                    ${earnings.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                  <p className={styles.resultNote}>Traditional platforms could tax up to 63% on promotional sales.</p>
                </div>

                <Link href="/instructor/signup" style={{width: '100%'}}>
                  <Button variant="primary" style={{width: '100%', height: '52px', fontSize: '16px'}}>Start Earning Now</Button>
                </Link>

             </div>
          </div>
        </div>
      </section>

      {/* ─── HOW TO BEGIN (SLIDER/TAB SECTION) ─── */}
      <section className={styles.howToSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>How to begin</h2>
          <p className={styles.sectionSubTitle}>We make the path from idea to first payout as smooth as possible.</p>
        </div>
        
        <div className={styles.tabsContainer}>
          {STEPS.map((step, i) => (
            <button 
              key={step.id}
              className={`${styles.tabBtn} ${activeStep === i ? styles.tabActive : ''}`}
              onClick={() => setActiveStep(i)}
            >
              {step.tabName}
            </button>
          ))}
        </div>

        <div className={styles.stepContentGrid}>
          <div className={styles.stepTextCol}>
            <div className={styles.stepTextContent} key={activeStep}>
              <h3 className={styles.stepTitle}>{STEPS[activeStep].title}</h3>
              {STEPS[activeStep].desc.split('\n\n').map((p, i) => (
                <p key={i} className={styles.stepDesc}>{p}</p>
              ))}
              
              <div className={styles.helpBox}>
                <h4 className={styles.helpBoxTitle}>How we help you</h4>
                <p className={styles.helpBoxDesc}>{STEPS[activeStep].help}</p>
              </div>
            </div>
          </div>
          
          <div className={styles.stepImageCol}>
            <div className={styles.stepImageWrapper} key={`img-${activeStep}`}>
              <Image 
                src={STEPS[activeStep].image}
                alt={STEPS[activeStep].title}
                fill
                className={styles.stepImage}
              />
              <div className={styles.stepImageOverlay} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SUPPORT SECTION ─── */}
      <section className={styles.supportSection}>
        <div className={styles.supportImageCol}>
           <Image 
             src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80"
             alt="Support Team"
             fill
             className={styles.supportImage}
           />
           <div className={styles.supportImageOverlay} />
        </div>
        <div className={styles.supportTextCol}>
          <div className={styles.premiumBadge}><Users size={14} /> Dedicated Success Team</div>
          <h2 className={styles.advantageTitle} style={{color: 'white'}}>You won&apos;t have to do it alone</h2>
          <p className={styles.supportDesc}>
            Our Instructor Support Team is here to answer your questions and review your test video, while our Teaching Center gives you plenty of resources to help you through the process. 
          </p>
          <p className={styles.supportDesc}>
            Plus, get the support of experienced instructors in our globally connected online community.
          </p>
          <div className={styles.supportActions}>
            <Link href="/instructor/signup">
              <Button variant="outline" size="lg" style={{borderColor:'white', color:'white'}}>Join the Community</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBgAnim} />
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Become an instructor today</h2>
          <p className={styles.ctaSub}>Join one of the world&apos;s most advanced and fastest growing online learning marketplaces.</p>
          <Link href="/instructor/signup">
            <Button size="lg" variant="primary" className={styles.btnPulse}>Get Started Now</Button>
          </Link>
        </div>
      </section>
      
    </div>
  );
}
