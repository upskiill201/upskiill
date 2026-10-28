import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 2 — one idea per slide. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'One idea per slide',
  summary: 'AI loves to fill slides with bullet points. People listening can\'t read and listen at once. One idea per slide, said in the title.',
  minutes: 12,
  outcomes: [
    'Turn a crowded slide into one clear idea',
    'Write slide titles that are the point',
    'Move detail into speaker notes',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Slide 3, before and after',
      before: {
        label: 'AI\'s first draft',
        text: 'Title: "Pilot Results"\n- 50 shops recruited across 2 markets\n- 3,000 payments in 4 weeks\n- Payments grew from 400 to 600/week\n- Failure rate 4%\n- 6 shops at risk\n- Settlement delay resolved\n- Costs 300 GHS per shop',
      },
      after: {
        label: 'One idea',
        text: 'Title: "Shops are using it more every week"\nOne line chart: weekly payments, 400 to 600.\n(Speaker notes: 50 shops, two markets, failure rate about 1 in 25.)',
      },
      notes: [
        'Seven points became one idea, said in the title.',
        'The chart shows it; Ada says the rest.',
        'Detail moved to speaker notes, not lost.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'One idea per slide, written as the title. Picture or chart over bullets. Detail goes in the notes.',
    },
  ],
  apply: {
    scenario: 'Ada fixes her crowded slides.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why one idea per slide?',
        options: [
          { text: 'It saves ink', why: 'It\'s about attention.' },
          { text: 'People can\'t read lots of text and listen to you at the same time' },
          { text: 'Founders dislike text', why: 'Everyone struggles to read and listen.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Slide title that is the point, or just a label?',
        groups: ['The point', 'A label'],
        items: [
          { text: '"Shops are using it more every week"', group: 0 },
          { text: '"Pilot Results"', group: 1 },
          { text: '"It costs 300 GHS per shop"', group: 0 },
          { text: '"Costs"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request best fixes a crowded slide?',
        options: [
          { text: 'Make this slide better.', why: 'Vague.' },
          { text: 'This slide has 7 points. Find the one idea that matters most for founders, write it as a title, suggest one chart, and move the rest into speaker notes.' },
          { text: 'Make the font smaller.', why: 'Makes it worse.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build slide 3\'s title.',
        tiles: ['Shops', 'are', 'using', 'it', 'more', 'every', 'week'],
        distractors: ['Results'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Your slide only has one line. Where did all the numbers go?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'I deleted them.', why: 'They moved to notes.' },
          { text: 'The AI lost them.', why: 'Ada moved them on purpose.' },
          { text: 'They\'re in my speaker notes. I\'ll say them; the slide just shows the one thing to remember.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'One [[1]] per slide. Detail goes in the [[2]].',
        blanks: [['idea'], ['notes']],
        distractors: ['font', 'bin'],
      },
      {
        kind: 'findBug',
        prompt: 'Which slide breaks the one-idea rule?',
        lines: [
          'Slide 2: "The pilot is ahead of plan"',
          'Slide 3: "Shops are using it more every week"',
          'Slide 4: "Costs, risks, team, timeline and next steps"',
          'Slide 5: "It costs 300 GHS per shop"',
        ],
        bug: 2,
        fix: 'Split it into separate slides, or keep only the most important one.',
        explanation: 'Five ideas on one slide.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match where each thing goes.',
        pairs: [
          ['The main idea', 'Slide title'],
          ['The evidence', 'One chart or picture'],
          ['Supporting numbers', 'Speaker notes'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many points were on the AI\'s first draft of slide 3?',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Ada fixes a slide.',
        lines: ['Find the one idea', 'Write it as the title', 'Pick one chart or picture', 'Move the rest to notes'],
      },
      {
        kind: 'sortGroups',
        prompt: 'On the slide, or in the notes?',
        groups: ['On the slide', 'In the notes'],
        items: [
          { text: 'The weekly payments chart', group: 0 },
          { text: 'Exact failure rate wording', group: 1 },
          { text: 'The title message', group: 0 },
          { text: 'The 6 at-risk shops', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "Pilot Results" a weak title?',
        options: [
          { text: 'It names a topic but doesn\'t say anything' },
          { text: 'It\'s too short', why: 'It\'s empty, not short.' },
          { text: 'It isn\'t weak', why: 'It says nothing.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look at a slide you made recently. What\'s its one idea? Rewrite the title as that idea.',
    starters: ['Old title:', 'New title:'],
  },
  deepen: { title: 'Try it today', summary: 'Take your most crowded slide and ask AI to find its one idea and move the rest to notes.' },
  notes: 'One idea per slide and assertion-style titles are supported by multimedia-learning research (Mayer) and the "assertion-evidence" approach (Alley). Figures fictional.',
};

export default lesson;
