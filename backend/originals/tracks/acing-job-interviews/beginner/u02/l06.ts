import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Explain cards: the video interview set-up. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The video set-up',
  summary: 'Mtaa Labs is a video interview. Remi\'s plan: laptop on his bed, flatmates in the background, phone hotspot. Ada sends him her checklist instead.',
  minutes: 12,
  outcomes: [
    'Set up for a video interview',
    'Plan for things going wrong',
    'Look and sound clear on camera',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Ada\'s video interview checklist:</p><table><tr><th>Check</th><th>Why</th></tr><tr><td><strong>Connection:</strong> test the link the day before; have a phone hotspot as backup</td><td>Most video problems are connection problems</td></tr><tr><td><strong>Camera at eye level:</strong> stack books under the laptop</td><td>Looking up from below is unflattering and awkward</td></tr><tr><td><strong>Light in front of you:</strong> face a window, not with it behind you</td><td>A window behind you turns you into a silhouette</td></tr><tr><td><strong>Quiet, plain background:</strong> tell flatmates the time</td><td>Fewer distractions for both of you</td></tr><tr><td><strong>Sound:</strong> earphones with a mic</td><td>Clearer than a laptop mic in an echoey room</td></tr><tr><td><strong>Notes:</strong> a few keywords beside the screen, not a script</td><td>Reading a script shows in your eyes</td></tr><tr><td><strong>Plan B:</strong> the interviewer\'s phone number or email</td><td>If it drops: "Sorry, my connection dropped. I\'m back."</td></tr></table><p>Log in five minutes early. Look at the camera when you speak, and at the screen when you listen.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Test the link, camera at eye level, light in front, quiet background, earphones, keywords not a script, and a plan B.',
    },
  ],
  apply: {
    scenario: 'Video set-up.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the check to the problem it prevents.',
        pairs: [
          ['Test the link', 'Dropping out'],
          ['Camera at eye level', 'An awkward angle'],
          ['Light in front of you', 'Looking like a silhouette'],
          ['Earphones with mic', 'Echoey sound'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good set-up or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Facing a window', group: 0 },
          { text: 'Window behind you', group: 1 },
          { text: 'Laptop on a stack of books', group: 0 },
          { text: 'Laptop flat on your knees', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The call drops mid-answer. What should Remi do?',
        options: [
          { text: 'Rejoin quickly and say "Sorry, my connection dropped. I\'m back."' },
          { text: 'Give up', why: 'Drops happen; just rejoin.' },
          { text: 'Pretend nothing happened', why: 'A quick, calm line helps.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Can I read my answers from a script beside the camera?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'A few keywords, yes. A full script shows: your eyes move and your voice goes flat.' },
          { text: 'Yes, read everything.', why: 'It shows on camera.' },
          { text: 'No notes at all.', why: 'Keywords are fine.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Where to look.',
        template: 'Look at the [[1]] when you speak, and at the [[2]] when you listen.',
        blanks: [['camera'], ['screen']],
        distractors: ['floor', 'window'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes early should Remi log in?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why test the connection the day before?',
        options: [
          { text: 'There\'s still time to fix it or arrange a backup' },
          { text: 'To impress the interviewer', why: 'It\'s about avoiding problems.' },
          { text: 'It doesn\'t matter', why: 'Most issues are connection issues.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s set-up plan will cause trouble?',
        lines: [
          'Test the link on Monday night.',
          'Laptop on books, facing the window.',
          'Flatmates can play music; they\'ll be quiet-ish.',
          'Earphones with a mic.',
        ],
        bug: 2,
        fix: 'Tell flatmates the time and ask for quiet.',
        explanation: 'Background noise distracts both sides.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Remi\'s set-up steps.',
        lines: ['Test the link the day before', 'Set camera and light', 'Tell flatmates the time', 'Put keywords beside the screen', 'Log in five minutes early'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Plan A or plan B?',
        groups: ['Plan A', 'Plan B'],
        items: [
          { text: 'Home Wi-Fi', group: 0 },
          { text: 'Phone hotspot', group: 1 },
          { text: 'Video call link', group: 0 },
          { text: 'Interviewer\'s phone number', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Set up your space for a video call now. Which item on the checklist was hardest?',
    starters: ['The hardest was...'],
  },
  deepen: {
    title: 'Video first impressions',
    summary: 'On video, small things (lighting, angle, sound) shape the first impression before you say a word. They\'re easy to fix, so fix them.',
  },
  notes: 'Video interview set-up is a practical checklist synthesised from common career-services guidance.',
};

export default lesson;
