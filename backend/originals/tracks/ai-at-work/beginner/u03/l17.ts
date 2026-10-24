import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 17 — summarising feedback: themes, counts, representative quotes, loud vs many, privacy. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Summarising feedback and surveys',
  summary: 'Two hundred comments become three themes, with numbers and real quotes. Done right, it is one of the most useful things AI does at work.',
  minutes: 14,
  outcomes: [
    'Group feedback into themes with counts and quotes',
    'Tell a loud minority from a real majority',
    'Protect people\'s privacy when you share feedback',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Vibes vs themes',
      before: {
        label: 'Vibes summary',
        text: 'Users mostly love the app but some are unhappy with sign-up. People want dark mode.',
      },
      after: {
        label: 'Theme summary (214 comments)',
        text:
          '1. Sign-up email step is confusing: 61 comments. "I never saw the error, I just got stuck."\n2. Want faster loading: 38 comments.\n3. Dark mode requests: 9 comments, mostly from one forum thread.\nPraise: 47 comments, mainly the design.',
      },
      notes: ['Counts show what is big and what is small.', 'A real quote makes each theme concrete.', 'Dark mode was loud, not big: 9 of 214.'],
    },
    {
      kind: 'reading',
      title: 'How to summarise feedback properly',
      html:
        '<ol>' +
        '<li><strong>Themes, not vibes.</strong> Group comments into themes. Separate complaints, suggestions and praise.</li>' +
        '<li><strong>Counts.</strong> How many comments mention each theme? Ask the AI to list the comment numbers for each theme, so you can check the count.</li>' +
        '<li><strong>Quotes.</strong> One or two real, representative quotes per theme. Real words persuade more than any summary.</li>' +
        '<li><strong>Loud vs many.</strong> Ten angry comments from one forum thread are not the same as fifty separate users quietly saying the same thing.</li>' +
        '<li><strong>Privacy.</strong> Remove names, emails and personal details before pasting feedback into an AI tool, and before sharing quotes.</li>' +
        '</ol>' +
        '<p><em>"Here are 214 numbered comments (names removed). Group them into themes: complaints, suggestions, praise. For each theme: count, the comment numbers, and one representative quote. Most common first."</em></p>' +
        '<p>AI tools can miscount with long lists. The comment numbers let you check the biggest themes yourself.</p>',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Feedback often contains names, emails and personal stories. Remove them before pasting or sharing.',
    },
    {
      kind: 'check',
      question: '9 of 214 comments ask for dark mode, all from one forum thread. That is...',
      options: ['The biggest theme', 'A loud minority', 'Nothing worth noting'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is making sense of 214 user comments.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the feedback summary routine.',
        lines: ['Remove names and personal details', 'Number the comments', 'Group into themes with counts', 'Add a representative quote each', 'Check the biggest counts yourself'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Complaint, suggestion or praise?',
        groups: ['Complaint', 'Suggestion', 'Praise'],
        items: [
          { text: '"I got stuck at the email step"', group: 0 },
          { text: '"Please add dark mode"', group: 1 },
          { text: '"Love the new design!"', group: 2 },
          { text: '"Loading is so slow"', group: 0 },
          { text: '"Could you add Google sign-in?"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask for the comment numbers behind each theme?',
        options: [
          { text: 'To make the summary longer', why: 'It is for checking.' },
          { text: 'So you can check the counts, because AI can miscount long lists' },
          { text: 'Numbers look scientific', why: 'They are for verification.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the theme instruction.',
        tiles: ['For', 'each', 'theme:', 'count,', 'comment', 'numbers,', 'one', 'quote'],
        distractors: ['vibes'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Our CEO read three angry tweets about pricing and wants to change it. Is pricing our biggest issue?",
        prompt: 'What should Ada suggest?',
        options: [
          { text: 'Yes, change pricing now.', why: 'Loud is not the same as many.' },
          { text: 'Ignore the tweets.', why: 'Count them alongside everything else.' },
          { text: "Let's theme all the feedback with counts first. Three loud tweets may be a small slice of what people actually say." },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Spot the privacy problem before sharing these quotes.',
        lines: ['"I got stuck at the email step." (user 14)', '"Sign-up took me ages." (user 52)', '"I\'m Maria Lopez, maria.l@mail.com, fix this!" (user 88)'],
        bug: 2,
        fix: '"Fix this!" (user 88)',
        explanation: 'Remove names and emails before sharing.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s feedback request.',
        template: 'Group these numbered comments into [[1]]. For each: count, comment numbers, and one representative [[2]]. Most [[3]] first.',
        blanks: [['themes'], ['quote'], ['common']],
        distractors: ['colours', 'emoji', 'recent'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ten angry comments from one thread are loud. Fifty separate users saying it are ... (one word)',
        answers: ['many', 'common', 'majority', 'widespread'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gives the most useful feedback summary?',
        options: [
          { text: 'What do people think?', why: 'Gets vibes, not themes.' },
          { text: '214 numbered comments, names removed: themes (complaints, suggestions, praise), count, comment numbers, one quote each, most common first.' },
          { text: 'Pick the 5 best comments.', why: 'Cherry-picking, not a summary.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the element to why it matters.',
        pairs: [
          ['Counts', 'Shows what is big'],
          ['Quotes', 'Makes it real and persuasive'],
          ['Comment numbers', 'Lets you check'],
          ['Removing names', 'Protects privacy'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe to paste into an AI tool, or clean first?',
        groups: ['Safe', 'Clean first'],
        items: [
          { text: '"Loading is slow"', group: 0 },
          { text: 'A comment with a phone number', group: 1 },
          { text: '"Great design!"', group: 0 },
          { text: 'A comment describing someone\'s medical condition', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "The AI says 70 comments mention speed, but when I checked the numbers it listed, only 38 do.",
        prompt: 'What should Ada say?',
        options: [
          { text: 'Use 70, it is bigger.', why: 'The checked number is the real one.' },
          { text: "Good catch: AI can miscount long lists. Trust the checked number, 38, and re-check the other big themes." },
          { text: 'Counting does not matter.', why: 'Counts decide priorities.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Group feedback into themes, not ... (one word)',
        answers: ['vibes', 'feelings', 'impressions'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the raw comment to its theme.',
        pairs: [
          ['"Never saw the error"', 'Sign-up confusion'],
          ['"Takes forever to open"', 'Speed'],
          ['"Beautiful colours"', 'Praise: design'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is a "representative" quote?',
        options: [
          { text: 'The angriest one', why: 'That is dramatic, not representative.' },
          { text: 'The longest one', why: 'Length does not make it typical.' },
          { text: 'One that says what many comments in the theme say' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What feedback do you receive (customer, team, survey)? How could themes with counts change what you work on?',
    starters: ['I get feedback from...', 'Counting themes might show...'],
  },
  deepen: { title: 'Try it today', summary: 'Theme your next batch of feedback with counts and comment numbers, then check the top theme yourself.' },
  notes: 'Comment counts and quotes are fictional. Thematic grouping is standard qualitative-analysis practice; AI miscounting described qualitatively.',
};

export default lesson;
