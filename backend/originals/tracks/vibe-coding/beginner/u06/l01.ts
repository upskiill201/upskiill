import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 1. Story: the five-fix spiral. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The fifth fix',
  summary: 'Three weeks to go. Parents say the login link never arrives. Hazel types "login is broken, fix it". Five fixes later, the link still doesn\'t arrive, sign-ups appear twice, and it\'s 1 a.m.',
  minutes: 12,
  outcomes: [
    'Recognise a fix loop when you\'re in one',
    'Explain why "it\'s broken, fix it" leads to guessing',
    'Know the first move: stop',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 11 p.m. to 1 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Four parents texted: "No login email." Hazel types: login is broken, fix it.' },
        { speaker: 'narrator', text: 'Fix 1: it rewrites the login form. Still no email. Fix 2: it changes the redirect settings. Still nothing. Fix 3: it says a security rule might be blocking things and turns off the database\'s row rules on signups. Hazel, tired, approves.' },
        { speaker: 'narrator', text: 'Fix 4: it adds a "retry" that sends the email again if it seems slow. Fix 5: it switches to a different version of the login library. Now sign-ups appear twice.' },
        { speaker: 'hazel', text: '(1:04 a.m.) Login is STILL broken. Please just fix it.' },
        { speaker: 'tey', text: 'Stop. Five fixes, zero evidence. Every one was a guess, because nobody ever looked at the actual error. And each guess changed something else.' },
        { speaker: 'tey', text: 'One of those guesses was a security change. Remember fix 3. It comes back in Chapter 7.' },
      ],
      choice: {
        prompt: 'It\'s 1:05 a.m. What should Hazel do?',
        options: [
          { text: 'Fix 6: "try something completely different".', outcome: 'It rewrites the whole login. Now nothing loads at all.' },
          { text: 'Stop. Go back to the last commit that worked, sleep, and tomorrow find the real error first.', outcome: 'Tuesday morning, coffee, one working version, and a plan: evidence before fixes.', best: true },
          { text: 'Give up on logins.', outcome: 'Then anyone can sign anyone up. Ruth would have words.' },
        ],
      },
    },
  ],
  apply: {
    scenario: 'The 1 a.m. spiral.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did five fixes fail?',
        options: [
          { text: 'Each one was a guess; nobody looked at the real error' },
          { text: 'The AI is useless at logins', why: 'It never had the evidence it needed.' },
          { text: 'Not enough fixes yet', why: 'More guesses make more changes, not more answers.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Signs of a fix loop, or normal debugging?',
        groups: ['Fix loop', 'Normal debugging'],
        items: [
          { text: 'Each fix changes something new', group: 0 },
          { text: 'You read the error message first', group: 1 },
          { text: '"Still broken, try again" for the fifth time', group: 0 },
          { text: 'One change, then test the exact problem', group: 1 },
          { text: 'New bugs appearing that weren\'t there before', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Just one more fix, Miss B. Number six will work!',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'You\'re right, one more.', why: 'That\'s how the loop keeps going.' },
          { text: 'No more guesses. First we find out what\'s actually going wrong.' },
          { text: 'Let\'s try ten at once.', why: 'Ten guesses at once is ten new problems.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which fix should worry Hazel most, even after the loop?',
        lines: [
          'Fix 1: rewrote the login form',
          'Fix 2: changed redirect settings',
          'Fix 3: turned off the database\'s row rules on signups',
          'Fix 5: switched the login library version',
        ],
        bug: 2,
        fix: 'Turn the rules back on, and check who can read what (Chapter 7).',
        explanation: 'A security switch flipped to make an error go away is the most dangerous kind of guess.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s debugging rule.',
        template: '[[1]] before fixes. If you\'re looping, [[2]].',
        blanks: [['Evidence'], ['stop']],
        distractors: ['Guesses', 'speed up'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did "retry" (fix 4) make things worse?',
        options: [
          { text: 'It sent the email more times; if emails are limited, that uses up the limit faster' },
          { text: 'Retrying is always wrong', why: 'Sometimes it helps. Here it fed the real problem.' },
          { text: 'It didn\'t make anything worse', why: 'It sent extra emails.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The first move when you notice a fix loop. (One word.)',
        answers: ['stop'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the 1 a.m. habit to the better one.',
        pairs: [
          ['"It\'s broken, fix it"', 'Give it the exact error'],
          ['Approving while tired', 'Stop and come back tomorrow'],
          ['Fix on top of fix', 'Go back to the last working commit'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 4: where is the last version that worked?',
        options: [
          { text: 'Nowhere, it\'s gone', why: 'She committed after each layer.' },
          { text: 'In the AI\'s memory', why: 'Git has it, exactly.' },
          { text: 'In her last good commit, and on GitHub' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'In 32 years, the best debuggers I knew were the ones who stopped first. What will you do tomorrow?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'Start from the last working commit, find the actual error message, and only then ask for one fix.' },
          { text: 'Ask for fix 6.', why: 'Ruth sighs.' },
          { text: 'Rebuild the whole app.', why: 'The app was fine before the loop.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever kept trying the same kind of fix for something (a printer, a recipe, an argument)? What would "stopping first" have looked like?',
  },
  deepen: {
    title: 'Check your safety net',
    summary: 'Run git log --oneline in your app. Can you name the last commit where everything worked? If not, test now and commit a known-good version before you change anything else.',
  },
  notes: 'Fix-loop behaviour (repeated speculative patches) is a widely reported coding-agent failure mode. Fix 3 sets up Chapter 7: disabling Row Level Security in the database is not undone by git.',
};

export default lesson;
