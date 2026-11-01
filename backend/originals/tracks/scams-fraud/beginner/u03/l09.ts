import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: the scam file v3. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The scam file v3',
  summary: 'Three impersonation cases in a week: the fraud team call, the code text and the agency invoice. Grace\'s file now has a new section: "who they pretend to be". Tap through version 3.',
  minutes: 11,
  outcomes: [
    'Compare impersonation cases',
    'See the "own channel" rule working each time',
    'Add impersonation cases to your own file',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Grace\'s scam file v3',
      text: 'CASE 5: "Fraud team". Channel: call, spoofed bank number. Ask: read out a code. Stopped by: the code text said "never share", hung up, called card number. Lost: £0. CASE 6: Unasked code, "add card to new device". Stopped by: called card number; card cancelled in two minutes. Lost: £0. CASE 7: Agency invoice, new bank details, £14,800. Stopped by: phoned the agency on the contract number; their email had been hacked. Lost: £0. Kinwell now: phone check for any bank change, two approvers over £5,000. MASKS SO FAR: son, mentor, lover, friends, bank, supplier. RULE THAT WON EVERY TIME: use my own channel, never theirs.',
      hotspots: [
        { phrase: 'spoofed bank number', note: 'The caller ID looked real. It proved nothing.' },
        { phrase: 'the code text said "never share"', note: 'The bank\'s own words gave the game away.' },
        { phrase: 'card cancelled in two minutes', note: 'Speed. Someone had her card details from a leak somewhere.' },
        { phrase: 'their email had been hacked', note: 'The fraud email came from the agency\'s real address. Only a phone call could catch it.' },
        { phrase: 'two approvers over £5,000', note: 'Grace\'s first change to how Kinwell works.' },
        { phrase: 'MASKS SO FAR', note: 'Six different faces, one recipe.' },
        { phrase: 'use my own channel, never theirs', note: 'It stopped cases 1, 5, 6 and 7.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Every impersonation case was stopped the same way: contact them through your own channel. Write that rule at the top of your file.',
    },
  ],
  apply: {
    scenario: 'Reading file v3.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each case to what stopped it.',
        pairs: [
          ['Case 5: fraud team', 'Hung up, called card number'],
          ['Case 6: unasked code', 'Called card number; card cancelled'],
          ['Case 7: agency invoice', 'Phoned the contract number'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did all three cases have in common?',
        options: [
          { text: 'Stopped by using her own channel' },
          { text: 'They all came by email', why: 'Call, text and email.' },
          { text: 'She lost money in each', why: '£0 lost each time.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which channel did each case use?',
        groups: ['Call or text', 'Email'],
        items: [
          { text: 'Fraud team', group: 0 },
          { text: 'Agency invoice', group: 1 },
          { text: 'Unasked code', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'Your rules saved Kinwell £14,800. Want to run a session for the team?',
        prompt: 'Grace\'s answer?',
        options: [
          { text: 'No, it was luck.', why: 'It was a rule.' },
          { text: 'Only if it\'s mandatory.', why: 'She\'s keen to share.' },
          { text: 'Give me a few more cases first. Then yes.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule that won every time.',
        template: 'Use my [[1]] channel, never [[2]].',
        blanks: [['own'], ['theirs']],
        distractors: ['fastest', 'mine'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kinwell now needs two approvers for payments over how many pounds?',
        answers: ['5000', '5,000', '£5,000', '£5000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of v3 is wrong?',
        lines: [
          'Case 5: lost £0.',
          'Case 7: email came from the agency\'s real address.',
          'Case 7: stopped by replying to the email.',
        ],
        bug: 2,
        fix: 'Stopped by phoning the contract number.',
        explanation: 'Replying would have reached the criminal.',
      },
      {
        kind: 'mcq',
        prompt: 'How many masks are listed so far?',
        options: [
          { text: 'Two', why: 'Son, mentor, lover, friends, bank, supplier.' },
          { text: 'Six' },
          { text: 'Ten', why: 'Six.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the cases in the file.',
        lines: ['Case 5: fraud team', 'Case 6: unasked code', 'Case 7: agency invoice'],
      },
      {
        kind: 'mcq',
        prompt: 'Why could only a phone call catch case 7?',
        options: [
          { text: 'The email came from the agency\'s hacked account' },
          { text: 'Phones are magic', why: 'Phoning used a channel the criminal didn\'t control.' },
          { text: 'It couldn\'t', why: 'The phone call caught it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Add an impersonation case you\'ve seen to your own file. What was the mask, and what would have stopped it?',
    starters: ['Mask:... Channel:... Stopped by:...'],
  },
  deepen: {
    title: 'Data leaks',
    summary: 'Many scams start with details stolen in data breaches: names, emails, phone numbers, partial card numbers. Some free services let you check whether your email has appeared in known breaches.',
  },
  notes: 'Scam file v3 (fictional). Priya per CAST.',
};

export default lesson;
