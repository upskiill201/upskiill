import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: Lucía's feedback plan for the week, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: Lucía\'s feedback plan',
  summary: 'On Day 70, before the 4 p.m., Lucía wrote a feedback plan for the week: one hard conversation, three thank-yous, one ask. Tap through to see every Chapter 4 tool on one page.',
  minutes: 11,
  outcomes: [
    'See every Chapter 4 tool in one weekly plan',
    'Plan your own feedback for a week',
    'Balance hard feedback, praise and asking',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Lucía\'s feedback week',
      text: 'Diego, today at 4: In this morning\'s review, you said "kids\' menu" and Sofía went quiet. What did you mean by it? Then, Thursday: thank him for helping Sofía with the map. Tomás: your test sends caught two broken links before launch. Thank him privately, as he prefers. Sofía: no all-hands thank-you. A note instead. Marta: ask, "What\'s one thing I could do better?" Then say thank you, and nothing else. Me: tell people before I change their work.',
      hotspots: [
        { phrase: 'In this morning\'s review, you said "kids\' menu" and Sofía went quiet.', note: 'SBI in one sentence: situation, behaviour, impact. A camera could record it.' },
        { phrase: 'What did you mean by it?', note: 'The intent question. It opens a conversation instead of starting a fight.' },
        { phrase: 'thank him for helping Sofía with the map', note: 'The follow-up. Noticing when he gets it right finishes the hard conversation.' },
        { phrase: 'your test sends caught two broken links before launch', note: 'Specific praise: what he did and why it mattered. Not "great job".' },
        { phrase: 'no all-hands thank-you. A note instead.', note: 'Recognition the way she likes it. Lucía asked, back in Chapter 2.' },
        { phrase: 'What\'s one thing I could do better?', note: 'Asking for feedback with a specific question, for one thing.' },
        { phrase: 'Then say thank you, and nothing else.', note: 'No defending. That\'s what makes people bother next time.' },
        { phrase: 'Me: tell people before I change their work.', note: 'Diego\'s feedback, acted on visibly.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A good feedback week: one clear hard conversation, specific thank-yous in the way people like, and one ask for yourself.',
    },
  ],
  apply: {
    scenario: 'Line check, the feedback week.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does the plan include a Thursday thank-you for Diego?',
        options: [
          { text: 'To make up for being harsh', why: 'It\'s not an apology. It\'s noticing progress.' },
          { text: 'It\'s a feedback sandwich', why: 'Different days, separate messages. Not a sandwich.' },
          { text: 'Following up when he gets it right finishes the hard conversation' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 4 tool is it?',
        groups: ['Hard feedback', 'Praise', 'Asking'],
        items: [
          { text: '"You said \'kids\' menu\'..."', group: 0 },
          { text: '"Your test sends caught two broken links"', group: 1 },
          { text: '"What\'s one thing I could do better?"', group: 2 },
          { text: '"What did you mean by it?"', group: 0 },
          { text: 'A note for Sofía', group: 1 },
          { text: 'Say thank you, and nothing else', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'Honestly? You check in on me less than on the others. I feel a bit invisible.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Thank you for telling me. That\'s really useful.' },
          { text: 'That\'s because you\'re so reliable!', why: 'A reason, but it sounds like a defence.' },
          { text: 'That\'s not true.', why: 'Arguing with feedback ends it.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Lucía\'s hard feedback for Diego uses S, B and ___. (one letter)',
        answers: ['I', 'i'],
        placeholder: 'One letter',
      },
      {
        kind: 'mcq',
        prompt: 'Why is Sofía\'s recognition a note, not an all-hands thank-you?',
        options: [
          { text: 'Her work wasn\'t important enough', why: 'It\'s about her preference.' },
          { text: 'That\'s how she prefers it. Lucía asked' },
          { text: 'Notes are always better', why: 'Some people love public praise.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'A draft of the plan. Which line breaks Chapter 4?',
        lines: [
          'Tomás: specific thanks for the test sends.',
          'Diego: tell him he\'s been disrespectful lately.',
          'Marta: ask what I could do better.',
        ],
        bug: 1,
        fix: 'Diego: SBI about this morning\'s comment, then ask his intent.',
        explanation: '"Disrespectful lately" is a vague label. SBI is one clear moment.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Lucía\'s week in order.',
        lines: ['Today: the hard conversation', 'Tomorrow: thank Tomás', 'Wednesday: ask Marta', 'Thursday: follow up with Diego'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the research.',
        pairs: [
          ['"You said \'kids\' menu\'"', 'SBI (CCL)'],
          ['"Caught two broken links"', 'Specific recognition'],
          ['"One thing I could do better?"', 'Feedback-seeking'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The week.',
        template: 'One hard [[1]], several [[2]], and one [[3]] for yourself.',
        blanks: [['conversation'], ['thank-yous', 'thanks'], ['ask', 'question']],
        distractors: ['lecture', 'sandwich'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s change.',
        tiles: ['I\'ll', 'tell', 'you', 'before', 'I', 'change', 'it.'],
        distractors: ['after'],
      },
    ],
  },
  reflect: {
    prompt: 'Make your own feedback week: one hard conversation, two specific thank-yous, one ask. Who and what?',
    starters: ['Hard conversation: ...', 'Thank-yous: ...', 'Ask: ...'],
  },
  deepen: {
    title: 'Plan the week',
    summary: 'Write your feedback week on one page, like Lucía. Tick each one off as you do it.',
  },
  notes: 'Synthesis of Chapter 4 tools: SBI + intent (CCL), follow-up, specific and individualised recognition, feedback-seeking and non-defensive response.',
};

export default lesson;
