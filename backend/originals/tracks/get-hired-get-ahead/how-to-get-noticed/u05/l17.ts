import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 17 — the comment: responding to public criticism professionally. Story with a choice. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'The comment',
  summary: 'Clinton\'s tracker post gets 60 likes. And one comment from a stranger: "A spreadsheet could do this. Not impressive." Brenda has liked the post. Everyone can see the comment. Clinton\'s thumb hovers over the keyboard.',
  minutes: 12,
  outcomes: ['Respond to public criticism calmly', 'Turn a critical comment into a useful exchange', 'Know when not to reply at all'],
  learn: [
    {
      kind: 'story',
      title: '"Not impressive"',
      beats: [
        { speaker: 'narrator', text: 'Friday. Clinton\'s first post about the Njangi Tracker has 60 likes, including one from Brenda Fon. He\'s floating.' },
        { speaker: 'narrator', text: 'Then a comment from someone he doesn\'t know: "A spreadsheet could do this. Not impressive."' },
        { speaker: 'clinton', text: '(typing) "Did YOU build anything this year? Thought not."' },
        { speaker: 'narrator', text: 'His thumb hovers over Post.' },
        { speaker: 'tey', text: 'Everything you write in public is part of your profile. Recruiters read comments too. The way you handle a critic can say more about you than the post itself.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Reply calmly and use the point: "Fair! A spreadsheet was v1, actually. The members didn\'t use it, so I built something simpler. Happy to share what I learned."',
            outcome: 'The commenter replies: "Ah, good point about adoption. Nice work." Three people message Clinton asking about the "members didn\'t use it" part. Brenda sees all of it.',
            best: true,
          },
          {
            text: 'Post the angry reply.',
            outcome: 'It gets screenshotted. The post is now about the argument, not the tracker. Brenda saw that too.',
          },
          {
            text: 'Delete the whole post.',
            outcome: 'He loses the 60 likes, Brenda\'s like, and the chance to show how he handles criticism. One comment isn\'t worth that.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'In public, answer criticism calmly, take any useful point, and move on. If a comment is just abuse, don\'t reply: report or hide it.',
    },
  ],
  apply: {
    scenario: 'Clinton handles the comment.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does the way Clinton replies matter so much?',
        options: [
          { text: 'It doesn\'t matter, comments are private', why: 'Public comments are public.' },
          { text: 'Public replies are part of his profile; recruiters can read them' },
          { text: 'Because he must win every argument', why: 'Winning isn\'t the goal. Showing calm is.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good response or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Thank them and explain calmly', group: 0 },
          { text: 'Insult them back', group: 1 },
          { text: 'Take the useful part of their point', group: 0 },
          { text: 'Tag all your friends to pile on', group: 1 },
          { text: 'Report it if it\'s abusive', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply to the comment.',
        from: 'clinton',
        message: '"A spreadsheet could do this. Not impressive." What do I write?',
        options: [
          { text: '"Did you build anything this year? Thought not."', why: 'It makes him look worse than the critic.' },
          { text: '"Delete your comment."', why: 'Demanding looks defensive.' },
          { text: '"Fair! A spreadsheet was v1. The members didn\'t use it, so I built something simpler. Happy to share what I learned."' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would hurt Clinton\'s reply.',
        lines: ['Fair point! A spreadsheet was my first version.', 'Honestly, people like you are why nobody builds anything.', 'Happy to share what I learned about getting people to actually use it.'],
        bug: 1,
        explanation: 'Turns a calm reply into a fight.',
      },
      {
        kind: 'mcq',
        prompt: 'When should Clinton not reply at all?',
        options: [
          { text: 'When a comment is just abuse or insults with no point' },
          { text: 'Whenever someone disagrees', why: 'Disagreement can be useful. Abuse isn\'t worth a reply.' },
          { text: 'Never: always reply', why: 'Abuse is better reported or hidden.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each comment to the best move.',
        pairs: [
          ['"A spreadsheet could do this."', 'Reply calmly, take the point'],
          ['An insult about his family', 'Don\'t reply; hide or report it'],
          ['"How did you get people to use it?"', 'Answer generously'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What did the calm reply turn the criticism into?',
        options: [
          { text: 'An argument', why: 'The calm reply avoided that.' },
          { text: 'Nothing', why: 'It led to three messages and a better impression.' },
          { text: 'A useful exchange that showed what Clinton learned' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: 'Answer criticism [[1]], take any useful point, and move [[2]].',
        blanks: [['calmly'], ['on']],
        distractors: ['loudly', 'back', 'away'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'If a comment is pure abuse, you can hide it or ___ it. (one word)',
        answers: ['report'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it show professionalism?',
        groups: ['Shows it', 'Doesn\'t'],
        items: [
          { text: 'Admitting v1 didn\'t work', group: 0 },
          { text: 'Getting defensive', group: 1 },
          { text: 'Thanking a critic for a fair point', group: 0 },
          { text: 'Deleting the post in a panic', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time someone criticised you in front of others. How did you respond? What would the calm version have sounded like?',
    starters: ['Someone once said...', 'The calm version would be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a calm reply to the harshest comment you can imagine on your work. Keep it for the day it happens.',
  },
  notes: 'Public-criticism guidance (respond calmly, concede fair points, don\'t feed abuse) is general professional-communication practice. Ties back to Ch2 (feedback makes it real).',
};

export default lesson;
