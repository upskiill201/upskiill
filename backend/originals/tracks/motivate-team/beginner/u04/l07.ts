import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Side by side: Friday stand-up recognition, generic vs individual. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Seen, one by one',
  summary: 'Week 7, Friday. Miracle has the same 60 seconds of stand-up she had in Week 6. Last time she said "Great job, everyone." This time she tries something else. Same minute. Very different room.',
  minutes: 11,
  outcomes: [
    'Recognise a whole team without making it generic',
    'Fit specific recognition into a short slot',
    'Make sure nobody goes unseen',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Friday\'s 60 seconds',
      before: { label: 'Week 6', text: '"Great job, everyone! What a week. Keep it up!" (Bisi looks at the floor. Emmanuel checks his phone.)' },
      after: { label: 'Week 7', text: '"Bisi: 15 clinics, and you taught Halima the Ogun trick. Halima: three Kano nurses trained in Hausa. Chidi: northern clinics stayed online through two power cuts. Emmanuel: your first Saturday, and Dr Bello sent a thank-you. Now, shout-outs?"' },
      notes: [
        'Same 60 seconds. Every person named, for something real.',
        'Effort and growth count: Emmanuel\'s first Saturday.',
        'It ends by handing recognition to the team.',
      ],
    },
    {
      kind: 'text',
      html: "<p>Team praise isn't wrong. It just isn't enough on its own, because nobody feels personally seen. One specific line per person takes about ten seconds each. The trick is preparation: Miracle spends five minutes on Friday morning checking her notes and the board, so she has one true, specific thing for everyone, including the person who had a quieter week.</p>",
    },
    {
      kind: 'check',
      question: 'What makes the Week 7 version work?',
      options: ['One specific, true line for every person', 'More exclamation marks', 'A longer speech'],
      answer: 0,
      explanation: 'Ten seconds each, prepared in five minutes.',
    },
  ],
  apply: {
    scenario: 'Friday\'s 60 seconds.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Generic or individual?',
        groups: ['Generic', 'Individual'],
        items: [
          { text: '"Great job, everyone!"', group: 0 },
          { text: '"Halima: three Kano nurses trained."', group: 1 },
          { text: '"Keep it up!"', group: 0 },
          { text: '"Emmanuel: your first Saturday."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why mention Emmanuel\'s first Saturday?',
        options: [
          { text: 'To be nice to the weakest', why: 'It\'s real effort, not pity.' },
          { text: 'Effort and growth deserve recognition, not just the biggest numbers' },
          { text: 'He asked for it', why: 'He didn\'t.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Dr Bello sent a thank-you? To me?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'To you, by name. I\'ll forward it. She said nobody had ever fixed it that fast.' },
          { text: 'Yes, don\'t get used to it.', why: 'A joke that takes the moment away.' },
          { text: 'To the team, really.', why: 'It was to him. Let him have it.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'One specific line per person takes about ten ___ each. (one word)',
        answers: ['seconds', 'Seconds'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to their Week 7 line.',
        pairs: [
          ['Bisi', '15 clinics, and taught the Ogun trick'],
          ['Chidi', 'Online through two power cuts'],
          ['Emmanuel', 'First Saturday, and a thank-you'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the secret to fitting it into 60 seconds?',
        options: [
          { text: 'Talking very fast', why: 'Preparation, not speed.' },
          { text: 'Five minutes of preparation, checking notes and the board' },
          { text: 'Skipping people', why: 'Everyone gets a line.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s draft for next Friday. Which line breaks the lesson?',
        lines: [
          'Bisi: Ogun clinics live, both of them.',
          'And everyone else: great work as usual!',
          'Chidi: all 40 northern clinics stayed online.',
        ],
        bug: 1,
        fix: 'Halima: first group training. Emmanuel: three clinics, zero call-backs.',
        explanation: '"Everyone else" means some people go unseen again.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Friday recognition in order.',
        lines: ['Five minutes checking notes', 'One true line per person', 'Include effort and growth', 'Hand over to shout-outs'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Team praise is fine. Just never [[1]] individual [[2]].',
        blanks: [['instead of', 'without'], ['recognition', 'thanks']],
        distractors: ['with', 'blame'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s handover line.',
        tiles: ['Now,', 'shout-outs?'],
        distractors: ['questions?'],
      },
    ],
  },
  reflect: {
    prompt: 'If you had 60 seconds to recognise everyone in a group you\'re part of, what one true line would you say about each person?',
    starters: ['For ..., I\'d say...', 'For ..., I\'d say...'],
  },
  deepen: {
    title: 'Five minutes on Friday',
    summary: 'Before your next team meeting, spend five minutes finding one specific, true thing for every person. Say them all, in under a minute.',
  },
  notes: 'Individualised, specific recognition (Gallup Q12 item 4; Gallup & Workhuman 2023); recognising effort and progress (Amabile & Kramer 2011). Fictional details.',
};

export default lesson;
