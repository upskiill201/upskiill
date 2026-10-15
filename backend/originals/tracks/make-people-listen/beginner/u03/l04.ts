import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Reading: nobody can see your nerves (illusion of transparency, Savitsky & Gilovich 2003). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Nobody can see your nerves',
  summary: 'David confesses the real reason he speaks into his notebook: "When I talk in a group, my heart races and my face goes hot. Everyone can see it." Tey: "Can they, though? Let me read you something."',
  minutes: 12,
  outcomes: [
    'Know the "illusion of transparency"',
    'Understand that your nerves are less visible than they feel',
    'Use this knowledge to speak more calmly',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The illusion of transparency',
      html: "<p>Tey dims the studio lights. \"David, here's a story about some very nervous people.\"</p><h3>The experiment</h3><p>In 2003, psychologists Kenneth Savitsky and Thomas Gilovich asked students to give short, unprepared speeches in front of an audience. Afterwards, the speakers rated how nervous they thought they <em>looked</em>. The audience rated how nervous the speakers <em>actually seemed</em>.</p><p>The speakers were sure their nerves were obvious. The audience saw much less nervousness than the speakers believed.</p><p>The researchers called this the <strong>illusion of transparency</strong>: we feel our inner state is plain for everyone to see, when mostly it isn't. Your racing heart is loud <em>inside</em> you. From outside, it's nearly silent.</p><h3>The good news</h3><p>Then came the interesting part. Some speakers were simply <strong>told</strong> about the illusion before speaking: \"You might feel nervous, but research shows audiences usually can't tell.\" Those speakers felt calmer, and audiences rated their speeches as better.</p><p>Just knowing the illusion exists helped.</p><h3>What this means for David</h3><ul><li>The heat in his face? Probably far less visible than he thinks.</li><li>The racing heart? Invisible.</li><li>The shaky feeling? People mostly see someone speaking.</li></ul><p>Nerves are normal. Even experienced speakers feel them. The difference is they know the audience can't see most of it, so they keep going.</p>",
    },
    {
      kind: 'check',
      question: 'What happened when speakers were told about the illusion of transparency before speaking?',
      options: ['They felt calmer and gave better-rated speeches', 'They got more nervous', 'Nothing changed'],
      answer: 0,
      explanation: 'Simply knowing that audiences usually can\'t see your nerves helped speakers relax and perform better.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Your nerves are loud inside you and quiet outside. Most people only see someone speaking.',
    },
  ],
  apply: {
    scenario: 'Tey FM. The nerves myth.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the "illusion of transparency"?',
        options: [
          { text: 'Being able to read other people\'s minds', why: 'The opposite, really.' },
          { text: 'Believing your feelings are far more visible to others than they really are' },
          { text: 'Being totally honest', why: 'Not what it means.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'But my face goes really hot. They MUST see that.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Yes, everyone sees it. Leave the room.', why: 'Not true, and not helpful.' },
          { text: 'Wear a mask.', why: 'Tempting. No.' },
          { text: 'It feels huge to you. Research suggests audiences notice much less than speakers think. Keep going.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The illusion of ___. (one word)',
        answers: ['transparency'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'What David feels, or what the audience mostly sees?',
        groups: ['David feels', 'Audience mostly sees'],
        items: [
          { text: 'A racing heart', group: 0 },
          { text: 'Someone sharing an idea', group: 1 },
          { text: 'A face on fire', group: 0 },
          { text: 'A calm-ish student', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the experiment in order.',
        lines: ['Students give short, unprepared speeches.', 'Speakers rate how nervous they looked.', 'The audience rates how nervous they seemed.', 'The audience saw much less nervousness than the speakers believed.'],
      },
      {
        kind: 'mcq',
        prompt: 'Is feeling nervous before speaking a sign something is wrong?',
        options: [
          { text: 'No, it\'s normal; even experienced speakers feel it' },
          { text: 'Yes, you shouldn\'t speak', why: 'Nerves are normal.' },
          { text: 'Only for quiet people', why: 'Everyone feels it sometimes.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'David\'s self-talk before the meeting. Which thought is the illusion talking?',
        lines: [
          'I\'m nervous, and that\'s normal.',
          'Everyone will see my hands shaking and think I\'m weak.',
          'I\'ll breathe and say my idea.',
        ],
        bug: 1,
        fix: 'They\'ll mostly see someone sharing an idea.',
        explanation: 'That\'s the illusion of transparency. Your nerves are much less visible than they feel.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Hearing a pitch vs reading it', 'Seen as more intelligent'],
          ['Pause before', 'Signals something matters'],
          ['Telling speakers about the illusion', 'They felt calmer'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s line.',
        template: 'Your nerves are loud [[1]] you and quiet [[2]]. Most people only see someone [[3]].',
        blanks: [['inside'], ['outside'], ['speaking', 'talking']],
        distractors: ['shaking', 'everywhere'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build David\'s new self-talk.',
        tiles: ['They', 'can\'t', 'see', 'most', 'of', 'it.'],
        distractors: ['everything', 'all'],
      },
    ],
  },
  reflect: {
    prompt: 'When do you feel most nervous speaking? Now that you know about the illusion of transparency, what would you tell yourself next time?',
    starters: ['I feel most nervous when...', 'Next time, I\'ll remind myself...'],
  },
  deepen: {
    title: 'Ask a friend',
    summary: 'After your next presentation or group discussion, ask a trusted friend: "Did I look nervous?" Compare their answer to how nervous you felt. Most people are surprised.',
  },
  notes: 'Savitsky & Gilovich (2003), Journal of Experimental Social Psychology 39(6): "The illusion of transparency and the alleviation of speech anxiety" — speakers overestimated how nervous they appeared; informing speakers about the illusion reduced anxiety and improved observer-rated speech quality.',
};

export default lesson;
