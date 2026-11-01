import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 11 — learning from a photo of your textbook: diagrams, equations and checking the AI read them right. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Learning from a photo of your textbook',
  summary: 'Most AI apps can read a photo of a textbook page. Here is how to ask about a diagram or an equation, and how to catch the AI misreading it.',
  minutes: 12,
  outcomes: [
    'Ask useful questions about a photo of a page or diagram',
    'Check the AI read your photo correctly before trusting it',
    'Point the AI at exactly the part you are stuck on',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The diagram on page 84',
      html: `<p>Page 84 of Kofi's textbook has a diagram he doesn't understand: a balanced equation with coloured circles for atoms, and arrows showing them rearranging. He photographs it and asks: <em>"Explain this."</em></p>
<p>The AI gives a confident explanation of a <strong>different equation</strong>. It misread a small 2 as a 3 in the blurry corner of the photo.</p>
<h3>Photos are powerful, and they can be misread</h3>
<p>Reading photos is one of the most useful things a study AI can do. But small print, handwriting, subscripts and blurry corners are exactly where it slips. So use three habits:</p>
<ol>
<li><strong>Ask it to read back first.</strong> <em>"Before you explain, write out the equation in this photo exactly as you see it."</em> Then compare with the page.</li>
<li><strong>Point at the part.</strong> <em>"Explain only the diagram at the bottom left, with the coloured circles."</em> One part, not the whole page.</li>
<li><strong>Ask what the picture shows, then why.</strong> <em>"What is happening to the atoms between the left and right side? Why does the number of each colour stay the same?"</em></li>
</ol>
<p>That last question is the whole point of the diagram: the atoms rearrange, and none are created or lost. That's conservation of mass, drawn.</p>
<p><strong>Take a clear photo:</strong> flat page, good light, no shadow. It saves you from most misreads.</p>`,
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Read back, point at the part, then ask what and why.',
    },
    {
      kind: 'check',
      question: 'What should the AI do first with a photo of an equation?',
      options: ['Explain it straight away', 'Write it out exactly as it sees it, so you can check', 'Make it into a quiz'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi studies from photos of his textbook.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the photo routine in order.',
        lines: ['Take a clear, flat photo', 'Ask it to read back the part you need', 'Check it against the page', 'Ask what it shows, then why'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request about page 84 is best?',
        options: [
          { text: '[photo] Explain this.', why: 'No read-back, no focus.' },
          { text: '[photo] First write out the equation in the bottom-left diagram exactly as you see it. Then explain what happens to the atoms.' },
          { text: '[photo] Is this page important?', why: 'It cannot know what your teacher thinks.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'The AI read back Kofi\'s photo. Which line should he check against the page?',
        lines: ['Reactants: 2H₂ and O₂.', 'Products: 3H₂O.', 'Arrow from left to right.'],
        bug: 1,
        fix: 'Products: 2H₂O.',
        explanation: '3H₂O would not balance. A misread number in a blurry corner is the classic photo mistake.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Where are photo misreads most likely?',
        groups: ['High risk', 'Low risk'],
        items: [
          { text: 'Small subscripts', group: 0 },
          { text: 'Handwriting', group: 0 },
          { text: 'A large printed heading', group: 1 },
          { text: 'A blurry corner', group: 0 },
          { text: 'A clear, flat, well-lit page', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the diagram, 4 H atoms and 2 O atoms are on the left. How many H atoms are on the right?',
        answers: ['4', 'four'],
        placeholder: 'Number',
        explanation: 'Atoms are rearranged, not created or lost.',
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: "I sent the AI a photo of my whole Physics chapter, 12 pages. Its summary was useless.",
        prompt: 'What should Kofi suggest?',
        options: [
          { text: 'Send 24 pages next time.', why: 'More pages, more vague.' },
          { text: 'Photos never work.', why: 'They work well when focused and checked.' },
          { text: 'Send just the page or diagram you are stuck on, and point at the exact part.' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the read-back request.',
        tiles: ['Write', 'it', 'out', 'exactly', 'as', 'you', 'see', 'it'],
        distractors: ['roughly', 'guess'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the habit to the problem it prevents.',
        pairs: [
          ['Read back first', 'Explaining a misread equation'],
          ['Point at the part', 'A vague summary of the whole page'],
          ['Clear, flat photo', 'Blurry numbers'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the number of each colour of atom stay the same on both sides of the diagram?',
        options: [
          { text: 'The diagram is simplified', why: 'It is accurate. Mass really is conserved.' },
          { text: 'Atoms are rearranged, not created or destroyed' },
          { text: 'Colours cannot change', why: 'The colours show atom types, and atoms keep their type.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the routine.',
        template: 'Read [[1]], point at the [[2]], then ask what and [[3]].',
        blanks: [['back'], ['part'], ['why']],
        distractors: ['aloud', 'page', 'when'],
      },
    ],
  },
  reflect: {
    prompt: 'Find a diagram in one of your textbooks you never really understood. What would your three questions about it be?',
    starters: ['The diagram shows...', 'My questions:'],
  },
  deepen: {
    title: 'Try it tonight',
    summary: 'Photograph one diagram, ask for a read-back, check it, then ask what it shows and why.',
  },
  notes: 'Image input availability and accuracy vary by app; misreading small text/subscripts is a known failure mode. 2H2 + O2 → 2H2O: 4 H, 2 O each side.',
};

export default lesson;
