const fs = require('fs');
const path = require('path');

const steps = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

steps.forEach(step => {
  const file = path.join(__dirname, `app/creator/onboarding/${step}/page.tsx`);
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');

  // Find the exact motion.div that was injected
  const targetStr = '<motion.div className="flex flex-col w-full max-w-[1761px] mx-auto min-h-[calc(100vh-88px)]';
  const replacementStr = '<motion.div initial="hidden" animate="show" className="flex flex-col w-full max-w-[1761px] mx-auto min-h-[calc(100vh-88px)]';
  
  // For step 9 which might have a different class
  const targetStr9 = '<motion.div className="flex flex-col w-full max-w-[1761px]';
  const replacementStr9 = '<motion.div initial="hidden" animate="show" className="flex flex-col w-full max-w-[1761px]';

  if (content.includes(targetStr) && !content.includes(replacementStr)) {
    content = content.replace(targetStr, replacementStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed Step ${step}`);
  } else if (content.includes(targetStr9) && !content.includes(replacementStr9)) {
    content = content.replace(targetStr9, replacementStr9);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed Step ${step} (alt match)`);
  } else {
    console.log(`Step ${step} already fixed or no match`);
  }
});
