import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 5 — Checkpoint 1. Reviews brain dumps, voice, edit levels and plain language. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: draft fast, sound like you',
  summary: 'Brain dumps, your voice, the right level of edit, and plain language. All mixed up.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can draft fast and edit well', 'Show you can keep your voice and write plainly'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 2, first Checkpoint. Four lessons on writing faster without sounding like a robot.', replies: ['Ready'] },
        { tey: 'Warm-up: writing is two jobs. Drafting and...', replies: ['Editing', 'Coffee'] },
        { tey: "Editing. Ha. Coffee helps with both. Let's go." },
      ],
    },
  ],
  apply: {
    scenario: "Checkpoint: Ada's Monday inbox.",
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the fast-draft method.',
        lines: ['You dump the facts', 'The AI drafts with reader, length and tone', 'You edit and check every fact'],
      },
      {
        kind: 'mcq',
        prompt: 'Why separate drafting from editing?',
        options: [
          { text: 'Editing is optional', why: 'Editing is where facts get checked.' },
          { text: 'Judging every sentence while drafting is what makes writing slow' },
          { text: 'AI tools require it', why: 'It is a writing habit, not a tool rule.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the edit level to its use.',
        pairs: [
          ['Proofread', 'Happy with it, catch typos'],
          ['Light edit', 'A bit wordy or clunky'],
          ['Rewrite', 'Not working at all'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the fact the AI softened. (Ada\'s notes: "the bug delayed testing by 2 days".)',
        lines: ['Sign-up is finished.', 'A small issue had no impact on the schedule.', 'Lucía still needs to approve the colours.'],
        bug: 1,
        fix: 'A bug delayed testing by two days, to Friday.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Active or passive?',
        groups: ['Active', 'Passive'],
        items: [
          { text: 'We moved the launch.', group: 0 },
          { text: 'The launch was moved.', group: 1 },
          { text: 'Grace will send the files.', group: 0 },
          { text: 'The files will be sent.', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the voice-protecting line.',
        tiles: ['Keep', 'my', 'words', 'where', 'possible'],
        distractors: ['replace'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Help, my AI emails all start with "I hope this email finds you well" and I hate it.',
        prompt: 'What is the quickest fix?',
        options: [
          { text: 'Add it to your "never say" list in your voice note, and paste the note into writing requests.' },
          { text: 'Delete it by hand forever.', why: 'Works, but the voice note stops it at the source.' },
          { text: 'Switch AI tools.', why: 'Most will do it. Tell it your voice.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '"Utilise" in plain language is ... (one word)',
        answers: ['use'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request turns Ada\'s notes into the best draft?',
        options: [
          { text: 'Write my weekly update.', why: 'No notes: it will invent the week.' },
          { text: 'Turn these notes into a 5-bullet update for my manager, in my voice [voice note], only these facts: [notes].' },
          { text: 'Make my week sound impressive.', why: 'An invitation to exaggerate.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the plain-language request.',
        template: 'Edit this: [[1]] sentences, [[2]] voice, everyday words, no filler. Keep it [[3]].',
        blanks: [['short'], ['active'], ['kind']],
        distractors: ['long', 'passive', 'vague'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Generic AI voice or Ada\'s voice?',
        groups: ['Generic', "Ada's"],
        items: [
          { text: 'I wanted to reach out regarding...', group: 0 },
          { text: 'Quick one:', group: 1 },
          { text: 'Please do not hesitate to contact me.', group: 0 },
          { text: 'Shout if you need anything!', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Can you proofread my announcement? I like the wording, I don't want it changed.",
        prompt: 'Which request should Ada use?',
        options: [
          { text: 'Make it more exciting.', why: 'She asked for a proofread.' },
          { text: 'Proofread only: spelling, grammar, punctuation. Do not change the wording.' },
          { text: 'Rewrite it in my voice.', why: "It's Lucía's text, and she likes it." },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the wordy phrase to the plain one.',
        pairs: [
          ['In order to', 'To'],
          ['At this point in time', 'Now'],
          ['With regard to', 'About'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the voice-note routine.',
        lines: ['Pick 3 messages you wrote', 'Ask the AI to describe the style', 'Fix the description', 'Save and reuse it'],
      },
      {
        kind: 'mcq',
        prompt: 'What is the risk of pressing "regenerate" on a nearly-good draft?',
        options: [
          { text: 'None at all', why: 'You lose what was working.' },
          { text: 'It deletes your account', why: 'No! It just makes a new draft.' },
          { text: 'It throws away the good parts and rolls the dice' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ask for the ... level of edit that fixes the problem (one word)',
        answers: ['smallest', 'lowest', 'least', 'minimum'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Spot the unkind line.',
        lines: ['Thanks for the icons!', 'Honestly these are useless.', 'They need to be simpler to read on phones.', 'Could you send new ones by Friday?'],
        bug: 1,
        fix: "They don't work on small screens yet.",
      },
      {
        kind: 'sortGroups',
        prompt: 'Who does it?',
        groups: ['You', 'The AI'],
        items: [
          { text: 'Supply the facts', group: 0 },
          { text: 'Shape notes into sentences', group: 1 },
          { text: 'Check every fact before sending', group: 0 },
          { text: 'Suggest a list of edits', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I need to tell our agency the deadline was missed again. Firm, not nasty.',
        prompt: 'Which shape should the message take?',
        options: [
          { text: 'An angry list of everything that went wrong.', why: 'Firm is not angry.' },
          { text: 'Thanks for the work, the problem said plainly, what it affected, and the new date needed.' },
          { text: 'A vague "hope all is well!"', why: 'Too soft: the problem disappears.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s brain-dump request.',
        tiles: ['Turn', 'these', 'notes', 'into', 'a', 'short', 'update'],
        distractors: ['novel'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Ada wants edit suggestions she can choose from. Which request?',
        options: [
          { text: 'Improve this.', why: 'It will rewrite instead of suggesting.' },
          { text: "List up to 5 changes you'd make, with a reason each. Don't rewrite yet." },
          { text: 'Rewrite this 5 times.', why: 'Five drafts, not suggestions.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Plain language is respect for the reader\'s ... (one word)',
        answers: ['time'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the lesson to its big idea.',
        pairs: [
          ['First draft in a minute', 'Dump, draft, edit'],
          ['Sound like you', 'A saved voice note'],
          ["Rewrite, don't regenerate", 'The smallest edit level'],
          ['Shorter, clearer, kinder', 'Plain language rules'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'True or false?',
        groups: ['True', 'False'],
        items: [
          { text: 'Kind and direct can go together', group: 0 },
          { text: 'Formal and long always sounds more professional', group: 1 },
          { text: 'The facts in a draft must come from you', group: 0 },
          { text: 'A rewrite never changes your meaning', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which is the clearest sentence?',
        options: [
          { text: '"Approval of colours is requested at your convenience."', why: 'Passive, and no date.' },
          { text: '"Colours, whenever, no stress, maybe?"', why: 'Unclear what is needed and when.' },
          { text: '"We need your OK on the colours by Wednesday."' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which writing habit from this unit has already changed how you write?',
    starters: ['I used to...', 'Now I...'],
  },
  deepen: { title: 'Keep going', summary: 'Use the dump-draft-edit method on every message you send tomorrow.' },
  notes: 'Review only. No new claims.',
};

export default lesson;
