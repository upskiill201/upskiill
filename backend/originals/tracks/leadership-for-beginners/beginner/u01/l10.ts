import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Chapter Challenge: Diego's "twelve years" in the first team meeting. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: Diego\'s twelve years',
  summary: 'The first team meeting is going well, until Diego leans back and says, smiling: "With respect, I\'ve been doing this twelve years. I think I know what\'s working." Five faces turn to Lucía.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 1 tool in one live moment',
    'Respond to a challenge to your authority without a fight',
    'Turn a sceptic into a contributor',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 3, 10:17 a.m. The meeting room.',
      beats: [
        { speaker: 'lucia', text: '...so, my first question: what\'s working well?' },
        { speaker: 'diego', text: '(leaning back, smiling) With respect, Lucía, I\'ve been doing this twelve years. I think I know what\'s working. Maybe we skip the workshop?' },
        { speaker: 'narrator', text: 'Tomás looks at the floor. Sofía stops writing. Marta raises one eyebrow at Lucía. The clock on the wall is suddenly very loud.' },
        { speaker: 'narrator', text: 'This is the moment the team will talk about at lunch. You\'re with Lucía.' },
      ],
    },
  ],
  apply: {
    scenario: 'The meeting room, 10:17 a.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s Lucía\'s best first response?',
        options: [
          { text: '"That\'s exactly why I want to hear from you first, Diego. What\'s working?"' },
          { text: '"I\'m the team lead now, so we\'re doing it."', why: 'The authority myth, out loud, in front of everyone.' },
          { text: '"Okay, let\'s skip it."', why: 'She\'d lose the meeting and the team\'s ideas.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why treat Diego\'s experience as useful, not as a threat?',
        options: [
          { text: 'To make him like her', why: 'It\'s about the team working, not being liked.' },
          { text: 'Because he\'s right about everything', why: 'He\'s experienced, not always right.' },
          { text: 'He knows things she needs, and including him turns a critic into a contributor' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: '(after a pause) Fine. What\'s working is the Friday brainstorm. Don\'t touch it.',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'We\'ll see.', why: 'Vague, and it sounds like a threat.' },
          { text: 'I was going to cancel it anyway.', why: 'That would end the meeting badly.' },
          { text: 'Noted, it stays. Thank you. Would you help me understand what makes it work?' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'In this moment: do it, or don\'t?',
        groups: ['Do it', 'Don\'t'],
        items: [
          { text: 'Stay calm and curious', group: 0 },
          { text: 'Remind everyone who the boss is', group: 1 },
          { text: 'Thank Diego for his view', group: 0 },
          { text: 'Ask Sofía directly for her thoughts too', group: 0 },
          { text: 'Argue with Diego in front of everyone', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The title gives responsibility. Respect has to be ___. (one word)',
        answers: ['earned'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Sofía hasn\'t spoken. What should Lucía do?',
        options: [
          { text: 'Leave her alone; quiet people don\'t have ideas', why: 'Quiet people often have the best ideas.' },
          { text: 'Invite her gently: "Sofía, you\'re newest. What do you see that we might miss?"' },
          { text: 'Ask her to present for ten minutes', why: 'Too much, too soon.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the rest of the meeting in order.',
        lines: ['Thank Diego and take his point', 'Invite Sofía and the others', 'Agree the shared-drive fix', 'Explain the one-on-ones', 'End on time'],
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s closing words. Which line would undo the meeting?',
        lines: [
          'Thank you all. That was really useful.',
          'And Diego, let\'s talk later about your attitude.',
          'I\'ll book our one-on-ones today.',
        ],
        bug: 1,
        fix: 'Diego, thanks for the Friday brainstorm tip.',
        explanation: 'A public jab undoes the calm. If something needs saying, it goes in a private one-on-one.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the Chapter 1 tool.',
        pairs: [
          ['"That\'s why I want to hear from you first"', 'Influence is earned'],
          ['Inviting Sofía', 'An inclusive team'],
          ['Fixing the shared drive', 'An early win'],
          ['Not rewriting everyone\'s work', 'Coach, don\'t do'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: '(after the meeting, by the coffee machine) That was... actually good. Most new bosses come in with a PowerPoint.',
        prompt: 'What does Lucía say?',
        options: [
          { text: 'Thanks, Diego. I\'m going to need your help this quarter. Coffee in our one-on-one?' },
          { text: 'I know.', why: 'A bit smug.' },
          { text: 'Next time, please don\'t challenge me in public.', why: 'He just came round. Build on it.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Day 1 Lucía, or Day 3 Lucía?',
        groups: ['Day 1', 'Day 3'],
        items: [
          { text: 'Doing her old job at 7:30 a.m.', group: 0 },
          { text: 'Asking the team what they\'d change', group: 1 },
          { text: '"People have to listen to me now"', group: 0 },
          { text: 'Turning Diego\'s challenge into his input', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 1 in one line.',
        template: '[[1]] first. Change [[2]]. Earn [[3]].',
        blanks: [['Listen'], ['later'], ['trust', 'respect']],
        distractors: ['Shout', 'everything'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s answer to Diego.',
        tiles: ['That\'s', 'why', 'I', 'want', 'to', 'hear', 'from', 'you.'],
        distractors: ['boss'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time someone challenged you in front of others. How did you respond? How would you respond now, using what you\'ve learned?',
    starters: ['What happened was...', 'Now I\'d say...'],
  },
  deepen: {
    title: 'Next week: who are these people?',
    summary: 'Week 3. Lucía\'s first one-on-ones are booked. On Friday afternoon, Tomás comes to her desk looking pale: "Can I show you something? I think I broke the newsletter. Since Tuesday."',
  },
  notes: 'Chapter Challenge: reviews Chapter 1 (influence earned not issued, listening first, inclusion, early wins, coaching).',
};

export default lesson;
