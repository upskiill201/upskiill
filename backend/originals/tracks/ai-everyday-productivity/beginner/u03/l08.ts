import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Reading: the speech only you can give. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The speech only you can give',
  summary: 'Mamá\'s request: "You\'ll give the speech, mija." Lucía asks AI for an anniversary speech and gets something that could be about any couple on Earth. Read how to use AI for the shape, and keep the stories yours.',
  minutes: 13,
  outcomes: [
    'Use AI for a speech\'s structure, not its stories',
    'Let AI interview you to dig up real memories',
    'Fit a speech to time: about 130 words a minute',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Thirty-five years in three minutes',
      html: '<p>The first speech the AI wrote began: "Love is a journey, and for thirty-five years, Rosa and Ernesto have walked it hand in hand." Lucía read it to Marta. Marta said, "Which Rosa and Ernesto?"</p><p>That\'s the problem with asking AI for a personal speech. It has never met your parents. So it fills the gaps with the most average sentences in the world.</p><h3>What AI is good at here</h3><ul><li><strong>Shape.</strong> "Give me a simple structure for a 3-minute anniversary speech." It suggests: a hook, one or two stories, what they taught us, thanks, a toast.</li><li><strong>Digging.</strong> The interview trick from Chapter 1: "Ask me questions, one at a time, to help me find stories about my parents." It asked how they met, the hardest year, a small habit only family notices.</li><li><strong>Trimming.</strong> Once she\'s written it: "This is 520 words. Help me cut it to about 400 without losing the stories."</li></ul><h3>What only Lucía has</h3><p>The answers. Papá singing badly to Mamá in the hospital car park the night Mateo was born. The yellow Volkswagen they drove to Acapulco and back with no air conditioning. Mamá saving every school note Papá ever left in the fridge. No AI could invent those, and those are the lines people cry at.</p><blockquote>The AI found the questions. Lucía had the answers. The speech is hers.</blockquote><h3>Timing</h3><p>Most people speak at roughly 120 to 150 words a minute, a bit slower when nervous or emotional. A 3-minute speech is about 400 words. Ask AI to count and cut, then read it aloud with a timer.</p><h3>Honesty</h3><p>Using AI for the structure and the trimming is like asking a friend for help. Reading out stories or feelings that aren\'t true, because they sounded nice, isn\'t. If a line isn\'t real, cut it.</p>',
    },
    {
      kind: 'check',
      question: 'Which part of the speech should come from Lucía, not the AI?',
      options: [
        'The structure: hook, stories, thanks, toast',
        'The stories and memories',
        'Cutting it down to 400 words',
      ],
      answer: 1,
      explanation: 'AI can shape and trim. Only she has the hospital car park and the yellow Volkswagen.',
    },
  ],
  apply: {
    scenario: 'The anniversary speech.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the first speech feel empty?',
        options: [
          { text: 'It was too short', why: 'Length wasn\'t the issue.' },
          { text: 'The AI had never met her parents, so it filled gaps with average sentences' },
          { text: 'Speeches should be formal', why: 'The best ones are personal.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'AI\'s job, or Lucía\'s?',
        groups: ['AI can help', 'Only Lucía'],
        items: [
          { text: 'A simple 5-part structure', group: 0 },
          { text: 'The hospital car park story', group: 1 },
          { text: 'Cutting 520 words to 400', group: 0 },
          { text: 'The yellow Volkswagen', group: 1 },
          { text: 'Questions to dig up memories', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many words is a 3-minute speech? (A number.)',
        answers: ['400', 'about 400', '390', '400 words', '360', '450'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the AI\'s suggested speech structure in order.',
        lines: ['A hook', 'One or two stories', 'What they taught us', 'Thanks', 'The toast'],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Just add "they climbed a volcano together on their honeymoon". It sounds great.',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'They went to Acapulco in a yellow Volkswagen with no air conditioning. That\'s better, because it\'s true.' },
          { text: 'Sure, nobody will check.', why: 'Her parents will be sitting right there.' },
          { text: 'I\'ll ask AI for more made-up stories.', why: 'Made-up stories aren\'t honest, or moving.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The speech rule.',
        template: 'The AI found the [[1]]. Lucía had the [[2]].',
        blanks: [['questions'], ['answers', 'stories']],
        distractors: ['microphone', 'budget'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt helps Lucía find stories?',
        options: [
          { text: 'Write a moving anniversary speech.', why: 'It\'ll invent everything.' },
          { text: 'Ask me questions one at a time to help me find stories about my parents for a 3-minute anniversary speech.' },
          { text: 'Give me famous love quotes.', why: 'Borrowed words, not her parents.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the draft speech should she cut?',
        lines: [
          'Papá sang to Mamá in the hospital car park the night Mateo was born.',
          'Love is a journey, and they have walked it hand in hand.',
          'Mamá kept every note Papá left on the fridge.',
        ],
        bug: 1,
        fix: 'Cut it, or replace it with a real memory.',
        explanation: 'It could be about any couple. The other two could only be about Rosa and Ernesto.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the task to the right prompt.',
        pairs: [
          ['Find stories', '"Ask me questions one at a time"'],
          ['Get a shape', '"Give me a simple 3-minute structure"'],
          ['Fit the time', '"Help me cut to about 400 words"'],
          ['Final check', 'Read it aloud with a timer'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When does using AI on a speech stop being honest?',
        options: [
          { text: 'When it helps with the structure', why: 'That\'s like a friend\'s help.' },
          { text: 'When it trims the length', why: 'Editing is fine.' },
          { text: 'When you read out stories or feelings that aren\'t true' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If you had to give a speech about someone you love, what\'s one small, true detail that only you would know?',
    starters: ['About..., only I would know...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask an AI tool to interview you, one question at a time, about someone important to you. Answer five questions. Then write three sentences yourself from your answers, not from the AI.',
  },
  notes: 'Speaking rates of roughly 120 to 150 words per minute are commonly cited for presentations (e.g. National Center for Voice and Speech estimates conversational English at about 150 wpm). Family memories fictional.',
};

export default lesson;
