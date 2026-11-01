import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. "Pitch check" (Tap to explore): Ada's beats card, with delivery notes. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Pitch check: Ada\'s beats card',
  summary: 'Ada\'s final notes card fits on the back of her finalist badge. Arjun asks for a photo. "This card is the whole of Chapter 4."',
  minutes: 11,
  outcomes: [
    'See every Chapter 4 tool on one small card',
    'Write beats and delivery cues together',
    'Make your own card',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s beats card',
      text: 'BREATHE. I\'m excited. HOOK: "Ten colleagues... what could possibly go wrong?" (pause) TUNDE (quieter, smile) / APP / TREASURER: two seconds / NUMBERS: June to now / step forward. ASK: a mentor, 100 offices (pause) RHYME: "No more fights about who\'s paid." Stop. Smile.',
      hotspots: [
        { phrase: 'BREATHE. I\'m excited.', note: 'The nerves plan comes first: a slow breath, then the excitement reframe.' },
        { phrase: 'HOOK: "Ten colleagues... what could possibly go wrong?"', note: 'The opening is memorised word for word, because nerves hit hardest at the start.' },
        { phrase: 'TUNDE (quieter, smile) / APP / TREASURER: two seconds / NUMBERS: June to now', note: 'The middle is beats, not sentences. One or two words each, so a glance is enough.' },
        { phrase: '(quieter, smile)', note: 'A voice cue: vary the voice. The story gets a softer, warmer tone.' },
        { phrase: 'step forward. ASK: a mentor, 100 offices', note: 'A movement with purpose, then the ask. The step marks the most important moment.' },
        { phrase: 'RHYME: "No more fights about who\'s paid." Stop. Smile.', note: 'The closing line is memorised exactly, then she stops. No "so yeah, that\'s it".' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A good card: the nerves cue, the exact first line, beats for the middle, voice and movement cues, the exact last line, and "stop".',
    },
  ],
  apply: {
    scenario: 'Arjun\'s photo of the card.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why are the hook and the rhyme written out in full, but the middle isn\'t?',
        options: [
          { text: 'She ran out of space', why: 'It\'s deliberate.' },
          { text: 'The middle isn\'t important', why: 'It\'s important; it\'s just learned differently.' },
          { text: 'The first and last lines are memorised exactly; the middle is learned as beats' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Content, or delivery cue?',
        groups: ['Content', 'Delivery cue'],
        items: [
          { text: 'TUNDE', group: 0 },
          { text: '(quieter, smile)', group: 1 },
          { text: 'NUMBERS: June to now', group: 0 },
          { text: 'step forward', group: 1 },
          { text: '(pause)', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the card in order.',
        lines: ['Breathe, "I\'m excited"', 'The hook, word for word', 'Tunde, app, treasurer, numbers', 'Step forward and ask', 'The rhyme, then stop'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Should I add the full Tunde story in small writing, just in case?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'No: small writing tempts you to read. "TUNDE" is enough; you know the story.' },
          { text: 'Yes, in tiny font.', why: 'Then she\'ll squint and read.' },
          { text: 'Write the whole pitch twice.', why: 'That\'s a script, not a card.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The last word on Ada\'s card before "Smile": ___. (one word)',
        answers: ['stop', 'Stop'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s first draft card. Which line breaks Chapter 4\'s rules?',
        lines: [
          'BREATHE. I\'m excited.',
          'Act super passionate! Big arms! Shout!',
          'ASK: a mentor, 100 offices.',
        ],
        bug: 1,
        fix: 'step forward. (pause)',
        explanation: 'Displayed passion didn\'t predict funding. Preparation and purposeful delivery did.',
      },
      {
        kind: 'mcq',
        prompt: 'Why mark "(pause)" on the card?',
        options: [
          { text: 'To fill time', why: 'Pauses are for impact.' },
          { text: 'Nerves make people rush, so a written cue reminds her to let key moments land' },
          { text: 'Because she forgets to breathe', why: 'That\'s the BREATHE cue.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card cue to the lesson.',
        pairs: [
          ['"I\'m excited"', 'Reframing nerves'],
          ['Beats in the middle', 'Beats, not script'],
          ['(quieter, smile)', 'Voice, pace, eyes and hands'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The end of the card.',
        template: 'RHYME: "No more [[1]] about who\'s [[2]]." [[3]]. Smile.',
        blanks: [['fights'], ['paid'], ['Stop']],
        distractors: ['Sorry', 'database'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the card\'s first line.',
        tiles: ['BREATHE.', 'I\'m', 'excited.'],
        distractors: ['calm.'],
      },
    ],
  },
  reflect: {
    prompt: 'Make your own beats card: a nerves cue, your exact first line, beats for the middle, at least two delivery cues, your exact last line, and "stop".',
    starters: ['Nerves cue: ...', 'First line: ...', 'Beats: ...', 'Last line: ...'],
  },
  deepen: {
    title: 'Badge-sized',
    summary: 'Make your card small enough to fit on a business card or the back of a badge. If it doesn\'t fit, you have too much on it.',
  },
  notes: 'Synthesis of Chapter 4 tools on a speaking card. Explore hotspot phrases appear verbatim in the text.',
};

export default lesson;
