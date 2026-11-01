import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 19 — the seven most common prompt mistakes, before the Unit Challenge. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The seven most common prompt mistakes',
  summary: 'Seven traps almost everyone falls into, and the one-line fix for each.',
  minutes: 13,
  outcomes: [
    'Recognise the seven most common prompt mistakes',
    'Fix each one in a single line',
    'Check your own requests before you send them',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: "Last lesson before the Unit Challenge. Let's name the seven traps. You've seen all of them already.", replies: ['Hit me', 'Seven?!'] },
        { tey: '1. No facts. The AI invents them. Fix: give the facts, and say "only use these".' },
        { tey: '2. No reader. The tone is wrong. Fix: say who it is for and how they read.' },
        { tey: '3. No length. You get an essay. Fix: a number or a shape, like "3 bullets".', replies: ['That one is me', 'Next'] },
        { tey: '4. Wishes instead of details. "Make it amazing." Fix: say what amazing means, or show an example.' },
        { tey: '5. Everything at once. Shallow everywhere. Fix: outline first, then piece by piece.' },
        { tey: '6. "Try again." Same gaps, same guesses. Fix: say what to keep and what to change.' },
        { tey: "7. Sending without reading. The big one. Fix: read it as the reader would, every time.", replies: ['Guilty', 'Never again'] },
        { tey: "Most bad AI answers come from one of these seven. Fix them and you're ahead of most people using AI at work." },
      ],
    },
    {
      kind: 'compare',
      title: 'Four traps in one request, fixed',
      before: { label: 'Trapped', text: 'Write an amazing email about the project and the budget and the timeline and the team.' },
      after: {
        label: 'Fixed',
        text: 'For Lucía, our client: 4 lines on the timeline only. Testing moved to Friday; launch stays on the 14th. Friendly. (Budget and team in separate messages.)',
      },
      notes: ['Wish → details.', 'No reader → Lucía, a client.', 'No length → 4 lines.', 'Everything at once → one topic per message.'],
    },
    {
      kind: 'check',
      question: 'Which is the biggest mistake of all, according to Tey?',
      options: ['Not saying please', 'Sending without reading', 'Using too few words'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is checking requests for the seven traps.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to its fix.',
        pairs: [
          ['No facts', '"Only use these facts"'],
          ['No reader', 'Say who it is for'],
          ['No length', 'A number or a shape'],
          ['Everything at once', 'Outline first'],
          ['"Try again"', 'Say what to keep and change'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the trap in this request.',
        lines: ['For my manager, who reads on her phone.', 'Testing moved to Friday.', 'Make it amazing.', 'Under 4 lines.'],
        bug: 2,
        fix: 'Calm and direct, with the new date first.',
        explanation: 'A wish, not a detail (trap 4).',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which trap is this?',
        groups: ['No facts', 'No length', 'Everything at once'],
        items: [
          { text: 'Write about our project.', group: 0 },
          { text: 'Summarise this report.', group: 1 },
          { text: 'Plan, budget, write and design our whole launch.', group: 2 },
          { text: 'Write the update for Lucía.', group: 0 },
          { text: 'Explain our product.', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Ada got a bad answer and typed "try again". Which trap is that?',
        options: [{ text: 'Trap 6: same gaps, same guesses' }, { text: 'Trap 1: no facts', why: 'Close, but the trap is the empty follow-up.' }, { text: 'Not a trap', why: 'It is a classic one.' }],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the fix for trap 7.',
        tiles: ['Read', 'it', 'as', 'the', 'reader', 'would'],
        distractors: ['skip', 'trust'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Your email had the wrong launch date. Did you read it before sending?",
        prompt: 'Which trap did Ada fall into, and what does she say?',
        options: [
          { text: 'The AI wrote it, not me.', why: 'She sent it. She owns it (trap 7).' },
          { text: 'Dates are not important.', why: 'They are very important to a client.' },
          { text: "I didn't read it closely enough, sorry. The launch is the 14th. I'll always check dates from now on." },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many common prompt traps did Tey name? (number)',
        answers: ['7', 'seven'],
        placeholder: 'Number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the fixes.',
        template: 'No facts? Say "only use [[1]]". No length? Give a [[2]]. Wishes? Show an [[3]].',
        blanks: [['these', 'these facts'], ['number', 'shape'], ['example']],
        distractors: ['wish', 'emoji'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request avoids all seven traps best?',
        options: [
          { text: 'Write an amazing project email.', why: 'Wish, no facts, no reader, no length.' },
          { text: 'Write about the project, the budget, the team and the risks.', why: 'Everything at once, no reader, no length.' },
          { text: 'For my manager: 3 bullets on the testing delay (cause, new date, no risk to launch). Calm and direct.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s pre-send check.',
        lines: ['Did I give the facts?', 'Did I say who it is for?', 'Did I set a length?', 'Did I read the answer as the reader?'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Trap or fine?',
        groups: ['Trap', 'Fine'],
        items: [
          { text: '"Make it perfect"', group: 0 },
          { text: '"Under 50 words, friendly"', group: 1 },
          { text: '"Try again"', group: 0 },
          { text: '"Keep line 1, shorten the rest"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "I keep getting essays back from my AI tool when I just want a quick answer. What am I doing wrong?",
        prompt: 'What should Ada tell her?',
        options: [
          { text: 'Use a different AI.', why: 'Same request, same essay. Add a length (trap 3).' },
          { text: 'Add a length: "answer in 2 sentences" or "3 bullets". Without it, it tends to cover everything.' },
          { text: 'Ask it to "be brief, please".', why: 'Better than nothing, but a number works more reliably.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Trap 5 is asking for everything at ... (one word)',
        answers: ['once'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the symptom to the trap.',
        pairs: [
          ['Invented date', 'No facts'],
          ['Way too formal', 'No reader'],
          ['A 600-word essay', 'No length'],
          ['Shallow everywhere', 'Everything at once'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Tey call "sending without reading" the big one?',
        options: [
          { text: 'Every other mistake can be caught there, before it reaches anyone' },
          { text: 'It is the most polite mistake', why: 'Not about politeness.' },
          { text: 'It never happens', why: 'It happens all the time.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of the seven traps do you fall into most often? What will remind you to avoid it?',
    starters: ['My usual trap is...', 'To avoid it I will...'],
  },
  deepen: { title: 'Before the Unit Challenge', summary: 'Look back at three requests you made this week. Which traps can you spot?' },
  notes: '"Seven traps" is a Teyro teaching device summarising Unit 1. "Most bad answers come from one of these" is phrased as Tey\'s opinion, not a statistic.',
};

export default lesson;
