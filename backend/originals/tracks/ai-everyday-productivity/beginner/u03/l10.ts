import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10. Unit Challenge: send. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Send',
  summary: 'Day 15. The internet company replies: "The fee applies under our terms." They haven\'t even mentioned clause 11. Use everything from Chapter 3 to write the follow-up that ends this.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Combine drafting, tone, proof and proofreading', 'Escalate calmly, with a real next step'],
  learn: [
    {
      kind: 'story',
      title: 'Day 15, 8:05 a.m.',
      beats: [
        { speaker: 'narrator', text: '"Dear customer, the early-exit fee applies under our terms and conditions. Kind regards." Nothing about clause 11. Nothing about the coverage check.' },
        { speaker: 'lucia', text: 'Okay. Calm. Firm. One more email.' },
        { speaker: 'narrator', text: 'Sofía, passing her desk: "Mexico has a consumer protection agency, Profeco. You can file a complaint online." Lucía checks its official website. It\'s real.' },
      ],
    },
    {
      kind: 'promptLab',
      title: 'Boss level: the follow-up',
      task: 'Get a follow-up that answers their reply, keeps the proof, and gives a real next step.',
      base: 'Write a follow-up to my internet company.',
      parts: [
        { label: 'Reference', text: 'On the 10th I asked you to remove an MX$1,850 early-exit fee.' },
        { label: 'Their gap', text: 'Your reply says the fee applies under your terms, but doesn\'t address clause 11, which says no fee applies when you can\'t serve my new address. Your coverage check confirms you can\'t.' },
        { label: 'Next step', text: 'If the fee isn\'t removed within 10 days, I\'ll file a complaint with Profeco, Mexico\'s consumer protection agency.' },
        { label: 'Tone', text: 'Calm and firm, under 120 words.' },
        { label: 'Threaten', text: 'Say I\'ll post about them everywhere and get them shut down.' },
      ],
      replies: [
        { uses: [], text: 'Dear team, I am following up on my previous email. Please get back to me. Thanks.', note: 'Following up on what? It\'s easy to send another "the fee applies".' },
        { uses: [4], text: 'If you don\'t fix this, I\'ll post about you everywhere and make sure you get shut down.', note: 'A threat she can\'t carry out. It makes the agent defensive and her case weaker.' },
        { uses: [0, 1], text: 'On the 10th I asked you to remove an MX$1,850 early-exit fee. Your reply doesn\'t address clause 11, which says no fee applies when you can\'t serve my new address, and your coverage check confirms you can\'t...', note: 'Strong proof. But what happens if they ignore it again?' },
        { uses: [0, 1, 2], text: '...your coverage check confirms you can\'t. If the fee isn\'t removed within 10 days, I\'ll file a complaint with Profeco, Mexico\'s consumer protection agency. I would much prefer to resolve this directly with you, as I have been a loyal customer for many years and have always paid on time, and I trust that...', note: 'The content is right. It\'s drifting long and soft at the end. One more part.' },
        { uses: [0, 1, 2, 3], text: 'Subject: Early-exit fee, second request (account ending 4471)\n\nHello,\nOn the 10th I asked you to remove an MX$1,850 early-exit fee. Your reply says it applies under your terms, but doesn\'t address clause 11: no fee applies when you can\'t serve my new address. Your coverage check confirms you can\'t (screenshot attached again).\n\nPlease remove the fee and confirm in writing within 10 days. If not, I\'ll file a complaint with Profeco.\n\nThank you,\nLucía Hernández', note: 'Their gap, her proof, a deadline and a real, calm next step. 85 words.' },
        { uses: [0, 1, 2, 3, 4], text: '...If not, I\'ll file a complaint with Profeco, and I\'ll post about you everywhere until you\'re shut down.', note: 'The real next step is there. The empty threat undoes it. Remove "Threaten" and send again.' },
      ],
      goal: 4,
    },
  ],
  apply: {
    scenario: 'Unit Challenge: writing with AI.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is "file a complaint with Profeco" better than "I\'ll get you shut down"?',
        options: [
          { text: 'It\'s louder', why: 'It\'s calmer, and that\'s the point.' },
          { text: 'It\'s real, she\'s checked it exists, and she can actually do it' },
          { text: 'It sounds more legal', why: 'It\'s better because it\'s true and doable.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the follow-up.',
        lines: ['What I asked before', 'What your reply missed', 'My proof', 'My request and deadline', 'The next step if not'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Chapter 3 tool to its job.',
        pairs: [
          ['Card #4 "Write it with me"', 'Keeps her voice'],
          ['Card #5 "Polish it"', 'Catches typos without a rewrite'],
          ['Tone dial', 'Calm and firm'],
          ['Checking by hand', 'Names, dates, numbers'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Add a law. Any law. It\'ll scare them.',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'Good idea, I\'ll ask AI for one.', why: 'That\'s how Article 47 happened.' },
          { text: 'A law I haven\'t checked could be made up. My clause 11 and a real agency are enough.' },
          { text: 'I\'ll add three.', why: 'More unchecked claims, less credibility.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The complaint recipe.',
        template: 'What happened, the [[1]], one request, a [[2]].',
        blanks: [['proof', 'evidence'], ['deadline']],
        distractors: ['threat', 'joke'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Did Lucía use AI for it, or do it herself?',
        groups: ['AI helped', 'Lucía herself'],
        items: [
          { text: 'Tidying her rough draft', group: 0 },
          { text: 'Checking Profeco is real', group: 1 },
          { text: 'Suggesting a speech structure', group: 0 },
          { text: 'The yellow Volkswagen story', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the AI\'s final version should she fix?',
        lines: [
          'On the 10th I asked you to remove an MX$1,850 fee.',
          'Clause 12 says no fee applies in this case.',
          'Please confirm in writing within 10 days.',
        ],
        bug: 1,
        fix: 'Clause 11.',
        explanation: 'A number drifted. Checking numbers by hand catches it before the company does.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'The speech is 520 words. Which prompt helps without taking it over?',
        options: [
          { text: 'Rewrite my speech to be better.', why: 'Invites a rewrite.' },
          { text: 'Make it more emotional.', why: 'It\'d add feelings that aren\'t hers.' },
          { text: 'Help me cut this to about 400 words. Keep every story and my words. Show me what you cut.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the name of Mexico\'s consumer protection agency?',
        answers: ['Profeco', 'PROFECO'],
        placeholder: 'Name',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Update?!',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'Fee removed in three days, in writing. Cousins paid. Speech: 400 words, all true. Papá doesn\'t know about the Volkswagen bit.' },
          { text: 'I gave up and paid.', why: 'She didn\'t.' },
          { text: 'The AI handled it all.', why: 'She checked, decided and sent.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the Chapter 3 lesson in one line?',
        options: [
          { text: 'Let AI write everything', why: 'Then it isn\'t yours.' },
          { text: 'Never use AI for writing', why: 'It made her faster and clearer.' },
          { text: 'Your facts and voice, AI\'s help with shape and polish, your final read' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Which message type needed the calm and firm dial most?',
        options: [
          { text: 'The complaint to the internet company' },
          { text: 'The cousins\' money ask', why: 'That needed warm and light.' },
          { text: 'Abuela\'s invitation', why: 'That needed warmer and simpler.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one message you\'ll write differently after this chapter? What will you do first?',
    starters: ['I\'ll write...', 'First I\'ll...'],
  },
  deepen: {
    title: 'Chapter 3 challenge: send something real',
    summary: 'Write one real message you\'ve been avoiding with card #4: your draft first, edit don\'t rewrite, a tone dial, then card #5 and a check by hand. Send it. Next chapter: Carmen calls. São Paulo has moved forward. Lucía has two weeks to open in Portuguese.',
  },
  notes: 'Profeco (Procuraduría Federal del Consumidor) is Mexico\'s federal consumer protection agency and accepts complaints, including online. The lesson has Lucía verify it on the official site. Cliffhanger into Chapter 4.',
};

export default lesson;
