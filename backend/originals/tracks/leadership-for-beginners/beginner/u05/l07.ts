import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Chat with Tey: looking after yourself (WHO burnout definition; recovery and detachment). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Looking after yourself',
  summary: 'Monday, 6 a.m. Launch day is tomorrow. Lucía has slept five hours a night for a week, eaten crisps for dinner three times, and answered emails in the shower. She opens Tey before she opens her laptop.',
  minutes: 11,
  outcomes: [
    'Know what burnout is, and its early warning signs',
    'Know why recovery is part of performance, not a reward for it',
    'Set one boundary that protects your energy',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Good morning. How are you, honestly?',
          replies: ['Tired. Really tired.', 'Fine! Busy!'],
        },
        {
          tey: "Busy and tired after the week you've had makes sense. But it's worth watching. The World Health Organization describes burnout as coming from chronic workplace stress that hasn't been well managed. Three signs: exhaustion, feeling distant or cynical about your work, and feeling less effective.",
          replies: ['I\'m definitely exhausted.', 'What\'s the cynical one?'],
        },
        {
          tey: "Cynical sounds like \"what's the point?\" or snapping at people you like. Lucía, you snapped at Tomás on Saturday about a sticker. That's not you. That's a sign. Exhaustion alone after a crisis week is normal. All three for weeks is when it's serious.",
          replies: ['So what do I do? Launch is tomorrow.'],
        },
        {
          tey: 'Researchers like Sabine Sonnentag have found that recovering, especially mentally switching off from work in your free time, is linked to better well-being and energy the next day. Recovery isn\'t a reward for finishing. It\'s how you finish. Tonight: phone out of the bedroom by 10, a real dinner, eight hours if you can.',
          replies: ['And Tomás?'],
        },
        {
          tey: "Say sorry today. Short and real: \"I was short with you on Saturday. That was the tiredness, not you.\" Leaders who look after themselves look after their teams better. And your team is watching how you treat yourself, too.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Watch for exhaustion, cynicism and feeling less effective. Recovery is how you finish, not a reward. Switch off at night. Repair when you snap.',
    },
  ],
  apply: {
    scenario: 'Monday, 6 a.m., before the laptop.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How does the WHO describe burnout?',
        options: [
          { text: 'Being a bit tired after one long day', why: 'That\'s normal tiredness.' },
          { text: 'Coming from chronic workplace stress that hasn\'t been well managed' },
          { text: 'A sign of weakness', why: 'It\'s caused by stress that wasn\'t managed, not by weakness.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the burnout sign to how it sounds.',
        pairs: [
          ['Exhaustion', '"I\'m tired all the time."'],
          ['Cynicism', '"What\'s even the point?"'],
          ['Feeling less effective', '"I\'m not good at this anymore."'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps recovery, or blocks it?',
        groups: ['Helps', 'Blocks'],
        items: [
          { text: 'Phone out of the bedroom by 10', group: 0 },
          { text: 'Emails in the shower', group: 1 },
          { text: 'A real dinner', group: 0 },
          { text: 'Checking the tracker at 2 a.m.', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Morning! Ready for launch eve?',
        prompt: 'Lucía\'s best reply, remembering Saturday?',
        options: [
          { text: 'Morning! First: I was short with you on Saturday. That was tiredness, not you. Sorry.' },
          { text: 'Ready. Let\'s go.', why: 'Skips the repair he deserves.' },
          { text: 'Don\'t talk to me before coffee.', why: 'More of the same.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Recovery isn\'t a reward for finishing. It\'s how you ___. (one word)',
        answers: ['finish', 'Finish'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What has Sonnentag\'s research linked to better energy the next day?',
        options: [
          { text: 'Working through the night', why: 'The opposite.' },
          { text: 'Mentally switching off from work in your free time' },
          { text: 'Checking emails before bed', why: 'That keeps you switched on.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s launch-eve plan. Which line breaks it?',
        lines: [
          'Say sorry to Tomás this morning.',
          'Stay at the office until midnight, just in case.',
          'Phone out of the bedroom by 10.',
        ],
        bug: 1,
        fix: 'Leave by 7. The plan is ready, and the team knows their jobs.',
        explanation: 'A tired leader on launch day helps nobody. Rest is part of the plan.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Lucía\'s launch eve in order.',
        lines: ['Repair with Tomás', 'Final check-in at 4', 'Leave by 7', 'Phone away by 10'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Leaders who look after [[1]] look after their [[2]] better.',
        blanks: [['themselves'], ['teams', 'team']],
        distractors: ['emails', 'bosses'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s repair.',
        tiles: ['That', 'was', 'tiredness,', 'not', 'you.'],
        distractors: ['fault'],
      },
    ],
  },
  reflect: {
    prompt: 'Which burnout sign do you notice in yourself first when you\'re stretched? What\'s one boundary that would protect your energy?',
    starters: ['The first sign for me is...', 'One boundary: ...'],
  },
  deepen: {
    title: 'One boundary',
    summary: 'Pick one boundary for this week, like phone out of the bedroom, or no work messages after 8. Tell one person, so it sticks.',
  },
  notes: 'World Health Organization, ICD-11 (2019): burn-out as an occupational phenomenon resulting from chronic workplace stress not successfully managed; three dimensions (exhaustion, mental distance/cynicism, reduced professional efficacy). Sabine Sonnentag: psychological detachment from work during off-job time and next-day well-being (e.g. Sonnentag & Fritz 2007; Sonnentag 2012). Repair after a lapse: standard relationship guidance. Not medical advice.',
};

export default lesson;
