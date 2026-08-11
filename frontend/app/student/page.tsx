import { redirect } from 'next/navigation';

export default function StudentRedirectPage() {
  redirect('/dashboard');
}
