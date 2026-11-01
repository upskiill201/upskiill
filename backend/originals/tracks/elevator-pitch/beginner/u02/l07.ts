import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Card deck: turn your pitch into a conversation (follow-up questions, Huang et al. 2017). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Turn your pitch into a conversation',
  summary: 'Arjun\'s honest feedback: "Your intro is great now. But at the bus stop, you got lucky. Next time, someone might just say \'Nice\' and stand there. What then?"',
  minutes: 11,
  outcomes: [
    'Use follow-up questions to keep a conversation going',
    'Listen for hooks in what people say',
    'End a networking chat well, with a next step',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>A pitch opens the door. A conversation is what happens inside. Here's how to keep it going.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Ask follow-up questions</h3><p>In a 2017 Harvard study of conversations, including speed dates, people who asked more questions were liked more. <strong>Follow-up questions</strong>, the ones that build on what the other person just said, made the biggest difference.</p><h3>Card 2: Listen for hooks</h3><p>Every answer has a hook. \"I'm here for my startup\" → \"What does it do?\" \"I'm in HR at a bank\" → \"What's the hardest part of hiring right now?\"</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 3: Find the connection</h3><p>Look for something you share: a problem, a city, a tool, a frustration. \"You run a savings group at church? I built an app for that!\" Connection is what people remember.</p><h3>Card 4: Don't pitch twice</h3><p>Once you've said your intro, don't keep circling back to it. If they're interested, they'll ask. Your job now is to be interested in them.</p>",
    },
    {
      kind: 'check',
      question: 'In the 2017 Harvard conversation study, which kind of question made people most likeable?',
      options: ['Follow-up questions that build on what the other person said', 'Questions about the weather', 'No questions at all'],
      answer: 0,
      explanation: 'Follow-up questions show you were listening, and they were linked to being liked more.',
    },
    {
      kind: 'text',
      html: "<h3>Card 5: End with a next step</h3><p>Good networking chats end with something concrete: \"Can I send you a demo?\", \"Shall we connect on LinkedIn?\", \"Could I introduce you to my friend who does that?\" Then leave warmly: \"Lovely to meet you. I'll message you tomorrow.\" And then actually do it.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Pitch once. Then follow up on what they say, find the connection, and end with a next step.',
    },
  ],
  apply: {
    scenario: 'Arjun\'s "What then?"',
    items: [
      {
        kind: 'mcq',
        prompt: 'What kind of question made people most likeable in the 2017 study?',
        options: [
          { text: 'Long questions', why: 'Length wasn\'t the point.' },
          { text: 'Follow-up questions' },
          { text: 'Questions about yourself', why: 'That\'s not a question, that\'s a speech.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what they said to a good follow-up.',
        pairs: [
          ['"I\'m here for my startup"', '"What does it do?"'],
          ['"I\'m in HR at a bank"', '"What\'s the hardest part of hiring right now?"'],
          ['"I just moved to Lagos"', '"What brought you here?"'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeps the conversation going, or ends it?',
        groups: ['Keeps it going', 'Ends it'],
        items: [
          { text: 'A follow-up question on what they said', group: 0 },
          { text: 'Pitching yourself again', group: 1 },
          { text: 'Finding something you share', group: 0 },
          { text: '"Nice." (silence)', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Someone said "I run marketing for a hotel chain." I have no idea what to ask!',
        prompt: 'What does Arjun suggest?',
        options: [
          { text: '"Oh, what\'s the hardest part of marketing a hotel right now?" Follow their hook.' },
          { text: '"Cool. Anyway, about my app..."', why: 'Pitching twice.' },
          { text: 'Nod and walk away.', why: 'There\'s always a hook.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'End a good networking chat with a next ___. (one word)',
        answers: ['step'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a good networking chat in order.',
        lines: ['Your short intro', 'A question back', 'Follow-up questions on their answer', 'Find the connection', 'Agree a next step', 'Follow up the next day'],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s chat with a hotel marketer. Which line is a mistake?',
        lines: [
          'What\'s the hardest part of marketing a hotel right now?',
          'Anyway, back to me: my app has reminders and an export button.',
          'Shall we connect on LinkedIn? I\'ll message you tomorrow.',
        ],
        bug: 1,
        fix: 'Oh, do your staff run an ajo too?',
        explanation: 'Dragging it back to her own pitch (with features!) kills the conversation. Find a connection instead.',
      },
      {
        kind: 'mcq',
        prompt: 'What makes a networking chat memorable afterwards?',
        options: [
          { text: 'Saying your pitch three times', why: 'That\'s just repetitive.' },
          { text: 'A real connection: something you share, and a next step you actually follow up' },
          { text: 'Handing out lots of business cards', why: 'Cards without connection get thrown away.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Arjun\'s rule.',
        template: '[[1]] once. Then follow [[2]] on what they say, and end with a next [[3]].',
        blanks: [['Pitch'], ['up'], ['step']],
        distractors: ['Repeat', 'speech'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a next step.',
        tiles: ['Shall', 'we', 'connect?', 'I\'ll', 'message', 'you', 'tomorrow.'],
        distractors: ['maybe'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last person you met. What follow-up question could you have asked? What next step could you have suggested?',
    starters: ['They said...', 'I could have asked...', 'A next step: ...'],
  },
  deepen: {
    title: 'Two follow-ups',
    summary: 'In your next conversation with someone new, ask at least two follow-up questions that build on what they just said. Notice how the conversation feels compared with your usual small talk.',
  },
  notes: 'Huang, Yeomans, Brooks, Minson & Gino (2017), Journal of Personality and Social Psychology 113(3): "It doesn\'t hurt to ask" — question-asking, especially follow-up questions, increased liking (including speed-dating data).',
};

export default lesson;
