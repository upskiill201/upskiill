import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 9 — chat-app writing: no bare "hi", one complete message, threads, timing. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Messages for chat apps',
  summary: 'Slack, Teams, WhatsApp: chat has its own rules. Break them and you get slow answers and annoyed colleagues.',
  minutes: 12,
  outcomes: [
    'Send one complete message instead of a trickle',
    'Use threads and channels so messages stay findable',
    'Respect people\'s time and time zones in chat',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Sending just "Hi!" and waiting for a reply is the polite way to start.',
          isFact: false,
          explain: 'It forces the other person to wait for your real question. Say hi AND ask in the same message.',
        },
        {
          text: 'Five short messages in a row are easier to read than one.',
          isFact: false,
          explain: 'Each one can trigger a notification. One complete message is kinder.',
        },
        {
          text: 'Replying in a thread keeps busy channels readable.',
          isFact: true,
          explain: 'Threads keep a conversation together and stop it burying everyone else\'s messages.',
        },
        {
          text: 'A message sent at 11pm can feel urgent even when it is not.',
          isFact: true,
          explain: 'Late messages create pressure. Schedule them, or say "no rush, for tomorrow".',
        },
      ],
    },
    {
      kind: 'reading',
      title: 'Chat rules that make you easy to work with',
      html:
        '<ul>' +
        '<li><strong>Greeting and ask together.</strong> "Hi Grace! Could you send the logo file when you get a minute?" One message, ready to answer.</li>' +
        '<li><strong>Complete, not chopped.</strong> Write the whole thought, then send. Chat is still writing.</li>' +
        '<li><strong>Say how urgent it is.</strong> "No rush, for tomorrow" or "Need this in the next hour, sorry!" Nobody has to guess.</li>' +
        '<li><strong>Threads for follow-ups.</strong> Keep replies under the message they belong to.</li>' +
        '<li><strong>Channel vs direct message.</strong> Questions the whole team could learn from go in the channel; personal ones go direct.</li>' +
        '<li><strong>Time zones and hours.</strong> Use "schedule send" if your app has it, especially for colleagues abroad.</li>' +
        '</ul>' +
        '<p>AI helps here too: <em>"Turn this into one chat message: greeting plus the ask, 2 lines, say it is not urgent."</em></p>',
    },
    {
      kind: 'compare',
      title: 'Trickle vs one message',
      before: { label: 'The trickle', text: 'hi\nare you there?\nquick q\nabout the logo\nwhich file is final' },
      after: { label: 'One message', text: 'Hi Grace! Which logo file is the final one? No rush, I need it for tomorrow morning.' },
      notes: ['Greeting and ask in one go.', 'Five notifications became one.', 'The urgency is clear.'],
    },
    {
      kind: 'check',
      question: 'What should go in your first chat message?',
      options: ['Just "Hi!"', 'The greeting and your actual question', 'Nothing until they say hi back'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is tidying up how she uses chat at work.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Good chat habit, or annoying?',
        groups: ['Good habit', 'Annoying'],
        items: [
          { text: 'Hi Grace! Could you send the logo? No rush.', group: 0 },
          { text: '"hi" ... (waits 10 minutes)', group: 1 },
          { text: 'Five messages in a row', group: 1 },
          { text: 'Replying in the thread', group: 0 },
          { text: 'Saying how urgent it is', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a bare "Hi!" a problem in work chat?',
        options: [
          { text: 'The other person has to wait for your real question' },
          { text: 'It is rude to greet people', why: 'Greeting is fine; just add the question.' },
          { text: 'Chat apps block greetings', why: 'They do not.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Turn the trickle into one message.',
        tiles: ['Hi', 'Grace!', 'Which', 'logo', 'file', 'is', 'final?'],
        distractors: ['are', 'there?'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'hi',
        prompt: 'Lucía sent only "hi" an hour ago. What is the most helpful reply?',
        options: [
          { text: "Hi Lucía! What can I help with?" },
          { text: '(Wait for her to say more)', why: 'You could both wait forever.' },
          { text: '"Why just hi?"', why: 'Not friendly, even if fair.' },
        ],
        answer: 0,
        explanation: 'You cannot control how others write, but you can keep it moving kindly.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the message to where it belongs.',
        pairs: [
          ['A question the whole team could learn from', 'The team channel'],
          ['A personal or private matter', 'A direct message'],
          ['A follow-up to an earlier message', 'The thread'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s chat request to the AI.',
        template: 'Turn this into [[1]] chat message: greeting plus the [[2]], 2 lines, say it is not [[3]].',
        blanks: [['one'], ['ask', 'question'], ['urgent']],
        distractors: ['five', 'weather', 'secret'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the habit that makes this message stressful.',
        lines: ['(Sent at 11:40pm to a colleague)', 'Hey, can you redo the banner?', '(no other details)'],
        bug: 0,
        fix: 'Schedule it for 9am, or add "no rush, for tomorrow".',
        explanation: 'Late messages feel urgent. Say the urgency or send it in working hours.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Keep follow-ups under the original message by replying in the ... (one word)',
        answers: ['thread'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the AI to write a good chat message?',
        options: [
          { text: 'Write a chat message.', why: 'About what, to whom, how urgent?' },
          { text: 'Write a 2-line chat message to Grace asking for the final logo file by tomorrow 10am, friendly, not urgent.' },
          { text: 'Write a formal memo for chat.', why: 'Wrong format for chat.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Urgency clear, or not?',
        groups: ['Clear', 'Unclear'],
        items: [
          { text: 'No rush, for tomorrow', group: 0 },
          { text: 'Can you do this?', group: 1 },
          { text: 'Need this within the hour, sorry!', group: 0 },
          { text: 'When you get a chance (but actually now)', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "I'm in Mexico City and keep getting your team's messages at 3am my time. Haha.",
        prompt: 'What should Ada do?',
        options: [
          { text: "So sorry! We'll schedule messages for your working hours from now on." },
          { text: 'Just mute your phone.', why: 'Puts the problem on her.' },
          { text: "That's the only time we work.", why: 'Schedule send fixes this.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a perfect chat message.',
        lines: ['Greeting with a name', 'The ask', 'Any detail they need', 'How urgent it is'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Five messages in a row means five ... (one word)',
        answers: ['notifications', 'pings', 'alerts'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the bad habit to the fix.',
        pairs: [
          ['Bare "hi"', 'Greeting plus the ask'],
          ['The trickle', 'One complete message'],
          ['11pm requests', 'Schedule send'],
          ['Busy channel replies', 'Use the thread'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Is chat "too casual" for writing rules?',
        options: [
          { text: 'No. Chat is still writing: clear, complete and kind' },
          { text: 'Yes, anything goes in chat', why: 'Messy chat slows everyone down.' },
          { text: 'Chat should be as formal as a letter', why: 'Friendly is fine; clear is the point.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which chat habit of yours could annoy colleagues? What will you do instead?',
    starters: ['I sometimes...', 'From now on I will...'],
  },
  deepen: { title: 'Try it today', summary: 'Use "schedule send" (if your chat app has it) for any message outside working hours.' },
  notes: 'Chat etiquette is general workplace guidance; "schedule send" referenced as "if your app has it" because availability varies.',
};

export default lesson;
