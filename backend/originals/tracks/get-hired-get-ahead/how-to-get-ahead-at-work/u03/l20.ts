import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 20 — Chapter Challenge: 1 March, the second conversation. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: 1 March',
  summary: '1 March. The promotion meeting was yesterday. Ngozi closes the door, smiles, and slides a letter across the table: "Developer, effective 1 April." Everything from this chapter.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use the whole promotion toolkit together', 'Handle the yes well: pay, timing, thanks', 'Finish your promotion case'],
  learn: [
    {
      kind: 'story',
      title: '1 March',
      beats: [
        { speaker: 'narrator', text: '1 March, 10am. Ngozi closes the door.' },
        { speaker: 'ngozi', text: 'Your case went in exactly as you wrote it. Paul spoke for you too. Developer, effective 1 April. Congratulations.' },
        { speaker: 'clinton', text: 'Thank you. Really. Could I ask what my pay will be at the new level, and when it changes?' },
        { speaker: 'ngozi', text: 'Good question. It\'s in the letter: the Developer band, from April. And next, I want you to lead the sync-service split.' },
        { speaker: 'tey', text: 'From "not yet" to yes in three months. Let\'s put the chapter together.' },
      ],
    },
    {
      kind: 'steps',
      title: 'Your career-growth kit so far',
      steps: [
        { title: 'Piece 1', body: 'A first-90-days kit.' },
        { title: 'Piece 2', body: 'An impact record.' },
        { title: 'Piece 3 (this chapter)', body: 'A promotion case.' },
        { title: 'Next chapter: Your plan', body: 'Month nine. Paul asks, "Where do you want to be in three years?" Clinton has no idea.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: 1 March.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What turned "not yet" into yes?',
        options: [
          { text: 'Clear criteria, a dated gap plan, evidence, and sponsors who\'d seen his work' },
          { text: 'Waiting three months', why: 'He closed the gaps with evidence.' },
          { text: 'Threatening to leave', why: 'He never did.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s path in order.',
        lines: ['Heard "not yet"', 'Asked what she\'d need to see', 'Agreed two gaps and a date', 'Closed both gaps with evidence', 'Wrote a one-page case'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of Clinton\'s approach, or not?',
        groups: ['Part of it', 'Not part of it'],
        items: [
          { text: 'Reading the ladder line by line', group: 0 },
          { text: 'An empty threat to leave', group: 1 },
          { text: 'Congratulating Amadou', group: 0 },
          { text: 'Hinting about his title', group: 1 },
          { text: 'Asking Paul for a hard review', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply to the yes.',
        from: 'ngozi',
        message: 'Developer, effective 1 April. Congratulations.',
        options: [
          { text: '"Thank you, really. Could I ask what my pay will be at the new level, and when it changes?"' },
          { text: '"Finally."', why: 'Thank her, then ask about pay calmly.' },
          { text: '"So when\'s the next promotion?"', why: 'Thank her and ask about this one first.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak promotion ask.',
        lines: ['I\'d like to work towards Developer.', 'I\'ve been here six months, so I deserve it.', 'What would you need to see?'],
        bug: 1,
        explanation: 'Time and effort aren\'t evidence.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the skill.',
        pairs: [
          ['"Not yet" in month six', 'Ask what they\'d need to see'],
          ['The recruiter\'s message', 'Compare the whole job, no empty threats'],
          ['Amadou\'s promotion', 'Congratulate and learn'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Who spoke for Clinton in the promotion meeting?',
        options: [
          { text: 'Ngozi, and Paul too' },
          { text: 'Nobody', why: 'Ngozi and Paul did.' },
          { text: 'Miracle', why: 'She\'s outside the company.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: '"Not yet" can start a promotion', group: 0 },
          { text: 'Promotions come with time', group: 1 },
          { text: 'Asking about criteria is welcome', group: 0 },
          { text: 'Promotion always means an instant raise', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the chapter rules.',
        template: 'Find the [[1]]. Close the [[2]]. Make your manager\'s [[3]] easy.',
        blanks: [['criteria'], ['gaps'], ['case']],
        distractors: ['gossip', 'door', 'lunch'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which month does the promotion take effect? (one word)',
        answers: ['april'],
        placeholder: 'A month',
      },
      {
        kind: 'mcq',
        prompt: 'What does Ngozi want Clinton to lead next?',
        options: [
          { text: 'The sync-service split' },
          { text: 'The app redesign', why: 'The sync-service split.' },
          { text: 'Finance', why: 'The sync-service split.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Developer! What would you tell yourself in month six, right after "not yet"?',
        options: [
          { text: '"Ask what it takes, get a date, close two gaps, and let the evidence do the talking."' },
          { text: '"Threaten to leave."', why: 'He didn\'t, and didn\'t need to.' },
          { text: '"Just wait."', why: 'He acted on a plan.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look at your promotion case. What would your "1 March" look like: when, and with what evidence?',
    starters: ['My date:', 'My evidence:'],
  },
  deepen: {
    title: 'Your kit, piece 3',
    summary: 'Finish your promotion case. Set a date for the conversation in your calendar.',
  },
  notes: 'Chapter Challenge. Ngozi (CastId ngozi) speaks. Outline: "comes back three months later" (month six to 1 March).',
};

export default lesson;
