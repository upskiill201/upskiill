const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/HP/upskiill/frontend/app/creator/onboarding';

const config = {
  3: { setter: 'setSelected', key: 'categories', stepName: 'teaching_categories' },
  4: { setter: 'setSelected', key: 'audienceSize', stepName: 'audience_size' },
  5: { setter: 'setSelected', key: 'platforms', stepName: 'current_platforms' },
  6: { setter: 'setSelected', key: 'existingContent', stepName: 'existing_content' },
  7: { setter: 'setSelected', key: 'biggestChallenge', stepName: 'biggest_challenge' },
  8: { setter: 'setSelected', key: 'teachingStyle', stepName: 'teaching_style' },
  9: { setter: 'setSelected', key: 'weeklyHours', stepName: 'weekly_hours' },
  10: { setter: null, key: null, stepName: 'features_intro' },
  11: { setter: null, key: null, stepName: 'course_formats_intro' },
  12: { setter: 'setSelectedId', key: 'courseFormat', stepName: 'primary_format' },
  13: { setter: 'setSelectedId', key: 'communityOption', stepName: 'community_option' },
  14: { setter: null, key: null, stepName: 'review_progress' },
};

for (let i = 3; i <= 14; i++) {
  const file = path.join(dir, i.toString(), 'page.tsx');
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf8');
  const conf = config[i];

  // 1. Inject useOnboardingGuard if missing
  if (!content.includes('useOnboardingGuard(')) {
    // Find the first useState or router declaration to insert after
    const injectPoint = content.match(/const \[isLoading, setIsLoading\] = useState\(false\);\n/);
    if (injectPoint) {
      let restorationCode = `\n  // 🛡️ Step-skip protection — redirect to Step 1 if prior steps not done\n  useOnboardingGuard(${i});\n`;
      
      restorationCode += `\n  // 📖 Restore previous answer on mount\n  useEffect(() => {\n    const data = getOnboardingData();\n`;
      
      if (conf.setter && conf.key) {
        restorationCode += `    if (data.step${i}?.${conf.key}) {\n      ${conf.setter}(data.step${i}.${conf.key});\n    }\n`;
      }
      
      restorationCode += `    // Track page view\n    posthog.capture('onboarding_step_viewed', { step: ${i}, stepName: '${conf.stepName}' });\n  }, []);\n`;

      content = content.replace(injectPoint[0], injectPoint[0] + restorationCode);
    } else {
      console.log(`Could not find inject point for step ${i}`);
    }
  }

  // Ensure getOnboardingData is imported if used
  if (content.includes('getOnboardingData()') && !content.includes('getOnboardingData')) {
     content = content.replace(/import { saveOnboardingStep } from '@\/lib\/onboarding';/, "import { getOnboardingData, saveOnboardingStep } from '@/lib/onboarding';");
  }

  // Ensure posthog is imported if missing
  if (!content.includes('import posthog from \'posthog-js\';')) {
    content = content.replace(/import { useOnboardingGuard } from '@\/hooks\/useOnboardingGuard';/, "import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';\nimport posthog from 'posthog-js';");
  }

  // Ensure useOnboardingGuard is imported if missing
  if (!content.includes('useOnboardingGuard\'')) {
     content = content.replace(/import { getOnboardingData, saveOnboardingStep } from '@\/lib\/onboarding';/, "import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';\nimport { getOnboardingData, saveOnboardingStep } from '@/lib/onboarding';");
  }

  fs.writeFileSync(file, content);
  console.log('Restoration injected for step ' + i);
}
