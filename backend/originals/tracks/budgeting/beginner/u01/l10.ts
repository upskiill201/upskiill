import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10. Unit Challenge: solve the case. Cliffhanger: Mum calls. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: solve the case',
  summary: 'Kofi lays out twelve days of evidence. There\'s no single culprit, but there is an answer. Use everything from Chapter 1 to close the case. Then his phone rings. It\'s Mum.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Solve a missing-money case from real evidence', 'Name the leaks that matter most'],
  learn: [
    {
      kind: 'story',
      title: 'Case closed',
      beats: [
        { speaker: 'narrator', text: 'Day 13. Kofi sends Miracle his one-page money sheet. She replies with a voice note from Lagos.' },
        { speaker: 'miracle', text: 'Kofi! I had the same sheet in my first year, nearly line for line. So, who\'s the culprit?' },
        { speaker: 'kofi', text: 'No single culprit. It\'s a gang. Food bought out, four times a day. Lending. Daily data. And a lot of "small small".' },
        { speaker: 'miracle', text: 'Correct. You\'ve done the hardest part: you can see it. Now, what about the next 18 days?' },
        { speaker: 'narrator', text: 'His phone rings. "MUM" on the screen.' },
        { speaker: 'narrator', text: '"Kofi! I\'m closing the stall. How is the money holding? Do you need anything?"' },
        { speaker: 'kofi', text: '...It\'s fine, Mum. Everything\'s fine.' },
        { speaker: 'tey', text: 'Ooh. That\'s Chapter 1: the case is solved, the leaks have names. But GH₵63 still has to last 18 days, and Kofi has just told Mum everything\'s fine. Chapter 2 starts now.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 1 challenge: solve the case.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'File each piece of evidence: money in or money out?',
        groups: ['In', 'Out'],
        items: [
          { text: 'GH₵80 for a beat', group: 0 },
          { text: 'GH₵27 in fees', group: 1 },
          { text: 'GH₵1,500 allowance', group: 0 },
          { text: 'GH₵200 to Yaw', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Total in GH₵1,580, left GH₵63. How much went out?',
        answers: ['1517', '1,517', 'GH₵1,517', 'GH₵1517'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Who\'s the culprit in the case of the missing cedis?',
        options: [
          { text: 'Yaw, who borrowed GH₵200', why: 'GH₵200 is part of it, but GH₵1,317 more went elsewhere.' },
          { text: 'A gang of habits: food bought out, lending, daily data and many small payments' },
          { text: 'The welcome party', why: 'GH₵150, one night. Not even the biggest line.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fixed, flexible or one-off?',
        groups: ['Fixed', 'Flexible', 'One-off'],
        items: [
          { text: 'Church dues every month', group: 0 },
          { text: 'Kelewele at night', group: 1 },
          { text: 'Welcome party', group: 2 },
          { text: 'Transport to town', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each Chapter 1 idea to where it showed up in the case.',
        pairs: [
          ['In − Out = Left', '1,580 − 1,517 = 63'],
          ['Price × how often', 'GH₵55 a day becomes GH₵1,650 a month'],
          ['Pain of paying', 'Tapping confirm felt like nothing'],
          ['Read the history', '94 lines, not 20'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Daily bundles: GH₵10 a day. What would 30 days cost?',
        answers: ['300', 'GH₵300', '300 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Which of your leaks will you work on first?',
        prompt: 'Kofi\'s best answer?',
        options: [
          { text: 'Fees. Every cedi counts.', why: 'Fees are real, but GH₵27 next to GH₵660. Start with the biggest flexible line.' },
          { text: 'All of them, starting tomorrow, all at once.', why: 'Fixing everything at once rarely lasts. One or two big ones first.' },
          { text: 'Food bought out: it\'s the biggest and I decide it every day. Then data.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Kofi\'s case notes. Which conclusion is wrong?',
        lines: [
          'Food bought out was about 44% of my spending.',
          'Lending counts as money out until it comes back.',
          'The fees don\'t matter at all.',
          'Most of my spending was flexible.',
        ],
        bug: 2,
        fix: 'The fees are small but unplanned; fewer, bigger cash-outs would cut them.',
        explanation: 'Small isn\'t the same as nothing. GH₵27 in 12 days is about GH₵65 a month.',
      },
      {
        kind: 'mcq',
        prompt: 'GH₵63 for 18 days. What does Kofi most need now?',
        options: [
          { text: 'A plan for the next 18 days, starting with what he really needs' },
          { text: 'A new phone to track spending better', why: 'His phone already holds the evidence. And there\'s no money for one.' },
          { text: 'To forget about it until next month', why: 'Then day 12 comes back.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Kofi solved the case.',
        lines: ['Noticed GH₵63 on day 12', 'Counted all money in', 'Read 94 lines of history', 'Grouped them into categories', 'Named the biggest leaks'],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi told Mum "Everything\'s fine". What might that cost him?',
        options: [
          { text: 'Nothing; it\'s his business', why: 'It is his business, but she\'s the one funding it, and she offered help.' },
          { text: 'She can\'t help or advise, and the secret gets harder to tell later' },
          { text: 'She\'ll stop sending money', why: 'Nothing suggests that. The risk is the secret growing.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In one word: what was the first thing Kofi needed before any plan could work? (Hint: you can\'t fix a leak you can\'t ...)',
        answers: ['see', 'see it', 'visibility'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'You have your own case file now. Who\'s the culprit in your money? And is there anyone you\'ve been telling "everything\'s fine"?',
    starters: ['My biggest leak is...', 'I\'ve been telling...'],
  },
  notes: 'Chapter 1 challenge. Case total 1,517 = food 660 + lent 200 + course pack 180 + party 150 + data 120 + small 100 + transport 80 + fees 27. Fees 27 in 12 days ≈ 67.5 in 30 → "about GH₵65". Cliffhanger: Kofi lies to Mum, setting up Chapter 2.',
};

export default lesson;
