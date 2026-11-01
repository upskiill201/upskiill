import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: prompt cards v3. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Prompt cards v3',
  summary: 'A week of complaints, invitations and a speech, and two more cards in Lucía\'s deck. Tap through card #4, "Write it with me".',
  minutes: 11,
  outcomes: [
    'Save a writing prompt that keeps your voice',
    'Build tone, facts and honesty checks into the card',
    'Add writing cards to your own kit',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Lucía\'s prompt card #4: "Write it with me"',
      text: 'WRITE IT WITH ME. Use for: messages, emails, letters, speeches. Step 1: I write it badly first. Step 2: "Here\'s my draft: [DRAFT]. It\'s for [WHO]. Edit, don\'t rewrite. Keep my words and jokes. Don\'t add anything. Tone: [DIAL]." Never use: thrilled, embark, journey, momentous. Complaints: what happened, proof, one request, a deadline. No laws I haven\'t checked. Card #5, "Polish it": "List problems: original, suggestion, why. Don\'t rewrite. Don\'t change names." Before sending: names, dates, numbers by hand. Read it aloud. Version: v3, Day 15.',
      hotspots: [
        { phrase: 'I write it badly first', note: 'Her draft carries her voice and her facts. The blank prompt carried neither.' },
        { phrase: 'Edit, don\'t rewrite', note: 'The line that stopped Mateo asking who hacked her phone.' },
        { phrase: 'Tone: [DIAL]', note: 'Warmer, firmer, simpler, shorter, more formal. Pick two at most.' },
        { phrase: 'Never use: thrilled, embark, journey, momentous', note: 'Her banned words. Yours might be different.' },
        { phrase: 'No laws I haven\'t checked', note: 'The invented "Article 47" taught her this one.' },
        { phrase: 'Don\'t change names', note: 'Because Mamá is Rosa, not Rose.' },
        { phrase: 'Read it aloud', note: 'The oldest check there is, and still the best final one.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Your banned-words list is personal. Add any word you\'d never say. The AI will avoid it if you ask.',
    },
  ],
  apply: {
    scenario: 'Reading prompt cards #4 and #5.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s step 1 on card #4?',
        options: [
          { text: 'Ask AI for a perfect draft', why: 'She writes first.' },
          { text: 'Choose the tone', why: 'That\'s part of step 2.' },
          { text: 'Lucía writes it badly first' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line on the card to the story behind it.',
        pairs: [
          ['"Edit, don\'t rewrite"', 'Mateo: "Who hacked your phone?"'],
          ['"No laws I haven\'t checked"', 'Article 47'],
          ['"Don\'t change names"', 'Mamá became Rose'],
          ['"Proof, request, deadline"', 'The MX$1,850 fee'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'Can I have your banned words? I want my emails to sound less like a robot.',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'Take mine, then add the words you\'d never say. Everyone\'s list is different.' },
          { text: 'No, they only work for me.', why: 'They work for anyone; a personal list works best.' },
          { text: 'Just ban all long words.', why: 'Too blunt; ban the ones that don\'t sound like you.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Card #5, "Polish it".',
        template: 'List problems: original, [[1]], why. Don\'t [[2]].',
        blanks: [['suggestion'], ['rewrite']],
        distractors: ['price', 'apologise'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Card #4 "Write it with me" or card #5 "Polish it"?',
        groups: ['Write it with me', 'Polish it'],
        items: [
          { text: 'Turning messy notes into a message', group: 0 },
          { text: 'Checking a finished letter for typos', group: 1 },
          { text: 'A complaint email', group: 0 },
          { text: 'A last check before printing the speech', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on Tomás\'s copy breaks the card?',
        lines: [
          'Here\'s my draft: [DRAFT].',
          'Edit, don\'t rewrite.',
          'Feel free to add nice details.',
        ],
        bug: 2,
        fix: '"Don\'t add anything."',
        explanation: '"Nice details" is how "thank you for the lovely dinner" got into his client email.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Name one of Lucía\'s banned words.',
        answers: ['thrilled', 'embark', 'journey', 'momentous', 'embarking'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the checks before sending.',
        lines: ['Accept or reject the suggestions', 'Check names by hand', 'Check dates and numbers', 'Read it aloud', 'Send'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s new in v3 compared with v1 and v2?',
        options: [
          { text: 'Her own draft comes first, and the AI edits instead of writing' },
          { text: 'More brackets', why: 'The change is who writes first.' },
          { text: 'It\'s only for emails', why: 'Messages, letters and speeches too.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Which card would you use to reply to a friend\'s wedding invitation you can\'t attend?',
        options: [
          { text: 'Card #2, "Compare it"', why: 'Nothing to compare.' },
          { text: 'Card #4, "Write it with me", with a warm tone dial' },
          { text: 'Card #3, "Read it"', why: 'That\'s for long documents.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own card #4. What are your banned words, and which tone do you need most often?',
    starters: ['My banned words:...', 'My usual tone:...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add "Write it with me" and "Polish it" to your prompt-cards note, with your own banned words. Use them on the next message you\'re nervous about sending.',
  },
  notes: 'Prompt cards v3 (fictional). Running device.',
};

export default lesson;
