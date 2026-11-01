import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Card deck: notes that keep the truth. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Notes that keep the truth',
  summary: 'Two days after an interview, Clinton\'s memory says "she loved the idea and would pay anything". His notes say "she pays Mama Rose twice a month, during exams". Notes win.',
  minutes: 11,
  outcomes: [
    'Take interview notes that keep facts separate from opinions',
    'Tag notes so patterns are easy to find',
    'Write notes while the conversation is fresh',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Memory edits itself towards what you hoped to hear. Notes don\'t. Five habits:</p><ol><li><strong>Write within the hour.</strong> Details fade fast, and the hopeful version fills the gap.</li><li><strong>Use their words.</strong> "Nothing dries, I wore damp jeans to class" beats "laundry is hard".</li><li><strong>Tag every line.</strong><ul><li><strong>FACT</strong>: something they did ("paid Mama Rose 2,400 FCFA last week")</li><li><strong>PAIN</strong>: what hurts and how much ("lost my whole Saturday")</li><li><strong>MONEY</strong>: anything about spending</li><li><strong>OPINION</strong>: what they think or would do ("I\'d use it")</li><li><strong>DOUBT</strong>: a reason it might not work ("I\'m broke till month end")</li></ul></li><li><strong>One page per person</strong>, with date, place and who they are (first-year, hostel, washes by hand).</li><li><strong>Count, don\'t remember.</strong> At the end of the week, count tags across all notes: how many FACT lines about paying? How many DOUBTs?</li></ol>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'OPINION lines are the weakest evidence. If a page is all OPINION, the conversation didn\'t go deep enough.',
    },
  ],
  apply: {
    scenario: 'Tagging Clinton\'s notes.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which tag?',
        groups: ['FACT', 'OPINION', 'DOUBT'],
        items: [
          { text: '"Paid Mama Rose 2,400 FCFA last week"', group: 0 },
          { text: '"I\'d use a pickup service every week"', group: 1 },
          { text: '"I\'m broke till month end"', group: 2 },
          { text: '"Washed for three hours on Saturday"', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why write notes within the hour?',
        options: [
          { text: 'Memory fades fast and fills the gaps with what you hoped to hear' },
          { text: 'It\'s polite', why: 'It\'s about accuracy.' },
          { text: 'Notes expire', why: 'Your memory does, not the notes.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tag to an example.',
        pairs: [
          ['PAIN', '"Lost my whole Saturday"'],
          ['MONEY', '"Twice a month during exams"'],
          ['OPINION', '"Sounds useful"'],
          ['DOUBT', '"I only have 1,000 FCFA left"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I remember she was super keen. I\'ll just write "very interested".',
        prompt: "David's best reply?",
        options: [
          { text: 'Perfect note.', why: 'It\'s a vague opinion, filtered by memory.' },
          { text: 'Write what she actually said and did. "Very interested" is your summary, and it\'s the hopeful one.' },
          { text: 'Don\'t write anything; you\'ll remember.', why: 'Memory edits itself.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Two habits.',
        template: 'Use their [[1]] and write within the [[2]].',
        blanks: [['words'], ['hour']],
        distractors: ['opinions', 'week'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Across 15 pages, Clinton counts 8 MONEY lines and 12 DOUBT lines. How many more DOUBT lines than MONEY lines?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which note line should be rewritten?',
        lines: [
          'Ama, first-year, Molyko hostel, washes by hand.',
          'FACT: washed for 3 hours last Saturday; jeans still wet Monday.',
          'She totally loves the idea.',
          'DOUBT: "I\'m broke till month end."',
        ],
        bug: 2,
        fix: 'OPINION: "That would be nice." (her exact words)',
        explanation: 'It\'s Clinton\'s hopeful summary, not her words, and it has no tag.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Clinton\'s note-taking routine.',
        lines: ['Have the conversation', 'Write notes within the hour, in their words', 'Tag every line', 'At week\'s end, count the tags across all notes'],
      },
      {
        kind: 'mcq',
        prompt: 'A page of notes is all OPINION lines. What does that tell you?',
        options: [
          { text: 'It was a great interview', why: 'Opinions are the weakest evidence.' },
          { text: 'The person has no problem at all', why: 'You don\'t know; you didn\'t dig.' },
          { text: 'The conversation didn\'t get to facts about what they did' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good note or weak note?',
        groups: ['Good note', 'Weak note'],
        items: [
          { text: '"Paid 2,400 FCFA, exam week, couldn\'t dry anything"', group: 0 },
          { text: '"Seemed keen"', group: 1 },
          { text: '"Hangs jeans by the kitchen to dry"', group: 0 },
          { text: '"Good vibes overall"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Make a note template for your own interviews: who, where, and the five tags. Which tag do you expect to fill most?',
    starters: ['My template has...', 'I expect most...'],
  },
  deepen: {
    title: 'Sharing notes',
    summary: 'When notes use real words and tags, someone else (like David) can read them and reach their own conclusion. That\'s a great check on your own bias.',
  },
  notes: 'Tag set (FACT, PAIN, MONEY, OPINION, DOUBT) is this course\'s teaching device, in the spirit of note-taking advice in The Mom Test (Fitzpatrick, 2013). Counts are fictional.',
};

export default lesson;
