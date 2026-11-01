import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: the new team agreement on fairness, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: the fairness page',
  summary: 'Week 7. The team adds a new section to "How we run": how we share the hard stuff, and how we thank each other. Bisi says it\'s the first time she\'s seen fairness written down at any job. Tap through.',
  minutes: 11,
  outcomes: [
    'See every Chapter 4 tool in one short section',
    'Write fair rules for your own team',
    'Make recognition and workload part of how you run',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'How we run: fairness and thanks',
      text: 'Saturdays: one each a month, with a weekday off. On-call rotates weekly; no clinic messages after 8 p.m. Nobody carries more than 15 clinics a week. Hausa calls are Halima\'s, so her data clean-up is Emmanuel\'s. Friday: one line for every person, then shout-outs. Everyone says how they like to be thanked. Team chat is in English. Once a month we ask: is anyone carrying more than their share?',
      hotspots: [
        { phrase: 'Saturdays: one each a month, with a weekday off.', note: 'Procedural fairness: a clear rule, built together, and the hard work paid back.' },
        { phrase: 'no clinic messages after 8 p.m.', note: 'Fewer demands: burnout prevention by fixing the job, not the coping.' },
        { phrase: 'Nobody carries more than 15 clinics a week.', note: 'A workload limit, so the best people don\'t burn out first.' },
        { phrase: 'Hausa calls are Halima\'s, so her data clean-up is Emmanuel\'s.', note: 'Fair isn\'t identical: strengths respected, load shared.' },
        { phrase: 'Friday: one line for every person, then shout-outs.', note: 'Specific recognition for everyone, plus recognition from peers.' },
        { phrase: 'Everyone says how they like to be thanked.', note: 'Recognition their way.' },
        { phrase: 'Team chat is in English.', note: 'Belonging: removing an accidental barrier.' },
        { phrase: 'is anyone carrying more than their share?', note: 'The monthly review that stops the drift back to "whoever\'s free".' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A fairness section: clear rules for hard work, workload limits, strengths with balance, recognition for everyone, belonging, and a monthly check.',
    },
  ],
  apply: {
    scenario: 'Line check, the fairness page.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why write fairness down at all?',
        options: [
          { text: 'For HR', why: 'It\'s for the team.' },
          { text: 'Because Folake asked', why: 'The team chose it.' },
          { text: 'Unwritten fairness drifts; written rules can be checked' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 4 tool is it?',
        groups: ['Fairness', 'Workload', 'Belonging'],
        items: [
          { text: 'One Saturday each, with a day off', group: 0 },
          { text: 'Max 15 clinics a week', group: 1 },
          { text: 'Team chat in English', group: 2 },
          { text: 'Monthly share check', group: 0 },
          { text: 'No messages after 8 p.m.', group: 1 },
          { text: 'Ask how they like thanks', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'First time I\'ve seen fairness written down at any job.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'You wrote most of it. Thank you for telling me about the Saturdays. None of this happens without that.' },
          { text: 'I know, I\'m a great manager.', why: 'The team built it, starting with Bisi.' },
          { text: 'Don\'t get used to it.', why: 'Undoes the point.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Fair isn\'t ___ tasks; it\'s a fair share. (one word)',
        answers: ['identical', 'Identical', 'equal', 'same'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why limit clinics to 15 a week?',
        options: [
          { text: 'To slow everyone down', why: 'It\'s about sustainability.' },
          { text: 'So the most committed people don\'t get loaded until they burn out' },
          { text: 'Because 15 is lucky', why: 'It protects people.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'A draft line. Which one breaks Chapter 4?',
        lines: [
          'On-call rotates weekly.',
          'Bisi takes all angry clinics, because she\'s best at them.',
          'Friday: one line for every person.',
        ],
        bug: 1,
        fix: 'Angry clinics go to their owner, with Bisi as backup.',
        explanation: '"Because she\'s best at it" is how the best people end up overloaded.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the fairness section in order.',
        lines: ['Rules for the hard work', 'Workload limits', 'Strengths, with balance', 'Recognition and belonging', 'The monthly check'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the research.',
        pairs: [
          ['Rota built together', 'Procedural justice'],
          ['No messages after 8 p.m.', 'Job demands–resources'],
          ['Team chat in English', 'Social belonging'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Written fairness can be [[1]]. Unwritten fairness [[2]].',
        blanks: [['checked'], ['drifts']],
        distractors: ['ignored', 'grows'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the monthly question.',
        tiles: ['Anyone', 'carrying', 'more', 'than', 'their', 'share?'],
        distractors: ['less'],
      },
    ],
  },
  reflect: {
    prompt: 'Write three fairness rules for a group you\'re in: how hard work is shared, how people are thanked, and how you\'ll check.',
    starters: ['1. ...', '2. ...', '3. ...'],
  },
  deepen: {
    title: 'Add a fairness line',
    summary: 'If your team has any written agreement, add one line about how unpopular work is shared. Review it in a month.',
  },
  notes: 'Synthesis of Chapter 4 tools: procedural and distributive fairness (Adams; Colquitt), job demands–resources (Bakker & Demerouti), recognition (Gallup & Workhuman), belonging (Walton & Cohen). Fictional page.',
};

export default lesson;
