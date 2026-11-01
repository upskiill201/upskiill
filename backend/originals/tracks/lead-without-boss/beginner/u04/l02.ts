import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Side by side: nagging vs a helpful follow-up. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Follow up, don\'t nag',
  summary: 'Emeka\'s new reference field was due last Monday. Then Wednesday. Then "this week for sure". Remi\'s draft follow-up has four exclamation marks. Tey puts it next to another version.',
  minutes: 11,
  outcomes: [
    'Tell nagging from a helpful follow-up',
    'Make the next step easier, not just louder',
    'Find out what\'s really in the way',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Remi to Emeka, the third follow-up',
      before: { label: 'Nagging', text: 'Hi Emeka!! Just checking in AGAIN on the reference field!! This is really urgent now, the review is in 10 days!! Please let me know ASAP!!' },
      after: { label: 'Helpful', text: 'Hi Emeka, the reference field has slipped twice, so I\'m guessing something\'s in the way. Is it time, or something technical? Zanele has written the exact field text, attached, so it\'s a copy-paste. Could we do 10 minutes at 9 a.m. your time tomorrow and set it up together?' },
      notes: [
        'Nagging repeats the ask, louder. Helpful asks what\'s in the way.',
        'Helpful makes the next step smaller: a copy-paste and 10 minutes.',
        'It still names the slip, calmly. No pretending.',
      ],
    },
    {
      kind: 'text',
      html: "<p>When something keeps slipping, the person usually <em>wants</em> to do it. Something is in the way: time, confusion, a missing permission, a bigger fire. Nagging adds pressure but doesn't remove the obstacle, and it makes people avoid you. A helpful follow-up does three things: it <strong>names the slip</strong> honestly, <strong>asks what's in the way</strong>, and <strong>makes the next step smaller</strong>.</p><p>It turned out Emeka needed sign-off from his own manager to change a Lagos form, and felt awkward asking. Remi offered to write the request for him.</p>",
    },
    {
      kind: 'check',
      question: 'What was really in Emeka\'s way?',
      options: ['He needed his manager\'s sign-off and felt awkward asking', 'He didn\'t care', 'He forgot'],
      answer: 0,
      explanation: 'A hidden obstacle. Nagging would never have found it.',
    },
  ],
  apply: {
    scenario: 'The third follow-up.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Nagging or helpful?',
        groups: ['Nagging', 'Helpful'],
        items: [
          { text: '"Just checking in AGAIN!!"', group: 0 },
          { text: '"Is it time, or something technical?"', group: 1 },
          { text: '"Please reply ASAP!!"', group: 0 },
          { text: '"Here\'s the text, ready to copy."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When something keeps slipping, what\'s usually true?',
        options: [
          { text: 'They\'re refusing politely', why: 'Sometimes, but usually there\'s an obstacle.' },
          { text: 'Something is in the way, even if they want to do it' },
          { text: 'They need more pressure', why: 'Pressure doesn\'t remove obstacles.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'Honestly? I need my manager to sign off, and I didn\'t want to bother her with a Nairobi thing.',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'That makes total sense. Want me to draft the request for her, so you just forward it? I\'ll say it saves Lagos time too.' },
          { text: 'You should have told me weeks ago.', why: 'True, and it makes him regret telling you now.' },
          { text: 'Just do it without asking her.', why: 'Puts him at risk with his manager.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A helpful follow-up makes the next step ___. (one word)',
        answers: ['smaller', 'easier', 'Smaller', 'Easier'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the helpful follow-up to its job.',
        pairs: [
          ['"It has slipped twice"', 'Names the slip honestly'],
          ['"Is it time, or technical?"', 'Asks what\'s in the way'],
          ['"Copy-paste, 10 minutes"', 'Makes the step smaller'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does nagging backfire?',
        options: [
          { text: 'It\'s too polite', why: 'It\'s usually the opposite.' },
          { text: 'It doesn\'t; it always works', why: 'It got three slips.' },
          { text: 'It adds pressure without removing the obstacle, so people avoid you' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s draft. Which line is still nagging?',
        lines: [
          'The field has slipped twice, so I\'m guessing something\'s in the way.',
          'Everyone else has done their part, by the way.',
          'Could we do 10 minutes tomorrow and set it up together?',
        ],
        bug: 1,
        fix: 'Zanele has written the field text, attached.',
        explanation: 'Comparing him to others is guilt, not help.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a helpful follow-up in order.',
        lines: ['Name the slip calmly', 'Ask what\'s in the way', 'Offer to make it smaller', 'Suggest a specific time'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Don\'t ask [[1]]. Ask what\'s in the [[2]].',
        blanks: [['louder', 'again'], ['way']],
        distractors: ['nicer', 'room'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s key question.',
        tiles: ['Is', 'something', 'in', 'the', 'way?'],
        distractors: ['wrong'],
      },
    ],
  },
  reflect: {
    prompt: 'Is there something someone owes you that keeps slipping? What might be in their way? How could you make the next step smaller?',
    starters: ['It keeps slipping because maybe...', 'I could make it smaller by...'],
  },
  deepen: {
    title: 'Rewrite one chaser',
    summary: 'Find the last "just checking in" message you sent. Rewrite it to ask what\'s in the way and offer to make the next step smaller.',
  },
  notes: 'Follow-up practice: identify and remove obstacles (cf. Kotter, "remove obstacles"; Amabile & Kramer on catalysts and inhibitors). Fictional events.',
};

export default lesson;
