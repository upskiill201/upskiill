import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 16 — telling your manager AI helped. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Telling your manager AI helped',
  summary: 'Should you mention that AI helped with your work? Often, yes. Here\'s how to say it simply, and when it really matters.',
  minutes: 12,
  outcomes: [
    'Know when to say AI helped',
    'Say it in one plain sentence',
    'Follow your company\'s rules on AI use',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Ada\'s worried. If she tells Tobi AI helped with the market summary, will he think she didn\'t do the work?', replies: ['Will he?'] },
        { tey: 'Usually not. Most managers care about whether the work is right and useful. Saying how you made it builds trust, especially after the invoice mix-up.', replies: ['When must I say it?'] },
        { tey: 'When your company or client has a rule about it. When someone will rely on it for a big decision. And whenever you\'re asked. Never pretend you didn\'t use it.', replies: ['How do I say it?'] },
        { tey: 'One plain sentence: "I used AI to draft the summary, then checked every number against the sources." What you checked matters more than the tool.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: '"I used AI to [task], then checked [what you checked]." One sentence, focused on how you made sure it\'s right.',
    },
  ],
  apply: {
    scenario: 'Ada is handing Tobi the Ghana market summary.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What do most managers care about most?',
        options: [
          { text: 'Whether the work is right and useful' },
          { text: 'Whether you typed every word', why: 'They care about quality and honesty.' },
          { text: 'Which AI tool you prefer', why: 'Outcome and checking matter more.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Must Ada say AI helped?',
        groups: ['Must say it', 'Optional'],
        items: [
          { text: 'The client\'s contract requires disclosing AI use', group: 0 },
          { text: 'Tobi asks "Did you use AI for this?"', group: 0 },
          { text: 'AI fixed a typo in a team message', group: 1 },
          { text: 'The board will make a big decision from it', group: 0 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s disclosure sentence.',
        tiles: ['I', 'used', 'AI', 'to', 'draft', 'it,', 'then', 'checked', 'every', 'number'],
        distractors: ['secretly'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Did you use AI for this market summary? Our legal team asks every supplier now.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes, I used it to draft the summary, then checked every figure against the sources listed at the end.' },
          { text: 'No, I wrote it all myself.', why: 'Never pretend you didn\'t.' },
          { text: 'Does it matter?', why: 'Their legal team says it does. Answer plainly.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the template.',
        template: 'I used AI to [[1]] the summary, then [[2]] every number.',
        blanks: [['draft'], ['checked']],
        distractors: ['hide', 'invented'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to the right approach.',
        pairs: [
          ['Company has an AI rule', 'Follow it exactly'],
          ['Someone asks', 'Answer honestly'],
          ['Big decision depends on it', 'Say how you checked it'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s note to Tobi is the problem?',
        lines: [
          'Summary attached.',
          'I used AI for the first draft.',
          'I checked the fees on each provider\'s site today.',
          'I didn\'t check the market size, but it sounded right.',
        ],
        bug: 3,
        fix: 'Market size: not yet confirmed; I\'ll check the source by Friday.',
        explanation: 'If something is unchecked, say so clearly, and don\'t pass it off as fine.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does saying it help after the invoice mistake?',
        options: [
          { text: 'It shows Tobi exactly how Ada now checks her work' },
          { text: 'It shifts blame to the tool', why: 'It builds trust, not blame.' },
          { text: 'It doesn\'t help', why: 'It shows her new habit.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good disclosure or poor disclosure?',
        groups: ['Good', 'Poor'],
        items: [
          { text: '"AI drafted it; I checked every figure"', group: 0 },
          { text: '"The AI did it, so don\'t blame me"', group: 1 },
          { text: '"AI helped; two numbers still need checking"', group: 0 },
          { text: 'Saying nothing when asked', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Should you ever pretend you didn\'t use AI when asked? (yes or no)',
        answers: ['no'],
        placeholder: 'Yes or no',
      },
      {
        kind: 'mcq',
        prompt: 'What matters more in the disclosure: the tool or the checking?',
        options: [
          { text: 'What you checked' },
          { text: 'The tool\'s name', why: 'Checking shows reliability.' },
          { text: 'Neither', why: 'The checking matters.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s handover message.',
        lines: ['Here\'s the summary', 'AI drafted it', 'Here\'s what I checked', 'Here\'s what still needs checking'],
      },
    ],
  },
  reflect: {
    prompt: 'Does your company or client have a rule about AI use? If you don\'t know, who could you ask?',
    starters: ['The rule is...', 'I\'d ask...'],
  },
  deepen: { title: 'Try it today', summary: 'Add one line to your next AI-assisted handover: what AI did, and what you checked.' },
  notes: 'Disclosure norms vary by employer, client and sector; always follow local policy. Unit 10 covers company rules in depth.',
};

export default lesson;
