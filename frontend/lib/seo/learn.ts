import { CATEGORIES } from '@/lib/onboarding/catalog';
import type { LearningInterest } from '@/lib/onboarding/types';
import { calculateCoursePricingLadder } from '@/lib/pricing-engine';
import { EXAMPLE_PRICE_USD, TEACH_PLACES, getTeachPlace, nearby, teachPath } from '@/lib/seo/teach';
import type { TeachPlace, TeachSkill } from '@/lib/seo/teach';

/**
 * Learner pages: /learn-coding and /learn-ai, each followed by a place or a topic.
 *
 * Same rule as /teach: a location page exists only where it carries numbers no
 * other page has. Today that is the two tracks — coding pages show BLS software
 * developer pay (SOC 15-1252), AI pages data scientist pay (SOC 15-2051), and
 * country pages show the example course price in local money. Topics get one
 * global page each. A topic earns place pages only when it claims its own
 * occupation series (`localData`) in content/seo/teach-data.json — never by
 * borrowing a track's numbers, which would make two pages with one set of data.
 * (Topic place pages also need a nested [slug]/[place] route — the integrity
 * check below throws until it exists.)
 *
 * Course claims checked against the production catalogue on 2026-10-09: no
 * topic below has a dedicated published course yet, the app launches in
 * November 2026, and the "path" topics are the interests a learner picks in
 * onboarding (lib/onboarding/catalog.ts). Pages say exactly that much — a
 * "coming" topic says there is no dedicated course and names where to start.
 */

export type LearnTrack = TeachSkill;
export type LocalData = 'dev' | 'ds';

export interface LearnSubject {
  slug: string;
  kind: 'track' | 'topic';
  track: LearnTrack;
  /** Headings: "Web Development" */
  label: string;
  /** Mid-sentence: "web development" */
  noun: string;
  /** path = a learning path you pick in onboarding; coming = no dedicated course yet */
  status: 'path' | 'coming';
  /** Onboarding interest this topic is, so labels stay in sync */
  catalogInterest?: LearningInterest;
  /** For `coming` topics: the subject to start with instead */
  startWith?: string;
  /** Occupation series this subject's place pages are built from */
  localData?: LocalData;
  /** One honest paragraph: what the skill is */
  intro: string;
  /** What learning it covers — the field, not a Teyro syllabus */
  covers: string[];
  /** Where the skill leads */
  uses: string[];
  /** Subject-specific questions, on top of the shared ones */
  faq?: { question: string; answer: string }[];
}

export const OCCUPATION: Record<LocalData, { name: string; soc: string }> = {
  dev: { name: 'software developers', soc: '15-1252' },
  ds: { name: 'data scientists', soc: '15-2051' },
};

const interest = (track: LearnTrack, id: LearningInterest) =>
  CATEGORIES[track].interests.find((i) => i.id === id)!;

