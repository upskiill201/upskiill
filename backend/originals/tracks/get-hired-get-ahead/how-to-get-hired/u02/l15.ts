import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: Miracle's code review. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Miracle\'s review',
  summary: 'The sync bug is fixed. Clinton thanks Miracle, and she turns the call into a quick check: referrals, standing-out habits, feedback and proof. "You\'re doing the right things. Let\'s make sure you know why."',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Tell a fair referral from a shortcut', 'Practise the five standing-out habits', 'Ask for feedback and collect proof'],
  learn: [
    {
      kind: 'story',
      title: 'Fixed',
      beats: [
        { speaker: 'narrator', text: 'Sunday afternoon. The sync works on all three test phones. Clinton is on a video call with Miracle.' },
        { speaker: 'clinton', text: 'You were right. I was syncing before the phone had saved. Thank you.' },
        { speaker: 'miracle', text: 'You fixed it; I pointed. Now, quiz. Then go and log this win.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: Miracle\'s quiz.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When can Miracle honestly refer Clinton?',
        options: [
          { text: 'When she\'s seen his work' },
          { text: 'Whenever he asks', why: 'Referrals depend on seen work.' },
          { text: 'If he pays her', why: 'Never.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which habit?',
        groups: ['Reliable', 'Learns out loud'],
        items: [
          { text: 'Replies the same day', group: 0 },
          { text: 'Writes up how sync works for the team', group: 1 },
          { text: 'Always on time', group: 0 },
          { text: 'Shares what he learned', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the feedback loop in order.',
        lines: ['Ask for one specific thing', 'Listen and say thank you', 'Act on it', 'Show them you did'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the mistake.',
        lines: ['Logs a win every Friday.', 'Lists a referee without asking.', 'Asks "comfortable being a reference?"'],
        bug: 1,
        explanation: 'Always ask before naming a referee.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to Miracle.',
        from: 'miracle',
        message: 'What will you write in your wins log for this week?',
        options: [
          { text: 'Sync now works on all three test phones; confirmations reach the office when data returns.' },
          { text: 'Had a hard week.', why: 'Log what changed.' },
          { text: 'Miracle fixed my bug.', why: 'She pointed; he fixed it. Log the result.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each kind of proof to its use.',
        pairs: [
          ['Wins log', 'CV bullets'],
          ['Reference', 'A person employers can call'],
          ['Recommendation', 'Praise on his profile'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which feedback question is best?',
        options: [
          { text: '"What\'s one thing I could do better on the driver tests?"' },
          { text: '"Any feedback?"', why: 'Too open.' },
          { text: '"Am I your best intern?"', why: 'Not useful feedback.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s rules.',
        template: 'Earn the [[1]]. Ask for one [[2]] thing. Log every [[3]].',
        blanks: [['referral'], ['specific'], ['win']],
        distractors: ['shortcut', 'vague', 'excuse'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many standing-out habits did Miracle list? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Fair ask or shortcut?',
        groups: ['Fair', 'Shortcut'],
        items: [
          { text: 'Can you look at my code?', group: 0 },
          { text: 'Just get me in', group: 1 },
          { text: 'Would you be comfortable being a reference?', group: 0 },
          { text: 'Use your name without asking', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Clinton will miss a deadline. What does a standout graduate do?',
        options: [
          { text: 'Says so as soon as he knows, with a new date' },
          { text: 'Hopes nobody notices', why: 'Early news is a plan.' },
          { text: 'Blames someone else', why: 'Own it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of this week\'s ideas would change your current role, course or project the most?',
    starters: ['The idea is...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add this week\'s win to your log. Then ask one person a specific feedback question.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14.',
};

export default lesson;
