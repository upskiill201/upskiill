import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 4 — free. Map your network: you know more people than you think. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Map your network',
  summary: '"I know nobody." Miracle hands Clinton a blank page and a challenge: write down 30 people in 15 minutes. He gets to 47. A network isn\'t something you have to build from scratch; it\'s something you have to notice.',
  minutes: 12,
  outcomes: ['List the people you already know', 'Spot who might know someone in your field', 'Choose your first five people to contact'],
  learn: [
    {
      kind: 'steps',
      title: 'Your network in four steps',
      steps: [
        { title: '1. List everyone, fast', body: 'Fifteen minutes, no judging. Family, family friends, neighbours, classmates, lecturers, careers staff, people from church or mosque, sport, clubs, old school friends, people from events, people you\'ve messaged online. Clinton\'s list: 47 names.' },
        { title: '2. Mark who\'s near your field', body: 'Put a star next to anyone who works in, studies, or knows about your field. For Clinton: two meet-up speakers, a cousin in Douala who works in banking, a former student of Mrs Ewane\'s, a Njangi Pay developer.' },
        { title: '3. Ask "who might they know?"', body: 'Many people won\'t help directly, but they know someone who can. Clinton\'s aunt doesn\'t work in tech, but her best customer\'s son does. Write those second-step names too.' },
        { title: '4. Pick your first five', body: 'Choose five starred names to contact this week: people you know a little, in or near your field. Write one line for each: how you\'re connected and what you\'d ask.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Most people\'s networks are bigger than they think. You don\'t need to know the CEO; you need to know someone who knows someone.',
    },
  ],
  apply: {
    scenario: 'Clinton maps his network.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the four steps in order.',
        lines: ['List everyone, fast', 'Mark who\'s near your field', 'Ask "who might they know?"', 'Pick your first five'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Should Clinton include them on his list?',
        groups: ['Include', 'Leave off'],
        items: [
          { text: 'His aunt from the phone stall', group: 0 },
          { text: 'A former classmate now in Douala', group: 0 },
          { text: 'A celebrity he\'s never met', group: 1 },
          { text: 'The pastor who runs the youth group', group: 0 },
          { text: 'Someone he\'s never had any contact with', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why write down people who aren\'t in your field?',
        options: [
          { text: 'They might know someone who is' },
          { text: 'To make the list look longer', why: 'It\'s about second-step connections.' },
          { text: 'They can give you a job anyway', why: 'Usually not, but they can introduce you.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'My aunt fixes phones. She can\'t help me get into fintech.',
        options: [
          { text: 'Maybe not directly, but her customers might work in fintech. I\'ll ask who she knows.' },
          { text: 'True, cross her off.', why: 'She may know someone who knows someone.' },
          { text: 'Ask her for a fintech job.', why: 'She doesn\'t have one, but she might have a name.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the first-five choice that\'s too big a jump.',
        lines: ['Tchami, meet-up speaker, fintech developer', 'Njangi Pay\'s CEO, never met, no connection', 'Mrs Ewane\'s former student, now at a Douala start-up'],
        bug: 1,
        explanation: 'No connection at all. Start with people you know a little.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to how they might help.',
        pairs: [
          ['Tchami (meet-up speaker)', 'Advice about fintech roles'],
          ['His aunt', 'An introduction to a customer\'s son in tech'],
          ['Mrs Ewane', 'Former students working in Douala'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How many names should Clinton aim for in 15 minutes?',
        options: [
          { text: 'About 30 or more, without judging' },
          { text: 'Three', why: 'Too few. List everyone first, then choose.' },
          { text: 'Only people with good jobs', why: 'List everyone first. Judge later.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s point.',
        template: 'You don\'t need to know the [[1]]; you need to know someone who knows [[2]].',
        blanks: [['CEO', 'boss'], ['someone']],
        distractors: ['everyone', 'nobody', 'president'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many people does Clinton pick to contact first? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Star them (near his field), or not?',
        groups: ['Star', 'No star'],
        items: [
          { text: 'A Njangi Pay developer', group: 0 },
          { text: 'A cousin in banking in Douala', group: 0 },
          { text: 'His football team\'s goalkeeper (studies law)', group: 1 },
          { text: 'A meet-up speaker from a fintech', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Give yourself 15 minutes. Write down as many people as you can. How many did you get, and who surprised you?',
    starters: ['I got to...', 'Someone I forgot about is...'],
  },
  deepen: {
    title: 'Your new kit, piece 1',
    summary: 'Make your network map: everyone you know, stars by people near your field, and your first five with one line each. This is piece 1 of your job-search kit for this course.',
  },
  notes: 'Network-mapping exercise adapted from common careers-service practice. Links to weak-ties research (l02).',
};

export default lesson;
