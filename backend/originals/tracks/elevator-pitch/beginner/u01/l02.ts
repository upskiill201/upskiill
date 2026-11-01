import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Myth or Fact: what a pitch is, and isn't (contested origin of the term; goal = the next conversation). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What a pitch is, and isn\'t',
  summary: 'Ada has a theory: "A pitch is a sales speech. I\'m a designer, not a salesperson." Arjun disagrees. Tey brings out the myths.',
  minutes: 11,
  outcomes: [
    'Know what an elevator pitch is really for',
    'Drop the myths that make pitching feel scary',
    'Know that everyone pitches, not just founders',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'An elevator pitch is a sales speech.', isFact: false, explain: 'Myth. A good pitch is a conversation starter. You\'re not closing a deal in a lift; you\'re earning the next conversation.' },
        { text: 'Only startup founders need a pitch.', isFact: false, explain: 'Myth. Job seekers, students applying for scholarships, employees with an idea, freelancers meeting clients: all of them get asked "So, what do you do?"' },
        { text: 'The goal of a pitch is the next step, not the final yes.', isFact: true, explain: 'Fact. The best result from a lift ride is "Tell me more", "Send me your details" or "Come and see me next week".' },
        { text: 'Nobody knows for sure where the term "elevator pitch" comes from.', isFact: true, explain: 'Fact. It\'s credited to 1990s magazine editors pitching their boss in a lift, to Hollywood writers cornering producers, and to a quality consultant called Philip Crosby, who advised having an "elevator speech" ready. There\'s no single confirmed origin.' },
        { text: 'A great pitch is memorised word for word.', isFact: false, explain: 'Myth. You\'ll learn the key beats so well you can say them naturally, and adjust to whoever\'s listening. Word-for-word scripts tend to sound like scripts.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A pitch isn\'t a sales speech. It\'s a short, clear answer that earns the next conversation.',
    },
  ],
  apply: {
    scenario: 'Myth or fact, with Tey.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the realistic goal of an elevator pitch?',
        options: [
          { text: 'Close the deal before the doors open', why: 'That\'s a lot to ask of 30 floors.' },
          { text: 'Earn the next conversation' },
          { text: 'Explain every feature', why: 'That\'s how Ada lost the lift.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Only founders need a pitch', group: 0 },
          { text: 'The goal is the next step', group: 1 },
          { text: 'Memorise it word for word', group: 0 },
          { text: 'The term\'s origin is uncertain', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I\'m a designer, not a salesperson. Pitching feels fake.',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'It\'s not selling. It\'s explaining clearly why your work matters, so the right people want to know more.' },
          { text: 'You\'re right, skip pitch night.', why: 'Tunde would never forgive her.' },
          { text: 'Then fake it.', why: 'Clear and honest beats fake.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A good pitch is a conversation ___. (one word)',
        answers: ['starter', 'opener'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to their pitch moment.',
        pairs: [
          ['A job seeker', 'A recruiter at a careers fair'],
          ['An employee with an idea', 'Their boss in the corridor'],
          ['A founder', 'A judge or investor'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which result from a lift pitch counts as a WIN?',
        options: [
          { text: '"Hmm." (walks out)', why: 'That was Monday.' },
          { text: 'A long silence', why: 'Not a win.' },
          { text: '"Interesting. Send me your details."' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s notes on pitching. Which line is a myth?',
        lines: [
          'A pitch earns the next conversation.',
          'I need to memorise every word, exactly.',
          'Everyone pitches, not just founders.',
        ],
        bug: 1,
        fix: 'Learn the key beats so I can say them naturally.',
        explanation: 'Word-for-word scripts sound like scripts. Know the beats.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a good lift outcome in order.',
        lines: ['A short, clear pitch.', 'The listener is curious.', '"Tell me more."', 'A follow-up meeting.'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s definition.',
        template: 'A pitch is a [[1]], clear answer that earns the next [[2]]. It\'s not a [[3]] speech.',
        blanks: [['short'], ['conversation', 'meeting'], ['sales']],
        distractors: ['long', 'database'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the best lift outcome.',
        tiles: ['Interesting.', 'Tell', 'me', 'more.'],
        distractors: ['Hmm.'],
      },
    ],
  },
  reflect: {
    prompt: 'Where might YOU be asked for a pitch in the next month: an interview, an event, a meeting, a family gathering? What next step would count as a win?',
    starters: ['I might be asked at...', 'A win would be...'],
  },
  deepen: {
    title: 'Count the pitch moments',
    summary: 'For one week, notice every time someone asks "So, what do you do?" or "What are you working on?" Each one is a tiny pitch moment. Most people waste them.',
  },
  notes: 'Origin of "elevator pitch" is contested: credited to Ilene Rosenzweig & Michael Caruso (1990s, Vanity Fair), Hollywood folklore, and Philip Crosby\'s "elevator speech" (sources: Wikipedia "Elevator pitch"; Mental Floss). Pitch-as-conversation-starter is standard career and founder advice.',
};

export default lesson;
