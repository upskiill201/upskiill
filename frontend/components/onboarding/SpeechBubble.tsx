'use client';

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import gsap from 'gsap';
import { SpeechBubbleShape } from './SpeechBubbleShape';
import { useTypewriter } from './useTypewriter';

interface SpeechBubbleProps {
  /** Each string is a paragraph/line. Plain text types char-by-char.
   *  HTML strings (containing `<`) appear in one smooth fade. */
  lines: string[];
  /** 0–1 fraction from the left where the curved tail base center sits */
  tailAlign?: number;
  /** Reference to the mascot container div for the arm-raise gesture */
  mascotRef?: React.RefObject<HTMLDivElement | null>;
  onComplete?: () => void;
  disableTypewriter?: boolean;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  lines,
  tailAlign = 0.18,
  mascotRef,
  onComplete,
  disableTypewriter = false,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [skip, setSkip] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const floatAnimRef = useRef<gsap.core.Tween | null>(null);

  const TAIL_HEIGHT = 28;
  const PADDING_X = 28;
  const PADDING_Y = 24;

  const { visibleLines: typedLines, currentText: typingText, isTyping: typingActive } = useTypewriter({
    lines,
    onComplete,
    skip: disableTypewriter || skip,
  });

  const visibleLines = disableTypewriter ? lines : typedLines;
  const currentText = disableTypewriter ? '' : typingText;
  const isTyping = disableTypewriter ? false : typingActive;

  // ResizeObserver: auto-size the SVG to fit text content
  useEffect(() => {
    if (!contentRef.current) return;
    const obs = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setDimensions({
        width: width + PADDING_X * 2,
        height: height + PADDING_Y * 2,
      });
    });
    obs.observe(contentRef.current);
    return () => obs.disconnect();
  }, []);

  // Entrance animation + floating idle
  useEffect(() => {
    if (!wrapperRef.current) return;
    const el = wrapperRef.current;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, scale: 1, y: 0 });
      return;
    }

    // Kill any existing float before entrance
    floatAnimRef.current?.kill();

    const tl = gsap.timeline();

    gsap.set(el, { opacity: 0, scale: 0.4, y: 30 });

    // Mascot straight vertical bounce sync
    if (mascotRef?.current) {
      gsap.set(mascotRef.current, { y: 20, scale: 0.95 });
      tl.to(mascotRef.current, {
        y: 0,
        scale: 1.0,
        duration: 0.35,
        ease: 'back.out(2.2)',
      });
    }

    // Bubble "boing" entrance: elastic.out(1, 0.55) gives 1–2 wobbles before settling
    tl.to(
      el,
      {
        opacity: 1,
        scale: 1.06,
        y: 0,
        duration: 0.55,
        ease: 'elastic.out(1, 0.55)',
      },
      mascotRef?.current ? '-=0.1' : '<'
    )
      // Micro settle after elastic overshoot
      .to(el, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      });

    // Start floating idle after entrance
    tl.call(() => {
      floatAnimRef.current = gsap.to(el, {
        y: -6,
        duration: 2.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    });

    return () => {
      tl.kill();
      floatAnimRef.current?.kill();
    };
  }, [mascotRef]);

  const handleTap = useCallback(() => {
    if (!skip) setSkip(true);
  }, [skip]);

  const hasDimensions = dimensions.width > 0 && dimensions.height > 0;

  return (
    <div
      ref={wrapperRef}
      onClick={handleTap}
      className="relative cursor-pointer"
      role="dialog"
      aria-label="Tey speaks"
      style={{ display: 'inline-block', userSelect: 'none' }}
    >
      {/* SVG bubble shape renders behind text */}
      {hasDimensions && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ top: 0, left: 0 }}
        >
          <SpeechBubbleShape
            width={dimensions.width}
            height={dimensions.height}
            tailAlign={tailAlign}
            tailHeight={TAIL_HEIGHT}
          />
        </div>
      )}

      {/* Text content — measured by ResizeObserver */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col gap-3"
        style={{
          padding: `${PADDING_Y}px ${PADDING_X}px`,
          // Extra bottom padding to clear the tail
          paddingBottom: PADDING_Y + TAIL_HEIGHT,
          minWidth: 260,
          maxWidth: 420,
        }}
      >
        {/* Already-typed lines */}
        {visibleLines.map((line, idx) => (
          <p
            key={idx}
            className="text-[#1F2937] font-medium text-sm md:text-base leading-relaxed m-0"
            style={{ fontFamily: 'var(--font-jakarta)' }}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}

        {/* Currently-typing line + blinking cursor */}
        {currentText && (
          <p
            className="text-[#1F2937] font-medium text-sm md:text-base leading-relaxed m-0"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            <span dangerouslySetInnerHTML={{ __html: currentText }} />
            {isTyping && (
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: 2,
                  height: '1em',
                  verticalAlign: 'text-bottom',
                  marginLeft: 2,
                  backgroundColor: '#3D5AFE',
                  animation: 'speech-cursor-blink 0.8s step-end infinite',
                }}
              />
            )}
          </p>
        )}

        {/* Tap hint — only while typing */}
        {isTyping && !skip && (
          <p
            className="text-[10px] text-slate-400 text-right mt-1 m-0"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            tap to skip
          </p>
        )}
      </div>

      {/* Cursor blink keyframes injected once */}
      <style>{`
        @keyframes speech-cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
