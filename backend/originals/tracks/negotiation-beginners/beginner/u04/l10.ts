import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10. Unit Challenge: the rent package. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the rent package',
  summary: 'Round two with Mr Adeyemi. Questions first, then the fair standard, then three packages. He picks one and adds a twist. Everything from Chapter 4.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Run a trading negotiation from questions to agreement', 'Use everything from Chapter 4 together'],
  learn: [
    {
      kind: 'reading',
      title: 'Saturday, round two',
      html: '<p><strong>Questions:</strong> he explains the service charge went up ₦120,000 this year, and his last tenant left with two months\' notice. The flat sat empty for ten weeks.</p><p><strong>Standard:</strong> Ada shows the three listings and her neighbour\'s ₦1,350,000 renewal. He nods: "Your neighbour\'s landlord is my cousin."</p><p><strong>Packages:</strong> A, B and C. He likes B, two years at ₦1,350,000, but asks: "Can you fix that gate lock? It keeps breaking."</p><p><strong>Deal:</strong> ₦1,350,000 a year for two years, and Ada fixes the gate lock herself (about ₦35,000). They shake hands. He says he\'ll send the agreement on Monday.</p>',
    },
    {
      kind: 'story',
      title: 'Walking home',
      beats: [
        { speaker: 'ada', text: '₦1,350,000 for two years! And he thanked ME.' },
        { speaker: 'lucia', text: 'Because he got what he needed most: no empty months. Now the big one. Your review is in nine days.' },
        { speaker: 'tey', text: 'That\'s Chapter 4: interests over positions, trades over splits, packages and fair standards. Next: closing well.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 4 challenge: the rent package.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Ada\'s questions reveal?',
        options: [
          { text: 'He wanted her to leave', why: 'He badly wanted a reliable tenant.' },
          { text: 'His service charge rose and his last tenant left the flat empty for ten weeks' },
          { text: 'Nothing useful', why: 'They showed exactly what he valued.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Two years at ₦1,350,000, against two years at ₦1,500,000. How much does Ada save, in naira?',
        answers: ['300000', '300,000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Minus about ₦35,000 for the gate lock. Net saving, in naira?',
        answers: ['265000', '265,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'What did each side get?',
        groups: ['Ada got', 'He got'],
        items: [
          { text: '₦1,350,000 a year', group: 0 },
          { text: 'Two years without empty months', group: 1 },
          { text: 'A stable budget', group: 0 },
          { text: 'The gate lock fixed', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'He asked for the gate lock at the end. Should I have said no?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'It was cheap for you and mattered to him, and it closed the deal. A good trade, as long as it was the last one.' },
          { text: 'Yes, never accept anything extra.', why: 'This one was small and worth it.' },
          { text: 'You should have offered to repaint too.', why: 'Don\'t add free extras.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Chapter 4 lesson to what Ada used.',
        pairs: [
          ['The spare room', 'Ask what each needs it for'],
          ['Splitting vs trading', 'Add issues beyond price'],
          ['Questions', '"What worries you?"'],
          ['MESOs', 'Packages A, B and C'],
          ['Fair standards', 'The neighbour\'s renewal'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Why he thanked her.',
        template: 'He got what he needed [[1]]: no [[2]] months.',
        blanks: [['most'], ['empty']],
        distractors: ['least', 'rainy'],
      },
      {
        kind: 'mcq',
        prompt: 'How does ₦1,350,000 compare with Ada\'s goal and walk-away?',
        options: [
          { text: 'Above her walk-away', why: '₦1,350,000 is below ₦1,450,000.' },
          { text: 'Just above her ₦1,300,000 goal, well below her ₦1,450,000 walk-away' },
          { text: 'Below her goal', why: 'It\'s ₦50,000 above her goal.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s meeting notes is a mistake for next time?',
        lines: [
          'Asked questions first.',
          'Showed the listings and neighbour\'s renewal.',
          'Forgot to ask for the deal in writing.',
          'Offered three packages.',
        ],
        bug: 2,
        fix: 'Ask for a written agreement, and confirm by message.',
        explanation: 'A handshake is a start; writing makes it a deal. That\'s Chapter 5.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order round two.',
        lines: ['Questions', 'Fair standard', 'Three packages', 'His choice plus one small ask', 'Handshake'],
      },
    ],
  },
  reflect: {
    prompt: 'Plan a trading negotiation of your own: questions, issues, two packages and a fair standard.',
    starters: ['My questions:...', 'My packages:...'],
  },
  deepen: {
    title: 'The last small ask',
    summary: 'Small asks at the very end are common. One cheap, reasonable extra can close a deal well. A string of them is a tactic called nibbling, covered in How to Handle Difficult Negotiations.',
  },
  notes: 'Chapter 4 challenge (fictional): service charge +₦120,000; flat empty 10 weeks; deal ₦1,350,000 × 2 years + Ada fixes gate lock (~₦35,000); saving ₦300,000 over 2 years, net ₦265,000. Review in nine days.',
};

export default lesson;