const SUBJECTS: LearnSubject[] = [
  /* ── Tracks ─────────────────────────────────────────────────────────── */
  {
    slug: 'coding',
    kind: 'track',
    track: 'coding',
    label: 'Coding',
    noun: 'coding',
    status: 'path',
    localData: 'dev',
    intro:
      'Coding is writing instructions a computer can run — the skill behind every website, app and piece of software. You do not need a degree or a maths background to start; you need small, regular practice on real problems.',
    covers: [
      'How code works: variables, logic, loops and functions',
      'Building websites and web apps',
      'Building mobile apps for Android and iPhone',
      'Real software: APIs, databases and projects',
      'Solving problems step by step, the way developers do',
    ],
    uses: ['Software developer', 'Web developer', 'Mobile app developer', 'Freelance projects', 'Building your own product'],
  },
  {
    slug: 'ai',
    kind: 'track',
    track: 'ai',
    label: 'AI',
    noun: 'AI',
    status: 'path',
    localData: 'ds',
    intro:
      'AI skills now range from using AI tools well at work to building agents and automations that do tasks for you. Most of it needs no coding to start, and all of it gets better with practice on real tasks.',
    covers: [
      'Using AI tools to work faster, create and research',
      'Writing prompts that get useful, checkable answers',
      'Building AI agents that carry out tasks',
      'Automating repetitive work with AI and no-code tools',
      'Knowing where AI is wrong and how to check it',
    ],
    uses: ['Getting more done in your current job', 'AI automation work', 'Building AI products', 'Data and ML roles', 'Freelance AI projects'],
  },

  /* ── Coding paths (onboarding interests) ────────────────────────────── */
  {
    slug: 'web-development',
    kind: 'topic',
    track: 'coding',
    label: interest('coding', 'web-development').label,
    noun: 'web development',
    status: 'path',
    catalogInterest: 'web-development',
    intro:
      'Web development is building websites and web apps: HTML for structure, CSS for design and JavaScript for everything that moves. It is the most common way people get into coding, because you see what you build in the browser straight away.',
    covers: [
      'HTML and CSS: structure and layout',
      'JavaScript: making pages interactive',
      'Responsive design that works on phones',
      'Frameworks such as React',
      'Putting a site online',
    ],
    uses: ['Front-end developer', 'Full-stack developer', 'Freelance websites', 'Your own portfolio or product'],
  },
  {
    slug: 'mobile-app-development',
    kind: 'topic',
    track: 'coding',
    label: interest('coding', 'mobile-development').label,
    noun: 'mobile app development',
    status: 'path',
    catalogInterest: 'mobile-development',
    intro:
      'Mobile app development is building apps for Android and iPhone. You can go native (Kotlin, Swift) or cross-platform (React Native, Flutter) and ship one codebase to both.',
    covers: [
      'How mobile apps are structured: screens, navigation and state',
      'Cross-platform tools such as React Native and Flutter',
      'Calling APIs and storing data on the device',
      'Designing for small screens and touch',
      'Testing on real phones and publishing',
    ],
    uses: ['Mobile developer', 'Cross-platform developer', 'Freelance apps', 'Launching your own app'],
  },
  {
    slug: 'programming-fundamentals',
    kind: 'topic',
    track: 'coding',
    label: interest('coding', 'programming-fundamentals').label,
    noun: 'programming fundamentals',
    status: 'path',
    catalogInterest: 'programming-fundamentals',
    intro:
      'Programming fundamentals are the ideas every language shares — variables, conditions, loops, functions and data structures — plus the habit of breaking a problem into steps. Learn them once and every language after is easier.',
    covers: [
      'Variables, types and expressions',
      'Conditions and loops',
      'Functions and breaking problems down',
      'Lists, dictionaries and other data structures',
      'Reading errors and debugging',
    ],
    uses: ['A first step to any coding career', 'Automating tasks at work', 'Moving into web, mobile or AI'],
  },
  {
    slug: 'software-development',
    kind: 'topic',
    track: 'coding',
    label: interest('coding', 'software-development').label,
    noun: 'software development',
    status: 'path',
    catalogInterest: 'software-development',
    intro:
      'Software development is building real, working software: back ends, APIs, databases and the projects that tie them together — plus the practice of version control, testing and shipping that teams rely on.',
    covers: [
      'Back-end code, APIs and databases',
      'Git and working with other developers',
      'Testing and debugging real projects',
      'How software is designed and deployed',
      'Interview prep and real-world practice',
    ],
    uses: ['Software engineer', 'Back-end developer', 'Full-stack developer', 'Building and running your own product'],
  },

  /* ── Coding: searched-for, no dedicated course yet ──────────────────── */
  {
    slug: 'python',
    kind: 'topic',
    track: 'coding',
    label: 'Python',
    noun: 'Python',
    status: 'coming',
    startWith: 'programming-fundamentals',
    intro:
      'Python is a readable, general-purpose language used for automation, data, AI and back-end web work. Its simple syntax makes it one of the most popular first languages.',
    covers: [
      'Python syntax, variables and types',
      'Conditions, loops and functions',
      'Lists, dictionaries and files',
      'Automating everyday tasks with scripts',
      'Libraries for data and AI',
    ],
    uses: ['Automation and scripting', 'Data analysis', 'AI and machine learning', 'Back-end development'],
  },
  {
    slug: 'javascript',
    kind: 'topic',
    track: 'coding',
    label: 'JavaScript',
    noun: 'JavaScript',
    status: 'coming',
    startWith: 'web-development',
    intro:
      'JavaScript is the language of the web: it runs in every browser, powers interactive pages and, with Node.js, runs servers too. If you want to build for the web, you will learn it.',
    covers: [
      'Variables, functions and objects',
      'Working with the page (the DOM)',
      'Events, async code and fetching data',
      'Modern JavaScript and TypeScript basics',
      'Frameworks such as React',
    ],
    uses: ['Front-end developer', 'Full-stack developer', 'Node.js back ends', 'Browser extensions and tools'],
  },

  /* ── AI paths (onboarding interests) ────────────────────────────────── */
  {
    slug: 'tools',
    kind: 'topic',
    track: 'ai',
    label: interest('ai', 'use-tools').label,
    noun: 'AI tools',
    status: 'path',
    catalogInterest: 'use-tools',
    intro:
      'Using AI tools well means knowing which tool fits a task, how to ask for what you need, and how to check what comes back. It is the fastest AI skill to learn and the one most jobs now expect.',
    covers: [
      'Writing clear prompts and giving context',
      'Research, writing and summarising with AI',
      'Creating images, slides and media with AI',
      'Checking AI output for mistakes',
      'Fitting AI into your daily work',
    ],
    uses: ['Getting more done in your current job', 'Content and marketing work', 'Research and analysis', 'Starting a side project'],
  },
  {
    slug: 'agents',
    kind: 'topic',
    track: 'ai',
    label: interest('ai', 'build-agents').label,
    noun: 'AI agents',
    status: 'path',
    catalogInterest: 'build-agents',
    intro:
      'An AI agent is an AI model that can take steps on its own — call tools, look things up, write files — to finish a task you give it. Building one means choosing the model, giving it tools and keeping it on track.',
    covers: [
      'How agents work: models, tools and loops',
      'Giving an agent tools and data to use',
      'Instructions that keep an agent on task',
      'Testing agents and handling mistakes',
      'Putting an agent to work on a real task',
    ],
    uses: ['AI engineer', 'Automation builder', 'Internal tools at work', 'Building an AI product'],
  },
  {
    slug: 'automation',
    kind: 'topic',
    track: 'ai',
    label: interest('ai', 'automations').label,
    noun: 'AI automations',
    status: 'path',
    catalogInterest: 'automations',
    intro:
      'AI automation connects your apps so repetitive work runs by itself — sorting emails, filling sheets, drafting replies — with AI handling the steps that need judgement. Much of it can be built without code.',
    covers: [
      'Spotting tasks worth automating',
      'Connecting apps with no-code tools',
      'Adding AI steps that read, sort and write',
      'Triggers, schedules and error handling',
      'Measuring the time an automation saves',
    ],
    uses: ['Automation specialist', 'Operations roles', 'Freelance automation projects', 'Saving hours in your own work'],
  },

  /* ── AI: searched-for, no dedicated course yet ──────────────────────── */
  {
    slug: 'claude-code',
    kind: 'topic',
    track: 'ai',
    label: 'Claude Code',
    noun: 'Claude Code',
    status: 'coming',
    startWith: 'agents',
    intro:
      'Claude Code is Anthropic’s agentic coding tool. It works in your terminal, editor or desktop, reads your codebase, edits files and runs commands, so you can describe what you want built and review what it does.',
    covers: [
      'Setting it up in a project',
      'Describing tasks so the agent gets them right',
      'Reviewing and testing changes it makes',
      'Project instructions and memory files',
      'When to let it act and when to step in',
    ],
    uses: ['Shipping code faster', 'Building projects without a big team', 'AI-assisted software development'],
  },
  {
    slug: 'prompt-engineering',
    kind: 'topic',
    track: 'ai',
    label: 'Prompt Engineering',
    noun: 'prompt engineering',
    status: 'coming',
    startWith: 'tools',
    intro:
      'Prompt engineering is writing instructions that get reliable, useful answers from AI models: giving context, examples and a clear format, then testing and refining.',
    covers: [
      'Giving context, a role and a goal',
      'Examples and output formats',
      'Breaking big tasks into steps',
      'Testing prompts and comparing results',
      'Prompts for agents and automations',
    ],
    uses: ['Better results from AI at work', 'Building AI features', 'AI automation work'],
  },
  {
    slug: 'chatgpt',
    kind: 'topic',
    track: 'ai',
    label: 'ChatGPT',
    noun: 'ChatGPT',
    status: 'coming',
    startWith: 'tools',
    intro:
      'ChatGPT is OpenAI’s AI assistant. Learning it well means more than asking questions: giving it context, using files and tools, and checking what it tells you.',
    covers: [
      'Asking clearly and giving context',
      'Working with files, images and data',
      'Writing, research and planning with it',
      'Spotting wrong or made-up answers',
      'Building it into your daily work',
    ],
    uses: ['Getting more done at work', 'Writing and research', 'Study and learning support'],
  },
  {
    slug: 'machine-learning',
    kind: 'topic',
    track: 'ai',
    label: 'Machine Learning',
    noun: 'machine learning',
    status: 'coming',
    startWith: 'programming-fundamentals',
    intro:
      'Machine learning is teaching computers to find patterns in data and make predictions. It sits underneath modern AI and usually starts with Python, some statistics and lots of practice on real datasets.',
    covers: [
      'How models learn from data',
      'Python for data work',
      'Training, testing and measuring a model',
      'Common methods: regression, classification, clustering',
      'Where neural networks and LLMs fit',
    ],
    uses: ['Data scientist', 'Machine learning engineer', 'AI research and products'],
  },
];

