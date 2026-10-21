import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 19 — Ada's conversation toolkit. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your conversation toolkit',
  summary: 'Everything from Unit 9 in one toolkit: before, during and after any meeting or hard conversation.',
  minutes: 12,
  outcomes: [
    'Use a before/during/after toolkit',
    'Pick the right tool for each situation',
    'Know where AI helps and where it doesn\'t',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Ada\'s conversation toolkit',
      steps: [
        { title: 'Before', body: 'Goal, facts, likely questions. An agenda with owners and minutes. For hard talks: ask, pushback, fallback, BATNA, and a rehearsal with AI.' },
        { title: 'During', body: 'Let people be heard first. Interests, not positions. Disagree with ideas, not people.' },
        { title: 'After', body: 'Five-part follow-up within the hour. Actions with owners and dates.' },
        { title: 'Hard messages', body: 'Angry: acknowledge, own, fix, next step. Feedback: situation, behaviour, impact, question. Apology: responsibility and repair.' },
        { title: 'Across people', body: 'Mirror styles, every city\'s time in invites, own your one-to-ones.' },
        { title: 'AI\'s place', body: 'It prepares, drafts, rehearses and checks tone. Personal and life-changing messages come from you.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Before: prepare and rehearse. During: listen, interests, ideas. After: follow up within the hour. Personal messages: your words.',
    },
  ],
  apply: {
    scenario: 'Ada writes down her toolkit.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Before, during or after?',
        groups: ['Before', 'During', 'After'],
        items: [
          { text: 'Agenda with owners and minutes', group: 0 },
          { text: 'Let them be heard first', group: 1 },
          { text: 'Five-part follow-up', group: 2 },
          { text: 'Rehearse with AI', group: 0 },
          { text: 'Actions with owners and dates', group: 2 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to the tool.',
        pairs: [
          ['Angry email', 'Acknowledge, own, fix, next step'],
          ['Feedback', 'Situation, behaviour, impact'],
          ['Negotiation', 'Interests and BATNA'],
          ['Apology', 'Responsibility and repair'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the toolkit\'s three stages.',
        lines: ['Before', 'During', 'After'],
      },
      {
        kind: 'sortGroups',
        prompt: 'AI helps, or it\'s yours alone?',
        groups: ['AI helps', 'Yours alone'],
        items: [
          { text: 'Rehearsing a hard call', group: 0 },
          { text: 'Condolences', group: 1 },
          { text: 'Drafting a follow-up', group: 0 },
          { text: 'Telling someone their role is ending', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'You handled outage week brilliantly. What would you tell someone new?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Prepare before, listen during, follow up within the hour. And let AI help you calm down before replying, but write the personal stuff yourself.' },
          { text: 'Let AI handle it all.', why: 'AI helps; you lead.' },
          { text: 'Just stay calm.', why: 'There\'s more to it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the toolkit summary.',
        template: 'Before: prepare and [[1]]. After: follow up within the [[2]].',
        blanks: [['rehearse'], ['hour']],
        distractors: ['panic', 'month'],
      },
      {
        kind: 'findBug',
        prompt: 'Which item in Tolu\'s version is wrong?',
        lines: [
          'Before: goal, facts, questions',
          'During: interests, not positions',
          'After: follow up next week',
          'Personal messages: my own words',
        ],
        bug: 2,
        fix: 'After: follow up within the hour.',
        explanation: 'Fast follow-ups keep momentum and trust.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the first move when an angry message arrives?',
        options: [
          { text: 'Pause, and vent to the AI rather than the person' },
          { text: 'Reply immediately', why: 'Pause first.' },
          { text: 'Ignore it', why: 'Reply calmly.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the toolkit\'s core.',
        tiles: ['Prepare,', 'listen,', 'follow', 'up'],
        distractors: ['argue'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many parts in the follow-up email?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which tool helps most in a disagreement with a client?',
        options: [
          { text: 'Shared goal, evidence, an alternative, their call' },
          { text: 'Proving them wrong', why: 'That hardens positions.' },
          { text: 'Agreeing to everything', why: 'Offer an alternative.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the simplest habit to start this week?',
        options: [
          { text: 'A five-part follow-up after every meeting' },
          { text: 'Rewriting every old email', why: 'Start small.' },
          { text: 'Everything at once', why: 'One habit at a time.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which part of the toolkit will you use first this week?',
    starters: ['First:', 'In which meeting:'],
  },
  deepen: { title: 'Try it today', summary: 'Save the toolkit\'s before/during/after list and use it for your next important meeting.' },
  notes: 'Summary of Unit 9.',
};

export default lesson;
