import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story: Diego's comment about Sofía's idea in the Day 70 review. The cost of saying nothing. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The comment in the meeting',
  summary: 'Day 70. Sofía finally shares one of her three ideas in the review: a pre-order map of Mexico, lighting up as orders come in. Diego grins. "Cute. Maybe for the kids\' menu." Everyone laughs. Except Sofía.',
  minutes: 11,
  outcomes: [
    'See what happens when a leader says nothing',
    'Know that feedback is part of the job, not a punishment',
    'Know this chapter\'s goal: say the hard things, kindly and clearly',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 70, the campaign review',
      beats: [
        { speaker: 'sofia', text: '...so as pre-orders come in, each state lights up on the map. People share it. It makes the launch feel like a race.' },
        { speaker: 'diego', text: '(grinning) Cute. Maybe for the kids\' menu.' },
        { speaker: 'narrator', text: 'A laugh goes round the table. Tomás laughs, then stops. Sofía closes her laptop very gently and looks at the table.' },
        { speaker: 'narrator', text: 'Lucía feels it: six weeks of building safety, and it can be undone in one joke. She also likes Diego. A lot. You\'re with Lucía.' },
      ],
      choice: {
        prompt: 'What should Lucía do?',
        options: [
          {
            text: 'In the meeting: "I want to hear more about the map, Sofía. What would it take?" Then talk to Diego privately, today.',
            outcome: 'Sofía looks up. Marta asks a question about the map. The meeting moves on, and so does the idea. Lucía books 15 minutes with Diego at 4 p.m.',
            best: true,
          },
          {
            text: 'Laugh along to keep the mood light.',
            outcome: 'The mood stays light. Sofía doesn\'t share her other two ideas, this month or ever.',
          },
          {
            text: '"Diego, that was really rude," in front of everyone.',
            outcome: 'Diego goes red and defensive. Now there are two people embarrassed in public, and the meeting is about him, not the map.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Saying nothing is a message too. Everyone in that room learned what happens when someone shares an idea. <strong>This chapter:</strong> feedback that helps, praise that counts, hard conversations, handling pushback, and asking for feedback yourself. Being kind and being clear are not opposites. The kindest thing is often the clearest.</p>",
    },
  ],
  apply: {
    scenario: 'Day 70, after the laugh.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does the team learn if Lucía says nothing?',
        options: [
          { text: 'That Diego is funny', why: 'They knew that.' },
          { text: 'That sharing ideas here can get you laughed at' },
          { text: 'Nothing', why: 'Silence from the leader is a message.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Where should each part happen?',
        groups: ['In the meeting', 'Privately, later'],
        items: [
          { text: 'Bring the focus back to Sofía\'s idea', group: 0 },
          { text: 'Tell Diego the impact of his comment', group: 1 },
          { text: '"Tell me more about the map."', group: 0 },
          { text: 'Ask Diego what he meant', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'sofia',
        message: 'It\'s fine. It was a silly idea anyway.',
        prompt: 'Lucía\'s best reply, after the meeting?',
        options: [
          { text: 'Yeah, Diego\'s like that. Ignore him.', why: 'Excuses the behaviour, and doesn\'t back her idea.' },
          { text: 'Okay, if you think so.', why: 'She\'s testing whether you meant it. Show you did.' },
          { text: 'It wasn\'t silly. I want to see a first version by next week, if you\'re up for it.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Praise in public, give tough feedback in ___. (one word)',
        answers: ['private', 'Private'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Lucía\'s response in order.',
        lines: ['Bring the focus back to the idea', 'Move the meeting on', 'Talk to Diego privately, today', 'Check in with Sofía'],
      },
      {
        kind: 'mcq',
        prompt: 'Why not call Diego out in front of everyone?',
        options: [
          { text: 'Public criticism makes people defensive, and the meeting becomes about him' },
          { text: 'Because he\'s been there longest', why: 'Seniority isn\'t the reason.' },
          { text: 'Because it wasn\'t a problem', why: 'It was. Just handle it privately.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s plan. Which step is the avoiding one?',
        lines: [
          'Ask Sofía for a first version of the map.',
          'Wait and see if Diego does it again.',
          'Book 15 minutes with Diego at 4 p.m.',
        ],
        bug: 1,
        fix: 'Talk to Diego today, while it\'s fresh.',
        explanation: 'Waiting makes it bigger, and the team sees nothing happen.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 3 review.',
        pairs: [
          ['Clear goal', '5,000 pre-orders by July 1'],
          ['Two-way door', 'Decide fast'],
          ['"Yes, if"', 'Managing a new priority'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'Say the [[1]] things, [[2]] and [[3]].',
        blanks: [['hard'], ['kindly'], ['clearly']],
        distractors: ['loudly', 'never'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build what Lucía says in the meeting.',
        tiles: ['Tell', 'me', 'more', 'about', 'the', 'map.'],
        distractors: ['joke'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time someone made a comment that shut a person down, and nobody said anything. What would you say now?',
    starters: ['The comment was...', 'I\'d say...'],
  },
  deepen: {
    title: 'Notice the silence',
    summary: 'In your next group conversation, watch what happens after someone shares an idea. Who builds on it? Who brushes it off? What does the leader do?',
  },
  notes: 'Story setup. Praise publicly / correct privately is standard manager guidance. Leader silence as a signal about psychological safety (Edmondson).',
};

export default lesson;
