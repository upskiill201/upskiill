// Page map rules for Needs vs Wants. First matching rule wins.
export default [
  ['skip', 'Kids, drawings, pictures, Bible, economics definitions, other languages and relationships',
    /kids|drawing|pictures|bible|economics|tagalog|spanish|relationship|worksheet|business|reddit/],
  ['/blog/lifestyle-creep', null, /lifestyle creep/],
  ['/blog/how-to-stop-overspending', null, /overspend/],
  ['/blog/needs-vs-wants-examples', null, /./],
];
