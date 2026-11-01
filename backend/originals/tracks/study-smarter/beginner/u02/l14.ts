import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 14 — when two explanations disagree: the AI vs the teacher's notes. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'When two explanations disagree',
  summary: "The AI says one thing, Mrs Asante's notes say another. Who's right? Usually you can find out in five minutes, and learn more than either one taught you.",
  minutes: 12,
  outcomes: [
    'Notice when two explanations disagree',
    'Find out which is right, or whether both are',
    'Know when to take it to your teacher',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Two answers',
      beats: [
        { speaker: 'narrator', text: 'Saturday. Kofi works out the mass of water from 10 g of hydrogen. He gets 90 g. The AI also gets 90 g.' },
        { speaker: 'narrator', text: 'Then he checks Mrs Asante\'s worked answer in his notes: 89.4 g.' },
        { speaker: 'kofi', text: "Now what? The AI and I agree. Is Mrs Asante wrong?" },
        { speaker: 'tey', text: "Disagreement is a gift. Something is different between the two, and finding it will teach you something. Don't pick a side yet. Look for the difference." },
        { speaker: 'narrator', text: 'Kofi asks the AI: "My teacher got 89.4 g, I got 90 g. What could explain the difference?" It suggests one possibility: more precise molar masses. H is 1.008, not 1, and O is 16.00.' },
        { speaker: 'narrator', text: "He checks the top of Mrs Asante's notes: \"Use H = 1.008\". Both answers were right, at different precisions. Now he knows which one the exam wants." },
      ],
      choice: {
        prompt: 'What was the best move when the answers disagreed?',
        options: [
          {
            text: 'Ask what could explain the difference, then check the source (her notes) to confirm',
            outcome: 'He found the cause in five minutes and learned his teacher wants precise values. Worth marks in every test.',
            best: true,
          },
          { text: 'Trust the AI, because it agreed with him', outcome: 'He would have used rounded values in the test and lost marks for precision.' },
          { text: 'Trust Mrs Asante without understanding why', outcome: 'He\'d get this one right, then make the same mistake on the next question.' },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>When two explanations disagree, run through this:</p><ol><li><strong>Look for the difference</strong>, not the winner. Different numbers used? Different method? Different rounding?</li><li><strong>Ask the AI</strong> what could explain the difference. Treat its answer as a suggestion to check, not a verdict.</li><li><strong>Check the source:</strong> your textbook, your teacher\'s notes, your syllabus.</li><li><strong>Still unsure? Ask your teacher.</strong> In a test, your course\'s method is the one that gets marked.</li></ol>',
    },
    {
      kind: 'check',
      question: 'Two explanations disagree. What do you look for first?',
      options: ['Which one sounds more confident', 'What is different between them', 'Which one is shorter'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi sorts out disagreements.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the disagreement routine in order.',
        lines: ['Look for the difference', 'Ask the AI what could explain it', 'Check the source', 'Still unsure? Ask your teacher'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which question helps Kofi most?',
        options: [
          { text: 'Is my teacher wrong?', why: 'Picks a side before finding the difference.' },
          { text: 'My teacher got 89.4 g and I got 90 g for this question: [question]. What could explain the difference?' },
          { text: 'Which answer is right?', why: 'It needs both answers and the question to help.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Using H = 1 and O = 16, what is the molar mass of H₂O? (g/mol)',
        answers: ['18'],
        placeholder: 'Number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Common causes of different answers, or not?',
        groups: ['Common cause', 'Not a cause'],
        items: [
          { text: 'Different rounding of molar masses', group: 0 },
          { text: 'A different method that is also valid', group: 0 },
          { text: 'One of them misread the question', group: 0 },
          { text: 'The colour of the textbook', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'The AI and my teacher disagree on a Physics answer. AI is newer, so it must be right.',
        prompt: 'What should Kofi say?',
        options: [
          { text: 'Newer is not righter. Find what is different between the two, check your textbook, and ask your teacher if it is still unclear.' },
          { text: 'Yes, trust the AI.', why: 'Being new says nothing about being right.' },
          { text: 'Always trust the teacher, never ask why.', why: 'Usually the teacher is right for your course, but finding out why is the learning.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: "Which step of David's plan is a problem?",
        lines: ['The AI and the textbook give different formulas.', 'I picked the AI one because it was easier.', 'Then I practised it.'],
        bug: 1,
        fix: 'Find why they differ, and use the textbook method if the course uses it.',
        explanation: '"Easier" is not a reason. He may have practised a method his exam does not use.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the source to how much to trust it for your course.',
        pairs: [
          ["Your teacher's notes", "Your course's method"],
          ['Your syllabus', 'What can be examined'],
          ['The AI', 'A suggestion to check'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a disagreement "a gift"?',
        options: [
          { text: 'It proves the AI is useless', why: 'The AI helped find the cause.' },
          { text: 'It means you can skip the question', why: 'It means you should dig into it.' },
          { text: 'Finding the cause teaches you something neither explanation did' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: "Complete Tey's advice.",
        template: "Don't pick a [[1]] yet. Look for the [[2]].",
        blanks: [['side', 'winner'], ['difference']],
        distractors: ['fight', 'answer'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the question for the AI.',
        tiles: ['What', 'could', 'explain', 'the', 'difference?'],
        distractors: ['who', 'wins?'],
      },
    ],
  },
  reflect: {
    prompt: 'Have two sources ever told you different things? What would the difference-finding routine have found?',
    starters: ['The two sources were...', 'The difference was probably...'],
  },
  deepen: {
    title: 'Watch for it',
    summary: 'Next time an AI answer and your notes disagree, write down the difference you find. It is usually the most useful line in your notes.',
  },
  notes: '10 g H2 = 5 mol (H=1) → 5 mol H2O × 18 = 90 g. With H = 1.008, O = 16.00: 10 ÷ 2.016 = 4.960 mol; × 18.016 = 89.37 g → 89.4 g. Both correct at their precision.',
};

export default lesson;
