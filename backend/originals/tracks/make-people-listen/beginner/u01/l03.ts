import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3 — free. Chat with Tey: listen first, get heard second (Itzchakov & Kluger listening research). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Listen first, get heard second',
  summary: 'Tey asks Clinton a strange question: "When did you last ask your group chat what THEY wanted?" Clinton goes quiet for the first time all night.',
  minutes: 12,
  outcomes: [
    'Know what research says about how being listened to changes people',
    'Use listening as the first step to being heard',
    'Ask the question that turns an audience into a team',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Clinton. Quick question. In those sixty-three messages, how many times did you ask your classmates something? Like, what time suits them, or what they're stuck on?",
          replies: ['...Zero?', 'Does "WHO\'S COMING" count?'],
        },
        {
          tey: "Ha. \"WHO'S COMING\" in capitals is a demand dressed as a question. Here's something researchers have found again and again: when people feel genuinely listened to, they get less defensive and more open. Listening isn't the opposite of being heard. It's the doorway to it.",
          replies: ['How does that work?'],
        },
        {
          tey: "In one set of experiments, people who were listened to with full attention, without judgement, became less anxious and less defensive, and thought more openly about their own views. People pay attention to those who pay attention to them. It's a very old deal.",
          replies: ['So what do I do with my group chat?'],
        },
        {
          tey: "Before announcing anything, ask. \"Exam's in two weeks. What topics are people stuck on? And is Saturday or Sunday better?\" Now it's THEIR study session. People turn up to things they helped shape.",
          replies: ['And then?'],
        },
        {
          tey: "Then read every answer, and reply to people by name. \"Good shout, Brenda, Sunday it is.\" You've just shown forty people that this chat listens back. Same station motto as mine, actually.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'People listen to those who listen to them. Ask first, use their answers, and say their names.',
    },
  ],
  apply: {
    scenario: 'Tey FM, Line 1. Clinton goes quiet.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does research suggest happens when people feel genuinely listened to?',
        options: [
          { text: 'They become less defensive and more open' },
          { text: 'They stop talking completely', why: 'They often open up more.' },
          { text: 'Nothing measurable', why: 'Several studies found clear effects.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Real question, or demand in disguise?',
        groups: ['Real question', 'Demand in disguise'],
        items: [
          { text: 'Is Saturday or Sunday better for everyone?', group: 0 },
          { text: 'WHO\'S COMING???', group: 1 },
          { text: 'What topics are you stuck on?', group: 0 },
          { text: 'Why is nobody replying to me?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Okay, new message draft: "Exam in two weeks. What topics are people stuck on? Saturday or Sunday better?"',
        prompt: 'Producer\'s verdict?',
        options: [
          { text: 'Add "URGENT" at the start.', why: 'It isn\'t urgent, and it undoes the friendly tone.' },
          { text: 'Perfect. Now read every answer and reply to people by name.' },
          { text: 'Send it twenty times to be safe.', why: 'Clinton. No.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'People listen to those who ___ to them. (one word)',
        answers: ['listen'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why do people turn up to things they helped shape?',
        options: [
          { text: 'They feel guilty', why: 'Ownership, not guilt.' },
          { text: 'It\'s a rule of group chats', why: 'Not a rule, a human habit.' },
          { text: 'It becomes theirs, not just yours' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Clinton\'s new plan. Which step skips the listening?',
        lines: [
          'Ask what topics people are stuck on.',
          'Ignore the answers and pick my own topics anyway.',
          'Reply to people by name.',
        ],
        bug: 1,
        fix: 'Build the session around the topics people named.',
        explanation: 'Asking and then ignoring the answers is worse than not asking at all.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the listening move to what it shows.',
        pairs: [
          ['Asking first', 'Their views matter'],
          ['Using their answers', 'You actually heard them'],
          ['Saying their name', 'You noticed them personally'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Brenda replies: "Sunday is better, I work Saturdays." Best reply from Clinton?',
        options: [
          { text: '"Good shout, Brenda, Sunday it is!"' },
          { text: '"Saturday is better for me though."', why: 'He asked. Now he has to listen.' },
          { text: '(No reply)', why: 'Silence tells everyone the question was fake.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Clinton\'s new opening message.',
        template: 'Exam in two weeks. What [[1]] are people stuck on? [[2]] or Sunday better?',
        blanks: [['topics'], ['Saturday']],
        distractors: ['URGENT', 'WHO'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tey\'s rule.',
        tiles: ['Ask', 'first,', 'then', 'use', 'their', 'answers.'],
        distractors: ['shout', 'louder'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of someone you want to listen to you. When did you last really listen to them? What could you ask them first?',
    starters: ['I want ... to listen to me.', 'I could ask them...'],
  },
  deepen: {
    title: 'Ask before you announce',
    summary: 'Next time you need people to do something (a meeting, a plan, a family decision), ask one real question before you announce anything. Use their answers. Watch how differently people respond.',
  },
  notes: 'Itzchakov, Kluger & Castro (2017), Personality and Social Psychology Bulletin 43(1): 105–120 — high-quality listening reduced speakers\' social anxiety and defensiveness, increased attitude complexity; replicated in organisational quasi-experiments. Kluger et al. (2024) meta-analysis, Journal of Business and Psychology 39(2): perceived listening most strongly associated with relationship quality (trust). Lesson describes effects in plain terms without overstating size.',
};

export default lesson;
