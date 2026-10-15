import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 7 — decoding jargon: in context, with an example, and building a glossary. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Understanding jargon fast',
  summary: 'Every team speaks its own language. Decode it in seconds, without pretending you understood.',
  minutes: 12,
  outcomes: [
    'Ask what a term means in this specific context',
    'Get a plain definition, an example and why it matters',
    'Build a personal glossary as you go',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: "Ada's in a developer meeting. Someone says: 'We'll put up a PR and it'll go out after QA.' Ada nods. She has no idea what that means.", replies: ['Relatable', 'What is PR?'] },
        { tey: "Ha. Now here's the trap: in marketing, PR means 'press release' or 'public relations'. In software, it means 'pull request', a proposed code change." },
        { tey: "Same letters, totally different meaning. That's why 'what does PR mean?' is a weak question. 'What does PR mean in this developer discussion?' is a strong one.", replies: ['Context matters'] },
        { tey: 'Exactly. Paste the sentence it came from. Then ask for three things: a plain definition, an example, and why it matters here.' },
        { tey: "And keep the answers. A little glossary of your company's words is worth gold in your first few months.", replies: ['And if it is still unclear?'] },
        { tey: "Then ask a colleague. 'Sorry, what does QA cover here?' takes five seconds and nobody minds. Nodding along costs far more later." },
      ],
    },
    {
      kind: 'compare',
      title: 'Weak vs strong jargon question',
      before: { label: 'Weak', text: 'What does PR mean?' },
      after: {
        label: 'Strong',
        text: "In this developer conversation: \"We'll put up a PR and it'll go out after QA.\" What do PR and QA mean here? Give a plain definition, an everyday example, and why it matters for a designer.",
      },
      notes: ['The real sentence gives the context.', 'Asking for both terms at once saves time.', '"Why it matters for me" makes it useful, not just correct.'],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'The same acronym can mean different things in different teams. Always paste the sentence it came from.',
    },
    {
      kind: 'check',
      question: 'Why paste the sentence a term came from?',
      options: ['To make the request longer', 'Because the same term can mean different things in different contexts', 'AI tools need at least 20 words'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is decoding the jargon around her.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In a software team, "PR" usually means...',
        options: [{ text: 'Pull request (a proposed code change)' }, { text: 'Press release', why: 'That is marketing. Context matters.' }, { text: 'Personal record', why: 'That is the gym.' }],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong jargon question, or weak?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'What does QA mean?', group: 1 },
          { text: 'In this sentence from our developers: [sentence], what does QA mean, and why does it matter for design?', group: 0 },
          { text: 'Explain all tech words.', group: 1 },
          { text: 'What does "MVP" mean in this product plan? Plain words, one example.', group: 0 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the three-part jargon request.',
        tiles: ['Definition,', 'example,', 'and', 'why', 'it', 'matters', 'here'],
        distractors: ['history', 'spelling'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the acronym to its meaning in a software team.',
        pairs: [
          ['PR', 'Pull request'],
          ['QA', 'Quality assurance (testing)'],
          ['MVP', 'Minimum viable product'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Your developers keep saying the launch is 'blocked on staging'. Should I be worried?",
        prompt: 'Which explanation should Ada give?',
        options: [
          { text: "Staging is a practice copy of the app where we test before going live. 'Blocked' means testing there has to finish first. Nothing to worry about yet; I'll update you Friday." },
          { text: 'It means staging is blocked.', why: 'Repeats the jargon without explaining it.' },
          { text: 'Very worried, yes.', why: 'Not true, and no explanation.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s jargon request.',
        template: 'In this [[1]]: "[sentence]", what does QA mean? Plain definition, an everyday [[2]], and why it [[3]] for a designer.',
        blanks: [['conversation', 'sentence'], ['example'], ['matters']],
        distractors: ['song', 'password', 'sleeps'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the habit that will cause trouble later.',
        lines: ['Paste the sentence the term came from.', 'Ask for a definition and an example.', 'Nod along in meetings and never ask.', 'Keep a small glossary.'],
        bug: 2,
        fix: 'Ask a colleague: "Sorry, what does QA cover here?"',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Keep the definitions you learn in a personal ... (one word)',
        answers: ['glossary', 'dictionary', 'list'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Ada reads "we need to reduce churn" in a report. Which request is best?',
        options: [
          { text: 'What is churn?', why: 'Works, but no context or relevance.' },
          { text: 'In this report about our app: "we need to reduce churn". What does churn mean here, with an example, and why might it matter for design?' },
          { text: 'Explain butter churns.', why: 'Wrong meaning entirely!' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s jargon routine.',
        lines: ['Copy the sentence the term came from', 'Ask for definition, example, why it matters', 'Add it to the glossary', 'Still unclear? Ask a colleague'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Ask the AI first, or ask a colleague?',
        groups: ['AI first', 'Colleague'],
        items: [
          { text: 'A general term like "churn"', group: 0 },
          { text: 'An internal project nickname like "Project Falcon"', group: 1 },
          { text: 'A standard acronym like "MVP"', group: 0 },
          { text: 'What "the usual process" means on your team', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "What's 'Project Falcon'? Your developers mention it constantly.",
        prompt: 'Why is this one Ada should ask a colleague about?',
        options: [
          { text: "It's an internal name. The AI has never seen it, so it would just guess." },
          { text: 'The AI knows all project names.', why: 'Internal names are not in its training.' },
          { text: 'It is about birds.', why: 'A guess, exactly the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '"MVP" in a product plan means minimum viable ... (one word)',
        answers: ['product'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the risk to the fix.',
        pairs: [
          ['Same acronym, two meanings', 'Paste the sentence'],
          ['Correct but useless definition', 'Ask why it matters here'],
          ['Internal nickname', 'Ask a colleague'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is nodding along so costly?',
        options: [
          { text: 'Small misunderstandings grow into wrong work later' },
          { text: 'It is not; nobody notices', why: 'It shows up in the work.' },
          { text: 'It is rude', why: 'The real cost is misunderstanding.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which three words or acronyms at your work did you not understand at first? Add them to your glossary here.',
    starters: ['1.', '2.', '3.'],
  },
  deepen: { title: 'Try it today', summary: 'Start a glossary note. Add every new term you meet this week, with one line each.' },
  notes: 'PR/QA/MVP/churn/staging definitions are standard industry meanings.',
};

export default lesson;
