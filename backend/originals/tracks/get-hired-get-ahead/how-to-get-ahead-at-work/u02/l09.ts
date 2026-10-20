import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 9 — invisible work vs. visible work, without bragging. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Making your work visible',
  summary: 'Clinton fixed a nasty memory bug that made the app crash on old phones. Nobody knows, because he fixed it quietly on a Thursday. Miracle says good work that nobody sees can\'t help your team, or your career.',
  minutes: 11,
  outcomes: ['Share your work without bragging', 'Tie updates to team goals', 'Give credit generously'],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to finish a fix',
      before: { label: 'Invisible', text: 'Fixes the crash. Merges it. Says nothing.\n\nThe support team keeps telling drivers to "restart the phone". Nobody connects the drop in crashes to anything. At review time, even Clinton has forgotten.' },
      after: { label: 'Visible, not boastful', text: 'A short team post: "Fixed the crash on 2 GB phones (Goal 3). Crashes on those phones are down from about 30 a day to about 3. Thanks to Paul for spotting the memory leak pattern. Support: you can stop suggesting restarts."\n\nWhat changed, which goal, a number, credit, and what others should do now.' },
      notes: [
        'Share results, not effort: what changed and which goal it moved.',
        'Credit others generously.',
        'Tell people what to do differently, so the update is useful, not just a brag.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'What changed, which goal, a number, who helped, what others should do now. Useful, not boastful.',
    },
  ],
  apply: {
    scenario: 'Clinton shares his crash fix.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does invisible good work hurt?',
        options: [
          { text: 'Others can\'t benefit, and it\'s forgotten at review time' },
          { text: 'It doesn\'t', why: 'Support kept suggesting restarts.' },
          { text: 'It\'s illegal', why: 'It just doesn\'t help anyone else.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the team post in order.',
        lines: ['What changed', 'Which goal it moved', 'A number', 'Credit to others', 'What people should do now'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful update, or bragging?',
        groups: ['Useful', 'Bragging'],
        items: [
          { text: 'Crashes down from about 30 to 3 a day', group: 0 },
          { text: 'I\'m basically a genius', group: 1 },
          { text: 'Thanks to Paul for the leak pattern', group: 0 },
          { text: 'Nobody else could have fixed this', group: 1 },
          { text: 'Support can stop suggesting restarts', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that turns the post into a brag.',
        lines: ['Fixed the crash on 2 GB phones.', 'Took me 14 hours because it was so hard and I\'m so dedicated.', 'Thanks to Paul.'],
        bug: 1,
        explanation: 'Effort and self-praise. Share the result and credit others.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Sharing my work feels like showing off. Should I just stay quiet?',
        options: [
          { text: 'If I share results, credit others and tell people what to do now, it\'s useful, not showing off.' },
          { text: 'Yes, stay quiet forever.', why: 'Then nobody benefits.' },
          { text: 'Post about every small thing daily.', why: 'Share results that matter.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to the post.',
        pairs: [
          ['Goal', 'Goal 3: phones under 2 GB'],
          ['Number', 'About 30 to 3 crashes a day'],
          ['What to do now', 'Stop suggesting restarts'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What makes an update useful, not boastful?',
        options: [
          { text: 'Telling others what to do differently because of it' },
          { text: 'Lots of exclamation marks', why: 'Useful content, not volume.' },
          { text: 'Mentioning how hard it was', why: 'Results and next steps.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Share [[1]], not effort. Credit [[2]] generously.',
        blanks: [['results'], ['others']],
        distractors: ['hours', 'yourself', 'nobody'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many crashes a day are there now on 2 GB phones? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good place to share results, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'The team channel', group: 0 },
          { text: 'A 1:1 with Ngozi', group: 0 },
          { text: 'A rant on public social media about colleagues', group: 1 },
          { text: 'The team demo', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What good work have you done recently that nobody knows about? How could you share it usefully?',
    starters: ['I did...', 'I could share it by...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a five-part update for one recent piece of work: what changed, which goal, a number, who helped, what others should do now.',
  },
  notes: 'Crash numbers are story details. Where you live: comfort with self-promotion varies by culture; framing updates as useful information travels well.',
};

export default lesson;
