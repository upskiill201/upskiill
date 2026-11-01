import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 11. Before/After: asking a question in a meeting — the all-hands Q&A with Mr Kamau. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Asking a question in a meeting',
  summary: 'Thursday\'s all-hands. Two hundred people, and Mr Kamau, the CEO, says: "Any questions?" Remi has one. His hand goes up before his brain can stop it.',
  minutes: 12,
  outcomes: [
    'Ask a short, clear question in front of a group',
    'Use "clarifying question" and "sorry if I missed this" well',
    'Know when to ask in the room and when to ask afterwards',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Remi\'s question, two versions',
      before: {
        label: 'Nervous ramble',
        text: 'Um, hi, I\'m Remi, I\'m an intern, sorry, so I was wondering, and this might be a silly question, but with the late deliveries, and the couriers, and I know there\'s a lot going on, I just wondered, like, what the, um, plan is? Generally?',
      },
      after: {
        label: 'Short and clear',
        text: 'Hi, I\'m Remi from Strategy. You said late deliveries are the top priority this quarter. Is the plan to fix the couriers first, or the warehouse?',
      },
      notes: [
        'Name and team: one short line, no apology.',
        'Context: he links to something Mr Kamau actually said.',
        'The question is specific: couriers or warehouse? Easy to answer.',
        'Two sentences instead of seven. Two hundred people thank him silently.',
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'kamau', text: 'Good question. Short answer: couriers first. They cause most of the delays. The warehouse is next quarter. Thank you, Remi.' },
        { speaker: 'narrator', text: 'Twenty-three words. No jargon at all. Remi blinks.' },
        { speaker: 'remi', text: '(The CEO talks... normally?)' },
        { speaker: 'tey', text: "Remember this moment. The most senior person in the building just gave the plainest answer of the week. It won't be the last time." },
      ],
    },
    {
      kind: 'text',
      html: "<p>Question phrases that work in any meeting:</p><ul><li><strong>\"Quick clarifying question...\"</strong> a question to make sure you understood, not to challenge.</li><li><strong>\"Sorry if I missed this, but...\"</strong> polite if it might already have been answered.</li><li><strong>\"Could you say a bit more about...?\"</strong> when you want more detail.</li><li><strong>\"I'll take that offline\"</strong> or <strong>\"I'll follow up after\"</strong> when your question only matters to you.</li></ul><p><strong>Ask in the room</strong> if others probably wonder the same thing. <strong>Ask afterwards</strong> if it's only about your own task.</p>",
    },
  ],
  apply: {
    scenario: 'Thursday, 10:00. All-hands Q&A.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which parts make a good meeting question?',
        groups: ['Keep it', 'Cut it'],
        items: [
          { text: 'Your name and team, briefly', group: 0 },
          { text: '"This might be a silly question"', group: 1 },
          { text: 'A link to something the speaker said', group: 0 },
          { text: 'One specific question', group: 0 },
          { text: 'Three questions in one breath', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is a "clarifying question"?',
        options: [
          { text: 'A question that challenges the speaker', why: 'It\'s gentler: just checking you understood.' },
          { text: 'A question to make sure you understood correctly' },
          { text: 'A question about cleaning', why: 'Clarify, not clean.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which question is best for the all-hands?',
        options: [
          { text: 'Will the new courier rules change how we book deliveries for clients?' },
          { text: 'Can someone help me reset my email password?', why: 'Only about Remi. Ask Felix afterwards.' },
          { text: 'What\'s the plan? Like, generally? For everything?', why: 'Too vague to answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'I want to ask Mr Kamau why my spreadsheet macro keeps crashing. In the all-hands. Good idea?',
        prompt: 'What does Remi say?',
        options: [
          { text: 'Yes! Ask in front of everyone.', why: 'Two hundred people don\'t need the macro.' },
          { text: 'Ask Mr Kamau privately in the lift.', why: 'The CEO isn\'t IT support.' },
          { text: 'Ask Felix in IT after. It only matters to you, and Felix fixes everything.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: '"Sorry if I ___ this, but is the deadline still the 20th?" (one word)',
        answers: ['missed'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s question. Which sentence should go?',
        lines: [
          'Hi, I\'m Remi from Strategy.',
          'Sorry, I\'m just an intern, this is probably stupid.',
          'Is the plan to fix couriers or the warehouse first?',
        ],
        bug: 1,
        fix: 'Delete it.',
        explanation: 'Interns are allowed to ask questions. Apologising in advance makes a good question sound weaker.',
      },
      {
        kind: 'mcq',
        prompt: 'What did Mr Kamau\'s answer show Remi?',
        options: [
          { text: 'The CEO doesn\'t like questions', why: 'He thanked Remi and answered clearly.' },
          { text: 'You need lots of jargon to be senior', why: 'The opposite.' },
          { text: 'Senior people often speak the most plainly' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Build a clear meeting question, in order.',
        lines: ['Name and team', 'Link to what the speaker said', 'One specific question'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Stand-up', 'Short daily team update'],
          ['Kick it off', 'Start the meeting'],
          ['Going back to...', 'Returning to an earlier point'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s clarifying question.',
        tiles: ['Quick', 'clarifying', 'question:', 'is', 'the', 'deadline', 'the', '20th?'],
        distractors: ['silly', 'sorry'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a question you wanted to ask in a meeting or class but didn\'t. Write it now in two sentences: name and link, then one specific question.',
    starters: ['I wanted to ask...', 'In two sentences: ...'],
  },
  deepen: {
    title: 'Write it before you say it',
    summary: 'In your next meeting, when a question comes to you, write it down in under 20 words before you raise your hand. You\'ll ask it twice as clearly.',
  },
  notes: '"Clarifying question" (standard meeting/teaching term), "all-hands" (company-wide meeting). Mr Kamau\'s plain speech sets up Chapter 11 (Plain words win).',
};

export default lesson;
