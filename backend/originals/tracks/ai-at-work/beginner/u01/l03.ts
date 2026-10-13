import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 3 — free. The context checklist: Who, What, Why, How. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: "The facts it can't see",
  summary: 'Four quick questions that turn a guess into an answer you can actually send.',
  minutes: 13,
  outcomes: [
    'Use the Who, What, Why, How checklist before you ask',
    'Add context in one or two sentences, not an essay',
    'Spot which piece of context is missing from a request',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Lucía wants to move a deadline',
      before: {
        label: 'No context',
        text: 'Write a reply saying we can\'t move the deadline.',
      },
      after: {
        label: 'With context',
        text:
          'Lucía, our client, asked to move the design deadline from Friday to Monday. We can\'t, because developers start building on Monday morning. Write a warm 4-line reply that says no, explains why in one sentence, and offers a 30-minute review call on Thursday instead.',
      },
      notes: [
        'Who: Lucía, a client, so it stays warm.',
        'What: the facts (Friday, Monday, developers start Monday).',
        'Why: say no without damaging the relationship.',
        'How: 4 lines, one-sentence reason, an alternative offered.',
      ],
    },
    {
      kind: 'explore',
      title: 'The four questions, inside a real request',
      text:
        'Write to Lucía, our client contact, who is busy and reads on her phone. Testing moved to Friday because we found a bug in sign-up. I want her to approve the colour palette by Wednesday. Keep it to 4 lines, friendly, with the ask in the last line.',
      hotspots: [
        { phrase: 'Lucía, our client contact, who is busy and reads on her phone', note: 'WHO. Who reads it, and how. "Reads on her phone" quietly asks for short.' },
        { phrase: 'Testing moved to Friday because we found a bug in sign-up', note: 'WHAT. The facts only you know. Without them, the AI invents.' },
        { phrase: 'I want her to approve the colour palette by Wednesday', note: 'WHY. The goal. This is what the message is for.' },
        { phrase: 'Keep it to 4 lines, friendly, with the ask in the last line', note: 'HOW. Length, tone, and shape.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Before you send any request, ask yourself: Who is it for? What happened? Why am I writing? How should it look?',
    },
    {
      kind: 'check',
      question: '"Write a reply saying we can\'t move the deadline." Which question is missing an answer?',
      options: ['Who', 'What', 'Why', 'All of them'],
      answer: 3,
      explanation: "It doesn't say who it is for, what the facts are, what the goal is, or how it should look.",
    },
  ],
  apply: {
    scenario: 'Ada is using Who, What, Why, How on real requests.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each question to what it covers.',
        pairs: [
          ['Who', 'The reader'],
          ['What', 'The facts'],
          ['Why', 'The goal'],
          ['How', 'Length, tone and format'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Sort each detail into Who, What or How.',
        groups: ['Who', 'What', 'How'],
        items: [
          { text: 'For our new finance manager', group: 0 },
          { text: 'The invoice was paid on the 3rd', group: 1 },
          { text: 'In 3 bullet points', group: 2 },
          { text: 'Lucía, who reads on her phone', group: 0 },
          { text: 'The launch moved to June', group: 1 },
          { text: 'Friendly, no jargon', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: '"Write a reply to Lucía about the deadline. Keep it short." Which question is NOT answered?',
        options: [{ text: 'Who' }, { text: 'What (the facts)' }, { text: 'How' }],
        answer: 1,
        explanation: 'It never says what happened with the deadline, so the AI will make something up.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the checklist.',
        template: 'Who is it [[1]]? What [[2]]? Why am I [[3]]? How should it [[4]]?',
        blanks: [['for'], ['happened'], ['writing'], ['look']],
        distractors: ['cost', 'sleeping', 'later'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Hi Ada, any chance the designs could come Monday instead of Friday? Big week here.',
        prompt: 'Ada can\'t move it. Which reply should she send?',
        options: [
          {
            text: "I wish I could! Our developers start building Monday morning, so we need the designs Friday. Could we do a 30-minute review on Thursday to make it easier?",
          },
          { text: 'No.', why: 'True, but it damages the relationship and explains nothing.' },
          { text: 'Sure, Monday is fine!', why: 'It isn\'t. Developers start Monday morning.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which of the four questions covers the goal of your message?',
        answers: ['why'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Spot the problem: which line adds nothing the AI can use?',
        lines: [
          'Write to Lucía, our client contact.',
          'Testing moved to Friday because of a sign-up bug.',
          'Make it amazing and perfect.',
          'She needs to approve the palette by Wednesday.',
        ],
        bug: 2,
        fix: 'Keep it to 4 friendly lines, with the ask at the end.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a "How" instruction.',
        tiles: ['4', 'lines,', 'friendly,', 'ask', 'in', 'the', 'last', 'line'],
        distractors: ['maybe', 'perfect'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Ada needs her manager to approve a day off. Which request will get the best draft?',
        options: [
          { text: 'Write a message asking for a day off.', why: 'Which day? Why? How formal? The AI has to guess.' },
          {
            text: 'Write a short Slack message to my manager asking for next Friday off for a family event. My designs will be done by Thursday. Friendly but professional.',
          },
          { text: 'Write a very convincing message so my manager says yes.', why: 'Convincing how? It has no facts to work with.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Is this request complete, or still missing context?',
        groups: ['Complete', 'Missing context'],
        items: [
          { text: 'Summarise this report.', group: 1 },
          { text: 'Summarise this report in 5 bullets for my manager, focusing on costs.', group: 0 },
          { text: 'Write an apology.', group: 1 },
          { text: 'Write a 3-line apology to Lucía for sending the wrong file this morning, with the right file attached.', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the four questions in the order Tey uses them.',
        lines: ['Who is it for?', 'What happened?', 'Why am I writing?', 'How should it look?'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Thanks for the update! One thing: what exactly do you need from me this week?',
        prompt: "Ada's update was missing something. Which reply fixes it?",
        options: [
          { text: 'Just your approval on the colour palette, by Wednesday. That\'s the only thing blocking us.' },
          { text: 'Nothing much, just keep an eye on things.', why: 'She needs the palette approved. Say so.' },
          { text: 'Please read the update again.', why: 'If she had to ask, the ask was not clear.' },
        ],
        answer: 0,
        explanation: 'The "Why" was missing from the first message. A clear ask fixes it.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Add the missing context to Ada\'s request.',
        template: 'Write a 4-line reply to [[1]], our client. Testing moved to [[2]]. She needs to [[3]] the palette.',
        blanks: [['Lucía'], ['Friday'], ['approve']],
        distractors: ['someone', 'never', 'delete'],
      },
      {
        kind: 'typeAnswer',
        prompt: '"Friendly, under 5 lines" answers which question?',
        answers: ['how'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the missing context to the fix.',
        pairs: [
          ['The AI wrote far too much', 'Add the length (How)'],
          ['The AI invented a date', 'Add the facts (What)'],
          ['The tone was too formal for a friend', 'Say who it is for (Who)'],
          ['The message had no point', 'Add the goal (Why)'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How much context is usually enough?',
        options: [
          { text: 'One or two clear sentences covering Who, What, Why, How' },
          { text: 'A full page every time', why: 'More is not better. Clear is better.' },
          { text: 'None, the AI will figure it out', why: 'It will guess, and guesses are generic.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Pick a message you need to send this week. Answer Who, What, Why and How for it in one line each.',
    starters: ['Who: ...', 'What: ...', 'Why: ...', 'How: ...'],
  },
  deepen: {
    title: 'Try it today',
    summary: 'Use Who, What, Why, How on your next AI request and compare the answer with what you usually get.',
  },
  notes: 'Who/What/Why/How is a Teyro teaching device, not an external framework. No statistics.',
};

export default lesson;
