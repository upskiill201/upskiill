import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Walkthrough: AI as a proofreader. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The proofreader',
  summary: 'Lucía\'s thank-you letter to Doña Lupe is ready. She asks AI to "proofread it" and gets back a different letter where Mamá is now called "Rose". Walk through the safer way to proofread.',
  minutes: 12,
  outcomes: [
    'Ask for a list of changes instead of a rewrite',
    'Accept or reject each change yourself',
    'Check names, dates and numbers by hand',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Proofreading without losing your letter',
      steps: [
        { title: '1. Don\'t ask for a new version', body: '"Proofread this" often comes back rewritten. Lucía\'s letter came back with new sentences, and Mamá had become "Rose".' },
        { title: '2. Ask for a list instead', body: '"List any spelling, grammar or clarity problems as a numbered list: the original words, your suggestion, and why. Don\'t rewrite the letter."' },
        { title: '3. Decide on each one', body: 'Seven suggestions. She accepts four (two typos, a missing word, a confusing sentence) and rejects three that would have made it sound less like her.' },
        { title: '4. Check the facts by hand', body: 'AI can quietly "fix" names and numbers. She checks every name (Rosa, not Rose; Doña Lupe), every date and every amount herself.' },
        { title: '5. Read it aloud', body: 'The last check is old-fashioned and free. Anything she stumbles over, she fixes. Then she sends it.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Proofreading prompt: "List the problems with original, suggestion and why. Don\'t rewrite." You stay the author; it stays the proofreader.',
    },
  ],
  apply: {
    scenario: 'Proofreading the thank-you letter.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Mamá become "Rose"?',
        options: [
          { text: 'AI "corrected" a name it thought was a typo, and nobody checked' },
          { text: 'Lucía spelled it wrong', why: 'She wrote Rosa, correctly.' },
          { text: 'Rose is the English for Rosa, so it\'s fine', why: 'It\'s her mother\'s name. It\'s not fine.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the proofreading method.',
        lines: ['Ask for a list, not a rewrite', 'Read each suggestion', 'Accept or reject each one', 'Check names, dates and numbers', 'Read it aloud and send'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The proofreading prompt.',
        template: 'List the problems with original, suggestion and [[1]]. Don\'t [[2]] the letter.',
        blanks: [['why', 'reason'], ['rewrite']],
        distractors: ['price', 'send'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Accept or reject the suggestion?',
        groups: ['Accept', 'Reject'],
        items: [
          { text: 'Fix "recieve" to "receive"', group: 0 },
          { text: 'Change "Rosa" to "Rose"', group: 1 },
          { text: 'Add a missing "the"', group: 0 },
          { text: 'Replace her joke with "We are truly grateful"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'sofia',
        message: 'Why not just accept all its changes? It\'s better at grammar than us.',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'You\'re right, accept everything.', why: 'That\'s how Mamá became Rose.' },
          { text: 'Grammar, maybe. But it also changed a name and cut my joke. I decide each one.' },
          { text: 'Grammar doesn\'t matter.', why: 'It does; she just keeps control.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the check to what it catches.',
        pairs: [
          ['The list of changes', 'Typos and unclear sentences'],
          ['Accept or reject', 'Changes that lose your voice'],
          ['Checking names by hand', 'Rosa turned into Rose'],
          ['Reading aloud', 'Sentences that trip you up'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which suggestion from the AI\'s list should Lucía reject?',
        lines: [
          '"definately" → "definitely" (spelling)',
          '"Doña Lupe" → "Mrs Lupe" (more formal)',
          '"thank you for to help" → "thank you for helping" (grammar)',
        ],
        bug: 1,
        fix: 'Keep "Doña Lupe".',
        explanation: 'It\'s how she addresses her, respectfully, in Mexico. A "correction" that erases it is wrong.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s Lucía\'s mother\'s real name?',
        answers: ['Rosa'],
        placeholder: 'Name',
      },
      {
        kind: 'mcq',
        prompt: 'Which things should you always check by hand after AI edits?',
        options: [
          { text: 'Only the first line', why: 'Names and numbers can change anywhere.' },
          { text: 'The font', why: 'Not the risk here.' },
          { text: 'Names, dates, amounts and places' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt is the safe proofreading prompt?',
        options: [
          { text: 'Make this perfect.', why: 'Invites a full rewrite.' },
          { text: 'List spelling, grammar and clarity problems: original, suggestion, why. Don\'t rewrite it, and don\'t change any names.' },
          { text: 'Proofread and improve.', why: '"Improve" means rewrite.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever had autocorrect or an AI tool "fix" something that was right? What did you learn?',
    starters: ['It changed...', 'I learned...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Take something you wrote this week. Ask an AI tool for a list of problems (original, suggestion, why) without a rewrite. Accept only the ones you agree with.',
  },
  notes: '"Doña" is a common respectful title in Mexico. Proofreading-as-list is general advice to keep authorship and catch unwanted changes.',
};

export default lesson;
