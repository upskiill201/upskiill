import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: prompt cards v1. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Prompt cards v1',
  summary: 'Lucía keeps rewriting the same good prompts from memory. Ada\'s advice: save the ones that work. Tap through Lucía\'s first prompt card, the one she\'ll use all month.',
  minutes: 11,
  outcomes: [
    'Save a prompt that worked as a reusable card',
    'Mark the parts you change each time',
    'Start your own prompt kit',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Lucía\'s prompt card #1: "Plan it"',
      text: 'PLAN IT. Use for: anything with a date and a budget. Prompt: "Help me plan [WHAT] for [WHO]. Details: [WHEN], [WHERE], [HOW MANY], budget [AMOUNT]. Before you plan, ask me questions one at a time. Then give me the plan as [FORMAT]." Follow-ups that worked: "Shorter." "Change one thing: ..." "What am I forgetting?" Never paste: guests\' phone numbers or addresses. Worked for: the Oaxaca Saturday, the budget. Version: v1, Day 1.',
      hotspots: [
        { phrase: 'Use for: anything with a date and a budget', note: 'A card says when to reach for it, so she grabs the right one fast.' },
        { phrase: '[WHAT] for [WHO]', note: 'Brackets mark what changes each time. Everything else stays.' },
        { phrase: '[WHEN], [WHERE], [HOW MANY], budget [AMOUNT]', note: 'Context and limits, built in. She can\'t forget them now.' },
        { phrase: 'ask me questions one at a time', note: 'The interview trick from lesson 7, saved forever.' },
        { phrase: 'as [FORMAT]', note: 'The last part of the recipe: the shape she wants.' },
        { phrase: '"What am I forgetting?"', note: 'Her favourite follow-up: it found Tía Carmela\'s transport.' },
        { phrase: 'Never paste: guests\' phone numbers or addresses', note: 'The privacy rule lives on the card, right where she\'ll need it.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When a prompt works, save it with [BRACKETS] for the parts that change. Keep the cards in your notes app. You\'ll build a kit by the end of this course.',
    },
  ],
  apply: {
    scenario: 'Reading prompt card #1.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What do the [BRACKETS] on the card mean?',
        options: [
          { text: 'Parts the AI fills in', why: 'Lucía fills them in each time.' },
          { text: 'The parts Lucía changes each time she uses the card' },
          { text: 'Optional extras', why: 'They\'re the details that change, not extras.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the card to the lesson it came from.',
        pairs: [
          ['[WHEN], [WHERE], budget', 'The recipe'],
          ['"Ask me questions one at a time"', 'The interview trick'],
          ['"Shorter." "Change one thing"', 'Follow-ups'],
          ['"Never paste: phone numbers"', 'What never goes in the box'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Fill in the card for the gift question.',
        template: 'Help me plan [[1]] for my parents. Budget [[2]].',
        blanks: [['a gift', 'an anniversary gift', 'a present'], ['MX$3,000', 'MX$3000', '3000', '3,000']],
        distractors: ['a party', 'everything'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Should it go on a prompt card?',
        groups: ['On the card', 'Not on the card'],
        items: [
          { text: 'A prompt that worked, with brackets', group: 0 },
          { text: 'Tía Carmela\'s address', group: 1 },
          { text: 'A follow-up that fixed things', group: 0 },
          { text: 'A one-off answer you\'ll never reuse', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Did you save it? Don\'t make me ask twice.',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'No, I\'ll remember it.', why: 'She\'d already rewritten it from memory three times.' },
          { text: 'Saved as card #1, "Plan it", with brackets for what changes. I\'m starting a deck.' },
          { text: 'I saved the whole chat.', why: 'A card is shorter and reusable.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s Lucía\'s favourite follow-up on card #1? (Type it.)',
        answers: ['What am I forgetting?', 'what am i forgetting', 'What am I forgetting'],
        placeholder: 'The follow-up',
      },
      {
        kind: 'findBug',
        prompt: 'Which line on Tomás\'s card is a mistake?',
        lines: [
          'Use for: emails to clients.',
          'Prompt: "Write an email to [WHO] about [WHAT], under [LENGTH]."',
          'Example data: Sr. Pérez, phone 55 1234 5678, home address...',
        ],
        bug: 2,
        fix: 'Use placeholders: "[CLIENT NAME]".',
        explanation: 'Real private details don\'t belong on a card you\'ll paste again and again.',
      },
      {
        kind: 'mcq',
        prompt: 'Why write "Use for:" on each card?',
        options: [
          { text: 'So she can grab the right card fast' },
          { text: 'The AI needs it', why: 'It\'s for Lucía, not the AI.' },
          { text: 'It\'s required by law', why: 'It\'s just a habit that saves time.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how a card is born.',
        lines: ['A prompt gets a great answer', 'Copy the prompt', 'Swap specifics for [BRACKETS]', 'Add "use for" and good follow-ups', 'Save it in your notes'],
      },
      {
        kind: 'mcq',
        prompt: 'It\'s Day 1. Which card does Lucía probably need next?',
        options: [
          { text: 'One for Portuguese verb tables', why: 'Possible later; the flat comes first.' },
          { text: 'One for the anniversary cake recipe', why: 'Not her most urgent job.' },
          { text: 'One for researching and comparing flats: her move is in 27 days' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own prompt card #1 for something you do every week. Use [BRACKETS] for the parts that change.',
    starters: ['Use for:...', 'Prompt: "..."'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Create a note called "Prompt cards" in your notes app. Paste your card #1 from the Reflect step. Use it once this week and add one follow-up that worked.',
  },
  notes: 'Prompt card v1 (fictional). Running device across the course: v1 Day 1 to v5 Day 30.',
};

export default lesson;
