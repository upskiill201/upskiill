import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Reading: task conflict vs relationship conflict. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Task vs relationship conflict',
  summary: 'Arguing about step 3 is useful. Arguing about whether Grace is "the reason we\'re late" isn\'t. Priya shares what decades of research say about the two kinds of team conflict.',
  minutes: 12,
  outcomes: [
    'Tell task conflict from relationship conflict',
    'Know what research says about each',
    'Keep a disagreement about the work, not the person',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Two kinds of conflict',
      html: '<p>Researchers separate team conflict into two kinds:</p><ul><li><strong>Task conflict:</strong> disagreements about the work. "Should step 3 have one screen or two?"</li><li><strong>Relationship conflict:</strong> personal friction. "Grace is the reason we\'re always late."</li></ul><p>A 2003 meta-analysis by Carsten De Dreu and Laurie Weingart found that <strong>relationship conflict</strong> was strongly linked to worse team performance and lower satisfaction. Surprisingly, task conflict was too, on average.</p><p>A larger 2012 review by Frank de Wit, Lindred Greer and Karen Jehn added nuance: task conflict was <strong>not</strong> reliably harmful, and in some settings, like decision-making, it could help, especially when it didn\'t turn personal.</p><p>The practical lesson: disagreements about the work can be healthy. The danger is when they spill into the relationship. Femi\'s comment turned a task question (how to fix step 3) into a relationship one (Grace makes us late).</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Argue about the work, not the person. Task disagreements can help; personal ones almost always hurt.',
    },
  ],
  apply: {
    scenario: 'Two kinds of conflict.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Task conflict or relationship conflict?',
        groups: ['Task', 'Relationship'],
        items: [
          { text: '"One screen or two for step 3?"', group: 0 },
          { text: '"Grace is the reason we\'re late."', group: 1 },
          { text: '"Should we delay launch a week?"', group: 0 },
          { text: '"Femi never listens to anyone."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did De Dreu and Weingart (2003) find about relationship conflict?',
        options: [
          { text: 'It helped teams', why: 'It hurt them.' },
          { text: 'It had no effect', why: 'Strong negative links.' },
          { text: 'It was strongly linked to worse performance and lower satisfaction' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What did the 2012 review add about task conflict?',
        options: [
          { text: 'It wasn\'t reliably harmful and could help in some settings, if it stayed impersonal' },
          { text: 'It\'s always terrible', why: 'The later review found it more mixed.' },
          { text: 'It\'s always good', why: 'It depends on setting and tone.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the researchers to the finding.',
        pairs: [
          ['De Dreu and Weingart (2003)', 'Both kinds hurt, on average'],
          ['De Wit, Greer and Jehn (2012)', 'Task conflict is more mixed'],
          ['Both reviews', 'Relationship conflict hurts'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'So I shouldn\'t disagree with Grace\'s research at all?',
        prompt: "Priya's best reply?",
        options: [
          { text: 'Right, never disagree.', why: 'Task disagreements can help.' },
          { text: 'Disagree louder.', why: 'Volume pushes it personal.' },
          { text: 'Disagree about the research as much as you like. Just keep it about the findings, not about Grace.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Argue about the [[1]], not the [[2]].',
        blanks: [['work', 'task'], ['person']],
        distractors: ['weather', 'deadline'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was the De Dreu and Weingart meta-analysis published?',
        answers: ['2003'],
        placeholder: 'A year',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Femi\'s message turns task conflict personal?',
        lines: [
          'I think step 3 needs one screen, not two.',
          'Two screens add a tap for everyone.',
          'Grace overthinks everything.',
          'Can we test both versions?',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It attacks Grace instead of the design.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeps it about the work, or makes it personal?',
        groups: ['About the work', 'Personal'],
        items: [
          { text: '"The data shows 5 of 6 failed."', group: 0 },
          { text: '"You always slow us down."', group: 1 },
          { text: '"Can we test both versions?"', group: 0 },
          { text: '"Typical researcher."', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to turn a personal comment back into a task question.',
        lines: ['Notice it went personal', 'Name the real task issue', 'Ask about the work', 'Agree a next step'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a disagreement at work. Was it about the task, or did it become personal? What turned it?',
    starters: ['It was about...', 'It turned personal when...'],
  },
  deepen: {
    title: 'Psychological safety',
    summary: 'Amy Edmondson\'s research found that teams where people feel safe to speak up learn faster. Safe task disagreement depends on keeping relationships intact.',
  },
  notes: 'De Dreu & Weingart (2003), Journal of Applied Psychology 88(4); De Wit, Greer & Jehn (2012), "The paradox of intragroup conflict: A meta-analysis", Journal of Applied Psychology 97(2). Edmondson (1999), "Psychological safety and learning behavior in work teams", Administrative Science Quarterly 44(2).',
};

export default lesson;
