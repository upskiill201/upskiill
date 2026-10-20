import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Chat with Tey: don't pitch, listen. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Don\'t pitch, listen',
  summary: 'Clinton is a natural salesman, and it keeps ruining his interviews. Every time a student mentions a problem, he jumps in with a solution. Tey explains why the pitch can wait.',
  minutes: 11,
  outcomes: [
    'Notice when you slip into pitching',
    'Use follow-up questions instead of solutions',
    'Get the full story before reacting',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'When someone says "laundry takes my whole Saturday", what\'s your instinct?', replies: ['Tell them I could fix that!'] },
        { tey: 'Exactly, and that\'s the moment the interview ends. Once you pitch, they switch from telling you about their life to being polite about your idea.', replies: ['So what do I say instead?'] },
        { tey: 'A follow-up. "Tell me more." "What happened then?" "Why was that hard?" "What did you do about it?" Each one gets you deeper into the real problem.', replies: ['How long do I keep going?'] },
        { tey: 'Until you understand exactly what happened, what it cost them and what they tried. Then, if you want, describe your idea at the very end, and ask for a commitment, not an opinion.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When you feel the urge to pitch, ask "What did you do about it?" instead.',
    },
  ],
  apply: {
    scenario: 'Holding back the pitch.',
    items: [
      {
        kind: 'chatReply',
        from: 'david',
        message: 'Honestly, laundry takes my whole Saturday.',
        prompt: 'Clinton\'s best follow-up?',
        options: [
          { text: '"What happened last Saturday? Walk me through it."' },
          { text: '"I\'m starting a laundry service, want it?"', why: 'That\'s a pitch; the interview stops here.' },
          { text: '"Same! It\'s the worst."', why: 'Agreeing is friendly but learns nothing.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What happens when you pitch in the middle of an interview?',
        options: [
          { text: 'They stop telling you about their life and start being polite about your idea' },
          { text: 'They give you better information', why: 'They give you compliments.' },
          { text: 'Nothing changes', why: 'The whole conversation changes.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Follow-up or pitch?',
        groups: ['Follow-up', 'Pitch'],
        items: [
          { text: '"Tell me more."', group: 0 },
          { text: '"My service would save you hours!"', group: 1 },
          { text: '"What did you do about it?"', group: 0 },
          { text: '"You\'d love what I\'m building."', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the follow-up to what it uncovers.',
        pairs: [
          ['"What happened then?"', 'The full story'],
          ['"Why was that hard?"', 'The real pain'],
          ['"What did you do about it?"', 'Workarounds and spending'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Instead of pitching.',
        template: 'When you feel the urge to pitch, ask "What did you [[1]] about [[2]]?"',
        blanks: [['do'], ['it']],
        distractors: ['think', 'me'],
      },
      {
        kind: 'mcq',
        prompt: 'When is it OK to describe your idea?',
        options: [
          { text: 'At the very end, followed by asking for a commitment' },
          { text: 'In the first minute', why: 'Then everything after is shaped by it.' },
          { text: 'Never, under any circumstances', why: 'At the end it can be useful, with a commitment ask.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Where did Clinton slip into pitching?',
        lines: [
          'Student: "My clothes never dry in rainy season."',
          'Clinton: "What did you do last time?"',
          'Student: "Wore damp jeans to class."',
          'Clinton: "WashDay would fix that for 1,500 FCFA!"',
        ],
        bug: 3,
        fix: 'Clinton: "How often does that happen?"',
        explanation: 'He jumped to the solution before finishing the story.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a good exchange.',
        lines: ['Student mentions a problem', 'Ask for the last time it happened', 'Ask what it cost them', 'Ask what they tried', 'Only at the end, mention the idea and ask for a commitment'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Two-word follow-up that keeps people talking: "Tell me ..."',
        answers: ['more'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good instinct in an interview, or a trap?',
        groups: ['Good instinct', 'Trap'],
        items: [
          { text: 'Staying curious about details', group: 0 },
          { text: 'Defending your idea when they doubt it', group: 1 },
          { text: 'Letting silences run a few seconds', group: 0 },
          { text: 'Finishing their sentences for them', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a conversation where you jumped in with advice too early. What question could you have asked instead?',
    starters: ['I jumped in when...', 'I could have asked...'],
  },
  deepen: {
    title: 'The power of a pause',
    summary: 'Interviewers and journalists use silence on purpose: a few seconds of quiet after an answer often brings out the most honest detail. It feels awkward to you, not to them.',
  },
  notes: 'Advice to avoid pitching during discovery interviews: Rob Fitzpatrick, The Mom Test (2013); customer-development practice (Steve Blank). 1,500 FCFA WashDay price foreshadows Chapter 4.',
};

export default lesson;
