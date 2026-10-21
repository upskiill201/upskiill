import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 6 — a daily AI routine. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'A daily AI routine',
  summary: 'Ada uses AI all day, but randomly. A light daily routine puts the right prompt at the right time, and keeps AI from eating her day.',
  minutes: 12,
  outcomes: [
    'Build a simple daily AI routine',
    'Match saved prompts to times of day',
    'Know when to step away from AI',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Ada\'s day with AI',
      html:
        '<table><tr><th>When</th><th>What</th><th>Saved prompt</th></tr>' +
        '<tr><td>8:30</td><td>Inbox: what needs me today?</td><td>"Sort these emails into reply today, this week, or just read."</td></tr>' +
        '<tr><td>9:00</td><td>Plan the day</td><td>"Fit these tasks around my meetings, 25% free."</td></tr>' +
        '<tr><td>Midday</td><td>Writing and research</td><td>Drafting and research templates</td></tr>' +
        '<tr><td>After meetings</td><td>Follow-ups</td><td>Five-part follow-up</td></tr>' +
        '<tr><td>5:00</td><td>Wrap up</td><td>"From my notes, list what\'s done, what\'s open, and tomorrow\'s first task."</td></tr></table>' +
        '<p><strong>And when not to:</strong> Ada keeps one hour a day for thinking and design work with no AI open. Some of her best ideas come when she\'s not prompting.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Tie saved prompts to moments: inbox, plan, write, follow up, wrap up. Keep some time AI-free for deep thinking.',
    },
  ],
  apply: {
    scenario: 'Ada designs her daily routine.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s AI day.',
        lines: ['Inbox', 'Plan the day', 'Writing and research', 'Follow-ups', 'Wrap up'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the prompt.',
        pairs: [
          ['8:30', 'Sort emails into today, this week, just read'],
          ['After meetings', 'Five-part follow-up'],
          ['5:00', 'Done, open, tomorrow\'s first task'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why keep an hour a day without AI?',
        options: [
          { text: 'Deep thinking and original ideas need space without constant prompting' },
          { text: 'AI tools are offline then', why: 'It\'s deliberate.' },
          { text: 'To rest the computer', why: 'It\'s for thinking.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which wrap-up prompt is most useful?',
        options: [
          { text: 'How was my day?', why: 'Vague.' },
          { text: 'From my notes, list what\'s done, what\'s still open, and the first task for tomorrow morning.' },
          { text: 'Write me a diary entry.', why: 'Not a work wrap-up.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I feel like I use AI all day and still don\'t get through things.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Try tying AI to a few moments: inbox, plan, follow-ups, wrap-up. And keep an hour with it closed for real thinking.' },
          { text: 'Use it even more.', why: 'Structure, not more.' },
          { text: 'Stop using AI.', why: 'Use it more deliberately.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Tie saved prompts to [[1]]. Keep some time AI-[[2]].',
        blanks: [['moments'], ['free']],
        distractors: ['nights', 'heavy'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good with AI, or better AI-free?',
        groups: ['With AI', 'AI-free'],
        items: [
          { text: 'Sorting a busy inbox', group: 0 },
          { text: 'Sketching a new design idea', group: 1 },
          { text: 'Drafting follow-ups', group: 0 },
          { text: 'A one-to-one conversation with Tolu', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Tolu\'s routine is a problem?',
        lines: [
          '8:30 inbox sort',
          '9:00 plan the day',
          'AI open every minute, for every thought',
          '5:00 wrap up',
        ],
        bug: 2,
        fix: 'Keep an hour AI-free for deep work.',
        explanation: 'Constant prompting crowds out thinking.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s inbox prompt.',
        tiles: ['Sort', 'into', 'today,', 'this', 'week,', 'or', 'just', 'read'],
        distractors: ['delete'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'At what time does Ada wrap up? (e.g. 4:00)',
        answers: ['5:00', '5', '5pm', '5 pm', '17:00', '5.00'],
        placeholder: 'A time',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the benefit of a routine over random use?',
        options: [
          { text: 'The right prompt at the right time, without thinking about it' },
          { text: 'It uses more AI', why: 'It uses it better.' },
          { text: 'None', why: 'Routines save effort.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why plan the day at 9:00, not 3:00?',
        options: [
          { text: 'You can still shape the day before it fills up' },
          { text: 'AI works better in the morning', why: 'It\'s about your day.' },
          { text: 'No reason', why: 'Early planning helps.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Sketch your own AI day: which saved prompt at which moment, and when is AI closed?',
    starters: ['Morning:', 'AI-free time:'],
  },
  deepen: { title: 'Try it today', summary: 'Try a 5pm wrap-up prompt today: done, open, tomorrow\'s first task.' },
  notes: 'Content fictional.',
};

export default lesson;
