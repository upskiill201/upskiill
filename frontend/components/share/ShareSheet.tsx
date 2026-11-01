'use client';

/**
 * ShareSheet — the bottom sheet behind every milestone's Share button.
 *
 * Opens straight away on a skeleton while the server snapshots the milestone
 * (POST /share-cards), then shows the real card. "Share" hands the PNG itself
 * to the phone's share sheet (Instagram/WhatsApp Status take images, not
 * links); Download, Copy link and the social buttons cover desktops. Any of
 * them counts as a share: the first one pays the small Coins thank-you.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Glyph } from '@/components/art/Glyph';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { playHaptic } from '@/lib/haptics';
import { createShareCard, markShared, type ShareChannel } from '@/lib/share/client';
import {
  SHARE_FORMATS,
  shareImagePath,
  shareMessage,
  shareUrl,
  type CreatedShareCard,
  type PublicShareCard,
  type ShareCardRequest,
  type ShareFormat,
  type ShareReward,
} from '@/lib/share/types';

type Load = { state: 'loading' } | { state: 'error'; message: string } | { state: 'ready'; card: CreatedShareCard };

export default function ShareSheet({ request, onClose }: { request: ShareCardRequest; onClose: () => void }) {
  const reducedMotion = useReducedMotion();
  const [load, setLoad] = useState<Load>({ state: 'loading' });
  const [format, setFormat] = useState<ShareFormat>('story');
  // Which preview URL has finished loading (a cached image can load before any effect runs).
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [reward, setReward] = useState<ShareReward | null>(null);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const files = useRef<Partial<Record<ShareFormat, File>>>({});
  const closeRef = useRef<HTMLButtonElement>(null);
  const counted = useRef(false);
  const requestKey = JSON.stringify(request);

  const fetchCard = useCallback(() => {
    setLoad({ state: 'loading' });
    createShareCard(JSON.parse(requestKey) as ShareCardRequest)
      .then((card) => setLoad({ state: 'ready', card }))
      .catch((e: unknown) => setLoad({ state: 'error', message: e instanceof Error ? e.message : "Couldn't make your card." }));
  }, [requestKey]);

  useEffect(fetchCard, [fetchCard]);
  useEffect(() => closeRef.current?.focus(), []);

  // Esc closes the sheet — and only the sheet, not the celebration behind it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.stopImmediatePropagation();
      onClose();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose]);

  const slug = load.state === 'ready' ? load.card.slug : null;

  // Fetch the PNG ahead of the tap: a phone's share sheet only opens inside
  // the tap itself, so the file must already be in hand when it comes.
  useEffect(() => {
    if (!slug || files.current[format]) return;
    let alive = true;
    fetch(shareImagePath(slug, format))
      .then((r) => (r.ok ? r.blob() : Promise.reject(new Error('image'))))
      .then((blob) => {
        if (alive) files.current[format] = new File([blob], `teyro-${slug}-${format}.png`, { type: 'image/png' });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [slug, format]);

  if (typeof document === 'undefined') return null;

  const card = load.state === 'ready' ? load.card : null;
  const link = slug ? shareUrl(slug, window.location.origin.includes('localhost') ? window.location.origin : undefined) : '';
  const text = card ? shareMessage({ kind: card.kind, data: card.data } as Pick<PublicShareCard, 'kind' | 'data'>) : '';

  const count = async (channel: ShareChannel) => {
    if (!slug || counted.current) return;
    counted.current = true;
    const result = await markShared(slug, channel);
    if (result) setReward(result);
    if (result?.rewarded) playHaptic('success', false);
  };

  const nativeShare = async () => {
    if (!slug) return;
    playHaptic('light', false);
    const file = files.current[format];
    try {
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: `${text} ${link}` });
      } else if (navigator.share) {
        await navigator.share({ title: 'Teyro', text, url: link });
      } else {
        await copyLink();
        return;
      }
      void count('native');
    } catch {
      // Dismissed the sheet — nothing went out, nothing to count.
    }
  };

  const download = async () => {
    if (!slug) return;
    setBusy(true);
    try {
      const file: Blob = files.current[format] ?? (await fetch(shareImagePath(slug, format)).then((r) => r.blob()));
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = `teyro-${card?.kind.toLowerCase().replace(/_/g, '-')}-${format}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      void count('download');
    } finally {
      setBusy(false);
    }
  };

  async function copyLink() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(`${text} ${link}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
      void count('copy');
    } catch {
      // Clipboard blocked — the social buttons still work.
    }
  }

  const social: { channel: ShareChannel; label: string; icon: React.ReactNode; href: string }[] = link
    ? [
        { channel: 'whatsapp', label: 'WhatsApp', icon: <FaWhatsapp size={20} />, href: `https://wa.me/?text=${encodeURIComponent(`${text} ${link}`)}` },
        { channel: 'x', label: 'X', icon: <FaXTwitter size={18} />, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(link)}` },
        { channel: 'facebook', label: 'Facebook', icon: <FaFacebookF size={18} />, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}` },
        { channel: 'linkedin', label: 'LinkedIn', icon: <FaLinkedinIn size={18} />, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}` },
      ]
    : [];

  const { width, height } = SHARE_FORMATS[format];
  const previewSrc = slug ? shareImagePath(slug, format) : null;
  const imageReady = previewSrc !== null && loadedSrc === previewSrc;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="share-backdrop"
        className="fixed inset-0 z-[100300] flex items-end justify-center bg-[color-mix(in_srgb,var(--ink-fixed,#071233)_55%,transparent)] sm:items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Share your milestone"
          onClick={(e) => e.stopPropagation()}
          initial={reducedMotion ? { opacity: 0 } : { y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 420, damping: 36 }}
          className="relative flex max-h-[100dvh] w-full max-w-[440px] flex-col overflow-y-auto rounded-t-[24px] bg-[var(--bg-card)] px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-4 text-[var(--text-primary)] sm:rounded-[24px] sm:pb-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-extrabold">Share your milestone</h2>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-section)]"
            >
              <Glyph name="close" size={20} strokeWidth={2.6} />
            </button>
          </div>

          {/* Story (9:16) for Status/Stories, Post (1:1) for feeds */}
          <div className="mt-2 flex gap-1 self-center rounded-full bg-[var(--bg-section)] p-1" role="tablist" aria-label="Image size">
            {(Object.keys(SHARE_FORMATS) as ShareFormat[]).map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={format === f}
                onClick={() => setFormat(f)}
                className={`rounded-full px-4 py-2 text-[14px] font-extrabold transition-colors ${
                  format === f ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)]'
                }`}
              >
                {SHARE_FORMATS[f].label}
              </button>
            ))}
          </div>

          <div className="relative mx-auto mt-4 w-full" style={{ aspectRatio: `${width} / ${height}`, maxWidth: format === 'story' ? 'min(280px, 30dvh)' : 'min(280px, 42dvh)' }}>
            {load.state === 'error' ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 rounded-[16px] bg-[var(--bg-section)] p-6 text-center">
                <p className="text-[15px] font-bold text-[var(--text-secondary)]">{load.message}</p>
                <button
                  type="button"
                  onClick={fetchCard}
                  className="inline-flex items-center gap-2 rounded-[10px] border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-[14px] font-bold"
                >
                  <Glyph name="refresh" size={16} /> Try again
                </button>
              </div>
            ) : (
              <>
                {!imageReady && <div className="absolute inset-0 animate-pulse rounded-[16px] bg-[var(--bg-section)]" aria-hidden />}
                {slug && (
                  // eslint-disable-next-line @next/next/no-img-element -- generated PNG, not an optimisable asset
                  <img
                    key={format}
                    src={previewSrc ?? undefined}
                    alt="Your milestone card"
                    ref={(el) => {
                      if (el?.complete && el.naturalWidth > 0 && previewSrc && loadedSrc !== previewSrc) setLoadedSrc(previewSrc);
                    }}
                    width={width}
                    height={height}
                    onLoad={() => setLoadedSrc(previewSrc)}
                    className={`h-full w-full rounded-[16px] object-cover shadow-[0_12px_32px_-12px_color-mix(in_srgb,var(--text-primary)_40%,transparent)] transition-opacity duration-200 ${
                      imageReady ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                )}
              </>
            )}
          </div>

          {/* The reward line: what sharing pays, then what it paid */}
          {card && (
            <div className="mt-4 flex items-center justify-center gap-2 text-[14px] font-bold text-[var(--text-secondary)]" aria-live="polite">
              {reward?.rewarded ? (
                <>
                  <Image src="/Icons/Coin.png" alt="" width={20} height={20} />
                  <span className="text-[var(--text-primary)]">+{reward.coins} Coins added. Thanks for sharing!</span>
                </>
              ) : reward && reward.reason === 'DAILY_CAP' ? (
                <span>You&apos;ve collected today&apos;s sharing Coins. Friends who join still earn you invite rewards.</span>
              ) : card.rewardAvailable && !reward ? (
                <>
                  <Image src="/Icons/Coin.png" alt="" width={20} height={20} />
                  <span>
                    Share it and get <span className="text-[var(--text-primary)]">+{card.rewardCoins} Coins</span>
                  </span>
                </>
              ) : (
                <span>Friends who join from your link earn you both invite rewards.</span>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={nativeShare}
            disabled={!slug}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-[var(--color-brand)] px-6 py-4 text-[16px] font-extrabold uppercase tracking-[0.04em] text-[var(--text-on-blue)] shadow-[0_4px_0_var(--color-brand-deep)] transition-transform active:translate-y-[2px] active:shadow-[0_2px_0_var(--color-brand-deep)] disabled:opacity-60"
          >
            <Glyph name="share" size={18} strokeWidth={2.6} /> Share
          </button>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={download}
              disabled={!slug || busy}
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[var(--border)] px-4 py-3 text-[15px] font-bold transition-colors hover:border-[var(--border-strong)] disabled:opacity-60"
            >
              {busy ? <Glyph name="spinner" size={18} className="animate-spin" /> : <Glyph name="download" size={18} />} Download
            </button>
            <button
              type="button"
              onClick={() => void copyLink()}
              disabled={!slug}
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[var(--border)] px-4 py-3 text-[15px] font-bold transition-colors hover:border-[var(--border-strong)] disabled:opacity-60"
            >
              {copied ? <Glyph name="check" size={18} className="text-[var(--success-green)]" /> : <Glyph name="link" size={18} />}
              {copied ? 'Copied' : 'Copy link'}
            </button>
          </div>

          <div className="mt-3 flex justify-center gap-3">
            {social.map((s) => (
              <a
                key={s.channel}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share on ${s.label}`}
                onClick={() => void count(s.channel)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-section)]"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
