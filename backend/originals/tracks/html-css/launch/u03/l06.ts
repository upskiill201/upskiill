import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 6 — keyboard use: tab order follows HTML, real links and buttons, no positive tabindex. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Only a keyboard',
  summary: 'David broke his wrist playing football, so for six weeks he\'s using the site with only a keyboard. One part of the page he can\'t reach at all. Tey explains how keyboard users move around, and what stops them.',
  minutes: 11,
  outcomes: ['Explain how keyboard users move through a page', 'Use real links and buttons so things can be reached', 'Keep the tab order the same as the reading order'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Tab moves forward through things you can use: links, buttons, form fields. Shift+Tab moves back. Enter follows a link or presses a button; Space presses a button or ticks a box.',
          replies: ['What can\'t David reach?'],
        },
        {
          tey: 'Anything that only looks pressable. Kofi\'s "Listen" box is a styled span, not a link or a button. The keyboard skips it completely. Real a and button elements can be reached and used for free.',
          replies: ['What order does Tab go in?'],
        },
        {
          tey: 'The order of the HTML. That\'s another reason to keep the HTML in a sensible reading order and not rearrange things only with CSS.',
          replies: ['I saw something called tabindex.'],
        },
        {
          tey: 'tabindex="0" can make something focusable, but if it should be pressable, use a real link or button instead. Never use a positive number like tabindex="5": it jumps the queue and confuses everyone.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Tab through it',
      caption: 'Click in the preview, then press Tab. The styled span never gets focus; the real link does.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .listen { display: inline-block; margin: 8px; padding: 12px 20px; background-color: #FF9600; color: #14213D; border-radius: 8px; }\n  :focus-visible { outline: 3px solid #FFC83D; outline-offset: 3px; }\n</style>\n<span class="listen">Listen (span)</span>\n<a class="listen" href="#play">Listen (link)</a>\n',
      challenge: 'Change the span to <a href="#play">. Now Tab reaches both.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'If it\'s pressable, make it a real link (goes somewhere) or button (does something). Tab follows the HTML order.',
    },
  ],
  apply: {
    scenario: 'Only a keyboard.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why can\'t David reach the "Listen" box?',
        options: [
          { text: 'It\'s a styled span, not a link or button, so the keyboard skips it' },
          { text: 'His keyboard is broken', why: 'The element can\'t take focus.' },
          { text: 'It\'s too small', why: 'Size doesn\'t matter to Tab.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make it reachable: change the span to a link with href="#play" (keep the class)',
        starter: '<span class="listen">Listen</span>\n',
        solution: '<a class="listen" href="#play">Listen</a>\n',
        hint: '<a class="listen" href="#play">Listen</a>',
        checks: [
          { message: 'A real link', dom: { selector: 'a.listen[href]', count: 1 } },
          { message: 'No fake button left', dom: { selector: 'span.listen', count: 0 } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each key to what it does.',
        pairs: [
          ['Tab', 'Next link, button or field'],
          ['Shift+Tab', 'Back one'],
          ['Enter', 'Follow a link or press a button'],
          ['Space', 'Press a button or tick a box'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Link or button?',
        groups: ['Link (goes somewhere)', 'Button (does something)'],
        items: [
          { text: 'Go to the gigs section', group: 0 },
          { text: 'Send the booking form', group: 1 },
          { text: 'Open Kofi\'s Instagram', group: 0 },
          { text: 'Tick the news box', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Can I add tabindex="1" to the Book me button so people reach it first?',
        options: [
          { text: 'Positive tabindex jumps the queue and confuses people. Move Book me earlier in the HTML instead.' },
          { text: 'Yes, tabindex 1 is perfect.', why: 'It breaks the natural order.' },
          { text: 'Use tabindex 99.', why: 'Even more confusing.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that messes up the tab order.',
        language: 'html',
        lines: ['<a href="#beats">Beats</a>', '<a href="#book" tabindex="3">Book me</a>', '<button type="submit">Send</button>'],
        bug: 1,
        explanation: 'A positive tabindex makes this jump ahead of everything else. Remove it.',
        fix: '<a href="#book">Book me</a>',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'In what order does Tab visit these?',
        code: '<a href="#beats">Beats</a>\n<a href="#gigs">Gigs</a>\n<button>Send</button>',
        language: 'html',
        options: [
          { text: 'Beats, Gigs, Send: the HTML order' },
          { text: 'Send first', why: 'Tab follows the HTML.' },
          { text: 'Random', why: 'It\'s the HTML order.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make the box reachable.',
        language: 'html',
        template: '<[[1]] class="listen" [[2]]="#play">Listen</a>',
        blanks: [['a'], ['href']],
        distractors: ['span', 'tabindex', 'class'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which key moves to the next link or button? (one word)',
        answers: ['tab'],
        placeholder: 'A key',
      },
      {
        kind: 'mcq',
        prompt: 'A link without an href, like <a>Play</a>. Can Tab reach it?',
        options: [
          { text: 'No: without href it isn\'t a real link' },
          { text: 'Yes', why: 'It needs href to be focusable.' },
          { text: 'Only with a mouse', why: 'It isn\'t focusable at all.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Put your mouse away and use your page for two minutes. What couldn\'t you reach?',
    starters: ['I couldn\'t reach...', 'I\'ll change it to...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Use your page with only Tab, Shift+Tab, Enter and Space. Turn anything you can\'t reach into a real link or button.',
  },
  notes: 'Natively focusable: a[href], button, form controls. WCAG 2.1.1 Keyboard, 2.4.3 Focus Order. Positive tabindex is an anti-pattern (MDN). Buttons are for actions; without JavaScript, the course\'s buttons submit forms.',
};

export default lesson;
