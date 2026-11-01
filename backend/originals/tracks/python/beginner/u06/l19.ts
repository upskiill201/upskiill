import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 19 — The member manager: join or leave, from input, with the list and pot updated. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The member manager',
  summary: 'Ada is tired of editing the list by hand. She builds a small manager: type join or leave and a name, and the tracker updates the list and the pot itself.',
  minutes: 13,
  outcomes: [
    'Combine input, if/elif and list methods',
    'Guard .remove() with an in check',
    'Print the updated list and pot',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Building the manager',
      steps: [
        {
          title: '1. Ask two questions',
          body: 'Clean both answers, as in Chapter 4.',
          code: 'action = input("join or leave: ").strip().lower()\nname = input("Name: ").strip().title()',
          language: 'python',
        },
        {
          title: '2. Joining',
          body: 'Only add people who aren\'t already in.',
          code: 'if action == "join":\n    if name in members:\n        print(f"{name} is already a member")\n    else:\n        members.append(name)',
          language: 'python',
        },
        {
          title: '3. Leaving',
          body: 'Check before .remove(), so a typo can\'t crash it.',
          code: 'elif action == "leave":\n    if name in members:\n        members.remove(name)\n    else:\n        print(f"{name} is not a member")',
          language: 'python',
        },
        {
          title: '4. Anything else, then the summary',
          body: 'else catches typos like "jion". Then print what the group needs to know.',
          code: 'else:\n    print("Type join or leave")\n\nprint(f"Members: {len(members)}")\nprint(f"Pot: {len(members) * SHARE:,}")',
          language: 'python',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The manager',
      caption: 'Ola joins.',
      code: 'SHARE = 30000\nmembers = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf",\n           "Ifeoma", "Segun", "Amaka", "Dayo", "Tobi", "Chika"]\n\naction = input("join or leave: ").strip().lower()\nname = input("Name: ").strip().title()\n\nif action == "join":\n    if name in members:\n        print(f"{name} is already a member")\n    else:\n        members.append(name)\nelif action == "leave":\n    if name in members:\n        members.remove(name)\n    else:\n        print(f"{name} is not a member")\nelse:\n    print("Type join or leave")\n\nprint(f"Members: {len(members)}")\nprint(f"Pot: {len(members) * SHARE:,}")\n',
      stdin: ['join', ' ola'],
      challenge: 'Run it again with leave and yusuf.',
    },
  ],
  apply: {
    scenario: 'The member manager.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'If action is "join", append name. Then print len(members)',
        starter: 'members = ["Ada", "Tunde", "Bisi"]\naction = input("Action: ")\nname = input("Name: ")\n',
        solution: 'members = ["Ada", "Tunde", "Bisi"]\naction = input("Action: ")\nname = input("Name: ")\nif action == "join":\n    members.append(name)\nprint(len(members))\n',
        hint: 'if action == "join":',
        stdin: ['join', 'Ola'],
        checks: [
          { message: 'Print 4', outputIncludes: '4' },
          { message: 'Ola is added', expr: 'members[-1] == "Ola"' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'If action is "leave" and name is a member, remove them. Then print the list',
        starter: 'members = ["Ada", "Tunde", "Yusuf"]\naction = input("Action: ")\nname = input("Name: ")\n',
        solution: 'members = ["Ada", "Tunde", "Yusuf"]\naction = input("Action: ")\nname = input("Name: ")\nif action == "leave" and name in members:\n    members.remove(name)\nprint(members)\n',
        hint: 'if action == "leave" and name in members:',
        stdin: ['leave', 'Yusuf'],
        checks: [
          { message: "Print ['Ada', 'Tunde']", outputIncludes: "['Ada', 'Tunde']" },
          { message: 'Yusuf is gone', expr: '"Yusuf" not in members' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The user types "  OLA ". Why clean name with .strip().title()?',
        options: [
          { text: 'To make it shorter', why: 'It\'s about matching, not length.' },
          { text: 'in ignores spaces anyway', why: 'It doesn\'t: "  OLA " isn\'t "Ola".' },
          { text: 'So it matches "Ola" in the list, and is stored the same way as everyone else' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Typing leave and Femi crashes it. Which line?',
        language: 'python',
        lines: ['if action == "leave":', '    members.remove(name)', 'print(members)'],
        bug: 1,
        fix: '    if name in members:\n        members.remove(name)',
        explanation: 'Check with in before .remove(), or a name that isn\'t there raises ValueError.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the lines of the join branch.',
        language: 'python',
        lines: ['if action == "join":', '    if name in members:', '        print("Already a member")', '    else:', '        members.append(name)'],
      },
      {
        kind: 'sortGroups',
        prompt: 'members = ["Ada", "Tunde"]. What does the manager do?',
        groups: ['Changes the list', 'Prints a message only'],
        items: [
          { text: 'join, Ola', group: 0 },
          { text: 'join, Ada', group: 1 },
          { text: 'leave, Tunde', group: 0 },
          { text: 'leave, Femi', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Clean the name with .strip().title(), append it, and print the last member',
        starter: 'members = ["Ada", "Tunde"]\nname = input("Name: ")\n',
        solution: 'members = ["Ada", "Tunde"]\nname = input("Name: ").strip().title()\nmembers.append(name)\nprint(members[-1])\n',
        hint: 'input("Name: ").strip().title()',
        stdin: ['  ola '],
        checks: [
          { message: 'Store Ola, cleaned', expr: 'members[-1] == "Ola"' },
          { message: 'Print the last member', outputIncludes: 'Ola' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Catch any action that isn\'t join or leave.',
        language: 'python',
        template: 'if action == "join":\n    members.append(name)\n[[1]] action == "leave":\n    members.remove(name)\n[[2]]:\n    print("Type join or leave")',
        blanks: [['elif'], ['else']],
        distractors: ['if', 'or'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Should the manager let anyone type "leave Ada"?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Yes, anyone should.', why: 'Changing the member list is the group\'s decision.' },
          { text: 'Not in real life. For now it\'s your laptop, so it\'s fine. Later you\'d add a check on who\'s allowed to make changes.' },
          { text: 'Python can\'t do that.', why: 'It can: with an if on who is using it.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which keyword checks a name is in the list before removing it? (two letters)',
        answers: ['in'],
        placeholder: 'Keyword',
      },
    ],
  },
  reflect: {
    prompt: 'The manager answers politely when something is wrong ("is not a member"). Why does the wording of an error message matter to the person reading it?',
    starters: ['A good message...', 'A bad one makes people...'],
  },
  deepen: {
    title: 'One change per run',
    summary: 'Right now the manager does one change, then stops. In Chapter 7 a while loop keeps it running until you type "done".',
  },
  notes: 'Combines Chapter 4 input cleaning, Chapter 5 if/elif/else and Chapter 6 list methods. No loops yet (Chapter 7). The runner echoes "Prompt: answer" lines, so stdin checks use outputIncludes.',
};

export default lesson;
