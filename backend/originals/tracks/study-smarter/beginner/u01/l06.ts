import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6 — ask "why", not just "what" (elaborative questioning). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Ask "why", not just "what"',
  summary: 'Knowing a formula gets you one mark. Knowing why it works gets you the rest of the question.',
  minutes: 12,
  outcomes: [
    'Turn "what" questions into "why" questions',
    'Use "why" follow-ups to connect ideas',
    'Check your own "why" answer before the AI gives its own',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: "Quick one. Moles = mass ÷ molar mass. Can you tell me WHY you divide?", replies: ['Because the formula says so?', 'No idea'] },
        { tey: "Ha. That's where most people are. And that's why the formula falls out of their head in the exam." },
        { tey: "Here's the why: molar mass is how many grams ONE mole weighs. So if you have 36 grams and each mole is 18 grams, you're asking: how many 18s fit in 36?", replies: ['Oh. Two.', 'Like sharing?'] },
        { tey: "Exactly like sharing. Once you know the why, you could rebuild the formula even if you forgot it." },
        { tey: 'This trick has a name in learning research: elaborative questioning. Asking yourself "why is this true?" helps ideas stick, because you link them to what you already know.' },
        { tey: "And AI is perfect for it. After any explanation, ask: why does this work? Why this and not that? What would happen if...?", replies: ['Show me'] },
        { tey: "Try your own answer FIRST, even a bad one. Then ask the AI. Comparing your guess with the real reason is where the learning happens." },
      ],
    },
    {
      kind: 'compare',
      title: 'What vs why',
      before: { label: 'What question', text: 'What is the formula for moles?\n\nYou get: one line to memorise.' },
      after: { label: 'Why question', text: 'Why do you divide mass by molar mass to get moles? I think it\'s because... (my guess). Am I right?\n\nYou get: the reason, and a check on your own thinking.' },
      notes: ['Puts your brain to work first.', 'Links the formula to an idea you already know (sharing).', 'Makes it easier to rebuild in the exam.'],
    },
    {
      kind: 'check',
      question: 'Which is a "why" question?',
      options: ['What is molar mass?', 'Why does a mole of water weigh more than a mole of carbon?', 'List the formulas for moles.'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi stops memorising and starts asking why.',
    items: [
      {
        kind: 'sortGroups',
        prompt: '"What" question or "why" question?',
        groups: ['What', 'Why'],
        items: [
          { text: 'What is Avogadro\'s number?', group: 0 },
          { text: 'Why do we use such a huge number for a mole?', group: 1 },
          { text: 'What is the formula for speed?', group: 0 },
          { text: 'Why does speed go down if time goes up?', group: 1 },
          { text: 'Why does ice float on water?', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why should Kofi write his own guess before asking the AI "why"?',
        options: [
          { text: 'Comparing his guess with the real reason is where the learning happens' },
          { text: 'The AI needs his guess to answer', why: 'It can answer without it. The guess helps Kofi, not the AI.' },
          { text: 'To save typing', why: 'It adds typing. It is worth it.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A mole of carbon weighs 12 g. How many moles are in 24 g of carbon?',
        answers: ['2', 'two', '2 mol', '2 moles'],
        placeholder: 'Number',
        explanation: 'How many 12s fit in 24? Two.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a "why" follow-up.',
        tiles: ['Why', 'does', 'this', 'work?', 'I', 'think', 'it', 'is', 'because...'],
        distractors: ['just', 'memorise'],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: "I memorised all the Physics formulas, but in the mock I didn't know which one to use.",
        prompt: 'What should Kofi suggest?',
        options: [
          { text: 'Memorise them again, harder.', why: 'He already knew them. He did not understand them.' },
          { text: 'Ask for more formulas.', why: 'More to memorise, same problem.' },
          { text: 'Ask the AI why each formula works and when you would use it. Then you can pick the right one.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the follow-up to what it does.',
        pairs: [
          ['"Why does this work?"', 'Finds the reason behind it'],
          ['"Why this and not that?"', 'Tells two ideas apart'],
          ['"What would happen if...?"', 'Tests if you can apply it'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line skips the thinking?',
        lines: [
          'Why do we divide mass by molar mass?',
          'My guess: because molar mass is the weight of one mole.',
          "Actually, just tell me. I won't guess.",
        ],
        bug: 2,
        fix: 'Is my guess right? What did I miss?',
        explanation: 'The guess is the learning. Skipping it turns a why question back into a what question.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'Try your [[1]] answer first, then ask the AI. Comparing them is where the [[2]] happens.',
        blanks: [['own'], ['learning']],
        distractors: ['copied', 'cheating'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi just learned that ice floats. Which follow-up gets him the most?',
        options: [
          { text: 'OK thanks.', why: 'No follow-up, no deeper understanding.' },
          { text: "Why does ice float when most solids sink? My guess: ice is lighter. Is that right, and what does 'lighter' really mean here?" },
          { text: 'Tell me 10 more facts about ice.', why: 'More facts, but no why.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the "why" routine in order.',
        lines: ['Get the explanation', 'Ask yourself why it works', 'Write your own guess', 'Ask the AI to check your guess'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick one formula or fact you memorised without understanding. Write your best guess at WHY it is true.',
    starters: ['The thing I memorised is...', 'My guess at why it is true...'],
  },
  deepen: {
    title: 'Try it tonight',
    summary: 'After your next explanation, ask the AI three "why" questions. Write your own guess before each one.',
  },
  notes: 'Elaborative interrogation: rated "moderate utility" in Dunlosky et al. (2013), Psychological Science in the Public Interest 14(1). Ice is less dense than liquid water (hydrogen-bonded lattice).',
};

export default lesson;
