import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story with a choice: the furious draft. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The furious draft',
  summary: 'Day 9. Lucía\'s internet company charges her MX$1,850 to cancel, though her contract says moving somewhere they can\'t serve is free. She asks AI to "destroy them". It does. Too well.',
  minutes: 12,
  outcomes: [
    'Use AI for a first draft, and keep control of the tone',
    'Spot invented facts in a confident draft',
    'Choose calm and firm over angry or limp',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 9, 11:20 p.m.',
      beats: [
        { speaker: 'narrator', text: 'The email from her internet company: "Early-exit fee: MX$1,850." Their own coverage map says they can\'t serve Flat 5. Her contract, clause 11, says that means no fee.' },
        { speaker: 'narrator', text: 'Lucía types: "Write a furious email destroying my internet company."' },
        { speaker: 'narrator', text: 'The AI obliges: "This is OUTRAGEOUS and ILLEGAL under Article 47 of the Consumer Code. I will be contacting my lawyers and the national press unless..."' },
        { speaker: 'lucia', text: 'Article 47? I don\'t have lawyers. I barely have internet.' },
        { speaker: 'tey', text: 'It\'s 11:20 p.m., she\'s furious, and she has a draft that feels great and contains a law it may have invented. What should she do?' },
      ],
      choice: {
        prompt: 'What should Lucía do?',
        options: [
          { text: 'Ask for calm and firm instead: the facts, clause 11, and exactly what she wants, then check every fact before sending in the morning.', outcome: 'Yes. A calm email with the clause, the coverage check and a clear request is much harder to ignore than a rant. And the invented "Article 47" never leaves her laptop.', best: true },
          { text: 'Send the furious one. They deserve it.', outcome: 'It feels amazing for about four minutes. Then an agent reads "lawyers" and "illegal", sends it to a slow queue, and the made-up law makes her look less credible, not more.' },
          { text: 'Ask for a very polite one: "So sorry to bother you, if it\'s not too much trouble..."', outcome: 'Too limp. It apologises for a fee that\'s their mistake and never says what she wants. It\'s easy to reply "we understand your concern" and change nothing.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'AI drafts can include confident "facts" (laws, policies, numbers) that aren\'t real. Before sending anything that quotes a rule, check the rule yourself, or take it out.',
    },
  ],
  apply: {
    scenario: 'The MX$1,850 fee.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was the biggest risk in the furious draft?',
        options: [
          { text: 'It might quote a law that doesn\'t exist, which makes her look less credible' },
          { text: 'It used capital letters', why: 'Annoying, but not the biggest risk.' },
          { text: 'It was too short', why: 'Length wasn\'t the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Angry, limp, or calm and firm?',
        groups: ['Calm and firm', 'Angry or limp'],
        items: [
          { text: '"Clause 11 says no fee in this case. Please remove it."', group: 0 },
          { text: '"This is OUTRAGEOUS!"', group: 1 },
          { text: '"So sorry to bother you..."', group: 1 },
          { text: '"Please confirm within 10 days."', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Send the furious one! Companies only listen to anger.',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'You\'re right, I\'ll add more capitals.', why: 'Anger doesn\'t make her case stronger.' },
          { text: 'Fine, I\'ll just pay.', why: 'The contract is on her side.' },
          { text: 'They listen to clauses and deadlines. The angry one also has a law in it that might not exist.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The tone she wants.',
        template: 'Not angry, not limp: [[1]] and [[2]].',
        blanks: [['calm'], ['firm']],
        distractors: ['loud', 'sorry'],
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence in the AI\'s draft must she check or remove before sending?',
        lines: [
          'I\'m cancelling because I\'m moving to an address you can\'t serve.',
          'This is illegal under Article 47 of the Consumer Code.',
          'Clause 11 of my contract says there\'s no fee in this case.',
        ],
        bug: 1,
        fix: 'Remove it, or check the real law first.',
        explanation: 'She has no idea if "Article 47" is real. Her own contract clause is the strong, checkable point.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the draft to what happens next.',
        pairs: [
          ['The furious draft', 'Slow queue, less credible'],
          ['The limp draft', '"We understand your concern"'],
          ['The calm, firm draft', 'Hard to ignore'],
          ['Sending at 11:20 p.m.', 'Regret by morning'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt gets Lucía the email she needs?',
        options: [
          { text: 'Write a furious email destroying them.', why: 'Angry, and invites invented threats.' },
          { text: 'Write a calm, firm complaint: I\'m moving to an address they can\'t serve, clause 11 says no fee, I want the MX$1,850 removed within 10 days. Don\'t mention any laws.' },
          { text: 'Write a nice email.', why: 'Nice how? About what?' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much is the fee she\'s fighting, in pesos? (A number.)',
        answers: ['1850', '1,850', 'MX$1,850', 'MX$1850'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s better night.',
        lines: ['Notice she\'s furious', 'Ask AI for calm and firm', 'Remove anything she can\'t check', 'Sleep on it', 'Read it again and send in the morning'],
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'Wait, you nearly sent an email with a fake law in it?',
        prompt: 'Lucía\'s honest answer?',
        options: [
          { text: 'Nearly. AI wrote it confidently and I was angry. Now I check every rule before it goes out.' },
          { text: 'No, the law was real.', why: 'She never checked, so she can\'t know.' },
          { text: 'It doesn\'t matter.', why: 'A fake law can sink a fair complaint.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a message you sent in anger, or nearly did. What would the calm and firm version have said?',
    starters: ['I nearly sent...', 'Calm and firm:...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask an AI tool for an angry complaint, then a calm and firm one, about a small real annoyance. Read both aloud. Which would you want to receive if you worked there?',
  },
  notes: '"Article 47 of the Consumer Code" is presented as possibly invented, to show fabricated legal references in drafts. Internet company unnamed; clause 11 fictional.',
};

export default lesson;
