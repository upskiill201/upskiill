// Page map rules for How to Get Noticed by Employers. First matching rule wins.
export default [
  ['skip', 'Visa, grad school, investment banking, odd formats and videos',
    /visa|grad school|investment banking|youtube|reddit|germany|nz\b|botswana|zambia|uganda|kenya|nigeria|south africa|australia|uk\b|\bpdf\b|letter$/],
  ['backlog', 'Executives, engineers and other niches (need real sector examples)', /executive|software|engineer|developer|high school/],
  ['/blog/linkedin-profile-tips-for-job-seekers', null, /linkedin/],
  ['/blog/how-to-write-a-cover-letter', null, /cover letter/],
  ['/blog/how-to-write-a-cv-with-no-experience', null, /\bcv\b|resume/],
  ['/blog/how-to-get-noticed-by-employers', null, /./],
];
