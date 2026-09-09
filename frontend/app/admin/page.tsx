'use client';

import {
  AlertTriangle,
  Bell,
  BookOpen,
  Eye,
  Flame,
  Send,
  Smartphone,
  Timer,
  UserCheck,
  Users,
  Wallet,
} from 'lucide-react';
import {
  BarList,
  Banner,
  Card,
  ErrorState,
  Loading,
  Metric,
  PageHeader,
  adminStyles as s,
  useAdminData,
} from '@/components/admin/AdminUI';

/** GET /admin/summary — platform-wide numbers, real and currently
 *  computable only. Anything not yet computable (revenue, DAU/MAU,
 *  retention) is left out here rather than faked; those land with the
 *  Analytics phase. */
interface PlatformSummary {
  users: {
    total: number;
    newLast7d: number;
    byRole: Record<string, number>;
    byAccountStatus: Record<string, number>;
  };
  courses: { total: number; published: number };
  creators: {
    total: number;
    byVerificationStatus: Record<string, number>;
  };
  payouts: { pendingReview: number };
}

interface TeyOverview {
  windowDays: number;
  learners: number;
  states: {
    streak: Record<string, number>;
    engagement: Record<string, number>;
  };
  deliveries: {
    sent: number;
    suppressed: number;
    failed: number;
    opened: number;
    converted: number;
    openRate: number;
    conversionRate: number;
  };
  reachability: Record<string, number>;
  scheduler: { backlog: number; queue: Record<string, number> };
}

interface TeyHealth {
  config: {
    schedulerEnabled: boolean;
    dryRun: boolean;
    pushKillSwitch: boolean;
    externalTickConfigured: boolean;
    vapidConfigured: boolean;
  };
}

/** The platform-wide half of the Overview. Deliberately independent of the
 *  Tey fetches below it — a failure in one section should never blank the
 *  other, they're unrelated systems sharing one page. */
function PlatformSection() {
  const { data, error, isLoading } = useAdminData<PlatformSummary>(
    '/api/admin/summary',
  );

  if (error) return <ErrorState error={error as Error} />;
  if (isLoading || !data) return <Loading />;

  return (
    <>
      <div className={s.grid}>
        <Metric
          label="Total users"
          value={data.users.total.toLocaleString()}
          icon={<Users size={13} />}
          hint={`${data.users.newLast7d.toLocaleString()} new in the last 7 days`}
        />
        <Metric
          label="Courses"
          value={data.courses.total.toLocaleString()}
          icon={<BookOpen size={13} />}
          hint={`${data.courses.published.toLocaleString()} published`}
        />
        <Metric
          label="Creators"
          value={data.creators.total.toLocaleString()}
          icon={<UserCheck size={13} />}
          hint={`${(data.creators.byVerificationStatus.PENDING ?? 0).toLocaleString()} pending verification`}
        />
        <Metric
          label="Payouts awaiting review"
          value={data.payouts.pendingReview.toLocaleString()}
          icon={<Wallet size={13} />}
          hint="Requested or under review"
          accent={data.payouts.pendingReview > 0 ? 'warn' : 'none'}
        />
      </div>

      <div className={s.grid}>
        <Card title="Users by role" icon={<Users size={15} />}>
          <BarList data={data.users.byRole} />
        </Card>
        <Card title="Users by account status" icon={<UserCheck size={15} />}>
          <BarList data={data.users.byAccountStatus} />
        </Card>
      </div>
    </>
  );
}

/** The existing Tey (notification pipeline) half of the Overview, unchanged
 *  in substance from the original Tey-only admin page. */
function TeySection() {
  const { data, error, isLoading } = useAdminData<TeyOverview>(
    '/api/tey/admin/overview',
  );
  const { data: health } = useAdminData<TeyHealth>('/api/tey/admin/health');

  if (error) return <ErrorState error={error as Error} />;
  if (isLoading || !data) return <Loading />;

  const { deliveries, scheduler } = data;
  const cfg = health?.config;

  return (
    <>
      {/* The single most common "why did nobody get a notification?" answer,
          surfaced before any of the numbers that would look broken because
          of it. */}
      {cfg?.dryRun && (
        <Banner tone="warn">
          <AlertTriangle size={16} />
          <span>
            <strong>Dry-run.</strong> The scheduler is evaluating and recording
            what it would send, but nothing is being delivered. Set{' '}
            <code>TEY_DELIVERY_ENABLED=true</code> to go live.
          </span>
        </Banner>
      )}
      {cfg && !cfg.dryRun && cfg.pushKillSwitch && (
        <Banner tone="warn">
          <AlertTriangle size={16} />
          <span>
            <strong>Push kill switch is on.</strong> Every nudge is being
            suppressed before it reaches a channel.
          </span>
        </Banner>
      )}

      <div className={s.grid}>
        <Metric
          label="Learners tracked"
          value={data.learners.toLocaleString()}
          icon={<Users size={13} />}
          hint="With a projected state"
        />
        <Metric
          label="Sent"
          value={deliveries.sent.toLocaleString()}
          icon={<Send size={13} />}
          hint={`${deliveries.failed} failed`}
          accent={deliveries.failed > 0 ? 'warn' : 'none'}
        />
        <Metric
          label="Open rate"
          value={`${deliveries.openRate}%`}
          icon={<Eye size={13} />}
          hint={`${deliveries.opened.toLocaleString()} opened`}
        />
        <Metric
          label="Queue backlog"
          value={scheduler.backlog.toLocaleString()}
          icon={<Timer size={13} />}
          hint="Due but not yet processed"
          // A backlog that is not draining is the clearest sign the tick has
          // stopped — most likely a spun-down free-plan instance.
          accent={
            scheduler.backlog > 500
              ? 'bad'
              : scheduler.backlog > 50
                ? 'warn'
                : 'good'
          }
        />
      </div>

      <div className={s.grid}>
        <Card title="Streak states" icon={<Flame size={15} />}>
          <BarList data={data.states.streak} />
        </Card>

        <Card title="Engagement" icon={<Users size={15} />}>
          <BarList data={data.states.engagement} />
        </Card>
      </div>

      <div className={s.grid}>
        <Card title="Reachable devices" icon={<Smartphone size={15} />}>
          <BarList
            data={data.reachability}
            emptyLabel="No push subscriptions yet"
          />
          {/* The iOS ceiling is a product constraint, not a bug — worth stating
              on the page so it is measured rather than rediscovered. */}
          <p className={s.metricHint} style={{ marginTop: 12 }}>
            iOS only allows push from a Home-Screen-installed PWA, so
            <strong> other</strong> largely means iOS Safari — reachable
            in-app, but not by notification.
          </p>
        </Card>

        <Card title="Scheduler queue" icon={<Bell size={15} />}>
          <BarList
            data={scheduler.queue}
            variant="muted"
            emptyLabel="Queue is empty"
          />
        </Card>
      </div>
    </>
  );
}

/** Section label used to separate Platform from Tey within one Overview
 *  page — not a full PageHeader, just enough to orient the reader. */
function SectionLabel({ children }: { children: string }) {
  return (
    <h2
      style={{
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        margin: '32px 0 12px',
      }}
    >
      {children}
    </h2>
  );
}

export default function AdminOverviewPage() {
  return (
    <>
      <PageHeader
        title="Overview"
        subtitle="Platform-wide numbers, plus Tey's notification pipeline"
      />

      <SectionLabel>Platform</SectionLabel>
      <PlatformSection />

      <SectionLabel>Tey · notifications</SectionLabel>
      <TeySection />
    </>
  );
}
