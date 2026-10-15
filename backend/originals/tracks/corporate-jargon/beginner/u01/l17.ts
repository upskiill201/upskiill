import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 17. Before/After: asking what jargon means without feeling (or sounding) stupid. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'How to ask what it means',
  summary: 'Felix from IT says Remi\'s problem is "a PEBKAC situation, needs an RCA". Remi has no idea. Asking feels terrifying. Here is how to ask so you sound sharp, not lost.',
  minutes: 11,
  outcomes: [
    'Ask what a word means in a way that sounds confident',
    'Check your understanding by playing it back',
    'Know when to ask now and when to look it up later',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Remi asks Felix',
      before: {
        label: 'Panicked',
        text: 'Sorry, sorry, I\'m new, I\'m probably being really stupid, but I don\'t really understand any of what you said, sorry.',
      },
      after: {
        label: 'Confident',
        text: 'Quick question: what does RCA stand for here?',
      },
      notes: [
        'Four "sorry"s and "I\'m stupid" became zero. Asking is normal; no apology needed.',
        '"Any of what you said" became one specific word. Easier for Felix to answer.',
        '"Here" is a nice touch: it admits that words can mean different things in different teams.',
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'felix', text: 'Root cause analysis. Working out WHY it happened, not just fixing it.' },
        { speaker: 'remi', text: 'Got it. So you want to find out why the system let the double payment through?' },
        { speaker: 'felix', text: 'Exactly. And PEBKAC is "problem exists between keyboard and chair". It means a person clicked the wrong thing. Don\'t write that one in the report.' },
        { speaker: 'tey', text: "Did you notice Remi's second line? He played it back: \"So you want to...\". That's the confidence trick. You don't just ask, you check you've got it." },
      ],
    },
    {
      kind: 'text',
      html: "<p>Phrases that work every time:</p><ul><li><strong>\"Quick question: what does X mean here?\"</strong></li><li><strong>\"When you say X, do you mean...?\"</strong> (shows you've had a go)</li><li><strong>\"Just to check I've understood: you'd like me to...\"</strong> (the play-back)</li><li><strong>\"What would that look like?\"</strong> (for vague words like \"impact\" or \"good shape\")</li></ul><p><strong>When to ask now:</strong> when it affects your task, your deadline, or a decision. <strong>When to look it up later:</strong> when it's background, and you can still do your job without it.</p>",
    },
  ],
  apply: {
    scenario: 'Friday, IT corner. Felix is waiting.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which question sounds most confident?',
        options: [
          { text: 'Sorry, I\'m so stupid, what does that mean?', why: 'Asking isn\'t stupid. Drop the apology and the insult.' },
          { text: 'Huh?', why: 'Felix won\'t know which part you didn\'t get.' },
          { text: 'Quick question: what does RCA mean here?' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Remi\'s question makes him sound less confident?',
        lines: [
          'Sorry, sorry, I\'m probably being really stupid,',
          'but what does RCA stand for here?',
        ],
        bug: 0,
        fix: 'Quick question:',
        explanation: 'Apologising for asking makes a normal question sound like a failure.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each situation to the best phrase.',
        pairs: [
          ['You don\'t know a word at all', '"What does X mean here?"'],
          ['You think you know', '"When you say X, do you mean...?"'],
          ['You want to confirm the task', '"Just to check: you\'d like me to..."'],
          ['The word is vague, like "impact"', '"What would that look like?"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Can you get the summary into good shape before Monday?',
        prompt: '"Good shape" is vague. What should Remi ask?',
        options: [
          { text: 'What do you mean by shape?', why: 'Fair, but it puts the work on Brian. Offer your guess so he can just say yes.' },
          { text: 'Okay! (and guess)', why: 'Guessing on a deliverable can waste a weekend.' },
          { text: 'Sure! What would good shape look like: one page, with the numbers and a recommendation?' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Ask now, or look it up later?',
        groups: ['Ask now', 'Look it up later'],
        items: [
          { text: 'A word in your task instructions', group: 0 },
          { text: 'A word in someone else\'s project update', group: 1 },
          { text: 'Your deadline: "EOW"', group: 0 },
          { text: 'A word in a company-wide newsletter', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: '"Just to check I\'ve ___: you\'d like me to find out why it happened?" (one word)',
        answers: ['understood'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why does Remi say "what does RCA mean HERE"?',
        options: [
          { text: 'To sound more formal', why: 'It\'s about precision, not formality.' },
          { text: 'Because the same letters can mean different things in different teams' },
          { text: 'Because he\'s in the IT corner', why: 'It\'s about meaning in this context, not the room.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Remi plays it back to Felix.',
        template: 'So, just to [[1]]: you want to find out [[2]] the system let the double payment through?',
        blanks: [['check', 'confirm'], ['why']],
        distractors: ['apologise', 'when'],
      },
      {
        kind: 'mcq',
        prompt: 'What does PEBKAC mean, in Felix\'s IT humour?',
        options: [
          { text: 'A person made the mistake, not the computer' },
          { text: 'A serious virus', why: 'It\'s an IT joke: the problem sits "between keyboard and chair". That\'s the person.' },
          { text: 'A type of keyboard', why: 'Close to the keyboard, but it\'s about who\'s sitting at it.' },
        ],
        answer: 0,
        explanation: 'And like Felix said: keep it out of reports. It\'s a joke that can sound rude.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the question for a word you half-know.',
        tiles: ['When', 'you', 'say', 'sync,', 'do', 'you', 'mean', 'a', 'meeting?'],
        distractors: ['sorry', 'stupid'],
      },
    ],
  },
  reflect: {
    prompt: 'What stops you from asking what something means? Write the exact sentence you\'ll use next time.',
    starters: ['What stops me is...', 'Next time I\'ll say: "..."'],
  },
  deepen: {
    title: 'The no-sorry week',
    summary: 'For one week, ask every question without apologising first. Start with "Quick question:" instead. Notice how people answer.',
  },
  notes: 'RCA = root cause analysis (standard in IT/quality management). PEBKAC = IT slang, "problem exists between keyboard and chair" (Wiktionary, The Jargon File-era slang). Flagged as informal/rude in the lesson.',
};

export default lesson;
