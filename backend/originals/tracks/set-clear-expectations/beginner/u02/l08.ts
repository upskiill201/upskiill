import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Side by side: "we'll handle it" vs a named owner and a date. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: '"We\'ll handle it"',
  summary: 'Mr Rao\'s nephew asks on a call: "Who\'s doing the shipping-cost page?" Arjun says "We\'ll handle it." Three days later, nobody has. Two versions of that answer.',
  minutes: 11,
  outcomes: [
    'Spot "we" answers that hide who owns the work',
    'Answer with a name and a date',
    'Make new work land on the ownership list straight away',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The answer on the call',
      before: { label: '"We"', text: '"We\'ll handle it." (Kavya thinks Joel heard. Joel thinks Arjun meant himself. Arjun thinks it\'s obvious it\'s Kavya\'s. Three days later: no page.)' },
      after: { label: 'A name and a date', text: '"Kavya, could you take the shipping page? First version Thursday. I\'ll add it to the list now." (Kavya: "Yes, Thursday." Done on Thursday.)' },
      notes: [
        '"We" sounds like teamwork. It often means nobody.',
        'A name, a date and a "yes" from that person.',
        'New work goes on the ownership list straight away, or it gets lost.',
      ],
    },
    {
      kind: 'text',
      html: "<p>New tasks appear all the time: on calls, in passing, in a client's email. The moment of creation is when ownership is most likely to get lost, because everyone heard it and assumes someone else took it. That's diffusion of responsibility again, in real time. The fix is a habit: <strong>never let a new task end without a name, a date, and a yes</strong>. And put it on the list before the call ends.</p>",
    },
    {
      kind: 'check',
      question: 'What three things should every new task leave a call with?',
      options: ['A name, a date and a yes', 'A meeting, a slide and a plan', 'A "we", a "soon" and a "sure"'],
      answer: 0,
      explanation: 'Without all three, it\'s still nobody\'s.',
    },
  ],
  apply: {
    scenario: 'The shipping-cost page.',
    items: [
      {
        kind: 'sortGroups',
        prompt: '"We" answer, or a real owner?',
        groups: ['"We" answer', 'Real owner'],
        items: [
          { text: '"We\'ll handle it."', group: 0 },
          { text: '"Kavya, by Thursday?" "Yes."', group: 1 },
          { text: '"Someone will look at it."', group: 0 },
          { text: '"Joel owns it; Monday."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did "we\'ll handle it" lead to nothing?',
        options: [
          { text: 'Nobody cared about shipping', why: 'They all cared. Nobody owned it.' },
          { text: 'It was too hard', why: 'Kavya did it in two days once asked.' },
          { text: 'Everyone assumed someone else took it' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Wait, was I supposed to do the shipping page? I thought Joel had it.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'My fault: I said "we". Could you take it? First version Thursday. I\'m adding it to the list now.' },
          { text: 'Obviously it was yours.', why: '"Obviously" strikes again.' },
          { text: 'Ask Joel.', why: 'Passes the confusion along.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '"We" sounds like teamwork. It often means ___. (one word)',
        answers: ['nobody', 'Nobody', 'no-one'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the vague answer to a real one.',
        pairs: [
          ['"We\'ll handle it."', '"Kavya, by Thursday?"'],
          ['"Soon."', '"First version Thursday."'],
          ['"Sure, sure."', '"Yes, Thursday."'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why add new tasks to the list before the call ends?',
        options: [
          { text: 'To look organised', why: 'It\'s about not losing work.' },
          { text: 'Tasks created in passing are the easiest to lose' },
          { text: 'The client asked', why: 'It\'s for the team.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s call notes. Which task will get lost?',
        lines: [
          'Shipping page: Kavya, Thursday.',
          'Gift wrapping option: we\'ll see.',
          'Order emails: Joel, Monday.',
        ],
        bug: 1,
        fix: 'Gift wrapping: Joel, decide by Friday if it\'s in scope.',
        explanation: '"We\'ll see" has no owner and no date.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put catching a new task in order.',
        lines: ['Notice the new task', 'Ask one person by name', 'Agree a date and get a yes', 'Add it to the list now'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Every new task leaves with a [[1]], a [[2]] and a yes.',
        blanks: [['name', 'owner'], ['date', 'deadline']],
        distractors: ['we', 'maybe'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the better answer.',
        tiles: ['Kavya,', 'could', 'you', 'take', 'it?'],
        distractors: ['We'],
      },
    ],
  },
  reflect: {
    prompt: 'When did you last say "we\'ll handle it" or "someone will look at it"? Did it get done? Who should have owned it?',
    starters: ['I said...', 'It should have been...'],
  },
  deepen: {
    title: 'Catch the "we"',
    summary: 'In your next meeting, listen for "we\'ll", "someone" and "soon". Each time, ask kindly: "Who, and by when?"',
  },
  notes: 'Diffusion of responsibility (Darley & Latané 1968) applied to meeting action items; action items with named owners and dates: standard meeting practice (e.g. Rogelberg 2019). Fictional details.',
};

export default lesson;
