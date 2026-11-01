import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 14 — other ways to get proof: volunteering, small freelance jobs, competitions, open source. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Other ways to get proof',
  summary: 'Not every portfolio piece has to be a project you invent. Miracle lists four other ways people with no job get real proof, and how to pick the one that fits your life and your time.',
  minutes: 12,
  outcomes: ['Name four more ways to build proof without a job', 'Pick one that fits your time and career', 'Avoid the traps (unpaid forever, too big, no result)'],
  learn: [
    {
      kind: 'steps',
      title: 'Four more ways to build proof',
      steps: [
        { title: '1. Volunteer with a goal', body: 'Help a church, school, clinic or charity with something specific: their sign-up sheet, their poster, their accounts, their social posts. Agree what "done" looks like before you start, so you get a result, not just hours.' },
        { title: '2. A small paid job', body: 'Offer one small, clear service: a menu redesign for a café, a price list for a shop, a simple website for a tailor. Even a small fee makes it real work with a real client, and their review is proof.' },
        { title: '3. Competitions and hackathons', body: 'Student competitions, hackathons, case challenges and essay prizes give you a deadline, a brief and, often, judges\' feedback. You don\'t have to win: "built a working app in 48 hours with three strangers" is a great story.' },
        { title: '4. Join something bigger', body: 'Open-source software, community projects, student societies or a local business you help weekly. Start with something small, like fixing a typo in documentation or reorganising one shelf of stock. Contributions to something real count.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Watch for traps: "free work" that never ends, projects with no clear finish, and roles with no result you can show. Agree the scope and the end date up front.',
    },
  ],
  apply: {
    scenario: 'Clinton and his friends look for more proof.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each way to an example.',
        pairs: [
          ['Volunteer with a goal', 'Build the church choir\'s sign-up sheet'],
          ['A small paid job', 'Redesign a café\'s menu for a small fee'],
          ['Competitions', 'A 48-hour hackathon'],
          ['Join something bigger', 'Fix documentation in an open-source project'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should you agree before you volunteer?',
        options: [
          { text: 'Nothing, just turn up', why: 'Then it can go on forever with nothing to show.' },
          { text: 'What "done" looks like, so you get a result and not just hours' },
          { text: 'A big salary', why: 'It\'s volunteering. Agree the scope and finish instead.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good proof, or a trap?',
        groups: ['Good proof', 'Trap'],
        items: [
          { text: 'A two-week volunteer project with a clear finish', group: 0 },
          { text: '"Help us for free until we\'re big"', group: 1 },
          { text: 'A café menu redesign the owner now uses', group: 0 },
          { text: 'Endless "exposure" with nothing to show', group: 1 },
          { text: 'A hackathon app, even if you didn\'t win', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'A start-up says I can "help them for free for a few months" and maybe they\'ll hire me. Good idea?',
        options: [
          { text: 'Yes, work for free as long as they want.', why: 'That\'s the trap: unpaid with no end.' },
          { text: 'Never help anyone.', why: 'Short, scoped help can be great proof. Just set limits.' },
          { text: 'Only with a clear, short scope and an end date, and something you can show. "Maybe" isn\'t a plan.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Why is a hackathon worth it even if you don\'t win?',
        options: [
          { text: 'You build something real under a deadline with a team, which is a great story' },
          { text: 'It isn\'t, only winners count', why: 'The experience and the project count either way.' },
          { text: 'For the free food', why: 'Nice, but the story is the real prize.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that won\'t become proof.',
        lines: ['Built the clinic\'s appointment sign-up sheet; queues halved.', 'Helped out at various places sometimes.', 'Redesigned the café\'s menu; the owner uses it daily.'],
        bug: 1,
        explanation: 'No place, no task, no result. Nothing to show or tell.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Ngum has two free afternoons a week and wants accounting. Which is best?',
        options: [
          { text: 'Enter a coding hackathon', why: 'Fine, but it doesn\'t match accounting.' },
          { text: 'Wait until she graduates', why: 'She has time now. Use it for proof.' },
          { text: 'Volunteer to set up the netball club\'s accounts for one season, with a clear finish' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s warning.',
        template: 'Agree the [[1]] and the [[2]] date up front.',
        blanks: [['scope'], ['end']],
        distractors: ['salary', 'start', 'logo'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A short coding competition, often over a weekend, is called a ___. (one word)',
        answers: ['hackathon', 'hack-a-thon'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which way fits each person best?',
        groups: ['Small paid job', 'Volunteer with a goal', 'Competition'],
        items: [
          { text: 'Needs some income and has a design skill', group: 0 },
          { text: 'Wants to help her church and learn admin', group: 1 },
          { text: 'Loves deadlines and teamwork', group: 2 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the four ways fits your time, your money and your career right now? What\'s one specific thing you could do this month?',
    starters: ['The way that fits me is...', 'This month I could...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find one real opportunity this week: a group that needs help, a competition with a deadline, or a small job someone you know would pay for. Write down its scope and end date before you say yes.',
  },
  notes: 'Volunteering, freelancing, competitions and open-source contribution are standard routes to experience in careers guidance. Warning about indefinite unpaid "trial" work reflects common advice; labour rules on unpaid work differ by country (playbook §9).',
};

export default lesson;
