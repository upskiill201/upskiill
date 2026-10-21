import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10. Unit Challenge: the Synergix video questions. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: three recorded questions',
  summary: 'Synergix sends the next step: a recorded video interview. Three questions, 30 seconds to think, two minutes to answer each, no interviewer. Remi opens his story bank. Everything from Chapter 3.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Answer behavioural questions with STAR under time limits', 'Use everything from Chapter 3 together'],
  learn: [
    {
      kind: 'reading',
      title: 'Three questions, two minutes each',
      html: '<p>Synergix\'s screening uses a one-way video: questions appear on screen, and you record answers alone.</p><ol><li><strong>"Tell us about a time you used data to solve a problem."</strong> Remi picks the coding club data project: 8 members, attendance data, found that Thursday sessions had half the turnout, moved them, attendance up by a third.</li><li><strong>"Describe a time you made a mistake. What did you learn?"</strong> The hackathon crash: three minutes, five phones, the memory bug, testing on real phones since.</li><li><strong>"Tell us about working with someone who saw things differently."</strong> Kevin: tested both designs, two days early, A-minus, "testing beats arguing".</li></ol><p>Each answer comes in at about 90 seconds. Remi uses the 30 seconds of thinking time to pick the story and its result, not to write a script.</p>',
    },
    {
      kind: 'story',
      title: 'Three days later',
      beats: [
        { speaker: 'narrator', text: 'An email from Synergix: "Congratulations, you\'re invited to our assessment day: a group exercise and a panel interview."' },
        { speaker: 'remi', text: 'Ada! Final round! Also, Mtaa Labs want a second interview with their founder.' },
        { speaker: 'tey', text: 'That\'s Chapter 3: STAR, the story bank, numbers, honesty, past behaviour. Next: the hard questions.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 3 challenge: recorded questions.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each Synergix question to Remi\'s story.',
        pairs: [
          ['Using data to solve a problem', 'Coding club attendance'],
          ['A mistake and what you learned', 'Hackathon crash'],
          ['Someone who saw things differently', 'Kevin\'s database'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many seconds of thinking time does each question give?',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What should Remi do with the 30 seconds of thinking time?',
        options: [
          { text: 'Pick the story and its result' },
          { text: 'Write a full script', why: 'There\'s no time, and it sounds read.' },
          { text: 'Panic quietly', why: 'Pick the story.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which STAR part of the coding club answer is this?',
        groups: ['Situation', 'Action', 'Result'],
        items: [
          { text: 'Club attendance was dropping', group: 0 },
          { text: 'He analysed attendance by day', group: 1 },
          { text: 'Attendance up by a third', group: 2 },
          { text: 'He moved sessions off Thursday', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Talking to a camera with no one there feels so strange.',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Imagine one friendly person behind the lens. Look at the camera, smile at the start, and tell the story to them.' },
          { text: 'Read from notes instead.', why: 'It shows on camera.' },
          { text: 'Skip the video.', why: 'It\'s the next step.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many seconds was each of Remi\'s answers?',
        answers: ['90', 'ninety'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'The Kevin lesson.',
        template: '"[[1]] beats [[2]]."',
        blanks: [['Testing'], ['arguing']],
        distractors: ['Shouting', 'listening'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s data answer breaks the rules?',
        lines: [
          'Our coding club had 8 members and falling attendance.',
          'I looked at attendance by day of the week.',
          'Thursday sessions had half the turnout, so we moved them.',
          'Attendance tripled and the dean gave us an award.',
        ],
        bug: 3,
        fix: 'Attendance went up by about a third.',
        explanation: 'That inflates the real result.',
      },
      {
        kind: 'mcq',
        prompt: 'What two next steps came after the video?',
        options: [
          { text: 'Synergix\'s assessment day and a second Mtaa Labs interview' },
          { text: 'Two rejections', why: 'He was invited forward.' },
          { text: 'An immediate offer', why: 'There\'s a final round first.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a recorded-video answer.',
        lines: ['Read the question', 'Pick the story in the thinking time', 'Look at the camera', 'Tell it in STAR', 'Finish with the result and lesson'],
      },
    ],
  },
  reflect: {
    prompt: 'Record yourself on your phone answering one behavioural question in two minutes. Watch it back. What would you change?',
    starters: ['I answered...', 'I would change...'],
  },
  deepen: {
    title: 'One-way video interviews',
    summary: 'Many large employers use recorded video interviews for early screening. The same STAR stories work; practise talking to your phone camera beforehand.',
  },
  notes: 'Chapter 3 challenge (fictional): Synergix one-way video (30 s think, 2 min answer, 3 questions). Coding club: Thursday turnout half; attendance up by a third after moving.',
};

export default lesson;
