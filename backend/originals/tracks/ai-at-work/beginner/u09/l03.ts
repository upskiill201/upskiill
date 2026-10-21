import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 3 — follow-ups that get done. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Follow-ups that get done',
  summary: 'The call went better than feared. Now the most important part: the follow-up email, sent within the hour, that turns promises into actions.',
  minutes: 12,
  outcomes: [
    'Write a follow-up email in five parts',
    'Turn what was said into owned actions',
    'Send it quickly',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The five-part follow-up',
      steps: [
        { title: '1. Thanks and one-line summary', body: '"Thanks for the call. We agreed how to make this right for the shops."' },
        { title: '2. Decisions', body: '"We\'ll refund all fees for Monday and visit every affected shop this week."' },
        { title: '3. Actions with owners and dates', body: '"Tolu: visits by Friday. Ada: bank alert in place by Wednesday."' },
        { title: '4. Open questions', body: '"Carmen to confirm whether shops want a text message too."' },
        { title: '5. Next contact', body: '"I\'ll send an update Thursday at 4pm."' },
        { title: 'With AI', body: 'Paste your call notes: "Draft a follow-up in these five parts. Only include what we agreed." Then check every promise before sending.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Thanks, decisions, owned actions with dates, open questions, next contact. Send within the hour. Check every promise first.',
    },
  ],
  apply: {
    scenario: '12:05. The call has ended.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the follow-up.',
        lines: ['Thanks and summary', 'Decisions', 'Actions with owners and dates', 'Open questions', 'Next contact'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request drafts the best follow-up?',
        options: [
          { text: 'Write a follow-up email.', why: 'No notes or structure.' },
          { text: 'From these call notes, draft a follow-up: thanks, decisions, actions with owners and dates, open questions, next contact. Only include what we agreed.' },
          { text: 'Make it sound reassuring.', why: 'Reassuring can mean overpromising.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the AI draft wasn\'t agreed on the call?',
        lines: [
          'Refund all fees for Monday',
          'Tolu visits every affected shop by Friday',
          'We guarantee this will never happen again',
          'Next update Thursday 4pm',
        ],
        bug: 2,
        fix: 'We\'ve added an alert so we spot bank issues within minutes.',
        explanation: 'Nobody can guarantee "never". Only send what was agreed.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear action, or vague?',
        groups: ['Clear', 'Vague'],
        items: [
          { text: 'Tolu: visit affected shops by Friday', group: 0 },
          { text: 'We\'ll look into it', group: 1 },
          { text: 'Ada: bank alert by Wednesday', group: 0 },
          { text: 'Someone will follow up', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Thanks for the follow-up so fast. Carmen calmed down a lot reading it.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Glad it helped. I\'ll stick to Thursday\'s 4pm update, and flag anything sooner if it comes up.' },
          { text: 'Phew, crisis over.', why: 'The actions still need doing.' },
          { text: 'The AI wrote it.', why: 'Ada owns it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Send within the [[1]]. Check every [[2]] first.',
        blanks: [['hour'], ['promise']],
        distractors: ['month', 'font'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'When is Ada\'s next update? (day)',
        answers: ['Thursday', 'thursday'],
        placeholder: 'A day',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to Ada\'s line.',
        pairs: [
          ['Decision', 'Refund fees for Monday'],
          ['Action', 'Tolu: visits by Friday'],
          ['Open question', 'Do shops want a text message?'],
          ['Next contact', 'Update Thursday 4pm'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build an owned action.',
        tiles: ['Ada:', 'bank', 'alert', 'by', 'Wednesday'],
        distractors: ['someone'],
      },
      {
        kind: 'mcq',
        prompt: 'Why send within the hour?',
        options: [
          { text: 'Memories are fresh and the client sees you acting fast' },
          { text: 'Emails expire', why: 'It\'s about trust and accuracy.' },
          { text: 'No reason', why: 'Speed shows commitment.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Include in the follow-up, or leave out?',
        groups: ['Include', 'Leave out'],
        items: [
          { text: 'What was decided', group: 0 },
          { text: 'A long story about the bank\'s mistakes', group: 1 },
          { text: 'Who does what by when', group: 0 },
          { text: 'Promises nobody agreed', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should Ada check before hitting send?',
        options: [
          { text: 'That every promise in the draft was really agreed' },
          { text: 'The font', why: 'The promises.' },
          { text: 'Nothing; the AI was told the rules', why: 'Drafts can add things.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of your last meeting. Did anyone send a follow-up? What would the five parts have said?',
    starters: ['Decisions:', 'Actions:'],
  },
  deepen: { title: 'Try it today', summary: 'After your next meeting, paste your notes into AI and ask for the five-part follow-up. Send it within the hour.' },
  notes: 'Fictional incident and dates.',
};

export default lesson;
