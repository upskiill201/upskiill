import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story with a choice: the snack table at Grace's first meetup. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The snack table',
  summary: 'Thursday, 6:30 p.m. A health-tech meetup in a converted mill in Ancoats. Seventy strangers, all holding drinks, all mid-conversation. Grace finds the snack table and stays there. For an hour.',
  minutes: 12,
  outcomes: [
    'Understand why events full of strangers feel so hard',
    'Know that most people at events want to be approached',
    'Make one small first move instead of hiding',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 6:30 p.m., Ancoats',
      beats: [
        { speaker: 'narrator', text: 'Exposed brick, fairy lights, seventy people in small groups, laughing like they\'ve known each other for years. Grace has a name badge that says GRACE (KINWELL) and the urge to go home.' },
        { speaker: 'narrator', text: 'She finds the snack table. It is safe. Crisps don\'t judge. She eats eleven mini samosas. A man next to her says, "These are good." Grace says, "They are." He leaves. That\'s her one conversation.' },
        { speaker: 'narrator', text: '7:30. Grace is still at the snack table. Her phone buzzes: Femi. "How\'s it going?? Talk to ANYONE yet?"' },
        { speaker: 'tey', text: "Here's what Grace can't see from the snack table: half the room feels exactly like she does. People at events are mostly hoping someone will talk to them. What should she do?" },
      ],
      choice: {
        prompt: 'It\'s 7:30. What\'s Grace\'s move?',
        options: [
          {
            text: 'Go home. She tried.',
            outcome: 'She\'s home by 8:15, relieved, then annoyed. She tells Femi it was "fine". It wasn\'t.',
          },
          {
            text: 'Look for someone else on their own, and say one thing: "First time at one of these? I\'ve been hiding by the samosas for an hour."',
            outcome: 'A young developer called Ravi laughs. "I\'ve been pretending to read my emails for forty minutes." They talk until 9. He introduces her to two people.',
            best: true,
          },
          {
            text: 'March into the biggest, loudest group and start talking.',
            outcome: 'Grace interrupts a story mid-punchline. Six faces turn. It\'s a long ten seconds before someone kindly says, "Hi?"',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Events full of strangers are hard for almost everyone. Everyone else <em>looks</em> confident because you're seeing their outsides and your insides.</p><p>Three things to remember:</p><ul><li><strong>Most people at events want to talk.</strong> That's why they came. The research on strangers from Chapter 1 still applies: people expect it to go worse than it does.</li><li><strong>People on their own are your easiest start.</strong> They're usually relieved when someone says hello.</li><li><strong>Admitting it's awkward is a great opener.</strong> \"First time at one of these?\" or \"I've been hiding by the samosas\" is honest and instantly relatable.</li></ul>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'At an event, start with someone on their own. Honesty about the awkwardness ("first time?") is one of the best openers there is.',
    },
  ],
  apply: {
    scenario: 'Thursday, 7:30 p.m. The snack table.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does everyone else look so confident?',
        options: [
          { text: 'They all know each other', why: 'Many are strangers too.' },
          { text: 'You\'re comparing their outsides with your insides' },
          { text: 'They\'re all extroverts', why: 'Plenty are nervous; you just can\'t see it.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Easier start, or harder start?',
        groups: ['Easier start', 'Harder start'],
        items: [
          { text: 'Someone on their own looking at their phone', group: 0 },
          { text: 'A tight circle of six mid-joke', group: 1 },
          { text: 'Someone in the drinks queue', group: 0 },
          { text: 'Two people in a deep, serious conversation', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'How\'s it going?? Talk to ANYONE yet?',
        prompt: 'Grace\'s honest reply, and plan?',
        options: [
          { text: 'One man. About samosas. Going home.', why: 'Honest, but she can do one more try.' },
          { text: 'Loads! (lie)', why: 'Femi will ask for names.' },
          { text: 'One man, about samosas. Going to find someone on their own and try once more.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'At events, the easiest people to start with are people on their ___. (one word)',
        answers: ['own'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Which opener admits the awkwardness, in a good way?',
        options: [
          { text: '"First time at one of these? I\'ve been hiding by the samosas for an hour."' },
          { text: '"Why are you standing alone?"', why: 'Points at their awkwardness, not yours.' },
          { text: '"Hello. I am networking."', why: 'Honest. Odd.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s event plan. Which line will make it harder?',
        lines: [
          'Find someone on their own.',
          'Walk into the loudest group mid-joke and start talking.',
          'Use "First time at one of these?"',
        ],
        bug: 1,
        fix: 'Look for a group that\'s open, and wait for a pause.',
        explanation: 'Barging into a tight group mid-story is the hardest start of all. Lesson 3 shows how to join groups.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review from earlier chapters.',
        pairs: [
          ['Notice + ask', 'The all-purpose opener'],
          ['Liking gap', 'People like you more than you think'],
          ['Kind exit', 'Warm words, a reason, a later time'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Ravi laugh at Grace\'s opener?',
        options: [
          { text: 'He thought she was being silly', why: 'He was relieved.' },
          { text: 'He felt exactly the same, and her honesty made it easy' },
          { text: 'He loves samosas', why: 'Possibly. Not the main reason.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s opener.',
        template: '[[1]] time at one of these? I\'ve been hiding by the [[2]] for an [[3]].',
        blanks: [['First'], ['samosas', 'snacks'], ['hour']],
        distractors: ['Last', 'year'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build an easy event opener.',
        tiles: ['Is', 'this', 'your', 'first', 'time', 'at', 'one', 'of', 'these?'],
        distractors: ['alone'],
      },
    ],
  },
  reflect: {
    prompt: 'Where is your "snack table": the thing you do at events to avoid talking to people? What would one small first move look like instead?',
    starters: ['My snack table is...', 'One small move would be...'],
  },
  deepen: {
    title: 'One person on their own',
    summary: 'At your next event, before you do anything else, find one person on their own and say "First time at one of these?" That\'s the whole plan.',
  },
  notes: 'Draws on Epley & Schroeder (2014) and Sandstrom & Boothby (2021) from Chapter 1 (people underestimate others\' interest). "Comparing your insides to their outsides" is a common saying. Ancoats is a real Manchester neighbourhood. Ravi is a named extra (narrated).',
};

export default lesson;
