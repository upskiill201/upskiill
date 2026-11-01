import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 11 — real quotes only: blockquote and cite. Honesty choice: an invented quote from a famous DJ. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Real quotes only',
  summary: 'Kofi wants a "What people say" section. He has real quotes from fans, and a very tempting idea: make up a quote from a famous Accra DJ. Nobody would check. Would they?',
  minutes: 12,
  outcomes: ['Mark up a quote with blockquote', 'Say who said it with cite', 'Explain why a website only quotes what people really said'],
  learn: [
    {
      kind: 'story',
      title: 'Nobody would check',
      beats: [
        { speaker: 'narrator', text: 'Friday night. Kofi is building a "What people say" section. He has three real quotes: Clinton ("hardest beat in Buea"), David ("I listened to Night Bus four times"), and a stranger who commented "this one slaps".' },
        { speaker: 'kofi', text: 'They\'re good. But imagine if a famous DJ had said something. "The future of Accra sound." Who would ever check?' },
        { speaker: 'narrator', text: 'He types the made-up quote. It looks amazing. He shows Ama.' },
        { speaker: 'ama', text: 'When did he say that? Did you meet him? Can I meet him?' },
        { speaker: 'tey', text: 'Here\'s the thing about websites: they\'re public, they\'re permanent, and people screenshot everything. Accra\'s music scene is small. The DJ could see it. So could the organiser of Sound Up Saturdays.' },
      ],
      choice: {
        prompt: 'What should Kofi do?',
        options: [
          {
            text: 'Delete the fake quote and use the three real ones, with names.',
            outcome: 'The real quotes are smaller, but they\'re true, and Clinton is thrilled to be quoted. When a real DJ says something one day, it\'ll mean something.',
            best: true,
          },
          {
            text: 'Keep it, but leave off the DJ\'s name.',
            outcome: 'A quote from "a famous DJ" with no name looks invented, because it is. Visitors trust named, real quotes.',
          },
          {
            text: 'Keep it. Everyone exaggerates online.',
            outcome: 'Two weeks later the DJ\'s friend sees it. Kofi\'s first gig starts with an awkward apology. Fake quotes cost more than they bring.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'What people say',
      caption: 'blockquote marks a quote from someone else. The browser indents it. A cite inside the paragraph under it names the source.',
      code: '<h2>What people say</h2>\n<blockquote>\n  <p>Hardest beat in Buea.</p>\n</blockquote>\n<p>Clinton, <cite>the group chat</cite></p>\n',
      challenge: 'Add a second quote from David: I listened to Night Bus four times.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'blockquote is for words someone else really said. cite names where they came from. Never invent a quote: websites are public, and people check.',
    },
  ],
  apply: {
    scenario: 'Kofi builds a "What people say" section.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is blockquote for?',
        options: [
          { text: 'Making any text indented', why: 'It does indent, but its job is to mark words someone else said. Indenting is CSS\'s job.' },
          { text: 'A quote from someone else' },
          { text: 'Code examples', why: 'Code has its own tags. blockquote is for quotes.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Put Clinton\'s quote in a blockquote: Hardest beat in Buea.',
        starter: '<h2>What people say</h2>\n<p>Hardest beat in Buea.</p>\n',
        solution: '<h2>What people say</h2>\n<blockquote>\n  <p>Hardest beat in Buea.</p>\n</blockquote>\n',
        hint: 'Wrap the p in <blockquote> and </blockquote>.',
        checks: [
          { message: 'The quote is in a blockquote', dom: { selector: 'blockquote', text: 'Hardest beat in Buea' } },
          { message: 'The quote is a paragraph inside it', dom: { selector: 'blockquote p', min: 1 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'OK to quote on Kofi\'s site, or not?',
        groups: ['OK to quote', 'Not OK'],
        items: [
          { text: 'What Clinton really said, with his name', group: 0 },
          { text: 'Words Kofi invented for a famous DJ', group: 1 },
          { text: 'A real fan comment, credited', group: 0 },
          { text: 'A "review" Kofi wrote himself under a fake name', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'Did the famous DJ REALLY say that about you?',
        options: [
          { text: 'Sort of.', why: 'Ama is ten and already sees through it. So will visitors.' },
          { text: 'He would have, if he\'d heard it.', why: 'That\'s still an invented quote. Real ones only.' },
          { text: 'Not yet. I\'m taking it down and using real quotes from people who heard my beats.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Under the quote, credit David: a paragraph David, with Night Bus to Kumasi in a cite',
        starter: '<blockquote>\n  <p>I listened to it four times.</p>\n</blockquote>\n',
        solution: '<blockquote>\n  <p>I listened to it four times.</p>\n</blockquote>\n<p>David, on <cite>Night Bus to Kumasi</cite></p>\n',
        hint: 'A new p under the blockquote: <p>David, on <cite>Night Bus to Kumasi</cite></p>',
        checks: [
          { message: 'David is credited', dom: { selector: 'p', text: 'David' } },
          { message: 'The beat\'s name is in a cite', dom: { selector: 'cite', text: 'Night Bus to Kumasi' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does cite hold?',
        options: [
          { text: 'The whole quote', why: 'The quote goes in blockquote. cite holds the title of the source.' },
          { text: 'The title of the work being quoted or talked about' },
          { text: 'A link', why: 'Links are a different tag, coming in Chapter 3.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tag to its job.',
        pairs: [
          ['blockquote', 'Words someone else said'],
          ['cite', 'The title of the source'],
          ['p', 'A paragraph inside or outside the quote'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the quote.',
        language: 'html',
        template: '<[[1]]>\n  <p>This one slaps.</p>\n</[[2]]>',
        blanks: [['blockquote'], ['blockquote']],
        distractors: ['quote', 'cite', 'q'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which tag marks a long quote from someone else?',
        answers: ['blockquote', '<blockquote>'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Build the section: an h2 What people say, then two quotes in blockquotes: Hardest beat in Buea, and This one slaps',
        starter: '',
        solution: '<h2>What people say</h2>\n<blockquote>\n  <p>Hardest beat in Buea.</p>\n</blockquote>\n<blockquote>\n  <p>This one slaps.</p>\n</blockquote>\n',
        hint: 'An h2, then two blockquotes, each with a p inside.',
        checks: [
          { message: 'A heading What people say', dom: { selector: 'h2', text: 'What people say' } },
          { message: 'Two quotes', dom: { selector: 'blockquote', count: 2 } },
          { message: 'This one slaps is quoted', dom: { selector: 'blockquote', text: 'This one slaps' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever seen a review or quote online that you later found out was fake? How did it change what you thought of the seller?',
    starters: ['I once saw...', 'After that I...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask one real friend for one sentence about something you made. Put it on your playground page in a blockquote, with their name.',
  },
  notes: 'HTML Living Standard §4.4.4 blockquote ("a section that is quoted from another source"), §4.5.6 cite ("the title of a work"; the spec says a person\'s name is not a title, so names go in plain text). Honesty choice per playbook §8a.7. The famous DJ is unnamed and fictional.',
};

export default lesson;
