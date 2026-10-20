import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 14 — the evidence bank: a running list of proof for CVs and interviews. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Your evidence bank',
  summary: 'Miracle keeps a note on her phone called "Wins". Every time something goes well at work, she writes one line. When review time comes, she never has to remember. Clinton starts his own.',
  minutes: 12,
  outcomes: ['Set up an evidence bank you\'ll keep adding to', 'Write a short, useful entry', 'Use your bank to pick stories for any application'],
  learn: [
    {
      kind: 'steps',
      title: 'Build an evidence bank in four steps',
      steps: [
        { title: '1. Make one place for it', body: 'A note on your phone, a page in a notebook, or a simple table. Call it something you\'ll open: Miracle\'s is called "Wins". It only works if it\'s easy to find.' },
        { title: '2. One line per win', body: 'Date, what you did, and what changed. "12 March: rearranged the meet-up to Thursdays; attendance went from 18 to 31." Ten seconds to write.' },
        { title: '3. Tag the skill', body: 'Add one or two skills at the end: "(organising, problem-solving)". Later you can search for "problem-solving" and find every story in seconds.' },
        { title: '4. Add something every week', body: 'Small things count: a thank-you message, a problem fixed, a new tool learned. In six months you\'ll have dozens of stories for your CV, cover letters and interviews.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Save the screenshot too. A thank-you message, a photo of the full room, a result. Proof you can show beats proof you remember.',
    },
  ],
  apply: {
    scenario: 'Clinton starts his "Wins" note.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the evidence-bank steps in order.',
        lines: ['Make one place for it', 'Write one line per win', 'Tag the skill', 'Add something every week'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which is the most useful evidence-bank entry?',
        options: [
          { text: '"Did meet-up stuff."', why: 'In six months, Clinton won\'t remember what this means.' },
          { text: '"12 March: moved the meet-up to Thursdays; attendance 18 to 31 (organising, problem-solving)."' },
          { text: '"Great week!"', why: 'Nice feeling, no proof.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of an entry to an example.',
        pairs: [
          ['Date', '12 March'],
          ['What you did', 'Moved the meet-up to Thursdays'],
          ['What changed', 'Attendance went from 18 to 31'],
          ['Skill tag', '(organising)'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth adding to the bank, or not?',
        groups: ['Add it', 'Skip it'],
        items: [
          { text: 'A member\'s thank-you message after a talk', group: 0 },
          { text: 'What Clinton ate for lunch', group: 1 },
          { text: 'Fixing the group chat\'s spam problem', group: 0 },
          { text: 'Learning Git branching for a project', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Why do you think I write my wins down every week?',
        options: [
          { text: 'So when a CV, interview or review comes up, you have real stories ready instead of trying to remember.' },
          { text: 'To show off.', why: 'Nobody sees it but her. It\'s a memory, not a trophy cabinet.' },
          { text: 'Because your boss makes you.', why: 'She does it for herself. It saves her every review season.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the entry that\'s missing what changed.',
        lines: ['3 April: fixed the fixtures sheet so captains stop double-booking; zero clashes since.', '10 April: did some work on the website.', '17 April: ran a Git workshop for 12 members; 9 pushed their first project.'],
        bug: 1,
        fix: '10 April: added a sign-up form to the meet-up website; 15 new sign-ups in a week.',
        explanation: 'No result, no detail. In six months it means nothing.',
      },
      {
        kind: 'mcq',
        prompt: 'Why add a skill tag to each entry?',
        options: [
          { text: 'So you can search for a skill and find every story about it in seconds' },
          { text: 'It looks professional', why: 'Nobody sees it. It\'s for finding stories fast.' },
          { text: 'Recruiters read your bank', why: 'They don\'t. It\'s your private source for applications.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the entry.',
        template: '17 April: ran a Git [[1]] for 12 members; 9 pushed their first [[2]].',
        blanks: [['workshop'], ['project']],
        distractors: ['party', 'complaint', 'grade'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does Miracle call her evidence bank? (one word)',
        answers: ['wins'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Where will Clinton use his evidence bank?',
        groups: ['Uses it', 'Doesn\'t need it'],
        items: [
          { text: 'Writing CV bullets', group: 0 },
          { text: 'Preparing interview stories', group: 0 },
          { text: 'Choosing what to eat', group: 1 },
          { text: 'Asking for a promotion later', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Start your evidence bank right now. Write three entries from the last month: date, what you did, what changed, skill.',
    starters: ['Date: ... I ... and ... (skill)', 'My bank will live in...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Set a weekly reminder on your phone, same time every week: "Add one win." Two minutes a week, for the rest of your career.',
  },
  notes: 'A "brag document" / wins log is common career-development practice (e.g. Julia Evans, "Get your work recognized: write a brag document", 2019). Used again in Level 2 ("Worth more", promotion case).',
};

export default lesson;
