// Page map rules for Working with AI Coding Agents. First matching rule wins, so order matters.
export default [
  ['skip', 'Not about learning to work with coding agents (other fields, stocks, trivia, one-off phrases, odd product names)',
    /illustrator|stock|instagram|founders?\b|owner|which company|interview|rust|xcode|intellij|self hosted|memory|benchmark|index\b|ranked|in a code repository|code interpreter|cowork|desktop|cursor not|logo|wallpaper|login|careers/],
  ['backlog', 'Other languages and places (need translated pages or real local facts first)',
    /\bindia\b|hindi|bangladesh|china|japan|korean|spanish|near me/],
  ['backlog', 'Books, PDFs, videos and Reddit (needs a reviewed list; next batch)', /\bbooks?\b|pdf|reddit|youtube|video|podcast|kaggle/],
  ['/blog/ai-coding-jobs-and-salary', null, /salary|jobs?\b|careers?|coder|programming jobs|hiring|income|pay\b/],
  ['/blog/claude-code-vs-cursor', null, /\bvs\b|versus|compar|alternative|like cursor|codex|better than/],
  ['/blog/claude-code-for-beginners', null, /claude/],
  ['/blog/cursor-ai-for-beginners', null, /cursor/],
  ['/blog/how-to-learn-ai-coding', null, /learn|course|class|tutorial|guide|roadmap|beginner|study|train/],
  ['/blog/best-free-ai-coding-assistants', null, /free|student|vscode|vs code|visual studio|plugin|extension|tools?\b|list|assistant|github|copilot|best|app\b|online|easy|ide\b/],
  ['/blog/what-are-ai-coding-agents', null, /./],
];
