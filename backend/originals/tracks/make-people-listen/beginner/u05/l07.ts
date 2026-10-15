import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. "Producer's Notes" (card deck): pick your moment (timing, setting, state). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Producer\'s Notes: pick your moment',
  summary: 'Miracle confesses: the first time she mentioned Lagos, Papa had just come home from a three-hour traffic jam, hungry, with the generator broken. Tey: "Producer\'s Notes on timing, please. Urgently."',
  minutes: 11,
  outcomes: [
    'Choose a time when people can actually listen',
    'Ask for the conversation before you start it',
    'Pick a setting that helps, not hurts',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>The right words at the wrong moment often don't land. Tired, hungry, stressed or rushed people find it much harder to listen, to anyone. Here are the Producer's Notes on timing.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Note 1: Not when they're depleted</h3><p>Avoid the moments right after a long day, before a meal, in a rush, or when something has just gone wrong. Stress tends to make people more defensive and less open to new ideas.</p><h3>Note 2: Ask for the conversation first</h3><p>\"Papa, can we talk properly about the job offers on Sunday after lunch?\" Booking the conversation gives everyone time to prepare and signals it matters.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Note 3: Choose the setting</h3><p>Somewhere calm, private, with no time pressure. Not in front of visitors, not in the car on the way somewhere, not by text at midnight.</p><h3>Note 4: Respect who needs to be there</h3><p>Every family is different. In some, a big decision is discussed with both parents together; in others, one parent first. Some families would want an elder or an aunt involved. Think about what feels respectful in <em>your</em> family.</p>",
    },
    {
      kind: 'check',
      question: 'When is the WORST time to start a big conversation?',
      options: ['Right after a stressful, hungry, three-hour traffic jam', 'Sunday after lunch, booked in advance', 'A calm evening with nothing else planned'],
      answer: 0,
      explanation: 'Tired, hungry, stressed people struggle to listen. Pick a calm moment.',
    },
    {
      kind: 'text',
      html: "<h3>Note 5: One conversation may not be enough</h3><p>Big decisions often take more than one talk. It's fine to end with: \"Thank you for listening. Can we talk again on Wednesday, once you've had time to think?\" Time to think is not a no.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Not when they\'re tired or rushed. Book the conversation. Pick a calm place. Respect your family\'s way. Allow more than one talk.',
    },
  ],
  apply: {
    scenario: 'Tey FM, Producer\'s Notes on timing.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Miracle\'s first Lagos conversation go so badly?',
        options: [
          { text: 'Lagos is a bad idea', why: 'The idea wasn\'t the issue. The timing was.' },
          { text: 'Papa was tired, hungry and stressed, so he couldn\'t really listen' },
          { text: 'She spoke too quietly', why: 'That was David\'s chapter.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good moment, or bad moment?',
        groups: ['Good moment', 'Bad moment'],
        items: [
          { text: 'Sunday after lunch, booked in advance', group: 0 },
          { text: 'In the car, running late for church', group: 1 },
          { text: 'A calm evening at home', group: 0 },
          { text: 'By text at midnight', group: 1 },
          { text: 'In front of visiting relatives', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Should I just bring it up at dinner tonight? Get it over with?',
        prompt: 'Producer\'s note?',
        options: [
          { text: 'Book it instead: "Can we talk properly on Sunday after lunch?" Then everyone comes ready.' },
          { text: 'Yes, surprise them.', why: 'Surprises make people defensive.' },
          { text: 'Text them now and turn your phone off.', why: 'The worst of both worlds.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Before a big conversation, ___ it in advance. (one word)',
        answers: ['book', 'schedule', 'plan', 'arrange'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Papa says: "I need to think about it." What does that usually mean?',
        options: [
          { text: 'It\'s definitely a no', why: 'Time to think is not a no.' },
          { text: 'He needs time; it\'s not a no' },
          { text: 'He wasn\'t listening', why: 'Thinking means he was.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s timing plan in order.',
        lines: ['Ask: "Can we talk on Sunday after lunch?"', 'Choose a calm, private place.', 'Have the conversation.', 'If needed, agree to talk again on Wednesday.'],
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s plan. Which line ignores the Producer\'s Notes?',
        lines: [
          'Ask both parents to talk on Sunday after lunch.',
          'Start the conversation in the car on the way to Auntie\'s wedding.',
          'Allow a second conversation if they need time.',
        ],
        bug: 1,
        fix: 'Have it at home, with no time pressure.',
        explanation: 'A car, a deadline and a wedding: rushed, stressed and no privacy.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Fake question', 'An argument with a question mark'],
          ['Real question', '"What would help?"'],
          ['Booking the talk', 'Everyone comes ready'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Miracle\'s request.',
        template: 'Papa, can we [[1]] properly about the job offers on [[2]] after [[3]]?',
        blanks: [['talk'], ['Sunday'], ['lunch']],
        distractors: ['tonight', 'argue'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the ending line.',
        tiles: ['Can', 'we', 'talk', 'again', 'on', 'Wednesday?'],
        distractors: ['never'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a conversation you need to have. When and where would be the best moment, and how would you ask for it?',
    starters: ['The best time: ...', 'I\'d ask: ...'],
  },
  deepen: {
    title: 'Book one conversation',
    summary: 'Instead of springing an important topic on someone, ask: "Can we talk about X on [day]?" Notice how much calmer the actual conversation is.',
  },
  notes: 'Stress, fatigue and hunger reduce openness/patience: broadly supported (e.g. stress and threat increase defensiveness); stated with "tends to". Timing, setting and family-culture sensitivity are practical advice; the course treats family norms with respect.',
};

export default lesson;
