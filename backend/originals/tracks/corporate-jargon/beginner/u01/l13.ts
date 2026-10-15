import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 13. Tap to explore: Remi's meeting notes — action items, owners, next steps, takeaways. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Action items, owners, next steps',
  summary: 'Remi takes notes in the Finance meeting. Every meeting ends in the same words: action items, owners, next steps. Tap his notes to see what each one means.',
  minutes: 12,
  outcomes: [
    'Decode action item, owner, next steps, takeaway and deliverable',
    'Pull the decisions out of a messy meeting',
    'Write meeting notes people actually use',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Remi\'s notes: Finance meeting, Friday 12:00',
      text: 'Attendees: Wanjiku (Finance), Felix (IT), Remi. Key takeaway: Swift Freight was paid twice for 4 August deliveries (KSh 186,000). Decision: claim it back. Action items: 1) Wanjiku to email Swift Freight with the 4 invoice numbers. Owner: Wanjiku. Due: Wednesday. 2) Felix to check why the system allowed a double payment. Owner: Felix. Due: EOW. 3) Remi to write a one-page summary for Brian. Deliverable: summary. Due: Monday. Next steps: catch up next Friday. Parked: changing courier.',
      hotspots: [
        { phrase: 'Key takeaway', note: 'The single most important thing to remember from the meeting. If someone missed it, this is what they need to know.' },
        { phrase: 'Decision', note: 'What the group agreed. Writing decisions down stops the "I thought we said..." argument next week.' },
        { phrase: 'Action items', note: 'Specific tasks that came out of the meeting. Each one should say who, what and when.' },
        { phrase: 'Owner', note: 'The ONE person responsible for making an action item happen. Not "the team". One name.' },
        { phrase: 'Due', note: 'The deadline for the action item.' },
        { phrase: 'Deliverable', note: 'The actual thing someone has to produce and hand over: a report, a summary, a file.' },
        { phrase: 'Next steps', note: 'What happens after this meeting: usually the action items plus when the group meets again.' },
        { phrase: 'Parked', note: 'Raised but deliberately not dealt with today. Some teams keep a "parking lot" list of these.' },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'zanele', text: 'Why are your notes so short? Mine are four pages. I wrote down everything everyone said.' },
        { speaker: 'remi', text: 'Did anyone agree to do anything?' },
        { speaker: 'zanele', text: '...it\'s somewhere on page three.' },
        { speaker: 'tey', text: "Good notes aren't a record of the meeting. They're a list of what happens next. Who, what, when." },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Every action item needs three things: an owner (one name), a task (one verb), and a due date. "Someone should look into it" is not an action item.',
    },
  ],
  apply: {
    scenario: 'Friday, after the Finance meeting.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the meeting words.',
        pairs: [
          ['Action item', 'A specific task from the meeting'],
          ['Owner', 'The one person responsible'],
          ['Deliverable', 'The thing you hand over'],
          ['Parked', 'Put aside for another time'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which is a proper action item?',
        options: [
          { text: 'Felix to check why the system allowed the double payment, by Friday' },
          { text: 'Someone should look into the system', why: 'No owner, no deadline. It will never happen.' },
          { text: 'The system is a concern', why: 'That\'s an observation, not a task.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the action item is this?',
        groups: ['Owner', 'Task', 'Due'],
        items: [
          { text: 'Wanjiku', group: 0 },
          { text: 'Email Swift Freight with the invoice numbers', group: 1 },
          { text: 'Wednesday', group: 2 },
          { text: 'Felix', group: 0 },
          { text: 'By end of week', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'How did the Finance meeting go? What\'s the takeaway?',
        prompt: 'What does Brian want?',
        options: [
          { text: 'It went well, lots of good discussion!', why: 'He asked for the takeaway: the one thing to know.' },
          { text: 'We paid Swift Freight twice for 4 deliveries. Finance is claiming KSh 186,000 back by Wednesday.' },
          { text: 'I\'ll send you my four pages of notes.', why: 'Brian wants the headline, not a transcript.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The ONE person responsible for an action item is its ... (one word)',
        answers: ['owner'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s action items. Which one won\'t get done?',
        lines: [
          'Zanele to update the courier spreadsheet by Tuesday.',
          'Everyone to think about better suppliers.',
          'Remi to send the summary to Brian by Monday.',
        ],
        bug: 1,
        fix: 'Pauline to list three alternative couriers by next Friday.',
        explanation: '"Everyone" means no one. One owner, one task, one date.',
      },
      {
        kind: 'mcq',
        prompt: 'Changing courier was "parked". What does that mean?',
        options: [
          { text: 'It was raised but deliberately left for another time' },
          { text: 'It was decided: Synergix is changing courier', why: 'Parked means NOT decided yet.' },
          { text: 'It\'s about the car park', why: 'Ha. It\'s a picture: a car parked, waiting to be driven later.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s meeting notes in the most useful order.',
        lines: ['Key takeaway', 'Decisions', 'Action items (owner, task, due)', 'Next steps', 'Parked'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Write an action item.',
        template: '[[1]] to write a one-page summary for Brian. [[2]]: summary. Due: [[3]].',
        blanks: [['Remi'], ['Deliverable'], ['Monday']],
        distractors: ['Everyone', 'Someday'],
      },
      {
        kind: 'tapBuild',
        prompt: 'At the end of a meeting, build the question that turns talk into action.',
        tiles: ['So', 'who\'s', 'doing', 'what,', 'and', 'by', 'when?'],
        distractors: ['everyone', 'someday'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last meeting, class project or family plan you were part of. Could you write its action items with an owner, a task and a date? What was missing?',
    starters: ['The action items were...', 'What was missing was...'],
  },
  deepen: {
    title: 'The 3-line meeting note',
    summary: 'After your next meeting, send a note with just three lines: the takeaway, the decisions, and the action items with owners and dates. Watch how often people reply "thanks, this is really useful".',
  },
  notes: '"Action item" (Merriam-Webster), "deliverable" (Cambridge Business English), "takeaway" (Merriam-Webster: a key point to remember), "parking lot" (meeting technique for deferred topics). Wanjiku is a Synergix Finance colleague (named extra, not a cast member).',
};

export default lesson;
