import type { Metadata } from 'next';
import { SupportHub } from '@/components/support/SupportHub';

export const metadata: Metadata = { title: 'Help & feedback · Teyro' };

export default function LearnerHelpPage() {
  return <SupportHub audience="LEARNER" basePath="/dashboard/help" />;
}
