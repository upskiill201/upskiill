'use client';

import React, { useState } from 'react';
import { Award, Download, Share2, CheckCircle, ExternalLink } from 'lucide-react';
import { FaAward } from 'react-icons/fa';
import Button from '../ui/Button';
import styles from './CertificateCard.module.css';

export interface CertificateCardProps {
  courseTitle: string;
  instructorName?: string;
  completedDate: string;        // e.g. "March 15, 2026"
  certificateId: string;        // e.g. "UC-abc123"
  category?: string;            // e.g. "Web Development"
  thumbnailColor?: string;      // accent color for the cert banner
  onDownload?: () => void;
  onShare?: () => void;
}

export const CertificateCard = ({
  courseTitle,
  instructorName,
  completedDate,
  certificateId,
  category,
  thumbnailColor = '#3D5AFE',
  onDownload,
  onShare,
}: CertificateCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(`https://upskiill.vercel.app/certificates/${certificateId}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
    onShare?.();
  };

  const handleDownload = () => {
    onDownload?.();
  };

  return (
    <div className={styles.card}>
      {/* TOP BANNER */}
      <div className={styles.banner} style={{ '--accent': thumbnailColor } as React.CSSProperties}>
        {/* Decorative circles */}
        <div className={styles.circle1} />
        <div className={styles.circle2} />

        {/* Trophy */}
        <div className={styles.trophyWrapper}>
          <div className={styles.trophyRing}>
            <FaAward size={36} className={styles.trophyIcon} />
          </div>
        </div>

        {/* Verified check */}
        <div className={styles.verifiedBadge}>
          <CheckCircle size={14} strokeWidth={2.5} />
          <span>Verified</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        {category && (
          <span className={styles.category}>{category}</span>
        )}
        <h3 className={styles.courseTitle}>{courseTitle}</h3>
        {instructorName && (
          <p className={styles.instructorLine}>
            Taught by <span className={styles.instructorName}>{instructorName}</span>
          </p>
        )}

        {/* DIVIDER */}
        <div className={styles.divider} />

        {/* META INFO */}
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <Award size={13} className={styles.metaIcon} />
            <span className={styles.metaLabel}>Completed</span>
            <span className={styles.metaValue}>{completedDate}</span>
          </div>
          <div className={styles.metaItem}>
            <ExternalLink size={13} className={styles.metaIcon} />
            <span className={styles.metaLabel}>Certificate ID</span>
            <span className={styles.metaValue}>{certificateId}</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className={styles.actions}>
          <Button
            variant="primary"
            size="md"
            fullWidth
            leftIcon={<Download size={15} />}
            onClick={handleDownload}
          >
            Download PDF
          </Button>
          <Button
            variant="outline"
            size="md"
            fullWidth
            leftIcon={<Share2 size={15} />}
            onClick={handleShare}
          >
            {copied ? 'Link Copied!' : 'Share'}
          </Button>
        </div>
      </div>
    </div>
  );
};
