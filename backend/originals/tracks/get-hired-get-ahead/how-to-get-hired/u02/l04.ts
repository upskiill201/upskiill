import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 4 — how to find your first internship. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Finding your first internship',
  summary: 'David needs a summer research internship, and he\'s starting from nothing. Clinton has done it once now. Together they write the five steps on a whiteboard in the library.',
  minutes: 12,
  outcomes: ['Plan an internship search with a calendar', 'Use both formal schemes and people', 'Tailor a short application for each one'],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to a first internship',
      steps: [
        { title: '1. Decide what you want to learn', body: 'Not "any internship". David writes: "Research in a lab, ideally on malaria." A clear goal makes every message easier.' },
        { title: '2. Make a deadline calendar', body: 'Formal schemes often close months before they start. List each one with its deadline. David finds two that close in three weeks.' },
        { title: '3. Use people as well as adverts', body: 'Ask lecturers, the careers office, alumni and your weak ties. David\'s professor knows a lab in Yaoundé that takes one student every summer, never advertised.' },
        { title: '4. Tailor a short application', body: 'A one-page CV and a short, specific note for each place: why them, what you\'ll bring, what you want to learn.' },
        { title: '5. Track and follow up', body: 'Same tracker as Chapter 1. One polite follow-up after a week or two. Keep going until you have a yes.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Goal, calendar, people, tailored applications, tracker. Start early: the best schemes close first.',
    },
  ],
  apply: {
    scenario: 'Clinton helps David find an internship.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['Decide what you want to learn', 'Make a deadline calendar', 'Use people as well as adverts', 'Tailor a short application', 'Track and follow up'],
      },
      {
        kind: 'mcq',
        prompt: 'Why make a deadline calendar?',
        options: [
          { text: 'Formal schemes often close months before they start' },
          { text: 'To look organised', why: 'The point is not missing deadlines.' },
          { text: 'Deadlines don\'t matter', why: 'Miss one and you wait a year.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific goal, or too vague?',
        groups: ['Specific', 'Too vague'],
        items: [
          { text: 'Lab research on malaria', group: 0 },
          { text: 'Any internship anywhere', group: 1 },
          { text: 'Front-end work at a fintech', group: 0 },
          { text: 'Something good', group: 1 },
          { text: 'Data entry is fine, whatever', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'I\'ll just apply to the big formal schemes. People are too scary.',
        options: [
          { text: 'Do both. Your professor might know a lab that never advertises, like the one in Yaoundé.' },
          { text: 'Good idea, ignore people.', why: 'Many internships come through people.' },
          { text: 'Only ask people, skip schemes.', why: 'Do both.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the step that will hurt David.',
        lines: ['Lists two schemes with deadlines in three weeks.', 'Sends the same generic CV to all ten places.', 'Asks his professor who he knows.'],
        bug: 1,
        explanation: 'Tailor each application: why them, what you bring, what you want to learn.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to David\'s action.',
        pairs: [
          ['Decide what you want to learn', 'Lab research on malaria'],
          ['Use people as well as adverts', 'Asks his professor'],
          ['Track and follow up', 'One polite follow-up after a week or two'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should David\'s note to the Yaoundé lab say?',
        options: [
          { text: 'Why that lab, what he\'ll bring, what he wants to learn' },
          { text: 'That he\'ll do anything', why: 'Too vague. Be specific.' },
          { text: 'His full life story', why: 'Short and specific.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Start [[1]]: the best schemes close [[2]].',
        blanks: [['early'], ['first']],
        distractors: ['late', 'never', 'last'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many steps are on the whiteboard? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful source for an internship, or not?',
        groups: ['Useful', 'Not useful'],
        items: [
          { text: 'Lecturers and professors', group: 0 },
          { text: 'Alumni of your course', group: 0 },
          { text: 'A site that charges you to apply', group: 1 },
          { text: 'The careers office', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What would you want to learn in an internship? Write it as specifically as David\'s "lab research on malaria".',
    starters: ['I want to learn...', 'Ideally at...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find three internships or schemes in your field and write their deadlines in a calendar. Add one person who might know of one that isn\'t advertised.',
  },
  notes: 'Internship search steps are standard careers guidance. David (shared cast) is in medical school. The Yaoundé lab is invented.',
};

export default lesson;
