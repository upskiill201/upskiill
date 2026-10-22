import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 8 — the case study: problem, what you did, result, what you learned. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The case study',
  summary: 'The tracker works, and Mum loves it. But a recruiter won\'t install an app to find out. Miracle shows Clinton the four-part write-up that turns a project into a story a recruiter reads in one minute: the case study.',
  minutes: 12,
  outcomes: ['Write a short case study in four parts', 'Explain what you did and why', 'Show a result and what you learned'],
  learn: [
    {
      kind: 'steps',
      title: 'A case study in four parts',
      steps: [
        { title: '1. The problem', body: 'Two sentences. Who had it, and what went wrong. "My mum\'s njangi has 12 members who pay 25,000 francs a month. Payments were tracked in an exercise book, and every month someone disputed whether they\'d paid."' },
        { title: '2. What I did', body: 'Your choices, saying "I". Not every detail, just the important decisions. "I talked to three members about what confused them. I built a one-page tracker showing who\'s paid this month and whose turn it is to collect, and I kept it on the treasurer\'s phone so the data stayed private."' },
        { title: '3. The result', body: 'What changed, with a number if you can. "At the first meeting with the tracker, there were zero payment disputes, and the treasurer says it finished 20 minutes early."' },
        { title: '4. What I learned', body: 'One or two honest lines. This shows you think about your work. "I built a login and dark mode first, which nobody needed. Next time I\'ll build the useful part first and ask users sooner."' },
      ],
    },
    {
      kind: 'text',
      html: '<p><strong>Notice it\'s STAR with one extra step.</strong> Problem is your Situation and Task, What I did is your Action, The result is your Result, and What I learned is the bonus that shows you\'re still growing.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Keep a case study short enough to read in one minute: around 150 words, plus one picture or screenshot.',
    },
  ],
  apply: {
    scenario: 'Clinton writes up the Njangi Tracker.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the four parts in order.',
        lines: ['The problem', 'What I did', 'The result', 'What I learned'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its part.',
        pairs: [
          ['Every month someone disputed whether they\'d paid', 'The problem'],
          ['I talked to three members, then built a one-page tracker', 'What I did'],
          ['Zero disputes at the first meeting', 'The result'],
          ['Next time I\'ll ask users sooner', 'What I learned'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why include "What I learned"?',
        options: [
          { text: 'To make it longer', why: 'Keep it short. It\'s there to show reflection.' },
          { text: 'It shows you think about your work and keep growing' },
          { text: 'To admit you failed', why: 'It\'s not failure. It\'s showing you improve.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that hides what Clinton did.',
        lines: ['The njangi argued about payments every month.', 'Some stuff was built and it got better.', 'There were zero disputes at the first meeting with the tracker.'],
        bug: 1,
        fix: 'I built a one-page tracker showing who has paid and whose turn it is.',
        explanation: 'No "I", no detail. The reader can\'t see what Clinton did.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in a one-minute case study, or too much detail?',
        groups: ['Belongs', 'Too much detail'],
        items: [
          { text: 'Who had the problem and what went wrong', group: 0 },
          { text: 'Every line of code, explained', group: 1 },
          { text: 'The result, with a number', group: 0 },
          { text: 'A 2,000-word history of njangis', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'How long should this be?',
        options: [
          { text: 'Ten pages, so they see how much work it was.', why: 'Nobody reads ten pages. Keep it to a minute.' },
          { text: 'One word: "Tracker".', why: 'Too short to show anything.' },
          { text: 'About 150 words and one screenshot: readable in a minute.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'How does a case study relate to STAR?',
        options: [
          { text: 'It\'s STAR with a "What I learned" step added' },
          { text: 'It\'s completely different', why: 'Same bones: situation, action, result.' },
          { text: 'It replaces STAR forever', why: 'You\'ll use both: case studies in portfolios, STAR in interviews.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the result.',
        template: 'At the first meeting with the tracker, there were [[1]] payment [[2]].',
        blanks: [['zero', 'no'], ['disputes', 'arguments']],
        distractors: ['many', 'logos', 'apps'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A good case study can be read in about one ___. (one word)',
        answers: ['minute'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which "What I did" line is strongest?',
        options: [
          { text: '"I worked really hard on it."', why: 'Effort isn\'t a decision. Show what you chose to do.' },
          { text: '"It was built with technology."', why: 'Vague and passive. Say what YOU did.' },
          { text: '"I asked three members what confused them, then built only what they needed: who paid and whose turn it is."' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Write a four-line case study for anything you\'ve already done: a project, an event, a fix. One line per part.',
    starters: ['Problem: ...', 'What I did: I...', 'Result: ...', 'What I learned: ...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Read one real case study from a designer or developer portfolio online. Find its four parts. Is the result clear in the first minute?',
  },
  notes: 'Case-study structure (problem, approach, outcome, reflection) is standard in design and product portfolios; mapped to STAR (Ch1 l08) so learners reuse one structure across portfolio, CV and interview. The treasurer\'s "20 minutes shorter" is a story detail.',
};

export default lesson;
