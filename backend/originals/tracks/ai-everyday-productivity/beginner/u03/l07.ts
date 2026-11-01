import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Myth or Fact: writing with AI. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Writing myths',
  summary: 'Marta\'s worried her manager will "detect" AI in her emails. Tomás sends AI emails without reading them. Sort the myths from the facts about writing with AI.',
  minutes: 11,
  outcomes: [
    'Know what AI detectors can and can\'t do',
    'Use AI for hard messages without losing honesty',
    'Read everything before you send it',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'AI detectors can reliably tell whether text was written by AI.', isFact: false, explain: 'They\'re often wrong, including flagging human writing. An AI company even withdrew its own detector in 2023 because it wasn\'t accurate enough.' },
        { text: 'It\'s fine to send AI-written text without reading it, if it looks good.', isFact: false, explain: 'It can invent details, change names or add things you\'d never say. If your name is on it, read it.' },
        { text: 'AI can help you say a hard thing more kindly.', isFact: true, explain: 'Saying no, delivering bad news, asking for money: "help me say this kindly and clearly" is one of its best everyday uses.' },
        { text: 'If AI helped with the wording, the message can still be honestly yours, as long as the facts and feelings are yours.', isFact: true, explain: 'Like a friend helping you phrase something. It stops being honest when you present feelings or facts that aren\'t yours.' },
        { text: 'AI writes best when you give it your rough notes first.', isFact: true, explain: 'Your notes carry your facts and voice. A blank prompt makes it invent both.' },
        { text: 'The longer the message, the more professional it looks.', isFact: false, explain: 'Most readers want it short. Long AI messages often get skimmed or ignored.' },
      ],
    },
    {
      kind: 'story',
      title: 'Marta\'s worry',
      beats: [
        { speaker: 'marta', text: 'What if Carmen runs my emails through a detector?' },
        { speaker: 'lucia', text: 'Then the detector might be wrong either way. Write from your notes, keep your voice, read it before you send. Then it\'s yours.' },
      ],
    },
  ],
  apply: {
    scenario: 'Writing myths at Nopal.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'AI can help you say no kindly', group: 0 },
          { text: 'Detectors are always right', group: 1 },
          { text: 'Rough notes first make better drafts', group: 0 },
          { text: 'Longer looks more professional', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'I sent a client an AI email without reading it. It thanked them for "the lovely dinner". We\'ve never had dinner.',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'Maybe you did have dinner.', why: 'They didn\'t. It invented it.' },
          { text: 'AI writing is useless.', why: 'It\'s useful; it needs reading.' },
          { text: 'It invents friendly details. If your name\'s on it, read it before you send.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s true about AI detectors?',
        options: [
          { text: 'They can be wrong in both directions, including flagging human writing' },
          { text: 'They\'re 100% accurate', why: 'Far from it.' },
          { text: 'They only work in English', why: 'Accuracy is the problem in every language.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'When is it honestly yours?',
        template: 'It\'s honestly yours when the [[1]] and the [[2]] are yours.',
        blanks: [['facts', 'feelings'], ['feelings', 'facts']],
        distractors: ['fonts', 'emojis'],
      },
      {
        kind: 'findBug',
        prompt: 'Which habit is the risky one?',
        lines: [
          'Write rough notes first.',
          'Send AI text unread if it looks polished.',
          'Ask it to help say no kindly.',
        ],
        bug: 1,
        fix: 'Read everything before you send it.',
        explanation: 'Polished can still be wrong: "the lovely dinner" looked polished.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Lucía has to tell a cousin there\'s no room for her new boyfriend at the party. Best prompt?',
        options: [
          { text: 'Write a message rejecting my cousin.', why: 'Harsh, and no details.' },
          { text: 'Tell her no.', why: 'No context, no tone.' },
          { text: 'Help me tell my cousin kindly that we can\'t add guests: the venue holds 60 and we\'re full. I\'d love to meet him another time. Short and warm.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Detectors catch AI"', 'They\'re often wrong'],
          ['"Polished means correct"', 'Read it before sending'],
          ['"Longer is professional"', 'Most readers want short'],
          ['"AI help means it\'s not mine"', 'Not if the facts and feelings are'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did an AI company withdraw its own detector for being inaccurate? (A year.)',
        answers: ['2023'],
        placeholder: 'A year',
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'So is it cheating if I use AI on my emails?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'Not if they\'re your facts and your meaning, and you\'ve read them. Check if your workplace has rules, too.' },
          { text: 'Yes, always.', why: 'Help with wording isn\'t cheating by itself.' },
          { text: 'Only if you get caught.', why: 'That\'s not how honesty works.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the most honest way to use AI on a personal message?',
        options: [
          { text: 'Let it invent feelings that sound nice', why: 'Then they aren\'t your feelings.' },
          { text: 'Your facts and feelings, its help with wording, your final read' },
          { text: 'Copy a message from the internet', why: 'Not yours either.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Where\'s your line? Which messages would you happily get AI help with, and which would you always write alone?',
    starters: ['I\'d use AI for...', 'I\'d always write... myself'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Think of a "no" you\'ve been putting off. Ask an AI tool: "Help me say this kindly and clearly: [your rough words]." Edit the result until it sounds like you.',
  },
  notes: 'OpenAI withdrew its AI text classifier in July 2023, citing its low rate of accuracy (company unnamed in lesson). Studies have found detectors falsely flag non-native English writing (Liang et al., 2023, Patterns).',
};

export default lesson;
