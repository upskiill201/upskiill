import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Reading: why interviewers ask about the past. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Why they ask about the past',
  summary: 'Remi asks Ada: "Why do they care what I did in third year?" She sends him the idea behind behavioural interviews: past behaviour is one of the best clues to future behaviour.',
  minutes: 12,
  outcomes: [
    'Know why behavioural questions are used',
    'Tell behavioural from hypothetical questions',
    'Answer hypotheticals with real examples',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The past predicts',
      html: '<p>In the 1980s, psychologist Tom Janz and colleagues developed the <strong>behaviour description interview</strong>. The idea: asking what someone <em>actually did</em> in a real situation tells you more than asking what they <em>would</em> do.</p><p>Anyone can say "I\'d stay calm under pressure." Fewer people can describe a real night when they did.</p><p>Two kinds of question:</p><ul><li><strong>Behavioural:</strong> "Tell me about a time you missed a deadline." Answer with a STAR story.</li><li><strong>Hypothetical (situational):</strong> "What would you do if a teammate stopped replying?" Answer with your approach, then back it up: "I\'d message them directly first. That\'s what I did with my coding club, when..."</li></ul><p>Both appear in structured interviews. The trick is the same: wherever you can, <strong>anchor your answer in something you really did</strong>.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Past behaviour is a strong clue. For "what would you do?", give your approach, then a real example.',
    },
  ],
  apply: {
    scenario: 'Past and hypothetical.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Behavioural or hypothetical?',
        groups: ['Behavioural', 'Hypothetical'],
        items: [
          { text: '"Tell me about a time you missed a deadline."', group: 0 },
          { text: '"What would you do if a teammate stopped replying?"', group: 1 },
          { text: '"Describe a time you changed your mind."', group: 0 },
          { text: '"How would you handle an angry customer?"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do interviewers ask about what you actually did?',
        options: [
          { text: 'Real past behaviour tells them more than promises about the future' },
          { text: 'To fill time', why: 'It\'s one of the strongest signals.' },
          { text: 'To trick you', why: 'It\'s to see real examples.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: '"What would you do if a teammate stopped replying?" How do I answer that?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Give your approach, then a real example: "I\'d message them directly. That\'s what I did in the coding club when..."' },
          { text: 'Just say "I\'d stay calm."', why: 'Too general.' },
          { text: '"That would never happen."', why: 'It dodges the question.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question type to the best answer.',
        pairs: [
          ['Behavioural', 'A STAR story'],
          ['Hypothetical', 'Your approach plus a real example'],
          ['Vague promise', 'Something to avoid'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The trick.',
        template: '[[1]] your answer in something you really [[2]].',
        blanks: [['Anchor', 'Ground'], ['did']],
        distractors: ['Hide', 'imagined'],
      },
      {
        kind: 'mcq',
        prompt: 'Who developed the behaviour description interview?',
        options: [
          { text: 'Tom Janz and colleagues' },
          { text: 'Fisher and Ury', why: 'They wrote Getting to Yes.' },
          { text: 'Tversky and Kahneman', why: 'They studied judgement and anchoring.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which answer to "How would you handle pressure?" is weakest?',
        lines: [
          'I\'d break the work into small tasks.',
          'That\'s what I did in exam week when the church app broke.',
          'I just never get stressed, ever.',
          'I fixed it by midnight and still sat my exam.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'An unbelievable claim with no evidence.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which decade was the behaviour description interview developed? (e.g. 1980s)',
        answers: ['1980s', '1980', 'the 1980s', '80s'],
        placeholder: 'A decade',
      },
      {
        kind: 'sortGroups',
        prompt: 'Approach only, or approach plus evidence?',
        groups: ['Approach only', 'With evidence'],
        items: [
          { text: '"I\'d talk to them."', group: 0 },
          { text: '"I\'d talk to them, like I did with Kevin."', group: 1 },
          { text: '"I\'d prioritise."', group: 0 },
          { text: '"I\'d prioritise, as I did in exam week."', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order an answer to a hypothetical question.',
        lines: ['State your approach', 'Give a real example', 'Say how it turned out', 'Link back to the role'],
      },
    ],
  },
  reflect: {
    prompt: 'Answer this hypothetical with your approach and a real example: "What would you do if you disagreed with your manager?"',
    starters: ['I would...', 'For example, when...'],
  },
  deepen: {
    title: 'Situational questions',
    summary: 'Research suggests both behavioural and situational questions can predict performance when they\'re structured and scored. Real examples make either kind more convincing.',
  },
  notes: 'Janz (1982), "Initial comparisons of patterned behavior description interviews versus unstructured interviews", Journal of Applied Psychology 67(5); Janz, Hellervik & Gilmore, Behavior Description Interviewing (1986). Situational interviews: Latham et al. (1980).',
};

export default lesson;
