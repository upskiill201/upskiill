// Page map rules for Vibe Coding: Build Apps with AI. First matching rule wins.
export default [
  ['skip', 'Reddit, PDFs, incubators, interviews and platform names we do not cover',
    /reddit|pdf|incubator|interview|internship|base44|code org|studio|google|dummies|prompt$/],
  ['/blog/how-to-build-an-app-without-coding', null, /without coding|no code|without code|android|mobile|web app|game app|create an app|make an app|make app|can you create|build an app|build app|build apps/],
  ['/blog/vibe-coding-for-beginners', null, /for beginners|tutorial|course|tools|ideas|jobs|how to/],
  ['/blog/what-is-vibe-coding', null, /./],
];
