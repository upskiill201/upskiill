import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Explain cards: feedback in writing. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Feedback in writing',
  summary: 'Felix\'s export had 14 orders with no dates again, and week 9 took an extra day to check. Zanele\'s first note says "Please be more careful." Mrs Achieng asks: careful about what?',
  minutes: 12,
  outcomes: [
    'Write feedback about the work, not the person',
    'Make feedback specific and usable',
    'Give praise that\'s just as specific',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Feedback doesn\'t always help. In a large review of feedback studies, Kluger and DeNisi (1996) found that in about a third of cases, feedback actually made performance <strong>worse</strong>, often when it drew attention to the person rather than the task.</p><p>So written feedback works best when it is:</p><table><tr><th>It is...</th><th>Vague</th><th>Specific</th></tr><tr><td><strong>About the work</strong></td><td>"You\'re careless."</td><td>"14 orders in Monday\'s export had no delivery date."</td></tr><tr><td><strong>Clear on impact</strong></td><td>"It caused problems."</td><td>"Week 9 numbers took an extra day to check."</td></tr><tr><td><strong>Usable</strong></td><td>"Be more careful."</td><td>"Could you filter for blank dates before sending?"</td></tr><tr><td><strong>Fair on praise</strong></td><td>"Great job!"</td><td>"The depot tab you added saved me an hour."</td></tr></table><p>Writing removes your face and voice, so it can sound harsher than you mean. Specific, task-focused words keep it calm.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Feedback: what you saw, what it caused, what would help. About the work, never the person.',
    },
  ],
  apply: {
    scenario: 'Feedback to Felix.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Kluger and DeNisi (1996) find?',
        options: [
          { text: 'About a third of feedback made performance worse' },
          { text: 'All feedback helps', why: 'About a third made things worse.' },
          { text: 'Feedback never matters', why: 'It matters a lot, in both directions.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'About the work or about the person?',
        groups: ['The work', 'The person'],
        items: [
          { text: '"14 orders had no delivery date."', group: 0 },
          { text: '"You\'re careless."', group: 1 },
          { text: '"Could you filter for blank dates?"', group: 0 },
          { text: '"You never check anything."', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many orders in Felix\'s export had no delivery date?',
        answers: ['14', 'fourteen'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the vague feedback to a specific version.',
        pairs: [
          ['"It caused problems."', '"Week 9 took an extra day to check."'],
          ['"Be more careful."', '"Filter for blank dates before sending."'],
          ['"Great job!"', '"The depot tab saved me an hour."'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'Sorry. I didn\'t know blank dates mattered that much.',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: 'No problem, thanks for fixing it. Blank dates count as late in the numbers, so a quick filter before sending saves us both a day.' },
          { text: 'You should have known.', why: 'Explain the impact.' },
          { text: 'It\'s fine, ignore it.', why: 'Then it happens again.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The three parts.',
        template: 'What you [[1]], what it [[2]], what would help.',
        blanks: [['saw'], ['caused']],
        distractors: ['felt', 'cost him'],
      },
      {
        kind: 'mcq',
        prompt: 'Why can written feedback sound harsher than spoken feedback?',
        options: [
          { text: 'There\'s no face or voice to soften it' },
          { text: 'People read slowly', why: 'Tone is the issue.' },
          { text: 'It can\'t, it\'s the same', why: 'Text loses tone.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Zanele\'s note to Felix should go?',
        lines: [
          '14 orders in Monday\'s export had no delivery date.',
          'Week 9 numbers took an extra day to check.',
          'Honestly, this keeps happening with you.',
          'Could you filter for blank dates before sending?',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It\'s about Felix, not the export.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific or vague praise?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: '"The depot tab saved me an hour."', group: 0 },
          { text: '"Nice!"', group: 1 },
          { text: '"Your weekly notes made the board report easy."', group: 0 },
          { text: '"Good stuff."', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Zanele\'s note to Felix.',
        lines: ['What she saw', 'What it caused', 'What would help', 'Thanks for the depot tab'],
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite a piece of vague feedback you gave or got as what you saw, what it caused, and what would help.',
    starters: ['What I saw:...', 'What would help:...'],
  },
  deepen: {
    title: 'Feedback that backfires',
    summary: 'Kluger and DeNisi\'s review is a warning, not a reason to stay silent: feedback about the task, with a clear next step, is the kind most likely to help.',
  },
  notes: 'Kluger & DeNisi (1996), Psychological Bulletin, meta-analysis of feedback interventions: about one third decreased performance; effects worse when feedback directs attention to the self. Felix export (14 missing dates) from Chapter 1.',
};

export default lesson;
