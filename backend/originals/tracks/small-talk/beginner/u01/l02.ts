import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2 — free. Myth or Fact: what the research says about talking to strangers (Epley & Schroeder 2014; Sandstrom & Boothby 2021). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Is small talk pointless?',
  summary: 'Grace\'s son Jayden says small talk is fake and pointless. Grace half agrees. Then she reads what happened when researchers asked train commuters to talk to strangers.',
  minutes: 11,
  outcomes: [
    'Know what the research says about talking to strangers',
    'Spot the prediction that keeps most people silent',
    'Bust three popular myths about small talk',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Most people would rather be left alone on a train than chat to a stranger.', isFact: false, explain: 'That\'s what people PREDICT. When researchers in Chicago asked commuters to talk to a stranger, they had a more pleasant journey than commuters who sat alone, even though another group had predicted the opposite.' },
        { text: 'People tend to assume strangers don\'t want to talk to them.', isFact: true, explain: 'This is the main reason people stay silent. In the same research, the strangers were usually happy to talk.' },
        { text: 'Conversations with strangers usually go worse than we expect.', isFact: false, explain: 'A review of seven studies with over 2,300 people found the opposite: talking to a stranger generally goes better than people expect.' },
        { text: 'Our biggest worry is usually that the other person won\'t enjoy it.', isFact: true, explain: 'Yes. People worry more about boring the other person than about not enjoying it themselves. Usually, they don\'t bore anyone.' },
        { text: 'Small talk is fake, so it doesn\'t matter.', isFact: false, explain: 'It\'s not fake, it\'s a ritual, like saying "please". Its job is to connect, and the studies show it lifts people\'s mood.' },
      ],
    },
    {
      kind: 'story',
      title: 'Monday evening, Grace\'s kitchen',
      beats: [
        { speaker: 'jayden', text: 'Small talk is just fake, Mum. "How was your weekend?" Nobody cares about your weekend.' },
        { speaker: 'grace', text: 'Funny. A study says people on trains are happier when they talk to a stranger, and they guessed the opposite beforehand.' },
        { speaker: 'jayden', text: '...Which train?' },
        { speaker: 'grace', text: 'Chicago. Commuters. Real people.' },
        { speaker: 'tey', text: "Jayden has a point: some small talk IS hollow. But the research is clear that the conversations we dread are usually ones we end up enjoying. We just predict them badly." },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'We predict that strangers don\'t want to talk, and that it will go badly. Usually, we\'re wrong on both counts.',
    },
  ],
  apply: {
    scenario: 'Monday evening. The great small-talk debate.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What happened to commuters who were asked to talk to a stranger?',
        options: [
          { text: 'They had a more pleasant journey than those who sat alone' },
          { text: 'They felt more awkward and regretted it', why: 'That\'s what people predicted. It\'s not what happened.' },
          { text: 'Nothing changed', why: 'Their journeys were rated more pleasant.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'What people PREDICT, or what actually HAPPENS?',
        groups: ['What people predict', 'What usually happens'],
        items: [
          { text: 'They won\'t want to talk to me', group: 0 },
          { text: 'They\'re happy to chat', group: 1 },
          { text: 'It will be awkward and boring', group: 0 },
          { text: 'It goes better than expected', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'Fine, but small talk is still FAKE. Why pretend to care about someone\'s weekend?',
        prompt: 'What could Grace say?',
        options: [
          { text: 'You\'re right, it\'s all fake.', why: 'She just read the research that says otherwise.' },
          { text: 'Go to your room.', why: 'Tempting. Not an argument.' },
          { text: 'It\'s not about the weekend. It\'s a friendly way of saying "I see you". Like saying please.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do people mostly worry about? That the OTHER person won\'t ___ the conversation. (one word)',
        answers: ['enjoy', 'like'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why do most people stay silent around strangers?',
        options: [
          { text: 'Talking to strangers is against the rules', why: 'There\'s no such rule.' },
          { text: 'They\'ve tried it and it always goes badly', why: 'The research says it usually goes better than expected.' },
          { text: 'They wrongly assume the other person doesn\'t want to talk' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s notes on the research. Which line is wrong?',
        lines: [
          'Commuters predicted that talking to a stranger would be unpleasant.',
          'In fact, talking made their journey more pleasant.',
          'So most strangers clearly hate being spoken to.',
        ],
        bug: 2,
        fix: 'So most strangers were happier to talk than people expected.',
        explanation: 'The research found the opposite: strangers were usually open to a chat.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the fact.',
        pairs: [
          ['They won\'t want to talk', 'Most people are happy to chat'],
          ['It will go badly', 'It usually goes better than expected'],
          ['Small talk is fake', 'It\'s a ritual that connects people'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Does the research mean you must talk to every stranger?',
        options: [
          { text: 'Yes, always', why: 'No. Some people want quiet, and that\'s fine. Lesson 6 covers the signals.' },
          { text: 'No, but it means the fear is usually bigger than the risk' },
          { text: 'Only on trains', why: 'The findings were similar in other settings too.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The big idea of this lesson.',
        template: 'We [[1]] that strangers won\'t want to talk, and that it will go [[2]]. Usually we\'re [[3]].',
        blanks: [['predict', 'assume'], ['badly'], ['wrong']],
        distractors: ['right', 'well'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Grace\'s reply to Jayden.',
        tiles: ['It\'s', 'not', 'fake,', 'it\'s', 'a', 'friendly', 'ritual.'],
        distractors: ['pointless', 'boring'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a conversation with a stranger you didn\'t have recently: on a bus, in a queue, at an event. What did you predict would happen? What might really have happened?',
    starters: ['I didn\'t talk to...', 'I predicted...', 'It might have...'],
  },
  deepen: {
    title: 'Test your prediction',
    summary: 'Next time you\'re about to stay silent, write down (in your head) how you think a short chat would go. Then try it. Compare. Most people find their prediction was too gloomy.',
  },
  notes: 'Epley & Schroeder (2014), "Mistakenly seeking solitude", J. Experimental Psychology: General 143(5) — Chicago commuters; predictors expected talking to be least pleasant. Sandstrom & Boothby (2021), Self and Identity 20(1): mini meta-analysis, 7 studies, >2,300 participants; conversations go better than expected; biggest worry is partner not enjoying it. Caveat (lesson L2 item 8): not everyone wants to chat; signals in lesson 6.',
};

export default lesson;
