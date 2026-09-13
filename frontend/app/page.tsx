/**
 * Teyro homepage.
 *
 * Every visual on this page is a faithful reproduction of a real Teyro
 * screen — the lesson phases, the streak calendar, the celebration engine,
 * the section map — sourced directly from the frontend components and CSS
 * that ship in the product, not invented interpretations of them. Two of the
 * sections borrow Coddy's own mechanic for its interactive tab strip: click
 * (or wait) and the control and the content change together.
 *
 * This replaced an eleven-section waitlist page carrying roughly 2,300vh of
 * pinned scroll. Two rules keep it from growing back: nothing on this page
 * may claim a feature that is not shipped (that ruled out certificates,
 * native apps, a friends graph and AI), and any section needing a bullet
 * list to explain itself is the wrong section.
 *
 * Section ids are the header nav's scroll targets — see NAV_LINKS in
 * components/layout/WaitlistHeader.tsx. Renaming one means renaming both.
 */

import Link from 'next/link';
import { Baloo_2 } from 'next/font/google';
import Band from '@/components/homepage/v2/Band';
import SplitSection from '@/components/homepage/v2/SplitSection';
import Hero from '@/components/homepage/v2/Hero';
import SkillStrip from '@/components/homepage/v2/SkillStrip';
import Faq from '@/components/homepage/v2/Faq';
import FinalCta from '@/components/homepage/v2/FinalCta';
import LessonPhaseDemo from '@/components/homepage/v2/visuals/LessonPhaseDemo';
import StreakWeekVisual from '@/components/homepage/v2/visuals/StreakWeekVisual';
import StreakCelebrationVisual from '@/components/homepage/v2/visuals/StreakCelebrationVisual';
import ProgressTabsVisual from '@/components/homepage/v2/visuals/ProgressTabsVisual';
import LevelProgressVisual from '@/components/homepage/v2/visuals/LevelProgressVisual';
import LeagueBoardVisual from '@/components/homepage/v2/visuals/LeagueBoardVisual';
import LessonMapVisual from '@/components/homepage/v2/visuals/LessonMapVisual';
import CreatorStudioVisual from '@/components/homepage/v2/visuals/CreatorStudioVisual';
import CourseCommunityVisual from '@/components/homepage/v2/visuals/CourseCommunityVisual';

/**
 * Loaded here rather than in the root layout, so it self-hosts and preloads
 * only for this one route — /blog, /login, /terms and the rest of the public
 * surface never pay for it. Same font, same weights as the in-app Celebration
 * Engine (app/(app)/layout.tsx's --font-celebration): Coddy's headlines run
 * on a rounded, friendly display face (Varela Round), and Baloo 2 is Teyro's
 * own version of that register — reusing it here instead of adding a new
 * font family gives the homepage that same warmth without a new dependency.
 */
const baloo2 = Baloo_2({
  variable: '--font-celebration',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

export default function Home() {
  return (
    <main className={baloo2.variable}>
      {/* Each Band's entrance is a framer-motion fade, which means its SSR
          markup carries `opacity: 0` inline and only becomes visible once JS
          hydrates. If that never happens the page reads as broken — a hero
          followed by nothing. This restores it for anyone without working JS. */}
      <noscript>
        <style>{`[data-band]{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      <Hero />

      <SkillStrip />

      <Band tone="white" id="how-it-works">
        <SplitSection
          headline="Skills That Actually Stick"
          copy="You don't just watch and forget. Every lesson has you apply it and reflect on it right away, so it sticks for good, not just until the quiz."
          visual={<LessonPhaseDemo />}
          visualSide="right"
        />
      </Band>

      <Band tone="tint">
        <SplitSection
          headline="Never Break The Habit"
          copy="One busy day won't undo weeks of progress. A freeze protects your streak, so consistency becomes automatic instead of something you have to force."
          visual={<StreakWeekVisual />}
          visualSide="left"
        />
      </Band>

      <Band tone="white">
        <SplitSection
          headline="Feel Good About Showing Up"
          copy="Consistency stops feeling like a chore when every single day gets its own celebration. You leave wanting to come back, not just having finished a task."
          visual={<StreakCelebrationVisual />}
          visualSide="right"
        />
      </Band>

      <Band tone="tint" id="rewards">
        <SplitSection
          headline="You Always Know You're Getting Somewhere"
          copy="Progress that only shows up in a report card is easy to lose faith in. Here it's XP, coins and a chest almost every day, proof you're moving forward, not just logging hours."
          visual={<ProgressTabsVisual />}
          visualSide="left"
        />
      </Band>

      <Band tone="white">
        <SplitSection
          headline="Watch Yourself Level Up"
          copy="No waiting for a weekly summary to know it's working. Every lesson pays out the second you finish, so you can watch your level climb in real time."
          visual={<LevelProgressVisual />}
          visualSide="right"
        />
      </Band>

      <Band tone="tint" id="leagues">
        <SplitSection
          headline="A Little Competition Keeps You Coming Back"
          copy="Learning alone is easy to quit on. Get placed with 30 other learners every week and finishing near the top stops feeling optional. It feels like something you'd hate to miss."
          visual={<LeagueBoardVisual />}
          visualSide="left"
        />
      </Band>

      <Band tone="white" id="community">
        <SplitSection
          headline="Get Unstuck In Minutes"
          copy="Ask a question in your course's community and someone answers: a classmate on the same lesson, or the instructor who built it. Share a win and the whole class shows up for it."
          visual={<CourseCommunityVisual />}
          visualSide="right"
        />
      </Band>

      <Band tone="tint">
        <SplitSection
          headline="Never Wonder What's Next"
          copy="No guessing, no decision fatigue over what to study. Just open the app and the next step is already sitting there, mapped out for you."
          visual={<LessonMapVisual />}
          visualSide="left"
        />
      </Band>

      <Band tone="white" id="teach">
        <SplitSection
          headline="Turn What You Know Into Income"
          copy="Publish a course once and it keeps earning while you sleep. Real analytics show what's working, and payouts land on a schedule you can actually count on."
          visual={<CreatorStudioVisual />}
          visualSide="right"
          action={
            <Link
              href="/creator/onboarding"
              className="flex h-14 w-fit items-center justify-center rounded-btn border-b-4 border-brand-deep bg-brand px-8 text-base font-extrabold tracking-wide text-white transition-colors hover:bg-brand-dark active:translate-y-[2px] active:border-b-0"
            >
              BECOME A CREATOR
            </Link>
          }
        />
      </Band>

      <Band tone="tint" id="faq">
        <Faq />
      </Band>

      <Band tone="white">
        <FinalCta />
      </Band>
    </main>
  );
}
