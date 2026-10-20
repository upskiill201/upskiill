import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 11 — can AI just write it? Honesty and quality choice: AI to sharpen, not replace. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Can AI just write it?',
  summary: 'It\'s 1am. Clinton types "write me a cover letter for Njangi Pay graduate developer" into an AI chatbot. Ten seconds later: a perfect-looking letter. "Passionate... dynamic... I am confident I would be a valuable asset..." Send?',
  minutes: 12,
  outcomes: ['Explain what goes wrong with a fully AI-written letter', 'Use AI to sharpen your own draft', 'Keep the letter honest and in your own voice'],
  learn: [
    {
      kind: 'story',
      title: 'Ten seconds',
      beats: [
        { speaker: 'narrator', text: '1am. Clinton has been staring at paragraph three for an hour. He opens an AI chatbot and types: "Write me a cover letter for Njangi Pay, graduate developer."' },
        { speaker: 'narrator', text: 'Ten seconds. A full page appears. "I am writing to express my keen interest in... As a passionate and dynamic Computer Science graduate... I am confident I would be a valuable asset to your innovative team..."' },
        { speaker: 'clinton', text: 'It\'s... perfect? It sounds so professional.' },
        { speaker: 'miracle', text: 'Read it again. Is your mum\'s njangi in it? The phone stall? The 40 people at the library? It\'s a letter from nobody, to anybody. And Brenda reads a hundred of these a week now. They all sound the same.' },
        { speaker: 'tey', text: 'AI is a great editor and a poor author of YOUR story. It doesn\'t know what you did unless you tell it, and it tends to invent polished claims you can\'t back up. Used well, it sharpens your draft. Used as a replacement, it erases you.' },
      ],
      choice: {
        prompt: 'What should Clinton do with the AI?',
        options: [
          {
            text: 'Write his own rough draft first, then ask AI to tighten it and spot errors, and check every change.',
            outcome: 'He pastes his own messy paragraph three and asks: "Make this shorter and clearer, keep my examples, don\'t add anything I didn\'t say." It cuts 60 words. He keeps two of its suggestions and rejects one that added "proven leader". The letter is still his.',
            best: true,
          },
          {
            text: 'Send the AI letter as it is.',
            outcome: 'It sounds like every other AI letter Brenda read that week: polished, empty, and not about him. In the interview, she asks about something "he" wrote. He doesn\'t recognise it.',
          },
          {
            text: 'Never touch AI, it\'s cheating.',
            outcome: 'Using AI to tidy your own words isn\'t cheating, as long as the content is yours and true. The line is letting it think and claim for you.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Your story, your draft, your facts. AI can tidy the words. You check every change, and you never send a claim you can\'t back up.',
    },
  ],
  apply: {
    scenario: 'Clinton uses AI the honest way.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the main problem with a fully AI-written cover letter?',
        options: [
          { text: 'It doesn\'t contain your real story, and often adds claims you can\'t back up' },
          { text: 'It has too few words', why: 'The problem isn\'t length. It\'s that it isn\'t you.' },
          { text: 'Recruiters are not allowed to read it', why: 'They read it. It just doesn\'t stand out or tell your story.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request to AI keeps the letter Clinton\'s?',
        options: [
          { text: '"Write my cover letter."', why: 'Then it\'s the AI\'s letter, not his.' },
          { text: '"Make this paragraph shorter and clearer. Keep my examples. Don\'t add anything I didn\'t say."' },
          { text: '"Make me sound like a senior engineer."', why: 'That invites claims that aren\'t true.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good use of AI, or crossing the line?',
        groups: ['Good use', 'Crossing the line'],
        items: [
          { text: 'Asking it to spot typos in your draft', group: 0 },
          { text: 'Sending its letter without reading it', group: 1 },
          { text: 'Asking it to cut your paragraph by a third', group: 0 },
          { text: 'Keeping a claim it invented about you', group: 1 },
          { text: 'Asking which sentence is weakest, then fixing it yourself', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The AI edited Clinton\'s paragraph. Tap the line it invented.',
        lines: ['Every Saturday I explain phone repairs to customers in plain words.', 'As a proven leader with years of industry experience, I drive results.', 'Most customers come back for their next repair.'],
        bug: 1,
        explanation: 'He has no years of industry experience. Delete any AI claim you can\'t back up.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'Everyone uses AI for cover letters now. Doesn\'t that make it fair?',
        options: [
          { text: 'Using it to polish my own true letter, sure. Sending a letter that isn\'t about me is just a worse letter.' },
          { text: 'Yes, so send whatever it writes.', why: 'Then every letter sounds the same, and yours disappears.' },
          { text: 'No, AI is evil.', why: 'Tools aren\'t good or bad. How you use them matters.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each job to who should do it.',
        pairs: [
          ['Choosing your stories and facts', 'You, always'],
          ['Spotting typos and long sentences', 'AI can help'],
          ['Checking every change is true', 'You, before sending'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why might Brenda spot an AI-written letter quickly?',
        options: [
          { text: 'They tend to sound the same: polished phrases, no real details' },
          { text: 'They\'re written in a different colour', why: 'Ha. It\'s the sameness of the words.' },
          { text: 'She can\'t', why: 'Generic polish with no real story is easy to notice when you read hundreds.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: 'Your story, your [[1]], your facts. AI can [[2]] the words.',
        blanks: [['draft'], ['tidy', 'polish']],
        distractors: ['invent', 'photo', 'replace'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who must check every change the AI makes? (one word)',
        answers: ['you', 'me', 'yourself', 'myself'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the honest AI process in order.',
        lines: ['Write your own rough draft', 'Ask AI to tighten it without adding anything', 'Read every change', 'Delete anything untrue or not you'],
      },
    ],
  },
  reflect: {
    prompt: 'How will you use AI on your own applications, if at all? Write your personal rule in one sentence.',
    starters: ['My rule is...', 'I\'ll never let AI...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write one paragraph of a cover letter yourself. Ask any AI tool to make it shorter "without adding anything I didn\'t say". Compare the two. Keep only the changes that are true and still sound like you.',
  },
  notes: 'Honesty choice per playbook §8a.7, mirroring Study Smarter with AI\'s stance (AI to support, not replace, your own work). No Teyro AI feature is used or implied (CLAUDE.md Phase One guard). Generative AI\'s tendency to add plausible but unsupported claims ("hallucination") is widely documented; stated generally.',
};

export default lesson;
