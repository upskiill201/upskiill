import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Chat with Tey: making it safe to ask (Joel goes quiet; "what questions do you have?"). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Make questions easy',
  summary: 'Joel only asked about the login after two days of building it. Arjun asks Tey why Joel didn\'t just ask on Day 1. Tey: "Let\'s look at what you said right before \'Questions?\'"',
  minutes: 11,
  outcomes: [
    'Know why new people hold back questions',
    'Ask for questions in a way that gets real ones',
    'React to questions so more of them come',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'What did you say right before "Questions?"',
          replies: ['"Usual stack."', '"Thirty days, Diwali sale."'],
        },
        {
          tey: "\"Usual stack\" tells Joel there's a \"usual\" everyone else knows. Asking what it means would show he doesn't. And \"Questions?\" at the end of a call usually gets silence. It sounds like \"we're done, aren't we?\"",
          replies: ['So what should I say?'],
        },
        {
          tey: "Try \"What questions do you have?\" It assumes there will be some. Even better, ask about something specific: \"What's the part of the cart you're least sure about?\" Then wait. Count to five.",
          replies: ['And when he does ask?'],
        },
        {
          tey: "Thank him, and mean it. \"Great question, I should have said.\" How you react to the first question decides whether there's a second one. Amy Edmondson's research on teams found people speak up more where it feels safe to admit what they don't know.",
          replies: ['What if a question is silly?'],
        },
        {
          tey: "From a new person, a \"silly\" question usually points at something you never explained. Joel's login question saved the cart. Treat every question as a bug report on your brief.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Not "Questions?" but "What questions do you have?" Ask about a specific part. Wait. Thank the first question. Every question is a bug report on your brief.',
    },
  ],
  apply: {
    scenario: 'Tey and Arjun, about Joel.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does "Questions?" at the end of a call often get silence?',
        options: [
          { text: 'It sounds like "we\'re done, aren\'t we?"' },
          { text: 'Everyone understood', why: 'Both of them guessed wrong.' },
          { text: 'People hate questions', why: 'They hate looking like they don\'t know.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Invites questions, or shuts them down?',
        groups: ['Invites them', 'Shuts them down'],
        items: [
          { text: '"What questions do you have?"', group: 0 },
          { text: '"Usual stack, obviously."', group: 1 },
          { text: '"Which part are you least sure about?"', group: 0 },
          { text: '"Any questions? No? Great."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'This might be a silly question, but what is "the usual stack"?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'You don\'t know the usual stack?', why: 'That\'s the last question Joel will ever ask.' },
          { text: 'Just use whatever.', why: 'That\'s how the wrong cart got built.' },
          { text: 'Not silly at all, thank you. It\'s Next.js with my design system. I\'ll send the repo link now.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Treat every question as a ___ report on your brief. (one word)',
        answers: ['bug', 'Bug'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What decides whether there\'s a second question?',
        options: [
          { text: 'How clever the person is', why: 'Reaction matters more.' },
          { text: 'How long the call is', why: 'Time isn\'t it.' },
          { text: 'How you react to the first one' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the phrase to its effect.',
        pairs: [
          ['"Usual stack"', 'Hints everyone else knows'],
          ['"What questions do you have?"', 'Assumes there are some'],
          ['"Great question, I should have said."', 'Invites the next one'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s plan for the next call. Which line shuts questions down?',
        lines: [
          'Ask: which part are you least sure about?',
          'Remind them I\'m very busy, so keep questions short.',
          'Thank them for every question.',
        ],
        bug: 1,
        fix: 'Tell them questions now save us days later.',
        explanation: '"I\'m busy" tells new people their questions are a burden.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put getting real questions in order.',
        lines: ['Ask about a specific part', 'Wait five seconds', 'Thank them for asking', 'Fix the brief'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Not "Questions?" but "What [[1]] do you [[2]]?"',
        blanks: [['questions'], ['have']],
        distractors: ['problems', 'want'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s best question.',
        tiles: ['Which', 'part', 'are', 'you', 'least', 'sure', 'about?'],
        distractors: ['Okay?'],
      },
    ],
  },
  reflect: {
    prompt: 'When did you last hold back a question because you didn\'t want to look like you didn\'t know? What would have made it easier to ask?',
    starters: ['I held back when...', 'It would have been easier if...'],
  },
  deepen: {
    title: 'Change one word',
    summary: 'In your next meeting or call, replace "Any questions?" with "What questions do you have?" and wait five seconds. Count how many you get.',
  },
  notes: 'Psychological safety and speaking up: Amy Edmondson (1999). "What questions do you have?" vs "Any questions?": common teach-back and teaching guidance (e.g. AHRQ Health Literacy Universal Precautions Toolkit). Fictional details.',
};

export default lesson;
