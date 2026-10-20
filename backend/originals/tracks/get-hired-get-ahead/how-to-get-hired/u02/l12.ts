import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 12 — where to put it: free places to show work, and privacy. Card deck. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Where to put it',
  summary: 'Clinton\'s case study is ready, but where does it live? And his screenshot shows Mama Bih\'s real name and phone number. Two questions every portfolio needs answering: where, and what to hide.',
  minutes: 11,
  outcomes: ['Pick a free place to show your portfolio', 'Keep other people\'s personal information out of it', 'Make one link that shows everything'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>You don\'t need a fancy website.</strong> A portfolio just needs one link you can paste anywhere: in your CV, your cover letter and your LinkedIn profile.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Free places that work:</strong></p><ul><li><strong>GitHub</strong> for code, with a short README that\'s your case study.</li><li><strong>A free website builder</strong> or a simple page you made yourself.</li><li><strong>A shared folder</strong> (like Google Drive) with your PDFs, set to "anyone with the link can view".</li><li><strong>LinkedIn</strong>: the Featured section can hold links, documents and images (Chapter 5).</li><li><strong>A single PDF</strong> of 2 to 4 pages, for roles that ask you to attach one.</li></ul>',
    },
    {
      kind: 'text',
      html: '<p><strong>Hide other people\'s information.</strong> Your project might contain real names, phone numbers, money amounts or health details. Before you share any screenshot, swap them for made-up ones ("Member 1", "Member 2"), and ask permission before you describe people\'s situations. It\'s respectful, it\'s often the law, and employers notice.</p>',
    },
    {
      kind: 'check',
      question: 'Clinton\'s screenshot shows Mama Bih\'s real name and number. What should he do?',
      options: ['Share it, she won\'t mind', 'Replace real details with made-up ones before sharing', 'Blur half the number'],
      answer: 1,
      explanation: 'Use made-up names and numbers in anything public. Ask permission before you describe real people.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Test your link in a private browser window, logged out. If you can\'t see it there, neither can a recruiter.',
    },
  ],
  apply: {
    scenario: 'Clinton puts his portfolio online.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Free and good for a portfolio, or not?',
        groups: ['Good place', 'Not a good place'],
        items: [
          { text: 'GitHub with a README', group: 0 },
          { text: 'A shared folder set to "anyone with the link"', group: 0 },
          { text: 'Photos on his phone that only he can see', group: 1 },
          { text: 'A 2 to 4 page PDF', group: 0 },
          { text: 'A WhatsApp status that disappears in a day', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does a portfolio need, at minimum?',
        options: [
          { text: 'An expensive custom website', why: 'Free options work fine.' },
          { text: 'One link you can paste anywhere' },
          { text: 'A printed book', why: 'A link is easier for recruiters.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the screenshot caption that breaks privacy.',
        lines: ['Tracker showing Member 1 to Member 12 (names changed).', 'Tracker showing Mama Bih, 6 Rue du Marché, 677 123 456, owes 25,000.', 'Treasurer view with made-up amounts.'],
        bug: 1,
        explanation: 'Real name, address and number of a real person. Swap in made-up details before sharing anything.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Do I need permission to describe Mum\'s njangi in my case study?',
        options: [
          { text: 'Yes, ask. And keep members anonymous: "a 12-member savings group", no names.' },
          { text: 'No, it\'s your mum.', why: 'It\'s also eleven other women. Ask, and keep them anonymous.' },
          { text: 'Only if it\'s a secret.', why: 'Ask anyway. It\'s their story too.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each kind of work to a good place to show it.',
        pairs: [
          ['Code', 'GitHub with a README'],
          ['Designs and posters', 'A shared folder or simple website'],
          ['A role that asks for an attachment', 'A 2 to 4 page PDF'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How do you check a recruiter can see your link?',
        options: [
          { text: 'Open it in a private window, logged out' },
          { text: 'Open it on your own logged-in phone', why: 'You\'re logged in, so you see things others can\'t.' },
          { text: 'Assume it works', why: 'Broken or private links are very common. Test it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the privacy rule.',
        template: 'Swap real details for [[1]] ones, and ask [[2]] before describing people.',
        blanks: [['made-up', 'fake'], ['permission']],
        distractors: ['real', 'money', 'later'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'On GitHub, the file that works as your case study is usually called the ___. (one word)',
        answers: ['readme', 'read me'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe to show publicly, or hide first?',
        groups: ['Safe', 'Hide first'],
        items: [
          { text: 'Your own name and project title', group: 0 },
          { text: 'A member\'s phone number', group: 1 },
          { text: 'Made-up sample amounts', group: 0 },
          { text: 'A patient\'s real health details', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which link should Clinton put on his CV?',
        options: [
          { text: 'One link to his GitHub profile with the Njangi Tracker pinned at the top' },
          { text: 'Five different links to everything he\'s ever made', why: 'One clear link, best work first.' },
          { text: 'No link, they can search for him', why: 'They won\'t. Make it one tap.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Where will your portfolio live? Which free option fits the career you want?',
    starters: ['My portfolio will live on...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Create your portfolio\'s home today, even if it\'s empty: a GitHub profile, a shared folder or a free page. Open the link in a private window to check it works.',
  },
  notes: 'GitHub READMEs, LinkedIn Featured section, shared-drive links: common free options (current as of 2026). Privacy: data-protection laws in many countries restrict sharing personal data (e.g. Cameroon\'s Law No. 2024/017 on personal data protection; GDPR in the EU); stated generally, not as legal advice. The address and number in the findBug are fictional.',
};

export default lesson;
