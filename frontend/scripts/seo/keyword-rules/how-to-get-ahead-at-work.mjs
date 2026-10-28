// Page map rules for How to Get Ahead at Work. First matching rule wins.
export default [
  ['skip', 'Games, sports, military ranks, astrology and specific employers',
    /army|navy|air force|military|pnp|roblox|sims|premier league|championship|beholder|vastu|walmart|amazon|\bgeneral\b|bi$|books/],
  ['backlog', 'Students, India and blog-writing queries (need real local facts)', /india|student|college|blog|reddit|ai\b/],
  ['/blog/how-to-ask-for-a-promotion', null, /promotion|promoted|raise|appraisal|review|boss/],
  ['/blog/career-growth-tips', null, /career|growth|development|advancement|path|improve/],
  ['/blog/how-to-get-ahead-at-work', null, /./],
];
