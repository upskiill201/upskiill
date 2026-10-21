import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 20 — Unit Challenge. Outage week. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: outage week',
  summary: 'An outage, an angry client, a hard call with the bank, feedback for Tolu and a personal message. Every Unit 9 skill, in one week.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  xp: 30,
  outcomes: ['Use every Unit 9 skill in one hard week', 'Prove you can handle tricky conversations with AI\'s help'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 9\'s final challenge. Outage week, Monday to Friday.', replies: ['Let\'s go'] },
        { tey: 'The theme: AI helps you prepare, cool down and draft. You listen, own it and follow through. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Monday 10:15. Payments have been down for two hours.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Monday 10:16. Carmen\'s furious email arrives. First move?',
        options: [
          { text: 'Pause, and vent the first reply to the AI, not to Carmen' },
          { text: 'Reply right away explaining it was the bank', why: 'Defensive.' },
          { text: 'Ignore it until after the call', why: 'A short calm reply helps.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: '10:20. Order the calm reply.',
        lines: ['Acknowledge the impact', 'Own your part', 'Say what\'s fixed', 'Give the next step'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: '10:30. Which prep request?',
        options: [
          { text: 'Help me survive this call.', why: 'No goal or facts.' },
          { text: 'Here are the incident notes. Goal: keep Carmen\'s trust. Summarise the facts in five lines and list her 8 likely questions, hardest first.' },
          { text: 'Write my excuses.', why: 'Wrong goal.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: '11:00. Good agenda item or vague?',
        groups: ['Good', 'Vague'],
        items: [
          { text: 'Carmen\'s concerns (Carmen, 10 min)', group: 0 },
          { text: 'AOB', group: 1 },
          { text: 'Offer for shops: decide (all, 10 min)', group: 0 },
          { text: 'Next steps', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: '12:05. Which follow-up line wasn\'t agreed?',
        lines: ['Refund Monday\'s fees for affected shops', 'Tolu visits all shops by Friday', 'We guarantee no outages ever again', 'Update Thursday 4pm'],
        bug: 2,
        fix: 'We\'ve added an alert that warns us within minutes.',
        explanation: 'Only promise what was agreed and possible.',
      },
      {
        kind: 'sortGroups',
        prompt: '12:30. From the notes: decision, action or open question?',
        groups: ['Decision', 'Action', 'Open question'],
        items: [
          { text: 'Refund Monday\'s fees', group: 0 },
          { text: 'Tolu visits shops by Friday', group: 1 },
          { text: 'Maybe a text to shops', group: 2 },
          { text: 'Ada checks alert options', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tuesday. Which line of Ada\'s feedback to Tolu should change?',
        lines: ['On Monday, during the outage,', 'your phone was on silent for 40 minutes,', 'which shows you don\'t care.', 'What would help next time?'],
        bug: 2,
        fix: 'so shops waited longer for help.',
        explanation: 'Impact, not a judgement.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Wednesday. Which bank role-play request?',
        options: [
          { text: 'Pretend to agree.', why: 'No practice.' },
          { text: 'Act as the bank\'s partner manager, careful with money. I\'ll ask you to cover refunds. Push back realistically, one reply at a time.' },
          { text: 'Be extremely angry.', why: 'Unrealistic.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Wednesday. Match the negotiation idea to Ada\'s version.',
        pairs: [
          ['Bank\'s position', '"We won\'t pay"'],
          ['Bank\'s interest', 'Keep costs down, keep the partner'],
          ['Ada\'s BATNA', 'Her company pays the 2,400 GHS'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Wednesday. Carmen wants to pause the whole pilot for a month.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'I understand why a pause feels safer. We both want shops to trust the app; in our data, paused shops often didn\'t return. Could we try daily check-ins for two weeks instead? Her call.' },
          { text: 'That\'s a panic reaction.', why: 'Criticises the person.' },
          { text: 'OK, pause it.', why: 'Shops would lose out.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Thursday. Order the formal apology.',
        lines: ['What happened', 'Responsibility', 'Sorry', 'Repair', 'What changes', 'Next step'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Thursday. The update call is 4pm Lagos. What time in Mexico City? (e.g. 10am)',
        answers: ['9am', '9 am', '09:00', '9:00am', '9:00 am', '9'],
        placeholder: 'A time',
      },
      {
        kind: 'mcq',
        prompt: 'Thursday night. Tolu\'s grandmother has died. How should Ada write to him?',
        options: [
          { text: 'A few honest lines in her own words, no AI' },
          { text: 'An AI condolence template', why: 'Personal messages should be hers.' },
          { text: 'Wait until Monday', why: 'A short message now helps.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Friday. One-to-one with Tobi: win or problem?',
        groups: ['Win', 'Problem'],
        items: [
          { text: 'Carmen believed the apology', group: 0 },
          { text: 'Bank alerts still not live', group: 1 },
          { text: 'Pilot continues with check-ins', group: 0 },
          { text: 'Review slipped two days', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Friday. Complete Ada\'s rule for the week.',
        template: 'Vent to the [[1]]. Own it, fix it, follow up within the [[2]].',
        blanks: [['AI'], ['hour']],
        distractors: ['client', 'month'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Month 8. New problem: our marketing agency wants all shop owners\' names and phone numbers for a campaign, by tomorrow. Tolu says he\'ll just paste the list into an AI tool to tidy it up. OK?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Please hold off. That\'s personal data. Let me check what we\'re allowed to share and which tools we can use before anything gets pasted.' },
          { text: 'Sure, quicker that way.', why: 'Next unit: why not.' },
          { text: 'Send it straight to the agency.', why: 'Personal data needs rules.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the one idea behind all of Unit 9?',
        options: [
          { text: 'AI helps you prepare, cool down and draft; you listen, own it, and follow through' },
          { text: 'Let AI handle hard conversations', why: 'You handle them.' },
          { text: 'Avoid hard conversations', why: 'Handle them well.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You finished Unit 9! Which tricky conversation will you handle differently now?',
    starters: ['The conversation:', 'I\'ll...'],
  },
  deepen: { title: 'Coming next', summary: 'Unit 10: the paste that almost happened. Customer data, a deadline, and one very tempting paste.' },
  notes: 'Review of the whole unit. Content fictional.',
};

export default lesson;
