import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story: rollout week begins with a six-hour outage. Motivation under pressure. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Six hours down',
  summary: 'Week 8, Monday. Rollout week: 241 clinics live, 59 to go by Saturday 9 a.m. At 8:15 a.m., Afiya\'s servers go down. They come back at 2:20 p.m. Six hours gone. The board still says 241. Emmanuel says what everyone\'s thinking: "We\'re not going to make it."',
  minutes: 11,
  outcomes: [
    'See how pressure can crush or focus a team',
    'Notice what the leader\'s first words do',
    'Know this chapter\'s goal: keep the team going through its hardest week',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 8, Monday, 2:25 p.m.',
      beats: [
        { speaker: 'emmanuel', text: 'Six hours. Fifty-nine clinics. Five days. We\'re not going to make it.' },
        { speaker: 'narrator', text: 'Bisi is quiet. Halima looks at Miracle. Chidi is already doing maths on a sticky note. Folake has messaged three times: "Status?"' },
        { speaker: 'narrator', text: 'Miracle feels the panic too. Eight weeks ago, this team had a 2.1 out of 5 on motivation. Now they care, which is exactly why this hurts. Her next sentence will set the tone for the whole week.' },
      ],
      choice: {
        prompt: 'What should Miracle say?',
        options: [
          {
            text: '"It\'s a bad day. And 59 clinics in four and a half days is 13 a day. We did 15 last Thursday. Let\'s plan it together, now."',
            outcome: 'Chidi holds up his sticky note: "I got 13 too." The mood shifts from "impossible" to "hard". By 4 p.m. there\'s a plan on the board.',
            best: true,
          },
          {
            text: '"We HAVE to make it. Everyone stays late every night this week."',
            outcome: 'Everyone stays late on Monday. By Wednesday, two people are making mistakes, and Halima\'s eyes are red.',
          },
          {
            text: '"Don\'t worry, I\'ll tell Folake we\'ll be late."',
            outcome: 'The team relaxes, then deflates. Nobody asked them if they could do it.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Pressure can do two things to a motivated team: crush it, or focus it. The difference is often whether people believe it's possible, and whether they're treated like adults who can help solve it. <strong>This chapter:</strong> what pressure does to people, team confidence, running a hard week humanely, honest updates, celebrating, and the leader's own energy. Then Saturday: rollout.</p>",
    },
  ],
  apply: {
    scenario: 'Monday, 2:25 p.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did "13 a day, we did 15 last Thursday" change the mood?',
        options: [
          { text: 'It was a lie', why: 'It was true. That\'s why it worked.' },
          { text: 'It turned "impossible" into "hard, and we\'ve done it before"' },
          { text: 'It sounded confident', why: 'The evidence mattered more than the tone.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Focuses the team, or crushes it?',
        groups: ['Focuses', 'Crushes'],
        items: [
          { text: '"13 a day. We did 15 last Thursday."', group: 0 },
          { text: '"Everyone stays late every night."', group: 1 },
          { text: '"Let\'s plan it together, now."', group: 0 },
          { text: '"We HAVE to make it."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'We\'re not going to make it.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Stop being negative.', why: 'He\'s saying what everyone fears. Answer it.' },
          { text: 'You\'re right, probably not.', why: 'Gives up before checking.' },
          { text: 'It feels that way. Let\'s check the maths: 59 in four and a half days is 13 a day. We\'ve done 15. Hard, not impossible.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Pressure can crush a team or ___ it. (one word)',
        answers: ['focus', 'Focus'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s first hour in order.',
        lines: ['Name that it\'s a bad day', 'Do the real maths', 'Remind them of a past win', 'Plan it together'],
      },
      {
        kind: 'mcq',
        prompt: 'Why plan it together instead of handing out orders?',
        options: [
          { text: 'They know the clinics best, and they\'ll own a plan they built' },
          { text: 'Miracle has no idea', why: 'She has ideas. Theirs are better informed.' },
          { text: 'To share the blame', why: 'It\'s about ownership.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s message to Folake. Which line spreads panic?',
        lines: [
          'Servers were down six hours. We\'re at 241.',
          'Honestly, the team is falling apart.',
          'Plan: 13 a day. Next update at 6 p.m.',
        ],
        bug: 1,
        fix: 'The team has a plan on the board by 4 p.m.',
        explanation: 'It\'s not true, and it would make Folake panic too.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 4 review.',
        pairs: [
          ['Procedural fairness', 'A fair process'],
          ['Job resources', 'What protects people'],
          ['Belonging', 'Feeling part of the team'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'Keep the team [[1]] through its [[2]] week.',
        blanks: [['going', 'together'], ['hardest']],
        distractors: ['quiet', 'easiest'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s reframe.',
        tiles: ['Hard,', 'not', 'impossible.'],
        distractors: ['easy,'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time a big deadline suddenly looked impossible. What did someone say or do that made it feel possible, or not?',
    starters: ['It looked impossible when...', 'What helped (or didn\'t) was...'],
  },
  deepen: {
    title: 'Do the maths',
    summary: 'Next time something feels impossible, break it into per-day numbers and compare them with your best past day. Share that with the team.',
  },
  notes: 'Story setup. Collective efficacy and challenge framing under pressure (lessons 2–3). Fictional events.',
};

export default lesson;
