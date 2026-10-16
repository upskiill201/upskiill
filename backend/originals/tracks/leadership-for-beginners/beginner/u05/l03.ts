import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Reading: managing up (Gabarro & Kotter, "Managing Your Boss", HBR 1980). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Managing up',
  summary: 'The plan is on the whiteboard. Now Lucía has to call Carmen, in Monterrey, between two meetings. Her stomach drops. Tey sends her two minutes of reading first.',
  minutes: 12,
  outcomes: [
    'Know what "managing up" really means',
    'Bring your boss problems with a plan, not just problems',
    'Learn how your boss likes to get information',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Your boss is part of your job',
      html: "<p>In 1980, Harvard professors <strong>John Gabarro</strong> and <strong>John Kotter</strong> wrote a famous article called <em>Managing Your Boss</em>. Their point: the relationship with your boss is one of mutual dependence. You need their support and resources. They need your honest information and good work. So it's worth managing that relationship on purpose. Not sucking up. Managing.</p><h3>Know how they like to receive things</h3><p>Gabarro and Kotter noticed some bosses are <strong>readers</strong> (they want it written first) and some are <strong>listeners</strong> (they want to talk it through). Carmen is a listener: she wants a two-minute call, then the details in writing.</p><h3>No surprises</h3><p>Bosses hate hearing bad news from someone else. Tell them early, even when you don't have every answer yet. Remember Tomás and the newsletter: the earlier, the better. That works upwards too.</p><h3>Bring the problem, the plan and the ask</h3><p>A useful shape for bad news:</p><ul><li><strong>What happened</strong>, in one sentence.</li><li><strong>What we're doing</strong> about it.</li><li><strong>What I need from you</strong>, if anything: a decision, a budget, a phone call.</li></ul><h3>Be honest about what you don't know</h3><p>\"We'll know by 5 p.m. if the stickers can arrive in time\" beats a confident guess that turns out wrong.</p>",
    },
    {
      kind: 'check',
      question: 'What\'s the useful shape for bringing your boss bad news?',
      options: ['What happened, what we\'re doing, what I need', 'Every detail, from the start', 'Wait until it\'s solved'],
      answer: 0,
      explanation: 'Short, early, with a plan and a clear ask.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'No surprises. What happened, what we\'re doing, what I need. Say what you don\'t know yet. Match how they like to hear things.',
    },
  ],
  apply: {
    scenario: 'Before calling Carmen.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does "managing up" mean, for Gabarro and Kotter?',
        options: [
          { text: 'Flattering your boss', why: 'Not that.' },
          { text: 'Doing your boss\'s job', why: 'It\'s about working well together.' },
          { text: 'Deliberately managing a relationship of mutual dependence with your boss' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Lucía\'s call to Carmen in order.',
        lines: ['What happened', 'What we\'re doing', 'What I need from you', 'When you\'ll hear more'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good managing up, or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Telling her the same day', group: 0 },
          { text: 'Hoping she doesn\'t find out', group: 1 },
          { text: 'Bringing a plan with the problem', group: 0 },
          { text: 'A confident guess that turns out wrong', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'carmen',
        message: 'Hi Lucía, I\'ve got two minutes. What\'s up?',
        prompt: 'Lucía\'s best opening?',
        options: [
          { text: 'So, it\'s a long story, it started on Tuesday when...', why: 'Two minutes gone before she knows the problem.' },
          { text: 'Half the bags have a wrong barcode. We have a sticker plan. I need you to approve a rush printing cost. Details by email.' },
          { text: 'Nothing, all good! Just checking in.', why: 'A surprise later is much worse.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The number one rule when managing up: no ___. (one word)',
        answers: ['surprises', 'Surprises'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the boss type to what they want.',
        pairs: [
          ['Reader', 'Written first'],
          ['Listener', 'Talk it through first'],
          ['Carmen', 'Two-minute call, then email'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Lucía doesn\'t know yet if the stickers will arrive in time. What should she say?',
        options: [
          { text: '"We\'ll know by 5 p.m. I\'ll call you then."' },
          { text: '"Definitely, no problem."', why: 'A guess dressed as a promise.' },
          { text: '"No idea."', why: 'True but unhelpful. Say when you\'ll know.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s email after the call. Which line breaks the advice?',
        lines: [
          'What happened: wrong barcode on about 20,000 bags.',
          'What we\'re doing: lots of things, it\'s all in hand.',
          'What I need: approval for rush stickers by 4 p.m.',
        ],
        bug: 1,
        fix: 'What we\'re doing: supplier prints stickers; the team re-labels Saturday.',
        explanation: '"Lots of things" tells her nothing. Say the plan.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The shape.',
        template: 'What [[1]], what we\'re [[2]], what I [[3]].',
        blanks: [['happened'], ['doing'], ['need']],
        distractors: ['hope', 'hide'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s promise.',
        tiles: ['I\'ll', 'call', 'you', 'at', '5.'],
        distractors: ['maybe'],
      },
    ],
  },
  reflect: {
    prompt: 'Is your boss, teacher or coach a reader or a listener? How do they like to hear bad news? How could you bring it better next time?',
    starters: ['They\'re a...', 'Next time I\'d...'],
  },
  deepen: {
    title: 'Ask your boss',
    summary: 'Ask the person you report to: "When something goes wrong, how would you like to hear about it?" Their answer saves you a hard moment later.',
  },
  notes: 'John J. Gabarro & John P. Kotter (1980), "Managing Your Boss", Harvard Business Review (reprinted 2005): mutual dependence, readers vs listeners, no surprises, honest information. Problem/plan/ask shape reflects standard escalation guidance.',
};

export default lesson;
