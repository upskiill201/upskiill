import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10. Unit Challenge: which mode, when? */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: which mode, when?',
  summary: 'Monday brings five conflicts before lunch: a safety bug, a design argument, a lunch debate, a launch-date split and Jayden\'s text. Grace runs triage on each. Everything from Chapter 1.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Choose the right conflict mode for different situations', 'Use everything from Chapter 1 together'],
  learn: [
    {
      kind: 'reading',
      title: 'Five conflicts before lunch',
      html: '<ol><li><strong>9:05.</strong> A test shows the app can book patients at the wrong surgery. Femi wants to "look at it next sprint".</li><li><strong>9:40.</strong> Femi and Grace disagree: one screen or two for step 3.</li><li><strong>10:30.</strong> The team can\'t agree on Thai or pizza for Friday lunch.</li><li><strong>11:15.</strong> Priya needs a launch date by noon. Half want 14 November, half want 21 November.</li><li><strong>11:50.</strong> Jayden texts: "Took the car, back by 8."</li></ol><p>Grace runs her triage on each one.</p>',
    },
    {
      kind: 'story',
      title: 'Lunch (Thai, in the end)',
      beats: [
        { speaker: 'grace', text: 'Compete on the bug, collaborate on step 3, let lunch go, compromise on the date, and talk to Jayden tonight.' },
        { speaker: 'priya', text: 'That\'s more conflict handled in a morning than in your first month.' },
        { speaker: 'tey', text: 'That\'s Chapter 1: conflict, its modes, triage. Next: cooling it down when voices rise.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 1 challenge: which mode, when?',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each conflict to the mode Grace chose.',
        pairs: [
          ['Wrong-surgery bug', 'Compete'],
          ['Step 3 design', 'Collaborate'],
          ['Friday lunch', 'Let it go'],
          ['Launch date by noon', 'Compromise for now'],
          ['Jayden and the car', 'Collaborate tonight'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why compete on the wrong-surgery bug?',
        options: [
          { text: 'Patients could be harmed, so it must be fixed now' },
          { text: 'Grace wants to win', why: 'It\'s about patient safety.' },
          { text: 'Femi was rude', why: 'It\'s about risk.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Important issue, or trivial?',
        groups: ['Important', 'Trivial'],
        items: [
          { text: 'Wrong-surgery bookings', group: 0 },
          { text: 'Thai or pizza', group: 1 },
          { text: 'Step 3 design', group: 0 },
          { text: 'Who orders the food', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'Can\'t the wrong-surgery bug wait until next sprint?',
        prompt: "Grace's best reply?",
        options: [
          { text: 'No. Patients could turn up at the wrong surgery. I\'ll help you test the fix today.' },
          { text: 'OK, whatever you think.', why: 'Safety isn\'t the time to accommodate.' },
          { text: 'You\'re so careless.', why: 'Firm on the issue, not the person.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'From 14 November to 21 November is how many days?',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s morning.',
        template: 'Compete on [[1]], collaborate when both issue and [[2]] matter.',
        blanks: [['risk', 'safety'], ['relationship']],
        distractors: ['lunch', 'weather'],
      },
      {
        kind: 'mcq',
        prompt: 'Why compromise on the launch date rather than collaborate?',
        options: [
          { text: 'Priya needs a decision by noon; there\'s no time for a full discussion' },
          { text: 'Compromise is always best', why: 'It fits here because of time.' },
          { text: 'Nobody cares about the date', why: 'It matters; time is short.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Grace\'s triage is wrong?',
        lines: [
          'Bug: compete.',
          'Step 3: collaborate.',
          'Lunch: fight for Thai until everyone agrees.',
          'Launch date: compromise for now.',
        ],
        bug: 2,
        fix: 'Lunch: let it go.',
        explanation: 'Trivial issues aren\'t worth competing over.',
      },
      {
        kind: 'mcq',
        prompt: 'What does "Silence is not peace" mean for the Jayden text?',
        options: [
          { text: 'Don\'t just let it slide again; talk to him tonight' },
          { text: 'Shout at him by text', why: 'Talk calmly in person.' },
          { text: 'Ignore it', why: 'That\'s the silence the rule warns about.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the five conflicts by time.',
        lines: ['Wrong-surgery bug', 'Step 3 design', 'Friday lunch', 'Launch date', 'Jayden\'s text'],
      },
    ],
  },
  reflect: {
    prompt: 'List the conflicts in your week. Run triage on each and choose a mode.',
    starters: ['Conflict:...', 'Mode:...'],
  },
  deepen: {
    title: 'Range',
    summary: 'People who handle conflict well aren\'t always gentle or always tough. They have range: they can compete, collaborate, compromise or let go, and they choose on purpose.',
  },
  notes: 'Chapter 1 challenge (fictional): five conflicts; Thomas-Kilmann mode choices.',
};

export default lesson;
