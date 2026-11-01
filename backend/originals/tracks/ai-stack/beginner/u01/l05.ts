import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4: the brief, the journey, the six layers, the myths. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the map',
  summary: 'Joel\'s list of six layers is pinned above his desk. Kavya has seen the model make up a return policy, and fixed it with one line. Quick check before they look at what breaks, and where.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Name the layers and their jobs without notes', 'Ground a reply in the shop\'s facts'],
  learn: [
    {
      kind: 'story',
      title: 'The pinned list',
      beats: [
        { speaker: 'narrator', text: 'Above Joel\'s desk: six layers, one job each. Under it, in Kavya\'s handwriting: "Model knows nothing about us. Give it the facts."' },
        { speaker: 'arjun', text: 'That second line will save you more trouble than anything else this month.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the map of the stack.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Ask "How long does delivery to Pune take?" with the shop\'s policies as context and print the reply',
        starter: 'from teyro_ai import PracticeModel\n\nmodel = PracticeModel()\npolicies = open("rao_policies.md").read()\n',
        solution: 'from teyro_ai import PracticeModel\n\nmodel = PracticeModel()\npolicies = open("rao_policies.md").read()\nprint(model.reply("How long does delivery to Pune take?", context=policies))\n',
        hint: 'context=policies',
        checks: [{ message: 'Print the Pune delivery time', outputEquals: 'Orders in Pune arrive in 1 to 2 days.' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the layer to an example from Ask Rao.',
        pairs: [
          ['Application', 'The chat box on the shop\'s site'],
          ['Data and retrieval', 'The help page and order records'],
          ['Model', 'The thing that writes replies'],
          ['Compute', 'GPUs that run the model'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Without the policies, the model said returns are allowed for 60 days. Why?',
        options: [
          { text: 'It had never seen the shop\'s policies, so it made up a likely-sounding answer' },
          { text: 'It read an old policy', why: 'It read nothing. It guessed.' },
          { text: 'It was being funny', why: 'Models hallucinate with a straight face.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the token count of "Is delivery free?"',
        starter: 'from teyro_ai import count_tokens\n',
        solution: 'from teyro_ai import count_tokens\nprint(count_tokens("Is delivery free?"))\n',
        hint: 'count_tokens("Is delivery free?")',
        checks: [{ message: 'Print 5', outputEquals: '5' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the journey of a message.',
        lines: ['Chat box sends the message', 'Code decides what it needs', 'Facts are looked up', 'Model writes the reply', 'Reply is checked and shown'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which layer?',
        groups: ['Orchestration', 'Evaluation and governance'],
        items: [
          { text: 'Choosing to look up an order', group: 0 },
          { text: 'Measuring how often answers are right', group: 1 },
          { text: 'Building the prompt', group: 0 },
          { text: 'Keeping a log of every answer', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line crashes?',
        language: 'python',
        lines: ['from teyro_ai import PracticeModel', 'model = PracticeModel', 'print(model.reply("Hi!"))'],
        bug: 1,
        fix: 'model = PracticeModel()',
        explanation: 'PracticeModel() with brackets creates a model. Without them you only have the name of the class.',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Mr Rao asked "how much?" again. What do we know so far?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Nothing, and we never will.', why: 'Tokens and volume make it calculable.' },
          { text: 'That cost depends on tokens per chat and chats per day. We\'ll have a number this week.' },
          { text: 'It\'s free because the practice model is free.', why: 'The practice model is for learning. A real model charges per token.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Give the model the facts.',
        language: 'python',
        template: 'policies = open("rao_policies.md").[[1]]()\nprint(model.reply(question, [[2]]=policies))',
        blanks: [['read'], ['context']],
        distractors: ['write', 'facts'],
      },
      {
        kind: 'mcq',
        prompt: 'Which statement is a myth?',
        options: [
          { text: 'Every answer has a cost', why: 'That\'s a fact.' },
          { text: 'The right document can fix a wrong answer', why: 'That\'s a fact too.' },
          { text: 'A confident answer is probably right' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which layer is at the very bottom of the stack? (infrastructure and ...)',
        answers: ['compute', 'infrastructure and compute'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Kavya\'s note says "Model knows nothing about us. Give it the facts." Which of your own work tasks would an AI get wrong without your facts?',
    starters: ['An AI would get... wrong', 'It would need...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1-4. Practice model with rao_policies.md answers the Pune question with "Orders in Pune arrive in 1 to 2 days."; count_tokens("Is delivery free?") = 5.',
};

export default lesson;
