import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Myth or Fact: tactics myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Tactics myths',
  summary: 'Kavya wants to use every tactic right back at them. Joel thinks spotting tactics means everyone is lying. Grace sorts fact from myth before the options go out.',
  minutes: 11,
  outcomes: [
    'Decide whether to use tactics yourself',
    'Know when to name a tactic out loud',
    'See tactics as moves, not proof of lying',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'The best answer to a tactic is the same tactic back.',
          isFact: false,
          explain: 'Myth. Tactic wars escalate. Ury\'s advice is to change the game: return to interests, options and fair standards.',
        },
        {
          text: 'You can sometimes name a tactic out loud, calmly and with humour.',
          isFact: true,
          explain: 'Fact. "I feel like we\'re doing good cop, bad cop here," said with a smile, can reset a conversation. Don\'t do it to humiliate.',
        },
        {
          text: 'If someone uses a tactic, they\'re lying.',
          isFact: false,
          explain: 'Myth. A deadline can be real and still used as pressure. Treat tactics as moves to answer, not proof of bad character.',
        },
        {
          text: 'Most tactics lose power once you recognise them.',
          isFact: true,
          explain: 'Fact. Good cop / bad cop, flinches and fake deadlines work best when unnoticed. Recognising them is half the defence.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Don\'t fight tactics with tactics. Recognise them, answer calmly, and steer back to interests.',
    },
  ],
  apply: {
    scenario: 'Tactics myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Answer tactics with the same tactic', group: 0 },
          { text: 'You can name a tactic calmly', group: 1 },
          { text: 'Tactics prove someone is lying', group: 0 },
          { text: 'Tactics lose power once recognised', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What happens when both sides use tactics on each other?',
        options: [
          { text: 'They cancel out nicely', why: 'Usually it escalates.' },
          { text: 'Both get better deals', why: 'Tactic wars destroy value.' },
          { text: 'It tends to escalate, and both lose trust' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Let\'s give them a fake deadline too: "Our offer expires Monday."',
        prompt: "Grace's best reply?",
        options: [
          { text: 'Great idea.', why: 'Fake pressure backfires when it\'s discovered.' },
          { text: 'If it\'s fake and they find out, you lose their trust for good. Give real reasons and real dates.' },
          { text: 'Make it expire in an hour.', why: 'Worse.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Fight fire with fire"', 'Change the game to interests'],
          ['"Tactics mean lies"', 'Tactics are moves to answer'],
          ['"Never mention tactics"', 'Naming calmly can reset things'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Naming a tactic.',
        template: 'Name it [[1]], maybe with [[2]]. Never to humiliate.',
        blanks: [['calmly'], ['humour', 'humor', 'a smile']],
        distractors: ['loudly', 'anger'],
      },
      {
        kind: 'mcq',
        prompt: 'Which is the best way to name a tactic?',
        options: [
          { text: '"I feel like we\'re doing good cop, bad cop here," with a smile' },
          { text: '"Stop manipulating me!"', why: 'That humiliates and escalates.' },
          { text: 'Post about it online', why: 'That ends the relationship.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the team\'s plan is a tactic war?',
        lines: [
          'Answer the flinch with our reasons.',
          'Ask what\'s driving Friday.',
          'Pretend we have three other clients begging for us.',
          'Send real options on Thursday.',
        ],
        bug: 2,
        fix: 'Mention real alternatives only.',
        explanation: 'Invented competition is a lie that can blow up.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Recognising a tactic is about what fraction of the defence, according to the lesson? (a word)',
        answers: ['half'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Changing the game, or fighting fire with fire?',
        groups: ['Changing the game', 'Fire with fire'],
        items: [
          { text: '"What does the spring launch need?"', group: 0 },
          { text: 'A fake deadline of our own', group: 1 },
          { text: '"Let\'s look at what\'s fair for this scope."', group: 0 },
          { text: 'An extreme counter of £90,000', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to handle any tactic.',
        lines: ['Recognise it', 'Don\'t react', 'Don\'t copy it', 'Steer back to interests'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever used a pressure tactic yourself? How did the other person react?',
    starters: ['I once...', 'They...'],
  },
  deepen: {
    title: 'Change the game',
    summary: 'Ury\'s Getting Past No suggests "reframing": treat the other side\'s move as an opening to talk about interests. You\'re not playing their game, and you\'re not refusing to play.',
  },
  notes: 'Ury, Getting Past No (1991): reframe; don\'t reject, reframe. Naming tactics calmly: Fisher & Ury, "negotiate about the rules of the game".',
};

export default lesson;
