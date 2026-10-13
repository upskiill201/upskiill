import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 1 — the three kinds of summary, and why "summarise this" is not enough. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Summaries that are actually useful',
  summary: 'A summary is only useful if it answers the question you have. Learn the three kinds and when to use each.',
  minutes: 13,
  outcomes: [
    'Tell apart a gist, an executive summary and an action summary',
    'Pick the right kind for what you need to do next',
    'Ask the AI for exactly that kind',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The 40-page report',
      beats: [
        { speaker: 'narrator', text: "Monday. Ada's manager forwards a 40-page user research report: \"Can you pull out what matters for design before Thursday's planning?\"" },
        { speaker: 'ada', text: 'Easy: "Summarise this report."' },
        { speaker: 'narrator', text: "The AI returns a neat paragraph: the study's goals, how many people were interviewed, and \"several usability themes emerged\"." },
        { speaker: 'ada', text: "That's... true. And completely useless for Thursday." },
        { speaker: 'tey', text: "Because 'summarise' has no purpose. A summary for a researcher, a director and a designer are three different summaries." },
      ],
      choice: {
        prompt: 'What should Ada ask for instead?',
        options: [
          {
            text: 'The findings that affect design, each with what we should change, most important first, with page numbers.',
            outcome: 'Six findings, each with a change and a page reference. Ada checks two of them and walks into planning with a list.',
            best: true,
          },
          {
            text: 'A longer summary.',
            outcome: 'A longer version of the same paragraph. Still no idea what to change.',
          },
          {
            text: 'A summary in bullet points.',
            outcome: 'The same general points as bullets. Tidier, still no actions.',
          },
        ],
      },
    },
    {
      kind: 'reading',
      title: 'Three kinds of summary',
      html:
        '<table><thead><tr><th>Kind</th><th>Answers</th><th>Use it when</th></tr></thead><tbody>' +
        '<tr><td><strong>Gist</strong></td><td>What is this about?</td><td>Deciding whether to read it at all</td></tr>' +
        '<tr><td><strong>Executive summary</strong></td><td>What are the key conclusions and why do they matter?</td><td>Briefing a decision-maker</td></tr>' +
        '<tr><td><strong>Action summary</strong></td><td>What do I (or we) need to do?</td><td>Turning reading into work</td></tr>' +
        '</tbody></table>' +
        '<p>"Summarise this" usually gets you a gist. Most of the time at work, you actually need an executive or action summary. Name the kind, name the reader, and name what you will do with it.</p>' +
        '<p><em>"Give me an action summary of this report for a product designer: the findings that affect design, each with a suggested change, most important first, with page numbers."</em></p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Before asking for a summary, finish this sentence: "After reading it, I need to..." That is your summary\'s purpose.',
    },
    {
      kind: 'check',
      question: 'Ada needs to know what to change in the design. Which kind of summary?',
      options: ['Gist', 'Action summary', 'A longer summary'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is learning to ask for the right summary.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the kind of summary to the question it answers.',
        pairs: [
          ['Gist', 'What is this about?'],
          ['Executive summary', 'What are the conclusions, and why do they matter?'],
          ['Action summary', 'What do we need to do?'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which kind of summary does each situation need?',
        groups: ['Gist', 'Executive', 'Action'],
        items: [
          { text: 'Deciding whether a long email is worth reading', group: 0 },
          { text: 'Briefing a director before a decision', group: 1 },
          { text: 'Turning meeting notes into a to-do list', group: 2 },
          { text: 'Skimming 10 articles to pick one to read', group: 0 },
          { text: 'Planning design changes from a report', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does "Summarise this" usually get you?',
        options: [
          { text: 'A general gist, with no particular purpose' },
          { text: 'Exactly the actions you need', why: 'It does not know what you need to do.' },
          { text: 'An error', why: 'It works, just generically.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the purpose sentence Ada finishes before asking.',
        tiles: ['After', 'reading', 'it,', 'I', 'need', 'to...'],
        distractors: ['sleep', 'never'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "I've got a 30-page market report and 10 minutes before a call with our CEO. Help!",
        prompt: 'Which request should Ada suggest?',
        options: [
          { text: 'Executive summary for a CEO: 3 key conclusions, why each matters for our launch, with page numbers. Under 100 words.' },
          { text: 'Summarise this.', why: 'A gist will not prepare her for a CEO call.' },
          { text: 'Give me every detail.', why: 'She has 10 minutes.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s request.',
        template: 'Give me an [[1]] summary of this report for a product [[2]]: the findings that affect design, each with a suggested [[3]].',
        blanks: [['action'], ['designer'], ['change']],
        distractors: ['imaginary', 'astronaut', 'joke'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot what is missing from this summary request.',
        lines: ['Summarise this 40-page report.', 'Use bullet points.', 'Keep it short.'],
        bug: 0,
        fix: 'Give me an action summary for a designer: what should we change?',
        explanation: 'No purpose and no reader: it will be a tidy, useless gist.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A summary that answers "what do we need to do?" is an ... summary (one word)',
        answers: ['action'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request will help Ada most before Thursday\'s planning?',
        options: [
          { text: 'Summarise the research report.', why: 'Gist, no purpose.' },
          { text: 'Action summary for a designer: findings that affect design, each with a suggested change, most important first, with page numbers.' },
          { text: 'Summarise the report in 3 paragraphs.', why: 'Shorter, still no purpose.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s summary routine.',
        lines: ['Finish "after reading it, I need to..."', 'Pick the kind of summary', 'Name the reader', 'Ask for page numbers so you can check'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful summary request, or not?',
        groups: ['Useful', 'Not useful'],
        items: [
          { text: 'Summarise this.', group: 1 },
          { text: 'Gist in 2 lines: is this worth reading for a designer?', group: 0 },
          { text: 'Make it shorter.', group: 1 },
          { text: '3 conclusions for a director, with why each matters', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Why do you always ask for page numbers in summaries?",
        prompt: "What's Ada's answer?",
        options: [
          { text: 'So I can check the important points myself in seconds. Summaries can be wrong.' },
          { text: 'It makes the summary longer.', why: 'It is about checking, not length.' },
          { text: 'No reason.', why: 'There is a very good reason.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A summary that answers "what is this about?" is a ... (one word)',
        answers: ['gist'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the reader to the summary they need.',
        pairs: [
          ['A director deciding today', 'Executive summary'],
          ['A designer planning changes', 'Action summary'],
          ['Someone deciding whether to read it', 'Gist'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What makes a summary "useful"?',
        options: [
          { text: 'It answers the question you actually have' },
          { text: 'It is as short as possible', why: 'Short and useless is still useless.' },
          { text: 'It covers everything', why: 'Then it is not a summary.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What long thing do you need to read this week? Finish the sentence "After reading it, I need to..." and pick the kind of summary.',
    starters: ['I need to read...', 'After reading it, I need to...', 'So I need a...'],
  },
  deepen: { title: 'Try it today', summary: 'Ask for an action summary, with page numbers, of the next long document you receive.' },
  notes: 'Gist / executive / action summary is a Teyro teaching simplification of common summary types.',
};

export default lesson;
