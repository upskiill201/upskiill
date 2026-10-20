import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 16 — CV myths. Myth or Fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'CV myths',
  summary: 'Uncle Pius printed his CV in 1998 and has strong opinions: "Write References available on request. Put your hobbies. Start with your Objective. And it must be one page, always." Myth or fact?',
  minutes: 11,
  outcomes: ['Spot outdated CV advice', 'Know what to keep, change or drop', 'Explain why, kindly, when someone gives you old advice'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Every CV must be exactly one page, always.', isFact: false, explain: 'One strong page is great for most graduates, and normal in the US. But two pages is common and fine in the UK and many other places, especially with more experience. Quality beats a strict rule.' },
        { text: '"References available on request" is a wasted line.', isFact: true, explain: 'Employers assume you\'ll provide references if asked. Use the space for proof. Have two referees ready separately.' },
        { text: 'An "Objective" at the top is the best way to start.', isFact: false, explain: 'Objectives say what you want. A two-line profile says what you offer, with proof. Recruiters read the second.' },
        { text: 'Using the advert\'s real words, where they\'re true, helps.', isFact: true, explain: 'Recruiters (and their search software) look for the skills the advert names. Match them honestly.' },
        { text: 'A list of hobbies always helps you stand out.', isFact: false, explain: '"Reading, music, travel" says nothing. Only include activities that add proof, like captaining a team.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Old advice isn\'t always wrong, but test it: does this line help a busy reader see my proof? If not, cut it.',
    },
  ],
  apply: {
    scenario: 'Clinton gets advice from Uncle Pius.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: '"References available on request" wastes space', group: 0 },
          { text: 'An objective is the best opener', group: 1 },
          { text: 'Honest keywords from the advert help', group: 0 },
          { text: 'Hobbies always make you stand out', group: 1 },
          { text: 'Every CV must be one page everywhere', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Uncle Pius says I MUST write "References available on request". How do I say no without upsetting him?',
        options: [
          { text: '"Thank you, Uncle! These days employers assume it, so I use the space for my projects. Can I put you on my list of people to thank?"' },
          { text: '"Your advice is from 1998."', why: 'True, maybe, but unkind. Thank him and explain.' },
          { text: 'Add it to keep the peace.', why: 'He can keep the peace and his CV can keep its space.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Is one page always right?',
        options: [
          { text: 'One strong page suits most graduates; two pages can be fine in many countries' },
          { text: 'Yes, always, everywhere', why: 'It\'s a good default, not a universal rule.' },
          { text: 'No, longer is always better', why: 'Longer isn\'t better. Clearer is.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the outdated line on Uncle Pius\'s sample CV.',
        lines: ['Profile: final-year CS student; built a tracker used by 42 people.', 'References available on request.', 'Projects: Njangi Tracker (link)'],
        bug: 1,
        explanation: 'Employers assume it. Use the line for proof instead.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each old habit to the modern version.',
        pairs: [
          ['Career Objective', 'Two-line profile with proof'],
          ['Hobbies: reading, music', 'Only activities that add proof'],
          ['References available on request', 'Referees ready, listed separately if asked'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s Tey\'s test for old advice?',
        options: [
          { text: 'Does this line help a busy reader see my proof?' },
          { text: 'Is it from before 2000?', why: 'Age isn\'t the test. Usefulness is.' },
          { text: 'Does everyone do it?', why: 'Everyone doing it is why it doesn\'t stand out.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the lesson.',
        template: 'Objectives say what you [[1]]. A profile says what you [[2]].',
        blanks: [['want'], ['offer']],
        distractors: ['hate', 'owe', 'like'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'People an employer can contact about you are called ___. (one word)',
        answers: ['referees', 'references', 'referee'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep or cut from Clinton\'s CV?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'Captain, CS football team (with the result)', group: 0 },
          { text: 'Hobbies: films', group: 1 },
          { text: 'Two-line profile', group: 0 },
          { text: 'Career Objective paragraph', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Who should Clinton ask to be his referees?',
        options: [
          { text: 'People who\'ve seen his work: Mrs Ewane and the meet-up\'s sponsor' },
          { text: 'Uncle Pius', why: 'Family usually aren\'t accepted as referees. Pick people who\'ve seen his work.' },
          { text: 'Someone famous he\'s never met', why: 'They can\'t speak about his work.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the oldest piece of CV advice you\'ve been given? Does it pass Tey\'s test?',
    starters: ['I was told...', 'It does / doesn\'t pass because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask two people who\'ve seen your work if they\'d be your referees. Save their names, roles and contact details in a separate document.',
  },
  notes: 'Common outdated CV practices ("References available on request", objective statements, hobby lists) per current careers-service guidance. Family members are generally not accepted as referees. Uncle Pius is a named extra.',
};

export default lesson;
