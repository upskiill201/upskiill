import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 with earlier material. Story beat: the test moves forward. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the test moves forward',
  summary: 'Mrs Asante moves the test to Monday. Kofi has a weekend, a syllabus and a quiz set-up. Time to show what you have.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can pick strong study habits over weak ones', 'Combine the syllabus, the quiz set-up and the three-pass session'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 3:05pm',
      beats: [
        { speaker: 'asante', text: 'Change of plan. The moles test is on Monday, not next Friday. I want it marked before half-term.' },
        { speaker: 'narrator', text: 'Groans across the room. Kofi checks his syllabus colours: two greens, one amber, one red. Limiting reagents.' },
        { speaker: 'efua', text: "You're calm. Why are you calm?" },
        { speaker: 'kofi', text: "Because I know exactly what I don't know. One red. That's my weekend." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3. The test is on Monday.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Kofi has one weekend. What should he do first?',
        options: [
          { text: 'Reread all his notes from the start', why: 'Rereading everything ignores what he already knows.' },
          { text: 'Study his red line (limiting reagents), then his amber' },
          { text: 'Revise his greens to feel confident', why: 'Greens need the least time.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong habit or weak habit?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'Quiz yourself, one question at a time', group: 0 },
          { text: 'Highlight the whole chapter', group: 1 },
          { text: 'Two short sessions, Saturday and Sunday', group: 0 },
          { text: 'One 5-hour session on Sunday night', group: 1 },
          { text: 'Draw the particle picture yourself', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which quiz set-up is best for Kofi this weekend?',
        options: [
          { text: 'Quiz me on chemistry.', why: 'No topic, no level, no rules.' },
          {
            text: "Final year. Topic: limiting reagents (syllabus line pasted). Ask one question at a time and wait for my answer. Explain if I'm wrong. Two right in a row, make it harder.",
          },
          { text: 'Give me 10 limiting reagent questions and answers.', why: 'He will read, not answer.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Each pot needs 2 cups of rice and 3 tomatoes. You have 8 cups of rice and 9 tomatoes. How many pots?',
        answers: ['3', 'three'],
        placeholder: 'Number',
        explanation: 'Rice allows 4 pots, tomatoes allow 3. Tomatoes run out first: 3 pots.',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: "I'm a visual learner so I'll just watch videos all weekend.",
        prompt: 'What is the best reply?',
        options: [
          { text: 'Good plan.', why: 'Watching all weekend skips the strongest habit.' },
          { text: 'Never watch videos.', why: 'Videos can help. They are just not enough on their own.' },
          { text: 'Videos are fine for Pass 1, but test yourself after. Learning styles aren\'t backed by evidence; testing is.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the three-pass session in order.',
        lines: ['Words: a short explanation', 'Picture: describe it, then draw it', 'Test: 4 questions, one at a time', 'Write one summary line without looking'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this quiz set-up is a problem?',
        lines: ['Topic: limiting reagents, final year.', 'One question at a time.', 'Show the answer under each question.'],
        bug: 2,
        fix: 'Wait for my answer, then tell me if I am right.',
        explanation: 'If the answer is on screen, he will look before thinking.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the lesson to its big idea.',
        pairs: [
          ['Study myths', 'Test yourself, space it out'],
          ['One topic, three ways', 'Words, picture, test'],
          ['Let the AI ask you', 'One at a time, wait for my answer'],
          ['Study from your syllabus', 'Reds first, green means no notes'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Kofi\'s weekend plan.',
        template: 'Saturday: [[1]] line first. Sunday: quiz on the [[2]] line. Monday morning: a quick quiz on the [[3]].',
        blanks: [['red'], ['amber'], ['greens', 'green']],
        distractors: ['blue', 'whole book'],
      },
      {
        kind: 'mcq',
        prompt: "After Saturday's quiz, Kofi gets both limiting reagent questions right without notes. What colour is that line now?",
        options: [
          { text: 'Still red', why: 'He got them right without notes. It has earned green.' },
          { text: 'Green' },
          { text: 'Amber', why: 'Green means right without notes, and he did that.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: "Build Kofi's answer to Efua.",
        tiles: ['I', 'know', 'exactly', 'what', 'I', "don't", 'know'],
        distractors: ['everything', 'nothing'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Quiz mode or tutor mode?',
        groups: ['Quiz mode', 'Tutor mode'],
        items: [
          { text: 'Ask me 5 questions, one at a time', group: 0 },
          { text: "Lead me to the answer, don't give it", group: 1 },
          { text: 'Hint only if I am stuck twice', group: 1 },
          { text: 'Tell me if I am right', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If your next test moved forward by a week, which lesson from this chapter would you use first?',
    starters: ['I would start with...', 'Because...'],
  },
  deepen: { title: 'Keep going', summary: 'Colour one syllabus page and run one quiz on your reddest line before your next lesson.' },
  notes: 'Review only. Rice: 8 ÷ 2 = 4; tomatoes: 9 ÷ 3 = 3 → 3 pots.',
};

export default lesson;
