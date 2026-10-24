import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 14 — Privacy: what you send to a model provider. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Privacy: where the words go',
  summary: 'A customer types her phone number and email into Ask Rao. Arjun asks: where does that go? Tey explains what leaves the shop when you call a hosted model, and how to send less.',
  minutes: 12,
  outcomes: [
    'Know that a hosted API receives everything in the prompt',
    'Check a provider\'s data terms',
    'Remove phone numbers and emails before sending',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'When Ask Rao calls a hosted model, the whole prompt travels to the provider: system prompt, help-page lines, and whatever the customer typed. Including a phone number.', replies: ['Do they keep it?'] },
        { tey: 'Depends on the provider\'s terms. Read three things: do they store prompts, for how long, and do they train on them? Many business API plans say no training by default, but check the terms, not the marketing.', replies: ['Can we send less?'] },
        { tey: 'Yes. Ask Rao doesn\'t need a phone number to answer "where is my order?". Swap it for [phone] before sending. Same for emails. That\'s called redacting.', replies: ['And open-weight models?'] },
        { tey: 'If you run one on your own server, the words never leave. That\'s a real reason to self-host. But a hosted open-weight API is still someone else\'s computer: same questions about terms.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Redact before sending',
      caption: 'Simple patterns for an Indian mobile number and an email.',
      code: 'import re\n\nmessage = "I\'m Priya, 98765 43210, priya@example.com. Where is order 1042?"\nclean = re.sub(r"\\S+@\\S+\\.com", "[email]", message)\nclean = re.sub(r"\\d{5} \\d{5}", "[phone]", clean)\nprint(clean)\n',
      challenge: 'What happens if the number is typed without the space?',
    },
  ],
  apply: {
    scenario: 'Keeping customer details safe.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Replace the phone number "98765 43210" with "[phone]" using re.sub, and print the result',
        starter: 'import re\n\nmessage = "Call me on 98765 43210"\n',
        solution: 'import re\n\nmessage = "Call me on 98765 43210"\nprint(re.sub(r"\\d{5} \\d{5}", "[phone]", message))\n',
        hint: 're.sub(r"\\d{5} \\d{5}", "[phone]", message)',
        checks: [{ message: 'Print Call me on [phone]', outputEquals: 'Call me on [phone]' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does a hosted model provider receive when Ask Rao calls it?',
        options: [
          { text: 'Only the question, never the details', why: 'Everything in the prompt is sent.' },
          { text: 'The whole prompt: instructions, help-page lines and the customer\'s message' },
          { text: 'Nothing; it all stays in the browser', why: 'A hosted API runs on the provider\'s computers.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does Ask Rao need it to answer, or should it be redacted?',
        groups: ['Needed', 'Redact'],
        items: [
          { text: 'The order number', group: 0 },
          { text: 'The customer\'s phone number', group: 1 },
          { text: 'The question about delivery', group: 0 },
          { text: 'The customer\'s email address', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to ask a provider with what it protects against.',
        pairs: [
          ['Do you store prompts?', 'Data sitting on their servers'],
          ['For how long?', 'Old chats kept for years'],
          ['Do you train on them?', 'Customer words ending up in a model'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Should we just ban customers from typing phone numbers?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Yes, block any message with digits.', why: 'Order numbers are digits too, and Ask Rao needs them.' },
          { text: 'It doesn\'t matter.', why: 'Customer details are worth protecting, and laws often require it.' },
          { text: 'They\'ll type them anyway. Redact automatically before sending, and say in the chat that details are removed.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'import re\nprint(re.sub(r"\\S+@\\S+\\.com", "[email]", "Mail priya@example.com today"))',
        language: 'python',
        options: [
          { text: 'Mail [email] today' },
          { text: 'Mail priya@example.com today', why: 'The pattern matches the address.' },
          { text: '[email]', why: 'Only the matching part is replaced.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The privacy rule.',
        template: 'Send the model only what it [[1]]; [[2]] the rest.',
        blanks: [['needs'], ['redact', 'remove']],
        distractors: ['wants', 'repeat'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line sends the phone number to the provider?',
        language: 'python',
        lines: ['clean = re.sub(r"\\d{5} \\d{5}", "[phone]", message)', 'model = PracticeModel("model-c")', 'reply = model.reply(message, context=lines)', 'print(reply.text)'],
        bug: 2,
        fix: 'reply = model.reply(clean, context=lines)',
        explanation: 'It redacts, then sends the original message anyway.',
      },
      {
        kind: 'mcq',
        prompt: 'When do the words never leave the shop?',
        options: [
          { text: 'When you use a hosted open-weight API', why: 'That\'s still the provider\'s computer.' },
          { text: 'When the prompt is short', why: 'Short prompts still travel.' },
          { text: 'When an open-weight model runs on the shop\'s own server' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is removing personal details before sending called?',
        answers: ['redacting', 'redaction', 'redact'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Think of an app you use that has an AI chat. What would you not want it to send to another company?',
    starters: ['I wouldn\'t want it to send...', 'I\'d want to know...'],
  },
  deepen: {
    title: 'Privacy laws',
    summary: 'India\'s Digital Personal Data Protection Act 2023 and Europe\'s GDPR set rules for handling personal data. A business sending customer data to a provider needs to know where it goes and why.',
  },
  notes: 'Hosted APIs receive the full prompt. Provider data terms vary (retention period, training on API data, zero-retention options); many business API terms state no training on customer data by default, but terms change, so check current ones. India DPDP Act 2023; EU GDPR. Regex measured: "I\'m Priya, 98765 43210, priya@example.com. Where is order 1042?" -> "I\'m Priya, [phone], [email]. Where is order 1042?".',
};

export default lesson;
