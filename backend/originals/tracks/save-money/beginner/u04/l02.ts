import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Card deck: what counts as an emergency. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Is it really an emergency?',
  summary: 'While Kofi rests, his phone fills with "emergencies": a flash sale ending tonight, Yaw\'s concert tickets, a cracked phone case. Only one of this week\'s messages is a real emergency. A clear test helps.',
  minutes: 10,
  outcomes: [
    'Use a three-question test for emergencies',
    'Spot fake urgency',
    'Decide what to do with costs that aren\'t emergencies',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>The test.</strong> A real emergency passes all three:</p><ol><li><strong>Urgent:</strong> it has to be paid now, or soon, or things get worse.</li><li><strong>Necessary:</strong> it protects your health, safety, home, or ability to study or work.</li><li><strong>Unexpected:</strong> you couldn\'t reasonably have planned for it.</li></ol><p>Malaria treatment: yes, yes, yes. A flash sale: urgent (it says so), but not necessary, and not unexpected.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Fake urgency.</strong> "Ends tonight!", "Last 2 left!", "Only today!" are designed to <em>feel</em> urgent. Sales come back. Tickets get resold. If the urgency comes from a seller, it isn\'t your emergency.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Not an emergency, but still needed?</strong> Things that are necessary but predictable belong in a <strong>sinking fund</strong>: exam fees, the bus home, replacing a phone that\'s getting old. Things that are wanted but not needed go in the <strong>budget\'s fun line</strong>, or wait.</p>',
    },
    {
      kind: 'check',
      question: 'A cracked phone case (the phone is fine). Emergency?',
      options: ['Yes: anything broken is an emergency', 'Yes, if it\'s on sale', 'No: not necessary or urgent; the phone still works'],
      answer: 2,
      explanation: 'It can wait, or come from flexible spending.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Urgent, necessary, unexpected: all three, or it isn\'t an emergency. Predictable needs go in sinking funds; wants go in the budget or wait.',
    },
  ],
  apply: {
    scenario: 'This week\'s "emergencies".',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Emergency, sinking fund, or want?',
        groups: ['Emergency', 'Sinking fund', 'Want'],
        items: [
          { text: 'Malaria treatment', group: 0 },
          { text: 'Exam fees due next month', group: 1 },
          { text: 'Concert tickets', group: 2 },
          { text: 'Bus home for a family emergency', group: 0 },
          { text: 'Flash sale on sneakers', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: '"Sale ends tonight!" Which part of the test does it fail?',
        options: [
          { text: 'None, it\'s an emergency', why: 'Urgent-feeling isn\'t the same as necessary.' },
          { text: 'Necessary: it\'s a want, however urgent it feels' },
          { text: 'It passes all three', why: 'It isn\'t necessary or unexpected.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each cost to where it belongs.',
        pairs: [
          ['Clinic visit with fever', 'Emergency fund'],
          ['Replacing an ageing laptop', 'Sinking fund or goal'],
          ['New jersey', 'Fun line, or wait'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The test.',
        template: 'Urgent, [[1]], [[2]]: all three.',
        blanks: [['necessary'], ['unexpected']],
        distractors: ['cheap', 'fun'],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'The concert sells out tonight! It\'s an emergency, use your emergency fund!',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'It\'s urgent for the seller, not for me. Not necessary, so not an emergency. And my fund just paid for malaria.' },
          { text: 'True, it\'s urgent.', why: 'Urgency from a seller isn\'t an emergency.' },
          { text: 'Concerts are evil.', why: 'They\'re great. Just not emergencies.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which "emergency" in Yaw\'s list isn\'t one?',
        lines: [
          'Dentist for a broken tooth.',
          'Bus fare home for a family funeral.',
          'Sneakers before the price goes up tomorrow.',
        ],
        bug: 2,
        fix: 'Sneakers: fun line, or wait.',
        explanation: 'A price going up is a seller\'s urgency, not a necessity.',
      },
      {
        kind: 'mcq',
        prompt: 'Exam fees due next month: urgent and necessary. Why aren\'t they an emergency?',
        options: [
          { text: 'They\'re not necessary', why: 'They are necessary. They\'re just predictable.' },
          { text: 'They\'re expected: they belong in a sinking fund' },
          { text: 'They are an emergency', why: 'Predictable costs aren\'t emergencies.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Of this week\'s 5 "urgent" messages, only 1 was a real emergency. How many were not?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the decision for any urgent-seeming cost.',
        lines: ['Is it urgent?', 'Is it necessary?', 'Is it unexpected?', 'All three: emergency fund. Otherwise: sinking fund, budget, or wait.'],
      },
      {
        kind: 'mcq',
        prompt: 'Why protect the emergency fund from fake emergencies?',
        options: [
          { text: 'To grow it forever', why: 'It\'s for using, on real emergencies.' },
          { text: 'Because banks require it', why: 'It\'s your rule.' },
          { text: 'So it\'s there when a real one comes, like week 9' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last thing that felt urgent to buy. Did it pass all three questions?',
    starters: ['It felt urgent because...', 'It passed / failed because...'],
  },
  deepen: {
    title: 'Urgency is a sales tool',
    summary: 'Countdown timers, "only 2 left" and "price rises tomorrow" are common selling techniques, and some are simply untrue. How to Stop Impulse Buying, the next course in this set, takes them apart one by one.',
  },
  notes: 'Emergency test (urgent, necessary, unexpected) is a common consumer-finance heuristic. Scarcity/urgency tactics covered in Course 3 Ch3.',
};

export default lesson;
