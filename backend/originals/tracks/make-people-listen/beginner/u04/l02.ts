import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Reading: what research says about interruptions (cooperative vs intrusive; status; gender findings, hedged). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What research says about interruptions',
  summary: 'Lucía wants to know: is it her? Is it because she\'s new? Because she\'s a woman? Because Diego is Diego? Tey opens the Tey FM research file.',
  minutes: 12,
  outcomes: [
    'Tell helpful interruptions from intrusive ones',
    'Know what research suggests about who gets interrupted',
    'Focus on what you can change in the room',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The Tey FM research file: interruptions',
      html: "<p>Tey pulls a very thick folder off the shelf. \"Lucía, interruptions are one of the most studied things in conversation. Here's what's useful.\"</p><h3>Not all interruptions are bad</h3><p>Researchers often separate two kinds:</p><ul><li><strong>Cooperative interruptions</strong> show you're with someone: \"Yes!\", \"Exactly\", finishing a sentence the <em>right</em> way, a quick question to understand. Many friendly conversations are full of them.</li><li><strong>Intrusive interruptions</strong> take the floor away: changing the topic, finishing a sentence the <em>wrong</em> way, talking over someone until they stop.</li></ul><p>Diego's \"...TikTok!\" was intrusive. It took the topic somewhere Lucía didn't mean to go.</p><h3>Who gets interrupted?</h3><p>Research suggests status plays a part: people who feel more senior or more confident in a group tend to interrupt more. Diego has twelve years. Lucía has twelve days as team lead.</p><p>Gender may play a part too. One small 2015 study found that both men and women in the study interrupted women more often than they interrupted men. Larger reviews find the overall picture is more mixed and depends a lot on the setting. So it's worth noticing, without assuming it's the whole story.</p><h3>What you can change</h3><p>Lucía can't change Diego's twelve years, or the research. She <em>can</em> change the room: how she starts, how she holds the floor, and the rules of her meetings. That's the rest of this chapter.</p>",
    },
    {
      kind: 'check',
      question: 'Which of these is an INTRUSIVE interruption?',
      options: ['Finishing someone\'s sentence with a different idea and carrying on', 'Saying "Exactly!" while they talk', 'A quick question to understand'],
      answer: 0,
      explanation: 'Intrusive interruptions take the floor or the topic away. Cooperative ones show you\'re listening.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Some interruptions help, some take the floor. Notice the patterns, then change what you can: how you start, how you hold the floor, and the meeting rules.',
    },
  ],
  apply: {
    scenario: 'Tey FM, the research file.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What makes an interruption "cooperative"?',
        options: [
          { text: 'It\'s very loud', why: 'Volume isn\'t the difference.' },
          { text: 'It shows you\'re listening, without taking the floor away' },
          { text: 'It changes the topic politely', why: 'Changing the topic takes the floor, even politely.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Cooperative, or intrusive?',
        groups: ['Cooperative', 'Intrusive'],
        items: [
          { text: '"Yes, exactly!"', group: 0 },
          { text: '"...TikTok! Big influencers!"', group: 1 },
          { text: '"Sorry, which month?"', group: 0 },
          { text: 'Talking until the other person gives up', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'So is Diego interrupting me because I\'m a woman?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'It might be part of it; some research points that way. Status and habit matter too. Either way, you can change the room.' },
          { text: 'Definitely, 100%, nothing else.', why: 'The research is more mixed than that.' },
          { text: 'Gender never matters.', why: 'Some research suggests it can.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Interruptions that take the floor away are called ___. (one word)',
        answers: ['intrusive'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What does research suggest about status and interrupting?',
        options: [
          { text: 'Junior people interrupt most', why: 'Usually the other way.' },
          { text: 'Status has no link to interrupting', why: 'Research suggests it does.' },
          { text: 'People who feel more senior or confident in a group tend to interrupt more' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Lucía\'s plan in order.',
        lines: ['Notice the pattern.', 'Separate cooperative from intrusive interruptions.', 'Change how she starts.', 'Change how she holds the floor.', 'Change the meeting rules.'],
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s notes after reading the file. Which line misreads the research?',
        lines: [
          'Some interruptions are friendly. Not all are a problem.',
          'Research proves every interruption is about gender, always.',
          'Status probably matters: Diego has been here twelve years.',
        ],
        bug: 1,
        fix: 'Gender may play a part; the overall research is mixed.',
        explanation: 'One small study found women were interrupted more. Larger reviews are more mixed. Avoid "always".',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Illusion of transparency', 'Nerves less visible than they feel'],
          ['Cooperative interruption', '"Yes, exactly!"'],
          ['Intrusive interruption', '"...TikTok!"'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'What Lucía can change.',
        template: 'How she [[1]]. How she holds the [[2]]. The meeting [[3]].',
        blanks: [['starts'], ['floor'], ['rules']],
        distractors: ['Diego', 'research'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tey\'s conclusion.',
        tiles: ['You', 'can', 'change', 'the', 'room.'],
        distractors: ['Diego', 'can\'t'],
      },
    ],
  },
  reflect: {
    prompt: 'Think about a group you\'re part of. Who interrupts, and who gets interrupted? Are the interruptions mostly cooperative or intrusive?',
    starters: ['In my group...', 'Mostly they are...'],
  },
  deepen: {
    title: 'Be a cooperative interrupter',
    summary: 'This week, practise only cooperative interruptions: "Yes!", "Exactly", a quick question to understand. Notice how people respond compared to when you take the floor.',
  },
  notes: 'Cooperative vs intrusive interruptions: e.g. Anderson & Leaper (1998) meta-analysis, Sex Roles 39 — small overall gender difference in intrusive interruptions, moderated by context. Hancock & Rubin (2015), Journal of Language and Social Psychology 34(1): small study (n≈40), both men and women interrupted women more. Status and interruption: widely reported; stated as "suggests". All hedged.',
};

export default lesson;
