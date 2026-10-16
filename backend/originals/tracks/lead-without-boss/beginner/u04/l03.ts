import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Reading: escalating without burning bridges. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Escalate the problem, not the person',
  summary: 'The freeze still blocks two days. Only the Head of IT can grant an exception. Remi will need Brian\'s help. But Monday showed him what a bad escalation looks like. On the way home, he reads how to do it well.',
  minutes: 12,
  outcomes: [
    'Know when it\'s right to escalate',
    'Escalate a problem without blaming a person',
    'Bring the other person with you, not behind their back',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Going up, the right way',
      html: "<p><strong>Escalating</strong> means asking someone more senior to help with a blocker you can't clear yourself. Done badly, it feels like telling on someone. Done well, it's exactly what sponsors are for (Chapter 1).</p><h3>When to escalate</h3><ul><li>You've tried to solve it at your level, honestly.</li><li>The person you're working with can't solve it either, because it's above both of you.</li><li>Waiting will cost something real: a deadline, a customer, money.</li></ul><h3>How to escalate well</h3><p><strong>1. Tell them first.</strong> \"Felix, the freeze is above both of us. I'd like to ask Brian to raise an exception with your Head of IT. Would you come with me, or would you rather I didn't?\" No surprises, and Felix keeps his dignity.</p><p><strong>2. Escalate the problem, not the person.</strong> Not \"IT is blocking us.\" Instead: \"A company-wide freeze is blocking one small change worth two days for our biggest customer.\"</p><p><strong>3. Bring options and a specific ask.</strong> \"Could we get an exception for this one change, tested by Felix, on a Saturday when traffic is low?\" A specific, small ask is easier to grant.</p><p><strong>4. Say what you've already tried.</strong> It shows you're not running to the boss at the first problem.</p><p><strong>5. Close the loop.</strong> Whatever the answer, tell everyone involved, Felix first.</p><h3>Joint escalation</h3><p>The strongest version: Remi and Felix go <em>together</em>. Two people from two teams asking for the same thing is very hard to dismiss, and nobody looks like they went behind anyone's back.</p>",
    },
    {
      kind: 'check',
      question: 'What\'s the strongest way to escalate the freeze?',
      options: ['Remi and Felix go together, with one specific ask', 'Remi goes alone and blames IT', 'Remi emails Kamau'],
      answer: 0,
      explanation: 'Joint escalation: two teams, one ask, no blame.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Escalate when it\'s above you both and waiting costs. Tell them first. The problem, not the person. Options and one ask. Go together if you can.',
    },
  ],
  apply: {
    scenario: 'The matatu home, reading.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When is it right to escalate?',
        options: [
          { text: 'At the first sign of a problem', why: 'Try at your level first.' },
          { text: 'Never; it\'s telling on people', why: 'Done well, it\'s what sponsors are for.' },
          { text: 'When you\'ve tried, it\'s above both of you, and waiting costs something real' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good escalation or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Telling Felix before going to Brian', group: 0 },
          { text: '"IT is blocking us."', group: 1 },
          { text: 'One small, specific ask', group: 0 },
          { text: 'Going around Felix in secret', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'You\'re going to Brian about the freeze? Are you complaining about me?',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Well, you couldn\'t fix it.', why: 'That IS complaining about him.' },
          { text: 'No, the opposite. It\'s above both of us. I\'d love you to come, so it\'s our ask, not mine.' },
          { text: 'Don\'t worry about it.', why: 'He\'s worried. Explain and include him.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Escalate the problem, not the ___. (one word)',
        answers: ['person', 'Person', 'people'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the line.',
        pairs: [
          ['Tell them first', '"Would you come with me?"'],
          ['Problem, not person', '"A freeze is blocking one small change."'],
          ['Specific ask', '"An exception, tested on a Saturday."'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why say what you\'ve already tried?',
        options: [
          { text: 'It shows you\'re not running to the boss at the first problem' },
          { text: 'To make it longer', why: 'One line is enough.' },
          { text: 'To show off', why: 'It\'s about credibility.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s note to Brian. Which line breaks the advice?',
        lines: [
          'A company-wide freeze is blocking one change worth two days.',
          'Felix hasn\'t been very helpful about it.',
          'Could we ask the Head of IT for one Saturday exception?',
        ],
        bug: 1,
        fix: 'Felix found the change and has offered to test it.',
        explanation: 'Blaming Felix is escalating the person. And it isn\'t even true.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a good escalation in order.',
        lines: ['Try at your level first', 'Tell the other person first', 'Bring the problem, options and one ask', 'Close the loop with everyone'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Tell them [[1]]. Go [[2]] if you can.',
        blanks: [['first'], ['together']],
        distractors: ['never', 'alone'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s invite to Felix.',
        tiles: ['Would', 'you', 'come', 'with', 'me?'],
        distractors: ['against'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a blocker you\'ve been stuck on. Is it above you and the people around you? How would you escalate the problem, not the person?',
    starters: ['The blocker is...', 'I\'d say: "..."'],
  },
  deepen: {
    title: 'Tell them first',
    summary: 'Before you ever go above someone\'s head, tell them first and invite them to come. Notice how differently the conversation goes.',
  },
  notes: 'Escalation practice synthesised from sponsor roles (Kotter), influence without authority (Cohen & Bradford) and standard project-management escalation guidance (escalate issues not individuals; bring options; close the loop). Fictional events.',
};

export default lesson;
