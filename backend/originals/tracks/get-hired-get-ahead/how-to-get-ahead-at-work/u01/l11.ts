import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 11 — story choice: Clinton's change causes a bug in production. Hide it or tell Ngozi. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'The bug in production',
  summary: 'Week five, 7:10am. Clinton\'s small sync change went live last night. Now some drivers\' confirmations are showing twice. Nobody has noticed yet. He could quietly fix it before 9am, and nobody would ever know it was him.',
  minutes: 11,
  outcomes: ['Decide what to do when you break something', 'Tell the right person fast', 'Own a mistake and help fix it'],
  learn: [
    {
      kind: 'story',
      title: '7:10am',
      beats: [
        { speaker: 'narrator', text: 'Week five, 7:10am. Clinton checks the dashboard before breakfast. Some confirmations from last night appear twice. It\'s his change. Nobody is online yet.' },
        { speaker: 'clinton', text: '(to himself) I can fix this in an hour. Push it before 9. Nobody ever needs to know.' },
        { speaker: 'tey', text: 'Every developer breaks something eventually. What teams care about is what happens next. Hiding a problem can make it bigger, because other people may already be affected and nobody knows to look.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Message Ngozi and the on-call engineer now: what he sees, that it\'s likely his change, and that he\'s starting to look.',
            outcome: 'The on-call engineer rolls the change back in ten minutes. It turns out support had already had three calls. Ngozi\'s reply: "Thank you for flagging it fast. Let\'s look at why our tests missed it."',
            best: true,
          },
          {
            text: 'Fix it quietly before 9am and say nothing.',
            outcome: 'His fix works, but support has already had calls about double payments. At 10am the team spends an hour hunting a cause nobody explains. When Paul finds the commit, trust drops.',
          },
          {
            text: 'Panic and wait to see if anyone notices.',
            outcome: 'By 11am drivers are confused, support is overwhelmed, and the fix takes longer because the problem has spread.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Broke something? Tell the right people fast: what you see, what you think caused it, what you\'re doing. Then help fix it.',
    },
  ],
  apply: {
    scenario: 'Clinton finds his bug in production.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is hiding a bug risky?',
        options: [
          { text: 'It isn\'t risky', why: 'Hidden problems often grow.' },
          { text: 'Others may already be affected, and nobody knows to look' },
          { text: 'Only because you might be fired', why: 'Mainly because the problem can spread unseen.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s message in order.',
        lines: ['What he sees', 'That it\'s likely his change', 'What he\'s doing now', 'Ask what they need from him'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s message to Ngozi.',
        from: 'clinton',
        message: 'What exactly do I write to Ngozi at 7:15am?',
        options: [
          { text: '"Small issue, sorted soon, don\'t worry." (vague)', why: 'Be specific and own it.' },
          { text: 'Nothing, fix it quietly.', why: 'Tell the right people fast.' },
          { text: '"Some confirmations from last night are showing twice. I think it\'s my sync change. I\'m looking now. Should we roll it back?"' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good response to a production bug, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Flag it fast to the right people', group: 0 },
          { text: 'Fix it secretly', group: 1 },
          { text: 'Say it\'s likely your change', group: 0 },
          { text: 'Blame the test suite publicly', group: 1 },
          { text: 'Help with the fix and the follow-up', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that hides ownership.',
        lines: ['I see duplicate confirmations from last night.', 'Something weird happened, no idea why.', 'I\'m looking now.'],
        bug: 1,
        explanation: 'He has an idea why. Say "I think it\'s my change."',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Flag it fast', 'Rolled back in ten minutes'],
          ['Fix it secretly', 'An hour of hunting, then lost trust'],
          ['Wait and panic', 'Drivers confused, support overwhelmed'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What did Ngozi want to look at afterwards?',
        options: [
          { text: 'Why the tests missed it' },
          { text: 'Who to blame', why: 'She focused on the system: the tests.' },
          { text: 'Nothing', why: 'She wanted to fix the gap.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Tell the right people [[1]]. Then help [[2]] it.',
        blanks: [['fast'], ['fix']],
        distractors: ['later', 'hide', 'blame'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes did the rollback take? (a number)',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Builds trust, or breaks it?',
        groups: ['Builds', 'Breaks'],
        items: [
          { text: 'Owning the mistake early', group: 0 },
          { text: 'Being found out later', group: 1 },
          { text: 'Helping write the follow-up', group: 0 },
          { text: 'Pretending it wasn\'t you', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you made a mistake others didn\'t know about yet. What did you do? What would you do now?',
    starters: ['Once I...', 'Now I would...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your own "I broke something" message template: what I see, what I think caused it, what I\'m doing, what I need.',
  },
  notes: 'Outline choice: hide it or tell Ngozi (moved from week 2 to week 5 to fit the plan timeline). Teams where people can admit mistakes learn faster: Edmondson (1999), psychological safety and learning behaviour in work teams; Google\'s Project Aristotle (2015) also highlighted psychological safety. Kept qualitative.',
};

export default lesson;
