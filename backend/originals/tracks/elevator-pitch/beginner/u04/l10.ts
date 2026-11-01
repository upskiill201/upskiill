import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10 — Unit Challenge: the dress rehearsal in front of the whole office. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the dress rehearsal',
  summary: 'Friday, four days before pitch night. Tunde has booked the big boardroom and invited the whole office: forty people, including the CEO. Someone has set up a microphone. Someone else has a stopwatch. Ada\'s heart is racing.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 4 tool in one live rehearsal',
    'Handle nerves, a slip and a big audience',
    'Deliver your pitch like you mean it',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 4 p.m. The boardroom.',
      beats: [
        { speaker: 'narrator', text: 'Forty colleagues. The CEO in the front row. Tunde with a stopwatch and a whistle he refuses to explain.' },
        { speaker: 'ada', text: '(by the door, whispering) Breathe. I\'m excited. I\'m... very excited.' },
        { speaker: 'narrator', text: 'Tunde: "Ladies and gentlemen, the finalist. Sixty seconds. Starting... now."' },
      ],
    },
  ],
  apply: {
    scenario: 'The dress rehearsal. Forty people. One minute.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Ada\'s heart is racing by the door. What does she do?',
        options: [
          { text: 'Three slow breaths and "I\'m excited", then walk on' },
          { text: 'Tell herself sternly to calm down', why: 'The "calm down" trap.' },
          { text: 'Ask to go last, then leave', why: 'Four days to go. This is the practice.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Ada\'s first ten seconds in order.',
        lines: ['Walk on and plant both feet', 'Look at one friendly face', 'Say the hook, word for word', 'Pause'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: '(in her head) The CEO is in the front row. Should I look at him the whole time?',
        prompt: 'Your advice?',
        options: [
          { text: 'Stare at him the whole time.', why: 'Share it around.' },
          { text: 'Avoid him completely.', why: 'Include him, just don\'t lock on.' },
          { text: 'Give him a sentence, then move on to faces around the room. One sentence, one person.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'During the pitch: do it, or don\'t?',
        groups: ['Do it', 'Don\'t'],
        items: [
          { text: 'Soften the voice for the Tunde story', group: 0 },
          { text: 'Read from the phone', group: 1 },
          { text: 'Step forward for the ask', group: 0 },
          { text: 'Rush to finish in 40 seconds', group: 1 },
          { text: 'Pause after the laugh', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'At the treasurer beat, Ada goes blank. Total white screen. What now?',
        options: [
          { text: '"Sorry, sorry, can I start again?"', why: 'Turns a pause into a big moment.' },
          { text: 'Read the full script from her phone', why: 'Back to the hostage video.' },
          { text: 'Pause, breathe, repeat her last beat: "So, Tunde swore he\'d paid..." and carry on' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Learn the middle of the pitch as ___. (one word)',
        answers: ['beats'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'The CEO laughs at the Tunde line. What should Ada do?',
        options: [
          { text: 'Talk over the laugh', why: 'You\'ll lose your next line in the noise.' },
          { text: 'Pause and let the laugh finish, then carry on' },
          { text: 'Tell another joke', why: 'Stick to the beats.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s ending. Which line throws it away?',
        lines: [
          'I\'m looking for a mentor to take it to a hundred offices.',
          'No more fights about who\'s paid.',
          'So, um, yeah, that\'s it, I guess, thanks, sorry it was a bit long.',
        ],
        bug: 2,
        fix: '(stop, smile, wait for applause)',
        explanation: 'The rhyme is the ending. Then stop. Everything after shrinks it.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the Chapter 4 tool.',
        pairs: [
          ['"I\'m excited" by the door', 'Reframing nerves'],
          ['Recovering at the treasurer beat', 'When your mind goes blank'],
          ['Stepping forward for the ask', 'Voice, pace, eyes and hands'],
          ['Knowing every number instantly', 'Prepared beats passionate'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: '57 seconds. Tunde blew the whistle and shouted "NO HOSTAGES!" The CEO stood up and said, "Whatever happens on Tuesday, we\'re sponsoring your next ten offices." ARJUN.',
        prompt: 'What does Arjun reply?',
        options: [
          { text: 'Two weeks ago: 41 seconds of reading. Today: 57 seconds that got you a sponsor. That\'s Chapter 4.' },
          { text: 'Rehearse 100 more times tonight.', why: 'Rest. Spread the practice.' },
          { text: 'Change all the words before Tuesday.', why: 'The words work. Keep them.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Rehearsal one, or the dress rehearsal?',
        groups: ['Rehearsal one', 'Dress rehearsal'],
        items: [
          { text: 'Phone like a shield', group: 0 },
          { text: 'Eyes on friendly faces', group: 1 },
          { text: '41 seconds', group: 0 },
          { text: 'Recovered from a blank calmly', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 4 in one line.',
        template: 'Be [[1]]. Learn the [[2]]. Say it like you [[3]] it.',
        blanks: [['prepared'], ['beats'], ['mean']],
        distractors: ['loud', 'script'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tunde\'s verdict.',
        tiles: ['No', 'hostages!', '57', 'seconds!'],
        distractors: ['41'],
      },
    ],
  },
  reflect: {
    prompt: 'Organise your own "dress rehearsal": pitch to a group of people (friends, family, classmates) with a timer. Write down what happened and what you\'ll keep.',
    starters: ['I pitched to...', 'Time: ...', 'What I\'ll keep: ...'],
  },
  deepen: {
    title: 'Next week: pitch night',
    summary: 'Arjun: "The words work. The delivery works. Two things left before Tuesday. One: your ask has to be sharper. Two: the judges get two minutes of questions. And Mrs Adeyemi asks the hardest ones."',
  },
  notes: 'Unit Challenge: reviews Chapter 4. The CEO sponsorship and boardroom rehearsal are fictional.',
};

export default lesson;
