import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Reading: romance-investment scams. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'When love becomes the bait',
  summary: 'Grace remembers Maureen, a nurse she trained with, who lost her savings to a man she\'d never met. Romance-investment scams are slow, patient and devastating. Here\'s how they work.',
  minutes: 12,
  outcomes: [
    'Explain how romance-investment scams work',
    'Spot the signs early',
    'Support someone who may be caught in one',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Maureen\'s story',
      html: '<p>Maureen was 58, recently widowed, and lonely. A message arrived on a social app from "David", a friendly engineer working on an oil rig. He was warm, funny and always there in the evenings.</p><p><strong>The slow build.</strong> For three months they talked every day. He never asked for anything. He sent photos (taken from someone else\'s profile), voice notes, good-morning messages. He always had a reason he couldn\'t video call: bad signal on the rig.</p><p><strong>The turn.</strong> Then he mentioned, casually, that he\'d made good money on a crypto platform. He offered to show her. She started with £1,000. The dashboard showed it growing. She put in more. Over five months she put in £38,000, including money from her pension.</p><p><strong>The end.</strong> When she tried to withdraw for her daughter\'s wedding, there was a fee. Then another. Then "David" stopped replying.</p><p><strong>Why these scams work:</strong> they use real human needs, love and connection, and they take time, so trust feels earned. Some criminal groups run them on an industrial scale, sometimes using people who have themselves been trafficked and forced to work in scam centres.</p><p><strong>Warning signs:</strong></p><ul><li>An online-only relationship that moves fast emotionally.</li><li>Always a reason not to video call or meet.</li><li>Any mention of investments, crypto or "opportunities", however casual.</li><li>Requests for secrecy: "Don\'t tell your family, they won\'t understand us."</li></ul><p><strong>If someone you love is in one:</strong> they may not believe you at first. Stay close, don\'t mock, ask gentle questions ("Have you video called?"), and help them talk to their bank.</p>',
    },
    {
      kind: 'check',
      question: 'Which is the clearest warning sign in a new online relationship?',
      options: ['They say good morning', 'They bring up an investment opportunity', 'They like your photos'],
      answer: 1,
      explanation: 'Any move from romance to money or investing is the big red flag.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Online-only, fast feelings, no video calls, then talk of investments: that\'s the pattern. Love that leads to a crypto platform is a scam.',
    },
  ],
  apply: {
    scenario: 'Maureen\'s story.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order how Maureen\'s scam unfolded.',
        lines: ['A friendly message', 'Months of daily chat', 'A casual mention of crypto profits', 'Small investment, then more', 'Withdrawal fees', 'He vanishes'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Warning sign, or normal?',
        groups: ['Warning sign', 'Normal'],
        items: [
          { text: 'Never able to video call', group: 0 },
          { text: 'Meeting friends in person', group: 1 },
          { text: '"Don\'t tell your family about us"', group: 0 },
          { text: 'Mentioning a crypto platform', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did "David" wait three months before mentioning money?',
        options: [
          { text: 'He was busy on the rig', why: 'There was no rig.' },
          { text: 'He forgot', why: 'The wait is part of the plan.' },
          { text: 'So trust felt earned and the request felt natural' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'If I\'d known, what could I have said to Maureen?',
        prompt: 'What does Tey suggest?',
        options: [
          { text: 'Gentle questions, not accusations: "Have you two video called? Would he mind if you checked the platform with your bank?"' },
          { text: '"He\'s obviously a scammer, you fool."', why: 'Mockery pushes people closer to the scammer.' },
          { text: 'Nothing; it\'s her business.', why: 'Gentle support can help.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The pattern.',
        template: 'Love that leads to an [[1]] platform is a [[2]].',
        blanks: [['investment', 'crypto'], ['scam']],
        distractors: ['dating', 'gift'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Maureen started with £1,000 and lost £38,000 in total. How much more did she put in after the first £1,000?',
        answers: ['37000', '37,000', '£37,000', '£37000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tactic to what it does.',
        pairs: [
          ['Months of daily messages', 'Builds deep trust'],
          ['"Bad signal, can\'t video"', 'Hides his real face'],
          ['"Don\'t tell your family"', 'Isolates her'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which way of helping is likely to backfire?',
        lines: [
          'Ask gently whether they\'ve video called.',
          'Offer to go with her to the bank.',
          'Post in the family group that she\'s been "stupid".',
        ],
        bug: 2,
        fix: 'Stay close and kind; shame drives people away.',
        explanation: 'Humiliation can push victims to trust the scammer more.',
      },
      {
        kind: 'mcq',
        prompt: 'Why might someone in a romance scam not believe you at first?',
        options: [
          { text: 'They\'re foolish', why: 'Feelings, not foolishness.' },
          { text: 'They always believe you', why: 'Often they don\'t, at first.' },
          { text: 'Their feelings are real, even though he isn\'t' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Who sometimes runs these scams at large scale?',
        options: [
          { text: 'Banks', why: 'Criminal groups.' },
          { text: 'Criminal groups, sometimes using trafficked workers in scam centres' },
          { text: 'Lonely individuals only', why: 'Often organised crime.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Is there anyone in your life who might be lonely and online a lot? How could you check in on them?',
    starters: ['I think of...', 'I could...'],
  },
  deepen: {
    title: '"Pig butchering"',
    summary: 'Investigators sometimes call romance-investment scams "pig butchering", a translation of a term used by the gangs themselves for fattening victims up with trust before taking everything. Reports from the UN and others describe scam compounds holding trafficked workers.',
  },
  notes: 'Maureen narrated (fictional composite). UNODC/OHCHR 2023 reports on scam centres and trafficking. Romance fraud signs per Action Fraud guidance.',
};

export default lesson;
