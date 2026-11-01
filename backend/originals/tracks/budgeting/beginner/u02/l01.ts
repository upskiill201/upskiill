import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story with a choice: the instant loan ad. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'GH₵500 in 5 minutes',
  summary: 'Day 13, GH₵63, 18 days to go. At 1 a.m. an ad pops up: "GH₵500 in 5 minutes. No questions." You decide what Kofi does next.',
  minutes: 12,
  outcomes: [
    'Spot the pull of "easy money" when you\'re short',
    'Weigh three ways out of a cash gap',
    'Choose the option that doesn\'t make next month worse',
  ],
  learn: [
    {
      kind: 'story',
      title: '1 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Day 13, 1 a.m. Kofi can\'t sleep. He\'s scrolling. Between two football clips, an ad.' },
        { speaker: 'narrator', text: '"Short of cash? Get GH₵500 in 5 minutes. No paperwork. No questions. Tap to apply."' },
        { speaker: 'kofi', text: 'GH₵500. That would fix everything. I pay it back when Mum sends money on the 1st. Easy.' },
        { speaker: 'narrator', text: 'Above the ad, two unread chats. Efua: "Did you solve your case?" Mum: a voice note he hasn\'t played.' },
        { speaker: 'tey', text: 'This is the moment most money stories turn. When you\'re short, the fastest option looks like the best one. Let\'s slow it down. Three doors. Pick one.' },
      ],
      choice: {
        prompt: 'What should Kofi do tonight?',
        options: [
          { text: 'Tap the ad and take the GH₵500.', outcome: 'Fast money, with a cost buried in the small print. On the 1st he\'d owe much more than GH₵500, out of an allowance that already doesn\'t last. Next month starts in a hole. We\'ll see exactly how deep in lesson 6.' },
          { text: 'Message Efua and make a survival plan for 18 days.', outcome: 'Slower, less exciting, and it works. Efua lives on GH₵1,100. If anyone knows how to stretch GH₵63, she does. This is what Kofi does.', best: true },
          { text: 'Play Mum\'s voice note and tell her everything.', outcome: 'Brave, and he may need to. But he\'d be asking without a plan. Tey\'s advice: make the plan first, then talk to her with it in your hand.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'When you\'re short of money, "fast" and "easy" are the two words to be most careful of. Fast money is usually the most expensive money there is.',
    },
  ],
  apply: {
    scenario: 'Three doors at 1 a.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does the loan ad look so good to Kofi right now?',
        options: [
          { text: 'Because loans are always a good deal', why: 'Some loans are useful. Instant ones are usually the most expensive kind.' },
          { text: 'Because he\'s short, tired and it\'s 1 a.m., so the fastest fix feels like the best one' },
          { text: 'Because GH₵500 is a small amount', why: 'It\'s a third of his monthly allowance. Not small for him.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which phrases in money ads should make you slow down?',
        groups: ['Slow down', 'Fine'],
        items: [
          { text: '"No questions asked"', group: 0 },
          { text: '"Total cost shown before you agree"', group: 1 },
          { text: '"Money in 5 minutes"', group: 0 },
          { text: '"Read the full terms"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: 'Did you solve your case?',
        prompt: 'Kofi\'s most useful reply?',
        options: [
          { text: 'Yes. And now I have GH₵63 for 18 days. Can you help me make a plan?' },
          { text: 'Yes, all fine.', why: 'That\'s the "everything\'s fine" trap again. Efua can only help if she knows.' },
          { text: 'I\'m taking a loan, sorted.', why: 'He hasn\'t checked what it costs. Asking first is cheaper.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵500 is what fraction of Kofi\'s GH₵1,500 allowance? (Write it like 1/2.)',
        answers: ['1/3', 'a third', 'one third', '1 third'],
        placeholder: 'A fraction',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each door to what happens next.',
        pairs: [
          ['Take the instant loan', 'Next month starts owing more'],
          ['Make a plan with Efua', 'Slow, but no new debt'],
          ['Tell Mum with no plan', 'Brave, but nothing to show her'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s warning.',
        template: '[[1]] money is usually the most [[2]] money there is.',
        blanks: [['Fast'], ['expensive']],
        distractors: ['Free', 'honest'],
      },
      {
        kind: 'findBug',
        prompt: 'Kofi\'s 1 a.m. thinking. Which line is the trap?',
        lines: [
          'I have GH₵63 for 18 days.',
          'I\'ll take GH₵500 now and pay it back easily on the 1st.',
          'Efua might know how to stretch it.',
        ],
        bug: 1,
        fix: 'If I borrow now, I\'ll owe more on the 1st, from money that already doesn\'t last.',
        explanation: '"Easily" assumes next month will go better, with less money in it. That\'s backwards.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Tey\'s plan for a cash gap.',
        lines: ['Stop and don\'t tap anything at 1 a.m.', 'Ask someone you trust for ideas', 'Make a plan for the days left', 'Then talk to family, plan in hand'],
      },
      {
        kind: 'mcq',
        prompt: 'If Kofi borrows GH₵500 and repays more than that on the 1st, what happens to month 2?',
        options: [
          { text: 'It starts with less than GH₵1,500 to spend' },
          { text: 'Nothing changes', why: 'The repayment comes out of next month\'s money.' },
          { text: 'It gets easier', why: 'Less money and the same leaks make it harder.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Which choice did Kofi make, and why is it a good one?',
        options: [
          { text: 'Took the loan: fastest', why: 'Not this time, and good thing too.' },
          { text: 'Called Mum at 1 a.m.', why: 'He\'ll talk to her, with a plan.' },
          { text: 'Asked Efua for a survival plan: no new debt, and he learns how to stretch money' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you were short of money. What did you do? Was there an option you didn\'t think of until later?',
    starters: ['When I was short, I...', 'Looking back, I could have...'],
  },
  deepen: {
    title: 'Why 1 a.m. decisions go wrong',
    summary: 'Tiredness, stress and worry all make us favour quick fixes over better ones. A simple rule helps: no money decisions after midnight. If it\'s still a good idea in the morning, it will still be there.',
  },
  notes: 'Fictional ad. No lender named (playbook §9). Lesson 6 of this chapter covers instant-loan costs with illustrative numbers.',
};

export default lesson;
