import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 11 — story choice: ask Miracle to "just get him in" at Afiya. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: '"Can\'t you just get me in?"',
  summary: 'A bad week. The sync code breaks, Nadia gets praised for her logo, and Clinton wonders why he\'s at a tiny start-up. Miracle leads a team at Afiya, a big company. One message and she could probably get him an interview. Should he ask?',
  minutes: 11,
  outcomes: ['Tell a fair referral from a favour that costs someone', 'Ask a mentor for help in the right way', 'Keep your own work at the centre'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 11pm',
      beats: [
        { speaker: 'narrator', text: 'Wednesday, 11pm. The sync code has broken twice. Mr Tamba praised Nadia\'s logo at lunch. Clinton opens his chat with Miracle and types, deletes, types again.' },
        { speaker: 'clinton', text: '"Miracle, Afiya is huge. Can\'t you just get me in? You\'re a team lead. One word from you."' },
        { speaker: 'narrator', text: 'His thumb hovers over Send.' },
        { speaker: 'tey', text: 'A referral is a real thing: someone who knows your work vouches for it. But asking someone to "just get you in" asks them to risk their reputation on work they haven\'t seen, and skips the part where you earn it.' },
      ],
      choice: {
        prompt: 'What should Clinton send?',
        options: [
          {
            text: 'Delete it. Ask Miracle for advice on the sync bug, and finish what he started at Kmer.',
            outcome: 'Miracle spots the bug in ten minutes ("you\'re syncing before the phone has saved"). Later she says: "If you ever apply to Afiya, I\'ll happily say what I\'ve seen you do." That\'s a referral he earned.',
            best: true,
          },
          {
            text: 'Send it. She\'s his friend; that\'s what friends are for.',
            outcome: 'Miracle replies kindly but firmly: "I can\'t vouch for work I haven\'t seen on our team. Finish Kmer, then let\'s talk." It stings, and she\'s right.',
          },
          {
            text: 'Quit Kmer tonight and apply to Afiya with Miracle\'s name on everything.',
            outcome: 'He walks away from the only project he could talk about in an interview, and uses a name without permission.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A referral is earned: someone vouches for work they\'ve seen. Ask mentors for advice and feedback, not shortcuts.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s bad Wednesday.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a fair referral?',
        options: [
          { text: 'A friend getting you in without seeing your work', why: 'That risks their reputation on the unknown.' },
          { text: 'Someone vouching for work of yours they\'ve actually seen' },
          { text: 'Paying someone to recommend you', why: 'Never.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fair ask of a mentor, or unfair?',
        groups: ['Fair', 'Unfair'],
        items: [
          { text: 'Can you look at my sync bug?', group: 0 },
          { text: 'Just get me in at your company', group: 1 },
          { text: 'What would you do in my position?', group: 0 },
          { text: 'Can I use your name without asking?', group: 1 },
          { text: 'Could you give me feedback on my CV?', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best message to Miracle.',
        from: 'clinton',
        message: 'I deleted the "get me in" message. What should I send instead?',
        options: [
          { text: '"Never mind, I\'ll just quit."', why: 'Ask for help with the real problem.' },
          { text: 'Nothing, struggle alone.', why: 'Mentors are for exactly this.' },
          { text: '"Rough week: my sync keeps breaking. Could I show you the code for ten minutes?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the unfair ask.',
        lines: ['Could you look at my code?', 'Tell Afiya I\'m brilliant, even though you haven\'t seen my work.', 'Any advice for a bad week?'],
        bug: 1,
        explanation: 'She can only honestly vouch for what she\'s seen.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Ask for advice on the bug', 'Bug fixed, and a referral he earned later'],
          ['Ask her to "just get him in"', 'A kind, firm no'],
          ['Quit and use her name', 'No project to talk about, and a broken trust'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'When can Miracle honestly refer Clinton?',
        options: [
          { text: 'When she\'s seen his work and can say what he did' },
          { text: 'Whenever he asks', why: 'A referral needs real knowledge of his work.' },
          { text: 'Never, mentors can\'t refer', why: 'They can, about work they\'ve seen.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'A referral is [[1]]: someone vouches for work they\'ve [[2]].',
        blanks: [['earned'], ['seen']],
        distractors: ['bought', 'heard', 'begged'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes did Miracle take to spot the bug? (a number)',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps Clinton long-term, or hurts?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'Finishing the Kmer project', group: 0 },
          { text: 'Using a name without permission', group: 1 },
          { text: 'Asking for feedback on code', group: 0 },
          { text: 'Quitting on a bad night', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Clinton want to send the message?',
        options: [
          { text: 'Afiya had an advert for him', why: 'No: it was a bad week and a tempting shortcut.' },
          { text: 'Miracle offered', why: 'She didn\'t. He was tired and frustrated.' },
          { text: 'A bad week made the shortcut feel tempting' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Is there someone you\'ve been tempted to ask for a shortcut? What could you ask them for instead?',
    starters: ['I\'ve been tempted to ask...', 'Instead I could ask for...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write down one mentor or senior person you know. Write a fair ask for them: advice, feedback or a name, not a shortcut.',
  },
  notes: 'Chapter choice from the outline ("ask Miracle to just get him in at Afiya"). Referral norms vary; many companies run formal employee-referral schemes, which still depend on the referrer genuinely knowing the candidate.',
};

export default lesson;
