import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Chat with Tey: what impulse buys really cost. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'What it really costs',
  summary: 'The boots cost GH₵180 in money. But Tey counts four other costs Kofi didn\'t see coming. Once you see all five, the next "only 3 left!" looks different.',
  minutes: 11,
  outcomes: [
    'Count the full cost of an impulse buy',
    'See costs beyond the price tag',
    'Use the full cost to decide next time',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'The boots cost GH₵480, and Kofi got GH₵300 back. So they cost GH₵180. That\'s cost one: money. Want to see the others?', replies: ['There are others?'] },
        { tey: 'Cost two: time. Thirteen hours of beat-making to earn GH₵480. Plus the hours spent finding a buyer, arranging, meeting.', replies: ['Okay. Three?'] },
        { tey: 'Cost three: the plan. GH₵180 gone means his audio interface goal is about four weeks further away. Impulse buys don\'t just cost money; they cost the next goal.', replies: ['Four?'] },
        { tey: 'Cost four: the feeling. Regret, and a little less trust in himself. "I saved for 16 weeks and threw it away" is a heavy thought to carry around.', replies: ['And five?'] },
        { tey: 'Cost five: the habit. Each impulse that "works" (the four minutes of feeling great) teaches the brain that buying fixes bad feelings. That makes the next one more likely.', replies: ['That\'s a lot for some boots.'] },
        { tey: 'It is. That\'s why we\'re not trying to never buy anything. We\'re trying to make sure what we buy is worth all five costs.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Five costs of an impulse buy: money, time, the next goal, the feeling, and the habit it builds.',
    },
  ],
  apply: {
    scenario: 'The full price of the boots.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each cost to the boots example.',
        pairs: [
          ['Money', 'GH₵180 lost'],
          ['Time', '13 hours of beat-making'],
          ['The next goal', 'Audio interface delayed'],
          ['The feeling', 'Regret and less self-trust'],
          ['The habit', 'Buying "fixes" bad feelings'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi saves GH₵50 a week for the audio interface. How many weeks does GH₵180 set him back? (Round to the nearest week.)',
        answers: ['4', 'four', '3.6'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is "the habit" the sneakiest cost?',
        options: [
          { text: 'Because habits are expensive', why: 'The point is what the habit teaches.' },
          { text: 'It isn\'t a real cost', why: 'It makes the next impulse more likely.' },
          { text: 'Each impulse that feels good teaches the brain that buying fixes feelings' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Visible cost or hidden cost?',
        groups: ['Visible', 'Hidden'],
        items: [
          { text: 'The price on the screen', group: 0 },
          { text: 'A delayed goal', group: 1 },
          { text: 'Regret', group: 1 },
          { text: 'The habit it builds', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'It\'s only GH₵180. Relax.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'GH₵180, thirteen hours of work, four weeks of my next goal, and a habit I don\'t want. That\'s not "only".' },
          { text: 'True, it\'s nothing.', why: 'He just counted five costs.' },
          { text: 'You don\'t understand money.', why: 'Unkind, and doesn\'t explain.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The point.',
        template: 'Make sure what we buy is [[1]] all five [[2]].',
        blanks: [['worth'], ['costs']],
        distractors: ['cheaper', 'friends'],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought only counts the visible cost?',
        lines: [
          'These headphones would delay my laptop fund by 3 weeks.',
          'They\'re GH₵200, that\'s all that matters.',
          'At my rate, they\'re about 5 hours of work.',
        ],
        bug: 1,
        fix: 'They\'re GH₵200, about 5 hours, and 3 weeks of my goal.',
        explanation: 'Price alone hides the time and goal costs.',
      },
      {
        kind: 'mcq',
        prompt: 'Which purchase is most likely worth all five costs?',
        options: [
          { text: 'Boots in the wrong size at 2 a.m.', why: 'High costs, almost no value.' },
          { text: 'A third phone case', why: 'Low value, adds to the habit.' },
          { text: 'A planned audio interface that helps Kofi earn more' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵480 at GH₵37.50 an hour is about how many hours? (Round to the nearest hour.)',
        answers: ['13', 'thirteen', '12.8'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the five costs as Tey listed them.',
        lines: ['Money', 'Time', 'The next goal', 'The feeling', 'The habit'],
      },
    ],
  },
  reflect: {
    prompt: 'Take your last regretted purchase. What were all five of its costs for you?',
    starters: ['Money:...', 'Time:...', 'Goal:...', 'Feeling:...', 'Habit:...'],
  },
  deepen: {
    title: 'Opportunity cost',
    summary: 'Economists call the next-best thing you give up the "opportunity cost". Every cedi spent on one thing is a cedi not spent on something else. Asking "what else could this buy?" is one of the simplest ways to check if something is worth it.',
  },
  notes: 'Opportunity cost (standard economics). Reinforcement of mood-repair buying: emotion regulation and compulsive buying literature (e.g. Kellett & Bolton 2009); stated generally. Interface fund 50/week (Course 2 Ch5).',
};

export default lesson;
