import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 13 — feedback on your slides. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Feedback on your slides',
  summary: 'Ada asks the AI "Is my deck good?" and gets "Great work!" Useless. Tey shows her how to get feedback that actually improves the deck.',
  minutes: 12,
  outcomes: [
    'Ask AI for specific, critical feedback',
    'Give the AI a reviewer role and criteria',
    'Get feedback from a real person too',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: '"Is my deck good?" invites a polite yes. Give it a role and criteria instead.', replies: ['Like what?'] },
        { tey: '"Act as a busy founder seeing this for the first time. For each slide: is the title the point? Is anything confusing? What question would you ask? Then name the weakest slide."', replies: ['What if it\'s still too nice?'] },
        { tey: 'Add: "Be direct. I want to fix problems before the meeting, not hear praise." Most tools get much more useful.', replies: ['Is AI feedback enough?'] },
        { tey: 'It\'s a great first pass. Then show it to one real person, ideally someone like your audience. Tobi has met the founders a hundred times. Ask him.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Give the AI an audience role, clear criteria and "be direct". Then get one real person who knows the audience to look too.',
    },
  ],
  apply: {
    scenario: 'Ada gets feedback on her deck.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the most useful feedback?',
        options: [
          { text: 'Is my deck good?', why: 'Invites praise.' },
          { text: 'Act as a busy founder seeing this deck for the first time. For each slide, say if the title is the point, what\'s confusing and what you\'d ask. Be direct. Name the weakest slide.' },
          { text: 'Tell me it\'s great.', why: 'Not feedback.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful feedback, or empty praise?',
        groups: ['Useful', 'Empty'],
        items: [
          { text: '"Slide 4\'s title doesn\'t say why costs matter"', group: 0 },
          { text: '"Great work, very professional!"', group: 1 },
          { text: '"A founder would ask how you\'ll keep shops active"', group: 0 },
          { text: '"Looks amazing"', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that makes AI feedback honest.',
        tiles: ['Be', 'direct,', 'not', 'polite'],
        distractors: ['nice'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the feedback criterion to what it checks.',
        pairs: [
          ['Is the title the point?', 'Slide clarity'],
          ['What\'s confusing?', 'Understanding'],
          ['What would you ask?', 'Gaps and weak spots'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Want me to look at the deck before the founders do?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes please! The AI flagged slide 4. Could you tell me if the story makes sense to someone outside our team?' },
          { text: 'No, the AI already checked it.', why: 'A real person adds a lot.' },
          { text: 'Only if you say it\'s perfect.', why: 'She wants honest feedback.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Give the AI an [[1]] role and clear [[2]].',
        blanks: [['audience'], ['criteria']],
        distractors: ['angry', 'emojis'],
      },
      {
        kind: 'findBug',
        prompt: 'Which feedback request will get the least useful answer?',
        lines: [
          'Act as a sceptical founder.',
          'Name the weakest slide and why.',
          'Tell me what you love about it.',
          'List three questions you\'d ask.',
        ],
        bug: 2,
        fix: 'Tell me what would confuse you.',
        explanation: 'Asking for praise gets praise, not improvements.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s feedback process.',
        lines: ['Ask AI as a founder, with criteria', 'Fix the weakest slide', 'Show Tobi', 'Fix what he spots'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who does Tey suggest Ada asks, since he knows the founders well? (name)',
        answers: ['Tobi', 'tobi'],
        placeholder: 'A name',
      },
      {
        kind: 'sortGroups',
        prompt: 'AI review is good for, or a person is better for?',
        groups: ['AI first pass', 'A real person'],
        items: [
          { text: 'Spotting label-only titles', group: 0 },
          { text: 'Knowing what Seun always asks', group: 1 },
          { text: 'Finding crowded slides', group: 0 },
          { text: 'Sensing the founders\' mood', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why name the weakest slide?',
        options: [
          { text: 'It tells you exactly where to spend your time' },
          { text: 'To feel bad', why: 'It focuses effort.' },
          { text: 'No reason', why: 'It focuses effort.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why ask a real person who knows the audience?',
        options: [
          { text: 'They know things the AI can\'t, like what the founders care about' },
          { text: 'AI feedback is always wrong', why: 'It\'s useful; people add context.' },
          { text: 'It\'s polite', why: 'It\'s useful.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Who is the best real person to review your next presentation, and why?',
    starters: ['The person:', 'Because they know...'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI to review a deck "as a busy [your audience], be direct, name the weakest slide".' },
  notes: 'General guidance. AI assistants tend toward agreeable feedback unless asked to be critical.',
};

export default lesson;
