import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 6 — Paul's first code review: reading feedback as a map of standards. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Paul\'s first review',
  summary: 'Clinton\'s first small pull request comes back from Paul with five comments. His stomach drops. Then Miracle says: "Read them as a map of how this team works." Tap each comment.',
  minutes: 11,
  outcomes: ['Read review comments as standards, not attacks', 'Spot what each comment teaches', 'Respond to a review professionally'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each of Paul\'s comments',
      text: 'Name this retryFailedSync, not doStuff2.\nAdd a test for the case where the phone is offline.\nWe log errors with the request ID here, not console.log.\nThis is good. Small and clear.\nCheck the README for how we write commit messages.',
      hotspots: [
        { phrase: 'Name this retryFailedSync, not doStuff2.', note: 'A naming standard: names say what code does. Fix it once, and you\'ll never get this comment again.' },
        { phrase: 'Add a test for the case where the phone is offline.', note: 'The team expects tests for edge cases. Clinton already learned this from Njangi Pay\'s "light on testing" feedback.' },
        { phrase: 'We log errors with the request ID here', note: '"Here" is the key word: a team habit you couldn\'t know on day 10. Write it in your notes doc.' },
        { phrase: 'This is good. Small and clear.', note: 'Praise from Paul, rare and specific. It tells Clinton what to keep doing: small, clear changes.' },
        { phrase: 'Check the README for how we write commit messages.', note: 'Paul points him to the docs instead of explaining. Read them, and don\'t ask this one again.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Review comments are a map of the team\'s standards. Fix, note, thank, and never get the same comment twice.',
    },
  ],
  apply: {
    scenario: 'Clinton reads Paul\'s review.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How should Clinton read the five comments?',
        options: [
          { text: 'As a map of the team\'s standards' },
          { text: 'As proof Paul dislikes him', why: 'One comment is praise. They\'re standards.' },
          { text: 'As optional suggestions to ignore', why: 'They\'re the team\'s standards.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A team standard, or praise?',
        groups: ['Standard', 'Praise'],
        items: [
          { text: 'Name things by what they do', group: 0 },
          { text: 'This is good. Small and clear.', group: 1 },
          { text: 'Test the offline case', group: 0 },
          { text: 'Log errors with the request ID', group: 0 },
          { text: 'Commit messages follow the README', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each comment to what it teaches.',
        pairs: [
          ['retryFailedSync, not doStuff2', 'Names say what code does'],
          ['Add an offline test', 'Edge cases need tests'],
          ['Check the README', 'Read docs before asking'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best reply to Paul.',
        from: 'clinton',
        message: 'How do I reply to his five comments?',
        options: [
          { text: '"Thanks, Paul. All fixed, test added, and I\'ve noted the logging rule in our onboarding doc."' },
          { text: '"Why so many comments?"', why: 'Fix, note and thank.' },
          { text: 'Fix silently, never reply.', why: 'A short thanks shows you read them.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the unhelpful reaction.',
        lines: ['Writes the logging rule in his notes.', 'Decides Paul is out to get him.', 'Adds the offline test.'],
        bug: 1,
        explanation: 'One comment was praise. They\'re standards, not attacks.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s response in order.',
        lines: ['Read every comment calmly', 'Fix each one', 'Note team habits in his doc', 'Thank Paul and reply'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What does the word "here" tell Clinton?',
        options: [
          { text: 'It\'s a team habit he couldn\'t have known yet' },
          { text: 'He\'s bad at coding', why: 'It\'s a local habit, not a skill gap.' },
          { text: 'Nothing', why: 'It marks a team-specific rule.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Fix, note, [[1]], and never get the same comment [[2]].',
        blanks: [['thank'], ['twice']],
        distractors: ['argue', 'again', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many comments did Paul leave? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good review habit, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Keeping a list of team standards', group: 0 },
          { text: 'Arguing every comment', group: 1 },
          { text: 'Reading the README first next time', group: 0 },
          { text: 'Taking it personally', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of feedback on your work that felt harsh. If you read it as a "map of standards", what did it teach you?',
    starters: ['The feedback was...', 'It taught me...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Start a "standards" list for your team, course or job: every rule you learn from feedback, so you never get the same comment twice.',
  },
  notes: 'Code review norms vary by team; the general lesson applies to any feedback on work.',
};

export default lesson;
