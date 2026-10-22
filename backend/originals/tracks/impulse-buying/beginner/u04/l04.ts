import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Card deck: group spending. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Birthdays, trips and contributions',
  summary: 'Some of the hardest spending to control isn\'t yours alone: the group birthday, the team trip, the "everyone\'s putting in GH₵50" for a gift. Four cards on group spending, and how to take part without breaking your budget.',
  minutes: 10,
  outcomes: [
    'Plan for group spending in your budget',
    'Suggest cheaper group options without being "the cheap one"',
    'Give what fits when a contribution is asked',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Why group spending is hard.</strong> Saying no to a shop is easy. Saying no to friends feels like saying no to the friendship. And in a group, the amount is often decided by the person with the most money, or the loudest voice.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Plan for it.</strong> Group spending is predictable: birthdays, end-of-semester trips, weddings, funerals, church harvest. Put a "people" line or sinking fund in your budget. Kofi has GH₵30 a month for gifts and contributions.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Suggest early.</strong> The best time to shape group spending is before the plan is made. "What if we do a cookout at the hall instead of the restaurant?" is easy to say on day one, and almost impossible after everyone\'s booked. Often someone else was hoping for the cheaper option too.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Give what fits.</strong> When a contribution is asked, give what your people line allows, warmly and without apology: "I can do GH₵20. Count me in for the card." No one should have to borrow to give a gift. Time and effort count too: organising, cooking, decorating.</p>',
    },
    {
      kind: 'check',
      question: 'The group is choosing between a restaurant (GH₵120 each) and a hall cookout (GH₵30 each). When is the best time to suggest the cookout?',
      options: ['After everyone has booked', 'Before the plan is made', 'Never; go along with it'],
      answer: 1,
      explanation: 'Early suggestions shape the plan. Late ones feel like backing out.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Plan a "people" line, suggest cheaper options early, and give what fits without apology. Time and effort count as gifts too.',
    },
  ],
  apply: {
    scenario: 'Group spending.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Good way to handle group spending, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'A "people" line in the budget', group: 0 },
          { text: 'Borrowing to match everyone\'s contribution', group: 1 },
          { text: 'Suggesting a cheaper plan on day one', group: 0 },
          { text: 'Saying yes to everything, then going broke', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Restaurant GH₵120 each vs cookout GH₵30 each. How much does each person save with the cookout?',
        answers: ['90', 'GH₵90', '90 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Everyone\'s putting GH₵100 into the captain\'s birthday gift. You in?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'I can do GH₵20, and I\'ll organise the cake and the card. Count me in.' },
          { text: 'Sure, GH₵100.', why: 'His people line is GH₵30 a month.' },
          { text: 'No, gifts are a waste.', why: 'Cold. Give what fits, plus effort.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each group cost to a cheaper version.',
        pairs: [
          ['Restaurant birthday', 'Hall cookout'],
          ['Weekend trip', 'Day trip'],
          ['Expensive group gift', 'Smaller gift plus a handmade card'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The three moves.',
        template: 'Plan a [[1]] line, suggest cheaper options [[2]], give what [[3]].',
        blanks: [['people'], ['early'], ['fits']],
        distractors: ['loan', 'late'],
      },
      {
        kind: 'mcq',
        prompt: 'Why might someone else in the group be glad you suggested the cheaper option?',
        options: [
          { text: 'They want to save your money', why: 'More likely, their own.' },
          { text: 'They may have been hoping for it too, but didn\'t want to be the one to say it' },
          { text: 'Nobody ever is', why: 'Often, several people are relieved.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which response to a contribution request will hurt Kofi\'s budget?',
        lines: [
          'I can do GH₵20 from my people line.',
          'I\'ll help decorate.',
          'I\'ll borrow GH₵80 so I can give the same as everyone.',
        ],
        bug: 2,
        fix: 'Give what fits; effort counts too.',
        explanation: 'Borrowing to give turns a gift into a debt.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A people line of GH₵30 a month. How much is that over a year?',
        answers: ['360', 'GH₵360', '360 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which group events are predictable enough to plan for?',
        options: [
          { text: 'None of them', why: 'Most are known well ahead.' },
          { text: 'Only weddings', why: 'Most group costs are predictable.' },
          { text: 'Birthdays, end-of-term trips, weddings, church harvest' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to handle a group plan.',
        lines: ['Check your people line', 'Suggest a cheaper option early', 'Give what fits', 'Add effort if you can'],
      },
    ],
  },
  reflect: {
    prompt: 'What group spending is coming up for you? What could you suggest, early, to make it cheaper for everyone?',
    starters: ['Coming up:...', 'I could suggest...'],
  },
  deepen: {
    title: 'Contributions in many cultures',
    summary: 'In many communities, contributing to weddings, funerals and celebrations is an important duty, and amounts can be large. A dedicated sinking fund for these, built a little each month, keeps the duty without the debt.',
  },
  notes: 'Fictional amounts. Cultural contribution norms (funerals, weddings) noted respectfully, no judgement.',
};

export default lesson;
