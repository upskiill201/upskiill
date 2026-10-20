import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 5 — Checkpoint 1, the last free lesson. Reviews lessons 1–4. Story beat: Tchami replies. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Tchami replies',
  summary: 'Clinton sends his new message to Tchami at 8pm. At 8:47pm, a reply: "Hey Clinton! Of course I remember. Happy to help. Call on Saturday?" Before the call, Miracle quizzes him. The hidden market, weak ties, advice requests and network maps, mixed together.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain how the hidden job market works', 'Choose weak ties to contact', 'Write an advice request that gets a reply'],
  learn: [
    {
      kind: 'story',
      title: '8:47pm',
      beats: [
        { speaker: 'narrator', text: 'Tuesday, 8:47pm. Clinton\'s phone lights up. Tchami: "Hey Clinton! Of course I remember. Happy to help. Call on Saturday at 10?"' },
        { speaker: 'clinton', text: 'HE REPLIED. Miracle, he replied! The old message got nothing and this one got a reply in 47 minutes!' },
        { speaker: 'miracle', text: 'Told you. Now let\'s make sure you understand why, before Saturday.' },
        { speaker: 'tey', text: 'Let\'s check the first week of this course stuck.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: before the call with Tchami.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the new message get a reply when the old one didn\'t?',
        options: [
          { text: 'It reminded Tchami who Clinton was and asked for small, easy advice' },
          { text: 'It was sent at a better time', why: 'Timing helps a little. The ask made the difference.' },
          { text: 'It used more emojis', why: 'No. The connection and the small ask did it.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Close tie or weak tie?',
        groups: ['Close', 'Weak'],
        items: [
          { text: 'Tchami, met once at the meet-up', group: 1 },
          { text: 'David, best friend', group: 0 },
          { text: 'A former student of Mrs Ewane\'s', group: 1 },
          { text: 'His mum', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to where it came from.',
        pairs: [
          ['The strength of weak ties', 'Granovetter, 1973'],
          ['Moderately weak ties lead to the most job moves', 'Rajkumar et al., Science, 2022'],
          ['Many roles move through people first', 'Miracle\'s three hires'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would get the message ignored.',
        lines: ['Hi Tchami, I\'m Clinton from the UB meet-up.', 'Can you give me a job at your company? Pls reply fast.', 'Could I ask you three quick questions?'],
        bug: 1,
        explanation: 'A big ask with pressure. Advice first.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the network-map steps in order.',
        lines: ['List everyone, fast', 'Mark who\'s near your field', 'Ask "who might they know?"', 'Pick your first five'],
      },
      {
        kind: 'mcq',
        prompt: 'Should Clinton stop applying to adverts now that he\'s networking?',
        options: [
          { text: 'No: keep a few good applications going alongside conversations' },
          { text: 'Yes, networking only', why: 'Both work together.' },
          { text: 'Yes, adverts never work', why: 'They do. They\'re just not the whole market.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'On Saturday, are you going to ask Tchami for a job?',
        options: [
          { text: 'No: I\'ll ask my three questions and listen. If there\'s an opening, he\'ll probably mention it.' },
          { text: 'Yes, first thing.', why: 'He agreed to advice. Respect that.' },
          { text: 'I\'ll just talk about myself for 15 minutes.', why: 'Ask and listen.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Clinton\'s message.',
        template: 'Could I ask you three [[1]] questions, by message or a 15-minute [[2]]?',
        blanks: [['quick'], ['call']],
        distractors: ['long', 'meeting', 'job'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Asking for ___ is easier to say yes to than asking for a job. (one word)',
        answers: ['advice'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Visible or hidden job market?',
        groups: ['Visible', 'Hidden'],
        items: [
          { text: 'A graduate scheme advert', group: 0 },
          { text: 'A founder asking around for a part-time developer', group: 1 },
          { text: 'A job board listing', group: 0 },
          { text: 'A role a colleague recommends you for', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which of Clinton\'s five should he contact next?',
        options: [
          { text: 'Mrs Ewane\'s former student at a Douala start-up, mentioning Mrs Ewane' },
          { text: 'A CEO he\'s never met', why: 'Too weak a link. Start with people he has some connection to.' },
          { text: 'Nobody, Tchami is enough', why: 'More conversations, more chances.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Who is your "Tchami": someone you know a little who could give you useful advice? What would you ask them?',
    starters: ['My Tchami is...', 'I\'d ask...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Send one advice request this week to someone on your network map. Use the four parts. Then write down what happens.',
  },
  notes: 'Checkpoint 1 = last free lesson of How to Get Hired (playbook §3). Reviews l01–l04. These exercises double as Jump ahead / placement questions.',
};

export default lesson;
