'use client';

/**
 * Invite friends — backed by the real referral system (/api/referrals/me).
 * Your link carries your code; when a friend signs up with it and finishes
 * their first lesson, you both get the reward. Shows who has joined and what
 * you've earned, so it's something you come back to.
 */

import React, { useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { Check, Copy, Share2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { fetcher } from '@/lib/swr';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import type { ReferralSummary } from './types';
import styles from './Profile.module.css';

export default function InviteFriendsCard() {
  const { data, error, isLoading, mutate } = useSWR<ReferralSummary>('/api/referrals/me', fetcher);
  const [copied, setCopied] = useState(false);

  const link = data && typeof window !== 'undefined' ? `${window.location.origin}/signup?ref=${data.code}` : '';
  const message = data
    ? `I'm learning on Teyro and it's actually fun. Join with my link and we'll both get ${data.reward.coins} coins when you finish your first lesson: ${link}`
    : '';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      playSound('toggleOn');
      playHaptic('success', false);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      playSound('nodeLocked');
    }
  };

  const share = async () => {
    playSound('navTap', 3);
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Learn with me on Teyro', text: message, url: link });
      } catch {
        // Cancelled — nothing to do.
      }
    } else {
      await copy();
    }
  };

  return (
    <section id="invite" className={styles.invite} aria-label="Invite friends">
      <div className={styles.inviteHead}>
        <Image src="/art/ui/gift.svg" alt="" width={64} height={64} className={styles.inviteArt} />
        <div>
          <h2 className={styles.inviteTitle}>Invite friends</h2>
          <p className={styles.inviteSub}>
            {data
              ? `You both get ${data.reward.coins} coins and ${data.reward.xp} XP when a friend finishes their first lesson.`
              : 'Learn together, and get rewarded for it.'}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.skeleton} style={{ height: 48, marginTop: 16 }} />
      ) : error || !data ? (
        <p className={styles.inviteSub} role="alert">
          Your invite link didn&apos;t load.{' '}
          <button type="button" className={styles.linkBtn} onClick={() => void mutate()}>
            Try again
          </button>
        </p>
      ) : (
        <>
          <div className={styles.linkBox}>
            <span className={styles.linkText}>{link.replace(/^https?:\/\//, '')}</span>
            <button type="button" className={styles.copyBtn} onClick={() => void copy()}>
              {copied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.75} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className={styles.shareRow}>
            <a
              className={`${styles.shareBtn} ${styles.shareWa}`}
              href={`https://wa.me/?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('navTap', 2)}
            >
              <FaWhatsapp size={18} aria-hidden="true" /> WhatsApp
            </a>
            <button type="button" className={styles.shareBtn} onClick={() => void share()}>
              <Share2 size={16} strokeWidth={2.75} aria-hidden="true" /> Share
            </button>
          </div>

          <div className={styles.inviteStats}>
            <div className={styles.inviteStat}>
              <span className={styles.inviteStatNum}>{data.invited}</span>
              <span className={styles.inviteStatLabel}>Signed up</span>
            </div>
            <div className={styles.inviteStat}>
              <span className={styles.inviteStatNum}>{data.joined}</span>
              <span className={styles.inviteStatLabel}>Learning</span>
            </div>
            <div className={styles.inviteStat}>
              <span className={styles.inviteStatNum}>{data.earned.coins}</span>
              <span className={styles.inviteStatLabel}>Coins earned</span>
            </div>
          </div>

          {data.friends.length > 0 && (
            <ul className={styles.friendList}>
              {data.friends.slice(0, 5).map((f) => (
                <li key={f.id} className={styles.personRow}>
                  {f.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- user avatar, any host
                    <img src={f.avatarUrl} alt="" className={styles.personAvatar} />
                  ) : (
                    <span className={styles.personAvatar}>{f.name.charAt(0).toUpperCase()}</span>
                  )}
                  <span className={styles.personText}>
                    <span className={styles.personName}>{f.name}</span>
                    <span className={styles.personSub}>
                      {f.status === 'REWARDED' ? 'Finished a lesson' : "Hasn't finished a lesson yet"}
                    </span>
                  </span>
                  <span className={`${styles.statusPill} ${f.status === 'REWARDED' ? styles.statusDone : ''}`}>
                    {f.status === 'REWARDED' ? `+${data.reward.coins}` : 'Pending'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
