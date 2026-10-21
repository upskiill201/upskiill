import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Reading: "I am excited". */
const lesson: OriginalLesson = {
  key: 'l04',
  title: '"I am excited"',
  summary: 'Lucía keeps telling herself to calm down. It never works. Sofía sends her a study that suggests a different sentence.',
  minutes: 12,
  outcomes: [
    'Know what Brooks (2014) found about nerves',
    'Reframe nerves as excitement',
    'Build a short pre-talk routine',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Calm down, or get excited?',
      html: '<p>When we\'re nervous, most of us try to calm down. Harvard researcher Alison Wood Brooks tested another idea in 2014.</p><ul><li>Before giving a short public speech, some participants said <strong>"I am excited"</strong> and others said <strong>"I am calm"</strong>.</li><li>Those who said "I am excited" were rated by others as <strong>more persuasive, competent and confident</strong>.</li></ul><p>Her explanation: anxiety and excitement feel similar in the body, both high-energy. Going from anxious to calm is a big jump. Going from anxious to excited is a small one: you keep the energy and change its meaning.</p><p>A pre-talk routine Lucía builds from it:</p><ol><li>Notice the racing heart. Don\'t fight it.</li><li>Say, out loud or in your head: "I am excited."</li><li>Say your first sentence, which you know by heart.</li></ol>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Nerves and excitement feel alike. Try "I am excited" instead of "calm down", then say your first line.',
    },
  ],
  apply: {
    scenario: 'Nerves.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'In which year did Brooks publish the study?',
        answers: ['2014'],
        placeholder: 'A year',
      },
      {
        kind: 'mcq',
        prompt: 'What did people who said "I am excited" get rated as?',
        options: [
          { text: 'More persuasive, competent and confident' },
          { text: 'More nervous', why: 'More persuasive and confident.' },
          { text: 'No different', why: 'They were rated better.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Small jump or big jump?',
        groups: ['Small jump', 'Big jump'],
        items: [
          { text: 'Anxious to excited', group: 0 },
          { text: 'Anxious to calm', group: 1 },
          { text: 'Keeping the energy, changing its meaning', group: 0 },
          { text: 'Trying to switch off all energy', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the routine step to what you do.',
        pairs: [
          ['Step 1', 'Notice the racing heart'],
          ['Step 2', 'Say "I am excited"'],
          ['Step 3', 'Say your first line'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'But I\'m not excited. I\'m terrified.',
        prompt: "Sofía\'s best reply?",
        options: [
          { text: 'Your body can\'t tell the difference much. Same racing heart. Calling it excitement uses the energy instead of fighting it.' },
          { text: 'Then don\'t do the talk.', why: 'Reframe the nerves.' },
          { text: 'Just calm down.', why: 'That\'s the big jump.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The reframe.',
        template: 'Say "I am [[1]]" instead of "[[2]] down".',
        blanks: [['excited'], ['calm']],
        distractors: ['tired', 'sit'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is anxious-to-excited easier than anxious-to-calm?',
        options: [
          { text: 'Both are high-energy states, so less has to change' },
          { text: 'Excitement is a medicine', why: 'They feel alike in the body.' },
          { text: 'It isn\'t easier', why: 'Both are high-energy.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Lucía\'s routine works against the research?',
        lines: [
          'Notice the racing heart.',
          'Say "I am excited."',
          'Tell myself over and over: "Calm down, calm down."',
          'Say my first line.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Fighting the energy is the big jump.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'At which university was Brooks a researcher? (one word)',
        answers: ['Harvard', 'harvard'],
        placeholder: 'A university',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s pre-talk routine.',
        lines: ['Notice the racing heart', 'Say "I am excited"', 'Say the first line'],
      },
    ],
  },
  reflect: {
    prompt: 'Next time you feel nervous before speaking, try "I am excited". What changed?',
    starters: ['I felt...', 'It changed...'],
  },
  deepen: {
    title: 'Reappraisal',
    summary: 'Psychologists call this reappraisal: changing how you interpret a feeling rather than trying to remove it. It\'s one of the better-studied ways to manage nerves.',
  },
  notes: 'Brooks (2014), Journal of Experimental Psychology: General, "Get excited: reappraising pre-performance anxiety as excitement": "I am excited" speakers rated more persuasive, competent, confident and persistent than "I am calm".',
};

export default lesson;
