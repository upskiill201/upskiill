import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 18 — Common beginner myths about machine learning. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Common beginner myths',
  summary: 'The team has opinions. Emmanuel thinks the model "understands" patients. Chidi thinks you need a maths degree. Folake thinks it will be done in a week. Halima reads Miracle\'s list of the myths every beginner believes.',
  minutes: 11,
  outcomes: [
    'Spot five common myths about machine learning',
    'Replace each one with what\'s actually true',
    'Feel ready to learn ML without advanced maths',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Five myths, and the truth',
      html: '<p>Miracle keeps this list pinned for every new person who joins an ML project.</p><ol><li><strong>"The model understands."</strong> It doesn\'t. It finds number patterns that went with the answer in its examples. It has no idea what a patient, a bus or rain is.</li><li><strong>"You need advanced maths."</strong> To <em>use</em> ML well, you need clear thinking, percentages and patience. The maths lives inside the tools. You\'ll meet the ideas with pictures and small numbers.</li><li><strong>"The fancier the model, the better."</strong> Often a simple model with good features beats a complicated one. And simple models are easier to explain to a clinic.</li><li><strong>"A high score means it works."</strong> Only if the test was fair: new examples, no peeking, compared with a lazy guess. Chapters 4 and 7 are about exactly this.</li><li><strong>"Most of the work is building the model."</strong> Most of the work is the question, the data and the testing. Training the model is often a few lines.</li></ol><p><strong>The truth in one line:</strong> machine learning is careful thinking about examples, with a computer doing the counting.</p>',
    },
    {
      kind: 'check',
      question: 'Which takes most of the time in a real ML project?',
      options: ['Typing the model code', 'The question, the data and testing', 'Choosing a model name'],
      answer: 1,
      explanation: 'Training is often a few lines. Getting the question, the data and the test right is the real work.',
    },
  ],
  apply: {
    scenario: 'Myths and truths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or truth?',
        groups: ['Myth', 'Truth'],
        items: [
          { text: 'The model understands patients', group: 0 },
          { text: 'Simple models are often good enough', group: 1 },
          { text: 'You need a maths degree to start', group: 0 },
          { text: 'Most of the work is data and testing', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: "Print \"The model understands rain: False\" using the variable",
        starter: "understands = False\n",
        solution: "understands = False\nprint(f\"The model understands rain: {understands}\")\n",
        hint: "print(f\"The model understands rain: {understands}\")",
        checks: [
          { message: "Print The model understands rain: False", outputEquals: "The model understands rain: False" },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'The model knows patients miss when it rains. So it understands rain?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Yes, it understands weather now.', why: 'It sees a number pattern, nothing more.' },
          { text: 'Models can\'t use rain at all.', why: 'They can use it as a feature.' },
          { text: 'It knows rain = 1 went with more no-shows in the examples. It has no idea what rain is.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Chidi: "I failed maths at school, so ML isn\'t for me." Best reply?',
        options: [
          { text: 'He\'s right, give up', why: 'This course needs nothing beyond percentages.' },
          { text: 'Using ML well needs clear thinking and percentages; the tools do the heavy maths' },
          { text: 'Learn calculus first', why: 'Not needed to build and test useful models.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Folake\'s timeline is unrealistic?',
        lines: [
          'Week 1: agree the question and the action.',
          'Weeks 2-3: clean the data and set up a fair test.',
          'Day 1: train the model, and it\'s ready for every clinic.',
          'After: check it monthly and retrain when needed.',
        ],
        bug: 2,
        fix: 'Later: train, test fairly, then try it at one clinic first.',
        explanation: 'Training is quick; trusting the model takes testing and a careful start.',
      },
      {
        kind: 'mcq',
        prompt: 'Two models: a simple one at 74%, a complicated one at 75%. The clinics need to understand it. Which might Halima pick?',
        options: [
          { text: 'Always the complicated one', why: '1% isn\'t worth a model nobody trusts.' },
          { text: 'Neither: both are useless', why: 'Both may beat the lazy guess. We\'d check.' },
          { text: 'The simple one: nearly as good, and easy to explain' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"It understands"', 'It finds number patterns'],
          ['"Fancier is better"', 'Simple often wins'],
          ['"High score means it works"', 'Only if the test is fair'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Miracle\'s line.',
        template: 'Machine learning is careful thinking about [[1]], with a computer doing the [[2]].',
        blanks: [['examples'], ['counting']],
        distractors: ['robots', 'thinking'],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'The model scored 95% on Chidi\'s laptop. Ship it today.',
        prompt: "Halima's best reply?",
        options: [
          { text: 'First: was it tested on bookings it never saw? And what does a lazy guess score? Then we decide.' },
          { text: 'Yes, 95% is enough.', why: 'A score without a fair test can mislead.' },
          { text: 'No, laptops can\'t run models.', why: 'They can. The question is how it was tested.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Which belief will help Halima most?',
        options: [
          { text: 'The computer will do all the thinking', why: 'It does the counting. People choose the question, data and action.' },
          { text: 'Only engineers can do ML', why: 'The people who know the problem build the most useful models.' },
          { text: 'My clinic knowledge is part of building a good model' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Does a model understand what rain is? (yes or no)',
        answers: ['no'],
        placeholder: 'yes or no',
      },
    ],
  },
  reflect: {
    prompt: 'Which of the five myths did you believe before today? What changed your mind?',
    starters: ['I believed...', 'Now I think...'],
  },
  deepen: {
    title: 'Where the maths is',
    summary: 'The maths is real: averages, distances, probabilities. You\'ll meet each idea when you need it, with small numbers you can check by hand, starting with distance in Chapter 3.',
  },
  notes: 'Common misconceptions: anthropomorphising models, maths prerequisites, model complexity vs feature quality, evaluation validity, effort distribution (data work dominates). No statistics claimed.',
};

export default lesson;
