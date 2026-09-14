'use client';

/**
 * PayoutsVisual — recreates the Creator Studio Payouts screen
 * (components/creator/earnings/PayoutsTab.tsx, earnings.module.css's status
 * pills + timeline) as a static marketing visual. Sells "payouts land on a
 * schedule you can count on" — a payout mid-flow through the real status
 * timeline, plus a couple of settled history rows. Illustrative numbers
 * only.
 */

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { CheckCircle2, CircleDashed, Landmark } from 'lucide-react';

const TIMELINE = ['Requested', 'Under review', 'Processing', 'Paid'];
const CURRENT_STEP = 2; // "Processing"

const HISTORY = [
  { id: 'PO-4821', amount: '$2,400.00', date: 'Aug 14' },
  { id: 'PO-4790', amount: '$1,860.00', date: 'Jul 17' },
];

export default function PayoutsVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-100px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4 }}
      className="w-full rounded-card p-5"
      style={{ background: '#F8FAFC' }}
    >
      <div className="rounded-2xl bg-white p-4" style={{ border: '2px solid #E5E5E5', borderBottomWidth: 4 }}>
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#afafaf]">Payout PO-4903</p>
          <span
            className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold"
            style={{ backgroundColor: '#DDF4FF', color: '#1899D6' }}
          >
            $3,120.00
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2">
          {TIMELINE.map((step, idx) => (
            <React.Fragment key={step}>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-extrabold"
                style={
                  idx <= CURRENT_STEP
                    ? { backgroundColor: '#D7FFB8', color: '#58A700' }
                    : { backgroundColor: '#F0F2F5', color: '#afafaf' }
                }
              >
                {idx <= CURRENT_STEP ? <CheckCircle2 size={11} /> : <CircleDashed size={11} />}
                {step}
              </span>
              {idx < TIMELINE.length - 1 && <span className="text-[#cfcfcf]">&rarr;</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-white p-3" style={{ border: '2px solid #E5E5E5', borderBottomWidth: 4 }}>
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#afafaf]">Payout history</p>
        <div className="mt-2 flex flex-col gap-2.5">
          {HISTORY.map((row) => (
            <div key={row.id} className="flex items-center gap-2.5 text-sm">
              <Landmark size={16} color="#1899D6" />
              <span className="flex-1 font-semibold text-slate-500">{row.date}</span>
              <span className="font-extrabold text-[#3c3c3c]">{row.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
