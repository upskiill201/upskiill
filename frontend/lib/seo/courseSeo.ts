/**
 * Search-facing titles and descriptions for course pages, chosen from the
 * keyword research (scripts/seo/keywords.mjs → out/keywords/<slug>.md).
 *
 * Why this file exists: the course description in the database is the long
 * story intro ("Kofi has just started university in Kumasi…"), which is what
 * Google was showing as the snippet, and the default title is the same
 * template for every course. Searchers typing "how to budget on a low income"
 * or "python course free" need the topic and the promise in the first words.
 *
 * Titles ≤ 60 characters, descriptions ≤ 160. Claims here come from the
 * course itself and lib/seo/facts.ts: nothing that is not true of the course.
 * A course with no entry keeps the default title and its own description.
 */
export interface CourseSeo {
  title: string;
  description: string;
}

export const COURSE_SEO: Record<string, CourseSeo> = {
  'budgeting-for-beginners': {
    title: 'Budgeting for Beginners: Learn to Budget | Teyro',
    description:
      'Learn how to budget, even on a low income: track your spending, tell needs from wants and build a monthly budget you keep. 50 short lessons, free to start.',
  },
  'python-for-beginners': {
    title: 'Learn Python for Beginners: Free to Start | Teyro',
    description:
      'Learn Python from zero in short daily lessons. Write and run real code in every lesson, right on your phone. 120 lessons, free to start.',
  },
  'working-with-ai-coding-agents': {
    title: 'Learn AI Coding Agents: Brief, Review, Ship | Teyro',
    description:
      'Learn to work with AI coding agents: write clear briefs, review their code, catch mistakes with tests and ship safely. Practice agent in your browser. Free to start.',
  },
  'how-to-get-hired': {
    title: 'How to Get Hired: Networking, Interviews, Offers | Teyro',
    description:
      'Learn how to get hired: find jobs nobody posted, network when you know nobody, win an internship, ace interviews and negotiate your offer. Free to start.',
  },
  'acing-job-interviews': {
    title: 'Ace Job Interviews: Practise Real Questions | Teyro',
    description:
      'Learn how interviews really work and practise answering common and tricky questions with clear, honest stories, from phone screen to final round. Free to start.',
  },
  'how-to-get-noticed-by-employers': {
    title: 'Get Noticed by Employers: CV, Cover Letter, LinkedIn | Teyro',
    description:
      'Find the skills you already have, build proof without a job, and write a CV, cover letter and LinkedIn profile that recruiters read. Free to start.',
  },
  'how-to-get-ahead-at-work': {
    title: 'How to Get Ahead at Work: Promotion and Career Plan | Teyro',
    description:
      'Handle your first 90 days, become more valuable, ask for a promotion, build a career plan and change direction without starting from zero. Free to start.',
  },
  'build-and-launch-a-website': {
    title: 'Build and Launch a Website: Forms, Search, Launch | Teyro',
    description:
      'Turn a simple page into a real website: a booking form, gentle motion, accessibility and search basics, then launch it properly. Short lessons, free to start.',
  },
  'html-and-css-for-beginners': {
    title: 'Learn HTML and CSS for Beginners: Free to Start | Teyro',
    description:
      'Build your first website on a live page that changes as you type, then publish it on the internet for free. 100 ten-minute lessons, free to start.',
  },
  'responsive-web-design-with-css': {
    title: 'Responsive Web Design with CSS: Flexbox and Grid | Teyro',
    description:
      'Learn responsive web design: tidy cards, headers, Flexbox, Grid and layouts that fit phones and laptops, built on a live page. Free to start.',
  },
  'sql-and-databases-for-beginners': {
    title: 'Learn SQL for Beginners: Real Queries, Free to Start | Teyro',
    description:
      'Learn SQL by building a cinema booking database. Real queries run in your browser in every lesson, nothing to install. 50 lessons, free to start.',
  },
  'data-science-for-beginners': {
    title: 'Data Science for Beginners: Python and pandas | Teyro',
    description:
      'Learn data science from zero with Python and pandas: ask a good question, clean messy data, spot real patterns and tell an honest story. Free to start.',
  },
  'leadership-for-beginners': {
    title: 'Leadership for Beginners: Learn to Lead a Team | Teyro',
    description:
      'Learn what new leaders actually do: one-on-ones, clear goals, delegation, feedback and hard conversations. 50 short lessons, free to start.',
  },
  'how-to-handle-difficult-negotiations': {
    title: 'Handle Difficult Negotiations: Tactics and No | Teyro',
    description:
      'Keep your head under pressure, spot classic negotiation tactics, say no to unreasonable requests and use your alternatives to close a fair deal. Free to start.',
  },
  'negotiation-skills-for-beginners': {
    title: 'Negotiation Skills for Beginners: Ask and Close | Teyro',
    description:
      'Learn to prepare, name a number, find deals where both sides win and close calmly: at work, with a landlord or your first client. Free to start.',
  },
  'how-to-manage-conflict-at-work': {
    title: 'Manage Conflict at Work: Calm, Clear, Firm | Teyro',
    description:
      'Cool down arguments, clear up misunderstandings, answer unfair criticism and set boundaries at work without being the villain or the doormat. Free to start.',
  },
  'how-to-price-a-product-or-service': {
    title: 'How to Price a Product or Service | Teyro',
    description:
      'Work out what a sale really costs and what it is worth to customers, then set, test and raise prices without losing the people who matter. Free to start.',
  },
  'how-to-validate-a-business-idea': {
    title: 'How to Validate a Business Idea in Days | Teyro',
    description:
      'Test a business idea for almost nothing: real customer conversations, simple market sums, cheap tests and an honest decision. 50 short lessons, free to start.',
  },
  'ai-at-work-beginner': {
    title: 'AI at Work for Beginners: Use AI Well | Teyro',
    description:
      'Learn to get genuinely useful work out of AI tools, from your first prompt to everyday workflows, and keep confidential data safe. Free to start.',
  },
  'ai-tools-for-everyday-productivity': {
    title: 'AI Tools for Everyday Productivity | Teyro',
    description:
      'Learn the prompt recipe, how to check facts, write in your own voice, study with AI and plan your week. 50 short lessons, free to start.',
  },
  'vibe-coding-build-apps-with-ai': {
    title: 'Vibe Coding: Build Apps With AI, No Coding | Teyro',
    description:
      'Never coded? Build a real app with Claude Code: brief it, check it, test it, fix it, secure it and put it live. 80 short lessons, free to start.',
  },
  'the-ai-stack': {
    title: 'The AI Stack: How AI Products Are Built | Teyro',
    description:
      'Learn how AI products are built: chips, models, data, agents, apps and evaluation. Build your own AI assistant in your browser. Free to start.',
  },
  'study-smarter-with-ai-beginner': {
    title: 'Study Smarter With AI: Beginner Course | Teyro',
    description:
      'Turn any AI chat into an honest study partner: understand hard topics, test yourself, take notes that stick and get ready for exams. Free to start.',
  },
  'speak-like-a-ceo': {
    title: 'Speak Like a CEO: Structure What You Say | Teyro',
    description:
      'Learn how confident speakers structure what they say, from a two-minute update in a meeting to a talk for 300 people. 50 short lessons, free to start.',
  },
  'how-to-give-a-convincing-elevator-pitch': {
    title: 'Elevator Pitch Course: Build One People Remember | Teyro',
    description:
      'Build a pitch people remember: one clear sentence, a hook, a story, confident delivery and a clear ask. For you, your idea or your business. Free to start.',
  },
  'the-art-of-small-talk': {
    title: 'The Art of Small Talk: Start and Keep It Going | Teyro',
    description:
      'Start a conversation with anyone, keep it going with the right questions and handle small talk at work and events. 50 short lessons, free to start.',
  },
  'how-to-make-people-listen-to-you': {
    title: 'How to Make People Listen to You | Teyro',
    description:
      'Learn why people tune out and how to be heard: one clear point, a voice people trust, holding the floor in meetings. 50 short lessons, free to start.',
  },
  'corporate-jargon-beginner': {
    title: 'Corporate Jargon Decoded for Beginners | Teyro',
    description:
      'Decode office language: jargon, acronyms, euphemisms and unwritten rules, and answer in plain, professional English. 80 short lessons, free to start.',
  },
  'clear-writing-at-work': {
    title: 'Clear Writing at Work: Plain Language | Teyro',
    description:
      'Fewer words, plain language, the point and the ask first, documents people can skim and hard messages said kindly. 50 short lessons, free to start.',
  },
  'how-scams-and-financial-fraud-work': {
    title: 'How Scams and Financial Fraud Work | Teyro',
    description:
      'Learn the recipe behind every scam, spot investment, phishing, impersonation and money-mule traps, and know what to do in the first hour. Free to start.',
  },
  'how-to-understand-investment-risk': {
    title: 'Understand Investment Risk for Beginners | Teyro',
    description:
      'Learn what risk really means, the kinds that catch people out, how time horizon changes everything and how to spot guaranteed offers. Free to start.',
  },
  'money-habits-that-build-long-term-wealth': {
    title: 'Money Habits That Build Long-Term Wealth | Teyro',
    description:
      'The handful of habits that build wealth on any income: pay future you first, let compounding work, avoid costly debt and stay the course. Free to start.',
  },
  'needs-vs-wants-making-better-spending-decisions': {
    title: 'Needs vs Wants: Spend Better, Stop Lifestyle Creep | Teyro',
    description:
      'Spot lifestyle creep, draw your own line between needs and wants, spend on what you value and make hard money choices you will not regret. Free to start.',
  },
  'how-to-stop-impulse-buying': {
    title: 'How to Stop Impulse Buying | Teyro',
    description:
      'Learn what drives your spending, how shops and apps get you to buy and simple ways to pause so every purchase is one you meant. 50 lessons, free to start.',
  },
  'how-to-save-money-on-a-low-income': {
    title: 'How to Save Money on a Low Income | Teyro',
    description:
      'Set a goal you can reach, build a small emergency fund, find spending you will not miss and make saving automatic. 50 short lessons, free to start.',
  },
  'react-native-for-beginners': {
    title: 'Learn React Native for Beginners: Build a Phone App | Teyro',
    description:
      'Build a real phone app for Android and iPhone with React Native. Ten-minute lessons, real code in every one, screens you can tap in the lesson. Free to start.',
  },
  'c-for-beginners': {
    title: 'Learn C Programming for Beginners | Teyro',
    description:
      'Learn C programming from scratch in short lessons with real code: variables, loops, functions, arrays and pointers. 78 lessons, free to start.',
  },
  'javascript-for-beginners': {
    title: 'Learn JavaScript for Beginners: Free to Start | Teyro',
    description:
      'Learn JavaScript from zero on your phone: variables, decisions, functions, lists and objects, with real code in every ten-minute lesson. Free to start.',
  },
  'interactive-web-pages-with-javascript': {
    title: 'Interactive Web Pages with JavaScript | Teyro',
    description:
      'Make web pages come alive: change the page, react to taps and typing, build lists from data and check forms, on a live page in every lesson. Free to start.',
  },
  'typescript-for-beginners': {
    title: 'TypeScript for Beginners: Learn Types | Teyro',
    description:
      'Learn TypeScript step by step in 20 short lessons: types, functions, interfaces and unions, built on what you know of JavaScript. Free to start.',
  },
  'machine-learning-for-beginners': {
    title: 'Machine Learning for Beginners: Build a Real Model | Teyro',
    description:
      'Learn machine learning by building one real model, step by step: real Python in your browser, no maths degree, nothing to install. Free to start.',
  },
  'how-to-motivate-a-team': {
    title: 'How to Motivate a Team: What Really Works | Teyro',
    description:
      'Learn what really motivates people at work: fixing the basics, purpose, autonomy, mastery, fair recognition and healthy workloads. Free to start.',
  },
  'how-to-set-clear-expectations': {
    title: 'How to Set Clear Expectations at Work | Teyro',
    description:
      'Set expectations people can meet: clear briefs, roles, quality bars, priorities, checking understanding and fixing missed expectations. Free to start.',
  },
  'how-to-lead-without-being-the-boss': {
    title: 'Lead Without Being the Boss: Influence at Work | Teyro',
    description:
      'Lead without authority: build credibility, influence people, find shared goals, run meetings you do not own and get results across teams. Free to start.',
  },
};
