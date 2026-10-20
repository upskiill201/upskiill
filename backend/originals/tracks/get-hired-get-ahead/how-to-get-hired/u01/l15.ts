import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: the founder replies. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: a reply from Kmer',
  summary: 'Monday morning, an email from Kmer Logistics\' founder: "Tchami spoke highly of you. Can you come in on Thursday?" Before Thursday, Miracle checks he\'s ready. Quality over volume, hidden-job places, speculative pitches and events.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Choose personal outreach over mass messages', 'Spot where hidden jobs show up', 'Pitch a company that hasn\'t advertised'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday',
      beats: [
        { speaker: 'narrator', text: 'Monday, 7:52am. An email: "Hi Clinton. Tchami spoke highly of you, and I liked your message about the supermarket contract. Can you come in on Thursday for a chat?"' },
        { speaker: 'clinton', text: 'A start-up founder wants to meet me. For a job that was never advertised.' },
        { speaker: 'miracle', text: 'Because you wrote about his problem, and you had proof. Quick check before Thursday.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: before Thursday.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the founder reply?',
        options: [
          { text: 'A trusted name, his problem first, and real proof' },
          { text: 'Clinton sent 200 messages', why: 'He sent one careful one.' },
          { text: 'He applied through a job board', why: 'There was no advert.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Hidden-job place or not?',
        groups: ['Hidden-job place', 'Not really'],
        items: [
          { text: 'A Douala developer WhatsApp group', group: 0 },
          { text: 'The careers office inbox', group: 0 },
          { text: 'A celebrity gossip page', group: 1 },
          { text: 'A start-up that just opened an office', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would ruin the pitch.',
        lines: ['Congratulations on the supermarket contract.', 'I need a job because my rent is due.', 'Could we have a 15-minute call?'],
        bug: 1,
        explanation: 'About his need. The pitch is about their problem.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the speculative pitch in order.',
        lines: ['A mutual name, if they agreed', 'What you noticed about them', 'How you could help, with proof', 'A small ask'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'Bro, my 200-message tool got three replies. Two said stop. Your way is slow!',
        options: [
          { text: 'Slow, but one founder wants to meet me. Ten real messages beat 200 copies.' },
          { text: 'You\'re right, I\'ll switch to the tool.', why: 'His way is working.' },
          { text: 'Send it to 2,000 next time.', why: 'More spam isn\'t the answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each event step to an action.',
        pairs: [
          ['Before', 'One goal and one line about yourself'],
          ['Start', 'Find someone standing alone'],
          ['After', 'Connect within a day with a note'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which company news is a hiring signal?',
        options: [
          { text: 'A big new contract' },
          { text: 'A new office plant', why: 'Not a signal. Growth is.' },
          { text: 'A holiday photo', why: 'Look for growth: money, products, contracts, offices.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'An application to a company with no advert is called ___. (one word)',
        answers: ['speculative', 'unsolicited'],
        placeholder: 'One word',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s summary.',
        template: 'You wrote about his [[1]], and you had [[2]].',
        blanks: [['problem'], ['proof']],
        distractors: ['salary', 'luck', 'rent'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Template or personal?',
        groups: ['Template', 'Personal'],
        items: [
          { text: 'Dear Sir/Madam, seeking any role', group: 0 },
          { text: 'Tchami suggested I get in touch', group: 1 },
          { text: 'To whom it may concern', group: 0 },
          { text: 'More deliveries means more tracking', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'At the event, what should Clinton do most?',
        options: [
          { text: 'Listen and ask questions' },
          { text: 'Talk about his tracker non-stop', why: 'Listen more than you talk.' },
          { text: 'Hand out CVs', why: 'Have conversations; follow up after.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Of the things in this chapter, which would most likely get you a reply like Clinton\'s?',
    starters: ['For me, it\'s...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Pick one company from your network map and write a full speculative pitch, under 150 words. Ask a friend: is it about them, or about you?',
  },
  notes: 'Checkpoint 3. Reviews l11–l14. The founder of Kmer Logistics is unnamed here; named as Mr Tamba in l20 (named extra, not a CastId).',
};

export default lesson;
