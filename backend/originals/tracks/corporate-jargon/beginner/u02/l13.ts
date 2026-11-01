import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 13. Card deck: steering phrases — step back, big picture, rabbit hole, in the weeds, going round in circles, in the interest of time. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: '"Let\'s take a step back" and other steering phrases',
  summary: 'Forty minutes into the courier debate, Brian says: "We\'re going down a rabbit hole. Let\'s take a step back and look at the big picture." Remi, literally, takes a step back. Into a chair.',
  minutes: 11,
  outcomes: [
    'Decode the phrases people use to steer a meeting',
    'Know what each one is asking the room to do',
    'Use one to get a stuck meeting moving',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Some meeting phrases don't add information. They <strong>steer</strong>: they tell the room to change direction. Senior people use them constantly, and they're some of the most useful phrases you can learn.</p><p>Here are the ones Brian used in a single afternoon.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Down a rabbit hole</h3><p>Lost in a detail that's taking the meeting away from what matters. Picture following a rabbit underground and getting lost.</p><p><strong>Steers to:</strong> stop, come back up.</p><h3>In the weeds</h3><p>Too deep in small details. \"We're getting into the weeds on invoice codes.\"</p><p><strong>Steers to:</strong> less detail.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Let's take a step back</h3><p>Stop and look at the whole situation again, from further away.</p><h3>The big picture</h3><p>The overall situation, not the details. \"Big picture: are deliveries getting faster or not?\"</p><p><strong>Both steer to:</strong> what really matters.</p>",
    },
    {
      kind: 'check',
      question: 'Brian says, "We\'re in the weeds." What does he want?',
      options: ['More detail', 'Less detail, back to what matters', 'A gardening break'],
      answer: 1,
      explanation: 'In the weeds = too deep in details.',
    },
    {
      kind: 'text',
      html: "<h3>Going round in circles</h3><p>The same points keep coming back and nothing moves forward.</p><p><strong>Steers to:</strong> decide, or stop.</p><h3>In the interest of time</h3><p>A polite way to say \"we're running out of time, so...\". \"In the interest of time, let's move on to next steps.\"</p><p><strong>Steers to:</strong> move on, now.</p><h3>Let's move on / let's park that</h3><p>Leave this topic for now. (Park it = put it in the parking lot.)</p>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'You don\'t have to be the boss to steer. "Are we getting into the weeds? Should we take this offline?" is a gift to any meeting, from anyone.',
    },
  ],
  apply: {
    scenario: 'Thursday, 12:10. The courier debate, minute forty.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the steering phrase to what it asks for.',
        pairs: [
          ['Rabbit hole', 'Come back from a detour'],
          ['In the weeds', 'Less detail'],
          ['Big picture', 'The overall situation'],
          ['In the interest of time', 'We need to move on'],
        ],
      },
      {
        kind: 'mcq',
        prompt: '"We\'re going round in circles." What\'s the problem?',
        options: [
          { text: 'People are walking around the table', why: 'Remi checked. They\'re seated.' },
          { text: 'The meeting is moving too fast', why: 'The opposite: it isn\'t moving at all.' },
          { text: 'The same points keep coming back and nothing is decided' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'More detail, or less detail?',
        groups: ['Asks for more detail', 'Asks for less detail'],
        items: [
          { text: 'Let\'s drill down into that', group: 0 },
          { text: 'We\'re in the weeds', group: 1 },
          { text: 'Can you unpack that?', group: 0 },
          { text: 'Big picture, please', group: 1 },
          { text: 'Let\'s take a step back', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: '(private chat) We\'ve been on invoice codes for 20 minutes. I\'m losing the will to live.',
        prompt: 'Remi wants to steer, politely. What does he say to the room?',
        options: [
          { text: '"Are we getting a bit into the weeds? Should we take the codes offline with Finance?"' },
          { text: '"This is boring."', why: 'Possibly true. Definitely not the way.' },
          { text: 'Nothing, he\'s just an intern.', why: 'Anyone can offer a steer, kindly.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '"We\'re going down a rabbit ___." (one word)',
        answers: ['hole'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'It\'s 12:25 and the meeting ends at 12:30. Brian says: "In the interest of time..." What comes next?',
        options: [
          { text: 'A long new topic', why: 'He\'s signalling the opposite.' },
          { text: 'Something like "let\'s agree next steps now"' },
          { text: 'Lunch orders', why: 'Tempting, but no.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s notes on steering phrases. Which one is wrong?',
        lines: [
          'Take a step back: look at the whole situation again.',
          'In the weeds: we need much more detail.',
          'Park it: leave it for another time.',
        ],
        bug: 1,
        fix: 'In the weeds: too deep in small details.',
        explanation: 'In the weeds means TOO MUCH detail.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Brian rescues the meeting.',
        template: 'We\'re going round in [[1]]. Let\'s take a step [[2]]. Big [[3]]: which courier is faster?',
        blanks: [['circles'], ['back'], ['picture']],
        distractors: ['weeds', 'forward'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Devil\'s advocate', 'Arguing the other side on purpose'],
          ['Hard stop', 'Must leave at a fixed time'],
          ['Deep dive', 'A detailed look'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Brian\'s steer.',
        tiles: ['Let\'s', 'take', 'a', 'step', 'back', 'and', 'look', 'at', 'the', 'big', 'picture.'],
        distractors: ['weeds'],
      },
    ],
  },
  reflect: {
    prompt: 'When did you last see a meeting, class discussion or family debate go down a rabbit hole? Which steering phrase would have helped?',
    starters: ['It went down a rabbit hole when...', 'I could have said...'],
  },
  deepen: {
    title: 'The steering card',
    summary: 'Write five steering phrases on a card or in your notes: step back, big picture, in the weeds, in the interest of time, park it. Try using one in your next meeting.',
  },
  notes: '"Down the rabbit hole" (Merriam-Webster: a complexly bizarre or difficult state; from Alice in Wonderland), "in the weeds" (US informal: overly involved in details), "big picture" (Cambridge), "going round in circles" (Cambridge), "in the interest(s) of time".',
};

export default lesson;
