import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 18. Story with a choice: declining a meeting politely — Friday morning, three new invites and one hour to prepare. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Declining a meeting politely',
  summary: 'Friday, 7:45 a.m. The CEO meeting is at 10. Remi needs every minute to prepare. Then three new invites arrive. Saying no to colleagues in week two feels impossible.',
  minutes: 12,
  outcomes: [
    'Decline a meeting without damaging the relationship',
    'Offer an alternative instead of a flat no',
    'Know when NOT to decline',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 7:45 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Remi is at his desk early, rereading the pre-read and Mrs Achieng\'s rules. The supplier review with Mr Kamau is at 10. Brian is still off sick.' },
        { speaker: 'narrator', text: 'Ping. "Pre-sync before the CEO meeting? 9:00 to 9:45" from Zanele. Ping. "Quick catch-up re: printer" from Felix. Ping. "Brainstorm: drones" from Zanele again.' },
        { speaker: 'remi', text: '(If I go to all three, I walk into the CEO meeting unprepared.)' },
        { speaker: 'tey', text: "Here's the thing about declining: it's normal. Everyone does it. The difference between a polite no and a rude one is about ten words." },
      ],
      choice: {
        prompt: 'What does Remi do with the three invites?',
        options: [
          {
            text: 'Accept all three. You don\'t say no in week two.',
            outcome: 'Remi spends 9:00 to 9:58 in meetings, runs into the CEO meeting with his notes in the wrong order, and forgets the refund numbers. Mr Kamau is polite about it. Remi is not polite to himself.',
          },
          {
            text: 'Decline all three with no message.',
            outcome: 'Felix thinks Remi is ignoring him. Zanele thinks he\'s angry. At lunch, two people ask "are we okay?"',
          },
          {
            text: 'Accept a shorter pre-sync with Zanele, and decline the other two with a short, warm note and another time.',
            outcome: 'Zanele\'s pre-sync becomes 15 useful minutes. Felix replies "No worries, Monday works." The drones go to the parking lot, as usual. Remi walks into the CEO meeting ready.',
            best: true,
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p><strong>The polite decline has three parts:</strong></p><ol><li><strong>Thanks:</strong> \"Thanks for the invite.\"</li><li><strong>A short reason:</strong> \"I'm preparing for the 10 a.m. with Mr Kamau.\" Short, true, no essay.</li><li><strong>Another way:</strong> \"Could we do Monday at 2?\" or \"Could you send me the notes?\" or \"Happy to share my thoughts by email.\"</li></ol><p><strong>When NOT to decline:</strong> when you're required and the meeting can't happen without you, or when your manager has asked you to be there. Then talk to the organiser instead.</p>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Most calendar apps let you decline with a message. Always add one. A decline with no message reads like a door closing; with one line, it reads like "not now".',
    },
  ],
  apply: {
    scenario: 'Friday, 7:50 a.m. Three invites, one hour.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s decline to Felix in order.',
        lines: ['Thanks for the invite, Felix.', 'I\'m preparing for the 10 a.m. with Mr Kamau today.', 'Could we do Monday at 2 instead?'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Polite decline, or not?',
        groups: ['Polite', 'Not polite'],
        items: [
          { text: 'Thanks! I can\'t today, could you send the notes?', group: 0 },
          { text: '(Declines with no message)', group: 1 },
          { text: 'No.', group: 1 },
          { text: 'I\'m prepping for a deadline. Monday at 2?', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Pre-sync at 9? 45 minutes? I have so many thoughts.',
        prompt: 'Remi wants to help but needs to prepare. Best reply?',
        options: [
          { text: 'Can\'t, sorry.', why: 'Zanele wants to help him too. Find a middle way.' },
          { text: 'Could we make it 15 minutes at 9? Bring your top three thoughts and I\'ll fit them into my notes.' },
          { text: 'Sure, 45 minutes!', why: 'Then there\'s no time left to prepare.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'How long should the reason in a decline be?',
        options: [
          { text: 'Short and true: one line' },
          { text: 'A full paragraph so they understand', why: 'Long explanations sound like excuses.' },
          { text: 'No reason ever', why: 'One line helps people not take it personally.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A polite decline has thanks, a short reason, and another ___. (one word)',
        answers: ['way', 'time', 'option'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s decline to the drone brainstorm. Which line could hurt?',
        lines: [
          'Thanks for the invite, Zanele!',
          'Honestly, drones are a waste of everyone\'s time.',
          'Could I send you my thoughts by email instead?',
        ],
        bug: 1,
        fix: 'I\'m prepping for Mr Kamau today.',
        explanation: 'Declining the meeting is fine. Declining the idea, rudely, in the same message isn\'t.',
      },
      {
        kind: 'mcq',
        prompt: 'When should Remi NOT simply decline?',
        options: [
          { text: 'When it\'s a brainstorm', why: 'Brainstorms can usually be declined politely.' },
          { text: 'When he\'s required and the meeting can\'t happen without him' },
          { text: 'When it\'s on a Friday', why: 'The day doesn\'t matter.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the "other way" to the situation.',
        pairs: [
          ['You can\'t make it but want to know', '"Could you send me the notes?"'],
          ['You want to meet, just not now', '"Could we do Monday at 2?"'],
          ['You have an opinion to share', '"I\'ll send my thoughts by email."'],
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Tentative', 'Maybe coming'],
          ['Bandwidth', 'Time and energy for more'],
          ['Parking lot', 'Topics for another day'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a warm one-line decline.',
        tiles: ['Thanks!', 'I', 'can\'t', 'today.', 'Could', 'we', 'do', 'Monday?'],
        distractors: ['No.', 'never'],
      },
    ],
  },
  reflect: {
    prompt: 'Who do you find it hardest to say no to? Write a three-part decline (thanks, reason, another way) for the next time they ask.',
    starters: ['Thanks for...', 'I\'m...', 'Could we...?'],
  },
  deepen: {
    title: 'Protect your preparation time',
    summary: 'Before a big meeting, presentation or exam, block the hour before it in your calendar as "Prep". It\'s much easier to decline when the time is already taken.',
  },
  notes: 'Decline practice: calendar tools (Outlook, Google Calendar) support decline-with-message. Advice is general workplace etiquette; norms around declining seniors vary by culture, covered by the "when not to decline" note.',
};

export default lesson;
