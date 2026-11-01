// Page map rules for How Scams and Financial Fraud Work. First matching rule wins.
export default [
  ['skip', 'Specific countries, apps, insurance products and TV shows we cannot answer honestly',
    /egypt|paris|thailand|morocco|gcash|interceptors|scam insurance|airbnb|vinted|ebay|instagram account|list/],
  ['/blog/how-to-avoid-scams-on-facebook-marketplace', null, /marketplace|selling|whatsapp/],
  ['/blog/common-financial-scams', null, /common|famous|popular|schemes|most|investment|financial|fraud/],
  ['/blog/how-to-spot-a-scam', null, /./],
];
