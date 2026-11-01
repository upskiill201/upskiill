import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10. Unit Challenge: the dress rehearsal. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the dress rehearsal',
  summary: 'One week to go. Lucía rehearses on the real stage, with a microphone and 20 empty chairs filled by her team. Everything from Chapter 4.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Deliver a full talk with calm presence', 'Use everything from Chapter 4 together'],
  learn: [
    {
      kind: 'reading',
      title: 'The dress rehearsal',
      html: '<p>Backstage, Lucía\'s heart is racing. She says, quietly, "I am excited", then her first line in her head.</p><p>On stage: "In March, a shop owner in Guadalajara told Sofía what to make." Pause.</p><p>She speaks at about 150 words a minute. She glances at the chart, points to the orange gap, and turns back to Marta on the left. She walks on each signpost and stands still on the message.</p><p>Diego records it from the back row. 14 minutes 50 seconds. Three ums. Eyes on the screen for about ten seconds in total, down from most of the talk.</p>',
    },
    {
      kind: 'story',
      title: 'After the rehearsal',
      beats: [
        { speaker: 'diego', text: 'That\'s a different speaker from two weeks ago. I mean it.' },
        { speaker: 'carmen', text: 'One more thing: ten minutes of questions after. Finance will ask why Monterrey and not Puebla. Be ready.' },
        { speaker: 'tey', text: 'That\'s Chapter 4: self-check, pace and pauses, nerves, eyes on people, presence myths. Next: questions and the big day.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 4 challenge: the dress rehearsal.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Lucía say backstage?',
        options: [
          { text: '"I am excited"' },
          { text: '"Calm down"', why: 'She reframed.' },
          { text: 'Nothing', why: '"I am excited".' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 4 skill is this?',
        groups: ['Voice', 'Presence'],
        items: [
          { text: 'About 150 words a minute', group: 0 },
          { text: 'Turning back to Marta', group: 1 },
          { text: 'A pause after the first line', group: 0 },
          { text: 'Standing still on the message', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many ums in the dress rehearsal?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the check.',
        pairs: [
          ['"I am excited" backstage', 'Reframe nerves'],
          ['Point, then turn back', 'Eyes on people'],
          ['Walking on signposts', 'Natural movement'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Questions from finance? I can rehearse a talk. I can\'t rehearse questions.',
        prompt: "Carmen\'s best reply?",
        options: [
          { text: 'Then skip the questions.', why: 'You can prepare for them.' },
          { text: 'You can, mostly. List the ten questions you dread, and practise a short answer to each. Most real ones will be on the list.' },
          { text: 'Make it up on the day.', why: 'Prepare the likely ones.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 4 in one line.',
        template: 'Slow [[1]], pause, eyes on [[2]].',
        blanks: [['down'], ['people']],
        distractors: ['up', 'slides'],
      },
      {
        kind: 'findBug',
        prompt: 'Which moment from the first run-through would fail talk card v4?',
        lines: [
          'A pause after the message.',
          'Pointing to the orange gap.',
          'Reading the chart to the screen at 190 words a minute.',
          'Standing still on the close.',
        ],
        bug: 2,
        fix: 'Glance, turn back, about 150 words a minute.',
        explanation: 'It fails checks 17 and 19.',
      },
      {
        kind: 'mcq',
        prompt: 'Which city will finance ask about?',
        options: [
          { text: 'Guadalajara', why: 'Puebla.' },
          { text: 'Toluca', why: 'Puebla.' },
          { text: 'Puebla' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes of questions are there after the talk?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s dress rehearsal.',
        lines: ['"I am excited" backstage', 'First line, then pause', 'Point and turn back', 'Walk on signposts', 'Close and stand still'],
      },
    ],
  },
  reflect: {
    prompt: 'Rehearse a short talk in the real room if you can, or one like it. What surprised you?',
    starters: ['The room...', 'I noticed...'],
  },
  deepen: {
    title: 'Rehearse where you\'ll perform',
    summary: 'Rehearsing in the real space, or something like it, removes surprises: where to stand, how the microphone feels, where the screen is. Fewer surprises means less to be nervous about.',
  },
  notes: 'Chapter 4 challenge (fictional): 14:50, three ums, ~150 wpm. Hook: 10-minute Q&A, finance will ask "why Monterrey and not Puebla?".',
};

export default lesson;
