import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story: Wanjiku says no. Understanding the other person's world before arguing. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Wanjiku says no',
  summary: 'Week 2, Tuesday. Remi shows Wanjiku the three delays. Eight of the 21 days are in her approval queue. She reads it, takes off her glasses and says: "No. I can\'t approve refunds faster. If audit finds one mistake, it\'s my name."',
  minutes: 11,
  outcomes: [
    'See why "no" usually protects something important',
    'Ask about the reason before arguing with the answer',
    'Know this chapter\'s goal: find what\'s in it for them',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 2, Tuesday, 2:30 p.m., Finance',
      beats: [
        { speaker: 'remi', text: 'So eight of the 21 days are the approval queue. If we could approve faster...' },
        { speaker: 'wanjiku', text: '(glasses off) No. Every refund over KSh 5,000 gets checked by hand. Last year audit found two wrong refunds. It was my name in the report. Not yours. Not Brian\'s. Mine.' },
        { speaker: 'narrator', text: 'Remi has the numbers. He could argue: 8 days is too long, Mama Mboga is leaving, the CEO wants it. All true. He can feel the argument loading in his mouth.' },
        { speaker: 'narrator', text: 'Wanjiku is waiting to see which Remi she\'s dealing with.' },
      ],
      choice: {
        prompt: 'What should Remi say?',
        options: [
          {
            text: '"That sounds like it was a horrible week. What would a faster process need, so audit stays happy?"',
            outcome: 'Wanjiku puts her glasses back on. "Honestly? Most refunds are tiny. If I could check a sample instead of every one, I\'d have time for the big ones." Remi writes it down.',
            best: true,
          },
          {
            text: '"But the CEO wants refunds under five days."',
            outcome: 'Wanjiku: "Then the CEO can sign the audit report." The meeting ends in four minutes.',
          },
          {
            text: '"Okay, sorry. Forget it."',
            outcome: 'Polite, and eight days of the problem stay exactly where they are.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Wanjiku's \"no\" isn't stubbornness. It's protecting something real: her name, her job, the company's accounts. People rarely help because <em>you</em> need something. They help when it also works for <em>them</em>. <strong>This chapter:</strong> what people value, how to ask for help, giving first, finding interests behind positions, and influencing people far away. The goal: find what's in it for them.</p>",
    },
  ],
  apply: {
    scenario: 'Finance, Tuesday afternoon.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is Wanjiku\'s "no" protecting?',
        options: [
          { text: 'Her power over Remi', why: 'She doesn\'t care about power. She cares about audit.' },
          { text: 'Her name in the audit report, and the accounts' },
          { text: 'Nothing; she\'s just difficult', why: 'There\'s a real reason. Find it.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Opens the conversation, or closes it?',
        groups: ['Opens it', 'Closes it'],
        items: [
          { text: '"What would it need, so audit stays happy?"', group: 0 },
          { text: '"But the CEO wants it."', group: 1 },
          { text: '"That sounds like a horrible week."', group: 0 },
          { text: '"You\'re the bottleneck."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'wanjiku',
        message: 'If audit finds one mistake, it\'s my name. Not yours.',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Audit won\'t find anything.', why: 'A promise he can\'t keep.' },
          { text: 'It\'s not about you, it\'s about customers.', why: 'For her, it is about her.' },
          { text: 'That\'s fair. I don\'t want a faster process that puts you at risk. What would make it safe?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Before arguing with the answer, ask about the ___. (one word)',
        answers: ['reason', 'Reason', 'why', 'Why'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s response in order.',
        lines: ['Hear the "no"', 'Acknowledge the reason', 'Ask what would make it work', 'Write down her idea'],
      },
      {
        kind: 'mcq',
        prompt: 'What was Wanjiku\'s idea?',
        options: [
          { text: 'Check a sample of small refunds, and keep hand-checking the big ones' },
          { text: 'Approve everything without checking', why: 'She\'d never.' },
          { text: 'Hire three more people', why: 'Not what she said.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s notes after the meeting. Which line misreads Wanjiku?',
        lines: [
          'Her worry: audit, her name on the report.',
          'She doesn\'t care about customers.',
          'Her idea: sample-check small refunds.',
        ],
        bug: 1,
        fix: 'She cares about customers AND audit. The fix has to work for both.',
        explanation: 'Protecting one thing isn\'t the same as not caring about the other.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['Referent power', 'Being trusted'],
          ['Listening tour', 'Go to them first'],
          ['Sponsor', 'Clears blockers'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'People help when it works for [[1]] too. Find what\'s in it for [[2]].',
        blanks: [['them'], ['them']],
        distractors: ['me', 'Brian'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s question.',
        tiles: ['What', 'would', 'make', 'it', 'safe?'],
        distractors: ['fast'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a "no" you got recently. What might it have been protecting? What question could you have asked?',
    starters: ['The "no" was about...', 'I could have asked...'],
  },
  deepen: {
    title: 'The reason behind the no',
    summary: 'Next time someone says no, ask one question before you argue: "What would need to be true for this to work for you?"',
  },
  notes: 'Story setup. Understanding the other party\'s concerns before persuading: Cohen & Bradford (understand their world), Fisher & Ury (interests). Fictional figures (KSh 5,000 threshold, audit history).',
};

export default lesson;
