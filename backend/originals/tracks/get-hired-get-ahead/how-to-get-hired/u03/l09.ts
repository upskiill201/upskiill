import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 9 — "Why do you want to work here?" generic vs. specific. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: '"Why do you want to work here?"',
  summary: 'Clinton\'s first answer: "Njangi Pay is a leading, innovative company with great growth opportunities." Miracle: "That\'s every company\'s website. Why do YOU want to work THERE?"',
  minutes: 11,
  outcomes: ['Answer "Why us?" with specifics', 'Connect the company to your own story', 'Avoid answers about only what you get'],
  learn: [
    {
      kind: 'compare',
      title: 'Two answers to "Why us?"',
      before: { label: 'Could be anywhere', text: '"Njangi Pay is a leading, innovative company with great growth opportunities, and I\'m passionate about technology."\n\nTrue of a hundred companies. It\'s also all about what Clinton gets, not what he brings.' },
      after: { label: 'Only Clinton could say it', text: '"My mum\'s njangi used to argue every month over a notebook. I built them a tracker, and that\'s when I realised how many savings groups run on paper. Njangi Pay is building exactly that, for millions of people. And your new offline mode is the same problem I\'ve been solving at Kmer for drivers."\n\nHis story, their product, a real connection. Brenda will remember it.' },
      notes: [
        'Name something specific: a product, a feature, a recent move, a value you\'ve seen in action.',
        'Connect it to your own story or work.',
        'Say what you\'d bring, not only what you\'d get.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Something specific about them, connected to something real about you, and what you\'d bring.',
    },
  ],
  apply: {
    scenario: 'Clinton rewrites "Why Njangi Pay?"',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s wrong with "a leading, innovative company with growth opportunities"?',
        options: [
          { text: 'It\'s rude', why: 'Not rude, just generic.' },
          { text: 'It fits any company, and it\'s only about what he gets' },
          { text: 'It\'s too specific', why: 'The opposite.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific or generic?',
        groups: ['Specific', 'Generic'],
        items: [
          { text: 'Your new offline mode', group: 0 },
          { text: 'You\'re a leading company', group: 1 },
          { text: 'Savings groups that run on paper', group: 0 },
          { text: 'Great growth opportunities', group: 1 },
          { text: 'I\'m passionate about technology', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the answer in order.',
        lines: ['A real moment from your story', 'What it made you realise', 'What they\'re doing about it', 'How your work connects'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that\'s only about what Clinton gets.',
        lines: ['Your offline mode is the problem I solved at Kmer.', 'Mostly I want the salary and the free lunch.', 'Savings groups still run on paper.'],
        bug: 1,
        explanation: 'Pay matters, but "Why us?" should show what you\'d bring.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'How do I find something specific about Njangi Pay?',
        options: [
          { text: 'Make something up.', why: 'Never. Research it.' },
          { text: 'Just read the homepage slogan.', why: 'Go deeper: product, news, people.' },
          { text: 'Their app, blog, recent news, job advert and what Tchami told me about the team.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each research source to what Clinton found.',
        pairs: [
          ['Their app', 'A new offline mode'],
          ['A news article', 'They\'re expanding to two new cities'],
          ['The job advert', 'They want someone who builds for basic phones'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which opening is strongest?',
        options: [
          { text: '"My mum\'s njangi used to argue every month over a notebook."' },
          { text: '"You\'re a leading company."', why: 'Generic.' },
          { text: '"I need a job."', why: 'About him, not them.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Something specific about [[1]], connected to something real about [[2]].',
        blanks: [['them'], ['you']],
        distractors: ['salary', 'lunch', 'everyone'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What group did Clinton build his first tracker for? His mum\'s ___. (one word)',
        answers: ['njangi'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good research source, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Their product, used yourself', group: 0 },
          { text: 'A rumour in the group chat', group: 1 },
          { text: 'Recent company news', group: 0 },
          { text: 'Someone who works there', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'For a company you\'d love to work for, what specific thing do they do that connects to your own story?',
    starters: ['They...', 'It connects to me because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Pick one company. Find one specific thing (a product, feature or recent move). Write a three-sentence "Why you?" answer.',
  },
  notes: 'Njangi Pay is fictional; its offline mode and expansion are story details.',
};

export default lesson;
