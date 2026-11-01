import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: Lucía's one-on-one notes, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: Lucía\'s one-on-one notes',
  summary: 'Lucía keeps one page of notes per person. Here\'s Tomás\'s, after week 3. Tap through to see every Chapter 2 tool on one page.',
  minutes: 11,
  outcomes: [
    'See every Chapter 2 tool in one page of notes',
    'Keep simple one-on-one notes of your own',
    'Spot what makes notes useful next week',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Tomás, one-on-one, week 3',
      text: 'Opened with: "How\'s this week going, really?" He talked about the newsletter first. Said: "I was scared you\'d think I couldn\'t do it." Thanked him again for telling me. What motivates him: learning fast, knowing he\'s on track. Wants: a mentor. Asked Diego, who said yes. What made the error easy: no second check. Next steps: Tomás sets up the test send by Wednesday. I check codes with him until then.',
      hotspots: [
        { phrase: 'How\'s this week going, really?', note: 'An open question that gives him the floor. Their agenda, not hers.' },
        { phrase: 'I was scared you\'d think I couldn\'t do it.', note: 'She wrote down his words, not her guess. That\'s listening to understand.' },
        { phrase: 'Thanked him again for telling me.', note: 'Psychological safety, repeated on purpose. Speaking up gets rewarded every time.' },
        { phrase: 'learning fast, knowing he\'s on track', note: 'Competence: the motivation need that matters most to Tomás right now.' },
        { phrase: 'Asked Diego, who said yes.', note: 'Two needs in one move: Tomás gets a mentor, Diego\'s experience counts.' },
        { phrase: 'What made the error easy: no second check.', note: 'Blame vs learn: she fixed the system, not just the person.' },
        { phrase: 'Next steps: Tomás sets up the test send by Wednesday.', note: 'Written next steps with a who and a when. Next week starts by checking them.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Good notes: their words, what drives them, what you agreed, who does what by when.',
    },
  ],
  apply: {
    scenario: 'Line check, week 3.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why write down Tomás\'s actual words?',
        options: [
          { text: 'To use against him later', why: 'Definitely not.' },
          { text: 'HR requires it', why: 'It\'s about understanding him.' },
          { text: 'So she remembers what he really said, not her guess' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 2 tool is it?',
        groups: ['One-on-one', 'Safety', 'Motivation'],
        items: [
          { text: '"How\'s this week going, really?"', group: 0 },
          { text: 'Thanked him for telling me', group: 1 },
          { text: 'Learning fast matters to him', group: 2 },
          { text: 'Next steps written down', group: 0 },
          { text: 'No blame for the typo', group: 1 },
          { text: 'Diego\'s experience counts', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Do you actually write all this down?',
        prompt: 'Lucía\'s best answer?',
        options: [
          { text: 'Just the important bits, so I don\'t forget what I promised you. Want to see?' },
          { text: 'That\'s confidential.', why: 'Secret notes about him make him nervous.' },
          { text: 'No, I remember everything.', why: 'Nobody does, and next steps get lost.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Every next step needs a who and a ___. (one word)',
        answers: ['when', 'deadline', 'date'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Asking Diego to mentor Tomás feeds which needs?',
        options: [
          { text: 'Only Lucía\'s free time', why: 'It helps two people.' },
          { text: 'Tomás\'s competence, and Diego\'s wish for his experience to count' },
          { text: 'None', why: 'It feeds two.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'A draft of the notes. Which line would break trust if Tomás saw it?',
        lines: [
          'Wants a mentor. Asked Diego.',
          'Honestly a bit useless with details.',
          'Next steps: test send by Wednesday.',
        ],
        bug: 1,
        fix: 'Details: we\'re adding a second check.',
        explanation: 'Write notes you\'d be fine with them reading. Labels aren\'t observations.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put next week\'s one-on-one in order.',
        lines: ['Check last week\'s next steps', '"What\'s on your mind?"', 'Listen and follow up', 'Write new next steps'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the tool.',
        pairs: [
          ['"How\'s this week, really?"', 'Open question'],
          ['"No second check"', 'Blameless review'],
          ['"By Wednesday"', 'Clear next step'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Good notes.',
        template: 'Their [[1]], what [[2]] them, and who does what by [[3]].',
        blanks: [['words'], ['drives', 'motivates'], ['when']],
        distractors: ['faults', 'never'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the note-taking rule.',
        tiles: ['Write', 'notes', 'they', 'could', 'read.'],
        distractors: ['secret'],
      },
    ],
  },
  reflect: {
    prompt: 'Write a five-line note about someone you work or study with: what you know drives them, and one thing you\'d like to ask them.',
    starters: ['What drives them...', 'I\'d like to ask...'],
  },
  deepen: {
    title: 'One page per person',
    summary: 'If you lead anyone, start one page of notes per person. Add their words, what drives them, and next steps after every one-on-one.',
  },
  notes: 'Synthesis of Chapter 2 tools: open questions and employee-led agenda (Rogelberg), psychological safety (Edmondson), motivation needs (Deci & Ryan), blameless review, written next steps.',
};

export default lesson;
