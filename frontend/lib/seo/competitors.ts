/**
 * Competitor registry — one entry generates two pages:
 *   /alternatives/teyro-vs-<id>       ("Teyro vs Mimo")
 *   /alternatives/<id>-alternatives   ("Best Mimo alternatives")
 *
 * These are the pages that convert hardest: the reader is already leaving.
 * They only work if they are fair, so the rules are:
 *   - Stable, checkable facts only. Prices change monthly, so pricing is
 *     described by model ("subscription", "per course"), never by number.
 *   - Every entry says when to STAY with the competitor.
 *   - Teyro is ranked where it belongs. On lists where the reader wants
 *     something Teyro doesn't do (another language app), Teyro says so.
 *
 * `checked` is when the facts were last reviewed — re-check yearly.
 * Complaint themes on the pages come from content/seo/complaints.json
 * (scripts/seo/mine-complaints.mjs), never from this file.
 */

import { TEYRO } from './facts';
import type { VisualKey } from './facts';

export interface CompetitorFacts {
  subjects: string;
  format: string;
  pricing: string;
  platforms: string;
  gamification: string;
  certificates: string;
  community: string;
}

export interface AlternativeEntry {
  /** Registry id when the app has its own pages; omit for off-registry picks */
  id?: string;
  name: string;
  bestFor: string;
  why: string;
}

export interface Competitor {
  id: string;
  name: string;
  /** The category searchers use: "coding app", "language app"… */
  kind: string;
  checked: string;
  summary: string;
  facts: CompetitorFacts;
  strengths: string[];
  weaknesses: string[];
  /** Pick Teyro instead when… */
  switchIf: string[];
  /** Stay with the competitor when… */
  stayIf: string[];
  /** 40–80 words: the direct answer at the top of "Teyro vs X" */
  vsAnswer: string;
  /** 40–80 words: the direct answer at the top of "X alternatives" */
  altAnswer: string;
  /** Ranked; include Teyro (id 'teyro') at its honest position */
  alternatives: AlternativeEntry[];
  /** The Teyro feature that answers the main reason people leave */
  visual: VisualKey;
  faq: { question: string; answer: string }[];
}

export const TEYRO_FACTS: CompetitorFacts = {
  subjects: TEYRO.subjects,
  format: TEYRO.lessonFormat,
  pricing: TEYRO.price,
  platforms: TEYRO.platforms,
  gamification: 'Streaks with freezes and repair, weekly leagues, three daily quests, chests, coins, hearts',
  certificates: TEYRO.certificates,
  community: TEYRO.community,
};

export const FACT_LABELS: Record<keyof CompetitorFacts, string> = {
  subjects: 'What you learn',
  format: 'Lesson format',
  pricing: 'Price model',
  platforms: 'Where it runs',
  gamification: 'Motivation system',
  certificates: 'Certificates',
  community: 'Community',
};

const teyroEntry = (bestFor: string, why: string): AlternativeEntry => ({
  id: 'teyro',
  name: 'Teyro',
  bestFor,
  why,
});

