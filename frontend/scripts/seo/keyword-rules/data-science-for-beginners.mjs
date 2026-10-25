// Page map rules for Data Science for Beginners. First matching rule wins.
export default [
  ['skip', 'Brand books, repos, in-person courses and other countries',
    /github|microsoft|andrew park|board infinity|4 books|dummies|lillian|pune|bangalore|hyderabad|chennai|delhi|mumbai|reddit|fees/],
  ['backlog', 'Countries and school-stage routes (need real local facts)', /india|south africa|canada|australia|sri lanka|pakistan|philippines|12th|10th|google|interview|pdf|book/],
  ['/blog/how-to-become-a-data-scientist', null, /become|salary|career|job|requirements|no experience/],
  ['/blog/learn-data-science-from-scratch', null, /learn|scratch|free|python|step by step|how long|own|start/],
  ['/blog/what-is-data-science-for-beginners', null, /./],
];
