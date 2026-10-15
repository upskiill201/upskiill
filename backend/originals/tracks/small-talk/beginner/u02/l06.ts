import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Card deck: safe topics, and the FORD memory aid (family, occupation, recreation, dreams). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Safe topics, and the FORD memory aid',
  summary: 'Grace\'s mind goes blank mid-chat. Femi gives her four letters to keep in her pocket: F, O, R, D. They\'ve rescued more conversations than any clever line.',
  minutes: 11,
  outcomes: [
    'Use the FORD memory aid when your mind goes blank',
    'Know the topics that are safe almost everywhere',
    'Pick a topic that fits the setting',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Thursday. Grace is chatting to a developer when her mind goes completely white. Femi, later: \"When you go blank, think FORD. Like the car. Four safe places to go.\"</p><p>FORD is a popular memory aid, not a scientific rule. But it works, because these are topics most people enjoy talking about.</p>",
    },
    {
      kind: 'text',
      html: "<h3>F — Family (lightly)</h3><p>\"Are you from Manchester originally, or did you move here?\" \"Do you have family nearby?\"</p><p><strong>Careful:</strong> keep it light. Don't ask \"Are you married?\" or \"When are you having kids?\" Let people share what they want to.</p><h3>O — Occupation</h3><p>\"What are you working on at the moment?\" \"How did you get into this?\" \"What's the best part of your job?\"</p>",
    },
    {
      kind: 'text',
      html: "<h3>R — Recreation</h3><p>Hobbies, sport, music, films, food, travel, weekends. \"What do you do when you're not working?\" \"Seen anything good lately?\"</p><h3>D — Dreams</h3><p>Plans and hopes, kept light. \"Any trips planned?\" \"If you weren't doing this job, what would you do?\"</p>",
    },
    {
      kind: 'check',
      question: '"What do you do when you\'re not working?" is which FORD topic?',
      options: ['Family', 'Recreation', 'Dreams'],
      answer: 1,
      explanation: 'Recreation: hobbies, fun, free time.',
    },
    {
      kind: 'text',
      html: "<h3>Plus: the setting</h3><p>Whatever is around you is always safe: the event, the venue, the food, the weather, the journey there, something in the news that isn't divisive (sport, a big local event).</p>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'FORD: Family (lightly), Occupation, Recreation, Dreams. Plus whatever is around you. Mind gone blank? Pick a letter.',
    },
  ],
  apply: {
    scenario: 'Thursday. Grace\'s mind goes blank.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each FORD letter to an example question.',
        pairs: [
          ['Family', 'Are you from Manchester originally?'],
          ['Occupation', 'What are you working on at the moment?'],
          ['Recreation', 'Seen any good films lately?'],
          ['Dreams', 'Any trips planned this year?'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is FORD?',
        options: [
          { text: 'A scientific law of conversation', why: 'It\'s a popular memory aid, not a law.' },
          { text: 'A car', why: 'Also a car. Not the point today.' },
          { text: 'A memory aid for four safe topics: family, occupation, recreation, dreams' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe family question, or too personal for small talk?',
        groups: ['Safe', 'Too personal'],
        items: [
          { text: 'Do you have family nearby?', group: 0 },
          { text: 'Are you married?', group: 1 },
          { text: 'Are you from here originally?', group: 0 },
          { text: 'When are you having kids?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'Okay, your mind\'s gone blank with the developer. Pick a FORD letter. Go.',
        prompt: 'Grace\'s rescue line?',
        options: [
          { text: 'How much do developers earn?', why: 'Money is a different conversation.' },
          { text: '...So.', why: 'Still blank.' },
          { text: 'Do you have any trips planned this year? I\'m desperate for some sun.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In FORD, the "R" stands for ... (one word)',
        answers: ['recreation'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Which "Dreams" question fits small talk?',
        options: [
          { text: '"What\'s your deepest fear?"', why: 'Too heavy for a first chat.' },
          { text: '"If you weren\'t doing this job, what would you be doing?"' },
          { text: '"Why haven\'t you achieved your dreams yet?"', why: 'That\'s an attack, not a question.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s FORD list for the team lunch. Which question should go?',
        lines: [
          'Occupation: What are you working on at the moment?',
          'Recreation: What do you do at weekends?',
          'Family: Why aren\'t you married yet?',
        ],
        bug: 2,
        fix: 'Family: Are you from Manchester originally?',
        explanation: 'Keep family light. Let people share what they want to.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Answer, add, ask', 'The conversation rhythm'],
          ['Hooks', 'Details you can ask about'],
          ['Interview', 'Only questions, no sharing'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'FORD, from memory.',
        template: 'F: [[1]]. O: [[2]]. R: Recreation. D: [[3]].',
        blanks: [['Family'], ['Occupation'], ['Dreams']],
        distractors: ['Finance', 'Drama'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build an Occupation question.',
        tiles: ['How', 'did', 'you', 'get', 'into', 'this', 'job?'],
        distractors: ['married', 'earn'],
      },
    ],
  },
  reflect: {
    prompt: 'Write one FORD question for each letter that you\'d be comfortable asking a new colleague or classmate.',
    starters: ['F: ...', 'O: ...', 'R: ...', 'D: ...'],
  },
  deepen: {
    title: 'FORD in your pocket',
    summary: 'Save your four FORD questions in your phone. Before an event or a first day, read them once. When your mind goes blank, you\'ll have somewhere to go.',
  },
  notes: 'FORD (family, occupation, recreation, dreams) is a widely shared conversation heuristic from popular advice, presented explicitly as a memory aid, not research. Personal-topic cautions are general etiquette.',
};

export default lesson;
