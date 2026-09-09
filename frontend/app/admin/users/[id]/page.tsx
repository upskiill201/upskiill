'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mutate } from 'swr';
import {
  ArrowLeft,
  Ban,
  CheckCircle2,
  Coins,
  Flame,
  Heart,
  LockKeyholeOpen,
  ShieldCheck,
  Sparkles,
  Trophy,
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import {
  Button,
  Card,
  ConfirmDialog,
  DataTable,
  Empty,
  ErrorState,
  Loading,
  Metric,
  PageHeader,
  Pill,
  accountStatusTone,
  adminMutate,
  adminStyles as s,
  humanize,
  relativeTime,
  useAdminData,
} from '@/components/admin/AdminUI';

interface UserDetail {
  account: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    accountStatus: string;
    avatarUrl: string | null;
    createdAt: string;
    emailVerifiedAt: string | null;
    isVerified: boolean;
    lastLoginAt: string | null;
    lastActiveAt: string | null;
    loginCount: number;
    failedLoginAttempts: number;
    accountLockedUntil: string | null;
    whatsappVerified: boolean;
    hasStudentAccess: boolean;
    hasCreatorAccess: boolean;
  };
  learning: {
    xp: number;
    coins: number;
    gems: number;
    streakDays: number;
    longestStreak: number;
    lives: number;
    maxLives: number;
    leagueTier: string;
    dailyGoalXp: number;
  } | null;
  activity: { eventType: string; entityType: string; entityId: string; createdAt: string }[];
  economy: { type: string; amount: number; source: string; createdAt: string }[];
  adminHistory: {
    id: string;
    actorId: string;
    action: string;
    reason: string | null;
    createdAt: string;
  }[];
}

