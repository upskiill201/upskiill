import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Reading: nerves. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Nerves',
  summary: 'Shaking hands, a dry mouth, a racing heart. Ada sends Remi what research actually says about interview nerves, including one popular trick that didn\'t hold up.',
  minutes: 12,
  outcomes: [
    'Know how nerves affect interviews',
    'Use techniques that the evidence supports',
    'Drop a popular trick that failed to replicate',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'What helps with nerves',
      html: '<p><strong>Nerves affect performance.</strong> Julie McCarthy and Richard Goffin (2004) found that people with higher interview anxiety tended to score lower in interviews. So it\'s worth managing.</p><p><strong>Call it excitement.</strong> Alison Wood Brooks (2014) found that people who said "I am excited" before stressful tasks did better than those who tried to calm down. Nerves and excitement feel similar in the body; the label changes the focus.</p><p><strong>They can\'t see it as much as you think.</strong> Kenneth Savitsky and Thomas Gilovich (2003) called this the <em>illusion of transparency</em>: speakers believe their nerves are obvious, but listeners notice far less. When speakers were told this, they felt calmer and their speeches were rated better.</p><p><strong>Power posing didn\'t hold up.</strong> A famous 2010 study claimed two minutes in a "power pose" changed hormones and risk-taking. A larger 2015 replication by Eva Ranehill and colleagues found no hormone or behaviour effect, and one of the original authors later said she no longer believed the effects were real. Standing tall may make you <em>feel</em> a bit more powerful, but don\'t rely on it.</p><p><strong>What works best:</strong> preparation, practice out loud, sleep, arriving early, and a slow breath before you start.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Say "I\'m excited", remember they can\'t see your nerves as much as you think, and prepare. Don\'t count on power poses.',
    },
  ],
  apply: {
    scenario: 'Nerves.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Brooks (2014) find helped before stressful tasks?',
        options: [
          { text: 'Saying "I am excited"' },
          { text: 'Saying "I am calm"', why: 'Excitement worked better.' },
          { text: 'Power posing', why: 'That\'s a different study, which didn\'t replicate.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Supported by evidence, or not reliable?',
        groups: ['Supported', 'Not reliable'],
        items: [
          { text: 'Reframing nerves as excitement', group: 0 },
          { text: 'Power posing to change hormones', group: 1 },
          { text: 'Knowing nerves are less visible than you think', group: 0 },
          { text: 'Thinking about the worst outcome all night', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the finding to the researchers.',
        pairs: [
          ['Anxiety links to lower interview scores', 'McCarthy and Goffin (2004)'],
          ['Say "I am excited"', 'Brooks (2014)'],
          ['Illusion of transparency', 'Savitsky and Gilovich (2003)'],
          ['Power-pose replication failed', 'Ranehill and colleagues (2015)'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Everyone will see my hands shaking.',
        prompt: "Ada's best reply?",
        options: [
          { text: 'They\'ll notice much less than you think. That\'s the illusion of transparency. And knowing it actually helps.' },
          { text: 'Yes, they\'ll all see.', why: 'Research says much less than you think.' },
          { text: 'Sit on your hands.', why: 'Just breathe and carry on.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The illusion.',
        template: 'Speakers think their [[1]] are obvious; listeners notice far [[2]].',
        blanks: [['nerves'], ['less']],
        distractors: ['shoes', 'more'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was the power-pose replication published?',
        answers: ['2015'],
        placeholder: 'A year',
      },
      {
        kind: 'mcq',
        prompt: 'What does the lesson say works best overall?',
        options: [
          { text: 'Preparation, practice out loud, sleep, arriving early, a slow breath' },
          { text: 'Power poses in the bathroom', why: 'Not reliable.' },
          { text: 'Not thinking about it at all', why: 'Preparation helps more.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s nerves plan relies on a myth?',
        lines: [
          'Sleep well on Sunday.',
          'Arrive 20 minutes early.',
          'Do a two-minute power pose to boost my hormones.',
          'Say "I\'m excited" before I go in.',
        ],
        bug: 2,
        fix: 'Take a slow breath before I go in.',
        explanation: 'The hormone effect didn\'t replicate.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did McCarthy and Goffin publish their interview-anxiety research?',
        answers: ['2004'],
        placeholder: 'A year',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Remi\'s morning routine.',
        lines: ['Sleep well the night before', 'Arrive early', 'Slow breath', 'Say "I\'m excited"', 'Walk in'],
      },
    ],
  },
  reflect: {
    prompt: 'What do your nerves feel like before something important? Which of these techniques will you try?',
    starters: ['My nerves feel like...', 'I\'ll try...'],
  },
  deepen: {
    title: 'Replication',
    summary: 'Science corrects itself when studies are repeated. Power posing is a good example: a famous result that didn\'t hold up. It\'s why this course checks claims before teaching them.',
  },
  notes: 'McCarthy & Goffin (2004), "Measuring job interview anxiety", Personnel Psychology 57(3). Brooks (2014), JEP: General 143(3). Savitsky & Gilovich (2003), "The illusion of transparency and the alleviation of speech anxiety", JESP 39(6). Carney, Cuddy & Yap (2010), Psychological Science; Ranehill et al. (2015), Psychological Science 26(5); Carney\'s 2016 statement disavowing the effects.',
};

export default lesson;
