import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Reading: why we only hear what we want. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Why we hear what we want',
  summary: 'Clinton re-reads the group chats and finds three messages he\'d skipped: "the food stalls are right there though", "I\'m broke till month end", "who orders delivery in Molyko lol". His brain filtered them out.',
  minutes: 12,
  outcomes: [
    'Recognise confirmation bias in your own idea',
    'Know why people overstate what they\'d pay',
    'Look for evidence that could prove you wrong',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Two traps',
      html: '<p><strong>Trap 1: we notice what agrees with us.</strong> Psychologists call it <em>confirmation bias</em>. Once you love an idea, you remember the forty fire emojis and skim past the three doubts. Clinton didn\'t ignore them on purpose. He just didn\'t see them.</p><p>The three messages he missed:</p><ul><li>"the food stalls are right there though"</li><li>"I\'m broke till month end"</li><li>"who orders delivery in Molyko lol"</li></ul><p>Each one attacks his riskiest assumption: that students will pay for delivery.</p><p><strong>Trap 2: people overstate what they\'d pay.</strong> When the money is imaginary, saying "yes, I\'d pay" is free. Research on <em>hypothetical bias</em> finds that what people say they\'d pay is often much higher than what they actually pay when it\'s real.</p><p>Two habits beat both traps:</p><ol><li><strong>Hunt for the doubters.</strong> Search for "but", "though" and "broke". Write every doubt down next to the compliments.</li><li><strong>Make it real.</strong> Ask for actual money, even a small amount, instead of asking "would you pay?".</li></ol>',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'The evidence that could prove you wrong is the most valuable evidence you have. Go looking for it.',
    },
  ],
  apply: {
    scenario: 'The messages Clinton missed.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is confirmation bias?',
        options: [
          { text: 'Confirming an order with a customer', why: 'It\'s a thinking trap, not a business step.' },
          { text: 'Noticing and remembering evidence that agrees with what we already believe' },
          { text: 'Asking for proof of payment', why: 'That\'s a good habit, not the bias.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Supports the idea, or doubts it?',
        groups: ['Supports', 'Doubts'],
        items: [
          { text: '"Bro this is genius"', group: 0 },
          { text: '"the food stalls are right there though"', group: 1 },
          { text: '"When can I use it?"', group: 0 },
          { text: '"I\'m broke till month end"', group: 1 },
          { text: '"who orders delivery in Molyko lol"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Those three doubters are just negative people. I\'ll ignore them.',
        prompt: "David's best reply?",
        options: [
          { text: 'Yes, block them.', why: 'Doubts are free warnings.' },
          { text: 'Argue with them until they agree.', why: 'Winning an argument doesn\'t change what they\'ll pay.' },
          { text: 'They\'re telling you the most useful thing in the chat: why people might NOT pay. Write their doubts on your board.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the trap to the habit that beats it.',
        pairs: [
          ['Confirmation bias', 'Hunt for the doubters'],
          ['Hypothetical bias', 'Ask for real money'],
          ['Polite compliments', 'Ask for a commitment'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Searching the chats for doubts.',
        template: 'Search for words like "[[1]]", "though" and "[[2]]".',
        blanks: [['but'], ['broke']],
        distractors: ['wow', 'genius'],
      },
      {
        kind: 'mcq',
        prompt: 'Which doubt attacks Clinton\'s riskiest assumption most directly?',
        options: [
          { text: '"nice logo"', why: 'That\'s not a doubt about paying.' },
          { text: '"the food stalls are right there though"' },
          { text: '"what time do you close?"', why: 'A question about details, not about paying.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Of the 43 messages Clinton reviewed, 40 were fire emojis and the rest were doubts. How many doubts?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s notes shows confirmation bias?',
        lines: [
          'Forty fire emojis.',
          'Three doubts about paying for delivery.',
          'Summary: everyone loves it, no concerns.',
          'Next: test whether people actually pay.',
        ],
        bug: 2,
        fix: 'Summary: 40 likes, 3 doubts about paying; paying is untested.',
        explanation: 'The summary drops the three doubts he just wrote down.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order an honest review of feedback.',
        lines: ['Collect every message', 'Search for doubts ("but", "though", "broke")', 'List doubts next to the compliments', 'Check which assumption each doubt attacks'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Hypothetical or real?',
        groups: ['Hypothetical', 'Real'],
        items: [
          { text: '"I would pay 1,000 FCFA for that"', group: 0 },
          { text: 'Paid 500 FCFA on Mobile Money', group: 1 },
          { text: '"I\'d probably order every day"', group: 0 },
          { text: 'Ordered three times last week', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What have people said about your idea that you\'d rather not hear? Write it down. Which assumption does it attack?',
    starters: ['Someone said...', 'It attacks my assumption that...'],
  },
  deepen: {
    title: 'Look for the "disconfirming" case',
    summary: 'Scientists try to prove themselves wrong; it\'s how they avoid fooling themselves. Treat your idea the same way: what result would make you stop? Go and look for it.',
  },
  notes: 'Confirmation bias: Nickerson (1998), Review of General Psychology. Hypothetical bias in stated willingness to pay: meta-analyses (e.g. Murphy et al. 2005, Environmental and Resource Economics) find stated values exceed real payments on average. Mobile Money is widely used in Cameroon. Chat messages are fictional.',
};

export default lesson;
