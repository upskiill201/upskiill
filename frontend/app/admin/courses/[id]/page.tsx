'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mutate } from 'swr';
import {
  ArrowLeft,
  BookOpen,
  DollarSign,
  Eye,
  EyeOff,
  Star,
  StarOff,
  Users as UsersIcon,
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
  adminMutate,
  adminStyles as s,
  humanize,
  relativeTime,
  useAdminData,
} from '@/components/admin/AdminUI';

interface CourseDetail {
  course: {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnailUrl: string | null;
    price: number;
    originalPrice: number | null;
    published: boolean;
    featured: boolean;
    category: string;
    level: string;
    duration: string;
    language: string;
    rating: number;
    reviewsCount: number;
    studentsCount: number;
    version: number;
    createdAt: string;
    updatedAt: string;
    instructor: { id: string; fullName: string; email: string; avatarUrl: string | null };
  };
  content: { sectionsCount: number; lessonsCount: number; publishedLessonsCount: number };
  enrollments: number;
  revenue: {
    netMinor: number;
    creatorAmountMinor: number;
    teyroAmountMinor: number;
    transactionCount: number;
  };
  adminHistory: {
    id: string;
    actorId: string;
    action: string;
    reason: string | null;
    createdAt: string;
  }[];
}

type DialogKind = 'publish' | 'unpublish' | 'feature' | 'unfeature' | null;

