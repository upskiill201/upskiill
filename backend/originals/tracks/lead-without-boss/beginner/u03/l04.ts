import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Myth or Fact: why people value what they help build (IKEA effect; co-creation). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'People back what they build',
  summary: 'Zanele has built a beautiful new refund form. Finished. Perfect. She wants to show the team on Monday and "save them the work". Tey has a question first: "Have you heard of the IKEA effect?"',
  minutes: 11,
  outcomes: [
    'Know what the IKEA effect is',
    'Leave room for others to shape the work',
    'Know when a finished plan helps, and when it hurts',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'People value things more when they\'ve helped make them.', isFact: true, explain: 'Fact. In studies by Michael Norton, Daniel Mochon and Dan Ariely (2012), people valued furniture they assembled themselves, origami they folded and Lego they built more than identical items made by others. They called it the IKEA effect.' },
        { text: 'A perfect, finished plan is always the best thing to bring to a team.', isFact: false, explain: 'Myth. A finished plan leaves nothing for anyone else to build. When you need people to own it, bring a strong draft with clear gaps, and let them fill them.' },
        { text: 'The IKEA effect only works if people finish the task.', isFact: true, explain: 'Fact. In the same studies, the effect disappeared when people built something and then had to take it apart, or failed to finish. Contributions need to land and be visible.' },
        { text: 'Asking for input is just a polite trick to make people feel included.', isFact: false, explain: 'Myth, and a dangerous one. If you ask for input and ignore it, people notice, and trust drops. Only ask when you\'re genuinely willing to change things.' },
        { text: 'People who help shape a change are more likely to support it.', isFact: true, explain: 'Fact, broadly. Research on participation in decisions, going back decades, links involvement with stronger commitment to the result. That\'s why Kotter, Cohen and Bradford all say: build it with them.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'People value what they help build. Bring a strong draft with real gaps. Make sure contributions land and are visible. Only ask if you\'ll really change it.',
    },
  ],
  apply: {
    scenario: 'Myth or fact, before Monday.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the IKEA effect?',
        options: [
          { text: 'Flat-pack furniture is cheaper', why: 'It\'s about how much we value it.' },
          { text: 'We value things more when we\'ve helped make them' },
          { text: 'Swedish design is popular', why: 'Not the research.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'A finished plan is always best', group: 0 },
          { text: 'We value what we help build', group: 1 },
          { text: 'Asking for input is just a trick', group: 0 },
          { text: 'Shaping a change builds support', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'But my form is already perfect. Why make them redo it?',
        prompt: 'What does Remi say?',
        options: [
          { text: 'You\'re right, just give it to them.', why: 'A perfect form nobody owns gets ignored on the floor.' },
          { text: 'Throw it away and start again with them.', why: 'Waste. A strong draft with gaps is ideal.' },
          { text: 'It IS great. Let\'s show it as a draft and ask Njeri\'s team to fix the warehouse bit. They\'ll actually use it then.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Norton, Mochon and Ariely named it the ___ effect. (one word)',
        answers: ['IKEA', 'Ikea', 'ikea'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'When did the IKEA effect disappear in the studies?',
        options: [
          { text: 'When people didn\'t finish, or had to take their work apart' },
          { text: 'When the furniture was expensive', why: 'Price wasn\'t it.' },
          { text: 'It never disappears', why: 'It did, when work didn\'t land.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the approach to what happens.',
        pairs: [
          ['Finished, perfect plan', 'Nobody else owns it'],
          ['Strong draft with gaps', 'People fill gaps and own it'],
          ['Asking, then ignoring', 'Trust drops'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s Monday plan. Which line breaks the lesson?',
        lines: [
          'Show Zanele\'s form as a draft.',
          'Ask for ideas, then use the original anyway.',
          'Njeri\'s team fixes the warehouse section.',
        ],
        bug: 1,
        fix: 'Show next week\'s version with their changes highlighted.',
        explanation: 'Asking and ignoring is worse than not asking.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put co-creating in order.',
        lines: ['Bring a strong draft', 'Point out the real gaps', 'Let them fill the gaps', 'Show their changes in the final version'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'People [[1]] what they help [[2]].',
        blanks: [['back', 'value', 'support'], ['build', 'make', 'create']],
        distractors: ['ignore', 'buy'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build how Remi introduces the form.',
        tiles: ['Here\'s', 'a', 'draft.', 'What', 'would', 'you', 'change?'],
        distractors: ['final.'],
      },
    ],
  },
  reflect: {
    prompt: 'When did you care more about something because you helped build it? How could you leave room for others in something you\'re working on?',
    starters: ['I cared more about...', 'I could leave room by...'],
  },
  deepen: {
    title: 'Leave a gap',
    summary: 'Next time you share a plan, leave one real gap on purpose and ask someone to fill it. Then use what they give you, and show them where it went.',
  },
  notes: 'Michael I. Norton, Daniel Mochon & Dan Ariely (2012), "The IKEA effect: When labor leads to love", Journal of Consumer Psychology 22(3): effect dissipates when tasks are not completed or are destroyed. Participation and commitment: Coch & French (1948) and later participative decision-making research, hedged as "broadly".',
};

export default lesson;
