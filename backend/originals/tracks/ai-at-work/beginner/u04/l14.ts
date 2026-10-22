import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 14 — owning the final answer. Story: "the AI said so". */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Owning the final answer',
  summary: 'When an AI-assisted mistake goes out under your name, "the AI said so" isn\'t an excuse anyone accepts. You own what you send.',
  minutes: 12,
  outcomes: [
    'Explain why you own what you send, however it was made',
    'Know what "owning it" looks like in practice',
    'Decide what you can and can\'t sign off',
  ],
  learn: [
    {
      kind: 'story',
      title: '"The AI said so"',
      beats: [
        { speaker: 'narrator', text: 'Tuesday. Tobi, Ada\'s manager, forwards an email from Lucía\'s finance team. The invoice summary Ada sent had the wrong total.' },
        { speaker: 'ada', text: 'The AI added it up. I just copied it.' },
        { speaker: 'narrator', text: 'Tobi doesn\'t look annoyed. Just patient. "Lucía\'s team doesn\'t know there was an AI. They know there was Ada."' },
        { speaker: 'tey', text: 'That\'s the rule. The tool helped you write it. Your name is what they read. You own it.' },
        { speaker: 'ada', text: 'So the fix isn\'t blaming the tool. It\'s checking before I send.' },
      ],
      choice: {
        prompt: 'What should Ada say to Tobi?',
        options: [
          { text: '"My mistake. I didn\'t recheck the total. I\'ve sent the correct one and I\'ll recalculate totals myself from now on."', outcome: 'Yes. Own it, fix it, and say what changes.', best: true },
          { text: '"The AI made the mistake, not me."', outcome: 'True in a narrow way, and it makes Tobi trust her less, not more.' },
          { text: '"I\'ll stop using AI completely."', outcome: 'Overcorrecting. The problem was checking, not the tool.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'If your name is on it, you own it. Use AI to help, then check everything you\'d be embarrassed to get wrong.',
    },
  ],
  apply: {
    scenario: 'Ada is handling the invoice mistake.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Who owns a mistake in an email Ada sent with AI help?',
        options: [
          { text: 'The AI tool', why: 'The reader only sees Ada\'s name.' },
          { text: 'Ada' },
          { text: 'Nobody', why: 'Someone has to fix it: the sender.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Ada owns the mistake.',
        lines: ['Say it was her mistake', 'Send the correct version', 'Say what she\'ll do differently', 'Do it next time'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Our finance team found the wrong total. What happened?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'The AI miscalculated it.', why: 'Lucía didn\'t hire the AI.' },
          { text: 'It was only a small difference.', why: 'Minimising makes it worse.' },
          { text: 'That was my mistake, sorry. The correct total is attached, and I\'m now rechecking every total before I send.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Owning it, or avoiding it?',
        groups: ['Owning it', 'Avoiding it'],
        items: [
          { text: '"My mistake, here\'s the fix"', group: 0 },
          { text: '"The tool did it"', group: 1 },
          { text: '"From now on I\'ll recheck totals"', group: 0 },
          { text: 'Hoping nobody notices', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'If your [[1]] is on it, you [[2]] it.',
        blanks: [['name'], ['own']],
        distractors: ['logo', 'delete'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the response to its effect on trust.',
        pairs: [
          ['"My mistake, fixed"', 'Builds trust'],
          ['"The AI did it"', 'Loses trust'],
          ['"I\'ll recheck totals now"', 'Shows learning'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s first sentence to Tobi.',
        tiles: ['That', 'was', 'my', 'mistake'],
        distractors: ['AI\'s', 'tool\'s'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s apology weakens it?',
        lines: [
          'Sorry, that total was wrong.',
          'The correct invoice is attached.',
          'To be fair, everyone uses AI and it happens to everyone.',
          'I now recalculate every total myself.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It shifts the blame instead of owning it.',
      },
      {
        kind: 'mcq',
        prompt: 'What was the real fix?',
        options: [
          { text: 'Checking the total before sending' },
          { text: 'Never using AI again', why: 'Overcorrection; the problem was checking.' },
          { text: 'Using a different AI tool', why: 'Any tool can miscalculate.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Can Ada sign off on this herself?',
        groups: ['Yes, after checking', 'No, needs an expert'],
        items: [
          { text: 'An email summarising a meeting she attended', group: 0 },
          { text: 'A tax rate for a client invoice', group: 1 },
          { text: 'A slide with sourced numbers', group: 0 },
          { text: 'A legal clause in a contract', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who is Ada\'s manager in this lesson? (name)',
        answers: ['Tobi', 'tobi'],
        placeholder: 'A name',
      },
      {
        kind: 'mcq',
        prompt: 'Why did Tobi say "they know there was Ada"?',
        options: [
          { text: 'Because Ada wrote it all by hand', why: 'She used AI; it doesn\'t matter to the reader.' },
          { text: 'To embarrass her', why: 'He was being patient and clear.' },
          { text: 'Readers judge the sender, not the tools behind the message' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What would you be most embarrassed to get wrong in your work? That\'s what you must always check.',
    starters: ['I\'d be embarrassed by...', 'So I\'ll always check...'],
  },
  deepen: { title: 'Try it today', summary: 'Write your own "always check" list: the three things you never want to get wrong under your name.' },
  notes: 'Tobi is Ada\'s manager (narrated, CAST.md). Invoice details are fictional.',
};

export default lesson;