const money = (minor: number) =>
  `$${(minor / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function AdminCourseDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const key = `/api/admin/courses/${params.id}`;
  const { data, error, isLoading } = useAdminData<CourseDetail>(key);

  const [dialog, setDialog] = useState<DialogKind>(null);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionDetails, setActionDetails] = useState<string[] | undefined>(undefined);

  if (error) return <ErrorState error={error as Error} />;
  if (isLoading || !data) {
    return (
      <>
        <PageHeader title="Course" />
        <Loading />
      </>
    );
  }

  const { course, content, enrollments, revenue, adminHistory } = data;

  const runAction = async (action: 'publish' | 'unpublish' | 'feature' | 'unfeature') => {
    setBusy(true);
    setActionError(null);
    setActionDetails(undefined);
    try {
      await adminMutate(`/api/admin/courses/${course.id}/${action}`, { method: 'POST' });
      await mutate(key);
      setDialog(null);
    } catch (err) {
      const e = err as Error & { status?: number; details?: string[] };
      setActionError(
        e.status === 400 || e.status === 422
          ? e.message
          : "We couldn't update this course. Please try again.",
      );
      setActionDetails(e.details);
    } finally {
      setBusy(false);
    }
  };

  const closeDialog = () => {
    setDialog(null);
    setActionError(null);
    setActionDetails(undefined);
  };

  const ErrorBlock = () =>
    actionError ? (
      <div style={{ color: 'var(--error-red)', marginTop: 8, fontWeight: 600 }}>
        {actionError}
        {actionDetails && actionDetails.length > 0 && (
          <ul style={{ margin: '6px 0 0', paddingLeft: 18, fontWeight: 500 }}>
            {actionDetails.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        )}
      </div>
    ) : null;

  return (
    <>
      <button
        onClick={() => router.push('/admin/courses')}
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
        <ArrowLeft size={14} /> Back to Courses
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
          <Avatar src={course.instructor.avatarUrl ?? undefined} name={course.instructor.fullName} size="lg" />
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
                fontSize: 22,
                fontWeight: 800,
                margin: 0,
              }}
            >
              {course.title}
            </h1>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              by {course.instructor.fullName} · {course.instructor.email}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
              <Pill tone={course.published ? 'good' : 'warn'}>
                {course.published ? 'Published' : 'Draft'}
              </Pill>
              {course.featured && (
                <Pill tone="brand">
                  <Star size={10} /> Featured
                </Pill>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {course.published ? (
            <Button variant="secondary" onClick={() => setDialog('unpublish')}>
              <EyeOff size={15} /> Unpublish
            </Button>
          ) : (
            <Button onClick={() => setDialog('publish')}>
              <Eye size={15} /> Publish
            </Button>
          )}
          {course.published &&
            (course.featured ? (
              <Button variant="secondary" onClick={() => setDialog('unfeature')}>
                <StarOff size={15} /> Unfeature
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => setDialog('feature')}>
                <Star size={15} /> Feature
              </Button>
            ))}
        </div>
      </div>

      <div className={s.grid}>
        <Metric label="Students" value={enrollments.toLocaleString()} icon={<UsersIcon size={13} />} />
        <Metric
          label="Rating"
          value={course.rating > 0 ? course.rating.toFixed(1) : '—'}
          hint={`${course.reviewsCount} reviews`}
        />
        <Metric label="Price" value={`$${course.price.toFixed(2)}`} icon={<DollarSign size={13} />} />
        <Metric
          label="Net revenue"
          value={money(revenue.netMinor)}
          icon={<DollarSign size={13} />}
          hint={`${revenue.transactionCount} transactions`}
        />
      </div>

      <div className={s.grid}>
        <Card title="Course info" icon={<BookOpen size={15} />}>
          <div className={s.bars}>
            <DetailRow label="Category" value={humanize(course.category)} />
            <DetailRow label="Level" value={course.level} />
            <DetailRow label="Language" value={course.language} />
            <DetailRow label="Duration" value={course.duration} />
            <DetailRow label="Created" value={relativeTime(course.createdAt)} />
            <DetailRow label="Updated" value={relativeTime(course.updatedAt)} />
            <DetailRow label="Version" value={String(course.version)} />
          </div>
        </Card>

        <Card title="Content">
          <div className={s.bars}>
            <DetailRow label="Modules" value={String(content.sectionsCount)} />
            <DetailRow label="Lessons" value={String(content.lessonsCount)} />
            <DetailRow
              label="Published lessons"
              value={`${content.publishedLessonsCount} / ${content.lessonsCount}`}
            />
          </div>
        </Card>
      </div>

      <Card title="Revenue split">
        <div className={s.bars}>
          <DetailRow label="Creator share" value={money(revenue.creatorAmountMinor)} />
          <DetailRow label="Teyro share" value={money(revenue.teyroAmountMinor)} />
        </div>
      </Card>

      <Card title="Administrative history">
        {adminHistory.length === 0 ? (
          <Empty>No admin actions taken on this course.</Empty>
        ) : (
          <DataTable columns={['When', 'Action', 'Admin']}>
            {adminHistory.map((h) => (
              <tr key={h.id}>
                <td className={s.mono} title={h.createdAt}>
                  {relativeTime(h.createdAt)}
                </td>
                <td>{humanize(h.action)}</td>
                <td className={s.mono}>{h.actorId}</td>
              </tr>
            ))}
          </DataTable>
        )}
      </Card>

      {dialog === 'publish' && (
        <ConfirmDialog
          title="Publish this course?"
          description={
            <>
              <strong>{course.title}</strong> becomes visible in the public catalog
              and open for enrollment. The same quality checks a creator faces
              (at least one module, no draft lessons) apply here too.
              <ErrorBlock />
            </>
          }
          confirmLabel="Publish"
          busy={busy}
          onConfirm={() => void runAction('publish')}
          onCancel={closeDialog}
        />
      )}

      {dialog === 'unpublish' && (
        <ConfirmDialog
          title="Unpublish this course?"
          description={
            <>
              <strong>{course.title}</strong> is removed from the public catalog
              immediately. Enrolled students keep their access — this only stops
              new enrollments.
              <ErrorBlock />
            </>
          }
          confirmLabel="Unpublish"
          tone="danger"
          busy={busy}
          onConfirm={() => void runAction('unpublish')}
          onCancel={closeDialog}
        />
      )}

      {dialog === 'feature' && (
        <ConfirmDialog
          title="Feature this course?"
          description={
            <>
              Marks <strong>{course.title}</strong> for homepage/explore curation.
              Purely editorial — does not affect enrollment or the catalog.
              <ErrorBlock />
            </>
          }
          confirmLabel="Feature"
          busy={busy}
          onConfirm={() => void runAction('feature')}
          onCancel={closeDialog}
        />
      )}

      {dialog === 'unfeature' && (
        <ConfirmDialog
          title="Remove this course from featured?"
          description={
            <>
              <strong>{course.title}</strong> will no longer be curated on the
              homepage/explore. It stays published.
              <ErrorBlock />
            </>
          }
          confirmLabel="Unfeature"
          busy={busy}
          onConfirm={() => void runAction('unfeature')}
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
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
        {value}
      </span>
    </div>
  );
}
