import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. On air: David, "They took my idea". Quiet people aren't heard because of how (and when) they speak, not what they say. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'On air: "They took my idea"',
  summary: 'Line 3, Buea. David, a first-year Medicine student, had the best idea in his group project. He said it quietly, into his notebook. Five minutes later, Junior said the same idea, loudly. The whole group cheered. For Junior.',
  minutes: 12,
  outcomes: [
    'See why good ideas get lost when they\'re said quietly',
    'Separate "what you said" from "how and when you said it"',
    'Know this chapter\'s goal: be heard without becoming someone you\'re not',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tey FM, 11:40 p.m.',
      beats: [
        { speaker: 'tey', text: "Line 3. Hello? Line 3, you're on Tey FM... I think?" },
        { speaker: 'david', text: 'Hi. Sorry. It\'s David. From Buea. I\'m a bit quiet. Sorry.' },
        { speaker: 'tey', text: "Two sorries in six seconds! Welcome, David. What happened?" },
        { speaker: 'david', text: 'Group project for Community Health. We have to get more students to donate blood. I said, "Maybe... people could sign up with a friend? Like donor buddies?" Nobody reacted. Five minutes later Junior stood up and said, "GUYS. Donor. Buddies." Everyone cheered. The professor wrote "Junior\'s idea" on the board.' },
        { speaker: 'narrator', text: '(Silence on the line.)' },
        { speaker: 'david', text: 'It was my idea, Tey. I just said it... into my notebook.' },
        { speaker: 'tey', text: "Ignore-o-Meter: one brilliant idea, zero credit. Producer, this isn't an ideas problem. David's ideas are great. Something else is going on." },
      ],
      choice: {
        prompt: 'Producer: what\'s the first thing to ask David?',
        options: [
          {
            text: '"When you said it, where were you looking, how loud were you, and what happened right before?"',
            outcome: 'David thinks. "Looking at my notebook. Quiet. And... two people were talking at the same time." Now we know what to work on: how and when, not what.',
            best: true,
          },
          {
            text: '"Why don\'t you just be louder, like Junior?"',
            outcome: 'David goes even quieter. Being heard doesn\'t mean becoming Junior. There are better tools than volume alone.',
          },
          {
            text: '"Maybe Junior had the idea too?"',
            outcome: 'Possible, but unlikely, and it doesn\'t help David next time. We can only change how David speaks.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p><strong>This chapter's goal:</strong> help David be heard <em>as himself</em>. Quiet people don't need to become loud. They need a few tools: using their voice well, a pause, speaking at the right moment, and knowing their nerves are far less visible than they feel.</p>",
    },
  ],
  apply: {
    scenario: 'Tey FM, Line 3. David\'s idea.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Junior get the credit for David\'s idea?',
        options: [
          { text: 'His idea was better', why: 'It was the same idea.' },
          { text: 'He said it loudly, clearly and at a moment the group was listening' },
          { text: 'David\'s idea was wrong', why: 'It was good enough to get a cheer five minutes later.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'What David said, or how he said it?',
        groups: ['What he said', 'How he said it'],
        items: [
          { text: 'Donor buddies', group: 0 },
          { text: 'Into his notebook', group: 1 },
          { text: 'Very quietly', group: 1 },
          { text: 'Sign up with a friend', group: 0 },
          { text: 'While two people were talking', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'Maybe I\'m just not a leader. Some people are loud and some aren\'t.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'True. Give up.', why: 'Tey FM never says that.' },
          { text: 'Yes, so shout next time.', why: 'Volume alone isn\'t the answer.' },
          { text: 'You don\'t need to be loud. You need a few tools: where you look, when you speak, and how you use your voice.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'David said his idea into his ___. (one word)',
        answers: ['notebook', 'book'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s this chapter\'s goal for David?',
        options: [
          { text: 'Be heard as himself, with tools for voice, timing and nerves' },
          { text: 'Become as loud as Junior', why: 'Not the goal.' },
          { text: 'Stop sharing ideas', why: 'His ideas are the best part.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put what happened in order.',
        lines: ['David says "donor buddies" quietly.', 'Nobody reacts.', 'Junior says it loudly five minutes later.', 'The group cheers.', 'The professor writes "Junior\'s idea".'],
      },
      {
        kind: 'findBug',
        prompt: 'David\'s first try. Which part made it easy to miss?',
        lines: [
          'The idea: sign up with a friend.',
          'Said while looking down at his notebook, in a near-whisper.',
          'The idea fits the project goal.',
        ],
        bug: 1,
        fix: 'Said while looking at the group, at normal volume.',
        explanation: 'The idea was fine. The delivery made it invisible.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Who\'s who on Tey FM?',
        pairs: [
          ['Clinton', 'Muted by the group chat'],
          ['Arjun', 'Warning buried in paragraph four'],
          ['David', 'Idea taken by someone louder'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The producer\'s diagnosis.',
        template: 'David\'s problem isn\'t [[1]] he says. It\'s [[2]] and [[3]] he says it.',
        blanks: [['what'], ['how'], ['when']],
        distractors: ['why', 'louder'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tey\'s promise to David.',
        tiles: ['You', 'don\'t', 'need', 'to', 'be', 'loud.'],
        distractors: ['quiet', 'Junior'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever said something that was ignored, then heard someone else get credit for it? What did you notice about how you said it?',
    starters: ['It happened when...', 'I said it...'],
  },
  deepen: {
    title: 'Watch who gets heard',
    summary: 'In your next group conversation, don\'t speak; just watch. Who gets heard? Notice where they look, how loud they are, and when they jump in. It\'s rarely about who has the best idea.',
  },
  notes: 'Story setup. David (18, first-year Medicine, Buea) per CAST.md Tey FM timeline. Junior and the professor are named extras (narrated). The "how and when, not what" framing is a teaching device.',
};

export default lesson;
