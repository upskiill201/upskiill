import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 7 — the cascade: the questions a browser asks to pick a winner. Reading. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'How the browser picks a winner',
  summary: 'Two rules, same element, different colours. Only one can win. You met the basics in Course 1. Here\'s the full process browsers use, the "cascade" in Cascading Style Sheets.',
  minutes: 12,
  outcomes: ['Describe the questions the cascade asks, in order', 'Explain why a style attribute beats a stylesheet rule', 'Predict a winner using strength, then order'],
  learn: [
    {
      kind: 'reading',
      title: 'The cascade, step by step',
      html:
        '<p>When two or more rules set the same property on the same element, the browser doesn\'t panic. It asks a short list of questions, in order, and stops at the first one that picks a winner.</p>' +
        '<p><strong>1. Is one marked important?</strong> A value ending in <strong>!important</strong> beats normal ones. It\'s a sledgehammer, and we\'ll see later why you should almost never use it.</p>' +
        '<p><strong>2. Where does it come from?</strong> Your styles beat the browser\'s built-in ones. That\'s why your h1 colour replaces the default black. A <strong>style attribute</strong> written on the element beats any selector in a stylesheet.</p>' +
        '<p><strong>3. Which selector is more specific?</strong> A more precise selector wins: an id beats a class, and a class beats a plain element name. This is called <strong>specificity</strong>, and you\'ll count it next lesson.</p>' +
        '<p><strong>4. Which comes last?</strong> If everything else is equal, the rule written later wins. That\'s the "later wins" rule you learned first, and it only decides ties.</p>' +
        '<p>There\'s one more thing that isn\'t part of the contest at all: <strong>inheritance</strong>. If no rule sets a property on an element, some properties, like color and font-family, are passed down from its parent. Any rule that targets the element directly beats an inherited value.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Watch the questions',
      caption: 'Three rules want the h2. The class rule is more specific than h2, so it wins, even though h2 comes later.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .section-title { color: #F0438A; }\n  h2 { color: #FF9600; }\n</style>\n<h2 class="section-title">Gigs</h2>\n<h2>Beats</h2>\n',
      challenge: 'Add style="color: #FFF6E5" to the Gigs heading. The style attribute beats both rules.',
    },
  ],
  apply: {
    scenario: 'Who wins?',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the cascade\'s questions in order.',
        lines: ['Is one marked !important?', 'Where does it come from (browser, stylesheet, style attribute)?', 'Which selector is more specific?', 'Which comes last?'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is the heading?',
        code: '.title { color: #F0438A; }\nh2 { color: #FF9600; }\n\n<h2 class="title">Gigs</h2>',
        language: 'html',
        options: [
          { text: 'Pink: the class is more specific' },
          { text: 'Orange: h2 comes later', why: 'Order only decides ties. The class is more specific.' },
          { text: 'Both, mixed', why: 'One value wins.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the Gigs heading orange with a class rule: .section-title gets color #FF9600',
        starter: '<style>\n  h2 { color: #FFF6E5; }\n\n</style>\n<h2 class="section-title">Gigs</h2>\n',
        solution: '<style>\n  h2 { color: #FFF6E5; }\n  .section-title { color: #FF9600; }\n</style>\n<h2 class="section-title">Gigs</h2>\n',
        hint: '.section-title { color: #FF9600; }',
        checks: [
          { message: 'The heading is orange', dom: { selector: '.section-title', style: 'color', styleValue: '#FF9600' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which wins against .featured { color: pink }?',
        groups: ['Beats it', 'Loses to it'],
        items: [
          { text: 'A style attribute on the element', group: 0 },
          { text: 'An earlier article { } rule', group: 1 },
          { text: 'A #id rule', group: 0 },
          { text: 'A colour inherited from body', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to what it means.',
        pairs: [
          ['Specificity', 'How precise the selector is'],
          ['Order', 'Later wins a tie'],
          ['Inheritance', 'Passed down from the parent'],
          ['!important', 'A sledgehammer that beats normal rules'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I put my h2 rule at the very end and it STILL doesn\'t win. Why?',
        options: [
          { text: 'Order only decides ties. Another rule is more specific, like a class, so it wins first.' },
          { text: 'The browser ignores the end of the file.', why: 'It reads it all. Specificity comes before order.' },
          { text: 'Add more h2 rules.', why: 'More copies of a weak selector are still weak.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the statement that\'s wrong.',
        lines: ['A class selector beats a plain element selector.', 'The rule written last always wins, whatever its selector.', 'A style attribute beats stylesheet rules.'],
        bug: 1,
        explanation: 'Last wins only when the selectors are equally specific.',
      },
      {
        kind: 'mcq',
        prompt: 'body sets color: cream. No rule targets the paragraph. What colour is the paragraph?',
        options: [
          { text: 'Cream, inherited from body' },
          { text: 'Black, the browser default', why: 'color is inherited from body.' },
          { text: 'No colour', why: 'It inherits cream.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the summary.',
        template: 'First [[1]], then order. Order only breaks a [[2]].',
        blanks: [['specificity'], ['tie']],
        distractors: ['colour', 'rule', 'font'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the name for how precise a selector is? (one word)',
        answers: ['specificity'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time a style "didn\'t work" on your page. Which question of the cascade was the reason?',
    starters: ['I think it was...', 'Because...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "MDN cascade, specificity, and inheritance" and read the introduction.',
  },
  notes: 'Simplified cascade (CSS Cascading Level 4): origin and importance, context, element-attached styles, layers (omitted), specificity, order of appearance. Inheritance applies only when no cascaded value exists.',
};

export default lesson;
