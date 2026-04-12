'use client';

import { motion } from 'framer-motion';
import { Rocket, Cpu, Store, TrendingUp, CheckCircle } from 'lucide-react';
import styles from './TimelineSection.module.css';

const PHASES = [
  {
    phase: "MVP",
    timeline: "Month 3",
    title: "Core Learning Experience",
    description: "Course player, progress tracking, AI tutor, and basic analytics.",
    features: ["Video lessons", "Progress tracking", "AI tutor beta", "Basic certificates"]
  },
  {
    phase: "Growth",
    timeline: "Month 6",
    title: "AI & Engagement",
    description: "Skill gap analyzer, personalized paths, XP system, and community features.",
    features: ["Skill analyzer", "Learning paths", "XP & badges", "Study groups"]
  },
  {
    phase: "Scale",
    timeline: "Month 9",
    title: "Marketplace",
    description: "Freelance marketplace, instructor tools, and payment integration.",
    features: ["Marketplace", "Instructor dashboard", "Payments", "Analytics"]
  },
  {
    phase: "Expand",
    timeline: "Month 12",
    title: "Scale & Localization",
    description: "Mobile apps, offline mode, local languages, and new markets.",
    features: ["Mobile apps", "Offline lite mode", "Multi-language", "New regions"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const getPhaseIcon = (phase: string) => {
  switch (phase) {
    case "MVP": return <Rocket size={24} />;
    case "Growth": return <Cpu size={24} />;
    case "Scale": return <Store size={24} />;
    case "Expand": return <TrendingUp size={24} />;
    default: return <CheckCircle size={24} />;
  }
};

export default function TimelineSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.title}>Our Roadmap</h2>
          <p className={styles.subtitle}>
            Here&apos;s what we&apos;re building and when you can expect it.
          </p>
        </motion.div>

        <motion.div 
          className={styles.timeline}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {PHASES.map((item, index) => (
            <motion.div 
              key={index}
              className={styles.phaseCard}
              variants={itemVariants}
            >
              <div className={styles.timelineLine}>
                <div className={styles.phaseIcon}>
                  {getPhaseIcon(item.phase)}
                </div>
                {index < PHASES.length - 1 && <div className={styles.connector} />}
              </div>
              
              <div className={styles.phaseContent}>
                <div className={styles.phaseMeta}>
                  <span className={styles.phaseTag}>{item.phase}</span>
                  <span className={styles.timelineLabel}>{item.timeline}</span>
                </div>
                <h3 className={styles.phaseTitle}>{item.title}</h3>
                <p className={styles.phaseDescription}>{item.description}</p>
                <ul className={styles.featureList}>
                  {item.features.map((feature, i) => (
                    <li key={i}>
                      <CheckCircle size={14} className={styles.featureIcon} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}