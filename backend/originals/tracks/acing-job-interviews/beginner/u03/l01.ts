import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story: "Tell me about a time..." */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"Tell me about a time..."',
  summary: 'Wanjiru asks: "Tell me about a time you disagreed with a teammate." Remi has a perfect story, the database argument in his group project, and it comes out as a tangle.',
  minutes: 11,
  outcomes: [
    'Recognise behavioural questions',
    'See why good stories get told badly',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The tangle',
      beats: [
        { speaker: 'narrator', text: '"Tell me about a time you disagreed with a teammate." Remi remembers Kevin, who wanted to rewrite their project from scratch.' },
        { speaker: 'remi', text: '"So, Kevin... well, it was third year... the database was, um... we kind of sorted it out? It was fine in the end."' },
        { speaker: 'narrator', text: 'Wanjiru waits. "What did you do, specifically?" Remi can\'t remember the details under pressure.' },
        { speaker: 'ada', text: '(that evening) That\'s a great story told badly. You need it ready: what happened, what you did, how it ended.' },
        { speaker: 'tey', text: 'This chapter: STAR, a bank of six stories, numbers, honesty, and why interviewers ask about the past.' },
      ],
      choice: {
        prompt: 'What was missing from Remi\'s answer?',
        options: [
          { text: 'What he specifically did, and how it turned out', outcome: 'Exactly. The interviewer can only score actions and results she can hear.', best: true },
          { text: 'More detail about Kevin\'s personality', outcome: 'That would make it about Kevin, not Remi.' },
          { text: 'A joke to lighten it', outcome: 'The problem was structure, not mood.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: '"Tell me about a time..." wants a real story: what happened, what you did, and how it ended.',
    },
  ],
  apply: {
    scenario: 'The tangle.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'A behavioural question, or not?',
        groups: ['Behavioural', 'Not'],
        items: [
          { text: '"Tell me about a time you disagreed with a teammate."', group: 0 },
          { text: '"What\'s your degree?"', group: 1 },
          { text: '"Describe a time you missed a deadline."', group: 0 },
          { text: '"Where are you based?"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Wanjiru ask when Remi\'s answer was vague?',
        options: [
          { text: '"What did you do, specifically?"' },
          { text: '"Who is Kevin?"', why: 'She wanted his actions.' },
          { text: '"Next question."', why: 'She gave him a second chance.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the missing part to what it should say.',
        pairs: [
          ['What happened', 'Kevin wanted to rewrite the project'],
          ['What Remi did', 'His specific actions'],
          ['How it ended', 'The result'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'I knew the story. I just couldn\'t tell it under pressure.',
        prompt: "Ada's best reply?",
        options: [
          { text: 'That\'s normal. Under pressure you need the story already shaped. Prepare it once, and it\'s there when you need it.' },
          { text: 'You should have made one up.', why: 'Never invent stories.' },
          { text: 'Behavioural questions are unfair.', why: 'They\'re very common; prepare for them.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: 'What happened, what you [[1]], and how it [[2]].',
        blanks: [['did'], ['ended']],
        distractors: ['felt', 'started'],
      },
      {
        kind: 'mcq',
        prompt: 'Why was "we kind of sorted it out" weak?',
        options: [
          { text: 'It hides Remi\'s actions and gives no result' },
          { text: 'It\'s too modest', why: 'It\'s too vague.' },
          { text: 'It\'s fine', why: 'There\'s nothing to score.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this retelling is still vague?',
        lines: [
          'In our third-year project, Kevin wanted to rewrite it all.',
          'We had three weeks left.',
          'Anyway, stuff happened and it worked out.',
          'We submitted on time and got an A-minus.',
        ],
        bug: 2,
        fix: 'I suggested we test both designs for two days.',
        explanation: 'It skips what Remi did.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter covers.',
        lines: ['STAR', 'A bank of six stories', 'Numbers', 'Honesty', 'Why they ask about the past'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What was the name of Remi\'s teammate in the story?',
        answers: ['Kevin', 'kevin'],
        placeholder: 'A name',
      },
      {
        kind: 'sortGroups',
        prompt: 'About Remi\'s actions, or about someone else?',
        groups: ['Remi\'s actions', 'Someone else'],
        items: [
          { text: '"I suggested we test both."', group: 0 },
          { text: '"Kevin is very stubborn."', group: 1 },
          { text: '"I set up the comparison."', group: 0 },
          { text: '"The lecturer was strict."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you disagreed with someone at school or work. Can you say what you did and how it ended?',
    starters: ['The disagreement was...', 'I...', 'In the end...'],
  },
  deepen: {
    title: 'Behavioural questions',
    summary: 'Questions starting "Tell me about a time..." or "Give an example of..." are behavioural questions. They\'re among the most common in interviews, so they\'re worth preparing for.',
  },
  notes: 'Fictional: Remi\'s third-year group project with Kevin (narrated).',
};

export default lesson;
