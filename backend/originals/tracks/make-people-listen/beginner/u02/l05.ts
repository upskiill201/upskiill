import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 — Checkpoint, "The Phone-In Quiz". Reviews lessons 1–4 plus Chapter 1. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'The Phone-In Quiz: Arjun\'s rewrite',
  summary: 'Arjun sends Mr Rao a new email, live on air: subject line, first sentence, one comparison. While we wait for the reply, it\'s the Tey FM Phone-In Quiz.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use BLUF, plain words and comparisons without notes', 'Spot the curse of knowledge in a real message'],
  learn: [
    {
      kind: 'story',
      title: 'Tey FM, 11:55 p.m.',
      beats: [
        { speaker: 'arjun', text: 'Sending. Subject: "Next sale: please give me 48 hours first." First line: "Please don\'t schedule the next sale until I\'ve added more tills." Sixty words in total. No diagrams. It feels naked.' },
        { speaker: 'tey', text: "Naked and readable! Mr Rao's probably asleep in Pune, so while we wait... it's the Tey FM Phone-In Quiz!" },
        { speaker: 'narrator', text: '(The jingle plays. Arjun winces at one note, which is a little flat.)' },
      ],
    },
  ],
  apply: {
    scenario: 'The Tey FM Phone-In Quiz.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why didn\'t Mr Rao act on Arjun\'s first email?',
        options: [
          { text: 'He didn\'t care about his shop', why: 'He very much did, after it crashed.' },
          { text: 'The email had too few diagrams', why: 'Diagrams weren\'t the problem.' },
          { text: 'The action was buried at the end, in language he didn\'t understand' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put a BLUF message in order.',
        lines: ['The action', 'Why it matters to them', 'What you need back, and when', 'Details, for anyone who wants them'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Cursed, or cured?',
        groups: ['Cursed (expert-speak)', 'Cured (plain)'],
        items: [
          { text: 'Row-level lock contention', group: 0 },
          { text: 'The till jams', group: 1 },
          { text: 'Peak-load transaction failures', group: 0 },
          { text: 'Nobody can pay', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Quiz question for me: if Tey taps "Happy Birthday", what percentage of listeners will get it?',
        prompt: 'The answer from the study?',
        options: [
          { text: 'Probably very few. In the study, about 1 in 40.' },
          { text: 'About half.', why: 'That\'s what tappers predicted. Not what happened.' },
          { text: 'Everyone, it\'s obvious.', why: 'Only obvious to the tapper.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The best test of an explanation: can a ___ repeat it back? (one word: someone who isn\'t an expert)',
        answers: ['non-expert', 'nonexpert', 'beginner', 'child', 'novice'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which subject line will Mr Rao actually open and act on?',
        options: [
          { text: 'Re: Re: Fwd: Architecture review v3', why: 'Sounds like homework.' },
          { text: 'Next sale: please give me 48 hours first' },
          { text: 'A few thoughts', why: 'Says nothing.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s second email. Which line is the paragraph-four problem again?',
        lines: [
          'Subject: Next sale: please give me 48 hours first.',
          'Hi Mr Rao, here is some background on database theory before I get to my point.',
          'The website is like a shop with one till.',
        ],
        bug: 1,
        fix: 'Hi Mr Rao, please don\'t schedule the next sale until I\'ve added more tills.',
        explanation: 'Background before the point is how the first email failed. Point first.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['Clinton\'s problem', 'Too much about too little'],
          ['Arjun\'s problem', 'Too technical, point buried'],
          ['Both fixed by', 'One clear point, first'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Is a comparison like "one till" dishonest because it isn\'t technically perfect?',
        options: [
          { text: 'No: it\'s accurate enough for the decision, and details can follow' },
          { text: 'Yes, always give every detail', why: 'Then nobody decides anything.' },
          { text: 'Only if it\'s funny', why: 'Humour isn\'t the issue.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 2 so far, in one line.',
        template: '[[1]] first. Plain [[2]]. Use a [[3]].',
        blanks: [['Answer', 'Action'], ['words'], ['comparison']],
        distractors: ['Diagrams', 'jargon'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s new first line.',
        tiles: ['Please', 'give', 'me', '48', 'hours', 'before', 'the', 'next', 'sale.'],
        distractors: ['architecture'],
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite the first line of a message you sent recently using BLUF and plain words.',
    starters: ['Original first line: ...', 'New first line: ...'],
  },
  deepen: {
    title: 'The subject-line test',
    summary: 'For a week, make every important email\'s subject line the action or the answer: "Please approve the budget by Friday", not "Budget". Notice how replies speed up.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapter 1. Pune is in India; Mr Rao is a named extra.',
};

export default lesson;
