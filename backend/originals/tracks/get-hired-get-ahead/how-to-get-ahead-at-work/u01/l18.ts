import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 18 — Ngozi's 90-day review notes. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Ngozi\'s notes',
  summary: 'Before Clinton\'s 90-day check-in, Ngozi shares her notes so he can read them first. Five lines. Tap each one to see what she\'s really telling him.',
  minutes: 11,
  outcomes: ['Read a manager\'s review notes', 'Spot strengths, growth areas and next steps', 'Prepare for a review conversation'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of Ngozi\'s notes',
      text: 'Learning: fast. Notes doc now used by every new starter.\nDelivery: tap-once fix shipped; retry button nearly done.\nIncident: flagged early, owned it, wrote a clear review.\nGrow: speak up more in design meetings. He has ideas and keeps them to himself.\nNext 90 days: own the "sync status" feature for support, end to end.',
      hotspots: [
        { phrase: 'Notes doc now used by every new starter.', note: 'Impact beyond his own work. Managers notice when you make things easier for others.' },
        { phrase: 'retry button nearly done', note: 'Honest: nearly, not done. Good to finish before the meeting if he can.' },
        { phrase: 'flagged early, owned it', note: 'The bug became a strength in his review because of how he handled it.' },
        { phrase: 'speak up more in design meetings', note: 'The growth area. It links straight to the week-eight meeting where he stayed quiet. Specific and fixable.' },
        { phrase: 'own the "sync status" feature for support, end to end', note: 'The next step, and it comes from his coffee with the support lead. His relationships are shaping his work.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'In review notes, find three things: strengths to keep, one growth area, and the next step. Come with a plan for the growth area.',
    },
  ],
  apply: {
    scenario: 'Clinton reads Ngozi\'s notes.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Strength or growth area?',
        groups: ['Strength', 'Growth area'],
        items: [
          { text: 'Learns fast', group: 0 },
          { text: 'Speak up more in design meetings', group: 1 },
          { text: 'Owned the incident', group: 0 },
          { text: 'Notes doc helps new starters', group: 0 },
          { text: 'Shares ideas too rarely', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the incident listed as a strength?',
        options: [
          { text: 'Because of how he handled it: early, owned, clear write-up' },
          { text: 'Because breaking things is good', why: 'It\'s the handling that counted.' },
          { text: 'It\'s a mistake in the notes', why: 'It\'s deliberate: he handled it well.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each note to where it came from.',
        pairs: [
          ['Speak up more', 'Silent in the week-eight meeting'],
          ['Sync status feature', 'Coffee with the support lead'],
          ['Notes doc', 'His week-one habit'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best response to the growth area.',
        from: 'clinton',
        message: 'How do I respond to "speak up more in design meetings"?',
        options: [
          { text: '"That\'s fair. I\'ll come to each design meeting with one idea or question prepared. Could you invite me to share it?"' },
          { text: '"But I\'m shy."', why: 'Acknowledge it and bring a plan.' },
          { text: '"I disagree."', why: 'It\'s fair and specific. Plan for it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap Clinton\'s misreading.',
        lines: ['I have strengths to keep.', 'One growth area means I\'m failing.', 'The next step is a bigger feature.'],
        bug: 1,
        explanation: 'Everyone has growth areas. A bigger next step shows trust.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s preparation in order.',
        lines: ['Read the notes calmly', 'Find strengths, growth and next step', 'Finish the retry button if he can', 'Bring a plan for the growth area'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What does a bigger next feature signal?',
        options: [
          { text: 'Ngozi trusts him with more' },
          { text: 'She wants him to fail', why: 'It\'s trust.' },
          { text: 'Nothing', why: 'It\'s a sign of trust.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Strengths to [[1]], one growth area, the next [[2]].',
        blanks: [['keep'], ['step']],
        distractors: ['hide', 'excuse', 'raise'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which feature will Clinton own next? The sync ___ feature. (one word)',
        answers: ['status'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good review habit, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Reading notes before the meeting', group: 0 },
          { text: 'Arguing with the growth area', group: 1 },
          { text: 'Bringing a plan', group: 0 },
          { text: 'Only reading the praise', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If your manager or teacher wrote five lines about you, what would your growth area probably be? What\'s your plan?',
    starters: ['My growth area might be...', 'My plan:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write five review lines about yourself, as your manager might: learning, delivery, one standout moment, one growth area, next step.',
  },
  notes: 'Review formats vary; sharing notes in advance is good practice but not universal.',
};

export default lesson;
