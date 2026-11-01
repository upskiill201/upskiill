import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 17 — learning to code with AI, honestly: ask it to explain, not to build your site. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Learning to code with AI, honestly',
  summary: 'Clinton says: "Why learn HTML? AI can build your whole site in ten seconds." He\'s half right. The trick is knowing which half, and it\'s the difference between having a website and being able to fix one.',
  minutes: 12,
  outcomes: ['Use AI to explain code, not replace your learning', 'Check AI\'s code instead of trusting it', 'Explain why you still need to understand HTML'],
  learn: [
    {
      kind: 'story',
      title: 'Ten seconds',
      beats: [
        { speaker: 'narrator', text: 'Tuesday night. Clinton sends Kofi a screen recording: he types "make me a music website" into an AI chatbot, and a whole page of code appears.' },
        { speaker: 'clinton', text: 'Ten seconds, bro. Why are you learning tags like it\'s 1991?' },
        { speaker: 'narrator', text: 'Kofi tries it. The page looks okay. Then he tries to change the gig date and has no idea which line to touch. Then he spots that the AI wrote "Mensah Beats" with a heading tag that doesn\'t exist.' },
        { speaker: 'miracle', text: 'AI is a brilliant tutor and a terrible replacement for understanding. If you can\'t read the code, you can\'t fix it the night before the gig. And it does make mistakes.' },
        { speaker: 'kofi', text: 'So how do I use it?' },
        { speaker: 'miracle', text: 'Ask it to explain, not to build. "What does this tag do?" "Why is my heading huge?" Then you write it, and you understand it.' },
      ],
      choice: {
        prompt: 'What should Kofi do with AI?',
        options: [
          {
            text: 'Ask it to explain things he\'s stuck on, then write the code himself.',
            outcome: 'Kofi asks why his paragraph is inside his heading. The AI explains the missing closing tag. He fixes it himself, and now he\'ll never forget it.',
            best: true,
          },
          {
            text: 'Let AI build the whole site and send it to the organiser.',
            outcome: 'It works until Saturday morning, when the organiser asks for a change and Kofi can\'t find the line. Owning your code means understanding it.',
          },
          {
            text: 'Never touch AI, it\'s cheating.',
            outcome: 'Using AI to understand isn\'t cheating, it\'s a tutor that never gets tired. The line is asking it to think FOR you.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Check the AI\'s work',
      caption: 'This is the code Clinton\'s AI wrote. It looks fine at a glance. Look at the page: the title isn\'t a heading at all. Can you see why?',
      code: '<header1>Mensah Beats</header1>\n<p>Music producer from Accra.</p>\n',
      challenge: 'Fix the made-up tag so Mensah Beats becomes a real main heading.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Use AI to explain, not to replace. If you can\'t read the code it gives you, you can\'t check it, and you can\'t fix it.',
    },
  ],
  apply: {
    scenario: 'Kofi uses AI the honest way.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fix the AI\'s made-up tag: header1 isn\'t a real HTML tag',
        starter: '<header1>Mensah Beats</header1>\n<p>Music producer from Accra.</p>\n',
        solution: '<h1>Mensah Beats</h1>\n<p>Music producer from Accra.</p>\n',
        hint: 'The main heading tag is h1. Change both tags.',
        checks: [
          { message: 'A real main heading that says Mensah Beats', dom: { selector: 'h1', text: 'Mensah Beats' } },
          { message: 'The paragraph is still there', dom: { selector: 'p', text: 'Music producer' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which question to AI helps Kofi LEARN?',
        options: [
          { text: '"Build my whole website."', why: 'He\'d get a page, but learn nothing, and couldn\'t fix it later.' },
          { text: '"Why does my paragraph show up inside my heading?"' },
          { text: '"Do my HTML homework."', why: 'That\'s asking it to think for him. Asking WHY is how he learns.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Learning with AI, or letting AI do the learning?',
        groups: ['Learning with AI', 'AI does it for you'],
        items: [
          { text: 'Asking what the lang attribute is for', group: 0 },
          { text: 'Pasting AI\'s page without reading it', group: 1 },
          { text: 'Asking it to explain a bug, then fixing it yourself', group: 0 },
          { text: 'Asking it to finish your lesson\'s exercises', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The AI wrote this. Tap the line that\'s wrong.',
        language: 'html',
        lines: ['<h1>Mensah Beats</h1>', '<p>Next gig: Saturday</p>', '<paragraph>Book me for your event.</paragraph>'],
        bug: 2,
        fix: '<p>Book me for your event.</p>',
        explanation: 'There\'s no paragraph tag. It\'s p. AI makes confident mistakes, so read what it gives you.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'So you\'re saying AI is useless?',
        options: [
          { text: 'Yes, totally useless.', why: 'That\'s not what Kofi learned. AI is a great tutor.' },
          { text: 'Yes, and it\'ll steal your job.', why: 'Not the point here. The point is how to learn with it.' },
          { text: 'No, it\'s a great tutor. I just need to understand the code myself, so I can fix it.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Why does Kofi still need to understand HTML if AI can write it?',
        options: [
          { text: 'To check AI\'s code and fix his site himself, any time' },
          { text: 'He doesn\'t, AI never makes mistakes', why: 'It just wrote header1 and paragraph, two tags that don\'t exist.' },
          { text: 'Because AI is against the rules', why: 'It isn\'t. Understanding is what lets him use it well.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each made-up tag to the real one.',
        pairs: [
          ['<header1>', '<h1>'],
          ['<paragraph>', '<p>'],
          ['<bold>', '<strong>'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s rule.',
        template: 'Ask AI to [[1]], not to [[2]].',
        blanks: [['explain'], ['build']],
        distractors: ['copy', 'delete', 'guess'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The AI wrote <paragraph>. What\'s the real tag for a paragraph?',
        answers: ['p', '<p>'],
        placeholder: 'One letter',
      },
      {
        kind: 'writeCode',
        prompt: 'Fix both of the AI\'s made-up tags',
        starter: '<header1>Mensah Beats</header1>\n<paragraph>Book me for your event.</paragraph>\n',
        solution: '<h1>Mensah Beats</h1>\n<p>Book me for your event.</p>\n',
        hint: 'header1 should be h1. paragraph should be p.',
        checks: [
          { message: 'A main heading that says Mensah Beats', dom: { selector: 'h1', text: 'Mensah Beats' } },
          { message: 'A real paragraph that says Book me', dom: { selector: 'p', text: 'Book me for your event' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Next time you\'re stuck on code, what question will you ask AI, so it helps you understand instead of doing it for you?',
    starters: ['I\'ll ask...', 'The rule I\'ll follow is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask any AI chatbot: "Explain what the lang attribute does in HTML, like I\'m a beginner." Then check its answer against what you learned in lesson 13.',
  },
  notes: 'Mirrors the Study Smarter with AI stance (AI as tutor, honesty choice) per playbook §8a.7. <header1> and <paragraph> are not HTML elements (they parse as HTMLUnknownElement, unstyled). No Teyro AI feature is used or implied (CLAUDE.md Phase One guard); the learner uses any external chatbot.',
};

export default lesson;
