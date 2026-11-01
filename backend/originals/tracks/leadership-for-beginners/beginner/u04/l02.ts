import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Reading: feedback that helps (CCL Situation-Behaviour-Impact; Kluger & DeNisi 1996). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Feedback that helps',
  summary: 'Lucía has 3 hours until her 4 p.m. with Diego. Her first draft: "You were really disrespectful today." Tey: "Accurate feeling. Bad feedback. Read this first."',
  minutes: 12,
  outcomes: [
    'Know why a lot of feedback makes things worse',
    'Use Situation, Behaviour, Impact',
    'Describe what someone did, not who they are',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Why most feedback misses',
      html: "<p>Here's a surprise. In 1996, researchers <strong>Avraham Kluger</strong> and <strong>Angelo DeNisi</strong> reviewed hundreds of studies on feedback. Feedback improved performance on average, but in about <strong>a third</strong> of cases, it made performance <em>worse</em>. The feedback that backfired most was the kind that turned attention to the person (\"you're careless\") instead of the task.</p><h3>Situation, Behaviour, Impact</h3><p>The Center for Creative Leadership teaches a simple model called <strong>SBI</strong>:</p><ul><li><strong>Situation:</strong> when and where. \"In this morning's review...\"</li><li><strong>Behaviour:</strong> what they actually did or said, something a camera could record. \"...when Sofía shared the map idea, you said 'Cute, maybe for the kids' menu', and people laughed.\"</li><li><strong>Impact:</strong> what happened as a result. \"Sofía closed her laptop and didn't say another word. I worry she won't share ideas again.\"</li></ul><p>CCL later added a fourth step: ask about their <strong>intent</strong>. \"What did you mean by it?\" Most people don't mean the harm they cause.</p><h3>Behaviour, not character</h3><p>\"You were disrespectful\" is a label. People argue with labels. They can't argue with \"you said these words, and this happened.\" It's also something they can change.</p><h3>Soon, and often</h3><p>Feedback works best close to the moment. A comment from today is fixable today. Saved up for a review in three months, it becomes a surprise and a grudge.</p>",
    },
    {
      kind: 'check',
      question: 'Which is a Behaviour, in SBI terms?',
      options: ['"You said \'Cute, maybe for the kids\' menu\'."', '"You were rude."', '"You don\'t respect Sofía."'],
      answer: 0,
      explanation: 'A camera could record it. The other two are labels and guesses.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Situation, Behaviour, Impact, then ask their intent. What they did, not who they are. Soon, not saved up.',
    },
  ],
  apply: {
    scenario: 'Three hours before 4 p.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Kluger and DeNisi find?',
        options: [
          { text: 'Feedback always helps', why: 'Not always. A third backfired.' },
          { text: 'In about a third of cases, feedback made performance worse' },
          { text: 'Feedback never helps', why: 'On average it helped.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the SBI step to Lucía\'s words.',
        pairs: [
          ['Situation', '"In this morning\'s review..."'],
          ['Behaviour', '"You said \'Cute, maybe for the kids\' menu\'."'],
          ['Impact', '"Sofía stopped talking."'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Behaviour or label?',
        groups: ['Behaviour', 'Label'],
        items: [
          { text: '"You interrupted her twice."', group: 0 },
          { text: '"You\'re disrespectful."', group: 1 },
          { text: '"You laughed at her idea."', group: 0 },
          { text: '"You\'re a bully."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Draft: "You were really disrespectful today."',
        prompt: 'What does Tey suggest?',
        options: [
          { text: '"In the review, when Sofía shared the map, you said \'kids\' menu\' and people laughed. She went quiet. What did you mean by it?"' },
          { text: '"You were EXTREMELY disrespectful."', why: 'A stronger label is still a label.' },
          { text: 'Say nothing; he\'ll figure it out.', why: 'He won\'t, and the team watched.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'SBI stands for Situation, Behaviour, ___. (one word)',
        answers: ['Impact', 'impact'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why ask about intent?',
        options: [
          { text: 'To give him an excuse', why: 'The impact still matters.' },
          { text: 'To catch him out', why: 'It\'s genuine curiosity.' },
          { text: 'Most people don\'t mean the harm they cause, and asking opens a real conversation' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s second draft. Which line breaks SBI?',
        lines: [
          'In this morning\'s review, when Sofía shared the map...',
          '...you showed what kind of person you really are.',
          'She closed her laptop and didn\'t speak again.',
        ],
        bug: 1,
        fix: '...you said "Cute, maybe for the kids\' menu", and people laughed.',
        explanation: 'That\'s a judgement of his character. Describe what he said instead.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put SBI with intent in order.',
        lines: ['Situation', 'Behaviour', 'Impact', 'Ask their intent'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'What they [[1]], not who they [[2]]. Soon, not [[3]] up.',
        blanks: [['did'], ['are'], ['saved']],
        distractors: ['feel', 'shown'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the intent question.',
        tiles: ['What', 'did', 'you', 'mean', 'by', 'it?'],
        distractors: ['Why'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of feedback you need to give someone. Write it in SBI: Situation, Behaviour, Impact. Then write the intent question.',
    starters: ['Situation: ...', 'Behaviour: ...', 'Impact: ...'],
  },
  deepen: {
    title: 'The camera test',
    summary: 'Before giving feedback, check every word: could a camera have recorded it? If not, it\'s a label. Swap it for what they actually did.',
  },
  notes: 'Avraham N. Kluger & Angelo DeNisi (1996), "The Effects of Feedback Interventions on Performance", Psychological Bulletin 119(2): meta-analysis; average positive effect but over one-third of effects negative; feedback directing attention to the self tended to harm. Center for Creative Leadership: Situation-Behavior-Impact (SBI) and SBI + Intent (SBII).',
};

export default lesson;
