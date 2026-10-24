import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 17 — What would the clinic do? A prediction is useful only if it leads to a kind, sensible action. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'What would the clinic do?',
  summary: 'Chidi has an idea: "Double-book the risky patients\' slots." Bisi goes quiet. Halima asks Tey the question that will shape the whole project: what should a clinic actually do with a prediction?',
  minutes: 10,
  outcomes: [
    'Link a prediction to a sensible action',
    'Prefer actions that help people over actions that punish them',
    'Know that a wrong prediction still has a cost',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'A prediction on its own changes nothing. What matters is what someone does with it. So before building, decide the action.', replies: ['What are the options?'] },
        { tey: 'For a likely no-show: an extra reminder call, a nearer slot, help with transport, or a time that fits better. Or, Chidi\'s idea: double-book the slot.', replies: ['What\'s wrong with double-booking?'] },
        { tey: 'Think about a wrong prediction. If the model wrongly flags someone and their slot is double-booked, a patient who DID come waits for hours, or is sent home. The mistake lands on them.', replies: ['And with a reminder call?'] },
        { tey: 'If the model wrongly flags someone, they get a friendly call they didn\'t need. A small cost. Choose actions where being wrong is cheap and being right helps someone.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Health rule for this project: a prediction can only lead to MORE help (a call, a nearer slot), never to less care for the patient.',
    },
  ],
  apply: {
    scenario: 'From prediction to action.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'A kind action for a likely no-show, or a harmful one?',
        groups: ['Helps the patient', 'Could harm the patient'],
        items: [
          { text: 'An extra reminder call', group: 0 },
          { text: 'Cancel their booking in advance', group: 1 },
          { text: 'Offer a nearer clinic slot', group: 0 },
          { text: 'Double-book their slot', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: "If the chance of missing is above 0.7 print \"Call the patient\", otherwise \"Normal reminder\"",
        starter: "chance = 0.85\n",
        solution: "chance = 0.85\nif chance > 0.7:\n    print(\"Call the patient\")\nelse:\n    print(\"Normal reminder\")\n",
        hint: "if chance > 0.7:",
        checks: [
          { message: "Print Call the patient", outputEquals: "Call the patient" },
          { message: "Use if", codeIncludes: "if " },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The model wrongly flags Amina, who was always going to come. With a reminder call, what\'s the cost?',
        options: [
          { text: 'Huge: she\'s banned', why: 'A reminder call bans no one. That\'s why it\'s a good action.' },
          { text: 'None at all, ever', why: 'There\'s a small cost: Bisi\'s time and an extra call.' },
          { text: 'Small: a call she didn\'t need' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Double-booking would fill more chairs. Isn\'t that the goal?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'The goal is patients getting care. When the model is wrong, double-booking makes someone who came wait or go home. Calls help without that risk.' },
          { text: 'Yes, fill the chairs at any cost.', why: 'Not when the cost falls on patients who came.' },
          { text: 'Models are never wrong, so it\'s fine.', why: 'Models are wrong sometimes. Plan for it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The project\'s health rule.',
        template: 'A prediction can lead to [[1]] help, never to [[2]] care.',
        blanks: [['more', 'extra'], ['less']],
        distractors: ['fewer', 'no'],
      },
      {
        kind: 'mcq',
        prompt: 'Why decide the action BEFORE building the model?',
        options: [
          { text: 'It doesn\'t matter when you decide', why: 'A model built without an action often answers the wrong question.' },
          { text: 'So the model can do the action itself', why: 'People act. The model ranks.' },
          { text: 'The action decides what the model must predict, when, and which mistakes matter most' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the action to what happens when the model is WRONG.',
        pairs: [
          ['Reminder call', 'An unneeded friendly call'],
          ['Double-booking', 'A patient who came waits or is turned away'],
          ['Offer a nearer slot', 'They say no thanks'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the harmful step in Folake\'s draft plan.',
        lines: [
          'Each evening, the model ranks tomorrow\'s bookings.',
          'Bisi calls the ten most likely to miss.',
          'Anyone flagged twice loses the right to book.',
          'We check every month that the calls help.',
        ],
        bug: 2,
        fix: 'Anyone flagged twice is offered help: a nearer slot or a better time.',
        explanation: 'Taking away care punishes people for a guess. Offer help instead.',
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'I can only make about ten calls an evening.',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Then call everyone.', why: 'She can\'t. A ranked list makes ten calls count.' },
          { text: 'Then the model should rank bookings by risk, so your ten calls go to the people most likely to miss.' },
          { text: 'Then the model is useless.', why: 'Limited calls is exactly when a good ranking helps most.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What should the model give Bisi each evening?',
        options: [
          { text: 'Tomorrow\'s bookings, sorted from most to least likely to miss' },
          { text: 'A list of patients to cancel', why: 'Never cancel care from a guess.' },
          { text: 'A single number for the whole day', why: 'She needs to know WHO to call.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Bisi can make about how many calls an evening?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time a system guessed wrong about you (a blocked card, a wrong delivery estimate). Was the cost of the mistake small or large? Who paid it?',
    starters: ['A system guessed wrong when...', 'The cost was...'],
  },
  deepen: {
    title: 'The cost of mistakes',
    summary: 'Every model makes two kinds of mistake: flagging someone who was fine, and missing someone who needed help. Chapter 7 measures each one separately.',
  },
  notes: 'Action design for predictive models; asymmetric error costs (false positives vs false negatives, Chapter 7). Made-up story; no Afiya policy claims.',
};

export default lesson;
