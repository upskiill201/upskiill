import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Reading: handling a surprise cost. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The cracked screen',
  summary: 'Week 3. Kofi\'s phone slips off a lab bench. The screen spiders. The shop in Adum says GH₵180 to repair; a "new" phone is GH₵900. This is what the surprises line was for, but how do you decide what to do?',
  minutes: 12,
  outcomes: [
    'Decide between repair, replace or live with it',
    'Pay for a surprise without wrecking the plan',
    'Refill the surprises line afterwards',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Surprise costs: a calm routine',
      html: '<p>The phone still works. The bottom of the screen is cracked, and it\'s Kofi\'s only way to reach the class portal, his beats and Mum. Here\'s a routine for any surprise cost.</p><p><strong>1. Pause.</strong> Surprises create a mini-tunnel. Kofi\'s first thought: "Get a new phone today!" The shop has one on "small payments". Not today.</p><p><strong>2. List the options.</strong></p><ul><li><strong>Live with it.</strong> Free. Fine if it\'s cosmetic and safe. But this crack is spreading and the touch is failing at the bottom.</li><li><strong>Repair.</strong> GH₵180 for a new screen. The phone is two years old and otherwise fine.</li><li><strong>Replace.</strong> GH₵900, far beyond his plan, and the old phone mostly works.</li></ul><p><strong>3. Get a second price.</strong> Efua\'s brother knows another shop: GH₵160 with a 30-day guarantee. A 20-minute walk saves GH₵20.</p><p><strong>4. Pay from the right place.</strong> The surprises line is GH₵150, so it covers most of it. The rest (GH₵10) comes from fun money he\'d rolled over. Savings stay untouched.</p><p><strong>5. Refill the line.</strong> A surprises line that\'s been used is empty for the <em>next</em> surprise. Kofi\'s plan: next month, surprises gets its GH₵150 again, and part of any beat money tops it up.</p><p><strong>A good rule of thumb:</strong> repair if the item is otherwise healthy and the repair costs well under half the price of a replacement. Replace if repairs keep happening, or the item is failing in other ways.</p>',
    },
    {
      kind: 'check',
      question: 'The repair is GH₵160 and a replacement is GH₵900. The phone is otherwise fine. What does the rule of thumb suggest?',
      options: ['Repair: well under half the replacement price, phone otherwise healthy', 'Replace: new is always better', 'Live with a failing screen'],
      answer: 0,
      explanation: '160 is under a fifth of 900, and the rest of the phone works.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Surprise routine: pause, list options, get a second price, pay from the surprises line, then refill it.',
    },
  ],
  apply: {
    scenario: 'The cracked screen.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the surprise routine.',
        lines: ['Pause', 'List the options', 'Get a second price', 'Pay from the surprises line', 'Refill the line'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The second shop charges GH₵160 instead of GH₵180. How much does Kofi save?',
        answers: ['20', 'GH₵20', '20 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Surprises line GH₵150, repair GH₵160. Where should the extra GH₵10 come from?',
        options: [
          { text: 'Savings', why: 'There\'s rolled-over fun money. Use flexible money before savings.' },
          { text: 'Rolled-over fun money' },
          { text: 'A "small payments" deal', why: 'Borrowing for GH₵10 makes no sense.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Repair, replace or live with it?',
        groups: ['Repair', 'Replace', 'Live with it'],
        items: [
          { text: 'A tiny scratch on a working phone', group: 2 },
          { text: 'A cracked screen on an otherwise healthy phone', group: 0 },
          { text: 'A phone that keeps breaking and is 6 years old', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'The shop says a new phone is only GH₵90 a month on small payments!',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Do it! New phone!', why: 'A surprise in the tunnel is not the time for a new monthly payment.' },
          { text: 'Pause. How many months? What\'s the total? And does the repair solve the problem for GH₵160?' },
          { text: 'Never buy anything on payments.', why: 'Sometimes it makes sense. Check the total first, and not in a panic.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule of thumb.',
        template: 'Repair if the item is otherwise [[1]] and the repair is well under [[2]] the replacement price.',
        blanks: [['healthy', 'fine', 'working'], ['half']],
        distractors: ['double', 'broken'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step leaves Kofi exposed to the next surprise?',
        lines: [
          'Pay GH₵150 from surprises and GH₵10 from fun.',
          'Keep savings untouched.',
          'Leave the surprises line at GH₵0 next month too.',
        ],
        bug: 2,
        fix: 'Refill surprises to GH₵150 next month.',
        explanation: 'An empty surprises line means the next one comes out of food or savings.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵90 a month for 12 months on "small payments". What\'s the total?',
        answers: ['1080', '1,080', 'GH₵1,080', 'GH₵1080'],
        placeholder: 'A number',
        explanation: '90 × 12 = 1,080, compared with GH₵900 cash, or GH₵160 to repair.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the option to its cost.',
        pairs: [
          ['Live with it', 'GH₵0'],
          ['Repair (second shop)', 'GH₵160'],
          ['Replace in cash', 'GH₵900'],
          ['Replace on payments', 'GH₵1,080'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Kofi\'s surprise not become a crisis?',
        options: [
          { text: 'Because phones are cheap', why: 'GH₵160 is a lot for him. He planned for "something".' },
          { text: 'Because the surprises line already held GH₵150' },
          { text: 'Because Mum paid', why: 'He didn\'t ask. The plan covered it.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of your last surprise cost. Which step of the routine would have helped most?',
    starters: ['My last surprise was...', 'The step that would have helped is...'],
  },
  deepen: {
    title: 'Protect what you can\'t afford to replace',
    summary: 'A GH₵20 case and screen protector would have cost far less than GH₵160. For the few things you rely on most (phone, laptop, bike), small protection is often the best-value spending in the whole budget.',
  },
  notes: 'Fictional prices: repair GH₵180 (first shop), GH₵160 (second, 30-day guarantee); replacement GH₵900; payment plan GH₵90 × 12 = 1,080. Repair-vs-replace rule of thumb is a common heuristic (e.g. the "50% rule"), not a study. Efua\'s brother narrated only.',
};

export default lesson;
