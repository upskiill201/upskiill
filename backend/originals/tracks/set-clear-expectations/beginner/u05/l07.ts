import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Step-by-step: the retrospective (Derby & Larsen, Agile Retrospectives 2006). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Look back, together',
  summary: 'Day 31. The shop is running. Before everyone moves on, Arjun books one hour with Kavya and Joel. Not to celebrate (that was last night) and not to blame. To learn what to keep and what to change. Tey gives him a shape.',
  minutes: 12,
  outcomes: [
    'Run a short retrospective in five steps',
    'Make it safe to be honest about what went wrong',
    'Leave with two or three changes, not a long list',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A retrospective in five steps',
      steps: [
        { title: '1. Set the stage', body: 'Say the purpose and one rule: "We\'re here to improve how we work, not to blame anyone." Esther Derby and Diana Larsen, who wrote the classic guide to retrospectives, start every one by making it safe.' },
        { title: '2. Gather what happened', body: 'Each person lists moments on a shared board: the four-word brief, two checkouts, the back channel, option B, Diwali eve, launch morning. Facts first, feelings welcome.' },
        { title: '3. Find the patterns', body: '"Most of our problems started when an expectation was only in someone\'s head." Look for the causes behind several moments, not just single mistakes.' },
        { title: '4. Decide two or three changes', body: 'Specific and owned: "Every brief has a definition of done on Day 1. Arjun." "We agree how we\'ll flag problems before launch week. Joel." Three changes you\'ll actually make beat twenty you won\'t.' },
        { title: '5. Close well', body: 'One thing each person appreciated about someone else. Then share the changes in writing, where the next project will start.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Two ways to look back',
      before: { label: 'Blame review', text: '"So what went wrong? Joel, the emails. Kavya, the countdown. Let\'s not do that again." (Everyone stares at the table.)' },
      after: { label: 'Retrospective', text: '"What patterns do we see?" Kavya: "Almost every problem started with something nobody wrote down." Joel: "Including what to do when stuck." Three changes, three owners. Everyone talks.' },
      notes: ['Blame finds people. Retrospectives find patterns.', 'The patterns were mostly Arjun\'s, and he said so first.', 'Three changes, owned, beat a long list of lessons.'],
    },
  ],
  apply: {
    scenario: 'Day 31, the retrospective.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['Set the stage', 'Gather what happened', 'Find the patterns', 'Decide two or three changes', 'Close well'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the one rule at the start?',
        options: [
          { text: 'Only the leader speaks', why: 'The opposite.' },
          { text: 'We\'re here to improve how we work, not to blame anyone' },
          { text: 'Keep it under ten minutes', why: 'Time matters less than safety.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Retrospective or blame review?',
        groups: ['Retrospective', 'Blame review'],
        items: [
          { text: '"What patterns do we see?"', group: 0 },
          { text: '"Joel, the emails."', group: 1 },
          { text: 'Three changes, each with an owner', group: 0 },
          { text: '"Let\'s just not do that again."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Can I say something about you, Arjun? Most of our problems started in your head.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Yes, and thank you for saying it. I agree. That\'s our first pattern. What would have helped most?' },
          { text: 'That\'s a bit unfair.', why: 'She was invited to be honest. It\'s also true.' },
          { text: 'Let\'s focus on you two.', why: 'Then nobody will be honest again.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Blame finds people. Retrospectives find ___. (one word)',
        answers: ['patterns', 'Patterns', 'causes'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why only two or three changes?',
        options: [
          { text: 'There were only three problems', why: 'There were many. Pick the most useful.' },
          { text: 'A few owned changes actually happen; twenty don\'t' },
          { text: 'To save time', why: 'It\'s about follow-through.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s change list. Which line won\'t happen?',
        lines: [
          'Every brief has a definition of done on Day 1. Owner: Arjun.',
          'Communicate better. Owner: everyone.',
          'Agree how to flag problems before launch week. Owner: Joel.',
        ],
        bug: 1,
        fix: 'Requests from clients come through one person. Owner: Arjun.',
        explanation: '"Communicate better, everyone" is vague and has no single owner.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the line.',
        pairs: [
          ['Set the stage', '"Not to blame anyone."'],
          ['Find the patterns', '"Almost every problem started unwritten."'],
          ['Close well', '"One thing I appreciated..."'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Three changes, [[1]], beat twenty you [[2]] make.',
        blanks: [['owned'], ['won\'t', 'never']],
        distractors: ['hidden', 'will'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the opening line.',
        tiles: ['We\'re', 'here', 'to', 'improve,', 'not', 'blame.'],
        distractors: ['punish'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you finished recently with others. Run a quick retrospective in your head: what patterns do you see? What two changes would you make?',
    starters: ['The pattern I see is...', 'Change 1: ...', 'Change 2: ...'],
  },
  deepen: {
    title: 'One hour, five steps',
    summary: 'After your next project, book one hour for a five-step retrospective. End with three changes and three owners. Put them where the next project starts.',
  },
  notes: 'Esther Derby & Diana Larsen, Agile Retrospectives: Making Good Teams Great (2006): set the stage, gather data, generate insights, decide what to do, close the retrospective. Norm Kerth\'s Prime Directive (Project Retrospectives, 2001): assume everyone did the best they could. Fictional events.',
};

export default lesson;
