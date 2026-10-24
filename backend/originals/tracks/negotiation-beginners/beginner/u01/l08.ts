import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Reading: who asks, and what it's worth. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Who asks, and what it\'s worth',
  summary: 'Lucía sends Ada a study she read when she got her first job: who negotiated their starting salary, who didn\'t, and what it was worth. Ada recognises herself.',
  minutes: 12,
  outcomes: [
    'Know what the research says about who negotiates',
    'See how much a single ask can be worth',
    'Use the research to make your own ask feel normal',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The graduates who didn\'t ask',
      html: '<p>Economist Linda Babcock noticed something about graduates from her university\'s master\'s programme. When they got their first job offers, <strong>about 57% of the men negotiated</strong>, but <strong>only about 7% of the women</strong> did. Those who negotiated raised their starting pay by about <strong>7.4%</strong>.</p><p>She and Sara Laschever wrote a book about it, <em>Women Don\'t Ask</em> (2003). Their point wasn\'t that women are bad negotiators. Many people, women and men, simply don\'t see an offer as something they\'re allowed to discuss. They treat it as final.</p><p>Three lessons for Ada:</p><ul><li><strong>Most offers can be discussed.</strong> Employers and landlords often expect some negotiation.</li><li><strong>The first number isn\'t the only number.</strong> Asking politely is normal, not rude.</li><li><strong>Small differences compound.</strong> 7% now affects every raise later.</li></ul><p>Later research also found that people who ask can face pushback, women especially, if the ask seems demanding. How to ask in a way that avoids that is in Chapter 5.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Most offers are a starting point, not the final word. Many people never ask because they don\'t realise they can.',
    },
  ],
  apply: {
    scenario: 'The study.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'In Babcock\'s study, about what percentage of the men negotiated?',
        answers: ['57', '57%'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'And about what percentage of the women?',
        answers: ['7', '7%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What was the main reason people didn\'t negotiate?',
        options: [
          { text: 'They saw the offer as final, not as something they could discuss' },
          { text: 'They were bad negotiators', why: 'The book argues it\'s mostly about not seeing the chance.' },
          { text: 'Employers banned it', why: 'Employers often expect it.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the lesson to what it means for Ada.',
        pairs: [
          ['Most offers can be discussed', 'Her rent can be discussed'],
          ['The first number isn\'t the only one', 'She can suggest another'],
          ['Small differences compound', '7% now affects later raises'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'So I\'m not weird for never asking?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Yes, you\'re weird.', why: 'Not asking is very common.' },
          { text: 'You\'re normal. Most people never ask because nobody told them they could. Now you know.' },
          { text: 'It doesn\'t matter anyway.', why: 'It\'s worth real money.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Something you can usually discuss, or usually fixed?',
        groups: ['Usually discussable', 'Usually fixed'],
        items: [
          { text: 'A job offer', group: 0 },
          { text: 'A rent rise', group: 0 },
          { text: 'A government stamp fee', group: 1 },
          { text: 'A freelance quote', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The key idea.',
        template: 'Most offers are a starting [[1]], not the final [[2]].',
        blanks: [['point'], ['word']],
        distractors: ['wall', 'law'],
      },
      {
        kind: 'mcq',
        prompt: 'What warning comes from later research?',
        options: [
          { text: 'Never ask', why: 'The point is to ask well.' },
          { text: 'Only men should ask', why: 'Everyone can ask; the way matters.' },
          { text: 'Asking can draw pushback if it seems demanding, so how you ask matters' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s summary is wrong?',
        lines: [
          'Many people don\'t negotiate their first offer.',
          'Those who did earned about 7% more.',
          'The study proves women can\'t negotiate.',
          'How you ask matters.',
        ],
        bug: 2,
        fix: 'Many people don\'t realise they can ask.',
        explanation: 'The book is about asking, not ability.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Negotiating raised starting pay by about what percentage? (one decimal place)',
        answers: ['7.4', '7.4%'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of an offer you accepted as final. Could it have been discussed?',
    starters: ['I accepted...', 'I could have asked...'],
  },
  deepen: {
    title: 'Women Don\'t Ask',
    summary: 'Babcock and Laschever\'s book looks at why many people don\'t negotiate and how organisations can make asking normal. Its practical advice applies to everyone.',
  },
  notes: 'Babcock & Laschever, Women Don\'t Ask: Negotiation and the Gender Divide (2003): Carnegie Mellon master\'s graduates, ~57% of men vs ~7% of women negotiated; negotiating raised starting salary by ~7.4%. Backlash: Bowles, Babcock & Lai (2007), OBHDP.',
};

export default lesson;
