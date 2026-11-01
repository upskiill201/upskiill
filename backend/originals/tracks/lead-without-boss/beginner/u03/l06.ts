import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Reading: running a meeting when you're not in charge (facilitation; meeting science). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Running a room you don\'t own',
  summary: 'Sunday night. Tomorrow Remi runs a workshop with five people from five teams, plus Brian, who is senior to everyone. Remi is the most junior person in the room, and he\'s in charge of it. Tey sends him something to read on the matatu.',
  minutes: 12,
  outcomes: [
    'Run a meeting where you\'re not the most senior person',
    'Use purpose, timeboxes and rounds to keep it fair',
    'End with decisions and owners, not just "great discussion"',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The facilitator\'s job',
      html: "<p>When you run a meeting without authority, your power is the <strong>process</strong>: you don't decide everything, but you decide how the room decides. Organisational psychologist <strong>Steven Rogelberg</strong>, who has studied meetings for years, argues that most bad meetings are a leadership problem, not a time problem: unclear purpose, the loudest voices dominating, and no clear outcome.</p><h3>1. Say the purpose as a question</h3><p>Not \"refund workshop\". Instead: <strong>\"Which three fixes do we start this week?\"</strong> A question tells everyone what done looks like.</p><h3>2. Timebox every part</h3><p>\"Ten minutes on the options, ten on choosing, ten on who does what.\" Put the times on the screen. Then you can say \"we're at time\" without it being personal.</p><h3>3. Hear from everyone, not just the loudest</h3><p>Use a <strong>round</strong>: each person speaks in turn, briefly. Or have everyone write ideas on sticky notes first, then share. That protects quieter people (and junior ones) from being drowned out, including by Brian.</p><h3>4. Park what doesn't belong</h3><p>Keep a \"parking lot\" list for good topics that aren't for today. People feel heard, and the meeting stays on track.</p><h3>5. End with decisions, owners and dates</h3><p>Read them out before anyone leaves: what we decided, who owns each piece, by when. Send it within the hour.</p><h3>About Brian</h3><p>Pre-wire him: \"Could you hold your view until everyone else has spoken? People will follow yours if you go first.\" Most senior people are glad to be asked.</p>",
    },
    {
      kind: 'check',
      question: 'Why ask Brian to speak last?',
      options: ['People often follow the most senior view if it comes first', 'He talks too much', 'He\'s not important'],
      answer: 0,
      explanation: 'Senior voices first can flatten everyone else\'s ideas.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Your power is the process. Purpose as a question. Timebox it. Rounds so everyone speaks. Park the rest. End with decisions, owners and dates.',
    },
  ],
  apply: {
    scenario: 'The matatu, reading about meetings.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When you run a meeting without authority, what\'s your power?',
        options: [
          { text: 'The process: how the room decides' },
          { text: 'Your title', why: 'Remi doesn\'t have one.' },
          { text: 'Brian\'s title', why: 'Borrowed again. The process is yours.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to what it does.',
        pairs: [
          ['Purpose as a question', 'Everyone knows what done is'],
          ['A round', 'Everyone speaks, not just the loudest'],
          ['Parking lot', 'Good topics, saved for later'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good facilitation, or not?',
        groups: ['Good', 'Not'],
        items: [
          { text: '"Which three fixes do we start this week?"', group: 0 },
          { text: '"Let\'s just chat about refunds."', group: 1 },
          { text: 'Times on the screen', group: 0 },
          { text: 'The most senior person speaks first', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'You want me to speak LAST? I\'m the most senior person there.',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Sorry, forget I asked.', why: 'It\'s a good ask. Explain it.' },
          { text: 'Because you talk too much.', why: 'True or not, never say that.' },
          { text: 'That\'s why. If you go first, people will follow your view. I\'d love theirs first, then yours.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A list for good topics that aren\'t for today is the parking ___. (one word)',
        answers: ['lot', 'Lot'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Rogelberg argues most bad meetings are mainly a problem of...',
        options: [
          { text: 'The room being too cold', why: 'Comfort matters a bit. Purpose matters more.' },
          { text: 'Not enough slides', why: 'Usually the opposite.' },
          { text: 'Leadership: unclear purpose, loud voices dominating, no outcome' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s agenda. Which line will hurt the meeting?',
        lines: [
          'Purpose: which three fixes do we start this week?',
          'Open discussion, as long as it takes.',
          'Last 10 minutes: decisions, owners, dates.',
        ],
        bug: 1,
        fix: '10 minutes: options, using a round.',
        explanation: '"As long as it takes" means the loudest people and the clock decide.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the workshop in order.',
        lines: ['Purpose as a question', 'Options, in a round', 'Choose, timeboxed', 'Decisions, owners, dates'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'End with [[1]], [[2]] and [[3]].',
        blanks: [['decisions'], ['owners'], ['dates']],
        distractors: ['snacks', 'vibes'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the workshop question.',
        tiles: ['Which', 'three', 'fixes', 'do', 'we', 'start?'],
        distractors: ['chat'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last meeting or group call you were in. Was there a purpose question? Did everyone speak? Did it end with owners and dates?',
    starters: ['The purpose was...', 'It ended with...'],
  },
  deepen: {
    title: 'Ask the purpose question',
    summary: 'In your next meeting, if nobody has said it, ask kindly: "What do we want to have decided by the end?" Watch the meeting change.',
  },
  notes: 'Steven G. Rogelberg, The Surprising Science of Meetings (2019): meeting quality as leadership responsibility; agendas framed as questions; techniques to equalise participation (round-robin, brainwriting). Senior-first anchoring/HiPPO effect: hedged. Parking lot: standard facilitation practice.',
};

export default lesson;
