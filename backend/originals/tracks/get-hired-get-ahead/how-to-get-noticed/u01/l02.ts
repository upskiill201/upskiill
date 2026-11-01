import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 2 — free. What employers actually want (NACE Job Outlook 2025, WEF Future of Jobs 2025). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What employers actually want',
  summary: 'Clinton assumes employers want top grades and a long list of programming languages. Every year, big surveys ask employers what they really look for. The top of the list surprises almost everyone.',
  minutes: 12,
  outcomes: ['Name the skills employers rank highest', 'Explain why grades are rarely the deciding factor', 'Pick the top skills you can already show'],
  learn: [
    {
      kind: 'reading',
      title: 'What the surveys say',
      html:
        '<p>Every year, the <strong>National Association of Colleges and Employers (NACE)</strong> in the United States asks employers what they look for on graduates\' CVs. In its <strong>Job Outlook 2025</strong> survey, the top answer was <strong>problem-solving</strong>: about <strong>9 in 10</strong> employers look for evidence of it. Around <strong>8 in 10</strong> look for <strong>teamwork</strong>, and more than three-quarters want good <strong>communication</strong>. Initiative, a strong work ethic and technical skills each matter to more than 7 in 10.</p>' +
        '<p>Nearly two-thirds of those employers now use <strong>skills-based hiring</strong>: they care more about what you can show you\'ve done than about your grades.</p>' +
        '<p>It\'s not just the US. The <strong>World Economic Forum\'s Future of Jobs Report 2025</strong> surveyed over 1,000 employers in 55 economies. The skill they rated most essential was <strong>analytical thinking</strong>, chosen by about 7 in 10. Next came <strong>resilience, flexibility and agility</strong>, then <strong>leadership and social influence</strong>, <strong>creative thinking</strong>, and <strong>motivation and self-awareness</strong>.</p>' +
        '<p>Notice what\'s on these lists: problem-solving, teamwork, communication, thinking clearly, bouncing back. You build those in clubs, sport, family businesses and group projects, not only in jobs.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Grades open some doors, but they rarely decide who gets hired. Proof of problem-solving, teamwork and communication does.',
    },
  ],
  apply: {
    scenario: 'Clinton reads the surveys on the bus to campus.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In NACE\'s Job Outlook 2025, what did the most employers look for on graduates\' CVs?',
        options: [
          { text: 'Top grades', why: 'Grades weren\'t at the top. Most employers are moving towards skills.' },
          { text: 'Knowing many programming languages', why: 'Technical skills matter, but problem-solving came first.' },
          { text: 'Evidence of problem-solving' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Which skill did employers in the WEF Future of Jobs Report 2025 rate most essential?',
        options: [
          { text: 'Analytical thinking' },
          { text: 'Typing speed', why: 'Not on the list. Analytical thinking was first.' },
          { text: 'Public speaking', why: 'Communication matters, but analytical thinking came first in the WEF report.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each survey to what it found.',
        pairs: [
          ['NACE Job Outlook 2025', 'About 9 in 10 employers look for problem-solving'],
          ['WEF Future of Jobs 2025', 'Analytical thinking is the top core skill'],
          ['Skills-based hiring', 'What you can show beats your grades'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Near the top of employers\' lists, or not?',
        groups: ['Near the top', 'Not on the list'],
        items: [
          { text: 'Problem-solving', group: 0 },
          { text: 'Teamwork', group: 0 },
          { text: 'Having an expensive laptop', group: 1 },
          { text: 'Resilience', group: 0 },
          { text: 'Knowing the CEO', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'So my C in Data Structures isn\'t the end of the world?',
        options: [
          { text: 'It\'s the end of the world.', why: 'Most employers care more about proof of skills than one grade.' },
          { text: 'Not at all. Most employers care more about proof you can solve problems and work with people.' },
          { text: 'Just don\'t mention any grades ever.', why: 'Honesty matters. Grades can be on your CV; they\'re just not the whole story.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the summary.',
        template: 'Employers look first for [[1]]-solving, then [[2]] and communication.',
        blanks: [['problem'], ['teamwork']],
        distractors: ['grade', 'money', 'luck'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the claim the surveys don\'t support.',
        lines: ['Problem-solving is near the top of employers\' lists.', 'Employers only care about grades.', 'Many employers use skills-based hiring.'],
        bug: 1,
        explanation: 'Nearly two-thirds of NACE employers use skills-based hiring. Grades are only part of it.',
      },
      {
        kind: 'mcq',
        prompt: 'Where can a student build problem-solving and teamwork without a job?',
        options: [
          { text: 'Only in an internship', why: 'Internships help, but clubs, sport, family businesses and group projects all build these skills.' },
          { text: 'Clubs, sport, family business, volunteering and group projects' },
          { text: 'Nowhere until they graduate', why: 'You\'re building them right now, in everything you organise or fix.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Hiring that cares about what you can do more than your grades is called ___-based hiring.',
        answers: ['skills', 'skill'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which skill does each example show?',
        groups: ['Problem-solving', 'Teamwork', 'Resilience'],
        items: [
          { text: 'Fixed the meet-up\'s venue clash in an hour', group: 0 },
          { text: 'Planned fixtures with five team captains', group: 1 },
          { text: 'Kept going after the meet-up lost its sponsor', group: 2 },
          { text: 'Worked out why the group chat kept flooding', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Look at the top skills: problem-solving, teamwork, communication, analytical thinking, resilience. Which one could you prove most easily right now? What would you point to?',
    starters: ['The one I can prove is...', 'I\'d point to the time I...'],
  },
  deepen: {
    title: 'Read the source',
    summary: 'Search for "WEF Future of Jobs Report 2025 skills outlook" and read the list of core skills. Circle the three you already use most.',
  },
  notes: 'NACE Job Outlook 2025 (naceweb.org press release "The attributes employers look for on new grad resumes"; Kevin Gray, "What Are Employers Looking for When Reviewing College Students\' Resumes?"): ~90% look for problem-solving; teamwork "more than 80%" (press release) vs "nearly 80%" (article), so the lesson says "around 8 in 10"; communication more than three-quarters; initiative, work ethic, technical skills each >70%; nearly two-thirds use skills-based hiring. US survey, stated as such. WEF Future of Jobs Report 2025, Skills outlook chapter (January 2025; >1,000 employers, 55 economies): analytical thinking top core skill, ~7 in 10 employers; then resilience/flexibility/agility, leadership and social influence, creative thinking, motivation and self-awareness. Checked 2026-10-20.',
};

export default lesson;
