import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 2 — your voice: what it is made of, and how to get AI drafts to sound like you. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Make it sound like you',
  summary: 'People can tell when a message does not sound like you. Teach the AI your voice in two minutes.',
  minutes: 13,
  outcomes: [
    'Name the five things that make up a writing voice',
    'Get the AI to describe your style from real samples',
    'Keep a short "my voice" note to reuse',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Same message, two voices',
      before: {
        label: 'Generic AI voice',
        text: 'I hope this email finds you well! I wanted to reach out to provide a quick update regarding the exciting progress on our sign-up experience.',
      },
      after: {
        label: "Ada's voice",
        text: 'Hi Lucía! Quick one: sign-up is done, and it looks great on phones.',
      },
      notes: [
        "Ada uses short sentences; the generic version uses one long one.",
        'Ada gets to the point in the first line.',
        '"Reach out" and "exciting progress" are words Ada never uses.',
      ],
    },
    {
      kind: 'reading',
      title: 'What a voice is made of',
      html:
        '<p>Your writing voice is not magic. It is a handful of habits you repeat without thinking:</p>' +
        '<ol>' +
        '<li><strong>Sentence length.</strong> Short and punchy, or long and flowing?</li>' +
        '<li><strong>Word choice.</strong> Everyday words or formal ones? "Get" or "obtain"?</li>' +
        '<li><strong>Openings and sign-offs.</strong> "Hi!" or "Dear"? "Thanks!" or "Kind regards"?</li>' +
        '<li><strong>Warmth and humour.</strong> A little joke? An exclamation mark? None at all?</li>' +
        '<li><strong>Things you never say.</strong> Everyone has phrases they would never write. These matter as much as the rest.</li>' +
        '</ol>' +
        '<p>Once you can name these, you can tell the AI. And there is a shortcut: you do not have to name them yourself. Paste two or three messages you wrote and ask the AI to describe your style. Then save that description.</p>',
    },
    {
      kind: 'steps',
      title: 'Build your voice note in two minutes',
      steps: [
        { title: 'Pick 3 real messages you wrote', body: 'Ones that sounded like you on a good day. Remove names and private details.' },
        {
          title: 'Ask for a style description',
          body: 'Paste them and ask the AI to describe the style.',
          code: 'Here are 3 messages I wrote: [messages]. Describe my writing style in 5 short bullets: sentence length, word choice, openings and sign-offs, warmth, and phrases I avoid.',
          language: 'plaintext',
        },
        { title: 'Fix the description', body: 'Correct anything that is off, and add the phrases you never use ("reach out", "circle back", whatever yours are).' },
        { title: 'Save it and reuse it', body: 'Paste it at the start of writing requests: "Write in my voice: [voice note]."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'The "never say" list is the fastest win. Banning three phrases you hate fixes more than describing a tone.',
    },
    {
      kind: 'check',
      question: 'What is the quickest way to describe your own voice?',
      options: ['Guess at adjectives', 'Paste 3 of your messages and ask the AI to describe the style', 'Use the AI default'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is teaching the AI her voice.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of a voice to an example.',
        pairs: [
          ['Sentence length', 'Short and punchy'],
          ['Word choice', '"Get", not "obtain"'],
          ['Sign-off', '"Thanks!" not "Kind regards"'],
          ['Never say', 'No "reach out"'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Generic AI voice, or Ada\'s voice?',
        groups: ['Generic AI voice', "Ada's voice"],
        items: [
          { text: 'I hope this email finds you well.', group: 0 },
          { text: 'Hi Lucía! Quick one:', group: 1 },
          { text: 'I wanted to reach out regarding...', group: 0 },
          { text: 'Sign-up is done, and it looks great.', group: 1 },
          { text: 'Please do not hesitate to contact me.', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why use 3 samples instead of 1?',
        options: [
          { text: 'The AI needs exactly 3', why: 'There is no magic number; more than one shows a pattern.' },
          { text: 'To make the request longer', why: 'It is about the pattern, not the length.' },
          { text: 'One message can be a one-off; three show the habits you repeat' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the request for a style description.',
        tiles: ['Describe', 'my', 'writing', 'style', 'in', '5', 'bullets'],
        distractors: ['ignore', 'poem'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Everything I write with AI sounds like a bank letter. That's not me at all!",
        prompt: 'What should Ada suggest?',
        options: [
          { text: 'Paste three messages you wrote, ask it to describe your style, save that, and add it to your requests.' },
          { text: 'Add "sound less like a bank".', why: 'Better than nothing, but vague.' },
          { text: 'Stop using AI for writing.', why: 'Teaching it your voice fixes it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s voice note.',
        template: 'My style: [[1]] sentences, everyday words, I start with "Hi!" and sign off "[[2]]". I never say "[[3]]".',
        blanks: [['short'], ['Thanks!', 'Thanks'], ['reach out', 'circle back']],
        distractors: ['endless', 'Yours faithfully'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the line that does not sound like Ada (short, warm, direct).',
        lines: ['Hi Lucía!', 'Sign-up is done.', 'I wanted to reach out to circle back on the aforementioned palette.', 'Could you OK the colours by Wednesday?'],
        bug: 2,
        fix: 'Just checking on the colours.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The fastest voice win is a "never ..." list (one word)',
        answers: ['say', 'use'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the voice-note routine.',
        lines: ['Pick 3 messages you wrote', 'Ask the AI to describe the style', 'Fix the description', 'Save it and reuse it'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request will sound most like Ada?',
        options: [
          { text: 'Write a friendly update.', why: '"Friendly" in whose voice?' },
          {
            text: 'Write in my voice: short sentences, everyday words, "Hi!" to open, "Thanks!" to close, never "reach out". Update Lucía: sign-up done, testing Friday.',
          },
          { text: 'Write like a human.', why: 'Which human? Give your habits.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Should these go in the samples Ada pastes?',
        groups: ['Good sample', 'Leave it out'],
        items: [
          { text: 'A message she wrote that sounded like her', group: 0 },
          { text: 'A formal letter her lawyer wrote', group: 1 },
          { text: 'A chat message to a teammate (names removed)', group: 0 },
          { text: 'An email full of a client\'s private details', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'My boss says my AI emails "don\'t sound like me anymore". Is that bad?',
        prompt: "What's Ada's honest answer?",
        options: [
          { text: "Not at all, nobody cares.", why: 'People notice. Trust is built on sounding like yourself.' },
          { text: 'Tell your boss it is an AI.', why: 'Honesty is fine, but the fix is getting your voice back.' },
          { text: 'It matters: people trust messages that sound like you. A voice note fixes most of it, and always edit the final line yourself.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Before pasting your samples, remove names and private ... (one word)',
        answers: ['details', 'information', 'info', 'data'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the generic phrase to Ada\'s version.',
        pairs: [
          ['"I hope this finds you well"', '"Hi!"'],
          ['"I wanted to reach out"', '"Quick one:"'],
          ['"Please do not hesitate to contact me"', '"Shout if you need anything!"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where should Ada put her voice note?',
        options: [
          { text: 'At the very end, after sending', why: 'Too late to help.' },
          { text: 'At the start of writing requests (or her tool\'s saved instructions, if it has them)' },
          { text: 'Nowhere, she will remember', why: 'Saving it is the point.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Write three phrases you would never use in a work message. Why do they bother you?',
    starters: ['I would never write...', 'Because...'],
  },
  deepen: { title: 'Do it now', summary: 'Build your voice note with 3 of your own messages and save it next to your recipe.' },
  notes: 'Voice components are general writing-craft guidance. Example phrases are common corporate clichés, not attributed to any tool.',
};

export default lesson;
