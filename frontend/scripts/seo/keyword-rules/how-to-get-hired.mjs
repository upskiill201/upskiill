// Page map rules for How to Get Hired. First matching rule wins.
export default [
  ['skip', 'Specific employers, games and one-off phrases (no honest generic answer)',
    /google|amazon|costco|walmart|starbucks|target|mcdonald|deloitte|microsoft|home depot|free people|dan'?s diner|roblox|jjs|killer|minecraft|achievement|pilot|oil field|fifo|medical coding|call center|description|workday|vacancy|taken down/],
  ['backlog', 'Places and age groups (need real local facts first)',
    /\buk\b|canada|south africa|australia|ireland|dubai|kenya|nigeria|pakistan|philippines|toronto|melbourne|near me|teen|high school|\b1[67]\b|student job/],
  ['backlog', 'Books, PDFs and Reddit (needs a reviewed list; next batch)', /\bbooks?\b|pdf|reddit|course/],
  ['/blog/how-to-network-for-a-job', null, /network|reach out|connections/],
  ['/blog/how-to-get-a-job-with-no-experience', null, /experience|no degree|qualification|internship|beginner|first job|without|requires/],
  ['/blog/how-to-find-a-job', null, /find|online|linkedin|home|remote|fast|quick|2026/],
  ['/blog/how-to-get-hired-step-by-step', null, /./],
];
