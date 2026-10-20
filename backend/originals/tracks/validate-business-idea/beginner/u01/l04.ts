import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Card deck: your idea is a list of guesses. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Your idea is a list of guesses',
  summary: 'Miracle asks Clinton to write down everything that has to be true for CampusEats to work. He expects three lines. He writes eleven, and hasn\'t checked a single one.',
  minutes: 12,
  outcomes: [
    'Turn an idea into a list of assumptions',
    'Sort assumptions into five kinds',
    'See which ones you\'ve actually checked',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Every business idea rests on <strong>assumptions</strong>: things that must be true for it to work, which you haven\'t checked yet. Write them as sentences that could be wrong.</p><p>Five kinds come up in almost every idea:</p><ol><li><strong>Problem</strong>: "Students struggle to get food after 8 p.m."</li><li><strong>Customer</strong>: "First-year hostel students are the ones who struggle most."</li><li><strong>Money</strong>: "They\'ll pay 500 FCFA for delivery on top of the food."</li><li><strong>Reach</strong>: "I can reach them through the group chats."</li><li><strong>Delivery</strong>: "I can get food to a hostel in under 30 minutes."</li></ol><p>Clinton\'s list grows to eleven. Next to each he writes how he knows it. Eleven times, the answer is "I think so".</p><p>That\'s normal at the start. The point of validation is to turn "I think so" into "I checked", one assumption at a time, starting with the one that could kill the idea (lesson 7).</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Write each assumption so it could be proved wrong. "Students like food" can\'t be. "Students will pay 500 FCFA for delivery" can.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s eleven guesses.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which kind of assumption is it?',
        groups: ['Problem', 'Money', 'Reach'],
        items: [
          { text: 'Students struggle to get food after 8 p.m.', group: 0 },
          { text: 'They\'ll pay 500 FCFA for delivery', group: 1 },
          { text: 'The group chats will bring customers', group: 2 },
          { text: 'Hostel kitchens close too early', group: 0 },
          { text: 'Restaurants will give me a discount', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is an assumption?',
        options: [
          { text: 'Something that must be true for the idea to work, which you haven\'t checked yet' },
          { text: 'A fact you\'ve proved', why: 'Once proved, it\'s evidence, not an assumption.' },
          { text: 'A feature of the app', why: 'Assumptions are about the world, not the app.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the kind to an example.',
        pairs: [
          ['Customer', 'First-year hostel students struggle most'],
          ['Delivery', 'I can deliver in under 30 minutes'],
          ['Money', 'They\'ll pay 500 FCFA on top'],
          ['Reach', 'Group chats will find customers'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I wrote "people like food" as my first assumption.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Nobody could prove that wrong, so it can\'t be tested. Try "students will pay 500 FCFA for delivery after 8 p.m."' },
          { text: 'Great, that\'s certainly true.', why: 'True but untestable; it tells you nothing.' },
          { text: 'Assumptions should be vague.', why: 'They should be specific enough to be wrong.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A testable assumption.',
        template: 'First-year hostel students will [[1]] [[2]] FCFA for delivery after 8 p.m.',
        blanks: [['pay'], ['500']],
        distractors: ['like', 'many'],
      },
      {
        kind: 'mcq',
        prompt: 'How many of Clinton\'s eleven assumptions had he checked?',
        options: [
          { text: 'None' },
          { text: 'All eleven', why: 'Every answer was "I think so".' },
          { text: 'Five', why: 'He hadn\'t checked any.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which assumption can\'t be proved wrong?',
        lines: [
          'Students will pay 500 FCFA for delivery.',
          'I can deliver to Molyko in under 30 minutes.',
          'Students like convenience.',
          'At least 20 orders a night will come from the group chats.',
        ],
        bug: 2,
        fix: 'Students will pay for delivery rather than walk 5 minutes.',
        explanation: '"Like convenience" is always true, so it tests nothing.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how an assumption becomes evidence.',
        lines: ['Write it so it could be wrong', 'Note how you know it now ("I think so")', 'Test it', 'Mark it supported or killed'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many assumptions did Clinton write down?',
        answers: ['11', 'eleven'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Testable or not?',
        groups: ['Testable', 'Not testable'],
        items: [
          { text: 'Students will pre-pay for a delivery', group: 0 },
          { text: 'Food is important', group: 1 },
          { text: 'At least 10 students order in the first weekend', group: 0 },
          { text: 'People enjoy good things', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write five assumptions behind your own idea, one of each kind: problem, customer, money, reach, delivery.',
    starters: ['Problem:...', 'Money:...'],
  },
  deepen: {
    title: 'Hypotheses',
    summary: 'In the Lean Startup approach, assumptions are called hypotheses, as in science. You don\'t prove a business idea right in one go; you test its riskiest guesses one at a time.',
  },
  notes: 'Assumption categories are a teaching simplification of common startup frameworks (e.g. desirability / viability / feasibility; Lean Canvas). 500 FCFA delivery fee is fictional.',
};

export default lesson;
