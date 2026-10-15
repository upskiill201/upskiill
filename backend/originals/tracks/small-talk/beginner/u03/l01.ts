import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Before/After: "How was your weekend?" beyond "Fine". */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"How was your weekend?" beyond "Fine"',
  summary: 'Monday, week four. Sam, the CEO, asks Grace how her weekend was. She says "Fine." He waits. She waits. He leaves. The most common question at work deserves a better answer.',
  minutes: 11,
  outcomes: [
    'Answer "How was your weekend?" with something worth hearing',
    'Ask it back in a way that gets a real answer',
    'Keep it short when it\'s a corridor moment',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Monday, 9:02, the corridor',
      before: {
        label: 'The dead end',
        text: 'Sam: "Morning Grace, how was your weekend?" Grace: "Fine, thanks." (Pause.) Sam: "...Great. Well. Have a good week."',
      },
      after: {
        label: 'The open door',
        text: 'Sam: "Morning Grace, how was your weekend?" Grace: "Good, thanks! My son dragged me to a climbing wall. I made it two metres up and had to be lowered down like a sack of potatoes. How about yours? Any cycling?"',
      },
      notes: [
        '"Fine, thanks" is polite but gives Sam nothing to hold.',
        'One small, funny detail (the climbing wall) gives him a hook.',
        'She remembers he cycles (from the lift in Chapter 1) and asks about it: a callback.',
        'It takes ten seconds. Corridor small talk doesn\'t need to be long.',
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>\"How was your weekend?\"</strong> is the most common small-talk question at work. Most people answer it on autopilot, which is a missed chance every Monday.</p><p><strong>The recipe:</strong> a word (\"Good!\"), one specific detail (\"I finally tried that Thai place\"), and a question back. Ten seconds.</p><p><strong>When you ask it,</strong> make it easier to answer: \"Do anything nice at the weekend?\" or \"How was the wedding?\" (if you know about one) beats a flat \"Good weekend?\"</p><p><strong>And if your weekend was hard:</strong> you don't have to share. \"Quiet one, thanks. How was yours?\" is perfectly fine.</p>",
    },
  ],
  apply: {
    scenario: 'Monday, week four. The corridor.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the recipe for answering "How was your weekend?"',
        options: [
          { text: 'A full timeline from Friday night to Sunday night', why: 'Too long for a corridor.' },
          { text: 'A word, one specific detail, and a question back' },
          { text: '"Fine."', why: 'The dead end.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Dead end, or open door?',
        groups: ['Dead end', 'Open door'],
        items: [
          { text: 'Fine, thanks.', group: 0 },
          { text: 'Good! I finally tried the new Thai place. Have you been?', group: 1 },
          { text: 'Okay.', group: 0 },
          { text: 'Busy, my sister got engaged! How was yours?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'Morning! How was your weekend?',
        prompt: 'Grace\'s ten-second answer?',
        options: [
          { text: 'Fine.', why: 'Femi deserves better.' },
          { text: 'Let me tell you about Friday at 6 p.m...', why: 'Save the full timeline.' },
          { text: 'Good! Jayden made me watch a horror film and I slept with the light on. Yours?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Grace asks Sam about cycling because she remembered it from the lift. That\'s called a call-___. (one word)',
        answers: ['back'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Grace had a hard weekend and doesn\'t want to talk about it. What can she say?',
        options: [
          { text: '"Quiet one, thanks. How was yours?"' },
          { text: 'Tell the whole story anyway', why: 'You never have to share more than you want.' },
          { text: 'Ignore the question', why: 'A short, kind answer is enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s Monday plan. Which line will make her answer too long for a corridor?',
        lines: [
          'Say "Good!" with a smile.',
          'Mention the climbing wall.',
          'Describe every hour of Saturday, then Sunday.',
          'Ask about their weekend.',
        ],
        bug: 2,
        fix: 'Keep it to one detail.',
        explanation: 'Corridor small talk is ten seconds. One detail is a hook; a timeline is a speech.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Make "Good weekend?" easier to answer.',
        pairs: [
          ['You know they had a wedding', '"How was the wedding?"'],
          ['You know nothing', '"Do anything nice at the weekend?"'],
          ['They mentioned a race on Friday', '"How did the 10K go?"'],
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Review from Chapter 2.',
        pairs: [
          ['Answer, add, ask', 'The conversation rhythm'],
          ['Free information', 'Hooks in an answer'],
          ['FORD', 'Four safe topics'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s better answer.',
        template: '[[1]], thanks! My son dragged me to a climbing [[2]]. How about [[3]]?',
        blanks: [['Good', 'Great'], ['wall'], ['yours', 'you']],
        distractors: ['Fine', 'pain'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a better way to ask.',
        tiles: ['Do', 'anything', 'nice', 'at', 'the', 'weekend?'],
        distractors: ['Fine', 'Good?'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your answer to "How was your weekend?" for last weekend: one word, one detail, one question back.',
    starters: ['Word: ...', 'Detail: ...', 'Question back: ...'],
  },
  deepen: {
    title: 'The Monday detail',
    summary: 'On Sunday evening, pick one small detail from your weekend to share on Monday. It takes ten seconds to think of and makes Monday small talk easy.',
  },
  notes: 'General workplace small-talk practice. Callback to Sam cycling (Chapter 1 lesson 5).',
};

export default lesson;
