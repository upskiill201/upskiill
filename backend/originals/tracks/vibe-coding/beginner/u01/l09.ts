import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Chat with Tey: permission modes, who's allowed to do what. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Who\'s allowed to do what',
  summary: 'By the twentieth "Allow?" Hazel is clicking Yes without reading. Benny says, "Just turn the questions off." Tey has a better idea: pick the right mode for the job.',
  minutes: 12,
  outcomes: [
    'Explain the main permission modes in plain words',
    'Switch modes with Shift+Tab',
    'Choose the safe mode while you\'re learning',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Every "Allow?" is Claude Code asking before it changes a file or runs a command. Annoying? A little. Useful? Very.', replies: ['Can I turn them off?', 'Why so many?'] },
        { tey: 'You can choose how much it asks. That\'s called the permission mode. You switch modes by pressing Shift+Tab; the bottom of the screen shows which one you\'re in.', replies: ['What are the modes?'] },
        { tey: 'The three you\'ll use: Ask (the normal mode: it asks before each edit and command). Accept edits: it edits files in your folder without asking, and still asks for most commands. Plan mode: it only reads and plans, and changes nothing until you approve the plan.', replies: ['Which one should I use?'] },
        { tey: 'While you\'re learning: Ask. You see every change before it happens, which is how you learn what it does. Plan mode when the job is big. Accept edits later, once you have git (Chapter 4), so any change can be undone.', replies: ['And Benny\'s idea?'] },
        { tey: 'Newer versions also have an Auto mode, where a safety checker approves things instead of you. Some settings skip questions completely; the docs say to use those only in throwaway sandboxes. Not on your laptop, not this course.', replies: ['Got it.'] },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Clicking Yes without reading is the same as having no questions at all. If you\'re tired of reading, you\'re tired of checking: take a break.',
    },
  ],
  apply: {
    scenario: 'The twentieth "Allow?"',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is an "Allow?" question for?',
        options: [
          { text: 'To slow you down for no reason', why: 'It gives you a moment to check before anything changes.' },
          { text: 'To show adverts', why: 'No adverts here.' },
          { text: 'So you can check a change or command before it happens' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mode to what it does.',
        pairs: [
          ['Ask', 'Asks before each edit and command'],
          ['Accept edits', 'Edits files without asking'],
          ['Plan mode', 'Reads and plans, changes nothing'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which keys switch between modes?',
        answers: ['shift+tab', 'shift tab', 'shift-tab', 'shift + tab'],
        placeholder: '... + ...',
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Just turn every question off. It\'s so much faster.',
        prompt: 'Hazel\'s best reply?',
        options: [
          { text: 'Not while I\'m learning. I want to see every change. Once we have git, I\'ll use Accept edits.' },
          { text: 'Good idea, turning them all off.', why: 'Then nobody checks anything before it happens.' },
          { text: 'I\'ll keep the questions and click Yes without reading.', why: 'That\'s the same as no questions.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which mode fits each moment?',
        groups: ['Ask', 'Plan mode'],
        items: [
          { text: 'Learning, small changes to your page', group: 0 },
          { text: 'A big new feature: you want a plan first', group: 1 },
          { text: '"Read my project and tell me what\'s there"', group: 1 },
          { text: 'Fixing the price on the lessons page', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s rule.',
        template: 'While I\'m learning, I use [[1]] mode. For a big job, I use [[2]] mode first.',
        blanks: [['Ask'], ['Plan']],
        distractors: ['Auto', 'Silent'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Benny\'s cheat sheet is wrong?',
        lines: [
          'Shift+Tab switches mode.',
          'Plan mode changes nothing until you approve.',
          'Skipping all questions is fine on your own laptop.',
          'Ask mode shows you each change first.',
        ],
        bug: 2,
        fix: 'Skipping all questions is only for throwaway sandboxes.',
        explanation: 'The official docs say to use the "no questions" setting only in isolated environments.',
      },
      {
        kind: 'mcq',
        prompt: 'Hazel notices she\'s clicked Yes ten times without reading. Best move?',
        options: [
          { text: 'Switch to a mode with no questions', why: 'That removes the check entirely.' },
          { text: 'Keep going, she\'s nearly done', why: 'Tired checking misses mistakes.' },
          { text: 'Stop, take a break, and come back to read properly' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'When would you ever let it edit without asking?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'Never, ever.', why: 'Accept edits is fine once every change can be undone.' },
          { text: 'Once my work is saved in git, so any change can be undone. And still never for commands I don\'t understand.' },
          { text: 'Whenever I\'m in a hurry.', why: 'Hurry is when mistakes happen.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Where does Hazel see which mode she\'s in?',
        options: [
          { text: 'At the bottom of the Claude Code screen' },
          { text: 'In her email', why: 'It\'s shown right in the tool.' },
          { text: 'She can\'t tell', why: 'The current mode is shown on screen.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Where else in life do you click "Yes" without reading (cookie banners, app permissions)? What could go wrong if a coding tool were one of them?',
  },
  deepen: {
    title: 'On your computer: find the modes',
    summary: 'Start claude in your my-site folder. Press Shift+Tab a few times and watch the bottom of the screen change. Stop on the normal mode. Type /help and skim the list.',
  },
  notes: 'code.claude.com/docs permission-modes (October 2026): default (asks), acceptEdits (file edits in working dir + common filesystem commands without asking), plan (read-only; edits blocked until approval), auto (classifier approves; version- and plan-dependent), bypassPermissions (docs: "Only use this mode in isolated environments like containers, VMs"). Shift+Tab cycles modes. The lesson calls default "Ask" (the desktop app calls it Manual); mode names may change between versions, so learners are taught to read the label on screen.',
};

export default lesson;
