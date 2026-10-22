import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Step-by-step: how to make an ask. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'How to make an ask',
  summary: 'Ada practises her rent ask with Remi on a video call. Five steps: one number, one reason, then the hardest part, stopping talking.',
  minutes: 12,
  outcomes: [
    'Make an ask in five clear steps',
    'Lead with a specific number, not a vague request',
    'Stop talking after you ask',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to an ask',
      steps: [
        { title: '1. Start on the same side', body: '"I\'d like to stay, and I want this to work for both of us."' },
        { title: '2. One specific number', body: '"I\'d like to propose ₦1,300,000 a year." Not "a bit lower". Specific numbers sound researched.' },
        { title: '3. One clear reason', body: '"Similar flats on this street rent for ₦1,300,000 to ₦1,350,000." One strong reason beats five weak ones.' },
        { title: '4. Stop talking', body: 'Silence. Don\'t explain again, don\'t add "but I could go higher". Let him think.' },
        { title: '5. Listen, then respond', body: 'Whatever he says, ask a question before you answer: "What would make that hard for you?"' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'The most common mistake: filling the silence with a lower offer. Ask, then wait.',
    },
  ],
  apply: {
    scenario: 'Practising with Remi.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Start on the same side', 'One specific number', 'One clear reason', 'Stop talking', 'Listen, then respond'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific or vague?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: '"₦1,300,000 a year"', group: 0 },
          { text: '"A bit lower, maybe?"', group: 1 },
          { text: '"Similar flats rent for ₦1,300,000"', group: 0 },
          { text: '"Prices are high these days"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why use one strong reason instead of five?',
        options: [
          { text: 'Weak reasons dilute the strong one and give him things to argue with' },
          { text: 'Five reasons are always better', why: 'Extra weak reasons weaken the ask.' },
          { text: 'Reasons don\'t matter', why: 'A reason makes an ask more persuasive.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: '(silence on the practice call)',
        prompt: 'Remi stays silent for five seconds. What should Ada do?',
        options: [
          { text: 'Say "Or ₦1,400,000 is fine too!"', why: 'She just lowered her own offer for nothing.' },
          { text: 'Explain the reason again', why: 'Repeating it sounds unsure.' },
          { text: 'Wait. Let him speak first.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The ask.',
        template: '"I\'d like to propose [[1]] a year. Similar flats on this street rent for that." Then: [[2]].',
        blanks: [['₦1,300,000', '1,300,000', '1300000'], ['silence', 'wait']],
        distractors: ['apologise', '₦1,000,000'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to what it does.',
        pairs: [
          ['Same side', 'Sets a friendly tone'],
          ['Specific number', 'Sounds researched'],
          ['Clear reason', 'Makes it fair'],
          ['Silence', 'Lets them think'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'He says "That\'s too low." What should Ada say first?',
        options: [
          { text: '"OK, ₦1,450,000."', why: 'She\'s jumped to her walk-away.' },
          { text: '"What would make it hard for you?"' },
          { text: '"No it isn\'t."', why: 'Arguing teaches her nothing.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s practice ask breaks a step?',
        lines: [
          'I\'d like to stay, and I want this to work for us both.',
          'I\'d like to propose ₦1,300,000 a year.',
          'Similar flats on this street rent for that.',
          'But if that\'s too low, I can go higher, no problem.',
        ],
        bug: 3,
        fix: 'Delete it, and wait.',
        explanation: 'She filled the silence with a concession.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many reasons does Tey recommend in an ask?',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step is this line?',
        groups: ['Number', 'Reason', 'Response'],
        items: [
          { text: '"I\'d like to propose ₦1,300,000."', group: 0 },
          { text: '"Similar flats rent for that."', group: 1 },
          { text: '"What would make that hard for you?"', group: 2 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own ask in the five steps. Then say it out loud, and count to five in silence after the number.',
    starters: ['Same side:...', 'My number and reason:...'],
  },
  deepen: {
    title: 'Precise numbers',
    summary: 'Studies by Malia Mason and colleagues found that precise first offers (₦1,315,000 rather than ₦1,300,000) can seem better researched, so people adjust them less. Use them only if you can explain them.',
  },
  notes: 'Five-step ask is a teaching synthesis. Precise offers: Mason, Lee, Wiley & Ames (2013), "Precise offers are potent anchors", Journal of Experimental Social Psychology 49(4).',
};

export default lesson;
