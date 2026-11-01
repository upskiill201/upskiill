import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10. Final challenge: the whole course. Ending. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Final challenge: Amma\'s friend\'s offer',
  summary: 'Six months later, a new offer reaches the family: "forex robot, 4% a month, used by NRIs". Use everything from the whole course to take it apart. Then, at Sunday lunch in Mysuru, Arjun\'s map gets a new reader.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  xp: 30,
  outcomes: ['Judge any offer using the whole course', 'Protect family with the map'],
  learn: [
    {
      kind: 'story',
      title: 'Sunday lunch, six months later',
      beats: [
        { speaker: 'narrator', text: 'Amma, passing the rasam: "Aunty\'s nephew has a forex robot. 4% a month. All the NRIs use it. There\'s a bonus if we bring people."' },
        { speaker: 'arjun', text: 'Amma, let\'s use the family rule. Twenty-four hours, and we check it together.' },
        { speaker: 'narrator', text: 'Across the table, Vikram, who now puts ₹10,000 a month into a broad, boring plan, quietly takes out his phone and searches the regulator\'s list.' },
        { speaker: 'narrator', text: 'Appa, slowly: "Son. Print me a copy of that map of yours."' },
        { speaker: 'tey', text: 'Risk and return, the five kinds of risk, time and goals, spreading, and too good to be true. Arjun\'s windfall turned into a system that protects his whole family. Now, the forex robot.' },
      ],
    },
  ],
  apply: {
    scenario: 'Final challenge: "Forex robot, 4% a month, guaranteed. Used by NRIs. Minimum ₹1 lakh, locked 6 months. Referral bonus 5%. Join this week, only 20 places." It isn\'t on the regulator\'s list.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which red flags does the offer show?',
        groups: ['Red flag present', 'Not present'],
        items: [
          { text: 'Guaranteed high returns', group: 0 },
          { text: 'Holdings published', group: 1 },
          { text: 'Referral bonus', group: 0 },
          { text: 'Urgency: "only 20 places"', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Roughly, 4% a month compounds to about what percent a year? (Nearest whole number: 1.04 to the 12th is about 1.60.)',
        answers: ['60', '60%'],
        placeholder: 'A percent',
      },
      {
        kind: 'mcq',
        prompt: 'Using the risk premium idea: what does "60% a year, guaranteed, no risk" tell you?',
        options: [
          { text: 'It\'s hiding enormous risk, or it\'s a scam' },
          { text: 'It\'s a great deal', why: 'High return requires risk.' },
          { text: 'Forex is magic', why: 'No investment pays that safely.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Score it on the three questions from Chapter 1.',
        pairs: [
          ['How far could it fall?', '"It can\'t", a red flag'],
          ['Could it go to zero?', 'Yes, if it\'s a scheme'],
          ['How fast can I get out?', 'Locked for 6 months'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Amma says, "But Aunty\'s nephew is a good boy."',
        prompt: 'What\'s Arjun\'s kindest, firmest reply?',
        options: [
          { text: 'He\'s a criminal.', why: 'He may be a victim too.' },
          { text: 'He may be, Amma. He may have been fooled too. But it isn\'t on SEBI\'s list and it pays for recruits. Our rule says no.' },
          { text: 'Okay, just ₹1 lakh.', why: 'The minimum is still a possible total loss.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The family rule.',
        template: 'Big decisions wait [[1]] hours and get a second [[2]].',
        blanks: [['24', 'twenty-four'], ['opinion']],
        distractors: ['2', 'loan'],
      },
      {
        kind: 'findBug',
        prompt: 'Which family response breaks the course?',
        lines: [
          'Check the regulator\'s list ourselves.',
          'Wait 24 hours.',
          'Put in just the minimum to "test" it.',
        ],
        bug: 2,
        fix: 'Don\'t test a scheme with real money.',
        explanation: 'Schemes often pay small early amounts to hook bigger deposits.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'If the family joined with ₹1,00,000 and it collapsed, how much of it might they get back for certain? (In rupees.)',
        answers: ['0', 'zero', '₹0', 'none', 'nothing'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which mind bug is "only 20 places" aimed at?',
        options: [
          { text: 'Loss aversion', why: 'It\'s about missing out.' },
          { text: 'Diversification', why: 'That\'s not a mind bug.' },
          { text: 'FOMO' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the family\'s response.',
        lines: ['Pause: 24-hour rule', 'Check the regulator\'s list', 'Ask where returns come from', 'Notice the referral bonus', 'Say no kindly'],
      },
      {
        kind: 'mcq',
        prompt: 'Vikram now invests ₹10,000 a month in a broad, boring plan. Which chapter is that?',
        options: [
          { text: 'Chapter 5: options trading', why: 'He stopped trading.' },
          { text: 'Chapter 4: spreading risk' },
          { text: 'None', why: 'It\'s spreading over time and companies.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What is this whole course really about?',
        options: [
          { text: 'Finding the best investment', why: 'No tips here: it\'s about understanding risk.' },
          { text: 'Avoiding all risk', why: 'Doing nothing has risk too.' },
          { text: 'Understanding how money can go wrong, so you can choose risk calmly' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'You\'ve finished Arjun\'s Windfall. Who in your family would most benefit from your red-flag list?',
    starters: ['I\'d share it with...', 'Because...'],
  },
  notes: 'Final challenge (xp 30). 1.04^12 ≈ 1.601. Ending: Vikram\'s ₹10,000/month broad plan; Appa asks for a printed map. Amma, Aunty\'s nephew narrated.',
};

export default lesson;
