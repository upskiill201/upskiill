import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4. Story beat: first Friday check-in. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the first Friday',
  summary: 'Friday, 12:45pm. Clinton\'s first 15-minute check-in with Mr Tamba. Before it, Miracle runs a quick quiz on the phone. What internships are for, offers in writing, finding one, and a smart first week.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain what an internship should give you', 'Check an offer for missing details', 'Plan an internship search'],
  learn: [
    {
      kind: 'story',
      title: 'Fifteen minutes',
      beats: [
        { speaker: 'narrator', text: 'Friday, 12:45pm. Fifteen minutes until Clinton\'s first check-in with Mr Tamba. Samuel is still arguing about his hours.' },
        { speaker: 'miracle', text: 'Before you go in: quick quiz. If you can answer these, you\'re ready.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: before the first check-in.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What three things should an internship give you?',
        options: [
          { text: 'Learning, proof for your CV, and a reference' },
          { text: 'A title, a laptop and lunch', why: 'Nice, but the lasting three are learning, proof and a reference.' },
          { text: 'Only a job offer', why: 'An offer is a bonus.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Should a written offer include this?',
        groups: ['Yes', 'No'],
        items: [
          { text: 'Dates', group: 0 },
          { text: 'Hours', group: 0 },
          { text: 'Supervisor', group: 0 },
          { text: 'The founder\'s home address', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the internship search in order.',
        lines: ['Decide what you want to learn', 'Make a deadline calendar', 'Use people as well as adverts', 'Tailor a short application', 'Track and follow up'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the red flag.',
        lines: ['A weekly check-in with a supervisor.', 'Pay a "placement fee" to start.', 'A clear end date.'],
        bug: 1,
        explanation: 'Never pay to get an internship.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'What will you tell Mr Tamba you\'ve learned this week?',
        options: [
          { text: 'That drivers can\'t confirm deliveries without data, and my project can fix that.' },
          { text: 'That I stayed late every night.', why: 'Hours aren\'t results. Share what you learned.' },
          { text: 'Nothing, I\'ll wait for him to ask.', why: 'Come with something useful.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each kind of internship to an example.',
        pairs: [
          ['Formal scheme', 'A bank\'s advertised summer programme'],
          ['Informal', 'Clinton at Kmer'],
          ['Required placement', 'David\'s medical training'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which goal is specific enough?',
        options: [
          { text: '"Front-end work at a fintech"' },
          { text: '"Any internship"', why: 'Too vague.' },
          { text: '"Something good"', why: 'Too vague.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Get it in [[1]]. Never [[2]] to get an internship.',
        blanks: [['writing'], ['pay']],
        distractors: ['secret', 'beg', 'voice'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes is Clinton\'s weekly check-in? (a number)',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Check locally, or true everywhere?',
        groups: ['Check locally', 'True everywhere'],
        items: [
          { text: 'Whether interns must be paid', group: 0 },
          { text: 'Never pay for an internship', group: 1 },
          { text: 'Student work-hour limits', group: 0 },
          { text: 'Learning is the point', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Samuel\'s hours are still unclear. What should he do?',
        options: [
          { text: 'Ask politely to confirm days, hours and project in a short email' },
          { text: 'Shout at Mr Tamba', why: 'Ask calmly to confirm in writing.' },
          { text: 'Quit', why: 'It\'s easy to fix in writing.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which idea from this week would have helped you most in a past job, placement or project?',
    starters: ['It would have helped when...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'If you have any current role (job, volunteering, placement), check: are your dates, hours and tasks written down anywhere? If not, ask.',
  },
  notes: 'Checkpoint 1 (the free stretch is L2 Ch1 l1–5, so this one is paid). Reviews l01–l04. Doubles as Jump ahead / placement questions.',
};

export default lesson;
