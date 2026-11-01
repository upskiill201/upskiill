import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10 — Unit Challenge. The trail report: arrays, loops, totals, filters, sorting. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Unit Challenge: the trail report',
  summary: 'Saturday 26 December, the busiest morning of the year. The radio station, the lodge sign and the website all want the trail report by 8. Nora builds it from the lists alone.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Combine arrays, loops and ifs into one report',
    'Count, total and pick items from lists',
    'Sort and format a list for people to read',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Saturday, 7:20 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Cars on the county road since six. Seven inches overnight. Every radio in the patrol hut is talking at once.' },
        { speaker: 'mags', text: 'The radio station wants the report at eight. So do the lodge, the website and my sister in Denver.' },
        { speaker: 'nora', text: 'Fourteen trails, a list of which are open, a list of today\'s grooming. One report, built from the lists.' },
        { speaker: 'rafa', text: 'Numbered. Open ones first. And how many we\'ve got.' },
        { speaker: 'wes', text: 'and the longest lift line so i know which one to skip' },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: the 8 a.m. trail report.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const t = ["Bluebird", "Big Sky", "Lone Pine"];\nconsole.log(t[t.length - 1]);',
        language: 'javascript',
        options: [
          { text: 'Bluebird', why: 'That\'s index 0.' },
          { text: 'undefined', why: 'length - 1 is the last real index.' },
          { text: 'Lone Pine' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Two lists line up by position: trails[i] is open when isOpen[i] is true. Use a for loop with i to build const openTrails, an array of the open names. Print openTrails.length.',
        starter: 'const trails = ["Schoolhouse", "Lazy Elk", "Bunny Hollow", "Old Mill", "Bluebird", "The Chute"];\nconst isOpen = [true, true, true, false, true, false];\n',
        solution: 'const trails = ["Schoolhouse", "Lazy Elk", "Bunny Hollow", "Old Mill", "Bluebird", "The Chute"];\nconst isOpen = [true, true, true, false, true, false];\nconst openTrails = [];\n\nfor (let i = 0; i < trails.length; i++) {\n  if (isOpen[i]) {\n    openTrails.push(trails[i]);\n  }\n}\n\nconsole.log(openTrails.length);\n',
        hint: 'if (isOpen[i]) { openTrails.push(trails[i]); }',
        checks: [
          { message: 'Print 4', outputEquals: '4' },
          { message: 'openTrails has the open names, in order', expr: 'openTrails.join() === "Schoolhouse,Lazy Elk,Bunny Hollow,Bluebird"' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Number the report from 1.',
        template: 'for (let i = 0; i [[1]] open.length; i++) {\n  console.log(`${i [[2]] 1}. ${open[i]}`);\n}',
        blanks: [['<'], ['+']],
        distractors: ['<=', '-', '>'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the numbered report of the open trails, sorted alphabetically first: 1. Big Sky, 2. Bluebird, 3. Lone Pine',
        starter: 'const open = ["Lone Pine", "Bluebird", "Big Sky"];\n',
        solution: 'const open = ["Lone Pine", "Bluebird", "Big Sky"];\nopen.sort();\n\nfor (let i = 0; i < open.length; i++) {\n  console.log(`${i + 1}. ${open[i]}`);\n}\n',
        hint: 'open.sort(); then a for loop with i.',
        checks: [
          { message: 'Print the numbered, sorted report', outputEquals: '1. Big Sky\n2. Bluebird\n3. Lone Pine' },
          { message: 'Sort it', codeIncludes: '.sort(' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The total snow says 3 instead of 18. Which line is in the wrong place?',
        lines: [
          'const snowfall = [2, 0, 5, 7, 0, 1, 3];',
          'for (const inches of snowfall) {',
          '  let total = 0;',
          '  total += inches;',
          '}',
        ],
        bug: 2,
        fix: 'Move let total = 0; above the loop.',
        explanation: 'The total resets every round. Start it once, before the loop.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Write function longest(numbers) that returns the biggest number in any array. Print exactly: Longest line: 22 min using longest(waits).',
        starter: 'const waits = [12, 22, 3];\n',
        solution: 'const waits = [12, 22, 3];\n\nfunction longest(numbers) {\n  let biggest = numbers[0];\n  for (const n of numbers) {\n    if (n > biggest) {\n      biggest = n;\n    }\n  }\n  return biggest;\n}\n\nconsole.log(`Longest line: ${longest(waits)} min`);\n',
        hint: 'let biggest = numbers[0]; loop; if (n > biggest) biggest = n; return biggest;',
        checks: [
          { message: 'Print Longest line: 22 min', outputEquals: 'Longest line: 22 min' },
          { message: 'longest([4, 9, 2]) is 9', expr: 'longest([4, 9, 2]) === 9' },
          { message: 'longest([-5, -2, -9]) is -2', expr: 'longest([-5, -2, -9]) === -2' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool would you reach for?',
        groups: ['A loop with a total or count', 'An array method', 'A loop with i'],
        items: [
          { text: 'How many trails are open', group: 0 },
          { text: 'The first three trails', group: 1 },
          { text: 'A numbered list', group: 2 },
          { text: 'Every trail, joined with commas', group: 1 },
          { text: 'Total snow this week', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const waits = [12, 0, 3];\nwaits.sort((a, b) => b - a);\nconsole.log(waits[0]);',
        language: 'javascript',
        options: [
          { text: '0', why: 'b - a sorts biggest first.' },
          { text: '12' },
          { text: '3', why: 'After sorting biggest first, index 0 holds 12.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'The full report. Count the open trails (isOpen holds true/false for all 14) into let openCount, then print exactly: Silver Pine, Dec 26: 10 of 14 trails open',
        starter: 'const isOpen = [true, true, true, false, true, true, true, true, true, false, true, true, false, false];\n',
        solution: 'const isOpen = [true, true, true, false, true, true, true, true, true, false, true, true, false, false];\nlet openCount = 0;\n\nfor (const open of isOpen) {\n  if (open) {\n    openCount++;\n  }\n}\n\nconsole.log(`Silver Pine, Dec 26: ${openCount} of ${isOpen.length} trails open`);\n',
        hint: 'Count with a loop, then use openCount and isOpen.length in the template literal.',
        checks: [
          { message: 'Print the report line', outputEquals: 'Silver Pine, Dec 26: 10 of 14 trails open' },
          { message: 'openCount is 10', expr: 'openCount === 10' },
          { message: 'Use isOpen.length for the 14', codeIncludes: 'isOpen.length' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the report program.',
        lines: [
          'const open = ["Lone Pine", "Big Sky"];',
          'open.push("Bluebird");',
          'open.sort();',
          'console.log(open.join(" · "));',
        ],
        language: 'javascript',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which array method copies part of a list without changing the original?',
        answers: ['slice', 'slice()', '.slice()'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'The radio station is on the line at 7:59. Pick Nora\'s reply.',
        from: 'mags',
        message: 'They\'re asking: how many trails, and which lift line is worst?',
        options: [
          { text: 'Ten of fourteen open, and Old Blue\'s line is the longest, twenty-two minutes. Tell Wes to try the T-Bar' },
          { text: 'Lots of trails, long lines', why: 'The code gives exact numbers. Use them.' },
          { text: 'Tell them to check the website later', why: 'The report is ready now. That was the whole point.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You built a report from raw lists. Which report do you make by hand at work or home that a loop could build in seconds?',
    starters: ['Every week I put together...', 'A loop could...'],
  },
  deepen: {
    title: 'Next: one trail, many facts',
    summary: 'Two lists that line up by position (trails and isOpen) work, until someone sorts one and not the other. Next chapter, Nora keeps every fact about a trail together, in an object: { name: "Bluebird", level: "blue", open: true }.',
  },
  notes: 'Unit Challenge u04. Sat 26 Dec 2026. isOpen flags match practice-api.js trails (10 of 14 open).',
};

export default lesson;
