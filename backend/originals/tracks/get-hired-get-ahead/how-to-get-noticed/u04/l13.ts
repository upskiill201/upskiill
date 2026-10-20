import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 13 — confident, not cocky: tone. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Confident, not cocky',
  summary: 'David\'s letter apologises in every paragraph. Clinton\'s first rewrite swings the other way: "I am exactly what Njangi Pay needs." Tey finds the tone in between: calm, warm, and backed by proof.',
  minutes: 11,
  outcomes: ['Spot apologetic and arrogant language', 'Write in a calm, confident tone', 'Let proof do the boasting'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Two letters. David\'s: "Although I have little experience, I hope I might be considered..." Clinton\'s: "I am exactly what Njangi Pay needs and would be a huge asset from day one." Which one would you hire?',
          replies: ['Neither?', 'Clinton\'s, it\'s confident'],
        },
        {
          tey: 'Neither, yet. David apologises before he\'s been judged. Clinton claims something he can\'t know: he\'s never worked there. Both make the reader trust them less.',
          replies: ['So what\'s in between?'],
        },
        {
          tey: 'Calm confidence comes from proof, not adjectives. Say what you did, plainly, and let it speak. "I built a tracker that 42 people use" is confident without a single boast. Then show you want to learn: "I\'d love to learn how your team builds for 200,000 groups."',
          replies: ['Any words to avoid?'],
        },
        {
          tey: 'Cut the apologies: "although I only", "I hope I might", "sorry to". Cut the big claims: "exactly what you need", "perfect candidate", "huge asset". Keep: "I built", "I\'d love to", "I\'m excited about". Read it aloud. If it sounds like you speaking to someone you respect, you\'ve got it.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'No apologising, no bragging. Let the proof be confident for you.',
    },
  ],
  apply: {
    scenario: 'Clinton and David fix their tone.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Apologetic, cocky, or confident?',
        groups: ['Apologetic', 'Cocky', 'Confident'],
        items: [
          { text: 'Although I only have a little experience...', group: 0 },
          { text: 'I am the perfect candidate.', group: 1 },
          { text: 'I built a tracker that 42 people use.', group: 2 },
          { text: 'Sorry to take your time.', group: 0 },
          { text: 'I\'d love to learn how your team works.', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "I am exactly what Njangi Pay needs" a problem?',
        options: [
          { text: 'He can\'t know that yet; it sounds arrogant and unproven' },
          { text: 'It\'s too humble', why: 'The opposite: too big a claim.' },
          { text: 'It\'s grammatically wrong', why: 'The grammar is fine. The claim isn\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the apologetic line in David\'s letter.',
        lines: ['I organised a blood drive with 60 donors.', 'Although I have little experience, I hope I might be considered.', 'I\'d love to learn from your research team.'],
        bug: 1,
        explanation: 'He apologises before anyone has judged him. Cut it and let the blood drive speak.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'If I don\'t apologise for having no experience, won\'t I sound arrogant?',
        options: [
          { text: 'No: stating what you did plainly isn\'t arrogant. "I organised a 60-donor blood drive" is just true.' },
          { text: 'Yes, keep apologising.', why: 'Apologising makes them doubt you.' },
          { text: 'Say you\'re the best student ever.', why: 'That would be arrogant. Plain facts aren\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each weak phrase to a confident one.',
        pairs: [
          ['I hope I might be considered', 'I\'d love to talk about how I could help'],
          ['I am the perfect candidate', 'I built a tracker 42 people use'],
          ['Although I only did a little', 'I organised a blood drive with 60 donors'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s Tey\'s read-aloud test for tone?',
        options: [
          { text: 'Does it sound like you speaking to someone you respect?' },
          { text: 'Does it sound like a robot?', why: 'The opposite: it should sound like you.' },
          { text: 'Does it have big words?', why: 'Plain, respectful and true beats big words.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which sentence has the right tone?',
        options: [
          { text: '"I\'d be a huge asset from day one."', why: 'A promise he can\'t back up yet.' },
          { text: '"I\'m excited about what you\'re building, and I\'d love to learn how your team does it."' },
          { text: '"I know I\'m not as good as other applicants."', why: 'Talks himself down.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: 'No apologising, no [[1]]. Let the [[2]] be confident for you.',
        blanks: [['bragging', 'boasting'], ['proof']],
        distractors: ['grades', 'adjectives', 'photo'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Calm confidence comes from ___, not adjectives. (one word)',
        answers: ['proof', 'evidence'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep or cut?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'I built...', group: 0 },
          { text: 'I\'m probably not qualified, but...', group: 1 },
          { text: 'I\'d love to...', group: 0 },
          { text: 'You won\'t find anyone better.', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Do you lean apologetic or cocky when you write about yourself? Rewrite one sentence you\'ve written in a calmer tone.',
    starters: ['I lean...', 'Before: ... After: ...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Highlight every apology and every big claim in your cover letter draft. Replace each with a plain fact or a "I\'d love to...".',
  },
  notes: 'Tone guidance (avoid apologetic hedging and unprovable superlatives; let evidence carry confidence) is common careers-coach advice.',
};

export default lesson;
