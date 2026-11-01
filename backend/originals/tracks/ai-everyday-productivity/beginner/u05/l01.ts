import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story with a choice: double-booked. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Double-booked',
  summary: 'Day 23, 7:02 a.m. Doña Lupe calls from Oaxaca: her nephew booked a wedding into Casa Lupe on Day 30. Sixty guests, seven days, no venue. Lucía\'s thumb is already typing "WHAT DO I DO".',
  minutes: 12,
  outcomes: [
    'Describe a problem before asking AI to solve it',
    'Separate what\'s fixed from what\'s flexible',
    'Ask for options, not one answer',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 23, 7:02 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Doña Lupe, close to tears: "Mija, my nephew took a wedding for the 30th. I\'m so sorry. I\'ll return your MX$5,000 deposit today."' },
        { speaker: 'lucia', text: 'Seven days. Sixty guests. My parents. No venue.' },
        { speaker: 'narrator', text: 'She types into an AI chat: "WHAT DO I DO". The reply: "I\'m sorry to hear that! Here are some tips for dealing with stress: take deep breaths, make a list, stay positive."' },
        { speaker: 'tey', text: 'A panicked question gets a generic answer. Even in a crisis, the tool needs the problem, not the panic. What should she do?' },
      ],
      choice: {
        prompt: 'What should Lucía do?',
        options: [
          { text: 'Breathe, write down what\'s fixed (date, 60 guests, Oaxaca, budget) and what could change, then ask AI for at least five options.', outcome: 'Yes. Two minutes of writing turns "WHAT DO I DO" into a problem with edges. The AI suggests seven options; two are real, and one she\'d never have thought of: Doña Lupe\'s cousin has a hacienda twenty minutes away.', best: true },
          { text: 'Ask AI "what should I do?" and do exactly what it says.', outcome: 'It suggests "postpone the party". It doesn\'t know the date is their anniversary and can\'t move. Handing the decision to a tool that doesn\'t know the problem is just panic with extra steps.' },
          { text: 'Cancel the party and tell everyone it\'s off.', outcome: 'A week is tight, not impossible. She\'d cancel before even knowing her options.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'In a crisis, describe the problem before you ask for help: what happened, what\'s fixed, what\'s flexible, by when. Then ask for options, not an answer.',
    },
  ],
  apply: {
    scenario: 'No venue, seven days.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did "WHAT DO I DO" get stress tips?',
        options: [
          { text: 'It only had her panic to go on, not the problem' },
          { text: 'The AI was being rude', why: 'It answered the only thing it was given.' },
          { text: 'AI can\'t help with venues', why: 'With the problem, it suggested seven options.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fixed, or flexible?',
        groups: ['Fixed', 'Flexible'],
        items: [
          { text: 'The date: Day 30, their anniversary', group: 0 },
          { text: 'The type of venue', group: 1 },
          { text: 'About 60 guests', group: 0 },
          { text: 'Indoor or outdoor', group: 1 },
          { text: 'The time of day', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Easy: ask it "what should I do?" and follow it exactly.',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'Good plan.', why: 'It suggested moving a date that can\'t move.' },
          { text: 'It doesn\'t know what can\'t change. I give it the problem, it gives me options, I decide.' },
          { text: 'AI is useless in a crisis.', why: 'With the problem described, it found the hacienda.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The crisis rule.',
        template: 'Describe the [[1]], not the panic. Ask for [[2]], not an answer.',
        blanks: [['problem'], ['options']],
        distractors: ['feelings', 'sympathy'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Lucía\'s problem description is wrong?',
        lines: [
          'The date could move to next month.',
          '60 guests, in or near Oaxaca.',
          'Budget for the venue: about MX$10,000.',
        ],
        bug: 0,
        fix: 'Date is fixed: Day 30, their anniversary.',
        explanation: 'If she tells the AI the date is flexible, "postpone" becomes its top suggestion.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt gives Lucía the most useful options?',
        options: [
          { text: 'Our party venue in Oaxaca cancelled. Fixed: Day 30, about 60 guests, near Oaxaca city, venue budget about MX$10,000. Flexible: indoor or outdoor, time, type of place. Give me at least 5 options, including unusual ones.' },
          { text: 'Venue cancelled, help!!', why: 'Panic, no details.' },
          { text: 'What\'s the best venue in Oaxaca?', why: 'Best for whom, when, for how much?' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the option to its catch.',
        pairs: [
          ['Postpone the party', 'The anniversary can\'t move'],
          ['Tía Carmela\'s courtyard', 'No roof if it rains'],
          ['A restaurant\'s private room', 'Fits only 40'],
          ['The cousin\'s hacienda', 'Twenty minutes out of town'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much deposit is Doña Lupe returning, in pesos? (A number.)',
        answers: ['5000', '5,000', 'MX$5,000', 'MX$5000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s first ten minutes.',
        lines: ['Breathe', 'Write what\'s fixed and flexible', 'Ask AI for 5+ options', 'Cross out the ones that break a fixed point', 'Call about the best two'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I heard. Are you okay??',
        prompt: 'Lucía\'s reply, ten minutes later?',
        options: [
          { text: 'No. It\'s over.', why: 'She has options now.' },
          { text: 'Shaky, but I have seven options and two calls to make. Doña Lupe\'s cousin has a hacienda.' },
          { text: 'The AI is handling it.', why: 'She\'s handling it, with AI\'s help.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a problem that\'s stressing you. Write one sentence for what happened, then what\'s fixed and what\'s flexible.',
    starters: ['What happened:...', 'Fixed:...', 'Flexible:...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Take a small real problem. Describe it to an AI tool with what\'s fixed and what\'s flexible, and ask for at least five options, including unusual ones. Cross out any that break a fixed point.',
  },
  notes: 'Doña Lupe (narrated) runs Casa Lupe in Oaxaca. Problem-framing (fixed constraints vs flexible variables, generate options before choosing) is standard problem-solving practice.',
};

export default lesson;
