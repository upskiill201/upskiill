'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Parses an HTML string into tokens of either:
 *   - An HTML tag (e.g. `<span>` or `<strong style="...">`)
 *   - An HTML entity (e.g. `&nbsp;` or `&amp;`)
 *   - A single visible character (e.g. `T`, `e`, `y`)
 *
 * This allows character-by-character typewriter animation to type
 * visible characters while instantly rendering tag markup without breaking the DOM.
 */
function parseHtmlToTokens(html: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < html.length) {
    if (html[i] === '<') {
      const closeIdx = html.indexOf('>', i);
      if (closeIdx !== -1) {
        tokens.push(html.slice(i, closeIdx + 1));
        i = closeIdx + 1;
      } else {
        tokens.push(html[i]);
        i++;
      }
    } else if (html[i] === '&') {
      const closeIdx = html.indexOf(';', i);
      if (closeIdx !== -1 && closeIdx - i < 8) {
        tokens.push(html.slice(i, closeIdx + 1));
        i = closeIdx + 1;
      } else {
        tokens.push(html[i]);
        i++;
      }
    } else {
      tokens.push(html[i]);
      i++;
    }
  }
  return tokens;
}

function getCharDelay(
  char: string,
  prevChar: string,
  baseDelay = 60
): number {
  // Spaces are typed faster (mimics thumb strokes)
  if (char === ' ') return baseDelay * 0.55;
  
  // Natural punctuation pauses (breathing/thought gaps)
  if (prevChar === '.' || prevChar === '!' || prevChar === '?') return baseDelay + 260;
  if (prevChar === ',') return baseDelay + 120;
  
  // Small hitch before capitalized words
  if (char === char.toUpperCase() && char !== char.toLowerCase() && prevChar === ' ') {
    return baseDelay + 15;
  }
  
  // Natural human typing speed jitter: ±12ms
  const jitter = (Math.random() * 24) - 12;
  return Math.max(15, baseDelay + jitter);
}

function getLinePauseDuration(): number {
  // Randomized pause between lines: 450–650ms
  return 450 + Math.random() * 200;
}

interface UseTypewriterOptions {
  lines: string[];
  onComplete?: () => void;
  skip?: boolean;
  baseDelay?: number;
}

interface UseTypewriterResult {
  visibleLines: string[];
  currentText: string;
  isTyping: boolean;
}

export function useTypewriter({
  lines,
  onComplete,
  skip = false,
  baseDelay = 60, // Human-like speed baseline of a fast youth (approx 180-200 WPM layout CPM)
}: UseTypewriterOptions): UseTypewriterResult {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const cancelledRef = useRef(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || skip) {
      setVisibleLines(lines);
      setCurrentText('');
      setIsTyping(false);
      onComplete?.();
      return;
    }

    cancelledRef.current = false;
    setVisibleLines([]);
    setCurrentText('');
    setIsTyping(true);

    const run = async () => {
      const completed: string[] = [];

      for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        if (cancelledRef.current) return;

        const line = lines[lineIndex];
        const tokens = parseHtmlToTokens(line);
        let typedText = '';

        // Type tokens sequentially
        for (let i = 0; i < tokens.length; i++) {
          if (cancelledRef.current) return;
          const token = tokens[i];
          typedText += token;
          setCurrentText(typedText);

          // Delay only if it's a visible text/entity character
          const isTag = token.startsWith('<') && token.endsWith('>');
          if (!isTag) {
            const prevChar = i > 0 ? tokens[i - 1] : '';
            const delay = getCharDelay(token, prevChar, baseDelay);
            await new Promise<void>((res) => {
              const timer = setTimeout(res, delay);
              // Clean up if component unmounts or skip requested mid-typing
              cancelledRef.current ? clearTimeout(timer) : null;
            });
          }
        }

        // Line finished — commit it
        if (cancelledRef.current) return;
        completed.push(line);
        setVisibleLines([...completed]);
        setCurrentText('');

        // Pause between lines (except last)
        if (lineIndex < lines.length - 1) {
          await new Promise<void>((res) => setTimeout(res, getLinePauseDuration()));
        }
      }

      setIsTyping(false);
      onComplete?.();
    };

    run();

    return () => {
      cancelledRef.current = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, skip, baseDelay]);

  return { visibleLines, currentText, isTyping };
}
