import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1 — Rules, or learning? The one idea behind machine learning. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Rules, or learning?',
  summary: 'Monday at Afiya. Folake tells the team: "About 1 in 5 clinic appointments ends with an empty chair. We\'ll use AI to fix it." Halima, a nurse until last month, nods, and has no idea what that means.',
  minutes: 10,
  outcomes: [
    'Say what machine learning is in one sentence',
    'Tell a program that follows rules from one that learns them',
    'Meet Halima and the empty-chairs problem',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The empty chairs',
      beats: [
        { speaker: 'folake', text: 'One in five booked appointments, the patient doesn\'t come. A nurse waits. Someone who needed that slot didn\'t get it. I want a fix before the board meeting.' },
        { speaker: 'halima', text: '(quietly, to Miracle) I know why patients miss. The bus fare. The rain. Waiting three weeks for a slot. But "AI"? I was a nurse.' },
        { speaker: 'miracle', text: 'Then you already have the hard part. Machine learning is just this: instead of writing the rules yourself, you show the computer lots of examples and it finds the rules.' },
        { speaker: 'halima', text: 'Examples... like every appointment we\'ve ever booked, and who came?' },
        { speaker: 'miracle', text: 'Exactly. Thousands of them. The computer looks for the patterns you see by instinct, and turns them into a guess for tomorrow\'s list.' },
      ],
      choice: {
        prompt: 'Halima could start in two ways. Which is closer to machine learning?',
        options: [
          {
            text: 'Collect past appointments, and let the computer find what the missed ones have in common.',
            outcome: 'That\'s machine learning: rules found from examples. The rest of this course shows how.',
            best: true,
          },
          {
            text: 'Write down her own rules ("if it rains, they won\'t come") and program those.',
            outcome: 'That\'s a normal program: rules written by a person. Useful, and you\'ll build one in lesson 9, but the computer isn\'t learning anything.',
          },
          {
            text: 'Ask a chatbot which patients will miss.',
            outcome: 'It has never seen Afiya\'s appointments. It can only guess in general. A model has to learn from YOUR examples.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A normal program: a person writes the rules, the computer follows them. Machine learning: a person gives examples with answers, the computer finds the rules.',
    },
  ],
  apply: {
    scenario: 'Rules written, or rules learned?',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which sentence describes machine learning?',
        options: [
          { text: 'A person types every rule into the computer', why: 'That\'s normal programming.' },
          { text: 'The computer finds rules from examples' },
          { text: 'The computer thinks like a human', why: 'It finds patterns in numbers. It doesn\'t think or understand.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: "Print the one-line idea: Machine learning finds rules from examples",
        starter: "# Print the sentence with print(\"...\")\n",
        solution: "print(\"Machine learning finds rules from examples\")\n",
        hint: "print(\"Machine learning finds rules from examples\")",
        checks: [
          { message: "Print the sentence", outputEquals: "Machine learning finds rules from examples" },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Rules written by a person, or rules learned from examples?',
        groups: ['Written by a person', 'Learned from examples'],
        items: [
          { text: 'A late fee: 5% after the 25th', group: 0 },
          { text: 'A spam filter trained on millions of emails', group: 1 },
          { text: 'A calculator adding two numbers', group: 0 },
          { text: 'A no-show guess from past appointments', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s one-sentence definition.',
        template: 'Instead of writing the [[1]] yourself, you show the computer lots of [[2]] and it finds them.',
        blanks: [['rules'], ['examples']],
        distractors: ['answers', 'programs'],
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'I\'m a nurse, not a programmer. Can I really do machine learning?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Only if you learn advanced maths first.', why: 'This course needs nothing beyond percentages.' },
          { text: 'No, leave it to the engineers.', why: 'The person who knows the problem is the one who builds the most useful model.' },
          { text: 'Yes. The hardest part is knowing which examples matter and what the patterns mean. You already know that.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What does a machine learning model need to learn from?',
        options: [
          { text: 'Past examples, with the right answer for each' },
          { text: 'A long list of if-statements', why: 'Those would be rules you wrote yourself.' },
          { text: 'Nothing: it already knows', why: 'A model knows only what its examples taught it.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to what it means here.',
        pairs: [
          ['Example', 'One past appointment'],
          ['Answer', 'Did the patient come?'],
          ['Pattern', 'What missed appointments have in common'],
          ['Prediction', 'A guess about tomorrow\'s patient'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the sentence that is wrong about machine learning.',
        lines: [
          'Machine learning finds rules from examples.',
          'It needs past examples with answers.',
          'Once trained, it is always right.',
          'Its guesses can help people decide what to do.',
        ],
        bug: 2,
        fix: 'Once trained, it makes good guesses, and is sometimes wrong.',
        explanation: 'A model makes guesses. Even a good one is wrong some of the time, which is why we measure how often.',
      },
      {
        kind: 'mcq',
        prompt: 'Folake says "AI". Miracle says "machine learning". What\'s the link?',
        options: [
          { text: 'They are two unrelated things', why: 'ML sits inside the bigger idea of AI. Lesson 12 explains.' },
          { text: 'AI is a kind of machine learning', why: 'It\'s the other way round: AI is the umbrella.' },
          { text: 'Machine learning is one way of building AI' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many Afiya appointments end with an empty chair? (write it as "1 in ...")',
        answers: ['1 in 5', 'one in five', '1 in five'],
        placeholder: '1 in ...',
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'So the computer will just know who won\'t come?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Yes, it will know for certain.', why: 'Nobody, human or model, knows the future for certain.' },
          { text: 'It will make a guess from past appointments. We\'ll measure how good the guess is before anyone relies on it.' },
          { text: 'No, computers can\'t help at all.', why: 'A good guess can help clinics decide who to remind.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you can predict by instinct (the traffic, a friend\'s mood, the weather). What examples taught you that?',
    starters: ['I can usually predict...', 'I learned it from...'],
  },
  deepen: {
    title: 'Your examples are your teacher',
    summary: 'A model can only be as good as the examples it learns from. That\'s why Halima\'s nurse knowledge matters so much: she knows which examples are trustworthy.',
  },
  notes: 'Practice data in this course is made up (appointments.csv, teyro_datasets.py): about 18% of 2,400 practice appointments are no-shows, "about 1 in 5". Machine learning vs explicit programming: standard definition (rules learned from data vs written by hand).',
};

export default lesson;
