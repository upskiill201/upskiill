import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1 — A model predicts the next token. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'A model predicts the next token',
  summary: 'Joel asks the question nobody on the team can answer: "But what IS a model? What does it actually do?" Tey\'s answer fits in one sentence, and it changes how Kavya thinks about every reply.',
  minutes: 11,
  outcomes: [
    'Explain that a language model predicts the next token',
    'See that a whole reply is many predictions in a row',
    'Make a tiny next-word predictor by counting',
  ],
  learn: [
    {
      kind: 'story',
      title: 'One sentence',
      beats: [
        { speaker: 'joel', text: 'Everyone says "the model thinks". What does it really do?' },
        { speaker: 'tey', text: 'It reads the text so far and predicts the most likely next token. Then it adds that token and predicts again. And again. A reply is just hundreds of next-token guesses in a row.' },
        { speaker: 'kavya', text: 'So when it said "60 days" for returns, it wasn\'t lying. It was guessing what usually comes next.' },
        { speaker: 'tey', text: 'Exactly. "You can return any item within..." is usually followed by a number of days in the text it learned from. Without your policy in front of it, it picks a likely one.' },
        { speaker: 'arjun', text: 'Which is why giving it the right facts matters so much. Likely isn\'t the same as true.' },
      ],
      choice: {
        prompt: 'What is a language model really doing when it replies?',
        options: [
          { text: 'Predicting the next token again and again, based on patterns in the text it learned from.', outcome: 'That\'s it. Everything else in this chapter builds on that one idea.', best: true },
          { text: 'Looking the answer up in a database.', outcome: 'There\'s no database of answers inside. It generates text one token at a time.' },
          { text: 'Thinking like a person.', outcome: 'It can seem that way, but underneath it\'s pattern-based prediction.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'A tiny predictor',
      caption: 'Count which word follows "is", then predict the most common.',
      code: 'text = "delivery is free . delivery is fast . delivery is free . returns are easy"\nwords = text.split()\n\nafter_is = {}\nfor i in range(len(words) - 1):\n    if words[i] == "is":\n        nxt = words[i + 1]\n        after_is[nxt] = after_is.get(nxt, 0) + 1\n\nprint(after_is)\nprint("Prediction:", max(after_is, key=after_is.get))\n',
      challenge: 'Add "delivery is fast" twice more to the text. What does it predict now?',
    },
  ],
  apply: {
    scenario: 'Next-token prediction.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does a language model do, at heart?',
        options: [
          { text: 'Predicts the most likely next token, over and over' },
          { text: 'Searches the internet for answers', why: 'Most models just generate text from patterns they learned.' },
          { text: 'Copies a stored answer', why: 'It builds each reply token by token.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'In the counts, which word most often follows "is"? Print it with max(..., key=...get)',
        starter: 'after_is = {"free": 2, "fast": 1}\n',
        solution: 'after_is = {"free": 2, "fast": 1}\nprint(max(after_is, key=after_is.get))\n',
        hint: 'max(after_is, key=after_is.get)',
        checks: [{ message: 'Print free', outputEquals: 'free' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how a model writes a reply.',
        lines: ['Read the prompt', 'Predict the next token', 'Add it to the text', 'Predict the next one again', 'Stop at the end of the reply'],
      },
      {
        kind: 'sortGroups',
        prompt: 'True of a language model, or not?',
        groups: ['True', 'Not true'],
        items: [
          { text: 'Writes one token at a time', group: 0 },
          { text: 'Checks every fact before writing', group: 1 },
          { text: 'Picks likely continuations', group: 0 },
          { text: 'Looks answers up in a stored list', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'If it just predicts likely words, how can it be useful at all?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Predicting well over huge amounts of text captures grammar, facts and reasoning patterns. Give it the right facts and it writes clear, useful answers.' },
          { text: 'It can\'t be useful.', why: 'Next-token prediction at scale is surprisingly capable.' },
          { text: 'It secretly understands everything.', why: 'It\'s prediction from patterns, which is why facts must be given to it.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'counts = {"free": 2, "fast": 3}\nprint(max(counts, key=counts.get))',
        language: 'python',
        options: [
          { text: 'fast' },
          { text: 'free', why: '"fast" has the higher count: 3.' },
          { text: '3', why: 'It returns the key with the highest value.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s sentence.',
        template: 'A model predicts the most likely next [[1]], adds it, and [[2]] again.',
        blanks: [['token'], ['predicts']],
        distractors: ['page', 'deletes'],
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence is wrong?',
        lines: [
          'A reply is many next-token predictions in a row.',
          'The model learned its patterns from lots of text.',
          'If an answer is likely, it must be true.',
          'Giving it the right facts makes good answers likelier.',
        ],
        bug: 2,
        fix: 'Likely isn\'t the same as true.',
        explanation: '"60 days" was likely and false for Mr Rao\'s shop.',
      },
      {
        kind: 'mcq',
        prompt: 'Why did the model say "60 days" for returns?',
        options: [
          { text: 'A number of days is a likely continuation, and it didn\'t have the shop\'s policy' },
          { text: 'Someone typed it in', why: 'No one did. It predicted it.' },
          { text: 'It is the law', why: 'It\'s just a likely-sounding guess.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In "delivery is free . delivery is fast . delivery is free", which word most often follows "is"?',
        answers: ['free'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Your phone keyboard also predicts your next word. When has it guessed something likely but wrong for you?',
    starters: ['My keyboard once suggested...', 'It was likely because...'],
  },
  deepen: {
    title: 'Bigger counts',
    summary: 'Your tiny predictor counts word pairs. Real models learn much richer patterns over long stretches of text with billions of parameters, but the job is the same: guess the next token well.',
  },
  notes: 'Language models generate autoregressively: predict a distribution over the next token, pick one, append, repeat. Toy bigram counter: in "delivery is free . delivery is fast . delivery is free", after "is": free 2, fast 1.',
};

export default lesson;
