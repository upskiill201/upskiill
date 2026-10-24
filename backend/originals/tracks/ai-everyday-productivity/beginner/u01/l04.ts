import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Chat with Tey: follow-ups. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: "It's a conversation",
  summary: 'Lucía gets a decent guest-list plan and copies it straight into her notes. Tey stops her: the best part of the answer is the next message you send.',
  minutes: 11,
  outcomes: [
    'Improve an answer with follow-up messages',
    'Use the five follow-ups: shorter, more options, why, change one thing, start again',
    'Know when to start a fresh chat',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Lucía! You copied the first answer. It\'s fine. But "fine" is where most people stop.', replies: ['What else would I do?', 'It looked good to me'] },
        { tey: 'Reply to it. The chat remembers everything above, so you don\'t start from zero. You just steer.', replies: ['Steer how?'] },
        { tey: 'Five moves. "Shorter." "Give me 3 more options." "Why did you suggest that?" "Change one thing: Papá hates speeches." And if it\'s gone wrong: start a new chat.', replies: ['Why would I start again?', 'Show me one'] },
        { tey: 'Say the answer is a list of 12 tasks and she wants 3. She doesn\'t rewrite the whole prompt. She types: "Just the 3 that matter most this week." Done.', replies: ['That\'s it?'] },
        { tey: 'That\'s it. And start a new chat when it gets stuck on a wrong idea, or when you switch topic. Old details can leak into new answers.', replies: ['Like a party detail in my flat search?'] },
        { tey: 'Exactly like that. One chat per job. Now, go steer.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Five follow-ups: "Shorter." "3 more options." "Why?" "Change one thing: ..." And when it\'s stuck or you switch topic: a new chat.',
    },
  ],
  apply: {
    scenario: 'Steering the conversation.',
    items: [
      {
        kind: 'mcq',
        prompt: 'The answer is good but far too long for Lucía\'s phone. What\'s the quickest fix?',
        options: [
          { text: 'Rewrite the whole prompt from scratch', why: 'The chat remembers; just steer.' },
          { text: 'Reply "Shorter, 5 lines max."' },
          { text: 'Accept it as it is', why: 'One quick follow-up fixes it.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to the follow-up that fixes it.',
        pairs: [
          ['Too long', '"Shorter, 5 lines max."'],
          ['You don\'t like any idea', '"Give me 3 more options."'],
          ['You don\'t understand a suggestion', '"Why did you suggest that?"'],
          ['One detail is wrong', '"Change one thing: ..."'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'I always start a new chat for every message. Fresh brain!',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Same, it\'s the only way.', why: 'You lose all the context you gave it.' },
          { text: 'You\'re wasting all the details you gave it. Stay in the chat to refine; start fresh when you switch topic.' },
          { text: 'New chats cost extra.', why: 'That\'s not the reason.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep going in this chat, or start a new one?',
        groups: ['Keep going', 'New chat'],
        items: [
          { text: 'You want the party plan shorter', group: 0 },
          { text: 'You\'re switching from the party to the flat search', group: 1 },
          { text: 'It keeps repeating a wrong idea after two corrections', group: 1 },
          { text: 'You want 3 more music ideas', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Why follow-ups work.',
        template: 'The chat [[1]] everything above, so you don\'t start from [[2]].',
        blanks: [['remembers'], ['zero', 'scratch']],
        distractors: ['forgets', 'the top'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s steering of the guest list.',
        lines: ['Ask for a guest-list plan', 'Reply "shorter"', 'Reply "change one thing: Papá hates speeches"', 'Ask "why the photo table?"', 'Save the final version'],
      },
      {
        kind: 'mcq',
        prompt: 'The AI suggested a "memory table". Lucía doesn\'t know what that is. Best follow-up?',
        options: [
          { text: 'Ignore it', why: 'Asking takes five seconds.' },
          { text: 'Start a new chat', why: 'Ask in the same chat; it has the context.' },
          { text: '"What\'s a memory table, and why for this party?"' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Type the one-word follow-up for an answer that\'s too long.',
        answers: ['shorter', 'shorter please', 'shorten', 'shorten it'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Which follow-up is the weakest?',
        lines: [
          'Give me 3 more options for music.',
          'Change one thing: there\'s no budget for a band.',
          'Hmm.',
        ],
        bug: 2,
        fix: 'Say what\'s wrong: "Too formal. Make it warmer."',
        explanation: '"Hmm" tells it nothing about what to change.',
      },
      {
        kind: 'mcq',
        prompt: 'Lucía asked about flats in her party chat and the answer mentions "space for 60 guests". What happened?',
        options: [
          { text: 'An old detail from the party leaked into the flat answer: new topic, new chat' },
          { text: 'The AI thinks she\'s rich', why: 'It\'s using details from earlier in the chat.' },
          { text: 'Flats need space for 60 guests', why: 'That came from the party chat.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which follow-up do you think you\'ll use most: shorter, more options, why, change one thing, or start again? Why?',
    starters: ['I\'ll use... most, because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask an AI tool for a plan for tomorrow. Then send three follow-ups only: "Shorter", "Why that order?", and "Change one thing: ...". Notice how little you had to type.',
  },
  notes: 'Chats keep earlier messages as context; switching topics in one long chat can carry over irrelevant details. Advice is general and tool-neutral.',
};

export default lesson;
