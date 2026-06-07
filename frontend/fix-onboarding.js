const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/HP/upskiill/frontend/app/creator/onboarding';

for (let i = 2; i <= 14; i++) {
  const file = path.join(dir, i.toString(), 'page.tsx');
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf8');

  // 1. Fix footer background
  // Replace bg-white or bg-slate-50 or bg-[#F8FAFC] in the footer
  content = content.replace(
    /className="([^"]*)(?:bg-white|bg-slate-50|bg-\[\#F8FAFC\])([^"]*sticky bottom-0 z-50)"/g,
    'className="$1bg-transparent$2"'
  );

  // 2. Extract saveOnboardingStep from handleContinue
  const match = content.match(/saveOnboardingStep\(\d+,\s*({[^}]+})\)/);
  if (match) {
    const payload = match[1]; // e.g. { categories: selected }
    const stateVarMatch = payload.match(/:\s*([a-zA-Z0-9_]+)\s*\}/);
    
    // Determine which state variable triggers the save
    let stateVar = null;
    if (stateVarMatch) {
      stateVar = stateVarMatch[1];
    } else if (i === 14) {
      stateVar = 'agreed';
    }

    if (stateVar && !content.includes(`// 💾 Auto-save on selection`)) {
      // Create conditions
      let condition = '';
      if (stateVar === 'agreed') {
        condition = `agreed === true || agreed === false`;
      } else {
        condition = `${stateVar} && (Array.isArray(${stateVar}) ? ${stateVar}.length > 0 : true)`;
      }

      const useEffectCode = `
  // 💾 Auto-save on selection
  useEffect(() => {
    if (${condition}) {
      saveOnboardingStep(${i}, ${payload});
    }
  }, [${stateVar}]);

  const handleContinue`;

      content = content.replace('  const handleContinue', useEffectCode);
    }
  }

  fs.writeFileSync(file, content);
  console.log('Fixed step ' + i);
}
