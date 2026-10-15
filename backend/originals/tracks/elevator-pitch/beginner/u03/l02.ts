import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Reading: six ways to pitch (Daniel Pink, To Sell Is Human). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Six ways to pitch',
  summary: 'Arjun sends Ada a book chapter with a note: "You don\'t need ONE pitch. You need a few tools." It\'s Daniel Pink\'s six successors to the elevator pitch.',
  minutes: 12,
  outcomes: [
    'Know Daniel Pink\'s six pitch types',
    'Pick the right type for the moment',
    'Write a one-word pitch and a subject-line pitch',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Six successors to the elevator pitch',
      html: "<p>In his 2012 book <em>To Sell Is Human</em>, Daniel Pink argues that the classic elevator pitch is just one tool. He suggests six others, each useful for a different moment. Ada reads them on the bus.</p><h3>1. The one-word pitch</h3><p>Boil your idea down to one word people associate with you. Pink's method: write a 50-word pitch, cut it to 25, then to 6. One of those six words is your word. Ada's: <strong>\"Peace.\"</strong> (No more money arguments.)</p><h3>2. The question pitch</h3><p>Instead of a statement, ask a question that makes people think of their own reasons. \"Have you ever been in a group where someone swore they'd paid?\" Pink's advice: use it when your argument is strong, because people will think it through themselves.</p><h3>3. The rhyming pitch</h3><p>Rhymes are easier to process and remember, and they can even seem more true (more on that in lesson 4). \"No more fights about who's paid. Every naira, every trade.\"</p><h3>4. The subject-line pitch</h3><p>Written like an email subject line people want to open. Pink says the good ones appeal to <strong>usefulness</strong> or <strong>curiosity</strong>. \"Ending the monthly ajo argument, for good.\"</p><h3>5. The Twitter pitch</h3><p>A pitch short enough for a single post: one idea, one sentence, room to share. \"Built an app that ended the monthly 'I already paid!' fight in my office's savings group. 3 groups, 110 members so far.\"</p><h3>6. The Pixar pitch</h3><p>A tiny story in six sentences: <em>Once upon a time... Every day... One day... Because of that... Because of that... Until finally...</em> Lesson 3 is all about this one.</p>",
    },
    {
      kind: 'check',
      question: 'When does Pink suggest using a question pitch?',
      options: ['When your argument is strong', 'When your argument is weak', 'Never'],
      answer: 0,
      explanation: 'A question makes people think through the reasons themselves, which helps when the reasons are good.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'One word. A question. A rhyme. A subject line. A post. A Pixar story. Different tools for different moments.',
    },
  ],
  apply: {
    scenario: 'Reading Pink on the bus.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the pitch type to Ada\'s example.',
        pairs: [
          ['One-word', '"Peace."'],
          ['Question', '"Ever had someone swear they\'d paid?"'],
          ['Subject line', '"Ending the monthly ajo argument, for good"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What two things do good subject-line pitches appeal to, according to Pink?',
        options: [
          { text: 'Fear or guilt', why: 'Not Pink\'s advice.' },
          { text: 'Usefulness or curiosity' },
          { text: 'Length and detail', why: 'The opposite.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Pink\'s one-word method in order.',
        lines: ['Write a 50-word pitch', 'Cut it to 25 words', 'Cut it to 6 words', 'Pick the one word that matters most'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Which one should I use on pitch night?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Mix them: open with a question, tell a mini Pixar story, and end with a line people can repeat.' },
          { text: 'Only the one-word pitch: say "Peace" and sit down.', why: 'Bold. Too bold.' },
          { text: 'None, stick with the plain version.', why: 'That\'s the one Arjun zoned out of.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The book these six pitches come from: "To Sell Is ___". (one word)',
        answers: ['Human', 'human'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which pitch type is it?',
        groups: ['Question', 'Rhyme', 'Twitter'],
        items: [
          { text: 'Have you ever lost track of who paid?', group: 0 },
          { text: 'No more fights about who\'s paid', group: 1 },
          { text: 'Built an app that ended the "I already paid!" fight. 110 members so far.', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the point of having six types of pitch?',
        options: [
          { text: 'To memorise six speeches', why: 'They\'re tools, not speeches.' },
          { text: 'To confuse the judges', why: 'Hopefully not.' },
          { text: 'Different moments need different tools: an email, a post, a stage, a chat' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s subject-line pitch drafts. Which one fails Pink\'s test?',
        lines: [
          'Ending the monthly ajo argument, for good',
          'Ajo Tracker v2.3 release notes and database migration details',
          'Why your savings group needs a referee',
        ],
        bug: 1,
        fix: 'How 110 people stopped arguing about money',
        explanation: 'Neither useful nor curious to most readers. The others promise a benefit or spark curiosity.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The Pixar pitch openers.',
        template: 'Once upon a [[1]]... Every [[2]]... One [[3]]...',
        blanks: [['time'], ['day'], ['day']],
        distractors: ['week', 'night'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s subject-line pitch.',
        tiles: ['Ending', 'the', 'monthly', 'ajo', 'argument,', 'for', 'good'],
        distractors: ['database'],
      },
    ],
  },
  reflect: {
    prompt: 'Try three of Pink\'s pitches for your own idea: a one-word pitch, a question pitch and a subject-line pitch.',
    starters: ['One word: ...', 'Question: ...', 'Subject line: ...'],
  },
  deepen: {
    title: 'The 50-25-6-1 exercise',
    summary: 'Write your pitch in 50 words. Cut to 25. Cut to 6. Pick one word. It\'s harder than it sounds, and it shows you what really matters.',
  },
  notes: 'Daniel H. Pink (2012), To Sell Is Human, ch. 7 "Pitch": six successors to the elevator pitch (one-word, question, rhyming, subject-line, Twitter, Pixar); 50-25-6-1 exercise; question pitch when arguments are strong; subject lines appeal to utility or curiosity. Examples are written for Ada.',
};

export default lesson;
