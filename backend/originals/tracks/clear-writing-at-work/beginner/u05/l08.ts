import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Myth or fact: hard messages. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Myth or fact: hard messages',
  summary: 'Four things people believe about tone, bad news and difficult emails. Which ones survive the research?',
  minutes: 11,
  outcomes: [
    'Separate hard-message myths from facts',
    'Know how well tone travels by email',
    'Write hard messages with fewer surprises',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'People can usually tell your tone from an email.',
          isFact: false,
          explain: 'Myth. Kruger and colleagues (2005) found senders expected about 78% of readers to read their tone correctly; only about 56% did, barely better than chance.',
        },
        {
          text: 'People tend to put off passing on bad news.',
          isFact: true,
          explain: 'Fact. Researchers call it the MUM effect (Rosen and Tesser, 1970). It\'s common, which is why it helps to plan for it.',
        },
        {
          text: 'Feedback always helps, as long as it\'s honest.',
          isFact: false,
          explain: 'Myth. Kluger and DeNisi (1996) found about a third of feedback made performance worse, often when it focused on the person.',
        },
        {
          text: 'A clear no with an alternative is usually more useful than a vague maybe.',
          isFact: true,
          explain: 'Fact, in practice. A clear no lets the other person plan. A maybe leaves them waiting.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Tone travels badly by email. Say what you mean in plain words, and check how it reads.',
    },
  ],
  apply: {
    scenario: 'Hard-message myths.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'In Kruger\'s study, about what percentage of readers read the tone correctly?',
        answers: ['56', '56%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What did senders expect in Kruger\'s study?',
        options: [
          { text: 'About 78% of readers to get their tone right' },
          { text: 'Nobody to get it right', why: 'They were overconfident.' },
          { text: 'Exactly 56%', why: 'That was the actual result.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Tone comes through clearly in email', group: 0 },
          { text: 'People put off bad news', group: 1 },
          { text: 'All honest feedback helps', group: 0 },
          { text: 'A clear no helps people plan', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the research to its finding.',
        pairs: [
          ['Kruger et al. (2005)', 'Tone is misread by email'],
          ['Rosen and Tesser (1970)', 'The MUM effect'],
          ['Kluger and DeNisi (1996)', 'Some feedback backfires'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'I wrote "Great, another delay." It was a joke. Why is Felix upset?',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: 'Jokes rarely survive email. He only had the words, and the words sound annoyed. Maybe send a quick line to clear it up.' },
          { text: 'Felix has no sense of humour.', why: 'Tone gets lost in email.' },
          { text: 'Add more jokes next time.', why: 'Plain words are safer.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The callout.',
        template: 'Tone travels [[1]] by email. Say what you [[2]].',
        blanks: [['badly'], ['mean']],
        distractors: ['well', 'feel'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does feedback sometimes make things worse?',
        options: [
          { text: 'It can focus attention on the person instead of the task' },
          { text: 'It\'s always too short', why: 'Focus is the issue.' },
          { text: 'It never does', why: 'About a third backfired.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which belief in this list is the myth?',
        lines: [
          'People often put off bad news.',
          'A clear no helps people plan.',
          'Readers will hear my friendly tone in this email.',
          'Feedback about the task tends to help more.',
        ],
        bug: 2,
        fix: 'Say "friendly" in plain words if it matters.',
        explanation: 'Tone is often misread by email.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to make tone clear in writing.',
        lines: ['Say what you mean plainly', 'Cut sarcasm and jokes', 'Read it as the reader', 'Fix any line that stings'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was the MUM effect paper published?',
        answers: ['1970'],
        placeholder: 'A year',
      },
    ],
  },
  reflect: {
    prompt: 'Has someone misread your tone in a message? What words would have made it clear?',
    starters: ['They read it as...', 'I should have written...'],
  },
  deepen: {
    title: 'Egocentrism over email',
    summary: 'Kruger\'s team called the effect egocentrism: we hear our own tone in our heads, so we assume readers hear it too. Plain words close the gap.',
  },
  notes: 'Kruger, Epley, Parker & Ng (2005), JPSP, "Egocentrism over e-mail": senders predicted ~78% accuracy in tone; actual ~56%. Rosen & Tesser (1970), MUM effect. Kluger & DeNisi (1996).',
};

export default lesson;
