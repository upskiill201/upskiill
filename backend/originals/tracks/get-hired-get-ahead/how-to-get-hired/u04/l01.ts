import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 1 — opens the chapter: the rejection email arrives on his birthday. Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'On his birthday',
  summary: 'Clinton\'s 22nd birthday. Cake at 7pm, friends on the way. At 4:12pm, an email from Njangi Pay: "Thank you for your time... we have decided to move forward with another candidate." His thumbs are already typing a reply.',
  minutes: 11,
  outcomes: ['Recognise the urge to react instantly', 'Choose a response you won\'t regret', 'Know why a gracious reply matters'],
  learn: [
    {
      kind: 'story',
      title: '4:12pm',
      beats: [
        { speaker: 'narrator', text: 'Two weeks to graduation. Clinton\'s 22nd birthday. His mum is icing a cake. At 4:12pm, his phone buzzes.' },
        { speaker: 'narrator', text: '"Dear Clinton, thank you for your time and the care you put into your application. After careful consideration, we have decided to move forward with another candidate for this role."' },
        { speaker: 'clinton', text: 'Another candidate. After everything. The stories, the bus, the thank-you email. On my BIRTHDAY.' },
        { speaker: 'tey', text: 'Rejection hurts, and the hurt is real. The first hour is when people send the message they regret most. What you do next can matter more than the no itself.' },
      ],
      choice: {
        prompt: 'What should Clinton do with the email?',
        options: [
          {
            text: 'Don\'t reply today. Enjoy the birthday. Tomorrow, send a short, gracious reply and ask for feedback.',
            outcome: 'The next morning he writes four calm lines. Brenda replies within a day with real feedback, and adds: "I hope our paths cross again."',
            best: true,
          },
          {
            text: 'Reply now: "Your process is a joke. You\'ll regret this."',
            outcome: 'It feels good for ninety seconds. Brenda forwards it to the hiring manager. Fintech in Douala is a small world.',
          },
          {
            text: 'Never reply, block their emails, pretend it didn\'t happen.',
            outcome: 'No feedback, no relationship, and the lesson he could have learned stays hidden.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Never reply in the first hour. Feel it first. Then reply graciously and ask for feedback.',
    },
    {
      kind: 'text',
      html: '<p><strong>In this chapter:</strong> why companies say no, the first 48 hours, asking for and using feedback, keeping momentum, handling other people\'s reactions, and staying in touch with the company that said no. Your kit piece: a resilience plan.</p>',
    },
  ],
  apply: {
    scenario: 'Clinton gets the rejection email.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When do people send the replies they regret most?',
        options: [
          { text: 'In the first hour after the news' },
          { text: 'A week later', why: 'Usually straight away, while emotions are high.' },
          { text: 'Never', why: 'It happens a lot, usually in the first hour.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good first move, or one he\'d regret?',
        groups: ['Good', 'Regret'],
        items: [
          { text: 'Wait until tomorrow to reply', group: 0 },
          { text: 'An angry reply now', group: 1 },
          { text: 'Tell a friend how he feels', group: 0 },
          { text: 'A rant on social media', group: 1 },
          { text: 'Enjoy his birthday', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I want to tell them exactly what I think of their process. Right now.',
        options: [
          { text: 'I\'ll write it in my notes, not to them. Tomorrow I\'ll reply calmly and ask for feedback.' },
          { text: 'Send it. They deserve it.', why: 'It will follow you in a small industry.' },
          { text: 'Block them forever.', why: 'You lose the feedback and the relationship.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the reply he\'d regret.',
        lines: ['Thank you for letting me know.', 'Your process is a joke and you\'ll regret this.', 'Could you share any feedback?'],
        bug: 1,
        explanation: 'Industries are small. This would follow him.',
      },
      {
        kind: 'mcq',
        prompt: 'Why did Brenda reply with real feedback?',
        options: [
          { text: 'His reply was calm and gracious, and asked politely' },
          { text: 'She had to by law', why: 'Most places don\'t require it. She chose to.' },
          { text: 'He begged', why: 'He asked calmly.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Wait, then reply graciously', 'Real feedback and a warm door'],
          ['Angry reply now', 'Forwarded to the hiring manager'],
          ['Ghost them', 'No feedback, no relationship'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: 'Never reply in the first [[1]]. Feel it [[2]].',
        blanks: [['hour'], ['first']],
        distractors: ['year', 'never', 'later'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How old is Clinton today? (a number)',
        answers: ['22', 'twenty-two', 'twenty two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should Clinton do tonight?',
        options: [
          { text: 'Enjoy the birthday with the people who came' },
          { text: 'Apply to 50 jobs at midnight', why: 'Rest first. Plan tomorrow.' },
          { text: 'Reread the email 40 times', why: 'Put the phone down tonight.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'True of rejection, or not?',
        groups: ['True', 'Not true'],
        items: [
          { text: 'It hurts, and that\'s normal', group: 0 },
          { text: 'It means you\'ll never be hired', group: 1 },
          { text: 'How you respond can matter', group: 0 },
          { text: 'You should hide it from everyone', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a "no" that hurt (a job, a place, a person). How did you react in the first hour? What would you do now?',
    starters: ['In the first hour I...', 'Now I would...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make a rule for yourself and write it in your phone: "No replies to bad news for 24 hours." Then keep it.',
  },
  notes: 'Opens L2 Ch4 (founder topic: How to Handle Career Rejection). Outline choice: reply angrily, ghost, or ask for feedback. Clinton was 21 in his final year; this is his 22nd birthday. Feedback after rejection is not guaranteed; many employers don\'t give it.',
};

export default lesson;
