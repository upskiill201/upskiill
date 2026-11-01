import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 16 — meaning vs looks: b/i vs strong/em, and headings are not for size. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Bold isn\'t a heading',
  summary: 'Kofi found a page online where every "heading" is just bold text, and another where tiny notes are h1s. Myth or fact: what HTML tags are really for, and why meaning beats looks.',
  minutes: 12,
  outcomes: ['Pick tags for meaning, not for how they look', 'Know the difference between b and strong, i and em', 'Replace a fake heading with a real one'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'If text is big and bold, it\'s a heading.', isFact: false, explain: 'A heading is a heading because of its tag, not its looks. A bold paragraph looks like a heading but screen readers and search engines don\'t see one. Use h2, h3...' },
        { text: 'You should pick h3 instead of h2 if you want smaller text.', isFact: false, explain: 'Heading levels are about the outline of the page, not size. Size is CSS\'s job (Chapter 4). Pick the level that fits the structure.' },
        { text: 'b and strong both look bold, but they mean different things.', isFact: true, explain: 'strong means "important". b just draws attention without extra importance, like a product name in a review. Same look, different meaning.' },
        { text: 'i and em are the same tag with different names.', isFact: false, explain: 'em means stress ("I did NOT"). i is for words in a different voice: a foreign word like "akwaaba", a thought, a technical term. Both look italic.' },
        { text: 'Choosing tags for their meaning helps screen readers and search engines.', isFact: true, explain: 'They read the tags, not the looks. A real heading is announced as a heading; a real list as a list. Meaning first, looks later with CSS.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Fake heading vs real heading',
      caption: 'They look almost the same. Only the second one is a heading that screen readers and search engines can find.',
      code: '<p><b>Gigs</b></p>\n<p>Sound Up Saturdays.</p>\n\n<h2>Gigs</h2>\n<p>Sound Up Saturdays.</p>\n',
      challenge: 'Delete the fake heading version, so only the real h2 is left.',
    },
  ],
  apply: {
    scenario: 'Kofi checks his tags mean what they say.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Turn the fake heading into a real one: replace the bold paragraph with an h2 Gigs',
        starter: '<p><b>Gigs</b></p>\n<p>Sound Up Saturdays, Osu.</p>\n',
        solution: '<h2>Gigs</h2>\n<p>Sound Up Saturdays, Osu.</p>\n',
        hint: 'Replace the whole first line with <h2>Gigs</h2>.',
        checks: [
          { message: 'A real heading Gigs', dom: { selector: 'h2', text: 'Gigs' } },
          { message: 'No fake bold heading left', dom: { selector: 'b', count: 0 } },
          { message: 'The gig paragraph is still there', dom: { selector: 'p', text: 'Sound Up Saturdays' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tag to its meaning.',
        pairs: [
          ['strong', 'Important'],
          ['b', 'Draws attention, no extra importance'],
          ['em', 'Stressed, changes the meaning'],
          ['i', 'A different voice, like a foreign word'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi writes the Twi word akwaaba in an English sentence. Which tag fits?',
        options: [
          { text: 'em', why: 'em is for stress. A word from another language is i (with lang="tw" too).' },
          { text: 'i, with lang="tw"' },
          { text: 'h3', why: 'It\'s a word in a sentence, not a heading.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Chosen for meaning, or just for looks?',
        groups: ['For meaning', 'Just for looks'],
        items: [
          { text: 'h2 for each section of the page', group: 0 },
          { text: 'h4 because it\'s a nice size', group: 1 },
          { text: 'strong on "doors close at 10pm"', group: 0 },
          { text: 'A bold paragraph pretending to be a heading', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Write: We say akwaaba to every guest, with akwaaba in i and marked as Twi with lang="tw"',
        starter: '',
        solution: '<p>We say <i lang="tw">akwaaba</i> to every guest.</p>\n',
        hint: '<i lang="tw">akwaaba</i> inside the paragraph.',
        checks: [
          { message: 'akwaaba is in i', dom: { selector: 'p i', text: 'akwaaba' } },
          { message: 'It\'s marked as Twi', dom: { selector: 'i', attr: 'lang', attrValue: 'tw' } },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'My h2s are too big, so I changed them all to h5. Fixed!',
        options: [
          { text: 'Fixed!', why: 'Now the outline says these are tiny sub-sub-sections. The size problem belongs to CSS.' },
          { text: 'Keep them as h2 for the structure. We\'ll make them smaller with CSS in Chapter 4.' },
          { text: 'Use bold paragraphs instead.', why: 'Then they aren\'t headings at all.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does a screen reader announce as a heading here?',
        code: '<p><b>About me</b></p>\n<h2>Gigs</h2>',
        language: 'html',
        options: [
          { text: 'About me and Gigs', why: 'About me is a bold paragraph, not a heading.' },
          { text: 'Neither', why: 'Gigs is a real h2.' },
          { text: 'Only Gigs' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that picks a tag just for its size.',
        language: 'html',
        lines: ['<h1>Mensah Beats</h1>', '<h2>Gigs</h2>', '<h6>Free entry before 9pm</h6>', '<p>Osu, Accra.</p>'],
        bug: 2,
        fix: '<p><small>Free entry before 9pm</small></p>',
        explanation: 'That\'s a side note, not a sixth-level heading. It\'s been made an h6 only because h6 is small.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which tag means "important" (not just bold)?',
        answers: ['strong', '<strong>'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the h6 side note: make it a paragraph with the text in small instead',
        starter: '<h2>Gigs</h2>\n<h6>Free entry before 9pm</h6>\n',
        solution: '<h2>Gigs</h2>\n<p><small>Free entry before 9pm</small></p>\n',
        hint: 'Replace <h6>...</h6> with <p><small>...</small></p>.',
        checks: [
          { message: 'No h6 left', dom: { selector: 'h6', count: 0 } },
          { message: 'The side note is in small', dom: { selector: 'p small', text: 'Free entry before 9pm' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Meaning first, looks later. Where else in life does getting the structure right first save you trouble?',
    starters: ['It\'s like...', 'In my life...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'View the source of any blog post. Are its headings real h2 and h3 tags, or bold paragraphs? Now you can tell.',
  },
  notes: 'HTML Living Standard §4.5.20 b ("draw attention... without conveying extra importance"), §4.5.19 i ("alternative voice or mood", e.g. a term from another language, with lang), §4.5.2 em, §4.5.3 strong; §4.3.6 headings and the outline. "Use the right element, not the right look" is the standard semantic-HTML principle (MDN, "HTML: A good basis for accessibility").',
};

export default lesson;
