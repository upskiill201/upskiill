import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 6 — replying to an angry message. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Replying to an angry message',
  summary: 'Before the call, Carmen sent a furious email. Ada\'s first instinct is to defend. Tey shows her how AI can help her cool down and reply well.',
  minutes: 12,
  outcomes: [
    'Pause before replying to anger',
    'Use AI to draft a calm, owning reply',
    'Acknowledge, own, fix, and follow up',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Carmen wrote: "This is unacceptable. Our shops lost sales because of you." What do you want to reply?', replies: ['It was the bank\'s fault!'] },
        { tey: 'Normal feeling. Don\'t send it. Write it to the AI instead: "Here\'s what I want to say. Help me turn it into a calm reply that owns our part."', replies: ['What should the reply do?'] },
        { tey: 'Four things: acknowledge the impact ("Your shops lost sales; I\'m sorry"), own your part, say what\'s fixed, and give the next step ("Let\'s talk at 11:30").', replies: ['And the bank?'] },
        { tey: 'Mention the cause briefly as a fact, not an excuse: "A bank update broke our connection; we\'ve fixed it and added an alert." Then check the draft sounds like you.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Pause. Vent to the AI, not the client. Reply: acknowledge the impact, own your part, say what\'s fixed, give the next step.',
    },
  ],
  apply: {
    scenario: 'Ada replies to Carmen\'s angry email.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the calm reply.',
        lines: ['Acknowledge the impact', 'Own your part', 'Say what\'s fixed', 'Give the next step'],
      },
      {
        kind: 'mcq',
        prompt: 'What should Ada do with her first angry reply?',
        options: [
          { text: 'Send it to clear the air', why: 'It will make things worse.' },
          { text: 'Not send it; give it to the AI to turn into a calm reply' },
          { text: 'Send it to Tobi', why: 'Don\'t send it at all.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the best reply draft?',
        options: [
          { text: 'Write a reply proving it was the bank.', why: 'Defensive.' },
          { text: 'A client is angry about a two-hour outage. Draft a short, calm reply that acknowledges the impact, owns our part, says what\'s fixed, and confirms our 11:30 call. No excuses.' },
          { text: 'Write something polite.', why: 'Too vague.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Owning, or defending?',
        groups: ['Owning', 'Defending'],
        items: [
          { text: '"Your shops lost sales; I\'m sorry"', group: 0 },
          { text: '"It wasn\'t our fault"', group: 1 },
          { text: '"We\'ve fixed it and added an alert"', group: 0 },
          { text: '"These things happen"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Carmen says: "This is unacceptable. Our shops lost sales because of you."',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'It was the bank, not us.', why: 'Defensive.' },
          { text: 'Sorry for any inconvenience.', why: 'Too vague; doesn\'t own it.' },
          { text: 'You\'re right that shops lost sales, and I\'m sorry. A bank update broke our connection; it\'s fixed and we\'ve added an alert. Let\'s go through what we\'ll do for shops at 11:30.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Vent to the [[1]], not the [[2]].',
        blanks: [['AI'], ['client']],
        distractors: ['manager', 'world'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line weakens Ada\'s reply?',
        lines: [
          'Your shops lost sales this morning, and I\'m sorry.',
          'A bank update broke our connection; it\'s now fixed.',
          'To be fair, outages happen to every payment app.',
          'Let\'s agree what we\'ll do for shops at 11:30.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It minimises the impact; it sounds like an excuse.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to Ada\'s line.',
        pairs: [
          ['Acknowledge', 'Your shops lost sales'],
          ['Own', 'I\'m sorry'],
          ['Fixed', 'We\'ve added an alert'],
          ['Next step', 'Let\'s talk at 11:30'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s opening line.',
        tiles: ['Your', 'shops', 'lost', 'sales,', 'and', 'I\'m', 'sorry'],
        distractors: ['but'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many things should the calm reply do?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Cause as a fact, or as an excuse?',
        groups: ['Fact', 'Excuse'],
        items: [
          { text: '"A bank update broke our connection"', group: 0 },
          { text: '"Blame the bank, not us"', group: 1 },
          { text: '"We\'ve added an alert"', group: 0 },
          { text: '"Nothing we could do"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why acknowledge the impact first?',
        options: [
          { text: 'It shows you understand what it cost them, which lowers the heat' },
          { text: 'It\'s polite filler', why: 'It changes the tone of the whole exchange.' },
          { text: 'It admits legal blame', why: 'It acknowledges impact.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of an angry message you once replied to too fast. How would the four parts have changed it?',
    starters: ['I replied...', 'With the four parts...'],
  },
  deepen: { title: 'Try it today', summary: 'Next time you feel defensive about a message, write your raw reply to AI first and ask for a calm version.' },
  notes: 'Fictional scenario.',
};

export default lesson;
