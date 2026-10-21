import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 16 — planning with other people. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Planning with other people',
  summary: 'The pilot involves Tolu, Ada, Tobi, the bank and Lucía\'s team. A plan only works if everyone knows who does what. Tap the plan to see how.',
  minutes: 12,
  outcomes: [
    'Give every task one clear owner',
    'Say who decides, who helps and who just needs to know',
    'Use AI to spot gaps and overlaps in a shared plan',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'One row of the shared plan',
      text: 'Task: agree settlement times with the bank. Owner: Ada. Decides: Tobi. Helps: Tolu (shop feedback). Keep informed: Lucía. Due: 20 August. Status: amber.',
      hotspots: [
        { phrase: 'Owner: Ada', note: 'One owner per task. "Ada and Tolu" means nobody feels fully responsible.' },
        { phrase: 'Decides: Tobi', note: 'Who has the final say. Saves arguments later.' },
        { phrase: 'Helps: Tolu', note: 'People who contribute, but don\'t own it.' },
        { phrase: 'Keep informed: Lucía', note: 'People who need updates but don\'t need to act.' },
        { phrase: 'Due: 20 August', note: 'A date, not "soon". Agreed with the owner.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'One owner per task, plus who decides, who helps and who stays informed. Ask AI: "Find tasks with no owner, two owners, or no due date."',
    },
  ],
  apply: {
    scenario: 'Tolu shares the pilot plan with everyone.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why one owner per task?',
        options: [
          { text: 'With two owners, each assumes the other is doing it' },
          { text: 'To save names', why: 'It\'s about clear responsibility.' },
          { text: 'Rules say so', why: 'It\'s practical.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the role to what it means.',
        pairs: [
          ['Owner', 'Makes sure it gets done'],
          ['Decides', 'Has the final say'],
          ['Helps', 'Contributes work or input'],
          ['Keep informed', 'Gets updates only'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request best checks the shared plan?',
        options: [
          { text: 'Is my plan OK?', why: 'Too vague.' },
          { text: 'In this plan, list tasks with no owner, more than one owner, no due date, or nobody who decides.' },
          { text: 'Assign owners for me.', why: 'The AI doesn\'t know your team.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which row has an ownership problem?',
        lines: [
          'Print flyers: owner Tolu, due 25 Aug',
          'Bank settlement: owner Ada, due 20 Aug',
          'Support rota: owners Ada and Tolu',
          'Launch banner: owner Tolu, due 22 Aug',
        ],
        bug: 2,
        fix: 'Support rota: owner Tolu; helps Ada.',
        explanation: 'Two owners means unclear responsibility.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Do I need to approve the settlement agreement?',
        prompt: 'Lucía is "keep informed" on that row. Best reply?',
        options: [
          { text: 'No need: Tobi decides. We\'ll update you when it\'s agreed, by 20 August.' },
          { text: 'Yes, everyone approves everything.', why: 'That slows everything down.' },
          { text: 'I don\'t know.', why: 'The plan says who decides.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'One [[1]] per task, plus who [[2]], who helps and who stays informed.',
        blanks: [['owner'], ['decides']],
        distractors: ['emoji', 'sleeps'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Owner or keep informed, for "print flyers"?',
        groups: ['Owner', 'Keep informed'],
        items: [
          { text: 'Tolu, who orders the printing', group: 0 },
          { text: 'Lucía, who wants to know they\'re done', group: 1 },
          { text: 'Tobi, who just tracks progress', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who decides on the settlement agreement?',
        answers: ['Tobi', 'tobi'],
        placeholder: 'A name',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tolu\'s plan-check request.',
        tiles: ['Find', 'tasks', 'with', 'no', 'owner'],
        distractors: ['nice'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Tolu shares the plan.',
        lines: ['List every task', 'Agree one owner each', 'Add who decides and who\'s informed', 'Ask AI to find gaps', 'Share with everyone'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good plan row or problem?',
        groups: ['Good', 'Problem'],
        items: [
          { text: 'Owner Ada, due 20 Aug, Tobi decides', group: 0 },
          { text: 'Owner: the team', group: 1 },
          { text: 'Due: soon', group: 1 },
          { text: 'Owner Tolu, due 25 Aug, Lucía informed', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why mark who just needs to be "kept informed"?',
        options: [
          { text: 'They get updates without being asked to approve or act' },
          { text: 'To leave them out', why: 'They still get updates.' },
          { text: 'It doesn\'t matter', why: 'It avoids too many approvers.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'In a shared project you\'re in, is there a task with two owners or none? What would fix it?',
    starters: ['The task:', 'The fix:'],
  },
  deepen: { title: 'Try it today', summary: 'Paste a shared plan into AI and ask it to list tasks with no owner, two owners or no date.' },
  notes: 'The owner / decides / helps / informed roles are a simplified version of the common RACI model. Dates fictional.',
};

export default lesson;
