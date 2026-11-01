import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8 — Asking the agent to ask you questions. */

const START = 'from teyro_agent import Project, PracticeAgent\n\n';

const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Ask me first',
  summary: 'Remi learns the cheapest trick in the book: end a brief with "Ask me any questions first." The agent\'s questions show exactly where the brief has gaps.',
  minutes: 11,
  outcomes: [
    'Ask an agent for questions before it starts',
    'Use its questions to find gaps in a brief',
    'Answer them in the brief, not just in the chat',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Agents guess when something\'s missing. So invite them not to: end the brief with "Ask me any questions first."', replies: ['Does it work?'] },
        { tey: '"Write is_at_risk. Ask me any questions first." gets six questions back: the Friday time, Saturday, the distance, the date format, which files, and how we know it\'s done.', replies: ['And with a better brief?'] },
        { tey: 'Add the Friday time and Saturday, and it asks four. Answer all six in the brief and it asks none: it just starts.', replies: ['So the number of questions is a score?'] },
        { tey: 'Roughly: zero questions means it found everything it looks for. Answer them in the brief itself, so the next session starts with the answers.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Watch the questions shrink',
      caption: 'Three briefs, each ending with "Ask me any questions first."',
      code: START + 'briefs = [\n    "Write is_at_risk.",\n    "Write is_at_risk. At risk: Friday from 2 p.m. or Saturday.",\n    "Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. "\n    "Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.",\n]\nfor brief in briefs:\n    change = PracticeAgent().run(brief + " Ask me any questions first.", Project())\n    print(len(change.questions), "questions:", change.questions)\n',
      challenge: 'Print the message of the last one. Did it ask, or start?',
    },
  ],
  apply: {
    scenario: 'Questions before code.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Ask for questions on "Write is_at_risk. At risk: Friday from 2 p.m. or Saturday." and print how many there are',
        starter: START,
        solution: START + 'change = PracticeAgent().run("Write is_at_risk. At risk: Friday from 2 p.m. or Saturday. Ask me any questions first.", Project())\nprint(len(change.questions))\n',
        hint: 'Add " Ask me any questions first." and print len(change.questions)',
        checks: [{ message: 'Print 4', outputEquals: '4' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why answer the questions in the brief rather than in a chat reply?',
        options: [
          { text: 'Agents can\'t read replies', why: 'They can, but chats end and are forgotten.' },
          { text: 'The brief is kept; the next session starts with the answers' },
          { text: 'It\'s faster to type', why: 'It\'s about keeping the knowledge.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the agent\'s question to the gap.',
        pairs: [
          ['What format are the dates in?', 'No example date'],
          ['Which files may I change?', 'No limits'],
          ['How will we know it is done?', 'No finish line'],
          ['How long a route counts as at risk?', 'No distance'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Ask for questions on "Write is_at_risk." and print the first question',
        starter: START,
        solution: START + 'change = PracticeAgent().run("Write is_at_risk. Ask me any questions first.", Project())\nprint(change.questions[0])\n',
        hint: 'change.questions[0]',
        checks: [{ message: 'Print the Friday question', outputEquals: 'From what time on Friday is a delivery at risk?' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Would the practice agent still ask about this?',
        groups: ['Still asks', 'Answered'],
        items: [
          { text: 'Brief has "Dates look like 2026-03-06 15:00"', group: 1 },
          { text: 'Brief never says which files', group: 0 },
          { text: 'Brief has "Done when all tests pass"', group: 1 },
          { text: 'Brief never mentions distance', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'It asked six questions. That\'s annoying. Can I turn it off?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Yes, questions waste time.', why: 'Guesses waste more.' },
          { text: 'Answer randomly to save time.', why: 'Random answers are guesses with extra steps.' },
          { text: 'Each question is a gap that would have been a guess. Six questions now beats six bugs later.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'questions = []\nprint("Starting work" if not questions else "Asking first")',
        language: 'python',
        options: [
          { text: 'Starting work' },
          { text: 'Asking first', why: 'An empty list counts as False.' },
          { text: '[]', why: 'It prints one of the two strings.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The trick.',
        template: 'End the brief with: "Ask me any [[1]] [[2]]."',
        blanks: [['questions'], ['first']],
        distractors: ['tests', 'later'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step of Remi\'s routine loses the answers?',
        lines: [
          'End the brief with "Ask me any questions first."',
          'Read the agent\'s questions.',
          'Answer them in the chat only.',
          'Run the agent.',
        ],
        bug: 2,
        fix: 'Write the answers into the brief.',
        explanation: 'The next session won\'t see an old chat.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many questions does the full brief get?',
        answers: ['0', 'zero', 'none'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Before you start a task for someone, what questions do you wish you\'d asked? Write three.',
    starters: ['I should ask...', 'And...'],
  },
  deepen: {
    title: 'Real agents ask differently',
    summary: 'Real agents ask about whatever looks unclear, not a fixed list. Some need to be told to ask; some ask on their own. Either way, put the answers in the brief.',
  },
  notes: 'Practice agent: "Write is_at_risk. Ask me any questions first." -> 6 questions, first "From what time on Friday is a delivery at risk?"; with Friday time + Saturday -> 4; full brief -> 0 questions and it starts work ("Done. All 7 tests pass.").',
};

export default lesson;
