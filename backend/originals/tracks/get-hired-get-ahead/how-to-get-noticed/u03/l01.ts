import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 1 — opens the chapter: Miracle gives Clinton's CV seven seconds. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Seven seconds',
  summary: 'Clinton sends Miracle his first CV: three pages, a photo in a borrowed suit, a "Python: 85%" skill bar and a Career Objective. She sets a timer for seven seconds. When it beeps, she knows almost nothing about him.',
  minutes: 12,
  outcomes: ['Explain why a CV\'s first look is so short', 'Put your strongest proof where it gets seen', 'Decide what to cut from a long CV'],
  learn: [
    {
      kind: 'story',
      title: 'The timer',
      beats: [
        { speaker: 'narrator', text: 'Monday. Six months to graduation. Clinton has spent the whole weekend on his CV. Three pages. A purple header. A photo of him in his uncle\'s suit. A bar chart: "Python 85%, Teamwork 90%, Leadership 95%".' },
        { speaker: 'clinton', text: 'Miracle, it\'s ready. Be honest, but also tell me it\'s amazing.' },
        { speaker: 'miracle', text: 'I\'ll do what I do at work. I give every CV a first look before I decide whether to read it properly. Timer: seven seconds. Go.' },
        { speaker: 'narrator', text: 'She scrolls. Header. Photo. "Career Objective: To obtain a challenging position in a dynamic organisation where I can utilise my skills..." Beep.' },
        { speaker: 'miracle', text: 'I know your name, that you own a suit, and that you like purple. Where\'s the Njangi Tracker? Where\'s the meet-up? They\'re on page two. Nobody reaches page two.' },
      ],
      choice: {
        prompt: 'What should Clinton do with his CV?',
        options: [
          {
            text: 'Cut it to one clear page, with his best proof near the top.',
            outcome: 'Miracle times the new version. In seven seconds she sees: CS final year, Njangi Tracker used by 42 people, grew a meet-up to 40. "Now I\'d read the rest." This chapter builds that page.',
            best: true,
          },
          {
            text: 'Add a fourth page so nothing is left out.',
            outcome: 'More pages push the best proof even further down. Recruiters don\'t read more because there is more.',
          },
          {
            text: 'Keep it, but make the photo bigger.',
            outcome: 'The photo isn\'t the problem. What she needs is proof, fast.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The first look at a CV takes seconds. Put your strongest proof where those seconds land: the top half of page one.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s first CV, under the timer.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Miracle learn almost nothing in seven seconds?',
        options: [
          { text: 'His best proof was on page two, under a photo and an objective' },
          { text: 'She reads slowly', why: 'She reads fast. The proof just wasn\'t where she looked.' },
          { text: 'The CV was too short', why: 'It was three pages. The problem was order, not length.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep near the top, or cut or move down?',
        groups: ['Near the top', 'Cut or move down'],
        items: [
          { text: 'Njangi Tracker: used by 42 people', group: 0 },
          { text: '"To obtain a challenging position in a dynamic organisation"', group: 1 },
          { text: 'Final-year Computer Science, University of Buea', group: 0 },
          { text: 'A skill bar: "Leadership 95%"', group: 1 },
          { text: 'Grew a tech meet-up from 6 to 40 members', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'But if I cut to one page, I lose so much!',
        options: [
          { text: 'I lose the parts nobody reads anyway. The best proof moves up to where it gets seen.' },
          { text: 'Then I\'ll use size 6 font to fit three pages on one.', why: 'Tiny text is harder to read in seven seconds, not easier.' },
          { text: 'Fine, I\'ll keep all three pages.', why: 'Then his best proof stays where nobody looks.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What does "Python: 85%" actually tell a recruiter?',
        options: [
          { text: 'Almost nothing: 85% of what, measured how?' },
          { text: 'Exactly how good he is', why: 'There\'s no scale behind it. Proof like a project says more.' },
          { text: 'That he\'s 15% bad at Python', why: 'Ha. It\'s a made-up number, so it says nothing either way.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that wastes the top of the CV.',
        lines: ['Clinton Ndi, Buea, clinton.ndi@email.com', 'Career Objective: To obtain a challenging position where I can utilise my skills.', 'Built the Njangi Tracker, now used by 42 savings-group members.'],
        bug: 1,
        explanation: 'Every graduate writes this sentence. It uses the best spot on the page and says nothing about Clinton.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem on Clinton\'s first CV to its fix.',
        pairs: [
          ['Three pages', 'One clear page'],
          ['Best proof on page two', 'Proof in the top half'],
          ['Skill bars with percentages', 'Projects that prove the skill'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s rule.',
        template: 'Put your strongest [[1]] where the first seconds land: the [[2]] half of page one.',
        blanks: [['proof'], ['top']],
        distractors: ['photo', 'bottom', 'hobbies'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which top line would Miracle stop and read?',
        options: [
          { text: '"Hardworking graduate seeking opportunities."', why: 'She sees this all day.' },
          { text: '"Final-year CS student who built a savings tracker now used by 42 people."' },
          { text: '"Please read my whole CV carefully."', why: 'Asking doesn\'t work. Proof does.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many seconds did Miracle\'s first-look timer give the CV? (a number)',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps the first look, or slows it down?',
        groups: ['Helps', 'Slows it down'],
        items: [
          { text: 'Clear section headings', group: 0 },
          { text: 'A big photo taking a third of the page', group: 1 },
          { text: 'A result with a number in the first bullet', group: 0 },
          { text: 'Long paragraphs', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If someone looked at your CV (or your profile, or bio) for seven seconds, what would they learn about you? What should they learn?',
    starters: ['They\'d learn...', 'They should learn...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask a friend to look at your CV for seven seconds, then tell you what they remember. If you don\'t have one yet, do it with any CV template online.',
  },
  notes: 'The seven-second timer echoes Ladders\' 2018 eye-tracking study (initial screen averaged 7.4 seconds), taught properly in l02. Clinton\'s surname Ndi is introduced here (Cameroonian surname; CAST.md lists first names only). Photo norms vary by country (l12).',
};

export default lesson;
