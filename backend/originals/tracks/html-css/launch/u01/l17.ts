import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 17 — honest data: a privacy line, an unticked opt-in, nothing extra. Story choice. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'What happens to my details?',
  summary: 'Kofi wants to grow a fan list, so he plans to add the organiser\'s email to his newsletter automatically, "since they\'re already typing it". Efua asks him how he\'d feel if a site did that to him. Choose what the form does.',
  minutes: 11,
  outcomes: ['Explain what happens to the details people type into a form', 'Add a short, honest privacy line', 'Offer an opt-in that starts unticked'],
  learn: [
    {
      kind: 'story',
      title: 'Since they\'re already typing it',
      beats: [
        { speaker: 'kofi', text: 'Everyone who books me is basically a fan. I\'ll just add their email to my newsletter.' },
        { speaker: 'efua', text: 'Remember the shop that started emailing you every day after one order?' },
        { speaker: 'kofi', text: '...I unsubscribed and never went back.' },
        { speaker: 'tey', text: 'People should know what happens to what they type, and choose anything extra themselves.' },
      ],
      choice: {
        prompt: 'What should the form do with people\'s details?',
        options: [
          {
            text: 'A short line saying the details are only used to reply about the booking, plus an unticked "Send me news about new beats" checkbox.',
            outcome: 'People trust the form. Some tick the box, and those fans actually want the emails.',
            best: true,
          },
          {
            text: 'Add every email to the newsletter automatically.',
            outcome: 'Organisers get emails they never asked for, mark them as spam, and stop booking.',
          },
          {
            text: 'A newsletter checkbox that starts ticked, at the bottom in small grey text.',
            outcome: 'Most people don\'t notice it. That isn\'t really their choice, and many places\' laws say consent must be opt-in.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Honest about details',
      caption: 'A clear line about what happens to the details, and an opt-in that starts unticked.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .privacy { font-size: 0.875rem; }\n</style>\n<form>\n  <p class="privacy">I only use your details to reply about this booking. I never share them.</p>\n  <input type="checkbox" id="news" name="news" value="yes">\n  <label for="news">Send me news about new beats (optional)</label>\n  <p><button type="submit">Send booking request</button></p>\n</form>\n',
      challenge: 'Read the privacy line out loud. Is it true, short and clear?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Say what happens to the details. Ask only what you need. Anything extra is opt-in, and starts unticked.',
    },
  ],
  apply: {
    scenario: 'What happens to my details?',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is adding every email to the newsletter automatically a problem?',
        options: [
          { text: 'Newsletters are illegal', why: 'They\'re fine when people choose them.' },
          { text: 'People didn\'t choose it, so the emails feel like spam and trust is lost' },
          { text: 'It isn\'t a problem', why: 'Efua\'s shop story shows it is.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add an opt-in: an unticked checkbox id news, name news, value yes, labelled "Send me news about new beats (optional)"',
        starter: '<form>\n  <p>I only use your details to reply about this booking.</p>\n\n</form>\n',
        solution: '<form>\n  <p>I only use your details to reply about this booking.</p>\n  <input type="checkbox" id="news" name="news" value="yes">\n  <label for="news">Send me news about new beats (optional)</label>\n</form>\n',
        hint: '<input type="checkbox" id="news" name="news" value="yes"><label for="news">...</label>',
        checks: [
          { message: 'A news checkbox', dom: { selector: 'input#news[type="checkbox"]', count: 1 } },
          { message: 'That starts unticked', dom: { selector: 'input#news[checked]', count: 0 } },
          { message: 'With a clear label', dom: { selector: 'label[for="news"]', text: 'optional' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Privacy line + unticked opt-in', 'Trust, and real fans sign up'],
          ['Everyone added automatically', 'Marked as spam'],
          ['Pre-ticked, small grey box', 'Not really a choice'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest form, or not?',
        groups: ['Honest', 'Not honest'],
        items: [
          { text: '"I only use your details to reply about this booking."', group: 0 },
          { text: 'A pre-ticked newsletter box', group: 1 },
          { text: 'An optional, unticked opt-in', group: 0 },
          { text: 'Asking for an ID number "just in case"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Can the privacy line say "We take your privacy seriously"?',
        options: [
          { text: 'Better to say exactly what I do: "I only use your details to reply about this booking. I never share them."' },
          { text: 'Yes, that\'s what big sites say.', why: 'It doesn\'t say what actually happens.' },
          { text: 'Leave it out.', why: 'People want to know.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that takes away people\'s choice.',
        language: 'html',
        lines: ['<p>I only use your details to reply about this booking.</p>', '<input type="checkbox" id="news" name="news" checked>', '<label for="news">Send me news (optional)</label>'],
        bug: 1,
        explanation: 'It starts ticked. An opt-in must start unticked, so people choose it themselves.',
        fix: '<input type="checkbox" id="news" name="news">',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Someone sends the form without touching the news box. Are they signed up?',
        code: '<input type="checkbox" id="news" name="news" value="yes">',
        language: 'html',
        options: [
          { text: 'Yes, news = yes', why: 'Only ticked checkboxes are sent.' },
          { text: 'No: an unticked checkbox isn\'t sent at all' },
          { text: 'It depends on the browser', why: 'Unticked boxes are never sent.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'An honest privacy line.',
        template: 'I only use your details to [[1]] about this booking. I never [[2]] them.',
        blanks: [['reply'], ['share', 'sell']],
        distractors: ['advertise', 'keep', 'publish'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Should an optional newsletter checkbox start ticked or unticked? (one word)',
        answers: ['unticked', 'unchecked'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Who is responsible for the details people send through Kofi\'s form?',
        options: [
          { text: 'Nobody', why: 'Whoever collects data is responsible for it.' },
          { text: 'Only the host', why: 'Kofi collects it, so it\'s his job too.' },
          { text: 'Kofi: he should keep them safe and use them only as he said' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What would you want a form to tell you before you typed your email into it?',
    starters: ['I\'d want to know...', 'I\'d trust it if...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add a one-sentence, honest privacy line to your form, and make any extras opt-in. Check your country\'s rules on collecting personal data (check locally).',
  },
  notes: 'Opt-in consent and data minimisation reflect laws such as the GDPR and Ghana\'s Data Protection Act, 2012 (Act 843); kept general with "check locally". Unchecked checkboxes are omitted from form submission (HTML spec).',
};

export default lesson;
