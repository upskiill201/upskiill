import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 18 — ten minutes to understand anything: the whole chapter as one routine. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Ten minutes to understand anything',
  summary: 'Everything from this chapter, packed into one 10-minute routine Kofi can use on any topic, in any subject.',
  minutes: 12,
  outcomes: [
    'Run the 10-minute understanding routine',
    'Know which step to skip when time is short',
    'Use it on a subject that isn\'t Chemistry',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: "This chapter gave you a lot of tools. Let's pack them into one routine you can run in 10 minutes.", replies: ['Go'] },
        { tey: 'Minute 0 to 1: GAP. "What do I need to know before this? One question on each." Fix any block that wobbles.' },
        { tey: 'Minute 1 to 2: WORDS. "The 5 key words, plain definitions." Rewrite one or two in your own words.' },
        { tey: 'Minute 2 to 5: IDEA. Ask for it at your level, linked to something you know, and ask where the analogy breaks.', replies: ['And then?'] },
        { tey: 'Minute 5 to 7: EXAMPLE. One worked example with reasons, then one for you with the answer hidden.' },
        { tey: 'Minute 7 to 10: EXPLAIN BACK. The AI plays a confused classmate. You explain. Every question you can\'t answer goes in your notes.' },
        { tey: "Gap, words, idea, example, explain back. Short on time? Never skip the last one. It's the one that tells you if you actually understood.", replies: ['Does it work outside Chemistry?'] },
        { tey: 'Anywhere. History, Economics, Physics, a new language. Watch David try it on Physics.' },
      ],
    },
    {
      kind: 'compare',
      title: "David's Physics homework: moments",
      before: { label: 'Before', text: 'David reads the textbook page on moments three times, then copies the formula: moment = force × distance. Still confused.' },
      after: {
        label: 'With the routine',
        text: 'Gap: he finds he is shaky on "perpendicular". Words: pivot, force, moment. Idea: a see-saw, and where it breaks. Example: a 10 N force 2 m from the pivot = 20 Nm, then one he tries. Explain back: the AI asks "why does a longer spanner make it easier?" He can answer.',
      },
      notes: ['Same 10 minutes.', 'Every step makes him do something.', 'He finishes knowing what he knows.'],
    },
    {
      kind: 'check',
      question: 'If you only have time for one step, which should you never skip?',
      options: ['Words', 'Explain back', 'Gap'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi and David use the 10-minute routine.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the routine in order.',
        lines: ['Gap', 'Words', 'Idea', 'Example', 'Explain back'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to its request.',
        pairs: [
          ['Gap', '"What do I need to know before this?"'],
          ['Words', '"The 5 key words, plain definitions"'],
          ['Example', '"One worked example, then one for me"'],
          ['Explain back', '"Play a confused classmate"'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Moment = force × distance. A 10 N force acts 3 m from the pivot. What is the moment? (Nm)',
        answers: ['30', '30nm', '30 nm'],
        placeholder: 'Number',
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: "I only had 4 minutes tonight, so I did Gap, Words and Idea and skipped Explain back.",
        prompt: 'What should Kofi say?',
        options: [
          { text: 'Perfect choice.', why: 'He skipped the one step he should never skip.' },
          { text: "Next time skip something else. Explain back is the one that tells you if you actually got it." },
          { text: 'Four minutes is useless.', why: 'Four minutes is enough if you keep the right step.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why does a longer spanner make a bolt easier to turn?',
        options: [
          { text: 'Longer spanners are heavier', why: 'It is about distance, not weight.' },
          { text: 'It does not', why: 'It does: moment = force × distance.' },
          { text: 'More distance from the pivot gives a bigger moment for the same force' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step is this?',
        groups: ['Idea', 'Example', 'Explain back'],
        items: [
          { text: 'A see-saw analogy, and where it breaks', group: 0 },
          { text: 'A 10 N force at 2 m, worked through', group: 1 },
          { text: 'The AI asks why a longer spanner helps', group: 2 },
          { text: 'Try one with the answer hidden', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: "Which step of Clinton's routine is not really the step?",
        lines: ['Gap: asked what Economics supply curves are built on.', 'Words: copied 5 definitions without reading them.', 'Explain back: explained it to the AI as a classmate.'],
        bug: 1,
        fix: 'Words: rewrote the definitions in his own words.',
        explanation: 'Copying without reading is not learning the words.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the routine.',
        template: 'Gap, [[1]], idea, [[2]], explain back.',
        blanks: [['words'], ['example']],
        distractors: ['copy', 'sleep'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi starts a new History topic: the causes of a war. Which first request starts the routine?',
        options: [
          { text: 'Write my History essay.', why: 'Not studying, and not his work.' },
          { text: 'What do I need to know before studying the causes of this war? Ask me one question on each.' },
          { text: 'Tell me all of History.', why: 'Far too much.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tey\'s rule.',
        tiles: ['Never', 'skip', 'the', 'explain', 'back'],
        distractors: ['always', 'words'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick a topic from a subject that isn\'t science. Write what you\'d ask at each of the five steps.',
    starters: ['Topic:', 'Gap:', 'Words:', 'Idea:', 'Example:', 'Explain back:'],
  },
  deepen: {
    title: 'Run it tonight',
    summary: 'Run the full 10-minute routine on one topic you have homework on. Set a timer.',
  },
  notes: 'Moment = force × perpendicular distance (Nm). 10 N × 3 m = 30 Nm. Consolidation lesson.',
};

export default lesson;
