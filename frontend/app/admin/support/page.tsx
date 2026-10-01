'use client';

/**
 * Support inbox — every Help & feedback conversation from learners and
 * creators. Pick one to read the thread, reply (the user is notified in the
 * app it came from) and mark it answered or solved.
 */

import { useState } from 'react';
import { LifeBuoy, MessageSquareHeart, Smile, Inbox } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import {
  Button,
  Card,
  Empty,
  ErrorState,
  Loading,
  Metric,
  PageHeader,
  Pill,
  SearchInput,
  TabGroup,
  adminMutate,
  adminStyles as s,
  humanize,
  relativeTime,
  useAdminData,
} from '@/components/admin/AdminUI';
import a from './support.module.css';

interface Face {
  id: string;
  fullName: string;
  avatarUrl: string | null;
}

interface Row {
  id: string;
  publicId: string;
  audience: 'LEARNER' | 'CREATOR';
  kind: string;
  subject: string;
  status: 'OPEN' | 'ANSWERED' | 'CLOSED';
  mood: number | null;
  lastActivityAt: string;
  createdAt: string;
  user: Face;
  messages: number;
}

interface ListResponse {
  items: Row[];
  counts: { OPEN: number; ANSWERED: number; CLOSED: number };
  mood30d: { avg: number | null; count: number };
}

interface Thread {
  id: string;
  publicId: string;
  audience: 'LEARNER' | 'CREATOR';
  kind: string;
  subject: string;
  status: Row['status'];
  mood: number | null;
  pagePath: string | null;
  userAgent: string | null;
  createdAt: string;
  replies: { id: string; fromTeyro: boolean; message: string; createdAt: string; author: Face | null }[];
  user: { id: string; fullName: string; email: string; avatarUrl: string | null; role: string; createdAt: string } | null;
}

const STATUS_TONE = { OPEN: 'warn', ANSWERED: 'good', CLOSED: 'neutral' } as const;
const MOOD = ['', 'Frustrating', 'Not great', 'Okay', 'Good', 'Love it'];

