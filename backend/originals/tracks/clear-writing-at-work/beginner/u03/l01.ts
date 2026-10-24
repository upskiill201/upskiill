import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story: "What do you want them to do?" */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"What do you want them to do?"',
  summary: 'Zanele needs two answers by Friday: Mr Kamau\'s yes to keep the pilot running in June, and Emeka\'s Lagos numbers. Both drafts are clear and plain. Mrs Achieng reads them and asks one question.',
  minutes: 11,
  outcomes: [
    'Notice when the ask is buried',
    'Start messages with what you need',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Two drafts',
      beats: [
        { speaker: 'narrator', text: 'The pilot is approved until 31 May. To keep it going in June, Zanele needs Mr Kamau to approve it and two driver contracts.' },
        { speaker: 'narrator', text: 'She also needs Emeka\'s weekend order counts from Lagos by Thursday, to see if a Lagos pilot would work.' },
        { speaker: 'narrator', text: 'Both drafts are plain and short. Both put the ask in the last line.' },
        { speaker: 'achieng', text: 'Lovely writing. What do you want each of them to do?' },
        { speaker: 'zanele', text: 'Mr Kamau to say yes to June. Emeka to send numbers.' },
        { speaker: 'achieng', text: 'Then why is that the last thing they\'ll read?' },
        { speaker: 'tey', text: 'This chapter: the point and the ask first, subject lines, making it easy to reply, and one ask per message.' },
      ],
      choice: {
        prompt: 'How should the email to Mr Kamau start?',
        options: [
          { text: '"Decision needed by Friday: keep the Saturday pilot running in June? Yes or no."', outcome: 'Right. He knows what to do in one line.', best: true },
          { text: '"As you know, the pilot has been running for three weeks..."', outcome: 'Context he already has. The ask is still buried.' },
          { text: '"Dear Mr Kamau, I hope you are well."', outcome: 'Polite, but the decision is still at the bottom.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Before you write, finish this sentence: "I need them to..." Then put that first.',
    },
  ],
  apply: {
    scenario: 'Two drafts.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the reader to what Zanele needs them to do.',
        pairs: [
          ['Mr Kamau', 'Approve June and two contracts'],
          ['Emeka', 'Send Lagos weekend counts'],
          ['Mrs Achieng', 'Check the drafts before they go'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where were the asks in Zanele\'s drafts?',
        options: [
          { text: 'In the subject line', why: 'That\'s where they should go.' },
          { text: 'Nowhere', why: 'They were there, at the end.' },
          { text: 'In the last line' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Ask first, or ask buried?',
        groups: ['Ask first', 'Ask buried'],
        items: [
          { text: '"Decision needed by Friday: keep the pilot in June?"', group: 0 },
          { text: '"As you know, the pilot started in April..."', group: 1 },
          { text: '"Could you send Lagos weekend counts by Thursday?"', group: 0 },
          { text: '"I hope you are well. It\'s been a busy week."', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many driver contracts need approving?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Isn\'t it rude to start with what I want?',
        prompt: "Mrs Achieng's best reply?",
        options: [
          { text: 'Yes, warm up for three paragraphs.', why: 'He won\'t get to the ask.' },
          { text: 'It\'s considerate. He has 200 emails. Telling him what you need first saves his time.' },
          { text: 'Skip the greeting too.', why: 'A greeting is fine; then the ask.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The test.',
        template: 'Finish the sentence "I need them [[1]]...", then put that [[2]].',
        blanks: [['to'], ['first']],
        distractors: ['never', 'last'],
      },
      {
        kind: 'mcq',
        prompt: 'Until when is the pilot approved?',
        options: [
          { text: '31 May' },
          { text: '6 May', why: 'That\'s when the driver notice starts Saturdays.' },
          { text: 'It doesn\'t end', why: 'It needs approval for June.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line should move to the top of the email to Emeka?',
        lines: [
          'Hi Emeka, hope all is well in Lagos.',
          'The Nairobi pilot is going well; late deliveries are at 21%.',
          'We\'re wondering if Lagos might benefit too.',
          'Could you send weekend order counts by Thursday?',
        ],
        bug: 3,
        fix: 'Move it to line one.',
        explanation: 'It\'s the whole point, and it\'s last.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter covers.',
        lines: ['The point and the ask first', 'Subject lines', 'Making it easy to reply', 'One ask per message'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'By which day does Zanele need Emeka\'s numbers?',
        answers: ['Thursday', 'thursday'],
        placeholder: 'A day',
      },
    ],
  },
  reflect: {
    prompt: 'For a message you need to send, finish this sentence: "I need them to..." Is that your first line?',
    starters: ['I need them to...'],
  },
  deepen: {
    title: 'Asks at the bottom',
    summary: 'Many writers put the ask last because that\'s the order they thought of it in. Readers, especially busy ones, need it in reverse: what to do first, why second.',
  },
  notes: 'Fictional: pilot approved to 30 June; June extension and two driver contracts need Kamau\'s approval; Emeka (Lagos logistics, CAST.md) asked for weekend order counts by Thursday.',
};

export default lesson;
