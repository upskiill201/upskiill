import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Chat with Tey: feedback to a peer you don't manage (Pauline's early promise). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Feedback to a peer',
  summary: 'Thursday. A customer forwards Remi a sales email from Pauline\'s team: "Great news: refunds now in 5 days!" The pilot isn\'t finished. Wanjiku has seen it too, and she is not happy. Pauline is Remi\'s ally. She doesn\'t report to him. He asks Tey what to do.',
  minutes: 11,
  outcomes: [
    'Give feedback to someone you have no authority over',
    'Ask permission and speak for yourself',
    'Protect the relationship and the goal at the same time',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'How are you feeling about it?',
          replies: ['Annoyed. We agreed the wording together.', 'Worried Wanjiku will quit the project.'],
        },
        {
          tey: "Both fair. Before anything else: talk to Pauline directly, today, and in private. Not in the group chat, not through Brian. Feedback to a peer works best one-to-one, before the story spreads.",
          replies: ['But I\'m not her manager. Can I even give her feedback?'],
        },
        {
          tey: "You can, if you ask first. \"Can I share something about the sales email?\" Asking permission matters more with peers: it says \"I'm not your boss, I'm your partner.\" Then use what you know: Situation, Behaviour, Impact. \"Thursday's sales email said 5-day refunds. Wanjiku saw it, and she's worried we've promised something the test hasn't proved.\"",
          replies: ['And then?'],
        },
        {
          tey: "Then stop, and ask. \"What happened?\" Maybe Pauline didn't write it. Maybe a sales rep copied an old draft. You don't know yet. Speak for yourself, not for the group: \"I'm worried\", not \"everyone's upset\".",
          replies: ['What if it was her?'],
        },
        {
          tey: "Then agree a fix together, and make it about the shared goal: \"How do we fix it so customers trust us and Wanjiku trusts us?\" And afterwards, tell Wanjiku what you did. Both of them need to see you protect the goal without picking a side.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Peers: private, same day, ask permission. Situation, Behaviour, Impact. Ask what happened. Speak for yourself. Fix it together, for the shared goal.',
    },
  ],
  apply: {
    scenario: 'Tey and Remi, after the sales email.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where should Remi talk to Pauline?',
        options: [
          { text: 'Privately, today' },
          { text: 'In the group chat, so everyone sees', why: 'Public feedback to a peer makes them defensive.' },
          { text: 'Through Brian', why: 'Going around her turns feedback into a complaint.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good peer feedback, or not?',
        groups: ['Good', 'Not'],
        items: [
          { text: '"Can I share something about the email?"', group: 0 },
          { text: '"Everyone\'s upset with you."', group: 1 },
          { text: '"What happened?"', group: 0 },
          { text: 'Posting the email in the group chat', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'pauline',
        message: 'Oh no. That was an old draft. A sales rep must have copied it. I\'m so embarrassed.',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'You should check your team\'s emails.', why: 'Piles on. She already feels bad.' },
          { text: 'It\'s fine, forget it.', why: 'It isn\'t fine: customers have the wrong promise.' },
          { text: 'Thanks for telling me. These things happen. Shall we send a correction together, and tell Wanjiku what we\'re doing?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'With a peer, ask ___ before giving feedback. (one word)',
        answers: ['permission', 'Permission', 'first'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the SBI part to Remi\'s words.',
        pairs: [
          ['Situation', '"Thursday\'s sales email..."'],
          ['Behaviour', '"...said 5-day refunds."'],
          ['Impact', '"Wanjiku\'s worried we promised too soon."'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why say "I\'m worried" instead of "everyone\'s upset"?',
        options: [
          { text: 'It sounds weaker', why: 'It sounds fairer.' },
          { text: 'Nobody else is upset', why: 'Wanjiku is. Let her speak for herself.' },
          { text: 'Speaking for yourself is honest and doesn\'t gang up on her' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s planned message to Pauline. Which line breaks the advice?',
        lines: [
          'Can I share something about Thursday\'s sales email?',
          'Wanjiku, Felix and Brian all think it was careless.',
          'What happened? Let\'s fix it together.',
        ],
        bug: 1,
        fix: 'I\'m worried customers now expect something we haven\'t proved.',
        explanation: 'Bringing in "everyone" makes it feel like an ambush.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put peer feedback in order.',
        lines: ['Ask permission, privately', 'Situation, Behaviour, Impact', 'Ask what happened', 'Fix it together'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Private, same [[1]], ask [[2]]. Speak for [[3]].',
        blanks: [['day'], ['permission', 'first'], ['yourself']],
        distractors: ['week', 'everyone'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s opener.',
        tiles: ['Can', 'I', 'share', 'something?'],
        distractors: ['complain'],
      },
    ],
  },
  reflect: {
    prompt: 'Is there feedback you\'ve been holding back from a peer? How would you open it, asking permission and speaking for yourself?',
    starters: ['I\'d like to tell them...', 'I\'d open with: "..."'],
  },
  deepen: {
    title: 'Ask before you tell',
    summary: 'Next time you have feedback for a peer, open with "Can I share something about...?" and wait for a yes. Then keep it to one SBI.',
  },
  notes: 'Peer feedback: Center for Creative Leadership SBI model; asking permission and owning your perspective ("I" statements) reflect standard feedback and Crucial Conversations guidance. Fictional events.',
};

export default lesson;
