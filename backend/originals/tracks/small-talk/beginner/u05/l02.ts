import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Step-by-step: the bridge question — from small to real, and what to do when someone shares something hard. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The bridge question',
  summary: 'Grace tries one step deeper with Aisha. It works, and then Aisha says something Grace didn\'t expect: her mum is in hospital. Small talk has become real talk. Now what?',
  minutes: 13,
  outcomes: [
    'Use "bridge questions" to move gently from small to real',
    'Share a little more of yourself to match',
    'Respond well when someone shares something hard',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From "grim out there" to something real',
      steps: [
        {
          title: 'Start where you are',
          body: '"Grim out there." "Grim." The usual. Small talk first: it builds the trust that makes the next step feel safe.',
        },
        {
          title: 'Ask a bridge question',
          body: 'A bridge question is light enough for small talk but invites a real answer. "What\'s been the best part of your week?" "What are you looking forward to?" "What got you into design?" "What\'s surprised you most this year?"',
        },
        {
          title: 'Match with a little of you',
          body: 'Aisha says the best part of her week was finally finishing a bowl at pottery that didn\'t look like a hat. Grace shares back: "Mine was Jayden saying I\'m \'less embarrassing than last month\'." Matching keeps it a swap, not an interview.',
        },
        {
          title: 'When something hard comes up',
          body: 'Then Aisha says quietly: "Honestly, it\'s been a strange week. My mum\'s in hospital." This happens: a bridge question gives people permission to be real. Grace\'s nursing instincts kick in, and this time they\'re exactly right.',
        },
        {
          title: 'Listen, don\'t fix',
          body: 'Grace doesn\'t give medical advice or tell a story about her own mum. She says: "Oh Aisha, I\'m sorry. How is she doing?" Then she listens. And: "How are YOU doing?" Most people don\'t need solutions. They need someone to notice.',
        },
        {
          title: 'Let them set the depth',
          body: 'Grace follows Aisha\'s lead: if she wants to talk, listen; if she changes the subject, go with it. Later: "Thinking of you and your mum. Let me know if I can do anything." That\'s all.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Bridge questions open the door gently. If something hard comes through it: listen, don\'t fix, ask how THEY are, and let them set the depth.',
    },
  ],
  apply: {
    scenario: 'Tuesday lunch. One step deeper.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Bridge question, or too much too soon?',
        groups: ['Bridge question', 'Too much, too soon'],
        items: [
          { text: 'What\'s been the best part of your week?', group: 0 },
          { text: 'What\'s your biggest regret in life?', group: 1 },
          { text: 'What got you into design?', group: 0 },
          { text: 'Are you happy in your relationship?', group: 1 },
          { text: 'What are you looking forward to?', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Aisha says her mum is in hospital. Best first response?',
        options: [
          { text: '"Oh Aisha, I\'m sorry. How is she doing?"' },
          { text: '"Which ward? What medication is she on?"', why: 'Nurse Mode. Not the moment for medical questions.' },
          { text: '"My mum was in hospital once, let me tell you..."', why: 'A switch to yourself.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Small talk first', 'Ask a bridge question', 'Match with a little of you', 'If something hard comes up, listen'],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(Aisha) "Sorry, I didn\'t mean to make lunch heavy."',
        prompt: 'Grace\'s reply?',
        options: [
          { text: 'Yes, let\'s talk about something happier.', why: 'Let her set the depth, not you.' },
          { text: 'It\'s fine, anyway, pottery!', why: 'Too quick a swerve away from something real.' },
          { text: 'Don\'t apologise. I\'m glad you told me. How are YOU doing with it all?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'When someone shares something hard: listen, don\'t ___. (one word)',
        answers: ['fix'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Aisha changes the subject back to pottery. What does Grace do?',
        options: [
          { text: 'Bring it back to her mum', why: 'Let her lead.' },
          { text: 'Go quiet', why: 'Follow her into the lighter topic.' },
          { text: 'Go with it: she\'s setting the depth' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s message to Aisha later. Which line is too much?',
        lines: [
          'Thinking of you and your mum.',
          'Here\'s a list of twelve treatments she should ask her doctors about.',
          'Let me know if I can do anything.',
        ],
        bug: 1,
        fix: 'No pressure to reply.',
        explanation: 'Advice nobody asked for adds pressure. Warmth and an open offer are enough.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Deeper talk', 'Goes better than expected'],
          ['Answer, add, ask', 'The conversation rhythm'],
          ['Reflecting back', '"So she\'s nervous about it?"'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s bridge question.',
        template: 'What\'s been the [[1]] part of your [[2]]?',
        blanks: [['best'], ['week', 'day']],
        distractors: ['worst', 'life'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Grace\'s caring follow-up.',
        tiles: ['How', 'are', 'you', 'doing', 'with', 'it', 'all?'],
        distractors: ['fix', 'medication'],
      },
    ],
  },
  reflect: {
    prompt: 'Write two bridge questions you\'d feel comfortable asking someone you usually only make small talk with.',
    starters: ['1. ...', '2. ...'],
  },
  deepen: {
    title: 'When small talk turns serious',
    summary: 'If someone shares something hard, you don\'t need the perfect words. "I\'m sorry. How are you doing?" and then listening is enough. If they seem to be struggling a lot, gently mention that talking to a doctor, counsellor or helpline can help.',
  },
  notes: 'Bridge questions and supportive listening are practical guidance; "listen, don\'t fix" aligns with responsiveness research (Huang et al. 2017) and supportive communication literature. Non-clinical; Deepen signposts professional help. Aisha\'s pottery callback from Chapter 2 lesson 3.',
};

export default lesson;
