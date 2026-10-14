import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 16 — everything so far, packed into one reusable template. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Your reusable prompt recipe',
  summary: 'One template with blanks. Fill it in, and every request starts strong.',
  minutes: 13,
  outcomes: [
    'Use one reusable template for most work requests',
    'Fill in only the parts a task needs',
    'Save the template where you can reach it in seconds',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The Teyro request recipe',
      html:
        '<p>You now know every ingredient of a strong request. Here they are as one template you can copy and keep.</p>' +
        '<pre><code>Role: You are a [role].\nReader: This is for [who], who [how they read / what they know].\nFacts: [what happened, numbers, dates. Only use these.]\nGoal: I need this to [what it must achieve].\nFormat: [shape], [length], [tone].\nIf anything is unclear, ask me instead of guessing.</code></pre>' +
        '<p><strong>You will not need every line every time.</strong> A two-line chat reply needs the reader, the facts and the length. A proposal needs all of it.</p>' +
        '<p>Three habits make the recipe stick:</p>' +
        '<ol>' +
        '<li><strong>Save it</strong> in a note, a text shortcut, or your AI tool\'s saved instructions, if it has them.</li>' +
        '<li><strong>Fill the blanks, delete the rest.</strong> Empty lines are fine to remove.</li>' +
        '<li><strong>Then steer.</strong> The recipe gets a strong first draft; one follow-up usually finishes it.</li>' +
        '</ol>',
    },
    {
      kind: 'steps',
      title: "Ada fills it in",
      steps: [
        { title: 'Role', body: 'You are an editor who writes for busy clients.' },
        { title: 'Reader', body: 'This is for Lucía, a client who reads on her phone and does not know technical terms.' },
        { title: 'Facts', body: 'Sign-up screens are done. Testing moved to Friday because of a bug. Only use these facts.' },
        { title: 'Goal and format', body: 'I need her to approve the colours by Wednesday. 4 lines, friendly, the ask in the last line.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Role, Reader, Facts, Goal, Format. Plus: ask instead of guessing.',
    },
    {
      kind: 'check',
      question: 'Do you need every line of the recipe every time?',
      options: ['Yes, always', 'No. Use what the task needs and delete the rest', 'Only the role'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is making the recipe her own.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the recipe lines in order.',
        lines: ['Role', 'Reader', 'Facts', 'Goal', 'Format', 'Ask instead of guessing'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each recipe line to Ada\'s words.',
        pairs: [
          ['Role', '"You are an editor for busy clients"'],
          ['Reader', '"For Lucía, who reads on her phone"'],
          ['Facts', '"Testing moved to Friday"'],
          ['Goal', '"Get her OK on the colours"'],
          ['Format', '"4 friendly lines"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Ada needs a 2-line chat reply to a teammate. Which recipe lines matter most?',
        options: [
          { text: 'Reader, facts and length' },
          { text: 'All six, always', why: 'Overkill for a 2-line reply.' },
          { text: 'Only the role', why: 'The role alone gives no facts or length.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the recipe.',
        template: 'Role: You are a [[1]]. Reader: This is for [[2]]. Format: [[3]] lines, friendly.',
        blanks: [['recruiter', 'editor', 'teacher'], ['Lucía', 'my manager'], ['4', 'four', '3', 'three']],
        distractors: ['wizard', '400'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Where could Ada save her recipe so it is quick to reach?',
        groups: ['Good place', 'Not practical'],
        items: [
          { text: 'A note on her phone', group: 0 },
          { text: 'A text shortcut on her laptop', group: 0 },
          { text: 'Her memory, rebuilt from scratch each time', group: 1 },
          { text: 'Her AI tool\'s saved instructions, if it has them', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The recipe line that stops invented facts says: "Only use ..." (two words)',
        answers: ['these facts', 'these', 'my facts', 'the facts'],
        placeholder: 'Two words',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the recipe\'s Goal line.',
        tiles: ['I', 'need', 'this', 'to', 'get', 'a', 'yes', 'by', 'Wednesday'],
        distractors: ['maybe', 'sometime'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Your messages lately are so consistent and clear. What's your secret?",
        prompt: "What's Ada's honest answer?",
        options: [
          { text: 'I use a little template for AI requests: who it is for, the facts, the goal and the format. Then I edit.' },
          { text: 'The AI does it all by itself.', why: 'The template and her edits do most of the work.' },
          { text: "It's a secret.", why: 'Sharing it builds trust. And it is not complicated.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Spot the line that weakens this filled-in recipe.',
        lines: [
          'Role: You are a recruiter.',
          'Reader: For a junior designer applying to us.',
          'Facts: Interview is Tuesday at 10, on video.',
          'Format: whatever you like.',
        ],
        bug: 3,
        fix: 'Format: 4 friendly lines, with the video link at the end.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which filled-in recipe will get the best interview invitation?',
        options: [
          { text: 'Write an interview invite.', why: 'No recipe used: no facts, no reader.' },
          {
            text: 'Role: friendly recruiter. Reader: a junior designer, nervous about interviews. Facts: Tuesday 10am, 30 min video call, portfolio review. Goal: they feel prepared. Format: 5 lines, warm.',
          },
          { text: 'Role: recruiter. Write something.', why: 'Only one line filled.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which recipe lines does each task need most?',
        groups: ['Just reader + facts + length', 'The full recipe'],
        items: [
          { text: 'A quick "got it, thanks" chat reply', group: 0 },
          { text: 'A one-page proposal to leadership', group: 1 },
          { text: 'Confirming a meeting time', group: 0 },
          { text: 'A launch announcement to all customers', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'After the recipe gets a strong first draft, you ... it with a follow-up (one word)',
        answers: ['steer', 'refine', 'edit'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the habit to why it helps.',
        pairs: [
          ['Save the recipe', 'Ready in seconds'],
          ['Delete empty lines', 'Keeps requests short'],
          ['Steer after', 'Finishes the draft'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the recipe in one line.',
        template: 'Role, [[1]], Facts, [[2]], Format. Plus: ask instead of [[3]].',
        blanks: [['Reader'], ['Goal'], ['guessing']],
        distractors: ['Budget', 'Luck', 'waiting'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a saved recipe better than remembering the ideas?',
        options: [
          { text: 'Under time pressure you forget pieces; the template never does' },
          { text: 'It makes the AI faster', why: 'It makes YOU faster and more consistent.' },
          { text: 'Templates are required by AI tools', why: 'They are not required, just useful.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own version of the recipe in the words you would actually use. Where will you save it?',
    starters: ['My recipe:', 'I will save it in...'],
  },
  deepen: { title: 'Do it now', summary: 'Copy the recipe into a note on your phone before the next lesson.' },
  notes: '"Saved instructions" referenced generically ("if it has them") since features vary by product.',
};

export default lesson;
