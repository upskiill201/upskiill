'use client';

import { useState } from 'react';
import { Link2, Check, Share2 } from 'lucide-react';
import { FaXTwitter, FaLinkedinIn, FaFacebookF } from 'react-icons/fa6';
import styles from './ShareButtons.module.css';

interface ShareButtonsProps {
  /** Absolute URL of the post */
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const nativeShareSupported =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions/insecure context) — fail silently
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      // User dismissed the share sheet — nothing to do
    }
  }

  return (
    <div className={styles.row}>
      <span className={styles.label}>Share</span>
      <div className={styles.buttons}>
        {nativeShareSupported && (
          <button
            type="button"
            className={styles.button}
            onClick={nativeShare}
            aria-label="Share this article"
            title="Share"
          >
            <Share2 size={15} strokeWidth={2.5} />
          </button>
        )}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
          aria-label="Share on X (Twitter)"
          title="Share on X"
        >
          <FaXTwitter size={14} />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <FaLinkedinIn size={14} />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <FaFacebookF size={14} />
        </a>
        <button
          type="button"
          className={`${styles.button} ${copied ? styles.copied : ''}`}
          onClick={copyLink}
          aria-label={copied ? 'Link copied' : 'Copy link'}
          title="Copy link"
        >
          {copied ? <Check size={15} strokeWidth={3} /> : <Link2 size={15} strokeWidth={2.5} />}
        </button>
      </div>
    </div>
  );
}
