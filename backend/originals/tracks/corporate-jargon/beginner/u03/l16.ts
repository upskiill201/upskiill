import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 16. Myth or Fact: same letters, different meanings — PM, PR, CS, AI, CV. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Same letters, different meanings',
  summary: 'Zanele reads "the PM wants the PR by 3 p.m." and panics: why does the Prime Minister want a press release? It was the product manager. And a pull request.',
  minutes: 11,
  outcomes: [
    'Know the common acronyms that have more than one meaning',
    'Use context to pick the right meaning',
    'Ask when the context doesn\'t help',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: '"PM" always means project manager.', isFact: false, explain: 'It can mean project manager, product manager (a different job), prime minister, or after midday (p.m.). Context decides.' },
        { text: 'In a tech team, "PR" usually means a pull request: a proposed change to code.', isFact: true, explain: 'Yes. In Marketing, PR means public relations, or a press release. Same letters, different floor.' },
        { text: '"CS" can mean customer service, customer success or computer science.', isFact: true, explain: 'All three. Remi studied CS (computer science). Synergix\'s CS team (customer service) answers the phones.' },
        { text: 'In meeting notes, "AI" always means artificial intelligence.', isFact: false, explain: 'In minutes and to-do lists, AI often means action item. Brian\'s "AIs" in Chapter 3 were action items.' },
        { text: 'A "CV" and a "résumé" are always exactly the same thing.', isFact: false, explain: 'In Kenya, Nigeria and the UK, people say CV. In the US, a résumé is a short career summary, and a CV is a long academic one. Mostly the same idea; check what\'s expected.' },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'zanele', text: 'Remi. The PM wants the PR by 3. Which PM? The Prime Minister?? What did we DO?' },
        { speaker: 'remi', text: 'It\'s from the tech channel. PM = Felix\'s product manager. PR = his pull request. They\'re reviewing code.' },
        { speaker: 'zanele', text: 'Oh. I almost called Mrs Achieng.' },
        { speaker: 'tey', text: "Same letters, different floor. Context does most of the work: who sent it, which team, what they were talking about. When it doesn't, ask." },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Three context clues: WHO sent it, which TEAM they\'re in, and WHAT they were talking about just before. Still unsure? "Quick check: by PM do you mean...?"',
    },
  ],
  apply: {
    scenario: 'Friday, 11:30. The PM, the PR and a near-panic.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the letters to the most likely meaning in each team.',
        pairs: [
          ['PR, from Marketing', 'Public relations'],
          ['PR, from the code team', 'Pull request'],
          ['CS, on a call-centre rota', 'Customer service'],
          ['AI, in meeting minutes', 'Action item'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Brian\'s minutes say "3 AIs for Remi". What are they?',
        options: [
          { text: 'Three robots to help him', why: 'Sadly not. In minutes, AI usually means action item.' },
          { text: 'Three artificial intelligence tools', why: 'Context: they\'re in meeting minutes.' },
          { text: 'Three action items: tasks for Remi' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'What does "PM" mean here?',
        groups: ['Afternoon', 'A job title'],
        items: [
          { text: '"Meeting at 3 PM"', group: 0 },
          { text: '"Ask the PM about the launch date"', group: 1 },
          { text: '"Our new PM starts Monday"', group: 1 },
          { text: '"Deadline: 5 PM today"', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Brian says "send the CS numbers". Customer service? Customer success? I have both!',
        prompt: 'What should she do?',
        options: [
          { text: 'Send both and hope.', why: 'Twice the work, and Brian still has to guess.' },
          { text: 'Ask: "Quick check: by CS do you mean customer service or customer success?"' },
          { text: 'Send computer science numbers.', why: 'That\'s Remi\'s degree, not a team.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In a code team, PR usually means pull ... (one word)',
        answers: ['request'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What are the three context clues?',
        options: [
          { text: 'Who sent it, which team, what came just before' },
          { text: 'The font, the colour and the length', why: 'Those don\'t tell you the meaning.' },
          { text: 'Time, date and weather', why: 'Not much help.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s notes. Which one is wrong?',
        lines: [
          'PM can mean project manager or product manager.',
          'CS can mean customer service or computer science.',
          'AI always means artificial intelligence.',
        ],
        bug: 2,
        fix: 'AI can mean artificial intelligence or action item.',
        explanation: 'In minutes and to-do lists, AI often means action item.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['LGTM', 'Looks good to me'],
          ['SOP', 'Standard operating procedure'],
          ['Lead', 'Someone who might become a customer'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Remi\'s polite check.',
        template: 'Quick [[1]]: by PM, do you [[2]] the product manager?',
        blanks: [['check', 'question'], ['mean']],
        distractors: ['panic', 'Prime'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s calming message to Zanele.',
        tiles: ['It\'s', 'the', 'product', 'manager,', 'not', 'the', 'Prime', 'Minister.'],
        distractors: ['PR'],
      },
    ],
  },
  reflect: {
    prompt: 'Which acronym means something different in your world than it does elsewhere? Have you ever been confused by one?',
    starters: ['In my world, ... means...', 'I was confused when...'],
  },
  deepen: {
    title: 'Your double-meaning list',
    summary: 'Add a "careful!" section to your acronym list: PM, PR, CS, AI, CV, and any you discover. These are the ones to check before acting.',
  },
  notes: 'PM (project/product manager, prime minister, post meridiem), PR (public relations, press release, pull request — GitHub term), CS (customer service/success, computer science), AI (artificial intelligence, action item), CV vs résumé (Cambridge: CV UK; résumé US; US academic CV distinct).',
};

export default lesson;
