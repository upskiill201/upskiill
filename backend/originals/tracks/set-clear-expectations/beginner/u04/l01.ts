import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story: Mr Rao wants a loyalty programme by Diwali. A change request lands. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The phone call',
  summary: 'Day 20, 8:15 p.m. Mr Rao never calls. Tonight he does. "My cousin\'s shop has loyalty points. Customers love it. We need it for Diwali." Ten days left. The team is exactly on plan. Loyalty points are on the Won\'t list.',
  minutes: 11,
  outcomes: [
    'See why "yes" and "no" are both risky answers to a change',
    'Buy time to think without sounding like a refusal',
    'Know this chapter\'s goal: keep expectations clear when things change',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 20, 8:15 p.m., a phone call',
      beats: [
        { speaker: 'narrator', text: 'Mr Rao, fast and excited: "Points for every rupee, a gold level, birthday rewards. My cousin\'s customers love it. Diwali is when everyone shops. We need it."' },
        { speaker: 'arjun', text: '(thinking) Loyalty points are a three-week job. We have ten days. And it\'s on the Won\'t list, in writing, which Mr Rao read the first line of.' },
        { speaker: 'narrator', text: 'Two answers are on the tip of Arjun\'s tongue. "Of course!" would make tonight\'s call lovely and the next ten days a disaster. "That\'s not possible" would be true and would make Mr Rao feel ignored.' },
      ],
      choice: {
        prompt: 'What should Arjun say?',
        options: [
          {
            text: '"I love that idea, and Diwali is the right moment. Can I come back to you tomorrow at 10 with what it would take?"',
            outcome: 'Mr Rao: "Tomorrow at 10. Good." Arjun has fourteen hours to work out real options, with the team, before promising anything.',
            best: true,
          },
          {
            text: '"Of course, we\'ll make it happen."',
            outcome: 'A happy client tonight. Tomorrow, Arjun has to tell two juniors that their next ten days just doubled.',
          },
          {
            text: '"Sorry, that\'s not in scope."',
            outcome: 'True. Mr Rao goes quiet, then calls his cousin\'s developer.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Plans change. Clients, bosses and teammates change their minds, and often for good reasons. Clear expectations aren't about refusing change. They're about making sure everyone understands what a change <em>costs</em>, and choosing together. <strong>This chapter:</strong> handling change requests, scope creep, managing a client's expectations, unwritten expectations, resetting your team and saying \"yes, and that means...\".</p>",
    },
  ],
  apply: {
    scenario: 'The phone call, 8:15 p.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is "Of course!" risky?',
        options: [
          { text: 'It sounds rude', why: 'It sounds lovely. That\'s the trap.' },
          { text: 'It promises something before knowing what it costs' },
          { text: 'It\'s too short', why: 'Length isn\'t the problem.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good first response to a big change, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: '"Can I come back tomorrow at 10 with options?"', group: 0 },
          { text: '"Of course, we\'ll make it happen."', group: 1 },
          { text: '"I love that idea."', group: 0 },
          { text: '"That\'s not in scope."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: '(Mr Rao: "So can you do it or not?")',
        prompt: 'Arjun\'s best reply on the call?',
        options: [
          { text: 'Yes!', why: 'A guess dressed as a promise.' },
          { text: 'No.', why: 'Shuts the door before exploring.' },
          { text: 'I want to give you a real answer, not a guess. Tomorrow at 10 I\'ll show you two or three options and what each one means for Diwali.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Clear expectations aren\'t about refusing change. They\'re about showing what it ___. (one word)',
        answers: ['costs', 'Costs', 'means'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Arjun\'s next 14 hours in order.',
        lines: ['Thank Mr Rao and set a time', 'Estimate it with the team', 'Build two or three options', 'Show the options at 10 a.m.'],
      },
      {
        kind: 'mcq',
        prompt: 'Why involve Kavya and Joel before answering?',
        options: [
          { text: 'They\'ll do the work, and their estimates beat his guesses' },
          { text: 'To blame them if it\'s late', why: 'It\'s about real numbers.' },
          { text: 'They don\'t need to know', why: 'Their next ten days depend on it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s message to the team that night. Which line breaks this lesson?',
        lines: [
          'Mr Rao wants loyalty points for Diwali.',
          'I\'ve told him yes, so we\'ll need to speed up.',
          'Can we estimate it together at 8 a.m.?',
        ],
        bug: 1,
        fix: 'I haven\'t promised anything; I\'m going back to him at 10.',
        explanation: 'A yes before estimating hands the team a deadline nobody checked.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 3 review.',
        pairs: [
          ['MoSCoW', 'Must, should, could, won\'t'],
          ['Planning fallacy', 'Estimates run short'],
          ['Teach-back', 'Explain it to me'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'When things [[1]], keep expectations [[2]].',
        blanks: [['change'], ['clear']],
        distractors: ['stop', 'secret'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s time-buying line.',
        tiles: ['Can', 'I', 'come', 'back', 'tomorrow', 'at', '10?'],
        distractors: ['never'],
      },
    ],
  },
  reflect: {
    prompt: 'When someone asks you for something big, do you tend to say yes too fast, or no too fast? What would "Can I come back to you at...?" change?',
    starters: ['I tend to...', 'If I bought time...'],
  },
  deepen: {
    title: 'Buy time, kindly',
    summary: 'Next time you get a big request, try: "I love that. Can I come back to you by [time] with what it would take?" Then come back exactly on time.',
  },
  notes: 'Story setup. Change requests and scope management: standard project practice. "Yes, if" and managing up: see How to Lead Without Being the Boss and Leadership for Beginners. Fictional events.',
};

export default lesson;
