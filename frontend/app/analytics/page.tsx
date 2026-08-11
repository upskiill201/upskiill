import { redirect } from 'next/navigation';

export default function AnalyticsRedirectPage() {
  redirect('/dashboard/profile/analytics');
}
