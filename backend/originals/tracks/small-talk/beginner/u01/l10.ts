import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Unit Challenge. The whole chapter, harder. Climax: Femi's dare — five hellos before Friday drinks. Cliffhanger into Chapter 2. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Unit Challenge: five hellos by Friday',
  summary: 'Femi\'s dare: before Friday\'s team drinks, say hello to five people at Kinwell you haven\'t met. Not a nod. A real hello. Grace has three hours.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Open conversations with five different people using this chapter\'s tools',
    'Read signals, keep names, and answer the voice in your head',
    'End the week knowing small talk is a skill you already have',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 2:00 p.m.',
      beats: [
        { speaker: 'femi', text: 'Five people you haven\'t met. Real hellos. Before drinks at five. If you do it, I\'ll stop calling you "Nurse".' },
        { speaker: 'grace', text: 'And if I don\'t?' },
        { speaker: 'femi', text: 'I start calling you "Matron".' },
        { speaker: 'narrator', text: 'Grace looks across the office. A receptionist. A designer by the window. A developer on a call. Someone new from Finance. And, coming out of the lift, Sam, the CEO, again.' },
        { speaker: 'tey', text: "Five people, five situations, everything from this week. Read the signals, notice and ask, keep the names. Go." },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge. Five hellos before five o\'clock.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Hello #1: the receptionist, who smiles every morning. Best opener?',
        options: [
          { text: '"And how are we feeling today?"', why: 'Matron is coming.' },
          { text: '"Hi, I\'m Grace, I started this week. You\'re always the first friendly face I see. What\'s your name?"' },
          { text: '"Nice weather?"', why: 'A closed door, and it\'s raining.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: '(text) The developer by the window has headphones in and he\'s on a call. Go for it!',
        prompt: 'What should Grace do?',
        options: [
          { text: 'Interrupt the call. Femi said so.', why: 'His signals say "not now", whatever Femi says.' },
          { text: 'Wave until he takes his headphones off.', why: 'Please don\'t.' },
          { text: 'Skip him for now and pick someone who looks open.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Who looks open right now?',
        groups: ['Open', 'Not now'],
        items: [
          { text: 'The designer who looks up and smiles', group: 0 },
          { text: 'The developer on a call', group: 1 },
          { text: 'The new Finance person standing by the kettle, looking around', group: 0 },
          { text: 'Someone typing fast with a deadline face', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Hello #2: the new person from Finance, also in their first week. Best "notice + ask"?',
        options: [
          { text: '"Is this your first week too? How are you finding it so far?"' },
          { text: '"Do you work here?"', why: 'They\'re in the kitchen with a lanyard. Closed, and odd.' },
          { text: '"Finance must be boring."', why: 'Not a great start with anyone in Finance.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(to the new Finance person) I\'m Grace, by the way.',
        prompt: 'They reply: "I\'m Tomasz." What should Grace say to keep the name?',
        options: [
          { text: '"Cool."', why: 'She\'ll lose the name by Monday.' },
          { text: '"Lovely to meet you, Tomasz. Another newbie, thank goodness."' },
          { text: '"Tomasz, Tomasz, Tomasz."', why: 'Once is enough.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Turn "Busy day?" into an open question: "What\'s kept you ___ today?" (one word)',
        answers: ['busy'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Hello #3, the designer. Which line turns it into an interview?',
        lines: [
          'I love your sketchbook. What are you drawing?',
          'Oh, I used to draw on the back of patient charts. Very badly.',
          'How old are you? Where do you live? What do you earn?',
        ],
        bug: 2,
        fix: 'How did you get into design?',
        explanation: 'Rapid personal questions feel like an interrogation. One open question, and share a little back.',
      },
      {
        kind: 'mcq',
        prompt: 'Hello #4: Sam, the CEO, steps out of the lift. Grace already met him in the lift on Thursday. What\'s her line?',
        options: [
          { text: '"Dry this time! How was the ride in?"' },
          { text: 'Pretend she\'s never met him', why: 'He\'ll remember "dry off".' },
          { text: '"Any pain at all?"', why: 'Matron confirmed.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each hello to the tool it uses.',
        pairs: [
          ['Skipping the developer on a call', 'Reading signals'],
          ['"Lovely to meet you, Tomasz."', 'Keeping names'],
          ['"How are you finding it so far?"', 'Open questions'],
          ['"Dry this time!"', 'Notice + ask'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(inner voice, 4:45) Hello #4 was awkward. Sam probably thinks I\'m weird now.',
        prompt: 'What\'s the evidence-based answer?',
        options: [
          { text: 'Probably true, give up.', why: 'The liking gap says the voice is usually too harsh.' },
          { text: 'Hide in the toilets until drinks.', why: 'One hello left!' },
          { text: 'People usually like me more than I think, and he laughed.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Hello #5, 4:55. Grace forgot the receptionist\'s name from hello #1. What should she do?',
        options: [
          { text: 'Avoid the receptionist for the rest of her career', why: 'She sees her every morning.' },
          { text: 'Call her "you"', why: 'She\'ll notice.' },
          { text: '"I\'m so sorry, I\'ve forgotten your name already. I\'m Grace, from this morning!"' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which idea from this chapter is it?',
        groups: ['Why small talk matters', 'How to start it', 'What\'s in your head'],
        items: [
          { text: 'Phatic communion: talk that bonds', group: 0 },
          { text: 'Notice + ask', group: 1 },
          { text: 'The liking gap', group: 2 },
          { text: 'Weak ties brighten your day', group: 0 },
          { text: 'Open questions', group: 1 },
          { text: 'They\'ll find me boring (they usually don\'t)', group: 2 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s formula for the whole week.',
        template: 'Read the [[1]]. Notice and [[2]]. Say their [[3]] back. Be warm, not clever.',
        blanks: [['signals', 'room'], ['ask'], ['name']],
        distractors: ['pain', 'joke'],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: '5 p.m. Well? How many?',
        prompt: 'Grace\'s answer?',
        options: [
          { text: 'None. I hid.', why: 'She didn\'t! She did all five.' },
          { text: 'Five. Six, technically: Tomasz from Finance is coming to drinks.' },
          { text: 'And how are we feeling today?', why: 'Matron forever.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build what Grace realises on her way to drinks.',
        tiles: ['I\'ve', 'been', 'doing', 'this', 'for', 'eighteen', 'years.'],
        distractors: ['never', 'can\'t'],
      },
    ],
  },
  reflect: {
    prompt: 'This week, Grace found out that a skill from her old life helps her now. What skill do you already have that could help you start conversations?',
    starters: ['A skill I already have is...', 'It could help me because...'],
  },
  deepen: {
    title: 'Coming up in Chapter 2: keep it going',
    summary: 'Friday drinks. Grace starts conversations easily now. The trouble is what happens next. Her first chat lasts nine seconds: "Hi, I\'m Grace." "I\'m Dan." "...Nice." "...Yeah." Dan walks away. Starting was the easy part.',
  },
  notes: 'Unit Challenge: reviews lessons 1–9. Tomasz (Finance) and Sam Whitfield (CEO) are named extras, narrated or replied to only via Grace.',
};

export default lesson;
