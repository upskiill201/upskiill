import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Step-by-step: the five-part pitch (who, problem, what you do, why you, the ask). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The five-part pitch',
  summary: 'Arjun shares his screen on a video call and draws five empty boxes. "Every pitch I\'ve ever believed had these five things. Fill them in, Ada. No databases allowed."',
  minutes: 12,
  outcomes: [
    'Know the five parts of a clear pitch',
    'Fill them in for Ada\'s app',
    'Start filling them in for your own pitch',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The five boxes',
      steps: [
        {
          title: '1. Who it\'s for',
          body: 'Name a specific group of people. Not "everyone". Ada: "Office savings groups, the ajo that millions of Nigerians run at work."',
        },
        {
          title: '2. The problem',
          body: 'What goes wrong for them today? Make it something they\'d recognise. Ada: "They track it in a notebook, and every month someone swears they paid."',
        },
        {
          title: '3. What you do about it',
          body: 'Your solution in plain words, as an outcome, not a feature list. Ada: "My app tracks every payment and sends reminders, so nobody argues about money."',
        },
        {
          title: '4. Why you (proof)',
          body: 'Why should they believe you? Experience, results, or a number. Ada: "My office has used it for four months. Ten people, zero arguments."',
        },
        {
          title: '5. The ask',
          body: 'What do you want next? Be specific. Ada: "I\'m looking for a mentor to help me take it to a hundred offices."',
        },
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>It works for people too, not only products.</strong> For a job seeker, \"who it's for\" is the kind of team you want to join; \"the problem\" is what that team struggles with; \"what you do\" is your skill; \"proof\" is a result you've achieved; and \"the ask\" is the next step, like a coffee or an interview.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Who it\'s for. The problem. What you do. Why you. The ask.',
    },
  ],
  apply: {
    scenario: 'Video call with Arjun. Five boxes.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five parts in order.',
        lines: ['Who it\'s for', 'The problem', 'What you do about it', 'Why you (proof)', 'The ask'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which box does each line belong in?',
        groups: ['The problem', 'Why you', 'The ask'],
        items: [
          { text: 'Every month someone swears they paid', group: 0 },
          { text: 'Ten people, zero arguments in four months', group: 1 },
          { text: 'I\'m looking for a mentor', group: 2 },
          { text: 'The notebook gets lost', group: 0 },
          { text: 'Can I send you a demo?', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which is the best "who it\'s for"?',
        options: [
          { text: '"Everyone who has money"', why: 'Too broad to picture.' },
          { text: '"Users"', why: 'Says nothing.' },
          { text: '"Office savings groups that run an ajo"' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Why do I need "why you"? Isn\'t the app enough?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'You don\'t; skip it.', why: 'Without proof, it\'s just a claim.' },
          { text: 'Proof makes people believe you. "Ten people, zero arguments" turns a claim into a fact.' },
          { text: 'List your whole CV there.', why: 'One strong piece of proof is enough.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The last box: the ___. (one word)',
        answers: ['ask'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Job-seeker version: match the box to the line.',
        pairs: [
          ['Who it\'s for', 'Product teams at fintech startups'],
          ['What you do', 'I design apps people find easy to use'],
          ['The ask', 'Could we have a coffee next week?'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s first try at the boxes. Which line is in the wrong box?',
        lines: [
          'Who: office savings groups.',
          'Problem: it uses a SQLite database with two tables.',
          'What I do: track payments and send reminders.',
        ],
        bug: 1,
        fix: 'Problem: they track it in a notebook, and someone always swears they paid.',
        explanation: 'A database isn\'t a problem the listener has. The problem is what goes wrong for THEM.',
      },
      {
        kind: 'mcq',
        prompt: 'What makes a good "ask"?',
        options: [
          { text: 'Something specific, like "a mentor to help me reach 100 offices"' },
          { text: 'Something vague, like "any support"', why: 'Nobody knows how to say yes to vague.' },
          { text: 'Asking for everything at once', why: 'One clear ask.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Ada\'s proof.',
        template: 'My office has used it for [[1]] months. Ten people, [[2]] [[3]].',
        blanks: [['four'], ['zero', 'no'], ['arguments', 'disputes']],
        distractors: ['tables', 'features'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the five parts, in order.',
        tiles: ['Who,', 'problem,', 'what', 'you', 'do,', 'why', 'you,', 'ask.'],
        distractors: ['database,'],
      },
    ],
  },
  reflect: {
    prompt: 'Fill in the five boxes for your own pitch. One line each. Don\'t worry about making it pretty yet.',
    starters: ['Who it\'s for: ...', 'The problem: ...', 'What I do: ...', 'Why me: ...', 'My ask: ...'],
  },
  deepen: {
    title: 'Five boxes on a card',
    summary: 'Write your five boxes on one small card or phone note. Keep it with you this week and improve one box every day.',
  },
  notes: 'Who/problem/solution/proof/ask is a standard structure across pitch and career-coaching guidance (e.g. problem–solution pitches, the "present-past-future" job-seeker variant taught in Chapter 2).',
};

export default lesson;
