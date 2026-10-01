import { LearnerDetail } from '@/components/studio/learners/LearnerDetail';

export default async function CreatorLearnerPage({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = await params;
  return <LearnerDetail learnerId={studentId} />;
}
