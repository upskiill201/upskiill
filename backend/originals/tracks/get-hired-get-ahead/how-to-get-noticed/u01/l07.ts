import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 7 — saying it like an employer would: skill language and strong verbs. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Saying it like an employer would',
  summary: '"I ran the group chat" sounds like nothing. "I coordinated updates for 300 students" sounds like a job. Same thing, different words. Tey shows Clinton how to translate everyday life into the language employers use.',
  minutes: 11,
  outcomes: ['Swap weak words for strong, specific verbs', 'Translate an everyday activity into skill language', 'Keep it true while you make it sound professional'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Clinton writes: "I did the group chat for my department." Read it like a recruiter who has 200 of these. What do you picture?',
          replies: ['Not much', 'Someone posting memes?'],
        },
        {
          tey: 'Exactly. "Did" and "helped with" hide everything. Recruiters skim for strong verbs that say what you actually did: organised, coordinated, led, built, fixed, grew, explained, negotiated, trained.',
          replies: ['So what would Clinton say?'],
        },
        {
          tey: '"Coordinated weekly updates for a 300-student department group, keeping it to one clear post a day." Same chat. Now you can picture a person who\'s organised and writes clearly.',
          replies: ['Isn\'t that exaggerating?'],
        },
        {
          tey: 'Good instinct. The rule is: stronger words, same truth. "Coordinated" is fine, because he did. "Managed a communications team" is not: there was no team. If you couldn\'t explain it calmly in an interview, don\'t write it.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Stronger words, same truth. Start with a strong verb, add what you did and how big it was.',
    },
  ],
  apply: {
    scenario: 'Clinton rewrites his list in skill language.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each weak phrase to a stronger, true version.',
        pairs: [
          ['Did the group chat', 'Coordinated updates for 300 students'],
          ['Helped with the meet-up', 'Organised weekly meet-ups for 40 members'],
          ['Was in charge of football', 'Captained a 15-player team'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which verb is strongest for "I got the meet-up from 6 to 40 people"?',
        options: [
          { text: 'Helped', why: 'Hides how much he did.' },
          { text: 'Grew' },
          { text: 'Was involved in', why: 'Vague: involved how?' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that goes from "stronger" to "untrue".',
        lines: ['Coordinated updates for a 300-student group.', 'Managed a communications team of 12.', 'Organised weekly meet-ups for 40 members.'],
        bug: 1,
        explanation: 'There\'s no team of 12. One question in an interview and it falls apart.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong verb or weak verb?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'Organised', group: 0 },
          { text: 'Helped with', group: 1 },
          { text: 'Negotiated', group: 0 },
          { text: 'Did', group: 1 },
          { text: 'Trained', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'I tutor two first-years in anatomy every week. I wrote "helped some students". Better?',
        options: [
          { text: 'Try "Tutor two first-year medical students in anatomy every week." Specific and true.' },
          { text: 'Say "led a teaching programme".', why: 'Two students isn\'t a programme. Keep it true.' },
          { text: 'Leave it out, tutoring is normal.', why: 'Teaching is a real skill. Name it clearly.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the test for whether a line has gone too far?',
        options: [
          { text: 'If it sounds impressive, it\'s fine', why: 'Impressive and untrue is the worst combination.' },
          { text: 'If you couldn\'t explain it calmly in an interview, don\'t write it' },
          { text: 'If nobody could check it', why: 'Recruiters ask follow-up questions. Truth is the only safe test.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: '[[1]] words, same [[2]].',
        blanks: [['Stronger'], ['truth']],
        distractors: ['Longer', 'story', 'grade'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a strong line about the phone stall.',
        tiles: ['Diagnosed', 'phone', 'faults', 'and', 'explained', 'repairs', 'to', 'customers'],
        distractors: ['helped', 'stuff'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rewrite "helped with" as one strong verb for planning an event. (one word)',
        answers: ['organised', 'organized', 'planned', 'coordinated', 'ran'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which line would Miracle keep?',
        options: [
          { text: '"Responsible for various tasks related to events."', why: 'Long, vague, and no verb doing any work.' },
          { text: '"Organised 30 weekly meet-ups this year for up to 40 members."' },
          { text: '"Visionary community leader."', why: 'A big label with no proof.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Take two lines from your own skills list and rewrite them with a strong verb, what you did, and how big it was. Are they still 100% true?',
    starters: ['Before: ... After: ...', 'It\'s still true because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write ten strong verbs on a card (organised, built, fixed, grew, explained...). Keep it next to you when you write your CV in Chapter 3.',
  },
  notes: 'Action-verb guidance is standard careers advice (university careers services; NACE resume guidance). "Stronger words, same truth" sets up the honesty choice in l11 and Ch3.',
};

export default lesson;
