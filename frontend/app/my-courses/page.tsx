import { redirect } from 'next/navigation';

export default function MyCoursesRedirectPage() {
  redirect('/dashboard/my-learning');
}
