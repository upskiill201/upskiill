import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 16 — internship and graduate myths. Myth or Fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Internship myths',
  summary: '"Interns just make tea." "If they don\'t keep you, it was a waste." "Small companies don\'t count on a CV." The other interns have theories. Myth or fact?',
  minutes: 11,
  outcomes: ['Spot common myths about internships', 'Value a small-company internship properly', 'Make any internship count'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Interns only make tea and photocopies.', isFact: false, explain: 'A good internship has a real project. If yours doesn\'t, ask for one: "Is there a small problem I could own?"' },
        { text: 'If they don\'t keep you on, the internship was wasted.', isFact: false, explain: 'You still leave with skills, a project for your CV, a reference and new contacts.' },
        { text: 'A small start-up internship counts on a CV.', isFact: true, explain: 'Employers care what you did and what changed. "23 deliveries confirmed offline" reads well from any company.' },
        { text: 'You need connections to get any internship.', isFact: false, explain: 'Connections help, but formal schemes, careers offices and speculative pitches all work too.' },
        { text: 'Interns can ask for feedback and references.', isFact: true, explain: 'Supervisors expect it. Ask specifically, and ask before you leave.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Any internship counts if you own a problem, log your wins and leave with a reference.',
    },
  ],
  apply: {
    scenario: 'Clinton answers the interns\' theories.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'A start-up internship counts on a CV', group: 0 },
          { text: 'Interns only make tea', group: 1 },
          { text: 'Not kept on means wasted', group: 1 },
          { text: 'Interns can ask for references', group: 0 },
          { text: 'You need connections for any internship', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Samuel says if Mr Tamba keeps Nadia, the rest of us wasted three months. True?',
        options: [
          { text: 'No: we\'ll all leave with skills, a project, a reference and contacts.' },
          { text: 'Yes, let\'s quit now.', why: 'Three lasting wins remain.' },
          { text: 'Only if we fail.', why: 'The wins don\'t depend on being kept.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'An intern only gets tea runs. What should they do?',
        options: [
          { text: 'Ask: "Is there a small problem I could own?"' },
          { text: 'Quit on day two', why: 'Ask for a project first.' },
          { text: 'Make better tea', why: 'Ask for real work.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the myth.',
        lines: ['Employers care what you did and what changed.', 'Only big-company internships count.', 'Ask for a reference before you leave.'],
        bug: 1,
        explanation: 'What you did matters more than the company size.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['Interns only make tea', 'Ask for a problem to own'],
          ['Not kept on means wasted', 'Skills, project, reference, contacts'],
          ['You need connections', 'Schemes and pitches work too'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which CV line from Kmer is strongest?',
        options: [
          { text: '"Built offline delivery confirmations; one driver confirmed 23 deliveries with no data."' },
          { text: '"Intern at a small company."', why: 'Say what you did and what changed.' },
          { text: '"Did various tasks."', why: 'Too vague.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Own a [[1]], log your [[2]], leave with a reference.',
        blanks: [['problem'], ['wins']],
        distractors: ['desk', 'hours', 'excuses'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lasting things does an internship give you? Skills, project, reference and contacts. (a number)',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Makes an internship count, or not?',
        groups: ['Counts', 'Doesn\'t help'],
        items: [
          { text: 'A weekly wins log', group: 0 },
          { text: 'Waiting to be noticed', group: 1 },
          { text: 'Owning a real problem', group: 0 },
          { text: 'Leaving without saying goodbye', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'My placement is at a tiny clinic, not a big hospital. Will employers care?',
        options: [
          { text: 'Yes, if you can say what you did and what changed. Small places often give you more to do.' },
          { text: 'No, only big names matter.', why: 'What you did matters more.' },
          { text: 'Leave it off your CV.', why: 'Include it, with results.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which myth have you believed about internships or first jobs? What would you do differently now?',
    starters: ['I used to think...', 'Now I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write one CV line for any role you\'ve had, however small, in the form "did X; Y changed".',
  },
  notes: 'Myths reflect common misconceptions; claims kept qualitative.',
};

export default lesson;
