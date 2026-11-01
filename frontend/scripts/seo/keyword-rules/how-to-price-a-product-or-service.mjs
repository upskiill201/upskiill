// Page map rules for How to Price a Product or Service. First matching rule wins.
export default [
  ['skip', 'Games, marketplaces, tools and price-checking (shoppers, not sellers)',
    /supermarket|moonlighter|vinted|depop|meesho|simulator|schedule 1|gas station|pump|amazon|check price|compare price|alert|tcg|shopify|square|history|philippines|sari sari|garage sale|pdf|calculator/],
  ['/blog/how-to-price-your-services', null, /service|freelance|hour|consult/],
  ['/blog/pricing-strategies-for-small-business', null, /strateg|small business|key|best/],
  ['/blog/how-to-price-a-product', null, /./],
];