/* ── URLs: /learn-coding/<place|topic>, /learn-ai/<place|topic> ───────── */
//
// Not /learn: that is the in-app course player (app/(app)/learn/[id]) and is
// login-walled in proxy.ts. Topics and places share the second segment, so a
// topic slug may never equal a place slug in its track (checked below).

export const LEARN_HUB = '/learn-online';
export const trackBase = (track: LearnTrack) => (track === 'coding' ? '/learn-coding' : '/learn-ai');

export function learnPath(subject: LearnSubject, place?: TeachPlace) {
  const base = trackBase(subject.track);
  if (subject.kind === 'track') return place ? `${base}/${place.slug}` : base;
  return place ? `${base}/${subject.slug}/${place.slug}` : `${base}/${subject.slug}`;
}

/* ── Integrity: unique slugs, one occupation series per subject ───────── */
{
  const seen = new Set<string>();
  const claimed = new Map<LocalData, string>();
  for (const sub of SUBJECTS) {
    if (seen.has(sub.slug)) throw new Error(`learn: duplicate subject slug "${sub.slug}"`);
    seen.add(sub.slug);
    if (sub.localData) {
      if (claimed.has(sub.localData))
        throw new Error(`learn: "${sub.slug}" and "${claimed.get(sub.localData)}" both claim ${sub.localData} data`);
      claimed.set(sub.localData, sub.slug);
    }
    if (sub.kind === 'topic' && sub.localData)
      throw new Error(`learn: topic place pages need a nested route first ("${sub.slug}")`);
    if (sub.startWith && !SUBJECTS.some((t) => t.slug === sub.startWith))
      throw new Error(`learn: "${sub.slug}" starts with unknown "${sub.startWith}"`);
    if (sub.kind === 'topic' && getTeachPlace(sub.track, sub.slug))
      throw new Error(`learn: topic "${sub.slug}" collides with a place slug`);
  }
}

