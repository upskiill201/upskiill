import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9: else, elif, and/or/not, comparing text. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: full, part or nothing',
  summary: 'The tracker now answers every member: in full, part paid, or nothing yet, and whether the late fee applies. Quick check before decisions start nesting inside each other.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write if/elif/else chains', 'Combine conditions with and, or and not'],
  learn: [
    {
      kind: 'story',
      title: 'The 26th',
      beats: [
        { speaker: 'narrator', text: 'Kemi pays 30000 on the 26th, one day late, but she was on leave. The tracker says: "Paid in full. Late, but excused: no fee."' },
        { speaker: 'narrator', text: 'Kemi: "It knew I was on leave?" Ada: "It knew because I told it the rule."' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: bigger decisions.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print Paid in full, Part paid or Nothing yet for paid = 15000',
        starter: 'SHARE = 30000\npaid = 15000\n',
        solution: 'SHARE = 30000\npaid = 15000\nif paid >= SHARE:\n    print("Paid in full")\nelif paid > 0:\n    print("Part paid")\nelse:\n    print("Nothing yet")\n',
        hint: 'if / elif / else.',
        checks: [{ message: 'Print Part paid', outputEquals: 'Part paid' }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'late = True\nexcused = True\nif late and not excused:\n    print("Fee")\nelse:\n    print("No fee")',
        language: 'python',
        options: [
          { text: 'Fee', why: 'not excused is False, so the and is False.' },
          { text: 'No fee' },
          { text: 'Fee then No fee', why: 'Only one branch runs.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which branch runs? (if day <= 25, elif day <= 28, else)',
        groups: ['if', 'elif', 'else'],
        items: [
          { text: 'day = 25', group: 0 },
          { text: 'day = 27', group: 1 },
          { text: 'day = 30', group: 2 },
          { text: 'day = 3', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'If late and not excused, print Add 1500, otherwise print No fee',
        starter: 'late = True\non_leave = True\n',
        solution: 'late = True\non_leave = True\nif late and not on_leave:\n    print("Add 1500")\nelse:\n    print("No fee")\n',
        hint: 'if late and not on_leave:',
        checks: [{ message: 'Print No fee', outputEquals: 'No fee' }],
      },
      {
        kind: 'findBug',
        prompt: 'A full payment prints "Part paid". Which line is in the wrong place?',
        language: 'python',
        lines: ['if paid > 0:', '    print("Part paid")', 'elif paid >= 30000:', '    print("Paid in full")', 'else:', '    print("Nothing yet")'],
        bug: 0,
        fix: 'Swap the order: check paid >= 30000 first',
        explanation: 'The first True branch wins, and a full payment is also > 0.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the word to what it does.',
        pairs: [
          ['else', 'Every other case'],
          ['elif', 'Another condition, if the ones above failed'],
          ['and', 'Both must be True'],
          ['or', 'Either can be True'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'day = 30. What does this print?',
        code: 'if day == 26 or 27:\n    print("Late")\nelse:\n    print("On time")',
        language: 'python',
        options: [
          { text: 'Late' },
          { text: 'On time', why: 'The condition is always True: 27 on its own counts as True.' },
          { text: 'An error', why: 'It runs. It\'s just wrong.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Ask "Your name: ", clean it, and print Your month! if it\'s Kemi, otherwise Not yet',
        starter: 'this_month = "Kemi"\n',
        solution: 'this_month = "Kemi"\nname = input("Your name: ").strip().title()\nif name == this_month:\n    print("Your month!")\nelse:\n    print("Not yet")\n',
        hint: 'Clean the input, then if/else.',
        stdin: ['KEMI '],
        checks: [{ message: 'Print Your month!', outputIncludes: 'Your month!' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Excused if on leave or on holiday.',
        language: 'python',
        template: 'excused = on_leave [[1]] on_holiday',
        blanks: [['or']],
        distractors: ['and', 'not'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Kemi asked how the tracker "knew" she was on leave.',
        prompt: "Ada's best answer?",
        options: [
          { text: 'Python is clever.', why: 'Python follows rules exactly; the cleverness is the rule.' },
          { text: 'It guessed.', why: 'Programs don\'t guess.' },
          { text: 'It didn\'t know anything. I wrote the rule, late and not excused, and gave it the facts. It just followed the rule.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the decision.',
        language: 'python',
        lines: ['if paid >= 30000:', '    print("Full")', 'elif paid > 0:', '    print("Part")', 'else:', '    print("None")'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(True or False) show?',
        answers: ['True'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Kemi thought the tracker "knew" something. What do people often think software knows that it\'s really just been told?',
    starters: ['People think apps know...', 'Really, someone wrote...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 6-9. day == 26 or 27 is always truthy.',
};

export default lesson;
