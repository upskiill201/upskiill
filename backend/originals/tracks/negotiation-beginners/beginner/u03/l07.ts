import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Chat with Tey: the power of "because", then silence. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Because, and then silence',
  summary: 'Tey tells Ada about a famous study at a photocopier. One word made people more likely to say yes. Then they practise the second skill: staying quiet afterwards.',
  minutes: 12,
  outcomes: [
    'Add a real reason to every ask',
    'Know what the photocopier study found',
    'Hold the silence after you ask',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'In 1978, Ellen Langer\'s team had people ask to skip the queue at a photocopier. "May I use the machine?" got about 60% yeses.', replies: ['And with a reason?'] },
        { tey: '"...because I\'m in a rush" got about 94%. Even "...because I have to make copies", a reason that says nothing, got about 93% for a small request.', replies: ['So I just say "because"?'] },
        { tey: 'For small requests, a reason, any reason, helps. For bigger asks people listen properly, so the reason must be real. Yours is strong: "...because similar flats on this street rent for that."', replies: ['And then?'] },
        { tey: 'Then silence. Count to five in your head. The first person to fill a silence often gives something away. Let it be him.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Ask with a real "because". Then stop talking and count to five.',
    },
  ],
  apply: {
    scenario: 'The photocopier.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'With no reason, about what percentage let people use the photocopier first?',
        answers: ['60', '60%'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'With "because I\'m in a rush", about what percentage said yes?',
        answers: ['94', '94%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'For bigger requests, what changed in the study?',
        options: [
          { text: 'Any reason still worked just as well', why: 'Only for small requests.' },
          { text: 'People thought harder, so an empty reason stopped working' },
          { text: 'Reasons made it worse', why: 'Real reasons still helped.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'A real reason or an empty one?',
        groups: ['Real', 'Empty'],
        items: [
          { text: '"...because similar flats rent for that"', group: 0 },
          { text: '"...because I want it"', group: 1 },
          { text: '"...because I\'ve added the design system to my role"', group: 0 },
          { text: '"...because, well, you know"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'The silence after I ask feels like forever.',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Then fill it quickly.', why: 'Filling it often means conceding.' },
          { text: 'Leave the room.', why: 'Just stay quiet and calm.' },
          { text: 'It feels long to you, not to him. He\'s thinking. Count to five, breathe, and let him speak first.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the ask to a strong "because".',
        pairs: [
          ['Lower rent', 'Similar flats rent for less'],
          ['Higher pay', 'My role has grown'],
          ['Logo price', 'It includes revisions and files'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s rule.',
        template: 'Ask with a real "[[1]]". Then stop talking and count to [[2]].',
        blanks: [['because'], ['five', '5']],
        distractors: ['sorry', 'twenty'],
      },
      {
        kind: 'mcq',
        prompt: 'Why might "the first to fill the silence" lose?',
        options: [
          { text: 'Silence is rude', why: 'A short silence is normal.' },
          { text: 'They often add a concession or a weaker reason' },
          { text: 'They don\'t lose', why: 'Filling silence often gives something away.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s review ask is the empty reason?',
        lines: [
          'I\'d like to propose ₦480,000 a month.',
          'Because my role now includes the design system.',
          'And because I just really want it.',
          'Similar roles in Lagos pay ₦400,000 to ₦550,000.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'For a big ask, empty reasons weaken the real ones.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the ask with "because".',
        lines: ['Say your number', 'Say "because..." with a real reason', 'Stop talking', 'Count to five'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your ask with a real "because". Practise it with a five-second silence after it.',
    starters: ['I\'d like... because...'],
  },
  deepen: {
    title: 'Mindless compliance',
    summary: 'Langer called the empty-reason effect "mindlessness": for small favours, people react to the shape of a request. Big asks get real thought, so they need real reasons.',
  },
  notes: 'Langer, Blank & Chanowitz (1978), "The mindlessness of ostensibly thoughtful action", JPSP 36(6): small request (5 pages) no reason ~60%, real reason ~94%, placebo reason ~93%; for a large request (20 pages) the placebo reason no longer helped.',
};

export default lesson;