export const LEARN_SUBJECTS = SUBJECTS;
const BY_SLUG = new Map(SUBJECTS.map((sub) => [sub.slug, sub]));

export const getLearnSubject = (slug: string) => BY_SLUG.get(slug) ?? null;
export const learnTrack = (track: LearnTrack) => BY_SLUG.get(track)!;
export const learnTopics = (track: LearnTrack) => SUBJECTS.filter((sub) => sub.kind === 'topic' && sub.track === track);

export function learnPlaces(subject: LearnSubject): TeachPlace[] {
  return subject.localData ? TEACH_PLACES.filter((p) => p.skills.includes(subject.track)) : [];
}

/** A place page exists when the subject has local data and the place has it too. */
export function getLearnPlace(subject: LearnSubject, placeSlug: string): TeachPlace | null {
  if (!subject.localData) return null;
  return getTeachPlace(subject.track, placeSlug);
}

/** What /learn-<track>/<slug> is: one of the track's topics, or a place. */
export function resolveTrackSlug(
  track: LearnTrack,
  slug: string,
): { kind: 'topic'; topic: LearnSubject } | { kind: 'place'; track: LearnSubject; place: TeachPlace } | null {
  const sub = getLearnSubject(slug);
  if (sub && sub.kind === 'topic' && sub.track === track) return { kind: 'topic', topic: sub };
  const t = learnTrack(track);
  const place = getLearnPlace(t, slug);
  return place ? { kind: 'place', track: t, place } : null;
}

