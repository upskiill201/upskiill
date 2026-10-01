import Link from 'next/link';
import { ArrowRight, Check, Clapperboard, Smartphone } from 'lucide-react';
import { Reveal } from '@/components/homepage/v3/Visuals';
import {
  APP_LAUNCHES,
  FOUNDING_SHARE_PCT,
  LEARNER_GATE,
  STANDARD_SHARE_PCT,
  STUDIO_GATE,
  STUDIO_OPENS,
} from '@/lib/launch';
import { NotifyForm, WaitlistCount } from './NotifyForm';
import s from '@/components/homepage/v3/Home.module.css';
import l from './Launch.module.css';

/**
 * Slim bar above the marketing header while either half of Teyro is still
 * closed. Renders nothing once both gates are off.
 */
export function LaunchBar() {
  if (!LEARNER_GATE && !STUDIO_GATE) return null;
  return (
    <div className={l.bar} role="region" aria-label="Launch dates">
      <div className={l.barInner}>
        <span>
          {STUDIO_GATE && (
            <>
              Teyro Studio opens <strong>{STUDIO_OPENS}</strong>
              {LEARNER_GATE && <span className={l.barDot} aria-hidden="true" />}
            </>
          )}
          {LEARNER_GATE && (
            <>
              The learner app launches <strong>{APP_LAUNCHES}</strong>
            </>
          )}
        </span>
        <Link href={LEARNER_GATE ? '/#launch' : '/teach#apply'} className={l.barLink}>
          Get notified <ArrowRight size={14} strokeWidth={3} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

/** Homepage: "Teyro launches in November" + the notify-me form and live count. */
export function LaunchSection() {
  if (!LEARNER_GATE && !STUDIO_GATE) return null;
  return (
    <section id="launch" className={l.section} aria-labelledby="launch-title">
      <div className={l.wrap}>
        <Reveal className={l.copy}>
          <span className={s.eyebrow} style={{ marginBottom: 0 }}>
            Launching soon
          </span>
          <h2 id="launch-title" className={`${s.display} ${s.h2}`}>
            Teyro launches in <em>{APP_LAUNCHES.split(' ')[0]}.</em> Be first in.
          </h2>
          <p className={s.lead}>
            Short daily lessons in coding and AI, with streaks, leagues and friends to keep you going. Leave your email
            and we&apos;ll tell you the day the doors open.
          </p>
          <NotifyForm source="homepage" />
          <WaitlistCount />
        </Reveal>

        <Reveal delay={0.1} className={l.dates}>
          <div className={l.date}>
            <span className={l.dateIcon}>
              <Clapperboard size={26} strokeWidth={2.5} aria-hidden="true" />
            </span>
            <span className={l.dateText}>
              <span className={l.dateWhen}>{STUDIO_OPENS}</span>
              <span className={l.dateWhat}>Teyro Studio opens</span>
              <span className={l.dateSub}>
                For creators.{' '}
                <Link href="/teach#apply" className={l.dateLink}>
                  Apply to teach
                </Link>
              </span>
            </span>
          </div>
          <div className={l.date}>
            <span className={`${l.dateIcon} ${l.dateIconAlt}`}>
              <Smartphone size={26} strokeWidth={2.5} aria-hidden="true" />
            </span>
            <span className={l.dateText}>
              <span className={l.dateWhen}>{APP_LAUNCHES}</span>
              <span className={l.dateWhat}>The learner app launches</span>
              <span className={l.dateSub}>iPhone, Android and web. Free to start.</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** /teach: "Apply as a Founding Creator" — creators only. */
export function ApplySection() {
  if (!STUDIO_GATE) return null;
  return (
    <section id="apply" className={l.section} aria-labelledby="apply-title">
      <div className={l.wrap}>
        <Reveal className={l.copy}>
          <span className={s.eyebrow} style={{ marginBottom: 0 }}>
            Founding Creators · Studio opens {STUDIO_OPENS}
          </span>
          <h2 id="apply-title" className={`${s.display} ${s.h2}`}>
            Teach on Teyro <em>from day one.</em>
          </h2>
          <p className={s.lead}>
            Teyro Studio opens in {STUDIO_OPENS}, a month before the learner app launches in {APP_LAUNCHES}. Leave your
            email and we&apos;ll invite you the day it opens.
          </p>
          <NotifyForm
            source="teach"
            fixedRole="creator"
            cta="Apply now"
            successText="You’re on the list. We’ll invite you the day Teyro Studio opens."
          />
          <WaitlistCount label="people on the waitlist" />
        </Reveal>

        <Reveal delay={0.1} className={l.date}>
          <span className={l.dateText}>
            <span className={l.dateWhen}>What Founding Creators get</span>
            <ul className={`${l.perks} ${l.perksSpaced}`}>
              {[
                `Keep ${FOUNDING_SHARE_PCT}% of every payment (standard creators keep ${STANDARD_SHARE_PCT}%)`,
                'A Founding badge on your public creator page',
                'Your course ready in Explore when learners arrive',
                'Paid in US dollars to your bank or mobile money, in any country',
              ].map((p) => (
                <li key={p}>
                  <span className={l.perkTick} aria-hidden="true">
                    <Check size={14} strokeWidth={4} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </span>
        </Reveal>
      </div>
    </section>
  );
}
