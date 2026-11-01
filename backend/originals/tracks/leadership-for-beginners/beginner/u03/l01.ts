import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story: everyone is busy and the campaign is still behind. Busy is not the same as progress. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Busy on the wrong things',
  summary: 'Day 45. The team talks now. They work hard. Marta is redoing the social calendar for the third time, Diego is polishing a report nobody reads, and the summer campaign is still behind. "We\'re working so hard. Why aren\'t we getting anywhere?"',
  minutes: 11,
  outcomes: [
    'See the difference between busy and moving forward',
    'Notice how unclear goals make good people waste effort',
    'Know this chapter\'s goal: one clear direction everyone can repeat',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 45, Wednesday, 6:15 p.m.',
      beats: [
        { speaker: 'lucia', text: 'Quick question, everyone. What\'s the most important thing for the team this month?' },
        { speaker: 'marta', text: 'The social calendar.' },
        { speaker: 'diego', text: 'The quarterly report for Carmen.' },
        { speaker: 'tomas', text: 'Um... the newsletter? The test sends?' },
        { speaker: 'sofia', text: 'I thought it was the summer campaign. The chili-lime launch.' },
        { speaker: 'narrator', text: 'Five people. Four different answers. And the launch is in seven weeks. Lucía realises nobody is lazy. Nobody was told.' },
      ],
      choice: {
        prompt: 'What should Lucía do next?',
        options: [
          {
            text: 'Say it clearly: "The summer campaign is our number one. Tomorrow, let\'s decide together what we pause to make room."',
            outcome: 'Relief around the table. Diego asks, "So I can stop the report?" Lucía: "Let\'s check with Carmen. Probably shorter." Marta laughs for the first time in a week.',
            best: true,
          },
          {
            text: '"Okay, everyone work harder on everything."',
            outcome: 'Marta stays until 10 p.m. Nothing moves faster. Effort was never the problem.',
          },
          {
            text: 'Say nothing and quietly do the campaign herself.',
            outcome: 'Chapter 1\'s trap, back again. And four people stay busy on the wrong things.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>When people don't know what matters most, they decide for themselves, and they usually choose what's in front of them. In Google's Project Aristotle, <strong>structure and clarity</strong> (clear goals, roles and plans) was one of the five things that made teams effective. <strong>This chapter:</strong> clear goals, clear expectations, priorities, delegation and decisions. One direction everyone can repeat.</p>",
    },
  ],
  apply: {
    scenario: 'Day 45, the end of the day.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did five people give four answers?',
        options: [
          { text: 'They weren\'t paying attention', why: 'They were working hard. On different things.' },
          { text: 'Nobody had told them clearly what mattered most' },
          { text: 'They were lazy', why: 'Everyone was busy.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Busy, or moving forward?',
        groups: ['Just busy', 'Moving forward'],
        items: [
          { text: 'Redoing the social calendar a third time', group: 0 },
          { text: 'Booking the campaign photo shoot', group: 1 },
          { text: 'Polishing a report nobody reads', group: 0 },
          { text: 'Finishing the launch email', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: 'So I can stop the report?',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Yes, stop everything.', why: 'Carmen asked for it. Check first.' },
          { text: 'No, do both.', why: 'Then nothing changes.' },
          { text: 'Let me check with Carmen what she really needs. Probably a one-pager.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Project Aristotle, "structure and ___" was one of the five team dynamics. (one word)',
        answers: ['clarity', 'Clarity'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What was the real problem on Day 45?',
        options: [
          { text: 'Clarity, not effort' },
          { text: 'Effort, not clarity', why: 'They were all working hard.' },
          { text: 'Too many people', why: 'Five people pulling in four directions.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Lucía\'s fix in order.',
        lines: ['Name the number one priority', 'Decide together what to pause', 'Check with Carmen', 'Repeat the priority every week'],
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s message to the team. Which line brings the confusion back?',
        lines: [
          'This month, the summer campaign is our number one.',
          'But everything else is also top priority.',
          'Tomorrow, let\'s choose what we pause.',
        ],
        bug: 1,
        fix: 'If something has to slip, it\'s not the campaign.',
        explanation: 'If everything is top priority, nothing is.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 2 review.',
        pairs: [
          ['Psychological safety', 'Safe to speak up'],
          ['One-on-ones', 'Weekly, their agenda'],
          ['Blameless review', 'Fix the system'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'One clear [[1]] that everyone on the team can [[2]].',
        blanks: [['direction', 'goal', 'priority'], ['repeat', 'say']],
        distractors: ['forget', 'rule'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s lesson of the day.',
        tiles: ['Busy', 'is', 'not', 'the', 'same', 'as', 'progress.'],
        distractors: ['fast'],
      },
    ],
  },
  reflect: {
    prompt: 'If someone asked the people you work or study with "what matters most this month?", would they give the same answer? Would you?',
    starters: ['I think they\'d say...', 'I\'d say...'],
  },
  deepen: {
    title: 'The one-question test',
    summary: 'Ask two people you work with: "What\'s the most important thing for us this month?" If the answers don\'t match, you\'ve found a clarity problem.',
  },
  notes: 'Story setup. Structure & clarity as a team effectiveness dynamic: Google re:Work, Project Aristotle. Fictional product (chili-lime chips) and timeline.',
};

export default lesson;
