import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 7 — long threads: find what is asked of you, then reply point by point. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Replying to a long email thread',
  summary: 'Thirty messages, six people, one question buried for you somewhere in the middle. Find it fast and answer it well.',
  minutes: 13,
  outcomes: [
    'Get the AI to pull out what is being asked of you',
    'Reply point by point so nothing is missed',
    'Decide between reply and reply-all',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From 30 messages to one clear reply',
      steps: [
        {
          title: 'Paste the thread and ask what concerns you',
          body: 'Remove anything private the AI does not need first.',
          code: 'Here is an email thread. I am Ada, the designer.\n1. What is being asked of me, by whom?\n2. What has already been decided?\n3. What is still open?\nOnly use what is in the thread.',
          language: 'plaintext',
        },
        {
          title: 'Check the answer against the thread',
          body: 'Skim the latest message yourself. Summaries can miss a question that was asked in passing.',
        },
        {
          title: 'Draft a numbered reply',
          body: 'Answer each question in its own short, numbered point, so nobody has to search your reply either.',
          code: 'Draft my reply: answer the 3 questions for me as numbered points, 1 line each. My answers: [your answers]. Friendly, short.',
          language: 'plaintext',
        },
        {
          title: 'Choose reply or reply-all',
          body: 'Reply-all only if everyone on the thread needs your answer. Otherwise reply to the person who asked.',
        },
      ],
    },
    {
      kind: 'reading',
      title: 'Thread etiquette in one minute',
      html:
        '<ul>' +
        '<li><strong>Read the latest message first.</strong> Long threads often settle things by the end; earlier questions may already be answered.</li>' +
        '<li><strong>Quote what you are answering.</strong> "On the launch date: Friday works." Nobody has to guess which question you mean.</li>' +
        '<li><strong>Reply-all with care.</strong> Ten people do not need your "Thanks!". One person usually does.</li>' +
        '<li><strong>Change the subject when the topic changes.</strong> A thread called "Logo" that is now about the budget will confuse everyone.</li>' +
        '</ul>',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Threads contain other people\'s details. Remove anything private before pasting a thread into an AI tool, and check your company rules.',
    },
    {
      kind: 'check',
      question: 'Who should get a reply-all?',
      options: ['Always everyone', 'Only when everyone on the thread needs your answer', 'Nobody, ever'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is digging out of a 30-message thread.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s thread routine.',
        lines: ['Remove private details and paste the thread', 'Ask what is asked of her, decided, and open', 'Check against the latest message', 'Draft a numbered reply', 'Choose reply or reply-all'],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask "what is being asked of ME" instead of "summarise this"?',
        options: [
          { text: 'Summaries are always wrong', why: 'They are useful, just not focused on her.' },
          { text: 'A summary covers everything; Ada needs the questions she must answer' },
          { text: 'It is shorter to type', why: 'It is about getting the right answer, not typing less.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Reply to one person, or reply-all?',
        groups: ['Reply', 'Reply-all'],
        items: [
          { text: '"Thanks, got it!"', group: 0 },
          { text: 'The new launch date everyone must plan around', group: 1 },
          { text: 'Answering a question only Lucía asked', group: 0 },
          { text: 'Correcting a wrong date that everyone saw', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the first question Ada asks the AI.',
        tiles: ['What', 'is', 'being', 'asked', 'of', 'me?'],
        distractors: ['everyone', 'why'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Sorry for the giant thread! TL;DR: can you do Friday's launch, and can you send the final logo? And did Grace get the brand guide?",
        prompt: 'Which reply is best?',
        options: [
          { text: 'Sounds great, thanks!', why: 'Three questions, zero answers.' },
          { text: 'Friday works! (one answer only)', why: 'Two questions are still open.' },
          { text: '1. Friday works. 2. Final logo attached. 3. Yes, Grace has the brand guide.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Spot the problem in Ada\'s reply-all to 12 people.',
        lines: ['Hi all,', 'On the launch date: Friday works for design.', 'Also Lucía, love your new haircut!'],
        bug: 2,
        fix: 'Send personal notes to Lucía directly.',
        explanation: 'Personal notes do not belong in a 12-person reply-all.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s thread request.',
        template: '1. What is being [[1]] of me? 2. What has been [[2]]? 3. What is still [[3]]?',
        blanks: [['asked'], ['decided'], ['open']],
        distractors: ['eaten', 'closed'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In a long thread, read the ... message first (one word)',
        answers: ['latest', 'last', 'newest', 'most recent'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request drafts the clearest reply?',
        options: [
          { text: 'Reply to this thread.', why: 'It does not know Ada\'s answers.' },
          { text: 'Draft my reply: answer Lucía\'s 3 questions as numbered one-liners. My answers: Friday works; logo attached; Grace has the guide.' },
          { text: 'Write a long reply covering the whole thread.', why: 'Long replies to long threads make things worse.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the etiquette rule to its reason.',
        pairs: [
          ['Quote what you answer', 'Nobody guesses which question'],
          ['Reply-all with care', 'Ten people do not need "Thanks!"'],
          ['New topic, new subject', 'Threads stay findable'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe to paste as is, or remove something first?',
        groups: ['Safe', 'Remove something'],
        items: [
          { text: 'A thread about a meeting time', group: 0 },
          { text: 'A thread with a customer\'s home address', group: 1 },
          { text: 'A thread with someone\'s medical leave details', group: 1 },
          { text: 'A thread about logo colours', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The AI summary said nothing was asked of you, but I asked about the logo in message 14!',
        prompt: 'What should Ada take from this?',
        options: [
          { text: 'AI summaries are useless.', why: 'They are useful; just check them.' },
          { text: 'Always check the summary against the thread; questions asked in passing get missed.' },
          { text: 'Lucía should not ask in message 14.', why: 'People ask where they ask. Check.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Answer each question in its own ... point (one word)',
        answers: ['numbered', 'separate', 'own'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the AI question to what it finds.',
        pairs: [
          ['What is asked of me?', 'Your to-dos'],
          ['What has been decided?', 'Things not to reopen'],
          ['What is still open?', 'Where you can help'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The thread called "Logo" is now about the budget. What should Ada do?',
        options: [
          { text: 'Keep replying under "Logo"', why: 'Nobody will find the budget discussion later.' },
          { text: 'Ignore the budget part', why: 'It still needs an answer, just in the right place.' },
          { text: 'Start a new email with a subject like "Budget for launch ads"' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which long thread is waiting in your inbox? What three questions would you ask the AI about it?',
    starters: ['The thread is about...', 'I would ask...'],
  },
  deepen: { title: 'Try it today', summary: 'Answer your next multi-question email with numbered one-liners.' },
  notes: 'Email etiquette guidance is general practice. Privacy caution aligns with Unit 10.',
};

export default lesson;
