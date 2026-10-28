'use client';

/**
 * Teyro HQ → Photos: profile photos learners reported. Remove takes the photo
 * down everywhere (the person falls back to their Teyro character and gets a
 * kind note in their bell); Keep dismisses the reports.
 */

import { useState } from 'react';
import { mutate } from 'swr';
import { Glyph } from '@/components/art/Glyph';
import Avatar from '@/components/ui/Avatar';
import {
  Banner,
  Button,
  Card,
  Empty,
  ErrorState,
  Loading,
  PageHeader,
  Pill,
  adminMutate,
  humanize,
  relativeTime,
  useAdminData,
} from '@/components/admin/AdminUI';
import ps from './PhotosAdmin.module.css';

interface ReportRow {
  userId: string;
  name: string;
  email: string;
  avatar: string | null;
  stillAPhoto: boolean;
  reports: number;
  reasons: string[];
  firstAt: string;
  lastAt: string;
}

const KEY = '/api/avatar/admin/reports';

export default function PhotosAdmin() {
  const { data, error, isLoading } = useAdminData<{ open: ReportRow[] }>(KEY);
  const [busy, setBusy] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);

  const act = async (row: ReportRow, action: 'remove' | 'dismiss') => {
    setBusy(row.userId);
    setNote(null);
    try {
      await adminMutate(`/api/avatar/admin/${encodeURIComponent(row.userId)}/${action}`);
      setNote(action === 'remove' ? `Removed ${row.name}'s photo.` : `Kept ${row.name}'s photo.`);
      await mutate(KEY);
    } catch (e) {
      setNote(e instanceof Error ? e.message : 'That did not work.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <PageHeader title="Photos" subtitle="Profile photos learners reported. Characters can't be reported." />
      {note && <Banner>{note}</Banner>}
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorState error={error} />
      ) : !data || data.open.length === 0 ? (
        <Empty>No open reports. Nobody has flagged a photo.</Empty>
      ) : (
        <Card title={`${data.open.length} to review`} icon={<Glyph name="flag" size={18} />}>
          <ul className={ps.list}>
            {data.open.map((r) => (
              <li key={r.userId} className={ps.row}>
                <Avatar src={r.avatar} seed={r.userId} name={r.name} px={72} />
                <div className={ps.text}>
                  <strong>{r.name}</strong>
                  <span>{r.email}</span>
                  <span className={ps.pills}>
                    <Pill tone={r.reports > 2 ? 'bad' : 'warn'}>
                      {r.reports} report{r.reports === 1 ? '' : 's'}
                    </Pill>
                    {r.reasons.map((x) => (
                      <Pill key={x}>{humanize(x)}</Pill>
                    ))}
                    {!r.stillAPhoto && <Pill tone="good">Photo already changed</Pill>}
                  </span>
                  <span className={ps.when}>Last reported {relativeTime(r.lastAt)}</span>
                </div>
                <div className={ps.actions}>
                  <Button size="sm" variant="danger" disabled={busy === r.userId || !r.stillAPhoto} onClick={() => void act(r, 'remove')}>
                    Remove photo
                  </Button>
                  <Button size="sm" variant="secondary" disabled={busy === r.userId} onClick={() => void act(r, 'dismiss')}>
                    Keep
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
}
