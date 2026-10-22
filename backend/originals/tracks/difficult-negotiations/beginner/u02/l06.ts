import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Explain cards: higher authority and "the budget is fixed". */
const lesson: OriginalLesson = {
  key: 'l06',
  title: '"My boss won\'t allow it"',
  summary: '"Our finance director won\'t sign above £30,000." Is that a wall, or a tactic? Grace shows Arjun how to answer the two most common "it\'s out of my hands" moves.',
  minutes: 12,
  outcomes: [
    'Recognise the higher-authority tactic',
    'Answer a "fixed budget" with a fixed scope',
    'Find and involve the real decision-maker',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Higher authority:</strong> "I\'d love to, but my boss won\'t allow it." It lets the other side say no without being the bad guy, and it means every concession you make goes up the chain, while theirs never get made.</p><p><strong>"The budget is fixed":</strong> sometimes true, sometimes a position. Either way, a fixed budget means a fixed amount of work, not the same work for less.</p><table><tr><th>They say</th><th>Arjun answers</th></tr><tr><td>"Finance won\'t sign above £30,000."</td><td>"Understood. What would finance need to see to approve more? Could we include them in Thursday\'s call?"</td></tr><tr><td>"It\'s out of my hands."</td><td>"Who would it be in the hands of? I\'d be glad to explain the scope to them."</td></tr><tr><td>"The budget is fixed at £30,000."</td><td>"Then let\'s look at what £30,000 can build well, and what moves to phase two."</td></tr><tr><td>"I\'ll have to check with my boss."</td><td>"Of course. I\'ll need to check with my team too." (Your own higher authority.)</td></tr></table><p>Before any big negotiation, ask early: <em>"Who else is involved in the decision?"</em></p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Higher authority? Ask what the decision-maker needs, and invite them in. Fixed budget? Fix the scope to match.',
    },
  ],
  apply: {
    scenario: 'Out of his hands.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is "my boss won\'t allow it" a powerful tactic?',
        options: [
          { text: 'They can say no without being the bad guy, and avoid making concessions themselves' },
          { text: 'Bosses always decide everything', why: 'It\'s about who has to concede.' },
          { text: 'It isn\'t powerful', why: 'It can stall you and protect them.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to Arjun\'s answer.',
        pairs: [
          ['"Finance won\'t sign above £30,000."', '"What would finance need to see?"'],
          ['"It\'s out of my hands."', '"Whose hands is it in?"'],
          ['"The budget is fixed."', '"Let\'s see what £30,000 builds well."'],
          ['"I\'ll check with my boss."', '"I\'ll check with my team too."'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good answer or poor answer?',
        groups: ['Good', 'Poor'],
        items: [
          { text: '"Could we include finance on Thursday?"', group: 0 },
          { text: '"Fine, we\'ll do the whole app for £30,000."', group: 1 },
          { text: '"What would they need to approve more?"', group: 0 },
          { text: '"Your boss sounds unreasonable."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'So we should just accept the budget is fixed?',
        prompt: "Grace's best reply?",
        options: [
          { text: 'Yes, do everything for £30,000.', why: 'Same work for less is a loss.' },
          { text: 'Accept the budget if it\'s real, not the scope. A fixed budget buys a fixed amount of work.' },
          { text: 'Never accept any budget.', why: 'Budgets can be real; match scope to them.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Fixed budget.',
        template: 'A fixed [[1]] means a fixed amount of [[2]].',
        blanks: [['budget'], ['work', 'scope']],
        distractors: ['smile', 'time off'],
      },
      {
        kind: 'mcq',
        prompt: 'What should Arjun ask early in any big negotiation?',
        options: [
          { text: '"Are you the boss?"', why: 'Too blunt; ask who\'s involved.' },
          { text: 'Nothing; it doesn\'t matter', why: 'Knowing decision-makers saves time.' },
          { text: '"Who else is involved in the decision?"' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If £30,000 is fixed and the full app is £48,000, what share of the work can it pay for? (percent, rounded)',
        answers: ['63', '63%', '62', '62%', '62.5', '62.5%'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line gives away a concession to an absent boss?',
        lines: [
          'Understood about the finance limit.',
          'What would finance need to see?',
          'Tell finance we\'ll drop to £32,000 if that helps.',
          'Could we include them on Thursday\'s call?',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'He concedes to someone who isn\'t even in the room.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Higher authority, or fixed budget?',
        groups: ['Higher authority', 'Fixed budget'],
        items: [
          { text: '"My director decides."', group: 0 },
          { text: '"We only have £30,000."', group: 1 },
          { text: '"I need sign-off."', group: 0 },
          { text: '"That\'s all the money there is."', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the answer to "my boss won\'t allow it".',
        lines: ['Acknowledge it', 'Ask what the boss needs to see', 'Offer to explain to them directly', 'Don\'t concede to someone not in the room'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you heard "it\'s out of my hands" in a negotiation? What could you have asked?',
    starters: ['They said...', 'I could have asked...'],
  },
  deepen: {
    title: 'Use your own authority',
    summary: 'Having to check with someone can protect you too. "I\'ll need to run that by my team" gives you time and stops you agreeing to something on the spot.',
  },
  notes: 'Higher-authority and fixed-budget tactics: Harvard PON hardball tactics; Fisher & Ury. Fictional: finance limit £30,000; 30,000 ÷ 48,000 = 62.5%.',
};

export default lesson;
