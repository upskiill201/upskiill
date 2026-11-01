import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Step-by-step: sinking funds. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Costs that come once a term',
  summary: 'Week 2. A lab manual nobody mentioned: GH₵60. And in six weeks, the bus home for mid-semester: GH₵150. These aren\'t surprises. They\'re predictable costs nobody planned for. Sinking funds fix that.',
  minutes: 12,
  outcomes: [
    'List the irregular costs you already know are coming',
    'Work out a monthly or weekly amount for each',
    'Keep sinking fund money separate from spending money',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Build a sinking fund',
      steps: [
        { title: '1. List what\'s coming', body: 'Look three to six months ahead. Kofi: bus home at mid-semester (GH₵150, in 6 weeks), exam printing and stationery (GH₵80, in 10 weeks), Mum\'s birthday (GH₵60, in 3 months).' },
        { title: '2. Put a price on each', body: 'Use what it cost last time, or ask someone who knows. Efua went home last semester: the bus was GH₵140 plus snacks.' },
        { title: '3. Divide by the time left', body: 'Bus home: GH₵150 ÷ 6 weeks = GH₵25 a week. Exams: GH₵80 ÷ 10 weeks = GH₵8 a week. Birthday: GH₵60 ÷ 3 months = GH₵20 a month.' },
        { title: '4. Put it in the budget as a line', body: 'Sinking funds are jobs, like savings. Kofi adds a "sinking funds" line to his sheet.' },
        { title: '5. Keep it apart', body: 'Keep sinking fund money away from weekly spending money, in a separate place or a clearly labelled pot, so it doesn\'t get "borrowed" on a Thursday.' },
        { title: '6. Spend it only on its job', body: 'When the bus day comes, the GH₵150 is there. No crisis, no borrowing, nothing taken from food.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A sinking fund turns a big predictable cost into small regular ones: cost ÷ time left = what to set aside each week or month.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s once-a-term costs.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Bus home costs GH₵150 in 6 weeks. How much a week?',
        answers: ['25', 'GH₵25', '25 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why isn\'t the bus home a "surprise"?',
        options: [
          { text: 'Because it\'s cheap', why: 'GH₵150 isn\'t cheap for Kofi. It\'s predictable.' },
          { text: 'Because he knows it\'s coming and roughly what it costs' },
          { text: 'Because Mum pays', why: 'Mum sends the allowance; the bus comes out of it.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the sinking fund steps.',
        lines: ['List what\'s coming', 'Put a price on each', 'Divide by the time left', 'Add it as a budget line', 'Keep it apart until it\'s needed'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Sinking fund (predictable) or surprise (unpredictable)?',
        groups: ['Sinking fund', 'Surprise'],
        items: [
          { text: 'Bus home at mid-semester', group: 0 },
          { text: 'Cracked phone screen', group: 1 },
          { text: 'Exam stationery', group: 0 },
          { text: 'A family member\'s birthday', group: 0 },
          { text: 'A sudden clinic visit', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each cost to its monthly amount.',
        pairs: [
          ['GH₵60 in 3 months', 'GH₵20 a month'],
          ['GH₵120 in 4 months', 'GH₵30 a month'],
          ['GH₵300 in 6 months', 'GH₵50 a month'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'It\'s Thursday and I\'m out of weekly money. Can I borrow from the bus fund?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Yes, you\'ll put it back.', why: 'That\'s how sinking funds empty. Staples carry him to Sunday.' },
          { text: 'Keep the bus fund for the bus. Eat from the staples until Sunday, then see what ran out early.' },
          { text: 'Spend all of it, then.', why: 'Then mid-semester becomes a crisis.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The sinking fund sum.',
        template: 'Cost [[1]] time left = what to set aside each [[2]].',
        blanks: [['÷', '/', 'divided by'], ['week', 'month']],
        distractors: ['×', 'year'],
      },
      {
        kind: 'findBug',
        prompt: 'Which sinking fund is planned wrongly?',
        lines: [
          'Bus home: GH₵150 in 6 weeks, GH₵25 a week.',
          'Exams: GH₵80 in 10 weeks, GH₵8 a week.',
          'Mum\'s birthday: GH₵60 in 3 months, GH₵60 a month.',
        ],
        bug: 2,
        fix: 'Mum\'s birthday: GH₵60 in 3 months, GH₵20 a month.',
        explanation: '60 ÷ 3 = 20. Setting aside 60 a month would save three times too much.',
      },
      {
        kind: 'mcq',
        prompt: 'The lab manual (GH₵60) arrives this week, unplanned. Where should it come from?',
        options: [
          { text: 'The school and printing line, which exists for exactly this' },
          { text: 'Savings', why: 'There\'s a line for school costs. Use it first.' },
          { text: 'A loan', why: 'Never for a cost the plan already covers.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi\'s three sinking funds per month: bus GH₵100 (about 25 a week), exams GH₵32, birthday GH₵20. Total per month?',
        answers: ['152', 'GH₵152', '152 cedis'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'List three costs you know are coming in the next six months. What would you need to set aside each month for each?',
    starters: ['Coming up:...', 'Per month:...'],
  },
  deepen: {
    title: 'Why "sinking"?',
    summary: 'The name comes from old business and government finance: a "sinking fund" was money set aside regularly to pay off ("sink") a debt or replace equipment. The idea is the same for a student: little by little, so the big day isn\'t a crisis.',
  },
  notes: 'Fictional: lab manual 60 (from school line); bus home 150 in 6 weeks (25/wk ≈ 100/month); exam stationery 80 in 10 weeks (8/wk ≈ 32/month); Mum\'s birthday 60 in 3 months (20/month). Efua\'s last bus: 140 + snacks. In money sheet v4 these are funded partly by the beat-money split; the sheet shows the planned line.',
};

export default lesson;
