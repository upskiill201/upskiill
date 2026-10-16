import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story: the clinic visit. The team has never seen what its work does. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The clinic visit',
  summary: 'Week 2, Wednesday. Folake said yes. Miracle takes Bisi and Halima to a clinic in Ikorodu that went live last month. Nurse Adaeze shows them a mother getting her baby\'s test results on her phone in two hours instead of two weeks. Bisi goes very quiet.',
  minutes: 11,
  outcomes: [
    'See why people lose motivation when they can\'t see their impact',
    'Notice the difference between a ticket and a person',
    'Know this chapter\'s goal: connect everyday work to why it matters',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 2, Wednesday, Ikorodu',
      beats: [
        { speaker: 'narrator', text: 'Nurse Adaeze shows them her phone: a mother, Mrs Lawal, got her baby\'s malaria test result in two hours. Before Afiya, it took two weeks and three bus rides. "She cried in the waiting room," Adaeze says. "Good crying."' },
        { speaker: 'bisi', text: '(quietly) I onboarded this clinic. I remember the ticket. "Ikorodu, slow login." That was this.' },
        { speaker: 'halima', text: 'Four years, and nobody showed you this?' },
        { speaker: 'narrator', text: 'On the bus back, Bisi doesn\'t make a single joke. Miracle wonders how to bring this feeling back to the three people who weren\'t there.' },
      ],
      choice: {
        prompt: 'What should Miracle do with what they saw?',
        options: [
          {
            text: 'Ask Nurse Adaeze if she\'d join Monday\'s stand-up on video for five minutes, to say thank you herself.',
            outcome: 'Adaeze agrees. On Monday, Emmanuel stops eating mid-chin-chin. Chidi asks three questions. Nobody calls it a ticket for the rest of the day.',
            best: true,
          },
          {
            text: 'Write a long email to the team about the visit.',
            outcome: 'Nice email. Chidi skims it. Emmanuel doesn\'t open it. A story told second-hand loses most of its power.',
          },
          {
            text: 'Keep it as a nice memory for Bisi and Halima.',
            outcome: 'Bisi feels it for a week. The rest of the team stays exactly where it was.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Clinic Success had never seen a single patient. Their work looked like tickets, complaints and login problems. But on the other end of every ticket was a clinic, and on the other end of every clinic were mothers like Mrs Lawal. People work harder, and feel better, when they can see who their work helps. <strong>This chapter:</strong> why seeing your impact matters, what makes a job motivating, meaningful goals, and how to connect everyday work to purpose without cheesy speeches.</p>",
    },
  ],
  apply: {
    scenario: 'The clinic visit.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What changed for Bisi on the visit?',
        options: [
          { text: 'She got a raise', why: 'No money involved.' },
          { text: 'She saw the person behind one of her tickets' },
          { text: 'She liked the bus ride', why: 'She was quiet for a different reason.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'A ticket, or the person behind it?',
        groups: ['Ticket', 'Person'],
        items: [
          { text: '"Ikorodu, slow login"', group: 0 },
          { text: 'Mrs Lawal and her baby', group: 1 },
          { text: '"Ticket #4471 closed"', group: 0 },
          { text: 'Nurse Adaeze saying thank you', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Four years. I never knew what happened after they went live.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Well, now you know.', why: 'A moment, not a habit.' },
          { text: 'It\'s just a job, Bisi.', why: 'She just found out it isn\'t.' },
          { text: 'Then let\'s make sure everyone knows, every week. Would you help me find a clinic story for each Monday?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Two hours instead of two ___ for a test result. (one word)',
        answers: ['weeks', 'Weeks'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s plan in order.',
        lines: ['Visit a live clinic', 'See the impact first-hand', 'Bring the nurse to stand-up', 'Make a clinic story a weekly habit'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a nurse on video better than an email about the visit?',
        options: [
          { text: 'Hearing from the person helped is far more powerful than a second-hand story' },
          { text: 'Emails are banned', why: 'They just carry less.' },
          { text: 'It\'s shorter', why: 'It\'s about who tells it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s Monday plan. Which line weakens it?',
        lines: [
          'Five minutes: Nurse Adaeze on video.',
          'Then a 20-minute talk from me about why purpose matters.',
          'Then normal stand-up.',
        ],
        bug: 1,
        fix: 'Then Bisi shares which ticket that clinic was.',
        explanation: 'A lecture about purpose right after the real thing smothers it.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['Hygiene factor', 'Stops unhappiness'],
          ['Stay interview', 'Why do you stay?'],
          ['Theory Y', 'People want to do good work'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'Connect everyday [[1]] to the [[2]] it helps.',
        blanks: [['work', 'tasks'], ['people', 'person']],
        distractors: ['boss', 'tickets'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Bisi\'s realisation.',
        tiles: ['That', 'ticket', 'was', 'this.'],
        distractors: ['nothing.'],
      },
    ],
  },
  reflect: {
    prompt: 'Who is helped by your work or studies, at the very end of the chain? Have you ever met them, or heard from them?',
    starters: ['My work helps...', 'I\'ve heard from them when...'],
  },
  deepen: {
    title: 'Find the person',
    summary: 'Find one real story of someone your work has helped: a customer, a patient, a user, a classmate. Share it with one person you work with.',
  },
  notes: 'Story setup. Beneficiary contact and task significance: Grant (2007, 2008), lesson 2. Fictional clinic, nurse and patient.',
};

export default lesson;
