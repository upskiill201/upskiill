const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/HP/upskiill/frontend/app/creator/onboarding';

for (let i = 1; i <= 14; i++) {
  const file = path.join(dir, i.toString(), 'page.tsx');
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf8');

  // Fix overflow
  content = content.replace(
    /className="flex flex-col flex-1 overflow-hidden min-h-0/g,
    'className="flex flex-col flex-1 overflow-y-auto lg:overflow-hidden min-h-0 overflow-x-hidden'
  );

  fs.writeFileSync(file, content);
  console.log('Fixed overflow for step ' + i);
}
