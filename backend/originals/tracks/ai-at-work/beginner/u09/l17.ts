import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 17 — meetings across time zones. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Meetings across time zones',
  summary: 'Lagos, Accra and Mexico City in one call. Ada books it for 4pm and Lucía turns up at the wrong time. Here\'s how to never mix up a time zone again.',
  minutes: 12,
  outcomes: [
    'Schedule across time zones correctly',
    'Write meeting times so nobody gets confused',
    'Check AI time conversions, not trust them',
  ],
  learn: [
    {
      kind: 'text',
      html:
        '<p>Ada\'s three places:</p>' +
        '<table><tr><th>City</th><th>Time zone</th><th>When it\'s 4pm in Lagos</th></tr>' +
        '<tr><td>Lagos</td><td>WAT (UTC+1)</td><td>4:00pm</td></tr>' +
        '<tr><td>Accra</td><td>GMT (UTC+0)</td><td>3:00pm</td></tr>' +
        '<tr><td>Mexico City</td><td>UTC-6</td><td>9:00am</td></tr></table>' +
        '<h3>Ada\'s rules</h3>' +
        '<ul>' +
        '<li>Write every city\'s time in the invite: "4pm Lagos / 3pm Accra / 9am Mexico City".</li>' +
        '<li>Use the calendar\'s time-zone setting so invites convert automatically.</li>' +
        '<li>AI is handy for "what\'s a fair time for all three?", but check conversions with a world clock: some places change clocks for daylight saving.</li>' +
        '<li>Rotate awkward times so the same person isn\'t always up early.</li>' +
        '</ul>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Write every city\'s time in the invite. Use calendar time zones. Check AI conversions against a world clock. Share the early starts.',
    },
  ],
  apply: {
    scenario: 'Ada schedules a three-city call.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'It\'s 4pm in Lagos. What time is it in Accra? (e.g. 2pm)',
        answers: ['3pm', '3 pm', '15:00', '3', '3:00pm', '3:00 pm'],
        placeholder: 'A time',
      },
      {
        kind: 'mcq',
        prompt: 'It\'s 4pm in Lagos. What time is it in Mexico City?',
        options: [
          { text: '10pm', why: 'Mexico City is behind, not ahead.' },
          { text: '9am' },
          { text: '4pm', why: 'Seven hours behind Lagos.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear invite time, or confusing?',
        groups: ['Clear', 'Confusing'],
        items: [
          { text: '4pm Lagos / 3pm Accra / 9am Mexico City', group: 0 },
          { text: '4pm', group: 1 },
          { text: 'Afternoon my time', group: 1 },
          { text: '15:00 UTC (4pm Lagos)', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request is most useful?',
        options: [
          { text: 'When should we meet?', why: 'No places or hours.' },
          { text: 'Suggest 3 meeting times that fall in working hours (9am-5pm) for Lagos, Accra and Mexico City, with each city\'s local time listed.' },
          { text: 'Pick a time for me.', why: 'Give the constraints.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I joined at 4pm and nobody was there!',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'You should have known it was Lagos time.', why: 'Her invite was unclear.' },
          { text: 'Time zones are confusing.', why: 'Fix the invite.' },
          { text: 'So sorry, my invite said 4pm without the city. It was 4pm Lagos, 9am for you. I\'ll put every city\'s time in invites from now on.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Write every [[1]]\'s time. Check AI conversions with a world [[2]].',
        blanks: [['city'], ['clock']],
        distractors: ['person', 'map'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the invite is wrong?',
        lines: [
          '4:00pm Lagos (WAT)',
          '3:00pm Accra (GMT)',
          '11:00pm Mexico City',
          'Link in calendar',
        ],
        bug: 2,
        fix: '9:00am Mexico City',
        explanation: 'Mexico City is UTC-6: 9am when it\'s 4pm in Lagos.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the city to its offset from UTC.',
        pairs: [
          ['Lagos', 'UTC+1'],
          ['Accra', 'UTC+0'],
          ['Mexico City', 'UTC-6'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the invite time.',
        tiles: ['4pm', 'Lagos', '/', '3pm', 'Accra', '/', '9am', 'Mexico', 'City'],
        distractors: ['tonight'],
      },
      {
        kind: 'mcq',
        prompt: 'Why check AI time conversions?',
        options: [
          { text: 'Daylight saving and offsets are easy to get wrong' },
          { text: 'AI can\'t count', why: 'It can slip on time-zone rules.' },
          { text: 'No need', why: 'Mistakes are common.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fair scheduling, or unfair?',
        groups: ['Fair', 'Unfair'],
        items: [
          { text: 'Rotating early calls', group: 0 },
          { text: 'Lucía always at 7am', group: 1 },
          { text: 'Picking times in everyone\'s working hours', group: 0 },
          { text: 'Booking 9pm for Accra every week', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s scheduling.',
        lines: ['List the cities and working hours', 'Ask AI for fair options', 'Check with a world clock', 'Send an invite with every city\'s time'],
      },
    ],
  },
  reflect: {
    prompt: 'Who do you meet with in another time zone? How will you write your next invite?',
    starters: ['I meet with...', 'My invite will say...'],
  },
  deepen: { title: 'Try it today', summary: 'Add a second time zone to your calendar view for someone you work with abroad.' },
  notes: 'Nigeria (WAT, UTC+1) and Ghana (GMT, UTC+0) do not use daylight saving; Mexico abolished most daylight saving in 2022, so Mexico City is UTC-6 year-round.',
};

export default lesson;
