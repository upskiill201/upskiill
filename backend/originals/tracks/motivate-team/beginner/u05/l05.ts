import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapters 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the bell',
  summary: 'Week 8, Thursday, 5 p.m. The board says 284. Bisi\'s bell has rung 43 times since Monday. Everyone went home by 7 every night. Emmanuel did 16 clinics today, his best day ever. Quick check before Friday.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use pressure, team-confidence and hard-week tools without notes', 'Connect them to Chapters 1 to 4'],
  learn: [
    {
      kind: 'story',
      title: 'Week 8, Thursday, 5:00 p.m.',
      beats: [
        { speaker: 'emmanuel', text: 'Sixteen. SIXTEEN. I didn\'t know I could do sixteen.' },
        { speaker: 'bisi', text: '(ringing the bell) Two hundred and eighty-four! Sixteen to go! Go home, all of you!' },
        { speaker: 'chidi', text: 'Northern clinics: all 40 live. Through three power cuts.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Thursday.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Emmanuel have his best day ever in the hardest week?',
        options: [
          { text: 'Fear of Folake', why: 'Nobody used fear.' },
          { text: 'Clear targets, shared hard work, visible progress and a team that believed it could' },
          { text: 'Working until midnight', why: 'Everyone went home by 7.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put running a hard week in order.',
        lines: ['One clear daily target', 'Share the hard parts', 'Protect the basics', 'Two short check-ins a day', 'Make progress visible, hourly'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 5 tool is it?',
        groups: ['Team confidence', 'Hard week', 'Pressure'],
        items: [
          { text: '"We did 15 last Thursday."', group: 0 },
          { text: 'Home by 7 every night', group: 1 },
          { text: 'Frame it as a challenge', group: 2 },
          { text: 'Chidi\'s 40 northern clinics', group: 0 },
          { text: 'Bisi\'s bell', group: 1 },
          { text: 'No midnight shifts', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'I didn\'t know I could do sixteen.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'You should do sixteen every day.', why: 'Turns a win into a new demand.' },
          { text: 'Finally!', why: 'Sounds like he was failing before.' },
          { text: 'Now you do. Week 1 you did four. That\'s not luck, that\'s you getting really good at this.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A group\'s shared belief it can succeed: collective ___. (one word)',
        answers: ['efficacy', 'Efficacy'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What did Pencavel find about working past about 50 hours a week?',
        options: [
          { text: 'Extra hours added very little output' },
          { text: 'Output doubled', why: 'The opposite.' },
          { text: 'Nothing changed', why: 'Output per hour fell.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s Friday plan. Which line breaks Chapter 5?',
        lines: [
          '16 to go. Target: all of them by Saturday 9 a.m.',
          'Everyone stays tonight until we hit 300.',
          'Same check-ins, same bell, home by 7.',
        ],
        bug: 1,
        fix: 'On-call covers anything left tonight.',
        explanation: 'Throwing out the plan at the end undoes the week that worked.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to what it means.',
        pairs: [
          ['Task significance', 'Seeing who you help'],
          ['Progress principle', 'Small wins on meaningful work'],
          ['Collective efficacy', 'Together, we can'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why tell Emmanuel "Week 1 you did four"?',
        options: [
          { text: 'To embarrass him', why: 'It\'s celebrating growth.' },
          { text: 'It shows his growth, which builds competence and confidence' },
          { text: 'For the report', why: 'It\'s for him.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 5 so far.',
        template: 'Hard, not [[1]]. Build belief on [[2]]. Push hard on the goal, easy on the [[3]].',
        blanks: [['impossible'], ['evidence', 'wins'], ['people']],
        distractors: ['easy', 'fear'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Bisi\'s order.',
        tiles: ['Go', 'home,', 'all', 'of', 'you!'],
        distractors: ['stay'],
      },
    ],
  },
  reflect: {
    prompt: 'When have you surprised yourself by doing more than you thought you could? What made it possible?',
    starters: ['I surprised myself when...', 'What made it possible was...'],
  },
  deepen: {
    title: 'Name the growth',
    summary: 'Find one person who has grown a lot this month. Tell them, with the numbers: "Then you did X. Now you do Y."',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapters 1–4.',
};

export default lesson;
