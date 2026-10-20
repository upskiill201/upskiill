import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 16 — skills myths. Myth or Fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Skills myths',
  summary: 'The group chat is full of career "facts": only paid work counts, soft skills are fluff, you need a degree in the exact subject. Myth or fact: what\'s true about skills and getting hired?',
  minutes: 12,
  outcomes: ['Spot common myths about skills and hiring', 'Explain what\'s actually true', 'Stop underselling what you\'ve done'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Only paid work counts as experience.', isFact: false, explain: 'Employers want proof of skills, wherever you built them: clubs, family business, volunteering, caring for family, sport, projects. Say what you did and what changed.' },
        { text: '"Soft skills" are less important than technical skills.', isFact: false, explain: 'In NACE\'s 2025 survey, problem-solving and teamwork were at the top of employers\' lists. Many people now call them "human" or "durable" skills, because they last.' },
        { text: 'Many employers now hire on skills, not just grades.', isFact: true, explain: 'Nearly two-thirds of employers in NACE\'s Job Outlook 2025 said they use skills-based hiring.' },
        { text: 'You must match every line of a job advert before applying.', isFact: false, explain: 'Adverts are wish lists. Apply when you match most of it, and show a plan for the gaps.' },
        { text: 'Your skills can be learned and improved at any age.', isFact: true, explain: 'Skills aren\'t fixed talents. Curiosity and lifelong learning are among the fastest-rising skills in the WEF 2025 report, because employers know people can grow.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When someone in the group chat says "that doesn\'t count", ask: "Did I solve a problem or help people? Then it counts."',
    },
  ],
  apply: {
    scenario: 'Clinton busts the group chat\'s myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Volunteering builds real skills', group: 0 },
          { text: 'Only paid work counts', group: 1 },
          { text: 'Problem-solving is near the top of employers\' lists', group: 0 },
          { text: 'You must match 100% of an advert', group: 1 },
          { text: 'Skills can be learned at any age', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Someone in the group says "soft skills are fluff, just learn to code". Reply?',
        options: [
          { text: 'Employers rank problem-solving and teamwork at the top. Code AND people skills is the winning mix.' },
          { text: 'True, delete your clubs.', why: 'That throws away the skills employers rank highest.' },
          { text: 'Coding is fluff.', why: 'Also wrong. Both matter.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What share of NACE 2025 employers said they use skills-based hiring?',
        options: [
          { text: 'Almost none', why: 'Far more: nearly two-thirds.' },
          { text: 'Nearly two-thirds' },
          { text: 'All of them', why: 'Not all, but nearly two-thirds.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the myth in Clinton\'s cousin\'s message.',
        lines: ['Your football captaincy shows leadership.', 'Your aunt\'s stall doesn\'t count because it\'s family.', 'Your meet-up shows you can organise.'],
        bug: 1,
        explanation: 'Family or not, he diagnoses faults and handles customers. Skills are skills.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['Only paid work counts', 'Skills count wherever you built them'],
          ['Soft skills are fluff', 'Employers rank them at the top'],
          ['Match every line first', 'Adverts are wish lists'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do some people call soft skills "durable" skills?',
        options: [
          { text: 'They last: they stay valuable as tools and jobs change' },
          { text: 'They\'re hard to learn', why: 'It\'s about lasting value, not difficulty.' },
          { text: 'They\'re made of strong material', why: 'Ha. They last across jobs and decades.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s test.',
        template: 'Did I solve a [[1]] or help [[2]]? Then it counts.',
        blanks: [['problem'], ['people']],
        distractors: ['puzzle', 'nobody', 'money'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Another name for "soft skills" that says they last: ___ skills. (one word)',
        answers: ['durable', 'human', 'transferable'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which belief should Clinton keep?',
        groups: ['Keep it', 'Drop it'],
        items: [
          { text: 'My clubs and family stall built real skills', group: 0 },
          { text: 'I\'m not ready until I match every line', group: 1 },
          { text: 'I can learn testing this month', group: 0 },
          { text: 'Skills are talents you\'re born with', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'I\'m 21 and I\'ve never led anything. Is it too late to learn leadership?',
        options: [
          { text: 'Not at all. Skills grow with practice: start by leading one small thing this month, like a study session.' },
          { text: 'Yes, leaders are born.', why: 'Leadership is learned. Start small.' },
          { text: 'Pretend you have.', why: 'Never pretend. Start leading something small instead.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these myths have you believed about yourself? What will you tell yourself instead?',
    starters: ['I used to believe...', 'Now I\'ll tell myself...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find one thing you left off your skills list because "it doesn\'t count". Apply Tey\'s test, and add it if it passes.',
  },
  notes: 'NACE Job Outlook 2025 (problem-solving ~90%, teamwork ~80%, nearly two-thirds skills-based hiring); WEF Future of Jobs 2025 (curiosity and lifelong learning among rising skills). "Durable skills" is a term used by e.g. America Succeeds; "human skills" by others; stated as naming conventions, not research claims.',
};

export default lesson;
