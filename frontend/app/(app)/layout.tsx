import { Baloo_2 } from "next/font/google";

import { TeyActivityProvider } from "../../components/providers/TeyActivityProvider";
import { TeyPushSync } from "../../components/providers/TeyPushProvider";
import TeyWelcomeBanner from "../../components/tey/TeyWelcomeBanner";
import { GamificationProvider } from "../../context/GamificationContext";
import { RewardAnimationProvider } from "../../context/RewardAnimationContext";
import { HeraldProvider } from "../../context/HeraldContext";
import NoticeHost from "../../components/awareness/NoticeHost";
import { StreakProvider } from "../../context/StreakContext";
import {
  DeferredRewardAnimationOverlay,
} from "../../components/providers/DeferredOverlays";
import { AudioProvider } from "../../context/AudioContext";
import BackgroundMusicManager from "../../components/audio/BackgroundMusicManager";
import { TeyroLoaderProvider } from "../../components/providers/TeyroLoaderProvider";
// Celebration Engine — full-page Duolingo-style scene takeovers
import { CelebrationProvider } from "../../context/CelebrationContext";
import CelebrationEngine from "../../components/celebration/CelebrationEngine";
// Auto-surfaces the Daily Login Reward as a scene on app entry / unlock
import DailyRewardWatcher from "../../components/gamification/DailyRewardWatcher";
// Surfaces Monthly Quest beats + claim deposits after lessons
// Weekly league settlement + mid-week leaderboard moments
import LeagueResultWatcher from "../../components/leaderboard/LeagueResultWatcher";
import LeaderboardRankWatcher from "../../components/leaderboard/LeaderboardRankWatcher";
import ReminderAskWatcher from "../../components/push/ReminderAskWatcher";
// Shop Engine — unlock announcements + purchase/chest/collection takeovers
import { ShopEngineProvider } from "../../context/ShopEngineContext";
import ShopEngine from "../../components/shop-engine/ShopEngine";
import ReferralClaimer from "../../components/referral/ReferralClaimer";

/**
 * Rounded display font for the Celebration Engine scenes (Duolingo-style bubbly
 * headlines/CTAs) and the quests page — scoped to --font-celebration.
 *
 * Declared here rather than in the root layout because those are the only
 * surfaces that use it, and all of them live inside this group. In the root
 * layout its three weights were being served on /, /blog, /terms and /login,
 * where a celebration can never render.
 */
const baloo2 = Baloo_2({
  variable: "--font-celebration",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

/**
 * The authenticated student runtime.
 *
 * Everything below used to live in the root layout, which meant an anonymous
 * visitor to the landing page, the blog or the legal pages downloaded and
 * booted the entire gamification stack — eleven providers, the celebration and
 * shop engines, and four watchers — and fired a handful of authenticated
 * requests that could only ever 401.
 *
 * Scoping it to this route group is what makes the public surfaces cheap. The
 * group covers exactly the routes that consume these providers: /dashboard,
 * /learn, /onboarding, /courses and /audio-settings. That boundary was derived
 * by walking every consumer of useGamification / useCelebration / useHerald /
 * useStreakModal / useShopEngine / useRewardAnimation / useAudio transitively
 * up the import graph to its terminal page — the only route file outside this
 * set was the root layout itself.
 *
 * NOTE ON ORDER: the nesting below is load-bearing and must be preserved.
 * ShopEngine nests inside CelebrationProvider so it defers to an active
 * celebration rather than stacking a second full-page takeover, and
 * RewardAnimation/Herald/Streak sit inside Gamification because they read it.
 *
 * CartProvider, SWRProvider, PostHog, the service worker registrar and the
 * push *navigation* listener stay in the root layout: they are needed on public
 * routes too (Header and CourseCard call useCart, which throws without its
 * provider, and a notification tap must route from whatever page is open).
 */
export default function AppGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${baloo2.variable} contents`}>
      <TeyActivityProvider />
      <TeyPushSync />
      <TeyWelcomeBanner />
      <AudioProvider>
        <BackgroundMusicManager />
        {/* Celebration Engine sits high in this tree so any layer
            (RewardRun adapter, Herald, Gamification) can queue scenes */}
        <CelebrationProvider>
          <GamificationProvider>
            <RewardAnimationProvider>
              <DeferredRewardAnimationOverlay />
              <HeraldProvider>
                <StreakProvider>
                  {/* Shop Engine nests inside the Celebration provider:
                      it defers to an active celebration rather than
                      stacking a second full-page takeover. */}
                  <ShopEngineProvider>
                    <CelebrationEngine />
                    <ShopEngine />
                    <DailyRewardWatcher />
                    <ReferralClaimer />
                    <LeagueResultWatcher />
                    <LeaderboardRankWatcher />
                    <ReminderAskWatcher />
                    {/* Notices (lib/awareness) and the streak/spin reveal portals */}
                    <NoticeHost />
                    <TeyroLoaderProvider>{children}</TeyroLoaderProvider>
                  </ShopEngineProvider>
                </StreakProvider>
              </HeraldProvider>
            </RewardAnimationProvider>
          </GamificationProvider>
        </CelebrationProvider>
      </AudioProvider>
    </div>
  );
}
