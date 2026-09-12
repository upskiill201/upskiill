'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import StudentShell from '@/components/layout/StudentShell';
import TeyroBrandedLoader from '@/components/ui/TeyroBrandedLoader';
import JourneySceneShell from '@/components/features/course-unlock/JourneySceneShell';
import SceneCelebrate from '@/components/features/course-unlock/SceneCelebrate';
import SceneWall from '@/components/features/course-unlock/SceneWall';
import ScenePlans, {
  type SubscribeFields,
} from '@/components/features/course-unlock/ScenePlans';
import WaitingForApproval from '@/components/features/course-unlock/WaitingForApproval';
import SuccessBeat from '@/components/features/course-unlock/SuccessBeat';
import { sanitizeReturnTo } from '@/lib/return-to';
import { formatLocalFromUsd } from '@/lib/fx-rates';
import { playHaptic } from '@/lib/haptics';
import { getMomoCountry } from '@/lib/mesomb-countries.client';
import {
  calculateCoursePricingLadder,
} from '@/lib/pricing-engine';
import styles from '@/components/features/course-unlock/unlock.module.css';

/**
 * Full-page stepped-scene unlock experience (celebrate → wall → plans).
 *
 * Replaces CoursePaywallModal. Stripe checkout returns land back HERE with
 * `?payment=success&returnTo=…`; both query params are captured in lazy
 * state initializers during FIRST render — before any effect can clean the
 * URL (StrictMode-safe, same trick usePostPaymentUnlock uses for `payment`).
 */

type Phase = 'loading' | 'error' | 'journey' | 'waiting' | 'success';
type SceneKey = 'celebrate' | 'wall' | 'plans';

const SCENE_ORDER: Record<SceneKey, number> = {
  celebrate: 0,
  wall: 1,
  plans: 2,
};

interface UnlockSection {
  lessons?: unknown[];
}

interface UnlockCourse {
  id?: string;
  slug?: string;
  title?: string;
  price?: number;
  sections?: UnlockSection[];
  curriculum?: UnlockSection[];
}

function countLessons(course: UnlockCourse | null): number {
  const sections =
    course?.sections ?? course?.curriculum ?? ([] as UnlockSection[]);
  if (!Array.isArray(sections)) return 0;
  return sections.reduce(
    (acc, s) => acc + (Array.isArray(s?.lessons) ? s.lessons.length : 0),
    0,
  );
}

