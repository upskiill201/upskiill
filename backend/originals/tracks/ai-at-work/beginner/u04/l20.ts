import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 20 — Unit Challenge. The launch deck, checked end to end. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: the launch deck, checked',
  summary: 'Lucía\'s launch deck goes to her CEO at noon. Every number, source, persona and promise in it passes through Ada first.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  xp: 30,
  outcomes: ['Use every Unit 4 skill on one real deck', 'Prove you can catch AI mistakes under time pressure'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 4\'s final challenge. Lucía\'s launch deck, 9am to noon. Numbers, sources, personas, a promise and one sent mistake.', replies: ['Let\'s go'] },
        { tey: 'Remember the theme: sure-sounding isn\'t true. Stakes first, sources always, and own what you send.' },
      ],
    },
  ],
  apply: {
    scenario: '9:00. Lucía\'s deck lands in Ada\'s inbox.',
    items: [
      {
        kind: 'mcq',
        prompt: '9:00. Before starting, what\'s Ada\'s first question?',
        options: [
          { text: 'Which slide looks prettiest?', why: 'Stakes first.' },
          { text: 'What happens if this is wrong?' },
          { text: 'Can I skip checking today?', why: 'A CEO deck is high stakes.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: '9:10. Slide 2. Which claim has no checkable source?',
        lines: [
          'Pilot: 840 of 1,200 users active weekly (our data)',
          'Fees: 1.5% (provider\'s page, checked today)',
          '"68% of Ghanaian traders want digital payments" (AI)',
          'Launch region: Greater Accra',
        ],
        bug: 2,
        fix: 'Remove it, or replace it with a sourced figure.',
        explanation: 'It came from the AI with no source.',
      },
      {
        kind: 'orderLines',
        prompt: '9:20. Order the source check for the 68%.',
        lines: ['Ask where it comes from', 'Search the exact title', 'Check who published it', 'Find the number inside'],
      },
      {
        kind: 'typeAnswer',
        prompt: '9:30. Slide 3 says sign-ups grew from 800 to 1,200, "a 150% increase". What\'s the real increase? (number only)',
        answers: ['50', '50%'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: '9:40. Slide 4 personas. Biased or fine?',
        groups: ['Biased', 'Fine'],
        items: [
          { text: '"Ama needs help understanding technology"', group: 0 },
          { text: '"Ama sells fabric and pays suppliers by phone"', group: 1 },
          { text: '"Esi is too old for apps"', group: 0 },
          { text: '"Esi pays school fees by phone"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: '9:50. The fee slide says 1%. Two AI tools agreed. Good to go?',
        prompt: 'Best reply?',
        options: [
          { text: 'Yes, two tools agree.', why: 'They may share old data.' },
          { text: 'Remove fees entirely.', why: 'Use the checked figure.' },
          { text: 'Agreement isn\'t proof. I checked the provider\'s page today: it\'s 1.5%. Updating the slide.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: '10:00. Ada asks the AI to rework the support estimate.',
        template: 'Show your [[1]], list your [[2]], and tell me the [[3]] point.',
        blanks: [['steps'], ['assumptions'], ['weakest']],
        distractors: ['mood', 'strongest', 'font'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: '10:15. Slide 6 needs Ghana\'s rules on storing ID numbers. Which request?',
        options: [
          { text: 'What are the rules? I\'ll put them on the slide.', why: 'High stakes; AI isn\'t the final word.' },
          { text: 'List the questions to ask our legal adviser about storing ID numbers in Ghana, and the official bodies whose guidance applies.' },
          { text: 'Summarise data protection law in one line.', why: 'Too risky to oversimplify.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: '10:30. Match each slide problem to its fix.',
        pairs: [
          ['Unsourced statistic', 'Open the source or remove it'],
          ['Wrong percentage', 'Recalculate'],
          ['Biased persona', 'Swap test and real data'],
          ['Legal claim', 'Confirm with an expert'],
        ],
      },
      {
        kind: 'findBug',
        prompt: '10:45. The closing slide. Which line is a risky promise?',
        lines: [
          'Pilot in Accra from Q3',
          'Support in English and Twi',
          'Guaranteed zero downtime at launch',
          'Review results after 90 days',
        ],
        bug: 2,
        fix: 'Target: 99.9% uptime, with a support plan for outages.',
        explanation: 'Nobody can guarantee zero downtime.',
      },
      {
        kind: 'sortGroups',
        prompt: '11:00. Pre-send check. Which check catches it?',
        groups: ['Names', 'Leftovers'],
        items: [
          { text: '"Dear Carmin"', group: 0 },
          { text: '"[Insert chart here]"', group: 1 },
          { text: 'Lucía spelled without the accent', group: 0 },
          { text: '"As an AI, I suggest..."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: '11:20. Did you use AI for these slides? Carmen will ask.',
        prompt: 'Best reply?',
        options: [
          { text: 'Yes, for drafts. I checked every number, source and persona; the notes slide lists what I checked.' },
          { text: 'No, all by hand.', why: 'Never pretend.' },
          { text: 'Does it matter?', why: 'Answer plainly; say what you checked.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: '11:40. Ada spots that yesterday\'s summary to Lucía\'s team had 1% too. What first?',
        options: [
          { text: 'Hope nobody used it', why: 'People may be budgeting with it.' },
          { text: 'Write a long apology about the AI', why: 'Short and clear, and own it.' },
          { text: 'Confirm 1.5% is right, then send a short same-day correction to everyone who got it' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: '11:45. Build the start of the correction.',
        tiles: ['Correction:', 'the', 'fee', 'is', '1.5%,', 'not', '1%'],
        distractors: ['maybe'],
      },
      {
        kind: 'sortGroups',
        prompt: '11:50. Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Detectors can reliably spot AI text', group: 0 },
          { text: 'Fluent answers feel truer than they are', group: 1 },
          { text: 'Paid tools never make things up', group: 0 },
          { text: 'Pasting your documents reduces made-up answers', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: '11:55. Order Ada\'s trust-but-verify routine.',
        lines: ['Stakes', 'Sources', 'Numbers and dates', 'Fresh and fair', 'Pre-send'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: '12:30. Carmen loved it. One question though: should we launch in Ghana next, or somewhere else? I need an answer in two days.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'I\'ll ask the AI and send you its answer in five minutes.', why: 'A big decision needs real research.' },
          { text: 'I\'ll research it properly: real sources, options side by side, and I\'ll flag what we can\'t know. Two days works.' },
          { text: 'Ghana, obviously.', why: 'That\'s the agreeable answer to test, not to assume.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the one idea behind all of Unit 4?',
        options: [
          { text: 'Sure-sounding isn\'t true: check what matters, and own what you send' },
          { text: 'Never use AI for anything important', why: 'Use it, and check it.' },
          { text: 'Trust the most confident answer', why: 'Confidence is a style, not a fact.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You finished Unit 4! What is one thing you will now always check before sending AI-assisted work?',
    starters: ['I will always check...', 'Because...'],
  },
  deepen: { title: 'Coming next', summary: 'Unit 5: Lucía\'s big question. Ada has two days to research whether to launch in Ghana, with AI as her research assistant.' },
  notes: 'Review of the whole unit. All names, numbers and claims are fictional; legal content is illustrative, not advice.',
};

export default lesson;
