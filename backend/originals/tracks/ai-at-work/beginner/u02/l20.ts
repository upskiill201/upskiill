import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 20 — Unit Challenge. A full writing day, every Unit 2 skill, harder. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: a writing day',
  summary: 'Updates, replies, a no, a senior proposal, a translation and a final proofread. One day, every Unit 2 skill.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  xp: 30,
  outcomes: ['Use every Unit 2 writing skill under pressure', 'Prove you can write fast and still sound like you'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: "Unit 2's final challenge. Ada has a full day of writing ahead, and you're doing it with her.", replies: ["Let's go"] },
        { tey: 'Everything is in play: dump-draft-edit, voice, edit levels, plain language, email asks, saying no, seniors, translation, proofreading, templates.' },
        { tey: 'One reminder before you start: the facts always come from you. Go.' },
      ],
    },
  ],
  apply: {
    scenario: '8:30am. Ada has eleven things to write today.',
    items: [
      {
        kind: 'orderLines',
        prompt: '8:30. Ada needs her weekly update. Order her method.',
        lines: ['Dump the facts (voice note)', 'Ask the AI to fill her update template', 'Check every fact', 'Send'],
      },
      {
        kind: 'findBug',
        prompt: '8:40. Spot the fact the AI softened. (Ada\'s notes: "launch slipped 2 days".)',
        lines: ['Done: sign-up screens finished.', 'Next: testing on Friday.', 'Launch: right on schedule, no changes.', 'Need from you: nothing this week.'],
        bug: 2,
        fix: 'Launch: moved 2 days, to the 16th.',
      },
      {
        kind: 'sortGroups',
        prompt: "9:00. Generic AI voice or Ada's voice?",
        groups: ['Generic', "Ada's"],
        items: [
          { text: 'I hope this finds you well!', group: 0 },
          { text: 'Hi Lucía! Quick one:', group: 1 },
          { text: 'We are thrilled to share this exciting news.', group: 0 },
          { text: 'Sign-up is live, and it takes 30 seconds.', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: "9:15. Ada's draft is fine but a bit wordy. Which level of edit?",
        options: [{ text: 'Light edit, keep my words' }, { text: 'Full rewrite', why: 'Too much for a mostly-fine draft.' }, { text: 'Regenerate', why: 'Rolls the dice and loses the good parts.' }],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: '9:30. Make it plain.',
        pairs: [
          ['Utilise', 'Use'],
          ['In order to', 'To'],
          ['At this point in time', 'Now'],
          ['Facilitate', 'Help'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: '9:45. Rewrite in active voice: "The files will be sent by me today."',
        tiles: ['I', 'will', 'send', 'the', 'files', 'today'],
        distractors: ['be', 'by'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Morning! Could your team also redo our whole website by next Friday? Sorry, I know it is a lot!',
        prompt: '10:00. Ada cannot. Which reply?',
        options: [
          { text: "Thanks for thinking of us! We can't do the whole site by Friday with the launch on. We could start the homepage the week after: would that work?" },
          { text: "Sorry sorry sorry, we're swamped, maybe we can try?", why: 'Over-apology plus "maybe" = heard as yes.' },
          { text: 'Sure!', why: 'A yes they cannot deliver.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: '10:15. Strong subject line, or weak?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'Approval needed by Wed: homepage plan', group: 0 },
          { text: 'Quick question', group: 1 },
          { text: 'Can you join Thu 2pm? Launch review', group: 0 },
          { text: 'Following up', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: '10:30. Complete the thread request.',
        template: 'What is [[1]] of me? What has been [[2]]? What is still [[3]]?',
        blanks: [['asked'], ['decided'], ['open']],
        distractors: ['eaten', 'closed'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: '1) Is Friday still on? 2) Who joins the call? 3) Can I see the homepage sketch?',
        prompt: '10:45. Which reply?',
        options: [
          { text: '1. Yes, Friday is on. 2. Grace and me. 3. Sketch attached (checked!).' },
          { text: 'All good, see you Friday!', why: 'Two questions unanswered.' },
          { text: 'Yes!', why: 'Yes to which?' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '11:00. Chat: never send just "hi". Send greeting plus the ... (one word)',
        answers: ['ask', 'question'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: '11:30. Ada turns meeting notes into a document. Which request?',
        options: [
          { text: 'Organise these.', why: 'No structure, no reader.' },
          { text: "Title, 1-line summary, Done, Next, Risks, Decisions. Message headings. Only my notes; mark gaps [?]." },
          { text: 'Write a long report from these.', why: 'Long is not the goal.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: '12:00. Message heading or topic heading?',
        groups: ['Message', 'Topic'],
        items: [
          { text: 'Launch moves to the 16th', group: 0 },
          { text: 'Launch', group: 1 },
          { text: 'Homepage starts next week', group: 0 },
          { text: 'Homepage', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: '1:00pm. Proposal for the director. Match each part.',
        pairs: [
          ['Answer', '"Recommend: homepage after launch"'],
          ['Why', '"Doing both risks the launch date"'],
          ['Options', '"A: after launch; B: hire a freelancer"'],
          ['Ask', '"Your OK by Thursday"'],
        ],
      },
      {
        kind: 'findBug',
        prompt: '1:30pm. Spot the line the director does not need.',
        lines: ['Recommendation: start the homepage after launch.', 'Why: doing both risks the launch date.', 'We discussed this over three lovely lunches.', 'Ask: your OK by Thursday.'],
        bug: 2,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "My director's first question on your proposal will be 'what does option B cost?'",
        prompt: '2:00pm. What should Ada do?',
        options: [
          { text: "Add the cost of option B before sending. Anticipate the first question." },
          { text: 'Wait for her to ask.', why: 'A round-trip that slows the decision.' },
          { text: 'Remove option B.', why: 'Options help; answer the question instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: '2:30pm. Build the translation-check line.',
        tiles: ['Then', 'translate', 'it', 'back', 'into', 'English'],
        distractors: ['forget'],
      },
      {
        kind: 'sortGroups',
        prompt: '2:45pm. AI translation alone, or a human check?',
        groups: ['AI is fine', 'Human check'],
        items: [
          { text: 'A friendly thank-you to Lucía\'s team', group: 0 },
          { text: 'A contract change', group: 1 },
          { text: 'A price quote', group: 1 },
          { text: 'Understanding a message you received', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: '3:00pm. Ada writes "the review is on 04/05" for Lucía\'s team in Mexico. Problem?',
        options: [
          { text: '04/05 can mean different dates in different countries; write "4 May"' },
          { text: 'No problem', why: 'It is ambiguous internationally.' },
          { text: 'Dates cannot be translated', why: 'They can; the format is the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Can your AI give my newsletter a tough read before it goes out?",
        prompt: '3:30pm. Which request?',
        options: [
          { text: "Read this as a busy customer: where would you stop reading? What's unclear? Top 3 changes, plus what works." },
          { text: 'Is this good?', why: 'Gets encouragement, not critique.' },
          { text: 'Rewrite it.', why: 'She asked for a critical read.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: '4:00pm. De-generic the newsletter.',
        template: 'Cut empty [[1]]. Replace big words with [[2]]. Add one detail only you would [[3]].',
        blanks: [['openers'], ['facts'], ['know']],
        distractors: ['fluff', 'adjectives', 'forget'],
      },
      {
        kind: 'typeAnswer',
        prompt: '4:15pm. If you correct the AI on something twice, add it to your style ... (one word)',
        answers: ['guide'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: '4:30pm. Match the situation to the template.',
        pairs: [
          ['After the planning meeting', 'Meeting follow-up'],
          ['Connecting Grace and Lucía', 'Introduction'],
          ['Grace saved the launch', 'Specific thank-you'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: '5:00pm. Final check: who catches it?',
        groups: ['AI proofread', 'Your own check'],
        items: [
          { text: 'A spelling mistake', group: 0 },
          { text: 'A missing attachment', group: 1 },
          { text: 'A wrong recipient', group: 1 },
          { text: 'An awkward sentence', group: 0 },
          { text: 'A weekday that does not match the date', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: '5:15pm. Spot the mistake before sending.',
        lines: ['Hi Lucia,', 'The homepage plan is attached.', 'Talk Thursday!'],
        bug: 0,
        fix: 'Hi Lucía,',
        explanation: 'Names are your job. Spellcheckers will not flag a missing accent.',
      },
      {
        kind: 'orderLines',
        prompt: '5:30pm. Order the 30-second check.',
        lines: ['Names', 'Numbers', 'Dates', 'Links', 'Attachments', 'Recipients'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: '5:45pm. Last message: thank Grace. Which request?',
        options: [
          { text: 'Write a thank-you.', why: 'Thanks for what? It will be generic.' },
          { text: 'Thank Grace in my voice for staying late Tuesday to fix the sign-up bug: it is why we hit Friday. 2 lines, warm.' },
          { text: 'Write the most amazing thank-you ever.', why: 'A wish, not a detail.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What is the one idea behind all of Unit 2?',
        options: [
          { text: 'Let AI handle shape and speed; you supply the facts, the voice and the final check' },
          { text: 'Let AI write everything unchecked', why: 'The facts and the final say stay with you.' },
          { text: 'Longer and more formal is better', why: 'Plain and specific wins.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Finished Unit 2! Which writing habit has changed the most for you, and what difference has it made?',
    starters: ['The habit that changed most...', 'The difference is...'],
  },
  deepen: { title: 'Next up: Unit 3', summary: 'Unit 3, Summarise and understand: turn long documents, threads and meetings into what matters.' },
  notes: 'Review of the whole unit. Dates are fictional.',
};

export default lesson;
