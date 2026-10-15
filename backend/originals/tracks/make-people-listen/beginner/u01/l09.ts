import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Reading: talk less, say more — why the most-heard people often say the least. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Talk less, say more',
  summary: 'Tey reads a letter on air from a listener: "My grandmother speaks maybe ten sentences a day. When she talks, the whole family goes silent." Why do the quietest people sometimes get heard the most?',
  minutes: 12,
  outcomes: [
    'Understand why scarcity makes words count',
    'Use short sentences and stop when you\'ve made the point',
    'Leave space for others, so they want to hear you back',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'A letter to Tey FM',
      html: "<p><em>\"Dear Tey, my grandmother in Bamenda speaks maybe ten sentences a day. When she talks, the whole family goes silent. My uncle talks all day and nobody hears a word. Why? — A listener (it's Clinton, I'm the uncle in this story)\"</em></p><p>Tey laughs, then gets serious. \"This is the heart of the whole chapter.\"</p><h3>Words are like money</h3><p>The more of something there is, the less each one is worth. When someone talks constantly, listeners learn that most of it doesn't matter, so they stop sorting. When someone speaks rarely and clearly, listeners learn that every sentence counts.</p><h3>Short sentences carry further</h3><p>Long, winding sentences make listeners hold lots in their heads at once, and most people can only hold a few things at a time. Short sentences land one idea at a time. \"Sunday. Library. Four o'clock.\" Nobody gets lost.</p><h3>Stop when you've finished</h3><p>The most common way people lose their audience isn't the start. It's the end: they make their point, then keep going. \"So yeah, anyway, like I said, basically...\" Every extra sentence after your point waters it down. When you're done, stop. Silence after a good point lets it land.</p><h3>Leave space</h3><p>Conversations are a trade. If you take all the airtime, people stop listening, partly out of fairness: you didn't listen to them. Leave gaps. Ask questions. The grandmother isn't just quiet. She listens to everyone, so when she speaks, they listen back.</p><h3>Not the same as staying silent</h3><p>This isn't \"never talk\". Chapter 3's caller has the opposite problem. The goal is that when you speak, it's worth hearing, and people know it.</p>",
    },
    {
      kind: 'check',
      question: 'Why does the family go silent when the grandmother speaks?',
      options: ['She shouts', 'She speaks rarely and clearly, and listens to everyone', 'She has the best stories'],
      answer: 1,
      explanation: 'Her words are rare, clear and earned by listening.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Say less, so each word counts. Short sentences. Stop when you\'ve made the point. Leave space for others.',
    },
  ],
  apply: {
    scenario: 'Tey FM, a letter from a listener.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why do people stop listening to someone who talks constantly?',
        options: [
          { text: 'They\'re jealous', why: 'Unlikely.' },
          { text: 'They can\'t hear', why: 'They can hear. They\'ve stopped listening.' },
          { text: 'They learn most of it doesn\'t matter, so they stop sorting' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps your words count, or waters them down?',
        groups: ['Helps', 'Waters down'],
        items: [
          { text: 'Short sentences', group: 0 },
          { text: '"So yeah, anyway, like I said..."', group: 1 },
          { text: 'Stopping after your point', group: 0 },
          { text: 'Talking through every pause', group: 1 },
          { text: 'Asking a question and listening', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Clinton\'s announcement in class. Which sentence waters it down?',
        lines: [
          'Study session Sunday, 4 p.m., library.',
          'Bring what you\'re stuck on.',
          'So yeah, anyway, like I said, basically, it\'s a study thing, on Sunday, yeah.',
        ],
        bug: 2,
        fix: 'Stop after "Bring what you\'re stuck on."',
        explanation: 'Repeating after the point makes it fade. Stop, and let it land.',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'So I should just never talk?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Yes, total silence from now on.', why: 'Chapter 3\'s caller has THAT problem.' },
          { text: 'Talk more, but faster.', why: 'Faster doesn\'t help.' },
          { text: 'No: talk less, so when you do, it\'s worth hearing. And listen in between.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'When you\'ve made your point, ___. (one word)',
        answers: ['stop'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why do short sentences "carry further"?',
        options: [
          { text: 'They\'re louder', why: 'Length, not volume.' },
          { text: 'Listeners only need to hold one idea at a time' },
          { text: 'They sound more casual', why: 'They sound clearer.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its picture.',
        pairs: [
          ['Words are like money', 'The more there are, the less each is worth'],
          ['Stop when you\'re done', 'Let the point land'],
          ['Leave space', 'Conversation is a trade'],
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Right moment', 'Not when they\'re rushing'],
          ['Is now a good time?', 'Cheapest way to get attention'],
          ['Ask first', 'People listen to those who listen'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s rule.',
        template: 'Say [[1]], so each word [[2]].',
        blanks: [['less'], ['counts', 'matters']],
        distractors: ['more', 'shouts'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the grandmother\'s style.',
        tiles: ['Sunday.', 'Library.', 'Four', 'o\'clock.'],
        distractors: ['basically', 'anyway'],
      },
    ],
  },
  reflect: {
    prompt: 'Who in your life speaks rarely but is always listened to? What do they do that you could borrow?',
    starters: ['The person is...', 'They...', 'I could borrow...'],
  },
  deepen: {
    title: 'The full-stop challenge',
    summary: 'In your next three conversations, notice when you\'ve made your point, and stop. No "so yeah, anyway". Let the silence do the work.',
  },
  notes: 'Practical guidance; "hold a few things at a time" reflects working-memory limits (Cowan 2001, taught in Chapter 2). The grandmother letter is fictional, framed as Clinton\'s own family in Bamenda (CAST.md: Clinton is Bamenda-born).',
};

export default lesson;
