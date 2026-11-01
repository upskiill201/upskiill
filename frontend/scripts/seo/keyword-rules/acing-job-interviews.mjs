// Page map rules for Acing Job Interviews. First matching rule wins.
export default [
  ['skip', 'Specific employers, languages, books and one-off phrases',
    /mcdonald|chipotle|walmart|jollibee|alorica|bpo|french|koonce|youtube|autistic|90 seconds|talent acquisition|indeed/],
  ['backlog', 'Sector-specific and place-specific interview questions (need real sector facts)',
    /nursing|healthcare|teacher|bank|marketing|\bit\b|retail|sales|customer service|\buk\b|\bph\b|philippines|internship|call center/],
  ['backlog', 'Reddit, PDFs and teens (needs a reviewed list; next batch)', /reddit|pdf|teen|ai\b/],
  ['/blog/phone-and-video-interview-tips', null, /phone|zoom|video|online|virtual|remote/],
  ['/blog/common-interview-questions-and-answers', null, /questions?|answers?|asked/],
  ['/blog/first-job-interview-tips', null, /first time|first timer|without experience|no experience|beginner|first job/],
  ['/blog/how-to-prepare-for-an-interview', null, /prepare|preparation|one day|1 hour|in person|recruiter|reading/],
  ['/blog/how-to-ace-a-job-interview', null, /./],
];
