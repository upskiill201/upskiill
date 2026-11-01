// Page map rules for AI at Work: Beginner. First matching rule wins.
export default [
  ['skip', 'Other languages, regions, install queries, Microsoft course names and one-off phrases',
    /hindi|tamil|china|hong kong|bangalore|reddit|desktop app|install|microsoft|github|pdf|future|app\b|job interview|excel|trend/],
  ['/blog/chatgpt-at-work', null, /chatgpt|blocked|gpt/],
  ['/blog/how-is-ai-used-in-the-workplace', null, /used in|examples?|workplace|office|how is ai/],
  ['/blog/ai-at-work-roadmap-for-beginners', null, /roadmap|course|free|beginners|effectively|tools/],
  ['/blog/how-to-use-ai-at-work', null, /./],
];
