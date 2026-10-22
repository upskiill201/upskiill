import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 11 — story choice: exaggerate the Kmer offer to push Njangi Pay higher. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'The made-up number',
  summary: 'The night before the call, David has an idea. "Tell Brenda that Kmer offered 380,000. They\'ll never check. Instant raise." Kmer actually offered 280,000. Clinton is tempted.',
  minutes: 11,
  outcomes: ['Recognise why inventing an offer is risky and wrong', 'Use a real competing offer honestly', 'Negotiate on your real value'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 11pm',
      beats: [
        { speaker: 'narrator', text: 'Wednesday, 11pm. Clinton\'s sticky note says "330k". David leans over and crosses it out.' },
        { speaker: 'david', text: 'Bro. Just say Kmer offered 380,000. Brenda can\'t check. Boom, 380.' },
        { speaker: 'clinton', text: 'Kmer offered 280. And Brenda knows Tchami, who knows Mr Tamba...' },
        { speaker: 'tey', text: 'Inventing or inflating an offer is a lie. In small industries it\'s often found out. Some companies ask to see the other offer, or simply say "then take it". And you start a job on something untrue.' },
      ],
      choice: {
        prompt: 'What should Clinton say about Kmer?',
        options: [
          {
            text: 'Tell the truth: he has a real offer from Kmer, and his ask is based on his work and his research.',
            outcome: 'Brenda appreciates the honesty. "Thanks for being straight with me." His ask is judged on its reasons, and it\'s a good ask.',
            best: true,
          },
          {
            text: 'Say Kmer offered 380,000.',
            outcome: 'Brenda: "That\'s well above our band. If that\'s real, you should take it." Now he either takes a job that doesn\'t exist, or admits he lied.',
          },
          {
            text: 'Hide the Kmer offer completely.',
            outcome: 'Not a lie, but he\'s already told her it exists. Being vague now looks odd, and it gives him nothing.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Never invent or inflate an offer. Use real alternatives honestly, and negotiate on your real value.',
    },
  ],
  apply: {
    scenario: 'The made-up number.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is inventing an offer risky, as well as wrong?',
        options: [
          { text: 'It\'s not risky', why: 'It\'s risky in small industries and can backfire.' },
          { text: 'They may check, call your bluff, or hear the truth through others' },
          { text: 'It\'s only risky for CEOs', why: 'It\'s risky for anyone.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest or dishonest?',
        groups: ['Honest', 'Dishonest'],
        items: [
          { text: 'I have a real offer from Kmer', group: 0 },
          { text: 'Kmer offered 380,000 (it was 280,000)', group: 1 },
          { text: 'My ask is based on my research', group: 0 },
          { text: 'Three companies want me (they don\'t)', group: 1 },
          { text: 'I\'d prefer Njangi Pay if we can get closer', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s reply to David.',
        from: 'david',
        message: 'Just say 380. Nobody will ever know.',
        options: [
          { text: 'OK, 380 it is.', why: 'A lie that can easily backfire.' },
          { text: 'Let\'s say 500.', why: 'Even worse.' },
          { text: 'Douala fintech is tiny, and it\'s a lie. I\'ll ask for 330 with real reasons.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that is a lie.',
        lines: ['I have an offer from Kmer.', 'Their offer is 380,000.', 'My ask is based on my sync experience.'],
        bug: 1,
        explanation: 'It was 280,000. Inflating it is a lie.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Tell the truth', 'Ask judged on its reasons'],
          ['Inflate the offer', 'Trapped: take a fake job or admit it'],
          ['Hide it completely', 'Looks odd, gains nothing'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How can a real competing offer be used fairly?',
        options: [
          { text: 'Mention it honestly as context and timing, not as a threat' },
          { text: 'Inflate it a little', why: 'Never inflate.' },
          { text: 'Use it as an ultimatum', why: 'Context, not a threat.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Never [[1]] an offer. Negotiate on your [[2]] value.',
        blanks: [['invent', 'inflate'], ['real']],
        distractors: ['mention', 'fake', 'secret'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What did Kmer actually offer, in thousands of francs? (a number)',
        answers: ['280', '280000', '280,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong reason for a higher offer, or not?',
        groups: ['Strong', 'Not strong'],
        items: [
          { text: 'Three months of offline sync for 11 drivers', group: 0 },
          { text: 'A fake higher offer', group: 1 },
          { text: 'Researched range of 280k to 340k', group: 0 },
          { text: 'My cousin earns more', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does Brenda say when Clinton is honest?',
        options: [
          { text: '"Then take Kmer."', why: 'That\'s what happens in the lie version.' },
          { text: 'Nothing', why: 'She thanks him for his honesty.' },
          { text: '"Thanks for being straight with me."' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Have you been tempted to exaggerate something to get what you wanted? What happened, or what might have happened?',
    starters: ['I was tempted to...', 'What could have happened:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write down your real alternatives for any decision you\'re negotiating. Only use those.',
  },
  notes: 'Outline choice for Ch10/now L2 Ch5: invent a competing offer, accept on the spot, or negotiate honestly (the on-the-spot choice is l01).',
};

export default lesson;
