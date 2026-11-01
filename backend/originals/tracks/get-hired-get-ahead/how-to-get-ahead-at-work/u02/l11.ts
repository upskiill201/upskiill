import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 11 — story choice: the problem nobody owns (the Monday payout report). */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'The problem nobody owns',
  summary: 'Every Monday, the driver payout report breaks. Finance complains in the chat. Someone patches it by hand. Everyone sighs. Nobody owns it. Clinton notices it\'s the fourth Monday in a row.',
  minutes: 11,
  outcomes: ['Spot problems that fall between teams', 'Offer to own one the right way', 'Agree scope with your manager first'],
  learn: [
    {
      kind: 'story',
      title: 'Monday, again',
      beats: [
        { speaker: 'narrator', text: 'Monday, 9:20am. Finance in the team chat: "Payout report broken AGAIN. Drivers asking where their money is." Someone patches it by hand. Again.' },
        { speaker: 'paul', text: 'Not ours. Finance owns reports. Or data. Someone.' },
        { speaker: 'clinton', text: '(to himself) Fourth Monday in a row. And it\'s caused by offline confirmations arriving late, which is exactly what I know about.' },
        { speaker: 'tey', text: 'Problems that sit between teams often have no owner, so they repeat forever. The person who solves one, with their manager\'s blessing, often becomes much more valuable.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Bring it to Ngozi: what\'s happening, why he thinks it\'s caused by late syncs, and offer to own a fix with finance.',
            outcome: 'Ngozi: "Yes. Two weeks, pair with someone in finance, and keep Goal 1 moving." Clinton has his problem nobody owned.',
            best: true,
          },
          {
            text: 'Ignore it: not his team, not his job.',
            outcome: 'Monday number five. Number six. Drivers keep waiting for their money.',
          },
          {
            text: 'Fix it secretly over the weekend without telling anyone.',
            outcome: 'His change clashes with something finance was planning. Nobody knew he was working on it. Now two teams are annoyed.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Spot the problem nobody owns. Bring it to your manager with a cause and an offer. Agree scope before you start.',
    },
  ],
  apply: {
    scenario: 'The Monday payout report.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why do problems between teams repeat?',
        options: [
          { text: 'They\'re impossible', why: 'They\'re usually fixable; nobody owns them.' },
          { text: 'Nobody owns them' },
          { text: 'Everyone enjoys them', why: 'Nobody owns them.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s pitch to Ngozi in order.',
        lines: ['What\'s happening', 'Why he thinks it happens', 'His offer to own a fix', 'Ask how much time he can spend'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good way to take ownership, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Agree scope with Ngozi first', group: 0 },
          { text: 'Fix it secretly at the weekend', group: 1 },
          { text: 'Pair with someone in finance', group: 0 },
          { text: 'Complain louder in the chat', group: 1 },
          { text: 'Keep Goal 1 moving too', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s message to Ngozi.',
        from: 'clinton',
        message: 'What do I say to Ngozi about the payout report?',
        options: [
          { text: '"Finance is useless."', why: 'Describe the problem and offer to help.' },
          { text: 'Nothing, it\'s not ours.', why: 'He has the right knowledge to help.' },
          { text: '"The payout report has broken four Mondays running. I think it\'s late offline syncs. Could I own a fix with finance for two weeks, alongside Goal 1?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the step that causes trouble.',
        lines: ['Notices it\'s the fourth Monday.', 'Changes finance\'s system without telling them.', 'Offers to pair with finance.'],
        bug: 1,
        explanation: 'Agree scope and work with the other team.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Bring it to Ngozi with an offer', 'Two weeks, paired with finance'],
          ['Ignore it', 'Monday number five, six...'],
          ['Secret weekend fix', 'Two teams annoyed'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why is Clinton the right person for this problem?',
        options: [
          { text: 'It\'s caused by late offline syncs, which he knows well' },
          { text: 'He\'s bored', why: 'His knowledge fits the cause.' },
          { text: 'Nobody else is allowed', why: 'His knowledge fits.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Bring a [[1]] and an [[2]]. Agree scope first.',
        blanks: [['cause'], ['offer']],
        distractors: ['complaint', 'excuse', 'rumour'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many Mondays in a row had the report broken? (a number)',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'A problem nobody owns, or someone\'s job already?',
        groups: ['Nobody owns it', 'Already owned'],
        items: [
          { text: 'A report that breaks between two teams', group: 0 },
          { text: 'Clinton\'s own sync status feature', group: 1 },
          { text: 'A shared doc that\'s always out of date', group: 0 },
          { text: 'Paul\'s code review queue', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Is there a problem where you work or study that everyone complains about and nobody owns?',
    starters: ['The problem is...', 'I could offer...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a four-line pitch for one unowned problem: what\'s happening, why, your offer, how much time. Take it to the right person.',
  },
  notes: 'Outline: "finds the problem nobody owns." Paul (CastId paul) speaks.',
};

export default lesson;
