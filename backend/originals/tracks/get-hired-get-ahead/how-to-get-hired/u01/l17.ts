import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 17 — the founder goes quiet after the chat. Story choice: how to handle silence. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'When they go quiet',
  summary: 'Thursday\'s chat at Kmer Logistics went brilliantly. The founder said, "I\'ll be in touch next week." That was ten days ago. Silence. And then, from nowhere, a message from Arjun, who never replied the first time.',
  minutes: 11,
  outcomes: ['Handle silence after a good conversation', 'Write a follow-up that adds something', 'Keep going while you wait'],
  learn: [
    {
      kind: 'story',
      title: 'Ten days',
      beats: [
        { speaker: 'narrator', text: 'Ten days since the chat at Kmer Logistics. Clinton checks his email every 20 minutes.' },
        { speaker: 'clinton', text: 'He said "next week". It\'s been ten days. He hates me. I said something wrong about the delivery tracker.' },
        { speaker: 'miracle', text: 'Or he\'s running a start-up that just won a huge contract. Founders are drowning in work. Silence isn\'t a no.' },
        { speaker: 'narrator', text: 'Then a notification. Arjun, from three weeks ago: "Sorry for the slow reply, Clinton! Crazy month. Great question. Honestly? Learn how payment webhooks fail. Happy to look at your tracker if you want."' },
        { speaker: 'tey', text: 'People reply late all the time. The question is what you do while you wait.' },
      ],
      choice: {
        prompt: 'What should Clinton do about the founder?',
        options: [
          {
            text: 'Send one follow-up that adds something useful, then keep working on other leads.',
            outcome: 'He sends a one-page sketch of how Kmer could track deliveries, built over the weekend. The founder replies the next morning: "This is great. Sorry, mad week. Can we talk Monday?"',
            best: true,
          },
          {
            text: 'Message every day until he replies.',
            outcome: 'Day three: the founder\'s reply is short and cold. A busy person now feels chased.',
          },
          {
            text: 'Give up: if he wanted me, he\'d have called.',
            outcome: 'The founder finally gets through his inbox two weeks later and wonders why Clinton went quiet.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Silence is usually busy, not no. Follow up once with something useful, and keep other doors open while you wait.',
    },
  ],
  apply: {
    scenario: 'Clinton waits for Kmer Logistics.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is the founder probably quiet?',
        options: [
          { text: 'He\'s busy with the new contract' },
          { text: 'He hates Clinton', why: 'There\'s no sign of that. Busy is far more likely.' },
          { text: 'The chat went badly', why: 'It went well. Silence usually means busy.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good follow-up or poor?',
        groups: ['Good', 'Poor'],
        items: [
          { text: 'A one-page sketch that helps them', group: 0 },
          { text: 'Why haven\'t you called?', group: 1 },
          { text: 'A short note with something useful', group: 0 },
          { text: 'Daily "any news?" messages', group: 1 },
          { text: 'Thanks again, here\'s an idea', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s reply to Arjun.',
        from: 'arjun',
        message: 'Sorry for the slow reply! Learn how payment webhooks fail. Happy to look at your tracker if you want.',
        options: [
          { text: 'No problem at all, and thank you! I\'d love that. Here\'s the link, whenever suits you.' },
          { text: 'Took you long enough.', why: 'He owed nothing. Be gracious.' },
          { text: 'Can you also get me a job?', why: 'Accept the kind offer first.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would hurt Clinton\'s chances.',
        lines: ['Thanks again for Thursday.', 'I noticed you haven\'t replied and I\'m quite disappointed.', 'I sketched an idea for tracking deliveries.'],
        bug: 1,
        explanation: 'Guilt makes busy people avoid you. Add value instead.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s plan in order.',
        lines: ['Wait about a week', 'Send one follow-up that adds something', 'Keep working on other leads', 'If still nothing, try once more later, then let it go'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['A follow-up with a sketch', 'A reply the next morning'],
          ['Daily messages', 'A short, cold reply'],
          ['Giving up', 'The founder wonders where he went'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should Clinton do while he waits?',
        options: [
          { text: 'Keep talking to other people on his map' },
          { text: 'Stop everything until Kmer replies', why: 'Never put everything on one door.' },
          { text: 'Check email every 20 minutes', why: 'Exhausting, and changes nothing.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s line.',
        template: 'Silence isn\'t a [[1]]. Founders are drowning in [[2]].',
        blanks: [['no'], ['work']],
        distractors: ['yes', 'money', 'sleep'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days has it been since the chat? (a number)',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Healthy while waiting, or not?',
        groups: ['Healthy', 'Not healthy'],
        items: [
          { text: 'Booking another informational call', group: 0 },
          { text: 'Rereading the founder\'s last email 40 times', group: 1 },
          { text: 'Improving the tracker', group: 0 },
          { text: 'Deciding he\'s a failure', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'How do you usually react when someone goes quiet? What would you do differently, using Clinton\'s approach?',
    starters: ['When people go quiet, I usually...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Think of one waiting situation in your life. Write a follow-up that adds something useful, rather than asking "any news?".',
  },
  notes: 'Arjun (CastId arjun) replies late to l06\'s message. "Add value in the follow-up" is common careers advice. The founder (Mr Tamba, named extra) is not a CastId.',
};

export default lesson;
