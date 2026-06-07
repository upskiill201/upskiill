const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/HP/upskiill/frontend/app/creator/onboarding';

for (let i = 1; i <= 14; i++) {
  const file = path.join(dir, i.toString(), 'page.tsx');
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf8');

  // Fix the container
  content = content.replace(
    /className="([^"]*?)flex flex-col-reverse sm:flex-row([^"]*?)bg-transparent([^"]*?)"/g,
    'className="$1flex flex-row$2bg-[#F1EDFC]$3"'
  );
  content = content.replace(
    /className="([^"]*?)flex flex-col sm:flex-row([^"]*?)bg-transparent([^"]*?)"/g,
    'className="$1flex flex-row$2bg-[#F1EDFC]$3"'
  );
  
  // Also fix p-6 to p-4 sm:p-6
  content = content.replace(
    /p-6 lg:p-\[24px_32px\]/g,
    'p-4 sm:p-6 lg:p-[24px_32px]'
  );

  // Fix Back button
  content = content.replace(
    /w-full sm:w-auto/g,
    'w-auto shrink-0'
  );

  // Fix Continue button
  content = content.replace(
    /w-full sm:w-\[180px\]/g,
    'flex-1 sm:flex-none sm:w-[180px]'
  );
  content = content.replace(
    /w-full sm:w-\[220px\]/g,
    'flex-1 sm:flex-none sm:w-[220px]'
  );

  fs.writeFileSync(file, content);
  console.log('Fixed bottom bar for step ' + i);
}
