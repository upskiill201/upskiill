import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Before/After: "I'll just do it myself" vs building the team's skill. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: '"I\'ll just do it myself"',
  summary: 'Day 4. Tomás\'s first draft of the summer email is... rough. Lucía could fix it in ten minutes. She opens the file, cursor blinking, and hears Tey: "Wait. What happens next week?"',
  minutes: 11,
  outcomes: [
    'See the hidden cost of doing your team\'s work for them',
    'Turn a fix into a lesson',
    'Know when doing it yourself is the right call',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to handle Tomás\'s draft',
      before: { label: 'Do it myself', text: 'Lucía rewrites the email at 9 p.m. It\'s perfect. Tomás sees the new version on Monday, says nothing, and next week\'s draft is just as rough. So she rewrites that one too.' },
      after: { label: 'Coach it', text: '"This is a good start. Two things would make it great: lead with the offer, and cut it to 80 words. Want to try those and send it back by 3?" The second draft is much better. The third one, she barely touches.' },
      notes: ['Doing it yourself is faster today, and slower every week after.', 'Two specific fixes, not a red pen everywhere.', 'Tomás learns; Lucía gets her evenings back.'],
    },
    {
      kind: 'text',
      html: "<p><strong>When doing it yourself IS right:</strong> a real emergency, a task only you can do, or something so small that explaining it takes longer than doing it. The rest of the time, ask: \"If I do this now, will I be doing it again next week?\"</p><p>Google's Project Oxygen found that its best managers were good coaches and empowered their teams instead of micromanaging. Rewriting someone's work at 9 p.m. is the opposite of both.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'If you fix it for them, you\'ll fix it forever. If you show them how, you fix it once.',
    },
  ],
  apply: {
    scenario: 'Day 4. Tomás\'s rough draft.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the hidden cost of Lucía rewriting the email herself?',
        options: [
          { text: 'None, it\'s faster', why: 'Faster today, slower forever.' },
          { text: 'Tomás doesn\'t learn, so she\'ll be rewriting his drafts every week' },
          { text: 'The email will be worse', why: 'It\'ll be great. That\'s not the problem.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Do it yourself, or coach it?',
        groups: ['Do it yourself', 'Coach it'],
        items: [
          { text: 'The website is down during the launch', group: 0 },
          { text: 'Tomás\'s rough email draft', group: 1 },
          { text: 'Fixing a typo in a 3-word heading', group: 0 },
          { text: 'Sofía\'s first campaign plan', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Is the draft okay? Be honest.',
        prompt: 'Lucía\'s coaching reply?',
        options: [
          { text: 'Good start. Two changes would make it great: lead with the offer, and cut it to 80 words. Try those by 3?' },
          { text: 'It\'s fine, I\'ll fix it.', why: 'He learns nothing.' },
          { text: 'It\'s terrible.', why: 'Honest, but not helpful.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Project Oxygen: great managers are good ___. (one word)',
        answers: ['coaches', 'coach'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a coaching reply in order.',
        lines: ['Say what\'s good', 'Give two specific fixes', 'Agree a time to send it back', 'Look at the next draft together'],
      },
      {
        kind: 'mcq',
        prompt: 'Why give TWO fixes, not ten?',
        options: [
          { text: 'Because she\'s lazy', why: 'It\'s deliberate.' },
          { text: 'Two clear changes are easy to act on; ten feel like "it\'s all wrong"' },
          { text: 'Ten would be faster', why: 'Ten overwhelms.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s feedback on the draft. Which line undoes the coaching?',
        lines: [
          'Lead with the offer; it\'s buried in paragraph three.',
          'Actually, never mind, I\'ve rewritten it already. Here.',
          'Cut it to about 80 words.',
        ],
        bug: 1,
        fix: 'Send it back by 3 and we\'ll look together.',
        explanation: 'Taking the work back after asking for changes teaches him not to bother.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Early win', 'Small, visible, theirs'],
          ['First meeting', 'Ask and listen'],
          ['Coaching', 'Show them how'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s rule.',
        template: 'If you [[1]] it for them, you\'ll fix it [[2]]. If you show them how, you fix it [[3]].',
        blanks: [['fix'], ['forever'], ['once']],
        distractors: ['never', 'twice'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the question to ask yourself.',
        tiles: ['Will', 'I', 'be', 'doing', 'this', 'again', 'next', 'week?'],
        distractors: ['tonight'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one task you keep doing for someone else that they could learn? What would two specific fixes sound like?',
    starters: ['I keep doing...', 'Two fixes I could suggest...'],
  },
  deepen: {
    title: 'The next-week test',
    summary: 'Before you take over someone\'s task this week, ask: "Will I be doing this again next week?" If yes, coach instead.',
  },
  notes: 'Google Project Oxygen: top behaviours include "is a good coach" and "empowers team and does not micromanage" (re:Work; 8 behaviours expanded to 10 in 2018).',
};

export default lesson;
