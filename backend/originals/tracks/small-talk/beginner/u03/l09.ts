import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: chatty or focused? Ending kindly and getting back to work (the "distracting" side of Methot et al.). */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Chatty or focused? Ending kindly',
  summary: 'Grace has a report due at 4. Femi arrives at her desk at 2:15 with a story about his cousin\'s wedding. It\'s a great story. It\'s also forty minutes long.',
  minutes: 12,
  outcomes: [
    'Protect focus time without being cold',
    'End a chat warmly with a clear, kind exit line',
    'Offer a later time so nobody feels rejected',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Grace\'s desk, 2:35 p.m.',
      text: 'Femi is twenty minutes into the wedding story. Grace smiles, then says: "Femi, I love this story and I want the ending. I\'ve got a report due at 4, so I need to get my head down. Can you tell me the rest at lunch tomorrow?" Femi: "Deal. The goat is worth the wait."',
      hotspots: [
        { phrase: 'I love this story', note: 'Start warm. It tells Femi this isn\'t about him.' },
        { phrase: 'I want the ending', note: 'Shows real interest, so the exit doesn\'t feel like rejection.' },
        { phrase: 'report due at 4', note: 'A short, true reason. No long excuse needed.' },
        { phrase: 'get my head down', note: 'A common British phrase: focus on work. Clear about what happens next.' },
        { phrase: 'Can you tell me the rest at lunch tomorrow?', note: 'The key move: offer a specific later time. It turns "no" into "not now".' },
        { phrase: 'Deal', note: 'When the exit is warm and has a later time, most people say yes happily.' },
      ],
    },
    {
      kind: 'text',
      html: "<p>Remember the workplace study: small talk is <strong>uplifting yet distracting</strong>. The answer isn't to stop chatting. It's to choose when.</p><p><strong>The kind exit:</strong> warm words + a short true reason + a later time.</p><p><strong>Protect your focus in advance:</strong> headphones, a \"heads down until 4\" status, or a quick \"I'm on a deadline, catch you at lunch!\" when someone stops by. Most colleagues respect a clear signal, as long as you're friendly at other times.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Kind exit: warm words, a short true reason, and a later time. "Not now" is fine when it comes with "but later".',
    },
  ],
  apply: {
    scenario: 'Wednesday, 2:35. Report due at 4.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Grace\'s kind exit in order.',
        lines: ['Femi, I love this story.', 'I\'ve got a report due at 4.', 'Can you tell me the rest at lunch tomorrow?'],
      },
      {
        kind: 'mcq',
        prompt: 'What turns a "no" into a "not now"?',
        options: [
          { text: 'A long excuse', why: 'Short and true works better.' },
          { text: 'Offering a specific later time' },
          { text: 'Saying sorry five times', why: 'Warmth, not grovelling.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Kind exit, or cold?',
        groups: ['Kind exit', 'Cold'],
        items: [
          { text: 'I need to focus, but tell me at lunch?', group: 0 },
          { text: 'I\'m busy.', group: 1 },
          { text: '(Puts headphones on mid-sentence)', group: 1 },
          { text: 'Love this. Deadline at 4, catch you after?', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'Got five minutes? I have a story about a goat at my cousin\'s wedding.',
        prompt: 'Grace is on a deadline. Best reply?',
        options: [
          { text: 'I NEED the goat story. Deadline at 4, though. Lunch tomorrow?' },
          { text: 'No.', why: 'Cold, and Femi\'s her friend.' },
          { text: 'Sure! (and miss the deadline)', why: 'Kind to Femi, unkind to future Grace.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A kind exit has warm words, a short true reason, and a later ___. (one word)',
        answers: ['time'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why does Grace say "I want the ending"?',
        options: [
          { text: 'To make him tell it faster', why: 'She\'s postponing it.' },
          { text: 'Politeness only', why: 'It\'s true, and that\'s why it works.' },
          { text: 'So Femi knows she\'s interested, and the exit isn\'t a rejection' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s exit plan. Which line is a problem?',
        lines: [
          'Smile and say I\'m enjoying the story.',
          'Explain my deadline in great detail for ten minutes.',
          'Suggest lunch tomorrow for the rest.',
        ],
        bug: 1,
        fix: 'Mention the deadline in one sentence.',
        explanation: 'A ten-minute excuse is another distraction. One short, true reason is enough.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Uplifting yet distracting', 'Workplace small talk'],
          ['Weak ties', 'Receptionist, IT, cleaners'],
          ['Watch and match', 'Follow their style'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s exit line.',
        template: 'I [[1]] this story. I\'ve got a report due at [[2]], so can you tell me the rest at [[3]] tomorrow?',
        blanks: [['love'], ['4', 'four'], ['lunch']],
        distractors: ['hate', 'never'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a quick focus signal.',
        tiles: ['Deadline', 'at', '4,', 'catch', 'you', 'at', 'lunch?'],
        distractors: ['busy', 'go'],
      },
    ],
  },
  reflect: {
    prompt: 'Who chats with you when you need to focus? Write your kind exit for them: warm words, a short reason, a later time.',
    starters: ['The person is...', 'I\'ll say: "..."'],
  },
  deepen: {
    title: 'Schedule the chat',
    summary: 'If you want small talk without the distraction, give it a home: coffee at 11, lunch together, the walk to the station. Chats in those moments are all uplift.',
  },
  notes: 'Draws on Methot et al. (2021) "uplifting yet distracting" finding (Chapter 3 lesson 8). Exit structure is practical advice. "Get my head down" — British informal.',
};

export default lesson;
