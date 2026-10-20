import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Explain cards: things you value differently (and the orange). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Things you value differently',
  summary: 'Two sisters, one orange. It\'s a famous negotiation story, and it explains why the rent deal works. Ada makes a table of every issue and who cares about it most.',
  minutes: 12,
  outcomes: [
    'Know the orange story and what it teaches',
    'List the issues in a negotiation',
    'Trade what you care less about for what you care more about',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>A famous story, often told from the work of Mary Parker Follett: two sisters fight over one orange. They cut it in half. One squeezes her half for juice and throws away the peel. The other grates her half\'s peel for a cake and throws away the fruit. If they\'d asked each other why, <strong>each could have had all of what she wanted.</strong></p><p>The lesson: when people value things differently, trading beats splitting. Ada\'s table for the rent:</p><table><tr><th>Issue</th><th>How much Ada cares</th><th>How much he cares</th></tr><tr><td>Yearly rent</td><td>A lot</td><td>A lot</td></tr><tr><td>Lease length</td><td>A little (she\'s staying anyway)</td><td>A lot (no empty months)</td></tr><tr><td>Gate lock repair</td><td>A little (₦35,000)</td><td>Some (one less job)</td></tr><tr><td>Paying early, before the due date</td><td>A little</td><td>Some (certainty)</td></tr></table><p>The rule: <strong>give on what you care about less, get on what you care about more.</strong> Ada gives the lease length and the lock. She gets a lower rent.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Give on what you care about less. Get on what you care about more. That\'s how both sides win.',
    },
  ],
  apply: {
    scenario: 'The orange and the rent.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did the two sisters each really want?',
        options: [
          { text: 'One wanted the juice, the other the peel' },
          { text: 'Both wanted the juice', why: 'One used the peel for a cake.' },
          { text: 'Neither wanted the orange', why: 'They both wanted part of it.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'For Ada: care a lot, or care a little?',
        groups: ['A lot', 'A little'],
        items: [
          { text: 'Yearly rent', group: 0 },
          { text: 'Lease length', group: 1 },
          { text: 'Gate lock repair', group: 1 },
          { text: 'Staying near work', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what Ada gives to what she gets.',
        pairs: [
          ['Two-year lease', 'Lower rent'],
          ['Fixing the gate lock', 'Goodwill, and a smaller increase'],
          ['Paying early', 'Certainty for him'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'So I should give in on things I don\'t care about?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Not give in: trade. Offer them in return for something you care about. Never give them away for free.' },
          { text: 'Yes, give them all up first.', why: 'Free concessions get nothing back.' },
          { text: 'Never give anything.', why: 'Then there\'s nothing to trade.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The trading rule.',
        template: 'Give on what you care about [[1]]. Get on what you care about [[2]].',
        blanks: [['less'], ['more']],
        distractors: ['never', 'secretly'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how much will the gate lock cost Ada, in naira?',
        answers: ['35000', '35,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why did cutting the orange in half waste so much?',
        options: [
          { text: 'They split it without asking why, so each threw away what the other needed' },
          { text: 'The orange was too small', why: 'There was plenty for both.' },
          { text: 'It didn\'t waste anything', why: 'Half the juice and half the peel were thrown away.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which row of Ada\'s issue table is wrong?',
        lines: [
          'Yearly rent: Ada a lot, him a lot.',
          'Lease length: Ada a little, him a lot.',
          'Gate lock: Ada a lot, him nothing.',
          'Paying early: Ada a little, him some.',
        ],
        bug: 2,
        fix: 'Gate lock: Ada a little, him some.',
        explanation: 'It\'s cheap for Ada and saves him a job.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to build trades.',
        lines: ['List every issue', 'Rate how much each side cares', 'Find issues they care about more', 'Offer those in return for yours'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Something Mr Adeyemi cares about a lot, or less?',
        groups: ['A lot', 'Less'],
        items: [
          { text: 'No empty months', group: 0 },
          { text: 'Ada\'s Friday calls', group: 1 },
          { text: 'Yearly rent', group: 0 },
          { text: 'Which room Ada uses', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Make your own issue table: list three issues, and rate how much you and the other side care about each.',
    starters: ['Issue 1:...', 'I care... They care...'],
  },
  deepen: {
    title: 'Logrolling',
    summary: 'Negotiation researchers call this logrolling: trading issues that each side values differently. Dean Pruitt\'s research showed it often produces deals better than any compromise.',
  },
  notes: 'Orange story: commonly attributed to Mary Parker Follett and popularised by Fisher & Ury, Getting to Yes. Logrolling: Pruitt, Negotiation Behavior (1981). Fictional issue ratings; gate lock ~₦35,000.',
};

export default lesson;
