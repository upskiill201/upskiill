import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 12. Card deck: the "tell people" family — ping, loop in, heads-up, FYI, reach out, flag. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Ping, loop in, keep me posted',
  summary: 'Remi finds the double payment, and now everyone wants to hear about it. Who to ping, who to loop in, who just needs a heads-up? The "tell people" words, decoded.',
  minutes: 11,
  outcomes: [
    'Decode the "tell people" family: ping, loop in, heads-up, FYI, reach out, flag',
    'Know who needs to act, and who just needs to know',
    'Use the right word for each',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Friday, 11:30. Finance confirms it: Synergix paid Swift Freight twice for four deliveries. Brian's reply is one line: <em>\"Brilliant. Flag it to Finance, loop in Felix, give Mrs Achieng a heads-up, and keep me posted.\"</em></p><p>Four instructions, four different ways of telling people things. Let's go through them.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Ping</h3><p><strong>Means:</strong> send a short, quick message. \"Ping me when you're free.\"</p><h3>Reach out (to)</h3><p><strong>Means:</strong> contact someone, often for the first time. \"I'll reach out to Swift Freight on Monday.\"</p><h3>Flag (to)</h3><p><strong>Means:</strong> point out a problem so someone notices it. \"Flag it to Finance\" = make sure Finance knows there's an issue.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Loop in</h3><p><strong>Means:</strong> add someone to a conversation that's already happening, often by copying them into an email. \"Loop in Felix\" = add Felix to the thread.</p><h3>Keep me posted / keep me in the loop</h3><p><strong>Means:</strong> keep telling me what happens.</p><h3>Heads-up</h3><p><strong>Means:</strong> a warning in advance, so nobody is surprised. \"Just a heads-up: the CEO might ask about this.\"</p><h3>FYI</h3><p><strong>Means:</strong> \"for your information\". Read it, you don't need to do anything.</p>",
    },
    {
      kind: 'check',
      question: 'Brian says "give Mrs Achieng a heads-up". What does Remi send her?',
      options: ['A request to fix the invoices', 'A short advance warning about the double payment', 'Nothing, she\'ll hear about it'],
      answer: 1,
      explanation: 'A heads-up warns someone early so they\'re not surprised. She doesn\'t need to act.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Two kinds of people: those who need to DO something (flag it to them, ping them) and those who just need to KNOW (loop them in, give them a heads-up, FYI). Make it clear which one they are.',
    },
  ],
  apply: {
    scenario: 'Friday, 11:30. The double payment is confirmed.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the "tell people" words.',
        pairs: [
          ['Ping', 'A short, quick message'],
          ['Loop in', 'Add to an ongoing conversation'],
          ['Heads-up', 'An advance warning'],
          ['Flag', 'Point out a problem'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does "FYI" at the top of an email usually mean?',
        options: [
          { text: 'Fix your issue', why: 'FYI = for your information.' },
          { text: 'Urgent: reply today', why: 'FYI messages are usually the least urgent kind.' },
          { text: 'For your information: read it, no action needed' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does this person need to DO something, or just KNOW?',
        groups: ['Needs to do something', 'Just needs to know'],
        items: [
          { text: '"Flag it to Finance so they can claim it back"', group: 0 },
          { text: '"Give Mrs Achieng a heads-up"', group: 1 },
          { text: '"FYI, the report is attached"', group: 1 },
          { text: '"Ping me the numbers by 3"', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Brilliant. Flag it to Finance, loop in Felix, give Mrs Achieng a heads-up, and keep me posted.',
        prompt: 'Best reply?',
        options: [
          { text: 'Will do: emailing Finance now with Felix copied, a quick note to Mrs Achieng, and I\'ll update you at the wrap-up.' },
          { text: 'Pinging everyone!', why: 'Different people need different things. Say what each one gets.' },
          { text: 'Should I tell the whole company?', why: 'Brian named four people. A double payment is sensitive: keep it to them.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Brian: "Keep me ___ ." (one word, means "tell me what happens")',
        answers: ['posted', 'informed', 'updated'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: '"Can you reach out to Swift Freight?" What should Remi do?',
        options: [
          { text: 'Visit their office and shake hands', why: 'Reaching out usually means an email or a call, not a visit.' },
          { text: 'Contact Swift Freight' },
          { text: 'Ignore them until they contact Synergix', why: 'Reaching out means Synergix makes the first move.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Remi\'s note to Mrs Achieng.',
        template: 'Hi Mrs Achieng, just a [[1]]: we found a double payment to Swift Freight. Finance is on it. No action [[2]], just [[3]] in case Mr Kamau asks.',
        blanks: [['heads-up'], ['needed'], ['FYI']],
        distractors: ['ping', 'urgent'],
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s email to Finance. Which line is in the wrong place?',
        lines: [
          'Subject: Double payment to Swift Freight, 4 deliveries in August',
          'FYI, no action needed.',
          'We paid 4 invoices twice: KSh 186,000. Could you check and claim it back?',
          'I\'ve looped in Felix from IT in case it\'s a system issue.',
        ],
        bug: 1,
        fix: 'Delete it: Finance DOES need to act.',
        explanation: '"FYI, no action needed" tells Finance they can ignore it. But they\'re the ones who need to claim the money back.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s message to Felix.',
        tiles: ['Hi', 'Felix,', 'looping', 'you', 'in', 'on', 'the', 'Swift', 'Freight', 'invoices.'],
        distractors: ['boiling', 'offline'],
      },
      {
        kind: 'mcq',
        prompt: 'Zanele writes "I\'ll ping the CEO about it." Why might Remi stop her?',
        options: [
          { text: 'Because interns can never contact the CEO', why: 'There\'s no rule. But how and who matters.' },
          { text: 'Because "ping" is a rude word', why: 'It\'s not rude, just casual.' },
          { text: '"Ping" suggests a quick, casual message. A first contact with the CEO needs more care, and maybe Brian should do it' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last group message or email you sent. Who needed to DO something, and who just needed to KNOW? Was it clear?',
    starters: ['The doers were...', 'The knowers were...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'Label your messages',
    summary: 'Try starting work messages with what you need: "Action needed:" or "FYI:". People will answer faster, and nobody wonders whether they have to do something.',
  },
  notes: '"Ping" (Merriam-Webster: to contact by a brief message), "loop in" (Cambridge: include in a conversation), "heads-up" (Cambridge: a warning), FYI, "reach out to" (Cambridge: to try to communicate with), "flag" (Cambridge: to draw attention to).',
};

export default lesson;
