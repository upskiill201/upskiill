import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Before/After: a meeting with no agenda vs one with an agenda and a "parking lot". */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Agendas and the "parking lot"',
  summary: 'The Q4 catch-up has no agenda. Fifty minutes later, the team has talked about lunch, drones and the office printer, and decided nothing. Brian fixes it with two tools.',
  minutes: 12,
  outcomes: [
    'Know what a good agenda has in it',
    'Use the "parking lot" to stop a meeting going off track',
    'Ask for an agenda politely',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The Q4 catch-up, two versions',
      before: {
        label: 'No agenda',
        text: 'Q4 catch-up. 2:00 to 3:00. (That\'s it. That\'s the whole invite.) Fifty minutes of talk: deliveries, the drone idea, the new printer, whether the canteen should do chapati on Fridays. Decisions made: none.',
      },
      after: {
        label: 'With an agenda',
        text: 'Q4 catch-up. 2:00 to 2:30. Purpose: decide our top priority for October. 1. Late deliveries: what\'s causing them? (10 min, Remi) 2. Decide: fix couriers or fix warehouse first? (15 min, all) 3. Next steps and owners (5 min, Brian). Parking lot: anything else goes here for another day.',
      },
      notes: [
        'A purpose at the top says why everyone is there: to DECIDE something.',
        'Each item has a time, so the meeting can\'t drift for fifty minutes.',
        'Each item has a name, so someone comes prepared.',
        'The meeting is 30 minutes, not 60. Agendas save time.',
        'The parking lot catches the drones, the printer and the chapati without losing them.',
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'zanele', text: 'Before we start, can we talk about the drones? Just quickly?' },
        { speaker: 'brian', text: 'Love it. Parking lot! I\'ll write "drones" on the board and we\'ll come back to it another day.' },
        { speaker: 'remi', text: '(Remi pictures a car park full of tiny drones, waiting their turn.)' },
        { speaker: 'tey', text: "Close enough, Remi. The parking lot is a list of good topics that don't belong in THIS meeting. Writing them down means nobody feels ignored, and the meeting stays on track." },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'No agenda? Ask the organiser, politely: "Is there anything you\'d like me to prepare for this?" It gets you the agenda without making anyone feel told off.',
    },
  ],
  apply: {
    scenario: 'Tuesday. The Q4 catch-up, version two.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does the "parking lot" in a meeting hold?',
        options: [
          { text: 'Good topics that belong in a different meeting' },
          { text: 'People\'s cars', why: 'It\'s a picture: topics parked, waiting for their turn.' },
          { text: 'Topics that have been cancelled forever', why: 'Parked, not cancelled. They come back another day.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does a good agenda need it?',
        groups: ['Yes, include it', 'Not needed'],
        items: [
          { text: 'The purpose of the meeting', group: 0 },
          { text: 'A time for each item', group: 0 },
          { text: 'Who leads each item', group: 0 },
          { text: 'Everyone\'s lunch order', group: 1 },
          { text: 'A 20-paragraph history of the project', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s agenda for her spreadsheet review. Which item will cause trouble?',
        lines: [
          'Purpose: agree which courier costs to track.',
          '1. Walk through the courier tab (10 min, Zanele)',
          '2. Discuss everything about couriers ever (no time limit, everyone)',
          '3. Next steps and owners (5 min, Zanele)',
        ],
        bug: 2,
        fix: '2. Decide the three costs we track (10 min, all)',
        explanation: '"Everything, no time limit" is exactly how a 30-minute meeting becomes two hours.',
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Remi, can you join the supplier sync tomorrow?',
        prompt: 'There\'s no agenda. What\'s the most useful reply?',
        options: [
          { text: 'Sure. What\'s the agenda?', why: 'Fine, but it can sound like a challenge. Ask what he can prepare.' },
          { text: 'Sure! Is there anything you\'d like me to prepare for it?' },
          { text: 'Only if there\'s an agenda.', why: 'True in spirit, rude in tone, especially to your manager.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Brian: "Great point. Let\'s put that in the parking ___." (one word)',
        answers: ['lot'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Brian\'s agenda in a sensible order.',
        lines: ['Purpose: decide our October priority', 'What\'s causing late deliveries? (Remi)', 'Decide: couriers or warehouse first? (all)', 'Next steps and owners (Brian)'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the version with an agenda only take 30 minutes?',
        options: [
          { text: 'Because people talk faster', why: 'Same people, same speed. The difference is focus.' },
          { text: 'Because fewer people come', why: 'Same people.' },
          { text: 'Each item has a time and a purpose, so it doesn\'t drift' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['Put a pin in it', 'Pause it for later'],
          ['Back burner', 'Paused on purpose'],
          ['Boil the ocean', 'Try to do far too much'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The three things every agenda item needs.',
        template: 'A topic, a [[1]] limit, and a [[2]] who leads it. And at the top: the [[3]].',
        blanks: [['time'], ['person', 'name'], ['purpose']],
        distractors: ['snack', 'printer'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Zanele raises drones again. Build Brian\'s polite parking-lot line.',
        tiles: ['Good', 'idea.', 'Let\'s', 'park', 'it', 'for', 'another', 'day.'],
        distractors: ['cancel', 'never'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a meeting, class project or family discussion that went round in circles. What would its agenda have looked like? What would have gone in the parking lot?',
    starters: ['The purpose should have been...', 'The parking lot would have had...'],
  },
  deepen: {
    title: 'Write an agenda for your next meeting',
    summary: 'Even for a 15-minute call with one person: one line of purpose, two or three items with times, and a parking lot. Send it before the meeting and see what happens.',
  },
  notes: '"Parking lot" (meeting facilitation technique: a list of off-topic items to address later; widely used in facilitation guides). Agenda with purpose, owner and timing is standard meeting practice. Chapati: common in Kenya.',
};

export default lesson;
