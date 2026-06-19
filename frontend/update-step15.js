const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'app/creator/onboarding/15/page.tsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Add imports
content = content.replace(
  "import { motion } from 'framer-motion';", 
  "import { motion, AnimatePresence } from 'framer-motion';"
);
if (!content.includes('framer-motion')) {
  content = content.replace(
    /(import posthog from 'posthog-js';)/, 
    `$1\nimport { motion, AnimatePresence } from 'framer-motion';\nimport confetti from 'canvas-confetti';`
  );
} else if (!content.includes('canvas-confetti')) {
  content = content.replace(
    /(import posthog from 'posthog-js';)/, 
    `$1\nimport confetti from 'canvas-confetti';`
  );
}

// 2. Add FloatingInput Component before StepFifteenPage
const floatingInputCode = `
const FloatingInput = ({ icon: Icon, label, id, type, value, onChange, onBlur, placeholder, required, children, minLength, autoComplete }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <div className="relative flex flex-col mb-4 w-full">
      <motion.div 
        className="absolute left-10 pointer-events-none z-10 flex items-center h-full"
        initial={false}
        animate={{ 
          y: isActive ? -24 : 0, 
          scale: isActive ? 0.85 : 1,
          color: isFocused ? '#2563EB' : '#64748b'
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{ transformOrigin: 'left center' }}
      >
        <span className="bg-white px-1 font-medium">{label}</span>
      </motion.div>
      <div className="relative flex items-center w-full">
        <div className="absolute left-3 text-slate-400 z-10">
          <Icon size={18} color={isFocused ? '#2563EB' : '#94a3b8'} className="transition-colors" />
        </div>
        <motion.input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          placeholder={isActive ? placeholder : ''}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          className="w-full h-[52px] pl-10 pr-10 rounded-[12px] border-[1.5px] border-slate-200 outline-none text-[15px] text-slate-900 bg-white transition-shadow relative z-0"
          animate={{
            borderColor: isFocused ? '#3b82f6' : '#e2e8f0',
            boxShadow: isFocused ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : '0 0 0 0px rgba(59, 130, 246, 0)',
          }}
        />
        {children}
      </div>
    </div>
  );
};
`;

if (!content.includes('const FloatingInput')) {
  content = content.replace('export default function StepFifteenPage() {', floatingInputCode + '\nexport default function StepFifteenPage() {');
}

// 3. Replace traditional inputs with FloatingInput
content = content.replace(
  /<div className=\{styles\.inputGroup\}>\s*<label htmlFor="fullName">Full Name<\/label>\s*<div className=\{styles\.inputWrapper\}>\s*<User size=\{18\} className=\{styles\.inputIcon\} \/>\s*<input[^>]+id="fullName"[^>]+value=\{fullName\}[^>]+onChange=\{\(e\) => setFullName\(e\.target\.value\)\}[^>]+required\s*\/>\s*<\/div>\s*<\/div>/g,
  `<FloatingInput id="fullName" type="text" label="Full Name" placeholder="e.g. Alex Rivera" value={fullName} onChange={(e: any) => setFullName(e.target.value)} icon={User} required />`
);

