// Page map rules for How to Validate a Business Idea. First matching rule wins.
export default [
  ['skip', 'Reddit, books and one-off phrases', /reddit|book|bootstrapping|haven t|plunge/],
  ['/blog/business-idea-validation-with-ai', null, /\bai\b|prompt|tool/],
  ['/blog/how-to-validate-a-business-idea', null, /./],
];
