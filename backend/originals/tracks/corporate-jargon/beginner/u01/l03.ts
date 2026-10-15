import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3 — free. Card deck: the five phrases from the course tagline, each with meaning, example and plain-English swap. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The big five',
  summary: 'Circle back, move the needle, low-hanging fruit, deep dive, take this offline. Five phrases you will hear in almost every office in the world.',
  minutes: 12,
  outcomes: [
    'Know what the five most common office phrases mean',
    'Recognise them in real sentences',
    'Swap each one for plain English when you need to',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Monday night. Remi sends Ada a photo of his notebook: one page, eleven phrases, a lot of question marks.</p><p>Ada replies with a voice note: <em>\"Learn these five first. You'll hear them every single day.\"</em></p><p>Here they are.</p>",
    },
    {
      kind: 'text',
      html: "<h3>1. Circle back</h3><p><strong>Means:</strong> come back to a topic later.</p><p><strong>You'll hear:</strong> \"Good question. Let's circle back to that on Thursday.\"</p><p><strong>Plain swap:</strong> \"Let's come back to that later.\"</p><p><strong>Watch out:</strong> sometimes \"let's circle back\" quietly means \"not now, maybe never\". If it matters to you, ask <em>when</em>.</p>",
    },
    {
      kind: 'text',
      html: "<h3>2. Move the needle</h3><p><strong>Means:</strong> make a difference big enough to notice.</p><p><strong>Picture:</strong> the needle on a gauge, like a car's speedometer. If your work doesn't move it, nothing really changed.</p><p><strong>You'll hear:</strong> \"Nice idea, but will it move the needle on sales?\"</p><p><strong>Plain swap:</strong> \"Will it make a real difference?\"</p>",
    },
    {
      kind: 'text',
      html: "<h3>3. Low-hanging fruit</h3><p><strong>Means:</strong> the easiest tasks that still bring a good result.</p><p><strong>Picture:</strong> fruit you can pick without a ladder.</p><p><strong>You'll hear:</strong> \"Let's go after the low-hanging fruit first, then tackle the hard stuff.\"</p><p><strong>Plain swap:</strong> \"the easy wins\", \"the quick wins\".</p>",
    },
    {
      kind: 'check',
      question: 'Brian says, "Fixing typos on the website is low-hanging fruit." What does he mean?',
      options: ['It\'s not important', 'It\'s a job for the garden team', 'It\'s easy to do and worth doing'],
      answer: 2,
      explanation: 'Low-hanging fruit = easy to reach AND worth picking.',
    },
    {
      kind: 'text',
      html: "<h3>4. Deep dive</h3><p><strong>Means:</strong> a detailed look at one topic.</p><p><strong>You'll hear:</strong> \"Can you do a deep dive on why customers are leaving?\" It can also be a verb: \"Let's deep-dive the numbers.\"</p><p><strong>Plain swap:</strong> \"a detailed look\", \"look at it closely\".</p><p><strong>Tip:</strong> when someone asks for a deep dive, ask how long they want it to take. A deep dive can be an afternoon or a month.</p>",
    },
    {
      kind: 'text',
      html: "<h3>5. Take this offline</h3><p><strong>Means:</strong> stop discussing this here, and talk about it separately, usually with fewer people.</p><p><strong>You'll hear:</strong> \"This is getting detailed. Let's take it offline after the call.\"</p><p><strong>Plain swap:</strong> \"Let's discuss this separately.\"</p><p><strong>Nothing to do with the internet.</strong> People say it on video calls all the time, while staying very online.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Circle back = later. Move the needle = make a real difference. Low-hanging fruit = easy wins. Deep dive = detailed look. Take it offline = discuss separately.',
    },
  ],
  apply: {
    scenario: 'Tuesday morning. Remi\'s notebook has five answers in it.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the big five to their meanings.',
        pairs: [
          ['Circle back', 'Come back to it later'],
          ['Move the needle', 'Make a real difference'],
          ['Low-hanging fruit', 'Easy wins'],
          ['Deep dive', 'A detailed look'],
          ['Take it offline', 'Discuss it separately'],
        ],
      },
      {
        kind: 'mcq',
        prompt: '"Will this move the needle?" What is Brian really asking?',
        options: [
          { text: 'Will it make a difference big enough to matter?' },
          { text: 'Can we move the office furniture?', why: 'The needle is a picture of a gauge, not anything physical.' },
          { text: 'Is it finished?', why: 'It\'s about impact, not whether the work is done.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Brian\'s message.',
        template: 'Great discussion! Let\'s [[1]] back to the budget on Friday, and take the hiring question [[2]].',
        blanks: [['circle'], ['offline']],
        distractors: ['needle', 'fruit'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Is it about NOW or LATER?',
        groups: ['Do it now', 'Deal with it later'],
        items: [
          { text: 'Grab the low-hanging fruit', group: 0 },
          { text: 'Let\'s circle back', group: 1 },
          { text: 'Let\'s take this offline', group: 1 },
          { text: 'Start with the quick wins', group: 0 },
          { text: 'Let\'s put a pin in it', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Remi, can you do a deep dive on why our delivery times went up last month?',
        prompt: 'What is the best reply?',
        options: [
          { text: 'I can\'t swim, sorry.', why: 'A deep dive is a detailed look, not swimming. Even Remi\'s literal brain knows that by now.' },
          { text: 'Sure! How detailed do you want it, and when do you need it by?' },
          { text: 'Done!', why: 'A deep dive takes time. Agree what "done" looks like first.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'In a video call, Brian says, "Let\'s take this offline." What should Remi do?',
        options: [
          { text: 'Turn off his Wi-Fi', why: 'Nothing to do with the internet. It means "not here, not now".' },
          { text: 'Keep arguing his point', why: '"Take it offline" is a polite stop sign for the current meeting.' },
          { text: 'Stop discussing it now, and expect to talk about it separately later' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Plain English for "low-hanging fruit": the easy ... (one word)',
        answers: ['wins', 'win', 'tasks', 'jobs'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Zanele explains the big five to Remi. Which line is wrong?',
        lines: [
          'Circle back means we\'ll return to it later.',
          'A deep dive means looking at something in detail.',
          'Moving the needle means making things slower and more careful.',
          'Low-hanging fruit means the easy wins.',
        ],
        bug: 2,
        fix: 'Moving the needle means making a difference people can see.',
        explanation: 'The needle is on a gauge: moving it means a visible change.',
      },
      {
        kind: 'mcq',
        prompt: 'Brian keeps saying "let\'s circle back" about Remi\'s idea, and it never comes back. What could Remi say?',
        options: [
          { text: '"Happy to circle back. Could we put 10 minutes in the diary for Friday?"' },
          { text: 'Nothing. It will come back eventually.', why: 'Sometimes "circle back" quietly means "never". Asking for a time turns it into a real plan.' },
          { text: '"You never actually circle back!"', why: 'True, perhaps, but it puts Brian on the defensive. Offer a time instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Translate into plain English: "Let\'s grab the low-hanging fruit and circle back on the rest."',
        tiles: ['Let\'s', 'do', 'the', 'easy', 'tasks', 'now', 'and', 'the', 'rest', 'later.'],
        distractors: ['offline', 'needle'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the big five have you heard before, and where? Which one would you actually use yourself, and which would you swap for plain English?',
    starters: ['I\'ve heard ... at ...', 'I\'d use...', 'I\'d swap...'],
  },
  deepen: {
    title: 'Remi\'s Jargon Notebook: the big five',
    summary: 'Copy the big five into your own notebook with your own example sentence for each. Your example will stick better than anyone else\'s.',
  },
  notes:
    'Meanings per Merriam-Webster ("move the needle": to make a noticeable difference), Cambridge ("low-hanging fruit": easy to achieve), Collins ("deep dive": detailed analysis), Cambridge ("take something offline": discuss separately, later). The gauge image for "move the needle" is offered as a memory picture, not an etymology claim.',
};

export default lesson;
