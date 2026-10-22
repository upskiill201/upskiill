import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 20 — Unit Challenge. One research-heavy week, every Unit 3 skill, harder. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: the research week',
  summary: 'A report, a contract, meeting notes, 200 comments and a week off. Every Unit 3 skill, under pressure.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  xp: 30,
  outcomes: ['Use every Unit 3 skill on a realistic week', 'Prove you can summarise, question and check with confidence'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: "Unit 3's final challenge. Ada's research week: a big report, meeting notes, a contract, 200 comments, and a pile of email after a day off.", replies: ['Bring it on'] },
        { tey: 'Every lesson is in here. And remember the theme of this unit: understanding beats shortening.' },
        { tey: 'Purpose first, proof always, and keep the buts. Go.' },
      ],
    },
  ],
  apply: {
    scenario: "Monday: Ada's research week begins.",
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Monday 9am. A 60-page research report. Ada must plan design changes. Which request?',
        options: [
          { text: 'Summarise this report.', why: 'No purpose: a gist.' },
          { text: 'I need to plan design changes. Action summary for a designer: findings that affect design, each with a change, page numbers, most important first.' },
          { text: 'Summarise in one line.', why: 'Too short to act on.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Monday 9:15. The report is long. Order the method.',
        lines: ['Get the section map', 'Pick the sections that matter', 'Summarise each one', 'Combine and rank, keeping page numbers'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Monday 10am. Which reader needs which line?',
        groups: ['Director', 'Developers', 'Customers'],
        items: [
          { text: 'Recommend fixing sign-up before launch', group: 0 },
          { text: 'Email field error hidden on small screens (p.12)', group: 1 },
          { text: "We're making sign-up quicker", group: 2 },
          { text: 'Low cost, could lift sign-ups', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Monday 11am. The source said "a few users suggested dark mode". Spot the problem.',
        lines: ['Sign-up is the top complaint (p.12).', 'Loading speed is second (p.18).', 'Users want dark mode (p.22).'],
        bug: 2,
        fix: 'A few users suggested dark mode (p.22).',
        explanation: 'False certainty: "a few suggested" became "users want".',
      },
      {
        kind: 'tapBuild',
        prompt: 'Tuesday 9am. Planning meeting notes. Turn the vague line into a real action.',
        tiles: ['Grace', 'will', 'redesign', 'the', 'error', 'message', 'by', 'Friday'],
        distractors: ['someone', 'soon'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Tuesday 10am. Decision, discussion, or idea?',
        groups: ['Decision', 'Discussion', 'Idea'],
        items: [
          { text: 'Agreed by the director: fix sign-up first', group: 0 },
          { text: 'We debated a progress bar', group: 1 },
          { text: 'Grace suggested a student discount', group: 2 },
          { text: 'Views differed on timing', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tuesday 11am. Complete the extraction request.',
        template: 'List actions as [[1]] | Action | Due. Separate explicit [[2]] from discussion. Mark anything [[3]].',
        blanks: [['Owner'], ['decisions'], ['unclear']],
        distractors: ['Mood', 'jokes', 'perfect'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Your devs say the fix 'is in QA'. What does that mean for our launch?",
        prompt: 'Tuesday 2pm. Which reply?',
        options: [
          { text: "QA means testing. The fix is being checked before it goes live. Launch is on track; I'll confirm Friday." },
          { text: "It's in QA.", why: 'Repeats the jargon.' },
          { text: 'QA means it is broken.', why: 'Wrong, and alarming.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Wednesday 9am. Ada learns about "conversion funnels". Match the step to why it works.',
        pairs: [
          ['Say your level', 'Fits the explanation'],
          ['Analogy and limits', 'Sticks, without misleading'],
          ['Explain back', 'Finds your gaps'],
          ['Quiz', 'Makes it last'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Wednesday 11am. Comparing two agency quotes. Spot the mistake.',
        lines: ['Agency A: $3,000 per month.', 'Agency B: $30,000 per year.', 'A is cheaper, because 3,000 is less than 30,000.'],
        bug: 2,
        fix: 'A is $36,000 per year, so B is cheaper.',
      },
      {
        kind: 'mcq',
        prompt: 'Wednesday 2pm. The contract summary says "either side can cancel". What should Ada do?',
        options: [
          { text: 'Trust the summary', why: 'This is exactly what summaries drop.' },
          { text: 'Sign it', why: 'Check first; then decide with an expert if unclear.' },
          { text: 'Ask for the termination and renewal clauses quoted, with numbers, and read them herself' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Wednesday 2:30pm. Read closely, or harmless?',
        groups: ['Read closely', 'Harmless'],
        items: [
          { text: 'automatically renews', group: 0 },
          { text: 'unless', group: 0 },
          { text: 'the parties', group: 1 },
          { text: 'provided that', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Can your AI tell us whether to sign the agency contract?",
        prompt: 'Wednesday 3pm. Which answer?',
        options: [
          { text: 'Yes, it decides.', why: 'It is not a lawyer.' },
          { text: 'It can pull out key terms and anything unusual. The decision is ours, ideally after a legal review.' },
          { text: 'AI cannot help with contracts.', why: 'It helps a lot with finding clauses.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: "Thursday 9am. Questioning Lucía's brand guide. Build the magic line.",
        tiles: ['If', 'it', 'is', 'not', 'in', 'the', 'document,', 'say', 'so'],
        distractors: ['guess'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Thursday 10am. Every answer from a document should come with a ... (one word)',
        answers: ['quote', 'quotation', 'reference'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Thursday 11am. Caveat, condition, or dissent?',
        groups: ['Caveat', 'Condition', 'Dissent'],
        items: [
          { text: 'Results may not hold', group: 0 },
          { text: 'Only on phones', group: 1 },
          { text: 'Two designers disagreed', group: 2 },
          { text: 'Small, holiday-period test', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Great, the summary says the new flow boosts sign-ups! Desktop too, right?",
        prompt: 'Thursday 2pm. What should Ada say?',
        options: [
          { text: 'The full report says phones only, with no clear change on desktop. We should test desktop separately.' },
          { text: 'Yes, everywhere!', why: 'The condition was dropped from the summary.' },
          { text: 'The report is wrong.', why: 'The summary was incomplete, not the report.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Thursday 3pm. Next steps on the impact/effort grid.',
        groups: ['Quick win', 'Big bet', 'Time sink'],
        items: [
          { text: 'Bigger error message (1 hour, top complaint)', group: 0 },
          { text: 'Rebuild sign-up (6 weeks, big gain)', group: 1 },
          { text: 'Animate the footer (2 weeks, no impact)', group: 2 },
          { text: 'Move Next above the keyboard (2 hours, big fix)', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Friday 9am. 214 user comments. Which request?',
        options: [
          { text: 'What do users think?', why: 'Vibes, not themes.' },
          { text: 'Numbered comments, names removed: themes (complaints, suggestions, praise), count, comment numbers, one quote each, most common first.' },
          { text: 'Pick the 5 angriest comments.', why: 'Loud is not the same as many.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Friday 10am. Spot the privacy problem before sharing quotes.',
        lines: ['"Never saw the error." (user 14)', '"So slow to load." (user 52)', '"I\'m Tom Reyes, 555-0142, fix this!" (user 88)'],
        bug: 2,
        fix: '"Fix this!" (user 88)',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The AI said 70 comments mention speed, but checking its list, only 38 do.',
        prompt: 'Friday 11am. Which number does Ada use?',
        options: [
          { text: '70, it is bigger.', why: 'The checked count is the real one.' },
          { text: '38, the checked count, and she re-checks the other big themes.' },
          { text: 'Neither, counts do not matter.', why: 'Counts set priorities.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Monday after a day off. Order the catch-up.',
        lines: ['Triage subjects: needs me / changed / FYI', 'Answer the "needs me" items', 'Summarise decisions made', 'Ask a colleague what was missed'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Monday 10am. Raise it, or accept the decision?',
        groups: ['Raise it', 'Accept it'],
        items: [
          { text: 'It breaks a legal requirement you know', group: 0 },
          { text: 'You just liked the old option better', group: 1 },
          { text: 'It conflicts with something only you know', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Monday 11am. Match the summary failure to the spot-check question.',
        pairs: [
          ['Invented detail', 'Is this in the source?'],
          ['Flipped meaning', 'Is there a "not"?'],
          ['Wrong attribution', 'Who actually said it?'],
          ['False certainty', 'How sure was the source?'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Monday 2pm. Complete Ada\'s reusable request.',
        template: 'I need to [purpose]. Give me an [[1]] summary for [reader]. Only what the text [[2]]. Then list [[3]], conditions and disagreements.',
        blanks: [['action', 'executive'], ['supports'], ['caveats']],
        distractors: ['imagines', 'jokes'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A summary can be 100% accurate and still ... (one word)',
        answers: ['mislead', 'misleading'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What is the one idea behind all of Unit 3?',
        options: [
          { text: 'Shorter is always better', why: 'Short and misleading is worse than useless.' },
          { text: 'Summaries are always accurate', why: 'Usually, which is why errors slip through.' },
          { text: 'Start from your purpose, keep proof and caveats, and check what you act on' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Final one. Match the Unit 3 skill to what it protects you from.',
        pairs: [
          ['Purpose first', 'Useless summaries'],
          ['Quotes and page numbers', 'Unverifiable claims'],
          ['Keep the buts', 'Misleading decisions'],
          ['Owner, verb, date', 'Actions that never happen'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'You finished Unit 3! What will you do differently next time someone sends you something long to read?',
    starters: ['Next time I will...', 'The skill I am proudest of...'],
  },
  deepen: { title: 'Next up: Unit 4', summary: "Unit 4, Don't trust it blindly: catch AI mistakes, made-up facts and bias before they cost you." },
  notes: 'Review of the whole unit. All names, numbers and quotes are fictional (555 numbers are reserved fictional numbers).',
};

export default lesson;
