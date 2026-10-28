import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 11 — story choice: Clinton's mum wants him to take a stable bank job. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Mum\'s plan',
  summary: 'Sunday lunch in Buea. Clinton\'s mum has news: a cousin can get him an interview at a big state bank. "Stable. Pension. Respect." She\'s proud and she\'s worried. Clinton\'s plan points somewhere else.',
  minutes: 11,
  outcomes: ['Handle family expectations about your career', 'Find the real concern behind the request', 'Include what matters to family in your plan'],
  learn: [
    {
      kind: 'story',
      title: 'Sunday lunch',
      beats: [
        { speaker: 'narrator', text: 'Sunday lunch at home in Buea. Fufu and eru. His mum puts down her spoon.' },
        { speaker: 'narrator', text: '"Your cousin can get you an interview at the bank. Stable work. A pension. People respect it. These start-up things can close any day."' },
        { speaker: 'clinton', text: '(to himself) She\'s not wrong to worry. But I don\'t want a bank job.' },
        { speaker: 'tey', text: 'Family advice usually comes from love and real concerns: security, respect, worry about risk. Listening for the concern behind the request helps more than arguing about the job.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Ask what worries her most, then show her how his plan handles that worry.',
            outcome: 'Her worry is security. He shows her his savings, his permanent contract and his raise. She sighs: "OK. But you call your cousin and thank him." Deal.',
            best: true,
          },
          {
            text: 'Say yes to the bank interview to keep the peace.',
            outcome: 'He goes, hates every minute, and has to disappoint her later anyway.',
          },
          {
            text: 'Tell her she doesn\'t understand modern careers.',
            outcome: 'Lunch goes cold. She feels dismissed, and the worry is still there.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Behind family pressure is usually a real concern. Ask about it, address it, and keep your own direction.',
    },
  ],
  apply: {
    scenario: 'Sunday lunch.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where does family career advice usually come from?',
        options: [
          { text: 'A wish to control you', why: 'Usually love and real worries.' },
          { text: 'Love and real concerns like security and respect' },
          { text: 'Nowhere', why: 'Love and concern.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s approach in order.',
        lines: ['Listen to the request', 'Ask what worries her most', 'Show how his plan handles it', 'Agree something together'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Respectful response, or not?',
        groups: ['Respectful', 'Not respectful'],
        items: [
          { text: 'What worries you most about my job?', group: 0 },
          { text: 'You don\'t understand modern careers', group: 1 },
          { text: 'Here are my savings and my contract', group: 0 },
          { text: 'Rolling his eyes', group: 1 },
          { text: 'I\'ll thank cousin for the offer', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best first reply.',
        from: 'clinton',
        message: 'Mum says the bank is "stable, a pension, respect". What do I say first?',
        options: [
          { text: '"No."', why: 'Find the concern first.' },
          { text: '"Banks are boring."', why: 'Listen first.' },
          { text: '"Thank you for thinking of me. What worries you most about where I am now?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the response that will make things harder later.',
        lines: ['Asks what worries her.', 'Agrees to the interview he doesn\'t want, to keep the peace.', 'Shows his contract and savings.'],
        bug: 1,
        explanation: 'It delays the disappointment and wastes everyone\'s time.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Ask about her worry', 'She feels heard; a deal'],
          ['Say yes to keep peace', 'Disappoints her later anyway'],
          ['Dismiss her', 'Lunch goes cold'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What was his mum\'s real worry?',
        options: [
          { text: 'Security' },
          { text: 'His title', why: 'Security.' },
          { text: 'His friends', why: 'Security.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Behind the pressure is a real [[1]]. Ask about it, then [[2]] it.',
        blanks: [['concern'], ['address']],
        distractors: ['enemy', 'ignore', 'mock'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who offered the bank interview? His ___. (one word)',
        answers: ['cousin'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'A way to include family concerns in his plan, or not?',
        groups: ['Includes them', 'Doesn\'t'],
        items: [
          { text: 'An emergency savings target', group: 0 },
          { text: 'Never telling family anything', group: 1 },
          { text: 'A permanent contract', group: 0 },
          { text: 'Ignoring the worry', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What does your family hope for your career? What\'s the real concern behind it?',
    starters: ['My family hopes...', 'The concern underneath is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask someone in your family: "What worries you most about my work?" Listen fully before you answer.',
  },
  notes: 'Family expectations about stable careers are strong in many cultures. Fufu and eru is a Cameroonian dish.',
};

export default lesson;
