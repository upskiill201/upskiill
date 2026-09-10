'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import {
  Button,
  DataTable,
  Empty,
  ErrorState,
  Loading,
  PageHeader,
  Pagination,
  Pill,
  SearchInput,
  TabGroup,
  adminStyles as s,
  humanize,
  relativeTime,
  useAdminData,
} from '@/components/admin/AdminUI';

interface CourseRow {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl: string | null;
  price: number;
  published: boolean;
  featured: boolean;
  category: string;
  level: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  createdAt: string;
  reviewStatus: string;
  submittedForReviewAt: string | null;
  reviewedAt: string | null;
  instructor: { id: string; fullName: string; email: string };
}

interface CoursesResponse {
  items: CourseRow[];
  total: number;
  page: number;
  pageSize: number;
  categories: string[];
}

const STATUSES = ['', 'published', 'unpublished'];
const REVIEW_STATUSES = [
  '',
  'SUBMITTED',
  'UNDER_REVIEW',
  'CHANGES_REQUESTED',
  'APPROVED',
  'REJECTED',
];
const SORTS: { value: string; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'students', label: 'Most students' },
  { value: 'rating', label: 'Highest rated' },
  { value: 'review', label: 'Oldest submission (review queue)' },
];

const reviewTone = (status: string) => {
  if (status === 'APPROVED') return 'good';
  if (status === 'CHANGES_REQUESTED' || status === 'REJECTED') return 'bad';
  if (status === 'SUBMITTED' || status === 'UNDER_REVIEW') return 'brand';
  return 'neutral';
};

export default function AdminCoursesPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [reviewStatus, setReviewStatus] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);

  const query = new URLSearchParams({ page: String(page), pageSize: '25', sortBy });
  if (search) query.set('search', search);
  if (status) query.set('status', status);
  if (reviewStatus) query.set('reviewStatus', reviewStatus);
  if (category) query.set('category', category);

  const { data, error, isLoading } = useAdminData<CoursesResponse>(
    `/api/admin/courses?${query}`,
  );

  if (error) return <ErrorState error={error as Error} />;

  return (
    <>
      <PageHeader
        title="Courses"
        subtitle="Every course on Teyro — search, filter, and open one for the full picture, including Teyro's review queue."
      />

      <div style={{ marginBottom: 12 }}>
        <SearchInput
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          placeholder="Search by course title or creator…"
        />
      </div>

      <TabGroup
        options={REVIEW_STATUSES}
        value={reviewStatus}
        onChange={(v) => {
          setReviewStatus(v);
          setPage(1);
          // The point of filtering to a review-pending status is almost
          // always "show me the oldest one first" — switch the sort to
          // match rather than making the admin do it themselves.
          if (v === 'SUBMITTED' || v === 'UNDER_REVIEW') setSortBy('review');
        }}
        formatLabel={(v) => (v ? humanize(v) : 'All review statuses')}
      />
      <TabGroup
        options={STATUSES}
        value={status}
        onChange={(v) => {
          setStatus(v);
          setPage(1);
        }}
        formatLabel={(v) => (v ? humanize(v) : 'All catalog statuses')}
      />

      {data && data.categories.length > 0 && (
        <TabGroup
          options={['', ...data.categories]}
          value={category}
          onChange={(v) => {
            setCategory(v);
            setPage(1);
          }}
          formatLabel={(v) => v || 'All categories'}
        />
      )}

      <div style={{ marginBottom: 16 }}>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '8px 14px',
            borderRadius: 999,
            border: '2px solid var(--border)',
            background: 'var(--bg-card)',
            color: 'var(--text-secondary)',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {SORTS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Sort: {opt.label}
            </option>
          ))}
        </select>
      </div>

      {isLoading || !data ? (
        <Loading />
      ) : data.items.length === 0 ? (
        <Empty>No courses match these filters.</Empty>
      ) : (
        <>
          <DataTable
            columns={[
              'Course',
              'Creator',
              'Status',
              'Review',
              'Category',
              'Students',
              'Rating',
              '',
            ]}
          >
            {data.items.map((c) => (
              <tr
                key={c.id}
                onClick={() => router.push(`/admin/courses/${c.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <div style={{ fontWeight: 700 }}>{c.title}</div>
                  <div className={s.mono}>
                    ${c.price.toFixed(2)} · {relativeTime(c.createdAt)}
                  </div>
                </td>
                <td>
                  <div>{c.instructor.fullName}</div>
                  <div className={s.mono}>{c.instructor.email}</div>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Pill tone={c.published ? 'good' : 'warn'}>
                      {c.published ? 'Published' : 'Draft'}
                    </Pill>
                    {c.featured && (
                      <Pill tone="brand">
                        <Star size={10} /> Featured
                      </Pill>
                    )}
                  </div>
                </td>
                <td>
                  <Pill tone={reviewTone(c.reviewStatus)}>{humanize(c.reviewStatus)}</Pill>
                  {(c.reviewStatus === 'SUBMITTED' || c.reviewStatus === 'UNDER_REVIEW') && (
                    <div className={s.mono} style={{ marginTop: 4 }}>
                      {relativeTime(c.submittedForReviewAt)}
                    </div>
                  )}
                </td>
                <td>{humanize(c.category)}</td>
                <td className={s.mono}>{c.studentsCount.toLocaleString()}</td>
                <td className={s.mono}>
                  {c.rating > 0 ? `${c.rating.toFixed(1)} (${c.reviewsCount})` : '—'}
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <Link href={`/admin/courses/${c.id}`}>
                    <Button variant="secondary" size="sm">
                      View
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </DataTable>

          <Pagination
            page={data.page}
            pageSize={data.pageSize}
            total={data.total}
            onPageChange={setPage}
          />
        </>
      )}
    </>
  );
}
