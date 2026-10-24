import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Explain cards: the swap list. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The swap list',
  summary: 'Zanele has a confession: she uses "utilise", "commence" and "endeavour" because they sound professional. Mrs Achieng gives her a swap list.',
  minutes: 12,
  outcomes: [
    'Swap complex words for plain ones',
    'Replace jargon with what it actually means',
    'Keep a personal swap list',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Mrs Achieng\'s swap list:</p><table><tr><th>Instead of</th><th>Write</th></tr><tr><td>utilise</td><td>use</td></tr><tr><td>commence</td><td>start</td></tr><tr><td>endeavour</td><td>try</td></tr><tr><td>in the event that</td><td>if</td></tr><tr><td>prior to</td><td>before</td></tr><tr><td>facilitate</td><td>help, run</td></tr><tr><td>leverage</td><td>use</td></tr><tr><td>going forward</td><td>(delete, or give a date)</td></tr><tr><td>touch base</td><td>talk, meet</td></tr><tr><td>operationalise weekend throughput</td><td>open the depot on Saturdays</td></tr></table><p>Two kinds of swap:</p><ul><li><strong>Long words to short ones</strong>: same meaning, easier to read.</li><li><strong>Jargon to what it means</strong>: harder, because you have to work out what the writer meant. Often the plain version is more specific.</li></ul>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Swap long words for short ones, and jargon for what it actually means.',
    },
  ],
  apply: {
    scenario: 'The swap list.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the word to its plain swap.',
        pairs: [
          ['utilise', 'use'],
          ['commence', 'start'],
          ['endeavour', 'try'],
          ['prior to', 'before'],
          ['in the event that', 'if'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the plain swap for "facilitate" in "facilitate the meeting"?',
        answers: ['run', 'lead', 'help'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What does "operationalise weekend throughput" mean, plainly?',
        options: [
          { text: 'Hire more managers', why: 'It means opening on weekends.' },
          { text: 'Nothing at all', why: 'It means something; plainly, Saturdays.' },
          { text: 'Open the depot on Saturdays' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Long word or jargon?',
        groups: ['Long word', 'Jargon'],
        items: [
          { text: 'commence', group: 0 },
          { text: 'touch base', group: 1 },
          { text: 'utilise', group: 0 },
          { text: 'synergies', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'In isiZulu and Afrikaans I never used fancy words. In English I thought I had to.',
        prompt: "Mrs Achieng's best reply?",
        options: [
          { text: 'Yes, fancy words prove fluency.', why: 'Plain words do.' },
          { text: 'You don\'t. Your clearest English is your best English. Short words are what fluent writers use.' },
          { text: 'Write in isiZulu then.', why: 'Plain English works.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Swap it.',
        template: '"We will [[1]] the pilot [[2]] 6 May."',
        blanks: [['start'], ['on']],
        distractors: ['commence', 'prior'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is swapping jargon harder than swapping long words?',
        options: [
          { text: 'You have to work out what the writer actually meant' },
          { text: 'Jargon is shorter', why: 'It\'s about meaning.' },
          { text: 'It isn\'t', why: 'It needs interpretation.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence still needs a swap?',
        lines: [
          'The depot opens on Saturdays from 6 May.',
          'You will get your rota by Wednesday.',
          'Please endeavour to arrive prior to 7 a.m.',
          'Saturday shifts pay time and a half.',
        ],
        bug: 2,
        fix: 'Please try to arrive before 7 a.m.',
        explanation: '"Endeavour" and "prior to" have plain swaps.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the plain swap for "leverage" in "leverage our data"?',
        answers: ['use'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to fix a jargon sentence.',
        lines: ['Spot the jargon', 'Ask what it really means', 'Write that plainly', 'Check it\'s more specific'],
      },
    ],
  },
  reflect: {
    prompt: 'Start your own swap list: three words you over-use and their plain versions.',
    starters: ['Instead of..., write...'],
  },
  deepen: {
    title: 'Plain is more specific',
    summary: '"Operationalise weekend throughput" could mean many things. "Open the depot on Saturdays" means one. Plain words often force you to say exactly what you mean.',
  },
  notes: 'Word swaps from common plain-language lists (e.g. Plain English Campaign\'s A to Z of alternative words; US plainlanguage.gov).',
};

export default lesson;
