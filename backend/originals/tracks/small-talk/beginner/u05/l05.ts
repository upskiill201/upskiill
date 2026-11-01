import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus earlier. Story beat: Jayden's parents' evening. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Jayden\'s parents\' evening',
  summary: 'Thursday, 6 p.m. Jayden\'s school. Fifteen minutes in a queue of parents, then five teachers. Jayden\'s one request: "Please don\'t be weird." Grace has never been less weird in her life.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use bridge questions, stories and humour in a real setting', 'Handle small talk with strangers and with people you need something from'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 6:00 p.m., the school hall',
      beats: [
        { speaker: 'jayden', text: 'Mum. Rules. Don\'t talk to other parents. Don\'t tell the teachers you were a nurse. Don\'t do the "how are we feeling" thing. Please don\'t be weird.' },
        { speaker: 'grace', text: 'I promise nothing.' },
        { speaker: 'narrator', text: 'The queue for Jayden\'s maths teacher is long. Behind Grace: a dad in a football shirt, looking at his watch. Ahead: Jayden\'s maths teacher, who looks exhausted.' },
        { speaker: 'tey', text: "A queue of strangers, then five busy people. Everything from this course, at a parents' evening. Let's see whether Grace is weird." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint. Parents\' evening.',
    items: [
      {
        kind: 'mcq',
        prompt: 'The dad behind Grace keeps checking his watch. Best opener?',
        options: [
          { text: '"And how are we feeling today?"', why: 'Jayden specifically banned this.' },
          { text: '"These queues are a workout, aren\'t they? Who are you here for?"' },
          { text: '"Why do you keep checking your watch?"', why: 'Points at his behaviour; a bit much.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(The dad) "My daughter, Year 11. Honestly, she thinks I\'m the most embarrassing man alive."',
        prompt: 'Grace\'s reply, with light humour?',
        options: [
          { text: 'You probably are.', why: 'Teasing a stranger. Ouch.' },
          { text: 'Okay.', why: 'He handed you a perfect hook.' },
          { text: 'You\'re clearly not, because I am. My son made me sign a contract tonight. What\'s she like in maths?' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool from this chapter is it?',
        groups: ['Bridge question', '30-second story', 'Safe humour'],
        items: [
          { text: 'What\'s been the best part of the term for you?', group: 0 },
          { text: 'It was 3 a.m. on a night shift...', group: 1 },
          { text: 'This queue is longer than an NHS waiting list.', group: 2 },
          { text: 'What got you into teaching?', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Jayden\'s maths teacher looks exhausted. What\'s a warm first line?',
        options: [
          { text: '"Thank you for staying so late. You must have seen a hundred parents tonight."' },
          { text: '"You look tired."', why: 'True, perhaps, but a comment on looks.' },
          { text: '"Why is Jayden failing?"', why: 'Straight to the hard part, no warmth.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A light question that invites a real answer is a ___ question. (one word)',
        answers: ['bridge'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(The teacher) "Jayden\'s doing well, but he never asks questions in class."',
        prompt: 'Grace listens first. Best reply?',
        options: [
          { text: 'That\'s because he\'s lazy.', why: 'Not listening, and unkind to Jayden.' },
          { text: 'Interesting. Do you think he\'s shy, or just doesn\'t want to look like he doesn\'t know?' },
          { text: 'I never asked questions either, let me tell you about my school...', why: 'A switch to yourself.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s chat with the dad. Which line breaks a rule from this chapter?',
        lines: [
          'Ha, my son banned me from being weird tonight.',
          'What\'s your daughter thinking of doing after school?',
          'And by the way, that football shirt is a terrible choice for a man your age.',
        ],
        bug: 2,
        fix: 'Who do you support?',
        explanation: 'Teasing a stranger about how he looks stings. Ask about the shirt instead.',
      },
      {
        kind: 'mcq',
        prompt: 'The dad\'s turn comes. How does Grace leave the conversation?',
        options: [
          { text: '"Good luck in there! Hope she\'s less embarrassed than mine."' },
          { text: 'Turns away without a word', why: 'A one-liner is warmer.' },
          { text: '"Can I have your number?"', why: 'A big jump from a queue chat.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review from earlier chapters.',
        pairs: [
          ['Notice + ask', 'The all-purpose opener'],
          ['Free information', 'Hooks in their answer'],
          ['Kind exit', 'Warm words, then go'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace to the teacher.',
        template: 'Thank you for [[1]] so late. What got you into [[2]]?',
        blanks: [['staying'], ['teaching']],
        distractors: ['looking', 'nursing'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Grace\'s queue opener.',
        tiles: ['Who', 'are', 'you', 'here', 'for', 'tonight?'],
        distractors: ['feeling', 'weird'],
      },
    ],
  },
  reflect: {
    prompt: 'Where do you have to make small talk with people you need something from (teachers, doctors, landlords, managers)? Which tool from this chapter would help there?',
    starters: ['I often talk to...', 'The tool that would help is...'],
  },
  deepen: {
    title: 'Warmth before business',
    summary: 'Next time you need something from a busy person (a teacher, a receptionist, a doctor), start with one warm line before the request. Notice how differently the conversation goes.',
  },
  notes: 'Review of lessons 1–4 plus earlier chapters. Year 11 = UK school year for 15–16-year-olds; Jayden is 17 per cast, so he is in Year 12/13 (sixth form) — the dad\'s daughter is in Year 11, not Jayden.',
};

export default lesson;
