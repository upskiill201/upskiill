import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 1 — opens the chapter: "I'll look you up." Clinton's profile is not ready. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"I\'ll look you up"',
  summary: 'Brenda ends her interview invitation with five words: "I\'ll look you up first." Clinton opens his LinkedIn profile. The photo is from a party. The headline says "Student at UB". The About section is empty.',
  minutes: 11,
  outcomes: ['Explain why recruiters look you up online', 'Spot what a weak profile says about you', 'Decide what to fix first'],
  learn: [
    {
      kind: 'story',
      title: 'Five words',
      beats: [
        { speaker: 'narrator', text: 'Saturday. Four months to graduation. The interview invitation from Njangi Pay is still on Clinton\'s screen. He reads the last line again: "Looking forward to it. I\'ll look you up first. Brenda."' },
        { speaker: 'clinton', text: 'Look me up? Where?' },
        { speaker: 'narrator', text: 'He searches his own name. First result: his LinkedIn. The photo is him at a cousin\'s wedding, holding a drink, half his face cut off. Headline: "Student at UB". About: empty. Experience: empty.' },
        { speaker: 'miracle', text: 'When I invite someone to interview, I check their LinkedIn the same day. I\'m not looking for perfection. I\'m checking that the person in the CV is real, and seeing what else they\'ve done.' },
        { speaker: 'tey', text: 'Your CV goes where you send it. Your profile is where people find you, even when you haven\'t sent anything. It works for you while you sleep, or against you.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Fix the basics tonight: photo, headline and About, then build the rest this week.',
            outcome: 'By midnight he has a clear photo, a headline that says what he does, and a short About with the Njangi Tracker in it. When Brenda looks on Monday, she sees the same person as the CV.',
            best: true,
          },
          {
            text: 'Delete his LinkedIn so there\'s nothing to see.',
            outcome: 'Now she finds nothing, which can look stranger than a weak profile. And he loses the place recruiters search for people like him.',
          },
          {
            text: 'Leave it. The CV is what matters.',
            outcome: 'Brenda sees a party photo and an empty page next to a strong CV. It doesn\'t ruin him, but it doesn\'t help, and it wastes a free chance to stand out.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Recruiters look you up. A clear, honest profile that matches your CV builds trust; an empty one wastes the chance.',
    },
  ],
  apply: {
    scenario: 'Clinton checks what Brenda will see.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does Miracle check candidates\' LinkedIn profiles?',
        options: [
          { text: 'To check the person in the CV is real and see what else they\'ve done' },
          { text: 'To find reasons to reject them', why: 'Mostly to check and learn more, not to hunt for flaws.' },
          { text: 'To count their followers', why: 'Followers matter little for graduates.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps or hurts Clinton\'s first impression?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'A clear photo of his face', group: 0 },
          { text: 'A party photo with half his face cut off', group: 1 },
          { text: 'A headline that says what he does', group: 0 },
          { text: 'An empty About section', group: 1 },
          { text: 'The Njangi Tracker in his profile', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Should I just delete LinkedIn so there\'s nothing embarrassing?',
        options: [
          { text: 'No: an empty search can look odd, and recruiters search there. I\'ll fix the basics tonight.' },
          { text: 'Yes, delete everything online.', why: 'He\'d lose a free place recruiters find people.' },
          { text: 'Make a fake account with a better name.', why: 'Never. Be findable as yourself.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'How is a profile different from a CV?',
        options: [
          { text: 'People find your profile even when you haven\'t sent them anything' },
          { text: 'A profile is private', why: 'Most of it is public by default. That\'s the point.' },
          { text: 'They\'re identical', why: 'Similar content, different job: one you send, one people find.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap what Clinton should fix first.',
        lines: ['Name: Clinton Ndi', 'Headline: Student at UB', 'Location: Buea, Cameroon'],
        bug: 1,
        fix: 'Headline: Final-year CS student · Built a savings tracker used by 42 people',
        explanation: '"Student at UB" says almost nothing. The headline shows up everywhere he appears.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its first fix.',
        pairs: [
          ['Photo', 'Clear face, good light, plain background'],
          ['Headline', 'What you do, plus proof'],
          ['About', 'A short story with your best project'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s line.',
        template: 'Your profile works for you while you [[1]], or [[2]] you.',
        blanks: [['sleep'], ['against']],
        distractors: ['eat', 'with', 'for'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Brenda will look on Monday. What does Clinton fix tonight?',
        options: [
          { text: 'Photo, headline and About' },
          { text: 'Nothing, Monday is far away', why: 'It\'s two days. Fix the basics now.' },
          { text: 'His follower count', why: 'Irrelevant for a graduate interview.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The short line under your name on LinkedIn is called the ___. (one word)',
        answers: ['headline'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it match his CV?',
        groups: ['Matches', 'Doesn\'t'],
        items: [
          { text: 'Njangi Tracker in both', group: 0 },
          { text: 'GPA 3.0 on LinkedIn, 2.94 on the CV', group: 1 },
          { text: 'Same dates for the meet-up role', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Search your own name online right now. What does a stranger see first? What would you want them to see?',
    starters: ['They see...', 'I\'d want them to see...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Search your name in a private browser window. Write down the first three results. If none of them are about your work, this chapter is for you.',
  },
  notes: 'Recruiters commonly review candidates\' online profiles before interviews (standard practice; no percentage claimed). LinkedIn is used as the example network because it\'s the most widely used professional network; the same principles apply to other platforms. Opens Chapter 5 of How to Get Noticed by Employers.',
};

export default lesson;
