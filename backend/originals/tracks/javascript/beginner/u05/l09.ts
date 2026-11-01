import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Reading: functions that take and return objects. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Functions that take and return objects',
  summary: 'familyCost(2, 3, 1, 0, true) means nothing to anyone reading it. Rafa shows Nora how real code passes one labelled object in, and gets one labelled object back.',
  minutes: 10,
  outcomes: [
    'Pass an object into a function instead of many arguments',
    'Return an object holding several results',
    'Read values out of objects with destructuring',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Labels beat positions',
      html: '<p>Nora\'s price function has grown: <code>quote(2, 3, 1, 0, true)</code>. Two adults? Three kids? What\'s the <code>true</code>? Even Nora has to check.</p><p>Rafa\'s fix: <b>pass one object</b>. The labels travel with the values, and the order stops mattering.</p><pre>quote({ adults: 2, kids: 3, seniors: 1, isTuesday: true })</pre><p>Inside the function, read the parts with a dot: <code>party.adults</code>. Or pull them out in one go. This is called <b>destructuring</b>:</p><pre>function quote(party) {\n  const { adults, kids } = party;\n  return adults * 59 + kids * 39;\n}</pre><p><code>const { adults, kids } = party</code> makes two variables, <code>adults</code> and <code>kids</code>, from the properties of the same names.</p><p>It works the other way too. A function can only return one value, but that value can be an <b>object holding several answers</b>:</p><pre>return { total: 196, tickets: 4 };</pre><p>The caller reads <code>result.total</code> and <code>result.tickets</code>. "Every API you\'ll ever call talks like this," Rafa says. "Objects in, objects out."</p>',
    },
    {
      kind: 'tryIt',
      title: 'Objects in, objects out',
      code: 'function quote(party) {\n  const { adults, kids } = party;\n  const total = adults * 59 + kids * 39;\n  return { total: total, tickets: adults + kids };\n}\n\nconst result = quote({ adults: 2, kids: 2 });\nconsole.log(result.total);\nconsole.log(result.tickets);\nconsole.log(result);\n',
      caption: 'The call reads like a sentence, and the answer has labels too.',
      challenge: 'Add seniors to the party ($29 each) and to the total.',
    },
  ],
  apply: {
    scenario: 'Rafa\'s rule: objects in, objects out.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which call is easiest to understand at a glance?',
        options: [
          { text: 'quote(2, 3, 1, true)', why: 'Without labels, you have to look up what each number means.' },
          { text: 'quote({ adults: 2, kids: 3, seniors: 1, isTuesday: true })' },
          { text: 'quote("2,3,1,true")', why: 'One string with everything in it is even harder to work with.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const party = { adults: 2, kids: 1 };\nconst { kids } = party;\nconsole.log(kids);',
        language: 'javascript',
        options: [
          { text: '1' },
          { text: '{ kids: 1 }', why: 'Destructuring pulls out the value into a plain variable.' },
          { text: 'undefined', why: 'party has a kids property, so kids is 1.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Write function quote(party) that returns party.adults * 59 + party.kids * 39. Print quote({ adults: 2, kids: 3 }).',
        starter: '',
        solution: 'function quote(party) {\n  return party.adults * 59 + party.kids * 39;\n}\n\nconsole.log(quote({ adults: 2, kids: 3 }));\n',
        hint: 'return party.adults * 59 + party.kids * 39;',
        checks: [
          { message: 'Print 235', outputEquals: '235' },
          { message: 'quote({ adults: 1, kids: 0 }) is 59', expr: 'quote({ adults: 1, kids: 0 }) === 59' },
          { message: 'The order of keys doesn\'t matter', expr: 'quote({ kids: 1, adults: 1 }) === 98' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Pull adults and kids out of party.',
        template: 'const [[1]] adults, kids [[2]] = party;',
        blanks: [['{'], ['}']],
        distractors: ['[', ']', '('],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Write function liftStats(waits) that returns an object with two properties: longest (the biggest wait) and total (all waits added). Use Math.max(...waits) for longest. Print liftStats([12, 0, 3]).total.',
        starter: '',
        solution: 'function liftStats(waits) {\n  let total = 0;\n  for (const w of waits) {\n    total += w;\n  }\n  return { longest: Math.max(...waits), total: total };\n}\n\nconsole.log(liftStats([12, 0, 3]).total);\n',
        hint: 'return { longest: Math.max(...waits), total: total };',
        checks: [
          { message: 'Print 15', outputEquals: '15' },
          { message: 'longest is 12', expr: 'liftStats([12, 0, 3]).longest === 12' },
          { message: 'Works for other lists', expr: 'liftStats([5, 9]).total === 14 && liftStats([5, 9]).longest === 9' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This prints NaN. Which line is the problem?',
        lines: ['function quote(party) {', '  return party.adults * 59 + party.kids * 39;', '}', 'console.log(quote(2, 3));'],
        bug: 3,
        fix: 'console.log(quote({ adults: 2, kids: 3 }));',
        explanation: 'quote expects one object. Passing 2 and 3 makes party the number 2, and 2.adults is undefined.',
        language: 'javascript',
      },
      {
        kind: 'matchPairs',
        prompt: 'With const result = { total: 196, tickets: 4 }, match each to its value.',
        pairs: [
          ['result.total', '196'],
          ['result.tickets', '4'],
          ['result.change', 'undefined'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Positions or an object? Pick the better shape for each function.',
        groups: ['Plain arguments are fine', 'Pass an object'],
        items: [
          { text: 'double(n)', group: 0 },
          { text: 'A booking with 6 details', group: 1 },
          { text: 'isFree(age)', group: 0 },
          { text: 'A rider sign-up with name, age, division, hometown', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'const { adults } = party is called...',
        answers: ['destructuring', 'object destructuring', 'destructuring assignment'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Nora asks Rafa why it matters. Pick his answer.',
        from: 'rafa',
        message: 'In six months, someone will read quote(2, 3, 1, 0, true). What will they think?',
        options: [
          { text: 'They\'ll guess wrong. With an object, the labels tell them' },
          { text: 'They\'ll understand perfectly', why: 'Nobody remembers what the fifth argument means.' },
          { text: 'They won\'t need to read it', why: 'Someone always needs to read it, usually at 6 a.m.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a form you filled in recently. What object would it send, and what object might come back?',
    starters: ['It would send { ... }', 'It would get back...'],
  },
  deepen: {
    title: 'Shorthand properties',
    summary: 'When a variable has the same name as the key, you can write it once: return { total, tickets }; means { total: total, tickets: tickets }. You\'ll see it all over modern code, and it pairs neatly with destructuring.',
  },
  notes: 'Destructuring assignment, shorthand property names: MDN. Math.max with spread: MDN.',
};

export default lesson;
