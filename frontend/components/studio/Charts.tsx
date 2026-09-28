"use client";

/**
 * The studio's two chart forms, single-series by design (one brand hue, so no
 * legend: the section title names what's plotted).
 *
 *   Columns — a value over time or over a small set of buckets. ≤24px bars
 *             with 4px rounded tops on one baseline, a 2px gap, a hairline
 *             at the max with its value, and a tooltip per bar on hover and
 *             keyboard focus.
 *   BarList — ranked horizontal bars with the value at the tip.
 *
 * Every chart also renders a visually hidden table, so no value is gated
 * behind hover or colour.
 */

import { useState, type CSSProperties } from "react";
import s from "./studio.module.css";

export interface ColumnPoint {
  key: string;
  /** Short axis label; empty to leave the slot unlabelled. */
  axis: string;
  /** Tooltip headline, e.g. "Mon 14 Sep". */
  label: string;
  value: number;
}

export function Columns({
  points,
  unit,
  caption,
  tone,
  height = 168,
}: {
  points: ColumnPoint[];
  unit: (n: number) => string;
  caption: string;
  tone?: string;
  height?: number;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...points.map((p) => p.value));
  const hovered = hover !== null ? points[hover] : null;
  return (
    <figure
      className={s.chart}
      style={{
        margin: 0,
        ...(tone ? ({ "--tone": tone } as CSSProperties) : {}),
      }}
    >
      <div
        className={s.cols}
        style={{ height }}
        onMouseLeave={() => setHover(null)}
      >
        <div className={s.gridMax} aria-hidden="true">
          <span className={s.gridMaxLabel}>{unit(max)}</span>
        </div>
        {points.map((p, i) => (
          <button
            key={p.key}
            type="button"
            className={s.colSlot}
            aria-label={`${p.label}: ${unit(p.value)}`}
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
          >
            <span
              className={`${s.col} ${p.value === 0 ? s.colZero : ""}`}
              style={{ height: `${(p.value / max) * 100}%` }}
            />
          </button>
        ))}
        {hovered && hover !== null && (
          <div
            className={s.tip}
            style={{
              left: `${((hover + 0.5) / points.length) * 100}%`,
              top: `calc(${100 - (hovered.value / max) * 100}% - 8px)`,
            }}
            aria-hidden="true"
          >
            <strong>{unit(hovered.value)}</strong>
            {hovered.label}
          </div>
        )}
      </div>
      <div className={s.axisRow} aria-hidden="true">
        {points.map((p) => (
          <span key={p.key}>{p.axis}</span>
        ))}
      </div>
      <div className={s.srOnly}>
        <table>
          <caption>{caption}</caption>
          <tbody>
            {points.map((p) => (
              <tr key={p.key}>
                <th scope="row">{p.label}</th>
                <td>{unit(p.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export function BarList({
  rows,
  caption,
  max: maxIn,
  unit = (n) => String(n),
}: {
  rows: {
    key: string;
    label: string;
    value: number;
    tone?: string;
    title?: string;
  }[];
  caption: string;
  max?: number;
  unit?: (n: number) => string;
}) {
  const max = Math.max(1, maxIn ?? Math.max(0, ...rows.map((r) => r.value)));
  return (
    <figure style={{ margin: 0 }}>
      <div className={s.hbars} aria-hidden="true">
        {rows.map((r) => (
          <div
            key={r.key}
            className={s.hbar}
            title={r.title ?? `${r.label}: ${unit(r.value)}`}
          >
            <span className={s.hbarLabel}>{r.label}</span>
            <span className={s.hbarTrack}>
              <span
                className={s.hbarFill}
                style={{
                  display: "block",
                  width: `${(r.value / max) * 100}%`,
                  ...(r.tone ? ({ "--tone": r.tone } as CSSProperties) : {}),
                }}
              />
            </span>
            <span className={s.hbarValue}>{unit(r.value)}</span>
          </div>
        ))}
      </div>
      <div className={s.srOnly}>
        <table>
          <caption>{caption}</caption>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key}>
                <th scope="row">{r.label}</th>
                <td>{unit(r.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
