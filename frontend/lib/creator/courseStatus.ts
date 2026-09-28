/**
 * Where a creator's course is on its way to learners, in one place, so the
 * courses list, the course workspace and the review tab never disagree.
 *
 *   draft → in review → (changes requested ↺) → approved → live
 *
 * Backed by Course.reviewStatus (the admin review gate) and Course.published
 * (which only an approved course can turn on).
 */

export type CourseReviewStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'CHANGES_REQUESTED' | 'APPROVED' | 'REJECTED';

export type CourseStage = 'draft' | 'in-review' | 'changes' | 'approved' | 'live' | 'rejected';

export interface StageInfo {
  stage: CourseStage;
  label: string;
  /** Token colour for pills and accents. */
  tone: string;
  /** What the creator should do next, in one line. */
  next: string;
}

export function courseStage(reviewStatus: string | null | undefined, published: boolean | null | undefined): StageInfo {
  if (published) {
    return { stage: 'live', label: 'Live', tone: 'var(--success-green)', next: 'Learners can find and take this course.' };
  }
  switch (reviewStatus) {
    case 'SUBMITTED':
      return { stage: 'in-review', label: 'Submitted', tone: 'var(--brand-purple)', next: 'In the review queue. We’ll notify you when a reviewer picks it up.' };
    case 'UNDER_REVIEW':
      return { stage: 'in-review', label: 'In review', tone: 'var(--brand-purple)', next: 'A Teyro reviewer is going through your course now.' };
    case 'CHANGES_REQUESTED':
      return { stage: 'changes', label: 'Changes requested', tone: 'var(--warning)', next: 'Read the reviewer’s notes, update your course, then submit again.' };
    case 'APPROVED':
      return { stage: 'approved', label: 'Approved', tone: 'var(--color-brand)', next: 'Approved! Publish it whenever you’re ready.' };
    case 'REJECTED':
      return { stage: 'rejected', label: 'Not approved', tone: 'var(--error-red)', next: 'This course wasn’t approved. Read the reviewer’s notes.' };
    default:
      return { stage: 'draft', label: 'Draft', tone: 'var(--text-muted)', next: 'Build your lessons, then submit the course for review.' };
  }
}

/** A course waiting on a reviewer can't be edited until the review ends. */
export function isLockedForReview(reviewStatus: string | null | undefined): boolean {
  return reviewStatus === 'SUBMITTED' || reviewStatus === 'UNDER_REVIEW';
}