export default function AdminUserDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const key = `/api/admin/users/${params.id}`;
  const { data, error, isLoading } = useAdminData<UserDetail>(key);

  const [dialog, setDialog] = useState<'suspend' | 'unsuspend' | 'unlock' | null>(
    null,
  );
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  if (error) return <ErrorState error={error as Error} />;
  if (isLoading || !data) {
    return (
      <>
        <PageHeader title="User" />
        <Loading />
      </>
    );
  }

  const { account, learning, activity, economy, adminHistory } = data;
  const isSuspended = account.accountStatus === 'SUSPENDED';
  const isLocked = account.accountStatus === 'LOCKED';

  const runAction = async (
    action: 'suspend' | 'unsuspend' | 'unlock',
    reason?: string,
  ) => {
    setBusy(true);
    setActionError(null);
    try {
      await adminMutate(`/api/admin/users/${account.id}/${action}`, {
        method: 'POST',
        body: { reason },
      });
      await mutate(key);
      setDialog(null);
    } catch (err) {
      const status = (err as Error & { status?: number }).status;
      setActionError(
        status === 400
          ? (err as Error).message
          : "We couldn't update this account. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        onClick={() => router.push('/admin/users')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'none',
          border: 'none',
          color: 'var(--text-secondary)',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          padding: 0,
          marginBottom: 16,
        }}
      >
        <ArrowLeft size={14} /> Back to Users
      </button>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Avatar src={account.avatarUrl ?? undefined} name={account.fullName} size="lg" />
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
                fontSize: 22,
                fontWeight: 800,
                margin: 0,
              }}
            >
              {account.fullName}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
              <Pill tone={account.role === 'ADMIN' ? 'brand' : 'neutral'}>
                {humanize(account.role)}
              </Pill>
              <Pill tone={accountStatusTone(account.accountStatus)}>
                {humanize(account.accountStatus)}
              </Pill>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {isSuspended && (
            <Button onClick={() => setDialog('unsuspend')}>
              <CheckCircle2 size={15} /> Unsuspend account
            </Button>
          )}
          {isLocked && (
            <Button onClick={() => setDialog('unlock')}>
              <LockKeyholeOpen size={15} /> Unlock account
            </Button>
          )}
          {!isSuspended && (
            <Button variant="danger" onClick={() => setDialog('suspend')}>
              <Ban size={15} /> Suspend account
            </Button>
          )}
        </div>
      </div>

      <div className={s.grid}>
        <Metric label="Coins" value={learning?.coins ?? '—'} icon={<Coins size={13} />} />
        <Metric label="XP" value={learning?.xp ?? '—'} icon={<Sparkles size={13} />} />
        <Metric
          label="Streak"
          value={learning ? `${learning.streakDays}d` : '—'}
          icon={<Flame size={13} />}
          hint={learning ? `Longest: ${learning.longestStreak}d` : undefined}
        />
        <Metric
          label="Hearts"
          value={learning ? `${learning.lives}/${learning.maxLives}` : '—'}
          icon={<Heart size={13} />}
        />
      </div>

      <div className={s.grid}>
        <Card title="Account" icon={<ShieldCheck size={15} />}>
          <div className={s.bars}>
            <DetailRow label="Email" value={account.email} />
            <DetailRow
              label="Email verified"
              value={account.isVerified ? 'Yes' : 'No'}
            />
            <DetailRow
              label="WhatsApp verified"
              value={account.whatsappVerified ? 'Yes' : 'No'}
            />
            <DetailRow label="Joined" value={relativeTime(account.createdAt)} />
            <DetailRow label="Last login" value={relativeTime(account.lastLoginAt)} />
            <DetailRow label="Last active" value={relativeTime(account.lastActiveAt)} />
            <DetailRow label="Login count" value={String(account.loginCount)} />
            <DetailRow
              label="Failed logins"
              value={String(account.failedLoginAttempts)}
            />
            {isLocked && (
              <DetailRow
                label="Locked until"
                value={
                  account.accountLockedUntil
                    ? relativeTime(account.accountLockedUntil)
                    : '—'
                }
              />
            )}
            <DetailRow
              label="Access"
              value={[
                account.hasStudentAccess && 'Student',
                account.hasCreatorAccess && 'Creator',
              ]
                .filter(Boolean)
                .join(', ') || 'None'}
            />
          </div>
        </Card>

        <Card title="Learning" icon={<Trophy size={15} />}>
          {learning ? (
            <div className={s.bars}>
              <DetailRow label="Coins" value={String(learning.coins)} />
              <DetailRow label="Gems" value={String(learning.gems)} />
              <DetailRow label="XP" value={String(learning.xp)} />
              <DetailRow label="Daily goal" value={`${learning.dailyGoalXp} XP`} />
              <DetailRow label="League" value={humanize(learning.leagueTier)} />
            </div>
          ) : (
            <Empty>No student profile — this account never started learning.</Empty>
          )}
        </Card>
      </div>

      <Card title="Recent activity">
        {activity.length === 0 ? (
          <Empty>No recorded activity.</Empty>
        ) : (
          <DataTable columns={['When', 'Event', 'Entity']}>
            {activity.map((e, i) => (
              <tr key={i}>
                <td className={s.mono} title={e.createdAt}>
                  {relativeTime(e.createdAt)}
                </td>
                <td>{humanize(e.eventType)}</td>
                <td className={s.mono}>
                  {e.entityType}:{e.entityId}
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Card>

      <Card title="Coin & gem transactions">
        {economy.length === 0 ? (
          <Empty>No transactions recorded.</Empty>
        ) : (
          <DataTable columns={['When', 'Type', 'Amount', 'Source']}>
            {economy.map((t, i) => (
              <tr key={i}>
                <td className={s.mono} title={t.createdAt}>
                  {relativeTime(t.createdAt)}
                </td>
                <td>
                  <Pill tone={t.type === 'EARN' ? 'good' : 'warn'}>{humanize(t.type)}</Pill>
                </td>
                <td className={s.mono}>{t.amount}</td>
                <td>{humanize(t.source)}</td>
              </tr>
            ))}
          </DataTable>
        )}
      </Card>

      <Card title="Administrative history">
        {adminHistory.length === 0 ? (
          <Empty>No admin actions taken on this account.</Empty>
        ) : (
          <DataTable columns={['When', 'Action', 'Reason', 'Admin']}>
            {adminHistory.map((h) => (
              <tr key={h.id}>
                <td className={s.mono} title={h.createdAt}>
                  {relativeTime(h.createdAt)}
                </td>
                <td>{humanize(h.action)}</td>
                <td>{h.reason || '—'}</td>
                <td className={s.mono}>{h.actorId}</td>
              </tr>
            ))}
          </DataTable>
        )}
      </Card>

      {dialog === 'suspend' && (
        <ConfirmDialog
          title="Suspend this account?"
          description={
            <>
              <strong>{account.fullName}</strong> will be signed out and unable to log
              back in until an admin unsuspends the account. This is reversible.
              {actionError && (
                <div style={{ color: 'var(--error-red)', marginTop: 8, fontWeight: 600 }}>
                  {actionError}
                </div>
              )}
            </>
          }
          confirmLabel="Suspend"
          tone="danger"
          requireReason
          busy={busy}
          onConfirm={(reason) => void runAction('suspend', reason)}
          onCancel={() => {
            setDialog(null);
            setActionError(null);
          }}
        />
      )}

      {dialog === 'unsuspend' && (
        <ConfirmDialog
          title="Unsuspend this account?"
          description={
            <>
              <strong>{account.fullName}</strong> will regain access immediately.
              {actionError && (
                <div style={{ color: 'var(--error-red)', marginTop: 8, fontWeight: 600 }}>
                  {actionError}
                </div>
              )}
            </>
          }
          confirmLabel="Unsuspend"
          busy={busy}
          onConfirm={(reason) => void runAction('unsuspend', reason)}
          onCancel={() => {
            setDialog(null);
            setActionError(null);
          }}
        />
      )}

      {dialog === 'unlock' && (
        <ConfirmDialog
          title="Unlock this account?"
          description={
            <>
              This clears the automatic lockout from 5 failed login attempts —{' '}
              <strong>{account.fullName}</strong> can sign in again immediately instead
              of waiting for it to expire on its own. This is not the same as
              suspending or unsuspending.
              {actionError && (
                <div style={{ color: 'var(--error-red)', marginTop: 8, fontWeight: 600 }}>
                  {actionError}
                </div>
              )}
            </>
          }
          confirmLabel="Unlock"
          busy={busy}
          onConfirm={(reason) => void runAction('unlock', reason)}
          onCancel={() => {
            setDialog(null);
            setActionError(null);
          }}
        />
      )}
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
        {value}
      </span>
    </div>
  );
}
