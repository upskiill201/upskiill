import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 4 — four paragraphs: hook, why them, why you, the close. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Four paragraphs',
  summary: 'Clinton stares at the blank page. Miracle gives him a shape so he never has to: four short paragraphs, each with one job. Fill the boxes and the letter writes itself.',
  minutes: 12,
  outcomes: ['Write a cover letter in four short paragraphs', 'Give each paragraph one clear job', 'Keep the whole letter under one page'],
  learn: [
    {
      kind: 'steps',
      title: 'One job per paragraph',
      steps: [
        { title: '1. The hook (2 to 3 sentences)', body: 'Open with something only you could say that connects you to them, then name the role. "My mum\'s savings group kept its accounts in a school exercise book until I built them a tracker. That\'s why I\'m applying for Njangi Pay\'s Graduate Developer role."' },
        { title: '2. Why them (2 to 3 sentences)', body: 'Show you know what they do and why it matters to you. One or two real details from your research: their product, a recent launch, their customers, their values.' },
        { title: '3. Why you (3 to 5 sentences)', body: 'Two short proofs that match their must-haves. Not your whole CV: the two things they care about most. "You need someone who can explain technical ideas. Every Saturday I explain phone repairs to customers at my aunt\'s stall..."' },
        { title: '4. The close (2 sentences)', body: 'Say what you\'d like to happen next, politely and confidently, and thank them. "I\'d love to talk about how I could help. Thank you for reading."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Four short paragraphs, around 300 words. If a paragraph does two jobs, split it. If it does none, cut it.',
    },
  ],
  apply: {
    scenario: 'Clinton fills the four boxes.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the four paragraphs in order.',
        lines: ['The hook', 'Why them', 'Why you', 'The close'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each sentence to its paragraph.',
        pairs: [
          ['My mum\'s njangi kept its accounts in an exercise book until I built a tracker.', 'The hook'],
          ['Your reminders feature solves the exact thing my mum\'s group needed.', 'Why them'],
          ['Every Saturday I explain phone repairs to customers.', 'Why you'],
          ['I\'d love to talk about how I could help.', 'The close'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What goes in "Why you"?',
        options: [
          { text: 'Two short proofs that match their must-haves' },
          { text: 'Your whole CV', why: 'Just the two things they care about most.' },
          { text: 'A list of adjectives', why: 'Proof, not adjectives.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the paragraph doing too many jobs.',
        lines: ['Hook: my mum\'s njangi and the tracker.', 'Why them: their mission, my GPA, my football captaincy, my French, my hobbies and my salary hopes.', 'Close: I\'d love to talk. Thank you.'],
        bug: 1,
        explanation: 'That paragraph is trying to be the whole CV. Keep "Why them" about them.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which paragraph does each line belong in?',
        groups: ['Why them', 'Why you'],
        items: [
          { text: 'You\'re used by 200,000 savings groups', group: 0 },
          { text: 'I built a tracker 42 people use', group: 1 },
          { text: 'You launched contribution reminders this year', group: 0 },
          { text: 'I stayed calm when our venue cancelled', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'My letter is two pages. Is that okay if it\'s all good stuff?',
        options: [
          { text: 'No: four short paragraphs, around 300 words. I\'ll keep only the best two proofs.' },
          { text: 'Yes, more is better.', why: 'Busy readers skim long letters. Short and sharp wins.' },
          { text: 'Make it three pages.', why: 'Even longer, even less read.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'About how many words should the whole letter be?',
        options: [
          { text: 'Around 300' },
          { text: 'Around 1,000', why: 'Too long. Around 300.' },
          { text: 'Around 30', why: 'Too short to answer why them and why you.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'If a paragraph does two jobs, [[1]] it. If it does none, [[2]] it.',
        blanks: [['split'], ['cut', 'delete']],
        distractors: ['double', 'bold', 'keep'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The first paragraph of a cover letter is called the ___. (one word)',
        answers: ['hook', 'opening', 'introduction'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which close is best?',
        options: [
          { text: '"I\'d love to talk about how I could help your team. Thank you for reading."' },
          { text: '"I hope to hear from you, if you have time, maybe."', why: 'Too unsure. Be polite and clear.' },
          { text: '"Call me tomorrow at 9am."', why: 'Too pushy. Invite, don\'t demand.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'For a role you want, write one sentence for each of the four boxes.',
    starters: ['Hook: ...', 'Why them: ...', 'Why me: ...', 'Close: ...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your four boxes as four sentences. Then grow each into a short paragraph. Keep the whole thing under 350 words.',
  },
  notes: 'Four-part cover letter structure (opening, why the organisation, why you, close) follows standard careers-service guidance, simplified.',
};

export default lesson;
