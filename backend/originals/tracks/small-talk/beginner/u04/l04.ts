import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Before/After: "So what do you do?" — a career-changer's answer that starts conversations. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: '"So what do you do?"',
  summary: 'The most common question at any event. Grace\'s answer at the meetup: "Oh, I\'m just a junior researcher, I used to be a nurse, it\'s a long story, I\'m not really a tech person." The conversation died on "just".',
  minutes: 12,
  outcomes: [
    'Answer "What do you do?" in one or two interesting sentences',
    'Turn a career change into a hook, not an apology',
    'Ask the question back in a better way',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Grace\'s answer, before and after',
      before: {
        label: 'The apology',
        text: '"Oh, I\'m just a junior researcher. I used to be a nurse. It\'s a long story. I\'m not really a tech person, I\'m still learning, sorry."',
      },
      after: {
        label: 'The hook',
        text: '"I make sure the Kinwell hospital app actually works for patients. I was a nurse for eighteen years, so I know exactly what happens when it doesn\'t. What about you?"',
      },
      notes: [
        '"Just" and "sorry" disappeared. They shrink you before the other person has a chance to be interested.',
        'Job title became what she DOES and who it helps: much easier to ask about.',
        'The career change became her strongest hook, not a confession.',
        'It ends with a question back.',
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>A good \"what do you do\" answer:</strong></p><ol><li><strong>What you do and who it helps</strong>, in plain words: \"I help small shops sell online\" beats \"I'm an e-commerce operations associate\".</li><li><strong>One interesting detail:</strong> a past life, a surprising part of the job, a current project.</li><li><strong>A question back.</strong></li></ol><p><strong>Asking it better:</strong> \"What do you do?\" can feel like ranking people by job. Friendlier versions: \"What are you working on at the moment?\" or \"What brings you here tonight?\" They work for people who are between jobs, studying, retired or caring for family, too.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'What you do + who it helps + one interesting detail + a question back. No "just", no "sorry".',
    },
  ],
  apply: {
    scenario: 'Preparing for meetup number two.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What killed Grace\'s first answer?',
        options: [
          { text: 'Mentioning nursing', why: 'Nursing is her best hook.' },
          { text: 'It was too short', why: 'Length wasn\'t the problem; the apologies were.' },
          { text: 'Shrinking words like "just" and "sorry", and no question back' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Build Grace\'s answer in order.',
        lines: ['I make sure the Kinwell app works for patients.', 'I was a nurse for eighteen years, so I know what happens when it doesn\'t.', 'What about you?'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Hook, or shrink?',
        groups: ['Hook', 'Shrink'],
        items: [
          { text: 'I help clinics run on time.', group: 0 },
          { text: 'I\'m just an intern.', group: 1 },
          { text: 'I used to be a nurse, now I fix the systems.', group: 0 },
          { text: 'It\'s boring, you don\'t want to know.', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(A stranger at the meetup) "So what do you do?"',
        prompt: 'Grace\'s new answer?',
        options: [
          { text: 'I make sure our hospital app actually works for patients. Eighteen years as a nurse helps. What about you?' },
          { text: 'Just a junior researcher, sorry.', why: 'The apology.' },
          { text: 'Long story.', why: 'Closes the door.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Grace\'s career change is now her strongest ___, not a confession. (one word)',
        answers: ['hook'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Which question works best for someone who might be between jobs or caring for family?',
        options: [
          { text: '"What do you do?"', why: 'It can feel like being ranked by job.' },
          { text: '"What brings you here tonight?"' },
          { text: '"Where do you work?"', why: 'Same issue.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Femi\'s answer to "What do you do?". Which line is jargon soup?',
        lines: [
          'I build the bit of the app that books appointments.',
          'I leverage scalable full-stack synergies across the patient journey.',
          'Basically, I\'m why you don\'t wait on hold for an hour. What about you?',
        ],
        bug: 1,
        fix: 'Delete it: the plain lines say it better.',
        explanation: 'Jargon makes people nod and drift away. Plain words and who it helps make them ask more.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Stand in the gap', 'Joining an open group'],
          ['Listen first', 'Learn the topic before speaking'],
          ['Pause at the door', 'Look calm, scan the room'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Write your own formula.',
        template: 'I [[1]] (what you do) for [[2]] (who it helps). [[3]] about you?',
        blanks: [['help', 'make', 'build'], ['patients', 'people', 'clients', 'customers'], ['What']],
        distractors: ['just', 'sorry'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a friendlier version of "What do you do?"',
        tiles: ['What', 'are', 'you', 'working', 'on', 'at', 'the', 'moment?'],
        distractors: ['earn', 'rank'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your answer to "So what do you do?" with what you do, who it helps, one interesting detail and a question back. No "just".',
    starters: ['I...', 'For...', 'One interesting thing:...', 'What about you?'],
  },
  deepen: {
    title: 'Say it out loud',
    summary: 'Say your new answer out loud five times. It will feel strange. Then use it at the next event. The first time you hear "Oh, interesting, tell me more", you\'ll keep it forever.',
  },
  notes: 'Practical advice; "what are you working on" as a more inclusive alternative to job-ranking questions is common guidance. Femi\'s jargon line echoes the Corporate Jargon course.',
};

export default lesson;
