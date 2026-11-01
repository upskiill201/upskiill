// Page map rules for AI Tools for Everyday Productivity. First matching rule wins.
export default [
  ['skip', 'Interior design, Instagram, holidays, other languages, building AI tools and odd tool names',
    /interior|instagram|independence day|tamil|astra|vscode|build ai tools|how to build|business intelligence|customer service|international/],
  ['/blog/chatgpt-prompts-for-beginners', null, /prompt|instruction/],
  ['/blog/how-to-use-chatgpt-for-beginners', null, /how to use chatgpt|chatgpt/],
  ['/blog/best-ai-tools-for-productivity', null, /./],
];
