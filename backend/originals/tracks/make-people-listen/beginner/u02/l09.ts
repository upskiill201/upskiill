import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. "Line Check" (Tap to explore): the email Mr Rao finally read, and replied to in four minutes. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line Check: the email that finally got read',
  summary: 'Mr Rao replied to Arjun\'s new email in four minutes: "Yes. Delay it. Thank you for making it so clear." Arjun is stunned. Tey reads the email on air, line by line, to see exactly what worked.',
  minutes: 11,
  outcomes: [
    'See every Chapter 2 tool working in one real message',
    'Check your own message line by line before sending',
    'Know what a busy reader needs in the first two lines',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Arjun\'s email (read in full, replied to in 4 minutes)',
      text: 'Subject: Next sale: please give me 48 hours first. Hi Mr Rao, please don\'t schedule the next sale until I\'ve added more tills. Right now your website is like a shop with one till: when too many people pay at once, it jams. Last time, about one in four customers couldn\'t pay, and we lost more than your Diwali ad budget. Three things will fix it: payments first, then stock, then passwords. Could you confirm by Friday? Technical details are below if you want them.',
      hotspots: [
        { phrase: 'Next sale: please give me 48 hours first', note: 'The subject line IS the action. Mr Rao knows what this email wants before he opens it.' },
        { phrase: 'please don\'t schedule the next sale until I\'ve added more tills', note: 'BLUF: bottom line up front. The action is sentence one, not paragraph four.' },
        { phrase: 'like a shop with one till', note: 'The comparison. Expert knowledge, translated into Mr Rao\'s world.' },
        { phrase: 'about one in four customers couldn\'t pay', note: 'A number people can feel: rounded and turned into "1 in X".' },
        { phrase: 'more than your Diwali ad budget', note: 'Compared to something Mr Rao knows by heart. Now the loss has a size.' },
        { phrase: 'Three things will fix it', note: 'Signposting: three, ranked, not twelve. The full list lives in the details.' },
        { phrase: 'Could you confirm by Friday?', note: 'One clear request, with a deadline. Mr Rao knows exactly what to reply.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Before you send: action in the subject? Answer in line one? Plain words? A number they can feel? A clear ask?',
    },
  ],
  apply: {
    scenario: 'Tey FM, Line Check.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Mr Rao reply in four minutes this time?',
        options: [
          { text: 'The action, the reason and the ask were all in the first few lines, in plain words' },
          { text: 'The email was longer', why: 'It was much shorter.' },
          { text: 'He was less busy', why: 'He was just as busy. The email was different.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 2 tool is it?',
        groups: ['BLUF', 'Comparison', 'Number they can feel'],
        items: [
          { text: 'Subject: please give me 48 hours first', group: 0 },
          { text: 'A shop with one till', group: 1 },
          { text: 'About one in four customers', group: 2 },
          { text: 'More than your Diwali ad budget', group: 2 },
          { text: 'Sentence one is the action', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the email\'s parts in order.',
        lines: ['Subject line: the action', 'First sentence: the action again', 'Why, in a comparison', 'The cost, in numbers they can feel', 'The three-part fix', 'The ask, with a deadline'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'It feels too simple. Won\'t Mr Rao think I\'m less of an expert?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Add jargon back in to be safe.', why: 'That\'s how the first sale crashed.' },
          { text: 'He thinks you\'re the expert who saved his next sale. The details are there for anyone who checks.' },
          { text: 'Yes, so stop emailing him.', why: 'Not the lesson.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The email ends with one clear ___ and a deadline. (one word)',
        answers: ['ask', 'request', 'question'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s next email. Which line would fail the Line Check?',
        lines: [
          'Subject: Please approve the new payment provider by Tuesday.',
          'Hi Mr Rao, I\'d like to switch to a faster payment provider.',
          'It processes asynchronous webhooks with idempotent retry semantics.',
          'Could you approve by Tuesday?',
        ],
        bug: 2,
        fix: 'It\'s like adding three more tills, so checkout won\'t jam.',
        explanation: 'Back to expert-speak. Keep the comparison in Mr Rao\'s world.',
      },
      {
        kind: 'mcq',
        prompt: 'Where did the diagrams and technical details go?',
        options: [
          { text: 'Below the main message, for anyone who wants them' },
          { text: 'Deleted forever', why: 'Not deleted, just moved.' },
          { text: 'Into the subject line', why: 'Definitely not.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Round it', '"About one in four"'],
          ['Shrink it', 'Per hour, not total'],
          ['Compare it', 'To their own budget'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The Line Check questions.',
        template: 'Action in the [[1]]? Answer in line [[2]]? A clear [[3]]?',
        blanks: [['subject'], ['one'], ['ask', 'request']],
        distractors: ['diagram', 'four'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the email\'s ask.',
        tiles: ['Could', 'you', 'confirm', 'by', 'Friday?'],
        distractors: ['maybe', 'whenever'],
      },
    ],
  },
  reflect: {
    prompt: 'Take an important email or message you\'ve drafted. Run the Line Check on it. What would you change?',
    starters: ['Subject line: ...', 'First sentence: ...', 'The ask: ...'],
  },
  deepen: {
    title: 'The two-line test',
    summary: 'Before sending anything important, read only the subject and the first two lines. If someone read nothing else, would they know what to do? If not, rewrite before you send.',
  },
  notes: 'Synthesis of Chapter 2 tools in one message (BLUF, comparison, natural frequencies, familiar comparison, signposting, clear ask). Explore hotspot phrases appear verbatim in the text.',
};

export default lesson;
