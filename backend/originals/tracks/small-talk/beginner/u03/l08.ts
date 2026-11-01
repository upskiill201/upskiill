import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Card deck: weak ties at work — why the receptionist matters (Methot et al. 2021; Sandstrom & Dunn 2014). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Weak ties: why the receptionist matters',
  summary: 'Grace notices Femi knows everyone: the cleaner, the security guard, the man who fixes the lift. "They\'re my people," he says. It turns out the research agrees with him.',
  minutes: 11,
  outcomes: [
    'Know what research says about daily small talk at work',
    'See the value of "weak ties" across the building',
    'Build a small-talk habit with people outside your team',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Monday, week five. Femi walks Grace to the lift and says hello to six people on the way: the receptionist (Joy), the cleaner (Mr Okonkwo), a security guard, two people from Sales, and the man fixing the vending machine.</p><p>Grace: \"How do you know all these people?\"</p><p>Femi: \"I say hello. Every day. Same people. After a while, they're my people.\"</p>",
    },
    {
      kind: 'text',
      html: "<h3>Small talk at work lifts your day</h3><p>Researchers asked 151 employees to answer surveys three times a day for about three working weeks. On days with more small talk at work (greetings, friendly chats about how the day is going), people reported more positive social emotions, felt better at the end of the day, and were more helpful to colleagues.</p><h3>The catch</h3><p>The same study found that small talk could also distract people from focused work. It's \"uplifting yet distracting\". Lesson 9 is about getting that balance right.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Weak ties count</h3><p>Remember the weak-ties research from Chapter 1: people tended to be happier on days with more chats with acquaintances. At work, your weak ties are the receptionist, the cleaner, IT, people from other teams, the barista downstairs.</p><h3>They help in practical ways too</h3><p>The receptionist knows when the meeting room is free. IT fixes your laptop faster if you've been friendly for months. Someone in another team mentions a job opening. Weak ties are how information travels in a workplace.</p>",
    },
    {
      kind: 'check',
      question: 'What did the workplace small-talk study find?',
      options: ['Small talk is a waste of time', 'It lifted people\'s day, but could also distract from focused work', 'It only helped managers'],
      answer: 1,
      explanation: '"Uplifting yet distracting": better mood and more helpfulness, plus some distraction.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Pick three weak ties at work (or school) and say hello every day, with their name. In a month, they\'ll be "your people" too.',
    },
  ],
  apply: {
    scenario: 'Monday, week five. Femi\'s people.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Weak tie at work, or close tie?',
        groups: ['Weak tie', 'Close tie'],
        items: [
          { text: 'The receptionist you see every morning', group: 0 },
          { text: 'Your best friend at work', group: 1 },
          { text: 'Someone in IT you\'ve emailed twice', group: 0 },
          { text: 'The cleaner on your floor', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In the study, what happened on days with more small talk at work?',
        options: [
          { text: 'People felt worse', why: 'Mood and well-being went up.' },
          { text: 'People felt better by the end of the day and were more helpful' },
          { text: 'Nothing changed', why: 'There were clear effects, positive and negative.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the weak tie to how they might help.',
        pairs: [
          ['Receptionist', 'Knows when the room is free'],
          ['IT', 'Fixes your laptop faster'],
          ['Someone in another team', 'Mentions an opportunity'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'Why do I say hello to everyone? Honestly? It makes my day better. And Joy at reception saves me the good meeting room.',
        prompt: 'Grace\'s reply?',
        options: [
          { text: 'So you\'re just using them.', why: 'Femi\'s hellos are genuine; the help is a side effect.' },
          { text: 'I don\'t have time for that.', why: 'It takes ten seconds a day.' },
          { text: 'That\'s lovely. I\'m going to start with Joy and Mr Okonkwo.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The study described workplace small talk as "uplifting yet ___". (one word)',
        answers: ['distracting'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best daily habit with weak ties?',
        options: [
          { text: 'A short, friendly hello, using their name' },
          { text: 'A long chat with each one every day', why: 'Uplifting, yes. But distracting, and tiring.' },
          { text: 'Only talk when you need something', why: 'People notice. Friendliness first.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s weak-tie plan. Which line misses the point?',
        lines: [
          'Say hello to Joy at reception every morning, by name.',
          'Ask Mr Okonkwo how his daughter\'s exams went.',
          'Only be friendly to people who are useful to my career.',
        ],
        bug: 2,
        fix: 'Be friendly to everyone I see regularly.',
        explanation: 'The research is about how chats make everyone\'s day better, not about using people.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Watch and match', 'Follow the other person\'s style'],
          ['"How are you?" in the UK', 'Often just a greeting'],
          ['Introvert superpower', 'Listening'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Femi\'s secret.',
        template: 'I say [[1]]. Every [[2]]. Same people.',
        blanks: [['hello', 'hi'], ['day']],
        distractors: ['goodbye', 'year'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Grace\'s morning hello.',
        tiles: ['Morning,', 'Joy!', 'How', 'was', 'your', 'weekend?'],
        distractors: ['useful', 'need'],
      },
    ],
  },
  reflect: {
    prompt: 'Who are three "weak ties" you see regularly but have never really talked to? What\'s one friendly line you could say to each?',
    starters: ['1. ...', '2. ...', '3. ...'],
  },
  deepen: {
    title: 'Three people, every day',
    summary: 'For two weeks, say hello to the same three people every day, using their names. Notice how the hellos change.',
  },
  notes: 'Methot, Rosado-Solomon, Downes & Gabriel (2021), "Office chit-chat as a social ritual: The uplifting yet distracting effects of daily small talk at work", Academy of Management Journal 64(5): 1445–1471 — 151 full-time employees, three surveys daily for 15 working days; small talk increased positive social emotions → OCB and end-of-day well-being, but also reduced work engagement (distracting); self-monitoring moderated. Sandstrom & Dunn (2014) weak ties (Chapter 1). Joy and Mr Okonkwo are named extras.',
};

export default lesson;
