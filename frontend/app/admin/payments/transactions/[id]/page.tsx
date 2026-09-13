'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, CreditCard, ShieldCheck, User as UserIcon } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import {
  Card,
  DataTable,
  Empty,
  ErrorState,
  Loading,
  Metric,
  PageHeader,
  Pill,
  adminStyles as s,
  humanize,
  relativeTime,
  useAdminData,
} from '@/components/admin/AdminUI';

interface TransactionDetail {
  transaction: {
    id: string;
    publicId: string;
    type: string;
    provider: string;
    providerReference: string | null;
    grossMinor: number;
    discountMinor: number;
    feeMinor: number;
    netMinor: number;
    creatorSharePct: number;
    creatorAmountMinor: number;
    teyroAmountMinor: number;
    currency: string;
    nativeCurrency: string | null;
    nativeAmountMinor: number | null;
    reason: string | null;
    occurredAt: string;
    createdAt: string;
  };
  student: { id: string; fullName: string; email: string; avatarUrl: string | null } | null;
  creator: { id: string; fullName: string; email: string; avatarUrl: string | null } | null;
  course: { id: string; title: string; thumbnailUrl: string | null } | null;
  order: { id: string; totalAmount: number; status: string; createdAt: string } | null;
  related: {
    id: string;
    publicId: string;
    type: string;
    netMinor: number;
    occurredAt: string;
  }[];
  auditHistory: {
    id: string;
    actorId: string;
    action: string;
    reason: string | null;
    createdAt: string;
  }[];
}

const money = (minor: number) =>
  `$${(minor / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function typeTone(type: string) {
  if (type === 'SALE' || type === 'RENEWAL' || type === 'REVERSAL') return 'good' as const;
  if (type === 'REFUND' || type === 'CHARGEBACK') return 'bad' as const;
  return 'neutral' as const;
}

export default function AdminTransactionDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data, error, isLoading } = useAdminData<TransactionDetail>(
    `/api/admin/payments/transactions/${params.id}`,
  );

  if (error) return <ErrorState error={error as Error} />;
  if (isLoading || !data) {
    return (
      <>
        <PageHeader title="Transaction" />
        <Loading />
      </>
    );
  }

  const { transaction, student, creator, course, order, related, auditHistory } = data;

  return (
    <>
      <button
        onClick={() => router.push('/admin/payments/transactions')}
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
        <ArrowLeft size={14} /> Back to Transactions
      </button>

      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
            fontSize: 22,
            fontWeight: 800,
            margin: 0,
          }}
        >
          {transaction.publicId}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
          <Pill tone={typeTone(transaction.type)}>{humanize(transaction.type)}</Pill>
          <Pill tone="neutral">{humanize(transaction.provider)}</Pill>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            {relativeTime(transaction.occurredAt)}
          </span>
        </div>
      </div>

      <div className={s.grid}>
        <Metric label="Gross amount" value={money(transaction.grossMinor)} />
        <Metric label="Creator share" value={`${money(transaction.creatorAmountMinor)} (${transaction.creatorSharePct}%)`} />
        <Metric label="Teyro share" value={money(transaction.teyroAmountMinor)} />
        <Metric label="Net" value={money(transaction.netMinor)} />
      </div>

      <div className={s.grid}>
        <Card title="Transaction" icon={<CreditCard size={15} />}>
          <div className={s.bars}>
            <DetailRow label="Provider reference" value={transaction.providerReference ?? '—'} />
            <DetailRow
              label="Native amount"
              value={
                transaction.nativeAmountMinor != null && transaction.nativeCurrency
                  ? `${(transaction.nativeAmountMinor / 100).toLocaleString()} ${transaction.nativeCurrency}`
                  : '—'
              }
            />
            <DetailRow label="Discount" value={money(transaction.discountMinor)} />
            <DetailRow label="Fee" value={money(transaction.feeMinor)} />
            <DetailRow label="Reason" value={transaction.reason ?? '—'} />
            <DetailRow label="Occurred" value={new Date(transaction.occurredAt).toLocaleString()} />
          </div>
        </Card>

        <Card title="User & purchase" icon={<UserIcon size={15} />}>
          <div className={s.bars}>
            {student ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar src={student.avatarUrl ?? undefined} name={student.fullName} size="sm" />
                <div>
                  <div style={{ fontWeight: 700 }}>
                    <Link href={`/admin/users/${student.id}`}>{student.fullName}</Link>
                  </div>
                  <div className={s.mono}>{student.email}</div>
                </div>
              </div>
            ) : (
              <DetailRow label="Student" value="—" />
            )}
            {course && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <BookOpen size={14} />
                <Link href={`/admin/courses/${course.id}`}>{course.title}</Link>
              </div>
            )}
            {order && (
              <DetailRow label="Order total" value={`$${order.totalAmount.toFixed(2)} (${humanize(order.status)})`} />
            )}
          </div>
        </Card>
      </div>

      <Card title="Creator" icon={<ShieldCheck size={15} />}>
        {creator ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar src={creator.avatarUrl ?? undefined} name={creator.fullName} size="sm" />
            <div>
              <div style={{ fontWeight: 700 }}>
                <Link href={`/admin/creators/${creator.id}`}>{creator.fullName}</Link>
              </div>
              <div className={s.mono}>{creator.email}</div>
            </div>
          </div>
        ) : (
          <Empty>No creator associated with this transaction.</Empty>
        )}
      </Card>

      <Card title="Related transactions">
        {related.length === 0 ? (
          <Empty>No refunds, chargebacks, or reversals against this transaction.</Empty>
        ) : (
          <DataTable columns={['Reference', 'Type', 'Amount', 'Date']}>
            {related.map((r) => (
              <tr key={r.id}>
                <td className={s.mono}>
                  <Link href={`/admin/payments/transactions/${r.id}`}>{r.publicId}</Link>
                </td>
                <td>
                  <Pill tone={typeTone(r.type)}>{humanize(r.type)}</Pill>
                </td>
                <td className={s.mono}>{money(r.netMinor)}</td>
                <td className={s.mono} title={r.occurredAt}>
                  {relativeTime(r.occurredAt)}
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Card>

      <Card title="Administrative history">
        {auditHistory.length === 0 ? (
          <Empty>No admin actions recorded against this transaction.</Empty>
        ) : (
          <DataTable columns={['When', 'Action', 'Reason', 'Admin']}>
            {auditHistory.map((h) => (
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
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
        {value}
      </span>
    </div>
  );
}
