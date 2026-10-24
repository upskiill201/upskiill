import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: "Checkpoint: Marta's dare",
  summary: 'Marta dares Lucía: "Get it to write my mother\'s birthday message. If it sounds like a greeting card, you buy lunch." Check what you know about details, what AI is, the recipe and follow-ups.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use the recipe under pressure', 'Steer with follow-ups'],
  learn: [
    {
      kind: 'story',
      title: 'The dare',
      beats: [
        { speaker: 'marta', text: 'My mother turns 70 on Friday. If your robot writes something that sounds like a greeting card, you\'re buying lunch.' },
        { speaker: 'lucia', text: 'Tell me three things about her. Real things.' },
        { speaker: 'marta', text: 'She sings badly at every party, she\'s never missed one of my football matches, and she makes the best mole in Puebla.' },
        { speaker: 'tey', text: 'Lucía asked for details before she typed anything. Good sign. Let\'s see if you would too.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: your first useful answers.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt wins the dare?',
        options: [
          { text: 'Write a birthday message for a 70-year-old.', why: 'That\'s exactly a greeting card.' },
          { text: 'Write a birthday message for my friend\'s mum, 70. She sings badly at every party, never missed a football match, makes the best mole in Puebla. Warm, a little funny, under 60 words.' },
          { text: 'Write the most beautiful birthday message ever.', why: 'Excited, but no details.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the recipe parts in Lucía\'s prompt.',
        pairs: [
          ['Task', 'Write a birthday message'],
          ['Context', 'Sings badly, best mole in Puebla'],
          ['Limits', 'Under 60 words'],
          ['Format', 'A short message'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'It\'s good, but too long and too formal. My mother would laugh at me.',
        prompt: 'What should Lucía type to the AI?',
        options: [
          { text: 'Start a new chat and explain everything again.', why: 'Stay in the chat; it knows the details.' },
          { text: 'Can you make it better?', why: 'Better how? Say what to change.' },
          { text: 'Shorter and more casual, like a daughter\'s best friend talking.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact about AI chat tools?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'It predicts likely next words', group: 0 },
          { text: 'It already knows Marta\'s mother', group: 1 },
          { text: 'It can be confidently wrong', group: 0 },
          { text: 'It checks every sentence against a database', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The first rule.',
        template: 'Vague question, vague [[1]]. Add the details a [[2]] couldn\'t guess.',
        blanks: [['answer'], ['stranger']],
        distractors: ['prompt', 'friend'],
      },
      {
        kind: 'mcq',
        prompt: 'The AI writes "your famous chiles en nogada". Marta\'s mum is famous for mole. What happened?',
        options: [
          { text: 'It guessed a detail and got it wrong. Fix it with "change one thing: it\'s mole".' },
          { text: 'It knows her better than Marta', why: 'It can\'t know her; it filled a gap.' },
          { text: 'The tool is broken', why: 'Confident made-up details are normal. Check them.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which part of the recipe is "under 60 words"? (One word.)',
        answers: ['limits', 'limit', 'a limit'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Lucía\'s method is wrong?',
        lines: [
          'Get real details first.',
          'Use task, context, limits, format.',
          'Steer with short follow-ups.',
          'Send the result without reading it.',
        ],
        bug: 3,
        fix: 'Read it and check every detail before sending.',
        explanation: 'It might have invented a detail, like the chiles en nogada.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Lucía wins the dare.',
        lines: ['Ask Marta for three real details', 'Write a recipe prompt', 'Ask for shorter and more casual', 'Fix the wrong dish', 'Read it to Marta'],
      },
      {
        kind: 'mcq',
        prompt: 'Marta reads the final message and goes quiet. Then: "Fine. I\'ll buy lunch." Why did it work?',
        options: [
          { text: 'AI writes perfect messages on the first try', why: 'It took a recipe, a follow-up and a fix.' },
          { text: 'Lucía is a professional writer', why: 'She used a method anyone can use.' },
          { text: 'Real details, the recipe, and steering until it sounded right' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Whose birthday or special day is coming up in your life? Write three real details about them that no AI could guess.',
    starters: ['Their day is...', 'Three real details...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1–4. Marta\'s mother is narrated (Puebla). Mole and chiles en nogada are dishes from Puebla.',
};

export default lesson;
