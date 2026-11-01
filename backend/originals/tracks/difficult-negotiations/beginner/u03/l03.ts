import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Step-by-step: saying no without burning the bridge (Ury's positive no). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Saying no without burning the bridge',
  summary: 'Mr Pryce now wants 120-day payment terms. Arjun can\'t survive four months without being paid. This one needs a real no. Ury\'s "positive no" has three parts: yes, no, yes.',
  minutes: 12,
  outcomes: [
    'Say a clear no to an unreasonable request',
    'Ground the no in your own interests',
    'Offer a path forward after the no',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The positive no',
      steps: [
        { title: '1. Know your yes', body: 'What are you protecting? Arjun: "I need to pay Kavya and Joel every month."' },
        { title: '2. Say yes to that, out loud', body: '"We need to pay our team monthly, so cash flow matters a lot to us."' },
        { title: '3. Say a clear no', body: '"So we can\'t accept 120-day payment terms." No "maybe", no "I\'ll try".' },
        { title: '4. Offer a yes?', body: '"What we can do: 40% at the start, 30% at the midpoint demo, 30% at launch. Would that work for your finance team?"' },
        { title: '5. Stay calm if they push', body: 'Repeat calmly: "I understand. 120 days doesn\'t work for us. The 40/30/30 plan does." Don\'t add new reasons each time.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Yes (to your interest), no (to the request), yes? (an offer). Say the no clearly, then open a path.',
    },
  ],
  apply: {
    scenario: '120-day terms.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the positive no.',
        lines: ['Know your yes', 'Say yes to that, out loud', 'Say a clear no', 'Offer a yes?', 'Stay calm if they push'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to Arjun\'s words.',
        pairs: [
          ['Yes', '"We need to pay our team monthly."'],
          ['No', '"We can\'t accept 120-day terms."'],
          ['Yes?', '"40/30/30. Would that work?"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why start with "yes" to your own interest?',
        options: [
          { text: 'It shows the no is about protecting something real, not about rejecting them' },
          { text: 'To confuse them', why: 'It explains the no.' },
          { text: 'It\'s polite filler', why: 'It grounds the no.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A clear no, or a mushy one?',
        groups: ['Clear', 'Mushy'],
        items: [
          { text: '"We can\'t accept 120-day terms."', group: 0 },
          { text: '"I\'ll see what I can do..."', group: 1 },
          { text: '"That doesn\'t work for us."', group: 0 },
          { text: '"Maybe, if it\'s really important..."', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'On £40,000, how much is the 40% paid at the start, in pounds?',
        answers: ['16000', '16,000', '£16,000'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'He pushed again. Should I give him a new reason?',
        prompt: "Grace's best reply?",
        options: [
          { text: 'Yes, give him five new reasons.', why: 'More reasons, more to argue about.' },
          { text: 'Give in.', why: 'Hold the no; offer the path.' },
          { text: 'No. Each new reason is something to argue with. Repeat calmly: "120 days doesn\'t work for us. 40/30/30 does."' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The shape.',
        template: 'Yes to your [[1]], no to the [[2]], then an offer.',
        blanks: [['interest', 'interests'], ['request']],
        distractors: ['person', 'friendship'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Arjun need monthly cash flow?',
        options: [
          { text: 'He doesn\'t', why: 'Four months unpaid would break the team.' },
          { text: 'He pays Kavya and Joel every month, whether or not the client has paid' },
          { text: 'To buy a new laptop', why: 'It\'s about paying the team.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line weakens Arjun\'s no?',
        lines: [
          'We need to pay our team monthly.',
          'So we can\'t accept 120-day terms.',
          'Although maybe we could try, if you really need it.',
          'What we can do is 40/30/30.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'A "maybe" after a no invites more pushing.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days of payment terms did Mr Pryce ask for?',
        answers: ['120'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Write a positive no to a request you need to refuse: yes to your interest, no, and an offer.',
    starters: ['Yes: I need...', 'No: so I can\'t...', 'Yes?: what I can do is...'],
  },
  deepen: {
    title: 'The Power of a Positive No',
    summary: 'William Ury\'s 2007 book argues that a good no protects what matters to you and the relationship at the same time. The key is that your no is rooted in a deeper yes.',
  },
  notes: 'Ury, The Power of a Positive No (2007): "Yes! No. Yes?" structure. Fictional: 120-day terms requested; counter 40/30/30 milestone payments; 40% of £40,000 = £16,000.',
};

export default lesson;
