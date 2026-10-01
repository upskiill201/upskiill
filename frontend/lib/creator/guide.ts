/**
 * The Creator Guide — how to use Teyro Studio and how to make a course that
 * works on Teyro. Rendered by components/studio/guide.
 *
 * Every rule stated here comes from the product itself, so keep it in step:
 *   lesson rules          lib/lesson/blocks.ts (cards ≤30, exercises ≤20, video ≤15 min)
 *   review checklist      components/course-workspace/ReviewTab.tsx
 *   pricing               lib/pricing-engine.ts (monthly = base/10×4×0.7, yearly = base×0.8)
 *   share / payouts       backend earnings.service (70%, 14-day clearing, $50 minimum)
 *   nudges                backend analytics/course-pulse.service (72h / 24h cooldowns, 50 max)
 *   community             learners join after 2 lessons; mute 1 / 7 / 30 days
 *
 * Text supports **bold**.
 */

export type GuideVisual =
  | 'studioMap'
  | 'lessonShape'
  | 'courseShape'
  | 'wizard'
  | 'workspace'
  | 'builderLayout'
  | 'learnCards'
  | 'exercises'
  | 'reflect'
  | 'reviewFlow'
  | 'checklist'
  | 'pricing'
  | 'segments'
  | 'communityAdmin'
  | 'pathFlags'
  | 'coupon'
  | 'payouts';

export type GuideBlock =
  | { t: 'p'; text: string }
  | { t: 'steps'; items: { title: string; text: string }[] }
  | { t: 'list'; items: string[] }
  | { t: 'tip'; text: string }
  | { t: 'warn'; text: string }
  | { t: 'visual'; v: GuideVisual; caption: string }
  | { t: 'dodont'; do: string[]; dont: string[] }
  | { t: 'cta'; label: string; href: string };

export interface GuideSection {
  heading: string;
  blocks: GuideBlock[];
}

export type GuideGroup = 'start' | 'build' | 'grow' | 'earn';

export interface GuideArticle {
  slug: string;
  group: GuideGroup;
  title: string;
  summary: string;
  minutes: number;
  icon: 'compass' | 'sparkles' | 'wand' | 'layers' | 'hammer' | 'cards' | 'dumbbell' | 'lightbulb' | 'tag' | 'send' | 'users' | 'messages' | 'chart' | 'ticket' | 'wallet';
  sections: GuideSection[];
}

export const GUIDE_GROUPS: { id: GuideGroup; title: string; blurb: string }[] = [
  { id: 'start', title: 'Start here', blurb: 'The Studio, and what a Teyro course looks like' },
  { id: 'build', title: 'Build your course', blurb: 'From the first idea to a live course' },
  { id: 'grow', title: 'Grow your learners', blurb: 'Keep them learning and finishing' },
  { id: 'earn', title: 'Earn', blurb: 'Coupons, earnings and payouts' },
];

