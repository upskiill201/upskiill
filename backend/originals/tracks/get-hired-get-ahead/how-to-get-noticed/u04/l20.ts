import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 20 — Chapter Challenge: the Njangi Pay cover letter. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: the Njangi Pay letter',
  summary: 'Applications close Friday. Clinton writes the letter that goes with his one-page CV: the njangi book, a real reason he wants Njangi Pay, two proofs and a calm close. Everything from this chapter, in about 300 words.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Write a complete, tailored cover letter', 'Use the four paragraphs and the swap-the-name test', 'Check, format and send it without slips'],
  learn: [
    {
      kind: 'story',
      title: 'Friday deadline',
      beats: [
        { speaker: 'narrator', text: 'Wednesday night. Five months to graduation. Njangi Pay\'s applications close on Friday. The CV is done. The letter isn\'t.' },
        { speaker: 'clinton', text: 'Okay. Story first. Why them, with the reminders launch. Two proofs: explaining tech, staying calm. Close. Search for "Afiya". Read it aloud. Go.' },
        { speaker: 'miracle', text: 'And it should sound like you. If Brenda reads one line out loud in your interview, you should recognise it.' },
        { speaker: 'tey', text: 'Everything from this chapter, in one letter. Let\'s write it.' },
      ],
    },
    {
      kind: 'steps',
      title: 'The kit so far',
      steps: [
        { title: 'Piece 1 (Chapter 1)', body: 'Skills inventory with proof.' },
        { title: 'Piece 2 (Chapter 2)', body: 'The Njangi Tracker case study.' },
        { title: 'Piece 3 (Chapter 3)', body: 'A tailored one-page CV.' },
        { title: 'Piece 4 (tonight)', body: 'A tailored cover letter that says what the CV can\'t.' },
        { title: 'Next chapter', body: 'Be findable: Clinton\'s LinkedIn photo is from a party. Brenda is about to look him up.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: write the Njangi Pay letter.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Step 1: pick the greeting.',
        options: [
          { text: '"To whom it may concern,"', why: 'He knows her name.' },
          { text: '"Dear Ms Fon,"' },
          { text: '"Dear Afiya team,"', why: 'Wrong company. Lesson 17!' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Step 2: put the opening in order.',
        lines: ['For two years, my mum\'s savings group kept its accounts in a school exercise book.', 'Every month, someone swore they had paid.', 'In March I built them a one-page tracker, and the arguments stopped.', 'Njangi Pay is solving that problem for 200,000 groups, which is why I\'m applying for your Graduate Developer role.'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Step 3: "why them". Passes the swap-the-name test, or fails?',
        groups: ['Passes', 'Fails'],
        items: [
          { text: 'Your new contribution reminders are what my mum\'s treasurer asked me for in week one.', group: 0 },
          { text: 'You are an innovative industry leader.', group: 1 },
          { text: 'You serve rural savings groups that banks often don\'t.', group: 0 },
          { text: 'I admire your commitment to excellence.', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Step 4: match each Njangi Pay must-have to Clinton\'s proof.',
        pairs: [
          ['Explain technical ideas simply', 'Explains phone repairs to customers every Saturday'],
          ['Stay calm when things break', 'Moved 40 people to the library when the venue cancelled'],
          ['At least one real project', 'The Njangi Tracker, now used by 42 people'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Step 5: tap the tone problem.',
        lines: ['Every Saturday I explain repairs to customers in plain words.', 'I am exactly what Njangi Pay needs and will be a huge asset from day one.', 'I\'d love to learn how your team builds for 200,000 groups.'],
        bug: 1,
        explanation: 'A claim he can\'t back up yet. Let the proof be confident for him.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Step 6: pick the close.',
        options: [
          { text: '"I hope you will consider me, if possible. I know there are many better candidates."', why: 'Apologises and talks him down.' },
          { text: '"I\'d love to talk about how I could help Njangi Pay bring that same trust to more savings groups. Thank you for reading."' },
          { text: '"Call me tomorrow."', why: 'Too pushy.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Step 7: the AI check.',
        from: 'miracle',
        message: 'Did you use AI on this?',
        options: [
          { text: 'Only to tighten my "why you" paragraph. I kept my examples and deleted the one claim it added.' },
          { text: 'It wrote all of it.', why: 'Then it\'s one of Brenda\'s 40.' },
          { text: 'What\'s AI?', why: 'He knows. Honest answer: he used it carefully, or not at all.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Step 8: the pre-send checks. Done, or not needed?',
        groups: ['Done', 'Not needed'],
        items: [
          { text: 'Searched for "Afiya" and other company names', group: 0 },
          { text: 'Read it aloud', group: 0 },
          { text: 'Named "Clinton-Ndi-Cover-Letter-Njangi-Pay.pdf"', group: 0 },
          { text: 'Added a skills wheel', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Step 9: complete Clinton\'s "why you" opener.',
        template: 'You\'re looking for someone who can explain [[1]] ideas to [[2]] colleagues.',
        blanks: [['technical'], ['non-technical']],
        distractors: ['secret', 'senior', 'simple'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Step 10: about how many words is the finished letter? (a number)',
        answers: ['300', 'about 300', '250', '350'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        prompt: 'Two weeks later: the interview invitation.',
        from: 'brenda',
        message: 'We\'d like to invite you to interview. I loved your first line about the exercise book. My grandmother\'s njangi had one too.',
        options: [
          { text: 'Thank you! I\'d be glad to. And I\'d love to hear about your grandmother\'s group.' },
          { text: 'I knew you would.', why: 'Cocky. Gracious is better.' },
          { text: 'Sorry it was so long.', why: 'No need to apologise. She loved it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Brenda remembered Clinton\'s first line. What\'s the one line in your own letter you\'d most like a recruiter to remember?',
    starters: ['My line is...', 'It works because...'],
  },
  deepen: {
    title: 'Your career kit, piece 4: done',
    summary: 'Finish and check your own letter for a real role: four paragraphs, the swap-the-name test, the read-aloud test and the pre-send checklist. Chapter 5 makes you findable on LinkedIn.',
  },
  notes: 'Unit Challenge (playbook §8a.3). Climax per the outline: Brenda later quotes his first line back to him (here, in the interview invitation; the interview itself is Ch8). "Kit so far" uses a neutral steps card. These exercises double as Jump ahead / placement questions.',
};

export default lesson;
