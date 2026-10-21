import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 1 — opens the course: messy booking emails; a form with label and input. Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Book me, properly',
  summary: 'Booking emails keep arriving: "u free sat?" with no date, no venue, no idea what kind of event. Kofi spends hours replying with questions. The organiser suggests a booking form on the site.',
  minutes: 11,
  outcomes: ['Explain what a form is for', 'Build a form with a label and an input', 'Connect a label to its input with for and id'],
  learn: [
    {
      kind: 'story',
      title: 'Two weeks to uni',
      beats: [
        { speaker: 'narrator', text: 'Two weeks to uni. The site works on every screen, and the bookings are coming in. As emails like "u free sat?" and "how much 4 party".' },
        { speaker: 'kofi', text: 'I spend more time asking "which Saturday? where? what kind of event?" than making beats.' },
        { speaker: 'clinton', text: 'The organiser says real sites have a booking form. You ask the questions once, on the page.' },
        { speaker: 'miracle', text: 'This course is about making the site professional: forms, motion, everyone can use it, people can find it. Then launch night. Forms first.' },
      ],
      choice: {
        prompt: 'How should Kofi collect bookings?',
        options: [
          {
            text: 'A booking form with clear questions: name, email, date, venue, type of event.',
            outcome: 'Every booking arrives with the same details. Kofi replies once, with a price.',
            best: true,
          },
          {
            text: 'Keep the email link, and add "please include all details" in bold.',
            outcome: 'People still forget the date or the venue. The back-and-forth carries on.',
          },
          {
            text: 'One big box that says "Tell me everything".',
            outcome: 'Some people write essays, some write two words. Nothing is in the same place twice.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>A form</strong> collects answers. <strong>form</strong> wraps it. Each question is an <strong>input</strong> (a box to type in) with a <strong>label</strong> that says what to type. Connect them: the label\'s <strong>for</strong> matches the input\'s <strong>id</strong>. Then tapping the label puts the cursor in the box, and screen readers read the label out when someone reaches the box.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The first question',
      caption: 'Tap the word "Your name". The cursor jumps into the box, because for="name" matches id="name".',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  label { display: block; margin-bottom: 4px; }\n  input { font-size: 1rem; padding: 8px; }\n</style>\n<h2>Book me</h2>\n<form>\n  <label for="name">Your name</label>\n  <input id="name" name="name">\n</form>\n',
      challenge: 'Add a second label and input for "Venue", with for and id both set to venue.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Every input gets a label. The label\'s for matches the input\'s id.',
    },
    {
      kind: 'text',
      html: '<p><strong>In this course:</strong> forms, motion, accessibility, search and sharing, and launch night. <strong>This chapter:</strong> a booking form the organiser actually fills in, with the right boxes, helpful checks and honest privacy. (In this course the form doesn\'t send anywhere yet: sending needs a server or a form service, which we\'ll cover.)</p>',
    },
  ],
  apply: {
    scenario: 'Book me, properly.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is a form better than "email me with all the details"?',
        options: [
          { text: 'It asks the same questions every time, so every booking has the details' },
          { text: 'Forms are faster to build than links', why: 'It\'s about getting complete bookings.' },
          { text: 'Emails can\'t hold dates', why: 'They can. People just forget to include them.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Build the first question: a form with a label "Your name" (for="name") and an input with id="name"',
        starter: '<h2>Book me</h2>\n\n',
        solution: '<h2>Book me</h2>\n<form>\n  <label for="name">Your name</label>\n  <input id="name" name="name">\n</form>\n',
        hint: '<form><label for="name">Your name</label><input id="name" name="name"></form>',
        checks: [
          { message: 'A form', dom: { selector: 'form', count: 1 } },
          { message: 'A label for the name', dom: { selector: 'form label[for="name"]', text: 'name' } },
          { message: 'An input it points to', dom: { selector: 'form input#name', count: 1 } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['A booking form', 'Every booking has the details'],
          ['"Please include all details"', 'The back-and-forth carries on'],
          ['One "tell me everything" box', 'Nothing in the same place'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of a form is it?',
        groups: ['label', 'input'],
        items: [
          { text: 'The words "Your name"', group: 0 },
          { text: 'The box you type in', group: 1 },
          { text: 'Has a for attribute', group: 0 },
          { text: 'Has the matching id', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Why does the label need for="name"? It\'s right next to the box.',
        options: [
          { text: 'Being next to it isn\'t enough for a screen reader. for and id connect them, and tapping the label then focuses the box.' },
          { text: 'It doesn\'t, it\'s optional.', why: 'Without it, the label and box aren\'t connected.' },
          { text: 'It makes the box bigger.', why: 'It connects the label to the box.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the label that isn\'t connected to its box.',
        language: 'html',
        lines: ['<label for="name">Your name</label> <input id="name">', '<label for="venue">Venue</label> <input id="place">', '<label for="email">Email</label> <input id="email">'],
        bug: 1,
        explanation: 'for="venue" but the input\'s id is place. They must match.',
        fix: '<label for="venue">Venue</label> <input id="venue">',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What happens when you tap the word "Venue"?',
        code: '<label for="venue">Venue</label>\n<input id="venue">',
        language: 'html',
        options: [
          { text: 'The cursor jumps into the venue box' },
          { text: 'Nothing, labels are just text', why: 'A connected label focuses its input.' },
          { text: 'The form sends', why: 'Tapping a label only focuses its box.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Connect the label and the box.',
        language: 'html',
        template: '<label [[1]]="venue">Venue</label>\n<input [[2]]="venue">',
        blanks: [['for'], ['id']],
        distractors: ['class', 'name', 'href'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which element says what to type in an input? (tag name)',
        answers: ['label', '<label>'],
        placeholder: 'A tag',
      },
      {
        kind: 'writeCode',
        prompt: 'Add a second question to the form: a label "Venue" (for="venue") and an input with id="venue"',
        starter: '<form>\n  <label for="name">Your name</label>\n  <input id="name" name="name">\n\n</form>\n',
        solution: '<form>\n  <label for="name">Your name</label>\n  <input id="name" name="name">\n  <label for="venue">Venue</label>\n  <input id="venue" name="venue">\n</form>\n',
        hint: '<label for="venue">Venue</label> <input id="venue" name="venue">',
        checks: [
          { message: 'A venue label', dom: { selector: 'label[for="venue"]', count: 1 } },
          { message: 'Its box', dom: { selector: 'input#venue', count: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What questions do people ask you again and again? Could a form ask them for you?',
    starters: ['People always ask...', 'A form could...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add a contact form to your own page with a name question: a label with for, and an input with the matching id.',
  },
  notes: 'Opens Course 3 (Build and Launch a Website), Chapter 1 (Book me). Explicit label association via for/id (HTML spec; WCAG 1.3.1, 4.1.2). The live preview\'s sandbox blocks form submission, so forms never send from lessons. name attributes are added now and explained in lesson 13.',
};

export default lesson;
