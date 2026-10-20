import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 20 — Chapter Challenge: Clinton answers Paul's question. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: the answer',
  summary: 'Same ndolé place, three months later. Clinton slides his one-page plan across the table to Paul. "You asked where I want to be in three years. Here\'s my best answer." Everything from this chapter.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use the whole career-planning toolkit', 'Explain your direction with evidence', 'Finish your career plan'],
  learn: [
    {
      kind: 'story',
      title: 'Lunch, again',
      beats: [
        { speaker: 'narrator', text: 'Three months later. Same table. Clinton slides one page across to Paul.' },
        { speaker: 'clinton', text: 'You asked where I want to be in three years. Here\'s my best answer: probably product. Here\'s why.' },
        { speaker: 'paul', text: '(reading, slowly) Energy audit. Bafoussam. Two specs. Hm. You\'ll be a better product person because you\'ve written the code. Most of them haven\'t.' },
        { speaker: 'paul', text: 'Aïcha needs an associate product manager next quarter. I\'ll tell her you\'re worth talking to.' },
        { speaker: 'tey', text: 'A plan, evidence, and now a sponsor. Let\'s put the chapter together.' },
      ],
    },
    {
      kind: 'steps',
      title: 'Your career-growth kit so far',
      steps: [
        { title: 'Piece 1', body: 'A first-90-days kit.' },
        { title: 'Piece 2', body: 'An impact record.' },
        { title: 'Piece 3', body: 'A promotion case.' },
        { title: 'Piece 4 (this chapter)', body: 'A one-page career plan.' },
        { title: 'Next chapter: Changing lanes', body: 'An associate product manager role opens. Clinton could quit engineering in one leap, or test the switch first.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: the answer.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What makes Clinton\'s answer convincing?',
        options: [
          { text: 'It\'s grounded in evidence: energy audit, feedback, experiments' },
          { text: 'It\'s impressive', why: 'It\'s grounded in evidence.' },
          { text: 'It\'s long', why: 'It\'s one page of evidence.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s chapter in order.',
        lines: ['Couldn\'t answer Paul\'s question', 'Ran an energy audit', 'Ranked his values', 'Explored product with small tasks', 'Wrote a one-page plan'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of Clinton\'s approach, or not?',
        groups: ['Part of it', 'Not part of it'],
        items: [
          { text: 'Talking to Aïcha', group: 0 },
          { text: 'Choosing a title to impress', group: 1 },
          { text: 'Telling Ngozi early', group: 0 },
          { text: 'Ignoring his mum\'s worry', group: 1 },
          { text: 'Planning both the workshop and the milestone', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak plan line.',
        lines: ['Direction: probably product.', 'Skills: everything.', 'Review: first Saturday each quarter.'],
        bug: 1,
        explanation: 'Two skills, not everything.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s reply to Paul\'s offer.',
        from: 'paul',
        message: 'Aïcha needs an associate PM next quarter. I\'ll tell her you\'re worth talking to.',
        options: [
          { text: '"Thank you, Paul. That means a lot. I\'ll talk to Ngozi first so there are no surprises."' },
          { text: '"Great, I\'m quitting engineering tomorrow."', why: 'Talk to Ngozi; plan the move.' },
          { text: '"No thanks."', why: 'It fits his plan; explore it.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the skill.',
        pairs: [
          ['Paul\'s first question', 'Admit it and explore'],
          ['Mum\'s bank job', 'Address the real concern'],
          ['The Bafoussam workshop', 'Agree both before saying yes'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why will Clinton be a strong product person, according to Paul?',
        options: [
          { text: 'He\'s written the code, so he knows what\'s possible' },
          { text: 'He talks a lot', why: 'He understands what\'s buildable.' },
          { text: 'He has a nice title', why: 'He\'s written the code.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Skills carry across directions', group: 0 },
          { text: 'Find your passion before planning', group: 1 },
          { text: 'If-then plans can help', group: 0 },
          { text: 'Changing direction wastes past work', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the chapter rules.',
        template: 'Gather [[1]]. Explore with small [[2]]. Review every [[3]].',
        blanks: [['evidence'], ['experiments', 'tasks'], ['quarter']],
        distractors: ['opinions', 'leaps', 'decade'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What role does Aïcha need next quarter? An associate product ___. (one word)',
        answers: ['manager'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s Clinton\'s top work value?',
        options: [
          { text: 'Building things real people rely on' },
          { text: 'An impressive title', why: 'That\'s ranked last.' },
          { text: 'The highest salary', why: '"Enough" money is third.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Three months ago you had no answer. What changed?',
        options: [
          { text: 'I stopped guessing and gathered evidence about myself: energy, values, small experiments.' },
          { text: 'I found my passion overnight.', why: 'It came from doing, not overnight.' },
          { text: 'Paul told me what to do.', why: 'He asked; Clinton found the answer.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'If someone asked you "Where do you want to be in three years?" today, what would your evidence-based answer be?',
    starters: ['Probably...', 'Because...'],
  },
  deepen: {
    title: 'Your kit, piece 4',
    summary: 'Finish your career plan. Show it to someone you trust and ask: "Does this sound like me?"',
  },
  notes: 'Chapter Challenge. Paul (CastId paul) speaks and sponsors Clinton towards the APM role. Sets up Ch5 (outline choice: quit to "go into product" with no plan, or test it inside Njangi Pay first).',
};

export default lesson;
