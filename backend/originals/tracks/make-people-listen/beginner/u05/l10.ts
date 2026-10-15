import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10 — Final Challenge, "The Live Special": all five callers on air, and Miracle's family lunch, live. Ends the course. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'The Live Special',
  summary: 'Sunday. Tey FM\'s first ever Live Special. All five callers are on the line at once: Clinton, Arjun, David and Lucía, there to support Miracle, who is about to walk into Sunday lunch with her parents. She\'s left her phone on the sideboard, on air, with their permission.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use tools from all five chapters in one live, high-stakes conversation',
    'Listen first, find shared interests and avoid pushing',
    'Know what you\'ve learned across the whole course',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tey FM, the Live Special',
      beats: [
        { speaker: 'tey', text: "Good afternoon and welcome to the first ever Tey FM Live Special! Five lines open. Line 1?" },
        { speaker: 'clinton', text: 'Clinton here! I wrote ONE message to Miracle this morning. It said "You\'ve got this." That\'s it. Growth.' },
        { speaker: 'arjun', text: 'Arjun, from Bengaluru. Subject line of my message to Miracle: "You\'ve got this." Bottom line up front.' },
        { speaker: 'david', text: '(a breath, a full voice) David. Miracle taught me to study. Now I\'m returning the favour. (pause) You\'ve got this.' },
        { speaker: 'lucia', text: 'Lucía, Mexico City. Hold that thought, everyone. Miracle, I just want to say: we\'re all here.' },
        { speaker: 'miracle', text: '(whispering) Thank you. They\'re sitting down. Mama, Papa, Tey FM says hello. I\'m going in.' },
        { speaker: 'narrator', text: '(The sound of plates. A chair scraping. Then silence, as the whole of Tey FM listens.)' },
      ],
    },
  ],
  apply: {
    scenario: 'The Live Special. Sunday lunch, on air.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Lunch is finished. Papa looks relaxed. What should Miracle open with?',
        options: [
          { text: 'Thanks, the shared interest, then: "Before I say anything about Lagos, what worries you most?"' },
          { text: '"I\'m going to Lagos and that\'s final."', why: 'Reactance, live on air.' },
          { text: 'The twenty-slide PowerPoint, resurrected', why: 'Let it rest in peace.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Papa says: "Startups fail. Everyone knows that." What\'s the best next move?',
        options: [
          { text: '"No they don\'t, you\'re wrong."', why: 'And Papa leaves the table again.' },
          { text: 'Read out the startup\'s funding report in full.', why: 'Arjun\'s paragraph-four problem, at lunch.' },
          { text: '"Some do. Your worry is that I\'ll be stranded with nothing. Is that right?"' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: '(on air, whispering) She needs to explain the company\'s funding. Producer, how should she say it so it sticks?',
        prompt: 'Your producer note?',
        options: [
          { text: '"Series A, 18-month runway, burn multiple 1.4."', why: 'Mama hears knocking.' },
          { text: 'Skip the money entirely.', why: 'Money is Papa\'s biggest worry. Answer it plainly.' },
          { text: 'Plain words and one number they can feel: "They have enough money to pay everyone for the next two years, even with no sales."' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'At lunch: do it, or don\'t?',
        groups: ['Do it', 'Don\'t'],
        items: [
          { text: 'Say back Papa\'s worry before answering it', group: 0 },
          { text: '"You need to trust me."', group: 1 },
          { text: 'Offer the six-month savings buffer', group: 0 },
          { text: '"Don\'t you think you\'re overreacting?"', group: 1 },
          { text: 'Ask Mama what would help her feel okay', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: '(on air) Her voice just went really small. She\'s apologising. "Sorry, sorry, I know it\'s silly..."',
        prompt: 'What does she need to remember?',
        options: [
          { text: 'Talk louder and faster.', why: 'Breathe and slow down instead.' },
          { text: 'Breathe, pause, and cut the shrinkers. Her parents mostly see a daughter who cares, not her nerves.' },
          { text: 'Hang up.', why: 'She\'s doing well. Keep going.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Mama asks: "Who will look after you?" Which reply answers her real worry?',
        options: [
          { text: '"I\'ll stay with Auntie Ngozi\'s family at first. And you can meet my manager on a video call. Would that help?"' },
          { text: '"I can look after myself."', why: 'True, but it dismisses her worry.' },
          { text: '"Lagos has lots of people."', why: 'People aren\'t the same as someone looking after her.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: '(on air) Her cousin just walked in and started talking over Papa about football. The whole table is losing focus!',
        prompt: 'How can Miracle hold the floor, kindly?',
        options: [
          { text: '"Emmanuel, GET OUT."', why: 'Firm, but harsh. Family lunch.' },
          { text: '"Hold that thought, Emmanuel, I want to hear about the match after this. Papa, you were saying?"' },
          { text: 'Give up and talk about football.', why: 'And the conversation is gone.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Miracle wants a decision her parents ___, even if they don\'t fully agree. (one word)',
        answers: ['understand'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s summary at the end of lunch. Which line undoes the good work?',
        lines: [
          'Thank you both for really listening.',
          'I heard your worries: money, being alone, and being far away.',
          'So basically I was right all along, and you can\'t stop me.',
          'Can we keep talking this week?',
        ],
        bug: 2,
        fix: 'Here\'s how I\'d handle each one: savings, Auntie Ngozi, and a call every Sunday.',
        explanation: 'Gloating turns understanding into a fight. Show how you\'ll handle each worry.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s Sunday conversation in order.',
        lines: ['Thanks and the shared interest', 'Ask what worries them most', 'Listen and say back what she heard', 'Her one main reason, in plain words', 'Options that answer each worry', 'Leave the door open'],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: '(back on the line, voice shaking) Papa said: "I am still afraid. But I understand now. If you save the money first and stay with Ngozi, you have my blessing. And you will call every Sunday." Mama is crying. I\'m crying. Everyone\'s crying.',
        prompt: 'Tey\'s response?',
        options: [
          { text: 'Finally, you won!', why: 'It was never about winning.' },
          { text: 'Next caller.', why: 'There is no next caller. This is the Live Special.' },
          { text: 'Miracle, you didn\'t win an argument. You did something better. You were heard, and you heard them.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each caller to the core lesson they learned.',
        pairs: [
          ['Clinton', 'Listen first; one point; stop'],
          ['Arjun', 'Answer first, in plain words'],
          ['David', 'Breathe, pause, speak early'],
          ['Lucía', 'Hold the floor, share the airtime'],
          ['Miracle', 'Don\'t push; find what you both want'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Course wrap: helps people listen, or makes them tune out?',
        groups: ['Helps people listen', 'Makes them tune out'],
        items: [
          { text: 'One clear point, first', group: 0 },
          { text: 'Sixty-three messages', group: 1 },
          { text: 'A pause before your key idea', group: 0 },
          { text: '"You need to accept that..."', group: 1 },
          { text: 'Listening before you speak', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The whole course in one line.',
        template: 'To be [[1]], first [[2]]. Then say one [[3]] thing.',
        blanks: [['heard'], ['listen'], ['clear']],
        distractors: ['louder', 'push'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tey\'s sign-off.',
        tiles: ['To', 'be', 'heard,', 'first', 'listen.'],
        distractors: ['shout.'],
      },
    ],
  },
  reflect: {
    prompt: 'Of the five callers, whose problem is most like yours? Which tool from their chapter will you use first, and with whom?',
    starters: ['My caller is...', 'The tool I\'ll use first: ...', 'With: ...'],
  },
  deepen: {
    title: 'Tey FM, signing off',
    summary: 'Tey: "That\'s it from Tey FM. Five callers, five problems, one big lesson: to be heard, first listen. Then say one clear thing, with your voice, at the right moment, without pushing. Now go and be heard. Producer, you were brilliant. Goodnight." (The ON AIR light goes dark.)',
  },
  notes: 'Final Challenge (the Live Special): reviews all five chapters. Milestone uses UNIT_CHALLENGE (the type has no separate final value). Emmanuel is a named extra (Miracle\'s cousin). "Enough money to pay everyone for two years" is a plain-words translation of runway, per Chapter 2. Family outcome is fictional and deliberately conditional (blessing with conditions), not a total victory.',
};

export default lesson;
