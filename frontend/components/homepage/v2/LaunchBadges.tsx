/**
 * LaunchBadges — verification badges from launch/startup directories.
 *
 * Teyro is launching on a handful of directories (Maidensail, Fazier, and
 * more to come), each of which requires their exact <a>/<img> markup —
 * including things like rel="dofollow" — to stay live on the platform.
 * Rather than hand-placing each one somewhere on the page, every badge is a
 * single entry in BADGES below: adding a new launch is a one-line change
 * here, not a new spot to find on the homepage.
 *
 * Sits directly under the hero as its own thin band, not inside it — badges
 * are addressed to launch-directory crawlers first and human visitors
 * second, so they get a dedicated, low-emphasis strip rather than competing
 * with the hero's headline and CTA.
 */

interface LaunchBadge {
  name: string;
  href: string;
  src: string;
  width?: number;
  height?: number;
}

const BADGES: LaunchBadge[] = [
  {
    name: 'Maidensail',
    href: 'https://maidensail.com/startup/teyro',
    src: 'https://maidensail.com/badge/teyro.svg',
    height: 44,
  },
  {
    name: 'Fazier',
    href: 'https://fazier.com/launches/teyro.app',
    src: 'https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=light',
    width: 250,
  },
];

export default function LaunchBadges() {
  if (BADGES.length === 0) return null;

  return (
    <section className="w-full border-b border-ink/5 bg-white py-6">
      <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-center gap-6 px-6">
        {BADGES.map((badge) => (
          <a
            key={badge.name}
            href={badge.href}
            target="_blank"
            rel="dofollow noopener noreferrer"
            className="inline-flex items-center transition-transform hover:scale-[1.03]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- external
                verification badges must keep their literal <img> src, which
                next/image would rewrite through the optimizer. */}
            <img
              src={badge.src}
              alt={`Featured on ${badge.name}`}
              width={badge.width}
              height={badge.height}
            />
          </a>
        ))}
      </div>
    </section>
  );
}
