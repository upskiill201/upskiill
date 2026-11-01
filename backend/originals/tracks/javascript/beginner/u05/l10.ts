import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const TRAILS = `const trails = [
  { name: "Schoolhouse", level: "green", open: true, groomed: true },
  { name: "Lazy Elk", level: "green", open: true, groomed: true },
  { name: "Bunny Hollow", level: "green", open: true, groomed: true },
  { name: "Old Mill", level: "green", open: false, groomed: false },
  { name: "Bluebird", level: "blue", open: true, groomed: true },
  { name: "Mags's Run", level: "blue", open: true, groomed: true },
  { name: "Big Sky", level: "blue", open: true, groomed: false },
  { name: "Aspen Alley", level: "blue", open: true, groomed: false },
  { name: "Lone Pine", level: "blue", open: true, groomed: true },
  { name: "Silver Streak", level: "blue", open: false, groomed: false },
  { name: "Rattlesnake", level: "black", open: true, groomed: false },
  { name: "Ridgeline", level: "black", open: true, groomed: false },
  { name: "Hermit Glade", level: "black", open: false, groomed: false },
  { name: "The Chute", level: "black", open: false, groomed: false },
];
`;

/** Chapter 5 · Lesson 10 — Unit Challenge (end of Level 1). The New Year's Eve status report, and the championship call. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Unit Challenge: New Year\'s Eve status report',
  summary: 'Thursday 31 December. The year\'s last report goes out at 4, built from all fourteen trail objects. Then the phone rings, and it isn\'t a skier.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Build a full report from a list of objects with filter, map and find',
    'Write functions that take a list and return answers',
    'Use everything from Level 1 in one program',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 3:30 p.m.',
      beats: [
        { speaker: 'mags', text: 'Last report of the year. How many open, how many groomed, which blacks. And make it nice, my sister reads it.' },
        { speaker: 'nora', text: 'Fourteen objects. A filter for each question, a map for the names. Ten lines.' },
        { speaker: 'rafa', text: 'Four weeks ago you didn\'t know what console.log did.' },
        { speaker: 'narrator', text: 'At 3:58 the landline rings. Mags listens for a long time. Then she puts her hand over the phone.' },
        { speaker: 'mags', text: 'The Colorado Junior Freeride Series. Their March venue has no snow. They want to hold the championship here. Saturday the thirteenth. Two hundred people, sixty riders, live results.' },
        { speaker: 'nora', text: 'Mags, we have one chairlift and a website I learned to code in December.' },
        { speaker: 'mags', text: '(into the phone) We\'d love to.' },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: the last report of the year.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const t = { name: "Bluebird", level: "blue", open: true };\nconsole.log(`${t.name} (${t.level}): ${t.open ? "open" : "closed"}`);',
        language: 'javascript',
        options: [
          { text: 'Bluebird (blue): open' },
          { text: 'name (level): open', why: 'The dots read the values, not the keys.' },
          { text: 'Bluebird (blue): true', why: 'The ternary turns true into the word open.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Using all 14 trails, print exactly: Open: 10 of 14 (use filter and .length, and trails.length).',
        starter: TRAILS,
        solution: `${TRAILS}\nconst open = trails.filter((t) => t.open);\nconsole.log(\`Open: \${open.length} of \${trails.length}\`);\n`,
        hint: 'const open = trails.filter((t) => t.open);',
        checks: [
          { message: 'Print Open: 10 of 14', outputEquals: 'Open: 10 of 14' },
          { message: 'Use filter', codeIncludes: '.filter(' },
          { message: 'Use trails.length', codeIncludes: 'trails.length' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the open black trails as one line: Blacks open: Rattlesnake, Ridgeline (filter, map, join).',
        starter: TRAILS,
        solution: `${TRAILS}\nconst blacks = trails\n  .filter((t) => t.level === "black" && t.open)\n  .map((t) => t.name)\n  .join(", ");\nconsole.log(\`Blacks open: \${blacks}\`);\n`,
        hint: 'trails.filter((t) => t.level === "black" && t.open).map((t) => t.name).join(", ")',
        checks: [
          { message: 'Print Blacks open: Rattlesnake, Ridgeline', outputEquals: 'Blacks open: Rattlesnake, Ridgeline' },
          { message: 'Use map', codeIncludes: '.map(' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which method answers each part of Mags\'s report?',
        groups: ['filter', 'find', 'some'],
        items: [
          { text: 'All the groomed trails', group: 0 },
          { text: 'Details for Mags\'s Run', group: 1 },
          { text: 'Is any green closed?', group: 2 },
          { text: 'Every open blue', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The report says "Groomed: 0", but seven trails are groomed. Which line?',
        lines: [
          'const groomed = trails.filter((t) => {',
          '  t.groomed;',
          '});',
          'console.log(`Groomed: ${groomed.length}`);',
        ],
        bug: 1,
        fix: '  return t.groomed;',
        explanation: 'A test in braces needs return. Without it, every test gives undefined (falsy), so filter keeps nothing.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Write function countBy(trails, level) that returns how many trails of that level are OPEN. Print exactly: Greens: 3, Blues: 5, Blacks: 2',
        starter: TRAILS,
        solution: `${TRAILS}\nfunction countBy(trails, level) {\n  return trails.filter((t) => t.level === level && t.open).length;\n}\n\nconsole.log(\`Greens: \${countBy(trails, "green")}, Blues: \${countBy(trails, "blue")}, Blacks: \${countBy(trails, "black")}\`);\n`,
        hint: 'return trails.filter((t) => t.level === level && t.open).length;',
        checks: [
          { message: 'Print Greens: 3, Blues: 5, Blacks: 2', outputEquals: 'Greens: 3, Blues: 5, Blacks: 2' },
          { message: 'countBy works on other lists', expr: 'countBy([{ level: "green", open: true }, { level: "green", open: false }], "green") === 1' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Get Mags\'s Run and print its level.',
        template: 'const run = trails.[[1]]((t) => t.name === "Mags\'s Run");\nconsole.log(run[[2]]level);',
        blanks: [['find'], ['.']],
        distractors: ['filter', 'some', '['],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'The whole report. Write function report(trails) that RETURNS an object { open, groomed, total } (counts of open trails, groomed trails, and all trails). Print exactly: 10 open, 6 groomed, 14 trails',
        starter: TRAILS,
        solution: `${TRAILS}\nfunction report(trails) {\n  return {\n    open: trails.filter((t) => t.open).length,\n    groomed: trails.filter((t) => t.groomed).length,\n    total: trails.length,\n  };\n}\n\nconst r = report(trails);\nconsole.log(\`\${r.open} open, \${r.groomed} groomed, \${r.total} trails\`);\n`,
        hint: 'return { open: ..., groomed: ..., total: trails.length };',
        checks: [
          { message: 'Print 10 open, 6 groomed, 14 trails', outputEquals: '10 open, 6 groomed, 14 trails' },
          { message: 'report returns the right object', expr: '(() => { const r = report(trails); return r.open === 10 && r.groomed === 6 && r.total === 14; })()' },
          { message: 'report works on any list', expr: 'report([{ open: true, groomed: false }]).open === 1' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Level 1 in one table: match each tool to its chapter.',
        pairs: [
          ['const, let and ${ }', 'The Phone Won\'t Stop'],
          ['if, else and &&', 'Locals Tuesday'],
          ['function and return', 'One Rule, Every Window'],
          ['arrays and for...of', 'Fourteen Trails'],
          ['objects, filter and map', 'Christmas Week Rush'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const riders = [{ bib: 12 }, { bib: 13 }];\nconst wes = riders.find((r) => r.bib === 13);\nconsole.log(wes ? "Wes is riding" : "No Wes");',
        language: 'javascript',
        options: [
          { text: 'No Wes', why: 'find returns the bib 13 object, which is truthy.' },
          { text: 'Wes is riding' },
          { text: 'undefined', why: 'The ternary prints one of its two strings.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which array method keeps only the items that pass a test?',
        answers: ['filter', 'filter()', '.filter()'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Mags hangs up the phone. Pick Nora\'s reply.',
        from: 'mags',
        message: 'Live results. They said "live results on everyone\'s phone". Can JavaScript do that?',
        options: [
          { text: 'Not from the console. But JavaScript is what makes web pages live. I\'ve got ten weeks. Let\'s find out' },
          { text: 'No, call them back', why: 'Mags already said yes. And JavaScript can do it.' },
          { text: 'Only if the riders use the console', why: 'They\'ll use a web page. That\'s Level 2.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You finished JavaScript for Beginners. Look back at lesson 1. What can you do now that felt impossible then?',
    starters: ['In December I couldn\'t...', 'Now I can...'],
  },
  deepen: {
    title: 'Next: The Live Board',
    summary: 'Everything so far happened in the console. In Interactive Web Pages with JavaScript, Nora puts it on the page: change text and colours, react to taps and typing, build lists from data and check forms. The same variables, functions, arrays and objects, now visible to everyone.',
  },
  notes: 'Unit Challenge u05 and end of Level 1. Thu 31 Dec 2026. Trails data = practice-api.js (10 open: 3 green, 5 blue, 2 black; 6 groomed). Championship: Sat 13 Mar 2027.',
};

export default lesson;
