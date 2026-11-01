// Page map rules for The AI Stack. First matching rule wins.
export default [
  ['skip', 'Hearing aids, photos, healthcare, water, outsourcing, PDFs and Reddit', /hearing|photos|healthcare|water|outsourc|back office|pdf|reddit|copilot|computer\b|harness/],
  ['/blog/what-is-an-ai-agent', null, /agent/],
  ['/blog/how-do-large-language-models-work', null, /language model|llm|chatgpt|build a language/],
  ['/blog/how-does-ai-work-in-simple-terms', null, /./],
];
