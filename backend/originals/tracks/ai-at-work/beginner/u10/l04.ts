import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 4 — company rules on AI. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Company rules on AI',
  summary: 'Does Ada\'s company even have AI rules? She\'s never looked. Tey explains what a typical policy covers, and what to do if there isn\'t one.',
  minutes: 12,
  outcomes: [
    'Know what a typical AI policy covers',
    'Find your company\'s rules',
    'Act sensibly when there are no rules yet',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Most companies now have an AI policy, or are writing one. Have you read yours?', replies: ['I didn\'t know we had one.'] },
        { tey: 'Ask IT or your manager. A typical policy says: which tools are approved, what data can go into them, whether you must say when AI was used, and who to ask.', replies: ['What if there isn\'t one?'] },
        { tey: 'Then act as if the strictest sensible rules apply: no personal or confidential data in unapproved tools, check everything, say when AI helped. And ask your manager to clarify.', replies: ['Can clients have their own rules?'] },
        { tey: 'Yes, and they often do. A client contract may ban AI on their data entirely. When client and company rules differ, follow the stricter one.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Find your AI policy: approved tools, allowed data, disclosure, who to ask. No policy? Act strictly and ask. Client rules stricter? Follow those.',
    },
  ],
  apply: {
    scenario: 'Ada looks for her company\'s AI rules.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Usually in an AI policy, or not?',
        groups: ['In the policy', 'Not usually'],
        items: [
          { text: 'Which tools are approved', group: 0 },
          { text: 'What data can go into them', group: 0 },
          { text: 'Your favourite prompt', group: 1 },
          { text: 'Who to ask', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'There\'s no AI policy at Ada\'s company. What should she do?',
        options: [
          { text: 'Anything goes', why: 'Act carefully.' },
          { text: 'Act as if strict rules apply, and ask her manager to clarify' },
          { text: 'Never use AI', why: 'Use it carefully and ask.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'The company allows a tool, but Lucía\'s contract bans AI on her data. Which rule wins?',
        options: [
          { text: 'The company\'s', why: 'Follow the stricter.' },
          { text: 'Whichever is easier', why: 'Follow the stricter.' },
          { text: 'The stricter one: no AI on Lucía\'s data' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Does your company let you use AI on our campaign files?',
        prompt: 'Ada isn\'t sure. Best reply?',
        options: [
          { text: 'Good question. I\'ll check our policy and your contract today, and confirm before I use AI on anything of yours.' },
          { text: 'Yes, definitely.', why: 'She doesn\'t know yet.' },
          { text: 'Doesn\'t matter.', why: 'It matters to her.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'No policy? Act [[1]] and [[2]].',
        blanks: [['strictly'], ['ask']],
        distractors: ['freely', 'guess'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to who usually answers it.',
        pairs: [
          ['Which tools are approved?', 'IT'],
          ['Can I use AI on client data?', 'The client contract and your manager'],
          ['Is this personal data OK to use?', 'The data protection contact'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which assumption is risky?',
        lines: [
          'I\'ll check the company AI policy',
          'I\'ll check the client contract',
          'If nobody said no, it must be allowed',
          'I\'ll ask my manager if unsure',
        ],
        bug: 2,
        fix: 'If unsure, ask before using it.',
        explanation: 'Silence isn\'t permission.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s question to IT.',
        tiles: ['Which', 'AI', 'tools', 'are', 'approved?'],
        distractors: ['fun'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'When company and client rules differ, follow the ... one (one word)',
        answers: ['stricter', 'strictest'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'OK under a strict "no policy yet" approach, or not?',
        groups: ['OK', 'Not OK'],
        items: [
          { text: 'AI to rewrite your own email, no names', group: 0 },
          { text: 'Client files in a free tool', group: 1 },
          { text: 'AI to explain a formula', group: 0 },
          { text: 'Customer list in an unapproved tool', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s checks.',
        lines: ['Company AI policy', 'Client contract', 'Data protection contact if personal data', 'Then decide'],
      },
      {
        kind: 'mcq',
        prompt: 'Why might a client ban AI on their data?',
        options: [
          { text: 'They dislike technology', why: 'It\'s about protection.' },
          { text: 'No reason', why: 'Usually protection or regulation.' },
          { text: 'To protect confidential or personal information' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Do you know your company\'s AI rules? If not, who will you ask this week?',
    starters: ['The rules say...', 'I\'ll ask...'],
  },
  deepen: { title: 'Try it today', summary: 'Find your company\'s AI policy, or ask your manager whether one exists.' },
  notes: 'General guidance; policies vary by organisation and sector.',
};

export default lesson;
