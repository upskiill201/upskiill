import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint 1, the last free lesson. Reviews lessons 1–4. Story beat: Buzzword Bingo at the stand-up. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Buzzword Bingo',
  summary: 'Wednesday stand-up. Zanele has secretly drawn a Buzzword Bingo card, and Remi has to decode every square before Brian stops talking.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Decode the phrases from your first week without looking', 'Turn a jargon message into a task, a deadline and the people'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 9:00 a.m.',
      beats: [
        { speaker: 'narrator', text: 'The daily stand-up: fifteen minutes, everyone standing, everyone saying what they\'re working on. Zanele slides a folded paper towards Remi.' },
        { speaker: 'narrator', text: 'It\'s a bingo card. Nine squares: circle back, deep dive, quick win, touch base, ping, in the loop, offline, move the needle, low-hanging fruit.' },
        { speaker: 'zanele', text: '(whispering) First to fill a line wins. But you have to know what each one means, or it doesn\'t count.' },
        { speaker: 'brian', text: 'Morning all! Quick one from me. Let\'s touch base on the supplier list, which was a great quick win, thanks Remi...' },
        { speaker: 'remi', text: '(Two squares. Already.)' },
        { speaker: 'tey', text: "Your card's ready too. Fill it in, without your notebook this time." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1. Buzzword Bingo at the Wednesday stand-up.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Bingo row 1. Match each square to its meaning.',
        pairs: [
          ['Circle back', 'Return to it later'],
          ['Deep dive', 'A detailed look'],
          ['Quick win', 'Something easy and useful'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Brian says, "Let\'s take the budget question offline." What happens next?',
        options: [
          { text: 'The budget is discussed separately, not in this meeting' },
          { text: 'The Wi-Fi gets switched off', why: '"Offline" means not here, not now. The internet is fine.' },
          { text: 'The budget is cancelled', why: 'It\'s moved, not cancelled.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Bingo row 2. Jargon or plain English?',
        groups: ['Jargon', 'Plain English'],
        items: [
          { text: 'Ping me', group: 0 },
          { text: 'Send me a message', group: 1 },
          { text: 'Keep me in the loop', group: 0 },
          { text: 'Let me know what happens', group: 1 },
          { text: 'Touch base', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Brian: "That idea won\'t move the ___." (one word)',
        answers: ['needle'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Bingo question! What does "drink from the firehose" mean? Wrong answer = you buy the chai.',
        prompt: 'Pick Remi\'s answer.',
        options: [
          { text: 'Working near the fire exit.', why: 'It\'s a picture of too much, too fast, not a location.' },
          { text: 'Getting a drink after work.', why: 'No drinks involved. Just a flood of information.' },
          { text: 'Having to take in loads of information really fast. Like this week.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Which phrase is NOT real office jargon?',
        options: [
          { text: 'Let\'s put a pin in it', why: 'Real: pause it and come back later.' },
          { text: 'Let\'s not boil the ocean', why: 'Real: don\'t try to do something impossibly big.' },
          { text: 'Let\'s mango the pipeline' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Brian\'s message: "Please touch base with Zanele and ping me the numbers by EOD." Sort the pieces.',
        groups: ['The task', 'The deadline', 'The people'],
        items: [
          { text: 'Ping me the numbers', group: 0 },
          { text: 'By EOD', group: 1 },
          { text: 'Zanele', group: 2 },
          { text: 'Brian', group: 2 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Zanele checks Remi\'s bingo card. Which square has the wrong meaning?',
        lines: [
          'Circle back: come back to it later.',
          'Low-hanging fruit: the hardest, most important work.',
          'In the loop: kept informed.',
          'Ping: a quick message.',
        ],
        bug: 1,
        fix: 'Low-hanging fruit: the easiest tasks that still bring a result.',
        explanation: 'Low-hanging fruit is easy to reach. The hard work is the fruit at the top of the tree.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Translate Brian\'s stand-up update.',
        template: '"Let\'s circle back on Friday" = "Let\'s come [[1]] to this on Friday." "Deep-dive the costs" = "Look at the costs in [[2]]."',
        blanks: [['back'], ['detail']],
        distractors: ['offline', 'fruit'],
      },
      {
        kind: 'mcq',
        prompt: 'Brian: "All good, Remi?" Remi isn\'t sure which task is first. Best reply?',
        options: [
          { text: '"All good!"', why: 'He\'d leave the stand-up still unsure what to do first.' },
          { text: '"Nearly! Quick check: should I start with the supplier list or the numbers?"' },
          { text: '"I\'ll take it offline."', why: 'Using the jargon doesn\'t answer the question. Ask the specific thing you need.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Brian: "Keep me in the loop and ping me by EOD." Build the plain-English version.',
        tiles: ['Keep', 'me', 'informed', 'and', 'message', 'me', 'before', 'the', 'end', 'of', 'today.'],
        distractors: ['loop'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Bingo row 3. Last line for the win.',
        pairs: [
          ['Put a pin in it', 'Pause it for later'],
          ['Boil the ocean', 'Try to do far too much'],
          ['Run it up the flagpole', 'Test how people react'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Remi, great work on the supplier list. Can you do a quick deep dive on the three suppliers you weren\'t sure about, and circle back with me Thursday?',
        prompt: 'Pick the reply that shows Remi understood everything.',
        options: [
          { text: 'Thanks! I\'ll look into those three in detail and come back to you with what I find on Thursday.' },
          { text: 'Will do, I\'ll take it offline.', why: 'Nothing needs to be moved out of a meeting here. Brian wants a detailed look and an answer Thursday.' },
          { text: 'Bingo!', why: 'Zanele would be proud. Brian would be confused.' },
        ],
        answer: 0,
        explanation: 'Repeating the task and the deadline in plain words is the clearest way to show you understood.',
      },
    ],
  },
  reflect: {
    prompt: 'Which phrase from this week still feels slippery to you? Write it down with your own example sentence.',
    starters: ['The slippery one is...', 'My example: ...'],
  },
  deepen: {
    title: 'Make your own bingo card',
    summary: 'Draw a 3 by 3 grid. Fill it with nine phrases you think you\'ll hear at your next meeting, class or call, and tick them off as you hear them. Only count it if you know what each one means.',
  },
  notes: 'Review of lessons 1–4. Stand-up = short daily team meeting, usually standing (Cambridge: "stand-up meeting").',
};

export default lesson;
