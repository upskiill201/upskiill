import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Before/After: harsh start vs soft start. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Harsh start vs soft start',
  summary: 'Grace needs to raise Femi\'s outburst with him, privately. How she starts will decide how it ends. Gottman\'s research says the first few minutes predict a lot.',
  minutes: 12,
  outcomes: [
    'Start a difficult conversation softly',
    'Avoid blame, "always" and "never" in openers',
    'Use "I" statements about a specific moment',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Harsh start vs soft start',
      before: {
        label: 'Harsh start',
        text: '"Femi, you always shout when you don\'t get your way. It was embarrassing in the review. You need to sort your temper out."\nBlame, "always", a verdict on his character.\nHe defends himself, and the conversation is lost in 30 seconds.',
      },
      after: {
        label: 'Soft start',
        text: '"Femi, can I talk to you about Thursday? When the volume went up in the review, I found it hard to think, and I think the team did too. I know the 14th is stressful. Could we agree a way to flag big problems that doesn\'t feel like an ambush?"\nOne moment, her feeling, his pressure, a shared request.',
      },
      notes: [
        'Gottman found that how a conflict conversation starts strongly predicts how it ends.',
        'Soft starts describe one specific moment, use "I", show understanding, and end with a request.',
        'Avoid "always", "never" and verdicts about character.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Start soft: one specific moment, how it affected you, their pressure, a request. No "always", no "never".',
    },
  ],
  apply: {
    scenario: 'Opening the conversation.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Harsh start or soft start?',
        groups: ['Harsh', 'Soft'],
        items: [
          { text: '"You always shout."', group: 0 },
          { text: '"When the volume went up on Thursday, I found it hard to think."', group: 1 },
          { text: '"Sort your temper out."', group: 0 },
          { text: '"Could we agree a better way to flag problems?"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Gottman find about the start of conflict conversations?',
        options: [
          { text: 'Starts don\'t matter', why: 'They strongly predict the ending.' },
          { text: 'How they start strongly predicts how they end' },
          { text: 'Harsh starts work best', why: 'They tend to end badly.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of Grace\'s soft start to its job.',
        pairs: [
          ['"About Thursday"', 'One specific moment'],
          ['"I found it hard to think"', 'Her own experience'],
          ['"The 14th is stressful"', 'His pressure'],
          ['"Could we agree a way...?"', 'A request'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'But he really does shout a lot. Isn\'t "always" just honest?',
        prompt: "Priya's best reply?",
        options: [
          { text: 'Yes, say always.', why: 'It invites defence.' },
          { text: 'Then say "never" too.', why: 'Same problem.' },
          { text: '"Always" gives him something to argue with ("not always!"). Talk about Thursday. One clear moment is harder to dispute.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Words to avoid.',
        template: 'Avoid "[[1]]", "[[2]]" and verdicts about character.',
        blanks: [['always'], ['never']],
        distractors: ['please', 'thanks'],
      },
      {
        kind: 'mcq',
        prompt: 'Which is an "I" statement about a specific moment?',
        options: [
          { text: '"When the volume went up on Thursday, I found it hard to think."' },
          { text: '"You\'re aggressive."', why: 'That\'s a verdict about him.' },
          { text: '"Everyone thinks you shout."', why: 'Vague and about others.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Grace\'s draft opener is harsh?',
        lines: [
          'Can I talk to you about Thursday?',
          'When the volume went up, I found it hard to think.',
          'Honestly, you\'re impossible to work with.',
          'Could we agree a better way to flag problems?',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'A verdict on his character starts a fight.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the harsh start, how many seconds before the conversation is lost?',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a soft start.',
        lines: ['Ask to talk about one moment', 'Say how it affected you', 'Show you understand their pressure', 'Make a request'],
      },
      {
        kind: 'sortGroups',
        prompt: 'About one moment, or a sweeping claim?',
        groups: ['One moment', 'Sweeping'],
        items: [
          { text: '"In Thursday\'s review..."', group: 0 },
          { text: '"Every single week..."', group: 1 },
          { text: '"When you said X yesterday..."', group: 0 },
          { text: '"You\'re just like that."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write a soft start for a conversation you need to have: one moment, how it affected you, their pressure, a request.',
    starters: ['Can I talk to you about...', 'Could we...'],
  },
  deepen: {
    title: 'The first three minutes',
    summary: 'In his studies of couples, Gottman reported that the outcome of a conflict discussion could often be predicted from its first three minutes. Workplace conversations follow similar patterns.',
  },
  notes: 'Gottman: harsh vs softened start-up; outcomes predictable from the first ~3 minutes of a conflict discussion (couples research, e.g. Gottman, Coan, Carrere & Swanson 1998, Journal of Marriage and the Family 60). Extension to work conversations is an analogy.',
};

export default lesson;
