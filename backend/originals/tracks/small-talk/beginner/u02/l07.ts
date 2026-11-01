import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Chat with Tey: listen like a nurse — active listening in small talk. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Listen like a nurse',
  summary: 'Grace has been so busy planning her next question that she misses what people say. Tey reminds her of something she did ten thousand times on the wards.',
  minutes: 12,
  outcomes: [
    'Listen to understand, not just to reply',
    'Use small signals that show you\'re listening',
    'Reflect back what you heard',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Thursday afternoon. Aisha tells Grace about her mum's new job. Grace nods, but inside she's thinking: \"Next question, next question, FORD, what's F, what's F...\" Then Aisha says, \"...so she's really nervous.\" Grace says, \"Great!\" Oops. What happened?",
          replies: ['She wasn\'t really listening.', 'She was planning her next line.'],
        },
        {
          tey: "Both. It's the most common small-talk mistake: listening to REPLY, not to UNDERSTAND. Here's the funny thing. On the wards, Grace listened perfectly. A patient would say \"I'm fine\" and she'd hear \"I'm frightened\". What did she do there that she isn't doing here?",
          replies: ['She paid full attention.', 'She wasn\'t worried about herself.'],
        },
        {
          tey: "Exactly. With patients, her attention was on THEM, not on how she was coming across. That's the whole trick. When you focus on the other person, the next question usually appears on its own. You don't have to plan it.",
          replies: ['What does good listening look like?'],
        },
        {
          tey: "Small signals: eye contact (as much as feels natural), a nod, little sounds like \"mm\" and \"oh really?\". Phone away. And reflecting back: \"So she's nervous about the new job?\" That one sentence proves you heard, and invites more.",
          replies: ['What about silence?'],
        },
        {
          tey: "A short pause isn't a failure. It often means the other person is thinking. Let it breathe for a second before you rush in. Next lesson has more on silence. For now: listen like you're on a night shift and someone finally wants to talk.",
        },
      ],
    },
    {
      kind: 'compare',
      title: 'Aisha\'s mum, two ways',
      before: {
        label: 'Listening to reply',
        text: 'Aisha: "...so she\'s really nervous." Grace: "Great! So, do you have any hobbies?"',
      },
      after: {
        label: 'Listening to understand',
        text: 'Aisha: "...so she\'s really nervous." Grace: "Oh, that\'s a big change at her age. What\'s she most nervous about?"',
      },
      notes: [
        '"Great!" showed Grace wasn\'t listening. Reflecting the feeling ("a big change") shows she was.',
        'The next question came straight from what Aisha said, with no FORD needed.',
      ],
    },
  ],
  apply: {
    scenario: 'Thursday afternoon. Aisha\'s mum.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the most common listening mistake in small talk?',
        options: [
          { text: 'Listening to reply instead of listening to understand' },
          { text: 'Asking too many follow-up questions', why: 'Follow-ups come FROM good listening.' },
          { text: 'Making too much eye contact', why: 'Less common than planning your next line.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Shows you\'re listening, or shows you\'re not?',
        groups: ['Listening', 'Not listening'],
        items: [
          { text: 'A nod and "oh really?"', group: 0 },
          { text: 'Checking your phone', group: 1 },
          { text: '"So she\'s nervous about it?"', group: 0 },
          { text: '"Great!" to sad news', group: 1 },
          { text: 'Looking around the room', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'Honestly, this week has been a lot. The launch moved forward and I\'ve barely slept.',
        prompt: 'Grace listens to understand. Best reply?',
        options: [
          { text: 'Cool. Have you got any hobbies?', why: 'Priya just told you something real.' },
          { text: 'That sounds exhausting. Moved forward by how much?' },
          { text: 'I slept great!', why: 'A switch to yourself, at the wrong moment.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Listen to understand, not just to ___. (one word)',
        answers: ['reply', 'respond', 'answer'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What does "reflecting back" sound like?',
        options: [
          { text: 'Repeating their exact words like a parrot', why: 'Put it in your own words.' },
          { text: '"I know exactly how you feel, let me tell you about my week."', why: 'That\'s a switch.' },
          { text: '"So the launch moving forward has really squeezed your week?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s listening plan. Which habit should she drop?',
        lines: [
          'Put my phone away.',
          'Plan my next three questions while they\'re talking.',
          'Reflect back one thing I heard.',
        ],
        bug: 1,
        fix: 'Focus on what they\'re saying; the next question will come.',
        explanation: 'Planning while they talk is exactly what stops you hearing them.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the listening signal to what it does.',
        pairs: [
          ['A nod', 'Shows you\'re following'],
          ['"Mm" or "oh really?"', 'Encourages them to go on'],
          ['Reflecting back', 'Proves you heard'],
          ['Phone away', 'Shows they have your attention'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why was Grace a great listener on the wards?',
        options: [
          { text: 'Her attention was on the patient, not on how she was coming across' },
          { text: 'She had a script', why: 'Nurses listen, not recite.' },
          { text: 'Patients talk slowly', why: 'Not the reason.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['FORD', 'Family, occupation, recreation, dreams'],
          ['Free information', 'Hooks in an answer'],
          ['Follow-up', 'About what they just said'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a reflecting-back line.',
        tiles: ['So', 'she\'s', 'nervous', 'about', 'the', 'new', 'job?'],
        distractors: ['Great!', 'Anyway'],
      },
    ],
  },
  reflect: {
    prompt: 'When do you find it hardest to really listen: when you\'re nervous, bored, busy? What\'s one thing you could do to listen better next time?',
    starters: ['I find it hardest when...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'One conversation, full attention',
    summary: 'Choose one conversation today. Phone away, no planning. Just listen, and reflect back one thing. Notice how the other person responds.',
  },
  notes: 'Active listening (Carl Rogers and later communication literature): attentive signals, reflecting/paraphrasing. Links to perceived responsiveness as the mechanism behind follow-up questions (Huang et al. 2017). Eye contact hedged as "as much as feels natural".',
};

export default lesson;
