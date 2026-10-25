// Page map rules for Build and Launch a Website. First matching rule wins.
export default [
  ['skip', 'Tools Teyro does not teach or odd phrases (WordPress, Shopify, Wix, Canva, Figma, desktop mode, grants)',
    /wordpress|shopify|wix|squarespace|framer|canva|figma|desktop mode|mobile view|google for free|grants?\b|designers?\b|pdf|reddit|open a website|run a website|open the website/],
  ['backlog', 'Places and ecommerce (need real local facts)', /india|uk\b|canada|dubai|ecommerce|sell|cost/],
  ['/blog/how-to-build-a-website-with-ai', null, /\bai\b|claude|chatgpt|2026/],
  ['/blog/how-to-launch-a-website', null, /launch|github|vercel|publish|host|go live|after coding/],
  ['/blog/website-for-small-business', null, /small business|business|owner|portfolio/],
  ['/blog/how-to-make-a-website-for-beginners', null, /./],
];
