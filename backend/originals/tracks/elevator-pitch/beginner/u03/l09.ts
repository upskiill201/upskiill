import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. "Pitch check" (Tap to explore): Pitch v3, now with a hook, a story and proof. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Pitch check: v3',
  summary: 'Ada sends Arjun Pitch v3. He reads it once, closes his laptop, and texts her the whole thing back from memory. "I remembered it. That\'s the test."',
  minutes: 11,
  outcomes: [
    'See every Chapter 3 tool in one pitch',
    'Explain why each line sticks',
    'Plan your own v3',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Pitch v3 (about 120 words)',
      text: 'Ten colleagues. Two hundred thousand naira a month. One notebook. What could possibly go wrong? One day, Tunde swore he\'d paid in March. The notebook said he hadn\'t. The office split into two teams. So I learned Python and built Ajo Tracker: it records every payment and reminds everyone before payday. Now a church treasurer in Surulere checks forty members in two seconds, instead of chasing them on WhatsApp. One group in June, three groups and 110 members today. And Tunde has paid on time every month since. I\'m looking for a mentor to take it to a hundred offices. No more fights about who\'s paid.',
      hotspots: [
        { phrase: 'Ten colleagues. Two hundred thousand naira a month. One notebook. What could possibly go wrong?', note: 'The hook: concrete numbers and a question that opens a curiosity gap in the first five seconds.' },
        { phrase: 'One day, Tunde swore he\'d paid in March.', note: 'The Pixar "one day": a real person and a moment of conflict. This is what Arjun remembered.' },
        { phrase: 'it records every payment and reminds everyone before payday', note: 'What the app does, as the answer to the story. Features appear only as the reason it works.' },
        { phrase: 'checks forty members in two seconds, instead of chasing them on WhatsApp', note: 'Vivid, not vague. You could photograph it.' },
        { phrase: 'One group in June, three groups and 110 members today.', note: 'Honest numbers that show growth.' },
        { phrase: 'And Tunde has paid on time every month since.', note: 'The "until finally", with a laugh. Tunde approved it.' },
        { phrase: 'No more fights about who\'s paid.', note: 'A rhyme to finish: the line people repeat afterwards.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Hook, story, vivid benefit, honest numbers, ask, and a line people can repeat. Clear AND memorable.',
    },
  ],
  apply: {
    scenario: 'Arjun\'s memory test.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What proves Pitch v3 is sticky?',
        options: [
          { text: 'Arjun texted it back from memory after one read' },
          { text: 'It\'s exactly 60 seconds', why: 'Timing isn\'t stickiness.' },
          { text: 'It mentions Python', why: 'That\'s not why it sticks.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 3 tool is it?',
        groups: ['Hook', 'Story', 'Rhyme'],
        items: [
          { text: 'What could possibly go wrong?', group: 0 },
          { text: 'Tunde swore he\'d paid in March', group: 1 },
          { text: 'No more fights about who\'s paid', group: 2 },
          { text: 'The office split into two teams', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Pitch v3\'s parts in order.',
        lines: ['The hook', 'The story', 'What the app does', 'The vivid benefit', 'Numbers and growth', 'The ask', 'The rhyme'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'It\'s 120 words. Is that too long?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Way too long, cut half.', why: 'It fits a minute.' },
          { text: 'About 140 words fits 60 seconds, so you have room for pauses. Time it out loud to check.' },
          { text: 'Add 200 more words.', why: 'Then it won\'t fit.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Pitch v3 ends with a line people can ___. (one word)',
        answers: ['repeat', 'remember'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'An earlier draft of v3. Which line didn\'t survive, and why?',
        lines: [
          'One day, Tunde swore he\'d paid in March.',
          'Ajo Tracker is a seamless, innovative solution for community finance.',
          'One group in June, three groups and 110 members today.',
        ],
        bug: 1,
        fix: 'Now a church treasurer checks forty members in two seconds.',
        explanation: 'Buzzwords fail the photo test. The vivid version replaced it.',
      },
      {
        kind: 'mcq',
        prompt: 'Where does the "ask" sit in v3?',
        options: [
          { text: 'Near the end, before the closing rhyme' },
          { text: 'It\'s missing', why: 'It\'s there: a mentor for a hundred offices.' },
          { text: 'In the hook', why: 'The hook opens with a question.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the v3 line to its lesson.',
        pairs: [
          ['"What could possibly go wrong?"', 'A hook that makes them curious'],
          ['"Chasing them on WhatsApp"', 'Vague vs vivid'],
          ['"One group in June, three today"', 'Numbers that prove it'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The v3 hook.',
        template: 'Ten [[1]]. Two hundred thousand naira a month. One [[2]]. What could possibly go [[3]]?',
        blanks: [['colleagues'], ['notebook'], ['wrong']],
        distractors: ['database', 'right'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the closing line.',
        tiles: ['No', 'more', 'fights', 'about', 'who\'s', 'paid.'],
        distractors: ['Hmm.'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your Pitch v3: a hook, a short story, a vivid benefit, one or two honest numbers, your ask and a line people can repeat.',
    starters: ['Hook: ...', 'Story: ...', 'Number: ...', 'Ask: ...', 'Closing line: ...'],
  },
  deepen: {
    title: 'The memory test',
    summary: 'Send your v3 to a friend. Tomorrow, ask them to tell it back to you without looking. What they remember is your pitch\'s backbone.',
  },
  notes: 'Synthesis of Chapter 3 tools. Explore hotspot phrases appear verbatim in the text. ~120 words fits 60 seconds at ~130–150 wpm with pauses.',
};

export default lesson;
