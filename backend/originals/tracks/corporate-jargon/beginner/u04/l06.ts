import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Myth or Fact: what "professional English" really is — long words, contractions, softeners, "just". */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Softeners that don\'t make you sound weak',
  summary: 'After Mrs Achieng\'s lesson, Remi overcorrects. His next email says "I just wanted to perhaps possibly ask if maybe..." Professional English is not the same as complicated English.',
  minutes: 11,
  outcomes: [
    'Bust the myths about what sounds professional',
    'Use softeners (perhaps, I wonder, it might) where they help',
    'Cut the ones that make you sound unsure',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Long, complicated words sound more professional.', isFact: false, explain: '"Utilise" isn\'t more professional than "use". Clear beats complicated. The CEO, remember, speaks the plainest English in the building.' },
        { text: 'Contractions like "I\'m" and "don\'t" are fine in neutral work emails.', isFact: true, explain: 'They\'re normal and friendly. Very formal letters and legal documents avoid them; everyday emails don\'t need to.' },
        { text: 'Adding "just" to every request makes you sound more polite.', isFact: false, explain: '"I just wanted to just check" sounds unsure, not polite. One "just" is fine. Five is a confidence leak.' },
        { text: 'Softeners like "perhaps" or "I wonder if" are useful when you disagree or suggest something.', isFact: true, explain: '"Perhaps we could test it first?" is a kind way to push back. That\'s where softeners shine.' },
        { text: 'Short sentences can be completely professional.', isFact: true, explain: '"Thanks. The report is attached." Short, polite, professional.' },
        { text: 'Saying "I think" always makes you sound weak.', isFact: false, explain: 'When you genuinely aren\'t certain, "I think" is honest. It only sounds weak when you ARE sure.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Remi\'s overcorrected email',
      before: {
        label: 'Too soft',
        text: 'Hi Brian, I just wanted to perhaps possibly ask if maybe, when you get a chance, if it\'s not too much trouble, you might be able to have a look at my tracker? Sorry!',
      },
      after: {
        label: 'Polite and clear',
        text: 'Hi Brian, could you have a look at my tracker when you get a chance? I\'d like your view before Friday. Thanks!',
      },
      notes: [
        'Seven softeners became one polite question.',
        '"Sorry!" went. There\'s nothing to apologise for.',
        'A reason and a time ("before Friday") make it easy to say yes.',
      ],
    },
  ],
  apply: {
    scenario: 'Tuesday, 11:00. Remi\'s overcorrection.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which sounds more professional?',
        options: [
          { text: 'We will utilise the aforementioned methodology.', why: 'Long words, not more professional, just harder to read.' },
          { text: 'We gonna use that thing.', why: 'Too casual.' },
          { text: 'We\'ll use the method we discussed.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful softener, or confidence leak?',
        groups: ['Helpful softener', 'Confidence leak'],
        items: [
          { text: 'Perhaps we could test it first?', group: 0 },
          { text: 'I just wanted to just maybe ask...', group: 1 },
          { text: 'I wonder if Friday would work better?', group: 0 },
          { text: 'Sorry, sorry, this is probably stupid, but...', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s email. Which part leaks confidence?',
        lines: [
          'Hi Brian,',
          'I just wanted to perhaps possibly maybe ask about the tracker, sorry!',
          'Thanks, Remi',
        ],
        bug: 1,
        fix: 'Could you have a look at my tracker before Friday?',
        explanation: 'Stacked softeners and an apology make a simple request sound like a confession.',
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'I\'ve removed all my contractions to sound professional. "I do not believe I am able to attend." Better?',
        prompt: 'What does Remi say?',
        options: [
          { text: 'Yes, contractions are banned at work.', why: 'They\'re normal in everyday emails.' },
          { text: 'Add more long words too.', why: 'Clear beats complicated.' },
          { text: 'For an everyday email, "I don\'t think I can make it" is fine, and friendlier.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Plain English for "utilise": ... (one word)',
        answers: ['use'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'When is "I think" the right choice?',
        options: [
          { text: 'Always, to be polite', why: 'Saying it when you\'re sure undersells you.' },
          { text: 'When you genuinely aren\'t certain' },
          { text: 'Never', why: 'It\'s an honest phrase when you\'re unsure.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the softener to a good use.',
        pairs: [
          ['Perhaps we could...', 'Suggesting gently'],
          ['I wonder if...', 'Asking without pushing'],
          ['It might be worth...', 'Recommending carefully'],
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Could you...?', 'Everyday polite request'],
          ['Register', 'How formal your language is'],
          ['KPI', 'Key performance indicator'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Rewrite the too-soft request.',
        template: '[[1]] you have a look at my tracker [[2]] Friday? [[3]]!',
        blanks: [['Could'], ['before', 'by'], ['Thanks']],
        distractors: ['Sorry', 'perhaps'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a gentle suggestion for a meeting.',
        tiles: ['Perhaps', 'we', 'could', 'test', 'it', 'on', 'one', 'route', 'first?'],
        distractors: ['sorry', 'just'],
      },
    ],
  },
  reflect: {
    prompt: 'Look at your last few work or school messages. Count the "justs", "sorrys" and "maybes". Which could go?',
    starters: ['I found... "just"s', 'I\'ll cut...'],
  },
  deepen: {
    title: 'The one-softener rule',
    summary: 'For a week, allow yourself one softener per request, maximum. If a message needs more, the request itself probably needs rethinking.',
  },
  notes: 'Plain-language guidance (use vs utilise) consistent with plain English style guides (e.g. Plain English Campaign, GOV.UK style guide). Contractions acceptable in neutral business email per most modern style guides. Hedging/softeners: standard ELT pragmatics.',
};

export default lesson;
