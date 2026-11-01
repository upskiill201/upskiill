import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Card deck: leaving a conversation gracefully (Mastroianni et al. 2021). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Leaving a conversation gracefully',
  summary: 'At a friend\'s birthday party, a man called Gerald has been telling Grace about his kitchen extension for twenty-five minutes. She wants to leave. He might want to leave too. Neither of them knows how.',
  minutes: 11,
  outcomes: [
    'Know why conversations so rarely end when people want them to',
    'Use warm, clear exit lines',
    'Leave so the other person feels good, not dumped',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Twenty-five minutes. Gerald. Kitchen extension. Grace has nodded so much her neck hurts. She glances at Gerald. Gerald glances at the door.</p><p>Here's a fun fact: researchers at Harvard asked hundreds of people when they had wanted their conversations to end. Conversations <strong>almost never ended when both people wanted them to</strong>. People rarely knew when the other person wanted to leave, and often both people stayed longer than either wanted, out of politeness.</p><p>So leaving kindly isn't rude. It's often a relief for both of you.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Exit line 1: the honest goal</h3><p>\"I promised myself I'd meet three new people tonight, so I'm going to go and be brave. It was lovely talking to you!\"</p><h3>Exit line 2: the refill</h3><p>\"I'm going to grab another drink. Great to meet you, Gerald.\" (Then actually get a drink.)</p><h3>Exit line 3: the introduction</h3><p>\"Have you met Femi? He'd love your extension story.\" Introduce them to someone, then step back.</p>",
    },
    {
      kind: 'check',
      question: 'What did the research find about when conversations end?',
      options: ['They usually end exactly when both people want', 'They almost never end when both people want', 'Most people leave too early'],
      answer: 1,
      explanation: 'People rarely know when the other wants to stop, so most conversations end at the "wrong" time for someone.',
    },
    {
      kind: 'text',
      html: "<h3>Exit line 4: the summary</h3><p>\"Well, good luck with the extension. I hope the builders finish before Christmas!\" Referring back to their topic shows you listened, then closes it.</p><h3>Exit line 5: the next time</h3><p>\"Let's keep in touch. Are you on LinkedIn?\" Only if you mean it.</p><p><strong>The rules:</strong> say something warm, use their name if you can, mention their topic, and then actually go. Don't hover.</p>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Leave on a high: warm words + their name + a nod to their topic. Then go, cleanly. Nobody minds a kind exit.',
    },
  ],
  apply: {
    scenario: 'Saturday night, a birthday party. Gerald\'s kitchen extension.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each exit line to its type.',
        pairs: [
          ['"I\'m going to grab another drink."', 'The refill'],
          ['"Have you met Femi?"', 'The introduction'],
          ['"Good luck with the extension!"', 'The summary'],
          ['"I promised myself I\'d meet three people."', 'The honest goal'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Is leaving a conversation at an event rude?',
        options: [
          { text: 'Not if you do it kindly; it\'s often a relief for both people' },
          { text: 'Yes, always wait for them to leave', why: 'Then you might both wait forever.' },
          { text: 'Only if they\'re senior', why: 'Kind exits work with anyone.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Graceful exit, or clumsy?',
        groups: ['Graceful', 'Clumsy'],
        items: [
          { text: '"Lovely to meet you, Gerald. Good luck with the extension!"', group: 0 },
          { text: 'Walking away mid-sentence', group: 1 },
          { text: '"I\'m bored, bye."', group: 1 },
          { text: '"Have you met Femi? He\'d love this story."', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(Gerald) "...and THEN the plumber said the pipes were in the wrong wall."',
        prompt: 'Grace\'s graceful exit?',
        options: [
          { text: 'Okay bye.', why: 'Too abrupt.' },
          { text: 'The wrong wall! I hope it\'s sorted soon. I promised myself I\'d meet a few more people, so I\'m off to be brave. Lovely to meet you, Gerald.' },
          { text: 'Pretend her phone is ringing.', why: 'Works, but everyone has seen it before.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'After your exit line, don\'t ___. Just go. (one word)',
        answers: ['hover', 'linger', 'stay'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why mention their topic in your exit ("Good luck with the extension")?',
        options: [
          { text: 'To restart the conversation', why: 'It closes, not reopens.' },
          { text: 'It\'s a trick to make them stop talking', why: 'It\'s kindness, not a trick.' },
          { text: 'It shows you listened, and closes the topic warmly' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s exit. Which line spoils it?',
        lines: [
          'Lovely to meet you, Gerald.',
          'Good luck with the extension!',
          '(stays and hovers for five more minutes)',
        ],
        bug: 2,
        fix: '(walks away with a smile)',
        explanation: 'Once you\'ve said your exit line, go. Hovering makes it awkward for both of you.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Name + detail + connection', 'A great introduction'],
          ['I\'ll leave you two to it', 'Stepping back after introducing'],
          ['Kind exit at work', 'Warm words, a reason, a later time'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The exit recipe.',
        template: 'Say something [[1]], use their [[2]], mention their [[3]]. Then go.',
        blanks: [['warm', 'kind'], ['name'], ['topic']],
        distractors: ['rude', 'salary'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the refill exit.',
        tiles: ['I\'m', 'going', 'to', 'grab', 'a', 'drink.', 'Great', 'to', 'meet', 'you!'],
        distractors: ['bored'],
      },
    ],
  },
  reflect: {
    prompt: 'Which exit line feels most natural for you? Write it in your own words.',
    starters: ['My exit line: "..."'],
  },
  deepen: {
    title: 'Practise one exit',
    summary: 'At your next event, use one exit line on purpose, even in a conversation you\'re enjoying. Notice that people are fine with it, and often relieved.',
  },
  notes: 'Mastroianni, Gilbert, Cooney & Wilson (2021), "Do conversations end when people want them to?", PNAS 118(10): e2011809118 — 932 conversations; conversations almost never ended when both wanted; people poorly estimated partners\' desires. Exit lines are practical advice. Gerald is a named extra.',
};

export default lesson;
