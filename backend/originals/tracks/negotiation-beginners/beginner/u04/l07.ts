import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Reading: fair standards (objective criteria). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Fair standards',
  summary: 'What if Mr Adeyemi says, "Rents are going up everywhere, that\'s just how it is"? Ada needs something both sides can agree is fair. Fisher and Ury call it objective criteria.',
  minutes: 12,
  outcomes: [
    'Use outside standards instead of willpower',
    'Pick standards both sides respect',
    'Handle "that\'s just how it is"',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Not my number, not yours: a fair one',
      html: '<p>When two people just push their own numbers, it becomes a contest of will. <em>Getting to Yes</em> suggests a better question: <strong>"What would be fair here, and how would we know?"</strong></p><p>Fair standards are things outside both of you:</p><ul><li><strong>Market prices:</strong> what similar flats nearby rent for (₦1,300,000 to ₦1,450,000).</li><li><strong>Recent deals:</strong> her neighbour renewed at ₦1,350,000 last month.</li><li><strong>Costs:</strong> how much his service charge actually went up.</li><li><strong>Fair procedure:</strong> "Let\'s each check two listings and look at them together."</li></ul><p>When he says "Rents are going up everywhere", Ada doesn\'t argue. She agrees and uses the standard: <em>"They are. Similar flats on this street are now ₦1,300,000 to ₦1,450,000. ₦1,500,000 is above all of them. Could we look at where we sit in that range?"</em></p><p>Standards also help the other side say yes without losing face. Agreeing to "the market rate" is easier than giving in to you.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Ask "what would be fair, and how would we know?" Then use standards outside both of you.',
    },
  ],
  apply: {
    scenario: 'Fair standards.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What question does Getting to Yes suggest?',
        options: [
          { text: '"What would be fair here, and how would we know?"' },
          { text: '"Who wants it more?"', why: 'That\'s a contest of will.' },
          { text: '"Final offer?"', why: 'That closes the talk.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A fair standard, or just willpower?',
        groups: ['Fair standard', 'Willpower'],
        items: [
          { text: 'What similar flats nearby rent for', group: 0 },
          { text: '"Because I said so"', group: 1 },
          { text: 'A neighbour\'s recent renewal', group: 0 },
          { text: '"Take it or leave it"', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the standard to an example.',
        pairs: [
          ['Market price', 'Similar flats: ₦1,300,000 to ₦1,450,000'],
          ['Recent deal', 'Neighbour renewed at ₦1,350,000'],
          ['Costs', 'How much his service charge rose'],
          ['Fair procedure', 'Both check listings together'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'He says "Rents are going up everywhere, that\'s just how it is."',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Agree, then use the standard: "They are. Similar flats here are ₦1,300,000 to ₦1,450,000. Where should we sit in that range?"' },
          { text: 'Tell him he\'s wrong.', why: 'He\'s partly right; use the market.' },
          { text: 'Give in.', why: 'The market range supports her.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Saving face.',
        template: 'Agreeing to "the [[1]] rate" is easier than giving in to [[2]].',
        blanks: [['market'], ['you']],
        distractors: ['secret', 'anyone'],
      },
      {
        kind: 'mcq',
        prompt: 'Why do standards help the other side say yes?',
        options: [
          { text: 'They can agree with something fair, not lose to you' },
          { text: 'They confuse them', why: 'They clarify.' },
          { text: 'They don\'t', why: 'They let people agree without losing face.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'At what rent did Ada\'s neighbour renew, in naira?',
        answers: ['1350000', '1,350,000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which standard in Ada\'s notes is not fair to use?',
        lines: [
          'Listings for similar flats on this street.',
          'My neighbour\'s renewal last month.',
          'Rent for a room in my cousin\'s village.',
          'How much his service charge rose.',
        ],
        bug: 2,
        fix: 'Delete it: not similar.',
        explanation: 'Standards must be relevant to both sides.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Ada answers "that\'s just how it is".',
        lines: ['Agree with what\'s true', 'Name the standard', 'Show where his number sits', 'Ask where to sit in the range'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the top of the market range, in naira?',
        answers: ['1450000', '1,450,000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What fair standards could you use in your negotiation? Where would you find them?',
    starters: ['A fair standard is...', 'I would find it...'],
  },
  deepen: {
    title: 'Principle, not pressure',
    summary: 'Fisher and Ury\'s advice: be open to reason but closed to pressure. If the other side shows a better standard, accept it; if they just push, ask for the standard behind their number.',
  },
  notes: 'Objective criteria: Fisher, Ury & Patton, Getting to Yes, ch. 5 ("Insist on using objective criteria"; "be open to reason, but closed to threats"). Fictional figures.',
};

export default lesson;
