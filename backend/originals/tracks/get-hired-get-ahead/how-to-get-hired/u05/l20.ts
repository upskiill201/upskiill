import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 20 — Chapter Challenge and course finale: graduation day, "You're hired." */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: you\'re hired',
  summary: 'Graduation day in Buea. A gown, a hat, his mum crying in the third row. In his pocket, a signed contract from Njangi Pay. Then a message from Brenda. Everything from this chapter, and the end of How to Get Hired.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use the whole offer toolkit together', 'Negotiate honestly and accept well', 'Finish your job-search kit'],
  learn: [
    {
      kind: 'story',
      title: 'Graduation',
      beats: [
        { speaker: 'narrator', text: 'Graduation day, University of Buea. Clinton crosses the stage. His mum is crying in the third row. David is filming and shouting. Mrs Ewane gives one small nod.' },
        { speaker: 'narrator', text: 'In his pocket: a signed contract. Graduate Developer, offline team. 315,000 francs, a review after probation, starting in two weeks.' },
        { speaker: 'narrator', text: 'His phone buzzes. Brenda: "Congratulations, graduate. Ngozi says see you on the 2nd. You\'re hired."' },
        { speaker: 'miracle', text: '(on video, from Lagos) Eight months ago you said, "I don\'t have any experience." Look at you.' },
        { speaker: 'tey', text: 'Let\'s put the whole chapter together, one last time.' },
      ],
    },
    {
      kind: 'steps',
      title: 'Your job-search kit: complete',
      steps: [
        { title: 'Piece 1', body: 'A network map, message templates and a weekly tracker.' },
        { title: 'Piece 2', body: 'An internship plan.' },
        { title: 'Piece 3', body: 'A story bank.' },
        { title: 'Piece 4', body: 'A resilience plan.' },
        { title: 'Piece 5 (this chapter)', body: 'An offer checklist.' },
        { title: 'Next course: How to Get Ahead at Work', body: 'Week one at Njangi Pay. Clinton meets Paul, a senior developer who explains nothing, and in week two he breaks something.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: you\'re hired.',
    items: [
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best reply on the offer call.',
        from: 'brenda',
        message: 'We\'d love to offer you the role at 300,000 francs a month. How does that sound?',
        options: [
          { text: '"Yes!" (without seeing anything)', why: 'Ask for it in writing first.' },
          { text: '"Thank you, I\'m really excited. Could you send it in writing, and I\'ll come back to you by Thursday?"' },
          { text: '"Too low."', why: 'Thank them and take time.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s ask in order.',
        lines: ['Start with enthusiasm', 'Give his reason', 'Ask for 330,000, or a review after probation', 'Stay silent', 'Listen to the answer'],
      },
      {
        kind: 'sortGroups',
        prompt: 'What Clinton did, or didn\'t do?',
        groups: ['Did', 'Didn\'t'],
        items: [
          { text: 'Researched a fair range', group: 0 },
          { text: 'Invented a 380k offer', group: 1 },
          { text: 'Compared the whole offers in a table', group: 0 },
          { text: 'Accepted on the phone without details', group: 1 },
          { text: 'Declined Kmer by phone, with thanks', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line missing from a good acceptance.',
        lines: ['I\'m delighted to accept.', 'Could you let me know the next steps?', '(the agreed review after probation isn\'t mentioned)'],
        bug: 2,
        explanation: 'Confirm every agreed term in writing.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the skill.',
        pairs: [
          ['The offer call', 'Thank, ask in writing, set a date'],
          ['David\'s "say 380"', 'Never invent an offer'],
          ['Brenda\'s 315k counter', 'Compare with the plan, accept with thanks'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Clinton accept 315,000 rather than push for 330,000?',
        options: [
          { text: 'He was scared', why: 'He used his plan.' },
          { text: 'He forgot his target', why: 'He compared with his plan.' },
          { text: 'It was inside his range, above his walk-away, and Brenda had already moved' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What makes Njangi Pay the right choice for Clinton?',
        options: [
          { text: 'His top priority is learning from a team, and it scored highest there' },
          { text: 'Only the bigger salary', why: 'Pay was one row.' },
          { text: 'It was his dream company, so nothing else mattered', why: 'He compared properly.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'You can negotiate more than salary', group: 0 },
          { text: 'Graduates can never negotiate', group: 1 },
          { text: 'Research makes your ask stronger', group: 0 },
          { text: 'A polite ask usually cancels the offer', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the course rules.',
        template: 'Ask for it in [[1]]. Research a fair [[2]]. Never [[3]] an offer.',
        blanks: [['writing'], ['range'], ['invent', 'inflate']],
        distractors: ['secret', 'wish', 'mention'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is Clinton\'s final monthly salary, in francs? (a number)',
        answers: ['315000', '315,000', '315 000'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s reply to Miracle.',
        from: 'miracle',
        message: 'Eight months ago you said you had no experience. What would you tell that Clinton now?',
        options: [
          { text: 'You were right, I got lucky.', why: 'It was work, not luck.' },
          { text: 'Nothing, it was easy.', why: 'It wasn\'t easy, and that\'s the point.' },
          { text: 'You had more than you thought. Write it down, prove it, talk to people, and keep going after the noes.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What should Clinton do with his job-search kit now?',
        options: [
          { text: 'Delete it, he\'s done forever', why: 'Careers have more than one job search.' },
          { text: 'Keep it: he\'ll update it for his next move, and help others with it' },
          { text: 'Sell it', why: 'Keep it and share what he learned.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Look at your five kit pieces. Which one are you proudest of? Which one will you use first?',
    starters: ['I\'m proudest of...', 'I\'ll use first...'],
  },
  deepen: {
    title: 'Your kit, complete',
    summary: 'Put all five pieces in one folder: network map, internship plan, story bank, resilience plan, offer checklist. Then go and use them.',
  },
  notes: 'Chapter Challenge and course finale of How to Get Hired. "You\'re hired" fulfils the track promise. Brenda (CastId brenda) and Miracle speak. Level 3 opens with Paul Tabi and a week-two bug (L3 Ch1 choice: hide it or tell Ngozi).',
};

export default lesson;
