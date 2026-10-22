import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 17 — story choice: an opportunity that fits the plan but costs time. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'The workshop invitation',
  summary: 'Aïcha invites Clinton to a two-day product discovery workshop with drivers in Bafoussam. It fits his plan perfectly. It also lands in the same week as a sync-service deadline. What does he do?',
  minutes: 11,
  outcomes: ['Weigh an opportunity against current commitments', 'Negotiate time openly', 'Protect your reputation while growing'],
  learn: [
    {
      kind: 'story',
      title: 'The invitation',
      beats: [
        { speaker: 'narrator', text: 'Aïcha\'s message: "Two-day discovery workshop with drivers in Bafoussam next week. Want to come? You\'d run two interviews."' },
        { speaker: 'clinton', text: '(to himself) Exactly what my plan needs. But the sync-service milestone is due Thursday.' },
        { speaker: 'tey', text: 'Opportunities rarely arrive at a convenient time. Saying yes to growth while breaking a commitment can cost more than it gains. Often there\'s a way to do both, if you ask early.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Tell Ngozi about both, propose moving one task so the milestone still lands, and agree it before saying yes.',
            outcome: 'Ngozi moves a review to Kemi; Clinton finishes the milestone Tuesday night. He goes to Bafoussam, runs his two interviews, and Aïcha calls them "the best of the workshop".',
            best: true,
          },
          {
            text: 'Say yes to Aïcha and hope the milestone works out.',
            outcome: 'The milestone slips. Ngozi finds out from the team board. His growth plan now looks like it\'s costing the team.',
          },
          {
            text: 'Say no automatically, because he\'s busy.',
            outcome: 'The milestone is fine. But the chance doesn\'t come again for months, and Aïcha stops thinking of him first.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'When growth clashes with a commitment, tell your manager early and propose a way to do both. Agree before you say yes.',
    },
  ],
  apply: {
    scenario: 'The Bafoussam workshop.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is "say yes and hope" risky?',
        options: [
          { text: 'It isn\'t risky', why: 'The milestone slipped.' },
          { text: 'A broken commitment can make his growth look like a cost to the team' },
          { text: 'Aïcha would be angry', why: 'The team and Ngozi pay the cost.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s approach in order.',
        lines: ['Tell Ngozi about both', 'Propose a way to do both', 'Agree it before saying yes', 'Deliver both'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good move, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Ask Ngozi early', group: 0 },
          { text: 'Hope the milestone works out', group: 1 },
          { text: 'Propose moving one task', group: 0 },
          { text: 'Let Ngozi find out from the board', group: 1 },
          { text: 'Finish the milestone early', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s message to Ngozi.',
        from: 'clinton',
        message: 'How do I bring both to Ngozi?',
        options: [
          { text: '"I\'m going to Bafoussam, bye."', why: 'Ask and propose a plan.' },
          { text: '"Should I go?" (no plan)', why: 'Bring a proposal.' },
          { text: '"Aïcha invited me to a two-day driver workshop next week. The sync milestone is Thursday. If Kemi takes one review, I can finish by Tuesday. Would that work?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that damages trust.',
        lines: ['I can finish the milestone by Tuesday.', 'I\'ll just skip the milestone, it\'ll be fine.', 'Kemi could take one review.'],
        bug: 1,
        explanation: 'Breaking a commitment silently costs trust.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Ask early, plan both', 'Milestone done, best interviews'],
          ['Say yes and hope', 'Milestone slips'],
          ['Say no automatically', 'The chance doesn\'t return for months'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What did Aïcha say about his interviews?',
        options: [
          { text: '"The best of the workshop"' },
          { text: '"Too short"', why: 'The best of the workshop.' },
          { text: 'Nothing', why: 'The best of the workshop.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Tell your manager [[1]]. Agree before you say [[2]].',
        blanks: [['early'], ['yes']],
        distractors: ['later', 'no', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which city was the workshop? (one word)',
        answers: ['bafoussam'],
        placeholder: 'A city',
      },
      {
        kind: 'sortGroups',
        prompt: 'Protects his reputation, or risks it?',
        groups: ['Protects', 'Risks'],
        items: [
          { text: 'Delivering the milestone', group: 0 },
          { text: 'Surprising his manager', group: 1 },
          { text: 'Being open about both', group: 0 },
          { text: 'Quietly dropping work', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of an opportunity that clashed with a commitment. How did you handle it? What would you do now?',
    starters: ['The opportunity was...', 'Now I\'d...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Next time an opportunity clashes with a commitment, write a three-line proposal to the person you\'re committed to, before saying yes.',
  },
  notes: 'Bafoussam is a real city in western Cameroon.',
};

export default lesson;
