import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 16 — a personal style guide the AI can use every time. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Your writing voice, saved',
  summary: 'Companies use style guides so everyone writes consistently. Build a one-screen guide for yourself and hand it to the AI.',
  minutes: 13,
  outcomes: [
    'Build a one-screen personal style guide',
    'Store it where the AI can use it every time',
    'Keep it up to date as your writing changes',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Build your one-screen style guide',
      steps: [
        { title: 'Start with your voice note', body: 'From Lesson 2: sentence length, word choice, openings, sign-offs, warmth.' },
        { title: 'Add your "never say" list', body: 'The phrases you dislike. "Reach out", "circle back", "I hope this finds you well".' },
        {
          title: 'Add your defaults per channel',
          body: 'How long and how formal, by where you write.',
          code: 'Chat: 1-2 lines, friendly, no greeting paragraph.\nClient email: ask first, 4-6 lines, warm.\nManager update: 3-5 bullets, decision first.\nDocuments: title, 1-line summary, message headings.',
          language: 'plaintext',
        },
        { title: 'Add your facts rule', body: '"Only use facts I give you. Mark anything unclear with [?]."' },
        { title: 'Store it and reuse it', body: 'In your AI tool\'s custom or saved instructions if it has them; otherwise a note you paste at the top of writing requests.' },
      ],
    },
    {
      kind: 'reading',
      title: 'Why style guides work',
      html:
        '<p>Newsrooms, governments and big brands all keep <strong>style guides</strong>: short rules on tone, words to avoid and how to format things. They exist because consistency builds trust, and because nobody wants to make the same decisions a hundred times.</p>' +
        '<p>Your personal style guide does the same for you and your AI tools. Instead of repeating "short, friendly, no jargon, don\'t say reach out" in every request, you write it once.</p>' +
        '<h3>Keep it alive</h3>' +
        '<ul>' +
        '<li><strong>One screen, max.</strong> If it gets longer, the important rules get diluted.</li>' +
        '<li><strong>Update it when you correct the AI twice.</strong> If you keep fixing the same thing, it belongs in the guide.</li>' +
        '<li><strong>Different hats, different guides.</strong> Some people keep one for work and one for personal writing.</li>' +
        '</ul>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Rule of thumb: if you correct the AI on the same thing twice, add it to your style guide.',
    },
    {
      kind: 'check',
      question: 'When should something go into your style guide?',
      options: ['When you correct the AI on it twice', 'Never, just remember it', 'Only on your first day'],
      answer: 0,
    },
  ],
  apply: {
    scenario: 'Ada is building her personal style guide.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the style-guide steps.',
        lines: ['Start with your voice note', 'Add your never-say list', 'Add defaults per channel', 'Add your facts rule', 'Store it and reuse it'],
      },
      {
        kind: 'mcq',
        prompt: 'Why do organisations keep style guides?',
        options: [
          { text: 'To make writing longer', why: 'Usually the opposite.' },
          { text: 'Consistency builds trust, and decisions get made once' },
          { text: 'Only for legal reasons', why: 'Mostly for clarity and consistency.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the channel to Ada\'s default.',
        pairs: [
          ['Chat', '1-2 lines, friendly'],
          ['Client email', 'Ask first, 4-6 lines'],
          ['Manager update', '3-5 bullets, decision first'],
          ['Documents', 'Summary first, message headings'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s facts rule.',
        tiles: ['Only', 'use', 'facts', 'I', 'give', 'you'],
        distractors: ['invent', 'more'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in the style guide, or not?',
        groups: ['Style guide', 'Not needed'],
        items: [
          { text: 'Never say "circle back"', group: 0 },
          { text: 'Chat: 1-2 lines', group: 0 },
          { text: "Today's lunch order", group: 1 },
          { text: 'Mark unclear points with [?]', group: 0 },
          { text: 'A one-off client\'s phone number', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "I keep telling the AI 'no exclamation marks in client emails'. Every. Single. Time.",
        prompt: 'What should Ada suggest?',
        options: [
          { text: 'Keep telling it each time.', why: 'That is the problem a style guide solves.' },
          { text: 'Accept the exclamation marks.', why: 'She does not have to.' },
          { text: "Put it in a personal style guide and add it to your tool's saved instructions, or paste it at the top." },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Spot the line that makes this style guide worse.',
        lines: ['Short sentences, everyday words.', 'Never say "reach out".', 'Here is my 12-page essay on the history of punctuation.', 'Only use facts I give you.'],
        bug: 2,
        explanation: 'One screen, max. Long guides dilute the rules that matter.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A personal style guide should fit on one ... (one word)',
        answers: ['screen', 'page'],
        placeholder: 'One word',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule of thumb.',
        template: 'If you [[1]] the AI on the same thing [[2]], add it to your style [[3]].',
        blanks: [['correct'], ['twice'], ['guide']],
        distractors: ['praise', 'never'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request uses Ada\'s style guide best?',
        options: [
          { text: 'Write my client update, the usual way.', why: 'The AI does not know "the usual way" unless you give it.' },
          { text: '[style guide pasted] Using my style guide: client email to Lucía, testing moved to Friday, need palette OK by Wednesday.' },
          { text: 'Write my update in any style.', why: 'Throws away the guide.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good place to store it, or not?',
        groups: ['Good', 'Not practical'],
        items: [
          { text: 'Saved instructions in the AI tool (if available)', group: 0 },
          { text: 'A note to paste at the top of requests', group: 0 },
          { text: 'A sticky note under the desk', group: 1 },
          { text: 'Only in your head', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Do I need one style guide or several? I write very differently to my team vs to our CEO.",
        prompt: "What's the best advice?",
        options: [
          { text: 'Exactly one, always.', why: 'Different hats can need different guides.' },
          { text: 'One guide with defaults per reader works; or keep two short ones if your hats are very different.' },
          { text: 'One per email you send.', why: 'Far too many to maintain.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The list of phrases you never use is your "never ..." list (one word)',
        answers: ['say', 'use'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the guide part to what it stops.',
        pairs: [
          ['Never-say list', 'Phrases you hate'],
          ['Channel defaults', 'Essays in chat'],
          ['Facts rule', 'Invented details'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How often should Ada update her style guide?',
        options: [
          { text: 'Never', why: 'Writing habits change; keep it alive.' },
          { text: 'Every hour', why: 'Too often to be useful.' },
          { text: 'Whenever she keeps correcting the AI on the same thing' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Draft your own one-screen style guide here: voice, never-say list, channel defaults, facts rule.',
    starters: ['Voice:', 'Never say:', 'Defaults:', 'Facts rule:'],
  },
  deepen: { title: 'Go deeper', summary: 'Many organisations publish their style guides online. Look at one for ideas on tone and words to avoid.' },
  notes: 'Style guides are a standard publishing practice. "Custom/saved instructions" referenced as "if it has them".',
};

export default lesson;
