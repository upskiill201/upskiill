import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 14 — Too long is a problem too. */

const GOOD = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';

const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Too long is a problem too',
  summary: 'Burned by short briefs, Remi writes a page: the project\'s history, Zanele\'s whole analysis, his thoughts on dashboards. Felix finds a contradiction in paragraph four.',
  minutes: 11,
  outcomes: [
    'Know why long briefs fail differently',
    'Cut a brief to what the agent needs',
    'Spot contradictions in a brief',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Short briefs leave gaps. Long briefs hide things. The rule gets buried in history, and the more you write, the more likely two sentences disagree.', replies: ['What did Felix find?'] },
        { tey: 'Paragraph one: "Only change board/rules.py." Paragraph four: "While you\'re there, tidy up the report." Which one should the agent follow?', replies: ['How long should a brief be?'] },
        { tey: 'As long as the five parts need, and no longer. Remi\'s good brief is 34 words. Background goes elsewhere, like a README, and the brief can point to it.', replies: ['How do I cut?'] },
        { tey: 'For each sentence ask: does the agent need this to do the task, or check it? If not, cut it. "We\'ve had a hard quarter" doesn\'t change a line of code.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Count and cut',
      caption: 'Keep only sentences the agent needs.',
      code: 'long_brief = [\n    "This project started after Zanele\'s analysis of late deliveries.",\n    "Write is_at_risk in board/rules.py.",\n    "We have had a hard quarter and the boss is keen.",\n    "At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km.",\n    "Dates look like 2026-03-06 15:00.",\n    "Only change board/rules.py.",\n    "Done when all tests pass.",\n]\nneeded = [s for s in long_brief if "quarter" not in s and "started" not in s]\nprint(len(" ".join(long_brief).split()), "words ->", len(" ".join(needed).split()), "words")\n',
      challenge: 'Add "While you\'re there, tidy up the report." Which sentence does it contradict?',
    },
  ],
  apply: {
    scenario: 'Just enough.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many words Remi\'s good brief has',
        starter: `brief = ${JSON.stringify(GOOD)}\n`,
        solution: `brief = ${JSON.stringify(GOOD)}\nprint(len(brief.split()))\n`,
        hint: 'len(brief.split())',
        checks: [{ message: 'Print 34', outputEquals: '34' }],
      },
      {
        kind: 'mcq',
        prompt: 'What is the main danger of a very long brief?',
        options: [
          { text: 'Agents refuse long briefs', why: 'They accept them; that\'s the problem.' },
          { text: 'The key rules get buried, and sentences start to contradict each other' },
          { text: 'Nothing, longer is always safer', why: 'Remi\'s page had a contradiction.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep it in the brief, or cut it?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'Only change board/rules.py.', group: 0 },
          { text: 'We\'ve had a hard quarter.', group: 1 },
          { text: 'Dates look like 2026-03-06 15:00.', group: 0 },
          { text: 'I personally prefer dark mode.', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the sentence to the one it contradicts.',
        pairs: [
          ['Only change board/rules.py', 'Tidy up the report too'],
          ['Don\'t change the tests', 'Update tests so they pass'],
          ['Keep it simple', 'Handle every possible case'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'I\'ll write everything, just in case. More context can\'t hurt.',
        prompt: "Felix's best reply?",
        options: [
          { text: 'Right, write it all.', why: 'Long briefs bury rules and contradict themselves.' },
          { text: 'Write nothing.', why: 'Too short leaves gaps.' },
          { text: 'It can. The rule gets lost, and your page told it to change one file AND tidy another. Put background in the README, not the brief.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'sentences = ["Write is_at_risk.", "Hard quarter.", "Only change board/rules.py."]\nprint(len([s for s in sentences if "quarter" not in s]))',
        language: 'python',
        options: [
          { text: '2' },
          { text: '3', why: 'One sentence is filtered out.' },
          { text: '1', why: 'Only "Hard quarter." is removed.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Cut the sentences that mention "quarter" or "started", and print how many sentences are left',
        starter: 'long_brief = [\n    "This project started after Zanele\'s analysis.",\n    "Write is_at_risk in board/rules.py.",\n    "We have had a hard quarter.",\n    "Only change board/rules.py.",\n    "Done when all tests pass.",\n]\n',
        solution: 'long_brief = [\n    "This project started after Zanele\'s analysis.",\n    "Write is_at_risk in board/rules.py.",\n    "We have had a hard quarter.",\n    "Only change board/rules.py.",\n    "Done when all tests pass.",\n]\nprint(len([s for s in long_brief if "quarter" not in s and "started" not in s]))\n',
        hint: 'Keep sentences without "quarter" and without "started"',
        checks: [{ message: 'Print 3', outputEquals: '3' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The cutting question.',
        template: 'Does the agent need this to [[1]] the task, or [[2]] it?',
        blanks: [['do'], ['check']],
        distractors: ['enjoy', 'skip'],
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence contradicts the rest of this brief?',
        lines: [
          'Write is_at_risk in board/rules.py.',
          'Only change board/rules.py.',
          'While you\'re there, tidy up board/report.py.',
          'Done when all tests pass.',
        ],
        bug: 2,
        fix: 'Delete it, or make it a separate task for Zanele to approve.',
        explanation: 'It clashes with "Only change board/rules.py."',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Where should background like the project\'s history go instead of the brief?',
        answers: ['README', 'readme', 'the README', 'README.md'],
        placeholder: 'A file',
      },
    ],
  },
  reflect: {
    prompt: 'Take a long message you wrote recently. Which sentences did the reader actually need?',
    starters: ['They needed...', 'I could cut...'],
  },
  deepen: {
    title: 'Lost in the middle',
    summary: 'Research on AI models has found they can miss details in the middle of long inputs. Short, focused briefs put every instruction where it\'s seen.',
  },
  notes: 'Good brief = 34 words. Liu et al. (2023) "Lost in the Middle" found models use information at the start and end of long contexts better than the middle.',
};

export default lesson;
