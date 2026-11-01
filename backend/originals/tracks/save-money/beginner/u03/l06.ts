import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Chat with Tey: susu and savings groups. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Susu: saving together',
  summary: 'Efua\'s hall runs a savings group: six friends, GH₵50 each every week, and every sixth week one of them takes home GH₵300. She invites Kofi. Should he join? Tey explains how savings groups work, and what can go wrong.',
  minutes: 12,
  outcomes: [
    'Explain how a rotating savings group works',
    'Explain how a traditional susu collector works',
    'Weigh the benefits and risks before joining',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Savings groups are some of the oldest money tools in the world. In Ghana, susu. In Cameroon, njangi or tontine. In Kenya, chama. In South Asia, committees. The idea is the same.', replies: ['How does Efua\'s one work?'] },
        { tey: 'Six friends each pay GH₵50 every week. Every week, one person takes the whole pot, GH₵300, in an agreed order. After six weeks, everyone has paid GH₵300 and received GH₵300 once.', replies: ['So nobody gains anything?'] },
        { tey: 'Nobody gains extra money. What you gain is discipline: you pay because your friends are counting on you. And whoever goes early gets a lump sum sooner, like an interest-free loan from the group.', replies: ['And a susu collector?'] },
        { tey: 'Traditional susu collectors in Ghana go round markets collecting a fixed amount daily from traders. At the end of the month you get it back, minus a fee, traditionally one day\'s contribution. Mum has used one for years at Makola.', replies: ['What can go wrong?'] },
        { tey: 'Trust is everything. Someone takes the pot early, then stops paying. A collector disappears. A friend moves away mid-cycle. So: only join with people you really trust, write down the rules and the order, keep groups small, and never put in your emergency fund.', replies: ['Should Kofi join?'] },
        { tey: 'His goal has a fixed date. If his payout is in week 2, it\'s brilliant: GH₵300 early. If it\'s week 6, it\'s just a fancy jar. And GH₵50 a week would come out of his GH₵125. Efua offers him week 5 of the next cycle. He decides to wait for the next one, and to stick with his own automatic jar for now.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Savings groups add discipline, not extra money. Join only with people you deeply trust, with written rules, and never with emergency money.',
    },
  ],
  apply: {
    scenario: 'Efua\'s hall susu.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Six friends each pay GH₵50 a week. How big is each week\'s pot?',
        answers: ['300', 'GH₵300', '300 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'After a full six-week cycle, what has each member gained in money?',
        options: [
          { text: 'GH₵300 profit', why: 'They paid it in too.' },
          { text: 'GH₵50', why: 'No extra money is created.' },
          { text: 'Nothing extra: they paid GH₵300 and received GH₵300' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each country to its savings group name.',
        pairs: [
          ['Ghana', 'Susu'],
          ['Cameroon', 'Njangi or tontine'],
          ['Kenya', 'Chama'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Benefit or risk of a savings group?',
        groups: ['Benefit', 'Risk'],
        items: [
          { text: 'Friends counting on you keeps you paying', group: 0 },
          { text: 'Someone stops paying after their payout', group: 1 },
          { text: 'An early payout is like an interest-free loan', group: 0 },
          { text: 'A collector disappears', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A traditional susu collector\'s fee is usually...',
        options: [
          { text: 'Half of everything', why: 'Far too high. Traditionally about one day\'s deposit.' },
          { text: 'About one day\'s contribution per month' },
          { text: 'Nothing', why: 'Collectors charge for the service, traditionally one day\'s deposit.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: 'You can join and take the pot in week 6.',
        prompt: 'Kofi\'s best reply, with his week-16 deadline?',
        options: [
          { text: 'Thanks! Week 6 is the same as my own jar, though, and it takes GH₵50 of my GH₵125. Can I join next cycle with an early slot?' },
          { text: 'Yes, and I\'ll put my emergency fund in too.', why: 'Emergency money should never be in a group pot.' },
          { text: 'Susu is a scam.', why: 'It\'s a trusted tool for millions. Fit and trust are the questions.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rules for joining.',
        template: 'People you deeply [[1]], [[2]] rules, and never your [[3]] fund.',
        blanks: [['trust'], ['written'], ['emergency']],
        distractors: ['like', 'laptop'],
      },
      {
        kind: 'findBug',
        prompt: 'Which group set-up is risky?',
        lines: [
          'Five close friends from the same hall.',
          'Order and amounts written and shared.',
          'Thirty strangers from an online group, no written rules.',
        ],
        bug: 2,
        fix: 'Small group of people you know, with written rules.',
        explanation: 'Strangers and no rules is how groups collapse and people lose money.',
      },
      {
        kind: 'mcq',
        prompt: 'Who benefits most from going first in a rotating group?',
        options: [
          { text: 'Whoever goes last', why: 'They wait longest; it\'s just disciplined saving for them.' },
          { text: 'Someone who needs a lump sum soon' },
          { text: 'Nobody', why: 'An early lump sum is a real benefit.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a safe way to join a savings group.',
        lines: ['Check you trust every member', 'Agree and write the rules and order', 'Choose an amount that fits your budget', 'Keep your emergency fund out of it'],
      },
    ],
  },
  reflect: {
    prompt: 'Is there a savings group in your community, family or workplace? What would you need to know before joining?',
    starters: ['There\'s a group...', 'Before joining I\'d need to know...'],
  },
  deepen: {
    title: 'An ancient tool',
    summary: 'Rotating savings groups exist on every continent and have been studied by economists for decades (for example Besley, Coate and Loury, 1993). They work because of trust and social ties, which is also why they fail when trust breaks.',
  },
  notes: 'ROSCAs: Besley, T., Coate, S., & Loury, G. (1993). The economics of rotating savings and credit associations. AER, 83(4). Ghana susu collectors: traditionally keep one day\'s contribution per month (e.g. Aryeetey & Steel; Bank of Ghana guidance on licensed susu collectors). Group (fictional): 6 × GH₵50/week, GH₵300 pot. Kofi doesn\'t join this cycle (keeps running numbers simple).',
};

export default lesson;
