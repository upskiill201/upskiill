import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 4 — real actions have an owner, a verb, a deliverable and a date. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Pull out actions and deadlines',
  summary: 'Most meetings end with vague intentions. Turn them into real actions: who, what, by when.',
  minutes: 13,
  outcomes: [
    'Recognise a real action: owner, what, by when',
    'Spot vague actions that will never happen',
    'Get the AI to extract and flag actions from any notes',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Meeting notes: which of these will actually happen?',
      text:
        'Planning notes, Tuesday\n- Ada will send the final palette to Lucía by Wednesday.\n- We should look into dark mode at some point.\n- Grace to set up the design file before Friday standup.\n- Someone needs to check the email copy.\n- Follow up on the budget.',
      hotspots: [
        { phrase: 'Ada will send the final palette to Lucía by Wednesday.', note: 'A real action: owner (Ada), what (send the palette), to whom, by when (Wednesday).' },
        { phrase: 'We should look into dark mode at some point.', note: 'Vague: "we" is nobody, "look into" is not a deliverable, "some point" is never.' },
        { phrase: 'Grace to set up the design file before Friday standup.', note: 'Real: owner, a clear deliverable, and a deadline tied to an event.' },
        { phrase: 'Someone needs to check the email copy.', note: 'No owner. "Someone" means it will probably not happen.' },
        { phrase: 'Follow up on the budget.', note: 'No owner, no date, and "follow up" with whom, about what?' },
      ],
    },
    {
      kind: 'reading',
      title: 'Anatomy of a real action',
      html:
        '<p>A real action has four parts:</p>' +
        '<ol>' +
        '<li><strong>Owner:</strong> one named person. Not "we", "the team" or "someone".</li>' +
        '<li><strong>Verb:</strong> something you can see done: send, decide, write, book. Not "look into" or "think about".</li>' +
        '<li><strong>Deliverable:</strong> what exists when it is done: the palette, a draft, a booked room.</li>' +
        '<li><strong>Date:</strong> a day, or an event ("before Friday standup").</li>' +
        '</ol>' +
        '<p>Ask the AI to extract and flag:</p>' +
        '<p><em>"From these notes, list every action as: Owner | Action | Due. Flag any action with no owner, a vague verb, or no date. Only use what is in the notes."</em></p>' +
        '<p>Then fix the flagged ones before the meeting notes go out. A vague action spotted on Tuesday is a forgotten action by Friday.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: '"We should" is a wish. "Ada will, by Wednesday" is an action.',
    },
    {
      kind: 'check',
      question: 'Which is a real action?',
      options: ['We should look into dark mode', 'Grace will share the design file by Friday', 'Someone check the copy'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is turning meeting notes into real actions.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Real action, or vague?',
        groups: ['Real action', 'Vague'],
        items: [
          { text: 'Ada will send the palette to Lucía by Wednesday', group: 0 },
          { text: 'We should look into dark mode', group: 1 },
          { text: 'Someone needs to check the copy', group: 1 },
          { text: 'Grace will book the review room for Thursday', group: 0 },
          { text: 'Follow up on the budget', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the four parts of a real action.',
        lines: ['Owner', 'Verb', 'Deliverable', 'Date'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "we" a bad owner?',
        options: [
          { text: 'It is grammatically wrong', why: 'Grammar is fine; ownership is the problem.' },
          { text: 'Teams cannot own tasks', why: 'Teams can, but one named person makes it happen.' },
          { text: 'Everyone assumes someone else will do it' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Turn "someone check the copy" into a real action.',
        tiles: ['Grace', 'will', 'check', 'the', 'email', 'copy', 'by', 'Thursday'],
        distractors: ['someone', 'maybe'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the vague verb to a real one.',
        pairs: [
          ['"Look into"', '"Write a 1-page proposal"'],
          ['"Think about"', '"Decide yes or no"'],
          ['"Follow up"', '"Email Lucía to confirm the date"'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s extraction request.',
        template: 'List every action as: [[1]] | Action | [[2]]. Flag any with no owner, a vague verb, or no [[3]].',
        blanks: [['Owner'], ['Due'], ['date']],
        distractors: ['Mood', 'Colour', 'emoji'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'From our call: "we\'ll sort out the launch email soon". Who is doing that?',
        prompt: 'Which reply turns it into a real action?',
        options: [
          { text: "Good catch! I'll draft the launch email and send it to you by Thursday for approval." },
          { text: "We'll sort it soon!", why: 'Still no owner and no date.' },
          { text: "Someone on our team will.", why: '"Someone" is nobody.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Spot the action that will probably not happen.',
        lines: ['Ada: send palette to Lucía, Wed.', 'Grace: set up design file, before Fri standup.', 'Team: think about the onboarding flow.'],
        bug: 2,
        fix: 'Ada: write 3 onboarding options, by next Tuesday.',
      },
      {
        kind: 'typeAnswer',
        prompt: '"Someone" as an owner means it will probably happen to ... (one word)',
        answers: ['nobody', 'no one', 'noone'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the most useful action list from notes?',
        options: [
          { text: 'What are the actions?', why: 'No format, and vague ones will slip through.' },
          { text: 'List actions as Owner | Action | Due. Flag any with no owner, a vague verb or no date. Only use the notes.' },
          { text: 'Summarise the meeting.', why: 'A summary, not an action list.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good due date, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'By Wednesday', group: 0 },
          { text: 'Soon', group: 1 },
          { text: 'Before Friday standup', group: 0 },
          { text: 'At some point', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Our meeting notes always have 15 actions and half never get done.",
        prompt: 'What should Ada suggest?',
        options: [
          { text: 'Write more actions.', why: 'More vague actions, same result.' },
          { text: 'Stop writing notes.', why: 'Notes help when actions are real.' },
          { text: 'Have the AI flag actions with no owner or date, and fix those before sending the notes.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A date can also be an event, like "before Friday ..." (one word)',
        answers: ['standup', 'stand-up', 'meeting', 'review'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the missing part to the fix.',
        pairs: [
          ['No owner', 'Name one person'],
          ['Vague verb', 'Use a verb you can see done'],
          ['No date', 'Add a day or an event'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When should vague actions be fixed?',
        options: [
          { text: 'At the next meeting', why: 'By then they are already forgotten.' },
          { text: 'Before the meeting notes go out' },
          { text: 'Never, vague is fine', why: 'Vague actions rarely happen.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Look at the last meeting notes you have. How many actions had an owner, a clear verb and a date?',
    starters: ['Out of ... actions, ... were real.', 'One I would fix:'],
  },
  deepen: { title: 'Try it today', summary: 'Run your next meeting notes through the Owner | Action | Due request before sending them.' },
  notes: 'Owner/verb/deliverable/date is a standard action-item checklist. No statistics; "half never get done" is dialogue.',
};

export default lesson;
