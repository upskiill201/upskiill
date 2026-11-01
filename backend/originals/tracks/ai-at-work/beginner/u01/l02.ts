import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 2 — free. A plain-words model of what an AI chat tool is doing, so the rest of the course makes sense. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: "What AI knows, and what it's guessing",
  summary: 'It has read a lot. It has never seen your work. That one difference explains most bad answers.',
  minutes: 12,
  outcomes: [
    'Explain in one sentence how an AI chat tool writes an answer',
    'Tell what an AI tool can know from what it has to guess',
    'Give it the information only you have',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Quick one before we go further. When you type a question into an AI tool, where do you think the answer comes from?',
          replies: ['It searches the internet', 'It looks it up somewhere', 'No idea, honestly'],
        },
        {
          tey: "Fair guesses. Some tools can search the web, but that's not the main thing. Mostly, it's writing.",
        },
        {
          tey: 'An AI chat tool learned patterns from a huge amount of text. When you ask something, it writes the words that most likely come next, one after another.',
          replies: ['So it predicts words?', 'Like autocomplete?'],
        },
        {
          tey: "Like a very, very good autocomplete. That's why it sounds confident even when it's guessing. Sounding right is literally what it's built to do.",
        },
        {
          tey: "Here's the part that matters at work: it learned from general text. It has never seen your client, your project, or what happened in your meeting this morning.",
          replies: ['So I have to tell it', 'Even if it sounds sure?'],
        },
        {
          tey: 'Exactly. What it knows: how things are usually written. What it has to guess: everything about your situation. Your job is to close that gap.',
        },
      ],
    },
    {
      kind: 'reading',
      title: 'Three things it can never see on its own',
      html:
        '<p>Unless you paste it in, upload it, or connect the tool to it, an AI tool has no idea about:</p>' +
        '<ul>' +
        '<li><strong>Your people.</strong> Who Lucía is, what she cares about, how your manager likes updates.</li>' +
        '<li><strong>Your facts.</strong> What changed this week, the real numbers, the deadline you agreed yesterday.</li>' +
        '<li><strong>Your goal.</strong> Whether you want a decision, an apology, a yes, or just to keep someone informed.</li>' +
        '</ul>' +
        '<p>It also learned from text up to a certain date, so anything very recent may be missing, unless the tool can search the web and you ask it to.</p>' +
        '<p>None of this is a flaw you need to work around. It is simply the deal: <strong>it brings the writing, you bring the situation.</strong></p>',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'An answer that sounds confident is not the same as an answer that is right. AI tools sound sure by design.',
    },
    {
      kind: 'check',
      question: "Ada asks: \"What did Lucía decide in yesterday's call?\" What will the AI do?",
      options: ['Tell her exactly what Lucía decided', "Guess, or say it doesn't know", 'Email Lucía to ask'],
      answer: 1,
      explanation: "It wasn't on the call. Unless Ada pastes the notes, all it can do is guess or admit it doesn't know.",
    },
  ],
  apply: {
    scenario: 'Ada is working out what the AI can and cannot know.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In plain words, how does an AI chat tool write an answer?',
        options: [
          { text: 'It looks up the one correct answer in a database', why: 'There is no answer database. It writes, word by word.' },
          { text: 'It writes the words most likely to come next, based on patterns it learned' },
          { text: 'A person types the answer behind the scenes', why: 'No person is involved. It is generated.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Can the AI know this on its own, or does Ada have to tell it?',
        groups: ['It can know', 'Ada must tell it'],
        items: [
          { text: 'How a polite email usually sounds', group: 0 },
          { text: "What Lucía decided in yesterday's call", group: 1 },
          { text: 'What a project update usually includes', group: 0 },
          { text: 'That testing moved to Friday', group: 1 },
          { text: "Ada's manager's favourite format", group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'An AI chat tool is like a very good ... (one word)',
        answers: ['autocomplete', 'auto-complete', 'predictor'],
        placeholder: 'One word',
        explanation: 'It predicts the words that most likely come next.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Your AI summary said we agreed to launch in May. We never agreed that. Where did it get it?',
        prompt: 'What is the honest answer?',
        options: [
          { text: 'The AI must have found it online.', why: 'Your launch date is not online. It was a guess.' },
          { text: 'AI is never wrong, so you must have agreed.', why: 'AI tools guess when information is missing. Ada left the date out.' },
          { text: "I didn't give it our launch date, so it guessed one that sounded right. I'll fix it now." },
        ],
        answer: 2,
        explanation: 'Missing facts get filled with likely-sounding ones. Owning that keeps the trust.',
      },
      {
        kind: 'findBug',
        prompt: 'Spot the problem: which belief will get Ada into trouble?',
        lines: [
          'The AI is good at how things are usually written.',
          'The AI does not know what happened in our meeting.',
          'If the AI sounds confident, the facts must be right.',
          'I should give it the facts that only I know.',
        ],
        bug: 2,
        fix: 'Sounding confident is how it always sounds. Check the facts.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the gap to what Ada should give the AI.',
        pairs: [
          ['It does not know who Lucía is', 'Say she is our client contact'],
          ['It does not know what changed', 'List this week\'s updates'],
          ['It does not know the goal', 'Say what Lucía needs to decide'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the rule: who brings what?',
        tiles: ['It', 'brings', 'the', 'writing,', 'you', 'bring', 'the', 'situation'],
        distractors: ['nothing', 'answers'],
      },
      {
        kind: 'mcq',
        prompt: 'Ada asks the AI about something that happened last week in the news. What should she keep in mind?',
        options: [
          {
            text: 'It may not know about very recent events, unless the tool can search the web',
          },
          { text: 'It always knows the latest news', why: 'It learned from text up to a certain date.' },
          { text: 'It cannot talk about news at all', why: 'It can, but what it knows may be out of date.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete what Tey said.',
        template: 'What it knows: how things are usually [[1]]. What it has to guess: everything about your [[2]].',
        blanks: [['written'], ['situation']],
        distractors: ['paid', 'password', 'feelings'],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Ada\'s better routine in order.',
        lines: [
          'Ask: what does the AI need to know that only I know?',
          'Paste or type those facts in',
          'Ask for the answer',
          'Check any fact it states against what I gave it',
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What is one thing about your work that an AI tool could never know unless you told it?',
    starters: ['It would never know that...', 'I would need to tell it...'],
  },
  deepen: {
    title: 'Try it today',
    summary: 'Ask an AI tool about something only you know (your plans for tomorrow). Notice how it answers when it has to guess.',
  },
  notes:
    'Plain-language model of LLMs: trained on large text corpora, generates likely next tokens, has a training cutoff; some tools add web search or file access. No product-specific claims.',
};

export default lesson;
