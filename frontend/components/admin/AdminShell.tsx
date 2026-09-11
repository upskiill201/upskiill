'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  BarChart3,
  BookOpen,
  CreditCard,
  FileText,
  Gauge,
  HeartPulse,
  History,
  type LucideIcon,
  Send,
  Settings,
  ShieldAlert,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Tag,
  Timer,
  Trophy,
  UserCheck,
  UserCog,
  Users,
  Wallet,
} from 'lucide-react';
import styles from './AdminShell.module.css';

interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface NavGroup {
  label: string;
  items: NavLink[];
}

/** A section of the final Admin Center IA that has no page yet. Shown so the
 *  team can see the shape of where this is going, without linking anywhere
 *  that 404s — each lands in its own phase (see CLAUDE.md admin center plan). */
interface ComingSoonGroup {
  label: string;
  items: { label: string; icon: LucideIcon }[];
}

const OVERVIEW: NavLink = { href: '/admin', label: 'Overview', icon: Gauge };

/** Live, working sections. Tey's routes stay at their current paths — moving
 *  them under /admin/tey is a deliberate later migration, not a Phase 1
 *  concern — but the sidebar already groups them under their own heading. */
const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Platform',
    items: [
      { href: '/admin/users', label: 'Users', icon: Users },
      { href: '/admin/courses', label: 'Courses', icon: BookOpen },
      { href: '/admin/creators', label: 'Creators', icon: UserCheck },
    ],
  },
  {
    label: 'Tey',
    items: [
      { href: '/admin/rules', label: 'Rules', icon: Sparkles },
      { href: '/admin/deliveries', label: 'Deliveries', icon: Send },
      { href: '/admin/queue', label: 'Queue', icon: Timer },
      { href: '/admin/health', label: 'Health', icon: Activity },
      { href: '/admin/whatsapp', label: 'WhatsApp', icon: Smartphone },
    ],
  },
];

const COMING_SOON: ComingSoonGroup[] = [
  {
    label: 'Platform',
    items: [{ label: 'Moderation', icon: ShieldAlert }],
  },
  {
    label: 'Money',
    items: [
      { label: 'Payments', icon: CreditCard },
      { label: 'Payouts', icon: Wallet },
    ],
  },
  {
    label: 'Economy',
    items: [
      { label: 'Gamification', icon: Trophy },
      { label: 'Shop & Rewards', icon: ShoppingBag },
    ],
  },
  {
    label: 'Insights',
    items: [
      { label: 'Analytics', icon: BarChart3 },
      { label: 'Content', icon: FileText },
      { label: 'Promotions', icon: Tag },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Platform Settings', icon: Settings },
      { label: 'System Health', icon: HeartPulse },
      { label: 'Audit Logs', icon: History },
      { label: 'Admins & Permissions', icon: UserCog },
    ],
  },
];

function NavItem({ href, label, icon: Icon, active }: NavLink & { active: boolean }) {
  return (
    <Link
      href={href}
      className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
    >
      <Icon size={16} />
      {label}
    </Link>
  );
}

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
            <span className={styles.brandTitle}>Teyro Admin</span>
            <span className={styles.brandSub}>Admin Center</span>
          </span>
        </div>

        <nav className={styles.nav}>
          <NavItem {...OVERVIEW} active={pathname === OVERVIEW.href} />

          {NAV_GROUPS.map((group) => (
            <div key={group.label} className={styles.navGroup}>
              <span className={styles.navGroupLabel}>{group.label}</span>
              {group.items.map((item) => (
                <NavItem
                  key={item.href}
                  {...item}
                  active={pathname.startsWith(item.href)}
                />
              ))}
            </div>
          ))}

          <div className={styles.comingSoon}>
            {COMING_SOON.map((group) => (
              <div key={group.label} className={styles.navGroup}>
                <span className={styles.navGroupLabel}>{group.label}</span>
                {group.items.map(({ label, icon: Icon }) => (
                  <span key={label} className={styles.navLinkSoon}>
                    <Icon size={16} />
                    {label}
                    <span className={styles.soonPill}>Soon</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </nav>

        {userName && <div className={styles.footer}>Signed in as {userName}</div>}
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
