import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Chat with Tey: explain it three ways. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Explain it three ways',
  summary: 'Lucía can\'t hear the difference between "pão" and "pau". The first explanation is pure grammar jargon. Tey shows her how to make AI explain the same thing three different ways until it clicks.',
  minutes: 11,
  outcomes: [
    'Ask for an explanation at your level',
    'Ask for an analogy or an example from your life',
    'Check your understanding by explaining it back',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'The AI said: "The diphthong ão is a nasalised vowel sequence." Did that help?', replies: ['Not even slightly', 'What\'s a diphthong?'] },
        { tey: 'Then ask again, three different ways. First: "Explain it like I\'m 12."', replies: ['And?'] },
        { tey: '"ão sounds like you\'re saying \'ow\' with a blocked nose, so the sound goes up through your nose." Better?', replies: ['Much better', 'Still fuzzy'] },
        { tey: 'Second: "Give me an analogy from Spanish." It said: like the end of "Juan" said quickly, but humming through your nose. Third: "Give me 3 words I\'ll need on the call." Pão, não, São Paulo.', replies: ['São Paulo has it!'] },
        { tey: 'Exactly. Now the step most people skip: explain it back. "Here\'s how I understand it: ... Is that right?" If you can explain it, you\'ve got it.', replies: ['Like teaching it'] },
        { tey: 'Like teaching it. Level, analogy, example, then explain it back. Works for tax forms too.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Didn\'t understand? Ask again three ways: at your level ("like I\'m 12"), with an analogy, with an example from your life. Then explain it back and ask "is that right?"',
    },
  ],
  apply: {
    scenario: 'Getting explanations that click.',
    items: [
      {
        kind: 'mcq',
        prompt: 'The first explanation is full of jargon. Best next move?',
        options: [
          { text: 'Give up on ão', why: 'One more prompt fixes it.' },
          { text: 'Ask "explain it like I\'m 12"' },
          { text: 'Memorise the jargon', why: 'That\'s not understanding.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the request to what it gives you.',
        pairs: [
          ['"Like I\'m 12"', 'Simple words'],
          ['"An analogy from Spanish"', 'Something she already knows'],
          ['"3 words I\'ll need"', 'Examples from her life'],
          ['"Here\'s how I understand it..."', 'A check on her understanding'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Asking for "like I\'m 12" is embarrassing.',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'You\'re right, never do it.', why: 'It\'s one of the fastest ways to understand.' },
          { text: 'Only children do that.', why: 'Experts do it all the time.' },
          { text: 'It\'s just a level setting. Nobody\'s watching, and I understood ão in ten seconds.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The understanding check.',
        template: 'Explain it [[1]]: "Here\'s how I understand it... Is that [[2]]?"',
        blanks: [['back'], ['right', 'correct']],
        distractors: ['louder', 'funny'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps you understand, or just sounds clever?',
        groups: ['Helps', 'Sounds clever'],
        items: [
          { text: '"Like saying ow with a blocked nose"', group: 0 },
          { text: '"A nasalised vowel sequence"', group: 1 },
          { text: '"Like São Paulo"', group: 0 },
          { text: '"A falling diphthong with nasal resonance"', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Name the city in Lucía\'s example that has the ão sound.',
        answers: ['São Paulo', 'Sao Paulo', 'são paulo', 'sao paulo'],
        placeholder: 'A city',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Lucía doesn\'t understand her new lease\'s "guarantor" clause. Best prompt?',
        options: [
          { text: 'Define guarantor.', why: 'Might come back in jargon.' },
          { text: 'Explain what a guarantor means in a Mexico City lease, in simple words, with an example. Then I\'ll explain it back.' },
          { text: 'Is a guarantor bad?', why: 'Leading, and vague.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which step do most people skip?',
        lines: [
          'Explaining it back to check.',
          'Asking for simpler words.',
          'Asking for an example.',
        ],
        bug: 0,
        fix: 'Always finish with "here\'s how I understand it, is that right?"',
        explanation: 'Feeling you understand isn\'t the same as being able to explain it.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the three-ways method.',
        lines: ['Ask the question', 'Ask for your level', 'Ask for an analogy', 'Ask for examples', 'Explain it back'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Test: explain ão to me in one line.',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'Like "ow" with a blocked nose. São Paulo, não, pão.' },
          { text: 'A nasalised vowel sequence.', why: 'That\'s the jargon she didn\'t understand.' },
          { text: 'I don\'t know, I just read it.', why: 'She can explain it now.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s something you\'ve pretended to understand (a work term, a bill, a tech word)? Which of the three ways would help most?',
    starters: ['I\'ve pretended to understand...', 'I\'d ask for...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Pick a word or idea you\'ve never really understood. Ask an AI tool to explain it three ways, then explain it back in one sentence and ask "is that right?"',
  },
  notes: 'Portuguese ão is a nasal diphthong (pão, não, São Paulo); explanations simplified for beginners. "Explain it back" draws on the self-explanation and protégé-effect literature (e.g. Chi et al. 1994; Nestojko et al. 2014).',
};

export default lesson;
