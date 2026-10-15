import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. "Rewind" (Before/After): the update nobody heard vs the update that held the room. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Rewind: the update nobody heard',
  summary: 'The producer replays Lucía\'s summer-campaign update from yesterday, then her new version, practised on air with Tey playing Diego at full volume.',
  minutes: 12,
  outcomes: [
    'Open an update with the decision, not a slow build-up',
    'Preview the shape of your update',
    'Invite input at a set moment, not at random',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Rewind: Lucía\'s update',
      before: {
        label: 'Yesterday',
        text: '"So, um, I\'ve been thinking a lot about summer, and you know how last year was, and there are lots of options out there, and I looked at the data, and the plan for the summer campaign is..." (Diego: "...TikTok!")',
      },
      after: {
        label: 'Today',
        text: '"Decision first: this summer we\'re focusing on email and in-store events, not new social channels. (pause) Three quick points on why, then I want everyone\'s ideas, Diego\'s first."',
      },
      notes: [
        'The decision in the first sentence. Nothing for Diego to "finish".',
        'A preview: three points, then a set time for everyone\'s input.',
        'Diego is named and given a turn, so he has a reason to wait.',
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>Why the old version invited interruptions:</strong> a slow build-up (\"I've been thinking... and you know... and there are options...\") leaves gaps. Excited people fill gaps. When the decision comes first, there's no gap to fill.</p><p>This is the same idea as Arjun's BLUF in Chapter 2, but spoken: <strong>lead with the decision</strong>, then the reasons, then the invitation.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Decision first. Preview the shape. Name when others get their turn.',
    },
  ],
  apply: {
    scenario: 'Tey FM, Rewind.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did yesterday\'s update invite Diego\'s interruption?',
        options: [
          { text: 'Lucía spoke too clearly', why: 'The opposite.' },
          { text: 'The slow build-up left gaps, and Diego filled them' },
          { text: 'Diego wasn\'t paying attention', why: 'He was very much paying attention. Too much.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Lucía\'s new update in order.',
        lines: ['The decision: email and in-store events.', 'A pause.', 'A preview: three quick points on why.', 'The invitation: then everyone\'s ideas, Diego\'s first.'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Build-up, or decision first?',
        groups: ['Build-up', 'Decision first'],
        items: [
          { text: 'So, um, I\'ve been thinking a lot about summer...', group: 0 },
          { text: 'This summer we\'re focusing on email and events.', group: 1 },
          { text: 'There are lots of options out there...', group: 0 },
          { text: 'Decision: no new social channels this summer.', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Isn\'t "Diego\'s first" rewarding him for interrupting?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Yes, give him nothing.', why: 'Then he\'ll keep grabbing.' },
          { text: 'Let him go first instead of you.', why: 'Lucía goes first. Diego is next.' },
          { text: 'It gives him a reason to wait. He knows his turn is coming, so he doesn\'t need to grab it.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In a spoken update, lead with the ___. (one word)',
        answers: ['decision', 'answer', 'headline'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Which earlier tool is "decision first" most like?',
        options: [
          { text: 'Arjun\'s BLUF: bottom line up front' },
          { text: 'Clinton\'s 63 messages', why: 'The opposite.' },
          { text: 'David\'s notebook', why: 'Not quite.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s draft for the next meeting. Which line leaves a gap for Diego?',
        lines: [
          'Decision: we\'re launching the loyalty email in June.',
          'So, um, there are a lot of things to think about, and you know...',
          'Three quick points on why, then your ideas.',
        ],
        bug: 1,
        fix: 'It worked well last spring: one in five customers came back.',
        explanation: 'Vague build-up is a gap. Excited people fill gaps.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Finish your sentence', 'When someone talks over you'],
          ['Keep the promise', 'Return the floor afterwards'],
          ['Decision first', 'No gap to fill'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Lucía\'s new opening.',
        template: '[[1]] first: this summer we\'re focusing on email and [[2]] events. Three quick points, then everyone\'s [[3]].',
        blanks: [['Decision'], ['in-store', 'store'], ['ideas', 'thoughts']],
        distractors: ['TikTok', 'Um'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the invitation.',
        tiles: ['Then', 'I', 'want', 'everyone\'s', 'ideas,', 'Diego\'s', 'first.'],
        distractors: ['never'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of an update you\'ll give soon. Write the first sentence as a decision, then a one-line preview of what\'s coming.',
    starters: ['Decision: ...', 'Preview: ...'],
  },
  deepen: {
    title: 'The first-sentence rule',
    summary: 'For a week, start every spoken update with the decision or news, in one sentence. Notice how many fewer interruptions you get before you reach the point.',
  },
  notes: 'Spoken BLUF with preview and turn-allocation: standard meeting-communication advice; callback to Chapter 2.',
};

export default lesson;
