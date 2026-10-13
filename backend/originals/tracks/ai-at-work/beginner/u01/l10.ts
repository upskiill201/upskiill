import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9, with lessons 1–4 mixed in. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: readers, examples, options',
  summary: 'Who it is for, showing what good looks like, choosing between options, and steering. All mixed together.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can tailor, show, choose and steer', 'Combine it with Who, What, Why, How'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint two! Since the last one you learned four moves. Can you name one?', replies: ["Say who it's for", 'Show an example', 'Ask for options'] },
        { tey: 'Yes. And the fourth: steer with a follow-up instead of starting over. Today mixes all four with the basics.' },
        { tey: 'Fair warning: some of these have two answers that look right. Read carefully. Let\'s go.' },
      ],
    },
  ],
  apply: {
    scenario: "Checkpoint: Ada's launch week.",
    items: [
      {
        kind: 'mcq',
        prompt: 'Which reader description helps the AI most?',
        options: [
          { text: '"For an important client"', why: 'Important how? No useful detail.' },
          { text: '"For Lucía, a client who reads on her phone and does not know technical terms"' },
          { text: '"For a person"', why: 'Says nothing about how to write.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which move is this?',
        groups: ['Reader', 'Example', 'Options'],
        items: [
          { text: 'For my manager, who likes 3 bullets', group: 0 },
          { text: 'Here is an update she liked: [example]', group: 1 },
          { text: 'Give me 4 versions in different styles', group: 2 },
          { text: 'For a new colleague on day one', group: 0 },
          { text: 'Match the tone of this intro: [intro]', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'What does "blocked on client" mean in your update?',
        prompt: 'Ada used developer language. Which reply is best?',
        options: [
          { text: "Sorry, jargon! It means we just need your OK on the colours to keep going." },
          { text: 'It is a status in our tracking tool.', why: 'Still jargon. Translate it.' },
          { text: 'Nothing important.', why: 'It is important: it is the one thing she needs to do.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a follow-up that protects the good part.',
        tiles: ['Keep', 'the', 'first', 'line,', 'shorten', 'the', 'rest'],
        distractors: ['delete', 'all'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the risky line in this example request.',
        lines: [
          'Here is a client email I liked:',
          '"Dear Mr Okoro, your account number 0042-1187 is now active..."',
          'Write my welcome email in the same warm tone.',
        ],
        bug: 1,
        fix: '"Dear [name], your account is now active..."',
        explanation: 'Remove private details from examples before pasting them.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the lesson to its move.',
        pairs: [
          ["Say who it's for", 'Tailors tone and length'],
          ['Show what good looks like', 'Pins down the style'],
          ['Ask for options', 'Gives you a choice'],
          ["Steer, don't start over", 'Fixes a nearly-right draft'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'When a draft is nearly right, you should ... it (one word)',
        answers: ['steer', 'refine', 'edit', 'fix'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Lucía needs a launch subject line by tonight. Which request is best?',
        options: [
          { text: 'Write a subject line.', why: 'One guess, no reader, no style.' },
          { text: 'Write 20 subject lines.', why: 'Too many, and probably all alike.' },
          {
            text: 'Give me 4 subject lines for our sign-up launch email to existing customers, each a different style (curious, benefit, short, playful), under 8 words.',
          },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the "show it" request.',
        template: 'Here is an intro Lucía [[1]]: [example]. Match its [[2]], but write about the new [[3]] flow.',
        blanks: [['liked', 'loved'], ['tone', 'style'], ['sign-up']],
        distractors: ['hated', 'typos', 'pricing'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Steer the draft, or start a new chat?',
        groups: ['Steer', 'New chat'],
        items: [
          { text: 'The tone is a bit stiff', group: 0 },
          { text: 'It keeps mentioning last month\'s prices', group: 1 },
          { text: 'One paragraph is too long', group: 0 },
          { text: 'You need help with a totally different task', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Option 1 has the best start, option 3 the best ending. Can we merge them?',
        prompt: 'Which request should Ada give the AI?',
        options: [
          { text: 'Combine the start of option 1 with the ending of option 3. Keep it under 8 words.' },
          { text: 'Give us brand new options.', why: 'They already found what they like. Combine it.' },
          { text: 'Pick the best one for us.', why: 'Lucía already decided. Do what she asked.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s full routine for an important message.',
        lines: [
          'Say who it is for',
          'Give the facts and the goal',
          'Ask for 3 options in different styles',
          'Pick one and steer it with a specific follow-up',
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The AI picked "option 3, the urgent one" as best. Ada\'s customers dislike urgency. What now?',
        options: [
          { text: 'Choose another option. The AI\'s pick is a suggestion; Ada knows her audience.' },
          { text: 'Use option 3, the AI knows best.', why: 'It does not know her customers.' },
          { text: 'Ask it to pick again until it agrees.', why: 'Just decide.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: "Show, don't ... (one word)",
        answers: ['describe', 'tell'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the reader to what they need.',
        pairs: [
          ['Busy CEO', 'Outcome first, two sentences'],
          ['New colleague', 'Context and plain explanations'],
          ['Developers', 'Exact technical details'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the vague follow-up.',
        lines: ['Keep the subject line.', 'Make it better.', 'End with a question about Wednesday.'],
        bug: 1,
        fix: 'Cut the middle paragraph to one sentence.',
      },
      {
        kind: 'sortGroups',
        prompt: 'True or false?',
        groups: ['True', 'False'],
        items: [
          { text: 'One message rarely fits two very different readers', group: 0 },
          { text: 'The AI copies mistakes in your examples too', group: 0 },
          { text: 'More options is always better, so ask for 50', group: 1 },
          { text: 'A follow-up should say what to keep', group: 0 },
          { text: 'Starting a new chat is always better', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Can your team send the update in a way our CEO and our developers will both be happy with?",
        prompt: 'What should Ada do?',
        options: [
          { text: 'Ask the AI for two versions: a 2-line one for the CEO, a detailed one for the developers.' },
          { text: 'Send one long version to both.', why: 'Too long for the CEO, too vague for the developers.' },
          { text: 'Send only the technical version.', why: 'The CEO will not read it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s steering rule.',
        template: 'Nearly right? [[1]] it. Totally wrong, or a new topic? Start [[2]].',
        blanks: [['Steer', 'steer'], ['fresh', 'over']],
        distractors: ['Delete', 'never'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Back to basics. Which request covers Who, What, Why and How?',
        options: [
          { text: 'Write to Lucía about testing.', why: 'Who and a hint of What. No Why, no How.' },
          {
            text: 'Write to Lucía, our client. Testing moved to Friday because of a sign-up bug. I need her OK on the palette by Wednesday. 4 friendly lines.',
          },
          { text: 'Write a great email.', why: 'None of the four.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the request for different options.',
        tiles: ['3', 'versions,', 'each', 'a', 'different', 'style'],
        distractors: ['identical', 'maybe'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Before pasting an example, remove anything ... (one word)',
        answers: ['private', 'personal', 'confidential', 'sensitive'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the "show it" pattern.',
        lines: ['Paste the example', 'Say what to copy', 'Say what is different this time'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to the fix.',
        pairs: [
          ['Style keeps coming out wrong', 'Show an example'],
          ['Answer is a single guess', 'Ask for options'],
          ['Draft is nearly right', 'Steer it'],
          ['Wrong tone for the reader', "Say who it's for"],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which follow-up will get exactly what Ada wants?',
        options: [
          { text: '"Do it again"', why: 'Again how?' },
          { text: '"Keep lines 1 and 2. Make line 3 ask Lucía to approve by Wednesday."' },
          { text: '"Improve it"', why: 'Improve what?' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Who decides?',
        groups: ['Ada', 'The AI suggests'],
        items: [
          { text: 'Which subject line goes out', group: 0 },
          { text: 'Four styles of subject line', group: 1 },
          { text: 'Whether its reasons make sense', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the four moves (reader, example, options, steer) will save you the most time at work? Why?',
    starters: ['The move that helps me most is...', 'Because...'],
  },
  deepen: { title: 'Keep going', summary: 'Use all four moves on one real message this week.' },
  notes: 'Review only. No new claims.',
};

export default lesson;
