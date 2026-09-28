'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { clearClientSession, getCachedUser, setCachedUser } from '@/lib/user-cache';
import { StudioShell, type ShellUser } from '@/components/studio/shell/StudioShell';

// Creator auth pages (/creator/login, /creator/signup, etc.) are inside the
// /creator/* route tree so this layout wraps them. We MUST NOT run auth checks
// on those pages — doing so causes a redirect loop: layout fires /api/auth/me
// → 401 → redirect to /creator/login → layout fires again → infinite refresh.
const CREATOR_AUTH_PATHS = [
  '/creator/login', '/creator/signup', '/creator/onboarding',
  '/creator/forgot-password', '/creator/reset-password',
  '/creator/verify-pending', '/creator/verify-failed',
];

/** Pages that bring their own full-screen chrome: auth, the wizard, the builders. */
function isFullScreen(pathname: string) {
  return (
    CREATOR_AUTH_PATHS.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith('/creator/create') ||
    pathname.startsWith('/creator/builder') ||
    pathname.endsWith('/manage') ||
    pathname.includes('/lesson-builder/')
  );
}

const EMPTY_USER: ShellUser = {
  name: null,
  avatarUrl: null,
  username: null,
  hasStudentAccess: false,
  hasCreatorAccess: false,
};

interface MeLike {
  fullName?: string | null;
  avatarUrl?: string | null;
  username?: string | null;
  profile?: { avatarUrl?: string | null; username?: string | null } | null;
  hasStudentAccess?: boolean;
  hasCreatorAccess?: boolean;
}

function toShellUser(data: MeLike | null | undefined, prev: ShellUser): ShellUser {
  return {
    name: data?.fullName ?? prev.name,
    avatarUrl: data?.profile?.avatarUrl || data?.avatarUrl || prev.avatarUrl,
    username: data?.profile?.username ?? data?.username ?? prev.username,
    hasStudentAccess: data?.hasStudentAccess ?? prev.hasStudentAccess,
    hasCreatorAccess: data?.hasCreatorAccess ?? prev.hasCreatorAccess,
  };
}

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/creator';
  const fullScreen = isFullScreen(pathname);
  const [user, setUser] = useState<ShellUser>(EMPTY_USER);

  useEffect(() => {
    if (CREATOR_AUTH_PATHS.some((p) => pathname.startsWith(p))) return; // auth pages manage their own session

    // Hydrate from cache after mount to avoid an SSR mismatch.
    const cached = getCachedUser();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (cached) setUser((prev) => toShellUser(cached, prev));

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (cancelled) return;
          setUser((prev) => toShellUser(data, prev));
          setCachedUser(data);

          // STRICT ROLE-BASED GATEKEEPING (PRD AUTH-03): pure students don't
          // belong in the studio. Hard navigation avoids any router loop.
          if (!data.hasCreatorAccess) {
            // Neither role confirmed → onboarding never finished; /dashboard
            // would bounce a non-student straight back here.
            window.location.href = data.hasStudentAccess ? '/dashboard' : '/onboarding/0';
          }
        } else if (res.status === 401) {
          window.location.href = '/creator/login';
        }
      } catch (err) {
        console.warn('Failed to load the creator for the studio shell', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const handleLogout = async () => {
    clearClientSession();
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // ignore network errors — still redirect
    }
    window.location.href = '/creator/login';
  };

  if (fullScreen) return <>{children}</>;

  return (
    <StudioShell user={user} onLogout={handleLogout}>
      {children}
    </StudioShell>
  );
}
