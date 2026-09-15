'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mutate } from 'swr';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  DollarSign,
  Eye,
  EyeOff,
  MessageSquareWarning,
  Star,
  StarOff,
  Users as UsersIcon,
  XCircle,
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { Toast } from '@/components/ui/Toast';
import {
  Banner,
  Button,
  Card,
  ConfirmDialog,
  CourseReviewDecisionDialog,
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
    reviewStatus: string;
    submittedForReviewAt: string | null;
    reviewedAt: string | null;
    reviewedBy: string | null;
    instructor: { id: string; fullName: string; email: string; avatarUrl: string | null };
  };
  content: {
    sectionsCount: number;
    lessonsCount: number;
    publishedLessonsCount: number;
    sections: {
      id: string;
      title: string;
      lessons: { id: string; title: string; status: string; lessonType: string }[];
    }[];
  };
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
  reviewHistory: {
    id: string;
    reviewerId: string | null;
    action: string;
    previousStatus: string;
    newStatus: string;
    feedback: string | null;
    internalNote: string | null;
    createdAt: string;
  }[];
  /** Count of `SUBMITTED` review-history rows — > 1 means a resubmission. */
  submissionCount: number;
  /** `assessCourseReadiness` output — warnings only, never blocks an action. */
  readiness: { issues: string[] };
}

type ActionDialog =
  | 'publish'
  | 'unpublish'
  | 'feature'
  | 'unfeature'
  | 'startReview'
  | 'approveReview'
  | 'requestChanges'
  | 'rejectReview'
  | null;

