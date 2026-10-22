import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 17 — "Dear Afiya team": sending a letter with the wrong company name, and recovering. Story with a choice. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: '"Dear Afiya team"',
  summary: 'Clinton presses Send on his application to a Douala start-up, Kmer Logistics. Thirty seconds later he sees it: the letter begins "Dear Afiya team". He reused Miracle\'s company from a practice draft. What now?',
  minutes: 12,
  outcomes: ['Recover calmly from an application mistake', 'Write a short, professional correction', 'Build a check that stops it happening again'],
  learn: [
    {
      kind: 'story',
      title: 'Thirty seconds',
      beats: [
        { speaker: 'narrator', text: 'Tuesday, 9:41pm. Clinton presses Send on his application to Kmer Logistics, a Douala start-up with a junior developer opening. He feels great.' },
        { speaker: 'narrator', text: '9:42pm. He opens his sent folder to admire it. First line: "Dear Afiya team,". He\'d practised with Miracle using Afiya as an example, and never changed it.' },
        { speaker: 'clinton', text: 'No. No no no. It\'s over. My career is over before it started.' },
        { speaker: 'miracle', text: 'Breathe. It\'s a mistake, not a crime. Recruiters see this every week. What matters now is how you handle it, and that\'s something they notice too.' },
        { speaker: 'tey', text: 'Everyone makes application mistakes. The ones that hurt are the ones handled badly. A short, calm correction can even show the reliability they\'re hiring for.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Send one short, calm correction with the right letter attached, then add a name check to his routine.',
            outcome: 'Two lines: "Apologies, my cover letter opened with the wrong company name. The corrected version is attached. Thank you." The recruiter replies: "Happens! Thanks for catching it." He gets an interview a week later.',
            best: true,
          },
          {
            text: 'Send nothing and hope they don\'t notice.',
            outcome: 'They notice. With no correction, it looks careless. With one, it would have looked careful.',
          },
          {
            text: 'Send three long apology emails explaining what happened.',
            outcome: 'Three emails turn a small slip into a big moment. One short note is enough.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'One short, calm correction. Then fix the routine: search every letter for company names before you send.',
    },
  ],
  apply: {
    scenario: 'Clinton recovers from the slip.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which correction email should Clinton send?',
        options: [
          { text: '"I am so so sorry, I am an idiot, please don\'t reject me, here is what happened..."', why: 'Too long and too much. Keep it short and calm.' },
          { text: '"Apologies, my cover letter opened with the wrong company name. The corrected version is attached. Thank you."' },
          { text: 'Nothing at all', why: 'A short correction shows care.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good recovery, or makes it worse?',
        groups: ['Good recovery', 'Makes it worse'],
        items: [
          { text: 'One short correction with the right file', group: 0 },
          { text: 'Three long apology emails', group: 1 },
          { text: 'Adding a name check to his routine', group: 0 },
          { text: 'Pretending it didn\'t happen', group: 1 },
          { text: 'Calling the CEO at midnight', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Should I explain that I was practising with Miracle\'s company?',
        options: [
          { text: 'Yes, explain everything in detail.', why: 'They don\'t need the backstory. Short and calm.' },
          { text: 'Blame autocorrect.', why: 'Don\'t blame. Just fix.' },
          { text: 'No need. "Wrong company name, corrected version attached" is enough. Short is calm.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s recovery in order.',
        lines: ['Take a breath', 'Write a two-line correction', 'Attach the corrected letter', 'Send once', 'Add a name check to his routine'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that makes the correction worse.',
        lines: ['Apologies, my letter opened with the wrong company name.', 'I hope this doesn\'t mean I\'m rejected, I really need this job, please.', 'The corrected version is attached. Thank you.'],
        bug: 1,
        explanation: 'Pleading turns a small slip into a big moment. Keep it calm and short.',
      },
      {
        kind: 'mcq',
        prompt: 'Why can a calm correction actually help?',
        options: [
          { text: 'It shows you check your work and fix mistakes, which is what employers want' },
          { text: 'It doesn\'t, it always hurts', why: 'Handled well, it shows reliability.' },
          { text: 'Because they feel sorry for you', why: 'It\'s about showing care, not sympathy.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each mistake to its prevention.',
        pairs: [
          ['Wrong company name', 'Search the letter for company names'],
          ['Wrong file attached', 'Open the attachment before sending'],
          ['Typo in your email address', 'Send a test to yourself'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the correction.',
        template: 'Apologies, my cover letter opened with the [[1]] company name. The [[2]] version is attached.',
        blanks: [['wrong'], ['corrected']],
        distractors: ['right', 'secret', 'old'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many correction emails should Clinton send? (a number)',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What did Miracle say recruiters notice?',
        options: [
          { text: 'Only the mistake', why: 'They notice how you handle it too.' },
          { text: 'Nothing', why: 'They notice, which is why handling it well matters.' },
          { text: 'How you handle the mistake' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you made a small mistake in front of someone important. How did you handle it? What would you do now?',
    starters: ['I once...', 'Now I\'d...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your own pre-send checklist: company name, role title, attachment opened, links work, sent to yourself first. Stick it next to your laptop.',
  },
  notes: 'Recovery guidance (one brief, factual correction) is common careers-coach advice. Kmer Logistics is a fictional Douala start-up (seeds the Ch7 internship).',
};

export default lesson;
