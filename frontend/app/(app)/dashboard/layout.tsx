'use client';

import React from 'react';
import StudentShell from '@/components/layout/StudentShell';

/**
 * Segment layout for /dashboard.
 *
 * The shell itself lives in components/layout/StudentShell.tsx rather than
 * here, because four other routes render it directly as a component —
 * /learn/[id], /learn/[id]/section/[sectionIndex], /learn/[id]/unlock and
 * /courses/[id] — and RightSidebar imports its useComingSoon hook. While it
 * lived in this file, importing it meant importing a route layout, which
 * duplicated all ~500 lines of sidebar, modals, role switcher and pull-to-
 * refresh into each of those route bundles on top of the layout's own copy.
 *
 * Keeping it in components/ means one shared chunk, and it makes the module
 * specifier independent of where this route sits in the App Router tree.
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <StudentShell>{children}</StudentShell>;
}
