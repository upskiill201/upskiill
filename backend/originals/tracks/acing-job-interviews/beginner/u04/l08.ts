import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Explain cards: the tricky-question cheat sheet. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The tricky-question cheat sheet',
  summary: 'Ada sends Remi her own cheat sheet: the tricky questions she gets asked as an interviewer, and the shape of a good answer to each.',
  minutes: 12,
  outcomes: [
    'Prepare answers to common tricky questions',
    'Know the shape of a good answer to each',
    'Keep answers honest and short',
  ],
  learn: [
    {
      kind: 'text',
      html: '<table><tr><th>Question</th><th>Shape of a good answer</th></tr><tr><td>"Why should we hire you?"</td><td>Two or three strengths that match the ad, each with proof: "I\'ve built for real users (120 weekly), I\'m curious about small businesses, and I learn fast."</td></tr><tr><td>"Where do you see yourself in five years?"</td><td>Growing in this field, with skills this role builds. Not "in your job" or "running my own startup next year".</td></tr><tr><td>"Why is there a gap in your CV?"</td><td>Honest and brief, then what you did or learned: "I took a term off for family reasons, and I built my booking app then."</td></tr><tr><td>"What would your last manager or lecturer say about you?"</td><td>A real, specific compliment and a small area they\'d say you\'re working on.</td></tr><tr><td>"Do you have other interviews?"</td><td>Honest and calm: "Yes, a couple, but this role is the one I\'m most excited about because..." (only if true).</td></tr></table><p>For every one: <strong>short, honest, linked to the role.</strong></p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Tricky questions: short, honest, and linked back to the role.',
    },
  ],
  apply: {
    scenario: 'The cheat sheet.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the question to the shape of a good answer.',
        pairs: [
          ['"Why should we hire you?"', 'Strengths matching the ad, with proof'],
          ['"Five years from now?"', 'Growing in this field'],
          ['"A gap in your CV?"', 'Honest, brief, what you did'],
          ['"Other interviews?"', 'Honest and calm'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which five-year answer works best for an internship?',
        options: [
          { text: '"Growing as a developer, building products for small businesses."' },
          { text: '"In your job, Mr Njoroge."', why: 'Sounds like a joke or a threat.' },
          { text: '"Running my own company next year."', why: 'Suggests you won\'t stay.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good answer or poor answer?',
        groups: ['Good', 'Poor'],
        items: [
          { text: '"Yes, a couple, but this is the one I\'m most excited about."', group: 0 },
          { text: '"No, nobody else wants me."', group: 1 },
          { text: '"I took a term off and built my app then."', group: 0 },
          { text: '"Ten companies are fighting over me."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: '"Why should we hire you?" feels like bragging.',
        prompt: "Ada's best reply?",
        options: [
          { text: 'It\'s not bragging if it\'s true and matched to what they need. Give two or three strengths, each with proof.' },
          { text: 'Say "I don\'t know."', why: 'They need a reason.' },
          { text: 'List every skill you have.', why: 'Pick the ones that match.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Short, [[1]], and linked to the [[2]].',
        blanks: [['honest'], ['role', 'job']],
        distractors: ['loud', 'weather'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many strengths should "why should we hire you?" include? (Type the smaller number.)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What should follow a short, honest explanation of a CV gap?',
        options: [
          { text: 'What you did or learned during it' },
          { text: 'A long apology', why: 'Brief and positive.' },
          { text: 'Nothing; change the subject', why: 'Add what you did.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s "why should we hire you?" is weak?',
        lines: [
          'I\'ve built for real users: 120 people a week.',
          'I\'m curious about small businesses; I grew up in my uncle\'s shop.',
          'And I really, really need this job.',
          'I learn fast: I picked up Git in a weekend for the club.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Need isn\'t a reason to hire.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Linked to the role, or not?',
        groups: ['Linked', 'Not linked'],
        items: [
          { text: '"I\'ve built for real users"', group: 0 },
          { text: '"I\'m a great dancer"', group: 1 },
          { text: '"I understand small shops"', group: 0 },
          { text: '"I live nearby"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a "why should we hire you?" answer.',
        lines: ['Strength one, with proof', 'Strength two, with proof', 'Strength three, with proof', 'Link back to the role'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your answers to "why should we hire you?" and "where do you see yourself in five years?"',
    starters: ['Hire me because...', 'In five years...'],
  },
  deepen: {
    title: 'The questions don\'t change much',
    summary: 'These questions appear in interviews everywhere, year after year. Preparing them once, and adjusting for each employer, pays off for your whole career.',
  },
  notes: 'Common tricky interview questions and answer shapes (careers-service guidance). Fictional proofs from Remi\'s story bank.',
};

export default lesson;
