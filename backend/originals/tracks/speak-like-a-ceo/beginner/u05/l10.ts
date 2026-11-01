import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10. Unit Challenge: the Encuentro. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the Encuentro',
  summary: 'The day. 300 people, 15 minutes, ten minutes of questions. Lucía walks on stage. Everything from the course.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Give a big talk and handle the questions', 'Use the whole talk card together'],
  learn: [
    {
      kind: 'reading',
      title: 'The Encuentro',
      html: '<p>Backstage: a racing heart. "I am excited." First line. Go.</p><p><em>"In March, a shop owner in Guadalajara told Sofía what to make."</em> Pause. <em>"We listened, and it worked. Three things it taught us."</em></p><p>Doña Rosa, then 140 of 200. Signpost, walk. The Guadalajara test. Signpost, walk. The chart: she points to the orange gap, turns back to the room. <em>"38% above target."</em> Pause.</p><p><em>"We listened, and it worked. Let\'s keep listening. This month, talk to one customer."</em> 14 minutes 40 seconds.</p><p><strong>Questions.</strong> "Why Monterrey and not Puebla?" She repeats it, answers in 20 seconds. "Wasn\'t the target just too low?" "Fair question. Same method as our last three launches, and this one beat all three." "What will it sell next year?" "I don\'t know yet. A forecast by end of October, on the intranet."</p><p>Applause. Then a queue of people at the side of the stage, wanting to tell her about their customers.</p>',
    },
    {
      kind: 'story',
      title: 'Afterwards',
      beats: [
        { speaker: 'carmen', text: 'Three people from sales asked to join your customer visits. That\'s what a message does.' },
        { speaker: 'diego', text: 'Five weeks ago: four minutes and 23 ums. Today: the Encuentro. I\'ll stop giving notes now. Mostly.' },
        { speaker: 'tey', text: 'That\'s the course: headline first, leaders, build the talk, voice and presence, questions. Keep your talk card.' },
      ],
    },
  ],
  apply: {
    scenario: 'Final challenge: the Encuentro.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How did Lucía open?',
        options: [
          { text: '"Thank you for having me"', why: 'She opened with a moment.' },
          { text: 'With the agenda', why: 'With a moment.' },
          { text: 'With a moment: the shop owner in Guadalajara' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'The talk or the questions?',
        groups: ['The talk', 'The questions'],
        items: [
          { text: 'Pointing to the orange gap', group: 0 },
          { text: '"Fair question."', group: 1 },
          { text: 'Walking on signposts', group: 0 },
          { text: '"I don\'t know yet."', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How long was the talk? (minutes and seconds, e.g. 12:30)',
        answers: ['14:40', '14.40', '1440', '14 40', '14m40s'],
        placeholder: 'A time',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to the technique.',
        pairs: [
          ['"Why not Puebla?"', 'Repeat, answer first, short'],
          ['"Wasn\'t the target too low?"', 'Acknowledge, fact, bridge'],
          ['"What will it sell next year?"', 'Honest "I don\'t know" and follow-up'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I\'m exhausted. And I want to do it again.',
        prompt: "Carmen\'s best reply?",
        options: [
          { text: 'Never do it again.', why: 'Keep practising.' },
          { text: 'Good. Keep the talk card, use the first five checks every Monday, and the whole card for the next big one.' },
          { text: 'Throw the card away now.', why: 'Keep it.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The course in one line.',
        template: 'Headline [[1]], one message, calm delivery, honest [[2]].',
        blanks: [['first'], ['answers']],
        distractors: ['last', 'guesses'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line from five weeks ago would fail the talk card now?',
        lines: [
          '"We listened, and it worked."',
          '"Fair question."',
          '"So, first, the agency meeting, then the photo shoot..."',
          '"I don\'t know yet; forecast by end of October."',
        ],
        bug: 2,
        fix: 'Start with the headline.',
        explanation: 'That was Monday, week one: the headline came last.',
      },
      {
        kind: 'mcq',
        prompt: 'What happened after the talk?',
        options: [
          { text: 'People queued to tell her about their customers' },
          { text: 'Everyone left immediately', why: 'They queued to talk to her.' },
          { text: 'Nobody remembered it', why: 'Three people joined her visits.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many ums did Lucía say five weeks ago, in her first update?',
        answers: ['23', 'twenty-three', 'twenty three'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the course\'s five chapters.',
        lines: ['Headline first', 'In the room with leaders', 'Build the talk', 'Voice and presence', 'Questions and the big day'],
      },
    ],
  },
  reflect: {
    prompt: 'Plan your own next talk with all 25 checks. Record the rehearsal. What will your first line be?',
    starters: ['My first line:...', 'My message:...'],
  },
  deepen: {
    title: 'Keep the habits small',
    summary: 'The habits that got Lucía here are small: headline first, three points, pause, eyes on people, answer first. Use them every week and the big days take care of themselves.',
  },
  notes: 'Course finale (fictional): Encuentro talk 14:40; Q&A uses repeat/answer, acknowledge/fact/bridge, and honest "I don\'t know". Distinct from Make People Listen and Elevator Pitch.',
};

export default lesson;
