import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Reading: "we can do this" (collective efficacy; Bandura 1997; Gully et al. 2002). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: '"We can do this"',
  summary: 'Tuesday. Fourteen clinics live by 5 p.m. Something has shifted. Halima says "we\'ll do 14 again tomorrow" like it\'s a fact. On the bus home, Tey sends Miracle a read on why a team\'s belief in itself matters so much.',
  minutes: 12,
  outcomes: [
    'Know what collective efficacy is',
    'Know why team confidence links to performance',
    'Build a team\'s belief in itself, honestly',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Team confidence',
      html: "<p>Chapter 3 covered <strong>self-efficacy</strong>: one person's belief they can do something. Albert Bandura also described <strong>collective efficacy</strong>: a group's shared belief that, together, it can do what it needs to do.</p><h3>Why it matters</h3><p>A review of many studies by <strong>Stanley Gully</strong> and colleagues (2002) found that team efficacy was clearly linked to team performance, especially when team members really depended on each other. Teams that believe they can do it tend to try harder, plan better and recover faster from setbacks. Teams that believe they can't often give up before they've really tried.</p><h3>Where it comes from</h3><p>The same sources as individual confidence, applied to the group:</p><ul><li><strong>Past wins together:</strong> \"We did 15 last Thursday.\" The strongest source.</li><li><strong>Seeing similar teams succeed:</strong> \"The Accra team launched 80 clinics in a week last year.\"</li><li><strong>Credible encouragement:</strong> from someone who knows the work and doesn't exaggerate.</li><li><strong>The mood in the room:</strong> calm planning, not panic.</li></ul><h3>Keep it honest</h3><p>Collective efficacy built on false hope collapses at the first setback. Built on real evidence (yesterday's 14, Chidi's fix holding), it grows each day. Miracle's job is to make the team's real progress visible, every day, so belief has something to stand on.</p>",
    },
    {
      kind: 'check',
      question: 'What\'s the strongest source of a team\'s belief in itself?',
      options: ['Past wins together', 'A motivational poster', 'Pay'],
      answer: 0,
      explanation: '"We did it before" is the best evidence that "we can do it again".',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Collective efficacy: "together, we can". Linked to performance. Built from shared wins, similar teams, credible encouragement and a calm room. Keep it honest.',
    },
  ],
  apply: {
    scenario: 'The bus home, Tuesday.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is collective efficacy?',
        options: [
          { text: 'One person\'s confidence', why: 'That\'s self-efficacy.' },
          { text: 'How efficient a team is', why: 'It\'s about belief.' },
          { text: 'A group\'s shared belief that together it can do what it needs to' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Builds team belief honestly, or not?',
        groups: ['Honest', 'False hope'],
        items: [
          { text: '"We did 14 today."', group: 0 },
          { text: '"Easy, we\'ll smash it!"', group: 1 },
          { text: '"The Accra team did 80 in a week."', group: 0 },
          { text: '"Nothing can go wrong now."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'We\'ll do 14 again tomorrow.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Don\'t jinx it.', why: 'Undercuts a good, honest belief.' },
          { text: 'I think so too. And if tomorrow\'s harder, we\'ve already proved we can recover from a six-hour outage.' },
          { text: 'You\'ll need to do 20.', why: 'Raises the bar right as belief forms.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Team efficacy matters most when members ___ on each other. (one word)',
        answers: ['depend', 'Depend', 'rely'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the source to Miracle\'s example.',
        pairs: [
          ['Past wins together', '"We did 15 last Thursday."'],
          ['Similar teams', '"Accra did 80 in a week."'],
          ['The mood in the room', 'Calm planning, not panic'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does false hope collapse?',
        options: [
          { text: 'It has no evidence to stand on, so the first setback breaks it' },
          { text: 'It doesn\'t; hope is always good', why: 'Honest hope lasts. False hope breaks.' },
          { text: 'People forget it', why: 'Setbacks break it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s Wednesday stand-up. Which line is false hope?',
        lines: [
          'Yesterday: 14 live. Total: 255.',
          'Nothing can stop us now!',
          'Chidi\'s power-cut fix held through two outages.',
        ],
        bug: 1,
        fix: 'Today\'s target: 14 again. We know we can.',
        explanation: '"Nothing can stop us" breaks the moment something does.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put building team belief in order.',
        lines: ['Name a real past win', 'Show today\'s progress', 'Point to a similar team', 'Plan tomorrow calmly'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Build belief on [[1]], not on [[2]].',
        blanks: [['evidence', 'wins', 'progress'], ['hope', 'hype']],
        distractors: ['fear', 'pay'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the team\'s new belief.',
        tiles: ['Together,', 'we', 'can', 'do', 'this.'],
        distractors: ['maybe'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a team you\'ve been in that believed it could do something hard. What was that belief built on? Did it hold?',
    starters: ['The team believed...', 'It was built on...'],
  },
  deepen: {
    title: 'Show yesterday\'s win',
    summary: 'In your next team meeting about something hard, start with one real thing the team achieved recently. Then plan.',
  },
  notes: 'Albert Bandura, Self-Efficacy: The Exercise of Control (1997): collective efficacy. Stanley M. Gully, Kara A. Incalcaterra, Aparna Joshi & J. Matthew Beaubien (2002), "A meta-analysis of team-efficacy, potency, and performance", J. Applied Psychology 87(5): relationships stronger under high interdependence. Fictional details.',
};

export default lesson;
