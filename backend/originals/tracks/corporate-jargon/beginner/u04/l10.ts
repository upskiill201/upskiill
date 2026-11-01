import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 plus earlier. Story beat: the client call with Ms Wekesa. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the client call',
  summary: 'Thursday, 10:00. Brian brings Remi onto a call with Ms Wekesa from Mama Mboga Fresh, the key account at risk. She has three hard questions. Brian\'s phone rings. Remi is on his own.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Speak professionally to a client under pressure', 'Use next steps, apologies and plain words together'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 10:00 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Ms Wekesa runs operations at Mama Mboga Fresh, a grocery chain and one of Synergix\'s biggest customers. Her deliveries have been late four times this month. She is polite. She is also not happy.' },
        { speaker: 'brian', text: 'Thanks for your time, Ms Wekesa. I\'ve brought Remi, who built our new delivery tracker. Remi, could you... sorry, I have to take this, it\'s the CFO. Back in five.' },
        { speaker: 'narrator', text: 'Brian leaves. Ms Wekesa looks at Remi. "Young man. Why are my tomatoes arriving at noon instead of 7 a.m.?"' },
        { speaker: 'tey', text: "No slang. No dead ends. No ten-minute apology. Everything from this week, live, with a client." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2. The client call.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Ms Wekesa: "Why are my tomatoes arriving at noon?" Remi knows part of the answer. Best reply?',
        options: [
          { text: '"Yeah, it\'s kinda the courier\'s fault tbh."', why: 'Casual, and blaming. Not for a client.' },
          { text: '"I don\'t know."', why: 'A dead end, with an unhappy client.' },
          { text: '"Our data shows the trucks leave Mombasa a day late. We\'re testing a new courier now. Let me get you the exact plan by this afternoon."' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'She asks: "Who is responsible for this?" How should Remi apologise?',
        options: [
          { text: '"I am so terribly, terribly sorry, I feel awful, I can\'t believe..."', why: 'One sincere sorry, then the fix.' },
          { text: '"It\'s not my job."', why: 'Never with a client.' },
          { text: '"We\'re sorry about the late deliveries. Here\'s what we\'re doing to fix them, and I\'ll send you the dates."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Swap the casual words before Remi speaks.',
        pairs: [
          ['gonna', 'going to'],
          ['yeah', 'yes'],
          ['stuff', 'name the thing'],
          ['tbh', 'leave it out'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Say it to Ms Wekesa, or not?',
        groups: ['Say it', 'Don\'t say it'],
        items: [
          { text: 'Let me find out and come back to you by 3.', group: 0 },
          { text: 'That\'s not my department.', group: 1 },
          { text: 'What I can do is send you the tracker every morning.', group: 0 },
          { text: 'Dunno, ask Brian.', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Upgrade "I don\'t know": "Let me ___ out." (one word)',
        answers: ['find'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: '(back on the call) Sorry about that! Where are we?',
        prompt: 'Remi sums up for Brian, in front of the client.',
        options: [
          { text: 'It\'s fine bro, all good.', why: 'Very much not the register for a client call.' },
          { text: 'Ms Wekesa\'s deliveries have been late four times. I\'ve explained the Mombasa delay and the courier test, and I\'ll send her the plan by 3 today.' },
          { text: 'She\'s angry.', why: 'True-ish, but unhelpful, and she can hear you.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s follow-up email to Ms Wekesa. Which line needs fixing?',
        lines: [
          'Dear Ms Wekesa,',
          'Thank you for your time this morning.',
          'Sorry sorry sorry again, we\'re so terrible, I feel awful.',
          'As promised, the delivery plan is attached.',
        ],
        bug: 2,
        fix: 'We\'re sorry for the late deliveries this month.',
        explanation: 'One sincere sorry, then the fix. The plan does the real apologising.',
      },
      {
        kind: 'mcq',
        prompt: 'Which sign-off fits the email to Ms Wekesa?',
        options: [
          { text: 'Kind regards,' },
          { text: 'Cheers mate,', why: 'Far too casual for an unhappy client.' },
          { text: 'thx', why: 'No.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review from earlier chapters.',
        pairs: [
          ['Key account', 'An important customer'],
          ['ETA', 'When it will arrive'],
          ['Next steps', 'Who does what next'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Remi\'s promise to Ms Wekesa.',
        template: 'I\'m not [[1]] of the exact date yet. Let me find [[2]] and come back to you by [[3]] p.m.',
        blanks: [['sure', 'certain'], ['out'], ['3', '4']],
        distractors: ['gonna', 'dunno'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s opening line on the call.',
        tiles: ['Thank', 'you', 'for', 'your', 'time,', 'Ms', 'Wekesa.'],
        distractors: ['Yo', 'sorry'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you had to speak for someone else, or handle an unhappy customer, teacher or relative. Which tool from this chapter would have helped most?',
    starters: ['It was when...', 'The tool that would have helped is...'],
  },
  deepen: {
    title: 'The client voice',
    summary: 'Practise answering one hard question out loud, as if to a client: honest, one sorry if needed, a next step, a time. Record yourself and listen back.',
  },
  notes: 'Review of lessons 6–9 plus earlier. Ms Wekesa / Mama Mboga Fresh: fictional client (key account from Chapter 3 lesson 13); her lines are narrated (not a cast speaker).',
};

export default lesson;
