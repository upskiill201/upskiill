import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 6. Reading: costs and limits. (No prices here: they live only in Chapter 1 lesson 3.) */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Costs and limits',
  summary: 'Friday, 4 p.m. Claude Code says Hazel has hit her plan\'s usage limit until the evening. The dinner is tomorrow. Ruth, the treasurer, wants a one-page answer: what does this app cost, and what can run out?',
  minutes: 12,
  outcomes: [
    'Know what each part of the stack can cost or run out of',
    'Check your usage with /usage',
    'Use less: habits that make a plan last',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Ruth\'s one-page cost sheet',
      html:
        '<p>Every part of the stack has a free amount or a plan, and limits. Exact prices change, so Ruth\'s sheet lists <strong>what can run out</strong>, and says "check the pricing page" for numbers.</p>' +
        '<ul><li><strong>Claude plan:</strong> a monthly price with <strong>usage limits</strong> that reset over time. Hit the limit and you wait, upgrade, or pay for extra. Type <code>/usage</code> to see where you are.</li>' +
        '<li><strong>Supabase free plan:</strong> limits on database size, users and emails. A free project that nobody uses for a while gets <strong>paused</strong> until you restore it in the dashboard. Fine for learning; a real app with users may need the paid plan.</li>' +
        '<li><strong>Vercel Hobby:</strong> free for personal, non-commercial projects, with usage limits. Commercial use needs a paid plan.</li>' +
        '<li><strong>Email service:</strong> most have a free amount per month.</li>' +
        '<li><strong>A custom domain</strong> (optional): a yearly fee.</li></ul>' +
        '<p><strong>Habits that make your Claude plan last:</strong></p>' +
        '<ul><li><strong>Small, clear tasks.</strong> A precise brief costs less than three rounds of guessing.</li>' +
        '<li><strong>Plan first.</strong> Fixing a plan is cheap; rebuilding code isn\'t.</li>' +
        '<li><strong>/clear between unrelated tasks.</strong> A long chat is re-read every time; a fresh one is lighter.</li>' +
        '<li><strong>Point, don\'t paste.</strong> "Look at @gigs.js" instead of pasting whole files.</li>' +
        '<li><strong>Do tiny edits yourself.</strong> Changing $30 to $35 by hand costs nothing.</li></ul>',
    },
    {
      kind: 'check',
      question: 'Which command shows how much of your Claude plan you\'ve used?',
      options: ['/usage', '/exit', '/init'],
      answer: 0,
      explanation: '/usage shows session cost and plan usage limits.',
    },
  ],
  apply: {
    scenario: 'Ruth\'s cost sheet.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the service to what can run out.',
        pairs: [
          ['Claude plan', 'Usage limits that reset over time'],
          ['Supabase free', 'Pauses if unused for a while'],
          ['Vercel Hobby', 'Non-commercial use only'],
          ['Custom domain', 'A yearly fee'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Hazel hit her usage limit at 4 p.m. on the day before the dinner. What are her real options?',
        options: [
          { text: 'Wait for the reset, upgrade, or do the small fixes by hand' },
          { text: 'Make a second account', why: 'Against the rules, and it splits her work.' },
          { text: 'Panic', why: 'Tiny fixes by hand still work.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Uses less of your plan, or more?',
        groups: ['Uses less', 'Uses more'],
        items: [
          { text: 'A precise brief', group: 0 },
          { text: 'Pasting whole files into the chat', group: 1 },
          { text: '/clear between unrelated tasks', group: 0 },
          { text: 'Five rounds of "fix it"', group: 1 },
          { text: 'Changing one word by hand', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which command shows your plan usage?',
        answers: ['/usage', 'usage', '/cost'],
        placeholder: '/...',
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'Why doesn\'t your cost sheet have any prices on it?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'Prices change. The sheet lists what can run out and links each pricing page, so it\'s never wrong.' },
          { text: 'Because it\'s all free.', why: 'The Claude plan isn\'t free, and others have limits.' },
          { text: 'I forgot.', why: 'It was on purpose.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Benny\'s money-saving tips is wrong?',
        lines: [
          'Plan first: fixing a plan is cheap.',
          'Use /clear between unrelated tasks.',
          'Paste the whole project into every message so it knows everything.',
          'Make tiny edits yourself.',
        ],
        bug: 2,
        fix: 'Point at files (@gigs.js) instead of pasting everything.',
        explanation: 'Pasting everything makes every message heavier. It can already read the files.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Two cheap habits.',
        template: '[[1]], don\'t paste. Use /[[2]] between unrelated tasks.',
        blanks: [['Point'], ['clear']],
        distractors: ['Shout', 'exit'],
      },
      {
        kind: 'mcq',
        prompt: 'The band\'s Supabase project wasn\'t used over the summer, and now the app won\'t load. Likely why?',
        options: [
          { text: 'It was deleted forever', why: 'Paused, not deleted. The data is kept.' },
          { text: 'The free project was paused for not being used; restore it in the dashboard' },
          { text: 'Vercel broke it', why: 'Check Supabase first.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'I found a video from last year with all the prices. Use that?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Sure, prices never change.', why: 'They change often.' },
          { text: 'Ask the AI instead.', why: 'It may be out of date too.' },
          { text: 'Prices change. I\'ll check each service\'s own pricing page today.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 6: which debugging habit also saves the most usage?',
        options: [
          { text: 'Asking for fix after fix', why: 'The loop is the most expensive habit there is.' },
          { text: 'Evidence first: the exact error and a recipe, then one fix' },
          { text: 'Pasting the whole Console', why: 'Paste the relevant red error.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Make your own one-page cost sheet: each service your app uses, what can run out, and its pricing page.',
    starters: ['Service:', 'Can run out:', 'Pricing page:'],
  },
  deepen: {
    title: 'On your computer: check your usage',
    summary: 'Type /usage in Claude Code and look at where you are this month. Write your cost sheet. Then look at each service\'s pricing page and note today\'s free limits in your own notes (not in this course: they change).',
  },
  notes: 'NO PRICES HERE BY DESIGN: the only price in the course is in Chapter 1 lesson 3. Facts checked October 2026: Claude plans have usage limits that reset; /usage shows session cost and plan usage (code.claude.com commands). Supabase free projects pause after a period of inactivity and can be restored; Vercel Hobby is non-commercial personal use. @ mentions a file in Claude Code.',
};

export default lesson;
