import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14: small models, routing, levers, privacy. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the right tool',
  summary: 'Small models with small prompts, routing the hard 10%, prompt before RAG before fine-tuning, and redacting what the model doesn\'t need. Quick check before the last stretch.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Fit the model to the job', 'Send only what\'s needed'],
  learn: [
    {
      kind: 'story',
      title: 'The tool wall',
      beats: [
        { speaker: 'narrator', text: 'Joel pins four cards to the wall: "tiny for sorting", "c for answers", "a for hard ones", "b as backup". Under them, in red: "redact first".' },
        { speaker: 'arjun', text: 'Four models? I thought we were choosing one.' },
        { speaker: 'joel', text: 'We\'re choosing one default. The others each have one job.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: the right tool.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the monthly cost of a 50/50 blend of model-c ($1.08) and model-a ($54), rounded to 2 places',
        starter: 'model_c_month = 1.08\nmodel_a_month = 54.0\n',
        solution: 'model_c_month = 1.08\nmodel_a_month = 54.0\nprint(round(0.5 * model_c_month + 0.5 * model_a_month, 2))\n',
        hint: '0.5 * model_c_month + 0.5 * model_a_month',
        checks: [{ message: 'Print 27.54', outputEquals: '27.54' }],
      },
      {
        kind: 'mcq',
        prompt: 'A 321-token prompt fails on practice-tiny. Best fix?',
        options: [
          { text: 'Switch to model-a', why: 'Fifty times the cost to avoid trimming a prompt.' },
          { text: 'Send only the top 3 matching help-page lines' },
          { text: 'Delete half the help page for good', why: 'Other questions need those lines.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Prompt, RAG, or fine-tuning?',
        groups: ['Prompt', 'RAG', 'Fine-tuning'],
        items: [
          { text: '"Never promise a delivery date"', group: 0 },
          { text: 'Look up the size chart for each question', group: 1 },
          { text: 'Train on thousands of past replies for tone', group: 2 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Replace the email in the message with "[email]" and print it',
        starter: 'import re\n\nmessage = "My email is joel@example.com"\n',
        solution: 'import re\n\nmessage = "My email is joel@example.com"\nprint(re.sub(r"\\S+@\\S+\\.com", "[email]", message))\n',
        hint: 're.sub(r"\\S+@\\S+\\.com", "[email]", message)',
        checks: [{ message: 'Print My email is [email]', outputEquals: 'My email is [email]' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each model to its job on Joel\'s wall.',
        pairs: [
          ['practice-tiny', 'Sorting messages'],
          ['model-c', 'Everyday answers'],
          ['model-a', 'Hard complaints'],
          ['model-b', 'Backup'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Let\'s fine-tune model-c on our help page so it just knows it.',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Great idea, let\'s start.', why: 'Facts go stale inside a fine-tuned model.' },
          { text: 'Fine-tuning deletes the help page.', why: 'It doesn\'t; it just bakes in a copy that goes stale.' },
          { text: 'Then every price change means training again. Keep facts in the help page and retrieve them.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the router sends everything to model-a?',
        language: 'python',
        lines: ['def pick_model(message):', '    if len(message) > 0:', '        return "model-a"', '    return "model-c"'],
        bug: 1,
        fix: '    if len(message) > 80:',
        explanation: 'Every message is longer than 0 characters.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Order of the levers.',
        template: 'First the [[1]], then [[2]], and fine-tuning last.',
        blanks: [['prompt'], ['RAG', 'retrieval']],
        distractors: ['GPU', 'licence'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'tokens = 79\nprint("fits" if tokens <= 300 else "too long")',
        language: 'python',
        options: [
          { text: 'fits' },
          { text: 'too long', why: '79 is under 300.' },
          { text: '79', why: 'It prints a word.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order what happens to each message.',
        lines: ['Customer types a message', 'Redact phone numbers and emails', 'Router picks a model', 'Retrieve the matching help-page lines', 'Call the model and show the reply'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does the R in RAG stand for?',
        answers: ['retrieval'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Joel ended up with four models, each with one job. Is that simpler or more complicated than one model for everything? Why?',
    starters: ['It\'s simpler because...', 'It\'s harder because...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 11-14. 50/50 blend 0.5*1.08 + 0.5*54 = 27.54.',
};

export default lesson;