/** Static params for app/learn-<track>/[slug]. */
export function trackSlugParams(track: LearnTrack) {
  return [...learnTopics(track).map((t) => t.slug), ...learnPlaces(learnTrack(track)).map((p) => p.slug)].map(
    (slug) => ({ slug }),
  );
}

/** Every learn URL, for the sitemap. */
export function allLearnPaths() {
  return SUBJECTS.flatMap((sub) => [
    { path: learnPath(sub), kind: sub.kind },
    ...learnPlaces(sub).map((p) => ({ path: learnPath(sub, p), kind: 'place' as const })),
  ]);
}

/** The intro's first sentence, with its full stop. */
export const firstSentence = (text: string) => `${text.split('. ')[0].replace(/\.$/, '')}.`;

/** Link cards for every topic in a track. */
export function topicCards(track: LearnTrack) {
  return learnTopics(track).map((sub) => ({
    href: learnPath(sub),
    kicker: sub.status === 'path' ? 'Learning path' : 'Topic guide',
    title: `Learn ${sub.label}`,
    text: firstSentence(sub.intro),
  }));
}

export const learnNearby = (subject: LearnSubject, place: TeachPlace) => nearby(place, subject.track);
export { teachPath };

/* ── The learner's local number: what an example course costs ───────── */

const LADDER = calculateCoursePricingLadder(EXAMPLE_PRICE_USD);
export const EXAMPLE_YEARLY_USD = LADDER.yearly.price;
export const EXAMPLE_MONTHLY_PLAN_USD = LADDER.monthly.price;
/** Yearly plan, per month — the number a learner compares to their budget. */
export const EXAMPLE_YEARLY_PER_MONTH_USD = Math.round((EXAMPLE_YEARLY_USD / 12) * 100) / 100;

export function learnerPrice(place: TeachPlace) {
  const c = place.country;
  if (!c?.usdRate) return null;
  const perMonth = EXAMPLE_YEARLY_PER_MONTH_USD * c.usdRate;
  const gdpMonthly = c.gdpPerCapita ? c.gdpPerCapita / 12 : null;
  return {
    currency: c.currency,
    yearlyLocal: EXAMPLE_YEARLY_USD * c.usdRate,
    perMonthLocal: perMonth,
    monthlyPlanLocal: EXAMPLE_MONTHLY_PLAN_USD * c.usdRate,
    /** Share of a month's GDP per person the yearly plan costs per month */
    shareOfGdpMonth: gdpMonthly ? (EXAMPLE_YEARLY_PER_MONTH_USD / gdpMonthly) * 100 : null,
  };
}
