import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Step-by-step: names that stick — the next-in-line effect and four ways to keep a name. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Names that stick',
  summary: 'Friday morning, the team stand-up. Eight people introduce themselves in a circle. Grace is seventh. By the time it\'s her turn, she has forgotten every name before her. There\'s a reason.',
  minutes: 12,
  outcomes: [
    'Know why names vanish during introductions',
    'Use four simple ways to keep a name',
    'Ask for a name again without embarrassment',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Why Grace forgot six names, and how to keep them',
      steps: [
        {
          title: 'The circle of doom',
          body: 'Eight people, one after another: "I\'m Tom, backend." "I\'m Aisha, design." Grace is seventh. She spends the whole time rehearsing "I\'m Grace, I used to be a nurse." When she looks up, every name has gone.',
        },
        {
          title: 'It\'s not your memory, it\'s your attention',
          body: 'Psychologists call it the next-in-line effect: in a 1973 study, people remembered least of what was said just before their own turn, because their attention was on getting ready to speak. Brenner tested it with words, but the same thing happens with names in a circle of introductions.',
        },
        {
          title: 'Say it back',
          body: 'When someone tells you their name, use it straight away: "Nice to meet you, Aisha." Hearing yourself say it helps it stick, and people like hearing their name.',
        },
        {
          title: 'Link it',
          body: 'Connect the name to something: "Aisha, design, the plant on her desk." Or to someone you know with the same name. A link gives the memory something to hold on to.',
        },
        {
          title: 'Use it once more',
          body: 'Use the name once more before you part: "Good to meet you, Aisha. See you at lunch." Once, not five times. Five sounds like a sales pitch.',
        },
        {
          title: 'When it\'s gone anyway: just ask',
          body: '"I\'m so sorry, I\'ve forgotten your name. I\'m Grace." Everyone forgets names. Asking early is far less awkward than avoiding someone for three months because you never asked.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Say it back. Link it. Use it once more. And if it\'s gone, ask: the sooner the easier.',
    },
  ],
  apply: {
    scenario: 'Friday, 9:30. The introduction circle.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Grace forget the names just before her turn?',
        options: [
          { text: 'Her memory is bad', why: 'It happens to almost everyone. It\'s about attention.' },
          { text: 'The names were too unusual', why: 'They were ordinary names. Timing was the problem.' },
          { text: 'Her attention was on preparing what she would say' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the four name moves in order.',
        lines: ['Say it back straight away', 'Link it to something', 'Use it once more before you part', 'If it\'s gone, ask'],
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'Hi, I\'m Priya. I lead the UX team. Welcome.',
        prompt: 'Grace\'s reply?',
        options: [
          { text: 'Lovely to meet you, Priya. I\'m Grace, the new researcher.' },
          { text: 'Thanks. I\'m Grace.', why: 'Polite, but she didn\'t say Priya\'s name back.' },
          { text: 'Hi, Priya Priya Priya, great to meet you Priya.', why: 'Once is enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Forgetting what\'s said just before your turn is called the next-in-___ effect. (one word)',
        answers: ['line'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Three weeks later, Grace still doesn\'t know a colleague\'s name. What should she do?',
        options: [
          { text: 'Avoid them forever', why: 'That gets more awkward every week.' },
          { text: '"I\'m so sorry, I\'ve forgotten your name. I\'m Grace."' },
          { text: 'Ask someone else secretly', why: 'Fine in a pinch, but asking them directly is kinder and quicker.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s plan for the next introduction circle. Which line is the problem?',
        lines: [
          'Say a short version of my intro in my head before the circle starts.',
          'During the circle, keep rehearsing my intro over and over.',
          'Listen to each name and say it back later.',
        ],
        bug: 1,
        fix: 'During the circle, focus on listening to each person.',
        explanation: 'Rehearsing during the circle is exactly what makes names vanish. Prepare before, then listen.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the move to how it sounds.',
        pairs: [
          ['Say it back', '"Nice to meet you, Aisha."'],
          ['Use it once more', '"See you at lunch, Aisha."'],
          ['Ask again', '"Sorry, I\'ve forgotten your name."'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why not use someone\'s name five times in one chat?',
        options: [
          { text: 'It starts to sound like a sales pitch' },
          { text: 'It\'s against the rules', why: 'No rule. It just feels odd.' },
          { text: 'They might forget it', why: 'They won\'t forget their own name.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s link for a new name.',
        template: '[[1]], design, the [[2]] on her desk.',
        blanks: [['Aisha'], ['plant']],
        distractors: ['Priya', 'pain'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the honest way to ask again.',
        tiles: ['Sorry,', 'I\'ve', 'forgotten', 'your', 'name.', 'I\'m', 'Grace.'],
        distractors: ['avoid', 'pretend'],
      },
    ],
  },
  reflect: {
    prompt: 'Whose name have you forgotten and been too embarrassed to ask? Write the exact line you\'ll use to ask them.',
    starters: ['I\'ve forgotten...', 'I\'ll say...'],
  },
  deepen: {
    title: 'Prepare before, listen during',
    summary: 'Before your next introduction circle or event, prepare your one-line intro BEFORE it starts. Then spend the circle listening. Count how many names you remember.',
  },
  notes: 'Brenner (1973), Journal of Verbal Learning and Verbal Behavior 12(3): 320–323 — the next-in-line effect, tested with words read aloud; recall worst for items just before one\'s own turn. Applying it to names is an extrapolation, stated as such in the lesson. Name tips (say it back, link, use, ask) are common memory advice, not from one study.',
};

export default lesson;
