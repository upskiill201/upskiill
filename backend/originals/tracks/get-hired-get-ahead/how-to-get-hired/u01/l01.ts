import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 1 — free. Opens How to Get Hired: the job that was never posted. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The job that was never posted',
  summary: 'Clinton\'s interview at Njangi Pay is six weeks away, and he refreshes job sites every night. Then Miracle mentions that her team hired three graduates last year, and not one of those jobs was ever advertised.',
  minutes: 11,
  outcomes: ['Explain why many jobs are filled before they\'re posted', 'Stop relying on job boards alone', 'Choose a first step into the hidden job market'],
  learn: [
    {
      kind: 'story',
      title: 'Refresh, refresh, refresh',
      beats: [
        { speaker: 'narrator', text: 'Three months to graduation. Clinton\'s interview at Njangi Pay is six weeks away, and he\'s nervous about putting everything on one company. Every night he refreshes three job sites. Same twelve adverts. Same twelve "Easy Apply" buttons.' },
        { speaker: 'miracle', text: 'Can I tell you something? Last year my team at Afiya hired three graduates. None of those roles were ever posted online.' },
        { speaker: 'clinton', text: 'Then how did people even apply?' },
        { speaker: 'miracle', text: 'One was a speaker at a meet-up I went to. One messaged me after my LinkedIn post about clinics. One was recommended by a colleague. By the time a job gets advertised, someone often already has a head start.' },
        { speaker: 'tey', text: 'Many roles are filled through people and conversations, sometimes before an advert exists. That part of the market is quieter, and it\'s open to anyone willing to start talking to people. Including people who think they know nobody.' },
      ],
      choice: {
        prompt: 'What should Clinton do with his evenings?',
        options: [
          {
            text: 'Keep a few good applications going, but spend most evenings talking to people in fintech.',
            outcome: 'Within two weeks he\'s had three conversations, and one of them points him to a part-time role at a Douala start-up that was never advertised. This chapter is how.',
            best: true,
          },
          {
            text: 'Refresh the job sites even more often, in case he misses something.',
            outcome: 'Same twelve adverts, refreshed faster. Hundreds of other graduates are refreshing them too.',
          },
          {
            text: 'Wait for Njangi Pay; there\'s no point looking elsewhere.',
            outcome: 'If Njangi Pay says no, he starts from zero with weeks to graduation. A second door is always worth opening.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Job boards show only part of the market. Many roles move through people first. Keep applying, and start talking.',
    },
    {
      kind: 'text',
      html: '<p><strong>Welcome to How to Get Hired.</strong> In the first course you built your career kit. This course puts it to work: the hidden job market, a first internship, the interview, handling a "no", and negotiating the offer. Your new kit pieces: a network map, an internship plan, a story bank, a resilience plan and an offer checklist.</p>',
    },
  ],
  apply: {
    scenario: 'Clinton rethinks his job search.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How did Miracle\'s team find its three graduate hires?',
        options: [
          { text: 'Through people and conversations, not adverts' },
          { text: 'From job boards', why: 'None of those roles were ever posted.' },
          { text: 'By luck', why: 'Each came through a real connection: an event, a post, a recommendation.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of the hidden job market, or the visible one?',
        groups: ['Hidden', 'Visible'],
        items: [
          { text: 'A role filled by a colleague\'s recommendation', group: 0 },
          { text: 'An advert on a job site', group: 1 },
          { text: 'A start-up founder asking around for help', group: 0 },
          { text: 'A graduate scheme with an application form', group: 1 },
          { text: 'A job mentioned at a meet-up', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'But I don\'t know anyone in fintech. The hidden market isn\'t for people like me.',
        options: [
          { text: 'I know more people than I think: meet-up speakers, Mrs Ewane, Miracle. I\'ll start there.' },
          { text: 'True, I\'ll stick to job boards.', why: 'He knows more people than he thinks. This chapter shows how.' },
          { text: 'I\'ll pay someone to get me in.', why: 'Never pay for a job. Talk to people instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Should Clinton stop applying to adverts?',
        options: [
          { text: 'No: keep a few good applications going, and add conversations' },
          { text: 'Yes, only network from now on', why: 'Both work. Do a bit of each.' },
          { text: 'Yes, adverts are all fake', why: 'Most adverts are real. They\'re just not the whole market.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the belief that will hold Clinton back.',
        lines: ['Talking to people can lead to jobs that aren\'t posted.', 'If a job isn\'t on a job site, it doesn\'t exist.', 'A meet-up speaker might know about openings.'],
        bug: 1,
        explanation: 'Many roles are filled before, or without, an advert.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each of Miracle\'s hires to how it happened.',
        pairs: [
          ['The meet-up speaker', 'Met in person at an event'],
          ['The LinkedIn message', 'Replied to her post with a good question'],
          ['The recommendation', 'A colleague vouched for them'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the idea.',
        template: 'Keep [[1]], and start [[2]].',
        blanks: [['applying'], ['talking']],
        distractors: ['waiting', 'refreshing', 'paying'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Jobs that are filled without being advertised are part of the ___ job market. (one word)',
        answers: ['hidden', 'unadvertised'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What\'s Clinton\'s best first step?',
        options: [
          { text: 'List everyone he already knows who works in or near fintech' },
          { text: 'Message 500 strangers asking for a job', why: 'Spam. Start with people he knows.' },
          { text: 'Wait for a recruiter to find him', why: 'His profile helps, but he can act too.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good use of an evening, or not?',
        groups: ['Good use', 'Not much use'],
        items: [
          { text: 'One thoughtful message to a meet-up speaker', group: 0 },
          { text: 'Refreshing the same job site 40 times', group: 1 },
          { text: 'Asking Mrs Ewane who she knows in fintech', group: 0 },
          { text: 'Applying to everything with one generic CV', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think about how people you know got their jobs. How many saw an advert, and how many heard about it from someone?',
    starters: ['People I know got jobs by...', 'That surprises me because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask three people with jobs: "How did you hear about your job?" Write down the answers. It\'s the best introduction to this chapter.',
  },
  notes: 'Opens How to Get Hired (Level 2, Get Hired, Get Ahead). Per the outline facts list, no "X% of jobs are hidden" statistic is used: those figures have weak or untraceable sources. Wording: "many roles are filled through people and conversations, sometimes before an advert exists". Miracle\'s three hires are a story detail.',
};

export default lesson;
