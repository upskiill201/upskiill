import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 11 — System prompts and roles. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'System prompts and roles',
  summary: 'Arjun shows the team what a real chat request looks like underneath: not one block of text, but labelled parts. One part, the system prompt, is where Ask Rao\'s personality and rules live.',
  minutes: 11,
  outcomes: [
    'Name the three roles: system, user and assistant',
    'Write a system prompt that sets rules and tone',
    'See a careful instruction change the practice model\'s answer',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Three roles',
      html: '<p>A chat request is a list of messages, each with a <strong>role</strong>:</p><ul><li><strong>system</strong>: instructions from the app builder. Who the assistant is, how it talks, what it must and mustn\'t do. The customer never sees it.</li><li><strong>user</strong>: what the customer typed.</li><li><strong>assistant</strong>: the model\'s earlier replies, resent as history.</li></ul><p>A good system prompt for Ask Rao might say:</p><pre><code>You are Ask Rao, the assistant for Mr Rao\'s clothing shop.\nAnswer only from the shop information provided.\nIf the answer isn\'t there, say you don\'t know and offer WhatsApp help.\nKeep replies to two short sentences.</code></pre><p>Three things to remember:</p><ol><li>Instructions <strong>steer</strong> the model; they don\'t lock it. Chapter 1\'s injection showed that.</li><li>Clear, specific rules beat vague ones ("two short sentences" beats "be concise").</li><li>The system prompt is sent with <strong>every</strong> message, so its tokens are paid for every time. Keep it tight.</li></ol>',
    },
    {
      kind: 'tryIt',
      title: 'One instruction changes the answer',
      caption: 'No help page given. Watch what the instruction does.',
      code: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\nquestion = "Do you have a discount code?"\nprint(m.reply(question))\nprint(m.reply(question, system="If you don\'t know, say you don\'t know."))\n',
      challenge: 'Try the return-policy question with and without the instruction.',
    },
  ],
  apply: {
    scenario: 'Setting the rules.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Ask "Do you have a discount code?" with the system prompt "If you don\'t know, say you don\'t know." and print the reply',
        starter: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\n',
        solution: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\nprint(m.reply("Do you have a discount code?", system="If you don\'t know, say you don\'t know."))\n',
        hint: 'm.reply("...", system="...")',
        checks: [{ message: 'Print an "I don\'t know" reply', outputIncludes: "I don't know" }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the role to what it holds.',
        pairs: [
          ['system', 'The app builder\'s instructions'],
          ['user', 'What the customer typed'],
          ['assistant', 'The model\'s earlier replies'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Who sees the system prompt?',
        options: [
          { text: 'Only the customer', why: 'The customer never sees it.' },
          { text: 'The model, but not the customer' },
          { text: 'Nobody', why: 'The model reads it with every message.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'A clear system-prompt rule, or a vague one?',
        groups: ['Clear', 'Vague'],
        items: [
          { text: '"Keep replies to two short sentences."', group: 0 },
          { text: '"Be good."', group: 1 },
          { text: '"If the answer isn\'t provided, say you don\'t know."', group: 0 },
          { text: '"Be smart about things."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'I\'ll write a 2,000-word system prompt covering everything!',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Longer is always better.', why: 'Every system token is paid for on every message.' },
          { text: 'System prompts are ignored.', why: 'They strongly steer the model.' },
          { text: 'It goes with every message, so we\'d pay for 2,000 words each time, and the important rules get lost. Short and specific works better.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Give the model its rules.',
        language: 'python',
        template: 'reply = m.reply(question, [[1]]="You are Ask Rao. Answer only from the shop information.", [[2]]=policies)',
        blanks: [['system'], ['context']],
        distractors: ['user', 'temperature'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this system prompt is a problem?',
        lines: [
          'You are Ask Rao, the shop\'s assistant.',
          'Answer only from the shop information provided.',
          'The admin password is rao2026.',
          'Keep replies short.',
        ],
        bug: 2,
        fix: 'Delete it: no secrets in prompts.',
        explanation: 'Anything in the prompt can be leaked by an injection (Chapter 1, lesson 14).',
      },
      {
        kind: 'mcq',
        prompt: 'Instructions in the system prompt are best thought of as...',
        options: [
          { text: 'Strong steering, not a lock' },
          { text: 'A lock nobody can get past', why: 'Injections can override them.' },
          { text: 'Decoration', why: 'They change answers, as you just saw.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many practice tokens this system prompt costs on every message',
        starter: 'from teyro_ai import count_tokens\n\nsystem = "You are Ask Rao. Answer only from the shop information. Keep replies short."\n',
        solution: 'from teyro_ai import count_tokens\n\nsystem = "You are Ask Rao. Answer only from the shop information. Keep replies short."\nprint(count_tokens(system))\n',
        hint: 'count_tokens(system)',
        checks: [{ message: 'Print 21', outputEquals: '21' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which role holds what the customer typed?',
        answers: ['user'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'If you wrote a two-line system prompt for an assistant at your work, what would it say?',
    starters: ['You are...', 'Always/never...'],
  },
  deepen: {
    title: 'Prompt versions',
    summary: 'Teams keep system prompts in their code, with versions, and test every change. A one-word edit can change thousands of answers. Chapter 9 covers changing prompts safely.',
  },
  notes: 'Chat APIs use role-tagged messages: system, user, assistant. teyro_ai practice model: without context, a system prompt containing "don\'t know" makes it answer "I don\'t know. That isn\'t in the information I was given."; without it, "Do you have a discount code?" gets the made-up WELCOME50 line.',
};

export default lesson;
