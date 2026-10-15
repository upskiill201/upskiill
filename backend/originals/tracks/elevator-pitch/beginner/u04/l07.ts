import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Card deck: voice, pace, eyes and hands. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Voice, pace, eyes and hands',
  summary: 'Ada watches her rehearsal video with the sound off. Her hands are doing something strange: holding her elbows, then her necklace, then her elbows again. Time for the body checklist.',
  minutes: 11,
  outcomes: [
    'Use your voice and pace on purpose',
    'Make eye contact with a room',
    'Know what to do with your hands and feet',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Five quick cards for the parts of you that speak before your words do.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Voice</h3><p>Speak to the back row. Then <strong>vary it</strong>: a little quieter for the Tunde story, a little stronger for the ask. A voice that never changes is easy to tune out.</p><h3>Card 2: Pace and pauses</h3><p>Slow down for the important parts. Pause after the hook (let them wonder), after the funny line (let them laugh) and before the ask. Pauses feel long to you and normal to the audience.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 3: Eyes</h3><p>On a stage, give one sentence to one person, then move to someone in another part of the room. Include the judges, but don't stare at them. Spotlights can make the audience hard to see, so pick a few friendly faces.</p><h3>Card 4: Hands</h3><p>Start with hands loosely at your sides or held lightly in front of you at waist height. Then let them move naturally when you talk, like you would in conversation. Avoid holding your elbows, pockets and phones.</p>",
    },
    {
      kind: 'check',
      question: 'When should Ada pause in her pitch?',
      options: ['After the hook, after the funny line, and before the ask', 'Never; pauses look nervous', 'Only when she forgets something'],
      answer: 0,
      explanation: 'Pauses let ideas land. They feel long to the speaker but normal to the audience.',
    },
    {
      kind: 'text',
      html: "<h3>Card 5: Feet</h3><p>Stand with your weight on both feet, roughly hip-width apart. No swaying, no walking in circles. If you move, move with purpose (a step forward for the ask), then stand still again.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Voice to the back row, with variety. Slow down and pause. One sentence, one person. Natural hands. Both feet planted.',
    },
  ],
  apply: {
    scenario: 'Watching with the sound off.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the problem with a voice that never changes?',
        options: [
          { text: 'Nothing, it sounds professional', why: 'Monotone loses listeners.' },
          { text: 'It\'s easy to tune out' },
          { text: 'It\'s too loud', why: 'Variety is the issue, not volume.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good stage habit, or not?',
        groups: ['Good habit', 'Not great'],
        items: [
          { text: 'One sentence to one person, then move', group: 0 },
          { text: 'Holding your elbows', group: 1 },
          { text: 'Both feet planted', group: 0 },
          { text: 'Swaying side to side', group: 1 },
          { text: 'Pausing before the ask', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'The spotlight means I won\'t be able to see anyone. Where do I look?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Pick a few friendly faces you can see, in different parts of the room, and give each a sentence.' },
          { text: 'Look at the floor.', why: 'That\'s the hostage video.' },
          { text: 'Stare at one judge the whole time.', why: 'Share it around.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Speak loud enough for the ___ row. (one word)',
        answers: ['back', 'last'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Ada\'s planned pauses in order.',
        lines: ['After the hook: "What could possibly go wrong?"', 'After the Tunde laugh', 'Before the ask', 'After the closing rhyme'],
      },
      {
        kind: 'mcq',
        prompt: 'What should Ada do with her hands?',
        options: [
          { text: 'Keep them in her pockets', why: 'Looks closed off.' },
          { text: 'Start relaxed, then let them move naturally as she talks' },
          { text: 'Hold her phone, just in case', why: 'The phone stays in her pocket.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s stage plan. Which line is a mistake?',
        lines: [
          'Plant both feet at the start.',
          'Walk in circles to burn off nerves.',
          'Step forward once for the ask.',
        ],
        bug: 1,
        fix: 'Stand still, and move only with purpose.',
        explanation: 'Wandering looks nervous. Move with purpose, then plant again.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the body part to the tip.',
        pairs: [
          ['Voice', 'Vary it: quieter for the story, stronger for the ask'],
          ['Eyes', 'One sentence, one person'],
          ['Feet', 'Planted, hip-width apart'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The body checklist.',
        template: 'Voice to the [[1]] row. One sentence, one [[2]]. Both feet [[3]].',
        blanks: [['back'], ['person'], ['planted']],
        distractors: ['front', 'swaying'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the pause rule.',
        tiles: ['Pause', 'before', 'the', 'ask.'],
        distractors: ['never'],
      },
    ],
  },
  reflect: {
    prompt: 'Watch a recording of yourself with the sound off. What are your hands and feet doing? What one habit would you change?',
    starters: ['My hands...', 'My feet...', 'I\'ll change...'],
  },
  deepen: {
    title: 'Mark your pauses',
    summary: 'Write your pitch out and mark every place you\'ll pause with a slash (/). Rehearse it, holding each pause for a full second.',
  },
  notes: 'Voice variety, pausing, eye contact distribution, gesture and stance are standard public-speaking guidance (cf. Van Zant & Berger 2020 on vocal variation and confidence, covered in How to Make People Listen to You).',
};

export default lesson;
