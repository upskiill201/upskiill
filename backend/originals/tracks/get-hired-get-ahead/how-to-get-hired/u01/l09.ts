import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 9 — following up vs pestering. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Following up without pestering',
  summary: 'Arjun hasn\'t replied in four days. Clinton\'s draft: "Hello?? Did you see my message??" Miracle stops him. One polite follow-up is fine. Three angry ones end a connection before it starts.',
  minutes: 11,
  outcomes: ['Decide when to follow up', 'Write one polite, short follow-up', 'Know when to stop and move on'],
  learn: [
    {
      kind: 'compare',
      title: 'Two follow-ups to Arjun',
      before: { label: 'Pestering', text: 'Day 2: "Hello??"\nDay 3: "Did you see my message??"\nDay 4: "I can see you\'re online."\n\nShe\'s busy, not ignoring him. Now he\'s a little uncomfortable, and he\'s never going to reply.' },
      after: { label: 'One polite follow-up', text: 'Day 7 or so: "Hi Arjun, just bumping this in case it got buried. Totally understand if you\'re busy. Thanks again for the post on retries."\n\nOne message, after about a week, with no guilt. If there\'s still no reply, Clinton stops and moves on to the next name on his map.' },
      notes: [
        'Wait about a week before following up.',
        'Follow up once, maybe twice, then stop.',
        'No guilt, no "I can see you\'re online". Busy people miss messages.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Silence usually means busy, not no. One kind follow-up after a week, then move on.',
    },
  ],
  apply: {
    scenario: 'Clinton decides how to follow up.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Arjun hasn\'t replied in four days. What does that usually mean?',
        options: [
          { text: 'He\'s busy, or the message got buried' },
          { text: 'He hates him', why: 'Silence usually means busy.' },
          { text: 'He should message again right now', why: 'Wait about a week.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Polite follow-up or pestering?',
        groups: ['Polite', 'Pestering'],
        items: [
          { text: 'Just bumping this in case it got buried', group: 0 },
          { text: 'I can see you\'re online', group: 1 },
          { text: 'Totally understand if you\'re busy', group: 0 },
          { text: 'Hello?? Hello???', group: 1 },
          { text: 'Messaging every day for a week', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that turns the follow-up into pressure.',
        lines: ['Hi Arjun, just bumping this in case it got buried.', 'I really need you to answer me today.', 'Thanks again for the post on retries.'],
        bug: 1,
        explanation: 'He owes him nothing. Keep it light.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s approach in order.',
        lines: ['Send one good first message', 'Wait about a week', 'Send one kind follow-up', 'If still nothing, move on to the next name'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Two weeks, two messages, still nothing from Arjun. Should I message his boss?',
        options: [
          { text: 'No: I\'ll stop here and message the next person on my map. Maybe he\'ll reply one day.' },
          { text: 'Yes, complain to his boss.', why: 'He owed him nothing. Move on gracefully.' },
          { text: 'Message him five more times.', why: 'That\'s pestering. Stop after one or two.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each pestering line to a polite one.',
        pairs: [
          ['Hello??', 'Just bumping this in case it got buried'],
          ['I can see you\'re online', 'Totally understand if you\'re busy'],
          ['Answer me today', 'Whenever suits you'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many days should Clinton wait before following up? (a number)',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which follow-up should Clinton send?',
        options: [
          { text: '"Hi Arjun, just bumping this in case it got buried. Totally understand if you\'re busy."' },
          { text: '"Why are you ignoring me?"', why: 'Guilt. He\'ll never reply.' },
          { text: '"?"', why: 'Rude and unclear.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Silence usually means [[1]], not [[2]].',
        blanks: [['busy'], ['no']],
        distractors: ['angry', 'yes', 'rude'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Follow up, or move on?',
        groups: ['Follow up once', 'Move on'],
        items: [
          { text: 'No reply after a week, one message sent', group: 0 },
          { text: 'No reply after two polite follow-ups', group: 1 },
          { text: 'They replied "not right now, sorry"', group: 1 },
          { text: 'Your message may have gone to spam', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever sent too many messages to someone, or stopped too soon? What would you do differently now?',
    starters: ['Once I...', 'Now I\'d...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Look at any message you sent over a week ago with no reply. If it matters, send one kind follow-up. Then let it go.',
  },
  notes: 'Follow-up timing (about a week, once or twice) is common networking guidance, not a rule; adjust for local norms and channel.',
};

export default lesson;
