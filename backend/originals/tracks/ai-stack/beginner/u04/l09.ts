import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9 — Testing models on YOUR questions: all three score 20/30. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Testing on your own questions',
  summary: 'Joel runs the shop\'s 30 real customer questions through all three models, each with the help page. He checks every answer against what it should say. The result ends the argument.',
  minutes: 13,
  outcomes: [
    'Score a model on a set of questions with known answers',
    'Compare models on quality AND cost',
    'Pick the cheapest model that does the job',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Joel\'s test',
      steps: [
        { title: '1. The questions', body: 'rao_questions.csv: 30 real-looking customer questions, each with a phrase the right answer must contain. Three have no answer in the help page; there the right answer is "I don\'t know".' },
        { title: '2. Ask each model', body: 'Same prompt for every model: the question, with the help page as context.' },
        { title: '3. Mark each answer', body: 'Right if it contains the expected phrase (or says it doesn\'t know when it should).', code: 'def is_right(row, text):\n    want = row["answer_must_include"]\n    if want == "NOT IN POLICY":\n        return "don\'t know" in text.lower()\n    return want.lower() in text.lower()', language: 'python' },
        { title: '4. The result', body: 'model-a: 20 of 30. model-b: 20 of 30. model-c: 20 of 30. Exactly the same.' },
        { title: '5. The decision', body: 'With the answer in the prompt, the job is finding and repeating the right line, and all three do it equally. So pick the cheapest: model-c, at about $1 a month instead of $54. The 10 misses are a retrieval problem for Chapter 6, not a model problem.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Score one model',
      caption: 'Change the model name and run it again.',
      code: 'import csv\nfrom teyro_ai import PracticeModel\n\npolicies = open("rao_policies.md").read()\nquestions = list(csv.DictReader(open("rao_questions.csv")))\nmodel = PracticeModel("model-c")\n\nright = 0\nfor row in questions:\n    text = model.reply(row["question"], context=policies).text.lower()\n    want = row["answer_must_include"]\n    if want == "NOT IN POLICY":\n        right += "don\'t know" in text\n    else:\n        right += want.lower() in text\nprint(f"{right} of {len(questions)}")\n',
      challenge: 'Print the questions it gets wrong.',
    },
  ],
  apply: {
    scenario: 'The real test.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Score model-a on the 30 questions with the help page, and print how many are right',
        starter: 'import csv\nfrom teyro_ai import PracticeModel\n\npolicies = open("rao_policies.md").read()\nquestions = list(csv.DictReader(open("rao_questions.csv")))\nmodel = PracticeModel("model-a")\nright = 0\n',
        solution: 'import csv\nfrom teyro_ai import PracticeModel\n\npolicies = open("rao_policies.md").read()\nquestions = list(csv.DictReader(open("rao_questions.csv")))\nmodel = PracticeModel("model-a")\nright = 0\nfor row in questions:\n    text = model.reply(row["question"], context=policies).text.lower()\n    want = row["answer_must_include"]\n    if want == "NOT IN POLICY":\n        right += "don\'t know" in text\n    else:\n        right += want.lower() in text\nprint(right)\n',
        hint: 'Loop over questions; add 1 when the answer contains the expected phrase',
        checks: [{ message: 'Print 20', outputEquals: '20' }],
      },
      {
        kind: 'mcq',
        prompt: 'All three models score 20 of 30. Which should Ask Rao use?',
        options: [
          { text: 'model-a: it\'s the most famous', why: 'Same score, 50 times the price.' },
          { text: 'model-c: same quality on this job, about $1 a month instead of $54' },
          { text: 'None: 20 of 30 is a fail', why: 'The misses come from retrieval, which Chapter 6 fixes, whichever model is used.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its result on the shop\'s 30 questions.',
        pairs: [
          ['model-a', '20/30, about $54 a month'],
          ['model-b', '20/30, about $5.40 a month'],
          ['model-c', '20/30, about $1.08 a month'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A good test question, or not?',
        groups: ['Good', 'Not'],
        items: [
          { text: 'A real customer question with a known answer', group: 0 },
          { text: 'A question with no answer in the help page, to check "I don\'t know"', group: 0 },
          { text: 'A riddle unrelated to the shop', group: 1 },
          { text: 'A question with no agreed right answer', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Same score? Then model-a must be wasting its brain on us.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Use model-a anyway, just in case.', why: '50 times the cost for no measured gain.' },
          { text: 'The test must be broken.', why: 'It\'s working: it showed size doesn\'t help this job.' },
          { text: 'Exactly. When the answer is in the prompt, the job is easy. Save the big model for hard questions, if we ever get any.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'right = 0\nright += "7 days" in "returns within 7 days of delivery"\nright += "7 days" in "returns within 60 days"\nprint(right)',
        language: 'python',
        options: [
          { text: '1' },
          { text: '2', why: 'The second answer doesn\'t contain "7 days".' },
          { text: 'True', why: 'Adding True gives 1; adding False gives 0.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Joel\'s rule.',
        template: 'Pick the [[1]] model that scores as well as the others on [[2]] questions.',
        blanks: [['cheapest'], ['our', 'your']],
        distractors: ['biggest', 'benchmark'],
      },
      {
        kind: 'findBug',
        prompt: 'This marks every "I don\'t know" question wrong. Which line?',
        language: 'python',
        lines: ['want = row["answer_must_include"]', 'if want == "NOT IN POLICY":', '    right += want.lower() in text', 'else:', '    right += want.lower() in text'],
        bug: 2,
        fix: '    right += "don\'t know" in text',
        explanation: 'For questions with no answer in the page, the right answer is "I don\'t know".',
      },
      {
        kind: 'mcq',
        prompt: 'Where do the 10 wrong answers come from?',
        options: [
          { text: 'The models being too small', why: 'All three, big and small, miss the same 10.' },
          { text: 'The questions being wrong', why: 'They have clear answers in the page.' },
          { text: 'Picking the wrong line of the help page: a retrieval problem, the same for every model' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many of the 30 questions does model-c get right with the help page?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'The most famous option and the cheapest scored the same. Where else might a careful test save you from paying for a name?',
    starters: ['I could test...', 'Before paying for...'],
  },
  deepen: {
    title: 'An evaluation set',
    summary: 'Your 30 questions with known answers are an evaluation set. It\'s the most valuable thing an AI team builds: every future change gets run against it. Chapter 10 grows it.',
  },
  notes: 'Measured with teyro_ai: model-a, model-b and model-c each score 20/30 on rao_questions.csv with the full rao_policies.md as context (the practice models share the same grounding rules; real models would differ, which is why you test). Monthly at 30,000 chats: 54.0 / 5.4 / 1.08. Misses: Q02, Q04, Q08, Q10, Q11, Q18, Q23, Q27, Q28, Q30.',
};

export default lesson;
