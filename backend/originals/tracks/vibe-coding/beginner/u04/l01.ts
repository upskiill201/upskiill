import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story: "make it look professional" at midnight. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Make it look professional',
  summary: 'Five weeks to go. Midnight before the booster meeting, Hazel types "make the whole site look more professional" and approves everything. The thermometer is wrecked. So are her tests.',
  minutes: 12,
  outcomes: [
    'Explain why you need a way back before you need it',
    'Know the two safety nets: checkpoints and git',
    'Recognise the "tired at midnight" danger',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 11:58 p.m.',
      beats: [
        { speaker: 'narrator', text: 'The booster meeting is at 9 a.m. Hazel wants the site to impress the principal. She\'s tired.' },
        { speaker: 'hazel', text: 'Make the whole site look more professional.' },
        { speaker: 'narrator', text: '"Allow?" Yes. "Allow?" Yes. Yes. Yes. Fourteen minutes later she opens the page. It\'s sleek, grey and corporate. The thermometer has been rewritten into a grey chart that shows nothing. tests.html is empty. The lessons page now says "Contact Sales".' },
        { speaker: 'hazel', text: '(texting Ruth at 12:15 a.m.) It wrecked the thermometer. Can I get it back??' },
        { speaker: 'ruth', text: '(12:16 a.m.) Did you save a version before?' },
        { speaker: 'hazel', text: 'A version of what?' },
        { speaker: 'tey', text: 'Every builder needs a way back. Hazel has one she doesn\'t know about yet, and one she\'ll set up tonight so this never happens again.' },
      ],
      choice: {
        prompt: 'It\'s 12:20 a.m. What should Hazel do?',
        options: [
          { text: 'Ask it to "put everything back how it was".', outcome: 'It tries to rebuild from memory. The new thermometer is different and the tests don\'t come back.' },
          { text: 'Stop, and use the tool\'s rewind to go back to before the "professional" request.', outcome: 'The checkpoint menu lists her earlier messages. She picks the one before midnight and restores the code. The thermometer is back.', best: true },
          { text: 'Rebuild it all from scratch before 9 a.m.', outcome: 'At 3 a.m. she has half a thermometer and no sleep.' },
        ],
      },
    },
  ],
  apply: {
    scenario: 'The morning after.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What went wrong at midnight, apart from the vague request?',
        options: [
          { text: 'She approved every change without reading, with no saved version to go back to' },
          { text: 'The laptop was too slow', why: 'Speed wasn\'t the issue.' },
          { text: 'Grey is a bad colour', why: 'Grey wasn\'t the problem; losing the thermometer was.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Hazel\'s midnight request caused the damage?',
        lines: ['Make', 'the whole site', 'look more professional.'],
        bug: 1,
        fix: '"the heading on index.html"',
        explanation: '"The whole site" invited it to change every file, including the thermometer and tests.',
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'In banking, we never changed anything without being able to roll back. Why would you?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'Because I trust the AI.', why: 'Trust isn\'t a way back.' },
          { text: 'Rolling back is for banks.', why: 'It\'s for anyone who\'d hate to lose their work.' },
          { text: 'I didn\'t know how. Tonight I\'m setting it up.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe at midnight, or risky?',
        groups: ['Safe', 'Risky'],
        items: [
          { text: 'One small change, read, then approve', group: 0 },
          { text: '"Change the whole site"', group: 1 },
          { text: 'Approving without reading', group: 1 },
          { text: 'Saving a version before a big change', group: 0 },
          { text: 'Stopping when tired', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s rule.',
        template: 'Set up a way [[1]] before you [[2]] it.',
        blanks: [['back'], ['need']],
        distractors: ['forward', 'forget'],
      },
      {
        kind: 'mcq',
        prompt: 'Why didn\'t "put everything back how it was" work well?',
        options: [
          { text: 'It wasn\'t polite enough', why: 'Manners weren\'t the problem.' },
          { text: 'It had to guess the old version; a saved copy wouldn\'t have to guess' },
          { text: 'It\'s against the rules', why: 'It\'s allowed. It just can\'t remember exactly.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does Claude Code call its built-in "go back" feature? (Starts with "re".)',
        answers: ['rewind', '/rewind'],
        placeholder: 're...',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the safety net to what it is.',
        pairs: [
          ['Checkpoint', 'Claude Code\'s automatic snapshot before each message'],
          ['Git', 'Saved versions you make on purpose'],
          ['GitHub', 'A copy of those versions off your laptop'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 3: before approving the "professional" change, what would have warned her?',
        options: [
          { text: 'Nothing, it was impossible to see', why: 'The changes were shown before each approval.' },
          { text: 'The weather', why: 'Not the weather.' },
          { text: 'Reading the changes: files deleted and lines removed in tests.html' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'I\'d have just rebuilt it from scratch. Easy.',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'It took us two weeks of checking to get it right. I\'d rather go back in ten seconds.' },
          { text: 'Okay, you rebuild it.', why: 'Rebuilding loses the checked version.' },
          { text: 'Rebuilding is always faster.', why: 'Not when you had a tested version.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever lost work (a document, photos, a school project)? What would have saved it?',
  },
  deepen: {
    title: 'Think about your project',
    summary: 'If your project folder vanished tonight, what would you lose? List it. By the end of this chapter, none of it will be only on your laptop.',
  },
  notes: 'Checkpoints/rewind from code.claude.com checkpointing docs (October 2026). Story only.',
};

export default lesson;
