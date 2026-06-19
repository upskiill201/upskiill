const fs = require('fs');
const path = require('path');

// Fix Step 15
const file15 = path.join(__dirname, 'app/creator/onboarding/15/page.tsx');
let content15 = fs.readFileSync(file15, 'utf8');

content15 = content15.replace(/import confetti from 'canvas-confetti';\n/g, '');
content15 = content15.replace(
  /confetti\(\{[\s\S]*?disableForReducedMotion: true\s*\}\);/g,
  `import('canvas-confetti').then(({ default: confetti }) => {\n          confetti({\n            particleCount: 30,\n            spread: 60,\n            origin: { y: 0.6 },\n            colors: ['#22c55e', '#3b82f6', '#8b5cf6'],\n            disableForReducedMotion: true\n          });\n        });`
);
fs.writeFileSync(file15, content15, 'utf8');
console.log('Fixed Step 15');

// Fix Step 16
const file16 = path.join(__dirname, 'app/creator/onboarding/16/page.tsx');
let content16 = fs.readFileSync(file16, 'utf8');

content16 = content16.replace(/import confetti from 'canvas-confetti';\n/g, '');
content16 = content16.replace(
  /const frame = \(\) => \{[\s\S]*?frame\(\);/g,
  `import('canvas-confetti').then(({ default: confetti }) => {\n      const duration = 2000;\n      const end = Date.now() + duration;\n      const frame = () => {\n        confetti({\n          particleCount: 5,\n          angle: 60,\n          spread: 55,\n          origin: { x: 0 },\n          colors: ['#7C3AED', '#3B82F6', '#10B981']\n        });\n        confetti({\n          particleCount: 5,\n          angle: 120,\n          spread: 55,\n          origin: { x: 1 },\n          colors: ['#7C3AED', '#3B82F6', '#10B981']\n        });\n\n        if (Date.now() < end) {\n          requestAnimationFrame(frame);\n        }\n      };\n      frame();\n    });`
);
fs.writeFileSync(file16, content16, 'utf8');
console.log('Fixed Step 16');
