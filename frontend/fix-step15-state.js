const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'app/creator/onboarding/15/page.tsx');
let content = fs.readFileSync(file, 'utf8');

const targetStr = `  const [confirmPassword, setConfirmPassword] = useState('');

    }
    return () => clearTimeout(timer);
  }, [countdown]);`;

const replacementStr = `  const [confirmPassword, setConfirmPassword] = useState('');

  // Verification Pending State
  const [isVerificationPending, setIsVerificationPending] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    posthog.capture('onboarding_step_viewed', { step: 15, stepName: 'signup' });
  }, []);

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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);`;

content = content.replace(targetStr, replacementStr);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed 15/page.tsx state issues');
