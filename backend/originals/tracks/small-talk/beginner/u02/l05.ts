import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapter 1. Story beat: the canteen queue. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the canteen queue',
  summary: 'Wednesday, 12:30. The queue at the café next door is fifteen minutes long. In front of Grace: a man from another company, holding a book. Fifteen minutes. Catch, not drop.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Keep a conversation going for several minutes with a stranger', 'Use follow-ups, hooks and "answer, add, ask" together'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 12:30 p.m.',
      beats: [
        { speaker: 'narrator', text: 'The café near Kinwell has a fifteen-minute queue at lunch. In front of Grace, a man in a cycling jacket is reading a well-worn book about bees.' },
        { speaker: 'narrator', text: 'Last week, Grace would have stared at her phone for fifteen minutes. This week, she has a plan: notice, ask, follow up, answer, add, ask.' },
        { speaker: 'tey', text: "Fifteen minutes is a long time with a dropped ball. Let's see how many throws you can make." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint. Fifteen minutes in the queue.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Best "notice + ask" opener?',
        options: [
          { text: '"Do you like bees?"', why: 'Closed, and he\'s clearly reading a bee book.' },
          { text: '"Long queue."', why: 'True, but gives him little to throw back.' },
          { text: '"Is that book about bees? I didn\'t know you could fill a whole book on them. Is it good?"' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(The man) "It\'s great, actually. I keep bees on my allotment in Chorlton. Got stung twice this week."',
        prompt: 'Three hooks. Best follow-up?',
        options: [
          { text: 'Twice! As an ex-nurse I have to ask: how\'s the sting? And how did you get into beekeeping?' },
          { text: 'I don\'t like bees.', why: 'A switch, and a closed one.' },
          { text: 'Okay.', why: 'Dropped.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which move is it?',
        groups: ['Follow-up', 'Share', 'Switch'],
        items: [
          { text: 'How long have you kept bees?', group: 0 },
          { text: 'I once had a wasp in my car on the motorway.', group: 1 },
          { text: 'Anyway, have you seen the news?', group: 2 },
          { text: 'What does honey from Chorlton taste like?', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Extra details in an answer that you can ask about are called free ... (one word)',
        answers: ['information', 'info'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'He asks, "Do you work round here?" Best answer?',
        options: [
          { text: '"Yes."', why: 'Answer only.' },
          { text: '"At Kinwell, the health app place. I was a nurse until a month ago, so everything is new. What about you?"' },
          { text: '"Why do you want to know?"', why: 'A bit suspicious for a queue chat.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the moves from this chapter.',
        pairs: [
          ['Answer, add, ask', 'The rhythm'],
          ['Pick a detail', 'A type of follow-up'],
          ['A puppy, a disaster', 'Great hooks'],
          ['Nice. Yeah.', 'Dropped balls'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s queue chat. Which line turns it into an interview?',
        lines: [
          'How did you get into beekeeping?',
          'Ha, I\'d be terrified. I\'m fine with blood, not with buzzing.',
          'How many bees? How old are you? Are you married? Where do you live exactly?',
        ],
        bug: 2,
        fix: 'Do you get much honey from them?',
        explanation: 'Rapid personal questions to a stranger feel like an interrogation, and "where do you live exactly" feels intrusive.',
      },
      {
        kind: 'mcq',
        prompt: 'The queue reaches the counter. How does Grace end it?',
        options: [
          { text: '"Lovely to chat! Good luck with the bees, and the stings."' },
          { text: 'Turns away mid-sentence', why: 'A one-line goodbye is kinder.' },
          { text: '"Can I have your number?"', why: 'A big jump from a queue chat. A warm goodbye fits.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['Open question', 'Starts with what, how, why'],
          ['Barista study', 'A short chat lifts mood'],
          ['"Not now" signal', 'Short answers, glancing away'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s balanced reply in the queue.',
        template: 'I was a [[1]] until a month ago, so everything is [[2]]. What about [[3]]?',
        blanks: [['nurse'], ['new'], ['you']],
        distractors: ['bee', 'old'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Grace\'s follow-up about the bees.',
        tiles: ['How', 'did', 'you', 'get', 'into', 'beekeeping?'],
        distractors: ['Okay.', 'Anyway'],
      },
    ],
  },
  reflect: {
    prompt: 'Where do you wait in line or sit near strangers regularly? Plan one "notice + ask" and one follow-up you could use there.',
    starters: ['I often wait at...', 'I could notice...', 'Then follow up with...'],
  },
  deepen: {
    title: 'The queue challenge',
    summary: 'Next time you\'re in a queue and the person near you looks open, try one line. If they answer, try one follow-up. That\'s it. Notice how the wait feels.',
  },
  notes: 'Review of lessons 1–4 plus Chapter 1. Chorlton is a Manchester suburb. The beekeeper is an unnamed extra (lines given via Grace\'s message).',
};

export default lesson;
