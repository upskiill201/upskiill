import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 17 — less is more: editing down, and details/summary for "read more". */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Less is more',
  summary: 'Efua\'s second review: "Better. Now cut half." Kofi loves every word of his story. There\'s a way to keep the full story for people who want it, while everyone else sees just the short version.',
  minutes: 12,
  outcomes: ['Cut a section down to what visitors need', 'Hide extra detail behind a tap with details and summary', 'Write a summary line that makes people want to open it'],
  learn: [
    {
      kind: 'story',
      title: '"Now cut half"',
      beats: [
        { speaker: 'narrator', text: 'Tuesday. Efua reads the new page. Headings, lists, real quotes. She scrolls for a long time.' },
        { speaker: 'efua', text: 'Better. Much better. Now cut half.' },
        { speaker: 'kofi', text: 'HALF? Every word is important! The football injury is why I started making beats!' },
        { speaker: 'efua', text: 'It\'s a good story. For people who want it. The organiser wants three lines and a date.' },
        { speaker: 'tey', text: 'Both of them are right. Most visitors want the short version. A few want the whole story. HTML has an element for exactly that: a summary everyone sees, and details that open when you tap.' },
      ],
      choice: {
        prompt: 'What should Kofi do with his long story?',
        options: [
          {
            text: 'Keep a short About of three lines, and put the full story in a "read more" that opens on tap.',
            outcome: 'The organiser gets three lines. Clinton taps "The full story" and reads every word. Everyone gets what they came for.',
            best: true,
          },
          {
            text: 'Delete the whole story.',
            outcome: 'The page is short, but the injury story is the best thing on it. Fans who\'d love it never get the chance.',
          },
          {
            text: 'Keep everything. Efua is wrong.',
            outcome: 'The organiser scrolls past four screens of story and still can\'t find the price. Efua was not wrong.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Tap to read more',
      caption: 'Tap "The full story" in the page. details hides its content until someone opens it; summary is the line they tap.',
      code: '<h2>About me</h2>\n<p>Producer from Osu, Accra. Beats made on a phone. Next gig: Saturday the 14th.</p>\n<details>\n  <summary>The full story</summary>\n  <p>At 14 I broke my ankle playing football and spent three months indoors with my uncle\'s old phone. I made a beat every day.</p>\n</details>\n',
      challenge: 'Change the summary to something that makes people want to tap it.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Short version for everyone, full version for anyone who taps. details and summary work without any JavaScript.',
    },
  ],
  apply: {
    scenario: 'Kofi cuts his About section down.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does details do?',
        options: [
          { text: 'Deletes the text inside it', why: 'Nothing is deleted. It\'s hidden until someone taps the summary.' },
          { text: 'Hides its content until someone taps the summary' },
          { text: 'Makes the text smaller', why: 'That\'s small. details hides and shows.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Hide Kofi\'s long story behind a tap: a details with the summary The full story and the paragraph inside',
        starter: '<p>At 14 I broke my ankle and made a beat every day.</p>\n',
        solution: '<details>\n  <summary>The full story</summary>\n  <p>At 14 I broke my ankle and made a beat every day.</p>\n</details>\n',
        hint: 'Wrap the p in details, and add <summary>The full story</summary> as the first thing inside.',
        checks: [
          { message: 'A details element', dom: { selector: 'details', count: 1 } },
          { message: 'Its summary says The full story', dom: { selector: 'details > summary', text: 'The full story' } },
          { message: 'The story is inside it', dom: { selector: 'details p', text: 'broke my ankle' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Short version (always shown), or behind "read more"?',
        groups: ['Always shown', 'Behind read more'],
        items: [
          { text: 'Next gig date', group: 0 },
          { text: 'The football injury story', group: 1 },
          { text: 'One line about what he makes', group: 0 },
          { text: 'Every beat he made at 14', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which summary line makes people want to tap?',
        options: [
          { text: 'More', why: 'More of what? Give people a reason to tap.' },
          { text: 'Click here', why: 'Says nothing about what\'s inside.' },
          { text: 'How a broken ankle started Mensah Beats' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'So you didn\'t cut anything. You just hid it?',
        options: [
          { text: 'I cut the About to three lines. The full story is there for anyone who taps.' },
          { text: 'Yes, I tricked you.', why: 'It isn\'t a trick: the short version really is short, and the long one is optional.' },
          { text: 'I deleted it all.', why: 'He didn\'t, and it\'s better that he didn\'t. Fans love that story.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the read more in order.',
        language: 'html',
        lines: ['<details>', '<summary>The full story</summary>', '<p>At 14 I broke my ankle...</p>', '</details>'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the sentence that doesn\'t belong in a three-line About.',
        lines: ['Producer from Osu, Accra.', 'Beats made on a phone.', 'My uncle\'s phone was a Nokia from 2011 with a cracked screen and a battery that lasted forty minutes.', 'Next gig: Saturday the 14th.'],
        bug: 2,
        explanation: 'A great detail, but it belongs in the full story behind the tap, not the short version.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the read more.',
        language: 'html',
        template: '<details>\n  <[[1]]>The full story</[[2]]>\n  <p>...</p>\n</details>',
        blanks: [['summary'], ['summary']],
        distractors: ['title', 'h2', 'more'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which element is the line people tap to open details?',
        answers: ['summary', '<summary>'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Build the cut-down About: an h2 About me, one short paragraph, then a details with a summary and the long story inside',
        starter: '',
        solution: '<h2>About me</h2>\n<p>Producer from Osu, Accra.</p>\n<details>\n  <summary>How a broken ankle started Mensah Beats</summary>\n  <p>At 14 I broke my ankle and made a beat every day.</p>\n</details>\n',
        hint: 'h2, p, then details containing summary and p.',
        checks: [
          { message: 'A heading About me', dom: { selector: 'h2', text: 'About me' } },
          { message: 'A short paragraph everyone sees', dom: { selector: 'body > p', min: 1 } },
          { message: 'A summary to tap', dom: { selector: 'details > summary:not(:empty)', count: 1 } },
          { message: 'The long story inside the details', dom: { selector: 'details p', min: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the "full story" on your own page that only some visitors will want? What\'s the three-line version?',
    starters: ['My three-line version is...', 'The full story would be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find an FAQ page on any website. Many use details and summary: tap a question to open the answer. View the source and look for them.',
  },
  notes: 'HTML Living Standard §4.11.1 details ("a disclosure widget from which the user can obtain additional information or controls") and §4.11.2 summary (first child: the summary/caption). Works without scripts, so it works in the runner\'s sandboxed preview.',
};

export default lesson;
