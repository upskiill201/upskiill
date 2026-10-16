import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Reading: unwritten expectations (psychological contract; Rousseau 1989; Robinson & Rousseau 1994). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The unwritten deal',
  summary: 'Day 23. Kavya mentions, casually, that she\'s "looking forward to the reference letter". Arjun has never mentioned a reference letter. Joel, meanwhile, assumed he\'d be paid weekly, not at the end. Nobody wrote any of it down. On the metro, Tey sends Arjun a read.',
  minutes: 12,
  outcomes: [
    'Know what a psychological contract is',
    'Know what happens when unwritten expectations are broken',
    'Bring the unwritten ones into the open, early',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The deal nobody signed',
      html: "<p>Organisational psychologist <strong>Denise Rousseau</strong> described the <strong>psychological contract</strong> (1989): the unwritten beliefs people hold about what they'll give and what they'll get in return. Not the job description. The things they assume: \"if I work hard, I'll get a reference\", \"if I deliver, I'll be trusted with more\", \"payment comes weekly\".</p><h3>When it's broken</h3><p>In a study by <strong>Sandra Robinson</strong> and Rousseau (1994), 55% of recent graduates reported that their employer had broken at least one of these unwritten promises within their first two years. When people feel the deal was broken, research has linked it to lower trust, less commitment and more people leaving, even if nobody ever actually promised anything.</p><h3>Why it happens</h3><p>Each side fills in the gaps differently, just like with a brief. Kavya assumed a reference letter because her last freelance boss gave one. Joel assumed weekly pay because that's how his last client paid. Arjun assumed nothing, because he'd never managed anyone.</p><h3>What helps</h3><ul><li><strong>Ask, early:</strong> \"What are you hoping to get from this project, besides the pay?\"</li><li><strong>Say what you can and can't offer:</strong> \"Yes to a reference if the launch goes well. Payment is in two parts: half on Day 15, half after launch.\"</li><li><strong>Write the important ones down.</strong> Even one line in the team page.</li><li><strong>Check again</strong> when things change.</li></ul><h3>Clients too</h3><p>Mr Rao has an unwritten contract with Arjun as well. Maybe he assumes free fixes for a month after launch. Better to find out on Day 23 than on Day 31.</p>",
    },
    {
      kind: 'check',
      question: 'In Robinson and Rousseau\'s study, how many graduates reported a broken unwritten promise within two years?',
      options: ['55%', '5%', '95%'],
      answer: 0,
      explanation: 'More than half, often over things nobody ever said out loud.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Everyone carries unwritten expectations. Broken ones cost trust, even if nobody promised. Ask early, say what you can offer, write the big ones down.',
    },
  ],
  apply: {
    scenario: 'The metro, reading about the unwritten deal.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a psychological contract?',
        options: [
          { text: 'The unwritten beliefs about what you\'ll give and get in return' },
          { text: 'A signed employment contract', why: 'It\'s the unwritten part.' },
          { text: 'A therapy agreement', why: 'Not this kind.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to their unwritten expectation.',
        pairs: [
          ['Kavya', 'A reference letter'],
          ['Joel', 'Weekly pay'],
          ['Mr Rao (maybe)', 'Free fixes after launch'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Brings the unwritten deal into the open, or not?',
        groups: ['Brings it out', 'Leaves it hidden'],
        items: [
          { text: '"What are you hoping to get from this?"', group: 0 },
          { text: 'Assuming they know how you pay', group: 1 },
          { text: 'One line on the team page about payment', group: 0 },
          { text: '"We\'ll sort that out later."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Sorry to ask, but is pay weekly? My last client paid every Friday.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Obviously not.', why: 'His expectation was reasonable. It just wasn\'t yours.' },
          { text: 'We\'ll talk after launch.', why: 'A money surprise is the fastest way to break trust.' },
          { text: 'Not a silly question at all, and I should have said on Day 1. Half on Day 15, which I\'ll send today, half after launch. Is that okay for you?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Denise Rousseau called it the psychological ___. (one word)',
        answers: ['contract', 'Contract'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why can a broken unwritten expectation hurt trust, even if nobody promised?',
        options: [
          { text: 'It can\'t; nobody promised', why: 'Research says it often does.' },
          { text: 'Only if it\'s written', why: 'It\'s the unwritten part that hurts.' },
          { text: 'To the person, it still feels like a broken deal' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s plan for his next project. Which line leaves the deal hidden?',
        lines: [
          'Day 1: ask "What are you hoping to get from this?"',
          'Assume people will ask if they want something.',
          'Write payment and references on the team page.',
        ],
        bug: 1,
        fix: 'Say what I can and can\'t offer, before they have to ask.',
        explanation: 'Joel and Kavya didn\'t ask. New people rarely do.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put surfacing the unwritten deal in order.',
        lines: ['Ask what they\'re hoping for', 'Say what you can offer', 'Write the big ones down', 'Check again when things change'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Find the unwritten deal [[1]], before it\'s [[2]].',
        blanks: [['early'], ['broken']],
        distractors: ['late', 'signed'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the Day 1 question.',
        tiles: ['What', 'are', 'you', 'hoping', 'to', 'get?'],
        distractors: ['owe'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one unwritten expectation you have of your job, school or a relationship? Has anyone actually agreed to it?',
    starters: ['I expect...', 'Has anyone agreed? ...'],
  },
  deepen: {
    title: 'Ask the hope question',
    summary: 'Ask one person you work with: "What are you hoping to get from this, besides the obvious?" Then say honestly what you can offer.',
  },
  notes: 'Denise M. Rousseau (1989), "Psychological and implied contracts in organizations", Employee Responsibilities and Rights Journal 2(2). Sandra L. Robinson & Denise M. Rousseau (1994), "Violating the psychological contract: Not the exception but the norm", J. Organizational Behavior 15(3): 55% of MBA alumni reported a violation within two years. Outcomes of breach: Zhao et al. (2007) meta-analysis, hedged. Fictional details.',
};

export default lesson;
