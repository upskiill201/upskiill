import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 9 — the close: weak vs strong final paragraph. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The close',
  summary: 'Clinton\'s last paragraph says: "I hope you will consider my application, if possible. I know there are many better candidates. Thank you for your time and consideration. Yours faithfully." Miracle winces at every word.',
  minutes: 11,
  outcomes: ['Write a confident, polite closing paragraph', 'Remove apologies and filler', 'Sign off correctly'],
  learn: [
    {
      kind: 'compare',
      title: 'Apologising vs. inviting',
      before: { label: 'Weak close', text: 'I hope you will consider my application, if possible. I know there are many better candidates than me. Thank you for your time and consideration.\nYours faithfully,\nClinton\n\nIt apologises ("if possible"), talks him down ("many better candidates") and ends on filler. The last thing Brenda reads makes her doubt him.' },
      after: { label: 'Strong close', text: 'I\'d love to talk about how I could help Njangi Pay bring that same trust to more savings groups. Thank you for reading.\nKind regards,\nClinton Ndi\nclinton.ndi@email.com · github.com/clintonndi\n\nOne clear, polite next step, linked to their mission. Thanks, without grovelling. His full name and contact under the sign-off, so replying is easy.' },
      notes: [
        'Invite a next step: "I\'d love to talk about how I could help..."',
        'Never talk yourself down. They\'ll decide who\'s better; that\'s their job.',
        '"Kind regards" or "Best regards" works almost everywhere. Add your full name and contact details.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The last line is the second most-read line. End with a confident invitation, not an apology.',
    },
  ],
  apply: {
    scenario: 'Clinton rewrites his close.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Keep in the close, or cut?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'I\'d love to talk about how I could help.', group: 0 },
          { text: 'I know there are many better candidates.', group: 1 },
          { text: 'Thank you for reading.', group: 0 },
          { text: 'If possible, maybe, please consider me.', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s wrong with "I know there are many better candidates"?',
        options: [
          { text: 'It plants doubt in the reader\'s mind about you' },
          { text: 'It\'s too humble to be polite', why: 'It\'s worse than impolite: it argues against him.' },
          { text: 'Nothing, it\'s modest', why: 'Modest is fine. Talking yourself down isn\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that apologises.',
        lines: ['I\'d love to talk about how I could help.', 'Sorry to take up your valuable time with this letter.', 'Thank you for reading.'],
        bug: 1,
        explanation: 'They asked for applications. No need to apologise for sending one.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Should I end with "Call me tomorrow at 9am to arrange an interview"?',
        options: [
          { text: 'Too pushy. "I\'d love to talk about how I could help" invites without demanding.' },
          { text: 'Yes, be bold!', why: 'Bold is good, demanding isn\'t. Invite.' },
          { text: 'End with "Maybe?"', why: 'Too unsure. Confident and polite.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each weak close to a strong one.',
        pairs: [
          ['I hope you will consider me, if possible', 'I\'d love to talk about how I could help'],
          ['Thank you for your time and consideration', 'Thank you for reading'],
          ['Yours, Clinton', 'Kind regards, Clinton Ndi, with contact details'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which sign-off works almost everywhere?',
        options: [
          { text: 'Kind regards' },
          { text: 'Cheers mate', why: 'Too casual for most applications.' },
          { text: 'Yours eternally', why: 'Ha. Kind regards.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which close links back to Njangi Pay\'s mission?',
        options: [
          { text: '"I\'d love to talk about how I could help Njangi Pay bring that same trust to more savings groups."' },
          { text: '"I need this job, please."', why: 'About him, not them.' },
          { text: '"Looking forward to your reply."', why: 'Fine, but no link to their mission.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'End with a confident [[1]], not an [[2]].',
        blanks: [['invitation'], ['apology']],
        distractors: ['demand', 'photo', 'objective'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Under the sign-off, add your full ___ and contact details. (one word)',
        answers: ['name'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Confident or not?',
        groups: ['Confident', 'Not confident'],
        items: [
          { text: 'I\'d welcome the chance to talk.', group: 0 },
          { text: 'I\'m probably not good enough, but...', group: 1 },
          { text: 'I\'m excited about what you\'re building.', group: 0 },
          { text: 'Sorry for writing.', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Look at how you usually end emails or messages to people you want something from. Do you apologise? What would a confident invitation sound like?',
    starters: ['I usually end with...', 'Instead I\'ll write...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write two versions of your closing paragraph: one too pushy, one too apologetic. Then write the one in the middle.',
  },
  notes: 'Closing-paragraph guidance (invite a next step, no apology, sign-off plus contact details) is standard careers advice. "Yours faithfully" (unknown recipient) vs "Yours sincerely" (named recipient) is a British-English convention; "Kind regards" is widely acceptable internationally.',
};

export default lesson;
