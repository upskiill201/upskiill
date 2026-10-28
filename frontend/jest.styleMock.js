// CSS modules in tests: every class name reads back as itself, so components
// that import a .module.css render without a CSS loader.
module.exports = new Proxy({}, { get: (_t, key) => (key === '__esModule' ? false : String(key)) });
