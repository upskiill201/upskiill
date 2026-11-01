import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Card deck: the follow-up message. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The follow-up message',
  summary: 'Whatever happens on stage tonight, Arjun says, the real result comes tomorrow morning. "Most people pitch well and never follow up. Don\'t be most people."',
  minutes: 11,
  outcomes: [
    'Follow up within a day',
    'Write a short, specific follow-up',
    'Keep the door open even after a "no"',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>A pitch earns the next conversation. The follow-up makes sure it actually happens.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Within a day</h3><p>Send it within 24 hours, while they still remember you. The longer you wait, the more you become \"one of the ten finalists\".</p><h3>Card 2: Remind them who you are</h3><p>One line: \"I'm Ada, speaker seven, the ajo app, the one with the Tunde story.\" A memorable detail helps them place you instantly.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 3: Refer to something they said</h3><p>\"You asked what happens if a bank copies us. I've thought more about it...\" It shows you listened and gives them a reason to reply.</p><h3>Card 4: Repeat the ask, and make it easy</h3><p>One specific next step with options: \"Could we have a 15-minute call next week? Tuesday or Thursday afternoon both work for me.\"</p>",
    },
    {
      kind: 'check',
      question: 'When should Ada send her follow-up?',
      options: ['Within 24 hours', 'In about a month', 'Only if they contact her first'],
      answer: 0,
      explanation: 'Within a day, while the pitch is fresh in their mind.',
    },
    {
      kind: 'text',
      html: "<h3>Card 5: If it's a no</h3><p>Thank them anyway, and keep the door open: \"Thank you for the tough questions. Could I send you an update in three months?\" A polite \"no\" today can become a \"yes\" when you have more proof.</p><h3>Card 6: One gentle reminder</h3><p>No reply after a week? One short, friendly nudge is fine. After that, let it go and focus on others.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Within a day. Remind them who you are. Mention something they said. One easy next step. Thank them, even for a no.',
    },
  ],
  apply: {
    scenario: 'Arjun: "Don\'t be most people."',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Ada\'s follow-up message in order.',
        lines: ['Hi Mrs Adeyemi, I\'m Ada, speaker seven, the ajo app.', 'You asked what happens if a bank copies us; I\'ve thought more about it.', 'Could we have a 15-minute call next week?', 'Tuesday or Thursday afternoon both work. Thank you, Ada'],
      },
      {
        kind: 'mcq',
        prompt: 'Why mention something the judge said?',
        options: [
          { text: 'To argue with them', why: 'To continue the conversation, not argue.' },
          { text: 'To make the message longer', why: 'It should stay short.' },
          { text: 'It shows you listened, and gives them a reason to reply' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good follow-up, or not?',
        groups: ['Good', 'Not great'],
        items: [
          { text: 'Sent the next morning', group: 0 },
          { text: 'Sent a month later', group: 1 },
          { text: 'Offers two times for a call', group: 0 },
          { text: '"Let me know if you\'re ever interested in anything."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'What if a judge says no? Do I just disappear?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Thank them and ask if you can send an update in three months. Today\'s no can become a yes.' },
          { text: 'Yes, never contact them again.', why: 'You lose a future yes.' },
          { text: 'Message them every day until they say yes.', why: 'One gentle reminder at most.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Send your follow-up within how many hours? (a number)',
        answers: ['24', 'twenty-four'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'No reply after a week. What now?',
        options: [
          { text: 'Ten messages in a row', why: 'That\'s pressure, not follow-up.' },
          { text: 'One short, friendly reminder, then focus on others' },
          { text: 'Give up immediately', why: 'One gentle nudge is fine.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s draft follow-up. Which line breaks the rules?',
        lines: [
          'Hi Mrs Adeyemi, I\'m Ada, speaker seven, the ajo app.',
          'Attached are my 40-page business plan, my CV and all my database diagrams.',
          'Could we have a 15-minute call next week?',
        ],
        bug: 1,
        fix: 'You asked about bank competitors; I\'ve thought more about it.',
        explanation: 'A pile of attachments is a lot to ask of a busy judge. One specific reference instead.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card to its rule.',
        pairs: [
          ['Timing', 'Within a day'],
          ['Next step', 'Specific, with options'],
          ['After a no', 'Thank them, offer an update later'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Ada\'s easy next step.',
        template: 'Could we have a [[1]]-minute call next week? [[2]] or Thursday afternoon both [[3]] for me.',
        blanks: [['15', 'fifteen'], ['Tuesday'], ['work']],
        distractors: ['60', 'never'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the reminder line.',
        tiles: ['I\'m', 'Ada,', 'speaker', 'seven,', 'the', 'ajo', 'app.'],
        distractors: ['just'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of someone you met or pitched to recently and never followed up with. Draft a short follow-up now.',
    starters: ['Hi ..., I\'m ..., we met at...', 'You mentioned...', 'Could we...'],
  },
  deepen: {
    title: 'Send it',
    summary: 'Send the follow-up you just drafted. Even if the meeting was weeks ago, a short, specific message with an easy next step is better than none.',
  },
  notes: 'Prompt, specific follow-up with a concrete next step is standard networking and sales guidance.',
};

export default lesson;
