import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Reading: from doer to leader (results through others; Gallup on managers and engagement). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'From doer to leader',
  summary: 'Day 2. Lucía is back at her desk at 7:30, finishing the social posts she always did. By 6 p.m. she has done her old job perfectly and her new job not at all.',
  minutes: 12,
  outcomes: [
    'Know how a leader\'s job differs from a team member\'s',
    'Understand how much a manager shapes how a team feels',
    'Start measuring yourself by the team\'s results, not your own output',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Your job just changed shape',
      html: "<p>For six years Lucía was great at her job: she wrote the best social posts at Nopal. That's why she got promoted. And that's the trap.</p><h3>The new job</h3><p>As a team member, you're measured by <strong>what you do</strong>. As a leader, you're measured by <strong>what your team does</strong>. Your work now is mostly invisible: helping people be clear on what matters, removing what's blocking them, helping them grow, and making good calls.</p><p>Linda Hill, who studied new managers through their first year, found that many struggled exactly here. They kept doing the work they were good at, because it felt productive and safe, while the leading went undone.</p><h3>Why it matters so much</h3><p>Gallup's research on managers found that the manager accounts for <strong>at least 70%</strong> of the differences in how engaged teams are. In one Gallup study, about <strong>one in two</strong> people said they had left a job at some point to get away from their manager.</p><p>So the person who sets the team's mood, energy and direction is now Lucía. That's a big responsibility, and also good news: most of what makes a good manager can be learned.</p><h3>Doing vs leading</h3><ul><li><strong>Doing:</strong> writing the posts yourself.</li><li><strong>Leading:</strong> making sure the right person writes them, knows what good looks like, and gets the help they need.</li></ul><p>Lucía will still do some hands-on work. New leaders often do. But if her calendar is all doing, the leading isn't happening.</p>",
    },
    {
      kind: 'check',
      question: 'According to Gallup, roughly how much of the difference in team engagement comes from the manager?',
      options: ['At least 70%', 'About 5%', 'None'],
      answer: 0,
      explanation: 'Gallup found managers account for at least 70% of the variance in engagement scores across teams.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'You used to be measured by what you did. Now you\'re measured by what your team does.',
    },
  ],
  apply: {
    scenario: 'Day 2. Lucía\'s to-do list.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What went wrong on Lucía\'s Day 2?',
        options: [
          { text: 'She was lazy', why: 'She worked from 7:30 to 6. That\'s the problem.' },
          { text: 'Her posts were bad', why: 'They were great. That\'s not the job any more.' },
          { text: 'She did her old job well and her new job not at all' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Doing or leading?',
        groups: ['Doing', 'Leading'],
        items: [
          { text: 'Writing the social posts herself', group: 0 },
          { text: 'Asking Tomás what\'s blocking him', group: 1 },
          { text: 'Redesigning the logo at midnight', group: 0 },
          { text: 'Making the summer goals clear to everyone', group: 1 },
          { text: 'Helping Sofía plan her growth', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'But writing the posts is what I\'m GOOD at. Leading feels like doing nothing.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Then keep writing the posts.', why: 'That\'s the doer trap.' },
          { text: 'It feels like nothing because it\'s invisible. But your team\'s results are your results now.' },
          { text: 'Leading IS doing nothing.', why: 'It\'s a lot of work, just a different kind.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A leader is measured by what the ___ does. (one word)',
        answers: ['team'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'In one Gallup study, about how many people had left a job to get away from a manager?',
        options: [
          { text: 'About one in two' },
          { text: 'About one in a hundred', why: 'Much more common than that.' },
          { text: 'Nobody', why: 'Very common, actually.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put a leader\'s day in a better order.',
        lines: ['Check what the team needs today', 'Unblock the person who is stuck', 'Do a little hands-on work', 'Make one decision the team is waiting on'],
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s new calendar. Which line is the doer trap?',
        lines: [
          '9:00 Quick check-in with the team.',
          '10:00–18:00 Write all the summer posts myself.',
          '16:00 Coffee with Sofía about her goals.',
        ],
        bug: 1,
        fix: '10:00 Brief Tomás on the summer posts.',
        explanation: 'A whole day of doing leaves no time to lead.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Compliance', 'Doing it because you were told'],
          ['Commitment', 'Caring about the result'],
          ['Influence', 'Earned through trust'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The new job.',
        template: 'You used to be measured by what you [[1]]. Now you\'re measured by what your [[2]] [[3]].',
        blanks: [['did'], ['team'], ['does']],
        distractors: ['boss', 'write'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the rule.',
        tiles: ['My', 'team\'s', 'results', 'are', 'my', 'results.'],
        distractors: ['posts'],
      },
    ],
  },
  reflect: {
    prompt: 'Look at your last working week. How much of it was doing, and how much was helping others do well? If you lead people, what would you change?',
    starters: ['Most of my week was...', 'I could spend more time...'],
  },
  deepen: {
    title: 'The calendar test',
    summary: 'Colour your calendar for one week: one colour for doing, another for leading (one-on-ones, unblocking, planning, coaching). The colours show where your time really goes.',
  },
  notes: 'Gallup, State of the American Manager (Harter & Adkins): managers account for at least 70% of the variance in employee engagement; a Gallup study of 7,272 U.S. adults found about one in two had left a job to get away from a manager. Linda Hill (2007) on new managers clinging to individual-contributor work.',
};

export default lesson;
