import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10. Unit Challenge: three messages. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: three messages',
  summary: 'Launch week. Three messages land in an hour, each one easy to misread. Grace runs her new rules on every one before she replies. Everything from Chapter 3.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Check meaning before reacting to messages', 'Use everything from Chapter 3 together'],
  learn: [
    {
      kind: 'reading',
      title: 'Three messages',
      html: '<p><strong>10:02, Priya:</strong> "Can we talk at 4?" (No reason.)</p><p><strong>10:20, Arjun:</strong> "Interesting choice on the step 3 buttons." (Is that a compliment or a dig?)</p><p><strong>10:45, Femi:</strong> "Saw your notes. OK." (Again, short.)</p><p>Grace\'s replies, after a pause:</p><ul><li>To Priya: <em>"Sure! Anything I should bring?"</em> Priya: <em>"Just your launch-week workload. I want to make sure you\'re not overloaded."</em></li><li>To Arjun: <em>"Ha, interesting good or interesting worrying?"</em> Arjun: <em>"Good! Much clearer than before."</em></li><li>To Femi: nothing. She remembers their habit: short means busy, and they both ask if something really feels off. She lets it be.</li></ul>',
    },
    {
      kind: 'story',
      title: '4 p.m.',
      beats: [
        { speaker: 'grace', text: 'Three messages. Zero cold wars. On Tuesday I\'d have had three.' },
        { speaker: 'priya', text: 'Good, because I do need to talk about your workload. And there\'s a new product manager starting Monday.' },
        { speaker: 'tey', text: 'That\'s Chapter 3: tone, the ladder, intent and impact, checking, clearing up. Next: when criticism is unfair.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 3 challenge: three messages.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each message to Grace\'s check.',
        pairs: [
          ['"Can we talk at 4?"', '"Anything I should bring?"'],
          ['"Interesting choice on the buttons."', '"Interesting good or worrying?"'],
          ['"Saw your notes. OK."', 'Let it be: short means busy'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Priya actually want to talk about?',
        options: [
          { text: 'Making sure Grace isn\'t overloaded in launch week' },
          { text: 'A complaint about Grace', why: 'That was the top of the ladder.' },
          { text: 'Firing her', why: 'Nothing like that.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fact or story, about Arjun\'s message?',
        groups: ['Fact', 'Story'],
        items: [
          { text: 'He wrote "Interesting choice."', group: 0 },
          { text: 'He hates the design', group: 1 },
          { text: 'He sent it at 10:20', group: 0 },
          { text: 'He\'s mocking her', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'Should I check Femi\'s "OK." too?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'You agreed: short means busy, and you ask if something really feels off. Does it? If not, let it be.' },
          { text: 'Yes, check every message.', why: 'Checking everything gets tiring; use the agreed habit.' },
          { text: 'Assume he\'s angry.', why: 'That\'s the old ladder.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s light question to Arjun.',
        template: '"Interesting [[1]] or interesting [[2]]?"',
        blanks: [['good'], ['worrying', 'bad']],
        distractors: ['rude', 'boring'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many messages arrived in that hour?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is "Anything I should bring?" a good reply to "Can we talk at 4?"',
        options: [
          { text: 'It\'s friendly, and it gently asks what the meeting is about' },
          { text: 'It avoids the meeting', why: 'It accepts and asks.' },
          { text: 'It\'s too formal', why: 'It\'s light and useful.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which of Grace\'s old reactions would have started a cold war?',
        lines: [
          'Pause before replying.',
          'Ask Arjun what he meant.',
          'Reply to Femi: "OK? That\'s it?"',
          'Ask Priya what to bring.',
        ],
        bug: 2,
        fix: 'Let it be, or ask lightly if it really feels off.',
        explanation: 'It reacts to a story about a short word.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which chapter skill is this?',
        groups: ['Ladder', 'Checking'],
        items: [
          { text: 'Separating "wrote X" from "hates me"', group: 0 },
          { text: '"Interesting good or worrying?"', group: 1 },
          { text: 'Asking "what else could it mean?"', group: 0 },
          { text: '"Anything I should bring?"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Grace\'s routine for each message.',
        lines: ['Pause', 'Climb down to the words', 'Decide if it matters', 'Ask lightly, or let it be'],
      },
    ],
  },
  reflect: {
    prompt: 'Look at the last three messages that bothered you. Run Grace\'s routine on each.',
    starters: ['Message:...', 'Fact:...', 'Check:...'],
  },
  deepen: {
    title: 'Choosing what to check',
    summary: 'You don\'t need to check every message. Check the ones that would change how you act. For the rest, the generous reading is usually right.',
  },
  notes: 'Chapter 3 challenge (fictional): three ambiguous messages; checks reveal positive or neutral meaning. Hook: new product manager (Callum) starts Monday.',
};

export default lesson;
