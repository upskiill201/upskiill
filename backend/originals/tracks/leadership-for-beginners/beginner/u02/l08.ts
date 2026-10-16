import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Card deck: listening like a leader (active listening; Rogers & Farson). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Listening like a leader',
  summary: 'In Marta\'s one-on-one, Lucía caught herself planning her reply while Marta was still talking. She missed the most important sentence. Tey deals out the listening cards.',
  minutes: 11,
  outcomes: [
    'Listen to understand, not to reply',
    'Use four simple active-listening moves',
    'Check you\'ve understood before you answer',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Psychologists <strong>Carl Rogers</strong> and <strong>Richard Farson</strong> called it <em>active listening</em> back in 1957: listening for the full meaning, including the feelings, and showing the person you've understood. It sounds obvious. Almost nobody does it when they're busy. Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Stop planning your reply</h3><p>If you're building your answer while they talk, you're only half listening. Let the reply wait.</p><h3>Card 2: Put the phone face down</h3><p>Better: out of sight. Even a phone on the table can make a conversation feel less close.</p><h3>Card 3: Ask, don't fix</h3><p>Not every problem needs your solution right away. \"What would help most?\" Sometimes the answer is \"just listening.\"</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: Say it back</h3><p>\"So what I'm hearing is...\" Paraphrasing shows you understood, and catches it if you didn't.</p><h3>Card 5: Name the feeling</h3><p>\"That sounds really frustrating.\" People calm down when they feel understood.</p><h3>Card 6: Listen for what's not said</h3><p>Marta said, \"It's fine, I'll just stay late again.\" The word that mattered was <em>again</em>.</p>",
    },
    {
      kind: 'check',
      question: 'What was the important word in Marta\'s sentence?',
      options: ['Again', 'Fine', 'Late'],
      answer: 0,
      explanation: '"Again" means it\'s a pattern, not a one-off. That\'s the thing to ask about.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Stop planning. Phone away. Ask before fixing. Say it back. Name the feeling. Listen for what\'s not said.',
    },
  ],
  apply: {
    scenario: 'Marta\'s one-on-one, take two.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is active listening?',
        options: [
          { text: 'Nodding a lot', why: 'Nodding alone can be fake.' },
          { text: 'Waiting for your turn to speak', why: 'That\'s the opposite.' },
          { text: 'Listening for the full meaning, including feelings, and showing you understood' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'It\'s fine, I\'ll just stay late again.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Again? Sounds like that\'s been happening a lot. Tell me about it.' },
          { text: 'Great, thanks Marta!', why: 'Misses the word that mattered.' },
          { text: 'Here\'s a time-management article.', why: 'Fixing before understanding.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Listening or not listening?',
        groups: ['Listening', 'Not listening'],
        items: [
          { text: '"So what I\'m hearing is..."', group: 0 },
          { text: 'Checking messages while they talk', group: 1 },
          { text: '"That sounds frustrating."', group: 0 },
          { text: 'Jumping in with a solution in ten seconds', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Saying back what someone said in your own words is called ___. (one word)',
        answers: ['paraphrasing', 'Paraphrasing', 'reflecting', 'mirroring'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card to the line.',
        pairs: [
          ['Say it back', '"So what I\'m hearing is..."'],
          ['Name the feeling', '"That sounds frustrating."'],
          ['Ask, don\'t fix', '"What would help most?"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Who first described active listening, in 1957?',
        options: [
          { text: 'Google', why: 'Much later. Google came in 2008 with Project Oxygen.' },
          { text: 'Carl Rogers and Richard Farson' },
          { text: 'Amy Edmondson', why: 'She studied psychological safety.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s listening plan. Which line breaks it?',
        lines: [
          'Phone in my bag, not on the table.',
          'Have my reply ready before Marta finishes.',
          'Say back what I heard before I answer.',
        ],
        bug: 1,
        fix: 'Let my reply wait until she\'s finished.',
        explanation: 'Planning while they talk means half listening.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a listening moment in order.',
        lines: ['Let them finish', 'Say back what you heard', 'Name the feeling', 'Ask what would help'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Listen to [[1]], not to [[2]].',
        blanks: [['understand'], ['reply', 'respond']],
        distractors: ['win', 'fix'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the paraphrase opener.',
        tiles: ['So', 'what', 'I\'m', 'hearing', 'is...'],
        distractors: ['Anyway'],
      },
    ],
  },
  reflect: {
    prompt: 'When someone really listened to you, what did they do? Which listening card is hardest for you?',
    starters: ['They...', 'The hardest card for me is...'],
  },
  deepen: {
    title: 'One paraphrase a day',
    summary: 'Once a day this week, before you reply to someone, say back what you heard: "So what I\'m hearing is..." Notice how often you\'d got it slightly wrong.',
  },
  notes: 'Carl R. Rogers & Richard E. Farson, "Active Listening" (1957, University of Chicago Industrial Relations Center). Phone-presence effect: Przybylski & Weinstein (2013), hedged as "can make a conversation feel less close".',
};

export default lesson;
