import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Reading: questions that shouldn't be asked. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Questions that shouldn\'t be asked',
  summary: 'Near the end, Mr Njoroge asks: "Which community are you from? And are you planning to settle down soon?" Remi freezes. Ada explains what to do when an interviewer crosses a line.',
  minutes: 12,
  outcomes: [
    'Recognise inappropriate interview questions',
    'Respond calmly in the moment',
    'Know your options afterwards',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'When a question crosses the line',
      html: '<p>Many countries have laws against discrimination at work, including in hiring. Kenya\'s Employment Act 2007, for example, bans discrimination on grounds including <strong>ethnic origin, religion, sex, pregnancy, disability and HIV status</strong>. Questions about these usually have nothing to do with whether you can do the job.</p><p>Sometimes interviewers ask them out of habit or clumsy small talk, sometimes not. Either way, you can choose how to respond:</p><ul><li><strong>Redirect to the job:</strong> "I\'d rather keep the focus on the role. What I can say is I\'m fully committed to the 12 weeks."</li><li><strong>Answer the concern behind it:</strong> if the worry seems to be commitment, answer that, not the personal question.</li><li><strong>Decline politely:</strong> "I don\'t think that\'s relevant to the role, but I\'m happy to talk about my experience."</li></ul><p>Afterwards, you can tell the recruiter or HR, and ask yourself whether you want to work somewhere that asks it. Write down what was said and when.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'You don\'t have to answer questions about ethnicity, religion, family plans or health. Redirect calmly to the job.',
    },
  ],
  apply: {
    scenario: 'Crossing the line.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Appropriate interview question, or inappropriate?',
        groups: ['Appropriate', 'Inappropriate'],
        items: [
          { text: '"Can you commit to the 12 weeks?"', group: 0 },
          { text: '"Which community are you from?"', group: 1 },
          { text: '"Are you planning to have children?"', group: 1 },
          { text: '"Which programming languages do you use?"', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which law does the lesson give as an example?',
        options: [
          { text: 'Kenya\'s Employment Act 2007' },
          { text: 'The US Plain Writing Act', why: 'That\'s about government writing.' },
          { text: 'No law covers this', why: 'Many countries have anti-discrimination laws.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the response to what it does.',
        pairs: [
          ['"I\'d rather keep the focus on the role."', 'Redirects'],
          ['"I\'m fully committed to the 12 weeks."', 'Answers the concern'],
          ['"I don\'t think that\'s relevant."', 'Declines politely'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Should I have just answered to be polite?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'You can if you want to, but you don\'t have to. Redirecting calmly to the job is polite too.' },
          { text: 'Yes, always answer everything.', why: 'You can decline.' },
          { text: 'Walk out immediately.', why: 'That\'s an option, but redirecting usually works.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Redirect.',
        template: '"I\'d rather keep the [[1]] on the [[2]]."',
        blanks: [['focus'], ['role', 'job']],
        distractors: ['blame', 'weather'],
      },
      {
        kind: 'mcq',
        prompt: 'What can Remi do after the interview?',
        options: [
          { text: 'Note what was said, tell the recruiter or HR, and decide if he wants to work there' },
          { text: 'Nothing at all', why: 'He has options.' },
          { text: 'Post the interviewer\'s name online', why: 'Report through proper channels.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s response is unnecessary?',
        lines: [
          'I\'d rather keep the focus on the role.',
          'I\'m fully committed to the 12 weeks.',
          'Sorry for being difficult.',
          'Happy to talk about my experience instead.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'He has nothing to apologise for.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was Kenya\'s Employment Act passed?',
        answers: ['2007'],
        placeholder: 'A year',
      },
      {
        kind: 'sortGroups',
        prompt: 'A protected ground in the Act, or not?',
        groups: ['Protected', 'Not'],
        items: [
          { text: 'Ethnic origin', group: 0 },
          { text: 'Pregnancy', group: 0 },
          { text: 'Coding skill', group: 1 },
          { text: 'Religion', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to handle an inappropriate question.',
        lines: ['Stay calm', 'Redirect to the job', 'Answer the real concern if there is one', 'Note it down afterwards'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own calm redirect for a question you wouldn\'t want to answer in an interview.',
    starters: ['I\'d say...'],
  },
  deepen: {
    title: 'Laws differ',
    summary: 'Protected grounds and complaint routes vary by country. Your careers office, a labour office or HR can tell you the rules where you live.',
  },
  notes: 'Kenya Employment Act 2007, s.5(3): prohibits discrimination on grounds including race, colour, sex, language, religion, political or other opinion, nationality, ethnic or social origin, disability, pregnancy, mental status or HIV status. Fictional questions. Not legal advice.',
};

export default lesson;
