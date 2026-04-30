'use client';

import React, { useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';
import Script from 'next/script';

export default function JoinWaitlistPage() {
  const posthog = usePostHog();

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        if (typeof e.data === 'string' && e.data.includes('Tally.FormSubmitted')) {
          const data = JSON.parse(e.data);
          if (data.event === 'Tally.FormSubmitted') {
            
            // Try to extract email for identification
            const emailField = data.payload?.fields?.find(
              (f: any) => f.type === 'INPUT_EMAIL' || f.label?.toLowerCase().includes('email')
            );
            
            if (emailField && emailField.value && posthog) {
              posthog.identify(emailField.value, { email: emailField.value });
            }
            
            posthog?.capture('waitlist_joined', { 
              formId: data.formId 
            });
          }
        }
      } catch (err) {
        console.error('Error parsing Tally message:', err);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [posthog]);

  return (
    <div style={{ margin: 0, height: '100vh', overflow: 'hidden', position: 'relative', width: '100%' }}>
      <iframe 
        data-tally-src="https://tally.so/r/MedXrE?transparentBackground=1" 
        width="100%" 
        height="100%" 
        frameBorder="0" 
        marginHeight={0} 
        marginWidth={0} 
        title="Join Teyro Early"
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, border: 0 }}
      ></iframe>
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
    </div>
  );
}
