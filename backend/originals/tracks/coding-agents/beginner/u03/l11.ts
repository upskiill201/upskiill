import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 11 — When to start a fresh session. */

const V1 = 'Write is_at_risk in board/rules.py: True when a delivery is likely to arrive late. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. If the distance is blank, flag it. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';
const MORNING = 'Write morning_list in board/morning.py: the order ids of deliveries at risk, oldest first. Only change board/morning.py. Done when all tests pass.';
const MESSAGE = 'Write morning_message in board/message.py: takes the list of order ids and returns one line for Brian. If none are at risk, say so. Only change board/message.py. Done when all tests pass.';
const START = `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nagent = PracticeAgent()\nfor brief in [${JSON.stringify(V1)},\n              ${JSON.stringify(MORNING)},\n              ${JSON.stringify(MESSAGE)}]:\n    agent.run(brief, project)\n`;

const lesson: OriginalLesson = {
  key: 'l11',
  title: 'A fresh session',
  summary: 'By Thursday afternoon Remi\'s agent session has been open for hours. It starts repeating old ideas and forgetting a limit he set that morning. Felix: "Close it. Start fresh."',
  minutes: 12,
  outcomes: [
    'Know why long sessions go wrong',
    'Track how much a session has used',
    'Start a fresh session without losing your place',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Why sessions get tired',
      html: '<p>An agent session remembers everything in it: every brief, every file it read, every test run. That memory is its <strong>context</strong>, and it has a limit. As it fills up:</p><ul><li>Early instructions get less attention. A limit from the morning may be ignored by the afternoon.</li><li>Old, wrong ideas from earlier attempts are still in there, and it may return to them.</li><li>Each message costs more, because it carries the whole history.</li></ul><p>The practice agent counts its session in tokens. After three steps (rule, morning list, message) it has used <strong>11,700</strong>. Real sessions on real projects can reach hundreds of thousands.</p><p>Start a fresh session when:</p><ol><li>you finish one task and start another;</li><li>the agent starts repeating itself or forgetting rules;</li><li>an approach failed and you want it forgotten.</li></ol><p>You lose nothing if the important things are written down: the brief (BRIEF.md), the plan, and the code itself. The new session reads those and starts clean.</p>',
    },
    {
      kind: 'tryIt',
      title: 'How much has this session used?',
      caption: 'Three steps in one session.',
      code: START + '\nprint(agent.runs, "runs,", agent.session_tokens, "tokens so far")\nfresh = PracticeAgent()\nprint("Fresh session:", fresh.runs, "runs,", fresh.session_tokens, "tokens")\n',
      challenge: 'Run the explore brief in the old session too. How big does it get?',
    },
  ],
  apply: {
    scenario: 'Knowing when to start again.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'After the three steps in one session, print the session\'s total tokens',
        starter: START,
        solution: START + 'print(agent.session_tokens)\n',
        hint: 'agent.session_tokens',
        checks: [{ message: 'Print 11700', outputEquals: '11700' }],
      },
      {
        kind: 'mcq',
        prompt: 'What usually happens as a session\'s context fills up?',
        options: [
          { text: 'It gets smarter with every message', why: 'More history isn\'t more skill.' },
          { text: 'Early instructions get less attention and old ideas creep back' },
          { text: 'Nothing changes', why: 'Long sessions often drift.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Start a fresh session, or keep going?',
        groups: ['Fresh session', 'Keep going'],
        items: [
          { text: 'You finished the board and start a new task', group: 0 },
          { text: 'It keeps returning to an approach you rejected', group: 0 },
          { text: 'You\'re on step 2 of a plan and all is well', group: 1 },
          { text: 'It ignored a limit you gave it this morning', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what you keep to where it lives.',
        pairs: [
          ['The brief', 'BRIEF.md'],
          ['The plan', 'A task list'],
          ['The work so far', 'The code and checkpoints'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'If I close the session, won\'t it forget everything we did today?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'Yes, so never close it.', why: 'Long sessions drift; the work is saved anyway.' },
          { text: 'It remembers everything forever.', why: 'A fresh session starts empty.' },
          { text: 'It forgets the chat, not the work. The code, BRIEF.md and the plan are all saved. The new session reads them and starts clean.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_agent import PracticeAgent\nagent = PracticeAgent()\nprint(agent.runs, agent.session_tokens)',
        language: 'python',
        options: [
          { text: '0 0' },
          { text: '1 2000', why: 'A new agent hasn\'t run yet.' },
          { text: 'An error', why: 'Both start at 0.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'After the three steps, print how many runs the session has had',
        starter: START,
        solution: START + 'print(agent.runs)\n',
        hint: 'agent.runs',
        checks: [{ message: 'Print 3', outputEquals: '3' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Why a fresh session is safe.',
        template: 'It forgets the [[1]], not the [[2]].',
        blanks: [['chat'], ['work', 'code']],
        distractors: ['tests', 'brief'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes a fresh session risky?',
        lines: [
          'Save the code with a checkpoint.',
          'Keep the brief only in the old chat.',
          'Write the plan in TASKS.md.',
          'Open a fresh session.',
        ],
        bug: 1,
        fix: 'Save the brief in BRIEF.md.',
        explanation: 'A brief that only lives in the chat is lost with it.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the name for everything an agent session holds in memory?',
        answers: ['context', 'the context', 'context window'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'When you\'ve worked on something for hours, what helps you "start fresh"? What do you write down first?',
    starters: ['I start fresh by...', 'I write down...'],
  },
  deepen: {
    title: 'Compacting',
    summary: 'Some agents can summarise a long session to free up space. Handy, but summaries lose detail. Writing the important parts into files is more reliable.',
  },
  notes: 'Practice agent: rule (4500) + morning list (3900) + message (3300) in one PracticeAgent -> runs 3, session_tokens 11700. A new PracticeAgent starts at 0 runs, 0 tokens. Real agents have finite context windows; some offer summarisation/compaction (2026).',
};

export default lesson;
