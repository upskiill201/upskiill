import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 — Chapter Challenge: Folake wants a public ticket leaderboard. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the leaderboard',
  summary: 'Week 3, Monday. Folake is excited. "I\'ve built a leaderboard! Every agent\'s tickets closed, ranked, on the big screen by the kitchen. Healthy competition!" Chidi will top it. Halima, who spends an hour on each Kano clinic, will be last. Miracle has until Wednesday.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 2 tool in one live moment',
    'Push back on a well-meant idea from your boss, with evidence',
    'Offer a better way to make progress visible',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 3, Monday, 9:40 a.m.',
      beats: [
        { speaker: 'folake', text: 'Healthy competition! Tickets closed, ranked, on the big screen. People love to win.' },
        { speaker: 'narrator', text: 'Miracle pictures it. Chidi first, as always. Halima last: she spends an hour on each Kano clinic because they\'re new to smartphones. Bisi somewhere in the middle, quietly furious. And everyone suddenly closing easy tickets fast.' },
        { speaker: 'halima', text: '(later, privately) Will I be at the bottom of that screen?' },
        { speaker: 'narrator', text: 'Folake means well, and she\'s the COO. You\'re with Miracle.' },
      ],
    },
  ],
  apply: {
    scenario: 'Monday, the leaderboard idea.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the biggest risk of a public ticket ranking?',
        options: [
          { text: 'It rewards closing easy tickets fast, and shames people doing the hardest, slowest work' },
          { text: 'It uses too much electricity', why: 'Ha. Not the main risk.' },
          { text: 'Nothing; competition always helps', why: 'It depends on what you rank.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 2 tool helps Miracle?',
        groups: ['Outcome goal', 'Task significance', 'Honest framing'],
        items: [
          { text: 'Show clinics live, not tickets closed', group: 0 },
          { text: 'Put the Monday story on the big screen', group: 1 },
          { text: 'Tell Folake the truth about Halima\'s work', group: 2 },
          { text: 'Results sent within a day', group: 0 },
          { text: 'Dr Bello\'s 60 patients', group: 1 },
          { text: 'No exaggeration, no guilt', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'Will I be at the bottom of that screen?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Probably, sorry.', why: 'Leaves her feeling like the problem.' },
          { text: 'Just close easier tickets this week.', why: 'Exactly the bad behaviour a ranking creates.' },
          { text: 'Your Kano clinics are the hardest on the team, and they\'re working. I\'m going to suggest we show that instead. Leave it with me.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rank activity, and you get more ___, not better results. (one word)',
        answers: ['activity', 'Activity', 'tickets'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s response to Folake in order.',
        lines: ['Thank her for wanting visible progress', 'Name the risk with a real example', 'Offer a better screen', 'Suggest a two-week trial'],
      },
      {
        kind: 'mcq',
        prompt: 'What should go on the big screen instead?',
        options: [
          { text: 'Nothing at all', why: 'Visible progress is a good idea. Just the right progress.' },
          { text: 'Tickets closed, unranked', why: 'Still activity.' },
          { text: 'Clinics live toward 300, results sent, and this week\'s clinic story' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s message to Folake. Which line weakens her case?',
        lines: [
          'Love that you want progress on the big screen.',
          'Honestly, leaderboards are a stupid idea.',
          'Could we show clinics live and this week\'s story for two weeks, and compare?',
        ],
        bug: 1,
        fix: 'A ticket ranking would put Halima\'s hardest clinics at the bottom.',
        explanation: 'Insulting the boss\'s idea loses the argument. A real example wins it.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the screen to what it rewards.',
        pairs: [
          ['Tickets closed, ranked', 'Easy tickets, fast'],
          ['Clinics live toward 300', 'Getting clinics working'],
          ['This week\'s story', 'Remembering who it\'s for'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Folake says: "Fine. Two weeks. But I want to see numbers." What should Miracle do?',
        options: [
          { text: 'Refuse to show any numbers', why: 'Folake deserves evidence.' },
          { text: 'Agree, and report clinics live and results sent every Friday' },
          { text: 'Secretly keep a ticket ranking too', why: 'That breaks trust with both Folake and the team.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 2, in one line.',
        template: 'Show people who they [[1]], give them whole work to [[2]], and aim at outcomes, not [[3]].',
        blanks: [['help'], ['own'], ['activity', 'tickets']],
        distractors: ['beat', 'rank'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the trial offer.',
        tiles: ['Two', 'weeks,', 'then', 'we', 'compare.'],
        distractors: ['never'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you been ranked against others publicly (at work, school, sport)? Did it make you do better work, or just look better on the ranking?',
    starters: ['I was ranked on...', 'It made me...'],
  },
  deepen: {
    title: 'Next: Week 4',
    summary: 'The big screen shows clinics, not tickets. Then Bisi rewrites the whole onboarding script over a weekend, without asking anyone. It\'s brilliant. It\'s also not approved. Miracle\'s first instinct is to control it. Chapter 3: Let them run with it.',
  },
  notes: 'Chapter 2 challenge. Risks of public activity rankings (gaming, discouraging complex work; e.g. Kerr 1975, "On the folly of rewarding A while hoping for B"); outcome-based visible progress; managing up with evidence and a trial. Fictional events.',
};

export default lesson;
