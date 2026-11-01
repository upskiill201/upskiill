import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Explain cards: questions that cool things down. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Questions that cool things down',
  summary: 'Arguing with a hard position makes it harder. Questions do the opposite. Grace gives Arjun the questions she used with angry relatives on the ward, rewritten for procurement.',
  minutes: 12,
  outcomes: [
    'Use questions instead of arguments',
    'Ask the other side to explain their number',
    'Turn a demand into a problem to solve together',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>When someone takes a hard position, arguing back makes them defend it. Asking makes them explain it. Grace\'s questions:</p><table><tr><th>Instead of</th><th>Ask</th></tr><tr><td>"£28,000 is far too low."</td><td>"Help me understand how you got to £28,000."</td></tr><tr><td>"Your deadline is unfair."</td><td>"What\'s driving the Wednesday deadline?"</td></tr><tr><td>"Your old supplier was worse."</td><td>"What did the last supplier\'s version include?"</td></tr><tr><td>"We can\'t do that."</td><td>"What would need to be true for a higher budget to work for you?"</td></tr><tr><td>"That\'s unreasonable."</td><td>"What would you do in my position?"</td></tr></table><p>Good questions are <strong>open</strong> (they can\'t be answered yes or no), <strong>genuine</strong> (you want the answer), and <strong>calm</strong> (said slowly, not as a trap).</p><p>Ury calls this "stepping to their side": you show you\'re trying to understand, which makes them more willing to understand you.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Don\'t argue with a hard position. Ask about it: "Help me understand how you got there."',
    },
  ],
  apply: {
    scenario: 'Grace\'s questions.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the argument to the better question.',
        pairs: [
          ['"Far too low."', '"How did you get to £28,000?"'],
          ['"Unfair deadline."', '"What\'s driving Wednesday?"'],
          ['"We can\'t do that."', '"What would need to be true...?"'],
          ['"Unreasonable."', '"What would you do in my position?"'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A cooling question, or an argument?',
        groups: ['Cooling question', 'Argument'],
        items: [
          { text: '"Help me understand how you got there."', group: 0 },
          { text: '"That\'s ridiculous."', group: 1 },
          { text: '"What did the last version include?"', group: 0 },
          { text: '"You\'re wrong about the market."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What happens when you argue with a hard position?',
        options: [
          { text: 'They defend it harder' },
          { text: 'They drop it', why: 'People defend positions when attacked.' },
          { text: 'Nothing', why: 'Arguing usually hardens it.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Asking "how did you get there?" feels like letting him off the hook.',
        prompt: "Grace's best reply?",
        options: [
          { text: 'You\'re right, attack the number.', why: 'Questions reveal more than attacks.' },
          { text: 'It\'s the opposite. If £28,000 is based on a smaller app, he has to say so. Then you can talk about scope.' },
          { text: 'Don\'t ask anything.', why: 'Then you learn nothing.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Good questions are...',
        template: 'Open, [[1]], and [[2]].',
        blanks: [['genuine'], ['calm']],
        distractors: ['loaded', 'loud'],
      },
      {
        kind: 'mcq',
        prompt: 'Which of these is a loaded question, not a genuine one?',
        options: [
          { text: '"What\'s driving the deadline?"', why: 'That\'s genuine.' },
          { text: '"What would need to be true for more budget?"', why: 'That\'s genuine.' },
          { text: '"Don\'t you think £28,000 is insulting?"' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ury calls showing you\'re trying to understand "stepping to their..." what?',
        answers: ['side'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Which of Arjun\'s planned questions is really an argument?',
        lines: [
          'How did you get to £28,000?',
          'What\'s driving the Wednesday deadline?',
          'Why are procurement people always so difficult?',
          'What did the last supplier\'s app include?',
        ],
        bug: 2,
        fix: 'What matters most to you in a supplier?',
        explanation: 'It\'s an insult shaped like a question.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a cooling question moment.',
        lines: ['Hear the hard position', 'Resist arguing', 'Ask an open question', 'Listen to the whole answer'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Open or closed?',
        groups: ['Open', 'Closed'],
        items: [
          { text: '"What would you do in my position?"', group: 0 },
          { text: '"Is £28,000 final?"', group: 1 },
          { text: '"How was the budget set?"', group: 0 },
          { text: '"Can you go higher?"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write three cooling questions for a hard position someone has taken with you.',
    starters: ['Help me understand...', 'What\'s driving...'],
  },
  deepen: {
    title: 'Step to their side',
    summary: 'In Getting Past No, Ury\'s second step is to step to their side: listen, acknowledge and ask questions before you push your own view. It lowers their guard so they can hear you.',
  },
  notes: 'Ury, Getting Past No (1991), step 2 "Step to their side" and step 3 "Reframe" (ask problem-solving questions). Fictional questions.',
};

export default lesson;
