import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14, with earlier ideas mixed in. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: length, steps, questions, fixes',
  summary: 'Set the length and tone, split big tasks, let it ask first, and diagnose bad answers.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can control length and tone', 'Show you can split, question and diagnose'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint three. You are now past the halfway mark of Unit 1. Most people never get this far with AI tools.', replies: ['Nice', "Let's do it"] },
        { tey: 'This one is about control: how long, what tone, in what order, and what to do when it goes wrong.' },
        { tey: 'Quick warm-up: a bad answer is a...', replies: ['Clue', 'Disaster'] },
        { tey: 'A clue. Exactly. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the week of the launch plan.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Reliable length instruction, or vague?',
        groups: ['Reliable', 'Vague'],
        items: [
          { text: 'Under 50 words', group: 0 },
          { text: 'Keep it snappy', group: 1 },
          { text: 'Fits on one slide', group: 0 },
          { text: 'Not too long', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which is a real tone word?',
        options: [{ text: 'Warm' }, { text: 'Good', why: 'A judgement, not a tone.' }, { text: 'Better', why: 'Not a tone.' }],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps for a big task.',
        lines: ['Ask for an outline only', 'Fix the outline', 'Write one section at a time', 'Review it as the reader'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can your team draft our whole partnership plan? Goals, timeline, budget, roles, risks.',
        prompt: "What is Ada's best first step with the AI?",
        options: [
          { text: 'Ask for an outline only, agree it with Lucía, then write each section.' },
          { text: 'Ask for everything in one request.', why: 'Five big sections at once will all be shallow.' },
          { text: 'Start with the budget section.', why: 'Agree the outline first.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the symptom to the missing piece.',
        pairs: [
          ['Invented a date', 'The facts'],
          ['Too formal for a friend', 'Who it is for'],
          ['Paragraphs instead of a table', 'The format'],
          ['400 words for a chat message', 'The length'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the anti-guessing line.',
        tiles: ['If', 'unclear,', 'ask', 'me', 'instead', 'of', 'guessing'],
        distractors: ['invent'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'For a big task, ask for an ... first (one word)',
        answers: ['outline'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Spot the instruction that will cause invented facts.',
        lines: ['Ask me up to 5 questions first.', 'If a number is missing, make a reasonable one up.', 'Then write one page.'],
        bug: 1,
        fix: 'If a number is missing, mark it as an open question.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Ada needs a chat message to her team about the delay. Which request is best?',
        options: [
          { text: 'Tell the team about the delay, keep it short.', why: '"Short" is vague. No tone.' },
          { text: 'Write a 2-line chat message to my team: testing moved to Friday, launch date unchanged. Friendly and calm.' },
          { text: 'Write a formal memo about the delay.', why: 'Wrong channel and tone for a team chat.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Let the AI ask first, or just give the context?',
        groups: ['Ask first', 'Just give it'],
        items: [
          { text: 'A case study you have never written', group: 0 },
          { text: 'A one-line thank-you', group: 1 },
          { text: 'A proposal on a topic you are unsure about', group: 0 },
          { text: 'Shortening a paragraph', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The AI draft calls me "Dear Valued Client" and is about 400 words. Help!',
        prompt: 'Which follow-up should Ada send the AI?',
        options: [
          { text: "Rewrite to Lucía by name, friendly, under 80 words, and end by asking her to approve the colours." },
          { text: 'Try again.', why: 'Adds none of the missing pieces.' },
          { text: 'Make it nicer.', why: 'Nicer how? And still no length.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: "Don't argue with the [[1]], fix the [[2]]. A bad answer is a [[3]].",
        blanks: [['answer'], ['request', 'prompt'], ['clue']],
        distractors: ['AI', 'disaster'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the channel to a sensible length.',
        pairs: [
          ['Team chat', '1 to 2 lines'],
          ['Client email', '4 to 6 lines'],
          ['Slide', '3 bullets'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The AI asked Ada 15 questions for a 3-line email. What is the fix?',
        options: [
          { text: 'Add a limit, like "up to 3 questions", or just give it the context' },
          { text: 'Answer all 15', why: 'Far too slow for 3 lines.' },
          { text: 'Never let it ask questions again', why: 'Useful for big tasks. Just add a limit.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The most reliable way to set length is a ... (one word)',
        answers: ['number', 'count'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Spot the step in the wrong place.',
        lines: ['Ask for the outline.', 'Fix the outline.', 'Send the plan to the manager.', 'Write each section.', 'Review it.'],
        bug: 2,
        fix: 'Send it last, after the review.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Formal or friendly?',
        groups: ['Formal', 'Friendly'],
        items: [
          { text: 'Please be advised...', group: 0 },
          { text: 'Quick heads up!', group: 1 },
          { text: 'We kindly request...', group: 0 },
          { text: 'Could you give it a thumbs-up?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Your proposal said dark mode takes '2 weeks'. Our developers say nobody estimated it yet.",
        prompt: 'What should Ada say?',
        options: [
          { text: "You're right. That was a guess I should have marked as open. I'll update it to 'estimate pending'." },
          { text: 'The AI worked it out.', why: 'It guessed. Own it.' },
          { text: '2 weeks is normal for everyone.', why: 'Nobody said that.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s first request for a big document.',
        tiles: ['Just', 'the', 'headings', 'for', 'now'],
        distractors: ['everything', 'final'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Back to Lesson 6: which request says who it is for best?',
        options: [
          { text: 'For someone busy.', why: 'Busy how? Who?' },
          { text: 'For my manager, who reads on her phone and wants the decision first.' },
          { text: 'For an important person.', why: 'Says nothing about how to write.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the move to its lesson idea.',
        pairs: [
          ['Set the length', 'Use a number or a shape'],
          ['Split the task', 'Outline first'],
          ['Ask first', 'Let it interview you'],
          ['Fix the request', 'Read the answer as clues'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Mistakes are cheapest to fix ... (one word)',
        answers: ['early'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the diagnose-and-fix routine.',
        lines: ['Read the bad answer', 'List each problem', 'Name the missing piece for each', 'Add them in one follow-up'],
      },
      {
        kind: 'sortGroups',
        prompt: 'True or false?',
        groups: ['True', 'False'],
        items: [
          { text: '"Try again" usually repeats the same problem', group: 0 },
          { text: 'AI tools always pick the right length', group: 1 },
          { text: 'Invented facts mean the request lacked facts', group: 0 },
          { text: 'Big tasks are best done in one go', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which follow-up fixes a too-long, jargon-filled answer?',
        options: [
          { text: '"Simpler."', why: 'Length still unset.' },
          { text: '"For a reader new to tech, in under 60 words."' },
          { text: '"Again."', why: 'Nothing new to work with.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which skill from this checkpoint would have saved you the most time last week?',
    starters: ['Last week I...', 'This would have helped because...'],
  },
  deepen: { title: 'Keep going', summary: 'Diagnose one bad AI answer this week using the symptom list.' },
  notes: 'Review only. No new claims.',
};

export default lesson;
