'use client';

/**
 * "What could you earn?" — creators are paid from the Teyro Pro pool
 * (lib/launch.ts): each month CREATOR_POOL_PCT of every Pro learner's payment
 * is shared among the creators they learned with, by minutes. Two sliders
 * (Pro learners in your course, and how much of their learning time they
 * spend in it) run through the real Pro prices. An estimate, and labelled
 * as one: before card fees and tax.
 */

import { useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CREATOR_POOL_PCT, PRO_MONTHLY_USD, PRO_YEARLY_PER_MONTH_USD } from '@/lib/launch';
import t from './Teach.module.css';

const POOL = CREATOR_POOL_PCT / 100;

const usd = (n: number, cents = true) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 })}`;

export function EarningsCalculator() {
  const [learners, setLearners] = useState(150);
  const [timePct, setTimePct] = useState(50);
  const reduce = useReducedMotion() ?? false;
  const learnersId = useId();
  const timeId = useId();

  // Yearly plans, the conservative case: $5.00 a month each.
  const perYearlyLearner = Math.round(PRO_YEARLY_PER_MONTH_USD * POOL * (timePct / 100) * 100) / 100;
  const perMonthlyLearner = Math.round(PRO_MONTHLY_USD * POOL * (timePct / 100) * 100) / 100;
  const perMonth = perYearlyLearner * learners;

  return (
    <div className={t.calc}>
      <div className={t.calcInputs}>
        <label className={t.calcField} htmlFor={learnersId}>
          <span className={t.calcLabel}>
            Pro learners in your course <strong>{learners.toLocaleString('en-US')}</strong>
          </span>
          <input
            id={learnersId}
            type="range"
            min={10}
            max={1000}
            step={10}
            value={learners}
            onChange={(e) => setLearners(Number(e.target.value))}
            className={t.range}
            style={{ ['--fill' as string]: `${((learners - 10) / 990) * 100}%` }}
          />
          <span className={t.calcHint}>Learning in your course this month</span>
        </label>
        <label className={t.calcField} htmlFor={timeId}>
          <span className={t.calcLabel}>
            Their learning time in your course <strong>{timePct}%</strong>
          </span>
          <input
            id={timeId}
            type="range"
            min={10}
            max={100}
            step={10}
            value={timePct}
            onChange={(e) => setTimePct(Number(e.target.value))}
            className={t.range}
            style={{ ['--fill' as string]: `${((timePct - 10) / 90) * 100}%` }}
          />
          <span className={t.calcHint}>The rest goes to the other courses they take</span>
        </label>
      </div>

      <div className={t.calcOut} aria-live="polite">
        <span className={t.calcOutLabel}>You could earn</span>
        <motion.span
          key={Math.round(perMonth)}
          className={t.calcBig}
          initial={reduce ? false : { scale: 0.92, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 420, damping: 22 }}
        >
          {usd(perMonth, false)}
          <span>/month</span>
        </motion.span>
        <span className={t.calcYear}>That’s {usd(perMonth * 12, false)} a year</span>
        <div className={t.calcSplit}>
          <span>
            <strong>{usd(perYearlyLearner)}</strong> per learner on a yearly plan, each month
          </span>
          <span>
            <strong>{usd(perMonthlyLearner)}</strong> per learner on a monthly plan
          </span>
        </div>
        <p className={t.calcNote}>
          An estimate: {CREATOR_POOL_PCT}% of each Pro learner’s payment is shared by the minutes they spend in each course, and this
          assumes yearly plans. Real earnings depend on the plans learners choose, card fees, tax and refunds.
        </p>
      </div>
    </div>
  );
}
