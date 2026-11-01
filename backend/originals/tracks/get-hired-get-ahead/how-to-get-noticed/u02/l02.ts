import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 2 — what a portfolio is, for any career. Reading. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What a portfolio is',
  summary: 'David says portfolios are "for artists". Miracle says Afiya\'s best recent hire, a customer support agent, got the job because of one. A portfolio is just proof you can see, and every career has a version.',
  minutes: 11,
  outcomes: ['Say what a portfolio is and why it works', 'Name portfolio pieces for different careers', 'Explain why three good pieces beat twenty weak ones'],
  learn: [
    {
      kind: 'reading',
      title: 'Proof you can see',
      html:
        '<p>A <strong>portfolio</strong> is a small collection of things you\'ve made or done, that someone can look at. Not a list of skills: the evidence itself.</p>' +
        '<p>Artists and designers have always had them. But today almost every career has a version:</p>' +
        '<ul><li><strong>Developer:</strong> small apps or tools, with the code and a short write-up.</li>' +
        '<li><strong>Marketing:</strong> a social media plan you ran for a local shop, with what happened to its followers.</li>' +
        '<li><strong>Writing or communications:</strong> three short articles, or a newsletter you write.</li>' +
        '<li><strong>Finance or business:</strong> a budget or price model you built for a club or family business.</li>' +
        '<li><strong>Customer support:</strong> a short guide you wrote to answer the questions people keep asking.</li>' +
        '<li><strong>Teaching or health:</strong> a lesson plan or an information leaflet, and how people used it.</li></ul>' +
        '<p>Remember skills-based hiring from Chapter 1? When employers judge on skills, a portfolio is the quickest way to show them. It turns "I can" into "here it is".</p>' +
        '<p><strong>Three good pieces beat twenty weak ones.</strong> Recruiters look at one or two. Make those ones count.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A portfolio piece answers one question: "Can this person do the work?" Pick pieces that answer it for the job you want.',
    },
  ],
  apply: {
    scenario: 'Clinton explains portfolios to David.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a portfolio?',
        options: [
          { text: 'A list of your skills', why: 'That\'s an inventory. A portfolio is the evidence itself.' },
          { text: 'A small collection of things you\'ve made or done that someone can look at' },
          { text: 'A folder for artists only', why: 'Almost every career has a version now.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each career to a portfolio piece.',
        pairs: [
          ['Marketing', 'A social media plan for a local shop'],
          ['Finance', 'A budget model for a club'],
          ['Customer support', 'A guide answering common questions'],
          ['Teaching', 'A lesson plan and how students did'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'Portfolios are for artists. I\'m going into medicine.',
        options: [
          { text: 'You\'re right, skip it.', why: 'David has a great piece already: the blood drive.' },
          { text: 'Your blood drive plan and results are a portfolio piece. So is the anatomy guide you wrote for first-years.' },
          { text: 'Draw some pictures then.', why: 'Ha. His portfolio is proof of medical-adjacent work, not art.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why do three good pieces beat twenty weak ones?',
        options: [
          { text: 'Recruiters only look at one or two, so those need to be strong' },
          { text: 'Twenty is against the rules', why: 'No rule. It\'s about where recruiters\' attention goes.' },
          { text: 'They don\'t, more is always better', why: 'Twenty weak pieces bury your best one.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Portfolio piece, or just a claim?',
        groups: ['Portfolio piece', 'Just a claim'],
        items: [
          { text: 'A newsletter you write each month', group: 0 },
          { text: '"Great writer"', group: 1 },
          { text: 'A price model for your aunt\'s stall', group: 0 },
          { text: '"Good with numbers"', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that misunderstands portfolios.',
        lines: ['A portfolio shows the evidence, not just the skill.', 'Only designers and artists need portfolios.', 'A guide you wrote for customers can be a portfolio piece.'],
        bug: 1,
        explanation: 'Almost every career has a version now, from marketing to medicine.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the idea.',
        template: 'A portfolio turns "I [[1]]" into "here it [[2]]".',
        blanks: [['can'], ['is']],
        distractors: ['wish', 'was', 'might'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Clinton wants a support role later. Which piece shows it best?',
        options: [
          { text: 'A guide he wrote for his aunt\'s customers: "5 things to check before you bring your phone in"' },
          { text: 'His grades', why: 'Grades don\'t show support skills.' },
          { text: 'A photo of his laptop', why: 'Shows nothing he did.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A portfolio answers one question: "Can this person do the ___?" (one word)',
        answers: ['work', 'job'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which career is each piece best for?',
        groups: ['Developer', 'Writing', 'Business'],
        items: [
          { text: 'A small app with a write-up', group: 0 },
          { text: 'Three short articles', group: 1 },
          { text: 'A budget for the choir trip', group: 2 },
          { text: 'A tool that fixed the fixtures sheet', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'For the job you want, what would a portfolio piece look like? Name one thing you could make.',
    starters: ['The job I want is...', 'A piece I could make is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Search "[the job you want] portfolio example" and look at three. What kind of pieces do they show? Which would be easiest for you to make?',
  },
  notes: 'Portfolio-for-every-career framing is standard careers advice. Links back to skills-based hiring (NACE Job Outlook 2025: nearly two-thirds of employers). The Afiya support-agent hire is a story beat from Miracle, not a statistic.',
};

export default lesson;
