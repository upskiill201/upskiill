import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Chat with Tey: separate the people from the problem. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'People vs problem',
  summary: 'Kavya\'s draft reply says "your offer shows you don\'t respect our work". Tey shows Arjun\'s team how to be gentle with Mr Pryce and tough on the price, in the same email.',
  minutes: 12,
  outcomes: [
    'Separate the relationship from the issue',
    'Be firm on the problem without attacking the person',
    'Rewrite a heated message so it works',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Every negotiation has two things in it: the problem (price, scope, dates) and the people. Mixing them causes most fights.', replies: ['What does mixing look like?'] },
        { tey: '"Your offer shows you don\'t respect our work." That turns a price problem into a personal attack. Now he has to defend himself, not discuss the price.', replies: ['So what do we write?'] },
        { tey: 'Soft on him, hard on the problem: "Thanks for coming back quickly. £28,000 doesn\'t cover the work in the quote. Could we talk about which parts matter most to you?"', replies: ['That still says no.'] },
        { tey: 'Exactly. It says no to the number and yes to the conversation. You can respect someone completely and still not accept their price.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Soft on the person, hard on the problem. Say no to the number, yes to the conversation.',
    },
  ],
  apply: {
    scenario: 'Rewriting Kavya\'s draft.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'About the person, or about the problem?',
        groups: ['Person', 'Problem'],
        items: [
          { text: '"You don\'t respect our work."', group: 0 },
          { text: '"£28,000 doesn\'t cover the work in the quote."', group: 1 },
          { text: '"You\'re being unreasonable."', group: 0 },
          { text: '"Which parts matter most to you?"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What happens when you mix the person and the problem?',
        options: [
          { text: 'They defend themselves instead of discussing the issue' },
          { text: 'They agree faster', why: 'People dig in when attacked.' },
          { text: 'Nothing', why: 'It usually starts a fight.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the heated line to a better one.',
        pairs: [
          ['"You don\'t respect our work."', '"£28,000 doesn\'t cover this scope."'],
          ['"You\'re being ridiculous."', '"Help me understand how you got there."'],
          ['"Take it or leave it."', '"Could we talk about what matters most?"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'If we\'re polite, he\'ll think we\'re weak.',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Weak is giving in. You\'re saying no to his number, politely. Polite and firm is the strongest position.' },
          { text: 'Then be rude.', why: 'Rude just hands him a fight.' },
          { text: 'Then accept the number.', why: 'Polite doesn\'t mean yes.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Say no to the [[1]], yes to the [[2]].',
        blanks: [['number', 'price'], ['conversation', 'talk']],
        distractors: ['person', 'insult'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the team\'s reply attacks the person?',
        lines: [
          'Thanks for coming back so quickly.',
          '£28,000 doesn\'t cover the work in our quote.',
          'Clearly you don\'t understand software.',
          'Could we have a call this week?',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It insults him; it doesn\'t help the price.',
      },
      {
        kind: 'mcq',
        prompt: 'Why ask "which parts matter most to you?"',
        options: [
          { text: 'It moves from the price to his interests, where a deal might be' },
          { text: 'To trap him', why: 'It\'s a genuine question.' },
          { text: 'It\'s small talk', why: 'It opens trading on scope.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many things does Tey say every negotiation has in it?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the rewritten reply.',
        lines: ['Thank him', 'Say the number doesn\'t cover the work', 'Ask what matters most', 'Suggest a call'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Soft on the person, or hard on the problem?',
        groups: ['Soft on the person', 'Hard on the problem'],
        items: [
          { text: '"Thanks for coming back quickly."', group: 0 },
          { text: '"We can\'t do this scope for £28,000."', group: 1 },
          { text: '"I understand you\'re under budget pressure."', group: 0 },
          { text: '"Our price reflects 16 weeks of work."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Find a heated message you sent or nearly sent. Rewrite it: soft on the person, hard on the problem.',
    starters: ['Original:...', 'Rewritten:...'],
  },
  deepen: {
    title: 'Separate the people from the problem',
    summary: 'This is the first principle of Getting to Yes. People have feelings, egos and pressures. Deal with those directly and kindly, and you can be much firmer on the substance.',
  },
  notes: 'Fisher, Ury & Patton, Getting to Yes, ch. 2: "Separate the people from the problem"; "be soft on the people, hard on the problem".',
};

export default lesson;
