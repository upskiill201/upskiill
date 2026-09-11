'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { mutate } from 'swr';
import {
  ArrowLeft,
  Ban,
  BadgeCheck,
  BadgeX,
  BookOpen,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  Sparkles,
  Users as UsersIcon,
  Wallet,
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

interface CreatorDetail {
  account: {
    id: string;
    fullName: string;
    email: string;
    avatarUrl: string | null;
    accountStatus: string;
    createdAt: string;
    lastLoginAt: string | null;
    lastActiveAt: string | null;
    emailVerifiedAt: string | null;
    isVerified: boolean;
    whatsappVerified: boolean;
    instructorProfile: {
      displayName: string;
      professionalHeadline: string | null;
      bio: string | null;
      verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
      yearsOfExperience: number | null;
      expertise: string[] | null;
      onboardingCompleted: boolean;
    } | null;
  };
  profile: {
    headline: string | null;
    bio: string | null;
    niche: string | null;
    primaryExpertise: string | null;
    skills: string[] | null;
    website: string | null;
    linkedin: string | null;
    youtube: string | null;
    twitter: string | null;
  } | null;
  onboarding: { completed: boolean };
  summary: {
    coursesCount: number;
    publishedCoursesCount: number;
    totalEnrollments: number;
    uniqueStudents: number;
    earningsLifetimeMinor: number | null;
  };
  courses: {
    id: string;
    title: string;
    thumbnailUrl: string | null;
    category: string;
    published: boolean;
    reviewStatus: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
    enrollments: number;
  }[];
  earnings: {
    transactions: {
      id: string;
      type: string;
      grossMinor: number;
      creatorAmountMinor: number;
      teyroAmountMinor: number;
      occurredAt: string;
      courseId: string | null;
    }[];
    payouts: {
      id: string;
      publicId: string;
      amountMinor: number;
      status: string;
      requestedAt: string;
      paidAt: string | null;
    }[];
    agreement: { tier: string; creatorSharePct: number; isFounding: boolean };
    balances: {
      lifetimeEarned: number;
      pendingClearing: number;
      reservedForPayout: number;
      available: number;
      totalPaidOut: number;
    };
  } | null;
  activity: {
    id: string;
    action: string;
    previousStatus: string;
    newStatus: string;
    createdAt: string;
    course: { id: string; title: string };
  }[];
  adminHistory: {
    id: string;
    actorId: string;
    action: string;
    reason: string | null;
    createdAt: string;
  }[];
}

type ActionDialog = 'verify' | 'unverify' | 'suspend' | 'unsuspend' | null;

const money = (minor: number) =>
  `$${(minor / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function verificationTone(status: string | undefined) {
  if (status === 'VERIFIED') return 'good' as const;
  if (status === 'REJECTED') return 'bad' as const;
  return 'warn' as const;
}

export default function AdminCreatorDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const key = `/api/admin/creators/${params.id}`;
  const { data, error, isLoading } = useAdminData<CreatorDetail>(key);

  const [dialog, setDialog] = useState<ActionDialog>(null);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  if (error) return <ErrorState error={error as Error} />;
  if (isLoading || !data) {
    return (
      <>
        <PageHeader title="Creator" />
        <Loading />
      </>
    );
  }

  const { account, profile, summary, courses, earnings, activity, adminHistory } = data;
  const verificationStatus = account.instructorProfile?.verificationStatus ?? null;
  const isSuspended = account.accountStatus === 'SUSPENDED';
  const isVerified = verificationStatus === 'VERIFIED';

  const closeDialog = () => {
    setDialog(null);
    setActionError(null);
  };

  const handleError = (err: unknown) => {
    const e = err as Error & { status?: number };
    setActionError(
      e.status === 400 || e.status === 403
        ? e.message
        : "We couldn't update this creator. Please try again.",
    );
  };

  const runVerification = async (action: 'verify' | 'unverify', reason?: string) => {
    setBusy(true);
    setActionError(null);
    try {
      await adminMutate(`/api/admin/creators/${account.id}/${action}`, {
        method: 'POST',
        body: { reason },
      });
      await mutate(key);
      setDialog(null);
    } catch (err) {
      handleError(err);
    } finally {
      setBusy(false);
    }
  };

  // Suspend/unsuspend deliberately hit the existing Users endpoint directly
  // — there is no separate creator-suspend action, by design (see
  // backend/src/admin/admin-creators.service.ts).
  const runAccountAction = async (action: 'suspend' | 'unsuspend', reason?: string) => {
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
      handleError(err);
    } finally {
      setBusy(false);
    }
  };

  const ErrorBlock = () =>
    actionError ? (
      <div style={{ color: 'var(--error-red)', marginTop: 8, fontWeight: 600 }}>
        {actionError}
      </div>
    ) : null;

  return (
    <>
      <button
        onClick={() => router.push('/admin/creators')}
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
        <ArrowLeft size={14} /> Back to Creators
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
          <Avatar
            src={account.avatarUrl ?? undefined}
            name={account.instructorProfile?.displayName ?? account.fullName}
            size="lg"
          />
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
                fontSize: 22,
                fontWeight: 800,
                margin: 0,
              }}
            >
              {account.instructorProfile?.displayName ?? account.fullName}
            </h1>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              {account.email}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
              <Pill tone={accountStatusTone(account.accountStatus)}>
                {humanize(account.accountStatus)}
              </Pill>
              <Pill tone={verificationTone(verificationStatus ?? undefined)}>
                {verificationStatus ? humanize(verificationStatus) : 'No profile yet'}
              </Pill>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                Joined {relativeTime(account.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {isVerified ? (
            <Button variant="secondary" onClick={() => setDialog('unverify')}>
              <BadgeX size={15} /> Unverify
            </Button>
          ) : (
            <Button onClick={() => setDialog('verify')}>
              <BadgeCheck size={15} /> Verify creator
            </Button>
          )}
          {isSuspended ? (
            <Button onClick={() => setDialog('unsuspend')}>
              <CheckCircle2 size={15} /> Unsuspend
            </Button>
          ) : (
            <Button variant="danger" onClick={() => setDialog('suspend')}>
              <Ban size={15} /> Suspend
            </Button>
          )}
        </div>
      </div>

      <div className={s.grid}>
        <Metric label="Courses" value={summary.coursesCount} hint={`${summary.publishedCoursesCount} published`} icon={<BookOpen size={13} />} />
        <Metric label="Enrollments" value={summary.totalEnrollments.toLocaleString()} icon={<UsersIcon size={13} />} />
        <Metric label="Unique students" value={summary.uniqueStudents.toLocaleString()} icon={<UsersIcon size={13} />} />
        <Metric
          label="Lifetime earnings"
          value={summary.earningsLifetimeMinor != null ? money(summary.earningsLifetimeMinor) : '—'}
          icon={<DollarSign size={13} />}
        />
      </div>

      <div className={s.grid}>
        <Card title="Account" icon={<ShieldCheck size={15} />}>
          <div className={s.bars}>
            <DetailRow label="Email verified" value={account.isVerified ? 'Yes' : 'No'} />
            <DetailRow label="WhatsApp verified" value={account.whatsappVerified ? 'Yes' : 'No'} />
            <DetailRow label="Last login" value={relativeTime(account.lastLoginAt)} />
            <DetailRow label="Last active" value={relativeTime(account.lastActiveAt)} />
            <DetailRow
              label="Onboarding"
              value={data.onboarding.completed ? 'Completed' : 'Not completed'}
            />
          </div>
        </Card>

        <Card title="Creator profile" icon={<Sparkles size={15} />}>
          {account.instructorProfile || profile ? (
            <div className={s.bars}>
              <DetailRow
                label="Headline"
                value={account.instructorProfile?.professionalHeadline || profile?.headline || '—'}
              />
              <DetailRow label="Niche" value={profile?.niche || profile?.primaryExpertise || '—'} />
              <DetailRow
                label="Years of experience"
                value={
                  account.instructorProfile?.yearsOfExperience != null
                    ? String(account.instructorProfile.yearsOfExperience)
                    : '—'
                }
              />
              <DetailRow
                label="Bio"
                value={account.instructorProfile?.bio || profile?.bio || '—'}
              />
            </div>
          ) : (
            <Empty>This creator hasn&apos;t set up a creator profile yet.</Empty>
          )}
        </Card>
      </div>

      <Card title="Courses" icon={<BookOpen size={15} />}>
        {courses.length === 0 ? (
          <Empty>This creator hasn&apos;t created any courses yet.</Empty>
        ) : (
          <DataTable columns={['Course', 'Category', 'Status', 'Enrollments', 'Rating', 'Updated']}>
            {courses.map((c) => (
              <tr
                key={c.id}
                onClick={() => router.push(`/admin/courses/${c.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <td style={{ fontWeight: 700 }}>{c.title}</td>
                <td>{humanize(c.category)}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <Pill tone={c.published ? 'good' : 'warn'}>
                      {c.published ? 'Published' : 'Draft'}
                    </Pill>
                    <Pill tone="neutral">{humanize(c.reviewStatus)}</Pill>
                  </div>
                </td>
                <td className={s.mono}>{c.enrollments.toLocaleString()}</td>
                <td className={s.mono}>{c.rating > 0 ? c.rating.toFixed(1) : '—'}</td>
                <td className={s.mono} title={c.updatedAt}>
                  {relativeTime(c.updatedAt)}
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Card>

      <Card title="Earnings" icon={<Wallet size={15} />}>
        {earnings ? (
          <>
            <div className={s.grid} style={{ marginBottom: 16 }}>
              <Metric label="Available" value={money(earnings.balances.available)} />
              <Metric label="Pending clearing" value={money(earnings.balances.pendingClearing)} />
              <Metric label="Reserved for payout" value={money(earnings.balances.reservedForPayout)} />
              <Metric label="Paid out" value={money(earnings.balances.totalPaidOut)} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <DetailRow
                label="Revenue share"
                value={`${earnings.agreement.creatorSharePct}% creator${earnings.agreement.isFounding ? ' · Founding' : ''}`}
              />
            </div>

            {earnings.transactions.length === 0 ? (
              <Empty>No earnings have been recorded for this creator yet.</Empty>
            ) : (
              <DataTable columns={['When', 'Type', 'Gross', 'Creator share', 'Teyro share']}>
                {earnings.transactions.slice(0, 20).map((t) => (
                  <tr key={t.id}>
                    <td className={s.mono} title={t.occurredAt}>
                      {relativeTime(t.occurredAt)}
                    </td>
                    <td>{humanize(t.type)}</td>
                    <td className={s.mono}>{money(t.grossMinor)}</td>
                    <td className={s.mono}>{money(t.creatorAmountMinor)}</td>
                    <td className={s.mono}>{money(t.teyroAmountMinor)}</td>
                  </tr>
                ))}
              </DataTable>
            )}

            {earnings.payouts.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>
                  Payout history
                </div>
                <DataTable columns={['Reference', 'Amount', 'Status', 'Requested', 'Paid']}>
                  {earnings.payouts.map((p) => (
                    <tr key={p.id}>
                      <td className={s.mono}>{p.publicId}</td>
                      <td className={s.mono}>{money(p.amountMinor)}</td>
                      <td>
                        <Pill tone={p.status === 'PAID' ? 'good' : p.status === 'REJECTED' || p.status === 'FAILED' || p.status === 'CANCELLED' ? 'bad' : 'brand'}>
                          {humanize(p.status)}
                        </Pill>
                      </td>
                      <td className={s.mono} title={p.requestedAt}>
                        {relativeTime(p.requestedAt)}
                      </td>
                      <td className={s.mono}>{p.paidAt ? relativeTime(p.paidAt) : '—'}</td>
                    </tr>
                  ))}
                </DataTable>
              </div>
            )}
          </>
        ) : (
          <Empty>No earnings have been recorded for this creator yet.</Empty>
        )}
      </Card>

      <Card title="Creator activity">
        {activity.length === 0 ? (
          <Empty>No recent creator activity found.</Empty>
        ) : (
          <DataTable columns={['When', 'Action', 'Course']}>
            {activity.map((a) => (
              <tr key={a.id}>
                <td className={s.mono} title={a.createdAt}>
                  {relativeTime(a.createdAt)}
                </td>
                <td>{humanize(a.action)}</td>
                <td>
                  <Link href={`/admin/courses/${a.course.id}`}>{a.course.title}</Link>
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Card>

      <Card title="Administrative history">
        {adminHistory.length === 0 ? (
          <Empty>No admin actions taken on this creator.</Empty>
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

      {dialog === 'verify' && (
        <ConfirmDialog
          title="Verify this creator?"
          description={
            <>
              Marks <strong>{account.instructorProfile?.displayName ?? account.fullName}</strong>{' '}
              as verified/trusted. This is independent of course approval.
              <ErrorBlock />
            </>
          }
          confirmLabel="Verify"
          busy={busy}
          onConfirm={() => void runVerification('verify')}
          onCancel={closeDialog}
        />
      )}

      {dialog === 'unverify' && (
        <ConfirmDialog
          title="Remove verification?"
          description={
            <>
              <strong>{account.instructorProfile?.displayName ?? account.fullName}</strong> goes
              back to pending verification.
              <ErrorBlock />
            </>
          }
          confirmLabel="Unverify"
          tone="danger"
          busy={busy}
          onConfirm={() => void runVerification('unverify')}
          onCancel={closeDialog}
        />
      )}

      {dialog === 'suspend' && (
        <ConfirmDialog
          title="Suspend this creator?"
          description={
            <>
              <strong>{account.fullName}</strong> will be signed out and unable to log back in.
              Existing published courses, enrollments, and financial records are preserved. This
              is reversible.
              <ErrorBlock />
            </>
          }
          confirmLabel="Suspend"
          tone="danger"
          requireReason
          busy={busy}
          onConfirm={(reason) => void runAccountAction('suspend', reason)}
          onCancel={closeDialog}
        />
      )}

      {dialog === 'unsuspend' && (
        <ConfirmDialog
          title="Unsuspend this creator?"
          description={
            <>
              <strong>{account.fullName}</strong> will regain access immediately.
              <ErrorBlock />
            </>
          }
          confirmLabel="Unsuspend"
          busy={busy}
          onConfirm={(reason) => void runAccountAction('unsuspend', reason)}
          onCancel={closeDialog}
        />
      )}
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', textAlign: 'right', maxWidth: '60%' }}>
        {value}
      </span>
    </div>
  );
}
