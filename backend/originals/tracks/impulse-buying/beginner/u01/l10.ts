import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10. Unit Challenge: spot the impulse. Cliffhanger: the pattern. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: spot the impulse',
  summary: 'Efua challenges Kofi: "Read my week and tell me which were impulses." Use everything from Chapter 1. Then Kofi looks at his own log again, and sees something about his feelings he can\'t un-see.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Spot impulse buys in someone else\'s week', 'Use the definition, the five costs and the log together'],
  learn: [
    {
      kind: 'story',
      title: 'Efua\'s week',
      beats: [
        { speaker: 'efua', text: 'Fine, I\'ll try your log. Here\'s my week. Tell me which ones were impulses.' },
        { speaker: 'kofi', text: 'You have urges? You?' },
        { speaker: 'efua', text: 'Everyone has urges, Kofi. I just write mine in a green notebook.' },
        { speaker: 'narrator', text: 'Later, alone, Kofi reads his own log again. Seven late-night urges. And next to every one: bored, stressed, sad. Not once: "I needed this."' },
        { speaker: 'kofi', text: 'I don\'t buy things because I want them. I buy things because I feel bad.' },
        { speaker: 'tey', text: 'That\'s Chapter 1: what an impulse is, wanting versus liking, the urge log, and the five costs. Chapter 2: the feelings underneath. First, Efua\'s week.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 1 challenge: Efua\'s week.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Efua\'s week. Planned, unplanned but fine, or impulse?',
        groups: ['Planned', 'Unplanned but fine', 'Impulse'],
        items: [
          { text: 'Lab coat, on her list for a month', group: 0 },
          { text: 'Pen when hers ran out in class', group: 1 },
          { text: 'Earrings from an ad at midnight after a bad exam', group: 2 },
          { text: 'Bread on the way home, as usual', group: 1 },
          { text: 'A "last one!" bag at the market, not planned, GH₵150', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which sign gave away the midnight earrings?',
        options: [
          { text: 'They were earrings', why: 'The item doesn\'t decide. The situation does.' },
          { text: 'They were cheap', why: 'Price isn\'t the sign.' },
          { text: 'Late at night, after a bad exam, from an ad' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each of Efua\'s impulses to its likely trigger.',
        pairs: [
          ['Midnight earrings', 'A bad exam'],
          ['"Last one!" bag', 'Scarcity'],
          ['Kofi\'s 2:14 a.m. boots', 'A missed penalty'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Efua earns about GH₵30 an hour tutoring. How many hours is the GH₵150 bag?',
        answers: ['5', 'five', '5 hours'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: 'So the bag was an impulse. But I like it. Was it a mistake?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Yes, return it immediately.', why: 'Some impulses turn out fine. The question is whether it was worth it.' },
          { text: 'Not necessarily. Impulses aren\'t all bad. Was it worth all five costs, and did it fit your budget? If yes, fine. If not, now you know.' },
          { text: 'All impulse buys are mistakes.', why: 'Small, affordable ones can be fine.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why did Kofi feel great for four minutes after buying the boots?',
        options: [
          { text: 'The boots were perfect', why: 'Wrong size, no returns.' },
          { text: 'He was proud of the price', why: 'It was the want peaking.' },
          { text: 'The "want" signal peaked, then faded; liking was small' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The five costs.',
        template: 'Money, [[1]], the next [[2]], the feeling, and the [[3]].',
        blanks: [['time'], ['goal'], ['habit']],
        distractors: ['fun', 'loan'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Efua\'s log is missing a key detail?',
        lines: [
          'Tue 12:10 a.m. · in bed · earrings GH₵80 · upset · alone · bought.',
          'Sat 11 a.m. · market · bag GH₵150 · bought.',
          'Thu 4 p.m. · class · pen GH₵3 · fine · with Kofi · bought.',
        ],
        bug: 1,
        fix: 'Sat 11 a.m. · market · bag GH₵150 · excited · with Abena · bought.',
        explanation: 'Without the feeling and who she was with, the pattern stays hidden.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to spot an impulse.',
        lines: ['Was it planned?', 'Was there a sudden urge?', 'Was a feeling or trick involved?', 'Were the usual questions skipped?'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Kofi realise from his own log?',
        options: [
          { text: 'He buys things when he feels bad, not when he needs them' },
          { text: 'He only buys things he needs', why: 'His log said the opposite.' },
          { text: 'Ads don\'t affect him', why: '6 of his 11 urges started with ads.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it help catch impulses, or hide them?',
        groups: ['Helps', 'Hides'],
        items: [
          { text: 'An urge log', group: 0 },
          { text: 'Shame and secrecy', group: 1 },
          { text: 'Counting the five costs', group: 0 },
          { text: '"It\'s only GH₵180"', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi\'s week: 7 of 11 urges were after 10 p.m. How many were before 10 p.m.?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Look at your own log or your last few impulse buys. What feeling shows up most?',
    starters: ['The feeling that shows up most is...', 'It usually happens when...'],
  },
  notes: 'Chapter 1 challenge. Efua\'s week (fictional). Abena mentioned (Efua\'s cousin). Cliffhanger: Kofi\'s realisation (feelings) leads to Chapter 2; outline\'s "six parcels on Yaw\'s bed" is the Chapter 2 cliffhanger.',
};

export default lesson;
