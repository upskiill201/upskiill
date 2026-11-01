import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 11 — Why the stack keeps changing: layers stay, tools change. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Why the stack keeps changing',
  summary: 'Kavya sends Joel a link: "New vector database, everyone\'s switching!" It\'s the third this month. Joel wonders how anyone keeps up. Arjun\'s answer: you don\'t follow the logos, you follow the jobs.',
  minutes: 11,
  outcomes: [
    'Explain why AI tools change so fast',
    'Read a new tool by asking which layer and which job',
    'Know a few dates that shaped today\'s stack',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Layers stay, logos change',
      html: '<p>A few dates explain why the stack looks the way it does:</p><ul><li><strong>2017:</strong> researchers at Google publish <em>Attention Is All You Need</em>, describing the <strong>transformer</strong>, the design behind almost every large language model since.</li><li><strong>30 November 2022:</strong> OpenAI releases ChatGPT to the public. Within months, every layer of the stack fills with new companies and tools.</li><li><strong>2023 onwards:</strong> open-weight models (Meta\'s Llama among the first widely used) let anyone download and run capable models, so "build or buy" becomes a real choice at the model layer.</li></ul><p>Since then, new tools appear every week. Most are new ways of doing an old job. When a new name lands in your feed, ask three questions:</p><ol><li><strong>Which layer is it in?</strong> Compute, model, data, orchestration, app or evaluation.</li><li><strong>What job does it do</strong> better, cheaper or faster?</li><li><strong>What would switching cost</strong> us, in time, money and risk?</li></ol><p>If you can\'t answer the first question, you don\'t need it yet.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Read a new tool',
      caption: 'Put a new name on the map before you get excited.',
      code: 'new_tool = "a new vector database"\nlayer = "Data and retrieval"\njob = "store and search embeddings"\nprint(f"{new_tool}: {layer}, to {job}")\n',
      challenge: 'Describe "a new guardrails library" the same way.',
    },
  ],
  apply: {
    scenario: 'Following jobs, not logos.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did the 2017 paper "Attention Is All You Need" describe?',
        options: [
          { text: 'The first GPU', why: 'GPUs came long before. The paper is about a model design.' },
          { text: 'The transformer, the design behind most large language models' },
          { text: 'ChatGPT', why: 'ChatGPT came in 2022, built on the transformer idea.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'How many years from the transformer paper (2017) to ChatGPT\'s release (2022)? Print it',
        starter: 'transformer = 2017\nchatgpt = 2022\n',
        solution: 'transformer = 2017\nchatgpt = 2022\nprint(chatgpt - transformer)\n',
        hint: 'chatgpt - transformer',
        checks: [{ message: 'Print 5', outputEquals: '5' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the events in order.',
        lines: ['The transformer paper (2017)', 'ChatGPT released to the public (2022)', 'Open-weight models widely used (2023 on)'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Changes every few months, or stays the same for years?',
        groups: ['Changes often', 'Stays the same'],
        items: [
          { text: 'Which vector database is popular', group: 0 },
          { text: 'The job of retrieval', group: 1 },
          { text: 'Model prices', group: 0 },
          { text: 'The six layers', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Everyone\'s switching to the new vector database. Should we?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Yes, everyone is.', why: 'Popularity isn\'t a reason. The job and the cost are.' },
          { text: 'Never use new tools.', why: 'Sometimes a new tool is worth it. Ask the three questions.' },
          { text: 'Which job would it do better for us, and what would switching cost? We have 15 help-page lines; we don\'t need it yet.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to what it protects you from.',
        pairs: [
          ['Which layer is it in?', 'Buying something you don\'t understand'],
          ['What job does it do better?', 'Switching for no gain'],
          ['What would switching cost?', 'Surprise work and risk'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Arjun\'s rule.',
        template: 'Don\'t follow the [[1]]. Follow the [[2]].',
        blanks: [['logos'], ['jobs']],
        distractors: ['rules', 'news'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s plan skips the three questions?',
        lines: [
          'Read about the new tool.',
          'Place it on the stack map.',
          'Switch Ask Rao to it today because it\'s trending.',
          'Compare it with what we have.',
        ],
        bug: 2,
        fix: 'Decide after comparing the job and the cost of switching.',
        explanation: 'Trending isn\'t a reason. Decide after answering the questions.',
      },
      {
        kind: 'mcq',
        prompt: 'Why did the stack fill with new tools after late 2022?',
        options: [
          { text: 'ChatGPT showed millions what was possible, so companies rushed to build every layer' },
          { text: 'Chips became free', why: 'Chips became more in demand, not free.' },
          { text: 'The layers were invented that year', why: 'The jobs existed; the rush of tools was new.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did ChatGPT become available to the public?',
        answers: ['2022'],
        placeholder: 'A year',
      },
    ],
  },
  reflect: {
    prompt: 'What new AI tool did you hear about recently? Which layer is it in, and what job does it do?',
    starters: ['I heard about...', 'It\'s in the... layer, and it...'],
  },
  deepen: {
    title: 'Why the names in this course are examples',
    summary: 'Every tool named in this course is dated "checked October 2026". By the time you read it, some will have changed. The jobs, and the questions, will not.',
  },
  notes: 'Vaswani et al., "Attention Is All You Need" (Google; arXiv June 2017, NeurIPS 2017) introduced the transformer. ChatGPT was released to the public on 30 November 2022 (OpenAI). Meta released LLaMA in February 2023 (research licence), Llama 2 in July 2023 with wider use. 2022 - 2017 = 5.',
};

export default lesson;
