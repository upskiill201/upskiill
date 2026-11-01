import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Step-by-step: following the thread — "building on that", "to piggyback", "going back to...", "+1". */
const lesson: OriginalLesson = {
  key: 'l08',
  title: '"Building on that": following the thread',
  summary: 'Emeka makes a point. Wanjiku says "to piggyback on that". Brian says "building on what Emeka said". Remi wants to join in, but every time he speaks, the conversation goes sideways.',
  minutes: 12,
  outcomes: [
    'Decode "building on that", "to piggyback", "going back to", "+1"',
    'Join a discussion so your point connects to what was just said',
    'Bring the conversation back to an earlier point without being rude',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'How to add to a discussion, in four moves',
      steps: [
        {
          title: 'Listen for the thread',
          body: 'A meeting discussion is a thread: each point connects to the one before. Emeka says: "Swift Freight is late because their trucks leave Mombasa a day late." That\'s the thread right now: WHY deliveries are late.',
        },
        {
          title: 'Connect to the person',
          body: 'Start by linking to what was just said: "Building on Emeka\'s point...", "To piggyback on that...", "Following on from that...". All three mean: I\'m adding to this, not changing the subject.',
        },
        {
          title: 'Add ONE new thing',
          body: 'Then say your one new thing: "...the invoices show the same pattern: 9 of 12 late deliveries started on a Monday." One point, with a fact. Not three points and a story.',
        },
        {
          title: 'Hand it back',
          body: 'Finish with a question or a link that keeps the thread going: "Emeka, is Monday a problem at the port?" Now the conversation moves forward, together.',
        },
      ],
    },
    {
      kind: 'text',
      html: "<p>More thread phrases you'll hear:</p><ul><li><strong>\"Going back to what Wanjiku said...\"</strong> returning to an earlier point.</li><li><strong>\"+1\" or \"plus one to that\"</strong> I agree with that (very informal, mostly in chat).</li><li><strong>\"Just to add to that...\"</strong> a small extra point.</li><li><strong>\"On a slightly different note...\"</strong> a polite warning that you're changing the topic.</li><li><strong>\"That's a great segue into...\"</strong> (say \"seg-way\") a smooth move to the next topic.</li></ul>",
    },
    {
      kind: 'check',
      question: 'Wanjiku says, "To piggyback on that..." What is she about to do?',
      options: ['Change the subject', 'Add to the point just made', 'Disagree strongly'],
      answer: 1,
      explanation: 'Piggyback: picture riding on someone\'s back. She\'s adding to their point.',
    },
  ],
  apply: {
    scenario: 'Wednesday. The supplier sync, in full flow.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the phrase to what it signals.',
        pairs: [
          ['Building on that', 'Adding to the point just made'],
          ['Going back to...', 'Returning to an earlier point'],
          ['On a slightly different note', 'Changing the topic'],
          ['+1', 'I agree'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s contribution in order.',
        lines: ['Building on Emeka\'s point,', 'the invoices show 9 of 12 late deliveries started on a Monday.', 'Emeka, is Monday a problem at the port?'],
      },
      {
        kind: 'mcq',
        prompt: 'The thread is "why are deliveries late?" Which contribution fits best?',
        options: [
          { text: '"Has anyone tried the new canteen chapati?"', why: 'Completely off the thread. Parking lot, at best.' },
          { text: '"To add to that, late deliveries cost us two refunds last week."' },
          { text: '"I have three unrelated points and a story."', why: 'One point, connected to the thread.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: '(in the meeting chat) +1 to Emeka',
        prompt: 'What is Zanele saying?',
        options: [
          { text: 'She agrees with Emeka' },
          { text: 'She\'s giving Emeka one point in a game', why: 'It\'s chat shorthand for agreement.' },
          { text: 'She wants to speak next', why: 'That would be "I\'d like to add something".' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '"To ___ on that" means to add to someone\'s point (like riding on their back). (one word)',
        answers: ['piggyback', 'piggy-back'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s contribution. Which part breaks the thread?',
        lines: [
          'Building on what Wanjiku said about costs,',
          'the late deliveries led to two refunds last week.',
          'Also, I think the office printer needs replacing.',
        ],
        bug: 2,
        fix: 'Should we add refunds to the supplier review?',
        explanation: 'The printer is a new topic. Save it, or say "on a slightly different note" at the right moment.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Staying on the thread, or changing topic?',
        groups: ['Staying on it', 'Changing topic'],
        items: [
          { text: 'Building on that...', group: 0 },
          { text: 'On a slightly different note...', group: 1 },
          { text: 'To piggyback on Emeka\'s point...', group: 0 },
          { text: 'That\'s a great segue into...', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Ten minutes ago, Wanjiku mentioned refunds and nobody answered. Remi wants to return to it. Best phrase?',
        options: [
          { text: '"Nobody listened to Wanjiku."', why: 'True, perhaps, but it embarrasses people. Bring it back kindly.' },
          { text: '"Refunds!"', why: 'Too abrupt.' },
          { text: '"Going back to what Wanjiku said about refunds..."' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The four moves.',
        template: 'Listen for the [[1]], connect to the [[2]], add [[3]] new thing, hand it back.',
        blanks: [['thread'], ['person'], ['one']],
        distractors: ['printer', 'three'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['Drill down', 'Look closer at the details'],
          ['Unpack', 'Explain in more detail'],
          ['Move the needle', 'Make a visible difference'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'In your last group discussion, did you ever say something that didn\'t connect to what had just been said? How would you say it with one of today\'s phrases?',
    starters: ['I said...', 'Next time I\'ll start with...'],
  },
  deepen: {
    title: 'Listen for the links',
    summary: 'In your next meeting, class or podcast, count how many times people say "building on that", "to add to that" or "going back to". Good discussions are full of them.',
  },
  notes: '"Piggyback on" (Cambridge: use something that already exists for one\'s own benefit / add to; meeting usage informal), "segue" (pronounced SEG-way; Merriam-Webster), "+1" (internet slang: agreement). Mombasa = Kenya\'s main port.',
};

export default lesson;