export const COMPETITORS: Competitor[] = [
  {
    id: 'duolingo',
    name: 'Duolingo',
    kind: 'gamified learning app',
    checked: '2026-09-28',
    summary:
      'The benchmark for habit-forming learning apps, covering languages, maths, music and chess — but not coding or AI.',
    facts: {
      subjects: 'Languages, maths, music and chess',
      format: 'Bite-sized game-like exercises',
      pricing: 'Free with ads; paid Super and Max subscriptions',
      platforms: 'iOS, Android and web',
      gamification: 'Streaks, leagues, XP, quests, hearts or energy',
      certificates: 'Duolingo English Test (separate, paid)',
      community: 'Friends, follows and friend quests',
    },
    strengths: [
      'The most polished habit loop in any learning app',
      'Free tier is generous for languages',
      'Huge language catalogue with daily speaking and listening practice',
    ],
    weaknesses: [
      'No coding, AI or career skills',
      'Free tier carries ads and limits mistakes with hearts or energy',
      'Easy to keep a streak without making much real progress',
    ],
    switchIf: [
      'You love the Duolingo loop and want it for coding or AI',
      'You want no ads while you learn',
      'You want lessons where you build something, not just tap answers',
    ],
    stayIf: [
      'You are learning a language, maths or music — Teyro does not teach those',
      'Your friends and streak are already on Duolingo and it is working',
    ],
    vsAnswer:
      'Duolingo and Teyro share the same habit loop — streaks, leagues, daily quests, hearts — but teach different things. Duolingo covers languages, maths, music and chess. Teyro covers coding and AI, and every lesson has you apply the idea straight away. If you want Duolingo for code, choose Teyro; for a language, stay on Duolingo.',
    altAnswer:
      'The best Duolingo alternative depends on why you are leaving. For another language app, Babbel and Busuu teach more grammar and conversation. For Duolingo-style learning applied to coding and AI, Teyro keeps the same streaks, leagues and quests with no ads. For maths and logic, Brilliant is the closest match.',
    alternatives: [
      teyroEntry(
        'Duolingo-style learning for coding and AI',
        'Same streaks, leagues, daily quests and hearts, pointed at coding and AI skills. No ads, free to start.',
      ),
      { name: 'Babbel', bestFor: 'Languages with real grammar', why: 'Structured lessons built around conversations, with clearer grammar explanations than Duolingo.' },
      { name: 'Busuu', bestFor: 'Languages with feedback from speakers', why: 'Native speakers correct your written and spoken exercises.' },
      { id: 'brilliant', name: 'Brilliant', bestFor: 'Maths, logic and science', why: 'Interactive problem solving that goes deeper than Duolingo Math.' },
      { id: 'mimo', name: 'Mimo', bestFor: 'Coding on your phone', why: 'Mobile-first coding lessons with a built-in editor.' },
    ],
    visual: 'streak',
    faq: [
      {
        question: 'Is there a Duolingo for coding?',
        answer:
          'Duolingo does not teach coding. Teyro is built on the same model — short daily lessons, streaks, leagues, daily quests and hearts — but its courses are coding and AI. Mimo and Sololearn are other mobile coding apps with game-like lessons.',
      },
      {
        question: 'Can I use Duolingo and Teyro together?',
        answer:
          'Yes. Many learners keep a language streak on Duolingo and a coding streak on Teyro. Both take a few minutes a day, and Teyro lets you pick a daily goal from about 5 to 20 minutes.',
      },
      {
        question: 'Does Teyro have ads like Duolingo’s free tier?',
        answer: 'No. Teyro has no ads. You can start free, and many courses are free end to end.',
      },
    ],
  },
  {
    id: 'mimo',
    name: 'Mimo',
    kind: 'coding app',
    checked: '2026-09-28',
    summary: 'A mobile-first coding app with short lessons, a built-in code editor and career-style paths.',
    facts: {
      subjects: 'Python, JavaScript, HTML/CSS, SQL and web development',
      format: 'Short interactive coding lessons with an in-app editor',
      pricing: 'Limited free tier; paid subscription for full access',
      platforms: 'iOS, Android and web',
      gamification: 'Streaks, XP and leagues',
      certificates: 'Certificates on paid plans',
      community: 'Discussion under lessons',
    },
    strengths: [
      'Polished phone-first coding experience',
      'Built-in editor for writing real code on mobile',
      'Clear career-style paths for web development',
    ],
    weaknesses: [
      'Most of the curriculum sits behind the subscription',
      'Reviewers often report trouble cancelling or understanding the trial',
      'Less of a social layer than Duolingo-style apps',
    ],
    switchIf: [
      'You want to learn free without hitting a paywall early',
      'You want weekly leagues and quests with real learners',
      'You also want AI skills: agents, automations and AI tools',
    ],
    stayIf: [
      'You already pay for Mimo and are finishing a path',
      'You need a certificate at the end',
    ],
    vsAnswer:
      'Mimo and Teyro both teach coding in short daily lessons on your phone. Mimo has a longer-established catalogue, an in-app editor and certificates, but most of it needs a subscription. Teyro is free to start with many free courses, adds AI skills, and puts more weight on streaks, weekly leagues and daily quests to keep you going.',
    altAnswer:
      'The best Mimo alternatives are Teyro for free, game-like coding and AI lessons with leagues and daily quests; Sololearn for a large free community code playground; freeCodeCamp for a completely free, project-based curriculum on desktop; and Codecademy for structured career paths in the browser.',
    alternatives: [
      teyroEntry('Free, game-like coding and AI', 'Short daily lessons, streaks, weekly leagues and daily quests. Free to start with many free courses.'),
      { id: 'sololearn', name: 'Sololearn', bestFor: 'A big coding community', why: 'Lots of languages and a code playground where learners share programs.' },
      { id: 'freecodecamp', name: 'freeCodeCamp', bestFor: 'Free, project-based learning', why: 'A full curriculum with projects and certifications, entirely free — best on a laptop.' },
      { id: 'codecademy', name: 'Codecademy', bestFor: 'Structured career paths', why: 'In-browser coding with long paths toward specific roles.' },
      { id: 'brilliant', name: 'Brilliant', bestFor: 'Thinking like a programmer', why: 'Logic and CS fundamentals through interactive puzzles.' },
    ],
    visual: 'lesson',
    faq: [
      {
        question: 'Is there a free alternative to Mimo?',
        answer:
          'Yes. Teyro is free to start and many of its coding and AI courses are free end to end. freeCodeCamp is fully free on desktop, and Sololearn has a free tier with limits.',
      },
      {
        question: 'Is Teyro or Mimo better for complete beginners?',
        answer:
          'Both start from zero. Mimo leans on its in-app editor; Teyro teaches one idea at a time and has you apply it immediately, then keeps you coming back with streaks, leagues and daily quests. Try the first lessons of each — Teyro is free to start.',
      },
    ],
  },
  {
    id: 'sololearn',
    name: 'Sololearn',
    kind: 'coding app',
    checked: '2026-09-28',
    summary: 'A long-running mobile coding app with many languages and a large community code playground.',
    facts: {
      subjects: 'Python, JavaScript, C++, Java, SQL, web and more',
      format: 'Short lessons with quizzes and a code playground',
      pricing: 'Free tier with limits and ads; Pro subscription',
      platforms: 'iOS, Android and web',
      gamification: 'XP, streaks and leaderboards',
      certificates: 'Course certificates',
      community: 'Large public code playground and Q&A',
    },
    strengths: ['Wide range of programming languages', 'Active community sharing code', 'Certificates on completion'],
    weaknesses: [
      'Free tier limits how many mistakes you can make before waiting',
      'Ads and upgrade prompts on the free tier',
      'Lessons can feel like quizzes more than building',
    ],
    switchIf: [
      'You keep running out of attempts on the free tier',
      'You want no ads',
      'You want AI skills alongside coding',
    ],
    stayIf: ['You need a language Teyro does not teach, such as C++ or Java', 'You want a certificate'],
    vsAnswer:
      'Sololearn covers more programming languages and gives certificates; Teyro focuses on coding and AI with a four-step lesson that makes you apply each idea, no ads, and a stronger habit loop — streak freezes, weekly leagues and three daily quests. Both limit mistakes with hearts; Teyro’s refill over time or with coins you earn.',
    altAnswer:
      'The best Sololearn alternatives are Teyro for ad-free, game-like coding and AI lessons; Mimo for a polished phone-first coding path; freeCodeCamp for a free, project-based curriculum; and Codecademy for structured paths in the browser.',
    alternatives: [
      teyroEntry('Ad-free, game-like coding and AI', 'Streaks with freezes, weekly leagues, daily quests and chests. Hearts refill every 4 hours or with earned coins.'),
      { id: 'mimo', name: 'Mimo', bestFor: 'Polished mobile coding paths', why: 'Phone-first lessons with an in-app editor.' },
      { id: 'freecodecamp', name: 'freeCodeCamp', bestFor: 'Free projects and certifications', why: 'A complete free curriculum, best on a laptop.' },
      { id: 'codecademy', name: 'Codecademy', bestFor: 'Browser-based career paths', why: 'Structured tracks toward specific developer roles.' },
    ],
    visual: 'lesson',
    faq: [
      {
        question: 'Why does Sololearn stop me from practising?',
        answer:
          'Sololearn’s free tier limits mistakes, so you can run out and have to wait or upgrade. Teyro also uses hearts, but one comes back every 4 hours and you can refill all five with coins you earn by learning — no payment needed.',
      },
      {
        question: 'Is Teyro free like Sololearn?',
        answer: 'Teyro is free to start, has no ads, and many courses are free end to end. Paid courses let you try the first two lessons free.',
      },
    ],
  },
  {
    id: 'brilliant',
    name: 'Brilliant',
    kind: 'interactive learning app',
    checked: '2026-09-28',
    summary: 'Interactive, visual lessons in maths, science, logic, data and computer science.',
    facts: {
      subjects: 'Maths, logic, science, data and computer science',
      format: 'Interactive visual problem solving',
      pricing: 'Limited free lessons; Premium subscription',
      platforms: 'iOS, Android and web',
      gamification: 'Streaks and XP',
      certificates: 'None',
      community: 'Minimal',
    },
    strengths: ['Beautiful interactive explanations', 'Builds real intuition for maths and logic', 'Great for curious minds'],
    weaknesses: [
      'Most content needs a Premium subscription',
      'Concept-first: less practice writing real-world code',
      'Few social or competitive features',
    ],
    switchIf: [
      'You want to write code and use AI tools, not just understand concepts',
      'You want to start free',
      'You are motivated by leagues and friends',
    ],
    stayIf: ['You want maths, physics or logic', 'You are preparing for a quantitative exam'],
    vsAnswer:
      'Brilliant teaches you to think — maths, logic, science and CS concepts through visual puzzles. Teyro teaches you to do: coding and AI skills where each lesson makes you apply the idea. Brilliant is mostly behind a subscription; Teyro is free to start. For maths intuition pick Brilliant; for practical coding and AI with a stronger habit loop, pick Teyro.',
    altAnswer:
      'The best Brilliant alternatives are Khan Academy for free maths and science; Teyro for practical coding and AI in short game-like lessons; and freeCodeCamp for a free, project-based programming curriculum.',
    alternatives: [
      { id: 'khan-academy', name: 'Khan Academy', bestFor: 'Free maths and science', why: 'A full free curriculum from arithmetic to calculus, with practice.' },
      teyroEntry('Practical coding and AI', 'Apply each idea straight away, with streaks, leagues and daily quests. Free to start.'),
      { id: 'freecodecamp', name: 'freeCodeCamp', bestFor: 'Free programming projects', why: 'Project-based curriculum and certifications at no cost.' },
      { id: 'datacamp', name: 'DataCamp', bestFor: 'Data science and AI', why: 'Hands-on Python, SQL and machine learning exercises.' },
    ],
    visual: 'method',
    faq: [
      {
        question: 'Is there a free alternative to Brilliant?',
        answer: 'Khan Academy is free for maths and science. For coding and AI, Teyro is free to start and many courses are free end to end.',
      },
    ],
  },
  {
    id: 'codecademy',
    name: 'Codecademy',
    kind: 'coding platform',
    checked: '2026-09-28',
    summary: 'A browser-based coding platform with interactive exercises and long career paths.',
    facts: {
      subjects: 'Web development, Python, data science, computer science and more',
      format: 'In-browser coding exercises and projects',
      pricing: 'Free basic courses; paid Plus and Pro plans',
      platforms: 'Web, with a companion mobile app for practice',
      gamification: 'Streaks and progress tracking',
      certificates: 'Certificates on paid plans',
      community: 'Forums and Discord',
    },
    strengths: ['Real code in the browser from the first lesson', 'Deep career paths', 'Large catalogue'],
    weaknesses: [
      'Best on a laptop; the phone app is for review, not full lessons',
      'Paths and projects need a paid plan',
      'Long paths are easy to abandon without a habit loop',
    ],
    switchIf: [
      'You learn on your phone in short gaps',
      'You keep abandoning long paths and need streaks and leagues to stay consistent',
      'You want to start free',
    ],
    stayIf: ['You study at a desk and want long, deep paths', 'You want a certificate'],
    vsAnswer:
      'Codecademy is the deeper desk-based option: long career paths with real code in the browser, most of them on a paid plan. Teyro is built for the phone and for consistency: 5 to 20 minute lessons, streaks with freezes, weekly leagues and daily quests. Many learners who stall on long paths finish more on Teyro.',
    altAnswer:
      'The best Codecademy alternatives are freeCodeCamp for a free, project-based curriculum; Teyro for short daily coding and AI lessons on your phone with streaks and leagues; Mimo for mobile coding paths; and Coursera for university-style certificates.',
    alternatives: [
      { id: 'freecodecamp', name: 'freeCodeCamp', bestFor: 'Free, deep curriculum', why: 'Projects and certifications at no cost — the closest free match.' },
      teyroEntry('Learning on your phone, every day', 'Short lessons that fit a commute, with streaks, leagues and daily quests. Free to start.'),
      { id: 'mimo', name: 'Mimo', bestFor: 'Mobile coding paths', why: 'Phone-first coding with an in-app editor.' },
      { id: 'coursera', name: 'Coursera', bestFor: 'Recognised certificates', why: 'Professional certificates from companies and universities.' },
    ],
    visual: 'phone',
    faq: [
      {
        question: 'Can I learn to code on my phone instead of Codecademy?',
        answer:
          'Yes. Teyro is built for the phone: it installs to your Home Screen, lessons take a few minutes, and it reminds you before your streak runs out. Mimo and Sololearn are other phone-first options.',
      },
    ],
  },
  {
    id: 'datacamp',
    name: 'DataCamp',
    kind: 'data and AI learning platform',
    checked: '2026-09-28',
    summary: 'Hands-on courses in data science, analytics and AI with in-browser exercises.',
    facts: {
      subjects: 'Python, R, SQL, data analysis, machine learning and AI',
      format: 'Short videos followed by in-browser exercises',
      pricing: 'First chapters free; paid subscription',
      platforms: 'Web, iOS and Android',
      gamification: 'XP and streaks',
      certificates: 'Certificates and certifications',
      community: 'Community forums',
    },
    strengths: ['Deep data science and ML catalogue', 'Real exercises with feedback', 'Recognised certifications'],
    weaknesses: ['Most content is behind the subscription', 'Focused on data roles, less on building apps', 'Lighter habit and social features'],
    switchIf: ['You want to use AI tools and build agents or automations rather than become a data scientist', 'You want a free start', 'You want leagues and daily quests'],
    stayIf: ['You are aiming for a data analyst or data scientist job', 'You need R or deep statistics'],
    vsAnswer:
      'DataCamp is the stronger choice for a data career: Python, R, SQL and machine learning with certifications. Teyro suits people who want to use and build with AI — tools, agents and automations — plus general coding, in short daily lessons with streaks and leagues. Teyro is free to start; DataCamp is mostly paid.',
    altAnswer:
      'The best DataCamp alternatives are Coursera for university-backed data certificates; Teyro for short daily lessons on AI tools, agents and coding; freeCodeCamp for free data analysis with Python; and Brilliant for the maths behind data.',
    alternatives: [
      { id: 'coursera', name: 'Coursera', bestFor: 'Data certificates', why: 'Professional certificates in data analytics from well-known companies.' },
      teyroEntry('Using and building with AI', 'Short lessons on AI tools, agents and automations, with a real habit loop.'),
      { id: 'freecodecamp', name: 'freeCodeCamp', bestFor: 'Free data analysis', why: 'Free Python data analysis and machine learning certifications.' },
      { id: 'brilliant', name: 'Brilliant', bestFor: 'The maths behind data', why: 'Interactive statistics and probability.' },
    ],
    visual: 'lesson',
    faq: [
      {
        question: 'Is Teyro good for learning AI?',
        answer:
          'Teyro teaches practical AI: using AI tools, building agents and automations, alongside coding. For statistics-heavy data science, DataCamp or Coursera go deeper.',
      },
    ],
  },
  {
    id: 'udemy',
    name: 'Udemy',
    kind: 'online course marketplace',
    checked: '2026-09-28',
    summary: 'The largest marketplace of video courses, sold one by one and through a subscription.',
    facts: {
      subjects: 'Almost everything: tech, business, design, personal development',
      format: 'Recorded video lectures, sometimes with quizzes and exercises',
      pricing: 'Pay per course (frequent sales) or Personal Plan subscription',
      platforms: 'Web, iOS, Android and TV apps',
      gamification: 'Progress bars only',
      certificates: 'Certificates of completion',
      community: 'Q&A with the instructor',
    },
    strengths: ['Enormous catalogue on almost any topic', 'Lifetime access to courses you buy', 'Low sale prices'],
    weaknesses: [
      'Long video courses are easy to buy and hard to finish',
      'Quality varies a lot between instructors',
      'Little to keep you coming back day after day',
    ],
    switchIf: [
      'You own courses you never finished',
      'You want to practise, not watch hours of video',
      'You need a daily habit to stay consistent',
    ],
    stayIf: ['You need a niche topic Teyro does not cover', 'You like long, deep video courses from one instructor'],
    vsAnswer:
      'Udemy sells long video courses on almost any topic; Teyro teaches coding and AI in short lessons where you practise instead of watch. Udemy’s strength is range. Teyro’s is finishing: streaks, weekly leagues, daily quests and a course community keep you going after the first week, when most video courses stall.',
    altAnswer:
      'The best Udemy alternatives are Coursera for university-style courses with recognised certificates; Teyro for coding and AI you actually finish, in short daily lessons; Skillshare for creative skills; and LinkedIn Learning for business skills you can show on your profile.',
    alternatives: [
      { id: 'coursera', name: 'Coursera', bestFor: 'Recognised certificates', why: 'Courses and professional certificates from universities and companies.' },
      teyroEntry('Coding and AI you finish', 'Short practice-first lessons with streaks, leagues and a community. Free to start.'),
      { id: 'skillshare', name: 'Skillshare', bestFor: 'Creative skills', why: 'Project-based classes in design, illustration and video.' },
      { id: 'linkedin-learning', name: 'LinkedIn Learning', bestFor: 'Business and soft skills', why: 'Certificates that sit on your LinkedIn profile.' },
    ],
    visual: 'method',
    faq: [
      {
        question: 'Why do I never finish Udemy courses?',
        answer:
          'Long video courses ask for hours of watching with nothing pulling you back. Teyro cuts lessons to a few minutes, has you practise every idea, and uses streaks, leagues and daily quests so skipping a day feels like losing something.',
      },
    ],
  },
  {
    id: 'coursera',
    name: 'Coursera',
    kind: 'online course platform',
    checked: '2026-09-28',
    summary: 'University and company courses, professional certificates and degrees.',
    facts: {
      subjects: 'Tech, data, business, health, humanities and full degrees',
      format: 'Video lectures, readings, graded assignments on a schedule',
      pricing: 'Per course or certificate, or Coursera Plus subscription; some content free to preview',
      platforms: 'Web, iOS and Android',
      gamification: 'Deadlines and progress tracking',
      certificates: 'Shareable certificates and professional certificates',
      community: 'Course discussion forums',
    },
    strengths: ['Recognised brands on the certificate', 'Rigorous, university-level content', 'Full degree options'],
    weaknesses: [
      'Subscriptions and billing are a frequent complaint',
      'Weeks-long courses need a lot of time per session',
      'Support is hard to reach, according to many reviewers',
    ],
    switchIf: ['You need to learn in minutes a day, not hours a week', 'You want to start free', 'You want more motivation than deadlines'],
    stayIf: ['You need a recognised certificate or a degree', 'Your employer pays for Coursera'],
    vsAnswer:
      'Coursera is the pick when the certificate matters: university and company courses with graded work and deadlines. Teyro is the pick when finishing matters: coding and AI in lessons of a few minutes, free to start, with streaks and leagues that keep you consistent. Teyro does not issue certificates yet.',
    altAnswer:
      'The best Coursera alternatives are edX for other university courses; Teyro for coding and AI in short daily lessons you actually keep up; Udemy for cheap, one-off courses on almost any topic; and LinkedIn Learning for business skills with profile certificates.',
    alternatives: [
      { name: 'edX', bestFor: 'University courses', why: 'Courses from universities with verified certificates.' },
      teyroEntry('Learning a few minutes a day', 'Coding and AI in short lessons with a real habit loop. Free to start.'),
      { id: 'udemy', name: 'Udemy', bestFor: 'Cheap one-off courses', why: 'Buy a single course on sale and keep it forever.' },
      { id: 'linkedin-learning', name: 'LinkedIn Learning', bestFor: 'Business skills', why: 'Short video courses with profile-ready certificates.' },
    ],
    visual: 'streak',
    faq: [
      {
        question: 'Is there a cheaper alternative to Coursera?',
        answer:
          'For coding and AI, Teyro is free to start and many courses are free end to end. Udemy courses are often discounted, and freeCodeCamp is fully free.',
      },
    ],
  },
  {
    id: 'khan-academy',
    name: 'Khan Academy',
    kind: 'free learning platform',
    checked: '2026-09-28',
    summary: 'A free nonprofit covering school maths, science, economics and intro computing.',
    facts: {
      subjects: 'School maths, science, economics, history and intro computing',
      format: 'Short videos with mastery practice',
      pricing: 'Free (nonprofit)',
      platforms: 'Web, iOS and Android',
      gamification: 'Mastery points and badges',
      certificates: 'None',
      community: 'Minimal',
    },
    strengths: ['Completely free', 'Excellent school maths and science', 'Trusted by teachers'],
    weaknesses: ['Aimed at school subjects more than job skills', 'Limited coding depth', 'Few social or competitive features'],
    switchIf: ['You want job-ready coding and AI skills', 'You need leagues and streaks to stay consistent'],
    stayIf: ['You are studying school maths or science', 'You need everything to be free'],
    vsAnswer:
      'Khan Academy is free and unbeatable for school maths and science. Teyro is for adults and students who want coding and AI skills, with a Duolingo-style habit loop — streaks, weekly leagues, daily quests. Both are free to start; use Khan Academy for school subjects and Teyro for practical tech skills.',
    altAnswer:
      'The best Khan Academy alternatives are Brilliant for interactive maths and logic; Teyro for practical coding and AI with streaks and leagues; freeCodeCamp for free programming; and Coursera for university-level courses.',
    alternatives: [
      { id: 'brilliant', name: 'Brilliant', bestFor: 'Interactive maths and logic', why: 'Visual problem solving that builds intuition.' },
      teyroEntry('Practical coding and AI', 'Short, game-like lessons that keep you consistent. Free to start.'),
      { id: 'freecodecamp', name: 'freeCodeCamp', bestFor: 'Free programming', why: 'A full free coding curriculum with projects.' },
      { id: 'coursera', name: 'Coursera', bestFor: 'University courses', why: 'Deeper academic courses with certificates.' },
    ],
    visual: 'league',
    faq: [
      {
        question: 'Is Teyro free like Khan Academy?',
        answer: 'Teyro is free to start and many courses are free end to end. Some creator courses are paid, with the first two lessons free.',
      },
    ],
  },
  {
    id: 'linkedin-learning',
    name: 'LinkedIn Learning',
    kind: 'video course platform',
    checked: '2026-09-28',
    summary: 'Professional video courses bundled with LinkedIn Premium.',
    facts: {
      subjects: 'Business, tech and creative skills',
      format: 'Short professional video courses',
      pricing: 'Subscription, included with LinkedIn Premium',
      platforms: 'Web, iOS and Android',
      gamification: 'None beyond progress',
      certificates: 'Certificates you can add to your LinkedIn profile',
      community: 'None to speak of',
    },
    strengths: ['Polished professional production', 'Certificates on your profile', 'Often free through employers or libraries'],
    weaknesses: ['Watching, not practising', 'Nothing pulls you back tomorrow', 'App reliability is a common complaint in reviews'],
    switchIf: ['You want to practise coding and AI, not watch', 'You need a habit loop to keep going'],
    stayIf: ['Your employer provides it', 'You want broad business and soft-skill courses'],
    vsAnswer:
      'LinkedIn Learning is a library of professional videos with profile certificates. Teyro is a daily practice app for coding and AI: short lessons where you apply each idea, plus streaks, leagues and quests. If you need breadth and a certificate, use LinkedIn Learning; to build a coding habit, use Teyro.',
    altAnswer:
      'The best LinkedIn Learning alternatives are Coursera for certificates from universities and companies; Udemy for a larger catalogue of one-off courses; Teyro for practising coding and AI a few minutes a day; and Skillshare for creative skills.',
    alternatives: [
      { id: 'coursera', name: 'Coursera', bestFor: 'Stronger certificates', why: 'Professional certificates from recognised companies and universities.' },
      { id: 'udemy', name: 'Udemy', bestFor: 'Bigger catalogue', why: 'More topics, bought one course at a time.' },
      teyroEntry('Daily coding and AI practice', 'Practise instead of watching, with a real habit loop. Free to start.'),
      { id: 'skillshare', name: 'Skillshare', bestFor: 'Creative skills', why: 'Project-based creative classes.' },
    ],
    visual: 'lesson',
    faq: [
      {
        question: 'Is LinkedIn Learning worth it for coding?',
        answer:
          'It is good for overviews, but watching videos builds little coding skill on its own. Practice-first apps such as Teyro, Mimo or freeCodeCamp have you write and fix code every lesson.',
      },
    ],
  },
  {
    id: 'freecodecamp',
    name: 'freeCodeCamp',
    kind: 'free coding curriculum',
    checked: '2026-09-28',
    summary: 'A free nonprofit coding curriculum with projects and certifications.',
    facts: {
      subjects: 'Web development, JavaScript, Python, data analysis and more',
      format: 'Long self-paced interactive curriculum with projects',
      pricing: 'Free (nonprofit)',
      platforms: 'Web, best on a laptop',
      gamification: 'Progress through the curriculum',
      certificates: 'Free certifications',
      community: 'Large forum and chat community',
    },
    strengths: ['Completely free', 'Real projects and certifications', 'Huge helpful community'],
    weaknesses: ['Desktop-first', 'Long and self-directed — easy to drift away', 'No daily habit system'],
    switchIf: ['You learn on your phone', 'You drift away without streaks and reminders', 'You want AI skills too'],
    stayIf: ['You have laptop time and self-discipline', 'You want free certifications'],
    vsAnswer:
      'freeCodeCamp is the best free curriculum if you have laptop time and self-discipline. Teyro is built for the rest of us: short lessons on the phone, reminders, streaks, leagues and daily quests that keep you coming back. Many learners use both — Teyro daily, freeCodeCamp projects at the weekend.',
    altAnswer:
      'The best freeCodeCamp alternatives are The Odin Project for another free, project-heavy web curriculum; Teyro for short daily coding and AI lessons on your phone; Codecademy for guided in-browser paths; and Sololearn for mobile practice with a big community.',
    alternatives: [
      { name: 'The Odin Project', bestFor: 'Free full-stack projects', why: 'A free, project-first web development path.' },
      teyroEntry('Daily practice on your phone', 'Short lessons and a habit loop for the days you can’t sit at a laptop.'),
      { id: 'codecademy', name: 'Codecademy', bestFor: 'Guided browser paths', why: 'More hand-holding than freeCodeCamp, on a paid plan.' },
      { id: 'sololearn', name: 'Sololearn', bestFor: 'Mobile practice and community', why: 'Many languages and a code playground.' },
    ],
    visual: 'reminders',
    faq: [
      {
        question: 'Is freeCodeCamp enough to get a job?',
        answer:
          'Many people have learned to code with it, but finishing is the hard part. Pairing it with a daily habit — a few minutes on Teyro, then weekend projects — helps you keep going.',
      },
    ],
  },
  {
    id: 'skillshare',
    name: 'Skillshare',
    kind: 'creative class platform',
    checked: '2026-09-28',
    summary: 'Subscription video classes focused on creative skills.',
    facts: {
      subjects: 'Design, illustration, video, photography, writing, some business and tech',
      format: 'Short video classes with a class project',
      pricing: 'Subscription',
      platforms: 'Web, iOS and Android',
      gamification: 'None beyond progress',
      certificates: 'None',
      community: 'Project galleries and discussions',
    },
    strengths: ['Great creative teachers', 'Project-based classes', 'Short, approachable videos'],
    weaknesses: ['Mostly watching', 'Thin on coding and AI', 'Nothing brings you back daily'],
    switchIf: ['You want coding or AI skills', 'You want a daily habit and competition'],
    stayIf: ['You are learning design, illustration or video', 'You like following one teacher’s creative process'],
    vsAnswer:
      'Skillshare is for creative skills — design, illustration, video — taught through short videos and a project. Teyro is for coding and AI, taught through practice with streaks, leagues and daily quests. Choose by subject: creative work on Skillshare, tech skills on Teyro.',
    altAnswer:
      'The best Skillshare alternatives are Domestika for high-quality creative courses; Udemy for a larger catalogue bought one course at a time; Teyro if you are moving into coding and AI; and LinkedIn Learning for business skills.',
    alternatives: [
      { name: 'Domestika', bestFor: 'Creative courses', why: 'Beautifully produced courses from working creatives.' },
      { id: 'udemy', name: 'Udemy', bestFor: 'Bigger catalogue', why: 'Buy single courses on sale.' },
      teyroEntry('Moving into coding and AI', 'Practice-first tech lessons with a Duolingo-style habit loop.'),
      { id: 'linkedin-learning', name: 'LinkedIn Learning', bestFor: 'Business skills', why: 'Professional courses with profile certificates.' },
    ],
    visual: 'rewards',
    faq: [
      {
        question: 'Can I learn to code on Skillshare?',
        answer: 'There are some coding classes, but Skillshare is creative-first. For coding and AI practice, apps like Teyro, Mimo and freeCodeCamp are built for it.',
      },
    ],
  },
  {
    id: 'grasshopper',
    name: 'Grasshopper',
    kind: 'coding app',
    checked: '2026-09-28',
    summary: 'Google’s free beginner coding app, which shut down in 2023.',
    facts: {
      subjects: 'JavaScript fundamentals',
      format: 'Puzzle-style mobile coding lessons',
      pricing: 'Was free',
      platforms: 'Shut down in 2023',
      gamification: 'Achievements',
      certificates: 'None',
      community: 'None',
    },
    strengths: ['Friendly, free introduction to JavaScript', 'Great on a phone'],
    weaknesses: ['No longer available'],
    switchIf: ['You liked learning to code on your phone in short, game-like lessons'],
    stayIf: [],
    vsAnswer:
      'Grasshopper, Google’s free coding app, shut down in 2023. Teyro is the closest replacement for what made it work: short, game-like coding lessons on your phone, free to start, with streaks, leagues and daily quests on top.',
    altAnswer:
      'Since Grasshopper shut down in 2023, the best replacements are Teyro for free, game-like coding lessons on your phone; Mimo for polished mobile coding paths; Sololearn for many languages and a community; and freeCodeCamp for a free, deeper curriculum on a laptop.',
    alternatives: [
      teyroEntry('The closest replacement', 'Short, game-like coding lessons on your phone. Free to start, no ads.'),
      { id: 'mimo', name: 'Mimo', bestFor: 'Polished mobile paths', why: 'Phone-first coding with an in-app editor, mostly paid.' },
      { id: 'sololearn', name: 'Sololearn', bestFor: 'Many languages', why: 'A big community and code playground.' },
      { id: 'freecodecamp', name: 'freeCodeCamp', bestFor: 'Going deeper for free', why: 'A complete free curriculum on a laptop.' },
    ],
    visual: 'lesson',
    faq: [
      {
        question: 'What happened to the Grasshopper coding app?',
        answer:
          'Google shut Grasshopper down in 2023. Learners looking for the same short, free, phone-first coding lessons can use Teyro, Mimo or Sololearn.',
      },
    ],
  },
];

