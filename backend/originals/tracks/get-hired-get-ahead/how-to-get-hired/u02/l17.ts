import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 17 — story choice: another intern presents Clinton's idea as hers. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Whose idea was it?',
  summary: 'At the team meeting, Nadia presents "her" idea: a text-message fallback for drivers with very old phones. It\'s the idea Clinton explained to her at lunch on Tuesday. Mr Tamba loves it. Clinton\'s face goes hot.',
  minutes: 11,
  outcomes: ['Handle someone taking credit calmly', 'Make your work visible without drama', 'Choose a private conversation over a public fight'],
  learn: [
    {
      kind: 'story',
      title: 'The team meeting',
      beats: [
        { speaker: 'narrator', text: 'Thursday team meeting. Nadia stands up. "For drivers with very old phones, we could fall back to a text message. They just text the delivery code."' },
        { speaker: 'narrator', text: 'Mr Tamba: "Brilliant. Nadia, take that on." Clinton explained exactly this to Nadia at lunch on Tuesday.' },
        { speaker: 'clinton', text: '(to himself) Do I stand up right now and say it was mine?' },
        { speaker: 'tey', text: 'Feeling angry is normal. A public fight usually makes both people look bad. Getting the facts straight, privately and calmly, usually works better.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Talk to Nadia privately, then make sure his written update shows his work.',
            outcome: 'Nadia goes red: "I thought it was a group idea, sorry." She tells Mr Tamba they\'ll build it together. Clinton\'s Friday update already describes the old-phone risk he flagged in week two.',
            best: true,
          },
          {
            text: 'Stand up in the meeting: "That was MY idea!"',
            outcome: 'The room goes silent. Mr Tamba remembers the scene, not the idea.',
          },
          {
            text: 'Say nothing ever, and quietly resent her.',
            outcome: 'Nothing changes, and he stops sharing ideas with anyone. That hurts him more than her.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Stay calm. Talk privately first. Write your work down, so your updates show it.',
    },
  ],
  apply: {
    scenario: 'Clinton handles the credit problem.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is a public fight usually a bad idea?',
        options: [
          { text: 'It\'s illegal', why: 'Not illegal, just usually counterproductive.' },
          { text: 'People remember the scene, not the idea' },
          { text: 'Ideas don\'t matter', why: 'They matter. The scene overshadows them.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s approach in order.',
        lines: ['Stay calm in the meeting', 'Talk to Nadia privately', 'Agree how to share the work', 'Keep written updates that show his work'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s opening line to Nadia.',
        from: 'clinton',
        message: 'What do I say to Nadia after the meeting?',
        options: [
          { text: '"You stole my idea, thief."', why: 'Accusations start a fight. State the facts calmly.' },
          { text: 'Nothing, ever.', why: 'Silence breeds resentment.' },
          { text: '"Can I check something? The text fallback was the idea I shared on Tuesday. Could we tell Mr Tamba we\'ll build it together?"' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Calm and professional, or not?',
        groups: ['Professional', 'Not'],
        items: [
          { text: 'A private conversation', group: 0 },
          { text: 'Shouting in the meeting', group: 1 },
          { text: 'Ideas written in updates', group: 0 },
          { text: 'Complaining to the other interns', group: 1 },
          { text: 'Suggesting they build it together', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will make things worse.',
        lines: ['Can I check something about the fallback idea?', 'Everyone knows you copy people.', 'Could we build it together?'],
        bug: 1,
        explanation: 'A personal attack. Stick to the one fact.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Private talk and written updates', 'They build it together'],
          ['Public outburst', 'The scene is remembered, not the idea'],
          ['Silent resentment', 'He stops sharing ideas'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How can Clinton protect his ideas in future?',
        options: [
          { text: 'Mention them in his written Friday updates' },
          { text: 'Never share ideas', why: 'Sharing is good. Write them down too.' },
          { text: 'Make everyone sign a form', why: 'Too much. Updates are enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'Stay [[1]]. Talk [[2]] first.',
        blanks: [['calm'], ['privately']],
        distractors: ['loud', 'publicly', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'On which day did Clinton explain the idea at lunch? (one word)',
        answers: ['tuesday'],
        placeholder: 'A day',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps his reputation, or hurts it?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'Handling it calmly', group: 0 },
          { text: 'A scene in the meeting', group: 1 },
          { text: 'Written evidence of his work', group: 0 },
          { text: 'Gossip about Nadia', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Has someone ever taken credit for your work? How did you handle it, and what would you do now?',
    starters: ['Once...', 'Now I\'d...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Look at your last update or report. Does it show the ideas you contributed? If not, add one line next time.',
  },
  notes: 'Nadia is a named extra; she isn\'t a villain (she thought it was a group idea). Where you live: how directly people address credit issues varies; a private, calm, fact-based approach travels well.',
};

export default lesson;
