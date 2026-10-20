import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10. Unit Challenge: the meeting that boils over. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the meeting that boils over',
  summary: 'Monday\'s launch check-in. Arjun is on video from Bengaluru, Femi is exhausted, and the API has changed again. Within four minutes, two people are shouting. Priya is stuck in traffic. Grace steps in. Everything from Chapter 2.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['De-escalate a heated group meeting', 'Use everything from Chapter 2 together'],
  learn: [
    {
      kind: 'reading',
      title: 'Four minutes in',
      html: '<p><strong>Arjun</strong> (on video): <em>"The API changed again. Third time. My team worked all weekend for nothing!"</em></p><p><strong>Femi</strong>: <em>"It changed because the research changed step 3! Again!"</em></p><p>Both are talking over each other. Two junior colleagues stare at their laptops. Priya is stuck in traffic.</p><p>Grace takes a breath, lowers her voice and slows down: <em>"OK. I can hear you\'re both really frustrated, and you\'ve both got a point. Let\'s take it one at a time. Arjun first: what changed, and what did it cost your team? Then Femi."</em></p><p>Ten minutes later they have a list. The meeting ends with an agreement: API changes go through one weekly review, and the research findings for step 3 are frozen until launch. Afterwards, Grace messages both of them privately: <em>"That got intense. You OK?"</em></p>',
    },
    {
      kind: 'story',
      title: 'Afterwards',
      beats: [
        { speaker: 'priya', text: '(arriving) I hear you ran the meeting. Femi says you were "terrifyingly calm".' },
        { speaker: 'grace', text: 'Night shift voice. Works on everyone.' },
        { speaker: 'tey', text: 'That\'s Chapter 2: lower and slower, acknowledge, name it, pause, soft starts, calm groups. Next: misunderstandings.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 2 challenge: the meeting that boils over.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Grace do first?',
        options: [
          { text: 'Took a breath, lowered and slowed her voice' },
          { text: 'Told them to calm down', why: 'The never-line.' },
          { text: 'Picked a side', why: 'She acknowledged both.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Grace\'s move to the chapter lesson.',
        pairs: [
          ['Lower, slower voice', 'The raised voice'],
          ['"You\'re both frustrated"', 'Acknowledge first'],
          ['"One at a time"', 'Calming a group'],
          ['"That got intense. You OK?"', 'Private check-in'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of the agreement, or not?',
        groups: ['In the agreement', 'Not in it'],
        items: [
          { text: 'One weekly review for API changes', group: 0 },
          { text: 'Step 3 research frozen until launch', group: 0 },
          { text: 'Arjun\'s team works weekends', group: 1 },
          { text: 'No more research ever', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes into the meeting did it boil over?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: '(privately, after) Sorry for shouting. The weekend was brutal.',
        prompt: "Grace's best reply?",
        options: [
          { text: '"Thanks for saying that. It sounds like a horrible weekend. The weekly review should stop it happening again."' },
          { text: '"You were out of line."', why: 'He\'s already apologised.' },
          { text: '"Don\'t do it again."', why: 'Acknowledge and look forward.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s opener.',
        template: '"I can hear you\'re both really [[1]], and you\'ve both got a [[2]]."',
        blanks: [['frustrated'], ['point']],
        distractors: ['wrong', 'problem'],
      },
      {
        kind: 'mcq',
        prompt: 'Why say "you\'ve both got a point"?',
        options: [
          { text: 'Each feels heard, so neither needs to shout louder' },
          { text: 'To avoid deciding anything', why: 'They still agreed changes.' },
          { text: 'It isn\'t true', why: 'Both did have a point.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line would have made the meeting worse?',
        lines: [
          'Let\'s take it one at a time.',
          'Arjun first, then Femi.',
          'Honestly, you\'re both acting like children.',
          'Let\'s agree what changes from now.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Insulting both adds fuel.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which chapter skill is this?',
        groups: ['Calming', 'Moving forward'],
        items: [
          { text: 'Lower, slower voice', group: 0 },
          { text: 'A weekly API review', group: 1 },
          { text: 'Acknowledging both', group: 0 },
          { text: 'Freezing step 3 research', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order what Grace did.',
        lines: ['Breathe', 'Lower and slow her voice', 'Acknowledge both', 'One at a time', 'Agree changes', 'Check in privately'],
      },
    ],
  },
  reflect: {
    prompt: 'Imagine a meeting you\'re in boils over. Write the first two sentences you\'d say.',
    starters: ['First:...', 'Then:...'],
  },
  deepen: {
    title: 'Calm is leadership',
    summary: 'Grace isn\'t the manager, and she still led the room. In a heated moment, whoever stays calm and structures the conversation often becomes the leader.',
  },
  notes: 'Chapter 2 challenge (fictional): launch check-in boils over at 4 minutes; agreement: weekly API change review, step 3 research frozen until launch; private check-ins.',
};

export default lesson;
