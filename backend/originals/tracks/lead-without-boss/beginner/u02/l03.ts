import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Myth or Fact: asking for help (Flynn & Lake 2008; Roghanizad & Bohns 2017). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Just ask',
  summary: 'Remi needs Felix for two days. He\'s drafted the email six times and sent none. "He\'ll say no. Everyone says no to the new guy." Tey: "Let\'s check what the research says about that."',
  minutes: 11,
  outcomes: [
    'Know why we underestimate how often people say yes',
    'Know why asking in person often works better',
    'Ask clearly, without over-apologising',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Most people will say no if you ask them for help.', isFact: false, explain: 'Myth. In studies by Francis Flynn and Vanessa Lake (2008), people asking strangers for favours expected far fewer yeses than they got. They underestimated by around half. We tend to forget how awkward it feels to say no.' },
        { text: 'Asking in person tends to work much better than asking by email.', isFact: true, explain: 'Fact. In a study by Mahdi Roghanizad and Vanessa Bohns (2017), face-to-face requests got far more yeses than the same requests by email, while people sending emails expected them to work just as well. Emails can feel untrustworthy and are easy to ignore.' },
        { text: 'The more you apologise, the more likely they are to help.', isFact: false, explain: 'Myth. One "sorry to bother you" is polite. Five makes the request sound bigger and scarier than it is. Be warm, clear and short.' },
        { text: 'A specific request is easier to say yes to than a vague one.', isFact: true, explain: 'Fact. "Could you give me two days in Week 3 to change the refund form?" is easy to picture and decide on. "Could you help with refunds sometime?" isn\'t.' },
        { text: 'Asking for help makes you look less competent.', isFact: false, explain: 'Myth, mostly. Research by Alison Wood Brooks and colleagues (2015) found that asking for advice can actually make people see you as more competent, especially on hard tasks and when you ask the right person.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'People say yes more than you think. Ask in person if you can. Be specific. One sorry is enough. Asking smart people for advice can make you look smarter.',
    },
  ],
  apply: {
    scenario: 'Myth or fact, before Remi asks Felix.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Flynn and Lake find?',
        options: [
          { text: 'Most people say no', why: 'The opposite.' },
          { text: 'Only friends say yes', why: 'They asked strangers.' },
          { text: 'People underestimate how often others say yes, by around half' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Most people will say no', group: 0 },
          { text: 'In person often beats email', group: 1 },
          { text: 'More apologies, more help', group: 0 },
          { text: 'Specific asks are easier to accept', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'So I should walk over to Felix instead of emailing?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'No, email is more professional.', why: 'Email requests are easier to ignore.' },
          { text: 'Yes. Two minutes, at his desk, one specific ask. Then follow up in writing so he has the details.' },
          { text: 'Send both and three reminders.', why: 'Pressure, not persuasion.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A request is easier to say yes to when it\'s ___. (one word)',
        answers: ['specific', 'Specific', 'clear'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the finding to the researchers.',
        pairs: [
          ['We underestimate yeses', 'Flynn and Lake'],
          ['In person beats email', 'Roghanizad and Bohns'],
          ['Advice-seeking looks competent', 'Brooks and colleagues'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do people say yes more than we expect?',
        options: [
          { text: 'Saying no feels awkward, and we forget that' },
          { text: 'They\'re forced to', why: 'Nobody had to.' },
          { text: 'They want something', why: 'Often they just don\'t want to refuse.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s ask to Felix. Which line makes it harder to say yes?',
        lines: [
          'Felix, quick one: could I have two days of your time in Week 3?',
          'Sorry, sorry, I know you\'re so busy, I hate asking, sorry...',
          'It\'s to change the refund form. It should cut your refund tickets.',
        ],
        bug: 1,
        fix: 'I know you\'re busy, so I\'ll keep it short.',
        explanation: 'Over-apologising makes the ask sound bigger than it is.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a good ask in order.',
        lines: ['Go to them', 'Say the ask in one sentence', 'Say what\'s in it for them', 'Follow up in writing'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Ask in [[1]]. Be [[2]]. One [[3]] is enough.',
        blanks: [['person'], ['specific', 'clear'], ['sorry']],
        distractors: ['email', 'vague'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s ask.',
        tiles: ['Could', 'I', 'have', 'two', 'days', 'in', 'Week', '3?'],
        distractors: ['sorry'],
      },
    ],
  },
  reflect: {
    prompt: 'What help have you been putting off asking for, because you expect a no? What would the specific, one-sentence ask be?',
    starters: ['I\'ve been putting off asking...', 'My one-sentence ask: ...'],
  },
  deepen: {
    title: 'Ask in person',
    summary: 'Pick one ask you\'d normally send by message. Make it in person or on a call instead, in one sentence. Then follow up in writing.',
  },
  notes: 'Francis J. Flynn & Vanessa K. B. Lake (2008), "If You Need Help, Just Ask", J. Personality & Social Psychology 95(1): help-seekers underestimated compliance by roughly 50%. M. Mahdi Roghanizad & Vanessa K. Bohns (2017), "Ask in person", J. Experimental Social Psychology 69: face-to-face requests far more effective than email. Alison Wood Brooks, Francesca Gino & Maurice Schweitzer (2015), Management Science 61(6): advice seeking increases perceived competence.',
};

export default lesson;
