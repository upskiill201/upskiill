import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 13 — small print and highlights: small and mark. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Small print and highlights',
  summary: 'The organiser asks Kofi to add the fine print ("Under-16s with an adult") and to highlight that the date changed. Two small tags: small for side notes, mark for "look at this bit".',
  minutes: 11,
  outcomes: ['Use small for side notes and fine print', 'Use mark to highlight what\'s relevant right now', 'Choose between mark, strong and small'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Voice note from the organiser: "Two things. Please add the small print: under-16s must come with an adult. And the date moved to the 14th, highlight that so nobody comes on the wrong day."',
          replies: ['Small print?', 'Highlight how?'],
        },
        {
          tey: 'Small print first. The small tag is for side comments: fine print, legal notes, "terms apply". Browsers show it a bit smaller. It\'s not for shrinking text you don\'t like; it\'s for text that\'s a side note.',
          replies: ['And the highlight?'],
        },
        {
          tey: 'mark. It highlights text that\'s relevant right now, like a highlighter pen on a printout. Browsers give it a yellow background. "The date moved to the 14th" is exactly that.',
          replies: ['Why not strong?'],
        },
        {
          tey: 'Good question. strong says "this is important, always". mark says "look at this bit, right now". The date change matters for this week; next month it won\'t. That\'s mark.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Fine print and a highlight',
      caption: 'small makes the side note smaller. mark highlights the date change.',
      code: '<h2>Next gig</h2>\n<p>Sound Up Saturdays, <mark>now on the 14th</mark>.</p>\n<p><small>Under-16s must come with an adult.</small></p>\n',
      challenge: 'Add another side note in small: Free entry before 9pm only.',
    },
  ],
  apply: {
    scenario: 'Kofi adds the organiser\'s changes.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each tag to its job.',
        pairs: [
          ['small', 'Side notes and fine print'],
          ['mark', 'Highlighted: relevant right now'],
          ['strong', 'Important, always'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Highlight now on the 14th with mark',
        starter: '<p>Sound Up Saturdays, now on the 14th.</p>\n',
        solution: '<p>Sound Up Saturdays, <mark>now on the 14th</mark>.</p>\n',
        hint: '<mark>now on the 14th</mark>',
        checks: [
          { message: 'The date change is highlighted', dom: { selector: 'p mark', text: 'now on the 14th' } },
          { message: 'Only the date change is highlighted', dom: { selector: 'mark', count: 1 } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which belongs in small?',
        options: [
          { text: 'The name of the event', why: 'That\'s a main fact, not a side note.' },
          { text: 'Under-16s must come with an adult' },
          { text: 'The gig date', why: 'The date is central. small is for side notes.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add the fine print under the gig: a paragraph with Under-16s must come with an adult in small',
        starter: '<p>Sound Up Saturdays, Osu.</p>\n',
        solution: '<p>Sound Up Saturdays, Osu.</p>\n<p><small>Under-16s must come with an adult.</small></p>\n',
        hint: '<p><small>...</small></p> under the first paragraph.',
        checks: [
          { message: 'The fine print is in small', dom: { selector: 'small', text: 'Under-16s must come with an adult' } },
          { message: 'It sits in its own paragraph', dom: { selector: 'p small', min: 1 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'mark, strong or small?',
        groups: ['mark', 'strong', 'small'],
        items: [
          { text: 'The date moved this week', group: 0 },
          { text: 'Doors close at 10pm, always', group: 1 },
          { text: 'Terms apply', group: 2 },
          { text: 'The word you searched for, in results', group: 0 },
          { text: 'Under-16s with an adult', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How does mark look by default?',
        code: '<p>Now on the <mark>14th</mark></p>',
        language: 'html',
        options: [
          { text: '14th with a yellow highlight' },
          { text: '14th in bold', why: 'That\'s strong. mark gives a highlight background.' },
          { text: '14th smaller', why: 'That\'s small. mark highlights.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'My About section is too long, so I\'ll just put it all in small. Problem solved.',
        options: [
          { text: 'Problem solved.', why: 'Shrinking text doesn\'t make it shorter, just harder to read. small is for side notes.' },
          { text: 'small is for side notes, not for squeezing text. Cut the words instead.' },
          { text: 'Use mark on all of it instead.', why: 'Highlighting everything means nothing stands out.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the fine print.',
        language: 'html',
        template: '<p><[[1]]>Terms apply.</[[2]]></p>',
        blanks: [['small'], ['small']],
        distractors: ['mark', 'tiny', 'em'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which tag works like a highlighter pen?',
        answers: ['mark', '<mark>'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'The full update: a paragraph Sound Up Saturdays, now on the 14th (with now on the 14th in mark), then a paragraph with Free entry before 9pm in small',
        starter: '',
        solution: '<p>Sound Up Saturdays, <mark>now on the 14th</mark>.</p>\n<p><small>Free entry before 9pm.</small></p>\n',
        hint: 'Two paragraphs: one with a mark, one with a small.',
        checks: [
          { message: 'The date change is highlighted', dom: { selector: 'mark', text: 'now on the 14th' } },
          { message: 'The fine print is small', dom: { selector: 'small', text: 'Free entry before 9pm' } },
          { message: 'Two paragraphs', dom: { selector: 'p', count: 2 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What on your own page is "important always", and what is "relevant right now"?',
    starters: ['Always important on my page...', 'Right now, I\'d highlight...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Search for something on any site and look at the results: the words you searched for are often highlighted. That\'s mark\'s job.',
  },
  notes: 'HTML Living Standard §4.5.4 small ("side comments such as small print"; "not intended to be presentational"), §4.5.23 mark ("highlighted for reference purposes, due to its relevance in another context", e.g. search results). Default rendering of mark: yellow background.',
};

export default lesson;
