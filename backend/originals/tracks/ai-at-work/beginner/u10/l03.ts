import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 3 — personal data and customer data. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Personal data and customer data',
  summary: 'Can the agency have the shop owners\' details? It depends on what the owners agreed to. Ada learns the basics of data protection that apply across most countries.',
  minutes: 13,
  outcomes: [
    'Know what counts as personal data',
    'Know the core principles of data protection',
    'Ask "did they agree to this use?" before sharing',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The basics, in plain words',
      html:
        '<p><strong>Personal data</strong> is anything that identifies a living person: a name with a phone number, an ID number, a photo, an address, even a combination of details.</p>' +
        '<p>Nigeria has the <strong>Nigeria Data Protection Act 2023</strong>; Ghana has the <strong>Data Protection Act 2012</strong>; Europe has the GDPR. The details differ, but core principles are similar:</p>' +
        '<ul>' +
        '<li><strong>Purpose:</strong> use data only for what people were told when it was collected.</li>' +
        '<li><strong>Minimum:</strong> use only the data you actually need.</li>' +
        '<li><strong>Consent or another legal basis:</strong> for new uses, like marketing, you often need agreement.</li>' +
        '<li><strong>Security:</strong> keep it safe, and share it only with people and services allowed to have it.</li>' +
        '</ul>' +
        '<p>The shop owners gave details to join a payments pilot, not a marketing campaign. So the honest question is: <em>did they agree to this?</em></p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Use personal data only for its original purpose, only what you need, kept safe. New use? Check they agreed, and ask your data protection contact.',
    },
  ],
  apply: {
    scenario: 'The agency wants the shop owners\' details.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Personal data, or not?',
        groups: ['Personal data', 'Not personal'],
        items: [
          { text: 'Ama Mensah, 024 555 0101', group: 0 },
          { text: 'Total payments in Makola last week', group: 1 },
          { text: 'A photo of a shop owner\'s face', group: 0 },
          { text: 'The pilot\'s average failure rate', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the principle to its meaning.',
        pairs: [
          ['Purpose', 'Only for what people were told'],
          ['Minimum', 'Only the data you need'],
          ['Consent', 'Agreement for new uses'],
          ['Security', 'Kept safe, shared carefully'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The shop owners joined a payments pilot. Can Ada give their details to a marketing agency?',
        options: [
          { text: 'Yes, they\'re our customers', why: 'Marketing is a new purpose.' },
          { text: 'Not without checking they agreed to this use, and asking the data protection contact' },
          { text: 'Yes, if the agency promises to be careful', why: 'The purpose question comes first.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did Nigeria pass its Data Protection Act?',
        answers: ['2023'],
        placeholder: 'A year',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The agency says everyone shares contact lists. Why the fuss?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'You\'re right, I\'ll send it.', why: 'New purpose needs agreement.' },
          { text: 'Marketing is illegal.', why: 'It needs a proper basis.' },
          { text: 'The shops gave us their details for payments, not marketing. Let\'s ask them first, maybe with a short opt-in message. It protects them and us.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Only for its original [[1]], only what you [[2]].',
        blanks: [['purpose'], ['need']],
        distractors: ['price', 'want'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Tolu\'s plan breaks the principles?',
        lines: [
          'Ask our data protection contact',
          'Send shops an opt-in message',
          'Share the full list now, ask permission later',
          'Share only owners who opt in',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Agreement comes before sharing, not after.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which AI request helps safely?',
        options: [
          { text: 'Here\'s the list. Is it OK to share?', why: 'Pastes the data.' },
          { text: 'Without any real data: draft a short, friendly opt-in text message asking pilot shop owners if they\'d like marketing updates from our partner.' },
          { text: 'Write a message saying they\'ve already agreed.', why: 'Dishonest.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s key question.',
        tiles: ['Did', 'they', 'agree', 'to', 'this', 'use?'],
        distractors: ['Who', 'cares?'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Follows the principles, or not?',
        groups: ['Follows', 'Breaks'],
        items: [
          { text: 'Sharing only opted-in owners', group: 0 },
          { text: 'Sharing ID numbers "just in case"', group: 1 },
          { text: 'Asking the data protection contact', group: 0 },
          { text: 'Emailing the list to a personal address', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s response to the agency.',
        lines: ['Check the original purpose', 'Ask the data protection contact', 'Send an opt-in message', 'Share only those who agree'],
      },
      {
        kind: 'mcq',
        prompt: 'Why share only the minimum data?',
        options: [
          { text: 'Less data shared means less harm if something leaks' },
          { text: 'It\'s faster to type', why: 'It reduces risk.' },
          { text: 'No reason', why: 'It\'s a core principle.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What personal data do you handle at work? What purpose was it collected for?',
    starters: ['I handle...', 'It was collected for...'],
  },
  deepen: { title: 'Try it today', summary: 'Find out who your company\'s data protection contact is, and save their name.' },
  notes: 'Nigeria Data Protection Act 2023; Ghana Data Protection Act 2012 (Act 843); EU GDPR (2016/679). General summary, not legal advice. Phone number uses a fictional 555 pattern.',
};

export default lesson;
