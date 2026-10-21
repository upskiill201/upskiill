import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Reading: slides that help (Mayer). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Slides that help',
  summary: 'Lucía\'s slides are full of bullet points she plans to read out. Sofía sends her research on how people learn from slides. It changes everything.',
  minutes: 12,
  outcomes: [
    'Know three of Mayer\'s principles for slides',
    'Stop reading slides aloud',
    'Make every slide earn its place',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'What the research says',
      html: '<p>Psychologist Richard Mayer has spent decades testing how people learn from words and pictures together. His findings are now standard in teaching design. Three matter most for slides:</p><ul><li><strong>Coherence:</strong> people learn better when extra material is cut. Decorative pictures, background music and "interesting but off-topic" facts get in the way.</li><li><strong>Signalling:</strong> people learn better when the key point is highlighted: a clear slide title, an arrow, one bar in a different colour.</li><li><strong>Redundancy:</strong> people usually learn better from a picture with your spoken words than from a picture, your spoken words <em>and</em> the same words printed on screen. Reading your slide aloud makes people read and listen at once.</li></ul><p>For Lucía, that means: one idea per slide, a title that says the point, a chart or picture instead of bullets, and her voice doing the talking.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Coherence: cut extras. Signalling: highlight the point. Redundancy: don\'t read your slides aloud.',
    },
  ],
  apply: {
    scenario: 'Mayer\'s principles.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the principle to what it means.',
        pairs: [
          ['Coherence', 'Cut extra material'],
          ['Signalling', 'Highlight the key point'],
          ['Redundancy', 'Don\'t print what you say'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is reading your slides aloud a problem?',
        options: [
          { text: 'People have to read and listen to the same words at once' },
          { text: 'It\'s too quiet', why: 'It\'s about redundancy.' },
          { text: 'It isn\'t a problem', why: 'It splits attention.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep on the slide, or cut?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'A chart of sales vs target', group: 0 },
          { text: 'Clip-art of a chip packet dancing', group: 1 },
          { text: 'A title that says the point', group: 0 },
          { text: 'Eight bullet points you\'ll read aloud', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is Mayer\'s first name?',
        answers: ['Richard', 'richard'],
        placeholder: 'A name',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Without bullets, how will I remember what to say?',
        prompt: "Sofía\'s best reply?",
        options: [
          { text: 'Put the notes in speaker notes or on your talk card. The slide is for them; the notes are for you.' },
          { text: 'Keep the bullets and read them.', why: 'Redundancy.' },
          { text: 'Don\'t prepare.', why: 'Use speaker notes.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'One slide.',
        template: 'One [[1]] per slide, and a title that says the [[2]].',
        blanks: [['idea'], ['point']],
        distractors: ['font', 'date'],
      },
      {
        kind: 'mcq',
        prompt: 'Which is an example of signalling?',
        options: [
          { text: 'One bar in a different colour' },
          { text: 'Background music', why: 'That breaks coherence.' },
          { text: 'Reading the slide aloud', why: 'That\'s redundancy.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which of Lucía\'s slide rules breaks a Mayer principle?',
        lines: [
          'One idea per slide.',
          'A title that says the point.',
          'Add funny GIFs to every slide to keep it lively.',
          'Highlight the 38% bar.',
        ],
        bug: 2,
        fix: 'Only pictures that support the point.',
        explanation: 'Decorative extras break coherence.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Lucía fixes a slide.',
        lines: ['Write the point as the title', 'Swap bullets for a chart', 'Highlight the key number', 'Move her words to speaker notes'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which principle does this break?',
        groups: ['Coherence', 'Redundancy'],
        items: [
          { text: 'Background music under the talk', group: 0 },
          { text: 'Reading every bullet aloud', group: 1 },
          { text: 'An off-topic fun fact', group: 0 },
          { text: 'A full script printed on the slide', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Open a slide deck you\'ve used. Pick one slide and fix it with the three principles.',
    starters: ['Before:...', 'After:...'],
  },
  deepen: {
    title: 'Multimedia learning',
    summary: 'Mayer\'s wider finding is that people often learn better from words and pictures together than from words alone. Slides are at their best as the picture, with you as the words.',
  },
  notes: 'Mayer, Multimedia Learning (Cambridge University Press; 3rd ed. 2020), and Mayer & Fiorella (2014) on coherence, signalling and redundancy principles. Redundancy effect applies mainly to narrated graphics; short key words on screen can be fine.',
};

export default lesson;
