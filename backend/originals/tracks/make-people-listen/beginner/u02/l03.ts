import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. "Rewind" (Before/After): answer first, details after — Arjun's warning email. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Rewind: answer first, details after',
  summary: 'The producer replays Arjun\'s 900-word email, then the 60-word version Tey helps him write. The warning is identical. Only the order changed, and that changed everything.',
  minutes: 12,
  outcomes: [
    'Put the answer, decision or action first',
    'Add the reason and the stakes straight after',
    'Keep the details for anyone who wants them',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Rewind: Arjun\'s warning',
      before: {
        label: 'The original (900 words)',
        text: 'Subject: Checkout architecture analysis. Hi Mr Rao, I have reviewed the checkout architecture. As you can see in diagram 1, the queue processes orders sequentially... (four paragraphs and three diagrams later) ...therefore I recommend a short delay to the sale.',
      },
      after: {
        label: 'Answer first (60 words)',
        text: 'Subject: Please delay the sale by 2 days. Hi Mr Rao, please delay Saturday\'s sale to Monday. If it goes ahead, the shop will likely crash when lots of people pay at once, and you\'ll lose sales. I need 48 hours to fix it. Can you confirm by 5 p.m. today? Technical details are below if you want them.',
      },
      notes: [
        'The subject line IS the action.',
        'Sentence one: what to do. Sentence two: what happens if not, in plain words.',
        'A clear deadline for a reply.',
        'The diagrams aren\'t deleted: they moved below, for anyone curious.',
      ],
    },
    {
      kind: 'text',
      html: "<p>This structure is sometimes called <strong>BLUF: bottom line up front</strong>. It comes from the military, where a message read too late can cost lives. It works everywhere busy people read.</p><p><strong>The order:</strong></p><ol><li><strong>The answer or action</strong> (what you need)</li><li><strong>Why it matters to them</strong> (the stakes, in their words)</li><li><strong>What you need back, and when</strong></li><li><strong>Details</strong>, for anyone who wants them</li></ol><p>It feels backwards to experts, who are trained to show their reasoning first. But listeners need to know <em>why they should keep reading</em> before they'll follow your reasoning.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Answer first. Then why it matters to them. Then what you need back. Details last.',
    },
  ],
  apply: {
    scenario: 'Tey FM, Rewind.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Arjun\'s new email in the BLUF order.',
        lines: ['Please delay Saturday\'s sale to Monday.', 'If it goes ahead, the shop will likely crash and you\'ll lose sales.', 'Can you confirm by 5 p.m. today?', 'Technical details below, if you want them.'],
      },
      {
        kind: 'mcq',
        prompt: 'What does BLUF stand for?',
        options: [
          { text: 'Big long useful facts', why: 'The opposite of the idea.' },
          { text: 'Bottom line up front' },
          { text: 'Be loud, use force', why: 'Definitely not.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Best subject line for Arjun\'s email?',
        options: [
          { text: 'Please delay the sale by 2 days' },
          { text: 'Checkout architecture analysis', why: 'Sounds like homework. Mr Rao won\'t open it.' },
          { text: 'URGENT!!!!!', why: 'Alarming, but says nothing.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'But if I put the conclusion first, he won\'t understand WHY.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Then don\'t give any reason.', why: 'A plain-words reason matters.' },
          { text: 'Give the why in one plain sentence straight after. The full reasoning goes below for anyone who wants it.' },
          { text: 'Then put the diagrams first.', why: 'That\'s how paragraph four happened.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In BLUF, the details go ___. (one word: first or last?)',
        answers: ['last', 'below', 'after'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the email is it?',
        groups: ['Action', 'Stakes', 'Details'],
        items: [
          { text: 'Please delay the sale to Monday', group: 0 },
          { text: 'Otherwise the shop will likely crash', group: 1 },
          { text: 'Diagram 2: the database locks', group: 2 },
          { text: 'You\'d lose a day of sales', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s update to Mr Rao. Which line is in the wrong place?',
        lines: [
          'Here\'s the background on how the checkout queue works.',
          'Good news: the fix is done and tested.',
          'You can run the sale on Monday as planned.',
        ],
        bug: 0,
        fix: 'Move it to the end, as optional background.',
        explanation: 'The good news and the action should lead. Background goes last.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Curse of knowledge', 'Can\'t imagine not knowing'],
          ['Tappers and listeners', 'Predicted 50%, got 2.5%'],
          ['Test on a non-expert', 'Can they repeat your point?'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Arjun\'s first line.',
        template: 'Please [[1]] Saturday\'s sale to [[2]]. Can you confirm by [[3]] p.m. today?',
        blanks: [['delay', 'move'], ['Monday'], ['5', '4', '3']],
        distractors: ['launch', 'diagram'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the BLUF rule.',
        tiles: ['Answer', 'first.', 'Details', 'last.'],
        distractors: ['diagrams', 'first,'],
      },
    ],
  },
  reflect: {
    prompt: 'Take an important message you need to send this week. Write the first sentence BLUF-style: the answer or action first.',
    starters: ['My first sentence: ...', 'Why it matters to them: ...'],
  },
  deepen: {
    title: 'Flip one email',
    summary: 'Find a long email you wrote. Move the last paragraph (usually where the action is) to the top. Read both versions. Which would a busy person act on?',
  },
  notes: 'BLUF (bottom line up front): military writing convention (e.g. US Army writing guidance) widely adopted in business writing. The structure is practical guidance.',
};

export default lesson;
