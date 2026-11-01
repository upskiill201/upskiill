import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7 — writing for the web: front-loading, short sentences, how people read online. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Writing for the web',
  summary: 'Tags give a page its shape, but words do the work. Researchers have watched people read websites for decades, and what they found changes how Kofi writes every line.',
  minutes: 12,
  outcomes: ['Put the most important words first', 'Write short sentences and headings that say something', 'Turn a vague heading into a useful one'],
  learn: [
    {
      kind: 'reading',
      title: 'What researchers saw',
      html:
        '<p>In 1997, the usability researcher <strong>Jakob Nielsen</strong> tested how people read websites. The result surprised everyone: <strong>79 out of 100</strong> people scanned the page, and only <strong>16</strong> read it word by word.</p>' +
        '<p>Later, his team used <strong>eye-tracking</strong> cameras to follow exactly where people\'s eyes went. A common pattern looked like the letter F: people read across the top, then across a little lower, then just down the left edge, catching the first few words of each line.</p>' +
        '<p>So the first words of every heading, paragraph and list item carry most of the weight. Three habits follow:</p>' +
        '<ul><li><strong>Front-load.</strong> Put the important words first. "Saturday, 8pm: Mensah Beats live" beats "Come along and enjoy some music on Saturday".</li>' +
        '<li><strong>Headings that say something.</strong> "Next gig: Saturday" is useful. "Info" is not.</li>' +
        '<li><strong>Short sentences.</strong> One idea each. If a sentence has three "and"s, it\'s probably three sentences, or a list.</li></ul>',
    },
    {
      kind: 'tryIt',
      title: 'Front-load it',
      caption: 'Two versions of Kofi\'s gig section. Scan only the first three words of each line. Which one tells you more?',
      code: '<h2>Info</h2>\n<p>Come along and enjoy some music on Saturday at Sound Up Saturdays.</p>\n\n<h2>Next gig: Saturday, 8pm</h2>\n<p>Mensah Beats live at Sound Up Saturdays, Osu. Free entry.</p>\n',
      challenge: 'Delete the first version, so only the front-loaded one is left.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The first words do the work. Put what matters first, in headings and sentences.',
    },
  ],
  apply: {
    scenario: 'Kofi rewrites his page for scanners.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In Nielsen\'s 1997 study, how many people out of 100 scanned instead of reading word by word?',
        options: [
          { text: 'About 10', why: 'It was the opposite: most people scanned. 79 out of 100.' },
          { text: 'About 50', why: 'Far more: 79 out of 100 scanned.' },
          { text: '79' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which heading is best for Kofi\'s gig section?',
        options: [
          { text: 'Info', why: 'Info tells a scanner nothing. Say what the section is about.' },
          { text: 'Next gig: Saturday, 8pm' },
          { text: 'Some things you might want to know', why: 'Long and vague. The first words should carry the news.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Replace the vague heading Info with a useful one: Next gig: Saturday',
        starter: '<h2>Info</h2>\n<p>Sound Up Saturdays, Osu, 8pm.</p>\n',
        solution: '<h2>Next gig: Saturday</h2>\n<p>Sound Up Saturdays, Osu, 8pm.</p>\n',
        hint: 'Change only the words inside the h2.',
        checks: [
          { message: 'The heading says Next gig: Saturday', dom: { selector: 'h2', text: 'Next gig: Saturday' } },
          { message: 'The paragraph is still there', dom: { selector: 'p', text: 'Sound Up Saturdays' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Front-loaded, or important words buried?',
        groups: ['Front-loaded', 'Buried'],
        items: [
          { text: 'Free entry before 9pm', group: 0 },
          { text: 'If you come before 9pm, which we hope you will, entry is free', group: 1 },
          { text: 'New beat: Night Bus to Kumasi', group: 0 },
          { text: 'There is something new that I made, a beat called Night Bus', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the sentence that should be split up.',
        lines: ['I make beats in Accra.', 'I started at 14 and I used my uncle\'s phone and I made a beat every day and I never stopped.', 'My next gig is Saturday.'],
        bug: 1,
        explanation: 'Four "and"s in one sentence. That\'s four short sentences, or a list.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Your heading says "Welcome to my website". Do I need to be told that?',
        options: [
          { text: 'It\'s polite.', why: 'Polite, but it wastes the most-read words on the page. Say who you are and what you do.' },
          { text: 'Fair. I\'ll make it "Mensah Beats: beats from Accra".' },
          { text: 'Everyone writes that.', why: 'Which is why visitors skip it. Front-load something useful.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s three habits.',
        template: '[[1]] the important words, write headings that say something, keep sentences [[2]].',
        blanks: [['Front-load'], ['short']],
        distractors: ['Hide', 'long', 'bold'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Eye-tracking showed a common reading pattern shaped like which letter?',
        answers: ['f', 'F'],
        placeholder: 'One letter',
      },
      {
        kind: 'writeCode',
        prompt: 'Turn the long sentence into a short heading and a list: an h2 How I started, then a ul with Age 14, My uncle\'s phone, One beat a day',
        starter: '<p>I started at 14 and I used my uncle\'s phone and I made one beat a day.</p>\n',
        solution: '<h2>How I started</h2>\n<ul>\n  <li>Age 14</li>\n  <li>My uncle\'s phone</li>\n  <li>One beat a day</li>\n</ul>\n',
        hint: 'Replace the p with an h2 and a ul with three li.',
        checks: [
          { message: 'A heading How I started', dom: { selector: 'h2', text: 'How I started' } },
          { message: 'Three short list items', dom: { selector: 'ul > li', count: 3 } },
          { message: 'The long sentence is gone', dom: { selector: 'p', count: 0 } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each vague heading to a better one.',
        pairs: [
          ['Info', 'Next gig: Saturday, 8pm'],
          ['Stuff', 'My top 3 beats'],
          ['Contact', 'Book me for your event'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Look at the first heading on your own page. Does it tell a scanner something useful in its first three words?',
    starters: ['My heading says...', 'I could change it to...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find a website you like and read only the first three words of each heading. Does it still make sense? That\'s front-loading.',
  },
  notes: 'Sources: Jakob Nielsen, "How Users Read on the Web" (Nielsen Norman Group, 1 October 1997): 79% of test users scanned, 16% read word by word. Nielsen, "F-Shaped Pattern For Reading Web Content" (NN/g, 17 April 2006), eye-tracking study; NN/g notes the F is one common pattern, not the only one.',
};

export default lesson;
