const fs = require('fs');
const path = require('path');

const stepsToUpdate = [3, 4, 5, 6, 7, 8, 10, 11, 12, 13];

stepsToUpdate.forEach(step => {
  const filePath = path.join(__dirname, 'app/creator/onboarding', String(step), 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping step ${step}, file not found.`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add AnimatePresence to framer-motion import
  if (content.includes("import { motion } from 'framer-motion'")) {
    content = content.replace("import { motion } from 'framer-motion'", "import { motion, AnimatePresence } from 'framer-motion'");
  }

  // 2. Add standard animations import if not exists
  if (!content.includes('leftPanelVariants')) {
    const importStatement = `import { leftPanelVariants, rightPanelVariants, cardHover, cardTap, checkmarkBounce } from '@/lib/animations';\n`;
    content = content.replace(/(import posthog from 'posthog-js';)/, `$1\n${importStatement}`);
  }

  // 3. Change root div to motion.div
  content = content.replace(
    /return \(\s*<div className="flex flex-col w-full max-w-\[1761px\]/,
    `return (\n    <motion.div className="flex flex-col w-full max-w-[1761px]`
  );
  
  // Find the last </div> before closing brace and change to </motion.div>
  // This is a bit tricky, but it's usually at the end of the file.
  content = content.replace(/<\/div>\s*\);\s*}\s*$/, `</motion.div>\n  );\n}\n`);

  // 4. Update left panel initial/animate -> variants
  content = content.replace(
    /initial=\{\{ opacity: 0, x: -20 \}\}\s*animate=\{\{ opacity: 1, x: 0 \}\}\s*transition=\{\{ duration: 0\.5, ease: "easeOut" \}\}/g,
    `variants={leftPanelVariants}`
  );

  // 5. Update right panel initial/animate -> variants
  content = content.replace(
    /initial=\{\{ opacity: 0, x: 20 \}\}\s*animate=\{\{ opacity: 1, x: 0 \}\}\s*transition=\{\{ duration: 0\.5, ease: "easeOut", delay: 0\.2 \}\}/g,
    `variants={rightPanelVariants}`
  );

  // 6. Cards: Add whileHover, whileTap
  // Find <motion.button ... variants={itemVariants}
  content = content.replace(
    /variants=\{itemVariants\}/g,
    `variants={itemVariants}\n                  whileHover={cardHover}\n                  whileTap={cardTap}`
  );

  // 7. Checkmarks: Wrap in AnimatePresence and add variants
  content = content.replace(
    /\{isSelected && \(\s*<div className="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">\s*<svg width="10" height="8" viewBox="0 0 10 8" fill="none">\s*<path d="M1 4L3\.5 6\.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"\/>\s*<\/svg>\s*<\/div>\s*\)\}/g,
    `<AnimatePresence>
                    {isSelected && (
                      <motion.div 
                        variants={checkmarkBounce}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"
                      >
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <motion.path 
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
                            d="M1 4L3.5 6.5L9 1" 
                            stroke="white" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated step ${step}`);
});
