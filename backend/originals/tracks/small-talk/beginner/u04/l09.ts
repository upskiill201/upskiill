import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Reading: the follow-up message — turning a good chat into a real contact. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The follow-up message',
  summary: 'Grace met two interesting people at the first meetup and never contacted either of them again. Femi is horrified. "The chat is the seed. The message is the water."',
  minutes: 12,
  outcomes: [
    'Write a short follow-up that people actually reply to',
    'Know when to send it, and what to include',
    'Follow up without asking for anything',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Femi\'s follow-up rules',
      html: "<p>Monday morning. Femi, eating cereal at his desk: \"So who did you message after Thursday?\"</p><p>Grace: \"...Message?\"</p><p>Femi puts the spoon down. \"Grace. The chat is the seed. The message is the water. Without it, they forget you by Wednesday.\"</p><h3>1. Send it within a day or two</h3><p>While the conversation is fresh in both your minds. After a week it feels like a cold message from a stranger.</p><h3>2. Remind them who you are</h3><p>One line: \"It was great to meet you by the samosas at the health-tech meetup on Thursday.\" A specific detail makes you instantly recognisable.</p><h3>3. Mention something they said</h3><p>\"I've been thinking about what you said about triage apps in A&E.\" This proves you listened, and it's the part people remember most.</p><h3>4. Offer something small, or nothing at all</h3><p>A link to an article you mentioned. An introduction. Or simply: \"Hope the kitchen extension is going well!\" You don't need a reason. Being friendly is enough.</p><h3>5. Don't ask for a big favour</h3><p>\"Can you get me a job?\" in a first follow-up turns a warm contact cold. Build the relationship first.</p><h3>6. Keep it short</h3><p>Three to four sentences. A connection request on LinkedIn with a short note works too: \"Lovely to meet you at Thursday's meetup. I'd like to stay in touch.\"</p><h3>Example</h3><p><em>\"Hi Ravi, it was great to meet you by the samosas on Thursday. I've been thinking about what you said about moving into health tech, and here's the NHS digital careers page I mentioned. Hope Manchester is treating you well! Grace\"</em></p>",
    },
    {
      kind: 'check',
      question: 'When should Grace send her follow-up?',
      options: ['Within a day or two', 'After a month, so she doesn\'t seem keen', 'Never'],
      answer: 0,
      explanation: 'While the conversation is fresh in both minds.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Within two days: who you are, something they said, something small to offer (or just friendliness). Short. No big asks.',
    },
  ],
  apply: {
    scenario: 'Monday morning. Femi is horrified.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Grace\'s follow-up in order.',
        lines: ['Hi Ravi, great to meet you by the samosas on Thursday.', 'I\'ve been thinking about what you said about health tech.', 'Here\'s the careers page I mentioned.', 'Hope Manchester is treating you well! Grace'],
      },
      {
        kind: 'mcq',
        prompt: 'What does Femi mean by "The chat is the seed. The message is the water"?',
        options: [
          { text: 'Without a follow-up, a good conversation fades and nothing grows from it' },
          { text: 'You should talk about gardening', why: 'Gerald might. Not the point.' },
          { text: 'Messages are more important than conversations', why: 'Both matter; the message keeps it alive.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good in a follow-up, or not?',
        groups: ['Good', 'Not in a first follow-up'],
        items: [
          { text: 'A reminder of where you met', group: 0 },
          { text: 'Can you get me a job?', group: 1 },
          { text: 'Something they said that stuck with you', group: 0 },
          { text: 'A 600-word life story', group: 1 },
          { text: 'A link you promised them', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'You met Dr Adeyemi at the social too, right? Message him!',
        prompt: 'Grace\'s draft?',
        options: [
          { text: 'Hi. Remember me? Can you introduce me to your CEO?', why: 'A big ask, and no reminder of who she is.' },
          { text: 'Hi Dr Adeyemi, it was lovely to meet you at Kinwell\'s social. I\'ve been thinking about what your staff said about the app. Would they be open to a short chat with me about it?' },
          { text: 'hey', why: 'A consultant, a client. Write properly.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Send your follow-up within a day or ___. (one word)',
        answers: ['two', '2'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why mention something they said?',
        options: [
          { text: 'It proves you listened, and it\'s what people remember most' },
          { text: 'To show off your memory', why: 'It\'s about them, not you.' },
          { text: 'It makes the message longer', why: 'It makes it more personal.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s follow-up to a meetup contact. Which line should go?',
        lines: [
          'Great to meet you at Thursday\'s meetup.',
          'I loved hearing about your triage app.',
          'Also, could you look at my CV and pass it to your manager?',
        ],
        bug: 2,
        fix: 'Hope the launch goes well!',
        explanation: 'A big favour in a first follow-up turns a warm contact cold. Relationship first.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Leaving gracefully', 'Warm words, their name, their topic'],
          ['Networking myth', 'Meet as many as possible'],
          ['Introduction formula', 'Name + detail + connection'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A LinkedIn connection note.',
        template: 'Lovely to [[1]] you at Thursday\'s meetup. I\'d like to stay in [[2]].',
        blanks: [['meet'], ['touch']],
        distractors: ['hire', 'trouble'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the reminder line.',
        tiles: ['Great', 'to', 'meet', 'you', 'by', 'the', 'samosas', 'on', 'Thursday.'],
        distractors: ['job'],
      },
    ],
  },
  reflect: {
    prompt: 'Who did you meet recently and never contacted again? Write the follow-up now: where you met, something they said, something small or friendly.',
    starters: ['Hi ..., it was great to meet you at...', 'I\'ve been thinking about...'],
  },
  deepen: {
    title: 'The 48-hour rule',
    summary: 'After your next event, block ten minutes the next morning to send two or three follow-ups. It\'s the most valuable ten minutes of the whole event.',
  },
  notes: 'Follow-up guidance is common professional-networking advice. NHS digital careers pages exist; no specific URL claimed. Dr Adeyemi from Chapter 3 lesson 10.',
};

export default lesson;
