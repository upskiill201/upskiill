import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 — Unit Challenge: the 60-second video submission. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the video submission',
  summary: 'An email from the organisers: "All finalists, please send a 60-second pitch video by Friday. The judges will watch them before pitch night." The judges will see Ada before they see Ada.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 3 tool in one recorded pitch',
    'Adapt a pitch for video',
    'Check it with the memory test before sending',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Thursday night. Ada\'s bedroom, phone on a stack of books.',
      beats: [
        { speaker: 'narrator', text: 'Take 1: Ada starts with "Hello, my name is Ada and my app is..." and stops herself. "Name badge. Again."' },
        { speaker: 'narrator', text: 'Take 2: She forgets the Tunde line and says "...and then some stuff happened." She deletes it.' },
        { speaker: 'ada', text: '(to the phone) Okay. Hook. Story. Picture. Numbers. Ask. Rhyme. Take 3.' },
        { speaker: 'narrator', text: 'This time you\'re the director. Help Ada record the take that goes to the judges.' },
      ],
    },
  ],
  apply: {
    scenario: 'The video. Take 3.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should the first five seconds of the video be?',
        options: [
          { text: '"Hello, my name is Ada and my app is called Ajo Tracker."', why: 'The name badge.' },
          { text: '"Sorry, this is my third take..."', why: 'Never apologise in the first five seconds.' },
          { text: '"Ten colleagues. Two hundred thousand naira a month. One notebook. What could possibly go wrong?"' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the video pitch in order.',
        lines: ['Hook', 'Tunde\'s story', 'What the app does', 'The Surulere treasurer', 'Numbers and growth', 'The ask', 'The rhyme'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Should I show the app\'s screens for the whole 60 seconds? It\'s a video, after all.',
        prompt: 'Your direction?',
        options: [
          { text: 'Screens only, no face.', why: 'People connect with people.' },
          { text: 'Show every screen and setting.', why: 'That\'s a feature tour, not a pitch.' },
          { text: 'Mostly your face telling the story. Maybe one quick shot of the "two seconds" screen when you mention it.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'In the video, or cut?',
        groups: ['In the video', 'Cut'],
        items: [
          { text: 'Tunde swore he\'d paid in March', group: 0 },
          { text: 'A seamless, innovative solution', group: 1 },
          { text: 'One group in June, three today', group: 0 },
          { text: 'A tour of the settings page', group: 1 },
          { text: 'No more fights about who\'s paid', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Before sending, Ada shows it to Tunde and asks: "What do you ___?" (one word)',
        answers: ['remember'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Which one-word pitch could Ada put on screen at the end?',
        options: [
          { text: '"Database."', why: 'Never again.' },
          { text: '"Peace."' },
          { text: '"Innovation."', why: 'Fails the photo test.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'The script for take 3. Which line should Ada cut?',
        lines: [
          'One day, Tunde swore he\'d paid in March.',
          'Now a church treasurer in Surulere checks forty members in two seconds.',
          'Soon it will be used by millions across the entire continent, guaranteed.',
          'I\'m looking for a mentor to take it to a hundred offices.',
        ],
        bug: 2,
        fix: 'One group in June, three groups and 110 members today.',
        explanation: 'An inflated promise. Real, growing numbers are more convincing.',
      },
      {
        kind: 'mcq',
        prompt: 'Ada wants to end the video with a question. Which works best?',
        options: [
          { text: '"Could you be the mentor who helps me reach a hundred offices?"' },
          { text: '"Any questions?"', why: 'Nobody can answer a video.' },
          { text: '"Did you like it?"', why: 'Not an ask.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the Chapter 3 tool.',
        pairs: [
          ['"What could possibly go wrong?"', 'A curiosity hook'],
          ['Tunde in March', 'The Pixar story'],
          ['"Two seconds instead of WhatsApp"', 'Vivid, not vague'],
          ['"No more fights about who\'s paid"', 'The rhyming pitch'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Tunde watched it. He repeated the whole hook and the rhyme back to me. Then he said "I\'m famous now." Sending it!',
        prompt: 'What does Arjun reply?',
        options: [
          { text: 'Record 20 more takes first.', why: 'It passed the memory test. Send it.' },
          { text: 'Week one, nobody remembered your pitch. Now a sceptical colleague can recite it. That\'s Chapter 3.' },
          { text: 'Add your database to the end.', why: 'Absolutely not.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Week-one pitch, or Pitch v3?',
        groups: ['Week one', 'Pitch v3'],
        items: [
          { text: 'It\'s built in Python...', group: 0 },
          { text: 'What could possibly go wrong?', group: 1 },
          { text: 'So yeah. That\'s it.', group: 0 },
          { text: 'No more fights about who\'s paid.', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 3 in one line.',
        template: 'A [[1]] to open. A [[2]] in the middle. A line they can [[3]] at the end.',
        blanks: [['hook'], ['story'], ['repeat', 'remember']],
        distractors: ['database', 'buzzword'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the video\'s ask.',
        tiles: ['Could', 'you', 'be', 'the', 'mentor', 'I\'m', 'looking', 'for?'],
        distractors: ['Hmm.'],
      },
    ],
  },
  reflect: {
    prompt: 'Record your own 60-second pitch video on your phone. Then show it to someone and ask, "What do you remember?"',
    starters: ['My hook: ...', 'They remembered...'],
  },
  deepen: {
    title: 'Next week: say it like you mean it',
    summary: 'Ada rehearses for the office on Monday. She reads from her phone, looks at the floor, and finishes in 41 seconds. Tunde, kindly: "Great words. But it sounded like a hostage video." Next chapter: delivery.',
  },
  notes: 'Unit Challenge: reviews Chapter 3. The video submission is a fictional competition requirement.',
};

export default lesson;
