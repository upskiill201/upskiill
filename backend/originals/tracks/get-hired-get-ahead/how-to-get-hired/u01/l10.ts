import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9. Story beat: Mrs Ewane's careers office quiz. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the careers office',
  summary: 'Mrs Ewane runs a networking workshop for final-years, and Clinton is her example: two calls, three new names, one start-up interested. Then she quizzes the room. Messages to strangers, informational interviews, following up.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write a message to someone you\'ve never met', 'Run and follow up an informational interview', 'Follow up without pestering'],
  learn: [
    {
      kind: 'story',
      title: 'The workshop',
      beats: [
        { speaker: 'narrator', text: 'The careers office, Thursday. Twenty final-years. Mrs Ewane points at Clinton.' },
        { speaker: 'ewane', text: 'Two weeks ago Mr Clinton told me he knew nobody. He has now had two calls, has three new names, and a start-up wants to talk to him. Mr Clinton, what changed?' },
        { speaker: 'clinton', text: 'I stopped asking for jobs and started asking for advice. And I followed up properly.' },
        { speaker: 'ewane', text: 'Good. Now, everybody: quiz.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: Mrs Ewane\'s workshop quiz.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put a message to a stranger in order.',
        lines: ['A real reason for writing to them', 'Specific thanks', 'One line about you', 'One small question', 'An easy way out'],
      },
      {
        kind: 'mcq',
        prompt: 'What should you never ask in an informational interview?',
        options: [
          { text: 'How they got into the field', why: 'That\'s a great question.' },
          { text: 'Something you could find on Google, or for a job outright' },
          { text: 'Who else you should talk to', why: 'That\'s the best closing question.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Polite or pestering?',
        groups: ['Polite', 'Pestering'],
        items: [
          { text: 'One follow-up after a week', group: 0 },
          { text: 'Daily "Hello??" messages', group: 1 },
          { text: 'Totally understand if you\'re busy', group: 0 },
          { text: 'I can see you\'re online', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to Mrs Ewane.',
        from: 'ewane',
        message: 'The call has ended. What are the four steps that follow?',
        options: [
          { text: 'Wait for them to call with a job.', why: 'The follow-up is your job.' },
          { text: 'Ask for a job in the thank-you.', why: 'Keep the thank-you clean.' },
          { text: 'Write it down, thank them within a day, act on the advice, report back.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the mistake in this student\'s plan.',
        lines: ['Prepare four questions.', 'Keep the call to 15 minutes.', 'Tell the next person that Tchami sent you, without asking Tchami.'],
        bug: 2,
        explanation: 'Always ask before using someone\'s name.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the right line.',
        pairs: [
          ['End of a 15-minute call', 'Is there anyone else I should talk to?'],
          ['The next day', 'Thanks, the webhooks tip was exactly what I needed'],
          ['A week of silence', 'Just bumping this in case it got buried'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which step do almost all students skip?',
        options: [
          { text: 'Reporting back that the advice worked' },
          { text: 'Saying hello', why: 'They say hello. They skip the report-back.' },
          { text: 'Writing the first message', why: 'The report-back is what gets skipped.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Mrs Ewane\'s board.',
        template: 'Ask for [[1]]. Keep to the [[2]]. Follow up [[3]].',
        blanks: [['advice'], ['time'], ['once', 'kindly']],
        distractors: ['jobs', 'money', 'daily'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A short conversation to learn about someone\'s work is an ___ interview. (one word)',
        answers: ['informational', 'information'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good reason to write to a stranger, or weak?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'You used advice from their post', group: 0 },
          { text: 'They have a big title', group: 1 },
          { text: 'You went to the same university', group: 0 },
          { text: 'You\'re messaging their whole company', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Arjun hasn\'t replied after two kind follow-ups. What now?',
        options: [
          { text: 'Message his boss', why: 'He owed him nothing. Move on.' },
          { text: 'Keep messaging daily', why: 'That\'s pestering.' },
          { text: 'Move on to the next name on the map' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which step from this week feels hardest for you: the first message, the call, or the follow-up? Why?',
    starters: ['The hardest step is...', 'To make it easier I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Book one 15-minute informational call in the next two weeks. Prepare your four questions before it.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09. Mrs Ewane is the course-only careers head (CastId ewane).',
};

export default lesson;