content = content.replace(
  /<div className=\{styles\.inputGroup\}>\s*<label htmlFor="email">Email address<\/label>\s*<div className=\{styles\.inputWrapper\}>\s*<Mail size=\{18\} className=\{styles\.inputIcon\} \/>\s*<input[^>]+id="email"[^>]+type="email"[^>]+placeholder="name@example\.com"[^>]+autoComplete="email"[^>]+value=\{email\}[^>]+onChange=\{\(e\) => \{ setEmail\(e\.target\.value\); setEmailCheckState\('idle'\); \}\}[^>]+onBlur=\{handleEmailBlur\}[^>]+required\s*\/>\s*\{\/\* Real-time email check indicator \*\/\}\s*\{emailCheckState === 'checking' && \(\s*<span style=\{\{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY\(-50%\)', fontSize: '12px', color: '#6B7280' \}\}>Checking\.\.\.<\/span>\s*\)\}\s*\{emailCheckState === 'ok' && \(\s*<CheckCircle2 size=\{16\} style=\{\{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY\(-50%\)', color: '#10B981' \}\} \/>\s*\)\}\s*<\/div>\s*\{\/\* Duplicate email warning \*\/\}\s*\{emailCheckState === 'exists' && \([\s\S]*?\}\s*<\/div>/g,
  `<div className="mb-4">
    <FloatingInput id="email" type="email" label="Email address" placeholder="name@example.com" value={email} onChange={(e: any) => { setEmail(e.target.value); setEmailCheckState('idle'); }} onBlur={handleEmailBlur} icon={Mail} required autoComplete="email">
      {emailCheckState === 'checking' && <span className="absolute right-4 text-xs text-slate-500 font-medium">Checking...</span>}
      {emailCheckState === 'ok' && <CheckCircle2 size={16} className="absolute right-4 text-emerald-500" />}
    </FloatingInput>
    <AnimatePresence>
      {emailCheckState === 'exists' && (
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-[13px] text-red-500 flex items-center gap-1 mt-1 ml-1">
          <AlertCircle size={13} />
          An account with this email already exists. <Link href="/creator/login" className="text-indigo-600 font-semibold underline ml-1">Sign in instead?</Link>
        </motion.p>
      )}
    </AnimatePresence>
  </div>`
);

// 4. Update Password input & Password strength
content = content.replace(
  /<div className=\{styles\.inputGroup\}>\s*<label htmlFor="password">Password<\/label>\s*<div className=\{styles\.inputWrapper\}>\s*<Lock size=\{18\} className=\{styles\.inputIcon\} \/>\s*<input[^>]+id="password"[\s\S]*?onChange=\{\(e\) => setPassword\(e\.target\.value\)\}[\s\S]*?required\s*\/>\s*<button[\s\S]*?<\/button>\s*<\/div>[\s\S]*?\{\/\* Password Strength Indicator \*\/\}\s*\{password\.length > 0 && \(\(\) => \{[\s\S]*?\}\)\(\)\}\s*<\/div>/g,
  `<div>
    <FloatingInput id="password" type={showPassword ? "text" : "password"} label="Password" placeholder="Create a secure password (min. 6 chars)" value={password} onChange={(e: any) => setPassword(e.target.value)} icon={Lock} required minLength={6} autoComplete="new-password">
      <button type="button" className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors z-10" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </FloatingInput>
    <AnimatePresence>
      {password.length > 0 && (() => {
        const strength = getPasswordStrength(password);
        return (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1 mb-4 overflow-hidden">
            <div className="flex gap-1 h-1.5 w-full">
              {[1, 2, 3, 4].map((level) => (
                <motion.div 
                  key={level} 
                  className="flex-1 rounded-full"
                  animate={{ backgroundColor: level <= strength.score ? strength.color : '#e2e8f0' }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
            <div className="flex justify-end mt-1 relative">
              <AnimatePresence mode="popLayout">
                <motion.span 
                  key={strength.label}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs font-semibold"
                  style={{ color: strength.color }}
                >
                  {strength.label}
                  {strength.score === 4 && (
                    <motion.span 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      transition={{ type: 'spring', stiffness: 400, damping: 10, delay: 0.1 }}
                      className="ml-1 inline-block"
                    >
                      🎉
                    </motion.span>
                  )}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })()}
    </AnimatePresence>
  </div>`
);

content = content.replace(
  /<div className=\{styles\.inputGroup\} style=\{\{ marginTop: '16px' \}\}>\s*<label htmlFor="confirmPassword">Confirm Password<\/label>\s*<div className=\{styles\.inputWrapper\}>\s*<Lock size=\{18\} className=\{styles\.inputIcon\} \/>\s*<input[^>]+id="confirmPassword"[\s\S]*?onChange=\{\(e\) => setConfirmPassword\(e\.target\.value\)\}[\s\S]*?required\s*\/>\s*<button[\s\S]*?<\/button>\s*<\/div>\s*<\/div>/g,
  `<div className="mt-2">
    <FloatingInput id="confirmPassword" type={showConfirmPassword ? "text" : "password"} label="Confirm Password" placeholder="Confirm your secure password" value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} icon={Lock} required minLength={6} autoComplete="new-password">
      <button type="button" className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors z-10" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </FloatingInput>
  </div>`
);

// Add confetti trigger properly AFTER the password state declaration
const passwordStrengthEffect = `
  useEffect(() => {
    if (password) {
      const strength = getPasswordStrength(password);
      if (strength.score === 4) {
        // Fire subtle confetti
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#22c55e', '#3b82f6', '#8b5cf6'],
          disableForReducedMotion: true
        });
      }
    }
  }, [password]);
`;

// Insert it right after the useEffect that has posthog.capture
content = content.replace(
  /useEffect\(\(\) => \{\s*posthog\.capture\('onboarding_step_viewed', \{ step: 15, stepName: 'signup' \}\);\s*\}, \[\]\);/g,
  `useEffect(() => {
    posthog.capture('onboarding_step_viewed', { step: 15, stepName: 'signup' });
  }, []);\n${passwordStrengthEffect}`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed step 15 form properly');
