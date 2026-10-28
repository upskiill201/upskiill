import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 1 — opens the chapter: Clinton freezes on "Tell me about yourself". Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"So, tell me about yourself"',
  summary: 'Two weeks until Njangi Pay. David offers to play the interviewer. He sits up straight, puts on a serious face, and asks the first question. Clinton, who talks to 40 people every week, goes completely blank.',
  minutes: 11,
  outcomes: ['Explain why the first question matters', 'Choose a way to prepare that works under pressure', 'Start planning a short, true answer'],
  learn: [
    {
      kind: 'story',
      title: 'The practice run',
      beats: [
        { speaker: 'narrator', text: 'Four weeks to graduation. David\'s room. A chair turned round to face the desk. David wears his father\'s tie.' },
        { speaker: 'david', text: '(very serious) Good morning, Mr Clinton. So. Tell me about yourself.' },
        { speaker: 'clinton', text: 'Well... I was born in Bamenda... I like football... I\'m doing Computer Science, which is, um, computers... I\'m a hard worker?' },
        { speaker: 'david', text: '(dropping the voice) Bro. You run a 40-person meet-up. What was that?' },
        { speaker: 'tey', text: '"Tell me about yourself" is often the first question, and it sets the tone. Almost everyone freezes on it once. The fix isn\'t talent; it\'s preparation of the right kind.' },
      ],
      choice: {
        prompt: 'How should Clinton prepare?',
        options: [
          {
            text: 'Plan a 60-second answer in three parts, practise it out loud, but don\'t memorise every word.',
            outcome: 'By Friday he can give it calmly in different words each time. It sounds like him, because it is.',
            best: true,
          },
          {
            text: 'Write a perfect script and memorise it word for word.',
            outcome: 'It works until David interrupts with a question. Clinton loses his place and has to start again from the top.',
          },
          {
            text: 'Wing it. He\'s good at talking.',
            outcome: 'He talks for four minutes about football. Good at talking isn\'t the same as answering.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Prepare the shape of your answers, not the exact words. Practise out loud. Everyone freezes once; preparation fixes it.',
    },
    {
      kind: 'text',
      html: '<p><strong>In this chapter:</strong> how interviews work, "Tell me about yourself", STAR stories, the hard questions (weaknesses, "why us?", things you don\'t know), questions to ask them, nerves, and the day itself. Your kit piece: a story bank.</p>',
    },
  ],
  apply: {
    scenario: 'The practice run with David.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Clinton freeze?',
        options: [
          { text: 'He has nothing to say', why: 'He has a lot. He hadn\'t organised it.' },
          { text: 'He hadn\'t prepared the shape of his answer' },
          { text: 'David is scary', why: 'Funny, but no. He hadn\'t prepared.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good preparation or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Planning a three-part answer', group: 0 },
          { text: 'Memorising every word', group: 1 },
          { text: 'Practising out loud', group: 0 },
          { text: 'Winging it', group: 1 },
          { text: 'Practising with a friend', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I froze on the very first question. Maybe I\'m just bad at interviews.',
        options: [
          { text: 'True, I\'ll cancel the interview.', why: 'Freezing is normal and fixable.' },
          { text: 'I\'ll memorise a perfect speech.', why: 'Plan the shape, not every word.' },
          { text: 'Almost everyone freezes once. I\'ll prepare a short answer and practise it out loud.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that doesn\'t answer the question.',
        lines: ['I\'m a final-year CS student who builds tools for real users.', 'I was born in Bamenda and I like football and my favourite food is ndolé.', 'Right now I\'m building offline delivery confirmations at Kmer.'],
        bug: 1,
        explanation: 'Interesting, but not what they need to know for this job.',
      },
      {
        kind: 'mcq',
        prompt: 'What went wrong with the memorised script?',
        options: [
          { text: 'An interruption made him lose his place' },
          { text: 'It was too short', why: 'Length wasn\'t the issue. It broke when interrupted.' },
          { text: 'Nothing', why: 'He had to start from the top.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Three-part plan, practised', 'Calm, in his own words'],
          ['Word-for-word script', 'Lost when interrupted'],
          ['Winging it', 'Four minutes about football'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'Prepare the [[1]] of your answers, not the exact [[2]].',
        blanks: [['shape'], ['words']],
        distractors: ['length', 'jokes', 'clothes'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many seconds should Clinton\'s answer take? (a number)',
        answers: ['60', 'sixty'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which opening line is best for Njangi Pay?',
        options: [
          { text: '"I was born in Bamenda in..."', why: 'Start with what\'s relevant now.' },
          { text: '"I\'m a hard worker."', why: 'Everyone says it. Show it instead.' },
          { text: '"I\'m a final-year Computer Science student who builds tools for real users."' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Relevant to the job, or not?',
        groups: ['Relevant', 'Not really'],
        items: [
          { text: 'The Njangi Tracker', group: 0 },
          { text: 'His favourite food', group: 1 },
          { text: 'Running the 40-person meet-up', group: 0 },
          { text: 'The Kmer internship', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If someone asked you "Tell me about yourself" right now, what would you say? Say it out loud. How did it go?',
    starters: ['I said...', 'It went...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Record yourself answering "Tell me about yourself" on your phone. Don\'t prepare. Listen back. You\'ll fix it in lesson 3.',
  },
  notes: 'Opens L2 Ch3 (founder topics: How to Answer "Tell Me About Yourself"; How to Answer Common Interview Questions; the old Acing Job Interviews plan). Ndolé is a Cameroonian dish.',
};

export default lesson;
