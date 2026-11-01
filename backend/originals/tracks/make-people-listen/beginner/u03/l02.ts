import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. "Myth or Mic Drop": your voice carries your intelligence (Schroeder & Epley 2015). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Myth or Mic Drop: your voice carries your intelligence',
  summary: 'David says he\'ll just type his ideas in the group chat from now on. "Writing is safer." Tey: "Is it? Producer, let\'s play Myth or Mic Drop about the human voice."',
  minutes: 11,
  outcomes: [
    'Know what research suggests about hearing vs reading the same words',
    'Understand why speaking up matters, even for quiet people',
    'Use your voice as a tool, not a risk',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'People judge your ideas the same way whether they read them or hear you say them.', isFact: false, explain: 'Myth. In a 2015 study, people heard or read the same job pitches. Those who HEARD the pitch rated the candidate as more competent, thoughtful and intelligent, and were more interested in hiring them.' },
        { text: 'Your voice can carry signs of thinking, like tone and pauses, that text can\'t.', isFact: true, explain: 'Mic drop. The researchers suggested that changes in tone, pace and volume reveal a mind at work. Text strips those out.' },
        { text: 'You need a deep, booming voice to sound intelligent.', isFact: false, explain: 'Myth. In that research, it was having a voice at all (with natural variation), not a particular kind of voice, that made the difference.' },
        { text: 'Quiet people have nothing to say.', isFact: false, explain: 'Myth. Quiet people often listen more and think before speaking. Their ideas just need to be heard.' },
        { text: 'Saying your idea out loud, clearly, can earn more credit than typing it later.', isFact: true, explain: 'Mic drop. The group remembered who SAID "donor buddies" in the room, not who might have typed it afterwards.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Your voice isn\'t a risk. It\'s evidence of your thinking. Use it.',
    },
  ],
  apply: {
    scenario: 'Tey FM, Myth or Mic Drop.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In the 2015 study, how did people rate candidates whose pitches they HEARD, versus read?',
        options: [
          { text: 'Exactly the same', why: 'Hearing made a clear difference.' },
          { text: 'As more competent, thoughtful and intelligent' },
          { text: 'As less intelligent', why: 'The opposite.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or mic drop?',
        groups: ['Myth', 'Mic drop'],
        items: [
          { text: 'You need a booming voice', group: 0 },
          { text: 'Tone and pauses show a mind at work', group: 1 },
          { text: 'Text and speech are judged the same', group: 0 },
          { text: 'Quiet people often think before they speak', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'So I should just never type ideas in the group chat?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Type them too, as a record. But say the important ones out loud, in the room, first.' },
          { text: 'Correct, typing is banned.', why: 'Writing is useful. It just isn\'t a replacement.' },
          { text: 'Only type, never speak.', why: 'That\'s how the credit went to Junior.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Your voice is evidence of your ___. (one word)',
        answers: ['thinking', 'mind', 'intelligence'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What did the researchers suggest makes the voice so powerful?',
        options: [
          { text: 'Loudness alone', why: 'Variation mattered, not just volume.' },
          { text: 'An accent', why: 'Not what the study looked at.' },
          { text: 'Natural changes in tone, pace and volume that show someone thinking' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'David\'s new plan. Which line is the myth sneaking back?',
        lines: [
          'I\'ll say my main idea out loud in the next meeting.',
          'My voice is too quiet to matter, so I\'ll just type it.',
          'Then I\'ll post it in the chat as a record.',
        ],
        bug: 1,
        fix: 'I\'ll speak at a normal volume and look at the group.',
        explanation: 'Quiet isn\'t "doesn\'t matter". Hearing an idea makes it land harder than reading it.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put David\'s new habit in order.',
        lines: ['Say the idea out loud in the room.', 'Look at the group while you say it.', 'Post it in the chat afterwards as a record.'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Review from earlier chapters.',
        pairs: [
          ['BLUF', 'Answer first'],
          ['One clear point', 'The Studio Whiteboard'],
          ['"One in four"', 'A number people can feel'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s rule.',
        template: 'Say it out [[1]] first. Type it as a [[2]] [[3]].',
        blanks: [['loud'], ['record'], ['afterwards', 'after', 'later']],
        distractors: ['quietly', 'instead'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tey\'s line.',
        tiles: ['Your', 'voice', 'is', 'evidence', 'of', 'your', 'thinking.'],
        distractors: ['risk'],
      },
    ],
  },
  reflect: {
    prompt: 'Do you tend to type ideas rather than say them? Think of one idea you\'d normally type. Where could you say it out loud instead?',
    starters: ['I usually type...', 'I could say it...'],
  },
  deepen: {
    title: 'Call, don\'t text',
    summary: 'This week, for one thing you\'d normally message about (a disagreement, an idea, a proposal), call or say it in person instead. Notice how differently people respond.',
  },
  notes: 'Schroeder & Epley (2015), Psychological Science 26(6): "The sound of intellect" — evaluators who heard (vs read) candidates\' pitches rated them more competent, thoughtful and intelligent and were more interested in hiring; effect attributed to paralinguistic cues (variation in pitch/pace). Stated with "suggested" where interpretive.',
};

export default lesson;
