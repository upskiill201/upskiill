import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Card deck: what makes a job motivating (Hackman & Oldham's job characteristics model). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'What makes a job motivating',
  summary: 'Chidi\'s job: answer the next ticket in the queue, any clinic, any problem, all day. He never sees a clinic from start to finish. Tey says there\'s a famous model that explains exactly why that\'s so draining. The cards.',
  minutes: 11,
  outcomes: [
    'Know the five parts of the job characteristics model',
    'Spot which parts are missing from a job',
    'Redesign work so it\'s more motivating',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>In the 1970s, <strong>Richard Hackman</strong> and <strong>Greg Oldham</strong> asked: what makes some jobs motivating and others draining? Their <strong>job characteristics model</strong> found five features that matter. Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Skill variety</h3><p>Using different skills, not the same one all day. Chidi only does login problems. Variety would mix in training, troubleshooting and visits.</p><h3>Card 2: Task identity</h3><p>Doing a whole, visible piece of work from start to finish. \"Any ticket, any clinic\" has none. \"Your 12 clinics, from sign-up to going live\" has lots.</p><h3>Card 3: Task significance</h3><p>Knowing the work matters to other people. Mrs Lawal and her baby. Lesson 2's research.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: Autonomy</h3><p>Some freedom in how and when you do the work. Chidi has a script and a queue. Could he choose how to onboard his own clinics?</p><h3>Card 5: Feedback from the job</h3><p>Seeing directly how well you're doing. A dashboard showing \"your clinics: 11 live, 1 stuck\" tells Chidi more than any review.</p><h3>Card 6: Small redesigns, big effects</h3><p>A review of hundreds of studies by Stephen Humphrey and colleagues (2007) found these job features were linked to more motivation and satisfaction. Miracle can't change Afiya. She can change how Clinic Success shares its work.</p>",
    },
    {
      kind: 'check',
      question: 'Which feature does "your 12 clinics, start to finish" add?',
      options: ['Task identity', 'Skill variety', 'Pay'],
      answer: 0,
      explanation: 'A whole, visible piece of work you can call yours.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Five features: skill variety, task identity, task significance, autonomy, feedback. Find the missing ones and redesign around them.',
    },
  ],
  apply: {
    scenario: 'Chidi\'s job, card by card.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Who created the job characteristics model?',
        options: [
          { text: 'Herzberg', why: 'He described hygiene factors and motivators.' },
          { text: 'Deci and Ryan', why: 'They described the three needs.' },
          { text: 'Hackman and Oldham' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which job feature is it?',
        groups: ['Task identity', 'Autonomy', 'Feedback'],
        items: [
          { text: 'Your 12 clinics, start to finish', group: 0 },
          { text: 'Choose how to onboard them', group: 1 },
          { text: 'A dashboard: 11 live, 1 stuck', group: 2 },
          { text: 'Owning one region', group: 0 },
          { text: 'Plan your own visit days', group: 1 },
          { text: 'A clinic\'s weekly rating', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'I never see a clinic go live. I just fix the next thing in the queue.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'That\'s how support works.', why: 'It doesn\'t have to be.' },
          { text: 'What if you had your own clinics, start to finish? The northern 40 could be yours, with a dashboard showing how they\'re doing.' },
          { text: 'Just go faster through the queue.', why: 'More of the draining thing.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Doing a whole, visible piece of work start to finish: task ___. (one word)',
        answers: ['identity', 'Identity'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the feature to what it means.',
        pairs: [
          ['Skill variety', 'Using different skills'],
          ['Task significance', 'It matters to people'],
          ['Feedback', 'Seeing how you\'re doing'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which features does "any ticket, any clinic, all day" lack most?',
        options: [
          { text: 'Task identity and feedback' },
          { text: 'None; it\'s a great design', why: 'It\'s why Chidi is bored.' },
          { text: 'Only pay', why: 'Pay isn\'t in the model.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s redesign. Which line doesn\'t add a motivating feature?',
        lines: [
          'Each agent owns a group of clinics, start to finish.',
          'Each agent closes more tickets per hour.',
          'A dashboard shows each person\'s clinics live and stuck.',
        ],
        bug: 1,
        fix: 'Each agent chooses how to run their clinics\' onboarding.',
        explanation: 'More tickets per hour is a target, not a job feature.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put redesigning a job in order.',
        lines: ['Check the five features', 'Find the missing ones', 'Change one thing', 'See if it helps'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Variety, [[1]], significance, autonomy and [[2]].',
        blanks: [['identity'], ['feedback']],
        distractors: ['pizza', 'pay'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Chidi\'s new job.',
        tiles: ['Your', 'clinics,', 'start', 'to', 'finish.'],
        distractors: ['queue'],
      },
    ],
  },
  reflect: {
    prompt: 'Score your own work or studies on the five features. Which one is weakest? What small change would improve it?',
    starters: ['My weakest feature is...', 'A small change: ...'],
  },
  deepen: {
    title: 'Give someone a whole thing',
    summary: 'If you lead anyone, find one piece of work you could give them start to finish, instead of a slice. Watch what happens to their ownership.',
  },
  notes: 'J. Richard Hackman & Greg R. Oldham (1976), "Motivation through the design of work: Test of a theory", Organizational Behavior and Human Performance 16(2); Work Redesign (1980). Stephen E. Humphrey, Jennifer D. Nahrgang & Frederick P. Morgeson (2007), meta-analysis of 259 studies, J. Applied Psychology 92(5).',
};

export default lesson;
