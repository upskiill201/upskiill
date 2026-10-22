import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Explain cards: the offer, or the no. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The offer, or the no',
  summary: 'Either way, the next message from Synergix needs a good reply. Ada gives Remi two short plans: what to check and say if it\'s a yes, and what to do if it\'s a no.',
  minutes: 12,
  outcomes: [
    'Check an offer before accepting',
    'Ask for time and terms in writing',
    'Respond to a rejection well',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>If it\'s a yes:</strong></p><table><tr><th>Check</th><th>Ask if it\'s not clear</th></tr><tr><td>Role and team</td><td>"Which team will I sit in, and who will I report to?"</td></tr><tr><td>Pay and how often</td><td>"Is the stipend monthly, and are there any costs covered, like transport?"</td></tr><tr><td>Dates and hours</td><td>"When would I start, and what are the working hours?"</td></tr><tr><td>Anything else</td><td>Equipment, remote days, what happens at the end</td></tr><tr><td>Time to decide</td><td>"Could I have until Friday to confirm?" A few days is normal.</td></tr></table><p>Ask for the offer in writing before you accept. Then accept clearly and warmly.</p><p><strong>If it\'s a no:</strong> thank them, ask for one thing to improve (Chapter 1), say you\'d like to be considered in future, and write down what you learned. Then the next application.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Yes: check role, pay, dates and extras, ask for it in writing, then accept warmly. No: thank, ask for one improvement, keep the door open.',
    },
  ],
  apply: {
    scenario: 'The next message.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the thing to check with the question.',
        pairs: [
          ['Role and team', '"Who will I report to?"'],
          ['Pay', '"Is the stipend monthly?"'],
          ['Dates', '"When would I start?"'],
          ['Time to decide', '"Could I have until Friday?"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Before accepting, what should Remi get?',
        options: [
          { text: 'The offer in writing' },
          { text: 'A verbal promise only', why: 'Writing protects both sides.' },
          { text: 'Nothing; accept on the phone', why: 'Get it in writing.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Do if it\'s a yes, or if it\'s a no?',
        groups: ['Yes', 'No'],
        items: [
          { text: 'Check pay and dates', group: 0 },
          { text: 'Ask for one improvement', group: 1 },
          { text: 'Ask for the offer in writing', group: 0 },
          { text: 'Ask to be considered in future', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Won\'t asking for a few days to decide make them think I\'m not keen?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Yes, accept instantly.', why: 'A short pause to check is normal.' },
          { text: 'Say you\'re delighted and ask for a couple of days to read the details. That\'s normal and professional.' },
          { text: 'Ask for a month.', why: 'A few days is reasonable.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Accepting.',
        template: 'Ask for it in [[1]], then accept [[2]] and warmly.',
        blanks: [['writing'], ['clearly']],
        distractors: ['secret', 'slowly'],
      },
      {
        kind: 'mcq',
        prompt: 'Which is a good reply to a rejection?',
        options: [
          { text: 'Ask them to reconsider', why: 'Accept it gracefully.' },
          { text: 'Ignore it', why: 'A short reply keeps the door open.' },
          { text: 'Thank them, ask for one improvement, ask to be considered in future' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'By which day does Remi ask to confirm the offer?',
        answers: ['Friday', 'friday'],
        placeholder: 'A day',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s offer reply is a mistake?',
        lines: [
          'Thank you so much, I\'m delighted.',
          'Could you send the offer details in writing?',
          'I accept whatever the terms are, no need to send them.',
          'I\'ll confirm by Friday.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'He should read the terms before accepting.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth asking about in an offer, or not?',
        groups: ['Worth asking', 'Not needed'],
        items: [
          { text: 'Start date', group: 0 },
          { text: 'Who he reports to', group: 0 },
          { text: 'The CEO\'s salary', group: 1 },
          { text: 'Transport costs covered', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps after an offer.',
        lines: ['Thank them warmly', 'Ask for it in writing', 'Check the details', 'Ask any questions', 'Accept clearly'],
      },
    ],
  },
  reflect: {
    prompt: 'Write the questions you\'d want answered before accepting your next offer.',
    starters: ['I\'d want to know...'],
  },
  deepen: {
    title: 'Negotiating an offer',
    summary: 'Even internships sometimes have room to discuss start dates, hours or costs covered. Negotiation Skills for Beginners shows how to ask without risking the offer.',
  },
  notes: 'Offer-checking practice is common careers guidance.',
};

export default lesson;
