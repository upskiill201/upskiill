import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 9 — a skills plan: "learn everything" vs. two skills with actions. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Two skills, not twenty',
  summary: 'Clinton\'s skills list has 17 items: product management, design, data, marketing, SQL, public speaking... Miracle crosses out 15 of them. "Pick two. Tell me what you\'ll do this month for each."',
  minutes: 11,
  outcomes: ['Choose two skills to build', 'Attach real actions to each', 'Measure progress'],
  learn: [
    {
      kind: 'compare',
      title: 'Two skills plans',
      before: { label: 'Seventeen skills', text: '"Learn: product management, UX design, data analysis, SQL, marketing, public speaking, leadership, finance, writing..."\n\nAll useful. None will get real attention. In three months, he\'s started six courses and finished none.' },
      after: { label: 'Two skills, with actions', text: '"1. User research: interview 10 drivers and support agents by June; Aïcha reviews my summaries.\n2. Writing product specs: write two specs for small features; get feedback from Aïcha and Ngozi.\nMeasure: Aïcha says my third summary needs no rewrite."\n\nTwo skills, real work, a reviewer, and a way to know it\'s working.' },
      notes: [
        'Pick two skills that fit your direction.',
        'Attach real work, not just courses.',
        'Find a reviewer and a sign of progress.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Two skills. Real work for each. A reviewer. A sign you\'re improving.',
    },
  ],
  apply: {
    scenario: 'Clinton narrows his skills list.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What went wrong with seventeen skills?',
        options: [
          { text: 'None got real attention; six courses started, none finished' },
          { text: 'Nothing', why: 'Too many to focus on.' },
          { text: 'The skills were useless', why: 'They were useful; just too many.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the skills plan in order.',
        lines: ['Pick two skills', 'Attach real work to each', 'Find a reviewer', 'Define a sign of progress'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Real work, or just a course?',
        groups: ['Real work', 'Just a course'],
        items: [
          { text: 'Interview 10 drivers', group: 0 },
          { text: 'Watch a product management video series', group: 1 },
          { text: 'Write two specs for real features', group: 0 },
          { text: 'Collect course certificates', group: 1 },
          { text: 'Present findings to the team', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak skills-plan line.',
        lines: ['User research: interview 10 people by June.', 'Leadership: be a leader somehow.', 'Specs: write two, Aïcha reviews.'],
        bug: 1,
        explanation: 'No action, no reviewer, no measure.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Should I drop courses completely?',
        options: [
          { text: 'No: courses can help, but real work with a reviewer is where the skill gets built.' },
          { text: 'Yes, never learn anything new.', why: 'Courses help alongside real work.' },
          { text: 'Only do courses.', why: 'Real work builds the skill.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each skill to its action.',
        pairs: [
          ['User research', 'Interview 10 drivers and agents'],
          ['Product specs', 'Write two specs for small features'],
          ['Progress sign', 'Third summary needs no rewrite'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Who reviews Clinton\'s summaries?',
        options: [
          { text: 'Aïcha, the product manager' },
          { text: 'Nobody', why: 'Aïcha does.' },
          { text: 'Kemi', why: 'Aïcha does.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Two skills. Real [[1]]. A [[2]].',
        blanks: [['work'], ['reviewer']],
        distractors: ['courses', 'title', 'wish'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many skills were on Clinton\'s first list? (a number)',
        answers: ['17', 'seventeen'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Measurable sign of progress, or vague?',
        groups: ['Measurable', 'Vague'],
        items: [
          { text: 'Third summary needs no rewrite', group: 0 },
          { text: 'Feel better at it', group: 1 },
          { text: 'Two specs shipped', group: 0 },
          { text: 'Know more stuff', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Cross out all but two skills on your list. For each, what real work could you do this month?',
    starters: ['Skill 1:', 'Skill 2:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your two-skill plan: real work, a reviewer, and a sign of progress for each.',
  },
  notes: 'Learning through real work with feedback is consistent with deliberate-practice principles (Ericsson); kept qualitative.',
};

export default lesson;