export const COMPETITOR_BY_ID = new Map(COMPETITORS.map((c) => [c.id, c]));

export const vsSlug = (c: Competitor) => `teyro-vs-${c.id}`;
export const altSlug = (c: Competitor) => `${c.id}-alternatives`;

export type CompetitorPageKind = 'vs' | 'alternatives';

export function resolveCompetitorSlug(
  slug: string,
): { kind: CompetitorPageKind; competitor: Competitor } | null {
  const vs = slug.match(/^teyro-vs-(.+)$/);
  if (vs) {
    const c = COMPETITOR_BY_ID.get(vs[1]);
    return c ? { kind: 'vs', competitor: c } : null;
  }
  const alt = slug.match(/^(.+)-alternatives$/);
  if (alt) {
    const c = COMPETITOR_BY_ID.get(alt[1]);
    return c ? { kind: 'alternatives', competitor: c } : null;
  }
  return null;
}

export function competitorPageTitle(kind: CompetitorPageKind, c: Competitor): string {
  const year = new Date().getFullYear();
  return kind === 'vs'
    ? `Teyro vs ${c.name}: Which Should You Use in ${year}?`
    : `Best ${c.name} Alternatives in ${year} (Honest Picks)`;
}

export function competitorPageDescription(kind: CompetitorPageKind, c: Competitor): string {
  return kind === 'vs'
    ? `Teyro vs ${c.name} compared on subjects, price, motivation and where each wins. Includes when you should stay with ${c.name}.`
    : `The best ${c.name} alternatives, ranked by what you are leaving for — with honest notes on where each one falls short.`;
}
