import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Chat with Tey: when someone takes your idea (reclaiming, amplification). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'When someone takes your idea',
  summary: 'New problem. In a meeting with the director, Lucía suggested a loyalty email. Nobody reacted. Ten minutes later Diego said "What if we did, like, a loyalty email?" The director loved it. "Great idea, Diego!"',
  minutes: 11,
  outcomes: [
    'Reclaim an idea calmly, in the moment',
    'Use "amplification": repeat and credit each other\'s ideas',
    'Talk to the person privately if it keeps happening',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Lucía! I heard there was a loyalty email incident.",
          replies: ['I said it first! Ten minutes earlier!', 'And I just sat there. I froze.'],
        },
        {
          tey: "Freezing is normal. Remember David in Chapter 3? Same thing happened to him. Here's a calm line you can use in the moment: \"Thanks, Diego, that builds on what I suggested earlier. Here's how I'd do it...\" Then add one detail only you know.",
          replies: ['Why add a detail?'],
        },
        {
          tey: "Because the detail proves it's yours. Diego had \"a loyalty email\". You have the plan: who it goes to, when, what's in it. Owning the details owns the idea.",
          replies: ['But what if I freeze again?'],
        },
        {
          tey: "Then you need allies. There's a famous story from the Obama White House. Women staffers felt their ideas were being overlooked, so they agreed on a strategy: when one of them made a key point, another would repeat it AND credit her. \"I agree with Lucía's point about the loyalty email.\" They called it amplification.",
          replies: ['I could do that with Sofía and Marta on my team!'],
        },
        {
          tey: "Exactly. And you can do it for others too: amplify the quiet people on YOUR team. A leader who credits ideas makes everyone safer to speak.",
          replies: ['And Diego?'],
        },
        {
          tey: "If it keeps happening, have a private, friendly word: \"Diego, twice now an idea I raised got credited to you. I don't think you mean it. Can you help me make sure the team knows where ideas come from?\" Specific, private, and assuming good intent.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'In the moment: "That builds on what I suggested" plus one detail. In the team: amplify each other. If it repeats: a private, friendly word.',
    },
  ],
  apply: {
    scenario: 'Tey FM. The loyalty email incident.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why should Lucía add a detail after reclaiming the idea?',
        options: [
          { text: 'The detail proves it\'s her idea: she has the plan, not just the headline' },
          { text: 'To talk for longer', why: 'One detail, not a speech.' },
          { text: 'To embarrass Diego', why: 'The goal is credit, not embarrassment.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'When should Lucía use each tool?',
        groups: ['In the moment', 'Before meetings', 'After, in private'],
        items: [
          { text: '"That builds on what I suggested earlier."', group: 0 },
          { text: 'Agree with Sofía and Marta to amplify each other', group: 1 },
          { text: 'A friendly word with Diego about credit', group: 2 },
          { text: 'Adding one detail only she knows', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: '(in the meeting) What if we did, like, a loyalty email?',
        prompt: 'Lucía\'s calm reclaim?',
        options: [
          { text: '"That was MY idea!"', why: 'True, but it sounds like a complaint, not a plan.' },
          { text: '(says nothing)', why: 'Then the director credits Diego.' },
          { text: '"Thanks, Diego, that builds on what I suggested earlier. I\'d send it to first-time buyers, two weeks after they order."' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Repeating a colleague\'s point and crediting them by name is called ___. (one word)',
        answers: ['amplification', 'amplifying'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Lucía\'s private word with Diego in order.',
        lines: ['"Diego, can I mention something?"', '"Twice now, an idea I raised got credited to you."', '"I don\'t think you mean it."', '"Can you help me make sure the team knows where ideas come from?"'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is it good for Lucía, as a leader, to amplify other people\'s ideas too?',
        options: [
          { text: 'So people owe her favours', why: 'It\'s about the team, not favours.' },
          { text: 'It isn\'t; leaders should only push their own ideas', why: 'Leaders who credit others get more ideas.' },
          { text: 'Crediting ideas makes everyone on the team feel safer to speak' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s private word with Diego. Which line will make him defensive?',
        lines: [
          'Diego, can I mention something?',
          'You obviously steal ideas on purpose because you\'re jealous.',
          'Can you help me make sure the team knows where ideas come from?',
        ],
        bug: 1,
        fix: 'I don\'t think you mean it, but twice now my idea got credited to you.',
        explanation: 'Accusing him of bad intent starts a fight. Specific facts, assume good intent.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Decision first', 'No gap to fill'],
          ['"Hold that thought"', 'A holding phrase'],
          ['"I agree with Lucía\'s point"', 'Amplification'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Lucía\'s reclaim.',
        template: 'Thanks, Diego, that [[1]] on what I [[2]] earlier. Here\'s how I\'d [[3]] it.',
        blanks: [['builds'], ['suggested', 'said'], ['do', 'run']],
        distractors: ['stole', 'forgot'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build an amplification line.',
        tiles: ['I', 'agree', 'with', 'Lucía\'s', 'point', 'about', 'the', 'email.'],
        distractors: ['Diego\'s'],
      },
    ],
  },
  reflect: {
    prompt: 'Who could be your "amplification" ally? And whose ideas could you amplify in your next meeting?',
    starters: ['My ally could be...', 'I could amplify...'],
  },
  deepen: {
    title: 'Amplify someone this week',
    summary: 'In your next meeting, when someone quieter makes a good point, repeat it and credit them by name: "I agree with what Sam said about...". Notice how the room responds, and how Sam does.',
  },
  notes: '"Amplification" by women staffers in the Obama White House, reported by Juliet Eilperin, The Washington Post (13 Sept 2016); presented as a reported story. Reclaiming phrasing and private feedback with assumed good intent are standard workplace advice. Sofía and Marta are named extras on Lucía\'s team.',
};

export default lesson;