const money = (minor: number) =>
  `$${(minor / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const reviewTone = (status: string) => {
  if (status === 'APPROVED') return 'good';
  if (status === 'CHANGES_REQUESTED' || status === 'REJECTED') return 'bad';
  if (status === 'SUBMITTED' || status === 'UNDER_REVIEW') return 'brand';
  return 'neutral';
};

export default function AdminCourseDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const key = `/api/admin/courses/${params.id}`;
  const { data, error, isLoading } = useAdminData<CourseDetail>(key);

  const [dialog, setDialog] = useState<ActionDialog>(null);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionDetails, setActionDetails] = useState<string[] | undefined>(undefined);
  const [toast, setToast] = useState<{ message: string; key: number } | null>(null);

  if (error) return <ErrorState error={error as Error} />;
  if (isLoading || !data) {
    return (
      <>
        <PageHeader title="Course" />
        <Loading />
      </>
    );
  }

  const { course, content, enrollments, revenue, adminHistory, reviewHistory, submissionCount, readiness } = data;

  const closeDialog = () => {
    setDialog(null);
    setActionError(null);
    setActionDetails(undefined);
  };

  const handleError = (err: unknown) => {
    const e = err as Error & { status?: number; details?: string[] };
    setActionError(
      e.status === 400 || e.status === 422 || e.status === 403
        ? e.message
        : "We couldn't update this course. Please try again.",
    );
    setActionDetails(e.details);
  };

  // Lifecycle actions with no extra input (publish/unpublish/feature/
  // unfeature/startReview/approve) — mirrors the Users page's runAction.
  // `successMessage`, when given, surfaces a toast once the mutation lands.
  const runAction = async (path: string, successMessage?: string) => {
    setBusy(true);
    setActionError(null);
    setActionDetails(undefined);
    try {
      await adminMutate(`/api/admin/courses/${course.id}/${path}`, { method: 'POST' });
      await mutate(key);
      setDialog(null);
      if (successMessage) setToast({ message: successMessage, key: Date.now() });
    } catch (err) {
      handleError(err);
    } finally {
      setBusy(false);
    }
  };

  // Review decisions that carry required text (request-changes, reject).
  const runReviewDecision = async (
    path: 'review/request-changes' | 'review/reject',
    bodyKey: 'feedback' | 'reason',
    text: string,
    successMessage: string,
  ) => {
    setBusy(true);
    setActionError(null);
    setActionDetails(undefined);
    try {
      await adminMutate(`/api/admin/courses/${course.id}/${path}`, {
        method: 'POST',
        body: { [bodyKey]: text },
      });
      await mutate(key);
      setDialog(null);
      setToast({ message: successMessage, key: Date.now() });
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
        {actionDetails && actionDetails.length > 0 && (
          <ul style={{ margin: '6px 0 0', paddingLeft: 18, fontWeight: 500 }}>
            {actionDetails.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        )}
      </div>
    ) : null;

  const canStartReview = course.reviewStatus === 'SUBMITTED';
  const canDecide = course.reviewStatus === 'SUBMITTED' || course.reviewStatus === 'UNDER_REVIEW';
  const canReject = course.reviewStatus !== 'REJECTED';

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
              <Pill tone={reviewTone(course.reviewStatus)}>{humanize(course.reviewStatus)}</Pill>
              {submissionCount > 1 && <Pill tone="neutral">Resubmission #{submissionCount}</Pill>}
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

      {/* ── Review workspace ─────────────────────────────────────────── */}
      <Card title="Review" icon={<MessageSquareWarning size={15} />}>
        <div className={s.bars} style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Status</span>
            <Pill tone={reviewTone(course.reviewStatus)}>{humanize(course.reviewStatus)}</Pill>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Submitted</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>
              {relativeTime(course.submittedForReviewAt)}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Last reviewed</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{relativeTime(course.reviewedAt)}</span>
          </div>
        </div>

        {readiness.issues.length > 0 && (
          <Banner tone="warn">
            <AlertTriangle size={16} style={{ flexShrink: 0, color: 'var(--warning)' }} />
            <div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>
                Readiness warnings — review still requires human judgment
              </div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {readiness.issues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          </Banner>
        )}

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {canStartReview && (
            <Button variant="secondary" onClick={() => runAction('review/start')} disabled={busy}>
              Start review
            </Button>
          )}
          {canDecide && (
            <>
              <Button onClick={() => setDialog('approveReview')}>
                <CheckCircle2 size={15} /> Approve
              </Button>
              <Button variant="secondary" onClick={() => setDialog('requestChanges')}>
                <MessageSquareWarning size={15} /> Request changes
              </Button>
            </>
          )}
          {canReject && (
            <Button variant="danger" onClick={() => setDialog('rejectReview')}>
              <XCircle size={15} /> Reject
            </Button>
          )}
        </div>

        {reviewHistory.length === 0 ? (
          <Empty>No review activity yet — this course has never been submitted.</Empty>
        ) : (
          <DataTable columns={['When', 'Action', 'Feedback', 'Admin']}>
            {reviewHistory.map((h) => (
              <tr key={h.id}>
                <td className={s.mono} title={h.createdAt}>
                  {relativeTime(h.createdAt)}
                </td>
                <td>{humanize(h.action)}</td>
                <td style={{ maxWidth: 320 }}>{h.feedback || '—'}</td>
                <td className={s.mono}>{h.reviewerId || 'system'}</td>
              </tr>
            ))}
          </DataTable>
        )}
      </Card>

      <div className={s.grid}>
        <Card title="Course info" icon={<BookOpen size={15} />}>
          <div className={s.bars} style={{ marginBottom: 16 }}>
            <DetailRow label="Category" value={humanize(course.category)} />
            <DetailRow label="Level" value={course.level} />
            <DetailRow label="Language" value={course.language} />
            <DetailRow label="Duration" value={course.duration} />
            <DetailRow label="Created" value={relativeTime(course.createdAt)} />
            <DetailRow label="Updated" value={relativeTime(course.updatedAt)} />
            <DetailRow label="Version" value={String(course.version)} />
          </div>
          {course.description && (
            <div>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Description</span>
              <div
                style={{
                  marginTop: 6,
                  padding: 12,
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  background: 'var(--bg-section)',
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: 'var(--text-primary)',
                  maxHeight: 240,
                  overflowY: 'auto',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {course.description}
              </div>
            </div>
          )}
        </Card>

        <Card title="Content">
          <div className={s.bars} style={{ marginBottom: content.sections.length ? 16 : 0 }}>
            <DetailRow label="Modules" value={String(content.sectionsCount)} />
            <DetailRow label="Lessons" value={String(content.lessonsCount)} />
            <DetailRow
              label="Published lessons"
              value={`${content.publishedLessonsCount} / ${content.lessonsCount}`}
            />
          </div>
          {content.sections.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {content.sections.map((sec) => (
                <div key={sec.id}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>
                    {sec.title}
                  </div>
                  {sec.lessons.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => router.push(`/admin/courses/${course.id}/review/${l.id}`)}
                      title="Review this lesson's content"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        padding: '4px 0 4px 12px',
                        fontSize: 13,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        color: 'var(--text-primary)',
                        borderRadius: 8,
                      }}
                    >
                      <span style={{ textDecoration: 'underline', textDecorationColor: 'transparent' }}>
                        {l.title}
                      </span>
                      <Pill tone={l.status === 'published' ? 'good' : 'warn'}>
                        {humanize(l.status)}
                      </Pill>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
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

      {dialog === 'publish' && (
        <ConfirmDialog
          title="Publish this course?"
          description={
            <>
              <strong>{course.title}</strong> becomes visible in the public catalog
              and open for enrollment. Requires approval — the same quality checks
              a creator faces (at least one module, no draft lessons) apply here too.
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

      {dialog === 'approveReview' && (
        <ConfirmDialog
          title="Approve this course?"
          description={
            <>
              This confirms <strong>{course.title}</strong> passed Teyro&apos;s review.
              The creator (or an admin) can publish it once approved — approval alone
              does not make it live.
              <ErrorBlock />
            </>
          }
          confirmLabel="Approve course"
          busy={busy}
          onConfirm={() => void runAction('review/approve', 'Course approved')}
          onCancel={closeDialog}
        />
      )}

      {dialog === 'requestChanges' && (
        <CourseReviewDecisionDialog
          title="Request changes"
          description={
            <>
              Describe what needs to change before <strong>{course.title}</strong>{' '}
              can move forward. This is shown directly to the creator.
              <ErrorBlock />
            </>
          }
          confirmLabel="Request changes"
          busy={busy}
          onConfirm={(feedback) =>
            void runReviewDecision('review/request-changes', 'feedback', feedback, 'Changes requested')
          }
          onCancel={closeDialog}
        />
      )}

      {dialog === 'rejectReview' && (
        <CourseReviewDecisionDialog
          title="Reject this course?"
          description={
            <>
              Reserved for serious issues — policy violations, prohibited content —
              not ordinary quality fixes (use Request changes for those). If{' '}
              <strong>{course.title}</strong> is currently published, it comes down
              immediately.
              <ErrorBlock />
            </>
          }
          confirmLabel="Reject course"
          tone="danger"
          busy={busy}
          onConfirm={(reason) => void runReviewDecision('review/reject', 'reason', reason, 'Course rejected')}
          onCancel={closeDialog}
        />
      )}

      {toast && (
        <Toast
          key={toast.key}
          message={toast.message}
          type="success"
          duration={3000}
          onClose={() => setToast(null)}
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
