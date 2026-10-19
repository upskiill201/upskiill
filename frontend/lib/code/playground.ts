/**
 * Content for the Code playground (/dashboard/code): example programs to
 * start from, and short challenges with the same hidden checks lessons use.
 * Every challenge's solution must pass its own checks (the solutions are
 * here for the "Show solution" button, never shown up front).
 */

import type { CodeCheck } from '@/lib/lesson/blocks';

export interface PlaygroundExample {
  id: string;
  label: string;
  code: string;
}

/** TypeScript starters for the playground's TypeScript mode (type-checked, strict). */
export const TS_EXAMPLES: PlaygroundExample[] = [
  {
    id: 'ts-hello',
    label: 'Hello',
    code: `// Change the name and press Run.
const name: string = "Grace";
console.log(\`Hello, \${name}!\`);
`,
  },
  {
    id: 'ts-types',
    label: 'Catch a bug',
    code: `// TypeScript checks this before it runs.
// Fix the line it points at.
let sessions: number = 3;
sessions = "four";
console.log(sessions);
`,
  },
  {
    id: 'ts-shape',
    label: 'A booking',
    code: `type Status = "booked" | "cancelled";

interface Booking {
  code: string;
  time: string;
  status: Status;
}

const today: Booking[] = [
  { code: "P-014", time: "10:00", status: "booked" },
  { code: "P-022", time: "11:00", status: "cancelled" },
];

for (const b of today) {
  console.log(\`\${b.time}  \${b.code}  \${b.status}\`);
}
`,
  },
];

export const EXAMPLES: PlaygroundExample[] = [
  {
    id: 'hello',
    label: 'Hello',
    code: `# Change the name and press Run.
name = "Ada"
print(f"Hello, {name}! Welcome to Python.")
`,
  },
  {
    id: 'ajo',
    label: 'Savings pot',
    code: `# An ajo: everyone pays in, one person takes the pot each month.
members = 10
contribution = 20000  # naira per member

pot = members * contribution
print(f"This month's pot: ₦{pot:,}")
print(f"Over {members} months, you pay in ₦{contribution * members:,} and take out ₦{pot:,}.")
`,
  },
  {
    id: 'table',
    label: 'Times table',
    code: `number = 7

for i in range(1, 11):
    print(f"{number} x {i} = {number * i}")
`,
  },
  {
    id: 'guess',
    label: 'Guess the number',
    code: `import random

secret = random.randint(1, 10)
guess = int(input("Guess a number from 1 to 10: "))

if guess == secret:
    print("You got it!")
else:
    print(f"Not quite. It was {secret}.")
`,
  },
  {
    id: 'name',
    label: 'Ask a question',
    code: `name = input("What's your name? ")
city = input("Where do you live? ")
print(f"Nice to meet you, {name} from {city}!")
`,
  },
];

export interface PlaygroundChallenge {
  id: string;
  title: string;
  task: string;
  starter: string;
  solution: string;
  hint: string;
  checks: CodeCheck[];
  stdin?: string[];
}

export const CHALLENGES: PlaygroundChallenge[] = [
  {
    id: 'hello-teyro',
    title: 'Say hello',
    task: 'Print exactly: Hello, Teyro!',
    starter: '# Your code here\n',
    solution: 'print("Hello, Teyro!")\n',
    hint: 'Text goes inside quotes, inside print( ).',
    checks: [{ message: 'Print Hello, Teyro!', outputIncludes: 'Hello, Teyro!' }],
  },
  {
    id: 'one-two-three',
    title: 'Count to three',
    task: 'Print 1, 2 and 3, each on its own line.',
    starter: '',
    solution: 'print(1)\nprint(2)\nprint(3)\n',
    hint: 'Each print() starts a new line.',
    checks: [{ message: 'Print 1, 2 and 3 on separate lines, and nothing else', outputEquals: '1\n2\n3' }],
  },
  {
    id: 'pot',
    title: 'The savings pot',
    task: 'There are 10 members and each pays 20000. Save the total in a variable called pot, then print it.',
    starter: 'members = 10\ncontribution = 20000\n',
    solution: 'members = 10\ncontribution = 20000\npot = members * contribution\nprint(pot)\n',
    hint: 'Multiply with *, and save the answer with pot = ...',
    checks: [
      { message: 'Make a variable called pot that holds the total', expr: 'pot == 200000' },
      { message: 'Print the total', outputIncludes: '200000' },
    ],
  },
  {
    id: 'shout',
    title: 'Shout it',
    task: 'name holds "ada". Print it in capital letters with an exclamation mark: ADA!',
    starter: 'name = "ada"\n',
    solution: 'name = "ada"\nprint(name.upper() + "!")\n',
    hint: 'Text has an .upper() method. Join the "!" on with +.',
    checks: [
      { message: 'Print ADA!', outputIncludes: 'ADA!' },
      { message: 'Use .upper() instead of typing the capitals yourself', codeIncludes: '.upper()' },
    ],
  },
  {
    id: 'even-odd',
    title: 'Even or odd',
    task: 'Ask for a number with input(), then print "<number> is even" or "<number> is odd".',
    starter: 'number = int(input("Number: "))\n',
    solution: 'number = int(input("Number: "))\nif number % 2 == 0:\n    print(f"{number} is even")\nelse:\n    print(f"{number} is odd")\n',
    hint: 'number % 2 is the remainder after dividing by 2. Even numbers leave 0.',
    stdin: ['14'],
    checks: [{ message: 'Say whether 14 is even or odd', outputIncludes: '14 is even' }],
  },
  {
    id: 'seven-table',
    title: 'Loop it',
    task: 'Use a for loop to print the 7 times table from 7 x 1 = 7 to 7 x 10 = 70.',
    starter: 'for i in range(1, 11):\n    # print one line of the table\n',
    solution: 'for i in range(1, 11):\n    print(f"7 x {i} = {7 * i}")\n',
    hint: 'range(1, 11) gives 1 to 10. Inside the loop, print 7 x i = 7 * i.',
    checks: [
      { message: 'Print 7 x 1 = 7', outputIncludes: '7 x 1 = 7' },
      { message: 'Print 7 x 10 = 70', outputIncludes: '7 x 10 = 70' },
      { message: 'Use a for loop', codeIncludes: 'for ' },
    ],
  },
  {
    id: 'sum-100',
    title: 'Add it all up',
    task: 'Add up every whole number from 1 to 100 with a loop, and print the total.',
    starter: 'total = 0\n',
    solution: 'total = 0\nfor n in range(1, 101):\n    total += n\nprint(total)\n',
    hint: 'Loop over range(1, 101) and add each number to total with +=.',
    checks: [
      { message: 'Keep the answer in total', expr: 'total == 5050' },
      { message: 'Print the total', outputIncludes: '5050' },
    ],
  },
  {
    id: 'vowels',
    title: 'Count the vowels',
    task: 'Count the vowels (a, e, i, o, u) in the sentence and store the number in count.',
    starter: 'sentence = "programming is fun"\ncount = 0\n',
    solution: 'sentence = "programming is fun"\ncount = 0\nfor letter in sentence:\n    if letter in "aeiou":\n        count += 1\nprint(count)\n',
    hint: 'Loop over each letter. If the letter is in "aeiou", add 1 to count.',
    checks: [{ message: 'count holds the number of vowels', expr: 'count == 5' }],
  },
];
