/* eslint-disable */
/**
 * Teyro's React Native runner: the learner's TSX → JavaScript a phone
 * preview can run. Shared, word for word, by the browser (loaded into the
 * TypeScript worker, public/typescript/runner.worker.js) and the course
 * loader (backend src/originals/originals-rn-verify.ts), so a lesson's
 * solution is checked exactly the way learners' code runs.
 *
 *   - JSX via the automatic runtime (react/jsx-runtime): no React import needed.
 *   - Modules become CommonJS: `import { View } from 'react-native'` turns into
 *     a require() the preview answers (public/react-native/runtime.js).
 *   - Every loop body calls __teyroGuard(), which stops a loop that runs too
 *     long instead of freezing the learner's tab.
 *   - Only syntax errors are reported (no type-checking against React Native's
 *     types yet), with a 1-based line.
 *
 * teyroTranspileTsx(ts, code) → { js: string | null, error: { message, line } | null }
 */
(function (root) {
  function guardLoops(ts) {
    return function (context) {
      var f = context.factory;
      var guard = function () {
        return f.createExpressionStatement(f.createCallExpression(f.createIdentifier('__teyroGuard'), undefined, []));
      };
      var withGuard = function (body) {
        if (ts.isBlock(body)) return f.updateBlock(body, [guard()].concat(body.statements));
        return f.createBlock([guard(), body], true);
      };
      var visit = function (node) {
        node = ts.visitEachChild(node, visit, context);
        if (ts.isForStatement(node)) return f.updateForStatement(node, node.initializer, node.condition, node.incrementor, withGuard(node.statement));
        if (ts.isForOfStatement(node)) return f.updateForOfStatement(node, node.awaitModifier, node.initializer, node.expression, withGuard(node.statement));
        if (ts.isForInStatement(node)) return f.updateForInStatement(node, node.initializer, node.expression, withGuard(node.statement));
        if (ts.isWhileStatement(node)) return f.updateWhileStatement(node, node.expression, withGuard(node.statement));
        if (ts.isDoStatement(node)) return f.updateDoStatement(node, withGuard(node.statement), node.expression);
        return node;
      };
      return function (file) {
        return ts.visitNode(file, visit);
      };
    };
  }

  function teyroTranspileTsx(ts, code) {
    var out = ts.transpileModule(String(code || ''), {
      fileName: 'App.tsx',
      reportDiagnostics: true,
      compilerOptions: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
      transformers: { before: [guardLoops(ts)] },
    });
    var diag = (out.diagnostics || [])[0];
    if (diag) {
      var pos = diag.file && diag.start !== undefined ? diag.file.getLineAndCharacterOfPosition(diag.start) : null;
      return { js: null, error: { message: ts.flattenDiagnosticMessageText(diag.messageText, '\n'), line: pos ? pos.line + 1 : null } };
    }
    return { js: out.outputText, error: null };
  }

  root.teyroTranspileTsx = teyroTranspileTsx;
  if (typeof module === 'object' && module.exports) module.exports = teyroTranspileTsx;
})(typeof self !== 'undefined' ? self : this);
