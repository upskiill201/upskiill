import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Reading: scope creep. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Scope creep',
  summary: 'Fourteen features arrived in one email. Usually they arrive one at a time, each "tiny". Grace sends Arjun the research on how projects quietly grow until they fail.',
  minutes: 12,
  outcomes: [
    'Know what scope creep is and why it\'s common',
    'Spot creep before it adds up',
    'Agree a clear scope at the start',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Death by a thousand tweaks',
      html: '<p><strong>Scope creep</strong> is when a project slowly grows beyond what was agreed, usually through small additions nobody prices. The Project Management Institute\'s 2018 <em>Pulse of the Profession</em> survey found that about half of projects (52%) experienced scope creep.</p><p>It rarely looks unreasonable in the moment:</p><ul><li>"Can the button be green?" (an hour)</li><li>"Could it also show last month\'s points?" (a day)</li><li>"Our CEO wants a staff leaderboard." (a week)</li></ul><p>Each one sounds small. Together they can add weeks, and the date doesn\'t move.</p><p><strong>Three defences:</strong></p><ul><li><strong>A written scope</strong> at the start: exactly what\'s in phase one, and what isn\'t.</li><li><strong>A change process:</strong> every addition gets a time and price before anyone says yes (Lesson 8).</li><li><strong>A running log</strong> so both sides see how changes add up.</li></ul><p>None of this is about saying no. It\'s about making every yes visible.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Scope creep is small, unpriced additions adding up. Write the scope down, and price every change before saying yes.',
    },
  ],
  apply: {
    scenario: 'Scope creep.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'In PMI\'s 2018 survey, about what percentage of projects experienced scope creep?',
        answers: ['52', '52%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What is scope creep?',
        options: [
          { text: 'A project slowly growing beyond what was agreed, through small unpriced additions' },
          { text: 'A client cancelling a project', why: 'It\'s about growth, not cancellation.' },
          { text: 'A bug in the code', why: 'It\'s about what\'s included.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Defence against scope creep, or a cause?',
        groups: ['Defence', 'Cause'],
        items: [
          { text: 'A written scope at the start', group: 0 },
          { text: '"Sure, quick tweak, no problem"', group: 1 },
          { text: 'Pricing every change', group: 0 },
          { text: 'Nobody tracking additions', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the request to its rough size.',
        pairs: [
          ['Make the button green', 'An hour'],
          ['Show last month\'s points', 'A day'],
          ['A staff leaderboard', 'A week'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'A green button is just an hour. Can\'t we say yes to small stuff?',
        prompt: "Kavya's best reply?",
        options: [
          { text: 'One hour, fine. But log it. Twenty "just an hour"s is half a week, and nobody will remember agreeing to them.' },
          { text: 'Never do anything extra.', why: 'Small extras are fine if visible.' },
          { text: 'Yes, never log small things.', why: 'Small things add up unseen.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The point of the defences.',
        template: 'It\'s not about saying [[1]]. It\'s about making every yes [[2]].',
        blanks: [['no'], ['visible']],
        distractors: ['yes', 'secret'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Twenty extras of one hour each. How many hours is that?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does scope creep hurt even when each request is small?',
        options: [
          { text: 'They add up, and the deadline and price don\'t move' },
          { text: 'Small requests are always rude', why: 'They\'re usually innocent.' },
          { text: 'It doesn\'t hurt', why: 'About half of projects suffer from it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the phase-one scope invites creep?',
        lines: [
          'Phase one: app, points, scan in shop, welcome reward.',
          'Not in phase one: gift cards, referrals, staff dashboard.',
          'Plus any other small things that come up.',
          'Changes priced before they start.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: '"Any other small things" is an open door.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the three defences.',
        lines: ['Write the scope down', 'Price every change', 'Log changes as they add up'],
      },
    ],
  },
  reflect: {
    prompt: 'Has a project of yours grown quietly? List the "small" additions and add up what they cost.',
    starters: ['The additions were...', 'Together they cost...'],
  },
  deepen: {
    title: 'Say what\'s out, too',
    summary: 'A good scope says what\'s not included as clearly as what is. "Gift cards: phase two" prevents an argument in week nine.',
  },
  notes: 'Project Management Institute, Pulse of the Profession (2018): 52% of projects completed in the previous 12 months experienced scope creep. Fictional examples.',
};

export default lesson;
