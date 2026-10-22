import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Explain cards: subject lines that work. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Subject lines that work',
  summary: 'Zanele\'s inbox is full of subject lines like "Update", "Quick question" and "FW: FW: RE: Hi". Mrs Achieng\'s rule: the subject should be useful even if nobody opens the email.',
  minutes: 12,
  outcomes: [
    'Write subject lines that say what\'s needed',
    'Include action and deadline when there is one',
    'Update subject lines when the topic changes',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>A good subject line works even if nobody opens the email. Mrs Achieng\'s examples:</p><table><tr><th>Weak</th><th>Strong</th></tr><tr><td>Update</td><td>Saturday pilot, week 3: late deliveries at 21%</td></tr><tr><td>Quick question</td><td>Question: can Lagos share weekend order counts by Thursday?</td></tr><tr><td>Pilot</td><td>Decision needed by Friday: keep the Saturday pilot in June?</td></tr><tr><td>FW: FW: RE: Hi</td><td>FYI: new driver rota template (no action needed)</td></tr><tr><td>Important!!!</td><td>Action by 3 p.m.: confirm Saturday crew numbers</td></tr></table><p>Patterns that help:</p><ul><li><strong>Start with the type:</strong> Decision needed, Action, Question, FYI.</li><li><strong>Add the deadline</strong> if there is one.</li><li><strong>Say the topic specifically.</strong></li><li><strong>Change the subject</strong> when a thread moves to a new topic.</li></ul>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Type, topic, deadline. A subject line should work even if nobody opens the email.',
    },
  ],
  apply: {
    scenario: 'Subject lines.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the weak subject to a strong one.',
        pairs: [
          ['"Update"', '"Saturday pilot, week 3: late at 21%"'],
          ['"Quick question"', '"Question: Lagos counts by Thursday?"'],
          ['"Important!!!"', '"Action by 3 p.m.: confirm crew numbers"'],
          ['"FW: FW: RE: Hi"', '"FYI: new rota template"'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong or weak subject line?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: '"Decision needed by Friday: June pilot?"', group: 0 },
          { text: '"Stuff"', group: 1 },
          { text: '"FYI: driver contracts signed"', group: 0 },
          { text: '"Following up"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the test for a good subject line?',
        options: [
          { text: 'It\'s in capitals', why: 'It\'s about content.' },
          { text: 'It\'s useful even if nobody opens the email' },
          { text: 'It\'s short, whatever it says', why: 'It must say something.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'The thread is called "Hi" but now we\'re discussing Lagos. Should I change it?',
        prompt: "Mrs Achieng\'s best reply?",
        options: [
          { text: 'Yes. "Lagos pilot: weekend order counts" makes it findable later and tells everyone what it\'s about.' },
          { text: 'No, never change subjects.', why: 'Changing it helps.' },
          { text: 'Start a thread called "Hi 2".', why: 'Name the topic.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The pattern.',
        template: 'Type, [[1]], [[2]].',
        blanks: [['topic'], ['deadline']],
        distractors: ['emoji', 'greeting'],
      },
      {
        kind: 'mcq',
        prompt: 'Which word starts an email needing no action?',
        options: [
          { text: 'Action', why: 'That needs action.' },
          { text: 'FYI' },
          { text: 'Decision needed', why: 'That needs a decision.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does FYI stand for? Type the first word.',
        answers: ['for', 'For'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Which subject line is weakest?',
        lines: [
          'Decision needed by Friday: keep the pilot in June?',
          'Action by 3 p.m.: confirm crew numbers',
          'Some things to think about',
          'FYI: new rota template',
        ],
        bug: 2,
        fix: 'Question: should Lagos run a June pilot?',
        explanation: 'It says nothing about what or when.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which type should start the subject?',
        groups: ['Decision needed', 'FYI'],
        items: [
          { text: 'Approve June contracts', group: 0 },
          { text: 'The rota template is ready', group: 1 },
          { text: 'Choose a pilot depot', group: 0 },
          { text: 'Contracts were signed', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to build a subject line.',
        lines: ['Choose the type', 'Name the topic', 'Add the deadline if any', 'Check it works unopened'],
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite the subject lines of your last five sent emails using type, topic, deadline.',
    starters: ['Before:...', 'After:...'],
  },
  deepen: {
    title: 'Searchable subjects',
    summary: 'Specific subject lines also help months later, when someone searches "Saturday pilot" and finds the decision in seconds.',
  },
  notes: 'Subject-line guidance synthesised from business-writing practice and Rogers & Lasky-Fink ("design for easy navigation").',
};

export default lesson;
