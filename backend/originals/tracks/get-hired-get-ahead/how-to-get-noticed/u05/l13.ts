import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 13 — posting your work: a simple post formula. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Post your work',
  summary: 'Clinton has never posted on LinkedIn. "Isn\'t it just people bragging?" Tey shows him a way to share his Njangi Tracker that\'s useful, humble, and lands in front of people who hire.',
  minutes: 11,
  outcomes: ['Write a short post about something you built or learned', 'Share without bragging', 'Know what (and how often) to post'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Clinton\'s worry: "Posting is just bragging." Some posts are. But a post about something you built, what you learned and who it helped is useful to readers, and it shows your work to people who might hire you.',
          replies: ['How do I write one?'],
        },
        {
          tey: 'A four-part formula. One: the problem, in a line. "My mum\'s savings group argued every month about who had paid." Two: what you did. "I built a one-page tracker." Three: what you learned, the bit that makes it useful, not bragging. "Lesson: I wasted a week on dark mode nobody needed. Build the useful part first." Four: a question or thanks. "Anyone else building for savings groups?"',
          replies: ['Should I add a picture?'],
        },
        {
          tey: 'Yes: one screenshot, with made-up names, or a photo of the exercise book it replaced. Posts with an image tend to get noticed more. Keep it short: a few lines people can read on a phone.',
          replies: ['How often should I post?'],
        },
        {
          tey: 'When you have something real: a project, a lesson, an event you ran. Once or twice a month is plenty. Never post anything you\'d be embarrassed for Brenda to read, because she might.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Problem, what you did, what you learned, a question. Short, with one image. Useful beats boastful.',
    },
  ],
  apply: {
    scenario: 'Clinton writes his first post.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the post formula in order.',
        lines: ['The problem', 'What you did', 'What you learned', 'A question or thanks'],
      },
      {
        kind: 'mcq',
        prompt: 'What makes a post useful instead of just bragging?',
        options: [
          { text: 'Sharing what you learned, so readers get something from it' },
          { text: 'Lots of hashtags', why: 'Hashtags don\'t make it useful. Lessons do.' },
          { text: 'Saying how amazing it is', why: 'That\'s the bragging part.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good post or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'A tracker I built, what I learned, and a question', group: 0 },
          { text: '"I\'m the best developer in Buea. Hire me."', group: 1 },
          { text: 'Photos of the meet-up\'s 40th session, with thanks to speakers', group: 0 },
          { text: 'A screenshot showing members\' real names and debts', group: 1 },
          { text: 'A complaint about a lecturer', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that turns the post into bragging.',
        lines: ['My mum\'s savings group argued every month about payments.', 'I am basically a genius and every company should hire me.', 'Lesson: build the useful part first.'],
        bug: 1,
        explanation: 'The project speaks for itself. Let readers decide he\'s good.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'What picture should I use for the tracker post?',
        options: [
          { text: 'A screenshot with made-up names, or the old exercise book it replaced.' },
          { text: 'A screenshot with everyone\'s real names and amounts.', why: 'Privacy. Use made-up data.' },
          { text: 'A selfie at my desk.', why: 'Fine for some posts, but show the work here.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line of Clinton\'s post to its part.',
        pairs: [
          ['My mum\'s group argued every month about payments', 'The problem'],
          ['I built a one-page tracker', 'What he did'],
          ['I wasted a week on dark mode', 'What he learned'],
          ['Anyone else building for savings groups?', 'A question'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How often should Clinton post?',
        options: [
          { text: 'When he has something real, about once or twice a month' },
          { text: 'Five times a day', why: 'Too much, and quality drops.' },
          { text: 'Never', why: 'An occasional useful post helps him get noticed.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: '[[1]] beats boastful. Never post what you\'d be [[2]] for a recruiter to read.',
        blanks: [['Useful'], ['embarrassed', 'ashamed']],
        distractors: ['Loud', 'proud', 'paid'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The post formula ends with a question or ___. (one word)',
        answers: ['thanks', 'thank you'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which first line for Clinton\'s post is best?',
        options: [
          { text: '"My mum\'s savings group argued every month about who had paid. So I built them something."' },
          { text: '"Big announcement!!!"', why: 'Says nothing. Start with the problem.' },
          { text: '"Please like and share."', why: 'Asks without giving. Start with the story.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one thing you\'ve built, run or learned recently that would make a useful post? What did you learn from it?',
    starters: ['I could post about...', 'The lesson was...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Draft a four-part post about your portfolio piece. Read it aloud. If it sounds like bragging, add more of what you learned.',
  },
  notes: 'Post guidance is general professional-networking practice. Claim that image posts "tend to get noticed more" is stated softly (platforms report higher engagement for posts with images); no figure claimed. Privacy consistent with Ch2.',
};

export default lesson;
