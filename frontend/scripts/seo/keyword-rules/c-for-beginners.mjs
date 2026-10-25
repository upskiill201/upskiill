// Page map rules for C for Beginners. First matching rule wins.
export default [
  ['skip', 'Other languages, cities, fees, PDFs, books and Ubuntu-specific setups',
    /tamil|telugu|hindi|ameerpet|hyderabad|guntur|near me|fees|pdf|book|notes|ubuntu|english/],
  ['/blog/c-programming-course-free-online', null, /course|certificate|classes|duration|app|interactive|online/],
  ['/blog/learn-c-programming-for-beginners', null, /./],
];
