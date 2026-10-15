import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. On air: Arjun, "I told them in paragraph four". Experts often aren't heard because of how they explain. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'On air: "I told them in paragraph four"',
  summary: 'Line 2, Bengaluru. Arjun, a freelance developer, warned his client\'s online shop about a bug, in a 900-word email with diagrams. They launched their biggest sale anyway. The shop crashed for six hours.',
  minutes: 12,
  outcomes: [
    'See why being right isn\'t the same as being heard',
    'Spot where an expert\'s warning got lost',
    'Know this chapter\'s goal: make expert ideas land with non-experts',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tey FM, 11:30 p.m. (4 a.m. in Bengaluru)',
      beats: [
        { speaker: 'tey', text: "Line 2, calling from Bengaluru, where it's... four in the morning? You're on Tey FM." },
        { speaker: 'arjun', text: 'Good evening, Tey. Or good morning. I cannot sleep. I warned my client, Mr Rao, that the payment system would fail under heavy traffic. I explained the race condition in the checkout queue, the database locking issue and the retry logic. With three diagrams.' },
        { speaker: 'tey', text: "And what did Mr Rao do?" },
        { speaker: 'arjun', text: 'He replied "Thanks Arjun, looks good!" and launched the biggest sale of the year. The shop crashed for six hours. He called me furious: "Why didn\'t you TELL me?" Tey, I told him. In paragraph four.' },
        { speaker: 'tey', text: "Ignore-o-Meter: one client, nine hundred words, zero words read past paragraph one. Producer, we've got an expert who's right, and unheard. What's going on?" },
      ],
      choice: {
        prompt: 'Producer: what\'s the first thing to ask Arjun?',
        options: [
          {
            text: '"What did Mr Rao need to DO, and where in the email did you say it?"',
            outcome: 'Arjun scrolls. "He needed to delay the sale by two days. I said it... at the very end. After the diagrams." Found it.',
            best: true,
          },
          {
            text: '"Why didn\'t Mr Rao read your email properly?"',
            outcome: 'Arjun agrees: "Exactly! He should have!" True, maybe. But it doesn\'t help Arjun next time. We can only change our own message.',
          },
          {
            text: '"Maybe add a fourth diagram next time?"',
            outcome: 'Arjun looks interested. That\'s the problem. More detail is how the warning got buried.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Arjun's problem is the opposite of Clinton's. Clinton said too much about too little. Arjun said too much about something <strong>very</strong> important, in a language only experts speak.</p><p>Mr Rao needed one sentence: <em>\"Delay the sale by two days or the shop will crash: I need 48 hours to fix the payments.\"</em> It was in there, at the end, after 900 words he didn't understand.</p><p>This chapter is about being heard when you know more than your listener: putting the answer first, explaining simply, using stories and numbers people can feel.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Being right isn\'t enough. If the listener can\'t find or understand the point, it wasn\'t said.',
    },
  ],
  apply: {
    scenario: 'Tey FM, Line 2. Arjun from Bengaluru.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Mr Rao actually need from Arjun\'s email?',
        options: [
          { text: 'An explanation of the race condition', why: 'Interesting to Arjun. Not what Mr Rao needed.' },
          { text: 'One clear action: delay the sale by two days, or the shop will crash' },
          { text: 'Three diagrams', why: 'He didn\'t read them.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'What Arjun cared about vs what Mr Rao needed.',
        groups: ['Arjun cared about', 'Mr Rao needed'],
        items: [
          { text: 'How the database locking works', group: 0 },
          { text: 'What to do: delay the sale', group: 1 },
          { text: 'The retry logic', group: 0 },
          { text: 'What happens if he doesn\'t: the shop crashes', group: 1 },
          { text: 'How long the fix takes: 48 hours', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'But he should have read the whole email. It was all important.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'You\'re right, find a new client.', why: 'That doesn\'t fix the next email.' },
          { text: 'Next time, make it 2,000 words.', why: 'More is how it got buried.' },
          { text: 'Maybe. But you can only change your message, not his reading habits. Put what he must do first.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Where did Arjun put the action Mr Rao needed? In paragraph ... (a number)',
        answers: ['four', '4'],
        placeholder: 'Number',
      },
      {
        kind: 'mcq',
        prompt: 'How is Arjun\'s problem different from Clinton\'s?',
        options: [
          { text: 'Clinton said too much about too little; Arjun said too much about something vital, in expert language' },
          { text: 'They have exactly the same problem', why: 'Similar, but Arjun\'s message was important and too technical.' },
          { text: 'Arjun talks too little', why: '900 words says otherwise.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s original email. Which line should have been first?',
        lines: [
          'Hi Mr Rao, here is a detailed analysis of the checkout architecture.',
          'Diagram 1 shows the queue; diagram 2 the locks; diagram 3 the retries.',
          'Therefore I recommend delaying the sale by two days so I can fix the payments.',
        ],
        bug: 2,
        fix: 'Move it to the top: "Please delay the sale by two days, or the shop will crash."',
        explanation: 'The action was buried at the end. Busy readers stop after the first lines.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['Find your one point', 'What do I want them to DO?'],
          ['Send once, then listen', 'The message rule'],
          ['Stop when you\'ve finished', 'Let the point land'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Mr Rao reply "Thanks Arjun, looks good!"?',
        options: [
          { text: 'He agreed to delay the sale', why: 'He launched it.' },
          { text: 'He skimmed the start, saw technical detail, and assumed it was fine' },
          { text: 'He was being rude', why: 'He was busy, and the warning was hidden.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The one sentence Mr Rao needed.',
        template: '[[1]] the sale by two days or the shop will [[2]]: I need [[3]] hours to fix the payments.',
        blanks: [['Delay'], ['crash'], ['48']],
        distractors: ['Launch', 'diagram'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the chapter\'s big idea.',
        tiles: ['Being', 'right', 'isn\'t', 'the', 'same', 'as', 'being', 'heard.'],
        distractors: ['diagram'],
      },
    ],
  },
  reflect: {
    prompt: 'What are you an expert in (a job, a hobby, a subject, your family\'s finances)? When did you last explain it to someone who didn\'t get it?',
    starters: ['I know a lot about...', 'I tried to explain ... to ...'],
  },
  deepen: {
    title: 'Find your paragraph four',
    summary: 'Open an important email or message you sent recently. Where is the thing you needed the reader to DO? If it isn\'t in the first two lines, you\'ve found your paragraph four.',
  },
  notes: 'Arjun per CAST.md (Bengaluru freelance developer, precise, opinionated). Mr Rao is a named extra (Pune online-shop founder, narrated). Technical terms (race condition, locking, retries) used deliberately as jargon the client wouldn\'t follow.',
};

export default lesson;
