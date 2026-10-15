import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Story with a choice: saying sorry the right amount — a mistake in the KPI deck. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Saying sorry the right amount',
  summary: 'The CFO spots a mistake in Remi\'s KPI deck: churn was 3%, not 4%. Remi\'s stomach drops. He can write one sentence, or one thousand. Which one sounds professional?',
  minutes: 12,
  outcomes: [
    'Apologise for a real mistake: briefly, clearly, with a fix',
    'Stop saying sorry when nothing is wrong',
    'Swap "sorry" for "thank you" where it fits',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 3:10 p.m.',
      beats: [
        { speaker: 'narrator', text: 'An email from the CFO\'s office, forwarded by Brian with one line: "Can you check slide 4?" Slide 4 says churn was 4%. Pauline\'s CRM says 3%. Remi copied the wrong cell.' },
        { speaker: 'remi', text: '(Three weeks of good work, and now the CFO thinks I can\'t read a spreadsheet.)' },
        { speaker: 'tey', text: "Deep breath. Everyone makes mistakes like this. What people remember is how you handle it. Remi has three options." },
      ],
      choice: {
        prompt: 'How should Remi reply to Brian?',
        options: [
          {
            text: 'A long apology: "I am so, so sorry. I can\'t believe I did this. I feel terrible. I completely understand if you can\'t trust my work anymore. I\'m so sorry..."',
            outcome: 'Brian has to spend ten minutes reassuring Remi instead of fixing the slide. The mistake was small; the apology made it big.',
          },
          {
            text: 'No apology: quietly fix the slide and say nothing.',
            outcome: 'Brian notices the slide changed, but doesn\'t know whether Remi saw his message, or whether the CFO knows. He has to ask. Twice.',
          },
          {
            text: '"You\'re right, sorry: I copied the wrong cell. Churn was 3%. Corrected deck attached, and I\'ve double-checked every other number against the source."',
            outcome: 'Brian forwards it to the CFO in thirty seconds: "Corrected, thanks to Remi." Later he says, "That\'s exactly how to handle it."',
            best: true,
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p><strong>A professional apology has three parts, and it's short:</strong></p><ol><li><strong>Own it:</strong> \"Sorry, I copied the wrong cell.\" One sorry. Say what happened.</li><li><strong>Fix it:</strong> \"Corrected version attached.\"</li><li><strong>Prevent it:</strong> \"I've double-checked the other numbers against the source.\"</li></ol><p><strong>And the other side: stop saying sorry when nothing is wrong.</strong> Swap it for thank you:</p><ul><li>\"Sorry for the late reply\" → <strong>\"Thanks for your patience.\"</strong></li><li>\"Sorry to bother you\" → <strong>\"Thanks for your time.\"</strong></li><li>\"Sorry, can I ask a question?\" → <strong>\"Quick question:\"</strong></li></ul>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'One sorry for one real mistake. Then move straight to the fix. A long apology turns a small mistake into a big moment.',
    },
  ],
  apply: {
    scenario: 'Wednesday, 3:12. Slide 4.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s apology in order.',
        lines: ['Sorry: I copied the wrong cell.', 'Churn was 3%. Corrected deck attached.', 'I\'ve double-checked every other number against the source.'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did the long apology make things worse?',
        options: [
          { text: 'It made a small mistake into a big moment, and Brian had to reassure Remi' },
          { text: 'Apologising is always wrong', why: 'A short apology for a real mistake is right.' },
          { text: 'It had too few apologies', why: 'The opposite.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Swap sorry for thanks.',
        pairs: [
          ['Sorry for the late reply', 'Thanks for your patience'],
          ['Sorry to bother you', 'Thanks for your time'],
          ['Sorry, can I ask...?', 'Quick question:'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Saw the fix, thanks. These things happen.',
        prompt: 'Best reply?',
        options: [
          { text: 'I\'m SO sorry again, it will never ever happen again, I promise.', why: 'He\'s moved on. Let him.' },
          { text: 'Thanks, Brian. I\'ll check numbers against the source every time from now on.' },
          { text: 'It was the CRM\'s fault.', why: 'It wasn\'t. Owning it is what earns trust.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A professional apology: own it, fix it, ___ it. (one word)',
        answers: ['prevent'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'A real mistake (say sorry) or nothing wrong (say thanks)?',
        groups: ['Say sorry', 'Say thanks instead'],
        items: [
          { text: 'You sent the wrong file', group: 0 },
          { text: 'You replied the next morning, as normal', group: 1 },
          { text: 'You forgot a meeting', group: 0 },
          { text: 'Someone waited 5 minutes while you found a document', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s email. Which "sorry" should go?',
        lines: [
          'Sorry to bother you, Wanjiku!',
          'Could you send the October numbers?',
          'Thanks so much.',
        ],
        bug: 0,
        fix: 'Hi Wanjiku!',
        explanation: 'Asking a colleague for numbers isn\'t bothering them. It\'s work.',
      },
      {
        kind: 'mcq',
        prompt: 'Why didn\'t the silent fix work?',
        options: [
          { text: 'Brian didn\'t know if Remi had seen it, or if the CFO knew it was fixed' },
          { text: 'Fixing mistakes is wrong', why: 'Fixing is right. Silence was the problem.' },
          { text: 'Slides can\'t be changed', why: 'They can.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Let me find out', 'Upgrade of "I don\'t know"'],
          ['kinda', 'a bit'],
          ['Churn', 'Customers who stop buying'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a "thanks" instead of a "sorry".',
        tiles: ['Thanks', 'for', 'your', 'patience.'],
        distractors: ['Sorry', 'late'],
      },
    ],
  },
  reflect: {
    prompt: 'How many times did you say "sorry" yesterday? How many were for real mistakes? Which could have been "thank you"?',
    starters: ['I said sorry about... times', 'One that could be thanks: ...'],
  },
  deepen: {
    title: 'The sorry swap',
    summary: 'For a week, every time you start to type "sorry for the delay" or "sorry to bother you", swap in "thanks for your patience" or "thanks for your time". Notice how much more confident your messages sound.',
  },
  notes: 'Own/fix/prevent apology structure is general professional-communication guidance. "Thanks for your patience" vs "sorry for the delay" swap is common workplace-writing advice. Cultural norms around apologising vary; lesson keeps one sincere apology for real mistakes.',
};

export default lesson;
