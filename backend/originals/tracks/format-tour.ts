import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';

/**
 * Format tour: every Learn format and every exercise type, written in Tey's
 * voice on a real AI-at-work topic. It is a SAMPLE for /dev/originals (to
 * check each format on a phone) and a style reference for writers. devOnly:
 * the loader never writes it to a database.
 */
const track: OriginalTrackDef = {
  slug: 'format-tour',
  title: 'Format Tour',
  category: 'AI',
  description: 'Every Teyro Originals lesson format, in one place.',
  devOnly: true,
  levels: [
    {
      level: 1,
      slug: 'format-tour-sample',
      title: 'Format Tour',
      shortDescription: 'Every lesson format and exercise type, for checking on a phone.',
      description: 'A sample, not a course.',
      startingPoint: 'Anyone.',
      endOutcome: 'See every format working.',
      outcomes: ['See every Learn format', 'Try every exercise type'],
      skills: [],
      upcomingUnits: 0,
      units: [
        {
          key: 'u01',
          title: 'Better answers from AI',
          goal: 'Write a prompt that gets a useful first answer.',
          lessons: [
            {
              key: 'l01',
              title: 'Why your AI answers feel generic',
              summary: 'The problem is rarely the AI. It is what it was given.',
              minutes: 12,
              outcomes: ['Spot why an AI answer came out generic', 'Add the context that fixes it'],
              learn: [
                {
                  kind: 'myth',
                  statements: [
                    {
                      text: 'A better AI model will fix a vague request.',
                      isFact: false,
                      explain: 'A stronger model guesses more fluently, but it still has to guess. Missing context stays missing.',
                    },
                    {
                      text: 'AI tools only know what you put in the chat, plus what they learned in training.',
                      isFact: true,
                      explain: "They can't see your inbox, your client or your deadline unless you say so.",
                    },
                  ],
                },
                {
                  kind: 'story',
                  title: "Ada's first AI email",
                  beats: [
                    { speaker: 'narrator', text: "Monday, 9:12. Ada's manager wants a project update sent to Lucía at the client by ten." },
                    { speaker: 'ada', text: 'Easy. I will just ask the AI to "write a project update email".' },
                    { speaker: 'narrator', text: 'The AI writes 300 polite words about "exciting progress". None of it is about her project.' },
                    { speaker: 'tey', text: "Oh, Ada. It didn't fail. It filled the gaps you left with the most average email in the world." },
                  ],
                  choice: {
                    prompt: 'What should Ada do next?',
                    options: [
                      {
                        text: 'Ask again, but add what changed this week and what Lucía needs to decide.',
                        outcome: 'Yes. The second answer is short, specific and asks Lucía the one question that matters.',
                        best: true,
                      },
                      {
                        text: 'Switch to a different AI tool.',
                        outcome: 'Same vague request, different tool, same average email. The gap is in the request.',
                      },
                      {
                        text: 'Send it anyway. It sounds professional.',
                        outcome: 'Lucía replies: "Thanks! So... what is the status?" Ada now has two emails to write.',
                      },
                    ],
                  },
                },
                {
                  kind: 'compare',
                  title: 'Same request, with context',
                  before: { label: 'Vague', text: 'Write a project update email.' },
                  after: {
                    label: 'Specific',
                    text:
                      'Write a 5-line update to Lucía, our client contact. This week we finished the sign-up screens and moved testing to Friday. She needs to approve the new colour palette by Wednesday. Friendly, no jargon.',
                  },
                  notes: [
                    'Says who it is for, so the tone fits.',
                    'Gives the real facts, so nothing is invented.',
                    'Names the one decision needed, so the email has a point.',
                    'Sets the length, so it stays short.',
                  ],
                },
                {
                  kind: 'explore',
                  title: 'Take the good prompt apart',
                  text: 'Write a 5-line update to Lucía, our client contact. This week we finished the sign-up screens. She needs to approve the colour palette by Wednesday. Friendly, no jargon.',
                  hotspots: [
                    { phrase: '5-line', note: 'Length. Without it, AI tools tend to write long.' },
                    { phrase: 'Lucía, our client contact', note: 'Audience. A client email sounds different from a team message.' },
                    { phrase: 'we finished the sign-up screens', note: 'Facts. The AI cannot know what happened this week unless you say.' },
                    { phrase: 'approve the colour palette by Wednesday', note: 'The ask. Every useful email has one.' },
                    { phrase: 'Friendly, no jargon', note: 'Tone, in four words.' },
                  ],
                },
                {
                  kind: 'check',
                  question: 'What makes the second prompt better?',
                  options: ['It is longer', 'It gives the facts and the goal', 'It uses polite words'],
                  answer: 1,
                  explanation: 'Length alone does nothing. Facts and a clear goal leave the AI less to guess.',
                },
              ],
              apply: {
                scenario: "You're helping Ada get useful answers from AI at work.",
                items: [
                  {
                    kind: 'mcq',
                    variant: 'pickPrompt',
                    prompt: 'Which prompt will get Ada a better meeting summary?',
                    options: [
                      { text: 'Summarise this meeting.', why: 'Summarise for whom, and how long? The AI has to guess both.' },
                      { text: 'Summarise this meeting in 5 bullets for my manager: decisions, owners, deadlines.' },
                    ],
                    answer: 1,
                    explanation: 'It says who reads it, what to include, and the format.',
                  },
                  {
                    kind: 'chatReply',
                    from: 'lucia',
                    message: 'Hi Ada, quick one: can you tell me where the project is? I have a call with my boss in an hour.',
                    prompt: 'Which reply should Ada send?',
                    options: [
                      { text: 'Sign-up screens are done. Testing moves to Friday. I just need your OK on the colours by Wednesday.' },
                      { text: 'Great question! We are making exciting progress across many areas.', why: 'Lucía now has nothing to tell her boss.' },
                      { text: 'Let me check and get back to you next week.', why: 'Her call is in an hour.' },
                    ],
                    answer: 0,
                    explanation: 'Status, change, and the one thing she needs. Ready for her call.',
                  },
                  {
                    kind: 'sortGroups',
                    prompt: 'Does each part of a prompt help or hurt?',
                    groups: ['Helps', 'Hurts'],
                    items: [
                      { text: 'Who the answer is for', group: 0 },
                      { text: 'The length you want', group: 0 },
                      { text: '"Make it good"', group: 1 },
                      { text: 'The facts it needs', group: 0 },
                      { text: 'Asking for everything at once', group: 1 },
                    ],
                  },
                  {
                    kind: 'tapBuild',
                    prompt: 'Build the missing instruction: tell the AI the format.',
                    tiles: ['Answer', 'in', '3', 'short', 'bullets'],
                    distractors: ['maybe', 'essay'],
                  },
                  {
                    kind: 'typeAnswer',
                    prompt: "One word: what does a vague prompt make the AI do? (It has to ...)",
                    answers: ['guess', 'guessing'],
                    placeholder: 'One word',
                    explanation: 'Every gap in your prompt is something it has to guess.',
                  },
                  {
                    kind: 'fillBlank',
                    prompt: 'Complete the prompt.',
                    template: 'Write a [[1]] update to Lucía. She needs to [[2]] the palette by Wednesday.',
                    blanks: [['short'], ['approve']],
                    distractors: ['long', 'ignore'],
                  },
                  {
                    kind: 'findBug',
                    prompt: 'Spot the problem: which line makes this prompt weak?',
                    lines: [
                      'Write an update for our client, Lucía.',
                      'Make it really good and professional.',
                      'Mention that testing moved to Friday.',
                      'Keep it under 100 words.',
                    ],
                    bug: 1,
                    fix: 'Friendly, plain words, and end with the one question she needs to answer.',
                    explanation: '"Really good" tells the AI nothing it can act on.',
                  },
                  {
                    kind: 'orderLines',
                    prompt: 'Put the steps in a sensible order.',
                    lines: ['Decide what you need the answer for', 'Give the facts and the audience', 'Ask for a format', 'Check the answer before using it'],
                  },
                  {
                    kind: 'matchPairs',
                    prompt: 'Match each prompt part to what it controls.',
                    pairs: [
                      ['"For my manager"', 'Audience'],
                      ['"In 3 bullets"', 'Format'],
                      ['"Testing moved to Friday"', 'Facts'],
                    ],
                  },
                ],
              },
              reflect: {
                prompt: 'Think of the last thing you asked an AI tool. What did you leave it to guess?',
                starters: ['I asked for...', 'I left out...'],
              },
              deepen: { title: 'Go deeper', summary: 'Try rewriting one real request from this week with audience, facts and format.' },
              notes: 'Sample only. No statistics used.',
            },
            {
              key: 'l02',
              title: 'Role, goal, format',
              summary: 'Three parts that turn a guess into a useful first answer.',
              minutes: 11,
              outcomes: ['Write a prompt with a role, a goal and a format', 'Check an AI answer before you use it'],
              learn: [
                {
                  kind: 'chat',
                  turns: [
                    { tey: 'Quick question. If you asked a new colleague to "sort out the report", what would you get back?', replies: ['Something random', 'A lot of questions'] },
                    { tey: 'Exactly. AI tools are that colleague, minus the questions. They just pick something.' },
                    { tey: 'So we answer the questions up front. Three of them: who should it act as, what is the goal, and what shape should the answer take?', replies: ['Show me'] },
                  ],
                },
                {
                  kind: 'steps',
                  title: 'Build a prompt in three steps',
                  steps: [
                    { title: 'Give it a role', body: 'Who should it act as? "You are an editor who writes for busy clients."' },
                    { title: 'Give it a goal', body: 'What must the answer achieve? "Get Lucía to approve the palette by Wednesday."' },
                    { title: 'Give it a format', body: 'What shape? "Five lines, one question at the end."' },
                    {
                      title: 'Put it together',
                      body: 'Role, goal, format, then the facts it needs.',
                      code: 'You are an editor who writes for busy clients.\nGoal: get Lucía to approve the palette by Wednesday.\nFormat: five lines, one question at the end.\nFacts: sign-up screens done; testing moved to Friday.',
                      language: 'plaintext',
                    },
                  ],
                },
                {
                  kind: 'reading',
                  title: 'Always check the answer',
                  html:
                    '<p>A good prompt makes a good first draft. It does not make a finished one.</p><p>Before you send anything an AI tool wrote, read it as the person receiving it. Check three things:</p><ul><li><strong>Facts</strong>: is every date, name and number one you gave it?</li><li><strong>Tone</strong>: would you say it like this?</li><li><strong>The ask</strong>: is it obvious what the reader should do next?</li></ul><p>If any answer is no, fix it yourself or tell the AI exactly what to change.</p>',
                },
                { kind: 'callout', tone: 'remember', text: 'Role, goal, format, facts. Then check before you send.' },
              ],
              apply: {
                items: [
                  {
                    kind: 'mcq',
                    prompt: 'Which part tells the AI the shape of the answer?',
                    options: [{ text: 'Role' }, { text: 'Goal' }, { text: 'Format' }],
                    answer: 2,
                  },
                  {
                    kind: 'typeAnswer',
                    prompt: 'Name the part of a prompt that says who the AI should act as.',
                    answers: ['role', 'the role'],
                  },
                  {
                    kind: 'sortGroups',
                    prompt: 'Role, goal or format?',
                    groups: ['Role', 'Goal', 'Format'],
                    items: [
                      { text: 'You are a friendly recruiter', group: 0 },
                      { text: 'Get a reply before Friday', group: 1 },
                      { text: 'Use a table with 3 columns', group: 2 },
                    ],
                  },
                  {
                    kind: 'tapBuild',
                    prompt: 'Build the format instruction.',
                    tiles: ['Reply', 'in', 'one', 'short', 'paragraph'],
                    distractors: ['essay'],
                  },
                ],
              },
              reflect: { prompt: 'Rewrite one request you made this week using role, goal and format.' },
            },
          ],
        },
        {
          key: 'u02',
          title: 'Python in the browser',
          goal: 'Check Try it live and Write and run on a phone-size screen.',
          lessons: [
            {
              key: 'l01',
              title: 'Your first Python',
              summary: 'Run real Python, then write some yourself.',
              minutes: 10,
              outcomes: ['Run code in a lesson', 'Write a program that passes its checks'],
              learn: [
                {
                  kind: 'tryIt',
                  title: 'Try it live',
                  caption: 'This is real Python. Press Run.',
                  code: 'name = "Ada"\nprint(f"Hello, {name}!")\n',
                  challenge: 'Change "Ada" to your own name and run it again.',
                },
                {
                  kind: 'tryIt',
                  title: 'Programs can ask questions',
                  code: 'name = input("What is your name? ")\nprint("Nice to meet you,", name)\n',
                  stdin: ['Kofi'],
                },
              ],
              apply: {
                scenario: "Ada's office savings group.",
                items: [
                  {
                    kind: 'writeCode',
                    prompt: 'Work out the monthly pot',
                    starter: 'members = 10\ncontribution = 20000\n',
                    solution: 'members = 10\ncontribution = 20000\npot = members * contribution\nprint(pot)\n',
                    hint: 'Multiply with *, save it with pot = ..., then print(pot).',
                    checks: [
                      { message: 'Make a variable called pot holding the total', expr: 'pot == 200000' },
                      { message: 'Print the pot', outputIncludes: '200000' },
                    ],
                  },
                  {
                    kind: 'mcq',
                    variant: 'predictOutput',
                    prompt: 'What does this print?',
                    code: 'print(3 * "ha")',
                    language: 'python',
                    options: [{ text: 'hahaha' }, { text: '3ha', why: 'Multiplying text repeats it.' }, { text: 'An error', why: 'Text times a number is allowed.' }],
                    answer: 0,
                  },
                  {
                    kind: 'writeCode',
                    prompt: 'Greet whoever runs it',
                    starter: '',
                    solution: 'name = input("Name: ")\nprint(f"Welcome to the ajo, {name}!")\n',
                    hint: 'Save input() in a variable, then print a greeting that uses it.',
                    stdin: ['Tunde'],
                    checks: [
                      { message: 'Ask for a name with input()', codeIncludes: 'input(' },
                      { message: 'Greet Tunde by name', outputIncludes: 'Tunde' },
                    ],
                  },
                ],
              },
              reflect: { prompt: 'What surprised you about writing your first program?' },
            },
          ],
        },
      ],
    },
  ],
};

export default track;