export default function AdminSupportPage() {
  const [status, setStatus] = useState('OPEN');
  const [audience, setAudience] = useState('');
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const query = new URLSearchParams();
  if (status) query.set('status', status);
  if (audience) query.set('audience', audience);
  if (search) query.set('q', search);
  const { data, error, isLoading, mutate } = useAdminData<ListResponse>(`/api/support/admin/tickets?${query}`);

  if (error) return <ErrorState error={error as Error} />;

  return (
    <div className={s.page ?? ''}>
      <PageHeader title="Support" subtitle="Help & feedback from learners and creators. Replies notify them in the app they wrote from." />

      {data && (
        <div className={a.metrics}>
          <Metric label="Waiting for a reply" value={data.counts.OPEN} accent={data.counts.OPEN > 0 ? 'warn' : 'none'} icon={<Inbox size={16} />} />
          <Metric label="Answered" value={data.counts.ANSWERED} icon={<LifeBuoy size={16} />} />
          <Metric label="Solved" value={data.counts.CLOSED} icon={<MessageSquareHeart size={16} />} />
          <Metric
            label="How Teyro feels (30 days)"
            value={data.mood30d.avg !== null ? `${data.mood30d.avg} / 5` : '—'}
            hint={`${data.mood30d.count} rating${data.mood30d.count === 1 ? '' : 's'}`}
            icon={<Smile size={16} />}
          />
        </div>
      )}

      <div className={a.filters}>
        <TabGroup options={['OPEN', 'ANSWERED', 'CLOSED', '']} value={status} onChange={setStatus} formatLabel={(v) => (v ? humanize(v) : 'All')} />
        <TabGroup options={['', 'LEARNER', 'CREATOR']} value={audience} onChange={setAudience} formatLabel={(v) => (v ? humanize(v) + 's' : 'Everyone')} />
        <SearchInput value={search} onChange={setSearch} placeholder="Reference, subject, name or email" />
      </div>

      <div className={a.split}>
        <Card>
          {isLoading && !data ? (
            <Loading />
          ) : !data || data.items.length === 0 ? (
            <Empty>No conversations here.</Empty>
          ) : (
            <ul className={a.list}>
              {data.items.map((t) => (
                <li key={t.id}>
                  <button type="button" className={`${a.row} ${openId === t.id ? a.rowOn : ''}`} onClick={() => setOpenId(t.id)}>
                    <Avatar src={t.user.avatarUrl ?? undefined} name={t.user.fullName} size="sm" />
                    <span className={a.rowMain}>
                      <span className={a.rowTop}>
                        <Pill tone={t.audience === 'CREATOR' ? 'brand' : 'neutral'}>{humanize(t.audience)}</Pill>
                        <Pill>{humanize(t.kind)}</Pill>
                        <Pill tone={STATUS_TONE[t.status]}>{humanize(t.status)}</Pill>
                      </span>
                      <strong className={a.subject}>{t.subject}</strong>
                      <span className={a.meta}>
                        {t.user.fullName} · {t.publicId} · {t.messages} message{t.messages === 1 ? '' : 's'}
                        {t.mood ? ` · ${MOOD[t.mood]}` : ''}
                      </span>
                    </span>
                    <span className={a.time}>{relativeTime(t.lastActivityAt)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {openId ? (
          <ThreadPanel key={openId} id={openId} onChanged={() => void mutate()} />
        ) : (
          <Card>
            <Empty>Pick a conversation to read and reply.</Empty>
          </Card>
        )}
      </div>
    </div>
  );
}

function ThreadPanel({ id, onChanged }: { id: string; onChanged: () => void }) {
  const { data, error, isLoading, mutate } = useAdminData<Thread>(`/api/support/admin/tickets/${id}`);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  if (error) return <ErrorState error={error as Error} />;
  if (isLoading || !data) return <Card><Loading /></Card>;

  const reply = async () => {
    if (!draft.trim()) return;
    setBusy(true);
    setErr(null);
    try {
      const next = await adminMutate<Thread>(`/api/support/admin/tickets/${id}/replies`, { method: 'POST', body: { message: draft.trim() } });
      await mutate(next, { revalidate: false });
      setDraft('');
      onChanged();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const setStatus = async (status: Thread['status']) => {
    setBusy(true);
    try {
      await adminMutate(`/api/support/admin/tickets/${id}/status`, { method: 'PATCH', body: { status } });
      await mutate();
      onChanged();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card title={`${data.publicId} · ${data.subject}`}>
      <div className={a.who}>
        {data.user && (
          <>
            <Avatar src={data.user.avatarUrl ?? undefined} name={data.user.fullName} size="sm" />
            <span>
              <strong>{data.user.fullName}</strong> · {data.user.email} · {humanize(data.user.role)}
            </span>
          </>
        )}
      </div>
      <div className={a.context}>
        <span>From the {data.audience === 'CREATOR' ? 'creator studio' : 'learner app'}</span>
        {data.pagePath && <span>Page: {data.pagePath}</span>}
        {data.mood && <span>Mood: {MOOD[data.mood]}</span>}
        {data.userAgent && <span className={a.ua}>{data.userAgent}</span>}
      </div>

      <ol className={a.thread}>
        {data.replies.map((r) => (
          <li key={r.id} className={r.fromTeyro ? a.staff : a.user}>
            <span className={a.msgMeta}>
              {r.fromTeyro ? `Teyro · ${r.author?.fullName ?? 'Staff'}` : (r.author?.fullName ?? 'User')} · {relativeTime(r.createdAt)}
            </span>
            <p>{r.message}</p>
          </li>
        ))}
      </ol>

      <textarea
        className={a.reply}
        rows={4}
        maxLength={4000}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Write a reply. The user sees it as “Teyro Support”."
      />
      {err && <p className={a.err}>{err}</p>}
      <div className={a.actions}>
        {data.status !== 'CLOSED' ? (
          <Button variant="secondary" onClick={() => void setStatus('CLOSED')} disabled={busy}>
            Mark solved
          </Button>
        ) : (
          <Button variant="secondary" onClick={() => void setStatus('OPEN')} disabled={busy}>
            Reopen
          </Button>
        )}
        <Button onClick={() => void reply()} disabled={busy || !draft.trim()}>
          Send reply
        </Button>
      </div>
    </Card>
  );
}
