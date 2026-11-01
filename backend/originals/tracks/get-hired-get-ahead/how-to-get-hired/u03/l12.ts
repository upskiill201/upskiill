import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 12 — the day before: research, logistics, in-person and online. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'The day before',
  summary: 'Good answers can be ruined by a late bus, a dead phone or the wrong building. Miracle\'s checklist for the day before has five parts. None of it is about answers.',
  minutes: 11,
  outcomes: ['Prepare the practical details the day before', 'Get ready for an online interview', 'Know what to bring'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>1. Know who and where.</strong> Re-read the invitation: time, address or link, who you\'re meeting, and the format. If anything\'s unclear, ask the recruiter today, not tomorrow morning.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>2. Plan the journey with spare time.</strong> Aim to arrive about 10–15 minutes early, and plan for traffic. Clinton checks the bus from Buea to Douala and books the one that arrives an hour early. He\'ll wait at a café.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>3. For online interviews: test everything.</strong> The link, camera, microphone, light (face a window), a quiet room, and a charged phone with data as backup. Have the recruiter\'s number in case the connection drops.</p>',
    },
    {
      kind: 'check',
      question: 'Clinton\'s video freezes in the middle of an online interview. What\'s the best plan?',
      options: ['Panic and leave', 'Rejoin, or phone the recruiter, and carry on calmly', 'Pretend nothing happened'],
      answer: 1,
      explanation: 'Connection problems happen. Calmly rejoining or phoning shows you handle problems well.',
    },
    {
      kind: 'text',
      html: '<p><strong>4. What to bring.</strong> A copy of your CV, a notebook and pen, your story bank on one page (to read before, not during), your questions for them, and ID if the building needs it.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>5. What to wear.</strong> Dress a little smarter than the team does day to day. Ask the recruiter or someone who works there if you\'re unsure. Clean and comfortable beats expensive.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Who and where. Journey with spare time. Test the tech. Bring CV, notebook, questions. Dress a little smarter than the team.',
    },
  ],
  apply: {
    scenario: 'Clinton prepares the day before.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Bring it, or leave it?',
        groups: ['Bring', 'Leave'],
        items: [
          { text: 'A copy of his CV', group: 0 },
          { text: 'A notebook and pen', group: 0 },
          { text: 'His questions for them', group: 0 },
          { text: 'A loudspeaker playing music', group: 1 },
          { text: 'A 30-page portfolio printout', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'About how early should Clinton arrive at the building?',
        options: [
          { text: 'Exactly on time', why: 'Leave a small buffer.' },
          { text: '10–15 minutes early' },
          { text: 'Two hours early, at reception', why: 'Wait nearby; arrive at reception 10–15 minutes early.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to the fix.',
        pairs: [
          ['Unclear address', 'Ask the recruiter today'],
          ['Traffic risk', 'Take an earlier bus, wait at a café'],
          ['Video might drop', 'Have the recruiter\'s number'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I don\'t know what to wear for Njangi Pay. Suit? Jeans?',
        options: [
          { text: 'My party shirt.', why: 'A little smarter than the team.' },
          { text: 'Borrow an expensive suit I can\'t move in.', why: 'Clean and comfortable beats expensive.' },
          { text: 'I\'ll ask Brenda or Tchami what the team wears, and go a little smarter than that.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the online-interview mistake.',
        lines: ['Tested the link the day before.', 'Sat with his back to a bright window.', 'Phone charged as a backup.'],
        bug: 1,
        explanation: 'Face the light. With a window behind you, your face is in shadow.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the day-before checks in order.',
        lines: ['Re-read the invitation', 'Plan the journey', 'Test the tech (if online)', 'Pack what to bring', 'Choose what to wear'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'When should Clinton read his one-page story bank?',
        options: [
          { text: 'Before the interview, not during' },
          { text: 'During, reading from the page', why: 'Read before, talk naturally during.' },
          { text: 'Never', why: 'A quick read before helps.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Dress a little [[1]] than the team. Clean and [[2]] beats expensive.',
        blanks: [['smarter'], ['comfortable']],
        distractors: ['louder', 'shiny', 'casual'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'For a video call, you should face the ___. (one word)',
        answers: ['window', 'light'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Do it the day before, or on the morning?',
        groups: ['Day before', 'Too late for the morning'],
        items: [
          { text: 'Ask the recruiter about the address', group: 0 },
          { text: 'Test the video link', group: 0 },
          { text: 'Discover the link doesn\'t work', group: 1 },
          { text: 'Find out which building it is', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What practical thing has gone wrong for you before an important event? How would you prevent it next time?',
    starters: ['Once...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make your own day-before checklist on your phone, using the five parts. Use it for your next interview or exam.',
  },
  notes: 'Practical guidance. Where you live: dress norms and punctuality expectations vary; ask someone local in the industry.',
};

export default lesson;
