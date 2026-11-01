import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Step-by-step: the calm-down sequence. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The calm-down sequence',
  summary: 'Grace writes down what she did on the ward without thinking: five steps for calming a heated conversation. They work in a design review too.',
  minutes: 12,
  outcomes: [
    'Use five steps to de-escalate an argument',
    'Acknowledge feelings before solving problems',
    'Know when to take a break',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to calm a heated conversation',
      steps: [
        { title: '1. Slow yourself first', body: 'Breathe out slowly. Lower your voice and speak a little slower. Your calm is the first thing they notice.' },
        { title: '2. Acknowledge, don\'t argue', body: '"I can see this is really frustrating." You\'re not agreeing; you\'re showing you hear them.' },
        { title: '3. Name the real concern', body: '"It sounds like you\'re worried about the 14th." Most anger sits on a worry.' },
        { title: '4. Pause if it\'s too hot', body: 'If either of you is too upset to think: "Let\'s take 20 minutes and come back to this." Then actually come back.' },
        { title: '5. Move to the problem', body: '"What\'s the smallest change that would help?" Shift from who\'s to blame to what happens next.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Slow yourself, acknowledge, name the concern, pause if needed, then move to the problem.',
    },
  ],
  apply: {
    scenario: 'The calm-down sequence.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Slow yourself first', 'Acknowledge, don\'t argue', 'Name the real concern', 'Pause if it\'s too hot', 'Move to the problem'],
      },
      {
        kind: 'mcq',
        prompt: 'Does acknowledging someone\'s frustration mean you agree with them?',
        options: [
          { text: 'No. It shows you hear them, which calms them enough to talk' },
          { text: 'Yes, it means you admit you\'re wrong', why: 'Acknowledging isn\'t agreeing.' },
          { text: 'It means you\'re weak', why: 'It\'s a calming skill.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the line.',
        pairs: [
          ['Acknowledge', '"I can see this is really frustrating."'],
          ['Name the concern', '"You\'re worried about the 14th."'],
          ['Pause', '"Let\'s take 20 minutes."'],
          ['Move to the problem', '"What\'s the smallest change?"'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Acknowledging, or arguing?',
        groups: ['Acknowledging', 'Arguing'],
        items: [
          { text: '"I can see why that\'s stressful."', group: 0 },
          { text: '"That\'s not true."', group: 1 },
          { text: '"That sounds like a lot of pressure."', group: 0 },
          { text: '"You\'re overreacting."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: '(still loud) This research stuff always lands at the worst time!',
        prompt: "Grace's best first reply?",
        options: [
          { text: '"It\'s not my fault!"', why: 'Defending escalates.' },
          { text: '"Calm down, Femi."', why: 'That usually makes it worse.' },
          { text: '"I know. The timing is awful, with the 14th so close."' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The pause.',
        template: '"Let\'s take [[1]] minutes and come [[2]] to this."',
        blanks: [['20', 'twenty'], ['back']],
        distractors: ['5', 'never'],
      },
      {
        kind: 'mcq',
        prompt: 'What makes a pause a pause, not avoiding?',
        options: [
          { text: 'You never come back', why: 'That\'s avoiding.' },
          { text: 'You agree when you\'ll come back, and you do' },
          { text: 'You leave without a word', why: 'Say you\'re pausing and when you\'ll return.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which step in this sequence is in the wrong place?',
        lines: [
          'Slow myself first.',
          'Solve the problem straight away.',
          'Acknowledge the feeling.',
          'Name the real concern.',
        ],
        bug: 1,
        fix: 'Move to the problem last, once it\'s calmer.',
        explanation: 'Problem-solving before calming rarely works.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes does Grace suggest for a pause?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step is this?',
        groups: ['Slow yourself', 'Move to the problem'],
        items: [
          { text: 'Breathe out slowly', group: 0 },
          { text: '"What would help most?"', group: 1 },
          { text: 'Lower your voice', group: 0 },
          { text: '"What\'s the next step?"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the five steps do you usually skip? What happens when you do?',
    starters: ['I usually skip...', 'Then...'],
  },
  deepen: {
    title: 'De-escalation training',
    summary: 'Healthcare workers, police and customer-service teams are often trained in similar steps: manage yourself, acknowledge, listen for the need, and offer choices. They work in offices too.',
  },
  notes: 'Calm-down sequence synthesised from de-escalation practice (e.g. Richmond et al. 2012, "Verbal de-escalation of the agitated patient", Western Journal of Emergency Medicine 13(1)) and Ury\'s Getting Past No. 20-minute break: Gottman on flooding.',
};

export default lesson;
