'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Gauge, Send, Sparkles, Timer } from 'lucide-react';
import styles from './AdminShell.module.css';

const NAV = [
  { href: '/admin', label: 'Overview', icon: Gauge },
  { href: '/admin/rules', label: 'Rules', icon: Sparkles },
  { href: '/admin/deliveries', label: 'Deliveries', icon: Send },
  { href: '/admin/queue', label: 'Queue', icon: Timer },
  { href: '/admin/health', label: 'Health', icon: Activity },
] as const;

export function AdminShell({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName?: string;
}) {
  const pathname = usePathname();

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>
            <Sparkles size={16} />
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandTitle}>Tey Control</span>
            <span className={styles.brandSub}>Intelligence layer</span>
          </span>
        </div>

        <nav className={styles.nav}>
          {NAV.map(({ href, label, icon: Icon }) => {
            // Exact match for the index so it does not light up on every child.
            const active =
              href === '/admin' ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        {userName && <div className={styles.footer}>Signed in as {userName}</div>}
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
