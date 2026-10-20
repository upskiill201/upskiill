import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 4 — the first 48 hours after a no. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The first 48 hours',
  summary: 'Clinton doesn\'t want to get out of bed. Miracle doesn\'t tell him to "stay positive". She gives him a plan for the next 48 hours that starts with feeling bad, on purpose.',
  minutes: 12,
  outcomes: ['Let yourself feel a rejection without spiralling', 'Avoid big decisions in the first two days', 'Return to a small, normal routine'],
  learn: [
    {
      kind: 'steps',
      title: 'Forty-eight hours',
      steps: [
        { title: '1. Let it hurt (today)', body: 'Disappointment is normal. You don\'t have to pretend you\'re fine. Clinton lets himself be sad for the evening and eats a lot of birthday cake.' },
        { title: '2. Talk to one person', body: 'Say it out loud to someone who\'s on your side: a friend, family member or mentor. Clinton calls David. Saying it shrinks it.' },
        { title: '3. No big decisions', body: 'Not "I\'m quitting tech" or "I\'ll take any job". Big decisions made while hurting are often regretted. Wait at least two days.' },
        { title: '4. One small normal thing', body: 'Sleep, eat, walk, go to the Kmer shift, play football. A normal routine reminds you your life is bigger than one email.' },
        { title: '5. Day two: one small step', body: 'Send the gracious reply. Open your tracker. Pick one conversation to continue. Small, not heroic.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Feel it. Tell someone. No big decisions for two days. Do one normal thing. Then one small step.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'If low feelings last for weeks or feel overwhelming, talk to someone you trust or a health professional. That\'s a strong thing to do, not a weak one.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s first 48 hours.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Let it hurt', 'Talk to one person', 'No big decisions', 'One small normal thing', 'Day two: one small step'],
      },
      {
        kind: 'mcq',
        prompt: 'Why avoid big decisions in the first two days?',
        options: [
          { text: 'Decisions made while hurting are often regretted' },
          { text: 'Weekends', why: 'It\'s about emotions, not days of the week.' },
          { text: 'You\'re not allowed', why: 'You\'re allowed. It\'s just wiser to wait.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good for the first 48 hours, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Calling a friend', group: 0 },
          { text: 'Deciding to quit tech forever', group: 1 },
          { text: 'Going to football practice', group: 0 },
          { text: 'Applying to 80 random jobs at 2am', group: 1 },
          { text: 'Getting some sleep', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'You sound terrible, bro. Do you want to talk, or do you want me to distract you?',
        options: [
          { text: 'Talk for ten minutes, then distract me. Football tomorrow?' },
          { text: 'I\'m fine. (he isn\'t)', why: 'Saying it out loud helps.' },
          { text: 'Leave me alone forever.', why: 'Talking to one person helps.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the step that breaks the plan.',
        lines: ['Day one: talks to David.', 'Day one: decides to switch to accounting.', 'Day two: sends the gracious reply.'],
        bug: 1,
        explanation: 'No big decisions for two days.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to Clinton\'s action.',
        pairs: [
          ['Let it hurt', 'A sad evening and a lot of cake'],
          ['Talk to one person', 'Calls David'],
          ['One small step', 'Sends the gracious reply'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should the day-two step be?',
        options: [
          { text: 'Small: one reply, one conversation' },
          { text: 'Heroic: 50 applications', why: 'Small steps build momentum.' },
          { text: 'Nothing for a month', why: 'One small step on day two.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the plan.',
        template: 'Feel it. [[1]] someone. No big [[2]] for two days.',
        blanks: [['Tell'], ['decisions']],
        distractors: ['Blame', 'meals', 'naps'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'For how many hours should Clinton avoid big decisions? (a number)',
        answers: ['48', 'forty-eight', 'forty eight'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth seeking help, or a normal dip?',
        groups: ['Normal dip', 'Seek help'],
        items: [
          { text: 'Sad for an evening', group: 0 },
          { text: 'Low for weeks, can\'t function', group: 1 },
          { text: 'Disappointed for a day or two', group: 0 },
          { text: 'Feelings that are overwhelming', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Who is your "one person" to call when something goes wrong? What\'s your "one normal thing"?',
    starters: ['My one person is...', 'My normal thing is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your own 48-hour plan for bad news: who you\'ll call, what normal thing you\'ll do, and what small step you\'ll take on day two.',
  },
  notes: 'Supportive, non-clinical guidance. The warning callout signposts help for persistent low mood; keep it in any revision.',
};

export default lesson;