export const GUIDE: GuideArticle[] = [
  /* ─── Start here ─────────────────────────────────────────────────── */
  {
    slug: 'welcome',
    group: 'start',
    title: 'Welcome to Teyro Studio',
    summary: 'A quick tour of everything in the Studio and what each part is for.',
    minutes: 3,
    icon: 'compass',
    sections: [
      {
        heading: 'Your Studio at a glance',
        blocks: [
          {
            t: 'p',
            text: 'Teyro Studio is where you build your courses, look after your learners and get paid. The menu is grouped by what you’re doing: **Build**, **Grow** and **Earn**.',
          },
          { t: 'visual', v: 'studioMap', caption: 'The Studio menu. A red number means something is waiting for you.' },
          {
            t: 'list',
            items: [
              '**Home** tells you what happened this week and what needs you now. Start every visit here.',
              '**Courses** holds every course you’ve made, from first draft to live.',
              '**Learners** shows who is learning, who is on fire and who has gone quiet.',
              '**Community** is your course’s classroom, where learners ask questions.',
              '**Analytics** shows how learners move through each lesson.',
              '**Earnings** and **Coupons** are where the money side lives.',
            ],
          },
        ],
      },
      {
        heading: 'The notification bell',
        blocks: [
          {
            t: 'p',
            text: 'The bell at the top tells you when someone joins, buys or finishes your course, asks a question, or when Teyro reviews your course. Tap a notification to jump straight to it.',
          },
          { t: 'tip', text: 'Answering questions quickly is the single easiest way to keep learners around. The Home screen always puts unanswered questions near the top.' },
        ],
      },
      {
        heading: 'Where to go next',
        blocks: [
          { t: 'p', text: 'Read **What makes a great Teyro course** before you build. It will save you rewrites later.' },
          { t: 'cta', label: 'What makes a great Teyro course', href: '/creator/guide/great-teyro-course' },
        ],
      },
    ],
  },
  {
    slug: 'great-teyro-course',
    group: 'start',
    title: 'What makes a great Teyro course',
    summary: 'Teyro courses are short, hands-on and built for daily habits. Here’s the shape that works.',
    minutes: 5,
    icon: 'sparkles',
    sections: [
      {
        heading: 'Teyro is not a video library',
        blocks: [
          {
            t: 'p',
            text: 'Learners open Teyro for a few minutes a day, keep a streak going and earn XP. A great Teyro course fits that rhythm: **small lessons, one idea each, with practice every time**. Learners who practise finish; learners who only watch drift away.',
          },
          { t: 'p', text: 'Teyro launches with two tracks, **Coding** and **AI**. Every course belongs to one of them.' },
        ],
      },
      {
        heading: 'Every lesson has four steps',
        blocks: [
          { t: 'visual', v: 'lessonShape', caption: 'One lesson, four steps. Deepen is optional.' },
          {
            t: 'steps',
            items: [
              { title: 'Learn', text: 'Teach one idea with a few bite-size cards: a short explanation, a code sample, a quick video.' },
              { title: 'Apply', text: 'Learners use the idea straight away in exercises that are checked instantly.' },
              { title: 'Reflect', text: 'One question that makes them put it in their own words, so it sticks.' },
              { title: 'Deepen', text: 'Optional extras for the curious: docs, articles, a repo.' },
            ],
          },
        ],
      },
      {
        heading: 'The shape of a course',
        blocks: [
          { t: 'visual', v: 'courseShape', caption: 'Modules hold lessons. The first two lessons are free for learners.' },
          {
            t: 'p',
            text: 'Group lessons into **modules** that each end with something the learner can do. Start small: three modules of two or three lessons is a real first course, and you can add more once it’s live.',
          },
          {
            t: 'warn',
            text: 'In a paid course, **the first two lessons are free**. They decide whether a visitor subscribes, so make them your best: a quick win, something that works, and a clear promise of what’s next.',
          },
        ],
      },
      {
        heading: 'Do this, not that',
        blocks: [
          {
            t: 'dodont',
            do: [
              'One idea per lesson, a few minutes long',
              'An exercise within the first minute or two',
              'Real examples learners will actually meet',
              'Name each module by what learners can do after it',
            ],
            dont: [
              'Hour-long recordings split into “parts”',
              'Lessons that are only a video with no practice',
              'Theory for three lessons before anything runs',
              'Vague titles like “Introduction 2”',
            ],
          },
        ],
      },
    ],
  },

  /* ─── Build ──────────────────────────────────────────────────────── */
  {
    slug: 'create-a-course',
    group: 'build',
    title: 'Create a course with the wizard',
    summary: 'Five quick steps with Tey, and you land in your new course with a starter outline.',
    minutes: 3,
    icon: 'wand',
    sections: [
      {
        heading: 'The five steps',
        blocks: [
          { t: 'visual', v: 'wizard', caption: 'The course wizard. It remembers your track and topics from onboarding.' },
          {
            t: 'steps',
            items: [
              { title: 'Track and topic', text: 'Coding or AI, then the topic inside it.' },
              { title: 'Level', text: 'Beginner, Intermediate or Advanced: who the course is for.' },
              { title: 'Title', text: 'A working title. You can change it any time before you submit.' },
              { title: 'Outline or blank', text: 'Start with three modules of lesson titles to rename, or an empty course.' },
              { title: 'Creating', text: 'Tey sets it up and opens your course workspace.' },
            ],
          },
          { t: 'tip', text: 'Pick **Start with an outline** if you’re not sure. Renaming placeholder lessons is much faster than facing an empty page.' },
          { t: 'cta', label: 'Start a new course', href: '/creator/create' },
        ],
      },
    ],
  },
  {
    slug: 'curriculum',
    group: 'build',
    title: 'Your course workspace and curriculum',
    summary: 'Curriculum, Details and Review: everything about one course in one place.',
    minutes: 4,
    icon: 'layers',
    sections: [
      {
        heading: 'Three tabs',
        blocks: [
          { t: 'visual', v: 'workspace', caption: 'The course workspace. The top card always says what to do next.' },
          {
            t: 'list',
            items: [
              '**Curriculum**: your modules and lessons. Each lesson opens in the lesson builder.',
              '**Details**: what learners read before starting, your cover and your price.',
              '**Review**: the checklist, submitting for review, the reviewer’s notes and publishing.',
            ],
          },
          { t: 'p', text: 'The card at the top of the workspace shows where the course stands and has a one-tap **Continue** into your next unfinished lesson.' },
        ],
      },
      {
        heading: 'Building the curriculum',
        blocks: [
          {
            t: 'steps',
            items: [
              { title: 'Add a module', text: 'Give it a name that says what learners will be able to do.' },
              { title: 'Add lessons', text: 'Adding a lesson opens it straight in the lesson builder.' },
              { title: 'Reorder', text: 'Move modules and lessons into the order learners should take them.' },
            ],
          },
          { t: 'p', text: 'Everything saves as you go. The first two lessons are marked **FREE**; that’s what learners can try before subscribing to a paid course.' },
        ],
      },
    ],
  },
  {
    slug: 'lesson-builder',
    group: 'build',
    title: 'The lesson builder',
    summary: 'Where lessons are made: the four steps, a live phone preview and autosave.',
    minutes: 4,
    icon: 'hammer',
    sections: [
      {
        heading: 'How the screen is laid out',
        blocks: [
          { t: 'visual', v: 'builderLayout', caption: 'Steps on the left, the editor in the middle, a live phone on the right.' },
          {
            t: 'list',
            items: [
              '**Top bar**: back to the course, the lesson title, save status, play the lesson, publish.',
              '**Left**: Learn, Apply, Reflect and Deepen, with a tick when each is done. Deepen is marked optional.',
              '**Middle**: the editor for the step you picked.',
              '**Right**: a phone showing exactly what learners will see.',
            ],
          },
        ],
      },
      {
        heading: 'Saving and publishing a lesson',
        blocks: [
          { t: 'p', text: 'Everything autosaves while you work. When the lesson is ready, **publish** it from the top bar. The builder shows anything that still needs fixing right next to it, and the same rules are checked again when you publish.' },
          { t: 'tip', text: 'Press play to take your own lesson as a learner before you publish. You’ll spot confusing wording in seconds.' },
          { t: 'warn', text: 'A course can only be submitted for review once **every** lesson is published. Draft lessons block the submit button.' },
        ],
      },
    ],
  },
  {
    slug: 'learn-cards',
    group: 'build',
    title: 'Learn: teach with bite-size cards',
    summary: 'The seven card types, and how to use them to teach one idea well.',
    minutes: 4,
    icon: 'cards',
    sections: [
      {
        heading: 'Seven kinds of card',
        blocks: [
          { t: 'visual', v: 'learnCards', caption: 'Learners swipe through your cards one at a time.' },
          {
            t: 'list',
            items: [
              '**Explanation**: short formatted text. One idea per card.',
              '**Code**: a code sample with syntax highlighting.',
              '**Video**: up to 15 minutes, but a minute or two is best.',
              '**Audio**: a short spoken explanation.',
              '**Image**: a diagram or screenshot. Describe it for learners who can’t see it.',
              '**Tip**: a highlighted note, gotcha or shortcut.',
              '**Quick check**: a tiny question to confirm they followed.',
            ],
          },
          { t: 'p', text: 'Drag cards to reorder them. A lesson can have up to 30 cards, but most great lessons use four to eight.' },
        ],
      },
      {
        heading: 'Writing cards that land',
        blocks: [
          {
            t: 'dodont',
            do: ['Start with why the idea matters', 'Show code before explaining every detail', 'End with a quick check'],
            dont: ['Walls of text on one card', 'A 15-minute video where 2 would do', 'Images with no description'],
          },
        ],
      },
    ],
  },
  {
    slug: 'exercises',
    group: 'build',
    title: 'Apply: exercises learners actually do',
    summary: 'The exercise types for Coding and AI courses, and how to write good ones.',
    minutes: 5,
    icon: 'dumbbell',
    sections: [
      {
        heading: 'Exercise types',
        blocks: [
          { t: 'visual', v: 'exercises', caption: 'The add menu is written for your course’s track.' },
          {
            t: 'p',
            text: 'Exercises are checked instantly on the learner’s phone (no code runs), and each right answer earns XP. A lesson needs at least one exercise and can have up to 20.',
          },
          {
            t: 'list',
            items: [
              '**Coding**: predict the output, fill in the code, find the bug, put the code in order, multiple choice, match the terms.',
              '**AI**: pick the better prompt, complete the prompt, spot the problem, order the workflow, multiple choice, match the terms.',
            ],
          },
        ],
      },
      {
        heading: 'Writing good exercises',
        blocks: [
          {
            t: 'steps',
            items: [
              { title: 'Test the idea you just taught', text: 'Each exercise should need the lesson’s idea to answer it.' },
              { title: 'Make wrong answers believable', text: 'Use the mistakes learners really make, not silly options.' },
              { title: 'Build up', text: 'Start with one easy exercise, then make them work a little.' },
            ],
          },
          { t: 'tip', text: 'Analytics shows which exercises learners miss most on the first try. If one is missed by most learners, the Learn cards before it probably need another example.' },
        ],
      },
    ],
  },
  {
    slug: 'reflect-and-deepen',
    group: 'build',
    title: 'Reflect and Deepen',
    summary: 'Help the lesson stick, then give curious learners somewhere to go.',
    minutes: 2,
    icon: 'lightbulb',
    sections: [
      {
        heading: 'Reflect',
        blocks: [
          { t: 'visual', v: 'reflect', caption: 'Open reflection, or a few short guided questions.' },
          {
            t: 'p',
            text: 'Reflect asks one question that makes learners put the lesson in their own words. Choose **Open** (one answer, with optional sentence starters) or **Guided** (a few short questions). Writing is optional for the learner.',
          },
          { t: 'tip', text: 'Good reflect questions are personal: “Where would you use this in your own project?” beats “What is a loop?”.' },
        ],
      },
      {
        heading: 'Deepen (optional)',
        blocks: [
          { t: 'p', text: 'Add docs, articles, repos or files for learners who want more. Turned off, the lesson simply ends after Reflect, and it never blocks publishing.' },
        ],
      },
    ],
  },
  {
    slug: 'details-and-pricing',
    group: 'build',
    title: 'Course details and pricing',
    summary: 'What learners read before starting, and how one price becomes monthly and yearly plans.',
    minutes: 4,
    icon: 'tag',
    sections: [
      {
        heading: 'The details learners see',
        blocks: [
          {
            t: 'list',
            items: [
              'A clear **title** (at least 5 characters) and your **track**: Coding or AI.',
              'The **level** and a **description** of at least 40 characters that says who it’s for and what they’ll be able to do.',
              '**Outcomes** and **requirements**, so learners know what they get and what they need.',
              'A **cover** image that stands out in Explore.',
            ],
          },
        ],
      },
      {
        heading: 'Pricing',
        blocks: [
          { t: 'visual', v: 'pricing', caption: 'A $60 course is $60 a year or $10 a month. You keep 70%.' },
          {
            t: 'p',
            text: 'Set a course **free**, or give it a **yearly price**: what a learner pays for a full year. Teyro adds a **monthly** plan at one sixth of it, so paying yearly saves learners 50%. Learners take the first two lessons free, then subscribe to keep going, so you’re paid again every time they renew.',
          },
          { t: 'tip', text: 'A free first course is a great way to build an audience. Your next course can be paid, and your learners will already trust you.' },
        ],
      },
    ],
  },
  {
    slug: 'review-and-publish',
    group: 'build',
    title: 'Submit for review and go live',
    summary: 'Every course is checked before learners see it. Here’s how review works.',
    minutes: 3,
    icon: 'send',
    sections: [
      {
        heading: 'The checklist',
        blocks: [
          { t: 'visual', v: 'checklist', caption: 'Submit lights up when every box is ticked.' },
          { t: 'p', text: 'The Review tab shows exactly what’s left. The same checks run when you submit, so if the button is on, your submission will go through.' },
        ],
      },
      {
        heading: 'From submitted to live',
        blocks: [
          { t: 'visual', v: 'reviewFlow', caption: 'Build → Review → Approved → Live. Changes loop back with notes.' },
          {
            t: 'steps',
            items: [
              { title: 'Submit', text: 'Your course joins the review queue. Editing pauses while it’s reviewed.' },
              { title: 'Review', text: 'A Teyro reviewer takes the course like a learner would.' },
              { title: 'Changes requested?', text: 'You get the reviewer’s notes in the Review tab and a notification. Fix them and submit again.' },
              { title: 'Approved', text: 'Publish whenever you’re ready, and your course goes live in Explore.' },
            ],
          },
        ],
      },
    ],
  },

  /* ─── Grow ───────────────────────────────────────────────────────── */
  {
    slug: 'learners-and-nudges',
    group: 'grow',
    title: 'Your learners, nudges and cheers',
    summary: 'See who’s thriving and who’s gone quiet, and reach them in one tap.',
    minutes: 4,
    icon: 'users',
    sections: [
      {
        heading: 'Every learner, at a glance',
        blocks: [
          { t: 'visual', v: 'segments', caption: 'Learners are grouped so you know who needs what.' },
          {
            t: 'p',
            text: 'Learners shows everyone taking your courses with their streak and progress, grouped into segments like **New**, **On fire**, **Almost done**, **Struggling** and **Going quiet**. Tap anyone to see their journey through your course.',
          },
        ],
      },
      {
        heading: 'Nudge or cheer',
        blocks: [
          {
            t: 'list',
            items: [
              '**Nudge** a learner who has gone quiet. Home tells you when someone hasn’t taken a lesson in a week.',
              '**Cheer** someone who’s doing well or just finished.',
              'Write **{first}** in your message and each learner sees their own first name.',
              'You can reach up to 50 learners at once. Teyro waits 3 days before suggesting the same learner for another nudge (1 day for cheers), so nobody gets spammed.',
            ],
          },
          { t: 'tip', text: 'Mention the exact lesson they stopped at. “Lesson 4 trips a lot of people up, you’ve got this” brings people back far better than “come back!”.' },
        ],
      },
    ],
  },
  {
    slug: 'community',
    group: 'grow',
    title: 'Run your course community',
    summary: 'Answer questions, post announcements and set challenges.',
    minutes: 3,
    icon: 'messages',
    sections: [
      {
        heading: 'Your classroom',
        blocks: [
          { t: 'visual', v: 'communityAdmin', caption: 'Unanswered questions are flagged until you reply.' },
          {
            t: 'p',
            text: 'Every live course gets its own community, and you’re its admin. Learners join after they finish **two lessons**, so the people inside are genuinely learning.',
          },
          {
            t: 'list',
            items: [
              '**Questions** waiting for an answer show a red dot on Community and appear on your Home screen.',
              '**Announcements** and **challenges** reach every member.',
              '**Mute** someone for 1, 7 or 30 days if they break the rules.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'analytics',
    group: 'grow',
    title: 'Read your analytics',
    summary: 'Find the lesson where learners stop, and fix it.',
    minutes: 4,
    icon: 'chart',
    sections: [
      {
        heading: 'Your course as a path',
        blocks: [
          { t: 'visual', v: 'pathFlags', caption: 'Lessons that lose learners, feel hard or run slow are flagged.' },
          {
            t: 'p',
            text: 'Analytics draws your course the way learners move through it: how many reach each lesson, how many finish it, and who is on it right now. Lessons get a flag when they need attention:',
          },
          {
            t: 'list',
            items: [
              '**Drop**: a lot of learners stop here.',
              '**Hard**: first-try accuracy is low.',
              '**Slow**: it takes much longer than you estimated.',
            ],
          },
          { t: 'p', text: 'Open any lesson to see where inside it learners quit, the exercises they miss most, and who is stuck right now, with a button to nudge them.' },
        ],
      },
    ],
  },

  /* ─── Earn ───────────────────────────────────────────────────────── */
  {
    slug: 'coupons',
    group: 'earn',
    title: 'Coupons',
    summary: 'Discounts for launches, your audience and loyal learners.',
    minutes: 2,
    icon: 'ticket',
    sections: [
      {
        heading: 'Making a coupon',
        blocks: [
          { t: 'visual', v: 'coupon', caption: 'Every coupon comes with a link that applies it for the learner.' },
          {
            t: 'list',
            items: [
              'Choose a **percent** or a **fixed amount** off.',
              'Set when it ends (7 days, 30 days, a date, or never) and how many times it can be used.',
              'Share the **coupon link**: it opens your course with the code already applied.',
              'A coupon discounts the learner’s **first payment**; renewals are full price.',
            ],
          },
          { t: 'tip', text: 'A 7-day launch coupon shared with your audience on day one gets your first learners in and your community started.' },
        ],
      },
    ],
  },
  {
    slug: 'earnings-and-payouts',
    group: 'earn',
    title: 'Earnings and payouts',
    summary: 'How you earn, when money becomes available, and how to get paid.',
    minutes: 3,
    icon: 'wallet',
    sections: [
      {
        heading: 'How you earn',
        blocks: [
          {
            t: 'p',
            text: 'You keep **70%** of every payment for your course: the first subscription payment and every renewal after it. Each sale shows up in Earnings straight away.',
          },
        ],
      },
      {
        heading: 'Getting paid',
        blocks: [
          { t: 'visual', v: 'payouts', caption: 'Requested → Processing → Paid, to your bank or mobile money.' },
          {
            t: 'steps',
            items: [
              { title: 'Add a payout method', text: 'A bank account or mobile money, in Earnings.' },
              { title: 'Wait for sales to clear', text: 'Each sale clears after 14 days, then it’s available to withdraw.' },
              { title: 'Request a payout', text: 'Once $50 or more is available, request it and follow it until it’s paid.' },
            ],
          },
          { t: 'p', text: 'You can download statements and transaction reports from Earnings at any time.' },
          { t: 'cta', label: 'Open Earnings', href: '/creator/earnings' },
        ],
      },
    ],
  },
];

export const guideBySlug = (slug: string) => GUIDE.find((a) => a.slug === slug) ?? null;
