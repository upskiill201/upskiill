import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 18 — the written acceptance email. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'The acceptance email',
  summary: 'Clinton said yes to Brenda on the phone. Now he writes it down, because a yes on the phone isn\'t the end. Six lines. Tap each one.',
  minutes: 11,
  outcomes: ['Accept an offer in writing', 'Confirm the agreed terms', 'Ask about next steps'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of Clinton\'s email',
      text: 'Subject: Acceptance, Graduate Developer, Offline Team\nHi Brenda,\nThank you again. I\'m delighted to accept the Graduate Developer role on the offline team.\nTo confirm what we agreed: 315,000 XAF per month, a salary review after probation, and a start date two weeks after graduation.\nCould you let me know the next steps, and whether there\'s anything I should prepare before day one?\nI can\'t wait to start. Clinton',
      hotspots: [
        { phrase: 'Subject: Acceptance, Graduate Developer, Offline Team', note: 'Clear and findable. HR and Brenda will both search for this.' },
        { phrase: 'I\'m delighted to accept', note: 'The yes, in writing. No room for confusion.' },
        { phrase: 'To confirm what we agreed:', note: 'The most important line. Anything agreed on the phone should be written down, so nobody remembers it differently.' },
        { phrase: 'a salary review after probation', note: 'The part he negotiated. If it\'s not in writing, it may be forgotten.' },
        { phrase: 'anything I should prepare before day one', note: 'Shows he\'s already thinking like a team member. A small, strong finish.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Accept in writing. Confirm every agreed term. Ask about next steps. Wait for the updated contract before you stop other things.',
    },
  ],
  apply: {
    scenario: 'Clinton writes his acceptance.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the acceptance in order.',
        lines: ['A clear subject', 'Thanks and the yes', 'Confirm what was agreed', 'Ask about next steps', 'A warm close'],
      },
      {
        kind: 'mcq',
        prompt: 'Why confirm the agreed terms in writing?',
        options: [
          { text: 'So nobody remembers the phone call differently' },
          { text: 'To show off', why: 'It\'s to avoid confusion.' },
          { text: 'It\'s not needed', why: 'Phone agreements are easy to forget.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Confirm in the email, or not needed?',
        groups: ['Confirm', 'Not needed'],
        items: [
          { text: 'Salary: 315,000', group: 0 },
          { text: 'Review after probation', group: 0 },
          { text: 'Start date', group: 0 },
          { text: 'What he had for breakfast', group: 1 },
          { text: 'How nervous he was on the call', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the missing piece.',
        lines: ['I\'m delighted to accept.', 'Salary: 315,000 and a start two weeks after graduation.', '(no mention of the review after probation)'],
        bug: 2,
        explanation: 'The part he negotiated must be written down too.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Brenda said yes on the phone. Do I still need to email?',
        options: [
          { text: 'Yes: I\'ll accept in writing and confirm every agreed term.' },
          { text: 'No, a call is enough.', why: 'Write it down.' },
          { text: 'Only if she asks.', why: 'Do it anyway.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it does.',
        pairs: [
          ['I\'m delighted to accept', 'The yes, in writing'],
          ['To confirm what we agreed', 'Avoids misunderstandings'],
          ['Anything to prepare?', 'Thinking like a team member'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'When should Clinton stop other applications?',
        options: [
          { text: 'When he has the updated offer or contract in writing' },
          { text: 'After the phone call', why: 'Wait for it in writing.' },
          { text: 'Never', why: 'Once it\'s written and signed, he can stop.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Accept in [[1]]. Confirm every agreed [[2]].',
        blanks: [['writing'], ['term']],
        distractors: ['secret', 'joke', 'guess'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lines is the email body, roughly? (a number)',
        answers: ['6', 'six', '5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good acceptance habit, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Confirming the review in writing', group: 0 },
          { text: 'Quitting everything after a call', group: 1 },
          { text: 'Asking about next steps', group: 0 },
          { text: 'Assuming HR knows what was said', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a verbal agreement you made that was later remembered differently. What would writing it down have changed?',
    starters: ['Once...', 'Writing it down would have...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Save an acceptance-email template: thanks and yes, confirm the terms, next steps, warm close.',
  },
  notes: 'Standard practice. Contracts and signing processes vary by country.',
};

export default lesson;
