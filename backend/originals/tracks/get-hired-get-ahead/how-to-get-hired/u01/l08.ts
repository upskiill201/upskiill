import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 8 — after the call: thank, note, act, report back. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'After the call',
  summary: 'The call with Tchami went well. He suggested two people to talk to and mentioned his friend\'s start-up. Miracle says the call was only half the job. The other half happens in the next 24 hours.',
  minutes: 12,
  outcomes: ['Send a short thank-you within a day', 'Act on the advice you were given', 'Report back so the relationship keeps going'],
  learn: [
    {
      kind: 'steps',
      title: 'The four steps after any conversation',
      steps: [
        { title: '1. Write it down, straight away', body: 'Within ten minutes, note what he said: the advice, the names, the start-up. Clinton writes: "Learn how payment webhooks work. Talk to Sandrine and Etienne. Friend\'s start-up: Kmer Logistics, needs a part-time developer."' },
        { title: '2. Thank them within a day', body: 'Short and specific: "Thanks so much for this morning, Tchami. The tip about webhooks was exactly what I needed, and I\'m reading the docs tonight." Specific thanks shows you listened.' },
        { title: '3. Act on the advice', body: 'Do the thing they suggested. Clinton spends the week learning webhooks and messages Sandrine and Etienne, mentioning that Tchami suggested them (he asked Tchami first).' },
        { title: '4. Report back', body: 'A week or two later: "You suggested webhooks, so I added them to my tracker. It now confirms payments on its own. Thank you." People love seeing their advice work, and they remember you.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Write it down, thank them, do what they said, then tell them it worked. Step 4 is the one almost nobody does.',
    },
  ],
  apply: {
    scenario: 'Clinton follows up with Tchami.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the four steps in order.',
        lines: ['Write it down, straight away', 'Thank them within a day', 'Act on the advice', 'Report back'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does a specific thank-you work better than "Thanks for your time"?',
        options: [
          { text: 'It shows you actually listened' },
          { text: 'It\'s longer', why: 'Length isn\'t the point. Specifics are.' },
          { text: 'It asks for another favour', why: 'A thank-you shouldn\'t come with a new ask.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good follow-up, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'A thank-you that names one tip', group: 0 },
          { text: 'Saying nothing for three months', group: 1 },
          { text: 'Telling him the advice worked', group: 0 },
          { text: 'Asking for a job in the thank-you', group: 1 },
          { text: 'Mentioning him to Sandrine, with his OK', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that spoils the thank-you.',
        lines: ['Thanks so much for this morning, Tchami.', 'The webhooks tip was exactly what I needed.', 'Also, can you send my CV to your CEO today?'],
        bug: 2,
        explanation: 'A thank-you with a big new favour attached stops being a thank-you.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Can I tell Sandrine that Tchami sent me?',
        options: [
          { text: 'Only if Tchami says it\'s OK. I\'ll ask him first.' },
          { text: 'Yes, use his name everywhere.', why: 'Ask first. It\'s his reputation.' },
          { text: 'No, never mention anyone.', why: 'A mutual name helps, with permission.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to Clinton\'s action.',
        pairs: [
          ['Write it down', 'Notes the names and the start-up'],
          ['Act on the advice', 'Learns how webhooks work'],
          ['Report back', 'Shows Tchami the tracker now confirms payments'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Within how many hours should Clinton send his thank-you? (a number)',
        answers: ['24', 'twenty-four', 'twenty four'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the report-back message.',
        template: 'You suggested [[1]], so I added them to my tracker. [[2]] you.',
        blanks: [['webhooks'], ['Thank']],
        distractors: ['jobs', 'Pay', 'Ignore'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which step do most people skip?',
        options: [
          { text: 'Reporting back that the advice worked' },
          { text: 'Having the call', why: 'They have the call. They skip what comes after.' },
          { text: 'Writing questions', why: 'Most skip step 4, the report-back.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Step 1 note or not worth writing?',
        groups: ['Write it down', 'Skip it'],
        items: [
          { text: 'Talk to Sandrine and Etienne', group: 0 },
          { text: 'Kmer Logistics needs a part-time developer', group: 0 },
          { text: 'Tchami\'s shirt was blue', group: 1 },
          { text: 'Learn how payment webhooks work', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of someone who gave you good advice in the past. Did you ever tell them it worked? Could you, this week?',
    starters: ['Someone who helped me was...', 'I could tell them...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Send one report-back message this week, to anyone whose advice helped you, even years ago. Notice how they reply.',
  },
  notes: 'Thank-you and follow-up practice is standard careers guidance. Sandrine and Etienne are named extras (Douala fintech people, not CastIds); Kmer Logistics is invented. Never use someone\'s name in an introduction without asking (picked up again in l11).',
};

export default lesson;
