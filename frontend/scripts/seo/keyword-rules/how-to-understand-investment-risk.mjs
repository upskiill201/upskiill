// Page map rules for How to Understand Investment Risk. First matching rule wins.
export default [
  ['skip', 'Tax forms, banking, quizzes and PDFs', /schedule c|box|everfi|banking|pdf|management/],
  ['/blog/low-risk-investments-for-beginners', null, /low risk|no risk|high risk|beginners|options/],
  ['/blog/investment-risk-tolerance', null, /tolerance|appetite|profile|capacity/],
  ['/blog/what-is-investment-risk', null, /./],
];
