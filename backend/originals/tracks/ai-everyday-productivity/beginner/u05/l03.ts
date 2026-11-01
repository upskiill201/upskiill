import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Prompt Lab: a countdown plan with owners. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Seven days to go',
  summary: 'The hacienda says yes. Now fourteen tasks, four people and seven days, including moving flat and a São Paulo call. Build the plan that tells everyone what to do and when.',
  minutes: 13,
  outcomes: [
    'Turn a task list into a plan with owners and deadlines',
    'Ask AI to order tasks by what depends on what',
    'Get one checklist per person',
  ],
  learn: [
    {
      kind: 'promptLab',
      title: 'The countdown',
      task: 'Get a plan for the last 7 days that says who does what, by when.',
      base: 'Here are 14 tasks left for the party [pasted]. Make a plan.',
      parts: [
        { label: 'People', text: 'Helpers: me, Mateo (reliable if the task is specific), Mamá (light jobs only, it\'s her party), and Doña Lupe\'s cousin at the hacienda.' },
        { label: 'My week', text: 'I move flat on Day 27 and have a work call on Day 29 at 10 a.m. Nothing for me on those mornings.' },
        { label: 'Order', text: 'Order tasks by what has to happen first, and give each one a deadline day.' },
        { label: 'Format', text: 'Give one short checklist per person.' },
        { label: 'Mateo does it all', text: 'Give most of it to Mateo, he never does anything.' },
      ],
      replies: [
        { uses: [], text: '1. Confirm venue\n2. Confirm food\n3. Decorations\n4. Music\n5. Invitations update\n...\n14. Enjoy the party!', note: 'The same list, renumbered. No people, no days.' },
        { uses: [4], text: 'Mateo: confirm venue, food, music, transport, cake, decorations, guest updates, seating, photos...', note: 'Thirteen tasks to the brother who sends memes. A plan built on resentment usually fails on Day 29.' },
        { uses: [0], text: 'Lucía: venue, food, guest updates. Mateo: music and photos. Mamá: choose the cake. Hacienda: tables and chairs.', note: 'Owners! But when? Lucía has a move and a call this week.' },
        { uses: [0, 1], text: 'Lucía: guest updates (Day 24), venue details (Day 25)... Mateo: music (Day 28)... Nothing for Lucía on Day 27 or Day 29 morning.', note: 'It works around her week now. But the transport is booked before the guest numbers are final.' },
        { uses: [0, 1, 2], text: 'Day 23: Lucía sends the new address to guests.\nDay 24: Lucía confirms numbers by evening.\nDay 25: Lucía books transport for older guests (needs numbers); Mateo books the mariachi.\nDay 26: Mamá chooses the cake; hacienda confirms tables for 60.\nDay 28: Mateo makes the photo slideshow.\nDay 30: ...', note: 'Right order, right days. Still one long list everyone has to search for their name in.' },
        { uses: [0, 1, 2, 3], text: 'LUCÍA\n[ ] Day 23: new address to all guests\n[ ] Day 24: final numbers\n[ ] Day 25: transport for older guests\n[ ] Day 26: print the speech, pack for Oaxaca\n\nMATEO\n[ ] Day 25: book the mariachi (confirm time: 7 p.m.)\n[ ] Day 28: photo slideshow, 20 photos, on a USB stick\n[ ] Day 30: pick up Abuela at 5 p.m.\n\nMAMÁ\n[ ] Day 26: choose the cake\n\nHACIENDA\n[ ] Day 26: tables and chairs for 60\n[ ] Day 29: covered area set up in case of rain', note: 'One checklist per person, in order, around Lucía\'s move and call. Mateo has three specific jobs, which is exactly how Mateo works best.' },
        { uses: [0, 1, 2, 3, 4], text: 'MATEO\n[ ] Day 23: everything\n[ ] Day 24: everything else...', note: 'The format\'s right, the load isn\'t. Drop "Mateo does it all" and send again.' },
      ],
      goal: 5,
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Plan prompt: tasks + people (and what they\'re good for) + your blocked days + "order by what has to happen first" + one checklist per person.',
    },
  ],
  apply: {
    scenario: 'The countdown plan.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why book transport only after the numbers are final?',
        options: [
          { text: 'Transport depends on how many older guests are coming' },
          { text: 'Transport is cheaper on Day 25', why: 'It\'s about what depends on what.' },
          { text: 'No reason', why: 'Booking first risks the wrong size.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to their jobs.',
        pairs: [
          ['Lucía', 'Guest numbers and transport'],
          ['Mateo', 'Mariachi, slideshow, Abuela'],
          ['Mamá', 'Choosing the cake'],
          ['The hacienda', 'Tables, chairs, rain cover'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Your brother never does anything. Why give him three jobs?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'You\'re right, I\'ll do it all.', why: 'She has a move and a call this week.' },
          { text: 'Mateo is great when a task is specific: "mariachi at 7 p.m.", not "help with music". The plan does that.' },
          { text: 'I\'ll give him everything.', why: 'That plan fails.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific task, or vague?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: 'Book the mariachi for 7 p.m. by Day 25', group: 0 },
          { text: 'Help with music', group: 1 },
          { text: 'Slideshow: 20 photos on a USB by Day 28', group: 0 },
          { text: 'Sort out photos', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The order line.',
        template: 'Order tasks by what has to happen [[1]], and give each a [[2]] day.',
        blanks: [['first'], ['deadline']],
        distractors: ['last', 'lucky'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the plan clashes with Lucía\'s week?',
        lines: [
          'Day 27, 9 a.m.: Lucía calls the florist.',
          'Day 26: Mamá chooses the cake.',
          'Day 28: Mateo makes the slideshow.',
        ],
        bug: 0,
        fix: 'Move it to Day 26: Day 27 is moving day.',
        explanation: 'She told it nothing on Day 27. Always check the plan against your blocked days.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'At what time is the mariachi booked? (A time.)',
        answers: ['7 p.m.', '7pm', '7', '19:00', '7 pm', 'seven'],
        placeholder: 'A time',
      },
      {
        kind: 'orderLines',
        prompt: 'Put these tasks in the order they must happen.',
        lines: ['Send the new address to guests', 'Confirm final numbers', 'Book transport for older guests', 'Print the speech', 'Pick up Abuela'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Grace is planning Jayden\'s 18th with two helpers. Which prompt follows the plan recipe?',
        options: [
          { text: 'Plan a birthday party.', why: 'No people, days or tasks.' },
          { text: 'Here are my 10 tasks. Helpers: me, Femi (great with music), Nan (cakes only). I work late Thursday. Order by what comes first, deadline days, one checklist each.' },
          { text: 'Give all the jobs to Femi.', why: 'That isn\'t a plan.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the advantage of one checklist per person?',
        options: [
          { text: 'It looks nicer', why: 'It\'s about action.' },
          { text: 'Nobody has to search a long list for their name; they can just tick their own jobs' },
          { text: 'It hides the other jobs', why: 'It focuses each person.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What shared job is coming up (a trip, a move, a family event, a group project)? Who\'s good at what?',
    starters: ['The job is...', '... is good at...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Paste a real to-do list into an AI tool with your helpers, your blocked days, "order by what comes first" and "one checklist per person". Send each person their list.',
  },
  notes: 'Dependency ordering and specific ownership are standard planning practice. Grace, Jayden, Femi, Nan appear per CAST (exercise only).',
};

export default lesson;
