import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 12 — CVs around the world: CV vs résumé, photos, length, personal details. Card deck. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'CVs around the world',
  summary: 'Clinton wants to apply to a Lagos start-up, a Toronto remote role and a Paris internship. His cousin in Toronto says "never put a photo". His aunt in Paris says "always put a photo". They\'re both right.',
  minutes: 11,
  outcomes: ['Explain how CVs differ between countries', 'Decide on photo, length and personal details for each place', 'Check local norms before you apply'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>The core of a good CV is the same everywhere:</strong> clear structure, achievements with proof, honest details. But some conventions change by country. Here are the big four.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>1. CV or résumé?</strong> In most of Africa, the UK, Europe, India and Australia, the document is called a <strong>CV</strong>. In the US and Canada, it\'s a <strong>résumé</strong>, and a "CV" there usually means a long academic document. Same idea, different name.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>2. The photo.</strong> In the US, Canada and the UK, photos are usually left off, partly to reduce bias. In parts of Europe (Germany, France), the Middle East and Asia, a professional photo is still common. In many African countries both happen. When in doubt, follow the advert or leave it off.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>3. Length.</strong> US and Canadian graduate résumés are usually one page. UK and many other CVs are up to two pages. For a graduate anywhere, one strong page is rarely wrong.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>4. Personal details.</strong> Age, date of birth, marital status, religion and nationality are expected in some countries and avoided in others, where employers aren\'t allowed to consider them. Never include ID numbers or your full home address. If unsure, leave them out.</p>',
    },
    {
      kind: 'check',
      question: 'Clinton is applying to a company in Toronto. Photo or no photo?',
      options: ['Always a photo', 'Usually no photo', 'A photo and his date of birth'],
      answer: 1,
      explanation: 'In Canada (and the US and UK), photos are usually left off.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Before applying abroad, look at the company\'s own careers page or ask someone who works there. Local norms beat any rule here.',
    },
  ],
  apply: {
    scenario: 'Clinton applies in three countries.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each place to its usual convention.',
        pairs: [
          ['Cameroon', 'Called a CV; photo practice varies'],
          ['United States', 'Called a résumé; usually one page, no photo'],
          ['Germany', 'Called a CV; a professional photo is common'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Photo usually included, or usually left off?',
        groups: ['Usually included', 'Usually left off'],
        items: [
          { text: 'Germany', group: 0 },
          { text: 'United States', group: 1 },
          { text: 'France', group: 0 },
          { text: 'Canada', group: 1 },
          { text: 'United Kingdom', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does "CV" usually mean in the US and Canada?',
        options: [
          { text: 'The same as a one-page résumé', why: 'There, a CV is usually long and academic.' },
          { text: 'A long academic document' },
          { text: 'A video', why: 'No: a long academic document.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'My cousin says never use a photo. My aunt says always. Who\'s right?',
        options: [
          { text: 'My cousin, everywhere.', why: 'Only for some countries.' },
          { text: 'My aunt, everywhere.', why: 'Only for some countries.' },
          { text: 'Both, for their countries. I\'ll follow the norm where I\'m applying, and leave it off when unsure.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the detail that should never be on a CV, anywhere.',
        lines: ['City and country', 'Professional email', 'National ID number'],
        bug: 2,
        explanation: 'ID numbers are a fraud risk. Never include them.',
      },
      {
        kind: 'mcq',
        prompt: 'For a graduate, which length is rarely wrong?',
        options: [
          { text: 'One strong page' },
          { text: 'Three pages', why: 'Too long for a graduate almost anywhere.' },
          { text: 'Half a page', why: 'Usually too thin. One full page.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe everywhere, or depends on the country?',
        groups: ['Safe everywhere', 'Depends on the country'],
        items: [
          { text: 'Achievements with proof', group: 0 },
          { text: 'A photo', group: 1 },
          { text: 'Clear headings', group: 0 },
          { text: 'Marital status', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'Local [[1]] beat any rule. When unsure, leave it [[2]].',
        blanks: [['norms'], ['out', 'off']],
        distractors: ['photos', 'in', 'big'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the US, the one-page job document is called a ___. (one word)',
        answers: ['resume', 'résumé'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Best way to check norms for the Paris internship?',
        options: [
          { text: 'Guess', why: 'A quick check beats a guess.' },
          { text: 'Use his Toronto version', why: 'Norms differ. Check first.' },
          { text: 'Look at the company\'s careers page and ask someone who works in France' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Where will you apply? What are the norms there for photos, length and personal details? How could you find out for sure?',
    starters: ['I\'ll apply in...', 'The norms there are...', 'I\'ll check by...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find two real CVs or résumés from people working in your target country (LinkedIn, careers pages). Note: photo or not, length, personal details.',
  },
  notes: 'Global CV conventions per playbook §9 (career advice is global): CV vs résumé naming (US/Canada résumé; academic CV), photo norms (commonly omitted in US/UK/Canada due to anti-discrimination practice; common in Germany, France, parts of Asia and the Middle East; mixed in Africa), length (US graduate résumés usually one page; UK up to two). Stated as general patterns with "check locally".',
};

export default lesson;
