import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 11 — Writing for a reader with no context. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'A reader who wasn\'t there',
  summary: 'Remi\'s notes from the Zanele meeting say "the late ones, the usual way, like we said." Perfect for Remi. Useless for an agent that wasn\'t in the room.',
  minutes: 12,
  outcomes: [
    'Spot words that only make sense if you were there',
    'Find them in a brief with Python',
    'Rewrite them so a stranger could act',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The stranger test',
      html: '<p>Every agent session starts with a stranger: it knows nothing about your meeting, your team or yesterday. Remi\'s meeting notes:</p><pre><code>Flag the late ones, the usual way, like we said.\nZanele\'s thing about Fridays. Don\'t mess up her stuff.</code></pre><p>Every phrase depends on being there:</p><ul><li><strong>"the late ones"</strong>: late how? Already late, or likely to be?</li><li><strong>"the usual way"</strong>: whose usual?</li><li><strong>"like we said"</strong>: the agent wasn\'t there.</li><li><strong>"Zanele\'s thing about Fridays"</strong>: what thing?</li><li><strong>"her stuff"</strong>: which files?</li></ul><p>The <strong>stranger test</strong>: could someone who joined Synergix this morning do the task from the brief alone? If not, rewrite until they could:</p><pre><code>Write is_at_risk in board/rules.py: True for deliveries likely to arrive late.\nAt risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km.\nOnly change board/rules.py; board/report.py belongs to Zanele.</code></pre><p>Watch for words like <em>usual, normal, obvious, thing, stuff, like we said, as before</em>. They point at knowledge the reader doesn\'t have.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Find the "you had to be there" words',
      caption: 'A simple check for words that hide missing context.',
      code: 'notes = "Flag the late ones, the usual way, like we said. Zanele\'s thing about Fridays. Don\'t mess up her stuff."\nwarning_words = ["usual", "normal", "obvious", "thing", "stuff", "like we said", "as before"]\nprint([w for w in warning_words if w in notes.lower()])\n',
      challenge: 'Run it on the rewritten brief. What does it find?',
    },
  ],
  apply: {
    scenario: 'The stranger test.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the warning words found in Remi\'s notes, as a list',
        starter: 'notes = "Flag the late ones, the usual way, like we said. Zanele\'s thing about Fridays. Don\'t mess up her stuff."\nwarning_words = ["usual", "normal", "obvious", "thing", "stuff", "like we said", "as before"]\n',
        solution: 'notes = "Flag the late ones, the usual way, like we said. Zanele\'s thing about Fridays. Don\'t mess up her stuff."\nwarning_words = ["usual", "normal", "obvious", "thing", "stuff", "like we said", "as before"]\nprint([w for w in warning_words if w in notes.lower()])\n',
        hint: '[w for w in warning_words if w in notes.lower()]',
        checks: [{ message: "Print ['usual', 'thing', 'stuff', 'like we said']", outputEquals: "['usual', 'thing', 'stuff', 'like we said']" }],
      },
      {
        kind: 'mcq',
        prompt: 'What is the stranger test?',
        options: [
          { text: 'Would a stranger like the brief?', why: 'It\'s about whether they could act on it.' },
          { text: 'Could someone who joined this morning do the task from the brief alone?' },
          { text: 'Is the brief short?', why: 'Short briefs often fail the test.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the phrase to its rewrite.',
        pairs: [
          ['"the late ones"', 'Deliveries likely to arrive late'],
          ['"Zanele\'s thing about Fridays"', 'Placed on Friday from 2 p.m.'],
          ['"her stuff"', 'board/report.py'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Passes the stranger test, or not?',
        groups: ['Passes', 'Fails'],
        items: [
          { text: 'Only change board/rules.py', group: 0 },
          { text: 'Do it like last time', group: 1 },
          { text: 'Dates look like 2026-03-06 15:00', group: 0 },
          { text: 'Use the normal format', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'But I know what "the usual way" means!',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Then it\'ll know too.', why: 'It only knows what you write.' },
          { text: 'Agents remember your meetings.', why: 'They don\'t; they weren\'t there.' },
          { text: 'You do. The agent starts every session knowing nothing about you. Write for a stranger who\'s smart but wasn\'t there.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'brief = "Only change board/rules.py."\nwarning_words = ["usual", "thing", "stuff"]\nprint([w for w in warning_words if w in brief.lower()])',
        language: 'python',
        options: [
          { text: '[]' },
          { text: "['usual']", why: 'None of the words are in the brief.' },
          { text: 'False', why: 'It prints a list, empty here.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Rewrite the brief so the check finds no warning words, then print the check',
        starter: 'brief = "Flag the late ones the usual way. Don\'t touch her stuff."\nwarning_words = ["usual", "normal", "obvious", "thing", "stuff", "like we said", "as before"]\nprint([w for w in warning_words if w in brief.lower()])\n',
        solution: 'brief = "Write is_at_risk in board/rules.py: True for deliveries likely to arrive late. Only change board/rules.py."\nwarning_words = ["usual", "normal", "obvious", "thing", "stuff", "like we said", "as before"]\nprint([w for w in warning_words if w in brief.lower()])\n',
        hint: 'Replace every vague phrase with exact words',
        checks: [{ message: 'Print []', outputEquals: '[]' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Who you\'re writing for.',
        template: 'Write for a smart [[1]] who wasn\'t in the [[2]].',
        blanks: [['stranger'], ['room', 'meeting']],
        distractors: ['friend', 'office'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line fails the stranger test?',
        lines: [
          'Write is_at_risk in board/rules.py.',
          'At risk: Friday from 2 p.m., Saturday, or over 150 km.',
          'Handle blanks like we discussed.',
          'Done when all tests pass.',
        ],
        bug: 2,
        fix: 'If the distance is blank, flag the delivery.',
        explanation: '"Like we discussed" points at a meeting the agent wasn\'t in.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the test called: could someone new do it from the brief alone? (the ... test)',
        answers: ['stranger', 'stranger test', 'the stranger test'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Find a message you sent recently. Would it pass the stranger test? Rewrite one line.',
    starters: ['My message said...', 'A stranger would need...'],
  },
  deepen: {
    title: 'The curse of knowledge',
    summary: 'Once you know something, it\'s hard to imagine not knowing it. Psychologists call this the curse of knowledge. It\'s why your own briefs always look clear to you.',
  },
  notes: 'Warning-word check on Remi\'s notes finds usual, thing, stuff, like we said. "Curse of knowledge": Camerer, Loewenstein and Weber (1989); popularised by Heath and Heath.',
};

export default lesson;
