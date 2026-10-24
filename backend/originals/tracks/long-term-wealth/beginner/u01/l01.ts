import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story with a choice: the phone call from Buea. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The phone call',
  summary: 'Miracle\'s dad calls from Buea. After 35 years of teaching, he retires next year with a small pension and almost nothing saved. "I always thought I\'d start next year." Miracle hangs up and opens her own banking app.',
  minutes: 12,
  outcomes: [
    'Meet Miracle, her dad and Folake',
    'See how "next year" adds up to nothing',
    'Decide the first step for your own long term',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Buea, Sunday evening',
      beats: [
        { speaker: 'narrator', text: 'Lagos, Sunday evening. Miracle, 25, team lead at Afiya, is answering client messages when her dad video-calls from Buea.' },
        { speaker: 'narrator', text: 'He\'s smiling, but she knows that smile. "My retirement date came. Next September. Thirty-five years of teaching Maths."' },
        { speaker: 'miracle', text: 'Papa, that\'s wonderful! You\'ve earned it.' },
        { speaker: 'narrator', text: '"The pension is small. And savings... I always thought I\'d start next year. Every year, next year. School fees, your mother\'s medicine, the roof. Next year."' },
        { speaker: 'narrator', text: 'After the call, Miracle opens her banking app. Salary: ₦900,000 a month. Saved this month: ₦120,000, in an account that pays almost nothing. Workplace pension: she\'s never once looked.' },
        { speaker: 'miracle', text: 'I keep a list of every mistake I\'ve made once. I think I\'m about to add his.' },
        { speaker: 'tey', text: 'Long-term wealth doesn\'t come from one big decision. It comes from a few habits, started early and kept for decades. Miracle has time. Her dad\'s story is the warning. What should she do first?' },
      ],
      choice: {
        prompt: 'What should Miracle do first?',
        options: [
          { text: 'Send Dad as much as she can every month, and worry about herself later.', outcome: 'Loving, and it might help him now. But "later" is exactly the trap Dad fell into. In 35 years she could be the one making this call.' },
          { text: 'Find out where she really stands: her net worth, her pension, her habits. Then plan for herself and for Dad.', outcome: 'Yes. She can\'t plan without knowing where she is. That night she starts a page called "40-year map", and books a call with Dad for next Sunday to look at his numbers together.', best: true },
          { text: 'Start investing her savings tomorrow in whatever her colleague recommends.', outcome: 'Rushing into a hot tip isn\'t a plan. First the basics: where she stands, an emergency fund, expensive debt, then long-term investing she understands.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Bring your own future to this course. Every lesson asks one question: what will today\'s habits add up to in 10, 20, 40 years?',
    },
  ],
  apply: {
    scenario: 'The phone call.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was Dad\'s main money mistake?',
        options: [
          { text: 'Earning too little', why: 'Teachers often earn little, but many save something. "Next year" was the trap.' },
          { text: 'Spending on his family', why: 'That was love, and necessary. The missing piece was starting.' },
          { text: 'Always planning to start saving "next year"' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to who they are.',
        pairs: [
          ['Miracle', 'Team lead at Afiya, 25'],
          ['Dad', 'Maths teacher in Buea, retiring'],
          ['Folake', 'Afiya\'s COO, Miracle\'s boss'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Miracle earns ₦900,000 and saves ₦120,000. What percent does she save? (Round to the nearest whole number.)',
        answers: ['13', '13%', '13 percent'],
        placeholder: 'A percent',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does Miracle know this yet, or not?',
        groups: ['Knows', 'Doesn\'t know yet'],
        items: [
          { text: 'Her salary', group: 0 },
          { text: 'What\'s in her workplace pension', group: 1 },
          { text: 'Her net worth', group: 1 },
          { text: 'What she saved this month', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Papa, how much have you saved, roughly?',
        prompt: 'Why is this a good question for Miracle to ask?',
        options: [
          { text: 'To embarrass him', why: 'She asks gently, to help.' },
          { text: 'You can\'t make a plan without knowing the starting point' },
          { text: 'It\'s none of her business', why: 'He asked for her help.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The trap.',
        template: '"I always thought I\'d start [[1]] [[2]]."',
        blanks: [['next'], ['year']],
        distractors: ['today', 'now'],
      },
      {
        kind: 'findBug',
        prompt: 'Which of Miracle\'s thoughts repeats Dad\'s mistake?',
        lines: [
          'I need to know my net worth.',
          'I should check my workplace pension.',
          'I\'m only 25; I\'ll think about retirement next year.',
        ],
        bug: 2,
        fix: 'I\'m 25; that\'s exactly why I should start now.',
        explanation: '"Next year" at 25 becomes "next year" at 59.',
      },
      {
        kind: 'mcq',
        prompt: 'Where does long-term wealth mostly come from?',
        options: [
          { text: 'One lucky investment', why: 'Luck is rare and unreliable.' },
          { text: 'A very high salary', why: 'Income helps, but many high earners have little wealth.' },
          { text: 'A few habits, started early and kept for decades' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Miracle\'s first steps.',
        lines: ['Find out where she stands', 'Check her pension', 'Start a 40-year map', 'Look at Dad\'s numbers with him'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Dad taught for 35 years. If he had saved even 5% of his pay every year, how many years of saving would that have been?',
        answers: ['35', 'thirty-five'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Is there something about your long-term money you keep putting off until "next year"? What is it?',
    starters: ['I keep putting off...', 'Because...'],
  },
  deepen: {
    title: 'This isn\'t blame',
    summary: 'Dad raised a family on a teacher\'s salary, paid for medicine and a roof, and sent Miracle to university. Many people never had a chance to save. This course is about using the chance if you have it, and helping people you love who didn\'t.',
  },
  notes: 'Running numbers in tracks/long-term-wealth.ts. Miracle per CAST.md (Cameroonian, now 25, Afiya team lead after Motivate a Team / ML). Dad (narrated): Maths teacher in Buea, retiring at 60. 120/900 = 13.3%.',
};

export default lesson;
