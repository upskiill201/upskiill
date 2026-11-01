import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5 — Checkpoint, "The Phone-In Quiz". Reviews lessons 1–4 plus the whole course so far. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'The Phone-In Quiz: Miracle\'s practice run',
  summary: 'Sunday is three days away. Miracle has thrown away the twenty-slide PowerPoint and made a list with one column titled "What we both want". Before she goes, Tey insists on the Phone-In Quiz, and Clinton calls in to watch.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use reactance, listening and interests without notes', 'Connect Miracle\'s tools to the earlier callers'],
  learn: [
    {
      kind: 'story',
      title: 'Tey FM, 11:45 p.m.',
      beats: [
        { speaker: 'miracle', text: 'I deleted the PowerPoint. It hurt. It had animations.' },
        { speaker: 'tey', text: "A brave sacrifice. And now: the Phone-In Quiz! Oh, and we have a surprise on Line 1." },
        { speaker: 'clinton', text: 'MIRACLE! It\'s Clinton! I\'m only sending ONE message tonight: good luck!' },
        { speaker: 'miracle', text: '(laughing) Clinton. You learned.' },
      ],
    },
  ],
  apply: {
    scenario: 'The Tey FM Phone-In Quiz.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why might a twenty-slide PowerPoint backfire with Miracle\'s parents?',
        options: [
          { text: 'It has too few slides', why: 'The opposite.' },
          { text: 'It can feel like a pressure campaign, which triggers reactance' },
          { text: 'Parents hate charts', why: 'The method is the problem, not the charts.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s Sunday plan in order.',
        lines: ['Ask what worries them most', 'Listen and say back what she heard', 'Name what they both want', 'Share her one main reason', 'Offer options that answer their worries'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Pushes, or invites?',
        groups: ['Pushes', 'Invites'],
        items: [
          { text: '"You need to accept it."', group: 0 },
          { text: '"What worries you most?"', group: 1 },
          { text: '"That\'s final."', group: 0 },
          { text: '"Can I tell you why it matters to me?"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Quiz question from Line 1! What\'s the difference between a position and an interest?',
        prompt: 'Miracle\'s answer?',
        options: [
          { text: 'There isn\'t one.', why: 'There\'s a big one.' },
          { text: 'Positions are about money.', why: 'Not necessarily.' },
          { text: 'A position is what someone says they want; an interest is why they want it.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Pushback when people feel their freedom is threatened: ___. (one word)',
        answers: ['reactance'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What changed after Miracle listened to Papa\'s first-job story?',
        options: [
          { text: 'He asked to hear about the Lagos company properly, on Sunday' },
          { text: 'He immediately said yes to Lagos', why: 'Not yet. But he opened the door.' },
          { text: 'Nothing', why: 'Something big changed.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s opening line for Sunday. Which one will close the door?',
        lines: [
          'Thank you for agreeing to talk about this properly.',
          'I\'ve decided, so this conversation is just a formality.',
          'Before I explain, what worries you most about Lagos?',
        ],
        bug: 1,
        fix: 'I want this to be a decision you understand, even if it\'s hard.',
        explanation: '"Just a formality" tells them their voice doesn\'t count. Reactance guaranteed.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Which caller learned it?',
        pairs: [
          ['One message, then listen', 'Clinton'],
          ['Hold that thought', 'Lucía'],
          ['Find what you both want', 'Miracle'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which option answers Mama\'s "Who will look after you?"',
        options: [
          { text: 'A higher salary', why: 'That answers a money worry, not this one.' },
          { text: 'Staying with Auntie Ngozi\'s family at first' },
          { text: 'A bigger PowerPoint', why: 'It\'s gone. Let it rest.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 5 so far.',
        template: 'Don\'t [[1]]. [[2]] first. Find what you both [[3]].',
        blanks: [['push'], ['Listen'], ['want', 'need']],
        distractors: ['Argue', 'win'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s first question for Sunday.',
        tiles: ['What', 'worries', 'you', 'most', 'about', 'Lagos?'],
        distractors: ['must'],
      },
    ],
  },
  reflect: {
    prompt: 'Plan a hard conversation of your own like Miracle: one open question, one shared interest, one option that answers their worry.',
    starters: ['My question: ...', 'What we share: ...', 'One option: ...'],
  },
  deepen: {
    title: 'Rehearse with a friend',
    summary: 'Ask a friend to play the other person in a hard conversation you\'re planning. Practise listening and saying back what you heard before you share your view.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus earlier chapters. Clinton cameo on air (callers meet only on air, per CAST.md).',
};

export default lesson;
