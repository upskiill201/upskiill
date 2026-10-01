/**
 * Persona registry — "[coding|AI] app for [person]" pages at /for/<slug>.
 *
 * The template is shared; the substance is not. Each persona needs its own
 * constraints, its own first week and its own honest caveat, or Google treats
 * the set as doorway pages and drops all of them. If you cannot write a
 * genuinely different `week` and `constraints` for a new persona, don't add it.
 *
 * Product claims come from ./facts — never state a number here that isn't there.
 */

import type { VisualKey } from './facts';

export interface PersonaPoint {
  title: string;
  body: string;
  visual: VisualKey;
}

export interface Persona {
  slug: string;
  /** "busy parents" — used mid-sentence */
  who: string;
  skill: 'coding' | 'AI';
  title: string;
  description: string;
  /** 40–80 words, answers the query outright */
  answer: string;
  /** What actually gets in this person's way */
  constraints: string[];
  points: PersonaPoint[];
  /** A realistic first week, one line per day */
  week: string[];
  startWith: string;
  /** Where Teyro is the wrong fit for this person */
  honest: string;
  faq: { question: string; answer: string }[];
}

export const PERSONAS: Persona[] = [
  {
    slug: 'coding-app-for-students',
    who: 'students',
    skill: 'coding',
    title: 'The Coding App for Students Who Keep Meaning to Start',
    description:
      'Learn to code alongside classes in 5–20 minutes a day, with streaks, weekly leagues and friends. Free to start, no ads, works on your phone.',
    answer:
      'The best coding app for students fits between classes, not on top of them. Teyro teaches coding and AI in lessons of a few minutes: learn one idea, use it straight away, then lock it in. Streaks, weekly leagues and friends keep you practising all term instead of cramming before a deadline. It is free to start and has no ads.',
    constraints: [
      'Timetables change every week and exam season wipes out free time',
      'Long video courses lose to everything else competing for attention',
      'Money is tight, so paywalls after lesson three end the experiment',
      'Coursework already covers theory; what is missing is regular practice',
    ],
    points: [
      { title: 'Lessons that fit a gap between lectures', body: 'Pick a daily goal from about 5 to 20 minutes. A lesson is four short steps, so you finish one in the time a coffee queue takes.', visual: 'lesson' },
      { title: 'Freezes for exam week', body: 'A streak freeze covers a day you cannot practise, and a repair saves a slip within 48 hours — one bad week does not wipe out a term of progress.', visual: 'streak' },
      { title: 'Race your classmates', body: 'Weekly leagues with real learners, and friends you can follow. A little competition does more for consistency than willpower.', visual: 'league' },
    ],
    week: [
      'Day 1 — Tell Tey your level and goal; your path is ready in under two minutes',
      'Day 2 — One lesson on the bus. Your first streak day and first daily quest',
      'Day 3 — Second lesson unlocks your course community; ask the question you were too shy to ask in class',
      'Day 4 — A busy day: one short lesson keeps the streak alive',
      'Day 5 — Open your daily chest and spend coins in the shop',
      'Day 6 — Check the league board; you are probably closer to promotion than you think',
      'Day 7 — A full week. Set a weekly goal for the rest of term',
    ],
    startWith: 'Programming fundamentals, then web development',
    honest: 'Teyro does not issue certificates yet, and it does not replace a university module. Use it to practise what you are taught — and to learn what your course skips.',
    faq: [
      { question: 'Is Teyro free for students?', answer: 'Teyro is free to start, with many courses free end to end and no ads. Paid courses let you try the first two lessons free.' },
      { question: 'Can I learn to code on my phone as a student?', answer: 'Yes. Teyro installs to your Home Screen on iPhone and Android in one tap, opens instantly, and works offline once installed.' },
    ],
  },
  {
    slug: 'coding-app-for-career-changers',
    who: 'career changers',
    skill: 'coding',
    title: 'A Coding App for Career Changers With a Full-Time Job',
    description:
      'Switch into tech around your job: short daily coding and AI lessons, a clear path that tells you what is next, and a streak that keeps you going. Free to start.',
    answer:
      'For a career change, the hard part is not the first lesson — it is lesson forty, on a Tuesday, after work. Teyro turns coding and AI into short daily lessons with a clear path, so you always know what is next, and a streak, weekly league and course community that keep you going for months. It is free to start.',
    constraints: [
      'Energy runs out after a full working day',
      'Too many choices: languages, frameworks, bootcamps, courses',
      'Progress stalls in month two, when motivation from the decision fades',
      'Bootcamps cost thousands and demand hours you do not have',
    ],
    points: [
      { title: 'A path, not a catalogue', body: 'Tell Tey your goal and level and your path is ready in minutes. You never have to decide what to learn next.', visual: 'method' },
      { title: 'Built for month two', body: 'Streaks with freezes, three daily quests and a weekly league keep the habit alive after the excitement wears off.', visual: 'rewards' },
      { title: 'People on the same road', body: 'After your second lesson you join the course community, where other learners answer questions and cheer your wins.', visual: 'friends' },
    ],
    week: [
      'Day 1 — Set your goal and level; pick a 10-minute daily goal you can keep on your worst day',
      'Day 2 — Lesson at lunch. Apply the idea straight away, then reflect',
      'Day 3 — Second lesson: you join the course community',
      'Day 4 — Tired evening: one short lesson, streak kept',
      'Day 5 — Complete all three daily quests and open the chest',
      'Day 6 — Weekend: two lessons and a look at next week’s path',
      'Day 7 — Review your week and decide on a streak target for the month',
    ],
    startWith: 'Programming fundamentals, then web development or AI automations',
    honest: 'Teyro builds the habit and the fundamentals; you will still want portfolio projects before job applications, and Teyro does not offer certificates yet.',
    faq: [
      { question: 'Can I change careers into tech with 15 minutes a day?', answer: 'Fifteen focused minutes every day adds up to more practice than occasional long weekends, and it is sustainable around a job. Most people add weekend projects once the daily habit is in place.' },
      { question: 'Coding or AI — which should a career changer learn first?', answer: 'Programming fundamentals help with both. If you want to automate work in your current field quickly, Teyro’s AI courses on tools, agents and automations pay off sooner.' },
    ],
  },
  {
    slug: 'coding-app-for-busy-parents',
    who: 'busy parents',
    skill: 'coding',
    title: 'The Coding App for Busy Parents: Learn in Nap-Time Minutes',
    description:
      'Learn to code in 5–20 minute lessons that survive interruptions, with streak freezes for chaotic days. Free to start, works on your phone.',
    answer:
      'Busy parents need a coding app that survives interruptions. Teyro lessons take a few minutes, the daily goal starts at about 5 minutes, and streak freezes cover the days that fall apart. It runs on your phone from the Home Screen, so a nap or a school pickup queue is enough time to learn.',
    constraints: [
      'Free time comes in 5–10 minute pieces, and it gets interrupted',
      'Some days simply do not have any time in them',
      'Evenings are for recovery, not for hour-long lectures',
      'Guilt about not keeping up makes people quit entirely',
    ],
    points: [
      { title: 'Five minutes counts', body: 'Choose a daily goal as small as about 5 minutes. A lesson is four short steps, so it fits into the gaps you already have.', visual: 'lesson' },
      { title: 'Chaotic days are covered', body: 'A freeze protects your streak on a day that disappears, and a repair saves a slip within 48 hours.', visual: 'streak' },
      { title: 'A nudge, not a nag', body: 'Teyro reminds you before your streak runs out — and asks for reminders only a few times, not every day.', visual: 'reminders' },
    ],
    week: [
      'Day 1 — Install Teyro to your Home Screen and set the smallest daily goal',
      'Day 2 — One lesson during nap time',
      'Day 3 — Second lesson unlocks the course community',
      'Day 4 — The day falls apart: your freeze covers it',
      'Day 5 — A lesson in the pickup queue; finish a daily quest',
      'Day 6 — Weekend lesson with coffee',
      'Day 7 — Seven days in. Keep the goal small; consistency beats intensity',
    ],
    startWith: 'Programming fundamentals',
    honest: 'Five minutes a day is a start, not a shortcut. Expect steady progress over months rather than a new job in weeks.',
    faq: [
      { question: 'Can I learn to code with only 10 minutes a day?', answer: 'Yes, if you do it daily. Short, regular practice is how Teyro is designed to work, and freezes stop one missed day from undoing your progress.' },
    ],
  },
  {
    slug: 'coding-app-for-commuters',
    who: 'commuters',
    skill: 'coding',
    title: 'A Coding App for Your Commute (That Works Offline)',
    description:
      'Turn the train or bus into coding practice: short lessons on your phone that open instantly and keep working offline once installed.',
    answer:
      'A commute is perfect for learning to code if the app is built for it. Teyro installs to your Home Screen, opens instantly, keeps working offline once installed, and splits every lesson into four short steps you can finish between stops. A daily streak and a weekly league turn the same ride every day into steady progress.',
    constraints: [
      'Patchy signal in tunnels and underground',
      'Standing room only, often one-handed',
      'The ride is 10–30 minutes, not an hour',
      'Social media is always one tap away',
    ],
    points: [
      { title: 'Opens instantly, works offline', body: 'Installed from the browser to your Home Screen — no app store — and it keeps working when the signal drops.', visual: 'phone' },
      { title: 'Sized for the ride', body: 'Pick a daily goal from about 5 to 20 minutes. Each lesson has four short steps.', visual: 'lesson' },
      { title: 'A better tap than scrolling', body: 'Three daily quests, chests and a weekly league give the same pull as a feed — and leave you with a skill.', visual: 'rewards' },
    ],
    week: [
      'Day 1 — Install Teyro to your Home Screen before you leave home',
      'Day 2 — One lesson on the way in',
      'Day 3 — Second lesson unlocks the course community',
      'Day 4 — Lesson on the way home; finish a daily quest',
      'Day 5 — Try a lesson with no signal',
      'Day 6 — Check your league position',
      'Day 7 — Make the first lesson of the ride automatic',
    ],
    startWith: 'Programming fundamentals or web development',
    honest: 'Phone lessons build understanding and habit; bigger projects still need a laptop now and then.',
    faq: [
      { question: 'Does Teyro work offline?', answer: 'Once installed to your Home Screen, Teyro opens instantly and keeps working offline.' },
    ],
  },
  {
    slug: 'coding-app-for-nurses',
    who: 'nurses',
    skill: 'coding',
    title: 'A Coding App for Nurses Working Long Shifts',
    description:
      'Learn coding and AI around 12-hour shifts: tiny daily lessons, freezes for shift days, and a phone app that works on break. Free to start.',
    answer:
      'Nurses curious about health tech or informatics need a coding app that fits shift work. Teyro lessons take a few minutes on your phone, streak freezes cover 12-hour shift days, and your daily goal can be as small as about 5 minutes. It is free to start, so you can find out whether coding suits you before paying for anything.',
    constraints: [
      '12-hour shifts leave days with no spare time at all',
      'Breaks are short and unpredictable',
      'Night shifts scramble a normal routine',
      'Unclear whether tech is even the right move',
    ],
    points: [
      { title: 'Shift days are covered', body: 'Bank freezes on days off; they protect your streak through a run of long shifts.', visual: 'streak' },
      { title: 'Learn on a break', body: 'One lesson is four short steps, on your phone, from the Home Screen.', visual: 'lesson' },
      { title: 'Try before you commit', body: 'Free to start, so you can test whether coding or AI suits you without a bootcamp bill.', visual: 'method' },
    ],
    week: [
      'Day 1 (day off) — Set your level and goal; do two lessons',
      'Day 2 (shift) — Freeze covers it',
      'Day 3 (shift) — One lesson on break',
      'Day 4 (day off) — Second lesson unlocks the course community',
      'Day 5 (day off) — Complete your daily quests',
      'Day 6 (night shift) — One lesson before you leave',
      'Day 7 — Decide whether coding or AI automations fits your goals',
    ],
    startWith: 'Programming fundamentals, or AI tools and automations for everyday work',
    honest: 'Teyro teaches general coding and AI, not healthcare-specific informatics systems.',
    faq: [
      { question: 'Can nurses learn to code?', answer: 'Yes. Many clinicians move into health tech and informatics. Starting with short daily lessons lets you test the fit around shift work before committing to a course or degree.' },
    ],
  },
  {
    slug: 'coding-app-for-adults-over-40',
    who: 'adults over 40',
    skill: 'coding',
    title: 'Learning to Code After 40: An App That Meets You Where You Are',
    description:
      'Start coding at 40, 50 or later with short, patient lessons that start from zero and a path that tells you exactly what comes next.',
    answer:
      'It is not too late to learn to code at 40 or beyond. What helps most is a steady routine and lessons that assume nothing. Teyro starts from your level, teaches one idea at a time and has you use it immediately, and keeps you practising with gentle streaks and reminders. It is free to start.',
    constraints: [
      'Worry about being "too old" or behind younger learners',
      'Jargon-heavy tutorials that assume prior knowledge',
      'Family and work leave little time',
      'Past courses bought and never finished',
    ],
    points: [
      { title: 'Starts from zero, no jargon dump', body: 'Tell Tey your level; lessons introduce one idea at a time.', visual: 'method' },
      { title: 'Practise, don’t just watch', body: 'Every lesson has you apply what you learned, with instant feedback.', visual: 'lesson' },
      { title: 'Consistency over speed', body: 'Streaks and reminders reward showing up, not racing.', visual: 'streak' },
    ],
    week: [
      'Day 1 — Set level "complete beginner" and a 10-minute goal',
      'Day 2 — First lesson: one idea, used straight away',
      'Day 3 — Second lesson unlocks the course community',
      'Day 4 — Reflect step: note what clicked',
      'Day 5 — Daily quests and your first chest',
      'Day 6 — Revisit anything that felt shaky',
      'Day 7 — A week done; set a monthly streak goal',
    ],
    startWith: 'Programming fundamentals',
    honest: 'Leagues are optional motivation — if competition is not your thing, streaks and quests work fine on their own.',
    faq: [
      { question: 'Is 40 too old to learn coding?', answer: 'No. Age matters far less than regular practice. Short daily sessions with immediate feedback suit adult learners well.' },
    ],
  },
  {
    slug: 'coding-app-for-designers',
    who: 'designers',
    skill: 'coding',
    title: 'A Coding App for Designers Learning Front-End',
    description:
      'Designers: learn the HTML, CSS and JavaScript behind your designs in short daily lessons, and talk to developers in their language.',
    answer:
      'Designers who learn front-end code ship better designs and hand off with less friction. Teyro teaches web development in short daily lessons where you build as you learn, so the HTML, CSS and JavaScript behind your mockups becomes familiar. Streaks and leagues keep you practising between client work. It is free to start.',
    constraints: [
      'Client deadlines swallow whole weeks',
      'Tutorials aimed at engineers skip the visual "why"',
      'Unsure how much code a designer really needs',
    ],
    points: [
      { title: 'Build as you learn', body: 'Each lesson has you apply the idea straight away, with instant feedback.', visual: 'lesson' },
      { title: 'Protect the habit through crunch', body: 'Freezes cover deadline days so the streak survives crunch.', visual: 'streak' },
      { title: 'Learn with others', body: 'Your course community answers questions after your second lesson.', visual: 'friends' },
    ],
    week: [
      'Day 1 — Start web development at your level',
      'Day 2 — One lesson: structure a page',
      'Day 3 — Second lesson unlocks the community',
      'Day 4 — Deadline day: freeze',
      'Day 5 — Styling lesson; compare with your latest design',
      'Day 6 — Daily quests and chest',
      'Day 7 — Rebuild one small component from your portfolio',
    ],
    startWith: 'Web development',
    honest: 'Teyro does not teach design tools themselves; it teaches the code side.',
    faq: [
      { question: 'Should designers learn to code?', answer: 'Knowing HTML, CSS and some JavaScript helps designers make realistic designs and work faster with developers. You do not need to become an engineer.' },
    ],
  },
  {
    slug: 'ai-app-for-marketers',
    who: 'marketers',
    skill: 'AI',
    title: 'An AI Learning App for Marketers (Tools, Agents, Automations)',
    description:
      'Learn to use AI tools and build simple agents and automations for marketing work, in short daily lessons. Free to start.',
    answer:
      'Marketers get the most from AI by using it in daily work, not by reading about it. Teyro’s AI courses teach AI tools, agents and automations in short lessons where you apply each idea immediately, and streaks and leagues keep you learning while the tools change. It is free to start and runs on your phone.',
    constraints: [
      'The tools change faster than anyone can keep up with',
      'No time for a long course between campaigns',
      'Hard to tell hype from what actually saves time',
    ],
    points: [
      { title: 'Apply it the same day', body: 'Every lesson ends with you using the idea, so it turns into a workflow, not a note.', visual: 'method' },
      { title: 'A few minutes, every day', body: 'A daily goal from about 5 to 20 minutes fits between meetings.', visual: 'lesson' },
      { title: 'Keep going as the tools change', body: 'Streaks and daily quests make learning a habit rather than a one-off course.', visual: 'rewards' },
    ],
    week: [
      'Day 1 — Pick the AI track; set a 10-minute goal',
      'Day 2 — Using AI tools well',
      'Day 3 — Second lesson unlocks the course community',
      'Day 4 — Apply a lesson to a real task at work',
      'Day 5 — Daily quests',
      'Day 6 — Automations: pick one repetitive task',
      'Day 7 — Share what you automated in the community',
    ],
    startWith: 'AI tools, then agents and automations',
    honest: 'Teyro teaches the AI skills; it is not a marketing strategy course.',
    faq: [
      { question: 'What AI skills should marketers learn?', answer: 'Using AI tools well, then automating repetitive work with simple agents and automations. Teyro’s AI courses follow that order.' },
    ],
  },
  {
    slug: 'ai-app-for-small-business-owners',
    who: 'small business owners',
    skill: 'AI',
    title: 'An AI App for Small Business Owners Who Want Hours Back',
    description:
      'Learn to automate admin with AI tools, agents and automations, in lessons short enough for a busy owner. Free to start.',
    answer:
      'Small business owners should learn AI to get hours back, not to become engineers. Teyro teaches practical AI — tools, agents and automations — in lessons of a few minutes where you apply each idea right away. A daily streak keeps you learning around the business. It is free to start, so you can test it before you spend anything.',
    constraints: [
      'Every hour spent learning is an hour not running the business',
      'No technical background',
      'Repetitive admin eats the week',
    ],
    points: [
      { title: 'Practical from lesson one', body: 'Learn an idea, apply it, reflect — in minutes.', visual: 'method' },
      { title: 'Fits a busy day', body: 'Pick a daily goal as small as about 5 minutes; freezes cover the chaotic days.', visual: 'streak' },
      { title: 'Learn with other owners', body: 'Each course has a community you join after two lessons.', visual: 'friends' },
    ],
    week: [
      'Day 1 — Start the AI track at beginner level',
      'Day 2 — AI tools for writing and admin',
      'Day 3 — Second lesson unlocks the community',
      'Day 4 — List three repetitive tasks',
      'Day 5 — Automations lesson; try one on a real task',
      'Day 6 — Daily quests',
      'Day 7 — Measure the time you saved',
    ],
    startWith: 'AI tools, then automations',
    honest: 'Teyro teaches the skills; it does not set up automations in your business for you.',
    faq: [
      { question: 'Can I learn AI with no technical background?', answer: 'Yes. Teyro’s AI courses start from using AI tools and build up to agents and automations, one idea at a time.' },
    ],
  },
  {
    slug: 'ai-app-for-teachers',
    who: 'teachers',
    skill: 'AI',
    title: 'An AI Learning App for Teachers',
    description:
      'Teachers: learn to use AI tools and simple automations to plan and prepare faster, in short daily lessons. Free to start.',
    answer:
      'Teachers can use AI to plan and prepare faster, but only if learning it fits a school week. Teyro teaches AI tools, agents and automations in short lessons you finish in a free period, with streak freezes for report season. It is free to start and runs on your phone from the Home Screen.',
    constraints: [
      'Term time leaves almost no free time',
      'Marking and reports come in waves',
      'Mixed messages about AI in schools',
    ],
    points: [
      { title: 'A free period is enough', body: 'Lessons take a few minutes; pick a goal from about 5 minutes.', visual: 'lesson' },
      { title: 'Report season is covered', body: 'Freezes protect your streak through the busiest weeks.', visual: 'streak' },
      { title: 'Use it straight away', body: 'Each lesson ends with you applying the idea to real work.', visual: 'method' },
    ],
    week: [
      'Day 1 — Start the AI track; smallest goal',
      'Day 2 — Using AI tools well',
      'Day 3 — Second lesson unlocks the community',
      'Day 4 — Marking day: freeze',
      'Day 5 — Try one idea on next week’s planning',
      'Day 6 — Daily quests',
      'Day 7 — Plan one repetitive task to automate',
    ],
    startWith: 'AI tools',
    honest: 'Always follow your school’s policy on AI and student data. Teyro teaches the skills, not policy.',
    faq: [
      { question: 'How can teachers learn AI quickly?', answer: 'Short daily practice with real tasks works better than a one-off training day. Start with AI tools, then automate one repetitive task.' },
    ],
  },
];

export const PERSONA_BY_SLUG = new Map(PERSONAS.map((p) => [p.slug, p]));
