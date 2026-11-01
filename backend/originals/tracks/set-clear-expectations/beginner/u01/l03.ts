import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Reading: unclear expectations cost more than you think (illusion of transparency; role ambiguity research). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The cost of "it\'s obvious"',
  summary: 'Arjun still thinks the brief was mostly fine. "They\'re smart. They\'ll figure it out." On the metro home, Tey sends him something to read about what that assumption usually costs.',
  minutes: 12,
  outcomes: [
    'Know why we overestimate how clear we are',
    'Know what research links unclear roles to',
    'Know the real cost of an unclear brief',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Clearer in your head than on the page',
      html: "<p>Psychologists <strong>Thomas Gilovich</strong>, <strong>Kenneth Savitsky</strong> and <strong>Victoria Medvec</strong> described the <strong>illusion of transparency</strong> (1998): we tend to overestimate how well other people can read our thoughts and intentions. We feel our meaning is obvious, because it's obvious to us. Combine that with the curse of knowledge, and a four-word brief feels complete.</p><h3>What unclear expectations cost</h3><p>Researchers call it <strong>role ambiguity</strong>: not being sure what you're supposed to do, how, or how you'll be judged. Studies going back to Rizzo, House and Lirtzman (1970) link it to more stress and lower job satisfaction. A review of many studies by Tubre and Collins (2000) found it was also linked to lower performance. People can't hit a target they can't see.</p><h3>Why smart people don't \"just figure it out\"</h3><p>Kavya and Joel are good developers. But being smart doesn't tell you what's in someone else's head. Smart people fill the gaps with sensible guesses, just not <em>your</em> guesses. Kavya guessed desktop first. Joel guessed login. Both reasonable. Both wrong for Mr Rao.</p><h3>Why new people don't ask</h3><p>New people often won't ask \"obvious\" questions, because they don't want to look like they don't know. So silence after a brief usually means \"I'm guessing\", not \"I understand\".</p><h3>The real cost</h3><p>Five minutes making a brief clear on Day 1. Or three days of work, redone, on Day 4. Clarity is the cheapest time you'll ever spend.</p>",
    },
    {
      kind: 'check',
      question: 'What does silence after a brief usually mean from new people?',
      options: ['"I\'m guessing"', '"I fully understand"', '"I\'m not interested"'],
      answer: 0,
      explanation: 'New people often won\'t ask questions that might make them look like they don\'t know.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'We overestimate how clear we are. Unclear roles bring stress and weaker work. Smart people fill gaps with their guesses, not yours. Five minutes now beats three days later.',
    },
  ],
  apply: {
    scenario: 'The metro home, reading.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the illusion of transparency?',
        options: [
          { text: 'Pretending to be honest', why: 'It\'s an honest mistake, not a pretence.' },
          { text: 'Seeing through other people\'s lies', why: 'It\'s about us, not them.' },
          { text: 'Overestimating how well others can read our thoughts and intentions' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the researchers to the idea.',
        pairs: [
          ['Gilovich, Savitsky and Medvec', 'Illusion of transparency'],
          ['Rizzo, House and Lirtzman', 'Role ambiguity'],
          ['Camerer, Loewenstein and Weber', 'Curse of knowledge'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Linked to role ambiguity in research, or not?',
        groups: ['Linked', 'Not linked'],
        items: [
          { text: 'More stress', group: 0 },
          { text: 'Faster work', group: 1 },
          { text: 'Lower performance', group: 0 },
          { text: 'Higher job satisfaction', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'They\'re smart. They\'ll figure it out.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Yes, smart people always figure it out.', why: 'Kavya and Joel both guessed wrong.' },
          { text: 'They will, with their own guesses. Smart people fill gaps sensibly, just not the way you would.' },
          { text: 'They\'re not that smart.', why: 'They are. That\'s not the issue.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Not being sure what you\'re supposed to do is called role ___. (one word)',
        answers: ['ambiguity', 'Ambiguity'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why didn\'t Joel ask any questions?',
        options: [
          { text: 'New people often avoid questions that might make them look like they don\'t know' },
          { text: 'He knew everything', why: 'He guessed "login". Wrong.' },
          { text: 'He wasn\'t interested', why: 'He read all 40 pages.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s plan for next time. Which line keeps the illusion?',
        lines: [
          'Spend five minutes making the brief clear on Day 1.',
          'If nobody asks questions, assume they understand.',
          'Ask them to explain the first task back.',
        ],
        bug: 1,
        fix: 'If nobody asks questions, ask them what they\'ll do first.',
        explanation: 'Silence after a brief usually means guessing.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the cost of a vague brief in order.',
        lines: ['A four-word brief', 'Smart people guess', 'Three days of the wrong work', 'Everything redone on Day 4'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Clarity is the [[1]] time you\'ll ever [[2]].',
        blanks: [['cheapest', 'best'], ['spend']],
        distractors: ['slowest', 'waste'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tey\'s point.',
        tiles: ['Silence', 'means', 'guessing.'],
        distractors: ['agreeing.'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever stayed quiet after a brief because you didn\'t want to look like you didn\'t know? What did it cost?',
    starters: ['I stayed quiet when...', 'It cost me...'],
  },
  deepen: {
    title: 'Five minutes',
    summary: 'Before your next handover, spend five extra minutes on the brief. Then count how many questions you get later, compared with usual.',
  },
  notes: 'Thomas Gilovich, Kenneth Savitsky & Victoria Husted Medvec (1998), "The Illusion of Transparency", J. Personality & Social Psychology 75(2). John R. Rizzo, Robert J. House & Sidney I. Lirtzman (1970), "Role Conflict and Ambiguity in Complex Organizations", Administrative Science Quarterly 15(2). Travis C. Tubre & Judith M. Collins (2000), meta-analysis, Journal of Management 26(1): role ambiguity negatively related to performance. Newcomers\' reluctance to ask: image costs of help-seeking (e.g. Lee 1997), hedged as "often".',
};

export default lesson;
