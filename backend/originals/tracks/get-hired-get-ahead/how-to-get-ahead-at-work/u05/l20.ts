import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 20 — Chapter Challenge and track finale: Clinton interviews his first intern. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: the other chair',
  summary: 'A year and a bit since his first day. Clinton sits on the hiring side of the table for the first time. The student from Buea walks in, nervous, and says: "I don\'t have much experience yet..." Clinton smiles. Everything from this chapter, and the end of Get Hired, Get Ahead.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use the whole change toolkit together', 'See the full journey from both sides', 'Finish your career-growth kit'],
  learn: [
    {
      kind: 'story',
      title: 'The other chair',
      beats: [
        { speaker: 'narrator', text: 'One year in, and a bit. A meeting room. Clinton and Aïcha on one side. On the other, the Economics student from Buea, gripping a printed CV.' },
        { speaker: 'narrator', text: '"Thank you for having me. I... I don\'t have much experience yet, but..."' },
        { speaker: 'clinton', text: 'Can I stop you there? You built a WhatsApp group that 30 traders use every day. You\'ve looked after money for 120 students. That\'s experience. Tell me about the traders.' },
        { speaker: 'narrator', text: 'She blinks, then starts talking, and doesn\'t stop for ten minutes.' },
        { speaker: 'miracle', text: '(later, on video) Two years ago you said exactly that sentence. And now you\'re the one who can see what it hides.' },
        { speaker: 'tey', text: 'Let\'s put the last chapter together.' },
      ],
    },
    {
      kind: 'steps',
      title: 'Your career-growth kit: complete',
      steps: [
        { title: 'Piece 1', body: 'A first-90-days kit.' },
        { title: 'Piece 2', body: 'An impact record.' },
        { title: 'Piece 3', body: 'A promotion case.' },
        { title: 'Piece 4', body: 'A one-page career plan.' },
        { title: 'Piece 5 (this chapter)', body: 'A change strategy.' },
        { title: 'The whole track', body: 'Three courses, fifteen kit pieces: from "I have no experience" to the other side of the table.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: the other chair.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What did Clinton do when the student said "I don\'t have much experience"?',
        options: [
          { text: 'Pointed to her real experience and asked about it' },
          { text: 'Agreed and moved on', why: 'He showed her what she had.' },
          { text: 'Ended the interview', why: 'He asked about the traders.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s change in order.',
        lines: ['Tested product with small experiments', 'Mapped the bridge', 'Applied internally the right way', 'Negotiated the pay dip', 'Handed over and started a new 90-day plan'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of Clinton\'s approach, or not?',
        groups: ['Part of it', 'Not part of it'],
        items: [
          { text: 'Testing before leaping', group: 0 },
          { text: 'Quitting for a bootcamp', group: 1 },
          { text: 'A "towards" change story', group: 0 },
          { text: 'Claiming a title early', group: 1 },
          { text: 'A clean handover to Kemi', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the "away" story.',
        lines: ['I care most about who uses what I build.', 'I\'m just tired of coding.', 'Engineering makes me a better PM.'],
        bug: 1,
        explanation: 'Towards, not away.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best interview question for the student.',
        from: 'clinton',
        message: 'What do I ask her next?',
        options: [
          { text: '"Tell me about a time a trader asked for something you couldn\'t give them. What did you do?"' },
          { text: '"Why should we hire someone with no experience?"', why: 'She has experience; ask about it.' },
          { text: '"What\'s your greatest weakness?" (first question)', why: 'Start with her real story.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the skill.',
        pairs: [
          ['David\'s bootcamp idea', 'Test before you leap'],
          ['The pay dip', 'Weigh it, then negotiate'],
          ['The support lead\'s request', 'A kind no with an alternative'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does Miracle say Clinton can do now?',
        options: [
          { text: 'See what "I don\'t have experience" hides' },
          { text: 'Never interview again', why: 'He sees what the sentence hides.' },
          { text: 'Write code faster', why: 'He sees hidden experience.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Testing first lowers risk', group: 0 },
          { text: 'It\'s too late after 25', group: 1 },
          { text: 'Skills carry over', group: 0 },
          { text: 'You always start at the bottom', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the track\'s rules.',
        template: 'Write it [[1]]. Prove it. Talk to [[2]]. Test before you [[3]].',
        blanks: [['down'], ['people'], ['leap']],
        distractors: ['off', 'nobody', 'sleep'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many kit pieces did you build across the whole track? (a number)',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What did Clinton say at his very first careers fair?',
        options: [
          { text: '"I don\'t have any experience yet."' },
          { text: '"I\'m the best developer in Cameroon."', why: 'He said he had no experience.' },
          { text: '"I want to be a PM."', why: 'He said he had no experience.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s last reply to Miracle.',
        from: 'miracle',
        message: 'So, what would you tell everyone who\'s where you were two years ago?',
        options: [
          { text: 'You have more than you think. Write it down, prove it, talk to people, and keep going after the noes.' },
          { text: 'Get lucky.', why: 'It was work, not luck.' },
          { text: 'Wait to be discovered.', why: 'Act, prove, talk, keep going.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look back over everything you\'ve built in this track. What would you tell the version of you who started it?',
    starters: ['I\'d tell myself...', 'The kit piece I\'m proudest of is...'],
  },
  deepen: {
    title: 'Your kit, complete',
    summary: 'Put all your kit pieces in one folder. Then help one person who says "I don\'t have any experience" see what they actually have.',
  },
  notes: 'Chapter Challenge and track finale. Outline finale: "he interviews his first intern, from the other side of the table." Full circle to How to Get Noticed, Ch1. Fifteen kit pieces = 5 per course × 3 courses.',
};

export default lesson;
