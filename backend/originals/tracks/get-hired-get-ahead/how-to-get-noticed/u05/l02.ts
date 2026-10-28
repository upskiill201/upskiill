import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 2 — how recruiters use LinkedIn. Reading. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'How recruiters use LinkedIn',
  summary: 'Miracle shares her screen and shows Clinton the recruiter side of LinkedIn: the search bar where she types skills and cities, and what makes her click on one profile and not another.',
  minutes: 11,
  outcomes: ['Explain the two ways recruiters use profiles', 'Know what makes a profile show up in searches', 'Know what makes a recruiter click'],
  learn: [
    {
      kind: 'reading',
      title: 'Two ways you get found',
      html:
        '<p><strong>LinkedIn</strong> is a professional social network: profiles instead of photo albums, jobs instead of memes. LinkedIn says it has more than a billion members worldwide, and many recruiters use it every day.</p>' +
        '<p>Recruiters use your profile in two ways:</p>' +
        '<ul><li><strong>Checking you.</strong> After you apply, they look you up to confirm your CV and see more: projects, recommendations, posts.</li>' +
        '<li><strong>Finding you.</strong> Before you apply, they search for people: by skill ("JavaScript"), job title ("graduate developer"), location ("Douala") and school. If your profile uses those words, you can show up even when you didn\'t apply anywhere.</li></ul>' +
        '<p><strong>What decides whether they click?</strong> In search results they see only three things: your <strong>photo</strong>, your <strong>name</strong> and your <strong>headline</strong>. That\'s why those three matter most. Once they click, the <strong>About</strong> section and your <strong>experience</strong> decide whether they keep reading.</p>' +
        '<p>Other networks matter too: GitHub for developers, Behance for designers, local job boards. The same rules apply everywhere: a clear photo, words that say what you do, and proof.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'In search results, recruiters see only your photo, name and headline. Make those three count.',
    },
  ],
  apply: {
    scenario: 'Miracle shows the recruiter side.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What are the two ways recruiters use profiles?',
        options: [
          { text: 'Liking your posts and sending memes', why: 'Not really. Checking and finding.' },
          { text: 'Checking you after you apply, and finding you before you apply' },
          { text: 'Only for senior people', why: 'Graduates get searched for too.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What do recruiters see in search results, before they click?',
        options: [
          { text: 'Your whole profile', why: 'Only three things show before the click.' },
          { text: 'Your CV', why: 'Your CV isn\'t shown in search results.' },
          { text: 'Photo, name and headline' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps Clinton show up in a search for "graduate developer Douala", or not?',
        groups: ['Helps', 'Doesn\'t help'],
        items: [
          { text: 'Headline mentions "developer" and his skills', group: 0 },
          { text: 'Location set to Buea/Douala area', group: 0 },
          { text: 'Headline: "Living my best life"', group: 1 },
          { text: 'Skills listed: JavaScript, Python', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'So recruiters can find me even if I never applied?',
        options: [
          { text: 'Yes, if my profile uses the words they search for: skills, role, location.' },
          { text: 'No, only if I apply.', why: 'They search for people too.' },
          { text: 'Only if I pay.', why: 'A free profile can be found.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each network to who it suits.',
        pairs: [
          ['LinkedIn', 'Most professional roles'],
          ['GitHub', 'Developers\' code'],
          ['Behance', 'Designers\' work'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the profile part that won\'t help Clinton get found.',
        lines: ['Headline: Final-year CS student · JavaScript, Python', 'Location: Buea, Cameroon', 'Headline: Just vibing'],
        bug: 2,
        explanation: 'Nobody searches for "vibing". Use the words recruiters type.',
      },
      {
        kind: 'mcq',
        prompt: 'Once a recruiter clicks, what decides whether they keep reading?',
        options: [
          { text: 'Your number of connections', why: 'Less important than what you\'ve done.' },
          { text: 'Your background colour', why: 'Content matters more.' },
          { text: 'The About section and experience' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the idea.',
        template: 'Recruiters [[1]] you after you apply, and [[2]] you before you apply.',
        blanks: [['check'], ['find']],
        distractors: ['ignore', 'pay', 'block'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'LinkedIn says it has more than a ___ members. (one word)',
        answers: ['billion'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which headline would show up in a search AND get a click?',
        options: [
          { text: '"Student"', why: 'Too vague to be searched for or clicked.' },
          { text: '"Final-year CS student · JavaScript & Python · Built a savings tracker used by 42 people"' },
          { text: '"Future billionaire"', why: 'Fun, but nobody searches for it.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'If a recruiter searched for the job you want, what words would they type? Are those words on your profile?',
    starters: ['They\'d type...', 'My profile says...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Search LinkedIn for the job title you want in your city. Look at the first five people. What do their headlines say? What makes you click on one?',
  },
  notes: 'LinkedIn states it has over 1 billion members (LinkedIn "About" pages, 2024 onward); stated as LinkedIn\'s own figure. Recruiter search by skills, titles and location is standard platform behaviour (LinkedIn Recruiter). No click-rate statistics claimed.',
};

export default lesson;
