import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Explain cards: the first month after signing. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The first month after signing',
  summary: 'The hardest negotiation is over, and the next one has already started: phase two. Arjun plans his first month so that every week makes the next conversation easier.',
  minutes: 12,
  outcomes: [
    'Plan the first month of a hard-won deal',
    'Keep the change log and reports visible',
    'Prepare the next negotiation from day one',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Arjun\'s first-month plan:</p><table><tr><th>When</th><th>What</th><th>Why</th></tr><tr><td>Week 1</td><td>Kick-off with both Ms Okafor-Lane and Mr Pryce. Walk through the statement of work together.</td><td>Same understanding from day one</td></tr><tr><td>Every Friday</td><td>A five-line update: done, next, risks, change log, questions</td><td>No surprises</td></tr><tr><td>Week 2</td><td>First visible win: points working in a test shop</td><td>Trust from results</td></tr><tr><td>Week 3</td><td>First change request handled by the book (approved, priced, logged)</td><td>The process works</td></tr><tr><td>Week 4</td><td>Note ideas for phase two, with rough costs, in a separate list</td><td>The next negotiation starts prepared</td></tr></table><p>Every promise kept adds credibility. When phase two comes up after launch, Arjun won\'t be "the agency that pushed back". He\'ll be "the team that delivered".</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'After a hard deal: kick off together, report weekly, deliver an early win, use the change process, and prepare the next deal.',
    },
  ],
  apply: {
    scenario: 'The first month.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Arjun\'s first month.',
        lines: ['Kick-off with both clients', 'First visible win', 'First change by the book', 'Phase-two ideas list'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the action to why it matters.',
        pairs: [
          ['Joint kick-off', 'Same understanding from day one'],
          ['Friday update', 'No surprises'],
          ['Early win', 'Trust from results'],
          ['Phase-two list', 'The next negotiation starts prepared'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why invite Mr Pryce to the kick-off?',
        options: [
          { text: 'He signed the terms; walking through them together avoids later disputes' },
          { text: 'To argue again', why: 'To align, not argue.' },
          { text: 'He shouldn\'t be there', why: 'He owns the contract side.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lines long is the Friday update?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'In the Friday update, or not?',
        groups: ['In it', 'Not in it'],
        items: [
          { text: 'What\'s done', group: 0 },
          { text: 'Risks', group: 0 },
          { text: 'Complaints about procurement', group: 1 },
          { text: 'The change log', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Why plan phase two already? We\'ve just started phase one.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Because the next negotiation starts now. Ideas with rough costs, collected as we go, make that talk easy.' },
          { text: 'You\'re right, forget phase two.', why: 'Preparation starts early.' },
          { text: 'Pitch phase two this week.', why: 'Collect quietly; deliver phase one first.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'Not "the agency that pushed [[1]]", but "the team that [[2]]".',
        blanks: [['back'], ['delivered']],
        distractors: ['forward', 'complained'],
      },
      {
        kind: 'mcq',
        prompt: 'Why handle the first change request "by the book"?',
        options: [
          { text: 'It shows both sides the agreed process actually works' },
          { text: 'To be difficult', why: 'It builds confidence in the process.' },
          { text: 'It doesn\'t matter', why: 'The first one sets the pattern.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the first-month plan is a mistake?',
        lines: [
          'Week 1: joint kick-off.',
          'Week 2: points working in a test shop.',
          'Week 3: do the first change request quietly, without logging it.',
          'Week 4: phase-two ideas list.',
        ],
        bug: 2,
        fix: 'Week 3: first change approved, priced and logged.',
        explanation: 'Quiet unlogged changes are scope creep.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which week is the first visible win planned?',
        answers: ['2', 'two', 'week 2'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'After your next agreement, what would your first-month plan look like?',
    starters: ['Week 1:...', 'My early win:...'],
  },
  deepen: {
    title: 'Reputation',
    summary: 'Your behaviour after a deal becomes your reputation before the next one. Negotiators with a reputation for delivering find hard negotiations getting easier.',
  },
  notes: 'Fictional first-month plan. Reputation effects in repeated negotiation: e.g. Tinsley, O\'Connor & Sullivan (2002), "Tough guys finish last", OBHDP 88(2).',
};

export default lesson;
