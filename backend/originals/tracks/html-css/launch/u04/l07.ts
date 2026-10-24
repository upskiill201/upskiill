import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 7 — history: early search, links as votes, the meta keywords tag, mobile-first. Reading. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The keyword tag nobody reads',
  summary: 'Clinton finds an old tutorial that tells him to add a "meta keywords" tag full of words. Miracle explains why that trick stopped working long ago, and what the story of search teaches about doing it properly.',
  minutes: 12,
  outcomes: ['Describe how early search engines ranked pages', 'Explain why links became important', 'Explain why keyword tricks stopped working'],
  learn: [
    {
      kind: 'reading',
      title: 'From keyword tricks to useful pages',
      html:
        '<p>Early search engines in the mid-1990s, like AltaVista, mostly looked at the words on a page. Site owners quickly learned to cheat: they repeated popular words hundreds of times, hid them in white text on white backgrounds, and filled a tag called <strong>meta keywords</strong> with anything people might search for.</p>' +
        '<p>In <strong>1998</strong>, Google launched with a different idea. It treated <strong>links from other sites</strong> like votes: if many trustworthy pages link to yours, yours is probably useful. That was much harder to fake than repeating words, and search results got noticeably better.</p>' +
        '<p>Because meta keywords had been abused so badly, Google said in <strong>2009</strong> that it doesn\'t use the meta keywords tag for ranking at all. Old tutorials still mention it; you can skip it.</p>' +
        '<p>Since then search engines have kept getting better at spotting tricks and at judging whether a page actually helps people. They now look mainly at the <strong>mobile version</strong> of pages, and consider things like speed and whether a page works well on phones.</p>' +
        '<p>The lesson from thirty years of search is simple: tricks get caught; clear, useful, honest pages last.</p>',
    },
    {
      kind: 'tryIt',
      title: 'What to keep, what to skip',
      caption: 'The head of a modern page: no meta keywords, just what helps.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <meta name="description" content="Highlife-inspired beats from Accra. Listen free, see gigs, and book Kofi for your event.">\n  <style>body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }</style>\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
      challenge: 'Find the line that helps phone-first search most.',
    },
  ],
  apply: {
    scenario: 'The keyword tag nobody reads.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the events in order.',
        lines: ['Early search engines mostly count words', 'Google uses links like votes', 'Google says it ignores meta keywords', 'Search engines look mainly at phone versions'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did links from other sites become important?',
        options: [
          { text: 'Links make pages load faster', why: 'They\'re a signal of usefulness.' },
          { text: 'They don\'t matter', why: 'They became a major signal.' },
          { text: 'Trustworthy pages linking to yours are a sign it\'s useful, and that\'s hard to fake' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each to its year.',
        pairs: [
          ['Google launches', '1998'],
          ['Google says it ignores meta keywords', '2009'],
          ['HTML5 becomes a W3C Recommendation', '2014'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Still useful, or an old trick to skip?',
        groups: ['Still useful', 'Skip it'],
        items: [
          { text: 'A clear title', group: 0 },
          { text: 'meta keywords', group: 1 },
          { text: 'A meta description', group: 0 },
          { text: 'White text on a white background', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Clean up the old tutorial\'s head: delete the meta keywords line',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <meta name="keywords" content="beats, producer, accra, music, best, cheap, free">\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        hint: 'Remove the line with name="keywords".',
        checks: [
          { message: 'No meta keywords', dom: { selector: 'meta[name="keywords"]', count: 0 } },
          { message: 'The title is kept', dom: { selector: 'title', text: 'Mensah Beats' } },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'But the tutorial says meta keywords are essential!',
        options: [
          { text: 'It\'s an old tutorial. Google said in 2009 it doesn\'t use them for ranking. Spend the time on clear titles and content.' },
          { text: 'Then add 200 keywords.', why: 'They\'re ignored, and it\'s an old trick.' },
          { text: 'Tutorials are always right.', why: 'Old ones go out of date.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the statement that\'s wrong.',
        lines: ['Tricks like hidden text get caught.', 'The meta keywords tag is the most important ranking factor on Google.', 'Search engines mostly look at the phone version of pages.'],
        bug: 1,
        explanation: 'Google doesn\'t use meta keywords for ranking at all.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the lesson from thirty years of search?',
        options: [
          { text: 'Find the newest trick', why: 'Tricks keep getting caught.' },
          { text: 'Search is random', why: 'It rewards useful pages.' },
          { text: 'Tricks get caught; clear, useful, honest pages last' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the history.',
        template: 'Google treated [[1]] from other sites like votes, and ignores meta [[2]].',
        blanks: [['links'], ['keywords']],
        distractors: ['colours', 'descriptions', 'titles'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did Google launch? (a year)',
        answers: ['1998'],
        placeholder: 'A year',
      },
    ],
  },
  reflect: {
    prompt: 'Have you followed online advice that turned out to be out of date? How could you tell?',
    starters: ['I once...', 'Now I check...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "Google does not use the keywords meta tag in web ranking" and read the 2009 post.',
  },
  notes: 'AltaVista launched 1995. Google founded 1998; PageRank used links as a ranking signal. Google Webmaster Central blog, September 2009: keywords meta tag not used in web ranking. Mobile-first indexing is Google\'s default.',
};

export default lesson;
