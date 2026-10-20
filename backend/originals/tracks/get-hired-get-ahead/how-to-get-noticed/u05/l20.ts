import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 20 — Chapter Challenge and course finale: Clinton's profile; Brenda connects. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: findable',
  summary: 'Monday morning. Brenda said she\'d look Clinton up. Tonight he finishes his profile: photo, headline, About, experience, Featured, link. Then, at 9:14am, a notification. Everything from this chapter, and the end of this course.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a complete, honest, findable profile', 'Make it match your CV and tell one story', 'Finish your career kit'],
  learn: [
    {
      kind: 'story',
      title: '9:14am',
      beats: [
        { speaker: 'narrator', text: 'Sunday night. Four months to graduation. Clinton has a new photo by the window, a headline with JavaScript and the tracker, a five-line About, the meet-up and the phone stall in Experience, and the case study pinned in Featured.' },
        { speaker: 'clinton', text: 'Custom link: done. Personal number: gone. "CEO": never existed. Logged-out check: it matches my CV. I think I\'m... findable.' },
        { speaker: 'narrator', text: 'Monday, 9:14am. A notification: "Brenda Fon viewed your profile." Then another: "Brenda Fon wants to connect." Her note: "Great profile. See you at the interview in six weeks."' },
        { speaker: 'tey', text: 'Let\'s build the profile that got that note.' },
      ],
    },
    {
      kind: 'steps',
      title: 'Your career kit: complete',
      steps: [
        { title: 'Piece 1', body: 'A skills inventory: every skill with proof.' },
        { title: 'Piece 2', body: 'A portfolio piece: a case study with real users and a result.' },
        { title: 'Piece 3', body: 'A one-page, tailored CV.' },
        { title: 'Piece 4', body: 'A specific cover letter.' },
        { title: 'Piece 5 (tonight)', body: 'A findable, honest profile that matches it all.' },
        { title: 'Next course: How to Get Hired', body: 'Six weeks until the interview. Clinton learns to find the jobs nobody advertises, lands an internship, and walks into Njangi Pay.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Clinton\'s profile.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Step 1: pick Clinton\'s headline.',
        options: [
          { text: '"Student at UB"', why: 'The default. Says nothing.' },
          { text: '"Final-year CS student · JavaScript & Python · Built a savings tracker used by 42 people"' },
          { text: '"Founder & CEO · Visionary"', why: 'Inflated and empty.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Step 2: put Clinton\'s About in order.',
        lines: ['I build small tools that solve real problems for real people.', 'My tracker ended my mum\'s njangi\'s monthly arguments; a second group of 30 uses it too.', 'I run a 40-member meet-up and explain phone repairs in plain words.', 'I\'m graduating in June and looking for a graduate developer role in fintech.', 'I\'d love to hear from people building for savings groups.'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Step 3: Experience. Honest title or not?',
        groups: ['Honest', 'Not honest'],
        items: [
          { text: 'Founder and organiser, CS Tech Meet-up (40 members)', group: 0 },
          { text: 'Weekend assistant, phone-repair stall', group: 0 },
          { text: 'CTO, Mum\'s Njangi', group: 1 },
          { text: 'Volunteer developer, church savings-group tracker', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Step 4: match each proof to its section.',
        pairs: [
          ['Njangi Tracker case study', 'Featured'],
          ['Meet-up role', 'Experience'],
          ['JavaScript, Python, explaining tech', 'Top skills'],
          ['Mrs Ewane\'s two lines', 'Recommendations'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Step 5: the safety check. Tap what must go.',
        lines: ['Email: clinton.ndi@email.com', 'Phone: +237 6XX XXX XXX (personal)', 'Link: linkedin.com/in/clintonndi'],
        bug: 1,
        explanation: 'A personal number on a public profile invites scams. Email is enough.',
      },
      {
        kind: 'mcq',
        prompt: 'Step 6: the profile says "Meet-up: 2023 to now"; the CV says 2024. Fix?',
        options: [
          { text: 'Change the profile to 2024, so it matches the CV and the truth' },
          { text: 'Change the CV to 2023', why: 'Only if 2023 is true. It isn\'t.' },
          { text: 'Leave both', why: 'Brenda compares them.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Step 7: a message arrives.',
        from: 'clinton',
        message: '"Congrats! Remote job, 900,000 francs a month, no interview. Pay the 30,000 registration fee today." Reply?',
        options: [
          { text: 'No reply. Report the profile. Real employers don\'t charge you to work.' },
          { text: 'Pay quickly before it\'s gone.', why: 'Classic scam pressure.' },
          { text: 'Send my ID to prove I\'m serious.', why: 'Never.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Step 8: the stranger check. Pass or fail?',
        groups: ['Pass', 'Fail'],
        items: [
          { text: 'Matches the CV', group: 0 },
          { text: 'One clear story in every section', group: 0 },
          { text: 'An old joke about a lecturer still public', group: 1 },
          { text: 'Clear photo and headline', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Step 9: complete Clinton\'s connection note to a Njangi Pay developer.',
        template: 'Hi Tamara, I\'m a CS student who built a [[1]]-group tracker. I\'d love to stay in [[2]].',
        blanks: [['savings'], ['touch']],
        distractors: ['football', 'business', 'charge'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many pieces are in Clinton\'s finished career kit? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        prompt: 'Brenda\'s note.',
        from: 'brenda',
        message: 'Great profile. See you at the interview in six weeks.',
        options: [
          { text: 'Thank you, Brenda! Looking forward to it.' },
          { text: 'Can we do it tomorrow instead?', why: 'Her timeline. Accept graciously.' },
          { text: 'I knew you\'d like it.', why: 'A little cocky. Thank her.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You\'ve finished How to Get Noticed by Employers. Look at your career kit: skills, portfolio, CV, cover letter, profile. Which piece are you proudest of, and which needs one more pass?',
    starters: ['I\'m proudest of...', 'One more pass on...'],
  },
  deepen: {
    title: 'Your career kit: complete',
    summary: 'Make sure all five pieces match and tell one story. Then start the next course, How to Get Hired: finding the jobs nobody advertises, landing an internship, and the interview.',
  },
  notes: 'Unit Challenge and course finale (How to Get Noticed by Employers, Chapter 5). Tamara is a named extra (Njangi Pay developer). Hands off to Level 2, How to Get Hired (interview in six weeks; L2 Ch3). These exercises double as Jump ahead / placement questions.',
};

export default lesson;