export default function LearnUnlockPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const courseId = params.id;

  // ── Lazy captures BEFORE any URL cleanup ──────────────────────────────
  const [returnTo] = useState(() =>
    sanitizeReturnTo(
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search).get('returnTo')
        : null,
      courseId,
    ),
  );
  const [capturedPayment] = useState<string | null>(() =>
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('payment')
      : null,
  );

  const [phase, setPhase] = useState<Phase>('loading');
  const [authRequired, setAuthRequired] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [course, setCourse] = useState<UnlockCourse | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // A cancelled Stripe payment drops the learner straight back into plans
  // instead of replaying the celebration.
  const [scene, setScene] = useState<SceneKey>(() =>
    capturedPayment === 'cancelled' ? 'plans' : 'celebrate',
  );
  const [direction, setDirection] = useState(1);

  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  // Fields behind the CURRENT PENDING collect — feeds the waiting panel's
  // "approve on your phone" copy (operator / amount / phone tail).
  const [pendingFields, setPendingFields] = useState<SubscribeFields | null>(
    null,
  );

  // Set right before navigating away to Stripe Checkout so double-submits
  // can't fire a second request mid-redirect.
  const redirectPendingRef = useRef(false);

  const goToScene = useCallback(
    (next: SceneKey) => {
      setDirection(SCENE_ORDER[next] >= SCENE_ORDER[scene] ? 1 : -1);
      setScene(next);
    },
    [scene],
  );

  // ── Data load ─────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const [courseRes, progRes, accessRes] = await Promise.all([
          fetch(`/api/courses/${courseId}`, {
            headers: { 'Cache-Control': 'no-cache' },
          }),
          fetch(`/api/courses/${courseId}/progress`, {
            credentials: 'include',
            headers: { 'Cache-Control': 'no-cache' },
          }),
          fetch(`/api/courses/${courseId}/access`, { credentials: 'include' }),
        ]);
        if (cancelled) return;

        if (courseRes.status === 404 || (!courseRes.ok && courseRes.status >= 500)) {
          setLoadError('This course could not be found.');
          setPhase('error');
          return;
        }

        if (accessRes.status === 401) {
          setAuthRequired(true);
          setLoadError("Log in and I'll pick up right where you left off.");
          setPhase('error');
          return;
        }

        const accessData = accessRes.ok
          ? await accessRes.json().catch(() => null)
          : null;
        const unlocked = accessData?.hasAccess === true;

        const courseData: UnlockCourse | null = courseRes.ok
          ? await courseRes.json()
          : null;

        if (progRes.ok) {
          const pd = await progRes.json().catch(() => null);
          if (!cancelled) setCompletedLessons(pd?.completedLessons || []);
        }
        if (cancelled) return;

        setCourse(courseData);

        // Already entitled (webhook beat us here): straight to the beat.
        if (unlocked) {
          setPhase('success');
          return;
        }

        // Returning from Stripe with the webhook still in flight.
        if (capturedPayment === 'success') {
          setPhase('waiting');
          return;
        }

        // Defensive guard: free courses should never see a paywall.
        if (
          courseData &&
          typeof courseData.price === 'number' &&
          courseData.price <= 0
        ) {
          router.replace(returnTo);
          return;
        }

        if (!courseData) {
          setLoadError("I couldn't load this course. Give it another try?");
          setPhase('error');
          return;
        }

        setPhase('journey');
      } catch {
        if (!cancelled) {
          setLoadError("Something went wrong on my end loading this course.");
          setPhase('error');
        }
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [courseId, capturedPayment, router, returnTo]);

  // ── Subscribe ─────────────────────────────────────────────────────────
  const handleSubscribe = useCallback(
    async (fields: SubscribeFields) => {
      if (redirectPendingRef.current || isSubscribing) return;
      setIsSubscribing(true);
      setSubscribeError(null);

      try {
        // Stripe Checkout requires ABSOLUTE URLs — bare pathnames fail with
        // "Not a valid URL". Both land back here carrying the learner's
        // sanitized origin so the flow resumes exactly where it began.
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        const base = `${origin}/learn/${courseId}/unlock`;
        const res = await fetch('/api/payment/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            courseId: course?.id || courseId,
            plan: fields.plan,
            provider: fields.provider,
            phone: fields.phone,
            service: fields.service,
            country: fields.country,
            successUrl: `${base}?payment=success&returnTo=${encodeURIComponent(returnTo)}`,
            cancelUrl: `${base}?payment=cancelled&returnTo=${encodeURIComponent(returnTo)}`,
            couponCode: fields.couponCode,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(
            errData?.error?.message ||
              errData?.message ||
              'Failed to unlock the course. Please try again.',
          );
        }

        const data = await res.json();

        if (data.checkoutUrl) {
          redirectPendingRef.current = true;
          window.location.href = data.checkoutUrl;
          return;
        }

        // Mobile Money push is awaiting user confirmation — do NOT celebrate
        // yet; hand over to the honest waiting panel.
        if (data.status === 'PENDING') {
          setPendingFields(fields);
          setPhase('waiting');
          return;
        }

        if (data.status !== 'ACTIVE' && data.provider !== 'FREE') {
          throw new Error(
            data.message ||
              'The payment could not be completed. Please try again.',
          );
        }

        setPhase('success');
      } catch (err) {
        console.error('Subscription error:', err);
        setSubscribeError(
          err instanceof Error && err.message
            ? err.message
            : 'Something went wrong. Please try again.',
        );
      } finally {
        setIsSubscribing(false);
      }
    },
    [courseId, course?.id, isSubscribing, returnTo],
  );

  // ── Derived display data ──────────────────────────────────────────────
  const totalLessons = useMemo(() => countLessons(course), [course]);
  const completedCount = completedLessons.length;
  const sections = useMemo(
    () => course?.sections ?? course?.curriculum ?? [],
    [course],
  );

  const exitToReturnTo = useCallback(() => {
    playHaptic('light');
    router.replace(returnTo);
  }, [router, returnTo]);

  // Waiting-panel copy for a live Mobile Money collect.
  const momoWaitingLabels = useMemo(
    () =>
      pendingFields
        ? getOperatorAndAmountLabels(pendingFields, course?.price)
        : {},
    [pendingFields, course?.price],
  );

  // ── Render shells ─────────────────────────────────────────────────────
  if (phase === 'loading') {
    return (
      <StudentShell isWide hideMobileChrome>
        <div className={styles.centerShell}>
          <TeyroBrandedLoader suppressConnectionCheck />
        </div>
      </StudentShell>
    );
  }

  if (phase === 'error') {
    return (
      <StudentShell isWide hideMobileChrome>
        <div className={`${styles.centerShell} ${styles.errorShell}`}>
          <h2>{authRequired ? 'Almost there!' : 'Hmm.'}</h2>
          <p>{loadError}</p>
          {authRequired ? (
            <button
              type="button"
              className={styles.errorBtn}
              onClick={() => router.push('/login')}
            >
              <LogIn size={15} />
              Log in
            </button>
          ) : (
            <button type="button" className={styles.errorBtn} onClick={exitToReturnTo}>
              Back to learning
            </button>
          )}
        </div>
      </StudentShell>
    );
  }

  return (
    <StudentShell isWide hideMobileChrome>
      {phase === 'success' && <SuccessBeat returnTo={returnTo} />}

      {phase === 'waiting' && (
        <div className={styles.stage}>
          <div
            className={styles.sceneScroll}
            style={{ justifyContent: 'center', padding: 24 }}
          >
            <WaitingForApproval
              courseId={courseId}
              variant={capturedPayment === 'success' ? 'card' : 'momo'}
              amountLabel={momoWaitingLabels.amountLabel}
              operatorLabel={momoWaitingLabels.operatorLabel}
              phoneNational={pendingFields?.phone}
              onUnlocked={() => setPhase('success')}
              onCancel={() => {
                setSubscribeError(null);
                setDirection(-1);
                setScene('plans');
                setPhase('journey');
              }}
            />
          </div>
        </div>
      )}

      {phase === 'journey' && (
        <div className={styles.stage}>
          <JourneySceneShell sceneKey={scene} direction={direction}>
            {scene === 'celebrate' && (
              <SceneCelebrate
                courseTitle={course?.title}
                sections={sections}
                completedLessons={completedLessons}
                onContinue={() => goToScene('wall')}
              />
            )}
            {scene === 'wall' && (
              <SceneWall
                courseTitle={course?.title}
                completedCount={completedCount}
                totalCount={totalLessons}
                onBack={() => goToScene('celebrate')}
                onSeePlans={() => goToScene('plans')}
                onMaybeLater={exitToReturnTo}
              />
            )}
            {scene === 'plans' && (
              <ScenePlans
                courseId={course?.id || courseId}
                basePrice={course?.price}
                submitting={isSubscribing}
                errorMsg={subscribeError}
                onSubmit={handleSubscribe}
                onBack={() => goToScene('wall')}
              />
            )}
          </JourneySceneShell>
        </div>
      )}
    </StudentShell>
  );
}

/**
 * Human labels for the PENDING waiting panel, derived from the exact
 * fields the learner submitted (operator code + local amount).
 */
function getOperatorAndAmountLabels(
  fields: SubscribeFields,
  basePrice: number | undefined,
): { operatorLabel?: string; amountLabel?: string } {
  const result: { operatorLabel?: string; amountLabel?: string } = {};

  const country = getMomoCountry(fields.country);
  if (!country) return result;

  const ladder =
    typeof basePrice === 'number'
      ? calculateCoursePricingLadder(basePrice)
      : undefined;
  const planPrice = ladder
    ? {
        WEEKLY: ladder.weekly.price,
        MONTHLY: ladder.monthly.price,
        YEARLY: ladder.yearly.price,
      }
    : undefined;

  if (planPrice && typeof planPrice[fields.plan] === 'number') {
    result.amountLabel = formatLocalFromUsd(planPrice[fields.plan], country.currency);
  }
  if (fields.service) {
    const op = country.operators.find((o) => o.code === fields.service);
    if (op) result.operatorLabel = op.label;
  }
  return result;
}
