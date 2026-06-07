const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/HP/upskiill/frontend/app/creator/onboarding';

for (let i = 1; i <= 14; i++) {
  const file = path.join(dir, i.toString(), 'page.tsx');
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf8');

  // Reduce bottom bar padding
  content = content.replace(
    /p-4 sm:p-6 lg:p-\[24px_32px\]/g,
    'p-3 sm:p-4 lg:p-[16px_32px]'
  );

  fs.writeFileSync(file, content);
  console.log('Reduced bottom bar padding for step ' + i);
}
