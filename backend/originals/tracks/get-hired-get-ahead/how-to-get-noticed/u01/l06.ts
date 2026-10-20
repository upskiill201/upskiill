import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 6 — skills hiding in hobbies (tap to explore). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Skills hiding in your hobbies',
  summary: 'Clinton almost leaves football off his list: "It\'s just a hobby." Miracle makes him describe one Saturday as captain, line by line. Every line hides a skill employers pay for.',
  minutes: 11,
  outcomes: ['Find skills inside a hobby', 'Explain a hobby in terms an employer cares about', 'Pick which hobbies are worth mentioning'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of Clinton\'s Saturday',
      text: 'Every Saturday I captain the Computer Science football team. On Friday I message eleven players to check who\'s free. When two drop out, I find replacements from the reserves list. I agree kick-off times with the other captains. After matches, I post the results and the next fixture in the faculty group. When we lost six games in a row, I set up a Wednesday practice, and we won four of the next five.',
      hotspots: [
        { phrase: 'I message eleven players to check who\'s free', note: 'Communication and organising: getting a group to commit, on time, every week.' },
        { phrase: 'I find replacements from the reserves list', note: 'Problem-solving under pressure: something goes wrong, and he fixes it before it becomes a crisis.' },
        { phrase: 'I agree kick-off times with the other captains', note: 'Negotiation: finding a time that works for people who want different things.' },
        { phrase: 'I post the results and the next fixture', note: 'Reliability and written communication: people depend on him for clear information.' },
        { phrase: 'we won four of the next five', note: 'Leadership with a result. A number like this is gold on a CV and in interviews.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A hobby is worth mentioning when you did something in it: organised, taught, built, fixed, led or improved. "I like football" isn\'t. "I captain a team and turned a losing run around" is.',
    },
  ],
  apply: {
    scenario: 'Clinton mines his hobbies.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of being captain to the skill it shows.',
        pairs: [
          ['Agreeing kick-off times with other captains', 'Negotiation'],
          ['Finding replacements when players drop out', 'Problem-solving'],
          ['Starting Wednesday practice after a losing run', 'Leadership'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which hobby line is worth putting in front of an employer?',
        options: [
          { text: '"I like football."', why: 'Liking something shows no skill. Doing something in it does.' },
          { text: '"I watch a lot of football."', why: 'Still no skill shown.' },
          { text: '"I captain a team and turned a six-game losing run into four wins in five."' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth mentioning to an employer, or not?',
        groups: ['Worth it', 'Leave it'],
        items: [
          { text: 'Teaching yourself to edit videos and making the meet-up\'s promo clips', group: 0 },
          { text: 'Liking music', group: 1 },
          { text: 'Running a chess club\'s weekly tournament', group: 0 },
          { text: 'Enjoying films', group: 1 },
          { text: 'Leading the church choir\'s fundraising', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Football is just a hobby. Recruiters don\'t care about football.',
        options: [
          { text: 'They care about what you do as captain: organising, negotiating, leading. That\'s what you mention.' },
          { text: 'True, delete it.', why: 'He\'d delete his best leadership story.' },
          { text: 'Only if the recruiter likes football.', why: 'It\'s not about football. It\'s about the skills inside it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that shows no skill.',
        lines: ['I post the fixtures for 300 students every week.', 'I\'ve supported the same club since I was six.', 'I set up a new practice that turned our results around.'],
        bug: 1,
        explanation: 'Loyalty is nice, but being a fan shows no skill an employer can use.',
      },
      {
        kind: 'mcq',
        prompt: 'What makes "we won four of the next five" so strong?',
        options: [
          { text: 'It\'s a result with a number, so it\'s proof, not a claim' },
          { text: 'Employers love football', why: 'Some do. But the number is what makes it proof.' },
          { text: 'It\'s short', why: 'Short helps, but it\'s the measurable result that convinces.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'A hobby counts when you [[1]] something in it, not just [[2]] it.',
        blanks: [['did'], ['liked', 'enjoyed']],
        distractors: ['bought', 'watched', 'paid'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which skill does each hobby moment show?',
        groups: ['Teaching', 'Creativity', 'Money and planning'],
        items: [
          { text: 'Showing new members how to set up their laptops', group: 0 },
          { text: 'Designing the meet-up\'s poster', group: 1 },
          { text: 'Keeping the choir trip\'s budget under 200,000 francs', group: 2 },
          { text: 'Writing a song for the end-of-year show', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A result with a ___ (like "four wins in five") turns a claim into proof. (one word)',
        answers: ['number', 'figure', 'numbers'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Clinton has room for one hobby on his CV. Which line should he use?',
        options: [
          { text: '"Football, music, films, travel."', why: 'A list of likes. No skills, no proof.' },
          { text: '"Captain, Computer Science football team: organise 15 players weekly; started a practice that turned a losing run into 4 wins in 5."' },
          { text: '"Sports."', why: 'Says almost nothing.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Pick your favourite hobby. Describe one normal day of it, line by line, like Clinton\'s Saturday. Which line hides a skill?',
    starters: ['In my hobby, I...', 'The line that hides a skill is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Do Clinton\'s exercise for your hobby: five lines describing what you do, then the skill hiding in each. Add the best two to your skills list.',
  },
  notes: '200,000 CFA francs (XAF) is a plausible small trip budget in Cameroon; currency in cast-appropriate local units, playbook voice rules.',
};

export default lesson;
