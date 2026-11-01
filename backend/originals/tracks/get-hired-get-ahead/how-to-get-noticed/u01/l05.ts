import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 5 — Checkpoint 1, the last free lesson. Reviews lessons 1–4. Story beat: Mrs Ewane's quiz. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Mrs Ewane\'s quiz',
  summary: 'Clinton books his first ever appointment at the careers office. Mrs Ewane, Head of Careers, doesn\'t say hello. She says, "Before we look at anything, five questions." Everything from your first four lessons, mixed together.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain what employers look for first', 'Sort technical, transferable and personal skills', 'Turn an everyday activity into a skill with a story'],
  learn: [
    {
      kind: 'story',
      title: 'The careers office',
      beats: [
        { speaker: 'narrator', text: 'Thursday, 10am. The careers office is a small room with a big window and a sign: "Comic Sans CVs will be returned unread."' },
        { speaker: 'ewane', text: 'Sit. Most students come here in their last week with a CV they wrote that morning. You\'re eight months early. I like you already. Now: five questions.' },
        { speaker: 'clinton', text: 'A quiz? I came for help with my CV.' },
        { speaker: 'ewane', text: 'A CV is just your skills, written down well. If you don\'t know your skills, I can\'t help your CV. Begin.' },
        { speaker: 'tey', text: 'Mrs Ewane runs a tight ship. Let\'s see what stuck.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: Mrs Ewane\'s five questions (and a few more).',
    items: [
      {
        kind: 'mcq',
        prompt: 'What do the most employers look for first on graduates\' CVs, according to NACE\'s 2025 survey?',
        options: [
          { text: 'A perfect grade average', why: 'Grades weren\'t first. Problem-solving was.' },
          { text: 'Evidence of problem-solving' },
          { text: 'A photo', why: 'Not on the list at all.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Technical, transferable or personal?',
        groups: ['Technical', 'Transferable', 'Personal'],
        items: [
          { text: 'JavaScript', group: 0 },
          { text: 'Running a meeting', group: 1 },
          { text: 'Patient', group: 2 },
          { text: 'Spreadsheets', group: 0 },
          { text: 'Negotiating with suppliers', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ewane',
        message: 'Question three. A student tells me, "I have no experience." What do I say?',
        options: [
          { text: '"Then come back when you do."', why: 'That\'s the "no experience" loop. Mrs Ewane breaks it.' },
          { text: '"Tell me where you spend your week, and what you do there."' },
          { text: '"Make some up."', why: 'Mrs Ewane would throw you out of the office.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the skill-mining steps in order.',
        lines: ['List where you spend time', 'Write what you do (verbs)', 'Find the problem you solved', 'Name the skill'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the vague line in Clinton\'s notes.',
        lines: ['I calmed an angry customer and he came back the next week.', 'I\'m good with people.', 'I grew the meet-up from 6 to 40 members.'],
        bug: 1,
        explanation: 'Anyone can say it. The other two lines prove it.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each survey or idea to what it says.',
        pairs: [
          ['WEF Future of Jobs 2025', 'Analytical thinking is the top core skill'],
          ['Skills-based hiring', 'What you can show beats your grades'],
          ['Transferable skill', 'Useful in almost any job'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Mrs Ewane asks, "What can you do?" Which answer gets a nod?',
        options: [
          { text: '"I\'m a fast learner and very passionate."', why: 'Every student says it. No proof.' },
          { text: '"I don\'t really know yet."', why: 'You do know. You listed it last lesson.' },
          { text: '"I keep a 300-student group chat organised, and I fix phones at my aunt\'s stall on Saturdays."' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Mrs Ewane\'s rule.',
        template: 'A CV is just your [[1]], written down [[2]].',
        blanks: [['skills'], ['well', 'clearly']],
        distractors: ['grades', 'quickly', 'hobbies'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it count as experience?',
        groups: ['Counts', 'Doesn\'t count'],
        items: [
          { text: 'Caring for a younger sibling after school', group: 0 },
          { text: 'Planning to join a club next year', group: 1 },
          { text: 'Running the church youth group\'s money', group: 0 },
          { text: 'Volunteering at a clinic', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Personal qualities are best shown with a ___, not just named. (one word)',
        answers: ['story', 'example'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ewane',
        message: 'Good. Last one. Why aren\'t Python, JavaScript and Excel enough on their own?',
        options: [
          { text: 'They\'re not, so I\'ll add ten more languages.', why: 'More of the same kind. Add transferable skills and personal qualities.' },
          { text: 'Because every CS graduate lists them. My transferable skills show what I\'m like to work with.' },
          { text: 'They are enough.', why: 'Two hundred other CS graduates list the same three.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'You\'ve finished the free part of this course. Which skill did you find that you\'d never counted before?',
    starters: ['I never counted...', 'Now I can say...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your answer to "So, what can you do?" in two sentences, with one real example. Say it out loud three times.',
  },
  notes: 'Checkpoint 1 = last free lesson (playbook §3). Reviews l01–l04. Mrs Ewane (Head of Careers, University of Buea) is new and course-only. These Checkpoint questions double as Jump ahead / placement questions, so they cover the whole first quarter of the chapter.',
};

export default lesson;
