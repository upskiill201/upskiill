import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story: the change freeze. Stalls are normal; what you do next matters. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The freeze',
  summary: 'Week 5, Monday, 8:02 a.m. Refunds are down from 21 days to 11. Then Felix: "IT leadership just froze all system changes until next quarter. Sorry." The new screen was worth four days. Remi\'s stomach drops.',
  minutes: 11,
  outcomes: [
    'See that stalls are a normal part of leading change',
    'Respond to a setback without panicking or blaming',
    'Know this chapter\'s goal: keep it moving when it stalls',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 5, Monday, 8:02 a.m.',
      beats: [
        { speaker: 'felix', text: 'IT leadership just froze all system changes until next quarter. Some outage in Mombasa. Sorry. Nothing I can do.' },
        { speaker: 'narrator', text: 'Remi reads it three times. Four of the remaining six days depended on that screen. The review with Kamau is in eleven days. His first instinct is to forward it to Brian with "HELP". His second is to message Kamau directly. His third is to go back to bed.' },
        { speaker: 'zanele', text: '(over his shoulder) Oh no. Okay. What CAN still move?' },
      ],
      choice: {
        prompt: 'What should Remi do first?',
        options: [
          {
            text: 'Thank Felix for telling him straight away, then ask: "What exactly is frozen, and what isn\'t?"',
            outcome: 'Felix: "Code changes are frozen. Settings aren\'t." Twenty minutes later they work out that most of the screen is just settings, plus one small code change. Not four days. But two, if they can get one exception.',
            best: true,
          },
          {
            text: 'Message Kamau: "IT has blocked the refund project."',
            outcome: 'Kamau calls the Head of IT. The Head of IT calls Felix. Felix stops replying to Remi\'s messages.',
          },
          {
            text: 'Tell the team the goal is impossible now.',
            outcome: 'The energy leaves the room. Njeri says, "Like the other five projects." Two people stop coming to the stand-up.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Every change that crosses teams stalls at some point: a freeze, a reorganisation, a busy month, a key person on leave. Change expert John Kotter warns that declaring victory too early, or giving up at the first big obstacle, are common reasons change efforts fail. The leader's job isn't to avoid stalls. It's to keep things moving through them. <strong>This chapter:</strong> following up without nagging, escalating without burning bridges, disagreeing with senior people, peer feedback, small wins and staying consistent.</p>",
    },
  ],
  apply: {
    scenario: 'Week 5, Monday morning.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was Zanele\'s question?',
        options: [
          { text: '"Whose fault is this?"', why: 'Nobody\'s. An outage in Mombasa.' },
          { text: '"What CAN still move?"' },
          { text: '"Should we give up?"', why: 'The opposite.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeps it moving, or stalls it more?',
        groups: ['Keeps it moving', 'Stalls it more'],
        items: [
          { text: '"What exactly is frozen?"', group: 0 },
          { text: 'Going over Felix\'s head to Kamau', group: 1 },
          { text: 'Thanking Felix for telling him fast', group: 0 },
          { text: '"The goal is impossible now."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'Sorry. Nothing I can do.',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Can\'t you just do it anyway?', why: 'Asks him to break a rule for you.' },
          { text: 'This ruins everything.', why: 'Makes Felix feel worse, and fixes nothing.' },
          { text: 'Thanks for telling me straight away. Is there anything that ISN\'T frozen? Settings, reports, anything?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Every cross-team change hits a ___ at some point. (one word)',
        answers: ['stall', 'Stall', 'setback', 'obstacle', 'wall'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s response in order.',
        lines: ['Thank the messenger', 'Find out exactly what\'s blocked', 'Find what can still move', 'Update the team honestly'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is going straight to Kamau a mistake?',
        options: [
          { text: 'It goes over Felix\'s head and makes him look bad, so he stops helping' },
          { text: 'Kamau is too busy', why: 'It\'s about Felix, not Kamau\'s diary.' },
          { text: 'It isn\'t a mistake', why: 'It costs Remi his best IT ally.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s update to the team. Which line spreads gloom?',
        lines: [
          'IT froze code changes, so the new screen waits until next quarter.',
          'Honestly, this is probably the end of the project.',
          'Felix thinks one small change could still save two days. Still moving.',
        ],
        bug: 1,
        fix: 'We\'re at 11 days. Here\'s what can still move this week.',
        explanation: 'Giving up out loud gives everyone else permission to stop.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 3 review.',
        pairs: [
          ['Pre-wiring', 'No surprises in the room'],
          ['IKEA effect', 'We value what we build'],
          ['Implementation intention', 'When X, I will Y'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'Keep it [[1]] when it [[2]].',
        blanks: [['moving', 'going'], ['stalls']],
        distractors: ['quiet', 'wins'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Zanele\'s question.',
        tiles: ['What', 'can', 'still', 'move?'],
        distractors: ['fail?'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time a plan stalled because of something outside your control. What did you do? What could still have moved?',
    starters: ['The plan stalled when...', 'What could still have moved was...'],
  },
  deepen: {
    title: 'The "what can still move" list',
    summary: 'Next time something blocks you, write two lists: what\'s blocked, and what can still move. Start on the second list today.',
  },
  notes: 'John P. Kotter, "Leading Change: Why Transformation Efforts Fail" (HBR 1995) and Leading Change (1996): common errors include declaring victory too soon and not removing obstacles. Fictional events (change freeze, Mombasa outage).',
};

export default lesson;
