import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 18 — avoiding confirmation bias. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Avoiding confirmation bias',
  summary: 'Ada wants Ghana to win. Lucía does too. That\'s exactly when research goes wrong. Learn how the way you ask AI can tilt the answer.',
  minutes: 12,
  outcomes: [
    'Explain confirmation bias',
    'Spot leading questions in your own prompts',
    'Ask neutral questions and look for evidence against',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'People tend to look for and favour information that confirms what they already believe.',
          isFact: true,
          explain: 'Psychologists call it confirmation bias. Raymond Nickerson\'s 1998 review called it one of the most widespread problems in human reasoning.',
        },
        {
          text: 'The way you word a question to an AI doesn\'t change its answer much.',
          isFact: false,
          explain: '"Why is Ghana the best market?" and "Which market fits best?" can get very different answers. Leading questions get agreeing answers.',
        },
        {
          text: 'AI assistants tend to go along with the view in your question.',
          isFact: true,
          explain: 'Researchers call this sycophancy: models often agree with the user\'s stated opinion. Ask neutrally.',
        },
        {
          text: 'Once you\'ve found three sources that agree, you can stop looking.',
          isFact: false,
          explain: 'If you only searched for agreement, you\'ll find it. Search for the strongest evidence against too.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask neutral questions ("Which fits best?", not "Why is X best?"), and always search for the strongest evidence against your favourite.',
    },
  ],
  apply: {
    scenario: 'Ada checks her own research for bias.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Neutral question, or leading?',
        groups: ['Neutral', 'Leading'],
        items: [
          { text: 'Which of these three markets fits our criteria best?', group: 0 },
          { text: 'Why is Ghana the obvious choice?', group: 1 },
          { text: 'What are the main risks in each market?', group: 0 },
          { text: 'Confirm that Ghana is better than Kenya.', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is confirmation bias?',
        options: [
          { text: 'Favouring information that confirms what you already believe' },
          { text: 'Confirming meetings by email', why: 'It\'s about how we judge information.' },
          { text: 'An AI bug', why: 'It\'s a human tendency, which AI can amplify.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What is "sycophancy" in AI?',
        options: [
          { text: 'The tendency to agree with the user\'s stated view' },
          { text: 'Being rude to users', why: 'The opposite: too agreeable.' },
          { text: 'Refusing to answer', why: 'It\'s about agreeing too readily.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which of Ada\'s prompts is leading?',
        lines: [
          'Compare Ghana, Kenya and Côte d\'Ivoire on these criteria.',
          'What could make each option fail?',
          'Give me reasons Ghana is the best choice.',
          'Which criterion matters most for a small pilot?',
        ],
        bug: 2,
        fix: 'What are the strongest arguments for and against Ghana?',
        explanation: 'It asks only for support for her favourite.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I asked the AI why Ghana is our best option and it agreed with me completely!',
        prompt: 'Best reply?',
        options: [
          { text: 'It tends to agree with how we ask. Try "Which market fits best, and what would make Ghana the wrong choice?"' },
          { text: 'Great, that settles it.', why: 'The question led the answer.' },
          { text: 'AI is always neutral.', why: 'It often mirrors the question.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Ask [[1]] questions, and search for the strongest evidence [[2]].',
        blanks: [['neutral'], ['against']],
        distractors: ['leading', 'for'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a neutral question.',
        tiles: ['Which', 'market', 'fits', 'our', 'criteria', 'best?'],
        distractors: ['obviously'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the leading question to a neutral one.',
        pairs: [
          ['"Why is Ghana best?"', '"Which market fits best?"'],
          ['"Confirm this will work."', '"What could make this fail?"'],
          ['"List the benefits."', '"List benefits and drawbacks, by importance."'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did Nickerson publish his review of confirmation bias?',
        answers: ['1998'],
        placeholder: 'A year',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request best tests Ada\'s favourite option?',
        options: [
          { text: 'Tell me more about Ghana\'s strengths.', why: 'More of the same.' },
          { text: 'What is the strongest evidence that Ghana would be the wrong next market? Be specific.' },
          { text: 'Is Ghana good?', why: 'Invites "yes".' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps fight bias, or feeds it?',
        groups: ['Fights bias', 'Feeds bias'],
        items: [
          { text: 'Asking for evidence against', group: 0 },
          { text: 'Only reading sources that agree', group: 1 },
          { text: 'Asking a sceptical colleague to review', group: 0 },
          { text: 'Stopping after three agreeing sources', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When is confirmation bias most dangerous?',
        options: [
          { text: 'When you already want a particular answer' },
          { text: 'When you don\'t care about the result', why: 'Wanting an answer is what tilts us.' },
          { text: 'Only when using AI', why: 'It\'s human; AI can amplify it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look at your last three prompts. Were any of them leading? Rewrite one neutrally.',
    starters: ['The leading prompt:', 'Neutral version:'],
  },
  deepen: { title: 'Try it today', summary: 'Before your next decision, ask AI: "What is the strongest evidence I\'m wrong?"' },
  notes: 'Nickerson (1998), Review of General Psychology, "Confirmation bias: a ubiquitous phenomenon in many guises". Sycophancy in language models is documented in published AI research (e.g. Sharma et al., 2023).',
};

export default lesson;
