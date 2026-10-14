import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 19 — your understanding checklist: how to know you really understand something. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your understanding checklist',
  summary: '"I understand it" is a feeling. This checklist turns the feeling into five things you can actually test.',
  minutes: 12,
  outcomes: [
    'Test your understanding with five checks',
    'Tell feeling you understand from actually understanding',
    'Decide what to study next from the checks you fail',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Five ways to know you know',
      html: `<p>Kofi used to judge understanding by a feeling: the page looked familiar, so he "got it". Chapter 1 showed that feeling lies. Here's what Miracle uses instead: five checks, each one something you <strong>do</strong>.</p>
<h3>1. Explain it simply</h3>
<p>Can you explain it to a classmate who missed the lesson, in under a minute, without notes? (The explain-back test.)</p>
<h3>2. Say why</h3>
<p>Can you say <em>why</em> each step works, not just what it is? If you can only say "because the formula says so", that step is memorised, not understood.</p>
<h3>3. Do a new one</h3>
<p>Can you solve a question you've never seen, with different numbers or a different wording, without looking at an example?</p>
<h3>4. Spot the mistake</h3>
<p>Given a wrong answer, can you find exactly where it went wrong? This is harder than it sounds, and it's a great test.</p>
<h3>5. Tell it apart</h3>
<p>Can you say how it differs from the ideas it's often confused with? (Mass vs molar mass. Limiting vs excess.)</p>
<h3>Using it with AI</h3>
<p>Ask: <em>"Test my understanding of [topic] with five checks: ask me to explain it simply, ask me why a step works, give me a new problem, give me a wrong answer to fix, and ask me to compare it with a similar idea. One at a time."</em></p>
<p>Pass all five and the topic goes green on your syllabus. Fail one, and that check tells you exactly what to study next.</p>`,
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Explain it, say why, do a new one, spot the mistake, tell it apart.',
    },
    {
      kind: 'check',
      question: 'Which check is "solve a question you\'ve never seen"?',
      options: ['Explain it simply', 'Do a new one', 'Tell it apart'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi runs the five checks on stoichiometry.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five checks in order.',
        lines: ['Explain it simply', 'Say why', 'Do a new one', 'Spot the mistake', 'Tell it apart'],
      },
      {
        kind: 'findBug',
        prompt: 'Check 4: spot the mistake in this answer.',
        lines: ['36 g of water. Water is 18 g/mol.', 'Moles = 18 ÷ 36 = 0.5.', 'So there is 0.5 mol of water.'],
        bug: 1,
        fix: 'Moles = 36 ÷ 18 = 2.',
        explanation: 'Mass divided by molar mass, not the other way round.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Check 3: a new one. CH₄ + 2O₂ → CO₂ + 2H₂O. How many moles of H₂O come from 3 moles of CH₄?',
        answers: ['6', 'six'],
        placeholder: 'Number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Real understanding, or just a feeling?',
        groups: ['Real understanding', 'Just a feeling'],
        items: [
          { text: 'I solved a new one without notes', group: 0 },
          { text: 'The page looks familiar', group: 1 },
          { text: 'I can say why each step works', group: 0 },
          { text: 'I read it three times', group: 1 },
          { text: 'I found the mistake in a wrong answer', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request tests Kofi\'s understanding best?',
        options: [
          { text: 'Do I understand stoichiometry?', why: 'It will probably say yes.' },
          { text: 'Test my understanding of stoichiometry with five checks: explain, why, a new problem, a wrong answer to fix, and a comparison. One at a time.' },
          { text: 'Give me a summary of stoichiometry.', why: 'Reading a summary tests nothing.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I passed 4 checks but failed "say why" for the quadratic formula. Am I OK?',
        prompt: 'What should Kofi say?',
        options: [
          { text: 'Nearly! That failed check tells you exactly what to study next: ask the AI why each step works.' },
          { text: '4 out of 5, you are done.', why: 'The failed check is a clear signal of what to study.' },
          { text: 'Start the whole topic again.', why: 'Just the one check needs work.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the check to its question.',
        pairs: [
          ['Explain it simply', 'Could a classmate follow you?'],
          ['Say why', 'Why does this step work?'],
          ['Tell it apart', 'How is it different from X?'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Check 5: what is the difference between mass and molar mass?',
        options: [
          { text: 'Mass is how much you have; molar mass is how much one mole weighs' },
          { text: 'They are the same', why: 'They have different units and meanings.' },
          { text: 'Molar mass is always bigger', why: 'Not always. It depends on the sample.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: '"I understand it" is a [[1]]. The checks are things you [[2]].',
        blanks: [['feeling'], ['do']],
        distractors: ['fact', 'read'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the green rule from Chapter 1, updated.',
        tiles: ['Pass', 'all', 'five', 'and', 'it', 'goes', 'green'],
        distractors: ['one', 'red'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick a topic you think you understand. Which of the five checks would you be least sure of passing?',
    starters: ['The topic is...', 'The check I would fail is...'],
  },
  deepen: {
    title: 'Run the checks',
    summary: 'Ask the AI to run all five checks on one topic. Note the one you fail, and study that first.',
  },
  notes: 'CH4 + 2O2 → CO2 + 2H2O: 3 mol CH4 → 6 mol H2O. Consolidation; checks draw on self-explanation and transfer.',
};

export default lesson;
