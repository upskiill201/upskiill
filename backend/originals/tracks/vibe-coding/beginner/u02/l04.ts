import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Walkthrough: plan first, with plan mode. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Plan first',
  summary: 'Hazel pastes her brief card in. This time, before a single file changes, she asks for a plan. It plans to save pledges "to a server". There is no server. Caught in ten seconds.',
  minutes: 12,
  outcomes: [
    'Switch to plan mode and ask for a plan',
    'Fix a plan before any code is written',
    'Approve a plan and let it build',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Plan, fix, approve',
      steps: [
        { title: '1. Start in your project folder', body: 'cd into the folder, then start Claude Code.', code: 'cd hazel-site\nclaude', language: 'bash' },
        { title: '2. Switch to plan mode', body: 'Press Shift+Tab until the bottom of the screen says plan mode is on. In plan mode it reads and plans, and can\'t change files. (You can also start one message with /plan.)' },
        { title: '3. Paste your brief and ask for a plan', body: 'End with: "Plan first. Don\'t write any code yet."' },
        { title: '4. Read the plan like a checklist', body: 'Does each step match your brief? Hazel spots: "Save pledges to a server." Her brief says one file, Ruth\'s laptop only.' },
        { title: '5. Fix it in plain words', body: '"No server. Save the pledges in the browser on Ruth\'s laptop. Keep it one file." It updates the plan.' },
        { title: '6. Approve', body: 'When the plan matches the brief, approve it and choose to keep approving edits yourself. Now it builds.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A wrong plan costs ten seconds to fix. Wrong code costs an evening. Plan first whenever a job is more than one small change.',
    },
  ],
  apply: {
    scenario: 'Hazel\'s first plan.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the plan-first steps in order.',
        lines: [
          'Start claude in the project folder',
          'Switch to plan mode with Shift+Tab',
          'Paste the brief and ask for a plan',
          'Read the plan and fix what\'s wrong',
          'Approve it and let it build',
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What can Claude Code do while plan mode is on?',
        options: [
          { text: 'Read your files and suggest a plan, without changing anything' },
          { text: 'Change every file at once', why: 'Plan mode blocks changes until you approve.' },
          { text: 'Nothing at all', why: 'It reads and plans.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Hazel\'s brief says "one file, Ruth\'s laptop only". Which plan step doesn\'t match?',
        lines: [
          '1. Create thermometer.html',
          '2. Add a form for name and amount',
          '3. Save pledges to a server database',
          '4. Show the total and "to go" toward $18,000',
        ],
        bug: 2,
        fix: 'Save the pledges in the browser on Ruth\'s laptop.',
        explanation: 'A server is a big extra piece her brief never asked for.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The magic last line.',
        template: 'Plan [[1]]. Don\'t write any [[2]] yet.',
        blanks: [['first'], ['code']],
        distractors: ['later', 'plans'],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Why waste time on a plan? Just let it build!',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'You\'re right, plans are slow.', why: 'Fixing wrong code is much slower.' },
          { text: 'The plan just caught a server we didn\'t need. Ten seconds, instead of an evening.' },
          { text: 'Plans are only for experts.', why: 'Plans help beginners most.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which keys turn on plan mode?',
        answers: ['shift+tab', 'shift tab', 'shift-tab', 'shift + tab'],
        placeholder: '... + ...',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'The plan is wrong in one step. Best way to fix it?',
        options: [
          { text: 'Start a brand new chat', why: 'Just say what to change.' },
          { text: 'Approve it anyway and fix later', why: 'That builds the wrong thing.' },
          { text: '"Step 3 is wrong: no server. Save pledges in the browser. Keep everything else in the plan."' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Plan first, or just ask?',
        groups: ['Plan first', 'Just ask'],
        items: [
          { text: 'A new pledge page with a form and a total', group: 0 },
          { text: 'Change the heading colour to gold', group: 1 },
          { text: 'Saving pledges so they survive a refresh', group: 0 },
          { text: 'Fix a typo in "Saturday"', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the move.',
        pairs: [
          ['Plan matches the brief', 'Approve it'],
          ['One step is wrong', 'Say which and why'],
          ['Plan adds extras', 'Point back to the limits'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When she approves, Hazel can choose to approve each edit herself, or let it edit without asking. Which, for now?',
        options: [
          { text: 'Let it edit without asking, it\'s faster', why: 'Not until her work is in git (Chapter 4).' },
          { text: 'It doesn\'t matter', why: 'It matters while she\'s learning what it does.' },
          { text: 'Approve each edit herself, so she sees every change' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Where else in life does a quick plan save you hours (a trip, a recipe, an essay)? What usually goes wrong when you skip it?',
  },
  deepen: {
    title: 'On your computer: plan your tool',
    summary: 'In your project folder, start claude, switch to plan mode with Shift+Tab, paste your brief.md and add "Plan first. Don\'t write any code yet." Read the plan against your brief. Fix one thing. Don\'t approve yet: next lesson is a review.',
  },
  notes: 'Plan mode (code.claude.com permission-modes, October 2026): Shift+Tab to enter, or prefix a message with /plan; read-only, edits blocked until the plan is approved; on approval choose auto, manual approval, or keep planning. Saving in the browser = localStorage (named in Ch3 explanations).',
};

export default lesson;
