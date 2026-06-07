const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/HP/upskiill/frontend/app/creator/onboarding';

for (let i = 3; i <= 13; i++) {
  const file = path.join(dir, i.toString(), 'page.tsx');
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf8');

  if (i >= 3 && i <= 9) {
     content = content.replace(
       /aria-checked=\{isSel \? true : \(typeof isSelected !== 'undefined' \? isSelected : false\)\}/g,
       `aria-checked={isSel}`
     );
  } else if (i === 12 || i === 13) {
     content = content.replace(
       /aria-checked=\{isSel \? true : \(typeof isSelected !== 'undefined' \? isSelected : false\)\}/g,
       `aria-checked={isSelected}`
     );
  }

  fs.writeFileSync(file, content);
  console.log('Fixed a11y bug for step ' + i);
}
