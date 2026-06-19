const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'app/creator/onboarding/15/page.tsx');
let content = fs.readFileSync(file, 'utf8');

const targetStr = '<div className={styles.leftPanel} style={{ overflowY: \'auto\' }}>';
const replacementStr = '<style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>\n      <div className={`${styles.leftPanel} hide-scrollbar`} style={{ overflowY: \'auto\', msOverflowStyle: \'none\', scrollbarWidth: \'none\' }}>';

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed scrollbar issue');
} else {
  console.log('Target string not found');
}
