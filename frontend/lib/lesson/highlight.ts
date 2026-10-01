/**
 * Syntax highlighting for lesson code — highlight.js core with only the
 * languages Teyro teaches registered, so the bundle stays small.
 * Output is escaped HTML with `hljs-*` spans, styled in Code.module.css.
 */

import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import dart from 'highlight.js/lib/languages/dart';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import kotlin from 'highlight.js/lib/languages/kotlin';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import swift from 'highlight.js/lib/languages/swift';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import type { CodeLanguage } from './blocks';

const REGISTERED: Partial<Record<CodeLanguage, string>> = {
  javascript: 'javascript',
  typescript: 'typescript',
  python: 'python',
  html: 'xml',
  css: 'css',
  sql: 'sql',
  bash: 'bash',
  json: 'json',
  java: 'java',
  kotlin: 'kotlin',
  swift: 'swift',
  dart: 'dart',
};

let registered = false;
function register() {
  if (registered) return;
  registered = true;
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('typescript', typescript);
  hljs.registerLanguage('python', python);
  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('sql', sql);
  hljs.registerLanguage('bash', bash);
  hljs.registerLanguage('json', json);
  hljs.registerLanguage('java', java);
  hljs.registerLanguage('kotlin', kotlin);
  hljs.registerLanguage('swift', swift);
  hljs.registerLanguage('dart', dart);
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Highlighted, escaped HTML for `code`. Plain text (escaped) when unknown. */
export function highlightCode(code: string, language: CodeLanguage | undefined): string {
  const lang = language ? REGISTERED[language] : undefined;
  if (!lang) return escapeHtml(code);
  register();
  try {
    return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
  } catch {
    return escapeHtml(code);
  }
}
