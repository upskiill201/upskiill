import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Myth or Fact: psychological safety (Edmondson 1999; Google Project Aristotle). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Psychological safety',
  summary: 'Lucía tells Diego about "psychological safety". He laughs: "So we all hold hands and nobody\'s allowed to disagree?" Tey: "Diego, you\'re going to love this one."',
  minutes: 11,
  outcomes: [
    'Know what psychological safety is, and what it isn\'t',
    'Know why Google found it mattered most in its best teams',
    'Recognise a team where people do and don\'t feel safe',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Psychological safety means everyone is nice and nobody disagrees.', isFact: false, explain: 'Myth. Harvard\'s Amy Edmondson, who named the idea, defines it as a shared belief that it\'s safe to take interpersonal risks: to speak up, ask a "stupid" question, admit a mistake or disagree, without being punished or humiliated. Safe teams often argue MORE, because people dare to.' },
        { text: 'Google found psychological safety was the most important factor in its effective teams.', isFact: true, explain: 'Fact. In Project Aristotle, Google studied 180 teams. Psychological safety came first, ahead of dependability, structure and clarity, meaning, and impact. How the team worked together mattered more than who was on it.' },
        { text: 'Teams with more safety report more errors.', isFact: true, explain: 'Fact, and the most surprising one. In Edmondson\'s early hospital research, better teams appeared to make more errors. They were reporting them: in safe teams people admitted mistakes, so they could be fixed.' },
        { text: 'Psychological safety means low standards.', isFact: false, explain: 'Myth. Edmondson describes the best teams as high in both safety AND standards. Low safety with high standards creates anxiety; high safety with low standards creates comfort. You want both high.' },
        { text: 'The leader\'s reactions shape safety more than any poster on the wall.', isFact: true, explain: 'Fact. Every time someone speaks up, the team watches how the leader responds. Lucía\'s "thank you for telling me" to Tomás did more than any workshop.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Safety isn\'t "nice". It\'s being able to speak up, admit mistakes and disagree without paying a price. Keep standards high too.',
    },
  ],
  apply: {
    scenario: 'Myth or fact, with Tey and Diego.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is psychological safety, in Edmondson\'s words?',
        options: [
          { text: 'Everyone being nice to each other', why: 'Safe teams can disagree a lot.' },
          { text: 'A shared belief that it\'s safe to take interpersonal risks, like speaking up or admitting a mistake' },
          { text: 'Never criticising work', why: 'Criticism is fine. Humiliation isn\'t.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Safety means no disagreement', group: 0 },
          { text: 'Safe teams report more of their errors', group: 1 },
          { text: 'Safety means low standards', group: 0 },
          { text: 'It came first in Project Aristotle', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: 'So we all hold hands and nobody\'s allowed to disagree?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Yes, exactly.', why: 'That\'s the myth.' },
          { text: 'Diego, please stop talking.', why: 'Ironic, given the topic.' },
          { text: 'The opposite. It means you CAN disagree with Lucía in a meeting and nobody punishes you for it.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Google\'s study of what makes teams effective was Project ___. (one word)',
        answers: ['Aristotle', 'aristotle'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why did better hospital teams seem to make MORE errors?',
        options: [
          { text: 'They felt safe to report them, so they could be fixed' },
          { text: 'They were worse at their jobs', why: 'The opposite.' },
          { text: 'They were lying', why: 'They were the honest ones.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mix to the result.',
        pairs: [
          ['High safety, high standards', 'Learning and great work'],
          ['Low safety, high standards', 'Anxiety'],
          ['High safety, low standards', 'Comfort'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s plan to build safety. Which idea won\'t help?',
        lines: [
          'Thank people every time they bring bad news.',
          'Put a "We Are Safe Here" poster in the kitchen.',
          'Admit one of my own mistakes in the team meeting.',
        ],
        bug: 1,
        fix: 'Ask "What am I missing?" in every meeting, and mean it.',
        explanation: 'Posters don\'t build safety; the leader\'s reactions do.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Project Aristotle\'s five dynamics in order of importance.',
        lines: ['Psychological safety', 'Dependability', 'Structure and clarity', 'Meaning', 'Impact'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The idea, in one line.',
        template: 'Safe to [[1]] up, admit [[2]] and [[3]].',
        blanks: [['speak'], ['mistakes'], ['disagree']],
        distractors: ['shut', 'agree'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the question a safe leader asks.',
        tiles: ['What', 'am', 'I', 'missing?'],
        distractors: ['Agreed?'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a team you\'ve been in. Did people admit mistakes and disagree openly? What did the leader do that made it feel safe, or not?',
    starters: ['In that team...', 'The leader...'],
  },
  deepen: {
    title: 'Go first',
    summary: 'If you lead people, admit one small mistake of your own this week, out loud. It\'s one of the fastest ways to show it\'s safe for others to do the same.',
  },
  notes: 'Amy C. Edmondson (1999), "Psychological Safety and Learning Behavior in Work Teams", Administrative Science Quarterly 44(2); earlier hospital study on error reporting (1996). Google re:Work, Project Aristotle (180 teams): psychological safety, dependability, structure & clarity, meaning, impact. Edmondson\'s safety/standards matrix (The Fearless Organization, 2018).',
};

export default lesson;
