import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: the scam file v1. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The scam file v1',
  summary: 'Grace opens a notebook, the way she once kept patient notes. Case 1: the "Hi Mum" text. Tap through her first entry.',
  minutes: 11,
  outcomes: [
    'Record a scam like a case note',
    'Spot the recipe in your own words',
    'Start your own scam file',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Grace\'s scam file v1',
      text: 'CASE 1: "Hi Mum". Date: Tuesday, 11:42 a.m. Channel: messaging app, unknown number. Mask: Jayden. Ask: £480 to a stranger\'s account, "before 12". Recipe: urgency yes, familiarity yes, emotion yes (worry), secrecy yes ("can\'t call"). What nearly worked: busy, between sessions, sounded like him. What stopped it: called his saved number. Outcome: £0 lost. Reported: number blocked and reported. Lesson: verify through a channel I already have. NEW HOUSE RULES: family safe word agreed offline. Stop, challenge, protect on a sticky note.',
      hotspots: [
        { phrase: 'Channel: messaging app, unknown number', note: 'The first red flag: the channel itself was new.' },
        { phrase: 'Mask: Jayden', note: 'Who they pretended to be. Grace will track masks across cases.' },
        { phrase: 'Recipe: urgency yes, familiarity yes, emotion yes (worry), secrecy yes', note: 'All four ingredients. A full house.' },
        { phrase: 'What nearly worked: busy, between sessions', note: 'Honest notes on her own state: hot thinking.' },
        { phrase: 'called his saved number', note: 'The one check that works for every mask.' },
        { phrase: 'number blocked and reported', note: 'Reporting helps stop the same number reaching others.' },
        { phrase: 'family safe word agreed offline', note: 'One check a scammer can\'t pass.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Write each scam down like a case: channel, mask, ask, recipe, what nearly worked, what stopped it, lesson. Patterns appear fast.',
    },
  ],
  apply: {
    scenario: 'Reading case 1.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each case field to its entry.',
        pairs: [
          ['Channel', 'Messaging app, unknown number'],
          ['Mask', 'Jayden'],
          ['Ask', '£480 to a stranger\'s account'],
          ['What stopped it', 'Called his saved number'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Grace note "what nearly worked"?',
        options: [
          { text: 'Knowing her weak moments helps her spot them next time' },
          { text: 'To blame herself', why: 'To learn, not blame.' },
          { text: 'The police require it', why: 'It\'s for her own learning.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of the scam, or part of Grace\'s defence?',
        groups: ['Scam', 'Defence'],
        items: [
          { text: '"Before 12"', group: 0 },
          { text: 'Called his saved number', group: 1 },
          { text: '"Can\'t call"', group: 0 },
          { text: 'Family safe word', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'Why keep a file? It\'s one text.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'No reason.', why: 'Patterns are the reason.' },
          { text: 'To show off.', why: 'To learn.' },
          { text: 'On the ward, one case taught you something; ten showed you a pattern. I want the pattern.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Case 1\'s lesson.',
        template: 'Verify through a channel I [[1]] have.',
        blanks: [['already']],
        distractors: ['never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many of the four ingredients did case 1 have?',
        answers: ['4', 'four', 'all four', 'all'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of case 1 is wrong?',
        lines: [
          'Outcome: £0 lost.',
          'What stopped it: called his saved number.',
          'What stopped it: replied to the new number to check.',
        ],
        bug: 2,
        fix: 'She called his saved number.',
        explanation: 'Replying to the new number isn\'t a real check.',
      },
      {
        kind: 'mcq',
        prompt: 'Why report a scam number even when you lost nothing?',
        options: [
          { text: 'You get a reward', why: 'It\'s to protect others.' },
          { text: 'It can help stop the same number reaching others' },
          { text: 'No reason', why: 'It helps others.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the fields in a case.',
        lines: ['Channel', 'Mask', 'Ask', 'Recipe', 'What stopped it', 'Lesson'],
      },
      {
        kind: 'mcq',
        prompt: 'What two house rules came from case 1?',
        options: [
          { text: 'A family safe word, and the stop-challenge-protect sticky note' },
          { text: 'No phones at dinner', why: 'That\'s not in the file.' },
          { text: 'Never text Jayden', why: 'That\'s not a rule.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write case 1 of your own scam file: a suspicious message you\'ve received. Channel, mask, ask, recipe.',
    starters: ['Channel:... Mask:... Ask:... Recipe:...'],
  },
  deepen: {
    title: 'Forwarding scam texts',
    summary: 'In the UK you can forward scam texts free to 7726 so phone networks can investigate and block them. Many countries have similar services.',
  },
  notes: 'Scam file v1 (fictional). 7726: UK mobile operators\' spam reporting number.',
};

export default lesson;
