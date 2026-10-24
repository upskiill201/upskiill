import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 19 — the learner's story bank (kit piece 3). Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your story bank',
  summary: 'Your turn. By the end of this lesson you\'ll have the one page Clinton carried into Njangi Pay: your opening answer, six stories, your weakness, your "why us" and your questions.',
  minutes: 12,
  outcomes: ['Write your own one-page story bank', 'Prepare your opening and closing answers', 'Plan how you\'ll practise'],
  learn: [
    {
      kind: 'steps',
      title: 'Kit piece 3: your story bank',
      steps: [
        { title: '1. Your 60-second opener', body: 'Present, past, future, ending on why this kind of role. Write it in three sentences.' },
        { title: '2. Six STAR stories', body: 'A problem you solved, a mistake, working with others, a disagreement, learning fast, taking initiative. Five lines each, with a number.' },
        { title: '3. Your weakness', body: 'A real one, not central to the job, plus what you\'re doing about it. Three sentences.' },
        { title: '4. Your "why us" recipe', body: 'Your story + something specific about them + what you\'d bring. Rewrite it for each company.' },
        { title: '5. Five questions for them, and a practice plan', body: 'Five questions, two starred. Then: three practice sessions out loud before your next interview, at least one with a strict friend.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'One page: opener, six stories, weakness, why us, questions. Practise it out loud three times.',
    },
  ],
  apply: {
    scenario: 'You build your story bank.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the story bank in order.',
        lines: ['60-second opener', 'Six STAR stories', 'Your weakness', 'Your "why us" recipe', 'Questions and practice plan'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which of the six stories?',
        groups: ['Mistake', 'Initiative'],
        items: [
          { text: 'A wrong email I fixed fast', group: 0 },
          { text: 'Started a study group', group: 1 },
          { text: 'A missed deadline I recovered from', group: 0 },
          { text: 'Organised a fundraiser', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What changes for each company?',
        options: [
          { text: 'Your stories become different people\'s', why: 'Your stories stay yours.' },
          { text: 'The "why us" answer' },
          { text: 'Nothing', why: '"Why us" must be specific each time.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'A learner says they have no stories because they\'ve never had a job. What do you tell them?',
        options: [
          { text: 'Invent some.', why: 'Never. Real stories from any part of life work.' },
          { text: 'Skip the story bank.', why: 'Everyone has stories.' },
          { text: 'Use school, volunteering, family, sport or projects. Real situations count, not job titles.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak story bank entry.',
        lines: ['Problem solved: fixed a club\'s sign-up sheet; 40 members use it.', 'Working with others: I\'m a team player.', 'Mistake: wrong date sent; fixed in 10 minutes.'],
        bug: 1,
        explanation: 'A claim, not a story. Use STAR.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its length.',
        pairs: [
          ['Opener', 'About 60 seconds'],
          ['Each STAR story', 'Under two minutes'],
          ['Weakness', 'About 30 seconds'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How many practice sessions does the plan suggest?',
        options: [
          { text: 'Three, out loud, one with a strict friend' },
          { text: 'None', why: 'Practice is what makes it calm.' },
          { text: 'One, in your head', why: 'Out loud, three times.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the "why us" recipe.',
        template: 'Your [[1]] + something specific about [[2]] + what you\'d bring.',
        blanks: [['story'], ['them']],
        distractors: ['salary', 'yourself', 'lunch'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many STAR stories go in the bank? (a number)',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'In the story bank, or not?',
        groups: ['In it', 'Not in it'],
        items: [
          { text: 'Five questions for them', group: 0 },
          { text: 'Trick answers from the internet', group: 1 },
          { text: 'Your weakness, with action', group: 0 },
          { text: 'Someone else\'s stories', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of your six stories is strongest? Which one still needs work?',
    starters: ['Strongest:', 'Needs work:'],
  },
  deepen: {
    title: 'Your kit, piece 3',
    summary: 'Finish your one-page story bank. Book three practice sessions in your calendar, and ask a strict friend to play the interviewer.',
  },
  notes: 'Kit piece 3 of How to Get Hired.',
};

export default lesson;
