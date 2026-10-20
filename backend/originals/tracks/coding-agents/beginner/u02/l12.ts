import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 12 — Turning Zanele's words into rules. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Words into rules',
  summary: 'Zanele says it the way people talk: "Friday afternoons, weekends, the far ones." Remi has to turn each phrase into something exact enough to code, and check every one with her.',
  minutes: 12,
  outcomes: [
    'Turn everyday phrases into exact rules',
    'Check each rule with the person who knows',
    'Write the rule as data in Python',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Exactly what?',
      beats: [
        { speaker: 'zanele', text: 'The late ones are Friday afternoons, weekends, and the far ones.' },
        { speaker: 'remi', text: 'Afternoon from when exactly?' },
        { speaker: 'zanele', text: 'The last van leaves at 2. Anything from 2 p.m. waits for Monday.' },
        { speaker: 'remi', text: 'Weekends: Saturday and Sunday?' },
        { speaker: 'zanele', text: 'Just Saturday. We don\'t take orders on Sundays; the shop is closed.' },
        { speaker: 'remi', text: 'And "far"?' },
        { speaker: 'zanele', text: 'Over 150 km. I checked: that\'s where the late rate jumps.' },
        { speaker: 'tey', text: 'Three fuzzy phrases, three exact rules: Friday from 14:00, Saturday, over 150 km. Each one came from asking "exactly what?"' },
      ],
      choice: {
        prompt: 'Zanele says "the far ones". What should Remi do?',
        options: [
          { text: 'Ask for a number, and where it comes from.', outcome: 'Right. "Over 150 km, where the late rate jumps" is exact and has a reason.', best: true },
          { text: 'Pick a number himself, say 100 km.', outcome: 'That\'s exactly what the agent did. A guess, now with Remi\'s name on it.' },
          { text: 'Write "far" in the brief.', outcome: 'Then the agent picks the number. Same guess, one step later.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'The rule as data',
      caption: 'Exact values, ready for a brief or a test.',
      code: 'rule = {\n    "friday_from_hour": 14,\n    "saturday": True,\n    "sunday": False,      # no orders on Sundays\n    "over_km": 150,\n}\nfor key, value in rule.items():\n    print(f"{key}: {value}")\n',
      challenge: 'Write the brief sentence that says the same as this dictionary.',
    },
  ],
  apply: {
    scenario: 'From talk to rules.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make the rule dictionary (friday_from_hour 14, saturday True, over_km 150) and print over_km',
        starter: 'rule = {}\n',
        solution: 'rule = {"friday_from_hour": 14, "saturday": True, "over_km": 150}\nprint(rule["over_km"])\n',
        hint: 'rule = {"friday_from_hour": 14, "saturday": True, "over_km": 150}',
        checks: [
          { message: 'Print 150', outputEquals: '150' },
          { message: 'Friday starts at hour 14', expr: 'rule["friday_from_hour"] == 14' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is Sunday not in the rule?',
        options: [
          { text: 'Synergix doesn\'t take orders on Sundays' },
          { text: 'Sundays are never late', why: 'There are simply no Sunday orders.' },
          { text: 'Remi forgot it', why: 'He asked, and Zanele explained.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Zanele\'s words to the exact rule.',
        pairs: [
          ['Friday afternoons', 'Friday from 14:00'],
          ['Weekends', 'Saturday only'],
          ['The far ones', 'Over 150 km'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Exact enough to code, or still fuzzy?',
        groups: ['Exact', 'Fuzzy'],
        items: [
          { text: 'Friday from 14:00', group: 0 },
          { text: 'Late in the week', group: 1 },
          { text: 'Over 150 km', group: 0 },
          { text: 'Quite far away', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Why do you need the reason for 150? Just use it.',
        prompt: "Remi's best reply?",
        options: [
          { text: 'Because when someone asks "why 150?" in six months, the brief can answer: that\'s where the late rate jumps.' },
          { text: 'I don\'t; forget it.', why: 'Reasons help people trust and update rules.' },
          { text: 'The agent needs reasons to code.', why: 'The code doesn\'t; the people do.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'rule = {"friday_from_hour": 14}\nhour = 13\nprint(hour >= rule["friday_from_hour"])',
        language: 'python',
        options: [
          { text: 'False' },
          { text: 'True', why: '13 is before 14.' },
          { text: '14', why: 'It prints the comparison.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Using the rule, print whether a Friday order at 15:00 is at risk by the Friday rule',
        starter: 'rule = {"friday_from_hour": 14, "saturday": True, "over_km": 150}\nweekday, hour = 4, 15\n',
        solution: 'rule = {"friday_from_hour": 14, "saturday": True, "over_km": 150}\nweekday, hour = 4, 15\nprint(weekday == 4 and hour >= rule["friday_from_hour"])\n',
        hint: 'weekday == 4 and hour >= rule["friday_from_hour"]',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The magic question.',
        template: 'For every fuzzy word, ask: "[[1]] what?" and write the [[2]] answer.',
        blanks: [['Exactly'], ['exact']],
        distractors: ['Roughly', 'first'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s rule is still fuzzy?',
        lines: [
          'Friday orders from 14:00 are at risk.',
          'Saturday orders are at risk.',
          'Long-ish routes are at risk.',
          'Sundays: no orders, so no rule.',
        ],
        bug: 2,
        fix: 'Routes over 150 km are at risk.',
        explanation: '"Long-ish" needs a number.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'At what time does the last van leave on Friday? (24-hour clock)',
        answers: ['14:00', '14', '2 p.m.', '2pm', '2 pm', '2'],
        placeholder: 'A time',
      },
    ],
  },
  reflect: {
    prompt: 'Pick a fuzzy phrase from your work ("soon", "big", "urgent"). What exact rule hides behind it?',
    starters: ['"... " really means...', 'I\'d check with...'],
  },
  deepen: {
    title: 'Rules with reasons',
    summary: 'A rule plus its reason ("over 150 km, where the late rate jumps") is easier to trust and to change later. Chapter 7 keeps reasons like this in the project\'s instruction file.',
  },
  notes: 'Story facts for the course: last van leaves at 14:00 on Fridays; Synergix takes no orders on Sundays; 150 km is where the late rate jumps (Zanele\'s analysis). Practice project tests: Friday 15:00 at risk, Friday 11:00 fine, Saturday at risk, 180 km at risk, 120 km fine.',
};

export default lesson;
