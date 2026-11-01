import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Myth or Fact: drop the "just" (minimisers; Tamir & Mitchell 2012 on self-disclosure being rewarding). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Drop the "just"',
  summary: 'Ada thinks talking about herself is rude. Arjun thinks hiding is worse. Tey settles it with myths and facts.',
  minutes: 11,
  outcomes: [
    'Know why minimising words shrink your pitch',
    'Find the line between confident and boastful',
    'Know why a personal pitch should leave room for the other person',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Saying "I\'m just a..." sounds humble, so people like you more.', isFact: false, explain: 'Myth. Words like "just", "only" and "not very exciting" don\'t sound humble; they tell people there\'s nothing to ask about. The conversation ends.' },
        { text: 'You can be confident without boasting.', isFact: true, explain: 'Fact. Boasting is about being better than others. Confidence is saying plainly what you do and why it matters: "I built an app that ended the money arguments in my office."' },
        { text: 'People enjoy talking about themselves.', isFact: true, explain: 'Fact. In a 2012 Harvard study, sharing information about yourself activated brain regions linked to reward, and people were even willing to give up small amounts of money to talk about themselves.' },
        { text: 'So a great personal pitch talks only about you, for as long as possible.', isFact: false, explain: 'Myth. Because people enjoy talking about themselves, the best personal pitch is short and then hands the conversation back: "What brings you here?"' },
        { text: 'Facts beat adjectives.', isFact: true, explain: 'Fact. "I\'m really passionate and hard-working" is easy to say and hard to believe. "Ten colleagues use the app I built" is a fact people remember.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Drop the "just". Say plainly what you do, with a fact, then hand the conversation back.',
    },
  ],
  apply: {
    scenario: 'Myth or fact, with Tey.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does "I\'m just a junior designer" tell people?',
        options: [
          { text: 'That Ada is humble and interesting', why: 'Humble, maybe. Interesting, it hides.' },
          { text: 'That there\'s nothing much to ask about' },
          { text: 'That she\'s the boss', why: 'Definitely not.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Confident, or boastful?',
        groups: ['Confident', 'Boastful'],
        items: [
          { text: '"I built an app ten colleagues use every month."', group: 0 },
          { text: '"I\'m the best designer in Lagos, honestly."', group: 1 },
          { text: '"I design money apps people actually understand."', group: 0 },
          { text: '"Everyone else\'s apps are rubbish compared to mine."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'If people love talking about themselves, should I just ask questions and never pitch?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Give a short, clear pitch, then hand it back with a question. Both of you get to talk.' },
          { text: 'Yes, never say what you do.', why: 'Then they leave knowing nothing about you.' },
          { text: 'No, talk about yourself for ten minutes.', why: 'They\'ll be looking for the exit.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '"Hard-working and passionate" are adjectives. "Ten colleagues use it" is a ___. (one word)',
        answers: ['fact'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What did the 2012 Harvard study find about talking about yourself?',
        options: [
          { text: 'People hate it', why: 'The opposite.' },
          { text: 'It only works for extroverts', why: 'The finding was general.' },
          { text: 'It activated reward-related brain regions, and people would give up small amounts of money to do it' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Swap the shrinker for something better.',
        pairs: [
          ['"I\'m just a designer"', '"I design money apps people actually use"'],
          ['"It\'s just a small app"', '"It ended the money arguments in my office"'],
          ['"Not very exciting"', '"I\'m a finalist at 60 Seconds on Friday"'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s new intro. Which line is still a shrinker?',
        lines: [
          'I design money apps people actually understand.',
          'I built one for my office\'s savings group.',
          'But honestly, it\'s probably nothing special.',
        ],
        bug: 2,
        fix: 'What brings you here tonight?',
        explanation: 'A dismissal at the end cancels the confidence. Hand the conversation back instead.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a confident personal pitch in order.',
        lines: ['What you do, plainly', 'A fact that proves it', 'A question back to them'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s rule.',
        template: 'Drop the "[[1]]". Use a [[2]], not adjectives. Then hand the conversation [[3]].',
        blanks: [['just'], ['fact'], ['back']],
        distractors: ['only', 'adjective'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s question back.',
        tiles: ['What', 'brings', 'you', 'here', 'tonight?'],
        distractors: ['just'],
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite your usual answer to "What do you do?" without any shrinkers, with one fact, and ending with a question back.',
    starters: ['I...', 'A fact: ...', 'And you?'],
  },
  deepen: {
    title: 'Ban "just" for a day',
    summary: 'For one day, catch every time you say or type "just" about yourself or your work ("just checking", "just a small thing"). Delete it and notice how different you sound.',
  },
  notes: 'Tamir & Mitchell (2012), PNAS 109(21): "Disclosing information about the self is intrinsically rewarding" — self-disclosure engaged mesolimbic reward regions; participants forwent money to talk about themselves. Minimising language advice is standard career coaching.',
};

export default lesson;
