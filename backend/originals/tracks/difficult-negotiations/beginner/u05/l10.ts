import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10. Final Challenge: the contract (course finale). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Final challenge: the contract',
  summary: 'Six weeks into the build, a new procurement manager arrives at Harlow & Finch and tries the whole playbook on phase two. This time, Arjun is ready. The final challenge uses the whole course.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use everything from the course together', 'Handle a hard negotiation from first offer to signature'],
  learn: [
    {
      kind: 'reading',
      title: 'Phase two, round one',
      html: '<p>Week six. Points work in three test shops. Then an email from a new procurement manager:</p><p><em>"For phase two (gift cards, referrals, staff dashboard), our budget is £10,000, all three features, by Christmas. We need an answer today. And of course the Christmas campaign banners are included."</em></p><p>Arjun\'s phase-two estimate: £18,000 for all three, ten weeks. Christmas is seven weeks away.</p><p>He doesn\'t reply for two hours. Then he writes: <em>"Thanks, and great to meet you. All three by Christmas isn\'t possible; it\'s ten weeks of work. Gift cards alone could be live by Christmas for £7,000. Referrals and the dashboard could follow in January, for £11,000. Banners are a change request at £450 a day. Could we talk tomorrow?"</em></p>',
    },
    {
      kind: 'story',
      title: 'A message from Manchester',
      beats: [
        { speaker: 'arjun', text: 'Grace, they tried the whole playbook again. And I barely felt it.' },
        { speaker: 'grace', text: 'Brilliant. Can I borrow your calm? Femi snapped at me in stand-up today, and I froze.' },
        { speaker: 'tey', text: 'That\'s this course. Grace\'s story is the next one: managing conflict at work.' },
      ],
    },
  ],
  apply: {
    scenario: 'Final challenge: the contract.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the new manager\'s email to the tactic.',
        pairs: [
          ['£10,000 for all three', 'Extreme anchor'],
          ['"Answer today"', 'Deadline'],
          ['"Banners are included"', 'Nibble'],
          ['"Our budget is £10,000"', 'Fixed budget'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Gift cards £7,000 plus referrals and dashboard £11,000. Total, in pounds?',
        answers: ['18000', '18,000', '£18,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which skill turned "all three by Christmas" into a plan?',
        options: [
          { text: 'Yes-if with trade-offs: what fits by Christmas, what follows in January' },
          { text: 'A flat no', why: 'He offered a path.' },
          { text: 'Saying yes to everything', why: 'He held the scope.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which chapter\'s skill is in Arjun\'s reply?',
        groups: ['Keep your head', 'Requests', 'Close'],
        items: [
          { text: 'Waiting two hours before replying', group: 0 },
          { text: 'Gift cards only by Christmas', group: 1 },
          { text: '"Could we talk tomorrow?"', group: 2 },
          { text: 'Banners as a change request', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'The new manager says the budget is fixed at £10,000. Do we match it?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'A fixed budget means a fixed scope. £10,000 buys gift cards with a bit to spare; everything else is priced separately.' },
          { text: 'Yes, do all three for £10,000.', why: 'That\'s £8,000 of free work.' },
          { text: 'Refuse to talk to the new manager.', why: 'Offer the path instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Phase two takes 10 weeks. Christmas is 7 weeks away. How many weeks short is that?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'The course in one line.',
        template: 'Keep your head, name the [[1]], say yes-if, know your [[2]], close in writing.',
        blanks: [['tactic', 'tactics'], ['BATNA', 'alternative']],
        distractors: ['price', 'enemy'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Arjun barely feel the pressure this time?',
        options: [
          { text: 'He recognised every tactic and had answers, a change rate and a strong position ready' },
          { text: 'The tactics were weaker', why: 'They were the same playbook.' },
          { text: 'He didn\'t care about the deal', why: 'He was prepared.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line would have undone Arjun\'s reply?',
        lines: [
          'All three by Christmas isn\'t possible.',
          'Gift cards alone could be live for £7,000.',
          'And we\'ll throw in the banners for free.',
          'Could we talk tomorrow?',
        ],
        bug: 2,
        fix: 'Banners are a change request at £450 a day.',
        explanation: 'That rewards the nibble.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a full hard negotiation, start to finish.',
        lines: ['Go to the balcony', 'Name the tactics', 'Answer requests with yes-if', 'Check your BATNA', 'Package the deal', 'Sign it and deliver'],
      },
    ],
  },
  reflect: {
    prompt: 'Your final challenge: in your next hard negotiation, use the deal sheet. Before it starts, write your BATNA, walk-away, the tactics you expect, and your first calm sentence.',
    starters: ['BATNA:...', 'Tactics I expect:...', 'My first sentence:...'],
  },
  deepen: {
    title: 'Next: How to Manage Conflict at Work',
    summary: 'Not every hard conversation is a negotiation. In the next course, Grace learns to cool down arguments, clear up misunderstandings, answer unfair criticism and set boundaries at work.',
  },
  notes: 'Course finale (fictional): phase-two request £10,000 for three features by Christmas (7 weeks) vs estimate £18,000/10 weeks; reply: gift cards £7,000 by Christmas, referrals + dashboard £11,000 in January, banners as a change at £450/day. Hook to How to Manage Conflict at Work (Grace and Femi).',
};

export default lesson;
