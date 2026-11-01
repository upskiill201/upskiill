import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Card deck: what great managers actually do (Google Project Oxygen). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'What great managers actually do',
  summary: 'Lucía Googles "how to be a good manager" and gets 4 billion results. Tey closes the tab. "One company studied its own managers for years. Let\'s just use that."',
  minutes: 11,
  outcomes: [
    'Know the behaviours Google found in its best managers',
    'Pick the two that matter most for a new leader',
    'Turn each one into something you do this week',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>In 2008, Google set out to prove managers didn't matter. Project Oxygen found the opposite: teams with better managers did better and were happier. Then Google asked: what do the best managers actually <em>do</em>? Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Is a good coach</h3><p>Helps people get better instead of doing it for them. (Lucía and Tomás's draft.)</p><h3>Card 2: Empowers the team, doesn't micromanage</h3><p>Gives people room to do the work their way, and stays available when they get stuck.</p><h3>Card 3: Creates an inclusive team, cares about people's success and well-being</h3><p>Makes sure everyone is heard, not just the loudest, and notices when someone is struggling.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: Is productive and results-oriented</h3><p>Caring about people doesn't mean not caring about results. The best managers do both.</p><h3>Card 5: Communicates well: listens and shares information</h3><p>Two-way: tells people what's going on, and actually listens.</p><h3>Card 6: Supports career development</h3><p>Talks with people about where they want to go, and helps them get there.</p>",
    },
    {
      kind: 'check',
      question: 'What did Project Oxygen set out to prove at first?',
      options: ['That managers didn\'t matter', 'That managers were the most important thing', 'That nobody needed training'],
      answer: 0,
      explanation: 'Google expected to show managers didn\'t matter, and found that good managers made a real difference.',
    },
    {
      kind: 'text',
      html: "<h3>Card 7: The rest of the list</h3><p>A clear vision and strategy for the team; key technical skills to help advise; collaboration across the company; and strong decision-making. (Google's list grew from 8 behaviours to 10 in 2018.)</p><h3>Card 8: Start with two</h3><p>Nobody does all ten in week one. For a new leader, the two that change the most, the fastest, are <strong>coaching</strong> and <strong>listening</strong>.</p>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Coach, don\'t do. Empower, don\'t micromanage. Include everyone. Get results. Listen and share. Help people grow.',
    },
  ],
  apply: {
    scenario: 'Project Oxygen, card by card.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Google find about its managers?',
        options: [
          { text: 'Managers made no difference', why: 'That\'s what they expected, not what they found.' },
          { text: 'Only technical skill mattered', why: 'Technical skill was on the list, but far from all of it.' },
          { text: 'Teams with better managers did better and were happier' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the behaviour to Lucía\'s week.',
        pairs: [
          ['Is a good coach', 'Two fixes on Tomás\'s draft'],
          ['Communicates well', 'The listening first meeting'],
          ['Supports career development', 'Asking Marta what she wants next'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Great-manager behaviour, or not?',
        groups: ['On Google\'s list', 'Not on it'],
        items: [
          { text: 'Empowers the team', group: 0 },
          { text: 'Checks every email before it goes out', group: 1 },
          { text: 'Creates an inclusive team', group: 0 },
          { text: 'Keeps information to themselves', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Ten behaviours! Where do I even start?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Start with two: coaching and listening. They change the most, the fastest.' },
          { text: 'All ten, starting tomorrow.', why: 'A recipe for burnout.' },
          { text: 'Skip it, just be yourself.', why: 'Be yourself, plus these habits.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Google\'s study of its managers was called Project ___. (one word)',
        answers: ['Oxygen', 'oxygen'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Does caring about people mean not pushing for results?',
        options: [
          { text: 'Yes, pick one', why: 'Google\'s best managers did both.' },
          { text: 'No: the best managers do both' },
          { text: 'Results don\'t matter', why: 'They\'re on the list too.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s plan for next week. Which one is micromanaging?',
        lines: [
          'Ask Sofía what she wants to learn this year.',
          'Approve every social post personally before it goes out.',
          'Share what Carmen told her about the summer budget.',
        ],
        bug: 1,
        fix: 'Agree what good looks like, then let the team post.',
        explanation: 'Approving everything is the opposite of empowering, and it makes her the bottleneck.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the start-small plan in order.',
        lines: ['Pick two behaviours', 'Do them every week', 'Ask the team how it\'s going', 'Add one more'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The first two.',
        template: 'Start with [[1]] and [[2]]. Then add one more each [[3]].',
        blanks: [['coaching', 'listening'], ['listening', 'coaching'], ['month', 'week']],
        distractors: ['controlling', 'shouting'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the summary.',
        tiles: ['Coach,', 'don\'t', 'do.', 'Empower,', 'don\'t', 'micromanage.'],
        distractors: ['control'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of Google\'s behaviours does your own manager (or the best leader you know) do well? Which one would you most like to get better at?',
    starters: ['They\'re great at...', 'I want to get better at...'],
  },
  deepen: {
    title: 'Rate yourself, then ask',
    summary: 'Score yourself 1–5 on coaching and listening. Then ask one person you work with to score you too. The gap between the two numbers is your starting point.',
  },
  notes: 'Google Project Oxygen (begun 2008; HBR case study 2013 by Garvin, Wagonfeld & Kind): the original 8 behaviours were expanded to 10 in 2018 — good coach; empowers team and does not micromanage; creates an inclusive team environment, showing concern for success and well-being; productive and results-oriented; good communicator (listens and shares information); supports career development and discusses performance; has a clear vision/strategy for the team; has key technical skills; collaborates across Google; strong decision maker. Wording paraphrased.',
};

export default lesson;
