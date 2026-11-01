import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 11 — story choice: spam 200 people with one message, or write 10 real ones. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: '200 messages or 10?',
  summary: 'David finds a tool that sends the same LinkedIn message to 200 people at once. "Numbers game, bro." Clinton has written five careful messages in a week. Is he doing it wrong?',
  minutes: 11,
  outcomes: ['Compare mass messages with personal ones', 'Explain why copy-paste outreach backfires', 'Choose quality over volume'],
  learn: [
    {
      kind: 'story',
      title: 'The numbers game',
      beats: [
        { speaker: 'narrator', text: 'Friday night. David is in Clinton\'s room, laptop open, very excited.' },
        { speaker: 'david', text: 'Look: you paste one message and it goes to 200 fintech people at once. "Dear Sir/Madam, I am seeking opportunities." Even if 1% reply, that\'s two people. Numbers game!' },
        { speaker: 'clinton', text: 'I\'ve written five messages this week. Four replied.' },
        { speaker: 'david', text: 'Five! At this rate you\'ll be 40 before you get a job.' },
        { speaker: 'tey', text: 'Mass messages are easy to spot, easy to ignore, and can get an account restricted for spam. People remember who wrote to them properly, and who sent them a template.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Keep writing about ten real, personal messages a week.',
            outcome: 'By the end of the month he\'s had nine conversations and two introductions. Nobody remembers a template; everybody remembers the guy who read their post.',
            best: true,
          },
          {
            text: 'Send David\'s template to 200 people tonight.',
            outcome: 'Three replies. Two say "please don\'t message me again". One is Tchami, who saw the template and wonders why Clinton sent him "Dear Sir/Madam" after their call.',
          },
          {
            text: 'Do both: 200 templates and 10 real messages.',
            outcome: 'The templates go to people his real messages also reached. Two of them notice. His careful work now looks like spam too.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Ten real messages beat 200 copies. People can tell, and they remember.',
    },
  ],
  apply: {
    scenario: 'Clinton chooses quality over volume.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did four out of five of Clinton\'s messages get replies?',
        options: [
          { text: 'He was lucky', why: 'Four out of five isn\'t luck. It\'s a good message.' },
          { text: 'Each one was personal: a real reason, a small ask' },
          { text: 'He sent them at midnight', why: 'Timing isn\'t the reason. Personal messages are.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Template or personal?',
        groups: ['Template', 'Personal'],
        items: [
          { text: 'Dear Sir/Madam, I am seeking opportunities', group: 0 },
          { text: 'Your post on retries saved me an afternoon', group: 1 },
          { text: 'To whom it may concern', group: 0 },
          { text: 'You spoke at our meet-up about mobile money', group: 1 },
          { text: 'I am a hardworking and passionate individual', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'Even if only 1% of 200 reply, that\'s two people. Isn\'t that worth it?',
        options: [
          { text: 'True, let\'s send 2,000.', why: 'More spam, more damage.' },
          { text: 'I\'ll stop messaging anyone.', why: 'Keep going, just personally.' },
          { text: 'My five careful messages got four replies. And spam can annoy people I want to impress.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the risk David forgot.',
        lines: ['The tool sends one message to 200 people.', 'Nobody will notice it\'s a template.', 'Some might reply.'],
        bug: 1,
        explanation: 'People can tell, especially those Clinton has already spoken to.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Ten personal messages a week', 'Nine conversations in a month'],
          ['200 templates', 'Three replies, two of them "please stop"'],
          ['Both at once', 'His careful work starts to look like spam'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How many real messages a week is a good target for Clinton?',
        options: [
          { text: 'About ten' },
          { text: 'About 500', why: 'Impossible to make personal.' },
          { text: 'One a month', why: 'Too slow with three months to graduation.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: '[[1]] real messages beat 200 [[2]].',
        blanks: [['Ten', '10'], ['copies', 'templates']],
        distractors: ['Two', 'friends', 'calls'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Out of five messages, how many got replies? (a number)',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps Clinton\'s reputation, or hurts it?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'Reading someone\'s work before messaging', group: 0 },
          { text: 'Sending "Dear Sir/Madam" to someone he\'s met', group: 1 },
          { text: 'A report-back message', group: 0 },
          { text: 'Being reported for spam', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What happened when Tchami got the template?',
        options: [
          { text: 'He offered a job', why: 'The template hurt the relationship.' },
          { text: 'Nothing, he didn\'t notice', why: 'He noticed. People do.' },
          { text: 'He wondered why Clinton sent him "Dear Sir/Madam" after their call' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever received a copy-paste message that was obviously sent to hundreds? How did you feel about the sender?',
    starters: ['I once got...', 'It made me feel...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Set a weekly target: a number of personal messages you can actually make personal. Write it on your network map.',
  },
  notes: 'Chapter choice from the outline ("spam 200 people with the same message, or write 10 real ones"). Platforms restrict accounts for spammy automated messaging (per LinkedIn\'s user agreement on automation); kept qualitative. Reply rates are story details, not statistics.',
};

export default lesson;
