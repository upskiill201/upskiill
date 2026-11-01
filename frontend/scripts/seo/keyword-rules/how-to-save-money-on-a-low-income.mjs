// Page map rules for How to Save Money on a Low Income. First matching rule wins.
export default [
  ['skip', 'Countries, calculators, PDFs and house deposits (need real local facts)', /australia|canada|nigeria|india|uk\b|calculator|pdf|house|teenager/],
  ['/blog/emergency-fund-for-beginners', null, /emergency/],
  ['/blog/how-to-start-saving-money', null, /start|beginners|20s|30s|ways/],
  ['/blog/how-to-save-money-on-a-low-income', null, /./],
];
