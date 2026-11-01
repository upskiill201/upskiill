import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 12. Step-by-step: project words — scope, PoC, MVP, milestone, deliverable, go-live, scope creep. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Projects: MVP, proof of concept, scope, milestone',
  summary: 'Brian gives Remi his first real project: a delivery tracker. "Start with a PoC, agree the scope, then an MVP by the first milestone. Watch out for scope creep." Remi nods. Then opens Tey.',
  minutes: 13,
  outcomes: [
    'Decode scope, PoC, MVP, milestone, deliverable, go-live and scope creep',
    'Follow a small project from idea to launch',
    'Spot scope creep before it eats your deadline',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Remi\'s delivery tracker, from idea to go-live',
      steps: [
        {
          title: 'Scope: what\'s in, what\'s out',
          body: 'The SCOPE is the boundary of the project. Brian and Remi agree: IN = show each delivery\'s status for the Mombasa route. OUT = other routes, customer texts, drones. Writing down what\'s OUT is just as important.',
        },
        {
          title: 'PoC: does the idea even work?',
          body: 'A PROOF OF CONCEPT (PoC) is a tiny test to show something is possible. Remi spends one afternoon checking he can pull delivery times from the system into a spreadsheet. It works. The idea is possible.',
        },
        {
          title: 'MVP: the smallest useful version',
          body: 'A MINIMUM VIABLE PRODUCT (MVP) is the simplest version real people can actually use. Remi\'s MVP: one page, one route, three columns: delivery, expected time, actual time. Not pretty. Useful.',
        },
        {
          title: 'Milestones and deliverables',
          body: 'A MILESTONE is a checkpoint on the timeline: "MVP ready by 14 November". A DELIVERABLE is the thing you hand over at that point: the tracker page itself.',
        },
        {
          title: 'Go-live, and the creep',
          body: 'GO-LIVE is the day real users start using it. Two days before, Zanele asks, "Can it also text customers? And track drones?" That\'s SCOPE CREEP: the project quietly growing beyond what was agreed. Remi\'s answer: "Great idea for phase 2."',
        },
      ],
    },
    {
      kind: 'check',
      question: 'What\'s the difference between a PoC and an MVP?',
      options: ['They\'re the same', 'A PoC tests if it\'s possible; an MVP is the smallest version people can really use', 'An MVP comes before a PoC'],
      answer: 1,
      explanation: 'PoC = can it work? MVP = the first version people actually use.',
    },
  ],
  apply: {
    scenario: 'Thursday evening. Remi\'s first project.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s project in order.',
        lines: ['Agree the scope', 'Build a proof of concept', 'Build the MVP', 'Hit the milestone with the deliverable', 'Go live'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the project words.',
        pairs: [
          ['Scope', 'What\'s in and out of the project'],
          ['PoC', 'A tiny test that it\'s possible'],
          ['MVP', 'The smallest version people can use'],
          ['Go-live', 'The day real users start'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Zanele asks for customer texts two days before go-live. What is this?',
        options: [
          { text: 'A milestone', why: 'A milestone is a planned checkpoint.' },
          { text: 'Scope creep' },
          { text: 'A deliverable', why: 'It wasn\'t agreed, so it\'s not a deliverable.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Can the tracker also track drones? Pleeease? It\'s only small.',
        prompt: 'Best reply?',
        options: [
          { text: 'Sure, I\'ll add it tonight.', why: 'That\'s scope creep, and it risks the go-live date.' },
          { text: 'Drones aren\'t real.', why: 'Harsh, and not the point.' },
          { text: 'Love it for phase 2! For go-live we\'ve agreed Mombasa deliveries only. I\'ll add it to the list.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'MVP = minimum viable ... (one word)',
        answers: ['product'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'In scope or out of scope for the first go-live?',
        groups: ['In scope', 'Out of scope'],
        items: [
          { text: 'Mombasa route delivery status', group: 0 },
          { text: 'Texting customers', group: 1 },
          { text: 'Expected vs actual delivery time', group: 0 },
          { text: 'Drone tracking', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s project plan. Which line is wrong?',
        lines: [
          'Milestone: MVP ready by 14 November.',
          'Deliverable: the tracker page.',
          'MVP: the full, finished, perfect version with every feature.',
        ],
        bug: 2,
        fix: 'MVP: the simplest version people can use.',
        explanation: 'Minimum viable: as small as possible while still useful.',
      },
      {
        kind: 'mcq',
        prompt: 'Why write down what\'s OUT of scope?',
        options: [
          { text: 'So nobody is surprised later, and new ideas have a clear "not now"' },
          { text: 'To make the plan longer', why: 'It makes the plan clearer, not longer.' },
          { text: 'It\'s a legal requirement', why: 'It\'s just good sense.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['SOW', 'Statement of work'],
          ['Parking lot', 'Topics for another time'],
          ['Owner', 'The one person responsible'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s polite answer to scope creep.',
        tiles: ['Great', 'idea', 'for', 'phase', '2.'],
        distractors: ['tonight', 'never'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a project you\'re working on (work, study, home). What\'s in scope, what\'s out, and what would the MVP be?',
    starters: ['In scope: ...', 'Out of scope: ...', 'My MVP: ...'],
  },
  deepen: {
    title: 'Write a one-line scope',
    summary: 'For your next task or project, write one line for IN and one for OUT before you start. When someone asks for more, you\'ll have a kind, clear answer ready.',
  },
  notes: 'Scope, scope creep (Cambridge), proof of concept (PoC), minimum viable product (MVP; Eric Ries, The Lean Startup), milestone, deliverable, go-live (Cambridge Business English). Dates fictional.',
};

export default lesson;
