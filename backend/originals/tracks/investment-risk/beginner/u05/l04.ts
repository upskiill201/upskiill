import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Card deck: the psychology behind bad bets. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The bugs in our heads',
  summary: 'Arjun treats bad money decisions like bugs: predictable, reproducible, fixable. Three cards on the mind bugs that every scam and bad bet exploits.',
  minutes: 10,
  outcomes: [
    'Recognise FOMO, loss aversion and overconfidence',
    'See how scams and bad bets exploit them',
    'Use a simple fix for each',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Bug 1: FOMO (fear of missing out).</strong> Watching others seem to get rich feels like losing. Schemes feed it with screenshots and "limited slots". <em>Fix:</em> a 24-hour rule. No money decision on the same day you first hear about it.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Bug 2: loss aversion and "win it back".</strong> Losses hurt roughly twice as much as equal gains feel good. So people take bigger risks to avoid admitting a loss, like Vikram trading harder after each bad month. <em>Fix:</em> decide your limits in advance, and treat money already lost as gone, not as something to chase.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Bug 3: overconfidence.</strong> Most people think they\'re above-average drivers, and above-average traders. It\'s why 9 in 10 can lose while each believes they\'ll be the exception. <em>Fix:</em> ask "what would I tell a friend who said this?", and look at the base rate, like SEBI\'s numbers.</p>',
    },
    {
      kind: 'check',
      question: 'Vikram trades harder after every loss to "win it back". Which bug is that?',
      options: ['Loss aversion', 'FOMO', 'Diversification'],
      answer: 0,
      explanation: 'Not wanting to accept a loss leads to bigger risks.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'FOMO: wait 24 hours. Loss aversion: set limits in advance; don\'t chase losses. Overconfidence: check the base rate and imagine advising a friend.',
    },
  ],
  apply: {
    scenario: 'Mind bugs.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each bug to its fix.',
        pairs: [
          ['FOMO', 'A 24-hour rule'],
          ['Loss aversion', 'Set limits in advance; don\'t chase'],
          ['Overconfidence', 'Check the base rate'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which bug is being exploited?',
        groups: ['FOMO', 'Overconfidence'],
        items: [
          { text: '"Only 5 slots left!"', group: 0 },
          { text: '"You\'re smarter than other traders"', group: 1 },
          { text: 'Screenshots of others\' payouts', group: 0 },
          { text: '"You can beat the market"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Roughly how much more do losses hurt than equal gains feel good?',
        options: [
          { text: 'Exactly the same', why: 'Research finds losses hurt more.' },
          { text: 'About twice as much' },
          { text: 'Ten times less', why: 'They hurt more.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Everyone in my group made money on a new coin today. I\'m buying now!',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Quick, buy before it\'s too late.', why: 'That\'s the bug.' },
          { text: 'Everyone is lying.', why: 'Some may have made money; the point is to wait.' },
          { text: 'That\'s FOMO talking. Wait 24 hours. If it\'s still a good idea tomorrow, it\'ll still be there.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The FOMO fix.',
        template: 'No money decision on the same [[1]] you first [[2]] about it.',
        blanks: [['day'], ['hear']],
        distractors: ['month', 'forget'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many hours is Arjun\'s rule?',
        answers: ['24', 'twenty-four'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which thought is overconfidence?',
        lines: [
          'Most individual traders lose money.',
          'I\'d tell a friend to be very careful.',
          'But I\'m different; I\'ve watched lots of videos.',
        ],
        bug: 2,
        fix: 'The base rate applies to me too.',
        explanation: 'Almost every trader believes they\'re the exception.',
      },
      {
        kind: 'mcq',
        prompt: 'What should you do with money already lost?',
        options: [
          { text: 'Chase it with bigger bets', why: 'That\'s how losses grow.' },
          { text: 'Treat it as gone, not as something to chase' },
          { text: 'Pretend it didn\'t happen', why: 'Accept it, learn, move on.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Arjun\'s debugging routine for a tempting offer.',
        lines: ['Notice the feeling (excitement, fear)', 'Name the bug', 'Apply the fix', 'Decide after 24 hours'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does "what would I tell a friend?" help?',
        options: [
          { text: 'Friends know best', why: 'It\'s about distance from your own feelings.' },
          { text: 'It doesn\'t', why: 'It reduces overconfidence.' },
          { text: 'We judge others\' bets more calmly than our own' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of the three bugs catches you most often? What\'s your fix?',
    starters: ['The bug is...', 'My fix:...'],
  },
  deepen: {
    title: 'Prospect theory',
    summary: 'Psychologists Daniel Kahneman and Amos Tversky\'s prospect theory (1979) showed people weigh losses more heavily than gains. Kahneman later won the Nobel Prize in economics, partly for this work.',
  },
  notes: 'Loss aversion ~2x (Kahneman & Tversky 1979; Tversky & Kahneman 1992 estimate λ ≈ 2.25). Overconfidence: Svenson 1981 driver study.',
};

export default lesson;
