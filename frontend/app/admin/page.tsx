'use client';

import {
  AlertTriangle,
  Bell,
  Eye,
  Flame,
  Send,
  Smartphone,
  Timer,
  Users,
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

interface Overview {
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

interface Health {
  config: {
    schedulerEnabled: boolean;
    dryRun: boolean;
    pushKillSwitch: boolean;
    externalTickConfigured: boolean;
    vapidConfigured: boolean;
  };
}

export default function AdminOverviewPage() {
  const { data, error, isLoading } = useAdminData<Overview>(
    '/api/tey/admin/overview',
  );
  const { data: health } = useAdminData<Health>('/api/tey/admin/health');

  if (error) return <ErrorState error={error as Error} />;
  if (isLoading || !data) {
    return (
      <>
        <PageHeader title="Overview" />
        <Loading />
      </>
    );
  }

  const { deliveries, scheduler } = data;
  const cfg = health?.config;

  return (
    <>
      <PageHeader
        title="Overview"
        subtitle={`Learner states now · delivery over the last ${data.windowDays} days`}
      />

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
