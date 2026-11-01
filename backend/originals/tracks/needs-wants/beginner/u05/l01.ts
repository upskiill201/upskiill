import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story with a choice: Mum's freezer. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The freezer',
  summary: 'Mum\'s shop freezer has died. A new one is ₦200,000. Ada\'s Mexico fund is ₦55,000 short already. Family is her top value; Mexico is the trip of her life. What does she do?',
  minutes: 12,
  outcomes: [
    'Handle a family request when two values clash',
    'Look for options beyond "all" or "nothing"',
    'Share a family need fairly',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Midnight',
      beats: [
        { speaker: 'narrator', text: 'Ada lies awake. Her mum\'s provisions shop runs on that freezer: fish, drinks, ice. Without it, she loses customers every day.' },
        { speaker: 'ada', text: 'If I give her ₦200,000 from the fund, there\'s no Mexico. If I don\'t, what kind of daughter am I?' },
        { speaker: 'narrator', text: 'She voice-notes Lucía, then deletes it. She voice-notes Ngozi in the next room instead. Ngozi walks in.' },
        { speaker: 'narrator', text: '"You have a brother and a sister who also have jobs. Have you called them? And didn\'t that café in Yaba ask you to design their logo?"' },
        { speaker: 'tey', text: 'When two top values clash, the answer is rarely all-or-nothing. What should Ada do?' },
      ],
      choice: {
        prompt: 'What should Ada do?',
        options: [
          { text: 'Give Mum the whole ₦200,000 from the Mexico fund tonight.', outcome: 'Loving and fast. Mexico is gone, her siblings never got the chance to help, and Mum feels terrible that she cost Ada the trip. Everyone loses something.' },
          { text: 'Tell Mum she can\'t help right now.', outcome: 'Mexico survives. But family is her top value, and Mum is in real trouble. She\'d carry that.' },
          { text: 'Call her brother and sister to share the cost, offer her own share, and take the café logo job to fund it.', outcome: 'Yes. Obinna gives ₦70,000, Chidinma ₦60,000, Ada ₦70,000. The café pays ₦125,000 for the logo, covering her share and the Mexico gap. The freezer arrives on Friday.', best: true },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'When two values clash, look for the third option: share the cost, earn a little more, or do it in stages. All-or-nothing is rarely the only way.',
    },
  ],
  apply: {
    scenario: 'Mum\'s freezer.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Obinna ₦70,000 + Chidinma ₦60,000 + Ada ₦70,000. Total for the freezer?',
        answers: ['200000', '200,000', '₦200,000', '₦200000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The café pays ₦125,000. Ada gives ₦70,000 to the freezer. How much is left for Mexico?',
        answers: ['55000', '55,000', '₦55,000', '₦55000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why was "all from the Mexico fund" not the best answer?',
        options: [
          { text: 'It cost Ada the trip, and her siblings never got the chance to help' },
          { text: 'Family doesn\'t matter', why: 'Family is her top value.' },
          { text: 'Freezers are a want', why: 'For Mum\'s shop, it\'s a must-have.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'All-or-nothing, or a third option?',
        groups: ['All-or-nothing', 'Third option'],
        items: [
          { text: 'Give everything from the fund', group: 0 },
          { text: 'Share the cost with siblings', group: 1 },
          { text: 'Refuse to help', group: 0 },
          { text: 'Earn extra with a freelance job', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Obinna, Mum\'s freezer died. It\'s ₦200,000. I can do ₦70,000. Can you and Chidinma cover the rest between you?',
        prompt: 'Why is this a strong message?',
        options: [
          { text: 'It\'s demanding', why: 'It\'s clear and fair.' },
          { text: 'Clear about the need, clear about her share, and gives them a specific ask' },
          { text: 'It\'s too long', why: 'It\'s short and specific.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'When values clash.',
        template: 'Look for the [[1]] option: share the cost, earn a little [[2]], or do it in stages.',
        blanks: [['third'], ['more']],
        distractors: ['first', 'less'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to their part.',
        pairs: [
          ['Obinna', '₦70,000'],
          ['Chidinma', '₦60,000'],
          ['Ada', '₦70,000, from the café job'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought kept Ada stuck at midnight?',
        lines: [
          'Family is my top value.',
          'Mexico matters to me too.',
          'It has to be all the money, or nothing.',
        ],
        bug: 2,
        fix: 'There may be a way to honour both.',
        explanation: 'All-or-nothing hid the third option.',
      },
      {
        kind: 'mcq',
        prompt: 'Is the freezer a need or a want for Mum?',
        options: [
          { text: 'A want', why: 'Without it she loses customers daily.' },
          { text: 'A need later', why: 'It\'s broken now, and costing her every day.' },
          { text: 'A must-have: her shop\'s income depends on it' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Ada solved it.',
        lines: ['Took a breath, didn\'t decide at midnight', 'Called her siblings', 'Offered her share', 'Took the café logo job', 'Freezer arrives Friday'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time two things you cared about competed for the same money. Was there a third option?',
    starters: ['I had to choose between...', 'A third option might have been...'],
  },
  deepen: {
    title: 'Family requests across cultures',
    summary: 'In many families, the person with a steady job is expected to help when things go wrong. That\'s love and duty, and it can also be heavy. Sharing among siblings, a planned family line, and honest conversations make it sustainable.',
  },
  notes: 'Ch5 running numbers: freezer 200,000 = Obinna 70,000 + Chidinma 60,000 + Ada 70,000 (Ada\'s siblings, narrated, new). Café logo ₦125,000 (Yaba café, narrated): 70,000 to freezer + 55,000 closes the Mexico gap → fund 900,000.',
};

export default lesson;
