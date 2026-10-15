import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Chat with Tey: listen to them first, really (Itzchakov et al., high-quality listening). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Listen to them first, really',
  summary: 'Tey gives Miracle a strange assignment: at Wednesday\'s dinner, don\'t mention Lagos at all. Just ask Papa about his first job and listen. "Producer, this is the bravest thing we\'ve asked any caller to do."',
  minutes: 12,
  outcomes: [
    'Listen to understand, not to reply',
    'Show you\'ve heard someone before giving your view',
    'Know what research suggests good listening does to the speaker',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Miracle, I have a weird request. At Wednesday's dinner, don't say the word \"Lagos\". Instead, ask Papa about his first job.",
          replies: ['What? Why?', 'That has nothing to do with my decision.'],
        },
        {
          tey: "It has everything to do with it. Remember Clinton in Chapter 1? Listening first is how he got heard. Here's what research on listening suggests: when people feel truly listened to, they often become less defensive and more open to other views, even on topics they feel strongly about.",
          replies: ['So if I listen to Papa, he\'ll listen to me?'],
        },
        {
          tey: "Not guaranteed. But much more likely. Right now, every conversation is two people waiting for their turn to push. Someone has to go first. You're the producer of this conversation.",
          replies: ['Okay. What does "really listening" look like?'],
        },
        {
          tey: "Three things. One: ask an open question and let him talk. Two: don't plan your reply while he's talking. Three: say back what you heard: \"So when you started at the ministry, you had no safety net at all. That sounds frightening.\" Then ask: \"Did I get that right?\"",
          replies: ['And then I bring up Lagos?'],
        },
        {
          tey: "Not on Wednesday. Wednesday is just for listening. You're building a bridge. Sunday is when you walk across it.",
        },
      ],
    },
    {
      kind: 'story',
      title: 'Thursday, on air',
      beats: [
        { speaker: 'miracle', text: 'Tey. I asked Papa about his first job. He talked for forty minutes. I never knew he slept at the office for his first month because he couldn\'t afford rent. He\'s never told me that.' },
        { speaker: 'miracle', text: 'At the end, he said: "Why are you asking all this?" I said, "Because I want to understand why you worry about me." He went quiet. Then he said, "Tell me about this Lagos company. Properly. On Sunday."' },
        { speaker: 'tey', text: "Producer, the Ignore-o-Meter just moved for the first time in this whole chapter." },
      ],
    },
  ],
  apply: {
    scenario: 'Tey FM. The listening assignment.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does research suggest happens when people feel truly listened to?',
        options: [
          { text: 'They become more stubborn', why: 'Usually the opposite.' },
          { text: 'Nothing changes', why: 'Listening changes a lot.' },
          { text: 'They often become less defensive and more open to other views' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put "really listening" in order.',
        lines: ['Ask an open question', 'Let them talk without planning your reply', 'Say back what you heard', 'Ask "Did I get that right?"'],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'While Papa was talking I really wanted to say "But Lagos is different!"',
        prompt: 'What does Tey say?',
        options: [
          { text: 'You should have said it.', why: 'Then Wednesday becomes another argument.' },
          { text: 'That\'s normal. Notice it, hold it, and keep listening. Your turn will come.' },
          { text: 'Never share your view, ever.', why: 'Sunday is for sharing. Wednesday is for listening.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'After saying back what you heard, ask: "Did I get that ___?" (one word)',
        answers: ['right'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Listening to understand, or waiting to reply?',
        groups: ['Listening to understand', 'Waiting to reply'],
        items: [
          { text: '"So you had no safety net at all?"', group: 0 },
          { text: '"Yes, but Lagos is different..."', group: 1 },
          { text: '"What was that like?"', group: 0 },
          { text: 'Planning your next argument while they talk', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Tey ask Miracle not to mention Lagos on Wednesday?',
        options: [
          { text: 'So the conversation is only about understanding Papa, which builds trust for Sunday' },
          { text: 'To trick Papa', why: 'It\'s genuine curiosity, not a trick.' },
          { text: 'Because Lagos is a bad idea', why: 'Tey has no view on Lagos.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s listening at dinner. Which line slips back into pushing?',
        lines: [
          'Papa, what was your first job like?',
          'So you slept at the office? That sounds really hard.',
          'See, that\'s exactly why I should take risks too, like Lagos!',
        ],
        bug: 2,
        fix: 'Did I get that right?',
        explanation: 'Turning his story into an argument for Lagos ends the listening. Save it for Sunday.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Reactance', 'Pushing makes people push back'],
          ['"But it\'s your choice"', 'Leaves room to decide'],
          ['Saying back what you heard', 'Shows you listened'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s listening steps.',
        template: 'Ask an [[1]] question. Don\'t plan your [[2]]. Say back what you [[3]].',
        blanks: [['open'], ['reply', 'answer'], ['heard']],
        distractors: ['argument', 'closed'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s question.',
        tiles: ['Papa,', 'what', 'was', 'your', 'first', 'job', 'like?'],
        distractors: ['Lagos'],
      },
    ],
  },
  reflect: {
    prompt: 'Who could you have a "listening-only" conversation with this week? What open question would you ask?',
    starters: ['I could listen to...', 'My question: ...'],
  },
  deepen: {
    title: 'A listening-only conversation',
    summary: 'Have one conversation this week where your only goal is to understand the other person. Ask, listen, say back what you heard. Don\'t share your view unless they ask.',
  },
  notes: 'High-quality listening reduces defensiveness and increases openness: Itzchakov, Kluger & Castro (2017), Personality and Social Psychology Bulletin 43(1); related work by Itzchakov and colleagues. Stated with "often" and "suggests". Reflective listening is standard counselling and conflict advice. Papa\'s backstory is fictional.',
};

export default lesson;
