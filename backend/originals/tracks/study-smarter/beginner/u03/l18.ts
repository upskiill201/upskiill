import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 18 — keep your notes true to the source: catching AI errors before they spread. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Keep your notes true to the source',
  summary: "An AI mistake got into Clinton's notes, then into David's, then nearly into a whole revision sheet. One habit would have stopped it.",
  minutes: 12,
  outcomes: [
    'Check AI-added facts against a real source',
    'Stop a mistake before it spreads to others',
    'Use warning words to spot risky claims',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The mistake that travelled',
      beats: [
        { speaker: 'narrator', text: "Clinton asks an AI to fill a gap in his Biology notes. It writes: \"All enzymes work best at exactly 37°C.\" He doesn't mark it as AI. It sounds right." },
        { speaker: 'narrator', text: 'David borrows his notes. Now it is in two folders. Clinton puts it on a revision sheet for the group chat.' },
        { speaker: 'kofi', text: "Wait. Efua's notes say different enzymes have different best temperatures. Where did \"exactly 37\" come from?" },
        { speaker: 'clinton', text: "...The AI. I think. I didn't mark it." },
        { speaker: 'tey', text: "Here's the trouble with an unchecked fact: once it's in your handwriting, it feels like yours. Then it travels." },
      ],
      choice: {
        prompt: 'What should the group do now?',
        options: [
          {
            text: 'Check the textbook, fix the line in all three places, and tell the group chat what changed.',
            outcome: 'Five minutes of work. The textbook says many human enzymes work best near body temperature, but it varies. Everyone fixes their sheet before the mocks.',
            best: true,
          },
          { text: 'Leave it, it is close enough.', outcome: 'A mark lost on the mock by four people, for one unchecked line.' },
          { text: 'Ask the AI if it is right.', outcome: 'It says "Good question! Enzymes have different optimal temperatures..." Helpful, but the textbook is the real check.' },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>Three habits keep your notes true:</p><ol><li><strong>Mark AI bits</strong> (from lesson 12), so you know what to check.</li><li><strong>Watch for warning words:</strong> <em>always, never, all, exactly, every, only</em>. Real science is usually less absolute. These words are where AI (and people) most often overstate.</li><li><strong>Check before you share.</strong> Anything going onto a group revision sheet gets checked against the textbook first. Your mistakes become everyone\'s.</li></ol>',
    },
    {
      kind: 'check',
      question: 'Which word in a note should make you check it?',
      options: ['"often"', '"exactly"', '"usually"'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'The group cleans up its notes.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Warning word, or normal?',
        groups: ['Warning word', 'Normal'],
        items: [
          { text: 'always', group: 0 },
          { text: 'usually', group: 1 },
          { text: 'exactly', group: 0 },
          { text: 'often', group: 1 },
          { text: 'never', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: "Which line in David's notes should be checked first?",
        lines: ['(T) Diffusion: high to low concentration.', '(AI) Osmosis only ever happens in plant cells.', '(E) Active transport needs energy.'],
        bug: 1,
        fix: 'Osmosis happens in animal and plant cells.',
        explanation: '"Only ever" plus an AI mark: two reasons to check. Osmosis happens in animal cells too.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is an unchecked fact in your handwriting risky?',
        options: [
          { text: 'Handwriting makes facts wrong', why: 'It makes them feel trustworthy, which is the risk.' },
          { text: 'It feels like yours, so you stop questioning it, and it spreads' },
          { text: 'Teachers can tell', why: 'The risk is learning and sharing it, not getting caught.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: "I'm about to post my revision sheet in the group chat. 40 people are in it.",
        prompt: 'What should Kofi say?',
        options: [
          { text: 'Post it now, quick.', why: 'Unchecked lines would spread to 40 people.' },
          { text: 'Never share notes.', why: 'Sharing is great once it is checked.' },
          { text: 'Check the AI-marked bits and any "always/never" lines against the textbook first. Your mistakes become 40 people\'s mistakes.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Many human enzymes work best near body temperature. About how many °C is that? (number)',
        answers: ['37'],
        placeholder: 'Number',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the fix routine in order.',
        lines: ['Spot the suspicious line', 'Check it against the textbook', 'Fix it everywhere it went', 'Tell the people you shared it with'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the habit to what it prevents.',
        pairs: [
          ['Mark AI bits', 'Forgetting what to check'],
          ['Watch for warning words', 'Learning an overstatement'],
          ['Check before you share', 'Spreading a mistake'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which is the best check for "all enzymes work best at exactly 37°C"?',
        options: [
          { text: 'Ask the same AI again', why: 'Helpful as a hint, but not a real source.' },
          { text: 'Look it up in the textbook or ask the teacher' },
          { text: 'Ask in the group chat', why: 'They might have the same mistake.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: "Complete Tey's point.",
        template: 'Once it is in your [[1]], it feels like yours. Then it [[2]].',
        blanks: [['handwriting', 'notes'], ['travels', 'spreads']],
        distractors: ['bag', 'sleeps'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the sharing rule.',
        tiles: ['Check', 'before', 'you', 'share'],
        distractors: ['after', 'never'],
      },
    ],
  },
  reflect: {
    prompt: 'Look through your notes for warning words (always, never, all, exactly). Check one of those lines. Was it true?',
    starters: ['The line said...', 'When I checked...'],
  },
  deepen: {
    title: 'Check one subject',
    summary: 'Scan one subject\'s notes for AI-marked bits and warning words. Check each against the textbook before your next test.',
  },
  notes: 'Enzyme optima vary; many human enzymes near 37°C. Osmosis occurs in all cells with partially permeable membranes (animal cells may lyse or crenate). The story is fictional.',
};

export default lesson;
