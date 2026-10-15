import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Step-by-step: small talk with your boss, and their boss. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Small talk with your boss, and their boss',
  summary: 'Sam the CEO sits next to Grace at the Thursday all-hands, early, with nobody else around. Grace\'s instinct: hide. Her nursing instinct: consultants are just people who are tired too.',
  minutes: 12,
  outcomes: [
    'Make small talk with senior people without freezing or flattering',
    'Choose topics that work up the ladder',
    'Know when senior people want to chat, and when they don\'t',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Grace and Sam, step by step',
      steps: [
        {
          title: 'Remember: they\'re people',
          body: 'On the wards, Grace learned that the scariest consultant was also a person who forgot his lunch and liked talking about his dog. Senior people at work are the same: often a little lonely, because people avoid them.',
        },
        {
          title: 'Start with the shared moment',
          body: '"You\'re early too! Are you a front-row person or a back-row person?" Same "notice + ask" as with anyone. No need for a special CEO version.',
        },
        {
          title: 'Ask about them, not about their power',
          body: 'Good: "What did you do before Kinwell?" "How did you end up building health apps?" Not: "So how\'s the company really doing?" or a pitch for your idea. Curiosity beats flattery and beats agendas.',
        },
        {
          title: 'Share a little of your world',
          body: 'Senior people often don\'t hear what it\'s like on the ground. "As a new starter, the thing that surprised me most was..." is interesting to them, as long as it\'s light, not a complaint list.',
        },
        {
          title: 'Read the signals, and let them go',
          body: 'Senior people are often pulled away. If Sam glances at his phone or the stage, wrap up kindly: "I\'ll let you get ready. Good luck up there!" Leaving first is a gift to a busy person.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Senior people are people. Notice and ask, be curious about them (not their power), share a little, and let them go when they need to.',
    },
  ],
  apply: {
    scenario: 'Thursday, 9:45. The all-hands, fifteen minutes early.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Grace\'s steps in order.',
        lines: ['Notice the shared moment', 'Ask about him as a person', 'Share a little of her world', 'Let him go when he needs to'],
      },
      {
        kind: 'mcq',
        prompt: 'Which question shows curiosity, not flattery?',
        options: [
          { text: '"You\'re such an amazing leader, how do you do it?"', why: 'Flattery makes people uncomfortable.' },
          { text: '"Can I pitch you my idea for a new feature?"', why: 'An agenda, not small talk.' },
          { text: '"How did you end up building health apps?"' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good with a CEO, or not right now?',
        groups: ['Good', 'Not right now'],
        items: [
          { text: 'What did you do before Kinwell?', group: 0 },
          { text: 'Is the company in trouble?', group: 1 },
          { text: 'Are you a front-row or back-row person?', group: 0 },
          { text: 'Can I have a pay rise?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'You were chatting to Sam? What on earth about?',
        prompt: 'Grace\'s answer?',
        options: [
          { text: 'His bike, his first job, and what surprised me as a new starter. He\'s nice!' },
          { text: 'I pitched him five ideas.', why: 'Small talk isn\'t a pitch.' },
          { text: 'I told him he\'s an amazing leader.', why: 'Flattery. Not what happened.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Curiosity beats ___ (one word, the opposite of honest praise)',
        answers: ['flattery'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Sam glances at the stage and his phone. What should Grace do?',
        options: [
          { text: 'Keep talking, he\'s the CEO and she has his attention', why: 'His signals say he needs to go.' },
          { text: '"I\'ll let you get ready. Good luck up there!"' },
          { text: 'Ask him what\'s on his phone', why: 'None of her business.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s "what surprised me" share. Which line turns it into a complaint list?',
        lines: [
          'The thing that surprised me most was how fast everyone builds things.',
          'Also the coffee is bad, the chairs hurt, the Wi-Fi drops, and nobody explains anything.',
          'Coming from the NHS, I\'m still getting used to it!',
        ],
        bug: 1,
        fix: 'And how friendly everyone has been.',
        explanation: 'Light and honest is interesting. A list of complaints to the CEO in small talk isn\'t the place.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Time-zone opener', '"Is this the end of your day?"'],
          ['Talk to the room', 'Pre-meeting group small talk'],
          ['Read the signals', 'Know when to let someone go'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s opener with Sam.',
        template: 'You\'re [[1]] too! Are you a front-row person or a [[2]]-row person?',
        blanks: [['early'], ['back']],
        distractors: ['late', 'pay'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Grace\'s kind exit.',
        tiles: ['I\'ll', 'let', 'you', 'get', 'ready.', 'Good', 'luck!'],
        distractors: ['pitch', 'rise'],
      },
    ],
  },
  reflect: {
    prompt: 'Who\'s the most senior person you could find yourself next to this month? Write one curious question about them as a person.',
    starters: ['The person is...', 'I\'d ask...'],
  },
  deepen: {
    title: 'The "before" question',
    summary: '"What did you do before this?" works with almost any senior person and almost always leads to a good story. Keep it ready.',
  },
  notes: 'General advice; norms about approaching senior people vary by culture and organisation (some hierarchies expect seniors to initiate) — lesson\'s signal-reading step covers this.',
};

export default lesson;
