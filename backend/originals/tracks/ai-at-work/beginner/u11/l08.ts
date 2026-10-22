import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 8 — reusing a good conversation. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Reusing a good conversation',
  summary: 'Sometimes a chat goes brilliantly after lots of back-and-forth. Ada learns how to capture what made it work, so she doesn\'t have to repeat the journey.',
  minutes: 12,
  outcomes: [
    'Know when to continue a chat and when to start fresh',
    'Capture a good conversation as a prompt',
    'Ask AI to write the prompt for you',
  ],
  learn: [
    {
      kind: 'text',
      html:
        '<table><tr><th>Situation</th><th>What to do</th></tr>' +
        '<tr><td>Same task, same day</td><td><strong>Continue the chat.</strong> It already has the context.</td></tr>' +
        '<tr><td>A new, unrelated task</td><td><strong>Start fresh.</strong> Old context can confuse the new answer.</td></tr>' +
        '<tr><td>A very long chat</td><td><strong>Start fresh with a summary.</strong> Long chats can drift or lose early details.</td></tr>' +
        '<tr><td>A chat that finally worked</td><td><strong>Capture it.</strong> Ask: "Write one prompt that would get this final result first time, including everything I clarified."</td></tr></table>' +
        '<p>Then save that prompt in your library and test it in a fresh chat.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Same task: continue. New task or very long chat: start fresh. Chat that finally worked: ask AI to write the one prompt that gets there first time.',
    },
  ],
  apply: {
    scenario: 'Ada\'s brief finally came out right after 15 messages.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Continue the chat, or start fresh?',
        groups: ['Continue', 'Start fresh'],
        items: [
          { text: 'One more tweak to the same email', group: 0 },
          { text: 'A new, unrelated task', group: 1 },
          { text: 'Shorten the summary you just got', group: 0 },
          { text: 'A chat with 80 messages that\'s drifting', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request best captures a chat that worked?',
        options: [
          { text: 'Thanks!', why: 'Captures nothing.' },
          { text: 'Write one prompt that would get this final result first time, including everything I clarified along the way.' },
          { text: 'Do it again.', why: 'Doesn\'t make it reusable.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why can very long chats go wrong?',
        options: [
          { text: 'AI gets tired', why: 'It\'s about context.' },
          { text: 'They can drift, and early details can get lost' },
          { text: 'They can\'t', why: 'They often drift.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'It took me 20 messages to get the AI to write our campaign brief right. Do I have to do that every time?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes, every time.', why: 'Capture it.' },
          { text: 'Copy the whole 20-message chat each time.', why: 'One prompt is cleaner.' },
          { text: 'No: ask it to write one prompt that gets the final result first time, save it, and test it in a fresh chat.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Same task: [[1]]. New task: start [[2]].',
        blanks: [['continue'], ['fresh']],
        distractors: ['delete', 'over-and-over'],
      },
      {
        kind: 'findBug',
        prompt: 'Which choice is a mistake?',
        lines: [
          'Continue the chat for one more tweak',
          'Start fresh for a new task',
          'Keep one chat for every task this month',
          'Capture the prompt that worked',
        ],
        bug: 2,
        fix: 'Start fresh chats for new tasks.',
        explanation: 'Old context can confuse new answers.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to capture a great chat.',
        lines: ['Ask for the one prompt', 'Save it in the library', 'Test it in a fresh chat', 'Fix anything missing'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to the move.',
        pairs: [
          ['Same task', 'Continue'],
          ['Very long, drifting chat', 'Fresh start with a summary'],
          ['Chat that finally worked', 'Capture it as a prompt'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s capture request.',
        tiles: ['Write', 'one', 'prompt', 'that', 'gets', 'this', 'first', 'time'],
        distractors: ['twice'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many messages did Ada\'s brief take before it came out right?',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why test the captured prompt in a fresh chat?',
        options: [
          { text: 'To check it works without the earlier conversation' },
          { text: 'For fun', why: 'To prove it stands alone.' },
          { text: 'No need', why: 'It might rely on hidden context.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What does a fresh start with a summary mean?',
        options: [
          { text: 'Delete everything and forget it', why: 'Carry over a summary.' },
          { text: 'Copy the whole old chat', why: 'Just the summary.' },
          { text: 'Open a new chat and paste a short summary of what matters from the old one' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a chat that took many tries to get right. What would the one captured prompt say?',
    starters: ['The task:', 'The captured prompt:'],
  },
  deepen: { title: 'Try it today', summary: 'After your next long, successful chat, ask for "one prompt that gets this first time" and save it.' },
  notes: 'Long-context drift is a known limitation; behaviour varies by model.',
};

export default lesson;
