import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminShell } from '@/components/admin/AdminShell';

/**
 * Server-side role gate for Tey's command center.
 *
 * Defence in depth, three layers:
 *   1. proxy.ts walls /admin behind a session cookie (presence only).
 *   2. This layout verifies the role against the backend before rendering.
 *   3. The backend's RolesGuard is the one that actually enforces it.
 *
 * Only the third is authoritative — every endpoint under /tey/admin is guarded
 * independently, so a bypass here leaks nothing but an empty shell. The first
 * two exist so an unauthorized visitor gets a redirect instead of a page full
 * of failed requests.
 */
export const dynamic = 'force-dynamic';

async function requireAdmin() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  if (!cookieHeader) redirect('/login?next=%2Fadmin');

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  try {
    const res = await fetch(`${backendUrl}/auth/me`, {
      headers: { cookie: cookieHeader },
      cache: 'no-store',
    });
    if (!res.ok) redirect('/login?next=%2Fadmin');

    const user = (await res.json()) as { role?: string; fullName?: string };
    if (user?.role !== 'ADMIN') redirect('/dashboard');
    return user;
  } catch (err) {
    // redirect() signals by throwing — never swallow it as a network error.
    if (err && typeof err === 'object' && 'digest' in err) throw err;
    redirect('/login?next=%2Fadmin');
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();
  return <AdminShell userName={user?.fullName}>{children}</AdminShell>;
}
