'use client';

/**
 * "What could you earn?" — two sliders (yearly course price, subscribed learners)
 * run through the same pricing engine the checkout uses (lib/pricing-engine),
 * and the creator's default 70% share. An estimate, and labelled as one.
 */

import { useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { calculateCoursePricingLadder } from '@/lib/pricing-engine';
import t from './Teach.module.css';

const SHARE = 0.7;

const usd = (n: number, cents = true) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 })}`;

export function EarningsCalculator() {
  // The price a creator sets is the yearly plan; monthly is derived from it.
  const [price, setPrice] = useState(60);
  const [learners, setLearners] = useState(150);
  const reduce = useReducedMotion() ?? false;
  const priceId = useId();
  const learnersId = useId();

  const ladder = calculateCoursePricingLadder(price);
  const monthly = ladder.monthly.price;
  const yearly = ladder.yearly.price;
  const keepMonthly = Math.round(monthly * SHARE * 100) / 100;
  const keepYearly = Math.round(yearly * SHARE * 100) / 100;
  const perMonth = keepMonthly * learners;

  return (
    <div className={t.calc}>
      <div className={t.calcInputs}>
        <label className={t.calcField} htmlFor={priceId}>
          <span className={t.calcLabel}>
            Your yearly price <strong>{usd(price, false)}</strong>
          </span>
          <input
            id={priceId}
            type="range"
            min={10}
            max={300}
            step={5}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className={t.range}
            style={{ ['--fill' as string]: `${((price - 10) / 290) * 100}%` }}
          />
          <span className={t.calcHint}>
            Learners pay {usd(yearly)} a year, or {usd(monthly)} a month
          </span>
        </label>
        <label className={t.calcField} htmlFor={learnersId}>
          <span className={t.calcLabel}>
            Learners subscribed <strong>{learners.toLocaleString('en-US')}</strong>
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
          <span className={t.calcHint}>After their two free lessons</span>
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
            <strong>{usd(keepMonthly)}</strong> you keep per learner, every month
          </span>
          <span>
            <strong>{usd(keepYearly)}</strong> per learner on a yearly plan
          </span>
        </div>
        <p className={t.calcNote}>
          An estimate at your 70% share. Real earnings depend on the plans learners choose, coupons and refunds.
        </p>
      </div>
    </div>
  );
}
