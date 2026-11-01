'use client';

/**
 * Crop a photo to the circle people will see: drag to move, slide (or
 * scroll / pinch-zoom on a trackpad) to zoom. Exports a 512px square JPEG —
 * small enough to load fast in a feed of 50 faces.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Glyph } from '@/components/art/Glyph';
import styles from './AvatarStudio.module.css';

const OUT = 512;
const MAX_ZOOM = 3;

interface Props {
  file: File;
  busy?: boolean;
  onCancel: () => void;
  onDone: (blob: Blob) => void;
}

export default function PhotoCropper({ file, busy, onCancel, onDone }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [stage, setStage] = useState(300);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [error, setError] = useState<string | null>(null);
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  useEffect(() => {
    // A cleaned-up run (a new file, or dev's double effect) must not report
    // the load it abandoned: revoking its URL makes that image "fail".
    let live = true;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (!live) return;
      imgRef.current = img;
      setSrc(url);
      setError(null);
      setNatural({ w: img.naturalWidth, h: img.naturalHeight });
    };
    img.onerror = () => {
      if (live) setError("That file isn't a photo we can read. Try a JPG or PNG.");
    };
    img.src = url;
    return () => {
      live = false;
      URL.revokeObjectURL(url);
    };
  }, [file]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setStage(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Scale that makes the short side exactly fill the circle at zoom 1.
  const base = natural ? stage / Math.min(natural.w, natural.h) : 1;
  const dw = natural ? natural.w * base * zoom : stage;
  const dh = natural ? natural.h * base * zoom : stage;
  const clamp = (x: number, y: number) => ({
    x: Math.min(0, Math.max(stage - dw, x)),
    y: Math.min(0, Math.max(stage - dh, y)),
  });

  // Centre on load, and keep the photo covering the circle as zoom changes.
  useEffect(() => {
    if (!natural) return;
    setPos({ x: (stage - natural.w * base) / 2, y: (stage - natural.h * base) / 2 });
    setZoom(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- recentre on a new image or stage size only
  }, [natural, stage]);

  const zoomTo = (next: number) => {
    const z = Math.min(MAX_ZOOM, Math.max(1, next));
    // Zoom around the centre of the circle.
    const cx = stage / 2;
    const cy = stage / 2;
    const k = z / zoom;
    const nw = natural ? natural.w * base * z : stage;
    const nh = natural ? natural.h * base * z : stage;
    const x = cx - (cx - pos.x) * k;
    const y = cy - (cy - pos.y) * k;
    setZoom(z);
    setPos({ x: Math.min(0, Math.max(stage - nw, x)), y: Math.min(0, Math.max(stage - nh, y)) });
  };

  const exportCrop = () => {
    const img = imgRef.current;
    if (!img || !natural) return;
    const canvas = document.createElement('canvas');
    canvas.width = OUT;
    canvas.height = OUT;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const s = base * zoom;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, -pos.x / s, -pos.y / s, stage / s, stage / s, 0, 0, OUT, OUT);
    canvas.toBlob((blob) => (blob ? onDone(blob) : setError("Couldn't prepare that photo. Try another.")), 'image/jpeg', 0.9);
  };

  return (
    <div className={styles.cropWrap}>
      <div
        ref={stageRef}
        className={styles.cropStage}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          drag.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          setPos(clamp(d.px + e.clientX - d.x, d.py + e.clientY - d.y));
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
        onWheel={(e) => zoomTo(zoom - e.deltaY * 0.002)}
      >
        {src && natural && (
          // eslint-disable-next-line @next/next/no-img-element -- a local object URL being cropped
          <img
            src={src}
            alt=""
            draggable={false}
            className={styles.cropImg}
            style={{ width: dw, height: dh, transform: `translate(${pos.x}px, ${pos.y}px)` }}
          />
        )}
        <span className={styles.cropMask} aria-hidden />
        {!natural && !error && <span className={styles.cropLoading}><Glyph name="spinner" size={22} className="animate-spin" /></span>}
      </div>

      {error ? (
        <p className={styles.error} role="alert">{error}</p>
      ) : (
        <label className={styles.zoomRow}>
          <Glyph name="minus" size={16} strokeWidth={2.75} />
          <input
            type="range"
            min={1}
            max={MAX_ZOOM}
            step={0.01}
            value={zoom}
            aria-label="Zoom"
            onChange={(e) => zoomTo(Number(e.target.value))}
          />
          <Glyph name="plus" size={16} strokeWidth={2.75} />
        </label>
      )}
      <p className={styles.hint}>Drag to move. Make sure your face fills the circle.</p>

      <div className={styles.actions}>
        <button type="button" className={styles.ghostBtn} onClick={onCancel} disabled={busy}>
          Back
        </button>
        <button type="button" className={styles.primaryBtn} onClick={exportCrop} disabled={busy || !natural}>
          {busy ? <Glyph name="spinner" size={16} className="animate-spin" /> : null}
          {busy ? 'Saving…' : 'Use this photo'}
        </button>
      </div>
    </div>
  );
}
