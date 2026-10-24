import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Walkthrough: parameters and arguments. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Parameters',
  summary: 'A function that always says the same thing only goes so far. Nora wants one greeting that works for every lift, and every rider.',
  minutes: 10,
  outcomes: [
    'Give a function a parameter',
    'Pass an argument when you call it',
    'Use the parameter inside the function like a variable',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'One function, many lifts',
      steps: [
        {
          title: 'The problem',
          body: 'Three functions that only differ by one word.',
          code: 'function oldBlueOpen() { console.log("Old Blue is open"); }\nfunction tbarOpen() { console.log("Ridge T-Bar is open"); }\nfunction carpetOpen() { console.log("Bunny Carpet is open"); }',
          language: 'javascript',
        },
        {
          title: 'Name the part that changes',
          body: 'Put a name in the brackets. That name is a parameter: an empty slot the function fills in each time it runs.',
          code: 'function liftOpen(lift) {\n  console.log(`${lift} is open`);\n}',
          language: 'javascript',
        },
        {
          title: 'Fill the slot when you call it',
          body: 'The value in the call\'s brackets is the argument. It goes into the parameter for that one run.',
          code: 'liftOpen("Old Blue");      // Old Blue is open\nliftOpen("Bunny Carpet");  // Bunny Carpet is open',
          language: 'javascript',
        },
        {
          title: 'Any value works',
          body: 'Strings, numbers, booleans, variables, even sums. The function doesn\'t care where it came from.',
          code: 'const today = "Ridge T-Bar";\nliftOpen(today);',
          language: 'javascript',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Fill the slot',
      code: 'function liftOpen(lift) {\n  console.log(`${lift} is open`);\n}\n\nliftOpen("Old Blue");\nliftOpen("Bunny Carpet");\n',
      caption: 'Same steps, different value each call.',
      challenge: 'Add a call for "Ridge T-Bar".',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Parameter: the name in the declaration, function liftOpen(lift). Argument: the value in the call, liftOpen("Old Blue"). People mix them up all the time; the idea matters more than the word.',
    },
  ],
  apply: {
    scenario: 'One greeting for every lift.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'function greet(name) {\n  console.log(`Hi, ${name}!`);\n}\ngreet("Wes");',
        language: 'javascript',
        options: [
          { text: 'Hi, name!', why: 'name is a parameter. It holds "Wes" for this call.' },
          { text: 'Hi, Wes!' },
          { text: 'Hi, ${name}!', why: 'The template literal fills the slot.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Parameter (in the declaration) or argument (in the call)?',
        groups: ['Parameter', 'Argument'],
        items: [
          { text: 'lift in function liftOpen(lift)', group: 0 },
          { text: '"Old Blue" in liftOpen("Old Blue")', group: 1 },
          { text: 'kids in function kidsCost(kids)', group: 0 },
          { text: '3 in kidsCost(3)', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Declare function liftOpen(lift) that prints ${lift} is open. Call it with "Old Blue", then with "Bunny Carpet".',
        starter: '',
        solution: 'function liftOpen(lift) {\n  console.log(`${lift} is open`);\n}\n\nliftOpen("Old Blue");\nliftOpen("Bunny Carpet");\n',
        hint: 'function liftOpen(lift) {\n  console.log(`${lift} is open`);\n}',
        checks: [
          { message: 'Print both lines, in order', outputEquals: 'Old Blue is open\nBunny Carpet is open' },
          { message: 'liftOpen takes one parameter', expr: 'typeof liftOpen === "function" && liftOpen.length === 1' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Give the function a slot, then fill it.',
        template: 'function trailReport([[1]]) {\n  console.log(`${trail} is groomed`);\n}\ntrailReport([[2]]);',
        blanks: [['trail'], ['"Bluebird"']],
        distractors: ['Bluebird', '"trail"', '{trail}'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'This prints "undefined is open". Which line is the problem?',
        lines: ['function liftOpen(lift) {', '  console.log(`${lift} is open`);', '}', 'liftOpen();'],
        bug: 3,
        fix: 'liftOpen("Old Blue");',
        explanation: 'The call gives no argument, so lift is empty: undefined. Pass the lift\'s name.',
        language: 'javascript',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'function double(n) {\n  console.log(n * 2);\n}\ndouble(59);',
        language: 'javascript',
        options: [
          { text: '59', why: 'n is 59, and the function prints n * 2.' },
          { text: 'n * 2', why: 'It\'s worked out, not printed as text.' },
          { text: '118' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Declare function kidsCost(kids) that prints exactly: Kids: $X, where X is kids * 39. Call it with 3.',
        starter: '',
        solution: 'function kidsCost(kids) {\n  console.log(`Kids: $${kids * 39}`);\n}\n\nkidsCost(3);\n',
        hint: 'console.log(`Kids: $${kids * 39}`);',
        checks: [
          { message: 'Print Kids: $117', outputEquals: 'Kids: $117' },
          { message: 'kidsCost is a function', expr: 'typeof kidsCost === "function"' },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the call that greets Mags.',
        tiles: ['greet', '(', '"Mags"', ')', ';'],
        distractors: ['function', 'Mags'],
        language: 'javascript',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The value you pass in a call, like "Old Blue" in liftOpen("Old Blue"), is called an...',
        answers: ['argument', 'an argument', 'arguments'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Wes wants something. Pick Nora\'s reply.',
        from: 'wes',
        message: 'can you make it say hi to everyone by name. there\'s like 400 people',
        options: [
          { text: 'I\'d need 400 functions', why: 'One function with a name parameter does it.' },
          { text: 'One function, greet(name). I call it with each name' },
          { text: 'Only if they all have the same name', why: 'That\'s exactly what parameters fix.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a message you send many times with one detail changing. What would the parameter be?',
    starters: ['The function would be...', 'The parameter is...'],
  },
  deepen: {
    title: 'fn.length',
    summary: 'A function knows how many parameters it was declared with: liftOpen.length is 1. Teyro\'s checks use it to see your function takes the right inputs. You\'ll rarely need it yourself.',
  },
  notes: 'Parameters vs arguments: MDN "Functions" (Function parameters). Function.prototype.length: MDN. Kids $39 × 3 = $117.',
};

export default lesson;
