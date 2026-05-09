import { CreatorOnboardingFlow } from '@/components/features/creator-onboarding/CreatorOnboardingFlow';

export const metadata = {
  title: 'Test Creator Onboarding | Upskiill',
  description: 'Test standalone route for the creator onboarding flow.',
};

export default function CreatorOnboardingTestPage() {
  return <CreatorOnboardingFlow isTestMode={true} />;
}
