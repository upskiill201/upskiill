// Page map rules for SQL and Databases for Beginners. First matching rule wins.
export default [
  ['skip', 'Brand tutorials, other-language videos and in-person courses',
    /hindi|tamil|telugu|marathi|chennai|pune|bangalore|delhi|mumbai|hyderabad|coimbatore|near me|w3schools|geeks|tutorialspoint|tutorial point|coursera|youtube|fees|eligibility|month of lunches|starts with/],
  ['backlog', 'Interview questions and PDFs/books (needs a reviewed list; next batch)', /interview|pdf|book/],
  ['/blog/sql-practice-for-beginners', null, /practice|interactive|game|fun|exercise|project/],
  ['/blog/sql-course-free-for-beginners', null, /course|certificate|class|free|online|coursera/],
  ['/blog/what-is-sql-tutorial-for-beginners', null, /tutorial|what is|query|intermediate|examples?|advanced/],
  ['/blog/how-to-learn-sql-for-beginners', null, /./],
];
