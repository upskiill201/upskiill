import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story with a choice: ₹12 lakh. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '₹12 lakh',
  summary: 'The Harlow & Finch money lands. After paying Kavya and Joel and setting tax aside, Arjun has ₹12 lakh, and within a week four people have told him exactly what to do with it. What does he do first?',
  minutes: 12,
  outcomes: [
    'Avoid deciding under pressure',
    'Park money safely while you learn',
    'See why "what can go wrong?" is the first question',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Everyone has a plan',
      beats: [
        { speaker: 'narrator', text: 'Indiranagar, 11 p.m. Arjun stares at his banking app. ₹12,00,000. He has never seen a number like it with his name on it.' },
        { speaker: 'narrator', text: 'By Sunday: cousin Vikram: "Options, bro. I made ₹2 lakh last month." His uncle: "Land near Mysuru. Land never falls." A WhatsApp group someone added him to: "3% a month, guaranteed."' },
        { speaker: 'kavya', text: 'Crypto. All of it. My friend doubled hers in four months.' },
        { speaker: 'grace', text: 'From Manchester, on their weekly call: "Arjun, when a client brings you a system you\'ve never seen, what do you do?"' },
        { speaker: 'arjun', text: 'Find out how it fails before I trust it.' },
        { speaker: 'tey', text: 'Money works the same way. Before any decision, there\'s a first step. What should Arjun do this week?' },
      ],
      choice: {
        prompt: 'What should Arjun do first?',
        options: [
          { text: 'Pick the idea with the biggest return before the chance disappears.', outcome: '"Before the chance disappears" is how people make their worst money decisions. Real opportunities don\'t usually vanish in a week. Scams and bubbles often do.' },
          { text: 'Split it four ways so nobody\'s offended.', outcome: 'That\'s choosing by people, not by risk. He\'d own four things he doesn\'t understand.' },
          { text: 'Park it somewhere safe and easy to reach, then take a few weeks to learn how each option can go wrong before deciding anything.', outcome: 'Yes. A few weeks of learning costs him almost nothing. A rushed decision could cost him lakhs. The money isn\'t going anywhere.', best: true },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'This course teaches how risk works, not what to buy. For your own situation, consider an independent, qualified and regulated adviser.',
    },
  ],
  apply: {
    scenario: 'The first week.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is "before the chance disappears" a warning sign?',
        options: [
          { text: 'It means the deal is good', why: 'Urgency is a pressure tactic, not a quality sign.' },
          { text: 'Pressure to decide fast stops you checking the risks' },
          { text: 'It\'s polite', why: 'It\'s pressure.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to their idea.',
        pairs: [
          ['Vikram', 'Options trading'],
          ['His uncle', 'Land near Mysuru'],
          ['The WhatsApp group', '3% a month, guaranteed'],
          ['Kavya', 'Crypto, all of it'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Calm first step, or pressured move?',
        groups: ['Calm first step', 'Pressured move'],
        items: [
          { text: 'Park it safely while learning', group: 0 },
          { text: '"Decide tonight or miss out"', group: 1 },
          { text: 'Ask how each option can fail', group: 0 },
          { text: 'Split it so nobody\'s offended', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'You\'re wasting time! Crypto could double while you\'re reading.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Fine, all of it tonight.', why: 'That\'s deciding under pressure.' },
          { text: 'Crypto is always a scam.', why: 'Too absolute; the point is to understand the risk.' },
          { text: 'It could. It could also halve. I want to understand which before I put lakhs in.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The first question.',
        template: 'Find out how it [[1]] before you [[2]] it.',
        blanks: [['fails', 'can fail'], ['trust']],
        distractors: ['grows', 'sell'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Arjun has ₹12 lakh. Written in full, how many rupees is that? (Digits only.)',
        answers: ['1200000', '12,00,000', '1,200,000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Arjun\'s first-week plan doesn\'t fit?',
        lines: [
          'Move the money to a safe, reachable account.',
          'Spend a few weeks learning how each option can go wrong.',
          'Commit to the WhatsApp group\'s offer while I learn.',
        ],
        bug: 2,
        fix: 'Make no commitments until I\'ve learnt.',
        explanation: 'The point of the pause is that nothing is decided yet.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does Grace\'s question help Arjun?',
        options: [
          { text: 'It reminds him to treat money like any system: understand the failures first' },
          { text: 'It tells him what to buy', why: 'It gives him a method, not a product.' },
          { text: 'It doesn\'t', why: 'It connects to how he already works.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What does a few weeks of learning cost Arjun?',
        options: [
          { text: 'Lakhs in lost returns', why: 'A few weeks rarely matters over a lifetime.' },
          { text: 'His whole windfall', why: 'The money stays safe while he learns.' },
          { text: 'Almost nothing, compared with the risk of a rushed decision' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Arjun\'s first week.',
        lines: ['Pause; no decisions yet', 'Park the money safely', 'List every idea he\'s been given', 'Start learning how each can go wrong'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever made a money decision under pressure? What made it feel urgent?',
    starters: ['I once...', 'It felt urgent because...'],
  },
  deepen: {
    title: 'Windfalls',
    summary: 'Research on lottery winners and people receiving large sudden sums suggests windfalls are often spent or lost faster than earned money. A deliberate pause, and a plan made slowly, are some of the best protections.',
  },
  notes: 'General principles only (playbook §9). Cast: Arjun, Kavya, Grace per CAST; Vikram, uncle, WhatsApp group narrated. Windfall research stated qualitatively.',
};

export default lesson;
