import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story: two checkouts. Unclear ownership doubles the work. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Two checkouts',
  summary: 'Day 6. Hindi is live and Mr Rao is happy. Then Arjun opens the code: Kavya built a checkout button flow on the product page, and Joel built a checkout flow in the cart. Two checkouts, two days, one job. Each was sure it was theirs.',
  minutes: 11,
  outcomes: [
    'See how unclear ownership wastes work',
    'Notice the gaps between people, not just inside tasks',
    'Know this chapter\'s goal: everyone knows who owns what',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 6, 10:15 a.m.',
      beats: [
        { speaker: 'kavya', text: 'Wait, you built checkout too? I thought "products" meant everything until payment.' },
        { speaker: 'joel', text: 'I thought "cart" meant everything from "Add to cart" to the receipt.' },
        { speaker: 'narrator', text: 'Both reasonable. Both done well. Two days of work, and one of them will be thrown away. Arjun had drawn a line between "products" and "cart" in his head. Nobody else could see the line.' },
        { speaker: 'arjun', text: 'Okay. This one\'s on me too.' },
      ],
      choice: {
        prompt: 'What should Arjun do next?',
        options: [
          {
            text: 'Open a shared doc and list every piece of the shop with one owner each, together, right now.',
            outcome: 'Twenty minutes later: 14 pieces, 14 names. They spot two more gaps nobody owned: order emails and the "out of stock" message.',
            best: true,
          },
          {
            text: 'Pick the better checkout and move on.',
            outcome: 'Fixes today\'s clash. Next week, the same thing happens with order emails.',
          },
          {
            text: 'Tell them to talk to each other more.',
            outcome: 'They do, politely. Nobody knows who decides when they disagree.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Chapter 1 was about making each task clear. But expectations also fall through the <strong>gaps between people</strong>: where one job ends and the next begins. When ownership is unclear, you get two people doing the same thing, or nobody doing the thing that sits in between. <strong>This chapter:</strong> roles, who decides, the reason behind the task, working agreements and handoffs.</p>",
    },
  ],
  apply: {
    scenario: 'Day 6, two checkouts.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did both build a checkout?',
        options: [
          { text: 'They weren\'t talking', why: 'They were. Nobody knew where the line was.' },
          { text: 'The line between "products" and "cart" was only in Arjun\'s head' },
          { text: 'One of them was lazy', why: 'Both worked hard.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'What does unclear ownership cause?',
        groups: ['Double work', 'Nobody does it'],
        items: [
          { text: 'Two checkouts', group: 0 },
          { text: 'No order emails', group: 1 },
          { text: 'Two size pickers', group: 0 },
          { text: 'No "out of stock" message', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Should I delete my checkout?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Yes, Kavya\'s is better.', why: 'Decides before fixing the cause.' },
          { text: 'Keep both.', why: 'Two checkouts is a bug.' },
          { text: 'Not yet. Let\'s list who owns every piece first, then decide which checkout to keep. Your work wasn\'t wasted effort, it was my unclear brief.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Expectations often fall through the ___ between people. (one word)',
        answers: ['gaps', 'Gaps', 'cracks', 'seams'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Arjun\'s fix in order.',
        lines: ['List every piece of the shop', 'Give each one owner', 'Spot pieces nobody owns', 'Agree who decides disagreements'],
      },
      {
        kind: 'mcq',
        prompt: 'What did the shared list reveal?',
        options: [
          { text: 'Two pieces nobody owned: order emails and "out of stock"' },
          { text: 'That Kavya should do everything', why: 'Every piece got one owner.' },
          { text: 'Nothing new', why: 'It found two gaps.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s list. Which line breaks it?',
        lines: [
          'Product page: Kavya.',
          'Checkout: Kavya and Joel together.',
          'Order emails: Joel.',
        ],
        bug: 1,
        fix: 'Checkout: Joel. Kavya owns the button that leads to it.',
        explanation: 'Two owners is how two checkouts happened.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['Curse of knowledge', 'Can\'t un-know it'],
          ['Definition of done', 'A shared finish checklist'],
          ['Worked example', 'Show a finished one first'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'Every piece has [[1]] owner, and everyone can [[2]] the list.',
        blanks: [['one'], ['see', 'read']],
        distractors: ['two', 'hide'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s admission.',
        tiles: ['This', 'one\'s', 'on', 'me', 'too.'],
        distractors: ['you'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a group project or team task. Has anything ever been done twice, or not at all, because nobody knew who owned it?',
    starters: ['It happened when...', 'Nobody owned...'],
  },
  deepen: {
    title: 'List the pieces',
    summary: 'For something you\'re doing with others, list every piece and write one name next to each. Look for the pieces with no name.',
  },
  notes: 'Story setup. Ownership gaps and duplication at role boundaries: role clarity research (Rizzo et al. 1970) and responsibility-assignment practice (RACI). Fictional events.',
};

export default lesson;
