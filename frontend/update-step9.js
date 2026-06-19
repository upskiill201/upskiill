const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'app/creator/onboarding/9/page.tsx');
let content = fs.readFileSync(file, 'utf8');

// 1. imports
content = content.replace("import { motion } from 'framer-motion'", "import { motion, AnimatePresence } from 'framer-motion'");
if (!content.includes('leftPanelVariants')) {
  content = content.replace(/(import posthog from 'posthog-js';)/, `$1\nimport { leftPanelVariants, rightPanelVariants } from '@/lib/animations';`);
}

// 2. root
content = content.replace(
  /return \(\s*<div className="flex flex-col w-full max-w-\[1761px\]/,
  `return (\n    <motion.div className="flex flex-col w-full max-w-[1761px]`
);
content = content.replace(/<\/div>\s*\);\s*}\s*$/, `</motion.div>\n  );\n}\n`);

// 3. Stagger children
content = content.replace(/staggerChildren: 0\.1/g, 'staggerChildren: 0.08');

// 4. Right panel animation
content = content.replace(
  /initial=\{\{ opacity: 0, x: 20 \}\}\s*animate=\{\{ opacity: 1, x: 0 \}\}\s*transition=\{\{ duration: 0\.5, ease: 'easeOut', delay: 0\.2 \}\}/g,
  `initial={{ opacity: 0, scale: 0.95, x: 20 }}\n            animate={{ opacity: 1, scale: 1, x: 0 }}\n            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed step 9');
