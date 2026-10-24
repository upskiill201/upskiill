import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 17 — Common planning mistakes. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common planning mistakes',
  summary: 'Felix\'s list of the planning mistakes he sees most, from people and from agents. Remi ticks off the ones he made this week. It\'s most of them.',
  minutes: 11,
  outcomes: [
    'Name the most common planning mistakes',
    'Fix each with a habit',
    'Check a plan for them in Python',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Mistake vs habit',
      before: {
        label: 'Mistake',
        text: 'No plan: straight to code.\nA plan nobody reads.\nSteps too big to check.\nSteps in the wrong order.\nNo checkpoint before each step.\nTicking steps the agent only claimed.\nOne endless session.',
      },
      after: {
        label: 'Habit',
        text: '"Plan first, don\'t write code yet."\nRead and cross out.\nTwo-minute steps.\nFoundations first.\nCheckpoint, then brief.\nTick only what you checked.\nFresh session per task.',
      },
      notes: [
        'Agents make planning mistakes too: extra steps, steps already done, wrong order. Read their plans like a reviewer (next lesson).',
        'A plan is a draft. Changing it halfway, when you learn something, is good planning, not failure.',
        'If a step surprises you, stop: restore, rethink, re-brief.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Check a plan',
      caption: 'Flag steps that are extras or out of order.',
      code: 'plan = ["Write morning_message", "Write is_at_risk", "Write morning_list", "Add a weather dashboard"]\norder = ["Write is_at_risk", "Write morning_list", "Write morning_message"]\nextras = [s for s in plan if s not in order]\nkept = [s for s in plan if s in order]\nprint("Extras:", extras)\nprint("In the right order?", kept == order)\nprint("Fixed:", order)\n',
      challenge: 'Add "Write is_at_risk" twice to the plan. How would you catch that?',
    },
  ],
  apply: {
    scenario: 'Plans that work.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print whether the kept steps of this plan are in the right order',
        starter: 'plan = ["Write morning_message", "Write is_at_risk", "Write morning_list"]\norder = ["Write is_at_risk", "Write morning_list", "Write morning_message"]\n',
        solution: 'plan = ["Write morning_message", "Write is_at_risk", "Write morning_list"]\norder = ["Write is_at_risk", "Write morning_list", "Write morning_message"]\nprint([s for s in plan if s in order] == order)\n',
        hint: '[s for s in plan if s in order] == order',
        checks: [{ message: 'Print False', outputEquals: 'False' }],
      },
      {
        kind: 'mcq',
        prompt: 'You learn something halfway that changes the plan. What do you do?',
        options: [
          { text: 'Stick to the old plan no matter what', why: 'A plan is a draft.' },
          { text: 'Update the plan: that\'s good planning' },
          { text: 'Throw away all the work', why: 'Keep what\'s checked; change what\'s next.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Mistake or habit?',
        groups: ['Mistake', 'Habit'],
        items: [
          { text: 'Ticking a step because the agent said done', group: 0 },
          { text: 'Checkpoint before each step', group: 1 },
          { text: 'One session open all week', group: 0 },
          { text: 'Foundations first', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to the habit.',
        pairs: [
          ['No plan', 'Plan first, no code yet'],
          ['Steps too big', 'Two-minute steps'],
          ['Wrong order', 'Foundations first'],
          ['Endless session', 'Fresh session per task'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'I changed the plan three times this week. Bad planning?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'Yes, plans should never change.', why: 'Plans should change when you learn.' },
          { text: 'Stop planning then.', why: 'Planning is what caught the problems.' },
          { text: 'Good planning. Each time you learned something, like Brian\'s quiet day. The bad plan is the one you never update.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'plan = ["rule", "list", "dashboard"]\nneeded = ["rule", "list", "message"]\nprint([s for s in plan if s not in needed])',
        language: 'python',
        options: [
          { text: "['dashboard']" },
          { text: "['message']", why: 'That\'s needed but missing from the plan; it\'s not in plan.' },
          { text: '[]', why: '"dashboard" isn\'t needed.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the steps that are needed but missing from the plan',
        starter: 'plan = ["Write is_at_risk", "Write morning_list", "Add a weather dashboard"]\nneeded = ["Write is_at_risk", "Write morning_list", "Write morning_message"]\n',
        solution: 'plan = ["Write is_at_risk", "Write morning_list", "Add a weather dashboard"]\nneeded = ["Write is_at_risk", "Write morning_list", "Write morning_message"]\nprint([s for s in needed if s not in plan])\n',
        hint: '[s for s in needed if s not in plan]',
        checks: [{ message: "Print ['Write morning_message']", outputEquals: "['Write morning_message']" }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Two habits.',
        template: 'Tick only what you [[1]]; start a fresh [[2]] per task.',
        blanks: [['checked'], ['session']],
        distractors: ['claimed', 'project'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this week\'s routine is a planning mistake?',
        lines: [
          'Ask for the plan first.',
          'Cross out extras.',
          'Brief all the remaining steps in one message.',
          'Checkpoint, then check each result.',
        ],
        bug: 2,
        fix: 'Brief one step at a time.',
        explanation: 'All steps in one message is the six-file change again.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What should you do first when a step surprises you? (one word)',
        answers: ['stop', 'restore', 'Stop'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which planning mistake do you make most in everyday life? What habit would fix it?',
    starters: ['I usually...', 'The habit is...'],
  },
  deepen: {
    title: 'Plans are hypotheses',
    summary: 'A plan is a guess about how the work will go. Small steps test the guess early, which is why teams that plan in small steps change plans more and finish sooner.',
  },
  notes: 'Planning mistakes and habits summarised from Chapter 3.',
};

export default lesson;
