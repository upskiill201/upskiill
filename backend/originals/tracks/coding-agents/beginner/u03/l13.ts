import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 13 — Splitting work between you and the agent. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Who does what',
  summary: 'Remi realises some steps shouldn\'t go to the agent at all. Felix helps him split the plan: decisions and checks stay human, typing goes to the agent.',
  minutes: 12,
  outcomes: [
    'Decide which steps belong to you and which to the agent',
    'Keep decisions and checks human',
    'Mark the plan with who does each step',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'A split plan',
      text: 'Deciding what "at risk" means is Zanele\'s call, written down by Remi. Writing is_at_risk is a clear, checkable job for the agent. Checking the morning list against real deliveries is Zanele\'s again. Writing the message code goes to the agent; deciding its wording is Brian\'s. The final review is Felix\'s. The agent types; people decide and check.',
      hotspots: [
        { phrase: 'Zanele\'s call', note: 'Business rules come from the people who own the business problem, never from the agent.' },
        { phrase: 'a clear, checkable job', note: 'The sweet spot from Chapter 1: an exact brief and tests that can say yes or no.' },
        { phrase: 'Checking the morning list', note: 'Only someone who knows the deliveries can say the list makes sense.' },
        { phrase: 'deciding its wording is Brian\'s', note: 'He reads it every morning. The agent can draft; Brian decides.' },
        { phrase: 'The final review is Felix\'s', note: 'An agent can help review (Chapter 9), but a person approves.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Mark who does what',
      caption: 'A plan with an owner on every step.',
      code: 'plan = [\n    ("Decide the at-risk rule", "Zanele"),\n    ("Write is_at_risk", "agent"),\n    ("Check the morning list on real deliveries", "Zanele"),\n    ("Write morning_message", "agent"),\n    ("Choose the message wording", "Brian"),\n    ("Final review", "Felix"),\n]\nfor step, who in plan:\n    print(f"{who:>7}: {step}")\nprint("Agent steps:", sum(1 for _, who in plan if who == "agent"))\n',
      challenge: 'Add "Write the brief" with the right owner.',
    },
  ],
  apply: {
    scenario: 'People decide, the agent types.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the steps owned by the agent, as a list',
        starter: 'plan = [\n    ("Decide the at-risk rule", "Zanele"),\n    ("Write is_at_risk", "agent"),\n    ("Check the morning list on real deliveries", "Zanele"),\n    ("Write morning_message", "agent"),\n    ("Final review", "Felix"),\n]\n',
        solution: 'plan = [\n    ("Decide the at-risk rule", "Zanele"),\n    ("Write is_at_risk", "agent"),\n    ("Check the morning list on real deliveries", "Zanele"),\n    ("Write morning_message", "agent"),\n    ("Final review", "Felix"),\n]\nprint([step for step, who in plan if who == "agent"])\n',
        hint: '[step for step, who in plan if who == "agent"]',
        checks: [{ message: "Print ['Write is_at_risk', 'Write morning_message']", outputEquals: "['Write is_at_risk', 'Write morning_message']" }],
      },
      {
        kind: 'mcq',
        prompt: 'Who should decide what counts as "at risk"?',
        options: [
          { text: 'The agent', why: 'It would guess, as it did in Chapter 1.' },
          { text: 'Zanele, who knows why deliveries are late' },
          { text: 'Whoever types the code', why: 'Rules come from the business, not the keyboard.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'A person\'s job or the agent\'s?',
        groups: ['Person', 'Agent'],
        items: [
          { text: 'Choosing the at-risk rule', group: 0 },
          { text: 'Writing morning_list', group: 1 },
          { text: 'Approving the change', group: 0 },
          { text: 'Writing code to pass clear tests', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to its owner.',
        pairs: [
          ['Decide the rule', 'Zanele'],
          ['Choose the message wording', 'Brian'],
          ['Final review', 'Felix'],
          ['Write is_at_risk', 'The agent'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Couldn\'t the agent just decide the wording of Brian\'s message too?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'Yes, let it decide everything.', why: 'Decisions belong to the people affected.' },
          { text: 'Agents can\'t write text.', why: 'They can draft well; deciding is the human part.' },
          { text: 'It can draft three versions. Brian reads it every morning, so Brian picks. Drafts from the agent, decisions from people.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'plan = [("Decide", "Zanele"), ("Write", "agent"), ("Review", "Felix")]\nprint(len([s for s, who in plan if who != "agent"]))',
        language: 'python',
        options: [
          { text: '2' },
          { text: '1', why: 'Two steps are owned by people.' },
          { text: '3', why: 'One step is the agent\'s.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print who owns the "Final review" step',
        starter: 'plan = dict([\n    ("Decide the at-risk rule", "Zanele"),\n    ("Write is_at_risk", "agent"),\n    ("Final review", "Felix"),\n])\n',
        solution: 'plan = dict([\n    ("Decide the at-risk rule", "Zanele"),\n    ("Write is_at_risk", "agent"),\n    ("Final review", "Felix"),\n])\nprint(plan["Final review"])\n',
        hint: 'plan["Final review"]',
        checks: [{ message: 'Print Felix', outputEquals: 'Felix' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The split.',
        template: 'People [[1]] and check; the agent [[2]].',
        blanks: [['decide'], ['types']],
        distractors: ['guess', 'approves'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step is given to the wrong owner?',
        lines: [
          'Zanele: decide the at-risk rule',
          'Agent: write is_at_risk',
          'Agent: approve the change for release',
          'Zanele: check the morning list',
        ],
        bug: 2,
        fix: 'Felix: approve the change',
        explanation: 'Approving is a human decision.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Whose call is the wording of the morning message?',
        answers: ['Brian', 'brian', 'Brian\'s'],
        placeholder: 'A name',
      },
    ],
  },
  reflect: {
    prompt: 'In your work, what should never be handed to an AI, even if it could do it? Why?',
    starters: ['I\'d never hand over...', 'Because...'],
  },
  deepen: {
    title: 'Human in the loop',
    summary: '"Human in the loop" means people stay in charge of decisions and approvals while AI does parts of the work. Chapter 8 makes it a hard rule for risky actions.',
  },
  notes: 'Ownership split used in the course: Zanele decides the rule and checks the list, Brian chooses the message wording, Felix reviews, the agent writes code for clear briefs.',
};

export default lesson;
