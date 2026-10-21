import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story: the recording. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The recording',
  summary: 'Lucía watches Diego\'s recording of her run-through. She speaks at 190 words a minute, never pauses, and faces the screen for most of it. The talk is good. She can\'t see it yet.',
  minutes: 11,
  outcomes: [
    'See why delivery matters as much as content',
    'Know what to look for in a recording',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Sunday evening',
      beats: [
        { speaker: 'narrator', text: 'Lucía counts one minute of the video: 190 words. Most conversational speech is slower.' },
        { speaker: 'lucia', text: 'I didn\'t pause once. And I\'m talking to the screen, not to them.' },
        { speaker: 'diego', text: 'You rushed because you were nervous. Everyone does. The fixes are simple: slower, pauses, eyes on people.' },
        { speaker: 'lucia', text: 'And the nerves? I\'ll be in front of 300 people.' },
        { speaker: 'tey', text: 'This chapter: recording yourself, pace and pauses, nerves, eye contact, and the myths about presence.' },
      ],
      choice: {
        prompt: 'What should Lucía work on first?',
        options: [
          { text: 'Slowing down and adding pauses', outcome: 'Yes. Pace affects everything else: clarity, calm and how confident she sounds.', best: true },
          { text: 'Rewriting the whole talk', outcome: 'The talk is good. The delivery needs the work.' },
          { text: 'Buying a new outfit', outcome: 'Fine if it helps her feel good, but it won\'t fix 190 words a minute.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Record yourself. What you hear and see on video is close to what the audience gets.',
    },
  ],
  apply: {
    scenario: 'The recording.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'How many words a minute did Lucía speak?',
        answers: ['190', 'one hundred and ninety'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why did Lucía rush, according to Diego?',
        options: [
          { text: 'She was nervous' },
          { text: 'The talk was too long', why: 'It was 14:30, fine.' },
          { text: 'She wanted to finish early', why: 'Nerves.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Delivery problem or content problem?',
        groups: ['Delivery', 'Content'],
        items: [
          { text: 'Speaking at 190 words a minute', group: 0 },
          { text: 'No clear message', group: 1 },
          { text: 'Facing the screen', group: 0 },
          { text: '42 slides', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Watching myself is horrible. Is it really worth it?',
        prompt: "Diego\'s best reply?",
        options: [
          { text: 'Yes. Five minutes of cringing shows you what months of guessing wouldn\'t. And it gets easier.' },
          { text: 'No, just guess.', why: 'Recording is the fastest feedback.' },
          { text: 'Only watch the good bits.', why: 'Watch it all once.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to the fix.',
        pairs: [
          ['Too fast', 'Slow down'],
          ['No pauses', 'Pause at full stops'],
          ['Facing the screen', 'Eyes on people'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: '[[1]] yourself. The video is close to what the [[2]] gets.',
        blanks: [['Record'], ['audience']],
        distractors: ['Ignore', 'speaker'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Diego say about the content?',
        options: [
          { text: 'It\'s good; the delivery needs work' },
          { text: 'Start over', why: 'The content is good.' },
          { text: 'It\'s too short', why: 'It\'s good.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Lucía\'s plan is the mistake?',
        lines: [
          'Watch the recording once, sound off.',
          'Watch again with sound on.',
          'Delete the video and never record again.',
          'Pick two fixes and practise them.',
        ],
        bug: 2,
        fix: 'Record again after practising.',
        explanation: 'The second recording shows if the fixes worked.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter covers.',
        lines: ['Recording yourself', 'Pace and pauses', 'Nerves', 'Eye contact', 'Presence myths'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many people will be at the Encuentro?',
        answers: ['300', 'three hundred'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Record yourself for one minute explaining your job. Count the words. What surprised you?',
    starters: ['I said... words', 'I noticed...'],
  },
  deepen: {
    title: 'Fast is normal when nervous',
    summary: 'Nerves often speed people up. The fix isn\'t to stop being nervous; it\'s to practise a slower pace until it feels normal.',
  },
  notes: 'Fictional: 190 wpm. Typical conversational speech is often around 120-160 wpm (varies by speaker and language); no single authoritative figure.',
};

export default lesson;
