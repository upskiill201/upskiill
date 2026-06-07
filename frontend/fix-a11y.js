const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/HP/upskiill/frontend/app/creator/onboarding';

for (let i = 3; i <= 13; i++) {
  const file = path.join(dir, i.toString(), 'page.tsx');
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf8');

  // Replace onClick with onClick + a11y
  content = content.replace(
    /onClick=\{\(\) => (setSelected|toggleCategory|setSelectedId)\(([^)]+)\)\}/g,
    `onClick={() => $1($2)}\n                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); $1($2); } }}\n                  role="checkbox"\n                  aria-checked={isSel ? true : (typeof isSelected !== 'undefined' ? isSelected : false)}`
  );

  fs.writeFileSync(file, content);
  console.log('A11y injected for step ' + i);
}
