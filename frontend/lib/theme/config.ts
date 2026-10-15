/**
 * Theme constants and the pre-paint boot script. No React in here: the root
 * layout (a Server Component) imports this file, and lib/theme/theme.ts (which
 * uses a hook) must stay out of that import graph.
 */

export const THEME_KEY = 'teyro-theme';
/** Dark from 19:00 until 06:00. */
export const DARK_FROM = 19;
export const LIGHT_FROM = 6;
/** Route prefixes that get a dark mode. */
export const THEME_SCOPES = ['/dashboard', '/learn', '/audio-settings'];

/**
 * Runs inline in <head>, before first paint, so a dark-mode learner never sees
 * a white flash. Same rules as lib/theme/theme.ts, written out because an
 * inline script cannot import.
 */
export const THEME_BOOT_SCRIPT = `(function(){try{
var p=location.pathname,s=${JSON.stringify(THEME_SCOPES)},ok=false;
for(var i=0;i<s.length;i++){if(p===s[i]||p.indexOf(s[i]+'/')===0)ok=true}
if(!ok)return;
var v=localStorage.getItem('${THEME_KEY}'),h=new Date().getHours();
var d=v==='dark'||((v!=='light')&&(h>=${DARK_FROM}||h<${LIGHT_FROM}));
if(d){document.documentElement.dataset.theme='dark';document.documentElement.style.colorScheme='dark'}
}catch(e){}})();`;
