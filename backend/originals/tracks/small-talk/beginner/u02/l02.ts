import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Step-by-step: the follow-up question (Huang et al. 2017). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The follow-up question',
  summary: 'Femi talks to everyone, and everyone loves him. Grace watches him for a day and spots his secret: he almost never changes the subject. He asks about what you just said.',
  minutes: 12,
  outcomes: [
    'Know what the research says about follow-up questions and liking',
    'Ask follow-ups in three simple ways',
    'Avoid switching topics too fast',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Femi\'s secret, step by step',
      steps: [
        {
          title: 'What Grace noticed',
          body: 'Monday. Someone tells Femi, "I went hiking this weekend." Grace would have said, "Nice! I went to Tesco." Femi says: "Where did you go?" Then: "Wait, you did that in the RAIN?" Then: "What made you get into hiking?" Ten minutes later, they\'re best friends.',
        },
        {
          title: 'What the research says',
          body: 'Researchers at Harvard studied hundreds of live conversations. People who asked more questions were liked more by the people they talked to, and the strongest effect came from FOLLOW-UP questions: questions about what the other person just said. They show you were listening. Interestingly, people didn\'t predict that asking questions would make them more likeable.',
        },
        {
          title: 'Follow-up type 1: tell me more',
          body: '"What was that like?" "How did that happen?" "And then what?" Simple, and they work almost anywhere.',
        },
        {
          title: 'Follow-up type 2: pick a detail',
          body: 'Grab a specific word they said. "I went hiking in the Peak District" → "The Peak District! Which part?" The detail shows you heard them, not just the topic.',
        },
        {
          title: 'Follow-up type 3: ask about feelings',
          body: '"Were you nervous?" "That sounds exhausting. How did you keep going?" (Grace is excellent at this. She asked patients how they felt for eighteen years. She just has to stop asking about pain.)',
        },
        {
          title: 'The trap: switching',
          body: 'The opposite of a follow-up is a switch: "I went hiking." "Cool. I went to Tesco." Switching to yourself too early makes people feel unheard. Follow up first; share after.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Follow up before you switch. "Tell me more", pick a detail, or ask about feelings.',
    },
  ],
  apply: {
    scenario: 'Monday, week two. Learning from Femi.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did the Harvard research find about questions?',
        options: [
          { text: 'People who ask questions seem nosy and are liked less', why: 'The opposite, especially for follow-ups.' },
          { text: 'People who asked more questions, especially follow-ups, were liked more' },
          { text: 'Questions make no difference', why: 'They made a clear difference to liking.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Follow-up, or switch?',
        groups: ['Follow-up', 'Switch'],
        items: [
          { text: '"Which part of the Peak District?"', group: 0 },
          { text: '"Cool. I went to Tesco."', group: 1 },
          { text: '"What made you get into hiking?"', group: 0 },
          { text: '"Anyway, did you see the match?"', group: 1 },
          { text: '"Were you soaked?"', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each follow-up to its type.',
        pairs: [
          ['"And then what happened?"', 'Tell me more'],
          ['"The Peak District! Which part?"', 'Pick a detail'],
          ['"Were you nervous?"', 'Ask about feelings'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'I spent the weekend helping my cousin move house in Salford.',
        prompt: 'Grace\'s best follow-up?',
        options: [
          { text: 'Salford! How many trips did it take? Please tell me there was no piano.' },
          { text: 'Nice. I watched TV.', why: 'A switch to yourself.' },
          { text: 'Okay.', why: 'Dropped ball.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A question about what the other person just said is a ___-up question. (one word)',
        answers: ['follow'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why do follow-up questions make people like you more?',
        options: [
          { text: 'They make the conversation shorter', why: 'Usually longer, and better.' },
          { text: 'They let you talk about yourself', why: 'The opposite: they keep the focus on the other person.' },
          { text: 'They show you were really listening to them' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s chat with a designer. Which line is a switch, not a follow-up?',
        lines: [
          'Designer: "I just got back from my sister\'s wedding in Accra."',
          'Grace: "Oh, I went to a wedding once. Let me tell you about it..."',
          'Grace (better): "Accra! How was it? Did you dance?"',
        ],
        bug: 1,
        fix: 'Accra! How was the wedding?',
        explanation: 'Grace jumped to her own story. Follow up first; share later.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['Weak ties', 'Acquaintances who brighten your day'],
          ['Phatic communion', 'Talk that bonds, not informs'],
          ['"Not now" signals', 'Headphones, short answers'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Follow up on "I went hiking in the Peak District."',
        template: 'The Peak [[1]]! [[2]] part? Were you [[3]] in the rain?',
        blanks: [['District'], ['Which'], ['soaked', 'wet']],
        distractors: ['Tesco', 'pain'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a "tell me more" follow-up.',
        tiles: ['What', 'was', 'that', 'like?'],
        distractors: ['Cool.', 'Anyway'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last thing someone told you about their weekend or week. Write two follow-up questions you could have asked.',
    starters: ['They said...', 'Follow-up 1: ...', 'Follow-up 2: ...'],
  },
  deepen: {
    title: 'The two-follow-up rule',
    summary: 'For a week, before you share anything about yourself in small talk, ask at least two follow-up questions. Notice how people open up.',
  },
  notes: 'Huang, Yeomans, Brooks, Minson & Gino (2017), "It doesn\'t hurt to ask: Question-asking increases liking", Journal of Personality and Social Psychology 113(3): 430–452 — live conversations and speed dating; more questions, especially follow-ups, associated with greater liking; mediated by perceived responsiveness; people did not predict this. Peak District, Salford: real places near Manchester.',
};

export default lesson;
